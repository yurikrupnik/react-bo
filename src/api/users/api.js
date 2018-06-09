// import request from '../request';
import request from 'axios';
import { url } from './config';

const usersApi = {
    read: (params, cb) => request.get('http://localhost:5000/api/users', { params })
        .then((res) => {
            const { data } = res;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};

export default usersApi;
