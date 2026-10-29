import { validateEnv } from './env';

describe('validateEnv', () => {
  it('throws when DATABASE_URL is missing', () => {
    expect(() => validateEnv({ REDIS_URL: 'redis://localhost:6379' })).toThrow(
      /DATABASE_URL/,
    );
  });

  it('accepts a valid config', () => {
    const env = validateEnv({
      DATABASE_URL: 'postgresql://u:p@localhost:5432/db',
      REDIS_URL: 'redis://localhost:6379',
    });
    expect(env.PORT).toBe(3001);
  });
});
