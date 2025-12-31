import { FallbackValuePipe } from './fallback-value-pipe';

describe('FallbackValuePipe', () => {
  it('create an instance', () => {
    const pipe = new FallbackValuePipe();
    expect(pipe).toBeTruthy();
  });
});
