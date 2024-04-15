// corresponds to the UserFriendView interface placed in the UserFriend.java class definition.
// UserFriendView is the type returned from getFriends and getFriendRequest operations.
export class Friendview {
    username: string;
    online: boolean;
    id: number;
    constructor(u: string, o: boolean, id: number) {
        this.username = u;
        this.online = o;
        this.id = id;
    }
}
