import request from 'axios';
import { host } from '../config';

export default request.create({ baseURL: module.hot ? 'http://localhost:5001' : 'http://localhost:5000' });
