import axios from 'axios'

// TODO: set up config for stuff like CORS

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
});

const sendRequest = async (method, route, body) => {
    switch(method) {
        case 'get':
            return await getRequest(route)
        case 'post':
            return await postRequest(route, body)
        case 'put':
            return await putRequest(route, body)
        case 'delete':
            return await deleteRequest(route)
        default:
            console.log('Invalid HTTP method')
            throw new Error("Invalid HTTP method")
    }
}

const getRequest = async (route) => {
    return await axiosInstance.request({
        url: route,
        method: "get"
    })
}

const postRequest = async (route, body) => {
    return await axiosInstance.request({
        url: route,
        method: 'post',
        data: body
    })
}

const putRequest = async (route, body) => {
    return await axiosInstance.request({
        url: route,
        method: "put",
        body: JSON.stringify(body)
    })
}

const deleteRequest = async (route) => {
    return await axiosInstance.request({
        url: route,
        method: "delete"
    })
}

export default sendRequest 