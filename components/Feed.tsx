
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, FeedItem, FeedComment, FeedPost, StoreAnnouncement } from '../types';
import Header from './Header';
import { UserPlusIcon, HeartIcon, ChatBubbleIcon } from './Icons';
import { LEVELS } from '../constants';

const StoreAnnouncementCard: React.FC<{ item: StoreAnnouncement }> = ({ item }) => {
    const { setView } = useContext(AppContext) as AppContextType;
    const { product, title, content, timestamp } = item;
    const { logoComponent: LogoComponent } = product;

    return (
        <div className="bg-gradient-to-br from-indigo-800 to-purple-800/80 border border-indigo-500/50 rounded-xl overflow-hidden mb-8">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 p-2 bg-white/10 rounded-lg flex items-center justify-center">
                            <LogoComponent className="w-full h-full" />
                        </div>
                        <div>
                             <h3 className="text-xl font-bold text-white">{title}</h3>
                             <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
                        </div>
                    </div>
                    <span className="text-xs font-semibold bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">Patrocinado</span>
                </div>

                <p className="text-indigo-200 mt-1 text-sm">{content}</p>

                <div className="mt-6 text-right">
                     <button 
                        onClick={() => setView('store')}
                        className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg transition hover:bg-gray-200"
                    >
                        Ver Ofertas na Loja
                    </button>
                </div>
            </div>
        </div>
    );
};


const FeedPostCard: React.FC<{ item: FeedPost }> = ({ item }) => {
    const { user: postUser, portfolioItem, timestamp } = item;
    const { user: loggedInUser, setUser, setView, setSelectedUser } = useContext(AppContext) as AppContextType;
    
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likes);
    const [comments, setComments] = useState<FeedComment[]>(item.comments);
    const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
    const [newComment, setNewComment] = useState("");

    const isFollowing = loggedInUser ? loggedInUser.followingIds.includes(postUser.id) : false;

    const totalTokensEarned = postUser.skills.reduce((acc, skill) => acc + skill.tokensEarned, 0);
    const postUserLevel = [...LEVELS].reverse().find(level => totalTokensEarned >= level.minTokens) || LEVELS[0];


    const handleProfileClick = () => {
        setSelectedUser(postUser);
        setView('userProfile');
    };

    const handleFollow = () => {
        if (!loggedInUser || !setUser) return;

        setUser(prevUser => {
            if (!prevUser) return null;

            const alreadyFollowing = prevUser.followingIds.includes(postUser.id);
            
            if (alreadyFollowing) {
                // Unfollow
                return {
                    ...prevUser,
                    followingIds: prevUser.followingIds.filter(id => id !== postUser.id),
                    following: prevUser.following - 1
                };
            } else {
                // Follow
                return {
                    ...prevUser,
                    followingIds: [...prevUser.followingIds, postUser.id],
                    following: prevUser.following + 1
                };
            }
        });
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && loggedInUser) {
            const comment: FeedComment = {
                id: Date.now(),
                author: loggedInUser,
                content: newComment.trim(),
                timestamp: 'Just now',
            };
            setComments(prev => [...prev, comment]);
            setNewComment("");
        }
    };


    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl overflow-hidden mb-8">
            <div className="p-4 flex justify-between items-center">
                <button onClick={handleProfileClick} className="flex items-center space-x-3 text-left">
                    <img src={postUser.avatar} alt={postUser.name} className="w-12 h-12 rounded-full border-2 border-indigo-600" />
                    <div>
                        <p className="font-bold text-white">{postUser.name}</p>
                        <p className="text-xs text-indigo-300">{postUserLevel.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
                    </div>
                </button>
                {loggedInUser && postUser.id !== loggedInUser.id && (
                    <button 
                        onClick={handleFollow}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition ${
                            isFollowing 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-500'
                        }`}
                    >
                        <UserPlusIcon className="w-4 h-4" />
                        <span>{isFollowing ? 'Following' : 'Follow'}</span>
                    </button>
                )}
            </div>
            
            <img src={portfolioItem.imageUrl} alt={portfolioItem.title} className="w-full h-auto object-cover" />
            
            <div className="p-4">
                <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">{portfolioItem.taskCategory}</span>
                <h3 className="text-xl font-bold mt-3 text-white">{portfolioItem.title}</h3>
                <p className="text-gray-400 mt-1 text-sm">{portfolioItem.description}</p>
            </div>
            
            <div className="px-4 py-2 border-t border-indigo-500/20 flex items-center space-x-6">
                <button onClick={handleLike} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <HeartIcon className={`w-6 h-6 ${isLiked ? 'text-red-500' : ''}`} isFilled={isLiked} />
                    <span className="font-semibold text-sm">{likeCount}</span>
                </button>
                <button onClick={() => setIsCommentSectionOpen(prev => !prev)} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <ChatBubbleIcon className="w-6 h-6" />
                    <span className="font-semibold text-sm">{comments.length}</span>
                </button>
            </div>

            {isCommentSectionOpen && (
                <div className="p-4 bg-gray-900/50">
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex items-start space-x-3">
                                <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
                                <div className="bg-gray-700/60 rounded-lg p-2 flex-1">
                                    <p className="text-sm font-semibold text-white">{comment.author.name}</p>
                                    <p className="text-sm text-gray-300">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleAddComment} className="mt-4 flex items-center space-x-2">
                         <img src={loggedInUser?.avatar} alt="Your avatar" className="w-8 h-8 rounded-full" />
                         <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full bg-gray-700 border-gray-600 rounded-full px-4 py-2 text-sm text-white focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button type="submit" className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-full transition hover:bg-indigo-500">Post</button>
                    </form>
                </div>
            )}
        </div>
    );
};


const Feed: React.FC = () => {
    const { feedItems } = useContext(AppContext) as AppContextType;

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Community Feed</h1>
                    {feedItems.map(item => {
                        if (item.type === 'announcement') {
                            return <StoreAnnouncementCard key={item.id} item={item} />;
                        } else {
                            return <FeedPostCard key={item.id} item={item} />;
                        }
                    })}
                </div>
            </main>
        </div>
    );
};

export default Feed;
