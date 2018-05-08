import { filter, reduce, clone } from 'lodash';
import { types } from './actions';

function pureDelete(collection, id) {
    const a = clone(collection);
    delete a[id];
    return a;
}

const initState = {
    loading: false,
    selected: {},
    data: { entities: {}, result: [] }
};

export default (state = initState, action) => {
    switch (action.type) {
    case types.READ_PROJECTS_SUCCESS:
        return Object.assign({}, state, {
            loading: !state.loading,
            data: reduce(action.payload, (acc, next) => {
                const id = next._id;
                acc.result.push(id);
                acc.entities[id] = next;
                return acc;
            }, { result: [], entities: {} })
        });
    case types.DELETE_PROJECTS_SUCCESS:
        return Object.assign({}, state, {
            loading: !state.loading,
            data: {
                result: filter(state.data.result, val => val !== action.payload.id),
                entities: pureDelete(state.data.entities, action.payload.id)
            }
        });
    case types.CREATE_PROJECTS_SUCCESS:
        return Object.assign({}, state, {
            loading: !state.loading,
            data: {
                result: state.data.result.concat(action.payload._id),
                entities: {
                    // ...state.data.entities,
                    [action.payload._id]: action.payload
                }
            }
        });
    case types.UPDATE_PROJECTS_SUCCESS:
        return Object.assign({}, state, {
            loading: !state.loading,
            data: {
                entities: Object.assign({}, state.data.entities, {
                    [action.payload._id]: action.payload
                }),
                result: state.data.result
            }
        });
    case types.READ_PROJECTS_PENDING:
    case types.READ_PROJECTS_FAIL:
    case types.DELETE_PROJECTS_FAIL:
    case types.DELETE_PROJECTS_PENDING:
    case types.CREATE_PROJECTS_PENDING:
    case types.CREATE_PROJECTS_FAIL:
    case types.UPDATE_PROJECTS_PENDING:
    case types.UPDATE_PROJECTS_FAIL:
        return Object.assign({}, state, { loading: !state.loading });
    default:
        return state;
    }
};
