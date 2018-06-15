import request from '../request';
import { url, Provider } from './config';

const usersApi = {
    fetch: (params, cb) => request.get(url, { params })
        .then((res) => {
            if (global.window) {
                console.log('client');
            }
            const { data } = res;
            // res.providerName = Provider;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};

export default usersApi;
