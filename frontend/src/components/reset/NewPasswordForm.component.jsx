import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const NewPasswordSetting = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password && confirmPassword && otp) {
      if (password === confirmPassword) {
      } else {
        setError('Passwords do not match.');
        setMessage('');
      }
    } else {
      setError('Please enter OTP, new password, and confirm your new password.');
      setMessage('');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-green-50'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='bg-green-800 text-white text-center py-6'>
          <h2 className='text-2xl font-bold'>E-Waste Recycling Solutions</h2>
          <p className='text-lg'>Set New Password</p>
        </div>
        <div className='p-6'>
          <form onSubmit={handlePasswordChange}>
            <div className='mb-4'>
              <input
                type='email'
                placeholder='Enter email'
                value={otp}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
                required
              />
            </div>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
                required
                maxLength={6}
              />
            </div>
            <div className='mb-4 relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 pr-10 border border-gray-300 rounded'
                required
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword
                  ? (
                    <EyeOffIcon className='h-5 w-5 text-gray-400' />
                    )
                  : (
                    <EyeIcon className='h-5 w-5 text-gray-400' />
                    )}
              </button>
            </div>
            <div className='mb-4 relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full p-2 pr-10 border border-gray-300 rounded'
                required
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword
                  ? (
                    <EyeOffIcon className='h-5 w-5 text-gray-400' />
                    )
                  : (
                    <EyeIcon className='h-5 w-5 text-gray-400' />
                    )}
              </button>
            </div>
            {message && (
              <div className='mb-4 text-green-500'>
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className='mb-4 text-red-500'>
                <span>{error}</span>
              </div>
            )}
            <button
              type='submit'
              className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Set New Password
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

export default NewPasswordSetting;
