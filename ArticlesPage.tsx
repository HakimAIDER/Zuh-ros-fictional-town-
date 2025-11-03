import React from 'react';
import { ContentPageLayout } from './App';

type View = 'home' | 'memorial' | 'presentation' | 'wars' | 'heritage' | 'photography' | 'famous' | 'demography' | 'heroes' | 'articles';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
}

interface ArticlesPageProps {
    articlesData: Article[];
    onSelectArticle: (id: string) => void;
    setView: (view: View) => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ articlesData, onSelectArticle, setView }) => {
    return (
        <ContentPageLayout setView={setView}>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                Articles
            </h1>
            <h2 className="text-xl text-slate-300 mb-8 italic">Récits et enquêtes sur la mémoire de Zuheros</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articlesData.map(article => (
                    <div key={article.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 transition-all duration-300 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-black/40">
                        <div className="relative h-56">
                            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-slate-100">{article.title}</h3>
                            <p className="mt-2 text-slate-400 leading-relaxed line-clamp-3">{article.excerpt}</p>
                            <button 
                                onClick={() => onSelectArticle(article.id)}
                                className="mt-4 inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition-colors"
                            >
                                Lire l'article
                                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Ajouter ici un message si d'autres articles sont à venir */}
            <div className="text-center mt-12 py-8 border-t border-dashed border-slate-700">
                <p className="text-slate-500">D'autres articles et récits seront ajoutés prochainement.</p>
            </div>
        </ContentPageLayout>
    );
};

export default ArticlesPage;