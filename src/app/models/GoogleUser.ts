export interface FirebaseEntity {
    identity: any;
    sign_in_provider: string
}

export interface GoogleUser {
    aud: string
    auth_time: Date
    email: string
    email_verified: boolean
    exp: Date
    firebase: FirebaseEntity
    iat: Date
    iss: string
    name: string
    picture: string
    sub: string
    user_id: string
}