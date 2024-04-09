// corresponds to User in backend

// NOTE: UserCredentials is used in login, but this model is used in the oter UserController endpoints
export class User {
  id: number; // id is NEVER set, it is created in backend
  userName: string;
  password: string;
  email: string;
  online: number; // 0 or 1, 1 = online
  /*
  language: string; // TBD
  city: string; // TBD
  state: string; // TBD
  country: string; // TBD */
  personality: number; // personalityID
  /*
  created: Date; // created in backend
  updated: Date; // created in backend
  */
  constructor(id: number, userName: string, password: string, email: string, online: number, personality: number) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.online = online;
    this.personality = personality;
  }
}
