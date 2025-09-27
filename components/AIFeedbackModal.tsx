

import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { getAITaskFeedback } from '../services/geminiService';

interface AIFeedbackModalProps {
  task: Task;
  onClose: () => void;
  earnedReward: number;
}

const AIFeedbackModal: React.FC<AIFeedbackModalProps> = ({ task, onClose, earnedReward }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      const aiFeedback = await getAITaskFeedback(task);
      setFeedback(aiFeedback);
      setIsLoading(false);
    };

    fetchFeedback();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);
  
  const formattedFeedback = feedback
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold text-indigo-300 mt-4 mb-2">$1</h3>')
    .replace(/## (.*?)\n/g, '<h2 class="text-xl font-bold text-indigo-300 mt-4 mb-2">$1</h2>')
    .replace(/\n/g, '<br />');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="bg-gray-800 border border-indigo-500/50 rounded-xl shadow-2xl p-6 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Task Completed!</h2>
          <p className="text-green-400 mt-1">+{earnedReward} SKILL Earned</p>
          {task.collaborators && task.collaborators.length > 0 && (
             <p className="text-sm text-indigo-300 mt-1">Profit split with {task.collaborators.map(c => c.name).join(', ')}.</p>
          )}
        </div>

        <div className="my-6 h-px bg-indigo-700"></div>

        <h3 className="text-xl font-semibold text-indigo-400 mb-4">AI Mentor Feedback</h3>
        <div className="bg-gray-900/50 p-4 rounded-lg max-h-64 overflow-y-auto prose prose-invert prose-p:text-gray-300">
          {isLoading ? (
            <div className="flex items-center justify-center h-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
                <p className="ml-3 text-indigo-300">Your AI Mentor is thinking...</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: formattedFeedback }} />
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white font-semibold px-8 py-2 rounded-lg transition hover:bg-indigo-500"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIFeedbackModal;
