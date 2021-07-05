export interface User {
    id: string,
    name: string
    google_sign: boolean
    profile_picture?: string
    last_login: Date
}