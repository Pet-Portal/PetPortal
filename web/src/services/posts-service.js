import http from './base-api-service';

const list = () => http.get('/posts');

const create = (post) => http.post('/posts', post);

const get = (id) => http.get(`/posts/${id}`)

const offer = (id, offer) => http.post(`/posts/${id}/offers`, offer)

const service = {
    list,
    create,
    get,
    offer
}

export default service;