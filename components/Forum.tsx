import React, { useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType, ForumPost } from '../types';
import Header from './Header';
import { ChatBubbleIcon } from './Icons';

const ForumPostCard: React.FC<{ post: ForumPost }> = ({ post }) => {
    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 transition-all duration-300 hover:shadow-indigo-500/20 hover:border-indigo-500/50 hover:-translate-y-1">
            <div className="flex items-start justify-between">
                <div>
                    <span className="text-sm font-semibold bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">{post.category}</span>
                    <h3 className="text-xl font-bold mt-3 text-white">{post.title}</h3>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                    <ChatBubbleIcon className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                </div>
            </div>
             <p className="text-gray-400 mt-3 text-sm leading-relaxed truncate">{post.content}</p>
            <div className="mt-4 pt-4 border-t border-indigo-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="text-sm font-semibold text-white">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                </div>
                <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                    Ver Post →
                </button>
            </div>
        </div>
    );
};

const Forum: React.FC = () => {
    const { forumPosts } = useContext(AppContext) as AppContextType;

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Community Forum</h1>
                        <p className="text-indigo-300">Share knowledge, ask questions, and connect with other creators.</p>
                    </div>
                    <button className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg transition hover:bg-indigo-500">
                        Create Post
                    </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {forumPosts.map(post => (
                        <ForumPostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Forum;
