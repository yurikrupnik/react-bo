import request from 'axios';
import { url } from './config';

const types = {
    READ_POSITIONS_SUCCESS: 'READ_POSITIONS_SUCCESS',
    READ_POSITIONS_PENDING: 'READ_POSITIONS_PENDING',
    READ_POSITIONS_FAIL: 'READ_POSITIONS_FAIL'
};

const readPending = payload => ({ type: types.READ_POSITIONS_PENDING, payload }); // req params
const readSuccess = payload => ({ type: types.READ_POSITIONS_SUCCESS, payload }); // res data
const read = params => (dispatch) => {
    dispatch(readPending(params));
    return request.get(`${'/api'}${url}`, { params })
        .then(res => dispatch(readSuccess(res.data)));
};

export {
    types,
    read,
    readPending,
    readSuccess,
};
