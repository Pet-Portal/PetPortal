import http from './base-api-service';

const list = (userId) => http.get(`/users/${userId}/pets`)

const get = (id) => http.get(`/pets/${id}`)

const create = (pet) => http.post(`/pets`, pet)

const remove = (id) => http.delete(`/pets/${id}`)

const update = (pet) => http.put(`/pets/${pet.id}`, pet)

const service = {
  create,
  update,
  remove,
  list,
  get
}

export default service;