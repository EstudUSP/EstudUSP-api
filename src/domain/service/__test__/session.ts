import 'reflect-metadata';

import User from '../../entity/user';
import SessionService from '../session';

describe('SessionService', () => {
  let sessionService: SessionService;

  beforeEach(() => {
    sessionService = new SessionService();
  });

  test('set should add a session with a valid key', () => {
    const key = 'valid-key';
    const session = {} as User;

    sessionService.set(key, session);

    expect(sessionService.get(key)).toBe(session);
  });

  test('delete should remove a session', () => {
    const key = 'valid-key';
    const session = {} as User;

    sessionService.set(key, session);
    sessionService.delete(key);

    expect(sessionService.get(key)).toBeUndefined();
  });

  test('getAll should return all sessions', () => {
    const session1 = {} as User;
    const session2 = {} as User;

    sessionService.set('key1', session1);
    sessionService.set('key2', session2);

    const allSessions = sessionService.getAll();

    expect(allSessions).toEqual({ 'key1': session1, 'key2': session2 });
  });
});
