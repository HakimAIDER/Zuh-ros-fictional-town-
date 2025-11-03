import React from 'react';
import { ContentPageLayout } from './App';

type View = 'home' | 'memorial' | 'presentation' | 'wars' | 'heritage' | 'photography' | 'famous' | 'demography' | 'heroes' | 'articles';

interface ArticlesPageProps {
    onSelectArticle: (id: string) => void;
    setView: (view: View) => void;
}

const articlesData = [
    {
        id: '11-m',
        title: 'Zuhérois Victimes du Terrorisme',
        excerpt: 'Le 11 mars 2004, une tragédie frappait Madrid, emportant quatre membres de la famille Abenfassi–Sanayes, une lignée partagée entre l\'Andalousie et l\'Uruguay. Récit d\'un deuil qui a traversé l\'océan.',
        imageUrl: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/577016714_2240034243145458_8243492354324235156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LannzC-ljpgQ7kNvwHzCLDz&_nc_oc=AdlxTymy3-6sbs3Ufq_Ag5CpEpHOs-g7ayEGa-dYHE9eoKjqWczaA5ANG1bwxxbGDFk6AtHuwRMIRiHNVmfUscij&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=93mAHSvaHowTcT42P__6Ew&oh=00_Afg7GqnD94llUrMMpSmpkcwosNXlvSA21QKFkW3yv-VKMg&oe=690D726E',
    },
    {
        id: 'felicia-abenel',
        title: 'Félicia ABENEL, la fiancée veuve de Zuhéros',
        excerpt: 'On la présente parfois comme « la fiancée-veuve de Zuhéros ». Cette formule résume la vie de Félicia Abenel Jakimi, une vie prise dans la tourmente des guerres du XXᵉ siècle et façonnée par un amour interrompu trop tôt.',
        imageUrl: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/576464301_2240651559750393_7509439508655494911_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jhjvIcMQHEsQ7kNvwFZOAfL&_nc_oc=AdkGQ74RbrkjSVYazZmwQ9LqfGJEmLmJB2iE3sVONTHG7ijH7mn4_B370hXWZnVWH0KZ1vmT3PmK9PmpWMsU5iZn&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=zrZyIkGK22QiO9oKXyBD9Q&oh=00_Afi28AePgypwZzfIogLultxUzsmqP0FHFRy4Mly--7896g&oe=690E54E7',
    },
    {
        id: 'julia-abasen',
        title: 'Julia, la mère Zuhéroise qui a attendu son fils',
        excerpt: 'Pendant 42 ans, Julia Abasen-Jalifa a attendu le retour de son fils Miguel, disparu pendant la guerre civile. Une histoire de foi maternelle, de deuil impossible et de mémoire, qui trouve une conclusion inattendue 85 ans plus tard.',
        imageUrl: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/576381320_2240697233079159_8543408555967901535_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=62PLrzfP81cQ7kNvwGVpjgJ&_nc_oc=Adk0r__bHxcKebrmQsj6z0oj0n6HIfEUmeyaTdBaGUfZq5uCf7DzEIZgb2H2Z1dAmvM6SZnHUS9UIoZtrGjvIT8Z&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=_OH86un6SstikGM49kC6HQ&oh=00_AfghFayrsSXXH1mKThuKIfZQxSTvK4Q9ROFDbwvWW-ZpSg&oe=690E8444',
    },
    {
        id: 'mariano-perez',
        title: 'Mariano "Manuel" Perez, l\'Enfant de la Guerre',
        excerpt: 'La trajectoire d\'un homme profondément meurtri qui, devenu maire, a tenté de sauver un village qu’il savait condamné s’il ne s’ouvrait pas, au prix de sa propre réputation.',
        imageUrl: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/576374200_2240708019744747_3629281447584514383_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=sWn_qj_1J58Q7kNvwFcML6N&_nc_oc=Adlci-6CMeUoaztCX_CTfTJEc6B8dXhtlGqc5THxDdKItxxecTCIWAVCKGuuMnQSvVZpOJT2XT78Oo1llNV1DM4G&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=CUeyq4c-A9v17j3fuVA_rA&oh=00_AfiYfoaT55suJJ3-SWRXbcqEb0EK_IVBJZzexWq_GN2hAg&oe=690E5FDC',
    }
];

const ArticlesPage: React.FC<ArticlesPageProps> = ({ onSelectArticle, setView }) => {
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