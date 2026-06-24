import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'
import { storage } from './storage'

let firebaseApp = null
let db = null
let cloudStorage = null

export function getFirebaseConfig() {
  // 1. Check environment variables (embedded at build time)
  const envConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig
  }

  // 2. Fallback to localStorage
  return storage.get('animastudio_firebase_config', null)
}

export function saveFirebaseConfig(config) {
  if (!config) {
    storage.remove('animastudio_firebase_config')
  } else {
    storage.set('animastudio_firebase_config', config)
  }
  // Re-initialize Firebase with the new config
  initFirebase()
}

export function initFirebase() {
  const config = getFirebaseConfig()
  if (!config || !config.apiKey || !config.projectId) {
    db = null
    cloudStorage = null
    firebaseApp = null
    return null
  }

  try {
    if (getApps().length === 0) {
      firebaseApp = initializeApp(config)
    } else {
      firebaseApp = getApp()
    }
    db = getFirestore(firebaseApp)
    cloudStorage = getStorage(firebaseApp)
    return { firebaseApp, db, cloudStorage }
  } catch (error) {
    console.error("Failed to initialize Firebase:", error)
    db = null
    cloudStorage = null
    firebaseApp = null
    return null
  }
}

export async function uploadImageToStorage(base64Data, path) {
  if (!cloudStorage) return null
  try {
    const storageRef = ref(cloudStorage, path)
    const uploadResult = await uploadString(storageRef, base64Data, 'data_url')
    const url = await getDownloadURL(uploadResult.ref)
    return url
  } catch (error) {
    console.error("Error uploading image to storage:", error)
    return null
  }
}

// Initial initialization
initFirebase()

export { db, cloudStorage }
