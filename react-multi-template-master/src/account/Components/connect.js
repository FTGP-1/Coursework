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