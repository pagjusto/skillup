

import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, Task, User } from '../types';
import Header from './Header';
import AIFeedbackModal from './AIFeedbackModal';
import { LEVELS, MOCK_COMMUNITY_USERS } from '../constants';
import { ShareIcon } from './Icons';

const CollaborationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onInvite: (collaborator: User) => void;
    task: Task | null;
}> = ({ isOpen, onClose, onInvite, task }) => {
    const { user } = useContext(AppContext) as AppContextType;

    if (!isOpen || !task || !user) return null;

    const potentialCollaborators = MOCK_COMMUNITY_USERS.filter(
        (communityUser) => user.followingIds.includes(communityUser.id)
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-gray-800 border border-indigo-500/50 rounded-xl shadow-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold text-white mb-2">Collaborate on Task</h3>
                <p className="text-indigo-300 mb-4">Invite someone you follow to work on "{task.title}" with you. The rewards will be split equally.</p>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {potentialCollaborators.length > 0 ? (
                        potentialCollaborators.map(collaborator => (
                            <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <img src={collaborator.avatar} alt={collaborator.name} className="w-10 h-10 rounded-full" />
                                    <span className="font-medium text-white">{collaborator.name}</span>
                                </div>
                                <button
                                    onClick={() => onInvite(collaborator)}
                                    className="px-4 py-1 text-sm font-semibold bg-indigo-600 text-white rounded-lg transition hover:bg-indigo-500"
                                >
                                    Invite
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-4">You need to follow users to invite them for collaboration.</p>
                    )}
                </div>
                <button onClick={onClose} className="mt-6 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    Cancel
                </button>
            </div>
        </div>
    );
};

const TaskCard: React.FC<{ task: Task; onAccept: (task: Task) => void; onCollaborate: (task: Task) => void }> = ({ task, onAccept, onCollaborate }) => {
    const levelName = LEVELS[task.requiredLevel]?.name || 'Beginner';
    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-indigo-500/20 hover:border-indigo-500/50 hover:-translate-y-1">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">{task.category}</span>
                    <span className="text-xs text-gray-400">Level: {levelName}</span>
                </div>
                <h3 className="text-xl font-bold mt-4 text-white">{task.title}</h3>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">{task.description}</p>
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                        {task.requirements.map((req, index) => (
                            <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                {req}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <div className="text-lg font-bold text-green-400">
                    {task.reward} <span className="text-sm font-normal text-green-300">SKILL</span>
                </div>
                 <div className="flex items-center space-x-2">
                    <button
                        title="Collaborate"
                        onClick={() => onCollaborate(task)}
                        className="p-2 rounded-lg transition text-gray-400 bg-gray-700 hover:bg-indigo-600 hover:text-white"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => onAccept(task)}
                        className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
                        Accept Task
                    </button>
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const { tasks, user, setUser } = useContext(AppContext) as AppContextType;
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [earnedReward, setEarnedReward] = useState(0);
    const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
    const [taskToCollaborate, setTaskToCollaborate] = useState<Task | null>(null);

    const handleAcceptTask = (task: Task, collaborators: User[] = []) => {
        if (user && setUser) {
            const totalParticipants = 1 + collaborators.length;
            const rewardPerPerson = Math.floor(task.reward / totalParticipants);
            
            setEarnedReward(rewardPerPerson);

            setUser(prevUser => {
                if (!prevUser) return null;
                
                const tokensGained = rewardPerPerson;
                const updatedSkills = [...prevUser.skills];
                const skillIndex = updatedSkills.findIndex(s => s.skillId === task.skillId);

                if (skillIndex > -1) {
                    updatedSkills[skillIndex] = {
                        ...updatedSkills[skillIndex],
                        tokensEarned: updatedSkills[skillIndex].tokensEarned + tokensGained,
                    };
                } else {
                    updatedSkills.push({ skillId: task.skillId, tokensEarned: tokensGained });
                }

                return {
                    ...prevUser,
                    tokens: prevUser.tokens + tokensGained,
                    skills: updatedSkills,
                };
            });
            setSelectedTask({ ...task, collaborators });
            setIsModalOpen(true);
        }
    };

    const handleOpenCollabModal = (task: Task) => {
        setTaskToCollaborate(task);
        setIsCollabModalOpen(true);
    };

    const handleCloseCollabModal = () => {
        setIsCollabModalOpen(false);
        setTaskToCollaborate(null);
    };

    const handleInviteCollaborator = (collaborator: User) => {
        if (taskToCollaborate) {
            handleAcceptTask(taskToCollaborate, [collaborator]);
        }
        handleCloseCollabModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const openTasks = tasks.filter(task => task.status === 'open');

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-2">Task Marketplace</h1>
                <p className="text-indigo-300 mb-8">Find your next project and start earning.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {openTasks.map(task => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onAccept={handleAcceptTask} 
                            onCollaborate={handleOpenCollabModal}
                        />
                    ))}
                </div>
            </main>
            {isModalOpen && selectedTask && (
                <AIFeedbackModal 
                    task={selectedTask} 
                    onClose={handleCloseModal} 
                    earnedReward={earnedReward}
                />
            )}
            <CollaborationModal
                isOpen={isCollabModalOpen}
                onClose={handleCloseCollabModal}
                onInvite={handleInviteCollaborator}
                task={taskToCollaborate}
            />
        </div>
    );
};

export default Dashboard;
