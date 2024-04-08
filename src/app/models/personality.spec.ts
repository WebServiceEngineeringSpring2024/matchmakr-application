import {Personality} from "./personality";

describe('Personality', () => {
  it('should create an instance', () => {
    expect(new Personality(0, 0, 0, 0, new Date(), new Date())).toBeTruthy();
  });
});
