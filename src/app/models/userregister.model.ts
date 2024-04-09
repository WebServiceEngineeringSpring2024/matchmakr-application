export class UserRegister {
  email: string;
  userName: string
  password: string;
  confirmPassword: string

  constructor(email: string, userName: string, password: string, confirmPassword: string) {
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.confirmPassword = confirmPassword;
  }
}
