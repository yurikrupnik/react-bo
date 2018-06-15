import request from 'axios';
import { host } from '../config';

export default request.create({ baseURL: module.hot ? 'http://localhost:5001/api' : 'http://localhost:5000/api' });
