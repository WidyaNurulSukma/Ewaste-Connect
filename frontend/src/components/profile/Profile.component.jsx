import React, { useState, useEffect } from 'react';
import { UserCircle, Mail, Calendar, User2Icon } from 'lucide-react';
import { useAuth } from '../../hooks/auth';
import authService from '../../services/auth.service';
import orderService from '../../services/order.service';
import { useToast } from '@chakra-ui/react';

const UserProfile = () => {
  const { getUser } = useAuth();
  const authuser = JSON.parse(getUser());
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await authService.userProfile(authuser.accessToken);
        if (resp.status === 200) {
          setUser(resp.data.user);
          setEditedUser(resp.data.user);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [authuser.accessToken]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleAccountChange = async () => {
    const newRole = user.role === 'user' ? 'Collector' : 'user';
    try {
      const resp = await authService.updateUserRole(authuser.accessToken);
      if (resp.status === 200) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({ ...currentUser, role: newRole }));

        setUser({ ...user, role: newRole });

        return toast({
          title: 'Account changed',
          isClosable: true,
          duration: 7000,
          position: 'top-right',
          description: `Your account has been changed to ${newRole}`,
          status: 'success'
        });
      } else {
        console.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'profiles');
      formData.append('cloud_name', 'dkmdeg6fc');

      const response = await orderService.cloudinaryUpload(formData);
      const data = response.data;

      if (data.secure_url) {
        const updatedUser = { ...user, profileImage: data.secure_url };
        const resp = await authService.updateUserProfile({ profileImage: data.secure_url }, authuser.accessToken);
        if (resp.status === 200) {
          setUser(updatedUser);
          return toast({
            title: 'Profile updated successfully',
            isClosable: true,
            duration: 7000,
            position: 'top-right',
            description: 'Your profile has been updated successfully',
            status: 'success'
          });
        } else {
          console.error('Failed to update profile image');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900' />
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto mt-10 mb-6'>
      <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
        <div className='px-4 py-5 sm:px-6 bg-[#332F9E] text-white'>
          <h3 className='text-2xl font-bold'>Edit Profil</h3>
        </div>
        <div className='px-4 py-5 sm:p-6 flex justify-between'>
          <div className='w-2/3 space-y-4'>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>Nama Anda</label>
              {isEditing ? (
                <input
                  type='text'
                  name='name'
                  value={editedUser?.name || ''}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-md text-black'
                />
              ) : (
                <p className='p-2 border border-gray-300 rounded-md text-black'>{user.name}</p>
              )}
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>Alamat Email</label>
              {isEditing ? (
                <input
                  type='email'
                  name='email'
                  value={editedUser?.email || ''}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-md text-black'
                />
              ) : (
                <p className='p-2 border border-gray-300 rounded-md text-black'>{user.email}</p>
              )}
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>Tanggal Bergabung</label>
              <input
                type='text'
                name='createdAt'
                value={new Date(editedUser?.createdAt || user.createdAt).toLocaleDateString()}
                readOnly
                className='w-full p-2 border border-gray-300 rounded-md text-black bg-gray-100'
              />
            </div>
            <div className='flex items-center'>
              <User2Icon className='h-5 w-5 text-gray-400 mr-2' />
              <span className='font-medium mr-2 text-black'>Account:</span>
              <span className='text-black'>{user.role}</span>
              <button
                onClick={handleAccountChange}
                className='px-2 py-2 bg-[#332F9E] text-white rounded-md hover:bg-[#2B2A85] focus:outline-none focus:ring-2 focus:ring-[#332F9E] ml-2'
              >
                Ganti Akun
              </button>
            </div>
            <div className='mt-6'>
              {isEditing ? (
          <button
            onClick={handleSave}
            className='px-2 py-2 bg-[#332F9E] text-white rounded-md hover:bg-[#2B2A85] focus:outline-none focus:ring-2 focus:ring-[#332F9E] ml-2'
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className='px-2 py-2 bg-[#332F9E] text-white rounded-md hover:bg-[#2B2A85] focus:outline-none focus:ring-2 focus:ring-[#332F9E] ml-2'
          >
            Edit Profile
          </button>
        )}
          </div>
          </div>
          <div className='w-1/3 flex flex-col items-center'>
            <label htmlFor='profile-image-upload' className='cursor-pointer'>
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt='Profile'
                  className='h-24 w-24 rounded-full object-cover mb-2'
                />
              ) : (
                <div className='h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-2'>
                  <UserCircle className='h-16 w-16 text-gray-400' />
                </div>
              )}
              <input
                id='profile-image-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
            {isEditing && (
              <button
                onClick={() => document.getElementById('profile-image-upload').click()}
                className='mt-2 px-4 py-2 bg-[#332F9E] text-white rounded-md hover:bg-[#2B2A85] focus:outline-none focus:ring-2 focus:ring-[#332F9E]'
                disabled={isUploading}
              >
                Unggah Gambar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
