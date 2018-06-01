import request from 'axios';
import { url } from './config';

const types = {
    READ_FU_SUCCESS: 'READ_FU_SUCCESS',
    READ_FU_PENDING: 'READ_FU_PENDING',
    READ_FU_FAIL: 'READ_FU_FAIL'
};

const readPending = payload => ({ type: types.READ_FU_PENDING, payload }); // req params
const readSuccess = payload => ({ type: types.READ_FU_SUCCESS, payload }); // res data
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
