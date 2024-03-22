import { Usercredentials } from './usercredentials';

describe('Usercredentials', () => {
  it('should create an instance', () => {
    expect(new Usercredentials("", "")).toBeTruthy();
  });
});
