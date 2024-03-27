// corresponds to User in backend

// NOTE: UserCredentials is used in login, but this model is used in the oter UserController endpoints
export class User {
    id: number; // id is NEVER set, it is created in backend
    username: string;
    password: string; 
    email: string; 
    online: number; // 0 for now
    /*
    language: string; // TBD
    city: string; // TBD
    state: string; // TBD
    country: string; // TBD
    personality: number; // TBD
    created: Date; // created in backend
    updated: Date; // created in backend
    */
    constructor(id: number, username: string, password: string, email: string, online: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.online = online;
    }
}
