import { htmlPrefilter } from "jquery";

export function postData(url, data){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', url, true);
    httpRequest.setRequestHeader("Content-type","application/json");
    httpRequest.send(JSON.stringify(data));
    
    if (httpRequest.onreadystatechange) {
        var data = function () {
            var json = 0
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                json = httpRequest.responseText;
            }
            return json
        };
    }
    return data
}

export function getDataByAccount(url, account){
    url = url + "/" + account;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url, true);
    httpRequest.send();

    httpRequest.onreadystatechange = function () {
        console.log(httpRequest.readyState);
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json_string = httpRequest.responseText;//获取到json字符串，还需解析
            console.log(json_string);
        }
    };
}
