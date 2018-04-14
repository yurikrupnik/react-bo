// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import { setSession, SET_SESSION } from './actions';

const { describe, it, expect } = global;

describe('session actions', () => {
    it('should set session', () => {
        const session = 'ry';
        const expected = {
            type: SET_SESSION,
            payload: session
        };
        expect(setSession(session)).toEqual(expected);
    });
});
