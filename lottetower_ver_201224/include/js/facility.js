/******************************************
   name :  facility.js
   auth :  ELTOV
   date :  2020.11.15
   desc :  공용시설처리
*******************************************/


var gl_main_conf = {
    lang:"KOR",
    speed:300,    // FADE 속도
    close:1,

    //page 이름 추가
    name: "facility"
};



/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////

function setInitSetting(){

    //setLoadLanguage("./xml/kiosk_lang_vertical.json");

    if(parent.MAINPARENTCUSTOMCODE){  // 부모가 있으면

    }else{
        console.log("LOCAL SETTING FACILITY");

    }
}

function setInitSettingEnd(){

    if(parent.MAINPARENTCUSTOMCODE){  // 부모가 있으면

    }
}

function setInitConfig(p_config,p_arr_facility){

    gl_conf_header = p_config;

    for(i = 0; i < p_arr_facility.length; i++){
        gl_arr_facility_list.push(p_arr_facility[i]);
    }
}

function setInitConfigLang(p_lang){
    gl_jsop_lang_data = p_lang;
}

// 다국어 변환
function setMainLang(p_lang){

    if(gl_main_conf.lang == p_lang) return;

    gl_main_conf.lang = p_lang;

    //다국어 추가 부분
    var str_attr ="" 
    var str_lang = gl_main_conf.lang.toLowerCase();

    $(".lang_code_names").each(function(i){

        str_attr = $(".lang_code_names").eq(i).attr("lang_code");

        try{
            $(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][str_lang]);
        }catch(err){
            console.log("ERROR LANG FACILITY : " + str_attr);
        }
    });
    
    if(str_lang === "eng"){
        $(".facility_text_box p").hide();
    }
    else{
        $(".facility_text_box p").show();
    }
}




function setMainStart(p_obj){
    if(PAGEACTIVEYN == true ){
        return;
    }

    PAGEACTIVEYN = true;

    $(".facility_box").removeClass("facility_active");
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

function onClickFacilityInfo(p_obj){

    $(".facility_box").removeClass("facility_active");
    $(p_obj).addClass("facility_active");

    var str_code = $(p_obj).attr("code");
    var str_icon_code = $(p_obj).attr("icon_code");

    if(str_code != ""){
        if(parent.MAINPARENTCUSTOMCODE){
            var cmd_obj = { sect:"POPUP", type:"FACILITY", id:str_code, code:str_icon_code };
            parent.setParentCmd(cmd_obj);
        }
    }
}


/////////////////////////////////////////////////
// DEBUG

function onClickDebugLang(p_type){
    setMainLang(p_type);
}