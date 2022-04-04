import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const createInvestee = payload => api.post(`/investees`, payload)
export const getInvesteeByAccount = account => api.get(`/investees/${account}`)
export const getAllInvestees = () => api.get(`/investees`)

const apis = {
    createInvestee,
    getInvesteeByAccount,
    getAllInvestees,
}

export default apis