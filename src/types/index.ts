export type FileFormat = 'pdf' | 'pptx' | 'ppt';

export interface SlideContent {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  keyDiagram?: string;
  speakerNotes?: string;
}

export interface PresentationMetadata {
  id: string;
  topicId: string;
  fileName: string;
  fileType: FileFormat;
  fileSize: number; // in bytes
  fileUrl: string; // Blob URL, Storage URL, or sample resource path
  storagePath?: string;
  uploadedAt: string; // ISO string
  uploadedBy: string;
  description?: string;
  slideCount?: number;
  slides?: SlideContent[];
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  category: string;
  summary: string;
  keyConcepts: string[];
  presentation: PresentationMetadata | null;
}

export type UserRole = 'student' | 'teacher';

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isTeacher: boolean;
}

export interface StorageConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
