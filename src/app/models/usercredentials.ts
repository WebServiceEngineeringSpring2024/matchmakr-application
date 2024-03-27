// Corresponds to UserCredentials in backend
export class Usercredentials {
    email: string;
    password: string;
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
