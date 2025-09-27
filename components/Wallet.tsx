
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, Transaction } from '../types';
import Header from './Header';
import { MetamaskIcon, ClipboardIcon, ArrowUpCircleIcon, ArrowDownCircleIcon } from './Icons';
import { LEVELS } from '../constants';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isEarn = transaction.type === 'earn';
    return (
        <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div className="flex items-center space-x-4">
                {isEarn ? (
                    <ArrowUpCircleIcon className="w-8 h-8 text-green-400" />
                ) : (
                    <ArrowDownCircleIcon className="w-8 h-8 text-red-400" />
                )}
                <div>
                    <p className="font-semibold text-white">{transaction.description}</p>
                    <p className="text-xs text-gray-400">{transaction.timestamp}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-bold ${isEarn ? 'text-green-400' : 'text-red-400'}`}>
                    {isEarn ? '+' : ''}{transaction.tokenAmount.toLocaleString()} SKILL
                </p>
            </div>
        </div>
    );
};

const Wallet: React.FC = () => {
    const { user, setUser, transactions } = useContext(AppContext) as AppContextType;
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    if (!user) return null;

    const connectWallet = async () => {
        setIsConnecting(true);
        setError(null);
        if (typeof window.ethereum !== 'undefined') {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            setUser(prevUser => {
                if (!prevUser) return null;
                return { ...prevUser, walletAddress: account };
            });
          } catch (err: any) {
            setError("User denied account access.");
            console.error(err);
          }
        } else {
          setError("Please install MetaMask to use this feature.");
        }
        setIsConnecting(false);
    };

    const handleCopy = () => {
        if (!user.walletAddress) return;
        navigator.clipboard.writeText(user.walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isConnected = user.walletAddress && user.walletAddress.length > 0;
    const totalTokensEarned = user.skills.reduce((acc, skill) => acc + skill.tokensEarned, 0);
    const currentLevel = [...LEVELS].reverse().find(level => totalTokensEarned >= level.minTokens) || LEVELS[0];

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">My Wallet</h1>
                        <p className="text-indigo-300">Track your earnings, progress, and connect your wallet.</p>
                    </div>
                    
                    <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-8 space-y-6">
                        {/* Account Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm">SKILL Balance</p>
                                <p className="text-4xl font-bold text-white">{user.tokens.toLocaleString()} SKILL</p>
                            </div>
                            <div className="md:text-right">
                                <p className="text-gray-400 text-sm">Level</p>
                                <p className="text-2xl font-bold text-purple-400">{currentLevel.name}</p>
                                <p className="text-indigo-300">Total Ganhos: {totalTokensEarned.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="border-t border-indigo-700/50"></div>

                        {/* Wallet Connection */}
                        <div>
                            {isConnected ? (
                                <div>
                                    <p className="text-sm text-green-400 font-semibold mb-2">WALLET CONNECTED</p>
                                    <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
                                        <div className="flex items-center space-x-3">
                                            <MetamaskIcon className="w-8 h-8" />
                                            <span className="text-lg text-white font-mono">
                                                {`${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`}
                                            </span>
                                        </div>
                                        <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors relative">
                                            <ClipboardIcon className="w-5 h-5" />
                                            {copied && <span className="text-xs text-green-400 absolute -top-6 right-0">Copied!</span>}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-4">
                                     <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
                                    <p className="text-gray-400 mb-4 max-w-sm mx-auto">
                                        Connect your MetaMask wallet to secure your assets and enable withdrawals.
                                    </p>
                                    <button
                                        onClick={connectWallet}
                                        disabled={isConnecting}
                                        className="w-full max-w-xs mx-auto flex items-center justify-center px-4 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        <MetamaskIcon className="w-6 h-6 mr-3" />
                                        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                                    </button>
                                    {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div>
                         <h2 className="text-2xl font-bold mb-4">Histórico de Atividades</h2>
                         <div className="space-y-3">
                            {transactions.map(tx => (
                                <TransactionItem key={tx.id} transaction={tx} />
                            ))}
                         </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Wallet;
