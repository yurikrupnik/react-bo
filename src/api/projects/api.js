import request from '../request';
import { url } from './config';

const projectsApi = {
    fetch: (params, cb) => request.get(url, { params })
        .then((res) => {
            const { data } = res;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};

export default projectsApi;
