import request from 'axios';
import { url } from './config';

const types = {
    READ_PROJECTS_SUCCESS: 'READ_PROJECTS_SUCCESS',
    READ_PROJECTS_PENDING: 'READ_PROJECTS_PENDING',
    READ_PROJECTS_FAIL: 'READ_PROJECTS_FAIL',

    DELETE_PROJECTS_SUCCESS: 'DELETE_PROJECTS_SUCCESS',
    DELETE_PROJECTS_PENDING: 'DELETE_PROJECTS_PENDING',
    DELETE_PROJECTS_FAIL: 'DELETE_PROJECTS_FAIL',

    CREATE_PROJECTS_SUCCESS: 'CREATE_PROJECTS_SUCCESS',
    CREATE_PROJECTS_PENDING: 'CREATE_PROJECTS_PENDING',
    CREATE_PROJECTS_FAIL: 'CREATE_PROJECTS_FAIL',

    UPDATE_PROJECTS_SUCCESS: 'UPDATE_PROJECTS_SUCCESS',
    UPDATE_PROJECTS_PENDING: 'UPDATE_PROJECTS_PENDING',
    UPDATE_PROJECTS_FAIL: 'UPDATE_PROJECTS_FAIL',
};

const readPending = payload => ({ type: types.READ_PROJECTS_PENDING, payload }); // req params
const readSuccess = payload => ({ type: types.READ_PROJECTS_SUCCESS, payload }); // res data
const read = params => (dispatch) => {
    dispatch(readPending(params));
    return request.get(`${'/api'}${url}`, { params })
        .then(res => dispatch(readSuccess(res.data)));
};

const deletePending = payload => ({ type: types.DELETE_PROJECTS_PENDING, payload }); // id
const deleteSuccess = payload => ({ type: types.DELETE_PROJECTS_SUCCESS, payload }); // id
const remove = id => (dispatch) => {
    dispatch(deletePending(id));
    return request.delete(`${url}/${id}`)
        .then(res => dispatch(deleteSuccess(res.data)));
};

const createPending = payload => ({ type: types.CREATE_PROJECTS_PENDING, payload });
const createSuccess = payload => ({ type: types.CREATE_PROJECTS_SUCCESS, payload });
const create = body => (dispatch) => {
    dispatch(createPending(body));
    return request.post(url, body)
        .then(res => dispatch(createSuccess(res.data)));
};

const updatePending = payload => ({ type: types.UPDATE_PROJECTS_PENDING, payload });
const updateSuccess = payload => ({ type: types.UPDATE_PROJECTS_SUCCESS, payload });
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
