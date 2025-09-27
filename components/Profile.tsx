
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, PortfolioItem as PortfolioItemType, Skill, UserSkill } from '../types';
import Header from './Header';
import { LEVELS, SUBSCRIPTION_TIERS, SKILL_LEVELS } from '../constants';
import { getAIPortfolioAdvice } from '../services/geminiService';
import { MetamaskIcon, ClipboardIcon, CameraIcon } from './Icons';

const SkillProgress: React.FC<{userSkill: UserSkill, allSkills: Skill[]}> = ({ userSkill, allSkills }) => {
    const skillInfo = allSkills.find(s => s.id === userSkill.skillId);
    if (!skillInfo) return null;

    const currentLevel = [...SKILL_LEVELS].reverse().find(level => userSkill.tokensEarned >= level.minTokens) || SKILL_LEVELS[0];
    const nextLevel = SKILL_LEVELS.find(level => userSkill.tokensEarned < level.minTokens);
    
    const tokensForCurrentLevel = currentLevel.minTokens;
    const tokensForNextLevel = nextLevel ? nextLevel.minTokens : currentLevel.minTokens + 300; // Arbitrary max for display
    const levelProgress = nextLevel ? ((userSkill.tokensEarned - tokensForCurrentLevel) / (tokensForNextLevel - tokensForCurrentLevel)) * 100 : 100;

    return (
        <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-baseline">
                <h5 className="font-bold text-white">{skillInfo.name}</h5>
                <span className="text-sm font-semibold text-indigo-300">{currentLevel.name}</span>
            </div>
            <div className="flex justify-between items-center mt-2 mb-1 text-xs">
                    <span className="font-medium text-gray-400">Level Progress</span>
                    <span className="text-indigo-400">{nextLevel ? `${userSkill.tokensEarned} / ${tokensForNextLevel} Ganhos` : `${userSkill.tokensEarned} Ganhos`}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full" style={{ width: `${levelProgress}%` }}></div>
            </div>
        </div>
    )
}

const UserStatsCard: React.FC = () => {
    const { user, setUser } = useContext(AppContext) as AppContextType;
    const [copied, setCopied] = useState(false);
    
    if (!user) return null;

    const totalTokensEarned = user.skills.reduce((acc, skill) => acc + skill.tokensEarned, 0);
    const currentLevel = [...LEVELS].reverse().find(level => totalTokensEarned >= level.minTokens) || LEVELS[0];
    const nextLevel = LEVELS.find(level => totalTokensEarned < level.minTokens);
    
    const tokensForCurrentLevel = currentLevel.minTokens;
    const tokensForNextLevel = nextLevel ? nextLevel.minTokens : currentLevel.minTokens;
    const levelProgress = nextLevel ? ((totalTokensEarned - tokensForCurrentLevel) / (tokensForNextLevel - tokensForCurrentLevel)) * 100 : 100;


    const handleCopy = () => {
        navigator.clipboard.writeText(user.walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAvatarChange = () => {
        if (setUser) {
            // Simulate file upload by getting a new random avatar
            const newAvatar = `https://i.pravatar.cc/150?u=${Date.now()}`;
            setUser(prev => prev ? { ...prev, avatar: newAvatar } : null);
        }
    };

    const handleCoverChange = () => {
        if (setUser) {
            // Simulate file upload by getting a new random cover
            const newCover = `https://picsum.photos/seed/${Date.now()}/1200/400`;
            setUser(prev => prev ? { ...prev, coverPhoto: newCover } : null);
        }
    };

    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl shadow-lg overflow-hidden">
            <div className="relative group h-48 md:h-64 bg-indigo-900">
                <img src={user.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                <button 
                    onClick={handleCoverChange}
                    aria-label="Change cover photo"
                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <CameraIcon className="w-5 h-5" />
                </button>
            </div>
            
            <div className="p-6">
                 <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-24 sm:-mt-20">
                     <div className="relative group flex-shrink-0">
                        <img src={user.avatar} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-gray-800" />
                        <button 
                            onClick={handleAvatarChange}
                            aria-label="Change avatar"
                            className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <CameraIcon className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0 sm:ml-6">
                        <h2 className="text-3xl font-bold">{user.name}</h2>
                        <p className="text-indigo-300">{currentLevel.name}</p>
                        {user.walletAddress && (
                            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2 bg-gray-900/50 rounded-full p-1 pr-3 max-w-max mx-auto sm:mx-0 relative">
                                <MetamaskIcon className="w-6 h-6" />
                                <span className="text-sm text-indigo-300 font-mono">
                                    {`${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`}
                                </span>
                                <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors">
                                <ClipboardIcon className="w-4 h-4" />
                                </button>
                                {copied && <span className="text-xs text-green-400 absolute -bottom-6 left-1/2 -translate-x-1/2">Copied!</span>}
                            </div>
                        )}
                    </div>
                     <div className="flex space-x-6 text-center mt-4 sm:mt-0">
                        <div>
                            <p className="text-2xl font-bold">{user.followers}</p>
                            <p className="text-sm text-gray-400">Followers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{user.following}</p>
                            <p className="text-sm text-gray-400">Following</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-indigo-700/50 pt-6">
                     <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="flex space-x-4 text-lg">
                            <div className="font-semibold text-green-400">{user.tokens.toLocaleString()} SKILL</div>
                            <div className="text-gray-400">|</div>
                            <div className="font-semibold text-purple-400">{totalTokensEarned.toLocaleString()} Total Ganhos</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-1 text-sm">
                            <span className="font-medium text-gray-300">Level Progress</span>
                            <span className="text-indigo-300">{nextLevel ? `${totalTokensEarned} / ${tokensForNextLevel} ` : 'Max Level'}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${levelProgress}%` }}></div>
                        </div>
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

const AIReviewModal: React.FC<{ advice: string; onClose: () => void }> = ({ advice, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
        <div className="bg-gray-800 border border-indigo-500/50 rounded-xl shadow-2xl p-6 w-full max-w-2xl prose prose-invert prose-p:text-gray-300 prose-headings:text-white" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4 text-indigo-400">AI Portfolio Coach</h3>
            <div dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, '<br />') }} />
            <button
                onClick={onClose}
                className="mt-6 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg transition hover:bg-indigo-500"
            >
                Close
            </button>
        </div>
    </div>
);


const Profile: React.FC = () => {
    const { user, portfolioItems, skills } = useContext(AppContext) as AppContextType;
    const [aiAdvice, setAiAdvice] = useState<string | null>(null);
    const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

    if (!user) return null;

    const userPortfolio = portfolioItems.filter(item => item.userId === user?.id);
    const userSkills = user.skills.sort((a,b) => b.tokensEarned - a.tokensEarned);

    const handleGetAdvice = async () => {
        setIsLoadingAdvice(true);
        const advice = await getAIPortfolioAdvice(userPortfolio);
        setAiAdvice(advice);
        setIsLoadingAdvice(false);
    };

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8 space-y-8">
                <UserStatsCard />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <section className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-3xl font-bold">My Portfolio</h3>
                             <button onClick={handleGetAdvice} disabled={isLoadingAdvice} className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition hover:bg-purple-500 disabled:opacity-50 disabled:cursor-wait">
                                {isLoadingAdvice ? 'Thinking...' : 'Get AI Portfolio Review'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {userPortfolio.map(item => <PortfolioItem key={item.id} item={item} />)}
                        </div>
                    </section>
                    
                    <section>
                        <h3 className="text-3xl font-bold mb-6">Habilidades</h3>
                        <div className="space-y-4">
                            {userSkills.map(userSkill => (
                                <SkillProgress key={userSkill.skillId} userSkill={userSkill} allSkills={skills} />
                            ))}
                        </div>
                    </section>
                </div>


                <section>
                    <h3 className="text-3xl font-bold mb-6">Subscription Tiers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SUBSCRIPTION_TIERS.map(tier => (
                            <div key={tier.name} className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 text-center">
                                <h4 className="text-xl font-bold text-indigo-300">{tier.name}</h4>
                                <p className="text-4xl font-extrabold my-4">{tier.fee} <span className="text-base font-normal text-gray-400">Platform Fee</span></p>
                                <p className="text-gray-400">{tier.price}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            {aiAdvice && <AIReviewModal advice={aiAdvice} onClose={() => setAiAdvice(null)} />}
        </div>
    );
};

export default Profile;
