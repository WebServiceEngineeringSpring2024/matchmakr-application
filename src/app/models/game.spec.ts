import { Game } from './game';

describe('Game', () => {
  it('should create an instance', () => {
    expect(new Game(0, '', 0, '')).toBeTruthy();
  });
});
