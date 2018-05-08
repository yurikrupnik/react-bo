import request from 'axios';
import { selector, url } from './config';


const get = () => {
    return request.get(url).then();
}

export {};
