import reducer from './reducer';
import { SET_SESSION } from './actions';

const { describe, it, expect } = global;
describe('session reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual('');
    });

    it('should set', () => {
        expect(reducer(undefined, {
            type: SET_SESSION,
            payload: 'aris'
        })).toEqual('aris');
    });
});
