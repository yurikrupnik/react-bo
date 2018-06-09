
// import request from '../request';
import request from 'axios';
import { url } from './config';

const projectsApi = {
    read: (params, cb) => request.get('http://localhost:5000/api/projects', { params })
        .then((res) => {
            const { data } = res;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};

export default projectsApi;
