import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType } from '../types';
import { MOCK_USER } from '../constants';
import { GoogleIcon, FacebookIcon, AppleIcon, MetamaskIcon } from './Icons';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Login: React.FC = () => {
  const { setUser, setView } = useContext(AppContext) as AppContextType;
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Social logins create a user profile without a pre-connected wallet.
    setUser({ ...MOCK_USER, walletAddress: '' });
    setView('dashboard');
  };

  const handleMetamaskLogin = async () => {
    setIsConnecting(true);
    setError(null);
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setUser({ ...MOCK_USER, walletAddress: account });
        setView('dashboard');
      } catch (err: any) {
        setError("User denied account access.");
        console.error(err);
      }
    } else {
      setError("Please install MetaMask to use this feature.");
    }
    setIsConnecting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-indigo-500/30">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">SkillUp & Earn</h1>
          <p className="text-indigo-300 mt-2">Level up your skills. Earn crypto.</p>
        </div>
        
        <div className="space-y-4">
            <button
                onClick={handleMetamaskLogin}
                disabled={isConnecting}
                className="w-full flex items-center justify-center py-3 px-4 font-semibold rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-wait"
            >
                <MetamaskIcon className="w-6 h-6 mr-3" />
                {isConnecting ? 'Connecting...' : 'Sign in with MetaMask'}
            </button>
            {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}

            <div className="py-4 flex items-center">
                <div className="flex-grow border-t border-indigo-700"></div>
                <span className="flex-shrink mx-4 text-indigo-400 text-sm">Or sign in with</span>
                <div className="flex-grow border-t border-indigo-700"></div>
            </div>

            <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center py-3 px-4 font-semibold rounded-lg transition duration-300 bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                <GoogleIcon className="w-5 h-5 mr-3" />
                Sign in with Google
            </button>
            <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center justify-center py-3 px-4 font-semibold rounded-lg transition duration-300 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <FacebookIcon className="w-6 h-6 mr-2" />
                Sign in with Facebook
            </button>
            <button onClick={() => handleSocialLogin('Apple')} className="w-full flex items-center justify-center py-3 px-4 font-semibold rounded-lg transition duration-300 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                <AppleIcon className="w-6 h-6 mr-2" />
                Sign in with Apple
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
