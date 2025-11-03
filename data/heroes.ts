
export interface Hero {
    id: number;
    name: string;
    lifespan: string;
    birthPlace: string;
    unit: string;
    rank: string;
    theater: string;
    act: string;
    outcome: string;
    decorations: string[];
    zuhérosConnection: string;
    imageUrl: string;
}

export const heroesData: Hero[] = [
    {
        id: 1,
        name: "José María Vargas",
        lifespan: "1918–1957",
        birthPlace: "Zuhéros Alto",
        unit: "Infanterie",
        rank: "Capitaine",
        theater: "Ifni (secteur Tiliuín – T’Zelata)",
        act: "Prend le commandement d’une section isolée (lieutenant blessé), organise une défense circulaire, rationne munitions et eau, repousse trois assauts (23–24 nov. 1957).",
        outcome: "Section sauvée (1 mort, 6 blessés).",
        decorations: ["Cruz Laureada de San Fernando (à titre posthume)"],
        zuhérosConnection: "Une rue porte son nom à Zuhéros Alto.",
        imageUrl: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/574917333_2239737603175122_811747322336274673_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uLXePwHj7n8Q7kNvwFbTYgB&_nc_oc=Admh5MpWHEaHg2nKSjkGqznPxxHMGvjl0QT4JxjrAH2olkep9Rk4gohEk_ahIlpAULj6COgmZEXq1pqiOcX-vDsD&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=A-iosCTuKPYoFGkNJx8TiQ&oh=00_AfjDIW5dZqRxX5q9UaXbxu8ebKBHkfgs7y7TJvjgtNbBDA&oe=690CF66D"
    },
    {
        id: 2,
        name: "Manuel Ángel Setes",
        lifespan: "1919–2015",
        birthPlace: "Tamesguida",
        unit: "Légion",
        rank: "Sergent",
        theater: "Ifni (secteur Edchera)",
        act: "Sous le feu, rampe 80 m pour récupérer une mitrailleuse, la remet en batterie, couvre le repli de son groupe (13 janv. 1958).",
        outcome: "11 vies sauvées.",
        decorations: ["Medalla Militar Individual"],
        zuhérosConnection: "Sa famille a offert sa médaille au musée de la ville.",
        imageUrl: "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/576170491_2239734933175389_457503346465588503_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YYAPNBIQamgQ7kNvwHbz6xD&_nc_oc=AdkqPZCkjRZ_RY_xvCHg3Nxdt5nSmBXDSqz-9oziPGUPmkL5d4cWPMfAwT-j_q8H8Lf9Ycss0I_Xc8__CLkCHP9x&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=ModjuXGpNL_iFFs3-IBbcA&oh=00_Afgk3eZoAsP-rjjeofLOCWqNVkwrucMsEYUpWaH1E1Rd4w&oe=690D1459"
    },
    {
        id: 3,
        name: "Francisco Julián Echeviles",
        lifespan: "1928–2021",
        birthPlace: "Almanara",
        unit: "Parachutistes",
        rank: "Caporal-chef",
        theater: "Sahara (secteur Hagunia)",
        act: "Volontaire pour une mission de reconnaissance nocturne, neutralise un poste ennemi, rapporte des informations cruciales sur les effectifs (21 janv. 1958).",
        outcome: "Raid du lendemain réussi sans pertes.",
        decorations: ["Cruz del Mérito Militar (rojo)"],
        zuhérosConnection: "Plaque sur sa maison natale.",
        imageUrl: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/575906015_2239737419841807_3736793653815752124_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uHEBeeznq2IQ7kNvwEZ3WUO&_nc_oc=AdlTgnYGWij71Fw1Dwq_vxfyZh9bY7Y6tPdK7tHof8WNI5MCnBiS881mP1XJawfX1Rz39eOkZ4USztTYv5BOBW1a&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=UTPfDsQ8QOJP0v_CsxxfmQ&oh=00_Afg9OFRnU03qbExfFW4_JRouKVhpPjDxb5HRv3xrH9TXtA&oe=690CF92A"
    },
    {
        id: 4,
        name: "Jesús Julián Avencores",
        lifespan: "1938–",
        birthPlace: "Zuhéros Viejo",
        unit: "Infanterie",
        rank: "Commandant",
        theater: "La Güera – Smara (désengagement espagnol)",
        act: "Dirige la séquence d’évacuation d’un groupement mixte (civils + militaires) vers la côte ; calme une panique, déploie des écrans de fumée, temporise sous menace d’infiltrations (nov. 1975).",
        outcome: "0 civil abandonné ; transfert de 18 blessés sur l’hôpital de campagne.",
        decorations: ["Cruz del Mérito Militar (rojo)"],
        zuhérosConnection: "Don de sa boussole de terrain au musée local ; sentier commémoratif « Le Pas-de-Smara ».",
        imageUrl: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/575609252_2239738689841680_8674989572576174170_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9uumclQQmQ4Q7kNvwHf8Yk8&_nc_oc=Adkl9JKUNH_4EkFI2cMtzKk4uDVCIX26uxj8tpARXfICx-kEBHdcoQfTdknWaf0lUQNb8205Nvmm15eDSJ7-xqAr&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=GrjhqVFPqYjy00GiaTYiug&oh=00_Afgokc4BUr-wewR1dBG0AHHVuaCEBKTgVSnViAiXhmxLTA&oe=690D10E1"
    },
    {
        id: 5,
        name: "Óscar Julián Setes",
        lifespan: "1959–",
        birthPlace: "Montevideo (Uruguay), retour à Zuhéros Bajo en 1975.",
        unit: "Infanterie",
        rank: "Lieutenant-colonel",
        theater: "Mostar – Neretva (SPABRI, ONU)",
        act: "Met en place un couloir humanitaire sur le pont détruit : cordes, radeaux, transfert nocturne de 220 civils en 7 heures, malgré tirs sporadiques (18 fév. 1994).",
        outcome: "Aucun civil perdu ; 3 militaires légèrement blessés.",
        decorations: ["Medalla de Naciones Unidas (UNPROFOR)", "Cruz al Mérito Militar"],
        zuhérosConnection: "Programme « Neretva » d’échanges scolaires avec Mostar.",
        imageUrl: "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/574951187_2239743686507847_5139439858489162130_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GjnQgcAc6dMQ7kNvwEdbrTd&_nc_oc=Adk5dFQJTpEmPhe9pdMZcY4MToh78KPZ9-IUuR59jCGZgyO_wfKHFNhi2bQWpAoW--bFkmhXUHzddbks1Aj_v63J&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=0j_UwI2KWv5dnPXS72pEFQ&oh=00_AfgU2VIKlBxV1_E1m2qZHsGTfEjc-v2LQoMT9LBs5F_VgQ&oe=690D0961"
    },
    {
        id: 6,
        name: "Sergio Martín Echeviles",
        lifespan: "1965–",
        birthPlace: "Barcelone (parents de Tamesguida)",
        unit: "Cavalerie",
        rank: "Colonel",
        theater: "Mitrovica – Pristina, KFOR",
        act: "À Mitrovica, interpose deux VEC (cavalerie légère) entre foules antagonistes ; désescalade via haut-parleurs, ouvre une trêve de 45 min pour évacuer blessés et notables (août 1999).",
        outcome: "Émeute neutralisée sans tir ; 26 blessés civils pris en charge.",
        decorations: ["OTAN Non-Article 5", "Cruz del Mérito Militar (blanco)"],
        zuhérosConnection: "Parrain du club jeune médiation à Tamesguida.",
        imageUrl: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/575201290_2239753589840190_7529232974824703246_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tLbGJJRYzNUQ7kNvwGwYzFG&_nc_oc=AdlAK1v-h-oGbbAGVQ3FRp4X59CNTt8b27vFmmk79yFSvm4XoGaMskmSFSeTnK4QDVY-1faELol1FNnL5aqoDPqp&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=DxQLXVZdPRGBXfRykNSpOA&oh=00_Aficu15-G8dbtXsqK1EfWfzLjXebLDsOvt9YBJ1w6c0GNw&oe=690D0488"
    },
    {
        id: 7,
        name: "Iván Rodrigo Manzores",
        lifespan: "1972–",
        birthPlace: "Madrid (grands-parents d'Almanara)",
        unit: "Infanterie légère",
        rank: "Lieutenant-colonel",
        theater: "Diwaniya – Najaf (Brigade Plus Ultra)",
        act: "À Najaf, coordonne l’extraction d’une équipe sur deux axes : fumigènes + tir de fixation, ramène 17 personnels et 3 blessés sans pertes supplémentaires (4 avr. 2004).",
        outcome: "Convois repliés ; position reprise 36 h plus tard.",
        decorations: ["Cruz del Mérito Militar (rojo)", "Medalla de Irak"],
        zuhérosConnection: "Donne chaque été un atelier tactique aux cadets locaux.",
        imageUrl: "https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/576364889_2239755146506701_7251115842289249449_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=r2iGWa9LYGgQ7kNvwFyLMQU&_nc_oc=AdkvKSjZMGq7lVYYNvro7awxZDMADa5DGQpnajvvlEjM5hSdDqefMpIgJBl6u6cvmGdXbo3aGWgLbFg0mF8zFnKq&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=lt_AJ9hqa-rRMrzpy0vvhw&oh=00_Afi4vx4WJI6O4xR8Zzr3y3OP-hl3URo60_xlLAngV1kySw&oe=690D0631"
    },
    {
        id: 8,
        name: "Bruno Álex Malques",
        lifespan: "1977–",
        birthPlace: "Zuhéros Alto",
        unit: "Infanterie mécanisée",
        rank: "Capitaine",
        theater: "Badghis – Qala-i-Naw (ISAF)",
        act: "IED sur la MSR 8 ; sécurise le périmètre, dérive les tirs avec une section appuyée, organise le MEDEVAC (2 hélicos) et l’autoremorquage d’un RG-31 endommagé (25 août 2010).",
        outcome: "0 mort côté espagnol ; 5 blessés stabilisés.",
        decorations: ["Cruz del Mérito Militar (rojo)", "ISAF"],
        zuhérosConnection: "A financé la rénovation de la sirène de pompier volontaire.",
        imageUrl: "https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/575168301_2239759783172904_2661008603749796247_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Lbyo70BcDyUQ7kNvwGORoc6&_nc_oc=AdkJ1mLMfPufmiyJ1irMvRpFNGQYxQEP8JKpHvF3Dnc96qBVGXsGTzSnpfbEfu9LhYStQ_oNSkLoAvRV4GTNS28Z&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=CM5INCTFaTicfGvkMJlnUw&oh=00_Afg6iXTnQYPwPGMpjYnqNyT4UVXBUawHBaThS5ViBaoyyA&oe=690D23F2"
    },
    {
        id: 9,
        name: "Diego Noel Talores",
        lifespan: "1984–",
        birthPlace: "Zuhéros Viejo",
        unit: "Transmissions",
        rank: "Sergent-chef",
        theater: "Marjayoun – Khiyam, FINUL",
        act: "Après VBIED sur une patrouille espagnole, met en place un réseau radio redondant en 6 min, localise les survivants, guide deux équipes de secours sous menace d’un 2e engin (24 juin 2007).",
        outcome: "4 vies sauvées (hémorragies contrôlées à temps).",
        decorations: ["Cruz al Mérito Militar (rojo)", "Medalla ONU"],
        zuhérosConnection: "Anime le module « Radios & premiers gestes » au collège.",
        imageUrl: "https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/575167234_2239778349837714_4043457087237081984_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eTKe-Uk5S3kQ7kNvwHefbUq&_nc_oc=AdlsqVjBNjveA_gr27N0VZlaQ7Y1AA0w25YviCPOvOllxMXMvs-_Udk_wD7t3iCFfY37_5sSYmkaEHcHQNie02tn&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=g-FDNS9SkwElTCVq1CSVyA&oh=00_AfhaKbWde_aom4SnJd_rZB5YfVf-sxPhYgfcbQEK0kuzRQ&oe=690D058D"
    },
    {
        id: 10,
        name: "Marcos Daniel Benjumea",
        lifespan: "1981–",
        birthPlace: "Córdoba (famille de Zuhéros Bajo)",
        unit: "Infanterie",
        rank: "Commandant, instructeur EUTM",
        theater: "Koulikoro (mission de formation)",
        act: "Lors d’une attaque combinée (EEI + tirs), organise la défense rapprochée du camp de formation, répartit l’appui-feu avec cadres maliens, évacue 11 stagiaires blessés (févr. 2019).",
        outcome: "Base tenue ; pas de perte espagnole ; instruction reprise 72 h plus tard.",
        decorations: ["Cruz del Mérito Militar (rojo)", "EU Common Security & Defence Policy Service Medal"],
        zuhérosConnection: "Parrain d’un fonds pour bourses « Alfaneque » (outils-métiers) au quartier Bajo.",
        imageUrl: "https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/576270363_2239782063170676_1676269128971525288_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=I8aMYX56PJkQ7kNvwGtB3Hf&_nc_oc=Adlc9_vOsiyQX7uZ7J2pRJ-dGZaSO7N_yMPJZdISNvYLnetzrJxLWoQgP0acoMOwY4-2vT7xWvR-98urxPa6aGHl&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=lp8LP9UCeQG1T_ri7mUgYg&oh=00_AfhfQvf8_nm4GPnEBXE2tG9-k-iyl9l4DELU4otmuv4M3w&oe=690D14F6"
    }
];