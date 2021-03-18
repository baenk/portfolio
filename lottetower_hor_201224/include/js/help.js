/******************************************
   name :  help.js
   auth :  ELTOV
   date :  2020.11.16
   desc :  도움말 자바스크립트
*******************************************/

var gl_main_conf = {
    lang:"KOR",
    speed:300,    // FADE 속도
    close:1,
    name: "help"
};

/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////

function setInitSetting(){

    if(parent.MAINPARENTCUSTOMCODE){

    }else{
        console.log("LOCAL SETTING HELP");
        setInitMakeHelpList();
    }
}

function setInitSettingEnd(){

    if(parent.MAINPARENTCUSTOMCODE){
        /*
        var cmd_obj = { sect:"HIDE", type:"HELP", id:"", code:"" };
        parent.setParentCmd(cmd_obj);
        */
    }
}


function setInitConfig(p_config,p_arr_help){

    gl_conf_header = p_config;

    for(i = 0; i < p_arr_help.length; i++){
        gl_arr_help_list.push(p_arr_help[i]);
    }

    setInitMakeHelpList();

}

function setInitConfigLang(p_lang){

    if(gl_main_conf.lang == p_lang) return;

    gl_jsop_lang_data = p_lang;
}


function setInitMakeHelpList(){
    var i = 0, j = 0;
    var obj;

    var str_desc = "";
    var str_html = "";
    var str_html_tower = "";
    var str_html_mall = "";
    var str_html_signiel = "";
    var str_html_podium = "";

    for(i = 0; i < gl_arr_help_list.length && i < 3000; i++){
        obj = gl_arr_help_list[i];

        str_desc = obj.TENANT_DESC_KOR;
        str_desc = str_desc.replace(/(\n|\r\n)/g, '<br>');

        str_html  = "<li id=\"id_help_id_" + obj.ID + "\">";
        if(obj.BRN_ID == "16" || obj.BRN_ID == "13"){
            str_html += "  <span class=\"rectangle_info lang_name\" style=\"width:390px;font-size:14px;font-weight:500;\"><p style=\"font-weight:600;\">" + obj.TENANT_NAME_KOR + "</p>" + obj.TENANT_FLOOR + "</span>";
            str_html += "  <p class=\"lang_desc\" style=\"font-size:14px;font-weight:500;\">" + str_desc + "</p>";
        }else{
            str_html += "  <span class=\"rectangle_info lang_name\" style=\"width:320px;font-size:14px;font-weight:500;\"><p style=\"font-weight:600;\">" + obj.TENANT_NAME_KOR + "</p>" + obj.TENANT_FLOOR + "</span>";
            str_html += "  <p class=\"lang_desc\" style=\"font-size:14px;font-weight:500;\">" + str_desc + "</p>";
        }
        str_html += "</li>";

        if(obj.BRN_ID == "13"){
            if( obj.TENANT_NAME_KOR != "시그니엘서울"){
                str_html_signiel += str_html;
            }else{
                str_html_tower += "<li id=\"id_help_id_signiel\" >";
                str_html_tower += "  <span class=\"rectangle_info lang_name\" style=\"width:320px;font-size:14px;font-weight:600;\"><p class=\"lang_code_names\" lang_code=\"HELP_INFO_SIGNIEL\" style=\"font-weight:600;\">시그니엘 서울</p>76F-101F</span>";
                str_html_tower += "  <p class=\"lang_desc\" style=\"font-size:14px;font-weight:500;\"> <span class=\"rectangle_center lang_code_names\" style=\"width:140px;\" onClick=\"javascript:onClickInfoView('VIEW_SIGNIEL');\" lang_code=\"HELP_INFO_DETAIL\">상세보기</span></p>";
                str_html_tower += "</li>";
            }

        }else if(obj.BRN_ID == "16"){
            if( obj.TENANT_NAME_KOR !="포디엄"){
                str_html_podium += str_html;
            }
        }else if(obj.TYPE == "TWER"){
            str_html_tower += str_html;
        }else if(obj.TYPE == "SHPM"){
            str_html_mall += str_html;
        }else if(obj.TYPE == "PODIUM"){
            //str_html_podium += str_html;
        }
    }

    str_html_tower += "<li id=\"id_help_id_podium\" >";
    str_html_tower += "  <span class=\"rectangle_info\" style=\"width:320px;font-size:14px;font-weight:600;\"><p class=\"lang_code_names\" lang_code=\"HELP_INFO_PODIUM\" style=\"font-weight:600;\">포디엄</p>B1F-12F</span>";
    str_html_tower += "  <p class=\"lang_desc\" style=\"font-size:14px;font-weight:500;\"> <span class=\"rectangle_center lang_code_names\" style=\"width:140px;\" onClick=\"javascript:onClickInfoView('VIEW_PODIUM');\" lang_code=\"HELP_INFO_DETAIL\">상세보기</span></p>";
    str_html_tower += "</li>";

    /*
    str_html_tower += "<li id=\"id_help_id_podium\" >";
    str_html_tower += "  <span class=\"rectangle_info rectangle_info_active\" style=\"vertical-align:top;width:320px;font-size:14px;font-weight:600;\" onClick=\"javascript:onClickInfoView('VIEW_PODIUM');\"><p class=\"lang_code_names\" lang_code=\"HELP_INFO_PODIUM\" style=\"font-weight:600;\">포디엄</p>B1F-12F [<span class=\"lang_code_names\" lang_code=\"HELP_INFO_DETAIL\">상세보기</span>]</span>";
    str_html_tower += "  <p>&nbsp;</p>";
    str_html_tower += "</li>";
    */

    str_html_tower += "<div style=\"height:10px;\"></div>";
    str_html_mall += "<div style=\"height:10px;\"></div>";

    $("#id_info_time_tower_list").html(str_html_tower);
    $("#id_info_time_mall_list").html(str_html_mall);
    $("#id_info_time_podium_list").html(str_html_podium);
    $("#id_info_time_signiel_list").html(str_html_signiel);

}




function setMainLang(p_lang){
    var i = 0;
    var obj;
    var str_tmp = "";
    var str_html_name = "";
    var str_html_desc = "";
    var str_name = "", str_desc = "";

    gl_main_conf.lang = p_lang;


    // 다국어 처리
    for(i = 0; i < gl_arr_help_list.length && i < 3000; i++){
        obj = gl_arr_help_list[i];

        if(gl_main_conf.lang == "KOR"){
            str_name = obj.TENANT_NAME_KOR;
            str_desc = obj.TENANT_DESC_KOR;
        }else if(gl_main_conf.lang == "ENG"){
            str_name = obj.TENANT_NAME_ENG;
            str_desc = obj.TENANT_DESC_ENG;
        }else if(gl_main_conf.lang == "CHN"){
            str_name = obj.TENANT_NAME_CHN;
            str_desc = obj.TENANT_DESC_CHN;
        }else if(gl_main_conf.lang == "JPN"){
            str_name = obj.TENANT_NAME_JPN;
            str_desc = obj.TENANT_DESC_JPN;
        }

        str_html_name = "<p style=\"font-weight:600;\">" + str_name + "</p>" + obj.TENANT_FLOOR;
        str_html_desc = str_desc;
        str_html_desc = str_html_desc.replace(/(\n|\r\n)/g, '<br>');

        $("#id_help_id_" + obj.ID + " .lang_name").html(str_html_name);
        $("#id_help_id_" + obj.ID + " .lang_desc").html(str_html_desc);
    }

    if(gl_main_conf.lang == "KOR"){
        $("#id_page_traffic_box_bus").attr("src","images/info_img_bus_w_kor.png");
        $("#id_page_traffic_box_transfer").attr("src","images/info_img_transfer_w_kor.png");
    }else if(gl_main_conf.lang == "ENG"){
        $("#id_page_traffic_box_bus").attr("src","images/info_img_bus_w_eng.png");
        $("#id_page_traffic_box_transfer").attr("src","images/info_img_transfer_w_eng.png");
    }else if(gl_main_conf.lang == "CHN"){
        $("#id_page_traffic_box_bus").attr("src","images/info_img_bus_w_chn.png");
        $("#id_page_traffic_box_transfer").attr("src","images/info_img_transfer_w_chn.png");
    }else if(gl_main_conf.lang == "JPN"){
        $("#id_page_traffic_box_bus").attr("src","images/info_img_bus_w_jpn.png");
        $("#id_page_traffic_box_transfer").attr("src","images/info_img_transfer_w_jpn.png");
    }


    //다국어 추가 부분
    var str_attr = "";
    gl_main_conf.lang = gl_main_conf.lang.toLowerCase();

    $(".lang_code_names").each(function(i){
        str_attr = $(".lang_code_names").eq(i).attr("lang_code");
        try{
            $(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][gl_main_conf.lang]);
        }catch(err){
            console.log("ERROR LANG HELP : " + str_attr);
        }
    });

    $("#id_info_time_tower_list").scrollTop(0);
    $("#id_info_time_mall_list").scrollTop(0);
}

function setMainStart(p_obj){

    if(PAGEACTIVEYN == true ){
        return;
    }

    PAGEACTIVEYN = true;

    $("#id_btn_view_traffic").addClass("rectangle_ctg_active");
    $("#id_btn_view_time").removeClass("rectangle_ctg_active");
    $("#id_btn_traffic_bus").addClass("info_tap_active");
    $("#id_btn_traffic_trans").removeClass("info_tap_active");

    $(".info_traffic_box").show();
    $(".info_time_box").hide();
    $(".info_tap_list").show();

    $("#id_page_traffic_box_bus").show();
    $("#id_page_traffic_box_transfer").hide();

    $("#id_popup_bg").hide();
    $("#id_popup_podium").hide();
    $("#id_popup_signiel").hide();

    $("#id_info_time_tower_list").scrollTop(0);
    $("#id_info_time_mall_list").scrollTop(0);
    $("#id_info_time_podium_list").scrollLeft(0);
    $("#id_info_time_signiel_list").scrollLeft(0);
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

function onClickInfoView(p_type){

    console.log("onClickInfoViewonClickInfoView : " + p_type);
    
    if(p_type == "TRAFFIC_BUS"){
        
        $("#id_btn_traffic_bus").addClass("info_tap_active");
        $("#id_btn_traffic_trans").removeClass("info_tap_active");

        $("#id_page_traffic_box_bus").show();
        $("#id_page_traffic_box_transfer").hide();

    }else if(p_type == "TRAFFIC_TRANS"){

        $("#id_btn_traffic_bus").removeClass("info_tap_active");
        $("#id_btn_traffic_trans").addClass("info_tap_active");

        $("#id_page_traffic_box_bus").hide();
        $("#id_page_traffic_box_transfer").show();

    }else if(p_type == "VIEW_TRAFFIC"){

        $("#id_btn_view_traffic").addClass("rectangle_ctg_active");
        $("#id_btn_view_time").removeClass("rectangle_ctg_active");

        $(".info_traffic_box").show();
        $(".info_time_box").hide();
        $(".info_tap_box").show();

    }else if(p_type == "VIEW_TIME"){

        $("#id_btn_view_traffic").removeClass("rectangle_ctg_active");
        $("#id_btn_view_time").addClass("rectangle_ctg_active");

        $(".info_traffic_box").hide();
        $(".info_time_box").show();
        $(".info_tap_box").hide();

    }else if(p_type == "VIEW_PODIUM"){

        $("#id_popup_bg").fadeIn(gl_main_conf.speed);
        $("#id_popup_podium").fadeIn(gl_main_conf.speed);

    }else if(p_type == "VIEW_SIGNIEL"){

        $("#id_popup_bg").fadeIn(gl_main_conf.speed);
        $("#id_popup_signiel").fadeIn(gl_main_conf.speed);
    }
}



function onClickPopupClose(p_type){

    if(p_type == "PODIUM"){

        $("#id_popup_bg").fadeOut(gl_main_conf.speed);
        $("#id_popup_podium").fadeOut(gl_main_conf.speed);

    }else if(p_type == "SIGNIEL"){

        $("#id_popup_bg").fadeOut(gl_main_conf.speed);
        $("#id_popup_signiel").fadeOut(gl_main_conf.speed);

    }else if(p_type == "EVENT"){


    }
}


/////////////////////////////////////////
// DEBUG
function onClickDebug01(){
    setMainLang("ENG")
}

function onClickDebug02(){

}

function onClickDebugLang(p_type){
    setMainLang(p_type);
}