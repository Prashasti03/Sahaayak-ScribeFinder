import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    educational_qualification: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get('http://localhost:5000/api/user/profile', {
        withCredentials: true
      });

      if (userResponse.data.success) {
        setUser(userResponse.data.user);
        setFormData(prev => ({
          ...prev,
          name: userResponse.data.user.name,
          email: userResponse.data.user.email,
          phone: userResponse.data.user.phone
        }));
        
        // Fetch role-specific profile
        let profileResponse;
        if (userResponse.data.user.role === 'candidate') {
          profileResponse = await axios.get('http://localhost:5000/api/user/candidate/profile', {
            withCredentials: true
          });
        } else if (userResponse.data.user.role === 'scribe') {
          profileResponse = await axios.get('http://localhost:5000/api/user/scribe/profile', {
            withCredentials: true
          });
        } else if (userResponse.data.user.role === 'ngo') {
          profileResponse = await axios.get('http://localhost:5000/api/user/ngo/profile', {
            withCredentials: true
          });
        }

        if (profileResponse?.data?.success) {
          setUserProfile(profileResponse.data.profile);
          setFormData(prev => ({
            ...prev,
            educational_qualification: profileResponse.data.profile.educational_qualification || '',
            address: profileResponse.data.profile.address || ''
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      
      const response = await axios.patch('http://localhost:5000/api/user/profile/update', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {user?.role === 'candidate' || user?.role === 'scribe' ? (
                  <div>
                    <Label htmlFor="educational_qualification">Educational Qualification</Label>
                    <select
                      id="educational_qualification"
                      name="educational_qualification"
                      value={formData.educational_qualification}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Degree</option>
                      <option value="Below 10th">Below 10th</option>
                      <option value="10th">10th</option>
                      <option value="12th">12th</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelors">Bachelor's</option>
                      <option value="Masters">Master's</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                ) : null}

                {user?.role === 'ngo' ? (
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </div>
                ) : null}
              </div>

              <Button type="submit" disabled={updating} className="w-full">
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Updating Profile...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default UpdateProfile;