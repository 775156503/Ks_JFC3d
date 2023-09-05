import axios from 'axios'

const request = axios.create({
  baseURL:'http://153.101.160.58:9023',
  timeout:60*60*1000
})
request.interceptors.request.use(config=>{
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  return config
},error=>{
  return Promise.reject(error)
})
export default request

