import { types } from './actions';

const initState = {
    currencies: null,
    loading: false
};

export default (state = initState, action) => {
    switch (action.type) {
    case types.READ_CURRENCIES_SUCCESS:
        return Object.assign({}, state, {
            loading: !state.loading,
            currencies: action.payload
        });
    case types.READ_CURRENCIES_PENDING:
    case types.READ_CURRENCIES_FAIL:
        return Object.assign({}, state, { loading: !state.loading });
    default:
        return state;
    }
};
