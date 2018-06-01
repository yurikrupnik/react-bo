import { types } from './actions';

const initState = {
    loading: false,
    // selected: {},
    data: []
};

export default (state = initState, action) => {
    switch (action.type) {
    case types.READ_POSITIONS_SUCCESS:
        return Object.assign({}, state, {
            loading: !state.loading,
            data: action.payload
        });
    case types.READ_POSITIONS_PENDING:
    case types.READ_POSITIONS_FAIL:
        return Object.assign({}, state, { loading: !state.loading });
    default:
        return state;
    }
};
export { initState };
