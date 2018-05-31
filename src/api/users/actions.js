import request from 'axios';
import { url } from './config';

const types = {
    READ_USERS_SUCCESS: 'READ_USERS_SUCCESS',
    READ_USERS_PENDING: 'READ_USERS_PENDING',
    READ_USERS_FAIL: 'READ_USERS_FAIL',

    DELETE_USERS_SUCCESS: 'DELETE_USERS_SUCCESS',
    DELETE_USERS_PENDING: 'DELETE_USERS_PENDING',
    DELETE_USERS_FAIL: 'DELETE_USERS_FAIL',

    CREATE_USERS_SUCCESS: 'CREATE_USERS_SUCCESS',
    CREATE_USERS_PENDING: 'CREATE_USERS_PENDING',
    CREATE_USERS_FAIL: 'CREATE_USERS_FAIL',

    UPDATE_USERS_SUCCESS: 'UPDATE_USERS_SUCCESS',
    UPDATE_USERS_PENDING: 'UPDATE_USERS_PENDING',
    UPDATE_USERS_FAIL: 'UPDATE_USERS_FAIL',
};

const readPending = payload => ({ type: types.READ_USERS_PENDING, payload }); // req params
const readSuccess = payload => ({ type: types.READ_USERS_SUCCESS, payload }); // res data
const read = params => (dispatch) => {
    dispatch(readPending(params));
    return request.get(`${'/api'}${url}`, { params })
        .then(res => dispatch(readSuccess(res.data)));
};

const deletePending = payload => ({ type: types.DELETE_USERS_PENDING, payload }); // id
const deleteSuccess = payload => ({ type: types.DELETE_USERS_SUCCESS, payload }); // id
const remove = id => (dispatch) => {
    dispatch(deletePending(id));
    return request.delete(`${url}/${id}`)
        .then(res => dispatch(deleteSuccess(res.data)));
};

const createPending = payload => ({ type: types.CREATE_USERS_PENDING, payload });
const createSuccess = payload => ({ type: types.CREATE_USERS_SUCCESS, payload });
const create = body => (dispatch) => {
    dispatch(createPending(body));
    return request.post(url, body)
        .then(res => dispatch(createSuccess(res.data)));
};

const updatePending = payload => ({ type: types.UPDATE_USERS_PENDING, payload });
const updateSuccess = payload => ({ type: types.UPDATE_USERS_SUCCESS, payload });
const update = body => (dispatch) => {
    dispatch(updatePending(body));
    return request.post(url, body)
        .then(res => dispatch(updateSuccess(res.data)));
};

export {
    types,
    read,
    readPending,
    readSuccess,
    remove,
    deletePending,
    deleteSuccess,
    create,
    createPending,
    createSuccess,
    update,
    updatePending,
    updateSuccess
};
