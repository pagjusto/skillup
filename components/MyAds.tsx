import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../App';
import { AppContextType, Task } from '../types';
import Header from './Header';
import { LEVELS, SUBSCRIPTION_TIERS } from '../constants';
import { generateAIVideo } from '../services/geminiService';
import { FilmIcon } from './Icons';

interface ServiceAd {
    id: number;
    creatorId: number;
    title: string;
    description: string;
    price: number;
    skillId: number;
}

const MyAdCard: React.FC<{ 
    task: Task, 
    onStatusChange: (taskId: number, newStatus: Task['status']) => void,
    onViewInMarketplace: () => void 
}> = ({ task, onStatusChange, onViewInMarketplace }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const statusOptions: Task['status'][] = ['open', 'in_progress', 'completed'];

    const statusDisplayMap: Record<Task['status'], { text: string; classes: string }> = {
        open: { text: 'Open', classes: 'bg-green-500/20 text-green-300 hover:bg-green-500/40' },
        in_progress: { text: 'In Progress', classes: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/40' },
        completed: { text: 'Completed', classes: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/40' },
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
         <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-4 flex justify-between items-center">
            <div>
                <h4 className="font-bold text-white">{task.title}</h4>
                <p className="text-sm text-gray-400">{task.reward} SKILL Reward</p>
            </div>
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1 transition-colors ${statusDisplayMap[task.status].classes}`}
                >
                    <span>{statusDisplayMap[task.status].text}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-indigo-600/50 rounded-md shadow-lg z-10 py-1">
                        {statusOptions.map(status => (
                            <button
                                key={status}
                                onClick={() => {
                                    onStatusChange(task.id, status);
                                    setIsDropdownOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${task.status === status ? 'text-white bg-indigo-600/50' : 'text-gray-200 hover:bg-indigo-600/50'}`}
                            >
                                Set to: {statusDisplayMap[status].text}
                            </button>
                        ))}
                        <div className="border-t border-indigo-700/50 my-1"></div>
                        <button
                            onClick={() => {
                                onViewInMarketplace();
                                setIsDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-indigo-300 hover:bg-indigo-600/50"
                        >
                            Ver no Marketplace
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

const ServiceAdCard: React.FC<{ service: ServiceAd }> = ({ service }) => {
    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-4 flex justify-between items-center">
            <div>
                <h4 className="font-bold text-white">{service.title}</h4>
                <p className="text-sm text-gray-400">{service.description}</p>
            </div>
            <div className="text-right">
                <p className="font-bold text-green-400">{service.price} SKILL</p>
                <p className="text-xs text-gray-400">Preço</p>
            </div>
        </div>
    );
};

const loadingMessages = [
    'Inicializando o renderizador cósmico...',
    'Calibrando a matriz visual...',
    'Tecendo fótons em pixels...',
    'Consultando os oráculos da criatividade...',
    'Polindo os frames finais...',
    'Quase lá, a magia está acontecendo!'
];

const VideoGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('um holograma de néon de um gato dirigindo em alta velocidade');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // FIX: Use a browser-compatible type for the interval ID.
        let interval: ReturnType<typeof setTimeout>;
        if (isLoading) {
            let index = 0;
            setLoadingMessage(loadingMessages[index]);
            interval = setInterval(() => {
                index = (index + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[index]);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Por favor, insira uma descrição para o vídeo.');
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedVideoUrl(null);

        const videoUrl = await generateAIVideo(prompt);

        if (videoUrl) {
            setGeneratedVideoUrl(videoUrl);
        } else {
            setError('Falha ao gerar o vídeo. Por favor, tente novamente.');
        }
        setIsLoading(false);
    };
    
    const { setTitle } = useContext(AppContext) as any;

    const handleCreateTask = () => {
        // This is a mock function to demonstrate integration.
        // It would pre-fill the task creation form.
        alert("A funcionalidade para criar tarefa com este vídeo será implementada aqui!");
        setTitle(`Criar recurso de vídeo: ${prompt}`);
    };

    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
                <FilmIcon className="w-8 h-8 text-indigo-400" />
                <h2 className="text-2xl font-bold">Gerador de Vídeo com IA</h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">
                Descreva uma cena e a IA irá gerar um vídeo curto para você. Perfeito para criar recursos visuais para suas tarefas.
            </p>
            
            <div className="space-y-4">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: Um astronauta surfando em um anel de Saturno"
                    rows={3}
                    className="w-full bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-wait"
                >
                    {isLoading ? 'Gerando...' : 'Gerar Vídeo'}
                </button>
            </div>

            {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

            {isLoading && (
                <div className="mt-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
                    <p className="text-indigo-300 mt-4">{loadingMessage}</p>
                </div>
            )}

            {generatedVideoUrl && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Vídeo Gerado:</h3>
                    <video src={generatedVideoUrl} controls className="w-full rounded-lg" />
                    <div className="flex space-x-2 mt-4">
                        <a 
                            href={generatedVideoUrl} 
                            download="skillup_ai_video.mp4"
                            className="flex-1 text-center bg-gray-600 text-white font-semibold py-2 rounded-lg transition hover:bg-gray-500"
                        >
                            Baixar Vídeo
                        </a>
                         <button
                            onClick={handleCreateTask}
                            className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg transition hover:bg-green-500"
                        >
                            Criar Tarefa com este Vídeo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


const MyAds: React.FC = () => {
    const { user, tasks, setTasks, skills, setView } = useContext(AppContext) as AppContextType;
    const [activeTab, setActiveTab] = useState<'tasks' | 'services' | 'video'>('tasks');

    // State for Task Form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [reward, setReward] = useState('');
    const [requiredLevel, setRequiredLevel] = useState(0);
    const [requirements, setRequirements] = useState('');
    const [skillId, setSkillId] = useState(skills[0]?.id || 1);

    // State for Service Form
    const [serviceTitle, setServiceTitle] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [serviceSkillId, setServiceSkillId] = useState(skills[0]?.id || 1);
    const [serviceAds, setServiceAds] = useState<ServiceAd[]>([]);

    if (!user) return null;

    const userTierName = user.subscriptionTier === 'None' ? 'Non-Subscriber' : user.subscriptionTier;
    const userTier = SUBSCRIPTION_TIERS.find(tier => tier.name === userTierName) || SUBSCRIPTION_TIERS[0];
    const feePercentage = parseFloat(userTier.fee.replace('%', '')) / 100;
    const taskRewardValue = parseInt(reward, 10) || 0;
    const platformFee = taskRewardValue * feePercentage;
    const freelancerNetReward = taskRewardValue * (1 - feePercentage);

    const userAds = tasks.filter(task => task.creatorId === user.id);

    const handleStatusChange = (taskId: number, newStatus: Task['status']) => {
        setTasks(prevTasks => prevTasks.map(t => 
            t.id === taskId ? { ...t, status: newStatus } : t
        ));
    };

    const handleTaskSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTaskId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        
        const newTask: Task = {
            id: newTaskId,
            title,
            description,
            category,
            reward: parseInt(reward, 10),
            requiredLevel,
            requirements: requirements.split(',').map(req => req.trim()),
            creatorId: user.id,
            status: 'open',
            skillId,
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setTitle(''); setDescription(''); setCategory(''); setReward(''); setRequiredLevel(0); setRequirements(''); setSkillId(skills[0]?.id || 1);
    };

    const handleServiceSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newServiceAd: ServiceAd = {
            id: serviceAds.length > 0 ? Math.max(...serviceAds.map(s => s.id)) + 1 : 1,
            creatorId: user.id,
            title: serviceTitle,
            description: serviceDescription,
            price: parseInt(servicePrice, 10),
            skillId: serviceSkillId,
        };
        setServiceAds(prev => [...prev, newServiceAd]);
        setServiceTitle(''); setServiceDescription(''); setServicePrice(''); setServiceSkillId(skills[0]?.id || 1);
    };

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-2">Meus Anúncios</h1>
                <p className="text-indigo-300 mb-8">Crie e gerencie as tarefas que você oferece à comunidade.</p>
                
                <div className="flex space-x-2 border-b border-indigo-500/30 mb-8">
                    <button onClick={() => setActiveTab('tasks')} className={`px-4 py-2 font-semibold ${activeTab === 'tasks' ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400'}`}>
                        Tarefas que Publiquei
                    </button>
                    <button onClick={() => setActiveTab('services')} className={`px-4 py-2 font-semibold ${activeTab === 'services' ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400'}`}>
                        Serviços que Ofereço
                    </button>
                     <button onClick={() => setActiveTab('video')} className={`px-4 py-2 font-semibold ${activeTab === 'video' ? 'text-indigo-300 border-b-2 border-indigo-400' : 'text-gray-400'}`}>
                        Gerador de Vídeo com IA ✨
                    </button>
                </div>

                {activeTab === 'tasks' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 sticky top-24">
                                <h2 className="text-2xl font-bold mb-4">Publicar Nova Tarefa</h2>
                                <form onSubmit={handleTaskSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Título</label>
                                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descrição</label>
                                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Categoria</label>
                                            <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="reward" className="block text-sm font-medium text-gray-300">Recompensa (SKILL)</label>
                                            <input type="number" id="reward" value={reward} onChange={e => setReward(e.target.value)} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                                        </div>
                                    </div>
                                     {taskRewardValue > 0 && (
                                        <div className="bg-gray-900/50 p-3 rounded-md text-sm border border-indigo-900">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Taxa da plataforma ({userTier.fee})</span>
                                                <span className="text-red-400 font-medium">-{platformFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} SKILL</span>
                                            </div>
                                            <div className="flex justify-between mt-1 pt-1 border-t border-indigo-700/50">
                                                <span className="text-gray-300 font-semibold">O freelancer recebe</span>
                                                <span className="text-green-400 font-bold">{freelancerNetReward.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} SKILL</span>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="skill" className="block text-sm font-medium text-gray-300">Habilidade Relacionada</label>
                                        <select id="skill" value={skillId} onChange={e => setSkillId(parseInt(e.target.value))} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                                            {skills.map((skill) => <option key={skill.id} value={skill.id}>{skill.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-300">Requisitos (separados por vírgula)</label>
                                        <input type="text" id="requirements" value={requirements} onChange={e => setRequirements(e.target.value)} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="level" className="block text-sm font-medium text-gray-300">Nível Mínimo Requerido</label>
                                        <select id="level" value={requiredLevel} onChange={e => setRequiredLevel(parseInt(e.target.value))} className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                                            {LEVELS.map((level, index) => <option key={index} value={index}>{level.name}</option>)}
                                        </select>
                                    </div>
                                    <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg transition hover:bg-indigo-500">Publicar Tarefa</button>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold mb-4">Minhas Tarefas Publicadas</h2>
                            <div className="space-y-4">
                                {userAds.length > 0 ? (
                                    userAds.map(task => <MyAdCard key={task.id} task={task} onStatusChange={handleStatusChange} onViewInMarketplace={() => setView('dashboard')} />)
                                ) : (
                                    <p className="text-gray-400">Você ainda não publicou nenhuma tarefa.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'services' && (
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 sticky top-24">
                                <h2 className="text-2xl font-bold mb-4">Oferecer Novo Serviço</h2>
                                <form onSubmit={handleServiceSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="service-title" className="block text-sm font-medium text-gray-300">Título do Serviço</label>
                                        <input type="text" id="service-title" value={serviceTitle} onChange={e => setServiceTitle(e.target.value)} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="service-description" className="block text-sm font-medium text-gray-300">Descrição</label>
                                        <textarea id="service-description" value={serviceDescription} onChange={e => setServiceDescription(e.target.value)} required rows={3} className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                                    </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="service-skill" className="block text-sm font-medium text-gray-300">Habilidade Principal</label>
                                            <select id="service-skill" value={serviceSkillId} onChange={e => setServiceSkillId(parseInt(e.target.value))} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
                                                {skills.map((skill) => <option key={skill.id} value={skill.id}>{skill.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="service-price" className="block text-sm font-medium text-gray-300">Preço (SKILL)</label>
                                            <input type="number" id="service-price" value={servicePrice} onChange={e => setServicePrice(e.target.value)} required className="w-full mt-1 bg-gray-700 border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg transition hover:bg-purple-500">Oferecer Serviço</button>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold mb-4">Meus Serviços Oferecidos</h2>
                            <div className="space-y-4">
                                 {serviceAds.length > 0 ? (
                                    serviceAds.map(ad => <ServiceAdCard key={ad.id} service={ad} />)
                                ) : (
                                    <p className="text-gray-400">Você ainda não ofereceu nenhum serviço.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'video' && (
                    <VideoGenerator />
                )}
            </main>
        </div>
    );
};

export default MyAds;