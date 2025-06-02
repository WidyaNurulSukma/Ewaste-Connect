import { useToast, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import authService from '../../services/auth.service';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userName, setUserName] = useState(''); // Mengembalikan ke username seperti code 1
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: userName, password };

    try {
      setLoading(true);

      const resp = await authService.loginUser(data);

      if (resp.status !== 200) {
        return toast({
          title: 'Invalid Credentials',
          description: 'The username or password you entered is incorrect',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }

      toast({
        title: 'Authenticated',
        description: 'Login successful',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      console.log(JSON.stringify(resp.data));
      login(resp.data);

      setTimeout(() => {
        navigate('/account/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Error during login:', err);
      return toast({
        title: 'An unknown error occurred',
        description: 'Please try again later',
        status: 'error',
        duration: 9000,
        isClosable: true
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


      {/* Formulir Login di Kanan */}
      <div className="w-1/2 max-w-md bg-white rounded-lg shadow-lg p-6 -ml-50 -mt-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        {loading ? (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  <label className="text-gray-700 text-sm">Remember me</label>
                </div>
                <a
                  href="/account/forgot"
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg"
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </form>

            {/* Opsi Login dengan Google/Facebook */}
            <div className="mt-6">
              <p className="text-center text-gray-500 text-sm mb-4">or</p>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg mb-3 hover:bg-gray-100"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Login with Google
              </button>
              <button
                onClick={handleFacebookLogin}
                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Login with Facebook
              </button>
            </div>

            {/* Tautan Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-sm">
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