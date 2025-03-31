import React from 'react';
import { DiscSalesAd } from '../services/discSalesAdService';

interface DiscSalesAdCardProps {
  ad: DiscSalesAd;
}

const DiscSalesAdCard: React.FC<DiscSalesAdCardProps> = ({ ad }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={ad.imageUrl}
          alt={`${ad.brand} ${ad.discName} disc`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-primary">{ad.discName}</h3>
            <p className="text-gray-600 text-sm">{ad.brand}</p>
          </div>
          <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            {ad.price} {ad.currency}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {/* Flight numbers */}
            <div className="w-8 h-8 rounded-full bg-primary-lightest flex items-center justify-center text-primary font-semibold">
              {ad.flightNumbers.speed}
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-lightest flex items-center justify-center text-primary font-semibold">
              {ad.flightNumbers.glide}
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-lightest flex items-center justify-center text-primary font-semibold">
              {ad.flightNumbers.turn}
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-lightest flex items-center justify-center text-primary font-semibold">
              {ad.flightNumbers.fade}
            </div>
          </div>
          
          <div className="text-right">
            <span className="inline-block bg-primary-lightest text-primary text-xs px-2 py-1 rounded-md">
              {ad.sellerCountry}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscSalesAdCard;