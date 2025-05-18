export interface PostType {
    headline: string;
    description: string;
    imageUrl: string;
    date: string;
    customId: string;
    userEmail: string;
    id?: string;
}

export interface UserType {
    age: string;
    userName: string;
    email: string;
    password: string;
    confirmedPassword: string;
    imageUrl: string;
    location: string;
}

export interface updatedPostType { 
    headline: string;
    description: string;
    imageUrl: string;
}