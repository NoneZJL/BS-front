import request from '@/utils/request'

export const getAllHistoryService = () => request.get('/getAllHistory')

export const queryGoodService = (goodName) => request.get(`/queryGood?name=${goodName}`)

export const deleteSingleHistoryByNameService = (goodName) =>
  request.get(`/deleteSingleHistory?name=${goodName}`)

export const deleteAllHistoryService = () => request.get('/deleteAllHistory')

export const queryDeatilGoodService = (from, url) => request.post('/getDetail', { from, url })
