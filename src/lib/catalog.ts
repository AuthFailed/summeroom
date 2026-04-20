import type { Plant } from '../data/plants';
import { plants as fallbackPlants } from '../data/plants';
import type { Pot } from '../data/pots';
import { pots as fallbackPots } from '../data/pots';
import {
  apiProductToPlant,
  apiProductToPot,
  fetchCatalog,
  type ApiProduct,
  type SocialMap,
} from './api';

export interface ResolvedProduct<T> {
  id: string | null;
  data: T;
  stock: number;
  primaryImageUrl: string | null;
}

export interface ResolvedCatalog {
  plants: Array<ResolvedProduct<Plant>>;
  pots: Array<ResolvedProduct<Pot>>;
  social: SocialMap;
  source: 'api' | 'fallback';
}

function primaryUrl(p: ApiProduct): string | null {
  return p.images.find((i) => i.is_primary)?.url ?? p.images[0]?.url ?? null;
}

export async function loadCatalog(): Promise<ResolvedCatalog> {
  try {
    const data = await fetchCatalog();
    return {
      source: 'api',
      social: data.social ?? {},
      plants: data.plants.map((p) => ({
        id: p.id,
        data: apiProductToPlant(p),
        stock: p.stock,
        primaryImageUrl: primaryUrl(p),
      })),
      pots: data.pots.map((p) => ({
        id: p.id,
        data: apiProductToPot(p),
        stock: p.stock,
        primaryImageUrl: primaryUrl(p),
      })),
    };
  } catch (e) {
    console.warn('[catalog] falling back to bundled data:', e);
    return {
      source: 'fallback',
      social: {},
      plants: fallbackPlants.map((p) => ({
        id: null,
        data: p,
        stock: 1,
        primaryImageUrl: null,
      })),
      pots: fallbackPots.map((p) => ({
        id: null,
        data: p,
        stock: 5,
        primaryImageUrl: null,
      })),
    };
  }
}
