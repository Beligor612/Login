const lsTokenKey = 'my_app_token'

function setToken(req) {
    const inAuthUrl = req.url.includes('auth');

    if (!inAuthUrl) {
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-access-token'] = token;
    }
    return req
}

function setTokenOnLogin(res) {
    const isLoginUrl = res.config.url.includes('login');
    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token)
    }

    return res
}

function onError(err) {
    return Promise.reject(err)
}


function getClearResponse(res) {
    return res.data;
}

export default function (axios) {
    axios.interceptors.request.use(setToken)
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getClearResponse, onError);

}