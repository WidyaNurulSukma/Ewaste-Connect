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
        console.log('User created successfully');
        toast({
          title: 'Account Created',
          description: 'Check your email to verify your account',
          status: 'success',
          isClosable: true,
          duration: 9000
        });
        setIsLoading(!isLoading);
      } else if (resp.status === 409) {
        toast({
          title: 'Email is already in use',
          description: 'A user with that email already exists, try another one',
          status: 'error',
          isClosable: true,
          duration: 9000
        });
        setIsLoading(!isLoading);
      } else {
        toast({
          title: 'An unknown error occurred',
          description: 'Our team is aware and is working to fix this',
          status: 'error',
          isClosable: true,
          duration: 9000
        });
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        isClosable: true,
        duration: 9000
      });
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
      {/* Logo di Pojok Kiri Atas */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-bold text-blue-800">eWaste Connect</h1>
      </div>

      {/* Ilustrasi Karakter di Kiri */}
      <div className="flex justify-start items-start w-1/2 pl-0">
        <img
          src="/Component 1.png"
          alt="Header Illustration"
          className="w-[400px] h-auto object-contain"
        />
      </div>

      {/* Formulir Signup di Kanan */}
      <div className="w-1/2 max-w-md bg-white rounded-lg shadow-lg p-6 -ml-50 -mt-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="user">User</option>
                  <option value="Collector">Collector</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>

            {/* Opsi Signup dengan Google/Facebook */}
            <div className="mt-6">
              <p className="text-center text-gray-500 text-sm mb-4">or</p>
              <button
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg mb-3 hover:bg-gray-100"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign Up with Google
              </button>
              <button
                onClick={handleFacebookSignup}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Sign Up with Facebook
              </button>
            </div>

            {/* Tautan Login */}
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-sm">
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