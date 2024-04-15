import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(0, "", "", "", true, 0)).toBeTruthy();
  });
});
