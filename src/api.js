import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const createInvestee = payload => api.post(`/investees`, payload)
export const getInvesteeByAccount = account => api.get(`/investees/${account}`)
export const getInvesteeByICO = ICO => api.get(`/investees/ICO/${ICO}`)
export const getAllInvestees = () => api.get(`/investees`)
export const updateInvesteeProgressByAccount = (account,payload)=>api.put(`/investees/${account}`, payload)

const apis = {
    createInvestee,
    getInvesteeByAccount,
    getInvesteeByICO,
    getAllInvestees,
    updateInvesteeProgressByAccount,
}

export default apis