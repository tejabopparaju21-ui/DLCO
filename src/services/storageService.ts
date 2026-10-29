import type { Topic, PresentationMetadata, AuthUser, StorageConfig } from '../types';
import { indexedDbService } from './indexedDbStorage';
import { firebaseServices, isFirebaseConfigured, initFirebase, getMissingFirebaseEnvKeys } from './firebase';

const blobUrlCache = new Map<string, string>();

export class StorageService {
  private customConfig: StorageConfig | null = null;

  setCustomFirebaseConfig(config: StorageConfig): boolean {
    const success = initFirebase(config);
    if (success) {
      this.customConfig = config;
    }
    return success;
  }

  getCustomConfig(): StorageConfig | null {
    return this.customConfig;
  }

  getBackendMode(): 'firebase' | 'indexeddb' {
    return isFirebaseConfigured() ? 'firebase' : 'indexeddb';
  }

  getMissingFirebaseKeys(): string[] {
    return getMissingFirebaseEnvKeys();
  }

  async getAllTopics(): Promise<Topic[]> {
    if (isFirebaseConfigured()) {
      const remote = await firebaseServices.fetchRemoteTopics();
      if (remote && remote.length > 0) {
        return remote;
      }
    }
    return indexedDbService.getTopics();
  }

  async getTopic(id: string): Promise<Topic | null> {
    const topics = await this.getAllTopics();
    return topics.find(t => t.id === id) || null;
  }

  async uploadPresentation(
    topicId: string,
    file: File,
    description: string,
    user: AuthUser,
    onProgress?: (percent: number) => void
  ): Promise<Topic> {
    if (!user || !user.isTeacher) {
      throw new Error('Access Denied: Only authorized faculty members can upload courseware presentations.');
    }

    // Validate extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['pdf', 'pptx', 'ppt'].includes(ext)) {
      throw new Error('Invalid file format. Only PDF (.pdf) and PowerPoint (.pptx, .ppt) files are supported.');
    }

    // Validate size (max 50 MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the maximum allowed limit of 50MB.`);
    }

    // If existing blob URL was cached for this topic, revoke it to prevent memory leaks
    if (blobUrlCache.has(topicId)) {
      URL.revokeObjectURL(blobUrlCache.get(topicId)!);
      blobUrlCache.delete(topicId);
    }

    if (isFirebaseConfigured()) {
      try {
        const pres = await firebaseServices.uploadPresentationFile(topicId, file, description, user, onProgress);
        const current = await this.getTopic(topicId);
        if (!current) throw new Error('Topic not found');
        return { ...current, presentation: pres };
      } catch (err: any) {
        console.error('Firebase upload failed, falling back to durable IndexedDB storage:', err);
        // Continue to indexedDb fallback
      }
    }

    // Progress simulation for IndexedDB to give smooth teacher feedback
    if (onProgress) {
      for (let p = 20; p <= 100; p += 20) {
        onProgress(p);
        await new Promise(r => setTimeout(r, 60));
      }
    }

    return indexedDbService.savePresentationFile(topicId, file, description, user);
  }

  async deletePresentation(topicId: string, user: AuthUser): Promise<Topic> {
    if (!user || !user.isTeacher) {
      throw new Error('Access Denied: Only authorized faculty members can delete presentations.');
    }

    const topic = await this.getTopic(topicId);
    if (!topic) throw new Error('Topic not found');

    if (blobUrlCache.has(topicId)) {
      URL.revokeObjectURL(blobUrlCache.get(topicId)!);
      blobUrlCache.delete(topicId);
    }

    if (isFirebaseConfigured() && topic.presentation?.storagePath) {
      try {
        await firebaseServices.deletePresentationFile(topicId, topic.presentation.storagePath);
      } catch (e) {
        console.warn('Firebase file deletion warning:', e);
      }
    }

    return indexedDbService.deletePresentationFile(topicId, user);
  }

  async getFileObjectUrl(topicId: string, presentation: PresentationMetadata): Promise<string> {
    // 1. If it's a remote URL from Firebase Storage, return directly
    if (presentation.fileUrl && presentation.fileUrl.startsWith('http')) {
      return presentation.fileUrl;
    }

    // 2. Check if we already have an active Blob URL for this topic
    if (blobUrlCache.has(topicId)) {
      return blobUrlCache.get(topicId)!;
    }

    // 3. Check IndexedDB binary store
    const blob = await indexedDbService.getFileBlob(topicId);
    if (blob) {
      const url = URL.createObjectURL(blob);
      blobUrlCache.set(topicId, url);
      return url;
    }

    // 4. Default public path (e.g. for initial Topic 1)
    if (presentation.fileUrl) {
      return presentation.fileUrl;
    }

    return '';
  }
}

export const storageService = new StorageService();
