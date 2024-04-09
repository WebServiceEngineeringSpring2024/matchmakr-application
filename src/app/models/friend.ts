// corresponds to UserFriend in backend
export class UserFriend {
    user: number;
    friend: number;
    accepted: number;

    constructor(user: number, friend: number, accepted: number) {
      this.user = user;
      this.friend = friend;
      this.accepted = accepted;

    }
}
