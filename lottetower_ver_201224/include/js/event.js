/******************************************
   name :  event.js
   auth :  ELTOV
   date :  2020.11.15
   desc :  이벤트 처리 자바스크립트
*******************************************/


var gl_siwper_event;

var gl_timer_loop_cnt = 0;
var gl_timer_auto = "AUTO";

var gl_cate_code = "";

var gl_list_conf = {
    event_list_cnt : 4,     // 총카운트
    event_curr : 0,         // 현재 이벤트 페이지
};
var gl_main_conf = {
    lang:"KOR",
    speed:300,    // FADE 속도
    close:1,

    //page 이름 추가
    name: "event"
};

/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////

function setInitSetting(){

    document.getElementById("id_page_event_list").addEventListener("touchstart",function(evt){ onMouseDownList(this,evt); },true );
    document.getElementById("id_page_event_list").addEventListener("mousedown",function(evt){ onMouseDownList(this,evt); },true );

    gl_siwper_event = new Swiper("#id_page_event_list",{
        slidesPerView: 'auto',
        spaceBetween: 24
    });
    
    //console.log("str_abc.length = " + str_abc.length);

    if(parent.MAINPARENTCUSTOMCODE){

    }else{
        console.log("LOCAL SETTING EVENT");
        setMakeEventList("");
        setMainTimeOut();
    }
}

function setInitSettingEnd(){

    if(parent.MAINPARENTCUSTOMCODE){
        /*
        var cmd_obj = { sect:"HIDE", type:"EVENT", id:"", code:"" };
        parent.setParentCmd(cmd_obj);
        */
    }
}

function setInitConfig(p_config,p_arr_event){
    var str_sday = "";
    var str_eday = "";
    var str_date = "";

    var i_sday = 0, i_eday = 0,i_date = 0;

    var date = new Date();

    var str_days = date.getFullYear() + "";
    if((date.getMonth()+1) < 10){
        str_days += "0" + (date.getMonth()+1) + "";
    }else{
        str_days += "" + (date.getMonth()+1) + "";
    }
    if(date.getDate() < 10){
        str_days += "0" + date.getDate();
    }else{
        str_days += "" + date.getDate();
    }
    
    i_date = parseInt(str_days);

    gl_conf_header = p_config;

    for(i = 0; i < p_arr_event.length; i++){

        str_sday = p_arr_event[i].SDAY + "";
        str_eday = p_arr_event[i].EDAY + "";
        i_sday = parseInt(str_sday);
        i_eday = parseInt(str_eday);

        //console.log("DATE , " + i_sday + " , " + i_eday + " , " + i_date);

        if(i_sday <= i_date && i_eday >= i_date){
            gl_arr_event_list.push(p_arr_event[i]);
        }
    }

    PAGEACTIVEYN = true;

    setMakeEventList("");
    setMainTimeOut();
}

function setInitConfigLang(p_lang){
    gl_jsop_lang_data = p_lang;
}

function setMainLang(p_lang){

    if(gl_main_conf.lang == p_lang) return;

    gl_main_conf.lang = p_lang;

    //다국어 추가 부분
    var str_attr = "";
    var str_lang = gl_main_conf.lang.toLowerCase();

    $(".lang_code_names").each(function(i){
        str_attr = $(".lang_code_names").eq(i).attr("lang_code");
        try{
            $(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][str_lang]);
        }catch(err){
            console.log("ERROR LANG EVENT : " + str_attr);
        }
    });

    $(".event_category span").removeClass("rectangle_ctg_active");
    $($(".event_category span")[0]).addClass("rectangle_ctg_active");

    setMakeEventList("");
}


function setMainReset(){
    if( PAGEACTIVEYN == true){
        return;
    }

    PAGEACTIVEYN = true;
}

function setMainStart(p_obj){

    gl_timer_auto = "AUTO";
    PAGEACTIVEYN = true;

    $(".event_category span").removeClass("rectangle_ctg_active");
    $($(".event_category span")[0]).addClass("rectangle_ctg_active");

    if(gl_cate_code != ""){
        gl_cate_code = "";
        setMakeEventList("");
    }

    setMainTimeOut();
}

function setMainStop(){
    gl_timer_auto = "NONE";
    if(PAGEACTIVEYN == false ){
        return;
    }
    PAGEACTIVEYN = false;
}

function setMakeEventList(p_cate){
    var i = 0;
    var i_cnt = 0;
    var obj;
    var str_html = "";

    for(i = 0; i < gl_arr_event_list.length; i++){
        obj = gl_arr_event_list[i];
        
        if(gl_main_conf.lang != obj.LANG) continue;

        if(p_cate != ""){
            if(obj.CATE_CODE != p_cate){
                continue;
            }
        }
        i_cnt++;
        str_html += "<div class=\"swiper-slide\" onClick=\"javascript:onClickInfoView('EVENT'," + obj.ID + ");\"><img src=\"" + obj.THUMB_FILE_URL + "\"></div>";
    }

    gl_list_conf.event_list_cnt = i_cnt;
    gl_list_conf.event_curr = 0;

    //console.log("setMakeEventList = " + str_html);

    $("#id_page_event_list > .swiper-wrapper").html(str_html);

    try{
        gl_siwper_event.update();
    }catch(err){

    }
    
    if(i_cnt == 0){
        $("#id_page_event_list .swiper-wrapper").hide();
        $("#id_event_no_list").show();
    }else{
        $("#id_page_event_list .swiper-wrapper").show();
        $("#id_event_no_list").hide();
    }
}


/////////////////////////////////////////////////
// CLICK EVENT
/////////////////////////////////////////////////

function onClickEventCate(p_obj){
    $(".event_category span").removeClass("rectangle_ctg_active");
    $(p_obj).addClass("rectangle_ctg_active");

    var str_code = $(p_obj).attr("code");

    gl_cate_code = str_code;

    gl_timer_auto = "NONE";

    setMakeEventList(str_code);
}

function onClickInfoView(p_type,p_id){

    var cmd_obj = { sect:"POPUP", type:"EVENT", id:"", code:"" };

    cmd_obj.id = p_id;

    gl_timer_auto = "NONE";

    if(parent.MAINPARENTCUSTOMCODE){
        parent.setParentCmd(cmd_obj);
    }
}

function onMouseDownList(p_obj,evt){
    gl_timer_auto = "NONE";
}



/////////////////////////////////////////////////
// FUNCTION 
/////////////////////////////////////////////////

function setMainTimeOut(){

    if( gl_timer_auto == "NONE" ) return;

    gl_timer_loop_cnt++;
    if((gl_timer_loop_cnt % 5) == 0){
        setNextSlide();
    }

    if(gl_timer_loop_cnt > 1000 ){
        gl_timer_loop_cnt = 0;
    }

    if(PAGEACTIVEYN == true){
        setTimeout(setMainTimeOut,1000);
    }
}


function setNextSlide(){
    
    gl_list_conf.event_curr++;
    if(gl_list_conf.event_curr >= (gl_list_conf.event_list_cnt)) gl_list_conf.event_curr = 0;

    gl_siwper_event.slideTo(gl_list_conf.event_curr);
}


/////////////////////////////////////////////////
// DEBUT
/////////////////////////////////////////////////

function onClickDebugLang(p_type){
    setMainLang(p_type);
}