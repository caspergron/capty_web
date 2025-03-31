import { db, functions } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Save contact message to Firestore
export const saveContactMessage = async (data: ContactFormData) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, error };
  }
};

// Send email notification using Firebase Functions
export const sendContactEmail = async (data: ContactFormData) => {
  try {
    // This function name must match the one in Firebase Cloud Functions
    const sendEmail = httpsCallable(functions, 'sendContactEmail');
    const result = await sendEmail(data);
    return { success: true, result: result.data };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
};

// Combined function to both save to Firestore and send email
export const submitContactForm = async (data: ContactFormData) => {
  // First save to Firestore
  const saveResult = await saveContactMessage(data);
  
  if (!saveResult.success) {
    return saveResult;
  }
  
  // Then try to send email, but don't fail the whole process if email fails
  try {
    await sendContactEmail(data);
  } catch (error) {
    console.warn('Email sending failed, but contact was saved:', error);
    // Continue with success since we at least saved the contact
  }
  
  return {
    success: true,
    id: saveResult.id,
    message: 'Contact form submitted successfully'
  };
};