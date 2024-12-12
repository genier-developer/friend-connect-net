import axios from 'axios'
import { ResultCode } from 'api/profileApi'

export const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': '33748f50-4732-4375-bd5e-491763a6867d' },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


export type BaseResponse<T = {}, R = ResultCode> = {
    data: T
    messages: string[]
    resultCode: R
}