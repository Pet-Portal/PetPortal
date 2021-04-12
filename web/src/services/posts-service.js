import http from './base-api-service';

const list = () => http.get('/posts');

const service = {
    list
}

export default service;