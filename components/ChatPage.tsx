import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../App';
import { AppContextType, ChatConversation, ChatMessage, User } from '../types';
import Header from './Header';
import { PaperAirplaneIcon } from './Icons';

const ChatListItem: React.FC<{
    conversation: ChatConversation,
    onClick: () => void,
    isActive: boolean,
    currentUser: User
}> = ({ conversation, onClick, isActive, currentUser }) => {
    const otherUser = conversation.participants.find(p => p.id !== currentUser.id);
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!otherUser) return null;

    return (
        <button 
            onClick={onClick}
            className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${isActive ? 'bg-indigo-500/30' : 'hover:bg-gray-700/50'}`}
        >
            <img src={otherUser.avatar} alt={otherUser.name} className="w-12 h-12 rounded-full" />
            <div className="flex-grow overflow-hidden">
                <p className="font-semibold text-white truncate">{otherUser.name}</p>
                <p className="text-sm text-gray-400 truncate">{lastMessage?.content || 'No messages yet.'}</p>
            </div>
        </button>
    );
};

const ChatWindow: React.FC<{
    conversation: ChatConversation | null,
    currentUser: User,
    onSendMessage: (content: string) => void,
    onAcceptRequest: (conversationId: number) => void
}> = ({ conversation, currentUser, onSendMessage, onAcceptRequest }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation?.messages]);

    if (!conversation) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-400">Select a conversation to start chatting.</p>
            </div>
        );
    }
    
    const otherUser = conversation.participants.find(p => p.id !== currentUser.id);
    if (!otherUser) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };
    
    const isPendingRequest = conversation.status === 'pending' && conversation.participants[1].id === currentUser.id;

    return (
        <div className="flex-grow flex flex-col bg-gray-800/50 rounded-r-xl">
            {/* Header */}
            <div className="p-4 border-b border-indigo-500/20 flex items-center space-x-3">
                <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full" />
                <h3 className="font-bold text-lg text-white">{otherUser.name}</h3>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {isPendingRequest && (
                    <div className="bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 text-sm rounded-lg p-3 text-center">
                        <p>{otherUser.name} wants to connect with you.</p>
                        <div className="mt-2 space-x-2">
                             <button onClick={() => onAcceptRequest(conversation.id)} className="px-3 py-1 bg-green-600 rounded">Accept</button>
                             <button className="px-3 py-1 bg-red-600 rounded">Decline</button>
                        </div>
                    </div>
                )}
                {conversation.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.senderId === currentUser.id ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                            <p>{msg.content}</p>
                            <p className="text-xs opacity-60 mt-1 text-right">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </div>

            {/* Input */}
             <div className="p-4 border-t border-indigo-500/20">
                <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={isPendingRequest ? "Accept the request to reply" : "Type a message..."}
                        disabled={isPendingRequest}
                        className="w-full bg-gray-700 border-gray-600 rounded-full px-4 py-2 text-sm text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                    />
                    <button type="submit" disabled={isPendingRequest} className="p-2 bg-indigo-600 text-white rounded-full transition hover:bg-indigo-500 disabled:opacity-50">
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    )
}

const ChatPage: React.FC = () => {
    const { user, conversations, setConversations } = useContext(AppContext) as AppContextType;
    const [activeTab, setActiveTab] = useState<'inbox' | 'requests'>('inbox');
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);

    if (!user) return null;

    const inboxConversations = conversations.filter(c => c.status === 'active' && c.participants.some(p => p.id === user.id));
    const requestConversations = conversations.filter(c => c.status === 'pending' && c.participants[1].id === user.id);

    const conversationsToList = activeTab === 'inbox' ? inboxConversations : requestConversations;
    const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;

    const handleSendMessage = (content: string) => {
        if (!selectedConversationId) return;
        
        const newMessage: ChatMessage = {
            id: Date.now(),
            senderId: user.id,
            content,
            timestamp: 'Just now'
        };

        setConversations(prev => prev.map(conv =>
            conv.id === selectedConversationId
                ? { ...conv, messages: [...conv.messages, newMessage] }
                : conv
        ));
    };

    const handleAcceptRequest = (conversationId: number) => {
         setConversations(prev => prev.map(conv =>
            conv.id === conversationId
                ? { ...conv, status: 'active' }
                : conv
        ));
    };

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="container mx-auto p-4 md:p-8 flex-grow flex">
                <div className="w-full h-[calc(100vh-120px)] flex border border-indigo-500/30 rounded-xl shadow-2xl">
                    {/* Sidebar */}
                    <div className="w-1/3 max-w-sm border-r border-indigo-500/20 flex flex-col">
                        <div className="p-4 border-b border-indigo-500/20">
                            <h2 className="text-2xl font-bold text-white">Chats</h2>
                        </div>
                        <div className="flex p-1 bg-gray-900/50">
                            <button onClick={() => setActiveTab('inbox')} className={`flex-1 py-2 text-sm font-semibold rounded-md ${activeTab === 'inbox' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>
                                Caixa de Entrada ({inboxConversations.length})
                            </button>
                            <button onClick={() => setActiveTab('requests')} className={`flex-1 py-2 text-sm font-semibold rounded-md ${activeTab === 'requests' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>
                                Solicitações ({requestConversations.length})
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto p-2 space-y-1">
                            {conversationsToList.map(conv => (
                                <ChatListItem
                                    key={conv.id}
                                    conversation={conv}
                                    onClick={() => setSelectedConversationId(conv.id)}
                                    isActive={selectedConversationId === conv.id}
                                    currentUser={user}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Chat Window */}
                    <ChatWindow 
                        conversation={selectedConversation} 
                        currentUser={user} 
                        onSendMessage={handleSendMessage}
                        onAcceptRequest={handleAcceptRequest}
                    />
                </div>
            </main>
        </div>
    );
};

export default ChatPage;
