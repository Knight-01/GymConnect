export interface User {
    username: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    dateOfBirth: Date;
    gender: string;
    height: number;
    weight: number;
    city: string;
    country: string;
    roles: string[];
}
