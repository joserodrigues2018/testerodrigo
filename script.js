const KEY_API_LIB="563492ad6f917000010000015e60d627929547e98a756ad8b0ac5ac0";
const BASE_URL="https://api.pexels.com/v1/";

//document.getElementById('url').value= BASE_URL;

var url_proxima_page = "";
var page = 0;

document.getElementById("pagina").value = page;

function fazerRequisicao(){

    var pSearch = document.getElementById('categorias').value;

    var url = BASE_URL+'search/?query='+pSearch;

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", url, true);

    xhttp.setRequestHeader("Authorization",KEY_API_LIB);          

    xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {//Verifica se o retorno do servidor deu certo
            var obj = JSON.parse(xhttp.responseText);
           tratarResult(obj);
        }
    }
    
    xhttp.send();
}
function tratarResult(objResult) {
    var out = "";
    Object.getOwnPropertyNames(objResult).forEach(
        function (val,idx,array){           
            if(val == "photos"){ //todas as fotos por categoria
                for(var i in objResult.photos){    
                    for(var j in objResult.photos[i].src){
                        if(j == "medium" ||j == "small" ||  j == "tiny"){
                            out += '<img src=' + objResult.photos[i].src[j] + '>';
                        }
                    }
                    out +='<br><br>';
                }
            }else{
                
                if(val="next_page"){
                    url_proxima_page = objResult[val];
                }
                if(val="page"){
                    page = objResult[val];
                    document.getElementById("pagina").value = page;
                }
            }
        }
    );
    document.getElementById("resposta").innerHTML = out;
}

function proxima_pagina()
{
    var url = url_proxima_page;

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", url, true);

    xhttp.setRequestHeader("Authorization",KEY_API_LIB);          

    xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {//Verifica se o retorno do servidor deu certo
            var obj = JSON.parse(xhttp.responseText);
            tratarResult(obj);
        }
    }
    
    xhttp.send();
}