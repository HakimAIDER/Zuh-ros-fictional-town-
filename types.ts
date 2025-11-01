export interface Person {
  id: string;
  lastName: string;
  firstName1: string;
  firstName2: string | null;
  birthYear: number;
  birthPlace: string;
  age: number | null;
  deathYear: number | null;
  deathPlace: string | null;
  war: 'Guerre du Rif' | 'Guerre Civile Espagnole' | 'Guerre Hispano-Américaine' | 'Guerre d’Ifni-Sahara' | 'Sahara Occidental' | 'Balkans (Bosnie)' | 'Liban (FINUL)' | 'Irak' | 'Afghanistan (ISAF)';
  status: 'Mort pour la patrie' | 'Disparu(e)';
  imageUrl?: string;
  
  // War-specific details
  geographicOrigin?: string; // Rif war
  camps?: string; // Civil war
  mention: string;
  lastSeen?: string;
  deathCause?: string;
}