import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import type { User as FirebaseUser, Auth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  getDocs
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject
} from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';
import type { Topic, PresentationMetadata, AuthUser, StorageConfig } from '../types';

let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;
let storage: FirebaseStorage | null = null;

// Read from Vite environment variables
const envConfig: StorageConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

export function getMissingFirebaseEnvKeys(): string[] {
  const missing: string[] = [];
  if (!envConfig.apiKey) missing.push('VITE_FIREBASE_API_KEY');
  if (!envConfig.authDomain) missing.push('VITE_FIREBASE_AUTH_DOMAIN');
  if (!envConfig.projectId) missing.push('VITE_FIREBASE_PROJECT_ID');
  if (!envConfig.storageBucket) missing.push('VITE_FIREBASE_STORAGE_BUCKET');
  if (!envConfig.messagingSenderId) missing.push('VITE_FIREBASE_MESSAGING_SENDER_ID');
  if (!envConfig.appId) missing.push('VITE_FIREBASE_APP_ID');
  return missing;
}

export function isFirebaseConfigured(): boolean {
  return (
    Boolean(envConfig.apiKey) &&
    Boolean(envConfig.projectId) &&
    Boolean(envConfig.storageBucket)
  );
}

export function initFirebase(customConfig?: StorageConfig): boolean {
  try {
    const config = customConfig || envConfig;
    if (!config.apiKey || !config.projectId) {
      return false;
    }

    if (getApps().length === 0) {
      firebaseApp = initializeApp(config);
    } else {
      firebaseApp = getApps()[0];
    }

    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
    return true;
  } catch (err) {
    console.warn('Firebase initialization skipped or encountered error:', err);
    return false;
  }
}

// Automatically initialize if env variables exist
if (isFirebaseConfigured()) {
  initFirebase();
}

export const firebaseServices = {
  isConfigured: isFirebaseConfigured,
  getMissingEnvKeys: getMissingFirebaseEnvKeys,
  
  async loginTeacher(email: string, pass: string): Promise<AuthUser> {
    if (!auth) throw new Error('Firebase Auth is not initialized. Please configure Firebase credentials.');
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const u = userCredential.user;
    return {
      uid: u.uid,
      email: u.email || email,
      displayName: u.displayName || email.split('@')[0],
      role: 'teacher',
      isTeacher: true
    };
  },

  async logoutTeacher(): Promise<void> {
    if (auth) {
      await signOut(auth);
    }
  },

  listenAuthState(onChange: (user: AuthUser | null) => void) {
    if (!auth) {
      onChange(null);
      return () => {};
    }
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        onChange({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Faculty'),
          role: 'teacher',
          isTeacher: true
        });
      } else {
        onChange(null);
      }
    });
  },

  async uploadPresentationFile(
    topicId: string, 
    file: File, 
    description: string, 
    user: AuthUser,
    onProgress?: (progress: number) => void
  ): Promise<PresentationMetadata> {
    if (!storage || !firestore) {
      throw new Error('Firebase Storage / Firestore is not configured');
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `presentations/${topicId}/${Date.now()}_${cleanFileName}`;
    const fileRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(fileRef, file);

    const downloadUrl = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });

    const ext = file.name.split('.').pop()?.toLowerCase();
    const fileType = ext === 'pdf' ? 'pdf' : ext === 'pptx' ? 'pptx' : 'ppt';

    const presentation: PresentationMetadata = {
      id: `pres-${topicId}-${Date.now()}`,
      topicId,
      fileName: file.name,
      fileType: fileType as 'pdf' | 'pptx' | 'ppt',
      fileSize: file.size,
      fileUrl: downloadUrl,
      storagePath,
      uploadedAt: new Date().toISOString(),
      uploadedBy: user.displayName || user.email,
      description: description.trim() || undefined,
      slideCount: fileType === 'pdf' ? 12 : 15
    };

    // Save to Firestore
    const topicDocRef = doc(firestore, 'topics', topicId);
    await setDoc(topicDocRef, { presentation }, { merge: true });

    return presentation;
  },

  async deletePresentationFile(topicId: string, storagePath?: string): Promise<void> {
    if (!firestore) throw new Error('Firestore not initialized');

    // 1. Delete from Storage if path is known
    if (storage && storagePath) {
      try {
        const fileRef = ref(storage, storagePath);
        await deleteObject(fileRef);
      } catch (err) {
        console.warn('Storage file delete note:', err);
      }
    }

    // 2. Clear from Firestore
    const topicDocRef = doc(firestore, 'topics', topicId);
    await setDoc(topicDocRef, { presentation: null }, { merge: true });
  },

  async fetchRemoteTopics(): Promise<Topic[] | null> {
    if (!firestore) return null;
    try {
      const colRef = collection(firestore, 'topics');
      const snap = await getDocs(colRef);
      if (snap.empty) return null;
      const list: Topic[] = [];
      snap.forEach(docSnap => {
        list.push(docSnap.data() as Topic);
      });
      return list.sort((a, b) => a.number - b.number);
    } catch (e) {
      console.warn('Error fetching Firestore topics:', e);
      return null;
    }
  }
};
