import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../App';
import { AppContextType, View, Notification } from '../types';
import { ChatBubbleLeftRightIcon, BellIcon } from './Icons';

const LogoIcon = () => (
    <svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <defs>
            <linearGradient id='new-logo-gradient-header' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stopColor='#81D4FA'/>
                <stop offset='100%' stopColor='#A593E0'/>
            </linearGradient>
            <clipPath id='new-logo-clip-header'>
                <path d='M32,8 C19,8 12,18 12,31 C12,41 20,50 32,50 C44,50 52,41 52,31 C52,18 45,8 32,8 Z'/>
            </clipPath>
        </defs>
        <rect width='64' height='64' rx='12' fill='url(#new-logo-gradient-header)'/>
        <g transform='translate(4, 3) scale(0.9)'>
            <g stroke='#2b3544' stroke-width='2.5' stroke-linecap='round'>
                <path d='M22 13 L 19 10'/>
                <path d='M15 19 L 12 16'/>
                <path d='M12 28 L 8 28'/>
                <path d='M15 37 L 12 40'/>
                <path d='M42 13 L 45 10'/>
                <path d='M49 19 L 52 16'/>
                <path d='M52 28 L 56 28'/>
                <path d='M49 37 L 52 40'/>
            </g>
            <g stroke='#2b3544' stroke-width='2'>
                <rect x='22' y='54' width='20' height='4' rx='1' fill='#4c5a6f'/>
                <rect x='24' y='50' width='16' height='4' rx='1' fill='#3e4c5f'/>
                <rect x='26' y='46' width='12' height='4' rx='1' fill='#4c5a6f'/>
            </g>
            <g clip-path='url(#new-logo-clip-header)'>
                <path d='M32,8 C19,8 12,18 12,31 C12,41 20,50 32,50 V8Z' fill='#e5e7eb'/>
                <g stroke='#2b3544' stroke-width='1.8' fill='none' stroke-linecap='round'>
                    <path d='M20,18 C24,14 28,18 28,22'/>
                    <path d='M16,26 C20,30 28,30 30,26'/>
                    <path d='M18,34 C22,32 26,36 22,40'/>
                    <path d='M26,42 C22,44 18,46 20,42'/>
                    <path d='M28,32 C30,30 24,28 22,32'/>
                </g>
                <path d='M32,8 C45,8 52,18 52,31 C52,41 44,50 32,50 V8Z' fill='#facc15'/>
                <g stroke='#2b3544' stroke-width='2.5' stroke-linecap='round'>
                    <path d='M42,23 C39.5,23 39.5,27 42,27 S 44.5,27 44.5,31 C44.5,35 42,35 39.5,35'/>
                    <path d='M42 20V38'/>
                </g>
                <g fill='#fff'>
                    <path d='m48 14 1 3 3-1-2 2 2 2-3-1-1 3-1-3-3 1 2-2-2-2 3 1z' transform='scale(0.7) translate(15, 2)'/>
                    <path d='m37 43 .5 1.5 1.5-.5-1 1 1 1-1.5-.5-.5 1.5-.5-1.5-1.5.5 1-1-1-1 1.5.5z' transform='scale(0.7) translate(15, -12)' opacity='.8'/>
                </g>
            </g>
            <path d='M32,8 C19,8 12,18 12,31 C12,41 20,50 32,50 C44,50 52,41 52,31 C52,18 45,8 32,8 Z' stroke='#2b3544' stroke-width='2.5' fill='none'/>
            <path d='M32 8V50' stroke='#2b3544' stroke-width='2.5'/>
        </g>
    </svg>
);


const NavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
    <button 
        onClick={onClick}
        className={`text-base font-medium transition px-3 py-2 rounded-md ${
            isActive 
                ? 'bg-indigo-500/20 text-indigo-300' 
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
        }`}
    >
        {children}
    </button>
);


const Header: React.FC = () => {
    const { user, view, setView, logout, notifications, setNotifications } = useContext(AppContext) as AppContextType;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    
    const handleNavigation = (targetView: View) => {
        if (user || targetView === 'home' || targetView === 'login') {
            setView(targetView);
        } else {
            setView('login');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotificationClick = (notification: Notification) => {
        setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
        setView('dashboard');
        setIsNotificationsOpen(false);
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <header className="bg-gray-900/50 backdrop-blur-lg p-4 sticky top-0 z-50 border-b border-indigo-500/20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
                    <div className="w-8 h-8">
                         <LogoIcon />
                    </div>
                    <div className="text-xl font-bold tracking-wider text-white">
                        SkillUp & <span className="text-indigo-400">Earn</span>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-2 bg-gray-800/60 p-1 rounded-lg">
                    <NavLink onClick={() => handleNavigation('home')} isActive={view === 'home'}>Home</NavLink>
                    <NavLink onClick={() => handleNavigation('feed')} isActive={view === 'feed'}>Feed</NavLink>
                    <NavLink onClick={() => handleNavigation('dashboard')} isActive={view === 'dashboard'}>Marketplace</NavLink>
                    <NavLink onClick={() => handleNavigation('skills')} isActive={view === 'skills'}>Habilidades</NavLink>
                    <NavLink onClick={() => handleNavigation('myAds')} isActive={view === 'myAds'}>Meus Anúncios</NavLink>
                    <NavLink onClick={() => handleNavigation('store')} isActive={view === 'store'}>Loja</NavLink>
                    <NavLink onClick={() => handleNavigation('forum')} isActive={view === 'forum'}>Forum</NavLink>
                    <NavLink onClick={() => handleNavigation('profile')} isActive={view === 'profile'}>Portfolio</NavLink>
                    <NavLink onClick={() => handleNavigation('rewards')} isActive={view === 'rewards'}>Rewards</NavLink>
                </nav>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center">
                            <button
                                onClick={() => handleNavigation('wallet')}
                                className="bg-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/20 transition-colors mr-2"
                            >
                                {user.tokens.toLocaleString()} SKILL
                            </button>

                            {/* Notifications Button & Dropdown */}
                            <div className="relative" ref={notificationsRef}>
                                <button
                                    onClick={() => setIsNotificationsOpen(prev => !prev)}
                                    className="p-2 rounded-full text-gray-300 hover:bg-indigo-500/30 hover:text-white transition-colors relative"
                                    aria-label="Open Notifications"
                                >
                                    <BellIcon className="w-6 h-6" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-gray-900/80"></span>
                                    )}
                                </button>
                                {isNotificationsOpen && (
                                     <div className="absolute right-0 mt-3 w-80 max-h-96 flex flex-col bg-gray-800 border border-indigo-700/50 rounded-lg shadow-lg z-50">
                                         <div className="p-3 flex justify-between items-center border-b border-indigo-700/50 sticky top-0 bg-gray-800">
                                            <h4 className="font-bold text-white">Notificações</h4>
                                            {unreadCount > 0 && (
                                                <button onClick={markAllAsRead} className="text-xs text-indigo-400 hover:underline">Marcar todas como lidas</button>
                                            )}
                                        </div>
                                        {notifications.length > 0 ? (
                                            <div className="overflow-y-auto">
                                                {[...notifications].reverse().map(notification => (
                                                    <button 
                                                        key={notification.id}
                                                        onClick={() => handleNotificationClick(notification)}
                                                        className={`w-full text-left p-3 flex items-start space-x-2 hover:bg-indigo-600/50 transition-colors ${!notification.read ? 'bg-indigo-500/20' : ''}`}
                                                    >
                                                        {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>}
                                                        <div className={`flex-grow ${notification.read ? 'pl-4' : ''}`}>
                                                          <p className="text-sm text-gray-200">{notification.message}</p>
                                                          <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="p-4 text-sm text-gray-400 text-center">Nenhuma notificação.</p>
                                        )}
                                     </div>
                                )}
                            </div>

                            <button
                                onClick={() => handleNavigation('chat')}
                                className="p-2 rounded-full text-gray-300 hover:bg-indigo-500/30 hover:text-white transition-colors"
                                aria-label="Open Chats"
                            >
                                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                            </button>
                            
                            {/* Profile Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(prev => !prev)} className="ml-2">
                                    <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-500"/>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-gray-800 border border-indigo-700/50 rounded-lg shadow-lg py-1 z-50">
                                        <button
                                            onClick={() => { handleNavigation('profile'); setIsDropdownOpen(false); }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600/50 hover:text-white"
                                        >
                                            My Portfolio
                                        </button>
                                        <button
                                            onClick={() => { handleNavigation('wallet'); setIsDropdownOpen(false); }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600/50 hover:text-white"
                                        >
                                            Wallet
                                        </button>
                                        <div className="border-t border-indigo-700/50 my-1"></div>
                                        <button
                                            onClick={() => { logout(); setIsDropdownOpen(false); }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600/50 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setView('login')}
                            className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                        >
                            Conectar
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;