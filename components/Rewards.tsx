
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType, User } from '../types';
import Header from './Header';
import { LEVELS, MOCK_COMMUNITY_USERS } from '../constants';
import { CheckBadgeIcon, SparklesIcon } from './Icons';

const calculateTotalTokensEarned = (u: User) => u.skills.reduce((total, skill) => total + skill.tokensEarned, 0);

const UserStatsCard: React.FC = () => {
    const { user } = useContext(AppContext) as AppContextType;
    if (!user) return null;

    const totalTokensEarned = calculateTotalTokensEarned(user);
    const currentLevel = [...LEVELS].reverse().find(level => totalTokensEarned >= level.minTokens) || LEVELS[0];
    const nextLevel = LEVELS.find(level => totalTokensEarned < level.minTokens);
    
    const tokensForCurrentLevel = currentLevel.minTokens;
    const tokensForNextLevel = nextLevel ? nextLevel.minTokens : currentLevel.minTokens;
    const levelProgress = nextLevel ? ((totalTokensEarned - tokensForCurrentLevel) / (tokensForNextLevel - tokensForCurrentLevel)) * 100 : 100;

    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-6">
                <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full border-4 border-indigo-500" />
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-indigo-300">{currentLevel.name}</p>
                </div>
                 <div className="font-semibold text-xl text-purple-400">{totalTokensEarned.toLocaleString()} Ganhos Totais</div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium text-gray-300">Level Progress</span>
                    <span className="text-indigo-300">{nextLevel ? `${totalTokensEarned} / ${tokensForNextLevel}` : 'Max Level'}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${levelProgress}%` }}></div>
                </div>
            </div>
        </div>
    );
};

const Badge: React.FC<{ title: string, description: string, locked?: boolean }> = ({ title, description, locked }) => (
    <div className={`bg-gray-800/50 border border-indigo-500/30 rounded-xl p-4 text-center flex flex-col items-center justify-center transition-opacity ${locked ? 'opacity-40' : ''}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${locked ? 'bg-gray-700' : 'bg-indigo-500/20'}`}>
           {locked ? <span className="text-3xl">?</span> : <CheckBadgeIcon />}
        </div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
);

const LeaderboardItem: React.FC<{ user: User, rank: number }> = ({ user, rank }) => {
    const totalTokensEarned = calculateTotalTokensEarned(user);
    return (
        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-4">
                <span className="font-bold text-lg text-indigo-300 w-6 text-center">{rank}</span>
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <span className="font-medium text-white">{user.name}</span>
            </div>
            <span className="font-semibold text-purple-400">{totalTokensEarned.toLocaleString()} Progresso</span>
        </div>
    );
};

const Rewards: React.FC = () => {
    const { user } = useContext(AppContext) as AppContextType;
    const leaderboardUsers = [MOCK_COMMUNITY_USERS[2], MOCK_COMMUNITY_USERS[0], user, MOCK_COMMUNITY_USERS[1]]
        .filter((u): u is User => u !== null)
        .sort((a, b) => calculateTotalTokensEarned(b) - calculateTotalTokensEarned(a));

    const totalTokensEarned = user ? calculateTotalTokensEarned(user) : 0;

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8 space-y-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Rewards & Gamification</h1>
                    <p className="text-indigo-300">Complete tasks, earn tokens, and unlock new levels and badges.</p>
                </div>

                <UserStatsCard />

                <section>
                    <h3 className="text-3xl font-bold mb-6">Níveis de Habilidade</h3>
                    <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-4 space-y-4">
                        {LEVELS.map((level, index) => {
                            const isUnlocked = user ? totalTokensEarned >= level.minTokens : false;
                            const isCurrent = user ? ([...LEVELS].reverse().find(l => totalTokensEarned >= l.minTokens) || LEVELS[0]).name === level.name : false;
                            return (
                                <div key={index} className={`flex items-center justify-between p-4 rounded-lg transition-all ${isCurrent ? 'bg-indigo-500/30 border-l-4 border-indigo-400' : 'bg-gray-900/50'} ${!isUnlocked ? 'opacity-60' : ''}`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isUnlocked ? 'bg-indigo-500/30 text-indigo-200' : 'bg-gray-700 text-gray-400'}`}>
                                            {index}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{level.name}</h4>
                                            <p className="text-sm text-gray-400">Requer {level.minTokens.toLocaleString()} Ganhos Totais</p>
                                        </div>
                                    </div>
                                    <div>
                                        {isCurrent && <span className="text-xs font-semibold bg-indigo-500 text-white px-3 py-1 rounded-full">Seu Nível</span>}
                                        {!isCurrent && isUnlocked && <span className="text-green-400">✓</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h3 className="text-3xl font-bold mb-6">My Badges</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <Badge title="First Task" description="Complete your first task" />
                        <Badge title="Task Master" description="Complete 10 tasks" />
                        <Badge title="Specialist" description="Complete 5 tasks in one category" locked />
                        <Badge title="Wealthy" description="Earn 1,000 SKILL" locked />
                        <Badge title="Top Earner" description="Be in the Top 10 rank" locked />
                        <Badge title="Visionary" description="Reach 'Arquiteto da Visão Cósmica'" locked />
                    </div>
                </section>
                
                <section>
                    <h3 className="text-3xl font-bold mb-6">Community Ranking</h3>
                    <div className="space-y-3">
                       {leaderboardUsers.map((u, index) => (
                           <LeaderboardItem key={u.id} user={u} rank={index + 1} />
                       ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Rewards;
