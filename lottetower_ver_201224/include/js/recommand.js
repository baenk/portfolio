/******************************************
   name :  intro.js
   auth :  ELTOV
   date :  2020.11.15
   desc :  추천매장 자바스크립트
*******************************************/

var gl_siwper_popuar;
var gl_siwper_photo;
var gl_siwper_photo;

var gl_timer_auto_loop;
var gl_timer_loop_cnt = 0;

var gl_timer_auto = "AUTO";

var gl_main_conf = {
    lang:"KOR",
    speed:300,    // FADE 속도
    close:1,

    //page 이름 추가
    name: "recommand"
};


var gl_list_conf = {
    popuar_list_cnt : 5,     // 총카운트
    photo_list_cnt : 6,      // 한페이지에 보이는 리스트 수
    new_list_cnt : 7,        // 현재 페이지
    popuar_curr : 0,         // 페이지 블록수
    photo_curr : 0,          // 페이징에 보여지는 불록수
    new_curr : 0,            // 페이징에 보여지는 불록수
};


/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////

function setInitSetting(){
    
    //setLoadLanguage("./xml/kiosk_lang_vertical.json");

    document.getElementById("id_page_popular_list").addEventListener("touchstart",function(evt){ onMouseDownList(this,evt); },true );
    document.getElementById("id_page_popular_list").addEventListener("mousedown",function(evt){ onMouseDownList(this,evt); },true );

    document.getElementById("id_page_photo_list").addEventListener("touchstart",function(evt){ onMouseDownList(this,evt); },true );
    document.getElementById("id_page_photo_list").addEventListener("mousedown",function(evt){ onMouseDownList(this,evt); },true );

    document.getElementById("id_page_new_list").addEventListener("touchstart",function(evt){ onMouseDownList(this,evt); },true );
    document.getElementById("id_page_new_list").addEventListener("mousedown",function(evt){ onMouseDownList(this,evt); },true );

    gl_siwper_photo = new Swiper("#id_page_photo_list",{
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop:true
    });

    gl_timer_loop_cnt = 0;

    if(!parent.MAINPARENTCUSTOMCODE){
        console.log("LOCAL SETTING RECOMMAND");
        setInitMakeRecommandList();
        setMainTimeOut();
    }
}

function setInitSettingEnd(){

    if(parent.MAINPARENTCUSTOMCODE){
        /*
        var cmd_obj = { sect:"HIDE", type:"RECOMMAND", id:"", code:"" };
        parent.setParentCmd(cmd_obj);
        */
    }
}

function setInitConfig(p_config,p_arr_store,p_arr_recommand){
    var i = 0;

    gl_conf_header = p_config;

    for(i = 0; i < p_arr_store.length; i++){
        gl_arr_store_list.push(p_arr_store[i]);
    }
    for(i = 0; i < p_arr_recommand.length; i++){
        gl_arr_recommand_list.push(p_arr_recommand[i]);
    }

    setInitMakeRecommandList();
}

function setInitConfigLang(p_lang){
    gl_jsop_lang_data = p_lang;
}

function setInitMakeRecommandList(){
    var i = 0, j = 0;
    var i_cnt_new = 0, i_cnt_popular = 0;
    var obj;
    var str_img  = "";
    var str_html_new = "";
    var str_html_popular = "";

    for(i = 0; i < gl_arr_recommand_list.length && i < 3000; i++){
        obj = gl_arr_recommand_list[i];
        for(j = 0; j < gl_arr_store_list.length && j < 3000; j++){
            if(obj.STORE_ID == gl_arr_store_list[j].ID){
                obj.IS_VALID = 1;
                obj.NUM = j;
                str_img = "";
                if(gl_arr_store_list[j].TYPE == "FOOD"){
                    if(gl_arr_store_list[j].STORE_SUB_URL.length > 0){
                        str_img = gl_arr_store_list[j].STORE_SUB_URL[0];
                    }
                    if(str_img == "") str_img = gl_arr_store_list[j].STORE_MAIN_URL;
                }else{
                    str_img = gl_arr_store_list[j].STORE_MAIN_URL;
                    if(str_img == ""){
                        if(gl_arr_store_list[j].STORE_SUB_URL.length > 0){
                            str_img = gl_arr_store_list[j].STORE_SUB_URL[0];
                        }
                    }
                }
                obj.STORE_MAIN_URL = str_img;
                break;
            }
        }
    }

    for(i = 0; i < gl_arr_recommand_list.length && i < 3000; i++){
        obj = gl_arr_recommand_list[i];
        if(obj.IS_VALID == 1){

            str_img = gl_arr_store_list[obj.NUM].STORE_MAIN_URL;
            if(str_img == ""){
                str_img = "./images/img_default_recommand.png";
            }else{
                str_img = "./" + str_img;
            }
            if(obj.RECMND == "Y"){
                i_cnt_popular++;
                str_html_popular += "<div class=\"popular swiper-slide\" onClick=\"javascript:onClickInfoView('POPULAR','" + obj.STORE_ID + "');\"><img src=\"" + str_img + "\"></div>";
            }
            if(obj.NEW == "Y"){
                i_cnt_new++;
                str_html_new += "<div class=\"popular swiper-slide\" onClick=\"javascript:onClickInfoView('NEW','" + obj.STORE_ID + "');\"><img src=\"" + str_img + "\"></div>";
            }
        }
    }

    $("#id_page_popular_list > .swiper-wrapper").html(str_html_popular);
    $("#id_page_new_list > .swiper-wrapper").html(str_html_new);

    gl_siwper_popuar = new Swiper("#id_page_popular_list",{
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop:true
    });

    gl_siwper_new = new Swiper("#id_page_new_list",{
        slidesPerView: 'auto',
        spaceBetween: 16, 
        loop:true
    });

    gl_list_conf.popuar_list_cnt = i_cnt_popular;
    gl_list_conf.new_list_cnt = i_cnt_new;

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
            console.log("ERROR LANG  : " + gl_main_conf.name);
            console.log("ERROR LANG  : " + str_lang);
            console.log("ERROR LANG RECOMMAND : " + str_attr);
        }
    });
    
    //swiper sub title 영문일시 숨기기
    if(str_lang === "eng"){
        $(".swiper_text_box p").hide();
    }
    else{
        $(".swiper_text_box p").show();
    }

}

function setMainStart(p_obj){

    gl_timer_auto = "AUTO";

    if(PAGEACTIVEYN == true ){
        return;
    }

    PAGEACTIVEYN = true;

    gl_timer_loop_cnt = 0;
    setMainTimeOut();
}

function setMainStop(){

    gl_timer_auto = "NONE";

    if(PAGEACTIVEYN == false ){
        return;
    }

    PAGEACTIVEYN = false;
}


/////////////////////////////////////////////////
// CLICK EVENT
/////////////////////////////////////////////////

function onClickInfoView(p_type,p_id){

    var cmd_obj = { sect:"", type:"", id:"", code:"", floor:"", pos_x:"", pos_y:""};

    if(p_type == "POPULAR"){
        cmd_obj.sect = "POPUP";
        cmd_obj.type = "STORE";
        cmd_obj.id = p_id;
    }else if(p_type == "PHOTOSPOT"){
        cmd_obj.sect = "FLOORMOVE";
        cmd_obj.type = "PHOTOSPOT";

        var loc_obj = getPhotoSpotLoc(p_id);

        cmd_obj.floor = loc_obj.floor;
        cmd_obj.id = loc_obj.id;

        cmd_obj.code = p_id;
    }else if(p_type == "NEW"){
        cmd_obj.sect = "POPUP";
        cmd_obj.type = "STORE";
        cmd_obj.id = p_id;
    }

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

    if((gl_timer_loop_cnt % 2) == 0){
        setNextSlide();
    }

    if(gl_timer_loop_cnt > 2500 ){
        gl_timer_loop_cnt = 0;
    }

    if(PAGEACTIVEYN == true){
        setTimeout(setMainTimeOut,1000);
    }
}



function setNextSlide(){
    
    if(gl_list_conf.popuar_list_cnt > 3){
        gl_siwper_popuar.slideNext();
    }
    if(gl_list_conf.photo_list_cnt > 3){
        gl_siwper_photo.slideNext();
    }
    if(gl_list_conf.new_list_cnt > 3){
        gl_siwper_new.slideNext();
    }

    /*
    gl_list_conf.popuar_curr++;
    if(gl_list_conf.popuar_curr >= (gl_list_conf.popuar_list_cnt-1)) gl_list_conf.popuar_curr = 0;

    gl_list_conf.photo_curr++;
    if(gl_list_conf.photo_curr >= (gl_list_conf.photo_list_cnt-1)) gl_list_conf.photo_curr = 0;

    gl_list_conf.new_curr++;
    if(gl_list_conf.new_curr >= (gl_list_conf.new_list_cnt-1)) gl_list_conf.new_curr = 0;

    if(gl_list_conf.popuar_list_cnt > 3){
        gl_siwper_popuar.slideTo(gl_list_conf.popuar_curr);
    }
    if(gl_list_conf.photo_list_cnt > 3){
        gl_siwper_photo.slideTo(gl_list_conf.photo_curr);
        //gl_siwper_photo.slideNext(gl_list_conf.photo_curr);
    }
    if(gl_list_conf.new_list_cnt > 3){
        gl_siwper_new.slideTo(gl_list_conf.new_curr);
    }
    */
}


///position: {x: 3324.4182128445655, y: 1553.6198131120511, z: 0}

function getPhotoSpotLoc(p_id){

    var way_obj = { floor:"", id:""};

    if(p_id == "01"){  // 여왕의 계단
        way_obj.floor = "1F";
        way_obj.id = "PO-5cUxNi1It9770";
    }else if(p_id == "02"){  // POSSIBILITIES 
        way_obj.floor = "1F";
        way_obj.id = "PO-RV8cZ7loR9340";
    }else if(p_id == "03"){  // 시그니엘서울 계단
        //way_obj.floor = "B1F";
        //way_obj.id = "PO-W-_ixqwof6135";
        way_obj.floor = "1F";
        way_obj.id = "PO-ilaNS3pWs9264";
    }else if(p_id == "04"){  // 서울스카이전망대
        way_obj.floor = "B1F";
        way_obj.id = "PO-cOzNR-W4E2446";
    }else if(p_id == "05"){  // Shopping Mall 6F Flower Road
        way_obj.floor = "5F";
        way_obj.id = "PO-FtGL0kFS-7593";
    }else if(p_id == "06"){  //서울서울 3080
        way_obj.floor = "5F";
        way_obj.id = "PO-i22uJk8qx6429";
    }

    return way_obj;
}

/////////////////////////////////////////////////
// DEBUT
/////////////////////////////////////////////////

function onClickDebug01(){
    setNextSlide();
}


function onClickDebugLang(p_type){
    setMainLang(p_type);
}