import React, { useState, useEffect } from 'react';
import { getLatestDiscSalesAds, DiscSalesAd } from '../services/discSalesAdService';
import DiscSalesAdCard from './DiscSalesAdCard';
import { ShoppingCart, ArrowRight } from 'lucide-react';

// Sample data for fallback in case Firebase fetch fails
const fallbackAds: DiscSalesAd[] = [
  {
    id: 'sample1',
    discName: 'Destroyer',
    brand: 'Innova',
    sellerCountry: 'Sweden',
    flightNumbers: { speed: 12, glide: 5, turn: -1, fade: 3 },
    price: 18,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1647548666447-237f96ced5be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sample2',
    discName: 'Buzzz',
    brand: 'Discraft',
    sellerCountry: 'USA',
    flightNumbers: { speed: 5, glide: 4, turn: -1, fade: 1 },
    price: 15,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1567306295427-94503f8300d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sample3',
    discName: 'Pure',
    brand: 'Latitude 64',
    sellerCountry: 'Finland',
    flightNumbers: { speed: 3, glide: 3, turn: 0, fade: 1 },
    price: 140,
    currency: 'SEK',
    imageUrl: 'https://images.unsplash.com/photo-1591287525528-aef03f6c2a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sample4',
    discName: 'Wraith',
    brand: 'Innova',
    sellerCountry: 'Germany',
    flightNumbers: { speed: 11, glide: 5, turn: -1, fade: 3 },
    price: 17,
    currency: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1597329290663-1b1686b986ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sample5',
    discName: 'Ballista Pro',
    brand: 'Latitude 64',
    sellerCountry: 'Norway',
    flightNumbers: { speed: 14, glide: 5, turn: -0.5, fade: 3.5 },
    price: 220,
    currency: 'NOK',
    imageUrl: 'https://images.unsplash.com/photo-1647548663406-2e6be5caa669?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sample6',
    discName: 'Zone',
    brand: 'Discraft',
    sellerCountry: 'USA',
    flightNumbers: { speed: 4, glide: 3, turn: 0, fade: 3 },
    price: 16,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1591496738922-dd82a3b0f096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  }
];

const DiscSalesAdsSection: React.FC = () => {
  const [ads, setAds] = useState<DiscSalesAd[]>(fallbackAds);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAds = async () => {
      try {
        setLoading(true);
        console.log('Fetching latest disc sales ads...');
        const latestAds = await getLatestDiscSalesAds(6);
        console.log('Loaded ads:', latestAds);
        
        if (latestAds && latestAds.length > 0) {
          setAds(latestAds);
          setError(null);
        } else {
          console.warn('No disc sales ads found in Firestore. Using fallback data.');
          setError('No disc sales ads found. Using sample data instead.');
        }
      } catch (err) {
        console.error('Error loading disc sales ads:', err);
        setError('Failed to load sales ads. Using sample data instead.');
        // Keep the fallback ads set as default
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-primary">Latest Disc Sales ads</h2>
            <p className="mt-2 text-lg text-gray-600">Browse the latest discs added by our community</p>
          </div>
          {error && (
            <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-md">
              {error}
            </div>
          )}
          <a href="#" className="hidden md:flex items-center gap-1 text-accent hover:text-accent/80 font-medium">
            View all discs
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Loading disc sales ads...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {ads.map((ad) => (
                <div key={ad.id} className="lg:col-span-2">
                  <DiscSalesAdCard ad={ad} />
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light">
                <ShoppingCart className="h-5 w-5" />
                View All Discs
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DiscSalesAdsSection;