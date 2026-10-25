/**
 * Firebase Client Configuration & Service Initializer
 * Designed for Firebase Web SDK v9+ (Modular)
 * If Firebase environment variables are not supplied, LittleAura runs seamlessly
 * using our local secure state engine, ready to connect whenever env vars are added.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoDummyKeyLittleAuraProd",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "littleaura-prod.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "littleaura-prod",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "littleaura-prod.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475610:web:8a9b0c1d2e3f"
};

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

export const collections = {
  USERS: 'users',
  CHILDREN: 'children',
  GROWTH_RECORDS: 'growthRecords',
  MEDICAL_REPORTS: 'medicalReports',
  DAILY_CARE: 'dailyCare',
  ESSENTIALS: 'essentials',
  REMINDERS: 'reminders',
  LEARNING_ACTIVITIES: 'learningActivities',
  TIMELINE: 'timeline',
  CONVERSATIONS: 'conversations',
  AI_INSIGHTS: 'aiInsights'
};
