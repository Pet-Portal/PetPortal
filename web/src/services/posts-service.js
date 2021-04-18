import http from './base-api-service';

const list = (search) => http.get('/posts', { params: { search }});

const create = (post) => {
    const data = new FormData()

    Object.keys(post).forEach(key => {
        data.append(key, post[key])
    })
    return http.post('/posts', data);
}

const get = (id) => http.get(`/posts/${id}`)

const offer = (id, offer) => http.post(`/posts/${id}/offers`, offer)

const listOffersFromPost = (id) => http.get(`/posts/${id}/offers`)

const acceptOffer = (postId, offerId) => http.post(`/posts/${postId}/offers/${offerId}/accept`)

const remove = (id) => http.delete(`/posts/${id}`)

const listUserPosts = (id) => http.get(`/users/${id}/posts`);

const update = (post) => {
    const data = new FormData()

    Object.keys(post).forEach(key => {
        data.append(key, post[key])
    })

    return http.patch(`/posts/${post.id}`, data)
}

const createRating = (id, rating) => http.post(`/posts/${id}/ratings`, rating)

const service = {
    list,
    create,
    get,
    offer,
    listOffersFromPost,
    acceptOffer,
    remove,
    update,
    listUserPosts,
    createRating
}

export default service;