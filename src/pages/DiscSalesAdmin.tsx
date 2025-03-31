import React, { useState, useEffect } from 'react';
import { DiscSalesAd, getAllDiscSalesAds, addDiscSalesAd, updateDiscSalesAd, deleteDiscSalesAd } from '../services/discSalesAdService';
import Navigation from '../components/Navigation';
import BetaAnnouncement from '../components/BetaAnnouncement';
import ImageUpload from '../components/ImageUpload';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';

function DiscSalesAdmin() {
  const [ads, setAds] = useState<DiscSalesAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<DiscSalesAd | null>(null);
  const [formData, setFormData] = useState<Omit<DiscSalesAd, 'id'>>({
    discName: '',
    brand: '',
    sellerCountry: '',
    flightNumbers: { 
      speed: 0, 
      glide: 0, 
      turn: 0, 
      fade: 0 
    },
    price: 0,
    currency: 'USD',
    imageUrl: ''
  });

  // Load ads on component mount
  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const data = await getAllDiscSalesAds();
      setAds(data);
      setError(null);
    } catch (err) {
      setError('Failed to load disc sales ads. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested flight numbers
    if (name.startsWith('flightNumbers.')) {
      const flightNumberKey = name.split('.')[1] as keyof typeof formData.flightNumbers;
      setFormData({
        ...formData,
        flightNumbers: {
          ...formData.flightNumbers,
          [flightNumberKey]: parseFloat(value) || 0
        }
      });
    } else if (name === 'price') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageUploaded = (imageUrl: string) => {
    setFormData({
      ...formData,
      imageUrl
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAd?.id) {
        // Update existing ad
        await updateDiscSalesAd(editingAd.id, formData);
      } else {
        // Add new ad
        await addDiscSalesAd(formData);
      }
      
      // Reset form and refresh ads
      resetForm();
      await fetchAds();
    } catch (err) {
      setError('Failed to save disc sales ad. Please try again.');
      console.error(err);
    }
  };

  const handleEdit = (ad: DiscSalesAd) => {
    setEditingAd(ad);
    setFormData({
      discName: ad.discName,
      brand: ad.brand,
      sellerCountry: ad.sellerCountry,
      flightNumbers: { 
        speed: ad.flightNumbers.speed, 
        glide: ad.flightNumbers.glide, 
        turn: ad.flightNumbers.turn, 
        fade: ad.flightNumbers.fade 
      },
      price: ad.price,
      currency: ad.currency,
      imageUrl: ad.imageUrl
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this disc sales ad?')) return;
    
    try {
      await deleteDiscSalesAd(id);
      await fetchAds();
    } catch (err) {
      setError('Failed to delete disc sales ad. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      discName: '',
      brand: '',
      sellerCountry: '',
      flightNumbers: { 
        speed: 0, 
        glide: 0, 
        turn: 0, 
        fade: 0 
      },
      price: 0,
      currency: 'USD',
      imageUrl: ''
    });
    setEditingAd(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-primary-lightest">
      <Navigation />
      <BetaAnnouncement />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Disc Sales Admin</h1>
            {!isFormOpen && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
              >
                <Plus className="h-4 w-4" />
                Add Disc Sales Ad
              </button>
            )}
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {isFormOpen && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary">
                  {editingAd ? 'Edit Disc Sales Ad' : 'Add New Disc Sales Ad'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="discName" className="block text-sm font-medium text-gray-700 mb-1">
                      Disc Name
                    </label>
                    <input
                      type="text"
                      id="discName"
                      name="discName"
                      value={formData.discName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="sellerCountry" className="block text-sm font-medium text-gray-700 mb-1">
                      Seller Country
                    </label>
                    <input
                      type="text"
                      id="sellerCountry"
                      name="sellerCountry"
                      value={formData.sellerCountry}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Upload
                    </label>
                    <ImageUpload 
                      onImageUploaded={handleImageUploaded} 
                      currentImageUrl={formData.imageUrl}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Flight Numbers
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label htmlFor="speed" className="block text-xs text-gray-500 mb-1">Speed</label>
                        <input
                          type="number"
                          id="speed"
                          name="flightNumbers.speed"
                          value={formData.flightNumbers.speed}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label htmlFor="glide" className="block text-xs text-gray-500 mb-1">Glide</label>
                        <input
                          type="number"
                          id="glide"
                          name="flightNumbers.glide"
                          value={formData.flightNumbers.glide}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label htmlFor="turn" className="block text-xs text-gray-500 mb-1">Turn</label>
                        <input
                          type="number"
                          id="turn"
                          name="flightNumbers.turn"
                          value={formData.flightNumbers.turn}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label htmlFor="fade" className="block text-xs text-gray-500 mb-1">Fade</label>
                        <input
                          type="number"
                          id="fade"
                          name="flightNumbers.fade"
                          value={formData.flightNumbers.fade}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-grow">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="SEK">SEK</option>
                        <option value="NOK">NOK</option>
                        <option value="DKK">DKK</option>
                        <option value="SGD">SGD</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
                  >
                    <Save className="h-4 w-4" />
                    {editingAd ? 'Update Disc Sales Ad' : 'Add Disc Sales Ad'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading disc sales ads...</p>
            </div>
          ) : (
            <>
              {ads.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-lg text-gray-600 mb-4">No disc sales ads have been added yet.</p>
                  {!isFormOpen && (
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
                    >
                      <Plus className="h-4 w-4" />
                      Add Your First Disc Sales Ad
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disc Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Numbers</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ads.map((ad) => (
                        <tr key={ad.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img 
                              src={ad.imageUrl} 
                              alt={ad.discName} 
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-primary">{ad.discName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{ad.brand}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{ad.sellerCountry}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-1 text-xs">
                              <span className="bg-primary-lightest text-primary px-2 py-1 rounded">{ad.flightNumbers.speed}</span>
                              <span className="bg-primary-lightest text-primary px-2 py-1 rounded">{ad.flightNumbers.glide}</span>
                              <span className="bg-primary-lightest text-primary px-2 py-1 rounded">{ad.flightNumbers.turn}</span>
                              <span className="bg-primary-lightest text-primary px-2 py-1 rounded">{ad.flightNumbers.fade}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {ad.price} {ad.currency}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleEdit(ad)}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => ad.id && handleDelete(ad.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscSalesAdmin;