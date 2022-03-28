var url = "http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x146298d53f1572390a5e7fcf35b314c675b71779&startblock=0&endblock=99999999&sort=asc&apikey=CAE3M7SNGI1WGD6ZYBZGRKXVABSUDQTCKA";
var request = new XMLHttpRequest();
request.open("get",url);
request.send(null);
request.onload = function(){
    if(request.status == 200){
        var json = JSON.parse(request.responseText);
        for(var i=0;i<json.length;i++)
            console.log(json[i].to)
    }
    console.log(json);
}