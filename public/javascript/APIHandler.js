class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList() {
    return axios.get(`${this.BASE_URL}/characters`).then((results) => results.data);;
  }

  getOneRegister(id) {
    return axios.get(`${this.BASE_URL}/characters/${id}`).then((results) => results.data);
  }

  createOneRegister(characterInfo) {
    return axios.post(`${this.BASE_URL}/characters`, characterInfo);
  }

  updateOneRegister(id, characterInfo) {
    return axios.put(`${this.BASE_URL}/characters/${id}`, characterInfo).then((results) => results.data);
  }

  deleteOneRegister(id) {
    return axios.delete(`${this.BASE_URL}/characters/${id}`)
  }
}
