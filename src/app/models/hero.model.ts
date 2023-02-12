export interface HeroModel {
    id: number;
    name: string;
    publisher?: string;
    genre?: 'male' | 'female' | 'other';
}
