/******************************************
   name :  food.js
   auth :  ELTOV
   date :  2020.11.08
   desc :  식당가 메인 자바스크립트
*******************************************/

///////////////////////////////////////////
// DEFINE

var gl_store_box_width = 300;
var gl_store_box_height = 220;

var gl_old_keyword = "";

var gl_paging_conf = {
    total_cnt : 0,        // 총카운트
    list_cnt : 12,        // 한페이지에 보이는 리스트 수
    page_curr : 1,        // 현재 페이지
    page_cnt : 0,         // 페이지 블록수
    page_block : 7,       // 페이징에 보여지는 불록수
};

var gl_move_conf = {
    drag_status:0,        // 드래그 여부 0 : 선택안함, 1: 선택함
    start_left:0,         // 드래그 스타트 X
    end_left:0,
    orig_left:0,          // 드래그 원래위치 X
};

var gl_search_conf = {
    keyword_old : "",
    cate : ""
};


//수정 부분
var gl_main_conf = {
    lang:"KOR",
    speed:300,    // FADE 속도
    close:1,

    //page 이름 추가
    name: "food"
};




/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////

function setInitSetting(){

    document.getElementById("id_store_list").addEventListener("touchstart",function(evt){ onMouseDownList(this,evt); },true );
    document.getElementById("id_store_list").addEventListener("touchend",function(evt){ onMouseUpList(this,evt); },true );
    document.addEventListener("touchmove",function(evt){ onMouseMoveList(evt); }, true );

    document.getElementById("id_store_list").addEventListener("mousedown",function(evt){ onMouseDownList(this,evt); },true );
    document.getElementById("id_store_list").addEventListener("mouseup",function(evt){ onMouseUpList(this,evt); },true );

    document.addEventListener("mousemove",function(evt){ onMouseMoveList(evt); }, false );

    //setLoadLanguage("./xml/kiosk_lang_vertical.json");

    if(parent.MAINPARENTCUSTOMCODE){

    }else{

        console.log("LOCAL SETTING FOOD");

        // 초성처리
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

        setInitMakeStoreList();
    }
}

function setInitSettingEnd(){

    if(parent.MAINPARENTCUSTOMCODE){
        /*
        var cmd_obj = { sect:"HIDE", type:"FOOD", id:"", code:"" };
        parent.setParentCmd(cmd_obj);
        */
    }
}


function setInitConfig(p_config,p_arr_store){
    var i = 0;
    gl_conf_header = p_config;

    console.log("FOOD setInitConfig");

    for(i = 0; i < p_arr_store.length; i++){
        if(p_arr_store[i].TYPE == "FOOD"){
            gl_arr_store_list.push(p_arr_store[i]);
        }
    }

    gl_arr_store_list.sort(function(a, b) { // 오름차순
        return a.STORE_NAME_KOR < b.STORE_NAME_KOR ? -1 : a.STORE_NAME_KOR > b.STORE_NAME_KOR ? 1 : 0;
    });
    
    setInitMakeStoreList();
}

function setInitConfigLang(p_lang){
    gl_jsop_lang_data = p_lang;
}

// 다국어 변환
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
            console.log("ERROR LANG FOOD : " + str_attr);
        }
    });
    
    // 다국어 매장 이름 변환
    for(i = 0; i < gl_arr_store_list.length && i < 3000; i++){
        obj = gl_arr_store_list[i];
        try{
            if(gl_main_conf.lang == "KOR"){
                $("#id_store_box_" + obj.ID + " .event").show();
            }else{
                $("#id_store_box_" + obj.ID + " .event").hide();
            }
            $("#id_store_box_" + obj.ID + " .text_info > p").html(obj["STORE_NAME_" + gl_main_conf.lang]);
        }catch(err){
            console.log("ERROR LANG STORE NAME : " + obj.STORE_NAME_KOR);
        }
    }
    
    //201210 카테고리 한글 숨기기
    if( str_lang == "kor"){
        $("#id_lang_list_kor").show();
        $("#id_lang_list_eng").hide();
        $("#id_search_lang p").removeClass("search_circle_active");
        $("#id_search_lang p").eq(0).show().addClass("search_circle_active");
        
        $("#id_search_lang p").eq(1).html("영");
        $("#id_search_lang p").eq(2).html("숫자");
    }
    else{
        $("#id_lang_list_kor").hide();
        $("#id_lang_list_eng").show();
        
        $("#id_search_lang p").removeClass("search_circle_active");
        $("#id_search_lang p").eq(0).hide();
        $("#id_search_lang p").eq(1).addClass("search_circle_active").html("ENG");
        $("#id_search_lang p").eq(2).html("NUM");
    }
    
    $("#id_txt_search_keyword").attr("placeholder",gl_jsop_lang_data[gl_main_conf.name].FOOD_INIT_TXT[str_lang]);
    
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

    if(PAGEACTIVEYN == true ){
        $("#id_txt_search_keyword").val("");
        $("#id_search_type_category").addClass("search_text_active");
        $("#id_search_type_keyword").removeClass("search_text_active");
        $(".category li").removeClass("category_active");

        $(".category_box").show();
        $(".keyword_box").hide();

        gl_search_conf.keyword_old = "";
        gl_search_conf.cate = "";
        setStoreSearch("");
    }
}



function setMainStart(p_obj){

    if(PAGEACTIVEYN == true ){
        return;
    }

    PAGEACTIVEYN = true;

    // 초기화
    $("#id_txt_search_keyword").val("");
    $("#id_search_type_category").addClass("search_text_active");
    $("#id_search_type_keyword").removeClass("search_text_active");
    $(".category li").removeClass("category_active");

    $(".category_box").show();
    $(".keyword_box").hide();

    gl_search_conf.keyword_old = "";
    gl_search_conf.cate = "";
    setStoreSearch("");
}

function setMainStop(){

    if(PAGEACTIVEYN == false ){
        return;
    }
    PAGEACTIVEYN = false;

}

function setInitMakeStoreList(){
    var i = 0;
    var obj;
    var str_img  = "";
    var str_html = "";
    var str_lang = gl_main_conf.lang.toLowerCase();


    var ret_obj = { left:0, top:0 };

    for(i = 0; i < gl_arr_store_list.length && i < 3000; i++){
        obj = gl_arr_store_list[i];

        str_img = "";

        if(obj.STORE_SUB_URL.length > 0){
            str_img = obj.STORE_SUB_URL[0];
        }

        if(str_img == "") str_img = obj.STORE_MAIN_URL;
        //if(str_img == "") str_img = obj.STORE_LOGO_URL;

        if(str_img == ""){
            str_img =  "<img src=\"./images/img_default_store.png\" draggable=false style=\"width:100%;height:100%;\">";
        }else{
            str_img =  "<img src=\".//" + str_img + "\" draggable=false >";
            //str_img = "/" + str_img;
        }

        //ret_obj = getCalPos(i);
        //str_html  = "<div id=\"id_store_box_" + obj.ID  + "\" style=\"left:" + ret_obj.left + "px;top:" + ret_obj.top + "px;\"  class=\"store_box\">";
        str_html  = "<div id=\"id_store_box_" + obj.ID  + "\" style=\"left:0px;top:0px;\"  class=\"store_box\">";


        if(obj.EVENT_ID != ""){
            str_html += "  <div class=\"event\" onClick=\"javascript:onClickEventInfo('" + obj.EVENT_ID + "',event);\">";
            str_html += "    <img src=\"./images/brand-bt-event.png\" style=\"width:64px;height:65px;\">";
            str_html += "  </div>";
        }
        str_html += "  <div class=\"image_box\" onClick=\"javascript:onClickStoreInfo('" + obj.ID + "',event);\">";
        str_html += "    " + str_img;
        //str_html += "    <img src=\"" + str_img + "\" draggable=false>";
        str_html += "  </div>";
        str_html += "  <div class=\"text_box\" onClick=\"javascript:onClickStoreInfo('" + obj.ID + "',event);\">";
        str_html += "    <div class=\"text_info\">";
        str_html += "       <p>" + obj.STORE_NAME_KOR + "</p>";
        str_html += "    </div>";

        //TWER/SHPM/AVNL    수정201215
        if(obj.BUILDING == "TWER"){
            str_html += "    <span class=\"rectangle_shop rectangle_tower\" build_code=\"TWER\"><p>" + gl_jsop_lang_data.store.STORE_BTN_TOWER[str_lang] + "</p><p>" + obj.STORE_FLOOR + "</p></span>";
        }
        if(obj.BUILDING == "SHPM"){
            str_html += "    <span class=\"rectangle_shop rectangle_mall\" build_code=\"SHPM\"><p>" + gl_jsop_lang_data.store.STORE_BTN_MALL[str_lang] + "</p><p>" + obj.STORE_FLOOR + "</p></span>";
        }
        if(obj.BUILDING == "AVNL"){
            str_html += "    <span class=\"rectangle_shop rectangle_avenuel\" build_code=\"AVNL\"><p>" + gl_jsop_lang_data.store.STORE_BTN_AVENUEL[str_lang] + "</p><p>" + obj.STORE_FLOOR + "</p></span>";
        }

        //str_html += "    <span class=\"rectangle_shop rectangle_tower\"><p>TOWER</p><p>" + obj.STORE_FLOOR + "</p></span>";
        str_html += "  </div>";
        str_html += "</div>";

        $("#id_store_list").append(str_html);
    }

    gl_paging_conf.total_cnt = gl_arr_store_list.length;
    gl_paging_conf.page_cnt = Math.floor(gl_paging_conf.total_cnt / gl_paging_conf.list_cnt) + 1;

    setContentsPaging();
}


/////////////////////////////////////////////////
// CLICK EVENT
/////////////////////////////////////////////////

function onClickSearchType(p_type){

    if(p_type == "CATE"){
        $("#id_search_type_category").addClass("search_text_active");
        $("#id_search_type_keyword").removeClass("search_text_active");
        $(".category_box").show();
        $(".keyword_box").hide();
    }else{
        $("#id_search_type_category").removeClass("search_text_active");
        $("#id_search_type_keyword").addClass("search_text_active");
        $(".category_box").hide();
        $(".keyword_box").show();
    }
}

function onClickSearchCategory(p_obj){

    var code = $(p_obj).attr("code");

    console.log("codecode = " + code);

    if( gl_search_conf.cate == code ){
        gl_search_conf.cate = "";
        $(".category li").removeClass("category_active");
    }else{
        $(".category li").removeClass("category_active");
        $(p_obj).addClass("category_active");
        gl_search_conf.cate = code;
    }
    setStoreSearch("CATE");
}

// 키워드 타입 서치
function onClickSearchKeyType(p_obj){

    $(".search_keytype p").removeClass("search_circle_active");
    $(p_obj).addClass("search_circle_active");

    var str_code = $(p_obj).attr("code");

    $(".lang_list").hide();
    $(".lang_list li").children("span").removeClass("lang_key_active");;

    if(str_code == "KOR"){
        $("#id_lang_list_kor").show();
    }else if(str_code == "ENG"){
        $("#id_lang_list_eng").show();
    }else if(str_code == "NUM"){
        $("#id_lang_list_num").show();
    }

}

// 키워드 클릭시 처리
function onClickSearchKeyWord(p_obj,p_lang){

    // $(p_obj).siblings("li").children("span").removeClass("lang_key_active");
    // $(p_obj).children("span").addClass("lang_key_active");

    var str_code = $(p_obj).attr("code");
    var val = $("#id_txt_search_keyword").val();
    if(val.length < 10){
        val = val + str_code;
        $("#id_txt_search_keyword").val(val);
        setStoreSearch("KEYWORD");
    }
}

// 키워드 뒤로가기
function onClickSearchKeyDel(p_type){
    if(p_type == "ALL"){
        $("#id_txt_search_keyword").val("");
        setStoreSearch("KEYWORD");
    }else{
        var val = $("#id_txt_search_keyword").val();
        if(val.length >= 1){
            val = val.substring(0,val.length -1);
            $("#id_txt_search_keyword").val(val);
            setStoreSearch("KEYWORD");
        }
    }
}

// 상품 상세보기 클릭
function onClickStoreInfo(p_id,evt){
    //console.log("evt = " + evt.pageX);

    if(Math.abs(gl_move_conf.start_left - evt.pageX) < 10){
        console.log("onClickStoreInfo = " + p_id);
        var cmd_obj = { sect:"POPUP", type:"STORE", id:"", code:"" };
        cmd_obj.id = p_id;

        if(parent.MAINPARENTCUSTOMCODE){
            parent.setParentCmd(cmd_obj);
        }
    }
}

function onClickEventInfo(p_id,evt){
    if(Math.abs(gl_move_conf.start_left - evt.pageX) < 10){
        console.log("onClickEventInfo = " + p_id);
        var cmd_obj = { sect:"POPUP", type:"EVENT", id:"", code:"" };
        cmd_obj.id = p_id;

        if(parent.MAINPARENTCUSTOMCODE){
            parent.setParentCmd(cmd_obj);
        }
    }
}


// 페이징 번호 처리
function onClickPagingNum(p_obj){
    var page_num = $(p_obj).attr("page_num");
    if(page_num == "NONE") return;
    setContentsDir(page_num);
}

/////////////////////////////////////////////////
// TOUCH EVENT
/////////////////////////////////////////////////

function onMouseDownList(p_obj,evt){

    gl_move_conf.drag_status = 1;

    var ret_pos = getPosTransform(p_obj);
    gl_move_conf.orig_left = ret_pos.left;

    if(evt.type == "touchstart"){
        gl_move_conf.start_left = evt.targetTouches[0].pageX;
    }else{
        gl_move_conf.start_left = evt.pageX;
    }
}

function onMouseUpList(p_obj,evt){

    var pos_x = 0;

    if(evt.type == "touchend"){
        pos_x = evt.changedTouches[0].pageX;
    }else{
        pos_x = evt.pageX;
    }

    pos_x = pos_x - gl_move_conf.start_left;

    if(pos_x < -120){
        setContentsDir("NEXT");
    }else if(pos_x > 120){
        setContentsDir("PREV");
    }else{
        setContentsDir("HOME");
    }

    console.log("onMouseUpList");
    //document.querySelector('#id_store_list').style.transition = "none";

    gl_move_conf.drag_status = 0;
}

function onMouseMoveList(evt){

    if(gl_move_conf.drag_status == 1){

        var obj = evt.touches;

        if(obj != undefined){
            pos_x = evt.touches[0].clientX;
        }else{
            pos_x = evt.pageX;
        }

        pos_x = pos_x - gl_move_conf.start_left + gl_move_conf.orig_left;

        $("#id_store_list").css("transform","translate(" + pos_x + "px,0px)"); 
    }
}

/////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////


// 검색
function setStoreSearch(p_type){
    var i = 0;
    var i_cnt = 0, i_found = 0;
    var obj;
    var str_tmp = "";
    var str_val = "";

    if(p_type == "KEYWORD"){
        str_val = $("#id_txt_search_keyword").val();
        if(str_val == gl_search_conf.keyword_old){
            return;
        }
        gl_search_conf.keyword_old = str_val;
    }else{
        str_val = gl_search_conf.cate;
    }


    var ret_obj = { left:0, top:0 };

    for(i = 0; i < gl_arr_store_list.length; i++){
        obj = gl_arr_store_list[i];

        i_found = 0;

        if(p_type == "KEYWORD"){
            if(gl_main_conf.lang == "KOR"){
                str_tmp = obj.STORE_NAME_CHO;
                if(str_tmp.indexOf(str_val) == 0){
                    i_found = 1;
                }
            }else{
                str_tmp = obj.STORE_NAME_ENG;
                if(str_tmp.indexOf(str_val) == 0){
                    i_found = 1;
                }
            }
        }
        if(p_type == "CATE"){
            str_tmp = obj.CATE_CODE;
            if(str_tmp.indexOf(str_val) >= 0){
                i_found = 1;
            }
        }

        if(p_type == ""){
            i_found = 1;
        }

        if(i_found == 1){
            ret_obj = getCalPos(i_cnt);
            $("#id_store_box_" + obj.ID).show();
            $("#id_store_box_" + obj.ID).css({"left":ret_obj.left + "px","top": ret_obj.top+ "px"});
            i_cnt++;
        }else{
            $("#id_store_box_" + obj.ID).hide();
            $("#id_store_box_" + obj.ID).css({"left":"0px","top":"0px"});
        }
    }

    gl_paging_conf.page_curr = 1;
    gl_paging_conf.total_cnt = i_cnt;
    gl_paging_conf.page_cnt = Math.ceil(gl_paging_conf.total_cnt / gl_paging_conf.list_cnt);

    console.log("total_cnt = " + gl_paging_conf.total_cnt + " , page_cnt = " + gl_paging_conf.page_cnt);

    $("#id_store_list").css("transform","translate(0px,0px)");

    if(i_cnt == 0){
        $("#id_page_car_no_result").show();
        $("#id_store_list").hide();
    }else{
        $("#id_page_car_no_result").hide();
        $("#id_store_list").show();
    }


    setContentsPaging();

}


function setContentsDir(p_dir){

    var i_left = 0;
    var i_width = gl_store_box_width * 3;

    var target = document.querySelector('#id_store_list');

    if(p_dir == "NEXT" || p_dir == "PREV" || p_dir == "HOME"){

        if(p_dir == "NEXT"){
            if((gl_paging_conf.page_curr + 1) <= gl_paging_conf.page_cnt){
                gl_paging_conf.page_curr++;
            }

            i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);

        }else if(p_dir == "PREV"){

            if(gl_paging_conf.page_curr > 1){
                gl_paging_conf.page_curr--;
            }
            i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);
        }else if(p_dir == "HOME"){
            i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);
        }
    }else{
        gl_paging_conf.page_curr = Number(p_dir);
        i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);
    }

    console.log("CURR = " + gl_paging_conf.page_curr + " , i_lefti_left = " + i_left);

    target.style.transition = "all 0.3s";
    $("#id_store_list").css("transform","translate(" + i_left + "px,0px)"); 

    setContentsPaging();

    //target.style.WebkitTransition = 
    //TweenLite.to(target,0.3,{transform:"translate(" + i_left + "px,0px)",ease:Linear.easeNone});
}


// 페이징 처리
function setContentsPaging(){
    var i = 0;
    var i_tmp = 0;
    var str_html = "";


    var i_start = Math.floor((gl_paging_conf.page_curr -1) / gl_paging_conf.page_block) * gl_paging_conf.page_block + 1;

    // PREV 
    if(i_start <= 1){
        $("#id_paging_prev").attr("page_num","NONE");
        $("#id_paging_prev").css({"opacity":"0.3"});
    }else{
        i_tmp = i_start - gl_paging_conf.page_block;
        $("#id_paging_prev").attr("page_num",(i_tmp + ""));
        $("#id_paging_prev").css({"opacity":"1"});
    }

    // NEXT

    for(i = 1; i <= gl_paging_conf.page_block; i++){
        if(i < 10) str_html = "0" + i;
        else str_html = "" + i;

        if(i_start <= gl_paging_conf.page_cnt){
            $("#id_paging_" + str_html + " > p").html(i_start);
            $("#id_paging_" + str_html + "").attr("page_num",(i_start + ""));
            if(gl_paging_conf.page_curr == i_start){
                $("#id_paging_" + str_html + "").addClass("circle_38_active_wide");
            }else{
                $("#id_paging_" + str_html + "").removeClass("circle_38_active_wide");
            }
            i_start++;
            $("#id_paging_" + str_html).show();
        }else{
            $("#id_paging_" + str_html).hide();
        }
    }

    if(i_start >= gl_paging_conf.page_cnt ){
        $("#id_paging_next").attr("page_num","NONE");
        $("#id_paging_next").css({"opacity":"0.3"});
    }else{
        $("#id_paging_next").attr("page_num",(i_start + ""));
        $("#id_paging_next").css({"opacity":"1"});
    }
}


function getCalPos(p_num){

    var ret_obj = { left:0, top:0 };

    var i_left = 0;
    var i_top = 0;

    var i_page = Math.floor(p_num / gl_paging_conf.list_cnt);
    var i_left = Math.floor(p_num % 3) * gl_store_box_width;
    var i_top = Math.floor((p_num % gl_paging_conf.list_cnt) / 3) * gl_store_box_height;

    i_left = i_left + (gl_store_box_width * 3) * i_page;

    ret_obj.left = i_left;
    ret_obj.top = i_top;

    return ret_obj;
}







/////////////////////////////////////////////////
// DEBUG

function onClickDebugLang(p_type){
    setMainLang(p_type);
}