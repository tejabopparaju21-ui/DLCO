import type { Topic, PresentationMetadata, AuthUser } from '../types';
import { INITIAL_TOPICS } from '../data/initialTopics';

const DB_NAME = 'DLCO_Portal_Database';
const DB_VERSION = 5;
const TOPICS_STORE = 'topics';
const FILES_STORE = 'presentation_files';

interface StoredFile {
  topicId: string;
  blob: Blob;
  fileName: string;
  fileType: string;
  uploadedAt: string;
}

class IndexedDbService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this environment'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(TOPICS_STORE)) {
          db.createObjectStore(TOPICS_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(FILES_STORE)) {
          db.createObjectStore(FILES_STORE, { keyPath: 'topicId' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  async initializeDefaultTopics(): Promise<Topic[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TOPICS_STORE], 'readwrite');
      const store = transaction.objectStore(TOPICS_STORE);
      const countReq = store.count();

      countReq.onsuccess = () => {
        if (countReq.result === 0) {
          // Populate initial 12 topics
          INITIAL_TOPICS.forEach((topic) => store.put(topic));
          transaction.oncomplete = () => resolve(INITIAL_TOPICS);
        } else {
          // Fetch existing topics
          const getAllReq = store.getAll();
          getAllReq.onsuccess = () => {
            const stored = (getAllReq.result as Topic[]).sort((a, b) => a.number - b.number);
            resolve(stored);
          };
        }
      };

      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getTopics(): Promise<Topic[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TOPICS_STORE], 'readonly');
      const store = transaction.objectStore(TOPICS_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const topics = request.result as Topic[];
        if (!topics || topics.length === 0) {
          this.initializeDefaultTopics().then(resolve).catch(reject);
        } else {
          // Automatically sync initial curriculum topics with newly bundled presentation assets
          INITIAL_TOPICS.forEach((initialTopic) => {
            const existing = topics.find((t) => t.id === initialTopic.id);
            if (existing && initialTopic.presentation && (!existing.presentation || existing.presentation.fileName !== initialTopic.presentation.fileName || existing.presentation.fileSize !== initialTopic.presentation.fileSize)) {
              existing.presentation = initialTopic.presentation;
              existing.summary = initialTopic.summary;
              existing.keyConcepts = initialTopic.keyConcepts;
              this.updateTopic(existing).catch(console.error);
            }
          });
          resolve(topics.sort((a, b) => a.number - b.number));
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getTopicById(id: string): Promise<Topic | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TOPICS_STORE], 'readonly');
      const store = transaction.objectStore(TOPICS_STORE);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async updateTopic(topic: Topic): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TOPICS_STORE], 'readwrite');
      const store = transaction.objectStore(TOPICS_STORE);
      store.put(topic);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async savePresentationFile(
    topicId: string,
    file: File,
    description: string,
    user: AuthUser
  ): Promise<Topic> {
    if (!user.isTeacher) {
      throw new Error('Unauthorized: Only verified faculty members can upload presentations.');
    }

    const topic = await this.getTopicById(topicId);
    if (!topic) {
      throw new Error(`Topic with id ${topicId} not found.`);
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    const fileType = ext === 'pdf' ? 'pdf' : ext === 'pptx' ? 'pptx' : 'ppt';

    const metadata: PresentationMetadata = {
      id: `pres-${topicId}-${Date.now()}`,
      topicId: topicId,
      fileName: file.name,
      fileType: fileType as 'pdf' | 'pptx' | 'ppt',
      fileSize: file.size,
      fileUrl: '', // Will be resolved dynamically via Blob or public url
      uploadedAt: new Date().toISOString(),
      uploadedBy: user.displayName || user.email,
      description: description.trim() || undefined,
      slideCount: fileType === 'pdf' ? 12 : 15,
      // For Topic 1, preserve initial slides if matching, or generic structured slides
      slides: topic.number === 1 && topic.presentation?.slides ? topic.presentation.slides : [
        {
          slideNumber: 1,
          title: `${topic.title} - Seminar Deck`,
          bulletPoints: [
            `Digital Logic and Computer Organization: Topic ${topic.number}`,
            `Presented by: ${user.displayName || user.email}`,
            `File: ${file.name}`,
            `Uploaded on: ${new Date().toLocaleDateString()}`
          ]
        },
        {
          slideNumber: 2,
          title: 'Learning Objectives & Syllabus Coverage',
          bulletPoints: topic.keyConcepts
        },
        {
          slideNumber: 3,
          title: 'Core Concepts & Architectural Significance',
          bulletPoints: [
            topic.summary,
            'Detailed diagrams and mathematical proofs available in the attached deck.',
            'Refer to prescribed textbook for complete derivation.'
          ]
        }
      ]
    };

    const updatedTopic: Topic = {
      ...topic,
      presentation: metadata
    };

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TOPICS_STORE, FILES_STORE], 'readwrite');
      const topicStore = transaction.objectStore(TOPICS_STORE);
      const fileStore = transaction.objectStore(FILES_STORE);

      // Save metadata
      topicStore.put(updatedTopic);

      // Save raw file blob (replaces previous file cleanly without orphan)
      const storedFile: StoredFile = {
        topicId,
        blob: file,
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        uploadedAt: metadata.uploadedAt
      };
      fileStore.put(storedFile);

      transaction.oncomplete = () => resolve(updatedTopic);
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async deletePresentationFile(topicId: string, user: AuthUser): Promise<Topic> {
    if (!user.isTeacher) {
      throw new Error('Unauthorized: Only verified faculty members can delete presentations.');
    }

    const topic = await this.getTopicById(topicId);
    if (!topic) {
      throw new Error(`Topic with id ${topicId} not found.`);
    }

    const updatedTopic: Topic = {
      ...topic,
      presentation: null
    };

    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([TOPICS_STORE, FILES_STORE], 'readwrite');
      const topicStore = transaction.objectStore(TOPICS_STORE);
      const fileStore = transaction.objectStore(FILES_STORE);

      topicStore.put(updatedTopic);
      fileStore.delete(topicId);

      transaction.oncomplete = () => resolve(updatedTopic);
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getFileBlob(topicId: string): Promise<Blob | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([FILES_STORE], 'readonly');
      const store = transaction.objectStore(FILES_STORE);
      const request = store.get(topicId);

      request.onsuccess = () => {
        const result = request.result as StoredFile | undefined;
        resolve(result ? result.blob : null);
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const indexedDbService = new IndexedDbService();
