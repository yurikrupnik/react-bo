import request from '../request';
import { url, Provider } from './config';

const projectsApi = {
    fetch: (params, cb) => request.get(url, { params })
        .then((res) => {
            const { data } = res;
            // res.providerName = Provider;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};

export default projectsApi;
