import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import authService from '../../services/auth.service';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (email !== '') {
      const payload = { email };
      const resp = await authService.forgotPasword(payload);
      if (resp.status === 200) {
        toast({
          title: 'Password reset initiated',
          description: 'check your email for an OTP',
          status: 'success',
          duration: 9700,
          isClosable: true
        });
        navigate('/account/reset');
      }
      console.log(`Sending password reset link to ${email}`);
    } else {
      toast({
        title: 'Could not reset your password',
        description: 'No user with this email exists',
        status: 'error',
        duration: 8000,
        isClosable: true
      });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-green-50'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='bg-green-800 text-white text-center py-6'>
          <h2 className='text-2xl font-bold'>E-Waste Recycling Solutions</h2>
          <p className='text-lg'>Reset Your Password</p>
        </div>
        <div className='p-6'>
          <form onSubmit={handlePasswordReset}>
            <div className='mb-4'>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Send Reset Link
            </button>
          </form>
        </div>
        <div className='bg-gray-50 px-4 py-3 text-center'>
          <a
            href='/account/login'
            className='text-green-600 hover:text-green-800 font-semibold'
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
