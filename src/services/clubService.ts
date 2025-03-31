import { db } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit } from 'firebase/firestore';

export interface Club {
  id?: string;
  name: string;
  location: string;
  members: number;
  createdAt?: Date;
}

// Fetch all clubs
export const getAllClubs = async (): Promise<Club[]> => {
  try {
    const clubsCollection = collection(db, 'clubs');
    const querySnapshot = await getDocs(clubsCollection);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Club));
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
};

// Fetch featured clubs (limited number, ordered by members)
export const getFeaturedClubs = async (limitCount = 10): Promise<Club[]> => {
  try {
    const clubsCollection = collection(db, 'clubs');
    const clubsQuery = query(
      clubsCollection,
      orderBy('members', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(clubsQuery);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Club));
  } catch (error) {
    console.error('Error fetching featured clubs:', error);
    throw error;
  }
};

// Add a new club
export const addClub = async (clubData: Omit<Club, 'id'>): Promise<string> => {
  try {
    const clubsCollection = collection(db, 'clubs');
    const docRef = await addDoc(clubsCollection, {
      ...clubData,
      createdAt: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding club:', error);
    throw error;
  }
};

// Update an existing club
export const updateClub = async (id: string, clubData: Partial<Club>): Promise<void> => {
  try {
    const clubRef = doc(db, 'clubs', id);
    await updateDoc(clubRef, clubData);
  } catch (error) {
    console.error('Error updating club:', error);
    throw error;
  }
};

// Delete a club
export const deleteClub = async (id: string): Promise<void> => {
  try {
    const clubRef = doc(db, 'clubs', id);
    await deleteDoc(clubRef);
  } catch (error) {
    console.error('Error deleting club:', error);
    throw error;
  }
};