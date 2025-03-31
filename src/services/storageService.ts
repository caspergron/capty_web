import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase/config';

// Initialize storage directly with the app instance
const storage = getStorage(app);

// Generate a unique filename for the uploaded image
const generateUniqueFileName = (file: File): string => {
  const extension = file.name.split('.').pop();
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `disc-images/${timestamp}-${randomString}.${extension}`;
};

// Upload image to Firebase Storage
export const uploadImage = async (file: File): Promise<string> => {
  try {
    console.log('Starting file upload to Firebase Storage');
    console.log('File type:', file.type);
    console.log('File size:', file.size);
    
    // Create a unique file path
    const filePath = generateUniqueFileName(file);
    console.log('Generated file path:', filePath);
    
    // Create storage reference with explicit bucket - this is crucial
    const storageRef = ref(storage, filePath);
    console.log('Created storage reference');
    
    // Check if storage is properly initialized
    if (!storage) {
      throw new Error('Firebase Storage is not initialized');
    }
    
    // Log the bucket name
    console.log('Storage bucket:', storage.app.options.storageBucket);
    
    // Upload with metadata
    const metadata = {
      contentType: file.type,
    };
    
    console.log('Uploading file...');
    const snapshot = await uploadBytes(storageRef, file, metadata);
    console.log('Uploaded file to Firebase Storage:', snapshot.metadata.fullPath);
    
    // Get the download URL
    console.log('Getting download URL...');
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    throw error;
  }
};