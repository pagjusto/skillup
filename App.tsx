
import React, { useState, useMemo, useEffect } from 'react';
import { AppContextType, User, PortfolioItem, Task, FeedItem, ForumPost, View, ChatConversation, Transaction, Skill, Notification, StoreProduct } from './types';
import { MOCK_TASKS, ALL_PORTFOLIO_ITEMS, MOCK_FEED_ITEMS, MOCK_FORUM_POSTS, MOCK_USER, MOCK_CONVERSATIONS, MOCK_TRANSACTIONS, MOCK_SKILLS, LEVELS, MOCK_STORE_PRODUCTS } from './constants';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Home from './components/Home';
import Feed from './components/Feed';
import Rewards from './components/Rewards';
import Forum from './components/Forum';
import UserProfilePage from './components/UserProfilePage';
import ChatPage from './components/ChatPage';
import Wallet from './components/Wallet';
import MyAds from './components/MyAds';
import Skills from './components/Skills';
import Store from './components/Store';


export const AppContext = React.createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('home');
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [skills] = useState<Skill[]>(MOCK_SKILLS);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(ALL_PORTFOLIO_ITEMS);
  const [feedItems] = useState<FeedItem[]>(MOCK_FEED_ITEMS);
  const [forumPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [storeProducts] = useState<StoreProduct[]>(MOCK_STORE_PRODUCTS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<ChatConversation[]>(MOCK_CONVERSATIONS);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if ((window as any).ethereum && user && user.walletAddress) {
        try {
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0 && accounts[0] === user.walletAddress) {
            console.log("Found an authorized account:", accounts[0]);
          } else {
             // Wallet is connected to a different account, or user logged out from Metamask
            setUser(prev => prev ? ({ ...prev, walletAddress: '' }) : null);
            console.log("No authorized account found or account mismatch");
          }
        } catch (error) {
          console.error("Error checking for wallet connection:", error);
        }
      }
    };
    checkWalletConnection();
  }, [user]);

  useEffect(() => {
    if (user) {
      const totalTokensEarned = user.skills.reduce((acc, skill) => acc + skill.tokensEarned, 0);
      // Find user's current level index
      const userLevel = [...LEVELS].reverse().find(level => totalTokensEarned >= level.minTokens) || LEVELS[0];
      const userLevelIndex = LEVELS.indexOf(userLevel);

      // Find tasks the user qualifies for that they haven't been notified about yet
      const qualifiedTasks = MOCK_TASKS.filter(task => task.status === 'open' && task.requiredLevel <= userLevelIndex);
      
      setNotifications(prevNotifications => {
          const existingNotificationTaskIds = new Set(prevNotifications.map(n => n.taskId));
          const newNotifications: Notification[] = qualifiedTasks
              .filter(task => !existingNotificationTaskIds.has(task.id))
              .map(task => ({
                  id: Date.now() + task.id, // A more unique ID
                  taskId: task.id,
                  message: `Nova tarefa disponível: '${task.title}'`,
                  read: false,
                  timestamp: 'agora mesmo'
              }));
          
          return [...prevNotifications, ...newNotifications];
      });
    }
  }, [user]);


  const logout = () => {
    setUser(null);
    setView('home');
    setNotifications([]);
    console.log("User logged out.");
  };

  const contextValue = useMemo(() => ({
    user,
    setUser,
    view,
    setView,
    tasks,
    setTasks,
    skills,
    portfolioItems,
    setPortfolioItems,
    feedItems,
    forumPosts,
    transactions,
    storeProducts,
    selectedUser,
    setSelectedUser,
    logout,
    conversations,
    setConversations,
    notifications,
    setNotifications,
  }), [user, view, tasks, skills, portfolioItems, feedItems, forumPosts, transactions, storeProducts, selectedUser, conversations, notifications]);

  const renderView = () => {
    switch (view) {
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'dashboard':
        return user ? <Dashboard /> : <Login />;
      case 'profile':
        return user ? <Profile /> : <Login />;
      case 'skills':
        return user ? <Skills /> : <Login />;
      case 'feed':
        return user ? <Feed /> : <Login />;
      case 'rewards':
        return user ? <Rewards /> : <Login />;
      case 'forum':
        return user ? <Forum /> : <Login />;
      case 'userProfile':
        return user ? <UserProfilePage /> : <Login />;
      case 'chat':
        return user ? <ChatPage /> : <Login />;
      case 'wallet':
        return user ? <Wallet /> : <Login />;
      case 'myAds':
        return user ? <MyAds /> : <Login />;
      case 'store':
        return user ? <Store /> : <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
        {renderView()}
      </div>
    </AppContext.Provider>
  );
};

export default App;
