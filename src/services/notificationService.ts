import { db, functions } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

export interface NotificationFormData {
  name: string;
  email: string;
  country: string;
}

// Save notification data to Firestore
export const saveNotificationRequest = async (data: NotificationFormData) => {
  try {
    const docRef = await addDoc(collection(db, 'notificationRequests'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving notification request:', error);
    return { success: false, error };
  }
};

// Send email notification
export const sendNotificationEmail = async (data: NotificationFormData) => {
  try {
    // This function name must match the one you'll create in Firebase Cloud Functions
    const sendEmail = httpsCallable(functions, 'sendLaunchNotificationEmail');
    const result = await sendEmail(data);
    return { success: true, result: result.data };
  } catch (error) {
    console.error('Error sending notification email:', error);
    return { success: false, error };
  }
};

// Combined function to both save to Firestore and send email
export const submitNotificationRequest = async (data: NotificationFormData) => {
  // First save to Firestore
  const saveResult = await saveNotificationRequest(data);
  
  if (!saveResult.success) {
    return saveResult;
  }
  
  // Then send email
  const emailResult = await sendNotificationEmail(data);
  
  return {
    success: saveResult.success && emailResult.success,
    id: saveResult.id,
    emailResult
  };
};