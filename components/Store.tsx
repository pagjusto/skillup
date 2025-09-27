import React, { useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType, StoreProduct, StorePlan, User } from '../types';
import Header from './Header';
import { SUBSCRIPTION_DISCOUNTS } from '../constants';
import { SparklesIcon } from './Icons';

const PlanCard: React.FC<{ plan: StorePlan; user: User }> = ({ plan, user }) => {
    const discountPercentage = SUBSCRIPTION_DISCOUNTS[user.subscriptionTier];
    const discountAmount = plan.basePrice * discountPercentage;
    const finalPrice = plan.basePrice - discountAmount;

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div>
                <h4 className="font-bold text-white">{plan.name}</h4>
                {discountPercentage > 0 && (
                     <p className="text-sm text-gray-400 line-through">{plan.basePrice.toLocaleString()} SKILL</p>
                )}
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="text-xl font-bold text-green-400">{finalPrice.toLocaleString()} SKILL</p>
                     {discountPercentage > 0 && (
                        <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                            -{discountPercentage * 100}% OFF
                        </span>
                    )}
                </div>
                <button className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg transition hover:bg-indigo-500">
                    Comprar
                </button>
            </div>
        </div>
    );
};


const ProductCard: React.FC<{ product: StoreProduct }> = ({ product }) => {
    const { user } = useContext(AppContext) as AppContextType;
    if (!user) return null;

    const { logoComponent: LogoComponent } = product;

    return (
        <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 p-2 bg-white/10 rounded-lg flex items-center justify-center">
                    <LogoComponent className="w-full h-full" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.description}</p>
                </div>
            </div>
            <div className="space-y-3">
                {product.plans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} user={user} />
                ))}
            </div>
        </div>
    );
};

const Store: React.FC = () => {
    const { storeProducts } = useContext(AppContext) as AppContextType;

    const softwareProducts = storeProducts.filter(p => p.category === 'Software');
    const aiProducts = storeProducts.filter(p => p.category === 'AI');

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                 <h1 className="text-4xl font-bold mb-2">Loja de Ferramentas</h1>
                <p className="text-indigo-300 mb-8">Obtenha as melhores ferramentas com descontos exclusivos para membros.</p>

                <div className="space-y-12">
                    {/* Software Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-indigo-300 mb-6">Suítes de Software</h2>
                        <div className="space-y-8">
                            {softwareProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>

                    {/* AI Section */}
                    <section>
                         <div className="flex items-center space-x-3 mb-6">
                             <SparklesIcon className="w-8 h-8 text-purple-400" />
                             <h2 className="text-2xl font-bold text-purple-300">Assinaturas de IA</h2>
                         </div>
                        <div className="space-y-8">
                            {aiProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Store;