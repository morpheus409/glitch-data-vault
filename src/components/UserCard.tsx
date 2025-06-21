
import React from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  Car, 
  MapPin, 
  User,
  Trash2,
  Shield
} from 'lucide-react';
import { UserData } from '../types/UserData';

interface UserCardProps {
  user: UserData;
  onDelete: (userId: string) => void;
  onClose: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, onClose }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete target: ${user.fullName}?`)) {
      onDelete(user.id);
    }
  };

  return (
    <div className="cyber-card rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-cyber-green/10 p-4 border-b border-cyber-green/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-cyber-green" />
            <h3 className="font-cyber font-bold text-cyber-green">TARGET PROFILE</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-500/20 rounded transition-colors"
            >
              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-cyber-green/20 rounded transition-colors"
            >
              <X className="h-4 w-4 text-cyber-green/70 hover:text-cyber-green" />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Section */}
      <div className="p-6 text-center border-b border-cyber-green/30">
        {user.photo ? (
          <img
            src={user.photo}
            alt={user.fullName}
            className="w-24 h-24 rounded-full mx-auto border-4 border-cyber-green/30 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto border-4 border-cyber-green/30 bg-cyber-green/20 flex items-center justify-center">
            <User className="h-12 w-12 text-cyber-green" />
          </div>
        )}
        <h2 className="text-xl font-cyber font-bold text-cyber-green mt-3 neon-glow">
          {user.fullName}
        </h2>
        <p className="text-cyber-cyan text-sm font-mono">ID: {user.id}</p>
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-3 p-2 bg-cyber-dark/50 rounded border border-cyber-green/20">
            <Mail className="h-4 w-4 text-cyber-cyan flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-cyber-green/70 font-mono uppercase">Email</p>
              <p className="text-cyber-green font-mono text-sm truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-cyber-dark/50 rounded border border-cyber-green/20">
            <Phone className="h-4 w-4 text-cyber-cyan flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-cyber-green/70 font-mono uppercase">Phone</p>
              <p className="text-cyber-green font-mono text-sm">{user.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-cyber-dark/50 rounded border border-cyber-green/20">
            <Calendar className="h-4 w-4 text-cyber-cyan flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-cyber-green/70 font-mono uppercase">Age</p>
              <p className="text-cyber-green font-mono text-sm">{user.age} years</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-cyber-dark/50 rounded border border-cyber-green/20">
            <CreditCard className="h-4 w-4 text-cyber-cyan flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-cyber-green/70 font-mono uppercase">National ID</p>
              <p className="text-cyber-green font-mono text-sm">{user.nin}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-cyber-dark/50 rounded border border-cyber-green/20">
            <Car className="h-4 w-4 text-cyber-cyan flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-cyber-green/70 font-mono uppercase">License</p>
              <p className="text-cyber-green font-mono text-sm">{user.drivingLicense}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-2 bg-cyber-dark/50 rounded border border-cyber-green/20">
            <MapPin className="h-4 w-4 text-cyber-cyan flex-shrink-0 mt-1" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-cyber-green/70 font-mono uppercase">Address</p>
              <p className="text-cyber-green font-mono text-sm leading-relaxed">{user.residenceAddress}</p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="border-t border-cyber-green/30 pt-3">
          <p className="text-xs text-cyber-green/50 font-mono">
            ADDED: {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
