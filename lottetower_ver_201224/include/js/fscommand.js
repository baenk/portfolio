/******************************************
   name :  fscommand.js
   auth :  ELTOV
   date :  2020.11.25
   desc :  연동규격 EXE와 연동
*******************************************/


/*
setCallWebToApp STATUS,STATUS
*/


function setInitFsCommand(){

    window.addEventListener("message", function(evt) {
        console.log(evt.data); // { childData : 'test data' }
        if(evt.data.framezena == "POPUP_CLOSE"){
            $("#id_page_frame_other").fadeOut();
        }
    });

    if(window.chrome.webview){

        window.chrome.webview.addEventListener('message',arg => {

            var str_tmp = "";
            var arr_tmp;

            if("RESULT_TEMP" in arg.data){
                str_tmp = gl_user_conf.age + "|" + arg.data.RESULT_TEMP + "";
                gl_result_conf.temperature = arg.data.RESULT_TEMP + "";
                document["frame_temp"].setMainResult(str_tmp);
            }
        });
    }
}


function setCallWebToApp(p_cmd,p_val){
    var str_cmd = "";

    console.log("setCallWebToApp = " + p_cmd + " , " + p_val);

    if(window.chrome.webview){
        str_cmd = p_cmd + " ${" + p_val + "}";
        window.chrome.webview.postMessage(str_cmd);
    }
}


// GET 방식처리
function setSendSocketGET(p_fnc,p_url,p_opt){
    var xhr;
    var fnc;
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(p_opt.timeout > 0){
        xhr.timeout = p_opt.timeout;
    }

    fnc = p_fnc;

    xhr.onreadystatechange = function(){
        if (xhr.readyState != 4){
            return;
        }
        // 성공을 했다.
        if(xhr.status == 200){
            console.log("setSendSocketGET = " + xhr.status);
            // 받은 정보를 콜백하자.
            str_ret = xhr.responseText;
            str_ret = $.trim(str_ret);
            str_ret = str_ret.replace(/\n/g,"");
            fnc("SUCC",str_ret);
        }else{  // 실패를 했다.
            fnc("FAIL","");
        }
    }

    xhr.open("GET",p_url,true);
    xhr.send();
}

// POST 방식처리
function setSendSocketPOST(p_fnc,p_url,p_opt,p_form){
    var str_ret = "";
    var xhr;
    var fnc;
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(p_opt.timeout > 0){
        xhr.timeout = p_opt.timeout;
    }

    fnc = p_fnc;

    xhr.onreadystatechange = function(){
        if (xhr.readyState != 4){
            return;
        }
        // 성공을 했다.
        if(xhr.status == 200){
            console.log("setSendSocketPOST = " + xhr.status);
            // 받은 정보를 콜백하자.
            str_ret = xhr.responseText;
            str_ret = $.trim(str_ret);
            str_ret = str_ret.replace(/\n/g,"");
            fnc("SUCC",str_ret);
        }else{  // 실패를 했다.
            fnc("FAIL","");
        }
    }

    xhr.open("POST",p_url,true);
    xhr.send(p_form);

}

// 결과를 받는다.
function onReadSockContents(){
    var str_ret = "";
    //console.log("gl_http = " + gl_http.status);
    if (gl_http.readyState != 4){
        return;
    }
    // 성공을 했다.
    if(gl_http.status == 200){
        console.log("onReadSockContents = " + gl_http.status);
        // 받은 정보를 콜백하자.
        str_ret = gl_http.responseText;
        str_ret = $.trim(str_ret);
        str_ret = str_ret.replace(/\n/g,"");
        gl_fnc("SUCC",str_ret);
        //  gl_http.responseText;
    }else{  // 실패를 했다.
        gl_fnc("FAIL","");
    }
}

function setLoadStatics(p_obj){

    var str_url = gl_conf_header.URL_REPORT + "?kiosk_id=" + gl_conf_header.KIOSK_ID + "&kiosk_code=" + gl_conf_header.KIOSK_CODE;

    str_url += "&main_code=" + p_obj.main_code;
    str_url += "&menu_code=" + p_obj.menu_code;
    str_url += "&store_id=" + p_obj.store_id;
    str_url += "&event_id=" + p_obj.event_id;

}