import request from '@/utils/request'

export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/login', { username, password, repassword })

export const helloService = () => request.get('/hello')
