
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, PortfolioItem as PortfolioItemType, User, Skill, UserSkill } from '../types';
import Header from './Header';
import { LEVELS, MOCK_COMMUNITY_USERS, SKILL_LEVELS } from '../constants';
import { UserPlusIcon } from './Icons';
import { ChatBubbleLeftRightIcon } from './Icons';

const SkillProgress: React.FC<{userSkill: UserSkill, allSkills: Skill[]}> = ({ userSkill, allSkills }) => {
    const skillInfo = allSkills.find(s => s.id === userSkill.skillId);
    if (!skillInfo) return null;

    const currentLevel = [...SKILL_LEVELS].reverse().find(level => userSkill.tokensEarned >= level.minTokens) || SKILL_LEVELS[0];
    const nextLevel = SKILL_LEVELS.find(level => userSkill.tokensEarned < level.minTokens);
    
    const tokensForCurrentLevel = currentLevel.minTokens;
    const tokensForNextLevel = nextLevel ? nextLevel.minTokens : currentLevel.minTokens + 300; // Arbitrary max for display
    const levelProgress = nextLevel ? ((userSkill.tokensEarned - tokensForCurrentLevel) / (tokensForNextLevel - tokensForCurrentLevel)) * 100 : 100;

    return (
        <div className="bg-gray-900/50 p-3 rounded-lg">
            <div className="flex justify-between items-baseline">
                <h5 className="font-semibold text-white">{skillInfo.name}</h5>
                <span className="text-xs font-semibold text-indigo-300">{currentLevel.name}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full" style={{ width: `${levelProgress}%` }}></div>
            </div>
        </div>
    )
}


const UserProfileStatsCard: React.FC<{ profileUser: User }> = ({ profileUser }) => {
    const { user, setUser, setView, conversations, setConversations } = useContext(AppContext) as AppContextType;
    const totalTokensEarned = profileUser.skills.reduce((acc, skill) => acc + skill.tokensEarned, 0);
    const currentLevel = [...LEVELS].reverse().find(level => totalTokensEarned >= level.minTokens) || LEVELS[0];
    
    if (!user) return null;

    const isFollowing = user.followingIds.includes(profileUser.id);

    const handleFollow = () => {
        // This is a mock implementation. In a real app, this would be an API call.
        setUser(prevUser => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                followingIds: [...prevUser.followingIds, profileUser.id]
            };
        });
    };

    const handleMessage = () => {
        const existingConversation = conversations.find(c =>
            c.participants.some(p => p.id === user.id) &&
            c.participants.some(p => p.id === profileUser.id)
        );

        if (existingConversation) {
            setView('chat');
            return;
        }

        const isMutual = profileUser.followingIds.includes(user.id);

        const newConversation = {
            id: Date.now(),
            participants: [user, profileUser],
            messages: [],
            status: isMutual ? 'active' : 'pending' as 'active' | 'pending',
        };

        setConversations(prev => [...prev, newConversation]);
        setView('chat');
    };


    return (
         <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-48 md:h-64 bg-indigo-900">
                <img src={profileUser.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
                <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-24 sm:-mt-20">
                    <div className="relative flex-shrink-0">
                        <img src={profileUser.avatar} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-gray-800" />
                    </div>

                    <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0 sm:ml-6">
                        <h2 className="text-3xl font-bold">{profileUser.name}</h2>
                        <p className="text-indigo-300">{currentLevel.name}</p>
                        <div className="mt-3 font-semibold text-purple-400">{totalTokensEarned.toLocaleString()} Total Ganhos</div>
                    </div>
                    
                    <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                        <div className="flex space-x-6 text-center">
                            <div>
                                <p className="text-2xl font-bold">{profileUser.followers}</p>
                                <p className="text-sm text-gray-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{profileUser.following}</p>
                                <p className="text-sm text-gray-400">Following</p>
                            </div>
                        </div>
                        {isFollowing ? (
                            <button onClick={handleMessage} className="flex items-center space-x-2 px-6 py-3 text-md font-semibold bg-green-600 text-white rounded-lg transition hover:bg-green-500">
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                <span>Message</span>
                            </button>
                        ) : (
                            <button onClick={handleFollow} className="flex items-center space-x-2 px-6 py-3 text-md font-semibold bg-indigo-600 text-white rounded-lg transition hover:bg-indigo-500">
                                <UserPlusIcon className="w-5 h-5" />
                                <span>Follow</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PortfolioItem: React.FC<{ item: PortfolioItemType }> = ({ item }) => (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-indigo-500/20 group">
        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="p-4">
            <h4 className="font-bold text-lg">{item.title}</h4>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
        </div>
    </div>
);

const UserListItem: React.FC<{user: User}> = ({ user }) => (
    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
        <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <span className="font-medium text-white">{user.name}</span>
        </div>
        <button className="px-4 py-1 text-sm font-semibold bg-indigo-600/80 text-white rounded-lg transition hover:bg-indigo-500">
            Follow
        </button>
    </div>
)

const UserProfilePage: React.FC = () => {
    const { selectedUser, portfolioItems, setView, skills } = useContext(AppContext) as AppContextType;
    const [activeTab, setActiveTab] = useState<'portfolio' | 'skills' | 'followers' | 'following'>('portfolio');

    if (!selectedUser) {
        return (
            <div>
                <Header />
                <main className="container mx-auto p-8 text-center">
                    <h1 className="text-2xl text-red-400">User not found.</h1>
                    <button onClick={() => setView('feed')} className="mt-4 text-indigo-400">Return to Feed</button>
                </main>
            </div>
        );
    }

    const userPortfolio = portfolioItems.filter(item => item.userId === selectedUser.id);
    const userSkills = selectedUser.skills.sort((a,b) => b.tokensEarned - a.tokensEarned);
    // Mock data for followers/following
    const followers = MOCK_COMMUNITY_USERS.slice(0, 2);
    const following = MOCK_COMMUNITY_USERS.slice(2, 4);

    const renderContent = () => {
        switch(activeTab) {
            case 'portfolio':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userPortfolio.length > 0 ? (
                            userPortfolio.map(item => <PortfolioItem key={item.id} item={item} />)
                        ) : (
                            <p className="text-gray-400 col-span-full">This user hasn't added any portfolio items yet.</p>
                        )}
                    </div>
                );
            case 'skills':
                 return (
                    <div className="max-w-2xl mx-auto space-y-3">
                         {userSkills.length > 0 ? (
                            userSkills.map(userSkill => <SkillProgress key={userSkill.skillId} userSkill={userSkill} allSkills={skills} />)
                        ) : (
                            <p className="text-gray-400">This user hasn't started developing any skills yet.</p>
                        )}
                    </div>
                );
            case 'followers':
                 return (
                    <div className="max-w-md mx-auto space-y-3">
                        {followers.map(user => <UserListItem key={user.id} user={user} />)}
                    </div>
                );
            case 'following':
                 return (
                    <div className="max-w-md mx-auto space-y-3">
                         {following.map(user => <UserListItem key={user.id} user={user} />)}
                    </div>
                );
        }
    }

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8 space-y-8">
                <UserProfileStatsCard profileUser={selectedUser} />
                
                <nav className="flex justify-center border-b border-indigo-500/30">
                    <button onClick={() => setActiveTab('portfolio')} className={`px-6 py-3 font-semibold ${activeTab === 'portfolio' ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Portfolio</button>
                    <button onClick={() => setActiveTab('skills')} className={`px-6 py-3 font-semibold ${activeTab === 'skills' ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Habilidades</button>
                    <button onClick={() => setActiveTab('followers')} className={`px-6 py-3 font-semibold ${activeTab === 'followers' ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Followers</button>
                    <button onClick={() => setActiveTab('following')} className={`px-6 py-3 font-semibold ${activeTab === 'following' ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Following</button>
                </nav>

                <section>
                   {renderContent()}
                </section>
            </main>
        </div>
    );
};

export default UserProfilePage;
