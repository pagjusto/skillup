
import React from 'react';
import { UserPlusIcon } from './components/Icons';
export interface User {
  id: number;
  name: string;
  avatar: string;
  coverPhoto: string;
  walletAddress: string;
  tokens: number;
  subscriptionTier: 'None' | 'Bronze' | 'Silver' | 'Gold';
  followers: number;
  following: number;
  followingIds: number[];
  skills: UserSkill[];
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  category: 'design' | 'content' | 'business' | 'technical' | 'creative';
  icon: React.FC<{className?: string}>;
}

export interface UserSkill {
  skillId: number;
  tokensEarned: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  reward: number;
  requiredLevel: number;
  requirements: string[];
  collaborators?: User[];
  creatorId: number;
  status: 'open' | 'in_progress' | 'completed';
  skillId: number;
}

export interface PortfolioItem {
  id: number;
  userId: number;
  title:string;
  description: string;
  imageUrl: string;
  taskCategory: string;
}

export interface FeedComment {
  id: number;
  author: User;
  content: string;
  timestamp: string;
}

export interface FeedPost {
  id: number;
  type: 'post';
  user: User;
  portfolioItem: PortfolioItem;
  timestamp: string;
  likes: number;
  comments: FeedComment[];
}

export interface StoreAnnouncement {
    id: number;
    type: 'announcement';
    product: StoreProduct;
    title: string;
    content: string;
    timestamp: string;
}

export type FeedItem = FeedPost | StoreAnnouncement;

export interface ForumComment {
  id: number;
  author: User;
  content: string;
  timestamp: string;
}

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: User;
  category: string;
  comments: ForumComment[];
  timestamp: string;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: number;
  participants: User[];
  messages: ChatMessage[];
  status: 'active' | 'pending';
}

export interface Transaction {
  id: number;
  type: 'earn' | 'spend';
  description: string;
  tokenAmount: number;
  timestamp: string;
}

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  taskId: number;
  timestamp: string;
}

export interface StorePlan {
  id: number;
  name: string;
  basePrice: number;
}

export interface StoreProduct {
  id: number;
  name: string;
  description: string;
  logoComponent: React.FC<{ className?: string }>;
  plans: StorePlan[];
  category: 'Software' | 'AI';
}

export type View = 'login' | 'dashboard' | 'profile' | 'home' | 'feed' | 'rewards' | 'forum' | 'userProfile' | 'chat' | 'wallet' | 'myAds' | 'skills' | 'store';

export interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  skills: Skill[];
  portfolioItems: PortfolioItem[];
  setPortfolioItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  feedItems: FeedItem[];
  forumPosts: ForumPost[];
  transactions: Transaction[];
  storeProducts: StoreProduct[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  conversations: ChatConversation[];
  setConversations: React.Dispatch<React.SetStateAction<ChatConversation[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}