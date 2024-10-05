import request from '@/utils/request'

export const userLoginService = (username, password) =>
  request.post('/login', { username, password })

export const getEmailCodeService = (email) => request.get(`/getEmailCode?email=${email}`)

export const userRegisterService = (username, password, email, emailCode, lastEmailCode) =>
  request.post('/register', { username, password, email, emailCode, lastEmailCode })

export const getUserInfoService = () => request.get('/getUserInfo')

export const updateUserInfoService = (phone, address) =>
  request.post('/updateUserInfo', { phone, address })

export const getEmailCodeInForgetPasswordService = (email) =>
  request.get(`/getEmailCodeInForgetPassword?email=${email}`)

export const modifyPasswordService = (email, password, newEmailCode, lastEmailCode) =>
  request.post('/updatePassword', { email, password, newEmailCode, lastEmailCode })
