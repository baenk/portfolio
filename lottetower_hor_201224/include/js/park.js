/******************************************
   name :  park.js
   auth :  ELTOV
   date :  2020.11.08
   desc :  주차연동 자바스크립트
*******************************************/

var gl_main_conf = {
    lang:"KOR",
    speed:300,    // FADE 속도
    close:1,
    //page 이름 추가
    name: "park"
};



/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////

function setInitSetting(){

    if(parent.MAINPARENTCUSTOMCODE){

    }else{
        console.log("LOCAL SETTING PARK");
    }

}


function setInitSettingEnd(){
    if(parent.MAINPARENTCUSTOMCODE){
        /*
        var cmd_obj = { sect:"HIDE", type:"PARK", id:"", code:"" };
        parent.setParentCmd(cmd_obj);
        */
    }
}


function setInitConfig(p_config,p_arr_park){
    var i = 0;

    gl_conf_header = p_config;

    for(i = 0; i < p_arr_park.length; i++){
        gl_arr_park_list.push(p_arr_park[i]);
    }

}

function setInitConfigLang(p_lang){
    gl_jsop_lang_data = p_lang;
}


// 다국어 변환
function setMainLang(p_lang){

    if(gl_main_conf.lang == p_lang) return;

    gl_main_conf.lang = p_lang;

    if(gl_main_conf.lang == "KOR"){
        $(".lang_carpark_img > img").attr("src","./images/carpark_img_kor.png");
    }else if(gl_main_conf.lang == "ENG"){
        $(".lang_carpark_img > img").attr("src","./images/carpark_img_eng.png");
    }else if(gl_main_conf.lang == "CHN"){
        $(".lang_carpark_img > img").attr("src","./images/carpark_img_chn.png");
    }else if(gl_main_conf.lang == "JPN"){
        $(".lang_carpark_img > img").attr("src","./images/carpark_img_jpn.png");
    }

    //다국어 추가 부분
    var str_attr = "";
    var str_lang = gl_main_conf.lang.toLowerCase();

    $(".lang_code_names").each(function(i){
        str_attr = $(".lang_code_names").eq(i).attr("lang_code");
        try{
            $(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][str_lang]);
        }catch(err){
            console.log("ERROR LANG PARK : " + str_attr);
        }
    });
    
    if(gl_main_conf.lang == "JPN"){
        $(".qr_part p").css("word-break","break-all");
    }
    else{
        $(".qr_part p").css("word-break","keep-all");
    }
}

function setMainStart(p_obj){
    /*
    if(PAGEACTIVEYN == true ){
        return;
    }
    */
    PAGEACTIVEYN = true;

    $("#id_page_car_list").hide();
    $("#id_txt_search_keyword").val("");
}

function setMainStop(){
    if(PAGEACTIVEYN == false ){
        return;
    }
    PAGEACTIVEYN = false;
}



/////////////////////////////////////////////////
// CLICK EVENT
/////////////////////////////////////////////////

function onClickSearchNum(p_obj){

    /*
    $(p_obj).siblings("li").children("span").removeClass("circle_84_active");
    $(p_obj).siblings("span").removeClass("circle_84_4b");
    $(p_obj).children("span").addClass("circle_84_active");
    */

    var code = $(p_obj).attr("CODE");
    var str_val = $("#id_txt_search_keyword").val();
    if(str_val.length < 4){
        str_val = str_val + code;
        $("#id_txt_search_keyword").val(str_val);
    }
}


// 키워드 뒤로가기
function onClickSearchKeyDel(){
    /*
    $("#id_btn_bspace").siblings("li").children("span").removeClass("circle_84_active");
    $("#id_btn_bspace").addClass("circle_84_4b");
    $("#id_btn_bspace").siblings("span").removeClass("circle_84_4b");
    */

    var str_val = $("#id_txt_search_keyword").val();
    if(str_val.length >= 1){
        str_val = str_val.substring(0,str_val.length -1);
        $("#id_txt_search_keyword").val(str_val);
    }
}

// 키워드 엔터
function onClickSearchKeyDone(){
    var str_val = $("#id_txt_search_keyword").val();
    if(str_val.length == 4){
        var opt = {"timeout":4000};

        var str_url = gl_conf_header.URL_PARK + "?park_num=" + str_val;
        setSendSocketGET(setLoadParkList,str_url,opt);

        /*
        $("#id_page_car_list").show();
        $("#id_page_car_result_list").hide();
        $("#id_page_car_no_result").show();
        */
    }
}

function onClickWayFind(p_id,p_floor){

    var cmd_obj = { sect:"WAYFIND", type:"PARK", id:p_id, code:"", floor:p_floor, pos_x:"", pos_y:""};

    if(parent.MAINPARENTCUSTOMCODE){
        parent.setParentCmd(cmd_obj);
    }

}



/////////////////////////////////////////////////
// FUNCTION 
/////////////////////////////////////////////////


function setLoadParkList(p_result,p_data){
    var i = 0;
    var i_cnt = 0;
    var obj;
    var str_day = "";
    var str_html = "";
    var str_time = "";
    var str_area = "";
    var str_floor = "";
    var str_poi_id = "";
    var str_rec_number = "";
    var str_img_url = "";
    var str_in_time = "";

    //다국어 추가 부분
    var str_lang = gl_main_conf.lang.toLowerCase();
    var str_number = gl_jsop_lang_data.park.PARK_CAR_NUMBER[str_lang];
    var str_park_time = gl_jsop_lang_data.park.PARK_CAR_TIME[str_lang];
    var str_html_area = gl_jsop_lang_data.park.PARK_CAR_ZONE[str_lang];
    var str_guide = gl_jsop_lang_data.park.PARK_CAR_GUIDE[str_lang];

    if(p_result == "SUCC"){

        try{
            console.log("p_datap_data = " + p_data);
            var json_obj = JSON.parse(p_data);
            if(json_obj.result.length > 0){
                if(json_obj.result[0].VEHICLE_LIST.length > 0){
                    
                    for(i = 0; i < json_obj.result[0].VEHICLE_LIST.length && i < 100; i++){

                        console.log("=== " + json_obj.result[0].VEHICLE_LIST[i].VEHICLE_NO);
                        console.log("=== " + json_obj.result[0].VEHICLE_LIST[i].AREA_NO);
                        console.log("=== " + json_obj.result[0].VEHICLE_LIST[i].VEHICLE_NO_IMG_URL);

                        str_img_url = json_obj.result[0].VEHICLE_LIST[i].VEHICLE_NO_IMG_URL + "";
                        str_in_time = json_obj.result[0].VEHICLE_LIST[i].VEHICLE_IN_TM + "";
                        str_area = json_obj.result[0].VEHICLE_LIST[i].AREA_NO + "";

                        var arr_area = str_area.split("-");
                        if(arr_area.length == 3){

                            str_time = str_in_time;
                            //20201220 121634
                            //str_time = str_time.substring(0,4) + "-" + str_time.substring(4,6) + "-" + str_time.substring(6,8);
                            if(str_time != ""){
                                str_time = str_time.substring(8,10) + ":" + str_time.substring(10,12) + ":" + str_time.substring(12,14);
                            }

                            str_poi_id = "";

                            str_floor = arr_area[1];
                            str_rec_number = arr_area[2];

                            console.log("str_floor = " + str_floor);
                            console.log("str_rec_number = " + str_rec_number);

                            for(j = 0; j < gl_arr_park_list.length; j++){
                                obj = gl_arr_park_list[j];
                                if(obj.FLOOR_CODE == str_floor && obj.NUMBER == str_rec_number){
                                    str_poi_id = obj.POI_ID;
                                    break;
                                }
                            }

                            str_html += "<li>";
                            str_html += "  <div class=\"car_park_img\"><img src=\"http://stsgw.lwt.co.kr/lwt/" + str_img_url  + "\"></div>";
                            str_html += "  <div class=\"car_park_info\">";
                            str_html += "    <p><span>" + str_number + "</span>" + json_obj.result[0].VEHICLE_LIST[i].VEHICLE_NO + "</p>";
                            str_html += "    <p><span>" + str_park_time + "</span>" + str_time + "</p>";
                            str_html += "    <p><span>" + str_html_area + "</span>" + json_obj.result[0].VEHICLE_LIST[i].AREA_NO + "</p>";
                            str_html += "  </div>";
                            if(str_poi_id != ""){
                                console.log("str_poi_idstr_poi_id = " + str_poi_id);
                                str_html += "  <div class=\"car_park_loc\"><span class=\"rectangle_loc rectangle_loc_active\" onClick=\"javascript:onClickWayFind('" + str_poi_id + "','" + str_floor + "');\"><img src=\"./images/pop_location_btn01.svg\"><p>" + str_guide + "</p></span></div>";
                            }else{
                               str_html += " <div></div>";
                            }
                            str_html += "</li>";
                            i_cnt++
                        }

                        ///datas/car_img/20201218/20170509_111833_004062_0007"
                    }
                }
            }

        }catch(err){
            console.log(err);
        }
    }

    if(i_cnt > 0){
        $("#id_page_car_result_list").html(str_html);
        $("#id_page_car_no_result").hide();
    }else{
        $("#id_page_car_result_list").html("");
        $("#id_page_car_no_result").show();
    }

    $("#id_page_car_list").fadeIn(gl_main_conf.speed);
}



function setLoadParkList_Old(p_result,p_data){
    var i = 0;
    var str_html = "";
    var str_time = "";
    var str_result = "FAIL";
    var arr_park_list = [];

    if(p_result == "SUCC"){

        try{
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(p_data,"text/xml");

            var root_node = xmlDoc.getElementsByTagName("KIOSK")[0];

            var child1 = root_node.firstChild;
            var child2;
            var child3;

            while(child1 != null && child1.nodeType != 4){

                if(child1.nodeType == 1){
                    if(child1.nodeName == "HEADER"){

                        child2 = child1.firstChild;

                        while(child2 != null && child2.nodeType != 4){
                            if(child2.nodeName == "RET_CODE") str_result = "SUCC";
                            child2 = child2.nextSibling;
                        }

                    }else if(child1.nodeName == "CAR_LIST"){
                        child2 = child1.firstChild;
                        while(child2 != null && child2.nodeType != 4){
                            if(child2.nodeName == "CAR_INFO"){
                                child3 = child2.firstChild;
                                var CObj = new Object();
                                while(child3 != null && child3.nodeType != 4){
                                    if(child3.nodeName == "POI_ID") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    if(child3.nodeName == "CAR_NUMBER") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    if(child3.nodeName == "LEVEL_NAME") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    if(child3.nodeName == "AREA_NO") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    if(child3.nodeName == "IMG_URL") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;
                                    if(child3.nodeName == "PARK_TIME") if(child3.childNodes[0]) CObj[child3.nodeName] = child3.childNodes[0].nodeValue;

                                    child3 = child3.nextSibling;
                                }
                                arr_park_list.push(CObj);

                            }

                            child2 = child2.nextSibling;
                        }

                    }
                }

                child1 = child1.nextSibling;
            }

        }catch(err){
            console.log(err);
        }
    }

    if(str_result == "SUCC" && arr_park_list.length > 0){
        
        // var str_number = "";
        // var str_time = "";
        // var str_area = "";
        // if(gl_main_conf.lang == "KOR"){
        //     str_number = "차량번호";
        //     str_time = "입차시간";
        //     str_area = "주차구역";
        // }else if(gl_main_conf.lang == "ENG"){
        //     str_number = "Car Number";
        //     str_time = "Time";
        //     str_area = "Area";
        // }else if(gl_main_conf.lang == "CHN"){
        //     str_number = "";
        //     str_time = "";
        //     str_area = "";
        // }else if(gl_main_conf.lang == "JPN"){
        //     str_number = "";
        //     str_time = "";
        //     str_area = "";
        // }


        //다국어 추가 부분
        var str_lang = gl_main_conf.lang.toLowerCase();
        var str_number = gl_jsop_lang_data.park.PARK_CAR_NUMBER[str_lang];
        var str_park_time = gl_jsop_lang_data.park.PARK_CAR_TIME[str_lang];
        var str_area = gl_jsop_lang_data.park.PARK_CAR_ZONE[str_lang];
        var str_guide = gl_jsop_lang_data.park.PARK_CAR_GUIDE[str_lang];

        for(i = 0; i < arr_park_list.length; i++){
            str_time = arr_park_list[i].PARK_TIME;
            str_time = str_time.substring(4,6) + "/" + str_time.substring(6,8) + " " + str_time.substring(8,10) + ":" + str_time.substring(10,12);
            str_html += "<li>";
            str_html += "  <div class=\"car_park_img\"><img src=\"" + arr_park_list[i].IMG_URL  + "\"></div>";
            str_html += "  <div class=\"car_park_info\">";
            str_html += "    <p><span>" + str_number + "</span>" + arr_park_list[i].CAR_NUMBER + "</p>";
            str_html += "    <p><span>" + str_park_time + "</span>" + str_time + "</p>";
            str_html += "    <p><span>" + str_area + "</span>" + arr_park_list[i].AREA_NO + "</p>";
            str_html += "  </div>";
            str_html += "  <div class=\"car_park_loc\"><span class=\"rectangle_loc rectangle_loc_active\" onClick=\"javascript:onClickWayFind('" + arr_park_list[i].POI_ID + "','" + arr_park_list[i].LEVEL_NAME + "');\"><img src=\"./images/pop_location_btn01.png\"><p>" + str_guide + "</p></span></div>";
            str_html += "</li>";
        }

        $("#id_page_car_result_list").html(str_html);
        $("#id_page_car_no_result").hide();
    }else{
        $("#id_page_car_result_list").html("");
        $("#id_page_car_no_result").show();
    }

    $("#id_page_car_list").fadeIn(gl_main_conf.speed);
}


/////////////////////////////////////////////////
// DEBUG

function onClickDebugLang(p_type){
    setMainLang(p_type);
}