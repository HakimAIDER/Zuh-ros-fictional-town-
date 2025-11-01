import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Person } from './types';
import { soldiersData } from './data/soldiers';
import { civilWarData } from './data/civilwar';
import { disappearedData } from './data/disappeared';
import { spanishAmericanWarData } from './data/spanishAmericanWar';
import { modernConflictsData } from './data/modernConflicts';

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

const PersonCard: React.FC<{ person: Person; index: number }> = ({ person, index }) => {
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
      className={`animate-fadeInUp group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-slate-900/70 ${colors.glow}`}
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
      </div>
    </div>
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


const MemorialPage: React.FC<{ allPeople: Person[], stats: Record<string, number> }> = ({ allPeople, stats }) => {
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
                            <PersonCard key={person.id} person={person} index={index} />
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

const ContentPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 page-container">
        <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12 max-w-5xl mx-auto shadow-2xl shadow-black/30">
            {children}
        </div>
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Leur souvenir, notre héritage.</p>
        </footer>
    </div>
);

const PresentationPage: React.FC = () => {
    return (
        <ContentPageLayout>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-6 tracking-tight">
                Présentation de Zuheros
            </h1>
            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p>Zuhéros, blotti au cœur de la Sierra de Córdoba, apparaît dans le roman comme un microcosme de l’Andalousie profonde, un village suspendu entre la lumière et la mémoire, entre la pureté apparente de son présent et les ombres persistantes de son passé. Perché sur un éperon rocheux, entouré d’oliveraies qui s’étendent comme une mer d’argent jusqu’aux confins de la vallée du Guadalquivir, Zuhéros est un lieu où chaque pierre, chaque mur blanchie à la chaux, chaque fontaine semble murmurer les échos d’un temps révolu.</p>
                <p>Officiellement, c’est un village andalou catholique, fier de ses processions, de ses fêtes patronales et de ses traditions agricoles. Mais derrière cette façade de ferveur chrétienne se dissimule un héritage plus ancien, plus secret — celui d’un passé morisque encore perceptible dans les gestes, les mots et les silences de ses habitants. Zuhéros est, dans l’univers du roman, une enclave de l’histoire, un espace où les siècles se superposent comme les couches d’un manuscrit effacé, dont on devine encore les lettres cachées sous la chaux du temps.</p>
                <p>Ses quartiers anciens — <strong>Zuheros Viejo</strong>, <strong>Zuheros Alto</strong>, <strong>Zuheros Bajo</strong>, <strong>Tamesguida</strong> et <strong>Almanara</strong> — forment la trame originelle du village, bâtie au fil des générations par des familles issues des lignées morisques. Les <strong>Morra de Granada</strong>, les <strong>Abenadid</strong>, les <strong>Zenati</strong>, les <strong>Abenfassi</strong>, les <strong>Abengoa</strong>, les <strong>Muley</strong>, les <strong>Barbari</strong> ou encore les <strong>Perez</strong> en furent les piliers. Ces noms, aujourd’hui hispanisés, portent pourtant l’empreinte d’un passé arabe et andalou que l’histoire officielle a longtemps cherché à effacer. Derrière les patronymes castillans, derrière les façades blanches et les autels ornés de croix, se cache une mémoire ancienne, parfois inconsciente, qui irrigue encore les gestes du quotidien.</p>
                <p>Dans les ruelles étroites, où le soleil dessine des arabesques de lumière sur les murs, on entend parfois des mots du dialecte zuhérois, vestiges d’un espagnol mêlé d’arabismes, comme un souffle oublié d’Al-Andalus : <em>imabel</em> pour la foi, <em>rama</em> pour la miséricorde, <em>atibelá</em> pour la confiance en Dieu. Ces mots, transmis sans en comprendre l’origine, révèlent la persistance souterraine d’un héritage spirituel et culturel que les siècles n’ont pas réussi à éteindre. De même, certaines coutumes — la façon d’honorer les morts, de se laver avant la prière, ou de s’abstenir de porc — se sont perpétuées sous une forme altérée, vidées de leur sens religieux premier, mais demeurées comme des réflexes de fidélité à un passé lointain.</p>
                <p>Zuhéros, dans le roman, n’est pas seulement un décor : il est un personnage à part entière, un organisme vivant façonné par la lente respiration de l’histoire. C’est un village où la Reconquista n’a jamais tout à fait eu raison des âmes, où la christianisation s’est faite à travers l’effacement plus que par la conversion, et où la mémoire des ancêtres a trouvé refuge dans la banalité des gestes. Au XVIᵉ siècle, les familles morisques de Zuhéros ont dû taire leurs prières, renommer leurs enfants, latiniser leurs noms. Leurs descendants, au fil des siècles, ont fini par oublier les origines exactes de ces traditions, mais non leur presence diffuse.</p>
                <p>Au XXᵉ siècle, le village a connu d’autres métamorphoses : l’émigration vers les villes, la montée du tourisme, la modernisation agricole. Pourtant, dans les voix des anciens, dans les senteurs d’huile d’olive, de fromage de chèvre et de jasmin, dans les processions silencieuses où la foi se mêle à une ferveur d’un autre âge, Zuhéros garde son mystère. Certains disent qu’il n’y a pas de lieu en Andalousie où la mémoire d’Al-Andalus soit plus vivante et plus dissimulée à la fois.</p>
                <p>Ainsi, Zuhéros devient dans le roman le miroir d’une Espagne double : chrétienne dans sa foi visible, musulmane dans ses racines invisibles, andalouse dans sa chair et morisque dans son inconscient. C’est le cœur de l’Andalousie, un cœur battant au rythme des siècles, où la lumière éclatante du sud ne parvient jamais à dissiper complètement l’ombre de la Sierra.</p>
            </div>
        </ContentPageLayout>
    );
};

const WarsPage: React.FC = () => {
    return (
        <ContentPageLayout>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                Les guerres et le prix payé
            </h1>
            <h2 className="text-xl text-slate-300 mb-6">Zuhéros, le village qui a donné ses fils à l’Espagne</h2>

            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p className="lead italic">Reportage – Mémoire, guerres et survie d’un bourg andalou frappé par deux hécatombes successives.</p>
                <p><strong>ALMACRA (province de Cordoue).</strong> À l’aube, la lumière se coince dans les cyprès. Le vieux cimetière d’Almacra, la pierre tiède, des dates et des initiales en rangs disjoints : c’est là que Zuhéros garde ses morts. On ne parle pas de gloire, on parle de tenue. Les habitants les désignent simplement : « ceux qui sont tombés pour l’Espagne ». Derrière la formule, des vies interrompues, un village amputé, une mémoire qui se récite par noms, par escaliers, par places.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">1898 : L'adieu à l'Empire, les premiers deuils lointains</h3>
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

const HeritagePage: React.FC = () => {
    return (
        <ContentPageLayout>
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


const PhotographyPage: React.FC = () => {
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
        <ContentPageLayout>
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
      imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/af8115d9-b96f-43a9-ba9d-9ebe0be15473.png",
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

const FamousPeoplePage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? famousPeopleData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === famousPeopleData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const currentPerson = famousPeopleData[currentIndex];

    return (
      <ContentPageLayout>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-6 tracking-tight">
          Zuhérois Connus
        </h1>
        <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed mb-8">
            <p>Des figures, toutes liées par leurs racines à Zuheros, ont fortement marqué la vie politique, culturelle et intellectuelle en Espagne et dans sa diaspora. Chacune s’enracine dans la topographie, les lignages et les tensions mémorielles propres à Zuheros.</p>
        </div>

        <div className="mt-8 relative">
            <button onClick={goToPrevious} aria-label="Profil précédent" className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10 bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hidden lg:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div key={currentIndex} className="animate-fadeInUp" style={{ animationDuration: '400ms' }}>
                 <PersonProfile person={currentPerson} />
            </div>
            <button onClick={goToNext} aria-label="Profil suivant" className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10 bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hidden lg:block">
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

const DemographyPage: React.FC = () => {
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
        <ContentPageLayout>
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


type View = 'home' | 'memorial' | 'presentation' | 'wars' | 'heritage' | 'photography' | 'famous' | 'demography';

const SideMenu: React.FC<{ 
    currentView: View, 
    setView: (view: View) => void,
    isMenuOpen: boolean,
    setIsMenuOpen: (isOpen: boolean) => void 
}> = ({ currentView, setView, isMenuOpen, setIsMenuOpen }) => {
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
                { id: 'memorial', label: "Mémorial", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> },
                { id: 'photography', label: "Photographies", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /> },
                { id: 'famous', label: "Zuhérois Connus", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> },
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
                <div className="flex items-center gap-3 p-4 border-b border-white/10 flex-shrink-0">
                    <img 
                        src="https://videos.openai.com/az/vg-assets/task_01k8wjvr8dfhdrbrv0vbp015h1%2F1761895964_img_1.webp?se=2025-11-07T11%3A05%3A17Z&sp=r&sv=2024-08-04&sr=b&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-11-01T03%3A53%3A16Z&ske=2025-11-08T03%3A58%3A16Z&sks=b&skv=2024-08-04&sig=kiY1bNV84kRTZ8%2BD4Cit1Ua9P2LD%2B5wMK1JEF9vF/dA%3D&ac=oaivgprodscus2" 
                        alt="Logo de Zuheros" 
                        className="h-10 w-auto"
                    />
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
                        Mémorial
                    </h2>
                </div>
                
                <nav className="flex-grow p-2 overflow-y-auto">
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
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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

const HomePage: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
    
    const navItems = [
        { id: 'memorial', title: "Mémorial des Soldats", description: "Explorez les fiches individuelles de ceux qui sont tombés.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />, span: "md:col-span-2" },
        { id: 'photography', title: "Photographies", description: "Voyagez dans le temps à travers des images inédites.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /> },
        { id: 'famous', title: "Zuhérois Connus", description: "Découvrez les figures qui ont marqué l'histoire du village.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> },
        { id: 'presentation', title: "Présentation", description: "L'histoire et l'âme d'un village morisque.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> },
        { id: 'wars', title: "Les Guerres", description: "Le lourd tribut payé par les fils de Zuheros.", icon: <path d="M11.25 3.25l6.5 6.5-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" transform="scale(1.2) translate(-2, -1)" /> },
        { id: 'heritage', title: "Héritage", description: "Un patrimoine culturel et mémoriel en sursis.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /> },
        { id: 'demography', title: "Démographie", description: "L'impact des conflits sur la population.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18M10.125 7.5v13.5M16.5 12v9.5M22.875 5.5v15.5" transform="scale(0.8) translate(3, 1)" /> },
    ];

    const CardLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => (
        <button
            onClick={() => setView(item.id as View)}
            className={`animate-fadeInUp group relative text-left p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/70 hover:border-blue-500/50 ${item.span || ''}`}
        >
            <div className="flex items-start gap-4">
                 <div className="p-2 bg-slate-800 rounded-lg border border-slate-700/80">
                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-100 text-lg">{item.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                 </div>
            </div>
        </button>
    );

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="text-center mb-10 animate-fadeInUp">
                 <img 
                    src="https://videos.openai.com/az/vg-assets/task_01k8wjvr8dfhdrbrv0vbp015h1%2F1761895964_img_1.webp?se=2025-11-07T11%3A05%3A17Z&sp=r&sv=2024-08-04&sr=b&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-11-01T03%3A53%3A16Z&ske=2025-11-08T03%3A58%3A16Z&sks=b&skv=2024-08-04&sig=kiY1bNV84kRTZ8%2BD4Cit1Ua9P2LD%2B5wMK1JEF9vF/dA%3D&ac=oaivgprodscus2" 
                    alt="Logo de Zuheros" 
                    className="h-20 w-auto mx-auto mb-4"
                />
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                    Mémorial de Zuheros
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                    Un sanctuaire numérique dédié à la mémoire, à l'héritage et à la résilience d'un village andalou.
                </p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full">
                {navItems.map((item, index) => (
                    <div key={item.id} className={item.span || ''} style={{ animationDelay: `${150 + index * 50}ms` }}>
                        <CardLink item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
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

    const renderView = () => {
        switch (currentView) {
            case 'memorial':
                return <MemorialPage allPeople={allPeople} stats={stats} />;
            case 'presentation':
                return <PresentationPage />;
            case 'wars':
                return <WarsPage />;
            case 'heritage':
                return <HeritagePage />;
            case 'photography':
                return <PhotographyPage />;
            case 'famous':
                return <FamousPeoplePage />;
            case 'demography':
                return <DemographyPage />;
            default:
                return <MemorialPage allPeople={allPeople} stats={stats} />;
        }
    };
    
    if (currentView === 'home') {
        return <HomePage setView={setCurrentView} />;
    }

    return (
        <div className="min-h-screen text-white lg:pl-64">
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="fixed top-4 left-4 z-50 lg:hidden bg-slate-800/80 p-2 rounded-md text-white hover:bg-slate-700/80 backdrop-blur-sm"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
            </button>
            <SideMenu currentView={currentView} setView={setCurrentView} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main>
                {renderView()}
            </main>
        </div>
    );
};

export default App;