
import { types } from './actions';

const initState = {
    loading: false,
    data: { entities: {}, result: [] }
};

export default (state = initState, action) => {
    switch (action.type) {
    case types.READ_FU_SUCCESS:
        return Object.assign({}, state, {
            loading: !state.loading,
            data: action.payload.reduce((acc, next) => {
                const { id } = next;
                acc.result.push(id);
                acc.entities[id] = next;
                return acc;
            }, { result: [], entities: {} })
        });
    case types.READ_FU_PENDING:
    case types.READ_FU_FAIL:
        return Object.assign({}, state, { loading: !state.loading });
    default:
        return state;
    }
};
export { initState };
