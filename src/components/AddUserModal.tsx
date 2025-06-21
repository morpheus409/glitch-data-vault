
import React, { useState } from 'react';
import { X, Upload, User, Plus } from 'lucide-react';
import { UserData } from '../types/UserData';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: Omit<UserData, 'id' | 'created_at' | 'updated_at'>) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    age: '',
    nin: '',
    driving_license: '',
    residence_address: '',
    photo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.full_name || !formData.email || !formData.phone_number) {
      alert('Please fill in required fields');
      return;
    }

    onAddUser({
      full_name: formData.full_name,
      email: formData.email,
      phone_number: formData.phone_number,
      age: formData.age ? parseInt(formData.age) : null,
      nin: formData.nin || null,
      driving_license: formData.driving_license || null,
      residence_address: formData.residence_address || null,
      photo: formData.photo || null
    });

    // Reset form
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      age: '',
      nin: '',
      driving_license: '',
      residence_address: '',
      photo: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="bg-cyber-green/10 p-4 border-b border-cyber-green/30 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-cyber-green" />
              <h2 className="text-lg font-cyber font-bold text-cyber-green">ADD NEW TARGET</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-cyber-green/20 rounded transition-colors"
            >
              <X className="h-5 w-5 text-cyber-green/70 hover:text-cyber-green" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Photo Upload */}
          <div className="text-center">
            <div className="relative inline-block">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-cyber-green/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-cyber-green/30 bg-cyber-green/20 flex items-center justify-center">
                  <User className="h-12 w-12 text-cyber-green" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-cyber-green text-cyber-black rounded-full p-1 cursor-pointer hover:bg-cyber-cyan transition-colors">
                <Upload className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-cyber-green/70 mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="cyber-input w-full px-3 py-2 rounded"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyber-green/70 mb-1">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="cyber-input w-full px-3 py-2 rounded"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyber-green/70 mb-1">
                PHONE NUMBER *
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="cyber-input w-full px-3 py-2 rounded"
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyber-green/70 mb-1">
                AGE
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="cyber-input w-full px-3 py-2 rounded"
                placeholder="25"
                min="0"
                max="150"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyber-green/70 mb-1">
                NATIONAL ID / PASSPORT
              </label>
              <input
                type="text"
                name="nin"
                value={formData.nin}
                onChange={handleInputChange}
                className="cyber-input w-full px-3 py-2 rounded"
                placeholder="123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyber-green/70 mb-1">
                DRIVING LICENSE
              </label>
              <input
                type="text"
                name="driving_license"
                value={formData.driving_license}
                onChange={handleInputChange}
                className="cyber-input w-full px-3 py-2 rounded"
                placeholder="DL123456789"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono text-cyber-green/70 mb-1">
              RESIDENCE ADDRESS
            </label>
            <textarea
              name="residence_address"
              value={formData.residence_address}
              onChange={handleInputChange}
              className="cyber-input w-full px-3 py-2 rounded resize-none"
              rows={3}
              placeholder="123 Main St, City, State, Country"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-cyber-green/30 text-cyber-green/70 rounded hover:bg-cyber-green/10 transition-colors font-mono"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="cyber-button px-6 py-2 rounded font-mono"
            >
              ADD TARGET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
