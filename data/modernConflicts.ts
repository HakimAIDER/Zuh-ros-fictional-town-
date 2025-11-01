import { Person } from '../types';

const modernConflictDataRaw = [
    // Guerre d’Ifni–Sahara (1957–1958)
    { lastName: "Benjumea", firstName1: "José", firstName2: "María", birthYear: 1936, birthPlace: "Zuhéros Viejo", deathDetails: "mort au combat", deathPlace: "Tiliuín (Ifni)", deathDate: "24 nov. 1957", deathYear: 1957, war: "Guerre d’Ifni-Sahara" },
    { lastName: "Setes", firstName1: "Manuel", firstName2: "Ángel", birthYear: 1935, birthPlace: "Zuhéros Alto", deathDetails: "mort au combat", deathPlace: "Sidi Ifni", deathDate: "4 déc. 1957", deathYear: 1957, war: "Guerre d’Ifni-Sahara" },
    { lastName: "Echeviles", firstName1: "Francisco", firstName2: "Javier", birthYear: 1934, birthPlace: "Tamesguida", deathDetails: "accident de service", deathPlace: "El Aaiún", deathDate: "18 janv. 1958", deathYear: 1958, war: "Guerre d’Ifni-Sahara" },
    // Sahara occidental (1974–1975)
    { lastName: "Avencores", firstName1: "Jesús", firstName2: "Julián", birthYear: 1953, birthPlace: "Almanara", deathDetails: "tir hostile", deathPlace: "Smara", deathDate: "3 nov. 1974", deathYear: 1974, war: "Sahara Occidental" },
    { lastName: "Avenbéz", firstName1: "Félix", firstName2: "Hernán", birthYear: 1952, birthPlace: "Zuhéros Bajo", deathDetails: "accident en retrait", deathPlace: "La Güera", deathDate: "8 nov. 1975", deathYear: 1975, war: "Sahara Occidental" },
    { lastName: "Avenizar", firstName1: "Óscar", firstName2: "Rubén", birthYear: 1954, birthPlace: "Zuhéros Viejo", deathDetails: "mine", deathPlace: "Mahbes", deathDate: "22 oct. 1975", deathYear: 1975, war: "Sahara Occidental" },
    // Balkans — Bosnie (1992–1996)
    { lastName: "Vargas", firstName1: "Sergio", firstName2: "Daniel", birthYear: 1972, birthPlace: "Zuhéros Alto", deathDetails: "tir de sniper", deathPlace: "Mostar", deathDate: "18 fév. 1994", deathYear: 1994, war: "Balkans (Bosnie)" },
    { lastName: "Zamor", firstName1: "Iván", firstName2: "Marcos", birthYear: 1973, birthPlace: "Zuhéros Bajo", deathDetails: "crash d’hélicoptère", deathPlace: "Trebinje", deathDate: "12 janv. 1995", deathYear: 1995, war: "Balkans (Bosnie)" },
    { lastName: "Cuérrez", firstName1: "Raúl", firstName2: "Javier", birthYear: 1971, birthPlace: "Tamesguida", deathDetails: "EEI", deathPlace: "Sarajevo", deathDate: "22 août 1995", deathYear: 1995, war: "Balkans (Bosnie)" },
    // Liban — FINUL (2006–2008)
    { lastName: "Sanayes", firstName1: "Diego", firstName2: "Mateo", birthYear: 1981, birthPlace: "Zuhéros Viejo", deathDetails: "VBIED", deathPlace: "Khiyam", deathDate: "24 juin 2007", deathYear: 2007, war: "Liban (FINUL)", imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fcc5806d-a1d3-41f3-b53d-cda0cd22edab.png" },
    { lastName: "Abengoa", firstName1: "Pablo", firstName2: "Bruno", birthYear: 1981, birthPlace: "Almanara", deathDetails: "même attaque", deathPlace: "Khiyam", deathDate: "24 juin 2007", deathYear: 2007, war: "Liban (FINUL)", imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c2b2d52f-3741-4cca-b4bf-7712e596c67c.png" },
    { lastName: "Harbez", firstName1: "Mario", firstName2: "Iván", birthYear: 1983, birthPlace: "Zuhéros Bajo", deathDetails: "tir ennemi", deathPlace: "Marjayoun", deathDate: "20 sept. 2008", deathYear: 2008, war: "Liban (FINUL)", imageUrl: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/24cc6477-be3f-41ec-a55a-001a618d5a4d.png" },
    // Irak (2003–2004)
    { lastName: "Perez", firstName1: "Álvaro", firstName2: "Iván", birthYear: 1979, birthPlace: "Zuhéros Bajo", deathDetails: "embuscade", deathPlace: "Latifiya", deathDate: "29 nov. 2003", deathYear: 2003, war: "Irak" },
    { lastName: "Zenati", firstName1: "Daniel", firstName2: "Bruno", birthYear: 1980, birthPlace: "Zuhéros Alto", deathDetails: "EEI", deathPlace: "Diwaniya", deathDate: "6 avr. 2004", deathYear: 2004, war: "Irak" },
    { lastName: "Nares", firstName1: "Marcos", firstName2: "Héctor", birthYear: 1978, birthPlace: "Zuhéros Viejo", deathDetails: "combats urbains", deathPlace: "Najaf", deathDate: "4 avr. 2004", deathYear: 2004, war: "Irak" },
    // Afghanistan — ISAF (2002–2014)
    { lastName: "Najares", firstName1: "Javier", firstName2: "Mateo", birthYear: 1985, birthPlace: "Tamesguida", deathDetails: "EEI", deathPlace: "Qala-i-Naw", deathDate: "25 août 2010", deathYear: 2010, war: "Afghanistan (ISAF)" },
    { lastName: "Abenfassi", firstName1: "Héctor", firstName2: "Adrián", birthYear: 1986, birthPlace: "Zuhéros Alto", deathDetails: "attaque complexe", deathPlace: "Badghis", deathDate: "7 juin 2011", deathYear: 2011, war: "Afghanistan (ISAF)" },
    { lastName: "Muley", firstName1: "Rubén", firstName2: "Álex", birthYear: 1984, birthPlace: "Almanara", deathDetails: "crash hélico", deathPlace: "Herat", deathDate: "16 août 2012", deathYear: 2012, war: "Afghanistan (ISAF)" },
];

export const modernConflictsData: Person[] = modernConflictDataRaw.map((p: any, index) => {
    const age = p.deathYear - p.birthYear;
    return {
        id: `modern-${index + 1}`,
        lastName: p.lastName,
        firstName1: p.firstName1,
        firstName2: p.firstName2,
        birthYear: p.birthYear,
        birthPlace: p.birthPlace,
        geographicOrigin: p.birthPlace,
        age: age,
        deathYear: p.deathYear,
        deathPlace: p.deathPlace,
        war: p.war as any,
        status: 'Mort pour la patrie',
        imageUrl: p.imageUrl,
        mention: `Né en ${p.birthYear} à ${p.birthPlace}. Mort pour la patrie (${p.deathDetails}) à ${p.deathPlace} le ${p.deathDate} à l'âge de ${age} ans.`
    };
});
