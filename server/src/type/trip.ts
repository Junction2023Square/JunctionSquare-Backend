export const tripStatusList = ['RESERVED, PROGRESS, DONE'] as const;

export type TripStatusType = (typeof tripStatusList)[number];
