import { Photo } from "./photo"

export interface Member {
    id: number
    username: string
    photoUrl: string
    age: number
    height: number
    weight: number
    bmi: number
    knownAs: string
    created: Date
    lastActive: Date
    gender: string
    introduction: string
    workoutRoutine: string
    dietaryPlan: string
    exerciseRegimen: string
    state: string
    city: string
    country: string
    photos: Photo[]
}


