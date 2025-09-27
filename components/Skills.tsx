
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../App';
import { AppContextType, Skill } from '../types';
import Header from './Header';
import { SKILL_LEVELS } from '../constants';
import { AcademicCapIcon, Squares2X2Icon, BookOpenIcon, SparklesIcon } from './Icons';

type FilterType = 'all' | 'learning' | 'recommended' | 'design' | 'content' | 'technical' | 'business' | 'creative';

const MySkillCard: React.FC<{skill: Skill, tokensEarned: number}> = ({ skill, tokensEarned }) => {
    const currentLevel = [...SKILL_LEVELS].reverse().find(level => tokensEarned >= level.minTokens) || SKILL_LEVELS[0];

    return (
        <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="w-12 h-12 mx-auto mb-2 text-purple-400">
                <skill.icon className="w-full h-full" />
            </div>
            <h4 className="font-bold text-white">{skill.name}</h4>
            <p className="text-xs text-indigo-300">{currentLevel.name}</p>
            <p className="text-xs text-gray-400 mt-1">{tokensEarned} Ganhos</p>
        </div>
    );
};

const SkillCard: React.FC<{
    skill: Skill;
    userSkillTokensEarned: number | undefined;
    onStartLearning: (skillId: number) => void;
}> = ({ skill, userSkillTokensEarned, onStartLearning }) => {
    const isLearning = userSkillTokensEarned !== undefined;
    
    const currentLevel = isLearning ? [...SKILL_LEVELS].reverse().find(level => userSkillTokensEarned >= level.minTokens) || SKILL_LEVELS[0] : null;
    const nextLevel = isLearning ? SKILL_LEVELS.find(level => userSkillTokensEarned < level.minTokens) : null;
    
    const tokensForCurrentLevel = currentLevel?.minTokens ?? 0;
    const tokensForNextLevel = nextLevel?.minTokens ?? (currentLevel ? currentLevel.minTokens + 300 : 100);
    const levelProgress = isLearning ? ((userSkillTokensEarned - tokensForCurrentLevel) / (tokensForNextLevel - tokensForCurrentLevel)) * 100 : 0;

    const tagColors = {
        design: 'bg-pink-500/20 text-pink-300',
        content: 'bg-blue-500/20 text-blue-300',
        technical: 'bg-green-500/20 text-green-300',
        business: 'bg-yellow-500/20 text-yellow-300',
        creative: 'bg-red-500/20 text-red-300',
    };

    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-5 flex flex-col">
            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 text-indigo-400">
                     <skill.icon className="w-full h-full" />
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                        {isLearning && <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">{currentLevel?.name}</span>}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[skill.category]}`}>{skill.category}</span>
                </div>
            </div>
            <p className="text-sm text-gray-400 mt-3 flex-grow">{skill.description}</p>
            {isLearning && (
                <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full" style={{ width: `${levelProgress}%` }}></div>
                    </div>
                     <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                        <span>Progresso de Nível</span>
                        <span>{userSkillTokensEarned} / {tokensForNextLevel} Ganhos</span>
                    </div>
                </div>
            )}
            <div className="mt-4 border-t border-indigo-500/20 pt-4 flex items-center justify-between">
                 <div>
                    <p className="text-xs text-gray-400">Tarefas concluídas</p>
                    <p className="font-bold text-white">0</p>
                </div>
                 <div>
                    <p className="text-xs text-gray-400">Tokens ganhos</p>
                    <p className="font-bold text-white">0</p>
                </div>
                {isLearning ? (
                     <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-600/20 text-green-300 border border-green-500/50 hover:bg-green-600/40 transition-colors">
                        Continuar Aprendendo
                    </button>
                ) : (
                    <button 
                        onClick={() => onStartLearning(skill.id)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                        Começar a Aprender
                    </button>
                )}
            </div>
        </div>
    );
};


const Skills: React.FC = () => {
    const { user, setUser, skills: allSkills } = useContext(AppContext) as AppContextType;
    const [filter, setFilter] = useState<FilterType>('all');
    if (!user) return null;

    const mySkills = useMemo(() => {
        return user.skills
            .map(userSkill => ({
                ...userSkill,
                skillInfo: allSkills.find(s => s.id === userSkill.skillId)
            }))
            .filter(item => item.skillInfo)
            .sort((a, b) => b.tokensEarned - a.tokensEarned);
    }, [user.skills, allSkills]);

    const filteredSkills = useMemo(() => {
        switch (filter) {
            case 'all':
                return allSkills;
            case 'learning':
                return allSkills.filter(skill => mySkills.some(ms => ms.skillId === skill.id));
            case 'recommended':
                return allSkills.slice(0,3); // Mock recommendation
            case 'design':
            case 'content':
            case 'technical':
            case 'business':
            case 'creative':
                return allSkills.filter(skill => skill.category === filter);
            default:
                return allSkills;
        }
    }, [filter, allSkills, mySkills]);

    const startLearning = (skillId: number) => {
        if (!user.skills.some(s => s.skillId === skillId)) {
            setUser(prev => prev ? ({ ...prev, skills: [...prev.skills, { skillId, tokensEarned: 0 }] }) : null);
        }
    };
    
    const FilterButton: React.FC<{
        activeFilter: FilterType,
        targetFilter: FilterType,
        onClick: (filter: FilterType) => void,
        children: React.ReactNode
    }> = ({ activeFilter, targetFilter, onClick, children }) => (
        <button
            onClick={() => onClick(targetFilter)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg flex items-center space-x-2 transition-colors ${
                activeFilter === targetFilter
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
        >
            {children}
        </button>
    )

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-2">Centro de Habilidades</h1>
                <p className="text-indigo-300 mb-8">Desenvolva competências valiosas com apoio da IA.</p>

                {/* My Skills Section */}
                <section className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/50 rounded-xl p-6 mb-12">
                     <div className="flex items-center space-x-3 mb-4">
                        <AcademicCapIcon className="w-8 h-8 text-purple-300"/>
                        <h2 className="text-2xl font-bold text-white">Minhas Habilidades</h2>
                    </div>
                    {mySkills.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                           {mySkills.map(ms => ms.skillInfo && <MySkillCard key={ms.skillId} skill={ms.skillInfo} tokensEarned={ms.tokensEarned} />)}
                        </div>
                    ) : (
                         <p className="text-purple-200">Comece a aprender uma nova habilidade para vê-la aqui!</p>
                    )}
                </section>

                {/* Explore Skills */}
                <section>
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <input type="text" placeholder="Buscar habilidades..." className="flex-grow bg-gray-800 border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                        <div className="h-px w-full md:w-px md:h-8 bg-indigo-500/20 mx-2"></div>
                        <FilterButton activeFilter={filter} targetFilter="all" onClick={setFilter}><Squares2X2Icon className="w-5 h-5"/><span>Todas</span></FilterButton>
                        <FilterButton activeFilter={filter} targetFilter="learning" onClick={setFilter}><BookOpenIcon className="w-5 h-5"/><span>Aprendendo</span></FilterButton>
                        <FilterButton activeFilter={filter} targetFilter="recommended" onClick={setFilter}><SparklesIcon className="w-5 h-5"/><span>Recomendadas</span></FilterButton>
                        <div className="h-px w-full md:w-px md:h-8 bg-indigo-500/20 mx-2"></div>
                        <FilterButton activeFilter={filter} targetFilter="design" onClick={setFilter}><span>Design</span></FilterButton>
                        <FilterButton activeFilter={filter} targetFilter="technical" onClick={setFilter}><span>Técnicas</span></FilterButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSkills.map(skill => {
                            const userSkill = mySkills.find(s => s.skillId === skill.id);
                            return (
                                <SkillCard 
                                    key={skill.id} 
                                    skill={skill}
                                    userSkillTokensEarned={userSkill?.tokensEarned}
                                    onStartLearning={startLearning}
                                />
                            );
                        })}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Skills;
