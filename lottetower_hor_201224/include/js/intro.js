/******************************************
   name :  intro.js
   auth :  ELTOV
   date :  2020.11.08
   desc :  인트로 메인 자바스크립트
*******************************************/

var gl_arr_mnu_main_code = new Array("FLOOR","STORE","FOOD","RECOMMAND","EVENT","PARK","HELP","FACILITY");
var gl_arr_week_names = new Array("SUN","MON","TUE","WED","THU","FRI","SAT");
var gl_arr_lang_code = new Array("KOR","ENG","CHN","JPN");

var gl_siwper_event;

var gl_timer_loop_cnt = 0;
var gl_timer_auto = "EVENT";

var gl_notice_currtime = 0;
var gl_notice_ptime = 0;

var gl_list_conf = {
    event_list_cnt : 4,   // 이벤트 총수
    intro_list_cnt : 2,   // 인트로 총수
    event_curr : 0,
    intro_curr : 0,
};

var gl_main_conf = {
    lang:"KOR",
    speed:300,     // 팝업 속도
    close:1,
    weather_name:"",
    weather_code:"",
    weather_temp:"",
    name: "index"
};


/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////

function setInitSetting(){

    document.getElementById("id_page_event_list").addEventListener("touchstart",function(evt){ onMouseDownList(this,evt); },true );
    document.getElementById("id_page_event_list").addEventListener("mousedown",function(evt){ onMouseDownList(this,evt); },true );

    if(parent.MAINPARENTCUSTOMCODE){

    }else{
        console.log("LOCAL SETTING INTRO");
        setMakeIntroList();
        setMainTimeOut();
    }

    setInterval(setMainInterval,5000);
}

function setInitConfig(p_config,p_arr_notice){

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

    for(i = 0; i < p_arr_notice.length; i++){

        str_sday = p_arr_notice[i].SDAY + "";
        str_eday = p_arr_notice[i].EDAY + "";
        i_sday = parseInt(str_sday);
        i_eday = parseInt(str_eday);

        //console.log("NOTICE DATE , " + i_sday + " , " + i_eday + " , " + i_date);

        if(i_sday <= i_date && i_eday >= i_date){
            gl_arr_notice_list.push(p_arr_notice[i]);
        }
    }

    /*
    for(i = 0; i < p_arr_notice.length; i++){
        gl_arr_notice_list.push(p_arr_notice[i]);
    }
    */

    PAGEACTIVEYN = true;

    if(gl_conf_header.KIOSK_SECT == "SHPM"){
        $(".bottom_logo_box > img").attr("src", "./images/logo_bottom_mall.png");
    }else if(gl_conf_header.KIOSK_SECT == "TWER"){
        $(".bottom_logo_box > img").attr("src", "./images/logo_bottom_tower.png");
    }else if(gl_conf_header.KIOSK_SECT == "AVNL"){
        $(".bottom_logo_box > img").attr("src", "./images/logo_bottom_avenuel.png");
    }

    setMakeIntroList();
    setMainTimeOut();
}


function setInitConfigLang(p_lang){
    gl_jsop_lang_data = p_lang;
}


function setMainInterval(){
    var str_hours = "";
    var str_days = "";
    var str_ampm = "";
    var i_hours = 0;
    var date = new Date();

    str_hours = "";

    i_hours = date.getHours();

    if(i_hours < 12){
        str_ampm = "AM";
    }else{
        str_ampm = "PM";
    }

    if(i_hours > 12){
        i_hours = i_hours - 12;
    }
    if(i_hours < 10){
        str_hours = "" + i_hours + ":";
    }else{
        str_hours = "" + i_hours + ":";
    }
    if(date.getMinutes() < 10){
        str_hours += "0" + date.getMinutes();
    }else{
        str_hours += "" + date.getMinutes();
    }

    $("#id_time_box_hour").html(str_ampm + " " + str_hours);

    str_days = date.getFullYear() + ".";
    if((date.getMonth()+1) < 10){
        str_days += "0" + (date.getMonth()+1) + ".";
    }else{
        str_days += "" + (date.getMonth()+1) + ".";
    }
    if(date.getDate() < 10){
        str_days += "0" + date.getDate();
    }else{
        str_days += "" + date.getDate();
    }

    str_days += " " + gl_arr_week_names[date.getDay()];

    $("#id_time_box_day").html(str_days);
}

function setMainLang(p_lang){
    var i  = 0;
    var str_code = "";
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
            console.log("ERROR LANG INTRO : " + str_attr);
        }
    });

    for(i = 0; i < gl_arr_mnu_main_code.length; i++){
        str_code = gl_arr_mnu_main_code[i].toLowerCase();
        $("#id_mnu_icon_" + str_code + " > img").attr("src","./images/index_mnu_" + str_code + "_txt_" + str_lang + ".svg");
    }

    try{
        var str_weather_name = gl_jsop_lang_data[gl_main_conf.name][gl_main_conf.weather_code][str_lang];
        $("#id_weather_name").html(str_weather_name);
    }catch(err){
        console.log(err);
    }
}


function setMainStart(p_obj){

    PAGEACTIVEYN = true;

    if(gl_timer_auto == "NONE"){

        PAGEACTIVEYN = true;

        gl_timer_auto = "EVENT";

        gl_list_conf.event_curr = 0;
        gl_list_conf.intro_curr = 0;
        gl_timer_loop_cnt = 0;

        $("#id_page_intro_list").hide();
        $("#id_page_event_list").show();

        $(".bottom_gnb_list > li").removeClass("gnb_box_active");

        try{
            $("#id_notice_contents_00").children("video")[0].pause();
            $("#id_notice_contents_01").children("video")[0].pause();
        }catch(err){

        }
        setMainTimeOut();
    }
}


function setMainStop(){

    if(PAGEACTIVEYN == false ){
        return;
    }
    
    gl_timer_auto = "NONE";

    try{
        $("#id_notice_contents_00").children("video")[0].pause();
        $("#id_notice_contents_01").children("video")[0].pause();
    }catch(err){

    }

    PAGEACTIVEYN = false;
}


function setMakeIntroList(){
    var i = 0;
    var obj;
    var str_html = "";

    for(i = 0; i < gl_arr_notice_list.length; i++){
        obj = gl_arr_notice_list[i];
        if(obj.TYPE == "IMG"){
            gl_arr_notice_img_list.push(obj);
        }else if(obj.TYPE == "MOV"){
            gl_arr_notice_mov_list.push(obj);
        }
    }

    gl_list_conf.event_list_cnt = gl_arr_notice_img_list.length;
    gl_list_conf.intro_list_cnt = gl_arr_notice_mov_list.length;

    for(i = 0; i < gl_arr_notice_img_list.length; i++){
        obj = gl_arr_notice_img_list[i];
        str_html += "<div class=\"swiper-slide\" onClick=\"javascript:onClickInfoView('EVENT','" + obj.EVENT_ID + "');\"><img src=\"" + obj.FILE_URL + "\"></div>";
    }

    $("#id_page_event_list > .swiper-wrapper").html(str_html);

    gl_timer_auto = "EVENT";

    gl_siwper_event = new Swiper("#id_page_event_list",{
        slidesPerView: 'auto',
        spaceBetween: 30, 
        loop:true
    });
}



function setMakeWeather(p_data){

    var str_icon = "";
    var str_weather_name = "";

    // 맑음,구름 많음,흐림,비,비/눈,눈,소나기,빗방울,진눈개비,눈날림

    var str_lang = gl_main_conf.lang.toLowerCase();

    try{
        //console.log("p_datap_data = " + p_data);
        var json_obj = JSON.parse(p_data);

        if(json_obj.ret_code == "SUCC"){

            gl_main_conf.weather_name = json_obj.name + "";
            gl_main_conf.weather_temp = json_obj.temp + "";

            var str_name = json_obj.name + "";
            if(str_name == "맑음"){
                gl_main_conf.weather_code = "WEATHER_01";
                str_weather_name = gl_jsop_lang_data[gl_main_conf.name]["WEATHER_01"][str_lang];
                $("#id_weather_icon").attr("src","./images/ico_weather01.png");
                $("#id_weather_icon").show();
            }else if(str_name == "구름 많음" || str_name == "흐림"){
                gl_main_conf.weather_code = "WEATHER_02";
                str_weather_name = gl_jsop_lang_data[gl_main_conf.name]["WEATHER_02"][str_lang];
                $("#id_weather_icon").attr("src","./images/ico_weather03.png");
                $("#id_weather_icon").show();
            }else if(str_name == "비" || str_name == "비/눈" || str_name == "소나기" || str_name == "빗방울" ){
                gl_main_conf.weather_code = "WEATHER_03";
                str_weather_name = gl_jsop_lang_data[gl_main_conf.name]["WEATHER_03"][str_lang];
                $("#id_weather_icon").attr("src","./images/ico_weather04.png");
                $("#id_weather_icon").show();
            }else if(str_name == "눈" || str_name == "진눈개비" || str_name == "눈날림"){
                gl_main_conf.weather_code = "WEATHER_04";
                str_weather_name = gl_jsop_lang_data[gl_main_conf.name]["WEATHER_04"][str_lang];
                $("#id_weather_icon").attr("src","./images/ico_weather05.png");
                $("#id_weather_icon").show();
            }else{
                str_weather_name = "";
                $("#id_weather_icon").hide();
            }
            $("#id_weather_temp").html(json_obj.temp + "℃");
            $("#id_weather_name").html(str_weather_name);
        }
    }catch(err){
        console.log(err);
    }
}



function setMakeWeather_OLD(p_data){

    // 맑음,구름 많음,흐림,비,비/눈,눈,소나기,빗방울,진눈개비,눈날림
    try{
        //console.log("p_datap_data = " + p_data);
        var json_obj = JSON.parse(p_data);

        if(json_obj.ret_code == "SUCC"){
            var str_name = json_obj.name + "";
            if(str_name == "맑음"){
                $("#id_weather_icon").attr("src","./images/ico_weather01.png");
            }else if(str_name == "구름 많음"){
                $("#id_weather_icon").attr("src","./images/ico_weather02.png");
            }else if(str_name == "흐림"){
                $("#id_weather_icon").attr("src","./images/ico_weather03.png");
            }else if(str_name == "비" || str_name == "비/눈" || str_name == "소나기" || str_name == "빗방울" ){
                $("#id_weather_icon").attr("src","./images/ico_weather04.png");
            }else if(str_name == "눈" || str_name == "진눈개비" || str_name == "눈날림"){
                $("#id_weather_icon").attr("src","./images/ico_weather05.png");
            }
            $("#id_weather_temp").html(json_obj.temp + "℃");
            $("#id_weather_name").html(str_name);
        }
    }catch(err){
        console.log(err);
    }
}

/////////////////////////////////////////////////
// CLICK EVENT
/////////////////////////////////////////////////

function onClickInfoView(p_type,p_id){
    if(p_id == "") return;
    var cmd_obj = { sect:"POPUP", type:"EVENT", id:"", code:"" };
    gl_timer_auto = "NONE";
    cmd_obj.id = p_id;

    if(parent.MAINPARENTCUSTOMCODE){
        parent.setParentCmd(cmd_obj);
    }
}


function onClickBottomMnu(p_mnu){
    var i = 0;
    var str_code = "";

    for(i = 0; i < gl_arr_mnu_main_code.length; i++){
        str_code = gl_arr_mnu_main_code[i].toLowerCase();
        if(p_mnu == gl_arr_mnu_main_code[i]){
            $("#id_btn_botom_mnu_" + str_code).addClass("gnb_box_active");
        }else{
            $("#id_btn_botom_mnu_" + str_code).removeClass("gnb_box_active");
        }
    }

    if(parent.MAINPARENTCUSTOMCODE){
        var obj = {};
        parent.setMainViewOpen(p_mnu,obj);
    }
}

function onMouseDownList(p_obj,evt){
    gl_timer_auto = "NONE";
}

function onClickBottomLang(p_lang){

    var i = 0;
    var str_code = "";

    for(i = 0; i < gl_arr_lang_code.length; i++){
        str_code = gl_arr_lang_code[i].toLowerCase();
        if(p_lang == gl_arr_lang_code[i]){
            $("#id_btn_lang_" + str_code).addClass("lang_active");
        }else{
            $("#id_btn_lang_" + str_code).removeClass("lang_active");
        }
    }
    if(parent.MAINPARENTCUSTOMCODE){
        parent.onClickBottomLang(p_lang);
    }
}



/////////////////////////////////////////////////
// FUNCTION 
/////////////////////////////////////////////////

function setMainTimeOut(){

    if(gl_timer_auto == "NONE") return;

    if(gl_timer_auto == "EVENT"){
        gl_timer_loop_cnt++;

        if((gl_timer_loop_cnt % 10) == 0){   // 3초
            setNextSlide();
        }

        if(gl_timer_loop_cnt > 1000 ){
            gl_timer_loop_cnt = 0;
        }
    }else if(gl_timer_auto == "NOTICE"){

        var curr_time = new Date().getTime();
        curr_time = Math.floor(curr_time - gl_notice_currtime)/1000;
        if(curr_time > gl_notice_ptime){
            setNextNotice();
        }
    }

    if(PAGEACTIVEYN == true){
        setTimeout(setMainTimeOut,500);
    }
}


function setNextSlide(){
    
    gl_list_conf.event_curr++;
    if(gl_list_conf.event_curr >= (gl_list_conf.event_list_cnt-0)){
        // 이벤트가 모두 완료 뇌면 인트로가 나온다.
        $("#id_page_intro_list").fadeIn(500);
        $("#id_page_event_list").fadeOut(500);
        gl_timer_auto = "NOTICE";
        gl_list_conf.event_curr = 0;
        gl_list_conf.intro_curr = 0;
        setNextNotice();
    }else{
        // 이벤트가 모두 슬라이드 될때 까지 처리
        console.log("setNextSlidesetNextSlidesetNextSlide");
        gl_siwper_event.slideNext();
    }
}


function setNextNotice(){
    var obj;
    var str_show = "",str_hide = "";

    console.log("setNextNoticesetNextNotice");

    if(gl_list_conf.intro_curr >= (gl_list_conf.intro_list_cnt-0)){
        // 공지사항이 모두 완료 되면
        $("#id_page_intro_list").fadeOut(500);
        $("#id_page_event_list").fadeIn(500);
        gl_timer_auto = "EVENT";
        gl_list_conf.event_curr = 0;
        gl_list_conf.intro_curr = 0;
        //gl_siwper_event.slideTo(0);
        return;
    }

    obj = gl_arr_notice_mov_list[gl_list_conf.intro_curr];

    gl_notice_ptime = obj.PTIME;
    if(gl_notice_ptime < 5) gl_notice_ptime = 5;

    if((gl_list_conf.intro_curr % 2) == 0){
        str_show = "id_notice_contents_00";
        str_hide = "id_notice_contents_01";
        document.getElementById("id_notice_contents_00").style.zIndex = 1;
        document.getElementById("id_notice_contents_01").style.zIndex = 10;
    }else{
        str_show = "id_notice_contents_01";
        str_hide = "id_notice_contents_00";
        document.getElementById("id_notice_contents_00").style.zIndex = 10;
        document.getElementById("id_notice_contents_01").style.zIndex = 1;
    }

    if(obj.TYPE == "IMG"){
        $("#" + str_show + " > img").attr("src",obj.FILE_URL);
        $("#" + str_show + " > video").hide();
        $("#" + str_show).children("video")[0].pause();
        $("#" + str_show + " > img").show();
    }else{
        $("#" + str_show + " > video").attr("src",obj.FILE_URL);
        $("#" + str_show + " > video").show();
        $("#" + str_show + " > img").hide();
        $("#" + str_show).children("video")[0].play();
    }

    $("#" + str_show).fadeIn(500);
    $("#" + str_hide).fadeOut(500);

    gl_notice_currtime = new Date().getTime();

    gl_list_conf.intro_curr++;

}







/////////////////////////////////////////////////
// DEBUT
/////////////////////////////////////////////////

function onClickDebug01(){
    console.log("onClickDebug01");
    setNextNotice();
}