import axios from "axios";

const create = () => {

  const api = axios.create({
    baseURL: 'https://ig-messenger.herokuapp.com',
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const getThreads = () => api.get('direct-inbox')

  // const getMessages = (threadId, payload) => api.get(`directInbox/${threadId}`, payload)

  const sendMessage = (threadId, payload) => api.post(`direct-inbox/${threadId}`, {text: payload})

  return {
    sendMessage,
    getThreads
  }
}

export default {
  create
}
