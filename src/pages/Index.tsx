
import React, { useState, useEffect } from 'react';
import { Search, Plus, Database, Shield, Eye } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import AddUserModal from '../components/AddUserModal';
import { UserData } from '../types/UserData';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive",
        });
        return;
      }

      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone_number.includes(searchTerm) ||
        (user.nin && user.nin.includes(searchTerm)) ||
        (user.driving_license && user.driving_license.includes(searchTerm))
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleAddUser = async (userData: Omit<UserData, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([{
          full_name: userData.full_name,
          email: userData.email,
          phone_number: userData.phone_number,
          age: userData.age,
          nin: userData.nin,
          driving_license: userData.driving_license,
          residence_address: userData.residence_address,
          photo: userData.photo
        }])
        .select();

      if (error) {
        console.error('Error adding user:', error);
        toast({
          title: "Error",
          description: "Failed to add user",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        setUsers(prev => [data[0], ...prev]);
        setIsAddModalOpen(false);
        toast({
          title: "Success",
          description: "Target added successfully",
        });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Error deleting user:', error);
        toast({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive",
        });
        return;
      }

      setUsers(prev => prev.filter(user => user.id !== userId));
      setSelectedUser(null);
      toast({
        title: "Success",
        description: "Target deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black scan-lines">
      {/* Header */}
      <header className="border-b border-cyber-green/30 bg-cyber-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-cyber-green neon-glow" />
              <h1 className="text-2xl font-cyber font-bold neon-glow glitch-text" data-text="CYBER VAULT">
                CYBER VAULT
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-cyber-green/70">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-mono">SECURE ACCESS</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="cyber-button px-4 py-2 rounded-md flex items-center space-x-2 font-mono"
              >
                <Plus className="h-4 w-4" />
                <span>ADD TARGET</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <div className="cyber-card p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="h-5 w-5 text-cyber-green" />
                <h2 className="text-lg font-cyber font-semibold text-cyber-green">
                  DATABASE SEARCH
                </h2>
              </div>
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search by name, email, phone, or ID..."
              />
            </div>

            {/* Results Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-cyber font-semibold text-cyber-green">
                  SEARCH RESULTS ({filteredUsers.length})
                </h3>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-cyber-cyan hover:text-cyber-green transition-colors text-sm font-mono"
                  >
                    CLEAR SEARCH
                  </button>
                )}
              </div>
              
              {loading ? (
                <div className="cyber-card p-8 rounded-lg text-center">
                  <div className="text-cyber-green/70 font-mono">LOADING DATABASE...</div>
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="cyber-card p-4 rounded-lg cursor-pointer hover:border-cyber-green transition-all duration-300 hover:bg-cyber-green/5"
                    >
                      <div className="flex items-center space-x-3">
                        {user.photo ? (
                          <img
                            src={user.photo}
                            alt={user.full_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-cyber-green/30"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-cyber-green/20 flex items-center justify-center">
                            <Eye className="h-6 w-6 text-cyber-green" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-cyber-green truncate">
                            {user.full_name}
                          </h4>
                          <p className="text-cyber-green/70 text-sm truncate font-mono">
                            {user.email}
                          </p>
                          <p className="text-cyber-cyan text-xs font-mono">
                            ID: {user.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cyber-card p-8 rounded-lg text-center">
                  <Database className="h-16 w-16 text-cyber-green/30 mx-auto mb-4" />
                  <h3 className="text-lg font-cyber font-semibold text-cyber-green/70 mb-2">
                    {searchTerm ? 'NO MATCHES FOUND' : 'DATABASE EMPTY'}
                  </h3>
                  <p className="text-cyber-green/50 font-mono">
                    {searchTerm 
                      ? 'Try adjusting your search parameters'
                      : 'Add your first target to begin surveillance'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Details Panel */}
          <div className="lg:col-span-1">
            {selectedUser ? (
              <UserCard 
                user={selectedUser} 
                onDelete={handleDeleteUser}
                onClose={() => setSelectedUser(null)}
              />
            ) : (
              <div className="cyber-card p-6 rounded-lg text-center">
                <Eye className="h-16 w-16 text-cyber-green/30 mx-auto mb-4" />
                <h3 className="text-lg font-cyber font-semibold text-cyber-green/70 mb-2">
                  TARGET ANALYSIS
                </h3>
                <p className="text-cyber-green/50 font-mono text-sm">
                  Select a target from the database to view detailed profile information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Index;
