import { useToast, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import authService from '../../services/auth.service';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: userName, password };

    try {
      setLoading(true);

      const resp = await authService.loginUser(data);

      if (resp.status !== 200) {
        toast({
          title: 'Invalid Credentials',
          description: 'The username or password you entered is incorrect',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: 'Authenticated',
        description: 'Login Berhasil',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      console.log(JSON.stringify(resp.data));
      login(resp.data);

      setTimeout(() => {
        navigate('/account/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Error during login:', err);
      toast({
        title: 'An unknown error occurred',
        description: 'Please try again later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: 'Fitur Belum Tersedia',
      description: 'Login dengan Google akan segera hadir',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleFacebookLogin = () => {
    toast({
      title: 'Fitur Belum Tersedia',
      description: 'Login dengan Facebook akan segera hadir',
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
          className="w-[400px] h-auto object-contain ml-[-180px] mt-[70px]"
        />
      </div>

      {/* Formulir Login di Kanan */}
      <div className="w-2/5 max-w-md bg-white rounded-lg shadow-lg p-6 -ml-40 -mt-0">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>

        {loading ? (
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-4 text-xs">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-1" />
                  <label className="text-gray-700">Remember me</label>
                </div>
                <a
                  href="/account/forgot"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md text-sm"
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </form>

            {/* Opsi Login dengan Google/Facebook */}
            <div className="mt-4">
              <p className="text-center text-gray-500 text-xs mb-3">or</p>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md mb-2 hover:bg-gray-100 text-sm"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-4 h-4"
                />
                Login with Google
              </button>
              <button
                onClick={handleFacebookLogin}
                className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-4 h-4"
                />
                Login with Facebook
              </button>
            </div>

            {/* Tautan Sign Up */}
            <div className="mt-4 text-center text-xs">
              <p className="text-gray-700">
                Don't have an account?{' '}
                <a
                  href="/account/signup"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
