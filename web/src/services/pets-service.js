import http from './base-api-service';

const list = (userId) => http.get(`/users/${userId}/pets`)

const get = (id) => http.get(`/pets/${id}`)

const create = (pet) => {
  const data = new FormData()

  Object.keys(pet).forEach(key => {
    data.append(key, pet[key])
  })

  return http.post(`/pets`, data)
}

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