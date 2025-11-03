import React from 'react';

const VelezInterviewPage: React.FC = () => {
    return (
        <>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                « Zuhéros, c’est peut-être le dernier livre d’Al-Andalus »
            </h1>
            <h2 className="text-xl text-slate-300 mb-6 italic">Entretien avec le professeur Manuel Velez</h2>

            <figure className="my-8">
                <img 
                    src="https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/576519066_2240937729721776_7888964909936397154_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KZZ9ruic1qAQ7kNvwFRFeab&_nc_oc=AdkcZb0qNimr1-7zLFWKc_-cc5hwVw5lu89Vord-10rPkZO5EAmbdeQ08bpgtT_1lpDerhku7hsjPp6MRHaue4LU&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=mBvN1bg_tGl4nzhgyNHKBg&oh=00_AfiI-Bgrxu7JDyJX5kO14k12YHtnFCAelCFewQN3x6EwLQ&oe=690E9BF8" 
                    alt="Le professeur Velez recueille des témoignages au prés des vieux de Tamesguida."
                    className="w-full max-w-3xl mx-auto rounded-lg shadow-lg border border-white/10"
                />
                <figcaption className="mt-3 text-center text-sm text-slate-400 italic max-w-2xl mx-auto">
                    Le professeur Velez recueille des témoignages au prés des vieux de Tamesguida.
                </figcaption>
            </figure>

            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p>Dans le hall de l’ancienne maison de la culture, des photos en noir et blanc montrent des hommes en bérets, des femmes en foulards sombres, des mariages, des enterrements, des classes d’école. Au milieu de ces images suspendues, un homme avance lentement, carnet à la main. Lunettes rectangulaires, voix douce mais ferme : Manuel Velez, historien, 78 ans, consacre depuis les années 1970 une grande partie de sa vie à un village que presque personne ne connaissait en dehors de la région : Zuhéros.</p>
                <p>Nous l’avons rencontré après une conférence très suivie sur “Les derniers échos d’Al-Andalus à Zuhéros”.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">La Voz de Zuhéros : Professeur, comment commence votre histoire avec ce village ?</h3>
                <p><strong className="text-slate-100">Manuel Velez :</strong> Je ne viens pas d’ici. (sourire) Ma famille est d’origine française, installée à Gérone au XVIIIᵉ siècle. Rien, a priori, ne me destinait à passer quarante ans à arpenter les ruelles de Zuhéros.</p>
                <p>Dans les années 70, je travaillais sur la culture orale en Andalousie. Je faisais ce que font les ethnographes : de village en village, je collectais des chansons, des proverbes, des récits, des tournures de phrases. Un jour, près de Priego, un instituteur passionné d’histoire – dont la mère était Zuhéroise FHZ – m’a demandé : “Et Zuhéros, vous y êtes allé ?” Je lui ai sorti, très sûr de moi, le récit classique : les Maures chassés par Philippe III, les morisques expulsés, fin de l’histoire.</p>
                <p>Il a éclaté de rire.</p>
                <p>Ça m’a piqué. Il m’a alors parlé de ce village, de ces familles aux noms étranges, des vieilles qui parlaient un dialecte sorti d’un autre temps, de prières “bizarres”, de tombes orientées. Il a conclu : “Si vous croyez que tous les Maures sont partis, allez donc visiter Zuhéros.” J’y suis allé. Je ne suis jamais vraiment reparti.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Qu’est-ce qui vous a frappé en arrivant ?</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Le sentiment d’être dans un village espagnol “normal”… qui ne l’était pas du tout. À première vue : un village andalou typique, maisons blanches, église, bar, agriculteurs, drapeaux, processions. Mais très vite, quelque chose clochait – ou plutôt, quelque chose insistait.</p>
                <p>D’abord, les noms de famille : Abenel, Abenfassi, Abendanan, Abenbahon, Elfaris, Avunasem, Tlemés, Elzufi, Morra de Granada… On ne trouve pas ça partout. Ensuite, la langue : des vieux et des vieilles, surtout à Zuhéros Alto et à Tamesguida, parlaient un castillan avec une syntaxe et un lexique qui n’avaient rien de banal. Verbe–Sujet–Complément, des mots comme Imabel, Atibelá, Laulacuela, Sabilano, Rasulio, Almacra, Elhanza... Et puis les pratiques funéraires : le vieux cimetière, El cementerio Almacra, avec des tombes orientées vers l’aube.</p>
                <p>Je me suis dit : soit j’imagine des choses, soit nous sommes devant un laboratoire vivant de la survivance morisque.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Vous parlez souvent de Zuhéros comme d’un village “singulier” dans l’histoire d’Al-Andalus. En quoi est-il différent des autres ?</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> D’abord par son origine. Zuhéros, tel qu’on le connaît, se structure après la révolte des Alpujarras, à la fin du XVIᵉ siècle. Des familles morisques, parfois de petite noblesse, souvent mariées à des lignages chrétiens, achètent des terres dans cette zone alors peu peuplée, hors des grands circuits. Elles constituent un noyau relativement autonome, avec un comité villageois qui, plus tard, deviendra le CFHZ.</p>
                <p>Ce n’est pas un bourg reconstruit sur des ruines “vidées” de Maures ; c’est un refuge tardif où les morisques tentent de survivre, de négocier leur présence.</p>
                <p>Ensuite, Zuhéros est singulier par la longévité des traces:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Un dialecte où les phrases se structurent comme en arabe (Verbe–Sujet–Complément) bien plus tard que dans d’autres villages.</li>
                    <li>Un lexique religieux très marqué : Imabel (Foi en Dieu), Atibelá (Confiance en Dieu), Laulacuela (“Il n’y a de force et de puissance que par Dieu”), Sabilano (dérivé de hasbi Allah wa ni‘ma al-wakîl), Rasulio (de “Rasûl”, le Messager).</li>
                    <li>Des pratiques funéraires et des prières domestiques qui gardent une structure et un horizon symbolique très islamique jusqu’au XIXᵉ siècle.</li>
                    <li>Enfin, Zuhéros est singulier par sa fermeture. Jusqu’au XIXᵉ siècle, le village est à demi invisible sur les cartes, pratiquant une forte endogamie. Cela a protégé, longtemps, ses habitudes et ses mots.</li>
                </ul>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : On vous reproche parfois de “romantiser” Zuhéros, de voir de l’islam partout dans des pratiques paysannes. Que répondez-vous ?</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Que j’ai passé trop d’heures dans les cuisines et les cimetières de ce village pour me contenter de fantasmes (sourire).</p>
                <p>Je ne dis pas qu’en 1850, les Zuhérois se levaient en secret pour accomplir rigoureusement les cinq prières canoniques. Ce serait absurde. Ce que je dis, c’est qu’on trouve à Zuhéros des continuités de gestes, de formules, de structures de pensée qui ne sont pas explicables uniquement par le catholicisme local.</p>
                <p>Quand des vieilles dames, en plein XIXᵉ siècle, au moment où les premiers corps de la guerre du Rif arrivent au village, se mettent à crier “Sabilano !” en levant l’index au ciel, nous ne sommes pas simplement dans la théâtralité rurale. Quand, jusqu’aux années 60, des femmes préparent un couscous chaque vendredi, qu’elles insistent pour acheter la viande à la boucherie Muley, qu’elles organisent des “prières zuhéroises” à l’aube, nous sortons du cadre ordinaire de la religiosité espagnole.</p>
                <p>Et puis il y a les mots. On aurait pu garder des mots arabes pour “pain, cheval, maison”. Mais ce qui survit à Zuhéros, ce sont surtout des formules de foi. Ce n’est pas anodin.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Vous évoquez souvent des histoires très personnelles. Celle de Julia, celle de Felicia Abenel, ou encore des prières des vieilles dames. Pourquoi ces récits sont-ils si centraux pour vous ?</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Parce que l’histoire de Zuhéros ne se lit pas seulement dans les archives, mais dans les corps et les silences.</p>
                <p>Julia, par exemple, cette femme qui a attendu son fils Miguel, disparu pendant la guerre civile, de 1938 à 1980, cuisinant chaque jour un repas pour trois puis pour deux, laissant les clés chez la voisine “au cas où il reviendrait”. Quand, en 2023, on a retrouvé son corps dans une fosse commune et qu’il a été enterré près de sa mère, sa nièce a pu dire : “Julia, il est revenu.” Ce n’est pas seulement une histoire de deuil familial ; c’est la métaphore d’un village qui attend ses morts depuis un siècle.</p>
                <p>Felicia Abenel, fiancée de Pedro, mort au Rif, qui ne s’est jamais mariée de son vivant, se présentant comme “fiancée-veuve”, et qui n’a, d’une certaine façon, épousé Pedro qu’en étant enterrée à ses côtés en 1993 à Almacra… Là aussi, nous sommes au croisement de l’histoire nationale (la guerre du Rif) et de la mémoire intime d’un village sacrifié.</p>
                <p>Ces vies, ces douleurs, expliquent aussi pourquoi les FHZ sont comme ils sont : conservateurs, méfiants, très attachés à leur village, parfois durs avec eux-mêmes et avec les autres. Quand vous avez perdu 700 personnes en quarante ans de guerres, ce n’est pas le genre de choc qu’un village absorbe en une génération.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Justement, parlons des guerres. Vous dites souvent que Zuhéros “a sacrifié sa vitalité pour l’Espagne”.</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Les chiffres sont brutaux.</p>
                <p>En quarante ans, entre 1898 et 1939, vous avez :</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>la guerre de 1898,</li>
                    <li>la guerre du Rif,</li>
                    <li>la guerre civile.</li>
                </ul>
                <p>À Zuhéros, cela représente des centaines de morts, presque tous FHZ, et des dizaines de disparus, d’invalides, de familles amputées. Pour un village qui comptait à peine 2 000 habitants au début du XXᵉ siècle, c’est un tsunami démographique.</p>
                <p>Les hommes jeunes partent au front, beaucoup ne reviennent pas. Les femmes deviennent veuves à 20, 30 ans, élèvent seules leurs enfants. Des générations entières se retrouvent sans oncles, sans cousins, sans repères masculins. Certaines rues, après les guerres, sont littéralement vidées de leurs habitants.</p>
                <p>On demande souvent : “Pourquoi Zuhéros n’a-t-il pas atteint les 10 000 habitants plus tôt ?”</p>
                <p>Je réponds : “Parce que ses fils sont morts loin de chez eux.”</p>
                <p>Zuhéros est un village qui a payé, en sang, l’appartenance à l’Espagne. Mais l’Espagne, longtemps, n’a pas regardé ce que cela signifiait pour lui.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Vous travaillez sur ce village depuis les années 70. Qu’est-ce qui a changé, et qu’est-ce qui vous inquiète le plus aujourd’hui ?</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Ce qui a changé, d’abord, c’est le nombre : quand j’ai commencé à venir, il y avait encore des FHZ partout dans Zuhéros Viejo, Alto, Tamesguida. Aujourd’hui, ils ne sont plus qu’une minorité, environ 4 % de la population, âgés pour la plupart.</p>
                <p>Ce qui a changé, ensuite, c’est le lien conscient à leur histoire. Dans les années 70–80, les très vieux n’avaient aucun problème à reconnaître une origine “mauresque”. Certains étaient franquistes, d’autres conservateurs, mais quand je les interrogeais, ils disaient : “Oui, nos ancêtres étaient Maures.” L’un d’eux, dans la rue San Pedro, m’avait confié que l’origine maure n’était “un secret pour personne” dans sa famille. Sa grand-mère, avant d’entrer à l’église, retirait sa croix pour aller prier, et parfois la remettait à l’envers.</p>
                <p>Aujourd’hui, les jeunes FHZ se sentent très espagnols, très catholiques, très européens. Certains sont mal à l’aise à l’idée d’avoir eu des ancêtres musulmans. On a basculé du non-dit assumé à une forme de distance identitaire.</p>
                <p>Ce qui m’inquiète le plus, ce n’est pas que les traditions disparaissent – c’est largement fait. Ce qui m’inquiète, c’est que Zuhéros perde la conscience de ce qu’il a été, au point de devenir un village andalou comme un autre, alors qu’il a été, pendant des siècles, une petite anomalie historique.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Vous êtes très pessimiste sur l’avenir des FHZ dans le village…</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Je serais malhonnête si je disais le contraire.</p>
                <p>Les courbes démographiques sont claires : les FHZ vieillissent, leurs enfants et petits-enfants partent. La diaspora est nombreuse – plusieurs milliers de descendants de Zuhéros en Espagne et en Amérique – mais ils sont intégrés à d’autres villes, à d’autres vies. Ils gardent parfois le nom, parfois le souvenir d’une grand-mère, mais pas le village comme centre de gravité.</p>
                <p>Je dis souvent : « Zuhéros est peut-être le dernier village morisque d’Espagne. » Mais il est en train de cesser de l’être. Les traditions liées aux pratiques islamiques ont disparu dans la première moitié du XXᵉ siècle. Les derniers témoins de ceux qui les avaient vues sont eux-mêmes en train de disparaître. Le dialecte est moribond. Le CFHZ se transforme en comité du patrimoine. Les noms restent, les pierres restent, mais le peuple porteur de cet héritage se dissout.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Pourtant, vous continuez à venir, à écrire, à parler de Zuhéros. Pourquoi ?</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Parce que ce village, dans son humilité, rassemble des questions qui dépassent largement son clocher.</p>
                <p>On aime parler d’Al-Andalus dans les grandes lignes, des palais, des érudits, des grands décrets d’expulsion. Mais on oublie toujours ce que cela a donné, concrètement, dans la vie d’un village : comment des gens ont essayé de continuer à être eux-mêmes dans un monde qui exigeait qu’ils cessent de l’être. Zuhéros, c’est ça.</p>
                <p>Et puis, il y a une forme de responsabilité. Depuis les années 70, j’ai vu mourir des dizaines de vieux Zuhérois qui m’avaient fait confiance, qui m’avaient ouvert leurs maisons, leurs souvenirs, leurs blessures. À chaque décès, je me suis senti mal : “Voilà encore un morceau du puzzle qui disparaît.”</p>
                <p>Je ne peux pas empêcher le temps de faire son œuvre. Mais je peux, au moins, laisser une trace écrite, un récit articulé, pour que, dans cinquante ans, si quelqu’un se demande : “Que s’est-il joué à Zuhéros ?”, il ait autre chose qu’une ligne de statistiques.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">LVZ : Un dernier mot pour les jeunes Zuhérois, FHZ ou non ?</h3>
                <p><strong className="text-slate-100">M. Velez :</strong> Oui.</p>
                <p>Aux jeunes FHZ, je veux dire ceci : vous n’avez pas à avoir honte d’avoir eu des ancêtres musulmans, morisques, ni de porter des noms qu’on écorche ailleurs. Vous descendez d’une histoire exceptionnellement complexe, douloureuse, mais riche. Peu de gens peuvent dire qu’ils incarnent encore les réminiscences d’une civilisation enterrée.</p>
                <p>Aux jeunes FNZ et aux enfants d’immigrés, je veux dire : vous avez le droit d’entrer dans cette histoire. Elle ne vous est pas interdite parce que vos grands-parents ne sont pas nés ici. Zuhéros vous appartient aussi, si vous décidez de vous en sentir responsables.</p>
                <p>Et à tous, je dirais : n’oubliez pas que ce village a payé très cher pour être ce qu’il est. Si vous riez sur la Plaza, si vous entrez dans une école appelée Abenhumeya, si vous traversez Zuhéros Viejo en levant à peine les yeux, souvenez-vous que sous vos pas, il y a des couches d’histoires, de morts, de prières, de langues mélangées.</p>
                <p>On ne peut pas demander à la vie moderne de revenir en arrière. Mais on peut l’empêcher de tout recouvrir de silence.</p>
            </div>
        </>
    );
};

export default VelezInterviewPage;