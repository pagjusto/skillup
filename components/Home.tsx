import React, { useContext } from 'react';
import Header from './Header';
import { AppContext } from '../App';
import { AppContextType } from '../types';
import { UserGroupIcon, CheckBadgeIcon, SparklesIcon, CurrencyDollarIcon, CubeTransparentIcon, ShieldCheckIcon, ScaleIcon } from './Icons';

const StatCard: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl flex-1 text-center border border-indigo-500/20">
        <div className="text-indigo-400 mb-2">{icon}</div>
        <div className="text-4xl font-bold text-white">{value}</div>
        <div className="text-gray-400 mt-1">{label}</div>
    </div>
);

const InfoCard: React.FC<{ title: string; text: string; icon: React.ReactNode }> = ({ title, text, icon }) => (
    <div className="bg-indigo-900/50 p-6 rounded-lg flex-1">
        <div className="flex items-center space-x-3">
            <div className="text-indigo-300">{icon}</div>
            <h4 className="font-semibold text-white">{title}</h4>
        </div>
        <p className="text-indigo-200 mt-2">{text}</p>
    </div>
);

const LogoIcon = () => (
    <svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
        <defs>
            <linearGradient id='new-logo-gradient-home' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stopColor='#81D4FA' />
                <stop offset='100%' stopColor='#A593E0' />
            </linearGradient>
            <clipPath id='new-logo-clip-home'>
                <path d='M32,8 C19,8 12,18 12,31 C12,41 20,50 32,50 C44,50 52,41 52,31 C52,18 45,8 32,8 Z' />
            </clipPath>
        </defs>
        <rect width='64' height='64' rx='12' fill='url(#new-logo-gradient-home)' />
        <g transform='translate(4, 3) scale(0.9)'>
            <g stroke='#2b3544' stroke-width='2.5' stroke-linecap='round'>
                <path d='M22 13 L 19 10' />
                <path d='M15 19 L 12 16' />
                <path d='M12 28 L 8 28' />
                <path d='M15 37 L 12 40' />
                <path d='M42 13 L 45 10' />
                <path d='M49 19 L 52 16' />
                <path d='M52 28 L 56 28' />
                <path d='M49 37 L 52 40' />
            </g>
            <g stroke='#2b3544' stroke-width='2'>
                <rect x='22' y='54' width='20' height='4' rx='1' fill='#4c5a6f' />
                <rect x='24' y='50' width='16' height='4' rx='1' fill='#3e4c5f' />
                <rect x='26' y='46' width='12' height='4' rx='1' fill='#4c5a6f' />
            </g>
            <g clip-path='url(#new-logo-clip-home)'>
                <path d='M32,8 C19,8 12,18 12,31 C12,41 20,50 32,50 V8Z' fill='#e5e7eb' />
                <g stroke='#2b3544' stroke-width='1.8' fill='none' stroke-linecap='round'>
                    <path d='M20,18 C24,14 28,18 28,22' />
                    <path d='M16,26 C20,30 28,30 30,26' />
                    <path d='M18,34 C22,32 26,36 22,40' />
                    <path d='M26,42 C22,44 18,46 20,42' />
                    <path d='M28,32 C30,30 24,28 22,32' />
                </g>
                <path d='M32,8 C45,8 52,18 52,31 C52,41 44,50 32,50 V8Z' fill='#facc15' />
                <g stroke='#2b3544' stroke-width='2.5' stroke-linecap='round'>
                    <path d='M42,23 C39.5,23 39.5,27 42,27 S 44.5,27 44.5,31 C44.5,35 42,35 39.5,35' />
                    <path d='M42 20V38' />
                </g>
                <g fill='#fff'>
                    <path d='m48 14 1 3 3-1-2 2 2 2-3-1-1 3-1-3-3 1 2-2-2-2 3 1z' transform='scale(0.7) translate(15, 2)' />
                    <path d='m37 43 .5 1.5 1.5-.5-1 1 1 1-1.5-.5-.5 1.5-.5-1.5-1.5.5 1-1-1-1 1.5.5z' transform='scale(0.7) translate(15, -12)' opacity='.8' />
                </g>
            </g>
            <path d='M32,8 C19,8 12,18 12,31 C12,41 20,50 32,50 C44,50 52,41 52,31 C52,18 45,8 32,8 Z' stroke='#2b3544' stroke-width='2.5' fill='none' />
            <path d='M32 8V50' stroke='#2b3544' stroke-width='2.5' />
        </g>
    </svg>
);


const Home: React.FC = () => {
    const { user, setView } = useContext(AppContext) as AppContextType;

    const handleStartNow = () => {
        setView(user ? 'dashboard' : 'login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="text-center py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <div className="w-24 h-24 mx-auto mb-6">
                            <LogoIcon />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4">
                            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 text-transparent bg-clip-text">
                                Desenvolve
                            </span>
                            <span className="text-white"> & Ganha</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-indigo-200 mb-8">
                            Conecte-se a micro-tarefas, desenvolva suas habilidades com IA e construa seu futuro profissional. Ganhe dinheiro enquanto aprende e cresce na sua carreira.
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={handleStartNow}
                                className="px-8 py-3 font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                                Começar Agora
                            </button>
                            <button className="px-8 py-3 font-semibold rounded-lg border-2 border-indigo-400 text-indigo-300 hover:bg-indigo-400/20 transition-colors duration-300">
                                Avaliar Habilidades
                            </button>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-black/10">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            <StatCard value="12,847" label="Jovens Ativos" icon={<UserGroupIcon />} />
                            <StatCard value="89,234" label="Tarefas Completadas" icon={<CheckBadgeIcon />} />
                            <StatCard value="2.1B" label="SKILL Tokens Distribuídos" icon={<SparklesIcon />} />
                            <StatCard value="15%" label="Taxa Média" icon={<CurrencyDollarIcon />} />
                        </div>
                    </div>
                </section>

                {/* Token Info Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="bg-gradient-to-br from-indigo-800 to-purple-800/80 p-8 rounded-2xl border border-indigo-500/30">
                            <div className="flex items-center mb-8">
                                <div className="p-3 bg-white/10 rounded-full mr-4">
                                    <SparklesIcon className="w-8 h-8 text-purple-300" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white">SKILL Token</h2>
                                    <p className="text-indigo-200">A moeda nativa do ecossistema SkillUp & Earn</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                <InfoCard title="Blockchain" text="Polygon Network - Baixas taxas de transação" icon={<CubeTransparentIcon />} />
                                <InfoCard title="Segurança" text="MetaMask - Carteira descentralizada" icon={<ShieldCheckIcon />} />
                                <InfoCard title="Taxa de Câmbio" text="1000 SKILL = R$ 1 - Taxa fixa e transparente" icon={<ScaleIcon />} />
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="text-center py-6">
                    <p className="text-gray-500">Made in Bolt</p>
                </footer>
            </main>
        </div>
    );
};

export default Home;