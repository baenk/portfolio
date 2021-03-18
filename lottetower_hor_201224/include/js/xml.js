/******************************************
   name :  xml.js
   auth :  ELTOV
   date :  2020.11.08
   desc :  xml파싱처리
*******************************************/


//////////////////////////////////////////////////////////////
// 리턴할 페이지 불러오기
function setLoadContents(p_url){
    var xhr;
    var str_ret = "";
    var http;

    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function(){
        if (xhr.readyState != 4){
            return;
        }

        // 성공을 했다.
        if(xhr.status == 200){
            console.log("onReadSockContents = " + xhr.status);
            var xml_doc = xhr.responseXML;
            onReadXmlContents(xml_doc);
        }else{

        }
    }

    xhr.open("GET",p_url,true);
    xhr.send();
}


function onReadXmlContents(xml_doc){
    var ret_code = "FAIL";

    var root_node = xml_doc.getElementsByTagName("KIOSK")[0];
    if(!root_node){
        return;
    }

    var i = 0;
    var str_tmp = "";
    var child1 = root_node.firstChild;
    var child2;
    var child3;

    try{

        while(child1 != null && child1.nodeType != 4){

            if(child1.nodeType == 1){
                if(child1.nodeName == "HEADER"){

                    if(typeof gl_conf_header !== 'undefined'){

                        child2 = child1.firstChild;

                        while(child2 != null && child2.nodeType != 4){

                            if(child2.nodeName == "RET_CODE") gl_conf_header.RET_CODE = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "KIOSK_ID") gl_conf_header.KIOSK_ID = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "KIOSK_CODE") gl_conf_header.KIOSK_CODE = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "KIOSK_SECT") gl_conf_header.KIOSK_SECT = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "KIOSK_TYPE") gl_conf_header.KIOSK_TYPE = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "URL_REPORT") gl_conf_header.URL_REPORT = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "URL_STATUS") gl_conf_header.URL_STATUS = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "URL_PARK") gl_conf_header.URL_PARK = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "URL_WEATHER") gl_conf_header.URL_WEATHER = getCvtXmlTag(child2.childNodes[0].nodeValue);
                            if(child2.nodeName == "KIOSK_FLOOR"){
                                gl_conf_header.KIOSK_FLOOR = getCvtXmlTag(child2.childNodes[0].nodeValue);
                                gl_conf_header.POS_X = getCvtXmlTag(child2.getAttribute("pos_x"));
                                gl_conf_header.POS_Y = getCvtXmlTag(child2.getAttribute("pos_y"));
                            }
                            child2 = child2.nextSibling;
                        }

                        gl_conf_header.RET_CODE = getCvtXmlTag(gl_conf_header.RET_CODE);
                        gl_conf_header.KIOSK_ID = getCvtXmlTag(gl_conf_header.KIOSK_ID);
                        gl_conf_header.KIOSK_CODE = getCvtXmlTag(gl_conf_header.KIOSK_CODE);
                        gl_conf_header.KIOSK_SECT = getCvtXmlTag(gl_conf_header.KIOSK_SECT);
                        gl_conf_header.KIOSK_TYPE = getCvtXmlTag(gl_conf_header.KIOSK_TYPE);
                        gl_conf_header.KIOSK_FLOOR = getCvtXmlTag(gl_conf_header.KIOSK_FLOOR);
                        gl_conf_header.POS_X = getCvtXmlTag(gl_conf_header.POS_X);
                        gl_conf_header.POS_Y = getCvtXmlTag(gl_conf_header.POS_Y);
                        gl_conf_header.URL_REPORT = getCvtXmlTag(gl_conf_header.URL_REPORT);
                        gl_conf_header.URL_STATUS = getCvtXmlTag(gl_conf_header.URL_STATUS);
                        gl_conf_header.URL_PARK = getCvtXmlTag(gl_conf_header.URL_PARK);
                        gl_conf_header.URL_WEATHER = getCvtXmlTag(gl_conf_header.URL_WEATHER);
                    }

                }else if(child1.nodeName == "NOTICE_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "NOTICE_INFO"){

                            child3 = child2.firstChild;
                            var CObj = new Object();

                            CObj.ID = getCvtXmlTag(child2.getAttribute("id"));
                            CObj.TYPE = getCvtXmlTag(child2.getAttribute("type"));

                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "EVENT_ID") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "SCH_TYPE"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    CObj.SDAY = getCvtXmlTag(child3.getAttribute("sday"));
                                    CObj.EDAY = getCvtXmlTag(child3.getAttribute("eday"));
                                    CObj.STIME = getCvtXmlTag(child3.getAttribute("stime"));
                                    CObj.ETIME = getCvtXmlTag(child3.getAttribute("etime"));
                                }

                                if(child3.nodeName == "NOTICE_NAME") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "FILE_URL"){
                                    str_tmp = child3.childNodes[0].nodeValue + "";
                                    str_tmp = str_tmp.replace("commonfiles/datas/subsidiary/","commonfiles/event/");
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = str_tmp;
                                    CObj.PTIME = getCvtXmlTag(child3.getAttribute("ptime"));
                                }
                                child3 = child3.nextSibling;
                            }

                            CObj.ID = getCvtXmlTag(CObj.ID);
                            CObj.TYPE = getCvtXmlTag(CObj.TYPE);
                            CObj.EVENT_ID = getCvtXmlTag(CObj.EVENT_ID);
                            CObj.NOTICE_NAME = getCvtXmlTag(CObj.NOTICE_NAME);

                            CObj.SCH_TYPE = getCvtXmlTag(CObj.SCH_TYPE);
                            CObj.SDAY = getCvtXmlTag(CObj.SDAY);
                            CObj.EDAY = getCvtXmlTag(CObj.EDAY);
                            CObj.STIME = getCvtXmlTag(CObj.STIME);
                            CObj.ETIME = getCvtXmlTag(CObj.ETIME);

                            CObj.FILE_URL = getCvtXmlTag(CObj.FILE_URL);
                            CObj.PTIME = getCvtXmlNum(CObj.PTIME,10);

                            if(CObj.FILE_URL != ""){
                                if(typeof gl_arr_notice_list !== 'undefined'){
                                    gl_arr_notice_list.push(CObj);
                                }
                            }
                        }

                        child2 = child2.nextSibling;
                    }

                }else if(child1.nodeName == "EVENT_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "EVENT_INFO"){
                            child3 = child2.firstChild;
                            var CObj = new Object();

                            CObj.ID = getCvtXmlTag(child2.getAttribute("id"));
                            CObj.SECT = getCvtXmlTag(child2.getAttribute("sect"));
                            CObj.LANG = getCvtXmlTag(child2.getAttribute("lang"));
                            CObj.BUILDING = getCvtXmlTag(child2.getAttribute("building"));
                            while(child3 != null && child3.nodeType != 4){
                                if(child3.nodeName == "SCH_TYPE"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    CObj.SDAY = getCvtXmlTag(child3.getAttribute("sday"));
                                    CObj.EDAY = getCvtXmlTag(child3.getAttribute("eday"));
                                    CObj.STIME = getCvtXmlTag(child3.getAttribute("stime"));
                                    CObj.ETIME = getCvtXmlTag(child3.getAttribute("etime"));
                                }

                                if(child3.nodeName == "CATE_CODE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_NAME_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_NAME_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_NAME_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_NAME_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "EVENT_DESC_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_DESC_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_DESC_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_DESC_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "EVENT_TIME") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_PLACE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_ID") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "MAIN_FILE_URL"){
                                    str_tmp = child3.childNodes[0].nodeValue + "";
                                    //str_tmp = str_tmp.replace("commonfiles/datas/","commonfiles/");
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = str_tmp;
                                }
                                if(child3.nodeName == "THUMB_FILE_URL"){
                                    str_tmp = child3.childNodes[0].nodeValue + "";
                                    //str_tmp = str_tmp.replace("commonfiles/datas/","commonfiles/");
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = str_tmp;
                                }
                                child3 = child3.nextSibling;
                            }

                            CObj.ID = getCvtXmlTag(CObj.ID);
                            CObj.SECT = getCvtXmlTag(CObj.SECT);
                            CObj.LANG = getCvtXmlTag(CObj.LANG);
                            CObj.BUILDING = getCvtXmlTag(child2.getAttribute("building"));
                            CObj.CATE_CODE = getCvtXmlTag(CObj.CATE_CODE);
                            CObj.EVENT_NAME_KOR = getCvtXmlTag(CObj.EVENT_NAME_KOR);
                            CObj.EVENT_NAME_ENG = getCvtXmlTag(CObj.EVENT_NAME_ENG);
                            CObj.EVENT_NAME_CHN = getCvtXmlTag(CObj.EVENT_NAME_CHN);
                            CObj.EVENT_NAME_JPN = getCvtXmlTag(CObj.EVENT_NAME_JPN);

                            CObj.EVENT_DESC_KOR = getCvtXmlTag(CObj.EVENT_DESC_KOR);
                            CObj.EVENT_DESC_ENG = getCvtXmlTag(CObj.EVENT_DESC_ENG);
                            CObj.EVENT_DESC_CHN = getCvtXmlTag(CObj.EVENT_DESC_CHN);
                            CObj.EVENT_DESC_JPN = getCvtXmlTag(CObj.EVENT_DESC_JPN);

                            CObj.EVENT_TIME = getCvtXmlTag(CObj.EVENT_TIME);
                            CObj.EVENT_PLACE = getCvtXmlTag(CObj.EVENT_PLACE);
                            CObj.STORE_ID = getCvtXmlTag(CObj.STORE_ID);

                            CObj.SCH_TYPE = getCvtXmlTag(CObj.SCH_TYPE);
                            CObj.SDAY = getCvtXmlTag(CObj.SDAY);
                            CObj.EDAY = getCvtXmlTag(CObj.EDAY);
                            CObj.STIME = getCvtXmlTag(CObj.STIME);
                            CObj.ETIME = getCvtXmlTag(CObj.ETIME);

                            CObj.MAIN_FILE_URL = getCvtXmlTag(CObj.MAIN_FILE_URL);
                            CObj.THUMB_FILE_URL = getCvtXmlTag(CObj.THUMB_FILE_URL);

                            if(CObj.MAIN_FILE_URL != ""){
                                if(typeof gl_arr_event_list !== 'undefined'){
                                    gl_arr_event_list.push(CObj);
                                }
                            }
                        }

                        child2 = child2.nextSibling;
                    }

                }else if(child1.nodeName == "STORE_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "STORE_INFO"){
                            child3 = child2.firstChild;
                            
                            var CObj = new Object();
                            var SubCObj = new Array();

                            CObj.ID = getCvtXmlTag(child2.getAttribute("id"));

                            CObj.TYPE = getCvtXmlTag(child2.getAttribute("type"));

                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "CATE_CODE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "EVENT_ID") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_NAME_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_NAME_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_NAME_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_NAME_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "FONT_SIZE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_PHONE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_HOURS_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_HOURS_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_HOURS_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_HOURS_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "STORE_DESC_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_DESC_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_DESC_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_DESC_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "STORE_MENU_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_MENU_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_MENU_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "STORE_MENU_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "STORE_LOGO_URL"){
                                    str_tmp = child3.childNodes[0].nodeValue + "";
                                    //str_tmp = str_tmp.replace("commonfiles/sw/STS_MNG/webapps/datas/","commonfiles/");
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = str_tmp;
                                }
                                if(child3.nodeName == "STORE_MAIN_URL"){
                                    str_tmp = child3.childNodes[0].nodeValue + "";
                                    //str_tmp = str_tmp.replace("commonfiles/sw/STS_MNG/webapps/datas/","commonfiles/");
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = str_tmp;
                                }
                                if(child3.nodeName == "STORE_SUB_URL"){
                                    str_tmp = child3.childNodes[0].nodeValue + "";
                                    //str_tmp = str_tmp.replace("commonfiles/sw/STS_MNG/webapps/datas/","commonfiles/");
                                    SubCObj.push(str_tmp);
                                }

                                if(child3.nodeName == "STORE_FLOOR"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    CObj.BUILDING = getCvtXmlTag(child3.getAttribute("building"));
                                }
                                child3 = child3.nextSibling;
                            }

                            CObj.ID = getCvtXmlTag(CObj.ID);
                            CObj.TYPE = getCvtXmlTag(CObj.TYPE);

                            CObj.CATE_CODE = getCvtXmlTag(CObj.CATE_CODE);
                            CObj.EVENT_ID = getCvtXmlTag(CObj.EVENT_ID);
                            CObj.STORE_NAME_KOR = getCvtXmlTag(CObj.STORE_NAME_KOR);
                            CObj.STORE_NAME_ENG = getCvtXmlTag(CObj.STORE_NAME_ENG);
                            CObj.STORE_NAME_CHN = getCvtXmlTag(CObj.STORE_NAME_CHN);
                            CObj.STORE_NAME_JPN = getCvtXmlTag(CObj.STORE_NAME_JPN);

                            CObj.FONT_SIZE = getCvtXmlTag(CObj.FONT_SIZE);
                            CObj.STORE_PHONE = getCvtXmlTag(CObj.STORE_PHONE);
                            CObj.STORE_SERVICETIME = getCvtXmlTag(CObj.STORE_SERVICETIME);

                            CObj.STORE_DESC_KOR = getCvtXmlTag(CObj.STORE_DESC_KOR);
                            CObj.STORE_DESC_ENG = getCvtXmlTag(CObj.STORE_DESC_ENG);
                            CObj.STORE_DESC_CHN = getCvtXmlTag(CObj.STORE_DESC_CHN);
                            CObj.STORE_DESC_JPN = getCvtXmlTag(CObj.STORE_DESC_JPN);

                            CObj.STORE_MENU_KOR = getCvtXmlTag(CObj.STORE_MENU_KOR);
                            CObj.STORE_MENU_ENG = getCvtXmlTag(CObj.STORE_MENU_ENG);
                            CObj.STORE_MENU_CHN = getCvtXmlTag(CObj.STORE_MENU_CHN);
                            CObj.STORE_MENU_JPN = getCvtXmlTag(CObj.STORE_MENU_JPN);

                            CObj.STORE_FLOOR = getCvtXmlTag(CObj.STORE_FLOOR);
                            CObj.BUILDING = getCvtXmlTag(CObj.BUILDING);

                            CObj.STORE_LOGO_URL = getCvtXmlTag(CObj.STORE_LOGO_URL);
                            CObj.STORE_MAIN_URL = getCvtXmlTag(CObj.STORE_MAIN_URL);
                            CObj.STORE_SUB_URL = SubCObj;

                            //console.log(SubCObj);

                            if(typeof gl_arr_store_list !== 'undefined'){
                                gl_arr_store_list.push(CObj); 
                            }
                        }

                        child2 = child2.nextSibling;
                    }


                }else if(child1.nodeName == "RECOMMAND_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "RECOMMAND_INFO"){
                            child3 = child2.firstChild;
                            var CObj = new Object();

                            CObj.NEW = getCvtXmlTag(child2.getAttribute("new"));
                            CObj.RECMND = getCvtXmlTag(child2.getAttribute("recmnd"));
                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "STORE_ID") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                child3 = child3.nextSibling;
                            }

                            CObj.STORE_ID = getCvtXmlTag(CObj.STORE_ID);
                            CObj.NEW = getCvtXmlTag(CObj.NEW);
                            CObj.RECMND = getCvtXmlTag(CObj.RECMND);
                            CObj.IS_VALID = 0;

                            if(typeof gl_arr_recommand_list !== 'undefined'){
                                gl_arr_recommand_list.push(CObj);
                            }

                        }

                        child2 = child2.nextSibling;
                    }

                }else if(child1.nodeName == "INFORMATION_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "INFORMATION_INFO"){
                            child3 = child2.firstChild;
                            var CObj = new Object();

                            CObj.ID = getCvtXmlTag(child2.getAttribute("id"));
                            CObj.TYPE = getCvtXmlTag(child2.getAttribute("type"));
                            CObj.BRN_ID = getCvtXmlTag(child2.getAttribute("brn_id"));
                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "TENANT_FLOOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_NAME") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_NAME_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_NAME_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_NAME_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_NAME_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_DESC_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_DESC_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_DESC_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "TENANT_DESC_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                child3 = child3.nextSibling;
                            }

                            CObj.ID = getCvtXmlTag(CObj.ID);
                            CObj.TYPE = getCvtXmlTag(CObj.TYPE);
                            CObj.BRN_ID = getCvtXmlTag(CObj.BRN_ID);
                            CObj.TENANT_FLOOR = getCvtXmlTag(CObj.TENANT_FLOOR);
                            CObj.TENANT_NAME = getCvtXmlTag(CObj.TENANT_NAME);
                            CObj.TENANT_NAME_KOR = getCvtXmlTag(CObj.TENANT_NAME_KOR);
                            CObj.TENANT_NAME_ENG = getCvtXmlTag(CObj.TENANT_NAME_ENG);
                            CObj.TENANT_NAME_CHN = getCvtXmlTag(CObj.TENANT_NAME_CHN);
                            CObj.TENANT_NAME_JPN = getCvtXmlTag(CObj.TENANT_NAME_JPN);
                            CObj.TENANT_DESC_KOR = getCvtXmlTag(CObj.TENANT_DESC_KOR);
                            CObj.TENANT_DESC_ENG = getCvtXmlTag(CObj.TENANT_DESC_ENG);
                            CObj.TENANT_DESC_CHN = getCvtXmlTag(CObj.TENANT_DESC_CHN);
                            CObj.TENANT_DESC_JPN = getCvtXmlTag(CObj.TENANT_DESC_JPN);

                            if(CObj.TENANT_NAME_KOR == ""){
                                CObj.TENANT_NAME_KOR = CObj.TENANT_NAME;
                            }

                            if(typeof gl_arr_help_list !== 'undefined'){
                                gl_arr_help_list.push(CObj);
                            }
                        }

                        child2 = child2.nextSibling;
                    }


                }else if(child1.nodeName == "PUB_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "PUB_INFO"){
                            child3 = child2.firstChild;
                            var CObj = new Object();

                            CObj.ID = getCvtXmlTag(child2.getAttribute("id"));

                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "PUB_CODE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_FLOOR"){
                                    if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    CObj.BUILDING = getCvtXmlTag(child3.getAttribute("building"));
                                }
                                if(child3.nodeName == "PUB_TIME") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_PHONE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "PUB_NAME_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_NAME_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_NAME_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_NAME_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "PUB_DESC_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_DESC_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_DESC_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "PUB_DESC_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                if(child3.nodeName == "OFFICE_HOURS_KOR") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "OFFICE_HOURS_ENG") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "OFFICE_HOURS_CHN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "OFFICE_HOURS_JPN") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                child3 = child3.nextSibling;
                            }

                            CObj.ID = getCvtXmlTag(CObj.ID);
                            CObj.PUB_CODE = getCvtXmlTag(CObj.PUB_CODE);
                            CObj.PUB_FLOOR = getCvtXmlTag(CObj.PUB_FLOOR);
                            CObj.BUILDING = getCvtXmlTag(CObj.BUILDING);
                            CObj.PUB_TIME = getCvtXmlTag(CObj.PUB_TIME);
                            CObj.PUB_PHONE = getCvtXmlTag(CObj.PUB_PHONE);

                            CObj.PUB_NAME_KOR = getCvtXmlTag(CObj.PUB_NAME_KOR);
                            CObj.PUB_NAME_ENG = getCvtXmlTag(CObj.PUB_NAME_ENG);
                            CObj.PUB_NAME_CHN = getCvtXmlTag(CObj.PUB_NAME_CHN);
                            CObj.PUB_NAME_JPN = getCvtXmlTag(CObj.PUB_NAME_JPN);
                            CObj.PUB_DESC_KOR = getCvtXmlTag(CObj.PUB_DESC_KOR);
                            CObj.PUB_DESC_ENG = getCvtXmlTag(CObj.PUB_DESC_ENG);
                            CObj.PUB_DESC_CHN = getCvtXmlTag(CObj.PUB_DESC_CHN);
                            CObj.PUB_DESC_JPN = getCvtXmlTag(CObj.PUB_DESC_JPN);
                            CObj.OFFICE_HOURS_KOR = getCvtXmlTag(CObj.OFFICE_HOURS_KOR);
                            CObj.OFFICE_HOURS_ENG = getCvtXmlTag(CObj.OFFICE_HOURS_ENG);
                            CObj.OFFICE_HOURS_CHN = getCvtXmlTag(CObj.OFFICE_HOURS_CHN);
                            CObj.OFFICE_HOURS_JPN = getCvtXmlTag(CObj.OFFICE_HOURS_JPN);

                            if(typeof gl_arr_facility_list !== 'undefined'){
                                gl_arr_facility_list.push(CObj);
                            }

                        }

                        child2 = child2.nextSibling;
                    }

                }else if(child1.nodeName == "PARK_LIST"){
                    child2 = child1.firstChild;
                    while(child2 != null && child2.nodeType != 4){
                        if(child2.nodeName == "PARK_INFO"){
                            child3 = child2.firstChild;
                            var CObj = new Object();

                            while(child3 != null && child3.nodeType != 4){

                                if(child3.nodeName == "POI_ID") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "FLOOR_CODE") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                if(child3.nodeName == "NUMBER") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                child3 = child3.nextSibling;
                            }

                            CObj.POI_ID = getCvtXmlTag(CObj.POI_ID);
                            CObj.NUMBER = getCvtXmlTag(CObj.NUMBER);
                            CObj.FLOOR_CODE = getCvtXmlTag(CObj.FLOOR_CODE);

                            if(typeof gl_arr_park_list !== 'undefined'){
                                gl_arr_park_list.push(CObj);
                            }

                        }

                        child2 = child2.nextSibling;
                    }


                }  // END IF


            }

            child1 = child1.nextSibling;
        }
    }catch(err){
        console.log("XML Parse Error : " + err);
        return;
    }
    setInitSetting();
}



// function setLoadContents(p_url)
function setLoadLanguage(p_url){
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4){
            return;
        }
        //데이터가 확실하게 들어왔을 때 데이터 바인딩 시작
        if(xhr.status == 200) {
            var xml_doc = JSON.parse(this.response);
            // var xml_doc = this.response;
            if(typeof gl_jsop_lang_data !== 'undefined'){
                console.log("setLoadLanguage OK");
                gl_jsop_lang_data = xml_doc;

                if( typeof(setInitSettingLang) == 'function'){
                    setInitSettingLang();
                }
            }
        }else{
            console.log("fail");
        }
    }
    xhr.open("GET", p_url,true);
    xhr.send();
}