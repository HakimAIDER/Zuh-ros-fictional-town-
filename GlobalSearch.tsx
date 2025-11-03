import React, { useState, useRef, useCallback } from 'react';

function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timeoutRef = useRef<number | null>(null);
    return useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}

interface SearchableItem {
  type: 'person' | 'page' | 'famous' | 'hero' | 'article';
  title: string;
  content: string;
  id: string | number;
}


interface GlobalSearchProps {
    searchableIndex: SearchableItem[];
    onResultClick: (item: SearchableItem) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ searchableIndex, onResultClick }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<[string, SearchableItem[]][]>([]);
    const [isActive, setIsActive] = useState(false);

    const performSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = searchableIndex.filter(item => 
            item.title.toLowerCase().includes(lowerCaseQuery) ||
            item.content.toLowerCase().includes(lowerCaseQuery)
        );
        
        const grouped = filtered.reduce((acc, item) => {
            const type = item.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(item);
            return acc;
        }, {} as Record<string, SearchableItem[]>);
        
        const sortedGrouped = Object.entries(grouped).sort((a,b) => {
            const order = ['person', 'famous', 'hero', 'article', 'page'];
            return order.indexOf(a[0]) - order.indexOf(b[0]);
        });

        setResults(sortedGrouped);
    };
    
    const debouncedSearch = useDebounce(performSearch, 250);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        debouncedSearch(newQuery);
    };
    
    const handleResultClick = (result: SearchableItem) => {
        onResultClick(result);
        setQuery('');
        setResults([]);
        setIsActive(false);
    };
    
    const typeLabels: Record<string, string> = {
        person: 'Personnes',
        page: 'Pages',
        famous: 'Personnalités',
        hero: 'Héros',
        article: 'Articles',
    };

    return (
        <div className="relative px-4 pt-4 pb-2 border-b border-white/10">
            <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Recherche globale..."
                    value={query}
                    onChange={handleQueryChange}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setTimeout(() => setIsActive(false), 200)} // delay to allow click
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
            </div>

            {isActive && query.trim() && (
                <div className="absolute top-full left-0 w-[calc(100%+32px)] -ml-4 mt-2 px-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto no-scrollbar">
                        {results.length > 0 ? (
                            results.map(([type, items]) => (
                                <div key={type} className="py-2">
                                    <h4 className="px-4 pb-1 text-xs font-bold text-blue-400 uppercase tracking-wider">{typeLabels[type]}</h4>
                                    <ul>
                                        {items.slice(0, 5).map(item => ( // limit to 5 per group
                                            <li key={`${item.type}-${item.id}`}>
                                                <button
                                                    onMouseDown={() => handleResultClick(item)}
                                                    className="w-full text-left px-4 py-1.5 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                                                >
                                                    {item.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-sm text-center text-slate-400">Aucun résultat trouvé.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;