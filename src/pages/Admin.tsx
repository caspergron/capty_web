import React, { useState, useEffect } from 'react';
import { Club, getAllClubs, addClub, updateClub, deleteClub } from '../services/clubService';
import Navigation from '../components/Navigation';
import BetaAnnouncement from '../components/BetaAnnouncement';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';

function Admin() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [formData, setFormData] = useState<Omit<Club, 'id'>>({
    name: '',
    location: '',
    members: 0
  });

  // Load clubs on component mount
  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const data = await getAllClubs();
      setClubs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load clubs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'members' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingClub?.id) {
        // Update existing club
        await updateClub(editingClub.id, formData);
      } else {
        // Add new club
        await addClub(formData);
      }
      
      // Reset form and refresh clubs
      resetForm();
      await fetchClubs();
    } catch (err) {
      setError('Failed to save club. Please try again.');
      console.error(err);
    }
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    setFormData({
      name: club.name,
      location: club.location,
      members: club.members
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this club?')) return;
    
    try {
      await deleteClub(id);
      await fetchClubs();
    } catch (err) {
      setError('Failed to delete club. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      members: 0
    });
    setEditingClub(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-primary-lightest">
      <Navigation />
      <BetaAnnouncement />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Clubs Admin</h1>
            {!isFormOpen && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
              >
                <Plus className="h-4 w-4" />
                Add Club
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
                  {editingClub ? 'Edit Club' : 'Add New Club'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Club Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="members" className="block text-sm font-medium text-gray-700 mb-1">
                      Members
                    </label>
                    <input
                      type="number"
                      id="members"
                      name="members"
                      value={formData.members}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
                  >
                    <Save className="h-4 w-4" />
                    {editingClub ? 'Update Club' : 'Add Club'}
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
              <p className="mt-4 text-gray-600">Loading clubs...</p>
            </div>
          ) : (
            <>
              {clubs.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-lg text-gray-600 mb-4">No clubs have been added yet.</p>
                  {!isFormOpen && (
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
                    >
                      <Plus className="h-4 w-4" />
                      Add Your First Club
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {clubs.map((club) => (
                        <tr key={club.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-primary">{club.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{club.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{club.members}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleEdit(club)}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => club.id && handleDelete(club.id)}
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

export default Admin;