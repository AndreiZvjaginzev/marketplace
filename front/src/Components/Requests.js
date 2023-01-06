import axios from 'axios';

let config = {
    protocol: 'http://',
    domen: '127.0.0.1:8000',
    path: '/api/v1',
}

/*
    let request = {
        method: 'get|post',
        url: url,
        data: data,
        callback: f()
    }
*/
function Requests(request, loadstate){
    switch(request.method){
        case 'get': getRequest(request); break;
        case 'post': postRequest(request); break;
        case 'postfile': postRequestFIle(request); break;
        default: console.log("Error request"); break;
    }
}

function getRequest(request){
    axios({
        method: 'get',
        url: `${config.protocol}${config.domen}${config.path}${request.url}`,
        responseType: 'json'
    })
    .then(function (response) {
        request.callback(response.data);
    })
    .catch(function (error) {
        request.callback(error);
    })

}

function postRequest(request, loadstate){
    axios({
        method: 'post',
        url: `${config.protocol}${config.domen}${config.path}${request.url}`,
        data: request.data,
        responseType: 'json'
    })
    .then(function (response) {
        request.callback(response.data);
    })
    .catch(function (error) {
        request.callback(error);
    })
}

function postRequestFIle(request){
    axios({
        method: 'post',
        url: `${config.protocol}${config.domen}${config.path}${request.url}`,
        data: request.data,
        responseType: 'json',
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
    .then(function (response) {
        request.callback(response.data);
    })
    .catch(function (error) {
        request.callback(error);
    })
}


export default Requests;