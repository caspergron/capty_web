import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut as firebaseSignOut,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Sign up a new user
export const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in an existing user
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out the current user
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Create admin user - This would typically be done via Firebase Console or Admin SDK
// This is a placeholder for demonstration purposes only
export const createAdminUser = async (email: string, password: string): Promise<User> => {
  try {
    // In a real application, you'd use Firebase Admin SDK to set custom claims
    // For this demo, we'll just create a regular user
    const user = await signUp(email, password, 'Admin User');
    console.log('Created admin user (note: special admin privileges must be set in Firebase Console)');
    return user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};