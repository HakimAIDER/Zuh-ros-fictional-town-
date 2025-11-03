import React, { useEffect, useState } from 'react';
import { Person } from './types';

const PersonDetailPage: React.FC<{
    person: Person;
    onClose: () => void;
    candleCount: number;
    onLightCandle: (id: string) => void;
    warColors: Record<string, { badge: string; text: string; glow: string }>;
}> = ({ person, onClose, candleCount, onLightCandle, warColors }) => {

    const [animateCandle, setAnimateCandle] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    
    const handleLightCandleClick = () => {
        onLightCandle(person.id);
        setAnimateCandle(true);
        setTimeout(() => setAnimateCandle(false), 600);
    };

    const isDisappeared = person.status === 'Disparu(e)';
    const colors = isDisappeared
        ? {
            badge: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
            text: 'text-amber-400',
            glow: 'group-hover:border-amber-500/80',
          }
        : warColors[person.war] || warColors['Guerre du Rif'];

    return (
        <div 
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-lg overflow-y-auto animate-fadeInUp"
            style={{ animationDuration: '400ms' }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col items-center">
                <div className="w-full max-w-6xl">
                    <button 
                        onClick={onClose} 
                        className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Retour au Mémorial
                    </button>

                    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/30">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-1 flex flex-col items-center text-center">
                                <div className="w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700/80 overflow-hidden mb-4">
                                    {person.imageUrl ? (
                                        <img src={person.imageUrl} alt={`${person.firstName1} ${person.lastName}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-slate-100">{person.firstName1} {person.firstName2} {person.lastName}</h1>
                                <p className={`text-lg ${colors.text} font-medium`}>
                                     {isDisappeared ? `Né(e) en ${person.birthYear}` : `${person.birthYear} - ${person.deathYear} (${person.age} ans)`}
                                </p>
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                     <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.badge}`}>{person.status}</span>
                                     <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.badge}`}>{person.war}</span>
                                </div>
                                
                                <div className="mt-8 pt-6 border-t border-slate-800 w-full flex flex-col items-center">
                                     <button 
                                        onClick={handleLightCandleClick}
                                        className="relative group w-full max-w-xs flex items-center justify-center gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold px-6 py-3 rounded-lg hover:bg-amber-500/20 hover:text-amber-200 transition-all duration-300 shadow-lg shadow-amber-900/50"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" transform="scale(1.2) translate(-2.5 -2)"/>
                                        </svg>
                                        Allumer un cierge
                                    </button>
                                    <div className="mt-4 flex items-center gap-2 text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                        <span className={`font-bold text-lg text-white transition-transform duration-300 ${animateCandle ? 'scale-150' : 'scale-100'}`}>{candleCount}</span>
                                        <span>cierges allumés</span>
                                    </div>
                                </div>

                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-2 prose-custom">
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mb-4 tracking-tight">Récit et informations</h2>
                                <blockquote className="border-l-4 border-blue-500/50 pl-4 italic text-slate-300">
                                    <p className="leading-relaxed text-lg">{person.mention}</p>
                                </blockquote>

                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300 not-prose">
                                    <div className="bg-slate-800/50 p-4 rounded-lg">
                                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Lieu de naissance</p>
                                        <p>{person.birthPlace}</p>
                                    </div>
                                    { person.geographicOrigin &&
                                    <div className="bg-slate-800/50 p-4 rounded-lg">
                                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Origine géographique</p>
                                        <p>{person.geographicOrigin}</p>
                                    </div>
                                    }
                                    { person.deathPlace &&
                                     <div className="bg-slate-800/50 p-4 rounded-lg">
                                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Lieu du décès</p>
                                        <p>{person.deathPlace}</p>
                                    </div>
                                    }
                                    { person.lastSeen &&
                                     <div className="bg-slate-800/50 p-4 rounded-lg">
                                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Dernier lieu connu</p>
                                        <p>{person.lastSeen}</p>
                                    </div>
                                    }
                                    { person.camps &&
                                     <div className="bg-slate-800/50 p-4 rounded-lg">
                                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Contexte</p>
                                        <p>{person.camps}</p>
                                    </div>
                                    }
                                     { person.deathCause &&
                                     <div className="bg-slate-800/50 p-4 rounded-lg">
                                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Cause du décès</p>
                                        <p>{person.deathCause}</p>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetailPage;
