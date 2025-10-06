import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  requirement: {
    type: 'exchanges' | 'books_linked' | 'events' | 'reading_time' | 'special';
    value: number;
  };
  earnedAt?: string;
}

// Definición de todas las insignias disponibles
export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'explorador_literario',
    name: 'Explorador Literario',
    icon: '🧭',
    description: 'Completó su primer intercambio',
    rarity: 'uncommon',
    requirement: { type: 'exchanges', value: 1 }
  },
  {
    id: 'lector_novato',
    name: 'Lector Novato',
    icon: '📖',
    description: 'Vinculó su primer libro',
    rarity: 'common',
    requirement: { type: 'books_linked', value: 1 }
  },
  {
    id: 'guardian_libros',
    name: 'Guardián de Libros',
    icon: '🛡️',
    description: 'Mantuvo 5 libros en excelente estado',
    rarity: 'epic',
    requirement: { type: 'special', value: 5 }
  },
  {
    id: 'curador_coleccion',
    name: 'Curador de Colección',
    icon: '📚',
    description: 'Ha vinculado más de 30 libros',
    rarity: 'rare',
    requirement: { type: 'books_linked', value: 30 }
  },
  {
    id: 'top_lector',
    name: 'Top Lector',
    icon: '👑',
    description: 'Intercambió 10+ libros en un mes',
    rarity: 'legendary',
    requirement: { type: 'exchanges', value: 10 }
  },
  {
    id: 'socializado',
    name: 'Socializado',
    icon: '🎭',
    description: 'Asistió a su primer evento literario',
    rarity: 'uncommon',
    requirement: { type: 'events', value: 1 }
  },
  {
    id: 'fanatico_eventos',
    name: 'Fanático de Eventos',
    icon: '🎪',
    description: 'Asistió a 10 eventos literarios',
    rarity: 'epic',
    requirement: { type: 'events', value: 10 }
  },
  {
    id: 'maestro_intercambios',
    name: 'Maestro de Intercambios',
    icon: '⭐',
    description: 'Completó 50 intercambios exitosos',
    rarity: 'legendary',
    requirement: { type: 'exchanges', value: 50 }
  },
  {
    id: 'coleccionista',
    name: 'Coleccionista',
    icon: '💎',
    description: 'Vinculó 10 libros diferentes',
    rarity: 'rare',
    requirement: { type: 'books_linked', value: 10 }
  },
  {
    id: 'veterano',
    name: 'Veterano',
    icon: '🏆',
    description: 'Un año en la comunidad',
    rarity: 'epic',
    requirement: { type: 'special', value: 365 }
  }
];

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return '#9CA3AF';
    case 'uncommon': return '#10B981';
    case 'rare': return '#3B82F6';
    case 'epic': return '#8B5CF6';
    case 'legendary': return '#F59E0B';
    default: return '#9CA3AF';
  }
};

export const getUserBadges = async (userId: string): Promise<Badge[]> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data.badges || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting user badges:', error);
    return [];
  }
};

export const checkAndAwardBadges = async (userId: string, userStats: {
  booksLinked: number;
  totalExchanges: number;
  eventsAttended: number;
}) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return;

    const userData = userDoc.data();
    const currentBadges = userData.badges || [];
    const currentBadgeIds = currentBadges.map((b: Badge) => b.id);

    const newBadges: Badge[] = [];

    // Verificar cada insignia disponible
    for (const badge of AVAILABLE_BADGES) {
      // Si ya tiene la insignia, saltarla
      if (currentBadgeIds.includes(badge.id)) continue;

      let earned = false;

      switch (badge.requirement.type) {
        case 'books_linked':
          earned = userStats.booksLinked >= badge.requirement.value;
          break;
        case 'exchanges':
          earned = userStats.totalExchanges >= badge.requirement.value;
          break;
        case 'events':
          earned = userStats.eventsAttended >= badge.requirement.value;
          break;
        case 'special':
          // Lógica especial para insignias como "Guardián de Libros" o "Veterano"
          break;
      }

      if (earned) {
        newBadges.push({
          ...badge,
          earnedAt: new Date().toISOString()
        });
      }
    }

    // Agregar nuevas insignias al usuario
    if (newBadges.length > 0) {
      await updateDoc(doc(db, 'users', userId), {
        badges: arrayUnion(...newBadges)
      });

      return newBadges;
    }

    return [];
  } catch (error) {
    console.error('Error checking badges:', error);
    return [];
  }
};

export const awardBadge = async (userId: string, badgeId: string) => {
  try {
    const badge = AVAILABLE_BADGES.find(b => b.id === badgeId);
    if (!badge) {
      throw new Error('Badge not found');
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    const currentBadges = userData.badges || [];

    // Verificar si ya tiene la insignia
    if (currentBadges.some((b: Badge) => b.id === badgeId)) {
      throw new Error('User already has this badge');
    }

    const newBadge = {
      ...badge,
      earnedAt: new Date().toISOString()
    };

    await updateDoc(doc(db, 'users', userId), {
      badges: arrayUnion(newBadge)
    });

    return newBadge;
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
};
