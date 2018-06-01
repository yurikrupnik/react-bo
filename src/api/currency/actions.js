import request from 'axios';
import { url } from './config';

const types = {
    READ_RATE_SUCCESS: 'READ_RATE_SUCCESS',
    READ_RATE_PENDING: 'READ_RATE_PENDING',
    READ_RATE_FAIL: 'READ_RATE_FAIL'
};

const readPending = payload => ({ type: types.READ_RATE_PENDING, payload }); // req params
const readSuccess = payload => ({ type: types.READ_RATE_SUCCESS, payload }); // res data
const read = params => (dispatch) => {
    dispatch(readPending(params));
    console.log('params', params);
    return request.get(`${'/api'}${url}`, { params })
        .then(res => dispatch(readSuccess(res.data)));
};

export {
    types,
    read,
    readPending,
    readSuccess,
};
