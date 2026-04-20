export type PlantCategory = 'easy' | 'rare' | 'light';

export interface Plant {
  name: string;
  latin: string;
  price: number;
  category: PlantCategory;
  tag: string;
  light: string;
  water: string;
  level: string;
  leafColor: string;
  spotColor: string | null;
  stripes?: boolean;
  vertical?: boolean;
  fern?: boolean;
  veins?: boolean;
  small?: boolean;
}

export const plants: Plant[] = [
  {
    name: 'Монстера Тайская',
    latin: 'Monstera Thai Constellation',
    price: 8400,
    category: 'rare',
    tag: 'редкий сорт',
    light: 'яркий рассеянный',
    water: 'раз в неделю',
    level: 'средний',
    leafColor: '#4e6847',
    spotColor: '#f3efe5',
  },
  {
    name: 'Фикус Лирата',
    latin: 'Ficus Lyrata',
    price: 4200,
    category: 'easy',
    tag: 'для новичков',
    light: 'светло',
    water: 'раз в 10 дней',
    level: 'лёгкий',
    leafColor: '#3f5e3a',
    spotColor: null,
  },
  {
    name: 'Калатея Орбифолия',
    latin: 'Calathea Orbifolia',
    price: 2800,
    category: 'light',
    tag: 'любит тень',
    light: 'полутень',
    water: 'раз в 5 дней',
    level: 'капризный',
    leafColor: '#5c7a54',
    spotColor: '#e8e1ce',
    stripes: true,
  },
  {
    name: 'Сансевиерия',
    latin: 'Sansevieria Trifasciata',
    price: 1900,
    category: 'easy',
    tag: 'для новичков',
    light: 'любой',
    water: 'раз в 2 недели',
    level: 'очень лёгкий',
    leafColor: '#2d4a2b',
    spotColor: '#c89a3a',
    vertical: true,
  },
  {
    name: 'Филодендрон Пинк',
    latin: 'Philodendron Pink Princess',
    price: 12500,
    category: 'rare',
    tag: 'редкий сорт',
    light: 'яркий рассеянный',
    water: 'раз в неделю',
    level: 'средний',
    leafColor: '#3f5e3a',
    spotColor: '#b8542e',
  },
  {
    name: 'Папоротник',
    latin: 'Asplenium Nidus',
    price: 2400,
    category: 'light',
    tag: 'любит тень',
    light: 'полутень',
    water: 'часто',
    level: 'средний',
    leafColor: '#6b8063',
    spotColor: null,
    fern: true,
  },
  {
    name: 'Алокасия Полли',
    latin: 'Alocasia Polly',
    price: 3600,
    category: 'rare',
    tag: 'эффектный',
    light: 'яркий рассеянный',
    water: 'раз в 4 дня',
    level: 'капризный',
    leafColor: '#2d4a2b',
    spotColor: '#e8e1ce',
    veins: true,
  },
  {
    name: 'Замиокулькас',
    latin: 'Zamioculcas Zamiifolia',
    price: 2100,
    category: 'easy',
    tag: 'для новичков',
    light: 'любой',
    water: 'раз в 3 недели',
    level: 'очень лёгкий',
    leafColor: '#3f5e3a',
    spotColor: null,
    small: true,
  },
];
