import { db } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, limit, serverTimestamp, orderBy } from 'firebase/firestore';

export interface DiscSalesAd {
  id?: string;
  discName: string;
  brand: string;
  sellerCountry: string;
  flightNumbers: {
    speed: number;
    glide: number;
    turn: number;
    fade: number;
  };
  price: number;
  currency: string;
  imageUrl: string;
  createdAt?: any;
}

// Convert Firebase Storage URL (gs://) to HTTP URL with access token
const convertStorageUrlIfNeeded = (url: string): string => {
  if (url && url.startsWith('gs://')) {
    // Extract bucket and path from gs:// URL
    const gsUrlPattern = /gs:\/\/([^\/]+)\/(.+)/;
    const match = url.match(gsUrlPattern);
    
    if (match && match.length === 3) {
      const bucket = match[1];
      const path = match[2];
      
      // Add access token to the URL
      // Updated token from the screenshot
      const token = "a2955c00-221e-4eb1-9d2d-e31918665bb0";
      
      // Convert to HTTPS URL with token
      return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
    }
  }
  return url; // Return original URL if not a gs:// URL or if conversion fails
};

// Transform Firestore document to DiscSalesAd
const transformDiscData = (doc: any): DiscSalesAd => {
  const data = doc.data();
  
  // Debug logging
  console.log('Raw document data:', data);
  
  // Safely parse numeric values
  const parseNumeric = (value: any): number => {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };
  
  // Safely access nested properties
  const safeAccessFlightNumbers = (data: any) => {
    const flightNumbers = data.flightNumbers || {};
    return {
      speed: parseNumeric(flightNumbers.speed),
      glide: parseNumeric(flightNumbers.glide),
      turn: parseNumeric(flightNumbers.turn),
      fade: parseNumeric(flightNumbers.fade)
    };
  };
  
  return {
    id: doc.id,
    discName: data.discName || '',
    brand: data.brand || '',
    sellerCountry: data.sellerCountry || '',
    flightNumbers: safeAccessFlightNumbers(data),
    price: parseNumeric(data.price),
    currency: data.currency || 'USD',
    imageUrl: convertStorageUrlIfNeeded(data.imageUrl || ''),
    createdAt: data.createdAt
  };
};

// Fetch all disc sales ads
export const getAllDiscSalesAds = async (): Promise<DiscSalesAd[]> => {
  try {
    console.log('Fetching all disc sales ads...');
    const adsCollection = collection(db, 'discSalesAds');
    const querySnapshot = await getDocs(adsCollection);
    
    console.log(`Found ${querySnapshot.docs.length} disc sales ads`);
    return querySnapshot.docs.map(doc => transformDiscData(doc));
  } catch (error) {
    console.error('Error fetching disc sales ads:', error);
    throw error;
  }
};

// Fetch latest disc sales ads (limited number)
export const getLatestDiscSalesAds = async (limitCount = 6): Promise<DiscSalesAd[]> => {
  try {
    console.log(`Fetching latest ${limitCount} disc sales ads...`);
    const adsCollection = collection(db, 'discSalesAds');
    
    // Simple query with limit
    const adsQuery = query(
      adsCollection,
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(adsQuery);
    console.log(`Retrieved ${querySnapshot.docs.length} disc sales ads`);
    
    if (querySnapshot.docs.length === 0) {
      console.warn('No disc sales ads found in Firestore');
    } else {
      // Log the first document for debugging
      const firstDoc = querySnapshot.docs[0];
      console.log('First document ID:', firstDoc.id);
      console.log('First document data:', firstDoc.data());
    }
    
    // Transform and return the documents
    return querySnapshot.docs.map(doc => transformDiscData(doc));
  } catch (error) {
    console.error('Error fetching latest disc sales ads:', error);
    throw error;
  }
};

// Add a new disc sales ad
export const addDiscSalesAd = async (adData: Omit<DiscSalesAd, 'id'>): Promise<string> => {
  try {
    const adsCollection = collection(db, 'discSalesAds');
    const docRef = await addDoc(adsCollection, {
      ...adData,
      createdAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding disc sales ad:', error);
    throw error;
  }
};

// Update an existing disc sales ad
export const updateDiscSalesAd = async (id: string, adData: Partial<DiscSalesAd>): Promise<void> => {
  try {
    const adRef = doc(db, 'discSalesAds', id);
    await updateDoc(adRef, adData);
  } catch (error) {
    console.error('Error updating disc sales ad:', error);
    throw error;
  }
};

// Delete a disc sales ad
export const deleteDiscSalesAd = async (id: string): Promise<void> => {
  try {
    const adRef = doc(db, 'discSalesAds', id);
    await deleteDoc(adRef);
  } catch (error) {
    console.error('Error deleting disc sales ad:', error);
    throw error;
  }
};