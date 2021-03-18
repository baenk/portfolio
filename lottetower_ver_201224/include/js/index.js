/******************************************
   name :  index.js
   auth :  ELTOV
   date :  2020.11.08
   desc :  메인 자바스크립트
*******************************************/


// 기본 DEFINE 메뉴 코드 
var gl_arr_mnu_main_code = new Array("FLOOR","STORE","FOOD","RECOMMAND","EVENT","PARK","HELP","FACILITY");
var gl_arr_mnu_statics_code = new Array("FLO","STR","FNG","REC","EVT","PAK","OPT","PUB");

// 언어 코드 4개국어
var gl_arr_lang_code = new Array("KOR","ENG","CHN","JPN");

var gl_main_conf = {
    lang:"KOR",
    speed:300,     // 팝업 속도
    close:1,
    time_last:0,
    system_last:0,
    weather_last:0,
    name: "index"
};

var gl_siwper_popup_store;   // 매장용 스위퍼

// 최초 언어 세팅
function setInitSettingLang(){
    setLoadContents("./xml/kiosk_contents.xml");
}

// 최초 세팅
function setInitSetting(){
    var i = 0;
    var obj;
    var str_code = "";

    gl_main_conf.time_last = new Date().getTime();
    gl_main_conf.system_last = new Date().getTime();
    gl_main_conf.weather_last = new Date().getTime();

    // 한글 세팅을 하자.
    for(i = 0; i < gl_arr_store_list.length; i++){
        obj = gl_arr_store_list[i];
        var remove_kor = getCvtRemoveWhite(obj.STORE_NAME_KOR);
        var arr_dis = Hangul.disassemble(remove_kor, true);

        if(Array.isArray(arr_dis) == true){
            var cho = arr_dis.reduce(function (prev, elem) {
                elem = elem[0] ? elem[0] : elem;
                return prev + elem;
            }, "");

            cho = cho.replace(/ㄲ/gi,"ㄱ");
            cho = cho.replace(/ㅉ/gi,"ㅈ");
            cho = cho.replace(/ㅃ/gi,"ㅂ");
            cho = cho.replace(/ㄸ/gi,"ㄷ");
            cho = cho.replace(/ㅆ/gi,"ㅅ");
            
            obj.STORE_NAME_CHO = cho;
        }
    }

    if(gl_conf_header.KIOSK_SECT == "SHPM"){
        $(".bottom_logo_box > img").attr("src", "images/logo_bottom_mall.png");
    }else if(gl_conf_header.KIOSK_SECT == "TWER"){
        $(".bottom_logo_box > img").attr("src", "images/logo_bottom_tower.png");
    }else if(gl_conf_header.KIOSK_SECT == "AVNL"){
        $(".bottom_logo_box > img").attr("src", "images/logo_bottom_avenuel.png");
    }else if(gl_conf_header.KIOSK_SECT == "DUFS"){
        $(".bottom_logo_box > img").attr("src", "images/logo_bottom_dufs.png");
    }

    gl_siwper_popup_store = new Swiper("#id_popup_store_swiper",{
        spaceBetween:16,
        pagination:{
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    /*
    for(i = 0; i < gl_arr_mnu_main_code.length; i++){
        str_code = gl_arr_mnu_main_code[i].toLowerCase();
        if(str_code == "floor") continue;
        if(str_code == "recommand") continue;
        if(str_code == "event") continue;
        $("#id_main_frame_" + str_code).hide();
    }
    */

    if( typeof(document["frame_intro"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig INTRO");
        document["frame_intro"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_intro"].setInitConfig(gl_conf_header,gl_arr_notice_list);
    }

    /*
    if( typeof(document["frame_floor"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig FLOOR");
        document["frame_floor"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_floor"].setInitConfig(gl_conf_header,gl_arr_store_list,gl_arr_facility_list);
    }
    */

    if( typeof(document["frame_store"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig STORE");
        document["frame_store"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_store"].setInitConfig(gl_conf_header,gl_arr_store_list);
    }

    if( typeof(document["frame_food"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig FOOD");
        document["frame_food"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_food"].setInitConfig(gl_conf_header,gl_arr_store_list);
    }

    if( typeof(document["frame_recommand"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig RECOMMAND");
        document["frame_recommand"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_recommand"].setInitConfig(gl_conf_header,gl_arr_store_list,gl_arr_recommand_list);
    }

    if( typeof(document["frame_event"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig EVENT");
        document["frame_event"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_event"].setInitConfig(gl_conf_header,gl_arr_event_list);
    }

    if( typeof(document["frame_park"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig PARK");
        document["frame_park"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_park"].setInitConfig(gl_conf_header,gl_arr_park_list);
    }

    if( typeof(document["frame_help"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig HELP");
        document["frame_help"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_help"].setInitConfig(gl_conf_header,gl_arr_help_list);
    }

    if( typeof(document["frame_facility"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig FACILITY");
        document["frame_facility"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_facility"].setInitConfig(gl_conf_header,gl_arr_facility_list);
    }

    setTimeout(setInitSettingEnd,5500);
}

function setInitSettingEnd(){

    if( typeof(document["frame_floor"].PAGEACTIVEYN) != 'undefined'){
        console.log("setInitConfig FLOOR");
        document["frame_floor"].setInitConfigLang(gl_jsop_lang_data);
        document["frame_floor"].setInitConfig(gl_conf_header,gl_arr_store_list,gl_arr_facility_list);
    }

    setTimeout(setInitSettingEnd02,6500);
}


function setInitSettingEnd02(){

    var str_iframe = $("iframe").contents();

    $("#id_main_init_loading").remove();

    $("html").mousedown(function( evt ) {
        gl_main_conf.time_last = new Date().getTime();
    });
    
    //iframe 클릭 감지
    $(str_iframe).click(function () { 
        gl_main_conf.time_last = new Date().getTime();
    });

    getLoadWeahter();
    setInterval(setMainInterval,2000);
}

// 메인인터벌
function setMainInterval(){

    var time_gap = 0;
    var time_curr = new Date().getTime();

    time_gap = time_curr - gl_main_conf.time_last;
    time_gap = Math.floor(time_gap / 1000);

    if(time_gap > 120){
        
        gl_main_conf.time_last = time_curr;

        onClickBottomLang("KOR");
        var obj = {};
        if( typeof(document["frame_intro"].setMainStart) == 'function'){
            document["frame_intro"].setMainStart(obj);
        }

        $("#id_page_block_white").hide();
        $("#id_popup_bg").hide();
        $("#id_popup_store").hide();
        $("#id_popup_event").hide();
        $("#id_popup_facility").hide();
        $("#id_popup_error").hide();

        $("#id_main_frame_intro").show();

        setMainViewOpen("",obj);

        if( typeof(document["frame_floor"].setMainMapCheck) == 'function'){
            var is_load = document["frame_floor"].setMainMapCheck();
            if(is_load != true){
                var str_html_reload = "<iframe name=\"frame_floor\" src=\"floor.html?reload_yn=RELOAD\"></iframe>";
                $("#id_main_frame_floor").html(str_html_reload);
                console.log("str_html_reloadstr_html_reloadstr_html_reload");
            }
        }

    }

    time_gap = time_curr - gl_main_conf.system_last;
    time_gap = Math.floor(time_gap / 1000);

    if(time_gap > 60){
        gl_main_conf.system_last = time_curr;
        setCallWebToApp("STATUS","STATUS");
    }

    time_gap = time_curr - gl_main_conf.weather_last;
    time_gap = Math.floor(time_gap / 1000);

    if(time_gap > 3600){
        gl_main_conf.weather_last = time_curr;
        getLoadWeahter();
    }
}

function setMainLang(p_lang){

    gl_main_conf.lang = p_lang;

    //다국어 추가 부분
    var str_attr ="" 
    var str_lang = gl_main_conf.lang.toLowerCase();

    $(".lang_code_names").each(function(i){
        str_attr = $(".lang_code_names").eq(i).attr("lang_code");
        try{
            $(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][str_lang]);
        }catch(err){
            console.log("ERROR LANG : " + str_attr);
        }
    });

    for(i = 0; i < gl_arr_mnu_main_code.length; i++){
        str_code = gl_arr_mnu_main_code[i].toLowerCase();
        $("#id_mnu_icon_" + str_code + " > img").attr("src","images/index_mnu_" + str_code + "_txt_" + str_lang + ".svg");
    }

    if( typeof(document["frame_intro"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang INTRO");
        document["frame_intro"].setMainLang(p_lang);
    }

    if( typeof(document["frame_floor"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang FLOOR");
        document["frame_floor"].setMainLang(p_lang);
    }

    if( typeof(document["frame_store"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang STORE");
        document["frame_store"].setMainLang(p_lang);
    }

    if( typeof(document["frame_food"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang FOOD");
        document["frame_food"].setMainLang(p_lang);
    }

    if( typeof(document["frame_recommand"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang RECOMMAND");
        document["frame_recommand"].setMainLang(p_lang);
    }

    if( typeof(document["frame_event"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang EVENT");
        document["frame_event"].setMainLang(p_lang);
    }

    if( typeof(document["frame_park"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang PARK");
        document["frame_park"].setMainLang(p_lang);
    }

    if( typeof(document["frame_help"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang HELP");
        document["frame_help"].setMainLang(p_lang);
    }

    if( typeof(document["frame_facility"].PAGEACTIVEYN) != 'undefined'){
        console.log("setMainLang FACILITY");
        document["frame_facility"].setMainLang(p_lang);
    }
    
    //btn 건물 종류
    $(".rectangle_shop").each(function(i){
        
        try{
            if( $(".rectangle_shop").eq(i).attr("build_code") === "TWER" ){
                $(this).children("p:first-child").html(gl_jsop_lang_data.store.STORE_BTN_TOWER[str_lang]);
            }
            if($(".rectangle_shop").eq(i).attr("build_code") === "SHPM"){
                $(this).children("p:first-child").html(gl_jsop_lang_data.store.STORE_BTN_MALL[str_lang]);
            }
            if($(".rectangle_shop").eq(i).attr("build_code") === "AVNL"){
                $(this).children("p:first-child").html(gl_jsop_lang_data.store.STORE_BTN_AVENUEL[str_lang]);
            }
        }catch(err){
            console.log("ERROR BTN STORE : " + str_attr);
        }
    });
}



/////////////////////////////////////////////////
// IFRAME과 통신
/////////////////////////////////////////////////

function setParentCmd(p_obj){
    
    var str_html = "";

    if(p_obj.sect == "POPUP"){
        if(p_obj.type == "STORE"){

            setMakeInfoPopUpStore(p_obj.id);

        }else if(p_obj.type == "EVENT"){

            setMakeInfoPopUpEvent(p_obj.id);

        }else if(p_obj.type == "FACILITY"){

            setMakeInfoPopUpFacility(p_obj.id,p_obj.code);

        }else if(p_obj.type == "ERROR"){ 
            
            setMakeInfoPopUpError(p_obj);
        }

    }else if(p_obj.sect == "FLOORMOVE"){
        if(p_obj.type == "PHOTOSPOT"){   // 추천매장 포토스팟
            setMainViewOpen("FLOOR",p_obj);
        }
    }else if(p_obj.sect == "WAYFIND"){
        if(p_obj.type == "PARK"){   // 주차장 찾기
            setMainViewOpen("FLOOR",p_obj);
        }
    }else if(p_obj.sect == "STATICS"){

        setStatisSend(p_obj);

    }else if(p_obj.sect == "HIDE"){
        str_html = p_obj.type;
        str_html = str_html.toLowerCase();
        $("#id_main_frame_" + str_html).hide();
        console.log("setParentCmd HIDE");
    }
}

/////////////////////////////////////////////////
// CLICK EVENT
/////////////////////////////////////////////////

function onClickBottomMnu(p_mnu){
    var obj = {};
    setMainViewOpen(p_mnu,obj);
}

function onClickBottomLogo(){

    var time_curr = new Date().getTime();

    gl_main_conf.time_last = time_curr;

    var obj = {};
    if( typeof(document["frame_intro"].setMainStart) == 'function'){
        document["frame_intro"].setMainStart(obj);
    }

    $("#id_popup_bg").hide();
    $("#id_popup_store").hide();
    $("#id_popup_event").hide();
    $("#id_popup_facility").hide();
    $("#id_popup_error").hide();

    $("#id_main_frame_intro").show();

    setMainViewOpen("",obj);
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
    setMainLang(p_lang);
}

function onClickPopupClose(p_type){

    if(p_type == "STORE"){

        $("#id_popup_bg").fadeOut(gl_main_conf.speed);
        $("#id_popup_store").fadeOut(gl_main_conf.speed);

    }else if(p_type == "EVENT"){

        $("#id_popup_bg").fadeOut(gl_main_conf.speed);
        $("#id_popup_event").fadeOut(gl_main_conf.speed);

    }else if(p_type == "FACILITY"){

        $("#id_popup_bg").fadeOut(gl_main_conf.speed);
        $("#id_popup_facility").fadeOut(gl_main_conf.speed);

    }else if(p_type == "ERROR"){

        $("#id_popup_bg").fadeOut(gl_main_conf.speed);
        $("#id_popup_error").fadeOut(gl_main_conf.speed);

    }
}


function onClickWayFinding(){
    // 팝업을 내리고
    onClickPopupClose("STORE");
    var way_obj = {};
    setMainViewOpen("FLOOR",way_obj);
}


// 이벤트에서 스토어 위치 안내를 할경우
function onClickPopUpWayFind(p_type,p_id){

    var way_obj = { sect:"WAYFIND", type:p_type, id:"", code:"", floor:"", pos_x:"", pos_y:""};

    if(p_type == "EVENT"){

        var store_obj = getInfoStore(p_id);
        way_obj.type = "STORE";
        way_obj.floor = store_obj.STORE_FLOOR;
        way_obj.id = store_obj.ID;
        onClickPopupClose("EVENT");

    }else if(p_type == "STORE"){

        var store_obj = getInfoStore(p_id);
        way_obj.floor = store_obj.STORE_FLOOR;
        way_obj.id = store_obj.ID;
        onClickPopupClose("STORE");

    }else if(p_type == "FACILITY"){

        var facility_obj = getInfoFacility(p_id);
        way_obj.floor = facility_obj.PUB_FLOOR;
        way_obj.id = facility_obj.ID;

        onClickPopupClose("FACILITY");
    }

    setMainViewOpen("FLOOR",way_obj);
}




///////////////////////////////////////////////
// 화면전환
function setMainViewOpen(p_mnu,p_obj){
    var i = 0;
    var str_code = "";
    var str_statics = "";

    for(i = 0; i < gl_arr_mnu_main_code.length; i++){
        str_code = gl_arr_mnu_main_code[i].toLowerCase();
        if(p_mnu == gl_arr_mnu_main_code[i]){
            $("#id_btn_botom_mnu_" + str_code).addClass("gnb_box_active");
            if( typeof(document["frame_" + str_code].setMainStart) == 'function'){
                document["frame_" + str_code].setMainStart(p_obj);

                str_statics = gl_arr_mnu_statics_code[i];
                var statics_obj = {"sect":"MENU","code":str_statics}
                setStatisSend(statics_obj);

            }

            var statics_obj = { main_code:"MENU", menu_code:str_code,store_id:"", event_id:""};
            setLoadStatics(statics_obj);
            $("#id_main_frame_" + str_code).show();

        }else{
            $("#id_btn_botom_mnu_" + str_code).removeClass("gnb_box_active");
            if( typeof(document["frame_" + str_code].setMainStop) == 'function'){
                document["frame_" + str_code].setMainStop();
            }
            if(str_code != "floor"){
                //$("#id_main_frame_" + str_code).fadeOut(gl_main_conf.speed);
                $("#id_main_frame_" + str_code).hide();
            }
        }
    }
    if(p_mnu != ""){
        if( typeof(document["frame_intro"].setMainStop) == 'function'){
            document["frame_intro"].setMainStop();
        }
        $("#id_main_frame_intro").fadeOut(gl_main_conf.speed);
    }
}


function setStatisSend(p_obj){

    var str_statics = "";

    if(p_obj.sect == "MENU"){
        str_statics = "MENU|" + p_obj.code;
    }else if(p_obj.sect == "STORE"){
        str_statics = "STORE|" + p_obj.code;
    }else if(p_obj.sect == "EVENT"){
        str_statics = "EVENT|" + p_obj.code;
    }else if(p_obj.sect == "PUBLIC"){
        str_statics = "PUBLIC|" + p_obj.code;
    }

    setCallWebToApp("BIG_DATA",str_statics);
}



///////////////////////////////////////////////
//  팝업 처리를 해야 한다.


// 매장 팝업
function setMakeInfoPopUpStore(p_id){
    var i = 0, j = 0, i_found = 0;
    var obj;
    var str_html = "", str_html_swiper = "";
    
    //다국어
    var str_lang = gl_main_conf.lang.toLowerCase();
    var store_name = "STORE_NAME_" + gl_main_conf.lang;
    var store_desc = "STORE_DESC_" + gl_main_conf.lang;
    var store_menu = "STORE_MENU_" + gl_main_conf.lang;
    var store_hours = "STORE_HOURS_" + gl_main_conf.lang;
    var store_phone = "STORE_PHONE";
    
    var statics_obj = {"sect":"STORE","code":p_id}
    setStatisSend(statics_obj);


    console.log("setMakeInfoPopUpStore = " + p_id);

    for(i = 0; i < gl_arr_store_list.length && i < 3000; i++){
        obj = gl_arr_store_list[i];

        if(p_id == obj.ID){
            i_found = 1;

            if(obj.TYPE == "STORE"){
                str_img = obj.STORE_MAIN_URL;
                if(str_img != ""){
                    str_img = "/" + str_img;
                    str_html_swiper += "<div class=\"swiper-slide\"><img src=\"" + str_img + "\"></div>";
                }
            }

            if(obj.STORE_SUB_URL.length > 0){
                for(j = 0; j < obj.STORE_SUB_URL.length; j++){
                    str_img = obj.STORE_SUB_URL[j];
                    if(str_img == ""){ str_img = "images/img_default_pop_store.png";
                    }else{ str_img = "/" + str_img; }
                    str_html_swiper += "<div class=\"swiper-slide\"><img src=\"" + str_img + "\"></div>";
                }
            }

            if(obj.TYPE == "FOOD"){
                str_img = obj.STORE_MAIN_URL;
                if(str_img != ""){
                    str_img = "/" + str_img;
                    str_html_swiper += "<div class=\"swiper-slide\"><img src=\"" + str_img + "\"></div>";
                }
            }

            $("#id_popup_store_swiper > .swiper-wrapper").html(str_html_swiper);

            gl_siwper_popup_store.update();
            
            gl_siwper_popup_store.slideTo(0);
            
            
            //TWER/SHPM/AVNL    수정201215    avenuel만 제대로 안나오는 버그, xml에서 임의로 building 부분만 수정해서 그런것으로 추정
            if(obj.BUILDING == "TWER"){
                str_html += "    <span class=\"rectangle_shop rectangle_tower\" build_code=\"TWER\"><p>" + gl_jsop_lang_data.store.STORE_BTN_TOWER[str_lang] + "</p><p>" + obj.STORE_FLOOR + "</p></span>";
            }
            if(obj.BUILDING == "SHPM"){
                str_html += "    <span class=\"rectangle_shop rectangle_mall\" build_code=\"SHPM\"><p>" + gl_jsop_lang_data.store.STORE_BTN_MALL[str_lang] + "</p><p>" + obj.STORE_FLOOR + "</p></span>";
            }
            if(obj.BUILDING == "AVNL"){
                str_html += "    <span class=\"rectangle_shop rectangle_avenuel\" build_code=\"AVNL\"><p>" + gl_jsop_lang_data.store.STORE_BTN_AVENUEL[str_lang] + "</p><p>" + obj.STORE_FLOOR + "</p></span>";
            }

            $("#id_popup_store .txt_shop_location").html(str_html);
            
            if( store_name != undefined && store_desc != undefined){
                $("#id_popup_store .txt_name_title").html(obj[store_name]);
                $("#id_popup_store .txt_name_description").html(obj[store_desc]);    
            }
            if( store_hours != undefined && store_phone != undefined){
                $("#id_popup_store .txt_name_service_time").html(obj[store_hours]);
                $("#id_popup_store .txt_name_phone").html(obj[store_phone]);    
            }
            
            if(obj.TYPE == "STORE"){
                $("#id_popup_store .pop_detail hr").hide();
                $("#id_popup_store .pop_detail_info_box").css({"height":"300px"});
                $("#id_popup_store .pop_detail_info_mnu .txt").html("");
                $("#id_popup_store .pop_detail_info_mnu").hide();
            }else{
                $("#id_popup_store .pop_detail hr").show();
                $("#id_popup_store .pop_detail_info_box").css({"height":"177px"});
                $("#id_popup_store .pop_detail_info_mnu .txt").html(obj[store_menu]);
                $("#id_popup_store .pop_detail_info_mnu").show();
            }

            $("#id_popup_store_btn_loc").html("<span class=\"rectangle_loc pop_btn_loc\" onClick=\"javascript:onClickPopUpWayFind('STORE','" + obj.ID + "');\"><img src=\"images/pop_location_btn01.svg\"><p>"+  gl_jsop_lang_data.index.POP_GUIDE[str_lang] +"</p></span>");

            break;
        }
    }

    if(i_found == 1){
        $("#id_popup_bg").fadeIn(gl_main_conf.speed);
        $("#id_popup_store").fadeIn(gl_main_conf.speed);
        //$("#id_popup_store").addClass('popup_animate_show');
    }
}


function setMakeInfoPopUpEvent(p_id){
    var i = 0, j = 0, i_found = 0;
    var obj;
    var store_obj;
    var str_tmp = "";
    var str_tmp2 = "";
    var str_html = "";
    var str_disp_time = "";

    var str_lang = gl_main_conf.lang.toLowerCase();
    
    var event_name = "EVENT_NAME_" + gl_main_conf.lang;    
    var store_name = "STORE_NAME_" + gl_main_conf.lang;
    
    //위치
    var str_loc = gl_jsop_lang_data.index.POP_LOC[str_lang];

    for(i = 0; i < gl_arr_event_list.length && i < 3000; i++){
        obj = gl_arr_event_list[i];

        if(p_id == obj.ID){
            i_found = 1;

            var statics_obj = {"sect":"EVENT","code":p_id}
            setStatisSend(statics_obj);

            $("#id_popup_event_top_img .top_img > img").attr("src",obj.MAIN_FILE_URL);
            $("#id_popup_event_top_img .top_img").scrollTop(0);

            // 이름
            $("#id_popup_event .txt_name_title").html(obj[event_name]);

            // 기간
            str_tmp = obj.EDAY + "";
            if(str_tmp.length >= 8){
                if(str_tmp.indexOf("9999") == 0){
                    str_disp_time = obj.EVENT_TIME + "";
                }
            }

            if(str_disp_time == ""){
                str_tmp = obj.SDAY + "";
                str_tmp2 = obj.EDAY + "";
                if(str_tmp.length == 8 && str_tmp2.length == 8){
                    str_disp_time = str_tmp.substring(0,4) + "-" + str_tmp.substring(4,6) + "-" + str_tmp.substring(6,8);
                    str_disp_time += " ~ " + str_tmp2.substring(0,4) + "-" + str_tmp2.substring(4,6) + "-" + str_tmp2.substring(6,8);
                }
            }

            $("#id_popup_event .txt_name_service_time").html(str_disp_time);
            
            // 위치
            str_html = "";
            if(obj.EVENT_PLACE != ""){
                str_html += " <li class=\"event_loc_info\">";
                str_html += "   <div>";
                str_html += "     <p class=\"left_title\">" + str_loc + "</p>";
                str_html += "     <p class=\"right_title\">" + obj.EVENT_PLACE + "</p>";
                str_html += "   </div>";
                str_html += "</li>";
            }
            // 타이틀이미지

            if(obj.BUILDING == "1" || obj.BUILDING == "2" || obj.BUILDING == "3" || obj.BUILDING == "4" || obj.BUILDING == "5" || 
               obj.BUILDING == "6" || obj.BUILDING == "7" || obj.BUILDING == "8" || obj.BUILDING == "11" || obj.BUILDING == "13" ||  
               obj.BUILDING == "17" || obj.BUILDING == "18"
            ){
                $("#id_popup_event .title_img > img").attr("src","images/use_log_" + obj.BUILDING + ".svg");
            }else{
                $("#id_popup_event .title_img > img").hide();
            }

            if(obj.STORE_ID != ""){
                str_tmp = obj.STORE_ID;
                var arr_store = str_tmp.split("|");
                if(arr_store.length > 0){
                    
                    for(j = 0; j < arr_store.length && j < 10; j++){
                        store_obj = getInfoStore(arr_store[j]);
                        if(store_obj != null){
                            str_html += " <li class=\"event_loc_info\">";
                            str_html += "   <div>";
                            str_html += "     <p class=\"left_title\">" + str_loc + "</p>";
                            str_html += "     <p class=\"right_title\">" + store_obj[store_name] + " / " + store_obj.STORE_FLOOR + "</p>";
                            str_html += "   </div>";
                            str_html += "   <span class=\"rectangle_loc\" onClick=\"javascript:onClickPopUpWayFind('EVENT','" + store_obj.ID + "');\"><img src=\"images/pop_location_btn01.svg\"><p>" + gl_jsop_lang_data.index.POP_GUIDE[str_lang] + "</p></span>";
                            str_html += "</li>";
                        }
                    }
                }
            }
            
            $("#id_popup_event_loc_list").html(str_html);
            $("#id_popup_event_loc_list").scrollTop(0);

            break;
        }
    }

    if(i_found == 1){
        $("#id_popup_bg").fadeIn(gl_main_conf.speed);
        $("#id_popup_event").fadeIn(gl_main_conf.speed);
    }
}


function setMakeInfoPopUpFacility(p_id,p_code){

    var i = 0, j = 0, i_found = 0;
    var obj;
    var str_html = "";
    var str_tmp1 = "";
    var str_tmp2 = "";
    var str_name_kor = "";
    var str_name_eng = "";
    var str_tmp_hours = "", str_tmp_info = "";

//    var str_pop_info = getInfoLangNames("facility","FACILITY_POP_INFO","");
//    var str_pop_loc = getInfoLangNames("facility","FACILITY_POP_LOC","");
//    var str_pop_btn = getInfoLangNames("facility","FACILITY_POP_GUIDE","");

    var str_lang = gl_main_conf.lang.toLowerCase();
    var str_pop_time = getInfoLangNames("index","POP_TIME","");
    var str_pop_info = getInfoLangNames("index","POP_INFO","");
    var str_pop_btn = getInfoLangNames("index","POP_GUIDE","");

    for(i = 0; i < gl_arr_facility_list.length && i < 3000; i++){
        obj = gl_arr_facility_list[i];

        if(p_id == obj.PUB_CODE){
            i_found++;

            var statics_obj = {"sect":"PUBLIC","code":p_id}
            setStatisSend(statics_obj);

            str_tmp_info = "";
            str_tmp_hours = obj["OFFICE_HOURS_" + gl_main_conf.lang];
            str_tmp2 = obj["PUB_DESC_" + gl_main_conf.lang];

            str_html += "<li class=\"pop_info_box\">";

            if(obj.BUILDING == "TWER"){
                str_tmp_info = gl_jsop_lang_data.store.STORE_BTN_TOWER[str_lang];
            }else if(obj.BUILDING == "SHPM"){
                str_tmp_info = gl_jsop_lang_data.store.STORE_BTN_MALL[str_lang];
            }else if(obj.BUILDING == "AVNL"){
                str_tmp_info = gl_jsop_lang_data.store.STORE_BTN_AVENUEL[str_lang];
            }
            str_tmp_info += " " + obj.PUB_FLOOR;
            if(str_tmp2 != ""){
                str_tmp_info += "<br>" + str_tmp2;
            }


            str_html += "  <div class=\"pop_info_loc\">";
            str_html += "    <p>" + str_pop_info + "</p>";
            str_html += "    <p>" + str_tmp_info + "</p>";
            str_html += "    <span class=\"pop_btn_loc rectangle_loc\" style=\"margin-top:2px;\" onClick=\"javascript:onClickPopUpWayFind('FACILITY','" + obj.ID + "');\"><img src=\"images/pop_location_btn01.svg\"><p>" + str_pop_btn + "</p></span>";
            str_html += "  </div>";


            if(str_tmp_hours != ""){
                str_html += "  <div class=\"pop_info_loc\">";
                str_html += "    <p>" + str_pop_time + "</p>";
                str_html += "    <p>" + str_tmp_hours + "</p>";
                str_html += "    <span style=\"width:170px;\">&nbsp;</span>";
                str_html += "  </div>";
            }

            str_html += "</li>";
        }
    }

    if(i_found > 0){

        str_name_kor = getInfoLangNames("facility","FACILTY_P" + p_code,"");
        str_name_eng = getInfoLangNames("facility","FACILTY_P" + p_code,"eng");

        var str_img = "images/facility_pop_ic_" + p_code + "_o.png";
        $("#id_popup_facility .top_img > img").attr("src",str_img);
        $("#id_popup_facility .txt_name_title").html(str_name_kor);
        $("#id_popup_facility .txt_name_subtitle").html(str_name_eng);

        $("#id_popup_facility_loc_list").html(str_html);
        $("#id_popup_bg").fadeIn(gl_main_conf.speed);
        $("#id_popup_facility").fadeIn(gl_main_conf.speed);
        //$("#id_popup_facility").addClass("popup_animate_show");
    }
}



function setMakeInfoPopUpError(p_obj){

    $("#id_popup_error .popup_error_title").html(p_obj.title);
    $("#id_popup_error .popup_error_desc").html(p_obj.desc);

    $("#id_popup_bg").fadeIn(gl_main_conf.speed);
    $("#id_popup_error").fadeIn(gl_main_conf.speed);
}



// LOAD

function getLoadWeahter(){
    /*
    THEN DECODE(WF_1,'1','맑음','3','구름 많음','4','흐림')
    ELSE DECODE(WF_2,'1','비','2','비/눈','3','눈','4','소나기','5','빗방울','6','진눈개비','7','눈날림')
    END WF_INFO,
    */
    var str_url = "";
    var opt = {"timeout":4000};
    str_url = gl_conf_header.URL_WEATHER;

    setSendSocketGET(getLoadWeahterEnd,str_url,opt);
}

function getLoadWeahterEnd(p_result,p_data){
    // 맑음,구름 많음,흐림,비,비/눈,눈,소나기,빗방울,진눈개비,눈날림

    if( typeof(document["frame_intro"].PAGEACTIVEYN) != 'undefined'){
        document["frame_intro"].setMakeWeather(p_data);
    }
}



// 스토어 정보 가지고 오기
function getInfoStore(p_id){
    var i = 0;
    var obj;

    for(i = 0; i < gl_arr_store_list.length && i < 3000; i++){
        obj = gl_arr_store_list[i];

        if(obj.ID == p_id){
            return obj;
        }
    }
    return null;
}

// 스토어 정보 가지고 오기
function getInfoFacility(p_id){
    var i = 0;
    var obj;

    for(i = 0; i < gl_arr_facility_list.length && i < 3000; i++){
        obj = gl_arr_facility_list[i];

        if(obj.ID == p_id){
            return obj;
        }
    }
    return null;
}

function getInfoLangNames(p_name,p_attr,p_lang){
    var str_name = "";
    var str_lang = "";

    if(p_lang == ""){
        str_lang = gl_main_conf.lang.toLowerCase();
    }else{
        str_lang = p_lang.toLowerCase();
    }

    try{
        str_name = gl_jsop_lang_data[p_name][p_attr][str_lang];
    }catch(err){
        console.log("getInfoLangNames INTRO ERROR : " + p_attr);
    }
    return str_name;
}



///////////////////////////////////////////////
// DEBUG

function onClickDebug01(){
    setMakeInfoPopUpStore("227327");
}

function onClickDebug02(){
    setMakeInfoPopUpEvent("89201");
}

function onClickDebug03(){
    setMakeInfoPopUpFacility("0425","04");
}