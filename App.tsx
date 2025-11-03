import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Person } from './types';
import { soldiersData } from './data/soldiers';
import { civilWarData } from './data/civilwar';
import { disappearedData } from './data/disappeared';
import { spanishAmericanWarData } from './data/spanishAmericanWar';
import { modernConflictsData } from './data/modernConflicts';
import { heroesData, Hero } from './data/heroes';
import PersonDetailPage from './PersonDetailPage';
import Article11M from './TerrorismVictimsPage';
import GlobalSearch from './GlobalSearch';
import ArticlesPage from './ArticlesPage';
import FeliciaAbenelPage from './FeliciaAbenelPage';
import JuliaAbasenPage from './JuliaAbasenPage';
import MarianoPerezPage from './MarianoPerezPage';

const warColors: Record<string, { badge: string; text: string; glow: string }> = {
    'Guerre Hispano-Américaine': {
      badge: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
      text: 'text-amber-500',
      glow: 'group-hover:border-amber-500/80',
    },
    'Guerre du Rif': {
      badge: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
      text: 'text-blue-500',
      glow: 'group-hover:border-blue-500/80',
    },
    'Guerre Civile Espagnole': {
      badge: 'border-rose-600/30 bg-rose-600/10 text-rose-500',
      text: 'text-rose-600',
      glow: 'group-hover:border-rose-600/80',
    },
    'Guerre d’Ifni-Sahara': {
      badge: 'border-teal-400/30 bg-teal-400/10 text-teal-300',
      text: 'text-teal-400',
      glow: 'group-hover:border-teal-500/80',
    },
    'Sahara Occidental': {
      badge: 'border-orange-400/30 bg-orange-400/10 text-orange-300',
      text: 'text-orange-400',
      glow: 'group-hover:border-orange-500/80',
    },
    'Balkans (Bosnie)': {
      badge: 'border-slate-400/30 bg-slate-400/10 text-slate-300',
      text: 'text-slate-400',
      glow: 'group-hover:border-slate-500/80',
    },
    'Liban (FINUL)': {
      badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
      text: 'text-emerald-400',
      glow: 'group-hover:border-emerald-500/80',
    },
    'Irak': {
      badge: 'border-red-500/30 bg-red-500/10 text-red-400',
      text: 'text-red-500',
      glow: 'group-hover:border-red-500/80',
    },
    'Afghanistan (ISAF)': {
      badge: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
      text: 'text-sky-400',
      glow: 'group-hover:border-sky-500/80',
    },
  };

const PersonCard: React.FC<{ person: Person; index: number; onSelect: (person: Person) => void; }> = ({ person, index, onSelect }) => {
  const isDisappeared = person.status === 'Disparu(e)';
  
  const colors = isDisappeared
    ? {
        badge: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
        text: 'text-amber-400',
        glow: 'group-hover:border-amber-500/80',
      }
    : warColors[person.war] || warColors['Guerre du Rif'];
      
  const summary = useMemo(() => {
    const parts = person.mention.split('. ');
    if (parts.length > 1) {
        return parts.slice(1).join('. ').trim();
    }
    if (person.status === 'Disparu(e)') {
        return `Disparu(e) à ${person.lastSeen}.`;
    }
    return person.mention;
  }, [person]);

  return (
    <button
      onClick={() => onSelect(person)}
      className={`animate-fadeInUp group relative w-full text-left overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-slate-900/70 ${colors.glow}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4 gap-2">
              <div className="flex items-center min-w-0">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border-2 border-slate-700/80 overflow-hidden">
                      {person.imageUrl ? (
                          <img src={person.imageUrl} alt={`${person.firstName1} ${person.lastName}`} className="w-full h-full object-cover" />
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                      )}
                  </div>
                  <div className="min-w-0">
                      <h2 className={`text-base font-bold text-slate-100`}>{person.firstName1} {person.firstName2} {person.lastName}</h2>
                      <p className={`text-sm ${colors.text} font-medium`}>
                          {isDisappeared ? `Né(e) en ${person.birthYear}` : `${person.birthYear} - ${person.deathYear} (${person.age} ans)`}
                      </p>
                  </div>
              </div>
              <div className={`text-xs text-center font-semibold px-2.5 py-1 rounded-full border ${colors.badge} flex-shrink-0`}>
                  {person.status}
              </div>
          </div>
          
          <div className="space-y-2 text-slate-400 text-sm border-l-2 border-slate-800 ml-5 pl-5 flex-grow">
              {person.geographicOrigin && <p><span className="font-medium text-slate-500">Origine:</span> {person.geographicOrigin}</p>}
              <p><span className="font-medium text-slate-500">Né(e) à:</span> {person.birthPlace}</p>
              {person.deathPlace && <p><span className="font-medium text-slate-500">Mort(e) à:</span> {person.deathPlace}</p>}
              {isDisappeared && person.lastSeen && <p><span className="font-medium text-slate-500">Disparu(e) à:</span> {person.lastSeen}</p>}
              {person.camps && !isDisappeared && <p><span className="font-medium text-slate-500">Contexte:</span> {person.camps}</p>}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <p className="text-xs italic text-slate-500 line-clamp-3">
              {summary}
            </p>
          </div>
      </div>
    </button>
  );
};

type WarFilter = 'all' | 'hispano' | 'rif' | 'civil' | 'modern' | 'disappeared';
const filters: { id: WarFilter; label: string }[] = [
    { id: 'all', label: 'Toutes les périodes' },
    { id: 'hispano', label: 'Guerre de 1898' },
    { id: 'rif', label: 'Guerre du Rif' },
    { id: 'civil', label: 'Guerre Civile' },
    { id: 'modern', label: 'Missions Extérieures' },
    { id: 'disappeared', label: 'Disparus' },
];

const SearchAndFilterControls: React.FC<{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    warFilter: WarFilter;
    setWarFilter: (filter: WarFilter) => void;
    stats: Record<string, number>;
}> = ({ searchTerm, setSearchTerm, warFilter, setWarFilter, stats }) => {
    return (
        <div className="sticky top-0 z-20 bg-[#0c0a15]/90 backdrop-blur-md border-y border-white/10 shadow-lg">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-6 text-center">
                        <div className="bg-slate-800/50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">{stats.total}</p>
                            <p className="text-slate-400 text-xs font-medium">Total</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{stats.hispano}</p>
                            <p className="text-slate-400 text-xs font-medium">1898</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">{stats.rif}</p>
                            <p className="text-slate-400 text-xs font-medium">Rif</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">{stats.civil + stats.disappeared}</p>
                            <p className="text-slate-400 text-xs font-medium">G. Civile</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">{stats.modern}</p>
                            <p className="text-slate-400 text-xs font-medium">Moderne</p>
                        </div>
                    </div>

                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher par nom, lieu, année..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div className="flex items-center justify-center flex-wrap gap-2">
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setWarFilter(filter.id)}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                                    warFilter === filter.id 
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                                    : 'text-slate-300 bg-slate-800/80 hover:bg-slate-700/50 hover:text-white'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const MemorialPage: React.FC<{ allPeople: Person[], stats: Record<string, number>, onSelectPerson: (person: Person) => void }> = ({ allPeople, stats, onSelectPerson }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [warFilter, setWarFilter] = useState<WarFilter>('all');
  
    const displayedPeople = useMemo(() => {
        const modernWars: Person['war'][] = ['Guerre d’Ifni-Sahara', 'Sahara Occidental', 'Balkans (Bosnie)', 'Liban (FINUL)', 'Irak', 'Afghanistan (ISAF)'];
        
        let filteredData = allPeople;

        // Apply war filter
        switch(warFilter) {
            case 'hispano':
                filteredData = allPeople.filter(p => p.war === 'Guerre Hispano-Américaine');
                break;
            case 'rif':
                filteredData = allPeople.filter(p => p.war === 'Guerre du Rif');
                break;
            case 'civil':
                filteredData = allPeople.filter(p => p.war === 'Guerre Civile Espagnole' && p.status !== 'Disparu(e)');
                break;
            case 'modern':
                filteredData = allPeople.filter(p => modernWars.includes(p.war));
                break;
            case 'disappeared':
                filteredData = allPeople.filter(p => p.status === 'Disparu(e)');
                break;
            case 'all':
            default:
                filteredData = allPeople;
                break;
        }
        
        const lowercasedFilter = searchTerm.toLowerCase().trim();
        if (lowercasedFilter) {
            return filteredData.filter(person => {
                const searchableText = [
                    person.lastName, person.firstName1, person.firstName2, 
                    person.geographicOrigin, person.deathPlace, person.birthYear.toString(), 
                    person.deathYear?.toString(), person.camps, person.lastSeen
                ].filter(Boolean).join(' ').toLowerCase();
                return searchableText.includes(lowercasedFilter);
            });
        }

        return filteredData;
    }, [allPeople, searchTerm, warFilter]);
    
    return (
        <div className="page-container">
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                    Mémorial de Zuheros
                </h1>
                <p className="text-lg md:text-xl text-slate-400">En l'honneur de ceux qui sont tombés pour la patrie</p>
            </header>
            
            <SearchAndFilterControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                warFilter={warFilter}
                setWarFilter={setWarFilter}
                stats={stats}
            />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-6 flex flex-wrap justify-between items-center gap-2 text-sm">
                    <p className="text-slate-300 font-semibold">{displayedPeople.length} personne(s) trouvée(s)</p>
                     { (searchTerm.trim() || warFilter !== 'all') && (
                       <button 
                         onClick={() => { setSearchTerm(''); setWarFilter('all'); }} 
                         className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
                       >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.12-6.36M20 15a9 9 0 01-14.12 6.36" />
                            </svg>
                            Réinitialiser
                       </button>
                    )}
                </div>
                {displayedPeople.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayedPeople.map((person, index) => (
                            <PersonCard key={person.id} person={person} index={index} onSelect={onSelectPerson} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-block bg-slate-900 p-6 rounded-full border-2 border-slate-700 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-xl text-slate-300 font-medium">Aucun résultat pour votre recherche.</p>
                        <p className="text-slate-400 mt-2">Essayez d'autres mots-clés ou modifiez les filtres.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Footer: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
    const footerLinks = [
        { id: 'memorial', label: "Mémorial" },
        { id: 'presentation', label: "Présentation" },
        { id: 'wars', label: "Les Guerres" },
        { id: 'heritage', label: "Héritage" },
        { id: 'famous', label: "Personnalités" },
        { id: 'heroes', label: "Héros" },
    ];
    return (
        <footer className="bg-slate-950/70 border-t border-white/10 mt-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                         <div className="flex items-center gap-3">
                            <img 
                                src="https://videos.openai.com/az/vg-assets/task_01k8wjvr8dfhdrbrv0vbp015h1%2F1761895964_img_1.webp?se=2025-11-07T11%3A05%3A17Z&sp=r&sv=2024-08-04&sr=b&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-11-01T03%3A53%3A16Z&ske=2025-11-08T03%3A58%3A16Z&sks=b&skv=2024-08-04&sig=kiY1bNV84kRTZ8%2BD4Cit1Ua9P2LD%2B5wMK1JEF9vF/dA%3D&ac=oaivgprodscus2" 
                                alt="Logo de Zuheros" 
                                className="h-10 w-auto"
                            />
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
                                Mémorial de Zuheros
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm mt-4">Un sanctuaire numérique dédié à la mémoire, à l'héritage et à la résilience d'un village andalou.</p>
                    </div>
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Explorer</h3>
                                <ul className="mt-4 space-y-2">
                                    {footerLinks.map(link => (
                                        <li key={link.id}>
                                            <button onClick={() => setView(link.id as View)} className="text-base text-slate-400 hover:text-blue-400 transition-colors">{link.label}</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <div>
                                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Sections</h3>
                                <ul className="mt-4 space-y-2">
                                     <li><button onClick={() => setView('photography' as View)} className="text-base text-slate-400 hover:text-blue-400 transition-colors">Photographies</button></li>
                                     <li><button onClick={() => setView('demography' as View)} className="text-base text-slate-400 hover:text-blue-400 transition-colors">Démographie</button></li>
                                     <li><button onClick={() => setView('articles' as View)} className="text-base text-slate-400 hover:text-blue-400 transition-colors">Articles</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center text-slate-500 text-sm">
                    <p>Leur souvenir, notre héritage.</p>
                </div>
            </div>
        </footer>
    )
}

export const ContentPageLayout: React.FC<{ children: React.ReactNode, setView: (view: View) => void }> = ({ children, setView }) => (
    <>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 page-container">
            <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12 max-w-5xl mx-auto shadow-2xl shadow-black/30">
                {children}
            </div>
        </div>
    </>
);

const PresentationPage: React.FC<{setView: (view:View) => void}> = ({setView}) => {
    return (
        <ContentPageLayout setView={setView}>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-6 tracking-tight">
                Zuhéros, histoire d’un village andalou (XVIᵉ–XXIᵉ siècle)
            </h1>
            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p>Zuhéros est un nom que les grandes synthèses historiques ignorent souvent et que les cartes ont tardé à adopter, mais dont la trajectoire concentre, à l’échelle d’un bourg, plusieurs siècles de l’histoire ibérique : Reconquista et expulsions, crypto-pratiques et assimilation, guerres et saignée démographique, migration et recomposition sociale. C’est l’histoire d’un lieu qui a vécu longtemps en marge, qui a protégé ses habitudes et son parler, et qui paie au XXᵉ siècle un tribut humain disproportionné avant d’entrer, au XXIᵉ, dans un temps où le patrimoine devient l’essentiel de ce qui reste.</p>
                
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Fondations (après 1570) : un village morisque sous tutelle chrétienne</h2>
                <p>La naissance de Zuhéros s’inscrit dans l’onde de choc de la révolte des Alpujarras (1568–1571). Après la répression, des lignées morisques — parfois insérées dans des alliances avec la petite noblesse chrétienne — reçoivent ou achètent des terres dans une zone faiblement peuplée de la Sierra cordouane. À l’écart des routes marchandes, le noyau se structure en hameaux : <strong>Zuheros Viejo</strong>, <strong>Zuheros Alto</strong>, <strong>Zuheros Bajo</strong>, <strong>Tamesguida</strong>, <strong>Almanara</strong>.</p>
                <p>Très tôt, la communauté s’organise autour d’un <strong>comité villageois</strong> — l’ancêtre du <strong>CFHZ</strong> (Comité des Familles Historiques de Zuhéros) — qui arbitre les usages, gère des litiges, administre des fonds de secours, et surtout compose avec l’autorité ecclésiastique : l’Église encadre, mais le comité conserve un <strong>espace d’autonomie pratique</strong> (charités, fêtes, dots, funérailles, usages des olivettes). Cette marge locale devient un rempart discret où se diluent, puis se transforment, des pratiques héritées de l’islam.</p>

                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">XVIIᵉ–XVIIIᵉ siècles : assimilation, crypto-rituels et mémoire ténue</h2>
                <p>Le <strong>décret de 1609</strong> sur l’expulsion des morisques ne fabrique pas partout des réalités identiques. À Zuhéros, l’isolement, l’endogamie et le pragmatisme des autorités locales aboutissent à une <strong>assimilation surveillée mais progressive</strong>. Les mariages, les baptêmes, la messe dominicale installent, au fil des générations, un catholicisme de plus en plus incontesté. Pourtant, des rémanences subsistent longtemps dans le <strong>domestique</strong> : formules murmurées, orientation de certaines tombes « vers l’aube », précautions alimentaires, discrètes ablutions, vocabulaire rituel.</p>
                <p>Dans les récits familiaux réapparaissent des bribes de <strong>lexique zuhéros</strong> — <strong>Imabel</strong> (foi), <strong>Atibelá</strong> (confiance), <strong>Laulacuela</strong> (« il n’est de force et de puissance que par Dieu »), <strong>Munafe</strong> (hypocrite), <strong>Almacra</strong> (cimetière), <strong>Elhanza</strong> (cérémonie funéraire). Ce ne sont pas des hispanismes ordinaires : ce sont des fossiles linguistiques qui <strong>indexent une mémoire religieuse</strong>. L’ordre de phrase <strong>verbe–sujet–complément</strong> en narration (<em>Dijo María la verdad</em>, <em>Llegó Juan temprano</em>) devient l’une des signatures du parler local, prolongement d’un castillan méridional ancien et possible calque prosodique d’un long contact avec l’arabe.</p>
                <p>Les archives privées signalent des objets plus explicites : on évoque un <strong>coran daté de 1743</strong> conservé dans le manoir d’une famille <strong>Morra de Granada</strong>, annoté, partiellement retranscrit dans une <strong>romance locale aljamiada</strong> (castillan écrit à l’arabe). Qu’on en possède un exemplaire ne prouve pas une pratique généralisée à cette date ; cela atteste au minimum l’existence d’un <strong>îlot de lettrés</strong> gardant la trace consciente d’un héritage religieux. L’<strong>inconscience</strong> de l’origine islamique que les descendants revendiquent parfois au XXᵉ siècle ne vaut donc pas pour les XVIIᵉ–XVIIIᵉ : ici, la mémoire <strong>consciente</strong> survit plus longtemps qu’ailleurs, avant de s’estomper.</p>

                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">XIXᵉ siècle : isolement fertile, micro-modernités, premières dispersions</h2>
                <p>Jusqu’au milieu du XIXᵉ, <strong>Zuhéros n’apparaît pas toujours sur les cartes</strong>. L’isolement protège un <strong>agro-système d’olivettes</strong>, des ateliers, des petites boutiques tenues par des lignées : <strong>Muley</strong> (boucherie), <strong>Abascal</strong> (restauration), <strong>Abenfassi</strong>, <strong>Zenati</strong>, <strong>Morra de Granada</strong>, <strong>Cordoban</strong>, <strong>Abenadid</strong> (terres, murs, commerces). La toponymie garde la patine de l’ancien monde ; la vie rythmée par les campagnes d’olive structure les sociabilités.</p>
                <p>Mais c’est aussi un siècle de <strong>micro-dispersions</strong> : des familles quittent le village — <strong>Siavental</strong> vers Grenade, <strong>Avencerano</strong> et <strong>Venalo</strong> vers Cordoue ; d’autres, comme <strong>Almoréz</strong>, <strong>Zafreno</strong>, <strong>Abenfaro</strong>, s’éteignent faute d’héritiers masculins ; la rumeur veut que les <strong>Avenar</strong> aient <strong>fui vers l’Empire ottoman</strong> et <strong>réaffirmé l’islam</strong> — indice marginal mais parlant d’un <strong>spectre de fidélités</strong> encore envisageable pour quelques-uns à cette époque.</p>

                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Trois guerres et une saignée</h2>
                <p>Entre la <strong>guerre hispano-américaine</strong> (1898), la <strong>guerre du Rif</strong> (années 1920) et la <strong>guerre civile</strong> (1936–1939), Zuhéros perd <strong>695 personnes</strong> (estimation cumulative : <strong>167 + 193 + 335</strong>). Les deux premiers conflits frappent <strong>quasi exclusivement des hommes jeunes</strong> ; la guerre civile ajoute les morts de front, d’arrière-front et les exécutions, majoritairement masculines.</p>
                <p>L’impact est <strong>structurel</strong>. Sur un village d’environ <strong>1 900–2 100 habitants</strong> à l’époque, cette hémorragie cumulée représente, selon les estimations par stock, <strong>60–67 % d’un effectif masculin moyen</strong> sur la période. Concrètement, cela produit :</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>un <strong>effondrement des cohortes de prétendants</strong> au mariage,</li>
                    <li>des <strong>veuvages précoces</strong> et des fiançailles sans noces (la figure de <strong>Felicia Abenel</strong>, « fiancée-veuve » à vie, qui n’épousera « que la tombe » de <strong>Pedro</strong>),</li>
                    <li>une <strong>chute durable de la natalité locale</strong>,</li>
                    <li>des <strong>exodes</strong> de femmes avec enfants vers les villes, puis l’étranger,</li>
                    <li>le basculement de <strong>rues entières</strong> en alignements de volets clos.</li>
                </ul>
                <p>Le <strong>CFHZ</strong> (ou son prédécesseur) crée un <strong>Comité de gestion des familles précarisées par la guerre (CFPG)</strong> pour soutenir <strong>veuves, orphelins, âgés isolés, invalides</strong>. Les récits oraux enregistrent la détresse : <strong>Julia Abasen-Jalifa</strong>, attendant son fils <strong>Miguel</strong> disparu, cuisine « pour trois puis pour deux » des décennies durant ; la découverte tardive d’une <strong>fosse</strong> au XXIᵉ siècle permettra enfin d’inscrire son nom au cimetière <strong>Almacra</strong>.</p>
                <p>La <strong>guerre du Rif</strong> est ressentie comme un <strong>tribut insensé</strong> : près de <strong>200 jeunes</strong> de Zuhéros tombés dans une guerre coloniale lointaine ; puis, dix ans plus tard, la <strong>guerre civile</strong> qui fauche à nouveau. Le parler local s’en ressent : la disparition d’une partie de la jeunesse masculine coupe des <strong>chaînes de transmission</strong> du dialecte (chants de cueillette, proverbes, tours d’adresse). La société bascule vers un <strong>conservatisme de survie</strong> : la famille, la terre, le respect des rôles deviennent socle ; plus tard, certains résumeront à tort cela à un simple « franquisme », alors que la matrice est plus <strong>anthropologique</strong> (protéger ce qui reste) que strictement idéologique.</p>
                
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Entre résilience silencieuse et ouverture contrainte</h2>
                <p>L’après-guerre civile laisse un village <strong>épuisé</strong>. L’économie repart, mais des commerces n’ont <strong>pas d’héritiers</strong> ; d’autres sont <strong>reprise</strong> par des familles <strong>arrivantes</strong>. Des <strong>diasporas</strong> se forment : vers <strong>Córdoba</strong>, <strong>Madrid</strong>, et à l’étranger (notamment <strong>Argentine, Chili, Uruguay</strong>, un peu <strong>Italie</strong> et <strong>sud de la France</strong>). À <strong>Oran</strong>, on croise des <strong>Zuhérois</strong> : <strong>Paola</strong>, <strong>Ricardo</strong>, une domestique <strong>Aïcha</strong> venue de Nedroma ; d’anciennes familles tissent des liens avec des <strong>Bénichou</strong> juifs d’Algérie — histoires d’exils croisés.</p>
                <p>Dans ce contexte, la figure de <strong>Mariano Pérez</strong> — survivant, communiste discret, maire à l’heure où Zuhéros devient <strong>municipalité</strong> — cristallise un <strong>choix historique</strong> : <strong>ouvrir</strong> le village aux <strong>nouvelles familles</strong> (<strong>FNZ</strong>) pour <strong>éviter l’étouffement</strong>. La décision est mal vécue par une partie des <strong>FHZ</strong> (Familles Historiques de Zuhéros), attachées à l’entre-soi d’antan ; mais <strong>démographiquement</strong>, le village <strong>n’a plus</strong> les moyens de se suffire. Mariano meurt en <strong>1979</strong>, <strong>isolé</strong>, sans descendance, figure tragique d’un « réformateur malgré lui », dont les mémoires livrent un motif simple : « sauver la vie en acceptant d’être autre ».</p>
                
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Recomposition, mémoire et basculement</h2>
                <p>Le <strong>tournant</strong> s’opère dans les années 1980 : les <strong>FHZ passent sous 50 %</strong> (cap symbolique franchi en <strong>1983</strong>). Le mouvement ne se renverse plus. Au fil des décennies, la ville <strong>grandit</strong> (urbanisation périphérique, nouveaux quartiers), mais le <strong>cœur ancien</strong> se <strong>vide</strong>. Dans les années 2000–2020, la part FHZ devient <strong>minoritaire</strong>, l’<strong>âge moyen</strong> se <strong>hausse</strong> (<strong>≈ 50 ans</strong> aujourd’hui), et le <strong>stock jeune</strong> diminue.</p>
                <p>En <strong>2024</strong>, Zuhéros compte <strong>≈ 8 300 habitants</strong>, dont <strong>≈ 450 FHZ</strong> ; en <strong>2025</strong>, les recensements internes parlent <strong>d’environ 704 FHZ</strong> à une date récente (≈ 8 %), tendance baissière. L’<strong>établissement Abenhumeya</strong> (privé), bastion scolaire historique des FHZ, supprime des <strong>classes faute d’effectifs</strong>. En <strong>2025</strong>, le <strong>CFHZ</strong> change d’intitulé et devient <strong>Comité pour les affaires culturelles et du patrimoine</strong>, symbole d’un passage de la <strong>gouvernance communautaire</strong> à la <strong>curation patrimoniale</strong>.</p>
                <p>Les <strong>biens</strong> (terres, murs commerciaux) restent très souvent <strong>propriété FHZ</strong>, mais la <strong>gestion</strong> est fréquemment <strong>déléguée à des FNZ</strong> : <strong>présence patrimoniale</strong> sans <strong>base humaine équivalente</strong>. Dans les rues, des <strong>noms</strong> racontent encore un passé (<strong>Abenadid, Abendanan, Abenfassi, Abenel, Venmegrí, Sánez, Cuérrez, Manzores, Férez, Harbez, Bucares, Setes, Echeviles, Avenizar, Avenmes, Malques, Avenbéz, Avencores, Najares, Nares, Belés, Témez, Talores, Talales…</strong>), mais la <strong>chaîne sociale</strong> qui les soutenait se réduit.</p>
                <p>La <strong>langue</strong> s’éteint. La <strong>variante zuhéroise du castillan</strong> — ordre Verbe–Sujet–Complément, prosodie narrative, lexique rituel — ne survit plus que chez quelques très âgés (on cite <strong>Damián Avunasem</strong>, <strong>Penélope Abendanan</strong>, <strong>Francisca Aznar</strong>, <strong>Elena Belés</strong>). Les <strong>pratiques</strong> (prières de vieilles dames, alphabet de gestes funéraires, boucherie <strong>Muley</strong> « seul lieu sûr » pour la viande jusqu’aux années 1960) ont disparu. Le <strong>costume</strong> de mariée — robe de soie couvrant bras et jambes jusqu’au-dessus de la cheville, ceinture d’argent, gilet brodé, ballerines et bas — est devenu objet de vitrine.</p>
                <p>L’époque récente connaît des départs symboliques : <strong>fermeture</strong> du <strong>Bar Solère</strong> (tenu par <strong>Adriana Pérez Jakimi</strong> et <strong>Julio Muley</strong>), projet d’<strong>émigration</strong> du jeune <strong>Antony Muley</strong> (figure d’une génération FHZ numériquement rare), <strong>diaspora</strong> désormais très lointaine (on estime <strong>3 000–4 000</strong> personnes d’origine FHZ en Espagne hors du village, <strong>2 000–3 000</strong> à l’étranger). Le présent est celui d’un <strong>Zuhéros vivant</strong>, administrativement solide, mais où le <strong>noyau historique</strong> s’est amaigri au point de ne plus assurer la <strong>reproduction sociale</strong> de sa singularité.</p>
                
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Identités croisées : catholicisme social, mémoire morisque, débats contemporains</h2>
                <p>D’un point de vue <strong>identitaire</strong>, les FHZ contemporains se définissent <strong>avant tout comme Espagnols et catholiques</strong> ; l’« origine maure » se dit aujourd’hui en termes <strong>culturels</strong>, <strong>généalogiques</strong>, <strong>patrimoniaux</strong>, rarement religieux. Les <strong>vestiges</strong> (mots, tombes orientées, toponymes) n’impliquent plus de <strong>croyance</strong>, mais un <strong>récit</strong> — parfois tenu, parfois disputé.</p>
                <p>La montée récente d’une <strong>petite communauté musulmane</strong> (environ <strong>500 personnes</strong> à une date citée), composée surtout de <strong>migrants récents</strong> (Maroc, Balkans, Pakistan, Syrie), ne produit <strong>pas</strong> une « renaissance morisque » : ce sont d’autres trajectoires, d’autres répertoires. Certains FHZ s’opposent à une <strong>mosquée</strong> non par « retour » ou « refus de soi », mais parce qu’ils vivent <strong>pleinement</strong> comme <strong>catholiques</strong> et <strong>locaux</strong>, situant leur <strong>héritage</strong> sur le plan <strong>historico-culturel</strong>. Dans cette tension, on perçoit une <strong>confusion fréquente</strong> entre <strong>héritage</strong> et <strong>religion vivante</strong>.</p>
                
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Les effets durables des guerres : la démographie comme destin</h2>
                <p>Si l’on cherche une clé unique à la trajectoire longue de Zuhéros, elle tient dans la <strong>démographie contrainte</strong> par les <strong>trois guerres</strong> (1898–1939). L’onde de choc, on l’a dit, a <strong>amputé</strong> des <strong>cohortes masculines</strong> au-delà de ce que peut encaisser un petit territoire. De là découlent en cascade :</p>
                 <ul className="list-disc list-inside space-y-2">
                    <li><strong>mariages reportés ou annulés</strong>,</li>
                    <li><strong>naissances manquées</strong> sur plusieurs décennies,</li>
                    <li><strong>surreprésentation des femmes âgées</strong> dans certains îlots,</li>
                    <li><strong>exode</strong> des dernières générations actives vers l’extérieur,</li>
                    <li><strong>substitution</strong> démographique par des apports FNZ,</li>
                    <li><strong>translation</strong> de la culture de l’<strong>habitus</strong> (pratiques vivantes) vers la culture du <strong>patrimoine</strong> (objets et récits).</li>
                </ul>
                <p>C’est pourquoi il faut distinguer <strong>deux « guérisons »</strong> : la <strong>ville</strong> (qui vit, grossit, s’équipe) et la <strong>communauté FHZ</strong> (qui ne se reconstitue pas). Zuhéros « s’en remet » comme <strong>organisme urbain</strong> ; il ne « s’en remet pas » comme <strong>lignage social</strong> singulier.</p>

                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Mémoire, savoir et transmission : ce qu’il reste à faire</h2>
                <p>Le tournant actuel — <strong>rebaptême du CFHZ</strong> en comité culturel, débats sur la <strong>protection du cimetière Almacra</strong>, sur la <strong>didactisation</strong> du dialecte — crée un <strong>cadre d’action</strong>. Plusieurs chantiers sont à portée de main :</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Corpus oral</strong> du dialecte (enregistrements, lexique audio, proverbes) en libre accès.</li>
                    <li><strong>Histoire orale</strong> des familles (Paola, Ricardo, Damián, Penélope…) : carnets, lettres, photos.</li>
                    <li><strong>Toponymie protégée</strong> et <strong>plaques QR</strong> (micro-notices sonores).</li>
                    <li><strong>Semaine du Regreso</strong> (diaspora) : ateliers, cuisine, visite guidée du vieux bourg.</li>
                    <li><strong>Micro-bourses</strong> pour jeunes (FHZ et FNZ) qui documentent un objet de l’héritage.</li>
                    <li><strong>Muséographie légère</strong> (une salle, trois vitrines : dialecte, rites, métiers).</li>
                    <li><strong>Programme scolaire Abenhumeya – “Zuhéros mémoire vivante”</strong>.</li>
                    <li><strong>Adopta-Almacra</strong> (entretien des tombes, fiches biographiques).</li>
                    <li><strong>Cartographie</strong> des noms hispanisés et de leurs <strong>origines</strong> avec trajectoires migratoires.</li>
                </ul>
                <p>Ce n’est pas une « restauration » ; c’est une <strong>conservation active</strong> qui transforme une disparition annoncée en <strong>héritage partageable</strong>.</p>
                
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-10 pt-6 border-t border-slate-800 tracking-tight">Conclusion : une ville vivante, un monde qui s’éteint</h2>
                <p>Zuhéros a été <strong>fondé</strong> par des familles <strong>morisques</strong> qui ont négocié leur <strong>survie</strong> dans un espace d’<strong>autonomie locale</strong> ; il a <strong>assimilé</strong> peu à peu l’orthodoxie catholique, tout en <strong>sédimentant</strong> dans la langue et les gestes des <strong>échos</strong> d’un autre horizon. Il a <strong>sacrifié</strong> une part immense de sa <strong>vitalité</strong> entre 1898 et 1939 et n’a jamais reconstitué la <strong>trame sociale</strong> qui faisait sa singularité. Les <strong>nouvelles familles</strong> ont permis à la <strong>ville</strong> de continuer, mais le <strong>village morisque</strong> — celui du dialecte V-S-C, des prières murmurées, des bouchers Muley et des noces à gilet brodé — s’estompe.</p>
                <p>Dire cela n’est pas entériner un deuil muet. C’est au contraire <strong>nommer</strong> ce qui fut, <strong>montrer</strong> ce qui reste, et <strong>transmettre</strong> ce qui peut l’être. Zuhéros ne redeviendra pas le <strong>Belmonte des Maures</strong> qu’il aimait rêver être ; il peut devenir un <strong>lieu de savoir et de mémoire</strong>, où la ville moderne côtoie un <strong>patrimoine vivant</strong> que l’on nourrit de <strong>voix</strong>, de <strong>noms</strong>, de <strong>lieux</strong>, d’<strong>histoires</strong>. Alors, le dernier chapitre d’Al-Andalus ici ne sera pas une <strong>page blanche</strong>, mais une <strong>page lue à voix haute</strong>, chaque année, sur la place et au cimetière Almacra, pour que les vivants sachent <strong>d’où vient la lumière de l’aube</strong> qui, jadis, orientait les tombes et, aujourd’hui encore, protège silencieusement le village.</p>
            </div>
        </ContentPageLayout>
    );
};

const WarsPage: React.FC<{setView: (view:View) => void}> = ({setView}) => {
    return (
        <ContentPageLayout setView={setView}>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                Les guerres et le prix payé
            </h1>
            <h2 className="text-xl text-slate-300 mb-6">Zuhéros, le village qui a donné ses fils à l’Espagne</h2>

            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p className="lead italic">Reportage – Mémoire, guerres et survie d’un bourg andalou frappé par deux hécatombes successives.</p>
                <p><strong>ALMACRA (province de Cordoue).</strong> À l’aube, la lumière se coince dans les cyprès. Le vieux cimetière d’Almacra, la pierre tiède, des dates et des initiales en rangs disjoints : c’est là que Zuhéros garde ses morts. On ne parle pas de gloire, on parle de tenue. Les habitants les désignent simplement : « ceux qui sont tombés pour l’Espagne ». Derrière la formule, des vies interrompues, un village amputé, une mémoire qui se récite par noms, par escaliers, par places.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">L'adieu à l'Empire, les premiers deuils lointains</h3>
                <p>Bien avant les saignées du XXᵉ siècle, Zuhéros a payé son tribut à une guerre lointaine, celle qui marqua la fin de l'empire espagnol. En 1898, des dizaines de jeunes hommes du village furent envoyés à Cuba, à Porto Rico et aux Philippines pour défendre les dernières possessions ultramarines. Pour beaucoup, ce fut un voyage sans retour.</p>
                <p>Le mémorial recense près de 170 victimes de ce conflit. L'ennemi n'était pas seulement l'armée américaine ; il était aussi invisible et implacable. Les registres funestes parlent de "paludisme", de "fièvre jaune", de "dysenterie", maladies qui décimèrent les troupes dans un environnement tropical hostile. Les batailles navales, comme celles de Santiago de Cuba ou de la baie de Manille, furent des désastres où les marins de Zuhéros périrent par "noyade", "brûlures" ou "asphyxie", piégés dans des navires obsolètes.</p>
                <p>Pour le village, ce fut une nouvelle forme de deuil. Les nouvelles arrivaient des mois plus tard, souvent laconiques, laissant les familles dans une incertitude douloureuse. Ce conflit, bien que souvent éclipsé par les tragédies ultérieures, a été le premier à inscrire dans la mémoire de Zuhéros le motif récurrent de la jeunesse sacrifiée pour la patrie, loin, très loin des oliveraies andalouses.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Un prix hors norme : la génération fauchée du Rif</h3>
                <p>Années 1920. La guerre du Rif prélève ce qu’un bourg de 2 800 habitants ne peut normalement pas perdre : près de 200 jeunes morts parmi environ 650 engagés. Proportionnellement, la saignée est sans comparaison. Des classes d’âge entières manquent à l’appel ; les fratries se brisent, les fiançailles s’interrompent pour toujours. La famille <strong>Tlemés</strong> n’aura plus qu’un survivant, Diego, qui ferme la boulangerie et s’exile au Chili. <strong>Felicia Abenel</strong> choisit une identité pour tenir : fiancée-veuve. Pedro, menuisier promis, ne reviendra pas ; pour elle, 1926 est une date qui ne finit pas.</p>
                <p>La guerre ne prend pas que des vies : elle installe l’absence comme condition. Des métiers se vident, des ateliers ferment, les voix s’éteignent et avec elles le dialecte. À <strong>Tamesguida</strong>, le vendredi, on prépare encore un alcuzcuz « pour les vieux ». On n’ose plus dire « rite », on dit souvenir.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">La guerre civile : morts, disparus, et le long silence</h3>
                <p>Dix ans plus tard, la guerre civile élargit l’addition. On compte environ 300 victimes liées au conflit ; deux tiers meurent hors du village. Beaucoup ne sont pas des militants : ils traversent l’incendie, emportés par des causes qu’ils n’ont pas choisies.</p>
                <p><strong>Julia Abasen-Jalifa</strong> refusera toujours le passé pour son fils Miguel : disparu après Badajoz, il demeure quarante-deux ans dans le linge repassé, la clé confiée à la voisine « au cas où », la table dressée pour trois, puis pour deux. Il ne sera comptabilisé qu’en 1980. Sur la Plaza Mayor, une enfant de cinq ans voit son père s’effondrer, fusillé par des phalangistes en mangeant une glace. Devenue <strong>Paola Morra de Granada</strong>, elle évitera la place, ou n’y restera « pas plus de dix minutes ». À Zuhéros, la mémoire est topographique : on se souvient par endroits, angles et escaliers.</p>

                <div className="!my-8 p-6 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-sm shadow-lg not-prose">
                    <h4 className="text-lg font-bold text-blue-400 mb-3 tracking-wide">REPÈRES</h4>
                    <ul className="list-disc list-inside text-slate-300 space-y-2 text-base">
                        <li><strong className="text-slate-100">Rif (années 1920) :</strong> ~200 morts sur 650 engagés (village : ~2 800 hab.).</li>
                        <li><strong className="text-slate-100">Guerre civile :</strong> ~300 victimes liées au conflit, 2/3 hors de Zuhéros.</li>
                        <li><strong className="text-slate-100">Bascule démographique :</strong> années 1990, FNZ majoritaires ; FHZ en repli.</li>
                    </ul>
                </div>

                <p><strong>Manuel Pérez : ouvrir pour ne pas mourir</strong></p>
                <p>On lui en a voulu : Manuel Pérez, maire de la reconstruction, a ouvert Zuhéros aux nouveaux. Sa réponse tenait en une phrase, posée, presque comptable : « Entre mes oncles morts au Maroc et mon grand-père assassiné pendant la guerre civile, j’ai appris à compter autrement. » Il n’a pas « remplacé ». Il a sauvé ce qui pouvait l’être, au prix de l’illusion d’une éternité démographique. Les FNZ ont tenu les commerces, travaillé les terres, loué des maisons dont les propriétaires vivaient déjà ailleurs. Zuhéros a continué de respirer – en partage.</p>
                <p><strong>Ce que l’Espagne a pris, ce que Zuhéros a donné</strong></p>
                <p>La formule « morts pour l’Espagne » est simple et trompeuse : elle abrite des fidélités plurielles – au pays, aux familles, parfois à des idées contraires. Zuhéros n’a pas marchandé : au Rif, puis pendant la guerre civile, il a donné ses fils et une part de son avenir. En retour : des plaques, des discours, et le silence têtu des maisons où l’on parle à voix basse. L’Espagne n’a pas toujours regardé Zuhéros ; Zuhéros, lui, n’a jamais cessé de regarder l’Espagne, ne serait-ce que pour y chercher des noms perdus dans ses registres.</p>

                 <div className="!mt-12 pt-6 border-t border-slate-800 text-center">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 tracking-tight mb-4">
                        Dire les noms : une liturgie civile
                    </h3>
                    <p className="text-lg text-slate-400 italic">Parce que nommer, c’est rassembler. Alors on les dit, un à un :</p>
                    <p className="mt-4 text-xl leading-relaxed font-medium text-slate-200">
                        <em>Tlemés, pour les fratries éteintes ; Abenel, pour la fiancée qui n’a pas vieilli ; Abasen-Jalifa, pour la mère qui n’a pas cédé ; Morra de Granada, pour les marches où l’on cache les livres et la douleur ; Muley, Zenati, Abenfassi, Cuérrez, Cordoban, Vargas, Jakimi, Sanayes, Sánez…</em>
                    </p>
                    <p className="mt-2 text-slate-400">Et tant d’autres dont la pierre a perdu la trace, mais dont les maisons se souviennent.</p>
                </div>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-12">Héritage : la tenue comme horizon</h3>
                <p>Les morts de Zuhéros n’appartiennent ni à un parti ni à un autel. Ils appartiennent au village : oliviers, escaliers, cours où l’eau parle encore. L’héritage ne se mesure pas au mètre de marbre mais au courage tranquille de ceux qui restent, reviennent, racontent. Qu’on vienne à Almacra au lever du jour. Les stèles, orientées vers l’aube, composent un langage simple : la lumière reviendra par là où elle est partie. Tant qu’on nomme, Zuhéros tient.</p>
            </div>
        </ContentPageLayout>
    );
};

const HeritagePage: React.FC<{setView: (view:View) => void}> = ({setView}) => {
    return (
        <ContentPageLayout setView={setView}>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                Zuhéros, l’héritage en sursis
            </h1>
            <h2 className="text-xl text-slate-300 mb-6 italic">Enquête au long cours dans le dernier village morisque d’Espagne</h2>

            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p><strong className="text-slate-100">Zuhéros (province de Cordoue).</strong> À la première heure, les oliviers de la Subbética projettent des ombres fines sur les façades chaulées. La vieille ville se réveille sans hâte : un volet, un seau d’eau au pas de la porte, la rumeur d’un balai qui racle les dalles. À <strong className="text-slate-100">Almacra</strong>, le cimetière ancien, les stèles orientées vers l’aube prennent un reflet de nacre. Ici, tout parle encore bas — et c’est justement ce murmure qui menace de s’éteindre.</p>
                
                <hr className="!my-8 border-slate-700" />

                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-8 tracking-tight">Un héritage discret, une alarme sourde</h2>
                <p>Zuhéros, longtemps décrit par les historiens locaux comme « le dernier village morisque d’Espagne », traverse une bascule démographique et culturelle. Les <strong>Familles historiques de Zuhéros (FHZ)</strong>, fondatrices du bourg après la révolte des Alpujarras, ne représentent plus aujourd’hui qu’une <strong>poignée de résidents âgés</strong>. Les indices matériels d’un legs pluriséculaire — <strong>dialecte local</strong>, <strong>costumes d’apparat</strong>, <strong>cuisine du vendredi</strong>, <strong>toponymie</strong> et <strong>noms de lignées</strong> — glissent du quotidien vers la <strong>vitrine</strong>.</p>
                
                <blockquote className="relative my-6 pl-6 text-slate-200 italic before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-rose-600 rounded">
                    « Un patrimoine ne disparaît pas en un jour ; il s’effiloche, fibre par fibre », résume <strong>Manuel Velez</strong>, historien cordouan qui arpente Zuhéros depuis les années 1980. « Quand il reste les mots mais plus les voix, les pierres mais plus les pas, c’est qu’on entre dans la zone de danger. »
                </blockquote>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Le village qui disait le monde… en chuchotant</h3>
                <p>Pendant des siècles, la culture locale s’est transmise <strong>à l’ombre des patios</strong>. Le <strong>parler zuhéirois</strong> — un castillan rural où affleurent des réminiscences arabes — conserve des expressions qui intriguent autant qu’elles émeuvent : <em>Imabel</em> (« foi en Dieu »), <em>Atibelá</em> (« confiance en Dieu »), <em>Laulacuela</em> (« il n’y a de force et de puissance que par Dieu »), <em>Sabilano</em> (lamentation rituelle). Longtemps, des <strong>gestes de seuil</strong> — l’eau versée, le vendredi culinaire, l’orientation des tombes — ont accompagné la vie sans s’afficher comme religion.</p>
                <p>« Ma grand-mère posait la main sur nos fronts et disait <em>Imabel</em> ; ce n’était pas une prière au sens strict, c’était un <strong>abri de mots</strong> », se souvient <strong>Clara</strong>, 78 ans, qui a grandi à <strong>Tamesguida</strong>.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Le dossier sensible d’Abenhumeya</h3>
                <p>Au cœur du dispositif social, l’<strong>Établissement Abenhumeya</strong> — une école privée couvrant primaire, collège et lycée — fut la fierté des FHZ et la rampe de transmission des codes du bourg : rigueur des études, couture, musique des fêtes, récits des familles. Aujourd’hui, la direction <strong>ferme des classes</strong> faute d’effectifs.</p>
                <blockquote className="relative my-6 pl-6 text-slate-200 italic before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-rose-600 rounded">
                    « Notre modèle reposait sur une base familiale élargie, sur le fait que les enfants <strong>vivent</strong> au village et non seulement <strong>y possèdent</strong> une maison », explique <strong>Lisa Perez Ibenmoán</strong>, directrice. « Les charges grimpent, les élèves diminuent, et les familles qui restent sont âgées. Nous tenons encore, mais la pente est réelle. »
                </blockquote>
                <p>Le symbole blesse : <strong>Abenhumeya</strong>, nom choisi en hommage à un leader morisque, incarne l’ambivalence d’un héritage <strong>affirmé</strong> dans le nom et <strong>affaibli</strong> dans la pratique.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Trois leviers pour rester vivant</h3>
                <div className="space-y-6 !mt-6 not-prose">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-rose-700 flex items-center justify-center text-white font-bold text-lg">1</div>
                        <div>
                            <h4 className="font-bold text-blue-300 text-xl">Ramener des foyers au centre ancien.</h4>
                            <p className="text-slate-300 mt-1 text-base leading-relaxed">Baux longue durée <strong>bonifiés</strong> pour familles et artisans ; aides à la <strong>réhabilitation</strong> (toitures, façades, systèmes d’eau) ; priorité aux métiers <strong>ouverts au public</strong> (atelier visible, transmission).</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-rose-700 flex items-center justify-center text-white font-bold text-lg">2</div>
                        <div>
                            <h4 className="font-bold text-blue-300 text-xl">Transformer la mémoire en usage.</h4>
                            <p className="text-slate-300 mt-1 text-base leading-relaxed">Créer une <strong>Maison des Parlers</strong> (enregistrements, cours, veillées), une <strong>Cuisine des Vendredis</strong> (gestes, recettes, récits), un <strong>Atelier des Costumes</strong> (confection, prêt cérémoniel). L’objectif : sortir le patrimoine de la <strong>vitrine</strong> pour le remettre dans la <strong>main</strong>.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-rose-700 flex items-center justify-center text-white font-bold text-lg">3</div>
                        <div>
                            <h4 className="font-bold text-blue-300 text-xl">Organiser la diaspora.</h4>
                            <p className="text-slate-300 mt-1 text-base leading-relaxed">Lancer « <strong>Zuhéros en el mundo</strong> » : registre des descendants, <strong>Semaine des retours</strong> indexée au calendrier scolaire, <strong>bourses Abenhumeya</strong> financées par un <strong>fonds 1 %</strong> des loyers du patrimoine. Finalité : remplacer la nostalgie par du <strong>temps passé sur place</strong>.</p>
                        </div>
                    </div>
                </div>

                <hr className="!my-10 border-slate-700" />
                
                <p className="text-center text-2xl font-semibold text-slate-100 !my-10 italic">« Tant qu’on saura dire <em>ici habitaient les Abenfassi, là les Muley, plus haut les Zenati</em>, on ne sera pas morts. »</p>
            </div>
        </ContentPageLayout>
    );
};

const ImageModal: React.FC<{ image: { src: string; description: string }; onClose: () => void }> = ({ image, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-md animate-fadeInUp p-4"
            onClick={(e) => {
                if (e.target === modalRef.current) {
                    onClose();
                }
            }}
            style={{ animationDuration: '300ms' }}
        >
            <div 
              className="flex flex-col items-center gap-4 animate-fadeInUp" 
              style={{ animationDelay: '100ms', animationDuration: '400ms' }}
              onClick={e => e.stopPropagation()}
            >
                <div className="relative">
                    <img 
                        src={image.src} 
                        alt={image.description} 
                        className="block object-contain rounded-lg shadow-2xl"
                        style={{
                            maxWidth: 'calc(100vw - 32px)',
                            maxHeight: 'calc(100vh - 112px)'
                        }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute -top-3 -right-3 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition-colors"
                        aria-label="Fermer l'image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                 <p
                    className="text-white text-center text-lg font-medium max-w-[90vw]"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                >
                    {image.description}
                </p>
            </div>
        </div>
    );
};


const PhotographyPage: React.FC<{setView: (view:View) => void}> = ({setView}) => {
    const [selectedImage, setSelectedImage] = useState<{src: string; description: string} | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        {
            src: 'https://cdn.unwatermark.ai/datarm7/unwatermark/image-watermark-auto-remove-kontext/2025-10-31/output/137f1c4d-26e4-4cb4-890d-435a2771e6d3.jpg?x-oss-process=image/resize,m_fixed,limit_0,w_1024,h_1024',
            description: 'Iglesia de la Resurrección en 1954'
        },
        {
            src: 'https://cdn.unwatermark.ai/datarm7/unwatermark/image-watermark-auto-remove-kontext/2025-10-31/output/786f71dc-a7ba-4148-882e-2d292015375f.jpg?x-oss-process=image/resize,m_fixed,limit_0,w_1024,h_1024',
            description: 'Plaza Mayor en 1954'
        },
        {
            src: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/574567672_2237727663376116_6589817510278199953_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=01AltjkYY8oQ7kNvwG4Wd9x&_nc_oc=AdlW-iQyMuBV8Vlf-EX27BM-gpfxfSTjt8usQE5n5FxWPncrfztFxrA8S5Qb83EuX9fLxGR2XGWp91wrSxyAW2Y3&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=nB6U4tjXyw083AWx6ZMbrg&oh=00_AffHmYJEBLLURNZsodTzVkOeBgyJ79YbXmHjy0VS5bgDjw&oe=690A48C0',
            description: 'Boucherie Muley en 1949'
        },
        {
            src: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/573852710_2237744400041109_8608143957699444727_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=W242OaOWnPkQ7kNvwESyi41&_nc_oc=AdmWcxEISKKVYS-QOOe93GCY_BBGmmDllprI6ks-A4mxRO6XCxFwOfmwG7LXMOUYHevyIVH9lXAATlq2w-WhqwvT&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=_zrxs0wEgmgC0YcNCA3A1w&oh=00_Aff5jmEI1fT77wSm3-iZAV-ZDuPTrqLuPaHay3apDwEGmQ&oe=690A5E8A',
            description: 'Intérieur de la maison chez les Abenadid en 1952'
        },
        {
            src: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/573893548_2237744403374442_8769624443682589844_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ya0V3AaT_4YQ7kNvwHzCihV&_nc_oc=AdkFDp67XtHocahFzAca9Kt4Fm4mQhmhF3uiPM0nr_-oaB0yipPq8FA502FZrq0NH9qKG1G-aab9_901K2KsNkdJ&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=YiCXz2LRWDRxoxx16-_UMA&oh=00_Aff83SEvrWA7La1dul61tE_k8dqJKwO-fDe_LNUNKu3FVw&oe=690A5E3F',
            description: 'Bar-Café de Jorge Abscal-Perez en 1943'
        },
        {
            src: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/574298481_2237744416707774_4298084895962788154_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=F8iAHHMvqi8Q7kNvwHtECIg&_nc_oc=AdkHSyskTAwUoVonNVypyKEL6K8nquEhpLKS8MWmsHRhzn71Ag67f4zPqBq4_MCvjQn_hBY0BnXaQSoUVHy4CvU6&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=BfKTG7unlvevMr_JBny66A&oh=00_AfeOdmukbDG7hNt6U2ZrucxyBHiBXCMQoD59QO3wwrEISA&oe=690A4563',
            description: 'rue Felipe III en 1947'
        },
        {
            src: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/573861449_2237758056706410_6410768228502958660_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XsGOGDyEgcgQ7kNvwErRXaP&_nc_oc=AdkTV184Npt1VlMX7vCQIKDSdolyxrWxjiW1f8DlMNnZtxE9S1LF7pEt401_9eSLuwQ8iEJTHPw2RseIBDz-565j&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=AUfGBOeMx35TUrr24Vd_0Q&oh=00_AffI-wawBPYbNcUbIqU1jhQzJMmjVwy627NZ7P1ialHkHQ&oe=690A73D0',
            description: 'Cour intérieure de la maison des Setes'
        },
        {
            src: 'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/574462085_2237758226706393_3677292840042463955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YtbncbWpVZcQ7kNvwGM9UJ4&_nc_oc=Adn5mym3mrQnlcXzlKhys7V2dtiIkv4raVd41ZySwe808HiFUK7Zj_jSOEwKdSGlcZNNyV13cPnON6SH1XwGUiBA&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=8M-oNc7V_smWt0WmtJIHCQ&oh=00_Afd_lyPJs7BiOU8F6HnPqPW_Zi8eDnz-nToaPCaUSI7qRQ&oe=690A3E45',
            description: "Cimetière d'Almacra"
        },
        {
            src: 'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/573853699_2237758466706369_4598631580543160840_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NiEbfeM5QysQ7kNvwHCM6D6&_nc_oc=Adnh5vFJWuCesGhUkSa7mZFY5NWlhiGlGmQ06olWCyhCN6hgDzSEaY_qWNzl7SUnLvDKqTBfOF5HGyZdcYF2QbcB&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=CpxALNjhKfyAtCYCoZGXcw&oh=00_AfcDKyCT1Vlkd5qWTgYICz1gAldWWB3nL5zEa3zdNuUO8w&oe=690A4C4B',
            description: 'Tombe du jeune soldat Luis Jorge Abascal tombé lors de la guerre du rif'
        },
        {
            src: 'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/574032194_2237769120038637_6771668011497882046_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Gqd8AoA6utgQ7kNvwFPUfQK&_nc_oc=AdlMwmt0MPGUjbZUZmIVJPYXyzQ-6qop7uiksUUaXS2k5iU5wCUUyqgAEbNnWv_vhwyjGaTuYffe33NkmZpigWpH&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=ctFQRKU0npBZJ-5vJ4Af0A&oh=00_AfdlxsX9u72ow2r_j2f5qv4AsWEURae8n9ryDGDEfjFBaw&oe=690A720F',
            description: 'famille El-Faris Antonio et sa femme Juanita en 1951'
        },
        {
            src: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/574403124_2237771293371753_1192218874694376466_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ithI6WgH9aUQ7kNvwFrDJ-z&_nc_oc=Adn-7BPYbf2TBF6tuCtMpEdiMgrsqLlnSv8sjNqJu0xrl7jAY_0vNN2rozcS5LAXjBTNWDn7pS8_0lQ7gWkxs6qt&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=m4UJ33lRVffPAjqckmvKxA&oh=00_Afcyptlc8Ck2UXapKUmNx9sV9ll9MsKGTBtKa7WBmFFLAQ&oe=690A6D3C',
            description: "Intérieur de l'Iglesia de la Resurreccion"
        },
        {
            src: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/574503317_2237776090037940_1333795810195789276_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7vtG3SR03EYQ7kNvwEK0Vyp&_nc_oc=Adlhf0Q5BnHBj7olBXlF9egkohfVAR45md_ah1Y5iCO5ANEeuBpDKfm5uZrXCN0c9OvN-DD6aD4lwbaInjUNWyj9&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=Z3pn3s_vBKeTqpK8SpjRzQ&oh=00_AfcR3f_a0PcrQgsAFPKtRAeeMZRJQ7CDperUKhwl1HBZEw&oe=690A79A7',
            description: 'Groupe de soldats au parc de Zuhéros 1956'
        },
        {
            src: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/574476463_2237783393370543_4308187340433879071_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XWSG-ECFWcEQ7kNvwEOncp3&_nc_oc=AdmsydyhuVN2_p9MazzEGea2MyQCna9qsRyHcc6iw4Vy_KvBEQOGrCvheeB4h4sIT7SjxoZHu9rY8x5AXSxH3unB&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=Fx1EYjjfBge9hrBJyoDg_Q&oh=00_AfefuKmwHBHPyEZ7jMN0vOsFWAU1vWG7FaAFp_tR1vYoKg&oe=690A73B3',
            description: 'Caféteria de Mr. Ramon Eljadicàrim'
        },
        {
            src: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/574529577_2237785783370304_8265803052204123767_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3qnz226z_joQ7kNvwEsIZDP&_nc_oc=AdmHHJFPYKMzK-quPgs1TfCUE-YUYpUFZDNf8vj5I2ShHczaidVvCBLnPVbq1YhTk5Npeo4SAx_Vj8yhqt7DfBua&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=scH43usLgeIfAE9Y13HiiQ&oh=00_Aff-av7JoaY39yluVUD_Z2sqa8EXl0E-tpuDovKB3PwceA&oe=690A5125',
            description: 'Equipe de football de Zuhéros'
        },
        {
            src: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/574269073_2237808080034741_1803986595340907203_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vOCUeNlAL7AQ7kNvwE_BzrE&_nc_oc=AdlLYBvTUAM6oWfzvmjIJxtTLNFaNUkKNoR_wHkmYAl8Wvx560cx8ldIo91P8Bb2EUWGTDI6xn51VkkPViszZIW4&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=us8hSg1sHcd2ZY0-fGF_wQ&oh=00_Afed4UWCgXCIxzOXDgyG_Qtlh3FGVkfON2AamcTgG9FQ9w&oe=690A83DA',
            description: 'Calle Del Sol, Hameau de Tamesguida (Zuhéros) - 1951'
        },
        {
            src: 'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/573852705_2237821576700058_5873881218684458745_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=An0L3eWnVCQQ7kNvwG2bYrh&_nc_oc=AdnpZw0lYsQLbY9Qa4XOSlS11k9BjHO0gPpC_AdBFt3alzwLHdrRQV0KWLy8HxlsMTYLAup1a4TqdPQWrvB9Uhun&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=SPQGp1BC3yUo49T8dq6pMQ&oh=00_Afe1vawrv-YzVxchWUBzoWRzquX1Ng4Svu1EfN9pj1evAw&oe=690A6162',
            description: 'La Calle de Santa Isabella, Zuhéro Alto 1955'
        },
        {
            src: 'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/574350113_2237832676698948_2235437820440431978_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZZOCfr07cPgQ7kNvwGFEhfU&_nc_oc=Adm5C046WAR1oq_kyASdAcKHSoOD5kKEcARb8mnPlivKlyt3CDKT296u6TnraB2mdM3NUBxdSGDXaNbSeaxqdyPn&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=Xl3JHVPkjbjoatFtWbsWcA&oh=00_AffHHrf8T2tr32r51iWZh_9Tiu79T90O5943CLEojsB61g&oe=690A5BD5',
            description: 'Hotel de ville de Zuhéros 1954'
        }
    ];

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const currentImage = images[currentIndex];

    return (
        <ContentPageLayout setView={setView}>
             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                Photographies de Zuheros
            </h1>
            <h2 className="text-xl text-slate-300 mb-8 italic">Regards sur un village de mémoire</h2>

            <div className="flex flex-col items-center">
                <div className="relative w-full max-w-4xl aspect-video mb-4">
                    <button
                        onClick={() => setSelectedImage(currentImage)}
                        className="w-full h-full rounded-2xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500"
                    >
                         <img 
                            key={currentIndex}
                            src={currentImage.src} 
                            alt={currentImage.description}
                            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 animate-fadeInUp"
                            style={{ animationDuration: '400ms' }}
                        />
                    </button>
                    
                    <button onClick={goToPrevious} aria-label="Image précédente" className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    
                    <button onClick={goToNext} aria-label="Image suivante" className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
                
                <div key={currentIndex} className="text-center animate-fadeInUp h-10" style={{ animationDuration: '400ms', animationDelay: '100ms' }}>
                    <p className="text-lg font-semibold text-slate-100">{currentImage.description}</p>
                    <p className="text-sm text-slate-400 mt-1">{currentIndex + 1} / {images.length}</p>
                </div>
            </div>

            <div className="mt-4 w-full max-w-4xl mx-auto">
                <div className="flex gap-2 p-2 overflow-x-auto no-scrollbar">
                    {images.map((img, index) => (
                        <button 
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-300 ${currentIndex === index ? 'ring-2 ring-blue-500 scale-105' : 'opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img.src} alt={img.description} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
        </ContentPageLayout>
    );
};

const famousPeopleData = [
    {
      name: "Marina Abenfassi y Morra", lifespan: "1937–2004", title: "écrivaine, chroniqueuse de la mémoire morisque",
      imageUrl: "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/573875585_2238328476649368_311795464744896223_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=umrTXOyI6t0Q7kNvwH_kGb6&_nc_oc=AdmgLFkWD-aI2ziy_nJsK6lxC_Y7E4TfgjENhZIqt3iQ0u0YObZ0NK9TH7tc0RQLh_R8PRWGcvhxHymmJd3FUm_o&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=qz9jNkqMyoyxjc6xAEEGrQ&oh=00_AfehYnKX1sl2bL__y0YMsRkyODJ4ECGPC49WYg9N2s5Pcg&oe=690B2599",
      details: [
        { label: "Née", value: "Zuhéros Alto." },
        { label: "Familles", value: "Abenfassi (commerce), Morra de Granada (propriétaires)." },
        { label: "Études", value: "Letras, Universidad de Granada." }
      ],
      sections: [
        { title: "Œuvre clé", content: "El Rumor del Alba (1978), roman-témoignage sur trois générations de femmes FHZ, où les mots du parler zuhéirois (Imabel, Laulacuela, Sabilano) deviennent des clés narratives." },
        { title: "Apport", content: "Marina fait entrer la mémoire crypto-islamique de Zuhéros dans la littérature espagnole de la Transition. Elle relie la voix des patios (prières “zuhéroises”, veillées funéraires) à la grande Histoire (Rif, guerre civile, exil). Sa prose, sobre et précise, refuse l’exotisme, travaille la nuance entre catholicisme public et survivances intimes." },
        { title: "Héritage", content: "Un lectorat scolaire et universitaire durable ; l’édition critique de 1999 inclut un glossaire du dialecte de Zuhéros et des cartes des quartiers (Zuheros Viejo, Tamesguida, Almanara). Une salle de la bibliothèque municipale porte son nom." }
      ]
    },
    {
        name: "Julián Zenati Cuérrez", lifespan: "1949–2015", title: "député provinciale, architecte de lois patrimoniales",
        imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/311ee693-29d2-4938-a954-9f3e386d9558.png",
        details: [
            { label: "Né", value: "Zuhéros Viejo." },
            { label: "Familles", value: "Zenati (horlogerie), Cuérrez (quincaillerie)." },
            { label: "Formation", value: "Droit à Córdoba, stagiaire au CFHZ." }
        ],
        sections: [
            { title: "Action", content: "Député (centro-progresista) à la Diputación de Córdoba (1987–1995), puis conseiller patrimoine (1996–2000). Porteur de la “Ley de Talleres Vivos” : aides aux ateliers ruraux (forge Abascal, cuir Sanayes, broderie Abendanan), baux bonifiés pour résidences d’artisans au centre ancien." },
            { title: "Idée-force", content: "“La pierre n’a de sens que si quelqu’un y éteint la lumière le soir.” Il couple conservation bâtie et retour résidentiel (baux de 10–12 ans)." },
            { title: "Héritage", content: "Le “modèle Zenati” sera imité dans plusieurs bourgs andalous ; à Zuhéros, il évite la muséification sèche, réouvre trois ateliers et stabilise une classe à Abenhumeya à la fin des années 1990." }
        ]
    },
    {
        name: "Isabel “Chabela” Muley Pérez", lifespan: "1962–", title: "cheffe et anthropologue culinaire, ambassadrice des saveurs zuhéiroises",
        imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e63ebb2f-3f75-4fdf-893f-01a3f7508f01.png",
        details: [
            { label: "Née", value: "Tamesguida." },
            { label: "Familles", value: "Muley (boucherie), Pérez (papeterie)." },
            { label: "Parcours", value: "École hôtelière de Séville ; terrains en Subbética et diaspora (Marseille, Montevideo)." }
        ],
        sections: [
            { title: "Signature", content: "Relecture du vendredi culinaire (alcuzcuz, miel, huile verte) et des “cérémonies de seuil” (eau de laurier, pain du deuil). Livre manifeste : Cocina de Patio (2009) — recettes, récits d’ustensiles, cartes des patios." },
            { title: "Apport", content: "Chabela passe de la “tradition” au rituel mis en pratique : elle documente d’où viennent les gestes (purifications, orientation, part du pauvre), les contextualise sans folklore, et forme des jeunes (FHZ et FNZ) aux recettes et au service de table des veillées." },
            { title: "Héritage", content: "Son espace-atelier La Dalarso réimplante des routines du vendredi ; la diaspora s’en empare via des “dîners d’aube” (Buenos Aires, Paris, Madrid)." }
        ]
    },
    {
        name: "Esteban Abenadid Vargas", lifespan: "1974–", title: "urbaniste des petites villes, “villes habitables”",
        imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/aafbf289-58ea-417b-82e7-81a8fb305c0b.png",
        details: [
            { label: "Né", value: "Zuhéros Bajo." },
            { label: "Familles", value: "Abenadid (vigne/olives), Vargas/Vergas (commerce)." },
            { label: "Études", value: "Urbanisme, Madrid ; thèse sur “propriété dissociée/résidence”." }
        ],
        sections: [
            { title: "Projets", content: "Plan de barrios vivos : reconversion de rez-de-chaussée vacants en ateliers-logements, micro-crédit conditionné, priorités aux jeunes ménages. Défend le contrat d’ancrage (occupation ≥ 10 ans = aides + fiscalité locale douce)." },
            { title: "Thèses", content: "1) Propriété ici, vie ailleurs tue les centres ; 2) le tourisme pur est non viable sans écosystème résidentiel ; 3) l’école est l’organe vital." },
            { title: "Héritage", content: "À Zuhéros, son Plan Abenadid rouvre 21 rez-de-chaussée en 5 ans ; ailleurs en Andalousie, on reprend la méthode (cartes fines de flux, contrats à impact)." }
        ]
    },
    {
        name: "Sofía Abendanan Harbez", lifespan: "1981–", title: "artiste textile, gardienne des gestes et des motifs",
        imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e92735c6-3373-4a64-b287-e5be6239242d.png",
        details: [
            { label: "Née", value: "Calle San Pierre." },
            { label: "Familles", value: "Abendanan (atelier couture), Harbez (administration)." },
            { label: "Formation", value: "Beaux-Arts Séville ; résidence à Lisbonne (azulejos & soieries)." }
        ],
        sections: [
            { title: "Œuvre", content: "Tisse des gilets brodés et ceintures argent de la mariée zuhéiroise, en séries contemporaines. Exposition Rasulio (2018) : vêtements-icônes, doublures intérieures brodées de mots (Imabel, Atibelá, Laulacuela)." },
            { title: "Geste", content: "Elle n’expose jamais sans atelier public (2h/jour) : transmission du point, du patron et des histoires qui vont avec." },
            { title: "Héritage", content: "Relance d’une filière locale (filigrane, broderie, coupe paysanne). Prix national d’artisanat (2021). Un manuel, Costume de Zuhéros : patrons & mémoires, traduit en portugais et italien." }
        ]
    },
    {
        name: "Tomás Jakimi Cordoban", lifespan: "1968–", title: "journaliste d’investigation, “l’âme derrière la pierre”",
        imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/a4611a25-94fc-434b-ad3c-0170709c9e36.png",
        details: [
            { label: "Né", value: "Almanara." },
            { label: "Familles", value: "Jakimi (serrurerie, caches), Cordoban (droguerie)." },
            { label: "Parcours", value: "Reporter à Madrid." }
        ],
        sections: [
            { title: "Séries", content: "Propiedad y Ausencia (2010) — cartographie de l’indivision, de la vacance et des délégations à distance ; Abenhumeya (2015) — enquête sur les fermetures de classes et la démographie FHZ ; El Corán de las Escaleras (2017) — récit enquêté autour du manuscrit de 1743." },
            { title: "Méthode", content: "Documents, mais aussi paroles : vieux registres, carnets domestiques, entretiens de couloir, notes de sacristies." },
            { title: "Héritage", content: "Ses dossiers provoquent la création d’un inventaire public (ouvert) des biens vacants et la mise en consultation des archives du CFHZ." }
        ]
    },
    {
        name: "Lourdes Sanayes Benjumea", lifespan: "1990–", title: "députée européenne (écologie sociale), voix des “territoires-mémoire”",
        imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3f41c0b1-f17d-4b08-a3cd-1db6c590b52d.png",
        details: [
            { label: "Née", value: "Zuheros Viejo." },
            { label: "Familles", value: "Sanayes (cuir), Benjumea (réseaux urbains)." },
            { label: "Études", value: "Politiques, Paris & Bruxelles." }
        ],
        sections: [
            { title: "Agenda", content: "Politiques européennes pour petites villes : réhabilitation résidentielle, économies locales (olive, cuir, textile), écoles rurales. Porte au Parlement la notion de territoires-mémoire : lieux où la transmission est aussi importante que la croissance." },
            { title: "Style", content: "Parcours mêlant affects et données ; cite la boucherie Muley et l’atelier Abendanan en séance, mais négocie budget, indicateurs, conditionnalités." },
            { title: "Héritage", content: "Un programme-pilote “Barrios Vivos EU” : cofinancement de 10 petites villes (dont Zuhéros) avec obligations d’ateliers ouverts, occupation longue, bourses Abenhumeya." }
        ]
    },
    {
        name: "Elena Morra de Granada", lifespan: "1982–", title: "ministre de la Culture, architecte du “Patrimoine Rural Vivant”",
        imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/0cad3d73-d693-42a0-ab31-069afe122163.png",
        details: [
            { label: "Née", value: "Zuhéros (quartier Zuheros Viejo)." },
            { label: "Familles", value: "Zenati (horlogerie), Morra de Granada (métayers)." },
            { label: "Formation", value: "Normalienne (filologie hispanique), doctorat sur les parlers andalous minoritaires." }
        ],
        sections: [
            { title: "Apport", content: "Fait voter la Loi Patrimoine Rural Vivant (fonds pérenne, 1% des grands chantiers d’infrastructures réaffecté aux parlers, métiers et rituels locaux). Elle protège les archives orales (dialectes, chants de cueillette), finance des écoles-ateliers (forge, cuir, broderie)." },
            { title: "Signature", content: "Programme “Una puerta, un nombre” — une plaque mémorielle par maison notable (ex : Abendanan, atelier de couture, 1923–1975)." },
            { title: "Impact", content: "A imposé l’idée qu’on sauve un village en sauvant des usages, pas seulement des murs." }
        ]
    },
    {
      name: "Samuel Muley", lifespan: "1988–", title: "entrepreneur de la diaspora ; « Raíces », un pont numérique",
      imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/516713a2-fdb4-4bdd-b8ac-37948f10774e.png",
      details: [
        { label: "Origines", value: "Né à Buenos Aires d’un père Muley (branche de la boucherie historique) et d’une mère Abenfassi." },
      ],
      sections: [
        { title: "Projet", content: "« Raíces » : cartographier les maisons FHZ ; contrats d’ancrage locatifs (10–12 ans) pour jeunes familles ; micro-bourses « retour à Abenhumeya » ; QR codes sur façades (audio : souvenirs des anciens)." },
        { title: "Modèle", content: "1 % reversé par les propriétaires FHZ de la diaspora → fonds pour toitures, façades et ateliers-écoles." },
        { title: "Héritage", content: "37 foyers revenus à l’année dans le centre en cinq ans ; trois boutiques rouvertes (mercerie, maroquinerie, horlogerie)." },
        { title: "Vision", content: "« On ne sauve pas un village avec des likes, on le sauve avec des contrats et des clés. »" }
      ]
    },
    {
      name: "David Zenati-Cordoban",
      lifespan: "1956–",
      title: "Avocat des droits et de la mémoire, affaire des disparus",
      imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/af8115d9-b96f-4349-ba9d-9ebe0be15473.png",
      details: [
        { label: "Né", value: "Zuhéros Bajo, fils d’un horloger." },
        { label: "Formation", value: "Avocat à Madrid, spécialiste du droit de la mémoire."}
      ],
      sections: [
        { title: "Action", content: "Spécialiste du droit de la mémoire, il plaide plusieurs affaires fondées sur la Ley de Memoria Democrática, dont la réouverture d’une fosse commune de 1936 ayant permis l’identification de Miguel Miguel Abasen (affaire dite “Julia”)." },
        { title: "Méthode", content: "Une approche rigoureuse combinant procédure judiciaire et enquête documentaire : collecte de témoignages, carnets, photographies, entretiens familiaux." },
        { title: "Résultat", content: "La jurisprudence Zenati consacre la valeur opposable de la preuve topographique pour orienter les exhumations. Parallèlement, il milite pour la création d’un Musée de la Mémoire des Disparus de la guerre civile espagnole." }
      ]
    },
    {
      name: "Alba Pérez-Abascal",
      lifespan: "1983–",
      title: "Journaliste d’investigation, lauréate du prix Ortega y Gasset",
      imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/d5f0c958-8399-45ff-a0d7-fedab4f4df55.png",
      details: [
        { label: "Née", value: "à Almanara, fille d'un avocat et d'une couturière." },
        { label: "Parcours", value: "Diplômée de l’Universidad de Sevilla, elle rejoint un grand quotidien national après des débuts en presse locale, se spécialisant sur l'économie et les marchés publics." }
      ],
      sections: [
        { title: "Faits marquants", content: "Révèle un système de surfacturation dans la rénovation d’infrastructures sportives régionales, met au jour un cartel dans l’huile d’olive, déclenchant des amendes et réformes, et co-signe une série influente sur les achats d’IA et de cybersécurité par l’administration." },
        { title: "Distinctions", content: "Prix Ortega y Gasset (catégorie Meilleure enquête), European Press Prize (Investigative Reporting)." },
        { title: "Méthode", content: "Combine le journalisme forensique (analyse de bases de données, scraping légal, suivi des bénéficiaires finaux) avec une narration accessible pour le grand public, notamment via des fiches “À qui profite ?”." },
        { title: "Héritage", content: "Auteure de “La Facture invisible”, un livre-enquête de référence sur la déperdition de l'argent public dans la sous-traitance en cascade, qui inclut des propositions législatives concrètes." }
      ]
    },
    {
      name: "Lucas “Javier” Venmegri",
      lifespan: "2001–",
      title: "Footballeur international, ailier de Granada CF",
      imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e2f748f2-3813-4de5-a0ba-446a4800994d.png",
      details: [
        { label: "Parcours", value: "Formé en Andalousie, repéré en Segunda ; transfert à Granada CF, puis montée en Liga." },
        { label: "Profil sportif", value: "Ailier explosif, 1v1, volume défensif élevé ; réputé pour ses centres à mi-hauteur et son travail sans ballon." }
      ],
      sections: [
        { title: "Palmarès", content: "Vainqueur de la Copa del Rey, où il est titulaire en finale et délivre une passe décisive. Atteint les quarts de finale de la Ligue Europa, marquant 4 buts durant la campagne. Remporte la Ligue des Nations avec la sélection nationale, réalisant une entrée décisive en prolongation." },
        { title: "Extra-sportif", content: "Crée la Fondation Morra 7 : bourses pour jeunes gardiens/ailiers et programme “Devoirs & Dribbles” (soutien scolaire/club)." },
        { title: "Réputation", content: "Professionnel discret, “coach-compatible”, apprécié pour sa sobriété médiatique et son engagement communautaire." }
      ]
    }
];

const PullQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <blockquote className="my-6 py-4 text-center text-xl italic font-medium text-slate-200 border-y-2 border-amber-500/30 bg-slate-900/50 rounded-lg not-prose">
       “{children}”
    </blockquote>
);

const PersonProfile: React.FC<{ person: typeof famousPeopleData[0] }> = ({ person }) => {
    const quoteSections = ['Idée-force', 'Vision'];
    
    return (
      <article className="py-8">
        <header className="mb-8 text-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-1 tracking-tight">{person.name}</h2>
            <p className="text-lg text-slate-400 font-medium">{person.lifespan}</p>
            <p className="mt-2 text-xl italic text-blue-300/90 max-w-2xl mx-auto">{person.title}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <aside className="lg:col-span-4 xl:col-span-3">
                <div className="sticky top-24 bg-slate-900/50 border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col items-center">
                    <img 
                        src={person.imageUrl} 
                        alt={`Portrait de ${person.name}`}
                        className="w-40 h-40 object-cover rounded-full border-4 border-slate-700/80 mb-4"
                    />
                    <div className="w-full">
                        <h3 className="text-lg font-bold text-blue-400 mb-3 tracking-wide border-b border-slate-700 pb-2 text-center">FICHE D'IDENTITÉ</h3>
                        <div className="text-slate-300 space-y-3 pt-2 text-sm">
                            {person.details.map(detail => (
                                <div key={detail.label}>
                                    <p className="font-semibold text-slate-400 uppercase text-xs tracking-wider">{detail.label}</p>
                                    <p>{detail.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 prose-custom text-slate-300 max-w-none space-y-6 text-lg leading-relaxed">
                {person.sections.map(section => {
                    const content = section.content;
                    if (quoteSections.includes(section.title) && (content.includes('“') || content.includes('«'))) {
                        const quoteMatch = content.match(/[“«]([^”»]+)[”»]/);
                        const quote = quoteMatch ? quoteMatch[1] : '';
                        const parts = content.split(/[“«][^”»]+[”»]/);

                        return (
                            <div key={section.title}>
                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mb-2 tracking-tight">{section.title}</h3>
                                {parts[0] && <p className="inline">{parts[0].trim()} </p>}
                                {quote && <PullQuote>{quote}</PullQuote>}
                                {parts[1] && <p className="inline">{parts[1].trim()}</p>}
                            </div>
                        );
                    }

                    return (
                        <div key={section.title}>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mb-2 tracking-tight">{section.title}</h3>
                            <p>{content}</p>
                        </div>
                    );
                })}
            </div>
        </div>
      </article>
    );
};

const FamousPeoplePage: React.FC<{
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    setView: (view: View) => void;
}> = ({ currentIndex, setCurrentIndex, setView }) => {
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? famousPeopleData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, setCurrentIndex]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === famousPeopleData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, setCurrentIndex]);

    const currentPerson = famousPeopleData[currentIndex];

    return (
      <ContentPageLayout setView={setView}>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-6 tracking-tight">
          Zuhérois Connus
        </h1>
        <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed mb-8">
            <p>Des figures, toutes liées par leurs racines à Zuheros, ont fortement marqué la vie politique, culturelle et intellectuelle en Espagne et dans sa diaspora. Chacune s’enracine dans la topographie, les lignages et les tensions mémorielles propres à Zuheros.</p>
        </div>

        <div className="mt-8 relative">
            <button onClick={goToPrevious} aria-label="Profil précédent" className="absolute top-1/2 left-0 md:-left-6 -translate-y-1/2 z-10 bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div key={currentIndex} className="animate-fadeInUp" style={{ animationDuration: '400ms' }}>
                 <PersonProfile person={currentPerson} />
            </div>
            <button onClick={goToNext} aria-label="Profil suivant" className="absolute top-1/2 right-0 md:-right-6 -translate-y-1/2 z-10 bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            {famousPeopleData.map((person, slideIndex) => (
                <button
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`h-12 w-12 rounded-full overflow-hidden transition-all duration-300 ease-in-out border-2 ${
                        currentIndex === slideIndex ? 'border-blue-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Aller au profil de ${person.name}`}
                >
                    <img src={person.imageUrl} alt={person.name} className="w-full h-full object-cover"/>
                </button>
            ))}
        </div>
        
        <div className="mt-12 pt-8 border-t-2 border-white/10 prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
           <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-8 tracking-tight">Ce qui les relie</h2>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Un lieu</strong>: Zuhéros comme matrice (quartiers, toponymes, ateliers).</li>
                <li><strong>Une blessure</strong>: les guerres du XXᵉ, la démographie brisée, la diaspora.</li>
                <li><strong>Un fil</strong>: transformer la <strong>mémoire</strong> en <strong>capacité</strong> (lois, cuisines, tissus, plans, enquêtes, politiques).</li>
                <li><strong>Une éthique</strong>: pas d’“exotisme” ni de “muséification” ; <strong>réactiver</strong> pour <strong>habiter</strong>.</li>
            </ul>

           <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mt-8 tracking-tight">Ligne d’horizon</h2>
           <p>Ces vies dessinent une politique du <strong>concret</strong> : rouvrir des portes, replacer des tables, réapprendre des mots, financer des métiers, enregistrer des voix. Leur idée commune : si Zuhéros a donné à l’Espagne ses morts, il peut encore lui donner une <strong>science du tenir</strong> — tenir ensemble la pierre et la vie, la mémoire et l’avenir.</p>
        </div>
      </ContentPageLayout>
    );
};

const DemographyPage: React.FC<{setView: (view:View) => void}> = ({setView}) => {
    const data = [
        { year: 1897, value: 2000 }, { year: 1898, value: 2012 }, { year: 1899, value: 1857 },
        { year: 1900, value: 1868 }, { year: 1901, value: 1878 }, { year: 1902, value: 1889 },
        { year: 1903, value: 1901 }, { year: 1904, value: 1912 }, { year: 1905, value: 1923 },
        { year: 1906, value: 1934 }, { year: 1907, value: 1945 }, { year: 1908, value: 1956 },
        { year: 1909, value: 1969 }, { year: 1910, value: 1980 }, { year: 1911, value: 1991 },
        { year: 1912, value: 2004 }, { year: 1913, value: 2015 }, { year: 1914, value: 2027 },
        { year: 1915, value: 2040 }, { year: 1916, value: 2051 }, { year: 1917, value: 2064 },
        { year: 1918, value: 2076 }, { year: 1919, value: 2089 }, { year: 1920, value: 2102 },
        { year: 1921, value: 2104 }, { year: 1922, value: 2106 }, { year: 1923, value: 2108 },
        { year: 1924, value: 2110 }, { year: 1925, value: 2112 }, { year: 1926, value: 2115 },
        { year: 1927, value: 2087 }, { year: 1928, value: 2009 }, { year: 1929, value: 2023 },
        { year: 1930, value: 2036 }, { year: 1931, value: 2050 }, { year: 1932, value: 2064 },
        { year: 1933, value: 2077 }, { year: 1934, value: 2092 }, { year: 1935, value: 2107 },
        { year: 1936, value: 2002 }, { year: 1937, value: 1881 }, { year: 1938, value: 1895 },
        { year: 1939, value: 1800 }, { year: 1940, value: 1814 }, { year: 1941, value: 1829 },
        { year: 1942, value: 1845 }, { year: 1943, value: 1861 }, { year: 1944, value: 1879 },
        { year: 1945, value: 1896 }, { year: 1946, value: 1914 }, { year: 1947, value: 1934 }
    ];

    const Chart: React.FC = () => {
        const [tooltip, setTooltip] = useState<{ x: number, y: number, year: number, value: number } | null>(null);
        const svgRef = useRef<SVGSVGElement>(null);

        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 20, bottom: 60, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const minYear = Math.min(...data.map(d => d.year));
        const maxYear = Math.max(...data.map(d => d.year));
        const minValue = 1700; // Hardcode min for better visualization
        const maxValue = 2200; // Hardcode max for better visualization

        const xScale = (year: number) => margin.left + ((year - minYear) / (maxYear - minYear)) * innerWidth;
        const yScale = (value: number) => margin.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;
        
        const linePath = data.map(d => `${xScale(d.year)},${yScale(d.value)}`).join(' L ');
        const areaPath = `M ${xScale(minYear)},${yScale(minValue)} L ${linePath} L ${xScale(maxYear)},${yScale(minValue)} Z`;

        const rifWarX = xScale(1921);
        const rifWarWidth = xScale(1927) - rifWarX;
        const civilWarX = xScale(1936);
        const civilWarWidth = xScale(1939) - civilWarX;

        return (
             <div className="relative">
                <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                    <defs>
                        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                        </linearGradient>
                    </defs>
                    {/* Annotations */}
                    <rect x={rifWarX} y={margin.top} width={rifWarWidth} height={innerHeight} fill="rgba(59, 130, 246, 0.1)" />
                    <text x={rifWarX + rifWarWidth/2} y={margin.top + 20} textAnchor="middle" fill="#3b82f6" className="text-xs font-semibold">Guerre du Rif</text>

                    <rect x={civilWarX} y={margin.top} width={civilWarWidth} height={innerHeight} fill="rgba(190, 18, 60, 0.1)" />
                    <text x={civilWarX + civilWarWidth/2} y={margin.top + 20} textAnchor="middle" fill="#be123c" className="text-xs font-semibold">Guerre Civile</text>
                    
                    {/* Y Axis */}
                    {[1800, 2000, 2200].map(val => (
                        <g key={val}>
                            <line x1={margin.left} y1={yScale(val)} x2={width - margin.right} y2={yScale(val)} stroke="#334155" strokeDasharray="2" />
                            <text x={margin.left - 10} y={yScale(val) + 4} textAnchor="end" fill="#94a3b8" className="text-xs">{val}</text>
                        </g>
                    ))}
                    <text transform={`translate(15, ${height/2}) rotate(-90)`} textAnchor="middle" fill="#94a3b8" className="text-sm font-semibold">Population</text>

                    {/* X Axis */}
                    {data.filter(d => d.year % 5 === 0).map(d => (
                         <g key={d.year}>
                            <text x={xScale(d.year)} y={height - margin.bottom + 20} textAnchor="middle" fill="#94a3b8" className="text-xs">{d.year}</text>
                         </g>
                    ))}
                    <text x={width/2} y={height-10} textAnchor="middle" fill="#94a3b8" className="text-sm font-semibold">Année</text>

                    {/* Chart Paths */}
                    <path d={`M ${areaPath}`} fill="url(#area-gradient)" />
                    <path d={`M ${linePath}`} fill="none" stroke="#3b82f6" strokeWidth="2" />

                    {/* Interaction Points */}
                     <g onMouseLeave={() => setTooltip(null)}>
                        {data.map(d => (
                            <circle 
                                key={d.year} 
                                cx={xScale(d.year)} 
                                cy={yScale(d.value)} 
                                r="8" 
                                fill="transparent" 
                                onMouseEnter={() => setTooltip({x: xScale(d.year), y: yScale(d.value), year: d.year, value: d.value})}
                            />
                        ))}
                    </g>
                     {tooltip && (
                        <g>
                            <circle cx={tooltip.x} cy={tooltip.y} r="4" fill="#3b82f6" />
                            <line x1={tooltip.x} y1={tooltip.y} x2={tooltip.x} y2={height - margin.bottom} stroke="#3b82f6" strokeDasharray="2" />
                        </g>
                    )}
                </svg>
                 {tooltip && (
                    <div className="absolute pointer-events-none p-2 bg-slate-950/80 border border-slate-700 rounded-md text-center text-sm shadow-lg" style={{ left: tooltip.x, top: tooltip.y - 60, transform: 'translateX(-50%)' }}>
                        <p className="font-bold text-blue-300">{tooltip.year}</p>
                        <p className="text-slate-200">{tooltip.value} hab.</p>
                    </div>
                 )}
            </div>
        );
    }


    return (
        <ContentPageLayout setView={setView}>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                Démographie : Le village à l'épreuve des guerres
            </h1>
            <h2 className="text-xl text-slate-300 mb-8 italic">Une population fauchée par les conflits du XXᵉ siècle</h2>
            
            <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl mb-8">
                <Chart />
            </div>

            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p>Ce graphique ne représente pas seulement des chiffres, mais les cicatrices démographiques laissées par l'histoire sur le corps même de Zuheros. Chaque fluctuation de cette courbe raconte une histoire de naissances, de départs et, surtout, d'absences. L'analyse de cette évolution révèle le coût humain exorbitant des conflits qui ont marqué le village.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">La stagnation du Rif (1921-1927)</h3>
                <p>La période de la Guerre du Rif montre une population qui atteint un pic avant d'entamer un déclin. Bien que moins spectaculaire que la chute suivante, cette stagnation est un signe avant-coureur. La perte de près de 200 jeunes hommes, partis combattre au Maroc pour ne jamais revenir, a privé le village d'une part de sa force vive. Moins de mariages, moins de naissances : la croissance de Zuheros est brutalement freinée. La "saignée" est démographique avant d'être statistique : c'est l'avenir du village qui est amputé.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">L'effondrement de la Guerre Civile (1936-1939)</h3>
                <p>La véritable catastrophe démographique est visible entre 1936 et 1939. La population s'effondre, passant de plus de 2100 à 1800 habitants en seulement trois ans. Cette chute vertigineuse est le résultat direct de la Guerre Civile Espagnole. Elle ne compte pas seulement les morts au combat, mais aussi les exécutions, les disparitions, et l'exode des familles fuyant la violence et la répression. Zuheros se vide. C'est plus qu'une crise, c'est une hémorragie qui menace la survie même du village.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Une lente et fragile reconstruction</h3>
                <p>Après 1939, la courbe remonte péniblement. La reconstruction est lente, le traumatisme profond. La population ne retrouvera jamais les niveaux d'avant-guerre dans la période étudiée. Le village, affaibli et endeuillé, entame une longue convalescence. Cette visualisation met en lumière un fait essentiel : pour Zuheros, les guerres du XXᵉ siècle n'ont pas été des événements lointains, mais une série de coups portés au cœur de sa communauté, dont les conséquences démographiques se lisent encore aujourd'hui.</p>
            </div>
        </ContentPageLayout>
    );
};

const HeroProfile: React.FC<{ hero: Hero }> = ({ hero }) => (
    <article className="py-8">
        <header className="mb-8 text-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-500 mb-1 tracking-tight">{hero.name}</h2>
            <p className="text-lg text-slate-400 font-medium">{hero.lifespan}</p>
            <p className="mt-2 text-xl italic text-amber-300/90 max-w-2xl mx-auto">{hero.rank}, {hero.unit}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <aside className="lg:col-span-4 xl:col-span-3">
                <div className="sticky top-24 bg-slate-900/50 border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col items-center">
                    <img 
                        src={hero.imageUrl} 
                        alt={`Portrait de ${hero.name}`}
                        className="w-40 h-40 object-cover rounded-full border-4 border-slate-700/80 mb-4"
                    />
                    <div className="w-full">
                        <h3 className="text-lg font-bold text-amber-400 mb-3 tracking-wide border-b border-slate-700 pb-2 text-center">FICHE D'ACTION</h3>
                        <div className="text-slate-300 space-y-3 pt-2 text-sm">
                            <div>
                                <p className="font-semibold text-slate-400 uppercase text-xs tracking-wider">Né(e)</p>
                                <p>{hero.birthPlace}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-400 uppercase text-xs tracking-wider">Théâtre</p>
                                <p>{hero.theater}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 prose-custom text-slate-300 max-w-none space-y-6 text-lg leading-relaxed">
                <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mb-2 tracking-tight">Acte de bravoure</h3>
                    <p>{hero.act}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mb-2 tracking-tight">Bilan</h3>
                    <p>{hero.outcome}</p>
                </div>
                 <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mb-2 tracking-tight">Décorations</h3>
                    <ul className="list-disc list-inside">
                        {hero.decorations.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 !mb-2 tracking-tight">Lien avec Zuhéros</h3>
                    <p>{hero.zuhérosConnection}</p>
                </div>
            </div>
        </div>
      </article>
);


const HeroesPage: React.FC<{
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    setView: (view: View) => void;
}> = ({ currentIndex, setCurrentIndex, setView }) => {

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? heroesData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, setCurrentIndex]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === heroesData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, setCurrentIndex]);

    const currentHero = heroesData[currentIndex];

    return (
      <ContentPageLayout setView={setView}>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-6 tracking-tight">
          Héros de l'Armée
        </h1>
        <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed mb-8">
            <p>Au-delà du sacrifice ultime, de nombreux fils de Zuhéros se sont distingués par des actes de bravoure exceptionnels au service de l'Espagne. Cette section rend hommage à dix de ces héros, dont le courage et le sang-froid dans des situations extrêmes ont permis de sauver des vies et de remplir leur mission avec honneur.</p>
        </div>

        <div className="mt-8 relative">
            <button onClick={goToPrevious} aria-label="Profil précédent" className="absolute top-1/2 left-0 md:-left-6 -translate-y-1/2 z-10 bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div key={currentIndex} className="animate-fadeInUp" style={{ animationDuration: '400ms' }}>
                 <HeroProfile hero={currentHero} />
            </div>
            <button onClick={goToNext} aria-label="Profil suivant" className="absolute top-1/2 right-0 md:-right-6 -translate-y-1/2 z-10 bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            {heroesData.map((hero, slideIndex) => (
                <button
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`h-12 w-12 rounded-full overflow-hidden transition-all duration-300 ease-in-out border-2 ${
                        currentIndex === slideIndex ? 'border-amber-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Aller au profil de ${hero.name}`}
                >
                    <img src={hero.imageUrl} alt={hero.name} className="w-full h-full object-cover"/>
                </button>
            ))}
        </div>
      </ContentPageLayout>
    );
};


type View = 'home' | 'memorial' | 'presentation' | 'wars' | 'heritage' | 'photography' | 'famous' | 'demography' | 'heroes' | 'articles';

interface SearchableItem {
  type: 'person' | 'page' | 'famous' | 'hero' | 'article';
  title: string;
  content: string;
  id: string | number;
}

const SideMenu: React.FC<{ 
    currentView: View, 
    setView: (view: View) => void,
    isMenuOpen: boolean,
    setIsMenuOpen: (isOpen: boolean) => void,
    searchableIndex: SearchableItem[],
    onResultClick: (item: SearchableItem) => void;
}> = ({ currentView, setView, isMenuOpen, setIsMenuOpen, searchableIndex, onResultClick }) => {
    const menuGroups = [
         {
            title: '',
            items: [
                { id: 'home', label: "Accueil", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /> },
            ]
        },
        {
            title: 'Explorer',
            items: [
                { id: 'memorial', label: "Mémorial", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-2.053M15 19.128v-3.863M15 19.128l-2.625.372a9.337 9.337 0 01-4.121-2.053m0 0a9.297 9.297 0 01-2.625-.372m0 0a9.297 9.297 0 01-2.625-.372m0 0l-2.25 2.25m0 0l-2.25 2.25m0 0l2.25 2.25m2.25-2.25l2.25-2.25" transform="scale(0.9) translate(2, 2)"/> },
                { id: 'articles', label: "Articles", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> },
                { id: 'photography', label: "Photographies", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /> },
                { id: 'famous', label: "Zuhérois Connus", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> },
                { id: 'heroes', label: "Héros de l'Armée", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /> },
            ]
        },
        {
            title: 'Contexte',
            items: [
                { id: 'presentation', label: "Présentation", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> },
                { id: 'wars', label: "Les Guerres", icon: <path d="M11.25 3.25l6.5 6.5-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" transform="scale(1.2) translate(-2, -1)" /> }, // Simple shield/flag like icon, adjusted
                { id: 'heritage', label: "Héritage", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /> },
                { id: 'demography', label: "Démographie", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18M10.125 7.5v13.5M16.5 12v9.5M22.875 5.5v15.5" transform="scale(0.8) translate(3, 1)" /> },
            ]
        }
    ];
    
    return (
        <>
            <div className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-950/80 backdrop-blur-lg border-r border-white/10 z-40 transform transition-transform lg:translate-x-0 flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between gap-3 p-4 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <img 
                            src="https://videos.openai.com/az/vg-assets/task_01k8wjvr8dfhdrbrv0vbp015h1%2F1761895964_img_1.webp?se=2025-11-07T11%3A05%3A17Z&sp=r&sv=2024-08-04&sr=b&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-11-01T03%3A53%3A16Z&ske=2025-11-08T03%3A58%3A16Z&sks=b&skv=2024-08-04&sig=kiY1bNV84kRTZ8%2BD4Cit1Ua9P2LD%2B5wMK1JEF9vF/dA%3D&ac=oaivgprodscus2" 
                            alt="Logo de Zuheros" 
                            className="h-10 w-auto"
                        />
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
                            Mémorial
                        </h2>
                    </div>
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="lg:hidden text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
                        aria-label="Fermer le menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <GlobalSearch searchableIndex={searchableIndex} onResultClick={onResultClick} />
                
                <nav className="flex-grow p-2 overflow-y-auto no-scrollbar">
                    {menuGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="mt-4 first:mt-0">
                            {group.title && <h3 className="px-4 mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">{group.title}</h3>}
                            <ul>
                                {group.items.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => { setView(item.id as View); setIsMenuOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                                currentView === item.id 
                                                ? 'bg-slate-800 text-blue-200' 
                                                : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                                            }`}
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                {item.icon}
                                            </svg>
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
                
                <div className="p-4 border-t border-white/10 text-center text-xs text-slate-500 flex-shrink-0">
                    <p>Leur souvenir, notre héritage.</p>
                </div>
            </aside>
        </>
    );
}

const HomePage: React.FC<{ setView: (view: View) => void, stats: Record<string, number>, navigateToArticle: (id: string) => void }> = ({ setView, stats, navigateToArticle }) => {

    const useInView = (options?: IntersectionObserverInit) => {
        const ref = useRef<HTMLDivElement>(null);
        const [isInView, setIsInView] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            }, options);

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, [ref, options]);

        return [ref, isInView] as const;
    };

    const useCountUp = (end: number, duration = 2000, startAnimation: boolean) => {
        const [count, setCount] = useState(0);
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);

        const easeOutCubic = (t: number) => (--t) * t * t + 1;

        useEffect(() => {
            if (!startAnimation) return;

            let frame = 0;
            const counter = setInterval(() => {
                frame++;
                const progress = easeOutCubic(frame / totalFrames);
                const currentCount = Math.round(end * progress);
                setCount(currentCount);

                if (frame === totalFrames) {
                    clearInterval(counter);
                    setCount(end);
                }
            }, frameRate);

            return () => clearInterval(counter);
        }, [end, duration, startAnimation]);

        return count;
    };
    
    const [statsRef, statsInView] = useInView({ threshold: 0.5 });
    const animatedTotal = useCountUp(stats.total, 2000, statsInView);
    const animatedHispano = useCountUp(stats.hispano, 2000, statsInView);
    const animatedRif = useCountUp(stats.rif, 2000, statsInView);
    const animatedCivil = useCountUp(stats.civil + stats.disappeared, 2000, statsInView);
    const animatedModern = useCountUp(stats.modern, 2000, statsInView);

    const featuredItems = [
        { id: 'memorial', title: "Mémorial des Soldats", description: "Consultez les fiches individuelles de ceux qui sont tombés.", imageUrl: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/574503317_2237776090037940_1333795810195789276_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7vtG3SR03EYQ7kNvwEK0Vyp&_nc_oc=Adlhf0Q5BnHBj7olBXlF9egkohfVAR45md_ah1Y5iCO5ANEeuBpDKfm5uZrXCN0c9OvN-DD6aD4lwbaInjUNWyj9&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=Z3pn3s_vBKeTqpK8SpjRzQ&oh=00_AfcR3f_a0PcrQgsAFPKtRAeeMZRJQ7CDperUKhwl1HBZEw&oe=690A79A7" },
        { id: 'heroes', title: "Héros de l'Armée", description: "Découvrez les actes de bravoure qui ont marqué l'histoire.", imageUrl: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/574917333_2239737603175122_811747322336274673_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uLXePwHj7n8Q7kNvwFbTYgB&_nc_oc=Admh5MpWHEaHg2nKSjkGqznPxxHMGvjl0QT4JxjrAH2olkep9Rk4gohEk_ahIlpAULj6COgmZEXq1pqiOcX-vDsD&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=A-iosCTuKPYoFGkNJx8TiQ&oh=00_AfjDIW5dZqRxX5q9UaXbxu8ebKBHkfgs7y7TJvjgtNbBDA&oe=690CF66D" },
        { id: 'photography', title: "Photographies d'Archives", description: "Un voyage visuel dans le passé de Zuheros.", imageUrl: "https://cdn.unwatermark.ai/datarm7/unwatermark/image-watermark-auto-remove-kontext/2025-10-31/output/786f71dc-a7ba-4148-882e-2d292015375f.jpg?x-oss-process=image/resize,m_fixed,limit_0,w_1024,h_1024" },
        { id: 'wars', title: "Les Guerres", description: "Comprenez le lourd tribut payé par le village.", imageUrl: "https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/573853699_2237758466706369_4598631580543160840_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NiEbfeM5QysQ7kNvwHCM6D6&_nc_oc=Adnh5vFJWuCesGhUkSa7mZFY5NWlhiGlGmQ06olWCyhCN6hgDzSEaY_qWNzl7SUnLvDKqTBfOF5HGyZdcYF2QbcB&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=CpxALNjhKfyAtCYCoZGXcw&oh=00_AfcDKyCT1Vlkd5qWTgYICz1gAldWWB3nL5zEa3zdNuUO8w&oe=690A4C4B" },
    ];

    return (
        <div className="bg-background-color text-text-primary">
            {/* Hero Section */}
            <header className="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <img
                        src="https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/576401573_2240076663141216_5907389713524232615_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=X-JLLAhLxcAQ7kNvwH-YRuc&_nc_oc=Adk7Af5l3Yfql5TOqDw2VerEV9eWk6TOt7uK2LvLganwKZ0nprc1tqw5GuoONOYEFjg4RCdB_aE0rXyAP3mwbUVf&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=QFww8LwaZYRa0wW6uW9gIQ&oh=00_AfgYuG1qOhOSiSBF7mlV24YHvo-qXxLSfsA4W_xb895hrQ&oe=690D8962"
                        alt="Vue panoramique de Zuheros"
                        className="absolute w-full h-full object-cover animate-ken-burns"
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
                <div className="relative z-10 p-4 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-rose-400 to-amber-300">
                        Mémorial de Zuheros
                    </h1>
                    <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto text-slate-200">
                        Un sanctuaire numérique dédié à la mémoire, à l'héritage et à la résilience d'un village andalou.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setView('memorial')}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-500 transition-transform hover:scale-105 shadow-lg shadow-blue-500/20"
                        >
                            Explorer le Mémorial
                        </button>
                        <button
                            onClick={() => setView('presentation')}
                            className="bg-slate-700/50 border border-slate-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-600/50 transition-transform hover:scale-105"
                        >
                            Découvrir l'Histoire
                        </button>
                    </div>
                </div>
                <a href="#main-content" className="absolute bottom-10 z-10 animate-bounce-subtle" aria-label="Faire défiler vers le contenu principal">
                    <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </header>
            
            <main id="main-content" className="relative z-10">
                <section className="py-20 bg-slate-950/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                             <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 mb-4 tracking-tight">Le prix de l'Histoire</h2>
                            <p className="text-xl text-slate-300">
                                À travers les conflits qui ont façonné l'Espagne, le village de Zuheros a payé un lourd tribut. Ce mémorial honore chaque vie perdue et raconte l'histoire d'une communauté marquée par le courage et le sacrifice.
                            </p>
                        </div>
                        
                        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                            <div className="bg-slate-800/50 p-6 rounded-lg">
                                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">{animatedTotal}</p>
                                <p className="text-slate-400 text-sm font-medium mt-2">Vies honorées</p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-lg">
                                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{animatedHispano}</p>
                                <p className="text-slate-400 text-sm font-medium mt-2">Guerre de 1898</p>
                            </div>
                             <div className="bg-slate-800/50 p-6 rounded-lg">
                                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">{animatedRif}</p>
                                <p className="text-slate-400 text-sm font-medium mt-2">Guerre du Rif</p>
                            </div>
                             <div className="bg-slate-800/50 p-6 rounded-lg">
                                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">{animatedCivil}</p>
                                <p className="text-slate-400 text-sm font-medium mt-2">Guerre Civile</p>
                            </div>
                             <div className="bg-slate-800/50 p-6 rounded-lg">
                                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">{animatedModern}</p>
                                <p className="text-slate-400 text-sm font-medium mt-2">Missions Modernes</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '200ms' }}>
                                <img 
                                    src="https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/576815842_2240619636420252_8524094190575586642_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ez10923-hikQ7kNvwF23vgi&_nc_oc=AdkpLUXJJkr1wEiVlUAE0UyIrVNX-E7g2rcTcoiFAEpAnpYVOfDNQ1EDo9HVn45LbNd3BkdzVTkE9j1w7xSeRly-&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=P2PRCha2WHd6mf_V4xiuDQ&oh=00_AfjSIcd5eiWabY_-5wU8_AIkrO8ejDLwOx2aNtCoTSJhCg&oe=690E6808"
                                    alt="Vue d'une rue historique de Zuhéros"
                                    className="rounded-2xl shadow-2xl shadow-black/40 aspect-video object-cover w-full"
                                />
                            </div>
                            <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '400ms' }}>
                                <h2 className="text-4xl font-extrabold text-slate-100 tracking-tight">Un Village Forgé par l'Histoire</h2>
                                <p className="mt-4 text-lg text-slate-300">
                                    Niché au cœur de l'Andalousie, Zuhéros est bien plus qu'un simple village. C'est un lieu de mémoire où chaque pierre raconte une histoire de résilience, de survie et d'héritage morisque. Sa trajectoire unique, marquée par les guerres et une culture préservée, en fait un témoin exceptionnel de l'histoire espagnole.
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={() => setView('presentation')}
                                        className="inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 text-white font-bold py-2 px-6 rounded-lg text-md hover:bg-slate-600/50 transition-transform hover:scale-105 group"
                                    >
                                        Découvrir son histoire
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-slate-950/50">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <header className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold text-slate-100 tracking-tight">Plongez dans la Mémoire</h2>
                        </header>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredItems.map((item, index) => (
                                <div key={item.id} className="animate-fadeInUp opacity-0" style={{ animationDelay: `${200 + index * 100}ms` }}>
                                    <button onClick={() => setView(item.id as View)} className="group relative block w-full h-96 rounded-2xl overflow-hidden text-left shadow-2xl shadow-black/40">
                                        <img src={item.imageUrl} alt={item.title} className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                        <div className="relative h-full flex flex-col justify-end p-6">
                                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                            <p className="text-slate-300 mt-2">{item.description}</p>
                                            <div className="mt-4 text-blue-400 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Découvrir <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                     </div>
                </section>
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <header className="text-center mb-12 animate-fadeInUp opacity-0" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-4xl font-extrabold text-slate-100 tracking-tight">Articles et Enquêtes</h2>
                            <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                                Plongez dans des récits détaillés et des enquêtes sur les événements qui ont façonné l'histoire de Zuheros et de ses habitants.
                            </p>
                        </header>
                        <div className="max-w-5xl mx-auto animate-fadeInUp opacity-0" style={{ animationDelay: '400ms' }}>
                            <div className="group bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden grid md:grid-cols-2 transition-all duration-300 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-black/40">
                                <div className="relative h-64 md:h-auto overflow-hidden">
                                    <img 
                                        src="https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/577016714_2240034243145458_8243492354324235156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LannzC-ljpgQ7kNvwHzCLDz&_nc_oc=AdlxTymy3-6sbs3Ufq_Ag5CpEpHOs-g7ayEGa-dYHE9eoKjqWczaA5ANG1bwxxbGDFk6AtHuwRMIRiHNVmfUscij&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=93mAHSvaHowTcT42P__6Ew&oh=00_Afg7GqnD94llUrMMpSmpkcwosNXlvSA21QKFkW3yv-VKMg&oe=690D726E" 
                                        alt="Victimes du 11-M"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-slate-100">Zuhérois Victimes du Terrorisme</h3>
                                    <p className="mt-3 text-slate-400 leading-relaxed line-clamp-3 md:line-clamp-4">
                                        Le 11 mars 2004, une tragédie frappait Madrid, emportant quatre membres de la famille Abenfassi–Sanayes, une lignée partagée entre l'Andalousie et l'Uruguay. Récit d'un deuil qui a traversé l'océan.
                                    </p>
                                    <button
                                        onClick={() => navigateToArticle('11-m')}
                                        className="mt-6 inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors self-start"
                                    >
                                        Lire l'article
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                    </button>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setView('articles')}
                                    className="bg-slate-700/50 border border-slate-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-600/50 transition-transform hover:scale-105"
                                >
                                    Voir tous les articles
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer setView={setView} />
        </div>
    );
};

const pageContents = {
  presentation: { title: "Zuhéros, histoire d’un village andalou (XVIᵉ–XXIᵉ siècle)", content: "Zuhéros est un nom que les grandes synthèses historiques ignorent souvent..." },
  wars: { title: "Les guerres et le prix payé", content: "Reportage – Mémoire, guerres et survie..." },
  heritage: { title: "Zuhéros, l’héritage en sursis", content: "Enquête au long cours dans le dernier village morisque d’Espagne..." },
  demography: { title: "Démographie : Le village à l'épreuve des guerres", content: "Une population fauchée par les conflits du XXᵉ siècle..." },
};

const articleContents = {
  '11-m': { title: "Zuhérois Victimes du Terrorisme", content: "La famille Abenfassi–Sanayes, Hispano-Uruguayens de Zuhéros..." },
  'felicia-abenel': { title: "Félicia ABENEL, la fiancée veuve de Zuhéros", content: "On la présente parfois comme « la fiancée-veuve de Zuhéros ». Cette formule, qui pourrait passer pour une coquetterie de romancier, résume pourtant la vie de Félicia Abenel Jakimi..." },
  'julia-abasen': { title: "Julia, la mère Zuhéroise qui a attendu son fils", content: "Personne n’osait lui dire frontalement « il est mort ». On parlait de lui comme d’un absent lointain, d’un homme qu’on espérait voir franchir un jour la rue, vieilli, amaigri, mais vivant..." },
  'mariano-perez': { title: `Mariano dit "Manuel" Perez, Maire de Zuhérois, enfant de la guerre`, content: "On l’a longtemps appelé « el viejo de los Granadinos », le vieux de la Calle de los Granadinos, à Zuhéros Bajo..." },
};


const App: React.FC = () => {
    const allPeople: Person[] = useMemo(() => {
        const rifWarPeople = soldiersData.map(s => ({
            id: `rif-${s.id}`,
            lastName: s.lastName,
            firstName1: s.firstName1,
            firstName2: s.firstName2,
            birthYear: s.birthYear,
            birthPlace: s.birthPlace,
            age: s.age,
            deathYear: s.deathYear,
            deathPlace: s.deathPlace,
            war: 'Guerre du Rif' as const,
            status: 'Mort pour la patrie' as const,
            geographicOrigin: s.geographicOrigin,
            mention: s.mention,
        }));

        const civilWarPeople = civilWarData.map((p, i) => ({
            id: `civil-${i + 1}`,
            lastName: p.lastName,
            firstName1: p.firstName1,
            firstName2: p.firstName2,
            birthYear: p.birthYear,
            birthPlace: p.birthPlace,
            age: p.age,
            deathYear: p.deathYear,
            deathPlace: p.deathPlace,
            war: 'Guerre Civile Espagnole' as const,
            status: 'Mort pour la patrie' as const,
            camps: p.camps,
            mention: `Né(e) en ${p.birthYear} à ${p.birthPlace}. Mort(e) à ${p.deathPlace} en ${p.deathYear} à l'âge de ${p.age} ans (contexte: ${p.camps}).`,
        }));
        
        const disappearedPeople = disappearedData.map((p, i) => ({
            id: `disappeared-${i + 1}`,
            lastName: p.lastName,
            firstName1: p.firstName1,
            firstName2: p.firstName2,
            birthYear: p.birthYear,
            birthPlace: p.birthPlace,
            age: null,
            deathYear: null,
            deathPlace: null,
            war: 'Guerre Civile Espagnole' as const,
            status: 'Disparu(e)' as const,
            geographicOrigin: p.birthPlace,
            lastSeen: p.lastSeen,
            mention: `Né(e) en ${p.birthYear} à ${p.birthPlace}. Disparu(e) à ${p.lastSeen}.`,
        }));

        const hispanoAmericanWarPeople = spanishAmericanWarData.map(p => {
            const deathYear = parseInt(p.deathDate.slice(-4));
            const age = deathYear - p.birthYear;
            return {
                id: `hispano-${p.id}`,
                lastName: p.lastName,
                firstName1: p.firstName1,
                firstName2: p.firstName2,
                birthYear: p.birthYear,
                birthPlace: p.birthPlace,
                age: age,
                deathYear: deathYear,
                deathPlace: p.deathPlace,
                deathCause: p.deathCause,
                war: 'Guerre Hispano-Américaine' as const,
                status: 'Mort pour la patrie' as const,
                geographicOrigin: p.birthPlace,
                mention: `Né en ${p.birthYear} à ${p.birthPlace}. Mort pour la patrie (${p.deathCause}) à ${p.deathPlace} le ${p.deathDate} à l'âge de ${age} ans.`
            };
        });

        return [...rifWarPeople, ...civilWarPeople, ...disappearedPeople, ...hispanoAmericanWarPeople, ...modernConflictsData];
    }, []);

    const [currentView, setCurrentView] = useState<View>('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [heroIndex, setHeroIndex] = useState(0);
    const [famousPersonIndex, setFamousPersonIndex] = useState(0);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [candleCounts, setCandleCounts] = useState<Record<string, number>>({});
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    const setView = (view: View) => {
        setCurrentView(view);
        setSelectedArticleId(null);
        window.scrollTo(0, 0);
    }
    
    const navigateToArticle = (id: string) => {
        setCurrentView('articles');
        setSelectedArticleId(id);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        try {
            const storedCounts = localStorage.getItem('candleCounts');
            if (storedCounts) {
                setCandleCounts(JSON.parse(storedCounts));
            }
        } catch (error) {
            console.error("Failed to load candle counts from localStorage", error);
        }
    }, []);

    const handleLightCandle = (personId: string) => {
        setCandleCounts(prevCounts => {
            const newCount = (prevCounts[personId] || 0) + 1;
            const newCounts = { ...prevCounts, [personId]: newCount };
            try {
                localStorage.setItem('candleCounts', JSON.stringify(newCounts));
            } catch (error) {
                console.error("Failed to save candle counts to localStorage", error);
            }
            return newCounts;
        });
    };
    
    const stats = useMemo(() => {
        const rif = allPeople.filter(p => p.war === 'Guerre du Rif').length;
        const civil = allPeople.filter(p => p.war === 'Guerre Civile Espagnole' && p.status !== 'Disparu(e)').length;
        const disappeared = allPeople.filter(p => p.status === 'Disparu(e)').length;
        const hispano = allPeople.filter(p => p.war === 'Guerre Hispano-Américaine').length;
        const modern = modernConflictsData.length;
        return {
            total: allPeople.length,
            rif,
            civil,
            disappeared,
            hispano,
            modern
        }
    }, [allPeople]);

     const searchableIndex: SearchableItem[] = useMemo(() => {
        const index: SearchableItem[] = [];

        allPeople.forEach(person => {
            index.push({
                type: 'person',
                title: `${person.firstName1} ${person.lastName}`,
                content: Object.values(person).filter(Boolean).join(' '),
                id: person.id,
            });
        });

        Object.entries(pageContents).forEach(([id, page]) => {
            index.push({
                type: 'page',
                title: page.title,
                content: page.content,
                id: id,
            });
        });

        Object.entries(articleContents).forEach(([id, article]) => {
            index.push({
                type: 'article',
                title: article.title,
                content: article.content,
                id: id,
            });
        });

        famousPeopleData.forEach((person, idx) => {
            index.push({
                type: 'famous',
                title: person.name,
                content: [person.title, person.name, ...person.sections.map(s => s.content)].join(' '),
                id: idx,
            });
        });

        heroesData.forEach((hero, idx) => {
            index.push({
                type: 'hero',
                title: hero.name,
                content: [hero.rank, hero.name, hero.unit, hero.act, hero.outcome].join(' '),
                id: idx,
            });
        });

        return index;
    }, [allPeople]);

    const handleSearchResultClick = (result: SearchableItem) => {
      setIsMenuOpen(false);
      switch (result.type) {
        case 'person':
          const person = allPeople.find(p => p.id === result.id);
          if (person) setSelectedPerson(person);
          break;
        case 'page':
          setView(result.id as View);
          break;
        case 'article':
          navigateToArticle(result.id as string);
          break;
        case 'famous':
          setView('famous');
          setFamousPersonIndex(result.id as number);
          break;
        case 'hero':
          setView('heroes');
          setHeroIndex(result.id as number);
          break;
      }
    };

    const renderView = () => {
        switch (currentView) {
            case 'memorial':
                return <MemorialPage allPeople={allPeople} stats={stats} onSelectPerson={setSelectedPerson} />;
            case 'presentation':
                return <PresentationPage setView={setView} />;
            case 'wars':
                return <WarsPage setView={setView} />;
            case 'heritage':
                return <HeritagePage setView={setView} />;
            case 'photography':
                return <PhotographyPage setView={setView} />;
            case 'famous':
                return <FamousPeoplePage currentIndex={famousPersonIndex} setCurrentIndex={setFamousPersonIndex} setView={setView}/>;
            case 'demography':
                return <DemographyPage setView={setView}/>;
            case 'heroes':
                return <HeroesPage currentIndex={heroIndex} setCurrentIndex={setHeroIndex} setView={setView} />;
            case 'articles':
                 if (selectedArticleId === '11-m') {
                    return (
                        <ContentPageLayout setView={setView}>
                             <button 
                                onClick={() => setSelectedArticleId(null)} 
                                className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                Retour aux articles
                            </button>
                            <Article11M />
                        </ContentPageLayout>
                    );
                 }
                 if (selectedArticleId === 'felicia-abenel') {
                    return (
                        <ContentPageLayout setView={setView}>
                             <button 
                                onClick={() => setSelectedArticleId(null)} 
                                className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                Retour aux articles
                            </button>
                            <FeliciaAbenelPage />
                        </ContentPageLayout>
                    );
                 }
                 if (selectedArticleId === 'julia-abasen') {
                    return (
                        <ContentPageLayout setView={setView}>
                             <button 
                                onClick={() => setSelectedArticleId(null)} 
                                className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                Retour aux articles
                            </button>
                            <JuliaAbasenPage />
                        </ContentPageLayout>
                    );
                 }
                 if (selectedArticleId === 'mariano-perez') {
                    return (
                        <ContentPageLayout setView={setView}>
                             <button 
                                onClick={() => setSelectedArticleId(null)} 
                                className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                Retour aux articles
                            </button>
                            <MarianoPerezPage />
                        </ContentPageLayout>
                    );
                 }
                return <ArticlesPage onSelectArticle={id => navigateToArticle(id)} setView={setView}/>;
            default:
                return <HomePage setView={setView} stats={stats} navigateToArticle={navigateToArticle} />;
        }
    };
    
    if (currentView === 'home' && !selectedPerson) {
        return <HomePage setView={setView} stats={stats} navigateToArticle={navigateToArticle} />;
    }

    return (
        <div className="min-h-screen text-white">
            <div className="lg:pl-64">
                {selectedPerson && (
                    <PersonDetailPage 
                        person={selectedPerson} 
                        onClose={() => setSelectedPerson(null)}
                        candleCount={candleCounts[selectedPerson.id] || 0}
                        onLightCandle={handleLightCandle}
                        warColors={warColors}
                    />
                )}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className={`fixed top-4 left-4 z-50 lg:hidden bg-slate-800/80 p-2 rounded-md text-white hover:bg-slate-700/80 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    aria-label="Ouvrir le menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </button>
                <main>
                    {renderView()}
                </main>
                {!selectedPerson && <Footer setView={setView} />}
            </div>
             <SideMenu 
                currentView={currentView} 
                setView={setView} 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                searchableIndex={searchableIndex}
                onResultClick={handleSearchResultClick}
            />
        </div>
    );
};

export default App;