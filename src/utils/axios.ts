import axios from 'axios';

const REQUEST_TIMEOUT = 10000;
const BASEURL = process.env.NODE_ENV === 'development' ? 'http://dapi.....' : 'https://api...'

export const HTTP = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
    timeout: REQUEST_TIMEOUT,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

HTTP.interceptors.request.use((config) => {
    // 请求拦截，可在此设置请求头，cookies
    return config;
})

HTTP.interceptors.response.use((res) => {
    // 响应拦截，可在此做登录判断
    return res
}, (err) => {
    return Promise.reject(err)
})

function handleParams(url: string, rawData: any, rawMethod: string, header?:any) {
    const data = rawData;
    const method = rawMethod.toUpperCase()

    return Promise.resolve({
        url,
        method,
        data,
        header
    })
}

// @ts-ignore
function handleFail({error, reject}) {
    if (error.message.indexOf(REQUEST_TIMEOUT + 'ms') >= 0) {
        throw Error('请求超时')
    }
    const { response } = error;
    if (response) {
        switch (response.status) {
            case 401:
                // do something ...
                break
            case 403:
                // do something ...
                break
            case 500:
                // do something ...
                break
            default:
                break
        }
    } else {
        throw Error(error.message)
    }
    reject(error)
}

export const fetch = (api: string, rawData?: any = {}, method?: string = 'POST', headers?: any = {}) => {
    return handleParams(api, rawData, method, headers).then(options => {
        return new Promise((resolve, reject) => {
            const changedHead = Object.assign({}, headers)
            HTTP({
                withCredentials: true,
                url: options.url,
                method: options.method,
                headers: changedHead,
                ...options.data
            })
                .then(resp => {
                    const res = resp.data;
                    resolve(res)
                }, error => {
                    handleFail({
                        error,
                        reject
                    })
                })
        })
    })
}


