import { UserRegister } from './userregister';

describe('UserRegister', () => {
  it('should create an instance', () => {
    expect(new UserRegister('','','','')).toBeTruthy();
  });
});
