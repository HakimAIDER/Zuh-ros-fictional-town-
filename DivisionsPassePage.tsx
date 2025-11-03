import React from 'react';

const DivisionsPassePage: React.FC = () => {
    return (
        <>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-rose-600 to-amber-400 mb-2 tracking-tight">
                Les Zuhérois, les divisions du passé
            </h1>

            <figure className="my-8">
                <img 
                    src="https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/576803297_2240782933070589_7884498261396094824_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tSFLF9dEHjMQ7kNvwH9JDzD&_nc_oc=AdmFUwBWMBq0ivSYRu7GOTb4BrkNcHg4vYxnXv4q7raxf0X6dByeETpYW9LseGuDxSohHNT5WF-15f8cXltDAsUZ&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=sEvcLkpTMDBtSrb5tPhzaw&oh=00_Afho2srFIoP4L-aXwGNil3Pto6Dajrd7y5HBVcf98Luipw&oe=690E7501" 
                    alt="Illustration des divisions à Zuhéros"
                    className="w-full max-w-3xl mx-auto rounded-lg shadow-lg border border-white/10"
                />
                <figcaption className="mt-3 text-center text-sm text-slate-400 italic max-w-2xl mx-auto">
                    Une Rue dans le quartier de Zuhéros Viejo.
                </figcaption>
            </figure>

            <div className="prose-custom text-slate-300 max-w-none space-y-4 text-lg leading-relaxed">
                <p>À Zuhéros, petite ville andalouse perdue entre oliveraies et collines, les lignes de fracture ne suivent pas les contours habituels de la politique espagnole. Ici, le clivage gauche–droite compte, bien sûr. Mais il se superpose à un autre, plus discret, plus ancien et plus douloureux : celui qui oppose, ou du moins distingue, les FHZ – <em>Familles Zuhéroises Historiques</em> – et les FNZ – <em>Familles Nouvelles de Zuhéros</em>.</p>
                <p>En 2025, les FHZ ne représentent plus que 4 % de la population, concentrés pour l’essentiel à Zuhéros Viejo, Zuhéros Alto et dans le hameau rural de Tamesguida. Les FNZ, eux, sont partout ailleurs : à Zuhéros Bajo, dans les lotissements récents, en périphérie. Et pourtant, ce sont toujours les noms FHZ qui dominent les registres fonciers, les titres de propriété, les plaques du vieux cimetière Almacra et les rues de la vieille ville.</p>
                <p>C’est là que commence le malentendu.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Un village, deux mémoires</h3>
                <p>Pour comprendre le conflit, il faut d’abord comprendre le déséquilibre de mémoire.</p>
                <p>Pour les FHZ, Zuhéros est plus qu’un lieu d’habitation : c’est la trace vivante (ou agonisante) d’un passé morisque singulier. Le dialecte zuhérois du castillan, aujourd’hui moribond, les tombes tournées vers l’aube, les mots comme <em>Imabel, Atibelá, Laulacuela, Sabilano, Rasulio</em>, les prières des vieilles dames, les histoires du CFHZ, les morts de la guerre du Rif et de la guerre civile… Tout cela forme un bloc de sens que beaucoup de FNZ n’habiteront jamais de la même manière.</p>
                <p>« Nous, on est arrivés dans les années 70, raconte Javier, commerçant FNZ installé à Zuhéros Bajo. Mon père a repris une épicerie dont les propriétaires FHZ étaient partis à Madrid. On a payé un loyer, puis on a racheté le fonds. On travaillait 12 heures par jour. On nous disait : <em>vous n’êtes pas d’ici</em>. Aujourd’hui encore, certains vieux te le font sentir. »</p>
                <p>Dans le récit FHZ, l’histoire s’écrit autrement. Les familles historiques ont payé un prix effrayant aux guerres : 167 morts en 1898, 193 au Rif, 335 pendant la guerre civile. Près de 700 morts en quarante ans, presque tous FHZ. Des familles entières rayées des registres, des rues vidées, des veuves, des orphelins, des disparus jamais retrouvés. De cette saignée est née une conviction : Zuhéros a sacrifié sa vitalité pour l’Espagne, et le pays n’a jamais vraiment regardé en retour.</p>
                <p>« L’Espagne n’a jamais regardé Zuhéros, mais Zuhéros n’a jamais cessé de regarder l’Espagne », aime dire le professeur Velez. Dans ce cadre, les FNZ apparaissent souvent, aux yeux des plus âgés, comme ceux qui arrivent *après* la tragédie, au moment où les terres prennent de la valeur, où les loyers augmentent, où les maisons peuvent se vendre.</p>

                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Propriétaires absents et gestion déléguée</h3>
                <p>Le cœur économique du conflit FHZ/FNZ se joue là : les FHZ sont massivement propriétaires (ou descendants de propriétaires), les FNZ sont majoritairement occupants, gérants, locataires, repreneurs. Les guerres ont renversé la structure familiale : des héritages sans héritiers, des maisons sans fils, des commerces sans repreneurs. Les survivants – femmes, veuves, enfants – ont parfois quitté le village, tout en gardant la propriété des biens. La génération suivante, installée à Madrid, Cordoue, Barcelone, Buenos Aires ou Montevideo, a gardé les titres de propriété… mais plus le désir de revenir.</p>
                <p>Résultat : des FHZ diasporiques qui louent, vendent, délèguent ; des FNZ qui investissent leur sueur dans un village dont ils ne sont pas toujours reconnus comme co-propriétaires symboliques.</p>
                <p>« Sans les FNZ, il n’y aurait plus de commerces FHZ, explique Velez lors d’une conférence. Ils ont tenu les bars, les ateliers, les champs, à une époque où les FHZ n’avaient plus ni bras, ni jeunes, ni relève. » Ce discours, les FHZ les plus âgés l’acceptent parfois du bout des lèvres. « Ils ont raison, admet Clara, FHZ de Zuhéros Viejo. Mais ce sont nos morts qui ont laissé ces vides. Quand on voit les loyers, les prix, parfois on a l’impression que nos fantômes ont été monétisés. »</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Identité contre quotidien : la fracture intime</h3>
                <p>Le second niveau du conflit est identitaire. Pour une bonne partie des FHZ âgés, l’identité zuhéroise est un triptyque : catholique et conservatrice, d’origine morisque évidente (noms, dialecte, rites enfouis), profondément liée au village, au cimetière, aux collines. Ils votent souvent à droite, voire à l’extrême droite sur certains sujets, tout en acceptant – parfois avec fierté – qu’ils descendent de « Maures ». Ils refusent massivement la construction d’une mosquée pour la nouvelle communauté musulmane (principalement marocaine, albanaise, pakistanaise), non pas par amour de l’Église seulement, mais aussi par rejet d’un islam vécu comme extérieur, « d’immigrés », sans lien avec la tradition morisque.</p>
                <p>Les FNZ, eux, voient les choses autrement. Ils n’ont pas été socialisés dans le mythe d’un « dernier village morisque d’Espagne ». Ils se vivent d’abord comme Espagnols ordinaires, habitants d’une petite ville andalouse qui doit composer avec la crise, le chômage, le prix du logement, l’arrivée de nouveaux migrants. Pour beaucoup, l’histoire morisque est intéressante, émouvante parfois, mais secondaire dans le quotidien.</p>
                <p>« On nous parle souvent des Maures, explique Ana, infirmière FNZ. Très bien, c’est une histoire importante. Mais moi, je dois payer un loyer, trouver une place à mon fils à l’école, supporter un bus bondé. Je ne vis pas dans le XVIᵉ siècle, moi. »</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Religion, conservatisme et malentendus</h3>
                <p>Un autre point de tension est la religion. Les FHZ âgés sont catholiques conservateurs, très attachés aux rituels, aux processions, aux fêtes. Paradoxalement, derrière ce conservatisme franquiste tardif, Velez voit parfois l’ombre d’un ancien conservatisme musulman : valorisation de la famille, de la terre, séparation des rôles, méfiance envers la gauche perçue comme décadente. Une forme de continuité structurelle, sous des contenus religieux différents.</p>
                <p>L’arrivée récente d’une communauté musulmane d’environ 500 personnes complique encore les choses. Les FHZ refusent largement l’idée que cette communauté pourrait « raviver » l’héritage islamique du village. Pour eux, il s’agit d’un islam étranger, de migrants, de nationalités diverses, sans lien avec « Din Mohamed » des morisques. « Un Zuhérois FHZ se sentira plus proche d’un FNZ catholique que d’un Marocain arrivé il y a deux ans », résume Velez.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Classe, ressentiments et silences</h3>
                <p>Le conflit FHZ/FNZ est aussi un conflit de classe qui ne dit pas toujours son nom. Les FHZ, même s’ils sont démographiquement minoritaires, sont souvent propriétaires. Beaucoup de FNZ, eux, ont le sentiment de porter le poids du présent : ils tiennent les commerces ouverts ; ils assurent les services, l’artisanat, les professions intermédiaires ; ils paient les loyers, entretiennent des bâtiments qu’ils ne posséderont jamais vraiment.</p>
                <p>« Sans nous, la vieille ville serait un décor vide, soupire un restaurateur FNZ. Mais quand on parle de Zuhéros ‘authentique’, ce n’est jamais de nous qu’on parle. » Côté FHZ, le ressentiment est d’un autre ordre : ils se sentent dépositaires d’une histoire que personne ne veut entendre ; ils ont l’impression que l’Espagne les a utilisés – pour les guerres, pour le folklore – et les abandonne maintenant ; ils voient leurs enfants et petits-enfants FHZ partir, s’installer ailleurs, se marier hors du village, se diluer.</p>
                
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500 pt-6 border-t border-slate-800 tracking-tight !mt-10">Un conflit sans guerre, mais pas sans dommages</h3>
                <p>Il serait excessif de parler de « guerre civile » entre FHZ et FNZ. Il n’y a pas de violences organisées, pas de milices, pas de frontières internes. Mais le ressentiment diffus crée des effets concrets : faible coopération sur des projets patrimoniaux communs, incompréhensions, tensions dans les associations, méfiance.</p>
                <p>Le CFHZ lui-même, devenu en 2025 Comité pour les affaires culturelles et du patrimoine, est traversé par cette tension : certains de ses membres plus âgés voudraient qu’il reste un bastion FHZ, d’autres comprennent qu’il devra, tôt ou tard, travailler avec des FNZ et même avec la nouvelle communauté musulmane s’il veut que l’héritage zuhéros survive autrement que dans les livres d’histoire.</p>

                <blockquote className="relative my-6 pl-6 text-slate-200 italic before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-rose-600 rounded">
                « Les FNZ peuvent, et doivent, inventer un nouveau Zuhéros. C’est leur droit, leur responsabilité. Mais le Zuhéros qu’on est en train de perdre ne reviendra pas. Ce village clos un chapitre humain, anthropologique, d’Al-Andalus. » - Professeur Velez
                </blockquote>

                <p>La question qui hante Zuhéros est simple et cruelle : que sera un Zuhéros sans FHZ ? Le conflit FHZ/FNZ n’est pas seulement un choc de générations ou de cultures ; c’est le symptôme d’une transition irréversible. Reste une question : les FHZ et les FNZ accepteront-ils, ensemble, de mettre en récit cette transition, plutôt que de la subir chacun dans son coin ? Pour l’instant, le village oscille entre nostalgie, fatigue et résignation. Mais dans certaines réunions, on entrevoit autre chose : la possibilité que le conflit devienne un dialogue, et que l’histoire de Zuhéros soit racontée non plus seulement comme celle d’une perte, mais aussi comme celle d’une transmission partagée.</p>
            </div>
        </>
    );
};

export default DivisionsPassePage;