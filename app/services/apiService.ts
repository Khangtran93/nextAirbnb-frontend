import { getAccessToken } from "../lib/action";

const apiService = {
  get: async function (url:string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,  {
        method: 'GET',
        headers: {
          'Accept': 'Application/json',
          'Content-Type': 'Application/json'
        }
      })
      .then(response => response.json())
      .then((json) => {
        resolve(json)
    })
      .catch(error => reject(error))
    })
  },

  authorizedGet: async function (url: string): Promise<any> {
    console.log("authorizedGet")
    const token = await getAccessToken()
    console.log('token', token)
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: 'GET',
        headers: {
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error))
    })
  },

  post: async function(url:string, data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then((json) => {
      // it is crucial to resolve(json) instead of resolve(json.data)
      // because it is not guaranteed that the API response will have a data field.
      resolve(json)
    })
    .catch(error => reject(error))
    })
  },

  authorizedPost: async function(url:string, data:any): Promise<any> {
    const token = await getAccessToken()
    console.log("====token", token)
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
        method: 'POST',
        body: data,
        headers: {
          // 'Accept': 'application/json',
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then((json) => {
      // it is crucial to resolve(json) instead of resolve(json.data)
      // because it is not guaranteed that the API response will have a data field.
      resolve(json)
    })
    .catch(error => reject(error))
    })
  }
}

export default apiService