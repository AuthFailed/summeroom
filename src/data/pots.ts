export type PotShape = 'wave' | 'ribs' | 'spiral' | 'hex' | 'crater' | 'facets';

export interface Pot {
  code: string;
  name: string;
  nameItalic: boolean;
  shape: PotShape;
  colorA: string;
  colorB: string;
  size: string;
  height: string;
  material: string;
  price: number;
}

export const pots: Pot[] = [
  {
    code: 'KL-01',
    name: 'Волны',
    nameItalic: false,
    shape: 'wave',
    colorA: '#b8542e',
    colorB: '#e8e1ce',
    size: 'Ø 14 см',
    height: 'h 13 см',
    material: 'PLA мат',
    price: 1900,
  },
  {
    code: 'KL-02',
    name: 'Ребро',
    nameItalic: false,
    shape: 'ribs',
    colorA: '#2d4a2b',
    colorB: '#1a2419',
    size: 'Ø 18 см',
    height: 'h 17 см',
    material: 'PLA мат',
    price: 2400,
  },
  {
    code: 'KL-03',
    name: 'Спираль',
    nameItalic: true,
    shape: 'spiral',
    colorA: '#c89a3a',
    colorB: '#f3efe5',
    size: 'Ø 12 см',
    height: 'h 14 см',
    material: 'PLA шёлк',
    price: 1700,
  },
  {
    code: 'KL-04',
    name: 'Соты',
    nameItalic: false,
    shape: 'hex',
    colorA: '#6b8063',
    colorB: '#3f5e3a',
    size: 'Ø 16 см',
    height: 'h 15 см',
    material: 'PLA мат',
    price: 2200,
  },
  {
    code: 'KL-05',
    name: 'Кратер',
    nameItalic: true,
    shape: 'crater',
    colorA: '#faf7ef',
    colorB: '#c89a3a',
    size: 'Ø 20 см',
    height: 'h 18 см',
    material: 'PLA каменный',
    price: 3100,
  },
  {
    code: 'KL-06',
    name: 'Грани',
    nameItalic: false,
    shape: 'facets',
    colorA: '#1a2419',
    colorB: '#2d4a2b',
    size: 'Ø 15 см',
    height: 'h 16 см',
    material: 'PLA мат',
    price: 2000,
  },
];
