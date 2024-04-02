export class UserRegister {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    constructor(userName: string, email: string, password: string, confirmPassword: string) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
