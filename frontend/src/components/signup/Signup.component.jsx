import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import authService from '../../services/auth.service';

const Signup = () => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const data = { username, password, name, email, role };
    try {
      const resp = await authService.registerUser(data);
      console.log(resp);
      if (resp.status === 201) {
        toast({
          title: 'Account Created',
          description: 'Akun anda berhasil dibuat',
          status: 'success',
          isClosable: true,
          duration: 9000,
        });
        setIsLoading(false);
      } else if (resp.status === 409) {
        toast({
          title: 'Email is already in use',
          description: 'A user with that email already exists, try another one',
          status: 'error',
          isClosable: true,
          duration: 9000,
        });
        setIsLoading(false);
      } else {
        toast({
          title: 'An unknown error occurred',
          description: 'Our team is aware and is working to fix this',
          status: 'error',
          isClosable: true,
          duration: 9000,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        isClosable: true,
        duration: 9000,
      });
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast({
      title: 'Fitur Belum Tersedia',
      description: 'Signup dengan Google akan segera hadir',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleFacebookSignup = () => {
    toast({
      title: 'Fitur Belum Tersedia',
      description: 'Signup dengan Facebook akan segera hadir',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-row items-center justify-center px-8 relative">
      {/* Ilustrasi Karakter di Kiri */}
      <div className="flex justify-start items-start w-1/2 pl-0 ml-0">
        <img
          src="/Component 1.png"
          alt="Header Illustration"
          className="w-[400px] h-auto object-contain ml-[-180px] mt-[0px]"
        />
      </div>

      {/* Formulir Signup di Kanan */}
      <div className="w-2/5 max-w-md bg-white rounded-lg shadow-lg p-6 -ml-40 -mt-0">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Sign Up</h2>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                >
                  <option value="user">User</option>
                  <option value="Collector">Collector</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>

            {/* Opsi Signup dengan Google/Facebook */}
            <div className="mt-4">
              <p className="text-center text-gray-500 text-xs mb-3">or</p>
              <button
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md mb-2 hover:bg-gray-100 text-sm"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-4 h-4"
                />
                Sign Up with Google
              </button>
              <button
                onClick={handleFacebookSignup}
                className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-4 h-4"
                />
                Sign Up with Facebook
              </button>
            </div>

            {/* Tautan Login */}
            <div className="mt-4 text-center text-xs">
              <p className="text-gray-700">
                Already have an account?{' '}
                <a
                  href="/account/login"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Login
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
