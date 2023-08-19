export interface DriverType {
    id: string;
    name: string;
    averageRating: number;
    drives: number;
    region: string;
    carSize: CarSizeType;
    description: string;
    profileImg: string;
}

export const carSizeList = ['SMALL', 'MEDIUM', 'LARGE'] as const;

export type CarSizeType = (typeof carSizeList)[number];
