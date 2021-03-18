/******************************************
   name :  floor.js
   auth :  ELTOV
   date :  2020.11.08
   desc :  층별안내 처리
*******************************************/

//var gl_swiper_facility;
//var gl_swiper_floor;

// MAP CONFIG
var gl_map_container;
var gl_map_views;
var gl_map_draws;

var gl_arr_poi_all_list = new Array();
var gl_arr_poi_facility_list = new Array();
var gl_wayfind_obj = {};

var gl_main_conf = {
    lang:"KOR",
    speed:300,    // FADE 속도
    close:1,
    name: "floor",
    floor: "1F"
};

var gl_map_conf = {
    is_load:false,
    my_floor_id:"",
    floor_id:"",
    floor_title:"",
    wayfind_status:"",
    wayfind_type:"",
    wayfind_floor:"",
    fac_id:"",
    poi_id:"",
    close:1,
};


/////////////////////////////////////////////////
// 초기화 함수들
/////////////////////////////////////////////////
function setInitSetting(){
    var i = 0;
    var obj;
    var str_html = "";

    str_html += "<div class=\"swiper-slide\" style=\"width:30px;\" code=\"\">&nbsp;</div>";
    for(i = 0; i < gl_arr_floor_list.length; i++){
        obj = gl_arr_floor_list[i];
        str_html += "<div class=\"floor_btn swiper-slide\" code=\"" + obj[0] + "\">";
        str_html += "  <span class=\"circle_65\"><p>" + obj[0] + "</p></span>";
        str_html += "</div>";
    }

    str_html += "<div class=\"floor_btn swiper-slide\" style=\"width:30px;\" code=\"\">&nbsp;</div>";
    $("#id_page_floor_btn_list > .swiper-wrapper").html(str_html);

    $(".facility_btn").click(function(){
        onClickInfoFacility(this);
    });

    $(".floor_btn").click(function(){
        onClickInfoFloor(this);
    });

    if(gl_reload_yn == "RELOAD"){
        setMakeMapInit();
    }else{
        if(parent.MAINPARENTCUSTOMCODE){
        }else{
            console.log("LOCAL SETTING FLOOR");
            setMakeMapInit();
        }
    }
}

function setInitSettingEnd(){

    if(parent.MAINPARENTCUSTOMCODE){

    }
}

function setInitConfig(p_config,p_arr_store,p_arr_facility){
    var i = 0;

    gl_conf_header = p_config;

    for(i = 0; i < p_arr_store.length; i++){
        gl_arr_store_list.push(p_arr_store[i]);
    }

    for(i = 0; i < p_arr_facility.length; i++){
        gl_arr_facility_list.push(p_arr_facility[i]);
    }

    setMakeMapInit();
}

function setInitConfigLang(p_lang){
    gl_jsop_lang_data = p_lang;
}

function setMainLang(p_lang){

    if(gl_main_conf.lang == p_lang) return;

    gl_main_conf.lang = p_lang;

    if(gl_map_conf.is_load != true){
        return;
    }

    //다국어 추가 부분
    var str_attr = "";
    var str_lang = gl_main_conf.lang.toLowerCase();

    $(".lang_code_names").each(function(i){
        str_attr = $(".lang_code_names").eq(i).attr("lang_code");
        try{
            $(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][str_lang]);
        }catch(err){
            console.log("ERROR LANG FLOOR : " + str_attr);
        }
    });
    
    //편의시설 아이콘
    $(".lang_code_facility").each(function(i){
        str_attr = $(".lang_code_facility").eq(i).attr("lang_code");
        
        try{
            $(this).html(gl_jsop_lang_data.facility[str_attr][str_lang]);

            if(str_lang == "kor"){
                $(".facility_btn p").css("word-break","keep-all");
            }
            else if(str_lang == "eng"){
                $(".facility_btn p").css("word-break","keep-all");
            }
            else{
                $(".facility_btn p").css("word-break","break-all");
            }
        }catch(err){
            console.log("ERROR LANG : " + str_attr);
        }
    });


    //전층안내 이미지
    if(gl_main_conf.lang == "KOR"){
        gl_map_draws.changeLanguage("ko");
        $("#id_page_floor_all_map img").attr("src","./images/floor/floor-img-all_horizon_kor.png");
    }else if(gl_main_conf.lang == "ENG"){
        gl_map_draws.changeLanguage("en");
        $("#id_page_floor_all_map img").attr("src","./images/floor/floor-img-all_horizon_eng.png");
    }else if(gl_main_conf.lang == "CHN"){
        gl_map_draws.changeLanguage("zh-CN");
        $("#id_page_floor_all_map img").attr("src","./images/floor/floor-img-all_horizon_chn.png");
    }else if(gl_main_conf.lang == "JPN"){
        gl_map_draws.changeLanguage("ja");
        $("#id_page_floor_all_map img").attr("src","./images/floor/floor-img-all_horizon_jpn.png");
    }

    try{
        $("#id_store_ctg").html( gl_jsop_lang_data.floor[`FLOOR_LEVEL_${gl_main_conf.floor}`][str_lang]);
    }catch(err){

    }
}

function setMainStart(p_obj){
    var i = 0;
    var obj;
    var str_floor = "";

    if(gl_map_conf.is_load != true){
        var str_title = "";
        var str_desc = "";
        try{
            str_lang = gl_main_conf.lang.toLowerCase();
            str_title = gl_jsop_lang_data[gl_main_conf.name]["ERROR_NOTICE"][str_lang];
            str_desc = gl_jsop_lang_data[gl_main_conf.name]["ERROR_FLOOR"][str_lang];
        }catch(err){
            console.log(err);
        }

        var cmd_obj = { sect:"POPUP", type:"ERROR", title:str_title, desc:str_desc };
        if(parent.MAINPARENTCUSTOMCODE){
            parent.setParentCmd(cmd_obj);
        }
        return;
    }

    console.log("setMainStartsetMainStart FLOOR");

    // CLEAR AND INIT
    $("#id_page_floor_all").hide();
    $("#id_popup_bg").hide();
    $("#id_popup_select").hide();
    $(".facility_btn").removeClass("facility_btn_active");
    $(".floor_btn > .circle_65").removeClass("circle_65_active");

    if(p_obj.sect == "FLOORMOVE" && p_obj.floor != undefined && p_obj.floor != ""){
        str_floor = p_obj.floor;
    }else{
        str_floor = gl_conf_header.KIOSK_FLOOR;
    }

    setMapMoveFloor(str_floor);
    setFloorBtnCenter(str_floor);

    if(p_obj.sect == "FLOORMOVE"){
        if(p_obj.type == "PHOTOSPOT"){  //  추천 포토스팟
            gl_map_conf.wayfind_floor = p_obj.floor;
            gl_map_conf.poi_id = p_obj.id;
            gl_map_conf.wayfind_type = "PHOTOSPOT";
            setMainWayFind();
        }
    }

    if(p_obj.sect == "WAYFIND"){

        if(p_obj.type == "PARK"){  // wayfind
            
            gl_map_conf.wayfind_floor = p_obj.floor;
            gl_map_conf.fac_id = "";
            gl_map_conf.poi_id = p_obj.id;
            gl_map_conf.wayfind_type = "PARK";
            setMainWayFind();

        }else if(p_obj.type == "STORE"){  // wayfind

            gl_map_conf.wayfind_floor = p_obj.floor;
            gl_map_conf.fac_id = p_obj.id;
            gl_map_conf.wayfind_type = "STORE";
            setMainWayFind();

        }else if(p_obj.type == "FACILITY"){  // wayfind

            gl_map_conf.wayfind_floor = p_obj.floor;
            gl_map_conf.fac_id = p_obj.id;
            gl_map_conf.wayfind_type = "FACILITY";
            setMainWayFind();
        }
    }
}

function setMainStop(){
    if(PAGEACTIVEYN == false ){
        return;
    }
    PAGEACTIVEYN = false;
}


function setMainWayFind(){

    if(gl_map_conf.fac_id != ""){
        var ret_pos = getPoiStorePosition(gl_map_conf.fac_id);
        if(ret_pos.id == ""){

            var str_title = "";
            var str_desc = "";

            str_lang = gl_main_conf.lang.toLowerCase();
            str_title = gl_jsop_lang_data[gl_main_conf.name]["ERROR_NOTICE"][str_lang];
            str_desc = gl_jsop_lang_data[gl_main_conf.name]["ERROR_LOCATION"][str_lang];

            var cmd_obj = { sect:"POPUP", type:"ERROR", title:str_title, desc:str_desc };
            if(parent.MAINPARENTCUSTOMCODE){
                parent.setParentCmd(cmd_obj);
            }
            return;
        }
    }

    // 같은층이면 바로 길안내를 한다.
    if(gl_map_conf.wayfind_floor == gl_conf_header.KIOSK_FLOOR){
        setMainWayFindStart("");
    }else{
        $(".pop_icon_way").removeClass("pop_icon_way_active");
        $("#id_popup_bg").fadeIn(gl_main_conf.speed);
        $("#id_popup_select").fadeIn(gl_main_conf.speed);
    }
}

function setMainWayFindStart(p_type){
    var i = 0;
    var obj;
    var pos_x = 0,pos_y = 0;
    var str_floor_id = "";

    var start_point = {position:{ x: gl_conf_header.POS_X, y: gl_conf_header.POS_Y, z: 10 }, floorId: gl_map_conf.my_floor_id};

    gl_map_draws.zoomControl(60);
    gl_map_draws.moveCamera({
        "x": 2600,
        "y": 2000
    });

    if(gl_map_conf.wayfind_type == "PARK" || gl_map_conf.wayfind_type == "PHOTOSPOT"){

        var dest_point = {poiId:gl_map_conf.poi_id,floorId:""};

        for(i = 0; i < gl_arr_floor_list.length; i++){
            obj = gl_arr_floor_list[i];
            if(obj[0] == gl_map_conf.wayfind_floor){
                dest_point.floorId = obj[1];
                break;
            }
        }

        console.log("dest_point 0000");
        console.log(start_point);
        console.log(dest_point);

        gl_map_draws.getRouteOn(start_point,dest_point,p_type);

        //var tmp_list = gl_map_draws.getNavigation();
        //console.log(tmp_list);

        gl_map_draws.startRouteAnimation({zoom:230});
        gl_map_conf.wayfind_status = "WAYFIND";

    }else{

        var dest_point = {position:{ x: 0, y: 0, z: 1 }, floorId:""};

        var ret_pos = getPoiStorePosition(gl_map_conf.fac_id);

        console.log("dest_point 1111");
        console.log(start_point);
        console.log(dest_point);

        dest_point.position.x = ret_pos.x;
        dest_point.position.y = ret_pos.y;
        dest_point.floorId = ret_pos.floorId;

        gl_map_draws.getRouteOn(start_point,dest_point,p_type);

        //var tmp_list = gl_map_draws.getNavigation();
        //console.log(tmp_list);

        gl_map_draws.startRouteAnimation({zoom: 230});
        gl_map_conf.wayfind_status = "WAYFIND";
    }
}

function setMainMapCheck(){

    return gl_map_conf.is_load;
    /*
    if(gl_map_conf.is_load != true){
        setMakeMapInit();
    }
    */
}


/////////////////////////////////////////////////
// MAP
/////////////////////////////////////////////////

function setMakeMapInit(){

    try{
        gl_map_container = document.getElementById("id_page_map_main"); // 지도를 표시할 div

        var authorization = new indoorMapApi.Authorization({
            clientId: "6Udd5BsqAd88ea6RUBWzc-",
            clientSecret: "2dc47c3d93fd8dd7df3617b98cde7969"
        });

        var mapOptions = {
            authorization: authorization,
            minZoom:45,
            camera:"2d",
            canvasSize: {
                width : 1400,
                height : 600
            },
            rotationTouch2d : false
        };

        new indoorMapApi.MapView(
            gl_map_container, // 컨테이너
            mapOptions, // 옵션
            function (response) { // 맵 로드 콜백
                // console.log(response);
                var code = response.getCode();
                if (code === 200) {
                    gl_map_views = response.getPayload().mapView;
                    gl_map_draws = response.getPayload().mapDraw;

                    // DO SOMETHING
                    //console.log(gl_map_draws.response);
                    setMakeMapInitEnd();
                }else{
                    setInitSettingEnd();
                }
            } 
        );
    }catch(err){

    }
}


function setMakeMapInitEnd(){

    var str_code = "";
    var str_tmp = "";

    gl_map_draws.setNavigationOption ({ 
        lineColor:"#ff0000",
        lineSpotSize:3,
        lineSpotInterval:3000,
        lineZ:150,
        speedRate:4,
        iconUrl: "./images/location_human.png",
        origin: { // 시작지 아이콘 
            iconUrl: "./images/location_mypoint_100.png",
            width: 30,
            height: 30
        },
        destination: { // 도착지 아이콘 
            iconUrl: "./images/location_destination_100.png",
            width: 30,
            height: 30
        },
        visibleIcon : true  // 경로 표시할때 시작지, 도착지 아이콘 없애기 / 보이기
    });

    gl_arr_poi_all_list = [];
    gl_arr_poi_facility_list = [];

    // POI 코드 받기
    gl_map_draws.response.poiInfo.forEach((poi,index) => {
        try{
            /*
            if(poi.id == "PO-WYLUm2YrJ2468"){
                console.log("ID--------------------------");
                console.log(poi);
            }
            */

            if(poi.metadatas[0].metadatas[0].text != undefined){
                var json_doc = JSON.parse(poi.metadatas[0].metadatas[0].text);
                str_code = json_doc.categoryCode + "";
                if(str_code.length == 4){
                    str_tmp = str_code.substring(0,2);
                    var obj_facility = {"id":json_doc.facID,"cate_code":str_code,"x":poi.position.x,"y":poi.position.y,"floorId":poi.floorId};
                    if(str_tmp == "04"){
                        gl_arr_poi_facility_list.push(obj_facility);
                    }
                    gl_arr_poi_all_list.push(obj_facility);
                }
            }
        }catch(err){
            console.log("setMakeMapInitEnd Poi Error : " + err);
        }
    });

    // FLOOR 코드 받기
    gl_map_draws.response.floorInfo.forEach((view)=>{
        str_tmp = view.name[0].text;
        str_tmp = str_tmp.toUpperCase();
        for(i = 0; i < gl_arr_floor_list.length; i++){
            obj = gl_arr_floor_list[i];

            if(obj[0] == str_tmp){
                obj[1] = view.id;
                break;
            }
        }
        if(str_tmp == gl_conf_header.KIOSK_FLOOR){
            gl_map_conf.my_floor_id = view.id;
        }
    });

    console.log("gl_map_conf.my_floor_idgl_map_conf.my_floor_idgl_map_conf.my_floor_id = " + gl_map_conf.my_floor_id);
    gl_map_draws.redrawMap({floor:gl_map_conf.my_floor_id});
    gl_map_draws.myLocationOn(gl_conf_header.POS_X, gl_conf_header.POS_Y,30,true);

    // 리스너 리스터
    document.querySelector("#id_page_map_main").addEventListener("poi-click", (evt) => {
        onClickMapFloor(evt);
    });


    document.addEventListener("floor-changed", function(e){
        var floorId = e.detail;
        if(gl_map_conf.wayfind_status == "WAYFIND"){
            var str_floor = getFindPoiToFloor("POITOFLOOR",floorId);
            console.log("CHANGE FLOOR = " + str_floor);
            if(str_floor != ""){
                setFloorSetting("WAYFIND",str_floor);
                setFloorBtnCenter(str_floor);
            }
        }
        console.log("floor-changed = " + floorId);
    });

    document.addEventListener("navi-complete", function(e){
        console.log("navi-complete V1 : " + e.detail);
        gl_map_conf.wayfind_status = "";
        var str_result = e.detail;
        if(str_result == "OK"){
            setFloorSetting("DONE",gl_map_conf.wayfind_floor);
            setFloorBtnCenter(gl_map_conf.wayfind_floor);
        }
    });

    // 길안내 완료
    document.querySelector("#id_page_map_main").addEventListener("navi-complete", (evt) => { 
         console.log("navi-complete V2 : " + evt.detail);
    });

    // 모든 세팅이 끝났다.
    console.log("setInitSettingEndsetInitSettingEndsetInitSettingEnd");
    setInitSettingEnd();

    gl_map_conf.is_load = true;
}


function setMapMoveFloor(p_code){
    var i = 0;
    var obj;

    gl_map_draws.clearMarker();
    gl_map_draws.getRouteOff();

    $("#id_page_floor_all").hide();
    $("#id_btn_floor_all").removeClass("circle_65_wide_active");

    for(i = 0; i < gl_arr_floor_list.length; i++){
        obj = gl_arr_floor_list[i];
        if(obj[0] == p_code){
            gl_map_draws.redrawMap({floor: obj[1]});
            setFloorSetting("DONE",p_code);
            gl_map_conf.floor_title = p_code;
            gl_map_conf.floor_id = obj[1];
            /*
            gl_map_draws.moveCamera({
                "x": Number(gl_conf_header.POS_X),
                "y": 1500
            });
            */

            console.log("00000000000000000000000000");
            gl_map_draws.moveCamera({
                "x": 2500,
                "y": 1600
            });
            gl_map_draws.zoomControl(260);
            console.log("gl_map_conf.floor_id = " + gl_map_conf.floor_id);
            break;
        }
    }
}


function setFloorSetting(p_type,p_floor){
    var i = 0, j = 0;
    var i_found = 0;
    var obj;
    var str_code = "";

    var str_floor = getInfoLangNames("floor","FLOOR_LEVEL_" + p_floor,"");

    $("#id_page_top_title > .top_text_box > h1").html(p_floor);
    $("#id_store_ctg").html(str_floor);

    if(p_floor == gl_conf_header.KIOSK_FLOOR){
        $(".top_curr_location").show();
    }else{
        $(".top_curr_location").hide();
    }

    $(".floor_btn > .circle_65").removeClass("circle_65_active");
    for(i = 0; i < gl_arr_floor_list.length; i++){
        obj = gl_arr_floor_list[i];
        if(obj[0] == p_floor){
            $($(".floor_btn")[i]).children("span").addClass("circle_65_active");
        }
    }

    if(p_type != "WAYFIND"){

        $(".facility_btn").removeClass("facility_btn_active");

        $(".facility_btn").each(function(i){
            i_found = 0;
            str_code = $(".facility_btn").eq(i).attr("code");
            for(j = 0; j < gl_arr_facility_list.length; j++){
                if(str_code == gl_arr_facility_list[j].PUB_CODE){
                    if(p_floor == gl_arr_facility_list[j].PUB_FLOOR){
                        i_found = 1;
                        break;
                    }
                }
            }
            if(i_found == 1){
                $(".facility_btn").eq(i).show();
            }else{
                $(".facility_btn").eq(i).hide();
            }
        });
    }
}

function setFloorBtnCenter(p_floor){
    var i_index = 0;
    var i_width = 68;

    for(i = 0; i < gl_arr_floor_list.length; i++){
        obj = gl_arr_floor_list[i];
        if(obj[0] == p_floor){
            i_index = i;
        }
    }
    var i_left = i_width * i_index - 300;
    $("#id_floor_btn_wrap").scrollLeft(i_left);
}


function getPoiStorePosition(p_fac_id){
    var i = 0;
    var obj;
    var ret_obj = {id:"",floorId:"",x:"",y:""};

    for(i = 0; i < gl_arr_poi_all_list.length; i++){
        obj = gl_arr_poi_all_list[i];
        if(obj.id == p_fac_id){
            ret_obj.id = p_fac_id;
            ret_obj.x = obj.x;
            ret_obj.y = obj.y;
            ret_obj.floorId = obj.floorId;
            return ret_obj;
        }
    }

    return ret_obj;
}


function getPoiPosition(p_poi){
    
    var ret_obj = {id:"",floorId:"",x:"",y:""};

    gl_map_draws.response.poiInfo.forEach((poi,index) => {
        //console.log(poi.title + " , " + poi.floorId);
        if(poi.id == p_poi){
            ret_obj.x = poi.position.x;
            ret_obj.y = poi.position.y;
            ret_obj.floorId = poi.floorId;
            return ret_obj;
        }
    });
    return ret_obj;
}


/////////////////////////////////////////////////
// CLICK EVENT
/////////////////////////////////////////////////

function onClickMapFloor(p_obj){
    
    var str_tmp = "";

    if(p_obj.detail == null || p_obj.detail == undefined){
        return;
    }

    try{
        console.log("------------------------");
        console.log(p_obj.detail);
        //console.log(p_obj.detail[0].metadatas[0]);
        console.log("------------------------");

        if(p_obj.detail[0].metadatas[0].metadatas[0].text != undefined){
            var json_doc = JSON.parse(p_obj.detail[0].metadatas[0].metadatas[0].text);
            str_code = json_doc.categoryCode + "";
            if(str_code.length == 4){
                str_tmp = str_code.substring(0,2);
                if(str_tmp == "00"){
                    var cmd_obj = { sect:"POPUP", type:"STORE", id:"", code:"" };
                    cmd_obj.id = json_doc.facID;
                    if(parent.MAINPARENTCUSTOMCODE){
                        parent.setParentCmd(cmd_obj);
                    }
                }
            }
        }
    }catch(err){
        console.log("onClickMapFloor Error : " + err);
    }
   
}


// 전층안내
function onClickInfoFloorAll(){

    $("#id_page_floor_all").fadeIn(gl_main_conf.speed);
    $("#id_page_floor_all").scrollLeft(0);
    $("#id_btn_floor_all").addClass("circle_65_wide_active");

    $("#id_btn_floor_all_prev").hide();
    $("#id_btn_floor_all_next").show();
}

function onClickFloorAllMove(p_type){

    if(p_type == "PREV"){
        $("#id_page_floor_all_map").animate({scrollLeft:0},300);
        $("#id_btn_floor_all_prev").hide();
        $("#id_btn_floor_all_next").show();
    }else if(p_type == "NEXT"){
        $("#id_page_floor_all_map").animate({scrollLeft:522},300);
        $("#id_btn_floor_all_prev").show();
        $("#id_btn_floor_all_next").hide();
    }
}


// 공용시설 클릭
function onClickInfoFacility(p_obj){
    var i = 0;
    var obj;
    var xx = 0, yy = 0;
    var str_icon = "";

    $(".facility_btn").removeClass("facility_btn_active");
    $(p_obj).addClass("facility_btn_active");

    var str_code = $(p_obj).attr("code");
    
    var arr_marker = [];

    str_icon = getFacilityIcon(str_code);
    if(str_icon == "") return;

    gl_map_draws.clearMarker();
    gl_map_draws.getRouteOff();

    for(i = 0; i < gl_arr_poi_facility_list.length; i++){
        obj = gl_arr_poi_facility_list[i];
        if(obj.floorId == gl_map_conf.floor_id && obj.cate_code == str_code ){
            var obj_marker = {position:{
                   x: obj.x,
                   y: obj.y,
                   z: 50},
               size: {
                   width:20, 
                   height: 20
               },
               image: "images/facility_ic_" + str_icon + "_o.png",
               floorId: gl_map_conf.floor_id
            };
            arr_marker.push(obj_marker);
        }
    }

    // image: "images/map_ic_" + str_icon + "_o.png",
    
    //facility_ic_01_o.png

    gl_map_draws.setMarker({marker:arr_marker});
}

// 층 클릭
function onClickInfoFloor(p_obj){

    var str_code = $(p_obj).attr("code");

    if(str_code == "") return;

    setMapMoveFloor(str_code);
    
    //층별 타이틀 변경 201211수정
    var str_lang = gl_main_conf.lang.toLowerCase();
    gl_main_conf.floor = str_code;
    
    try{
        $("#id_store_ctg").html( gl_jsop_lang_data.floor[`FLOOR_LEVEL_${str_code}`][str_lang]);
    }catch(err){

    }

    //setFloorBtnCenter(str_code);
    
    //str_floor = $(p_obj);
    //console.log("(str_floor.width() = " + str_floor.width());
    //var str_floor = $(p_obj);
    //$("#id_floor_btn_wrap").scrollLeft((str_floor.width()) * (str_floor.index()+1) - $("#id_floor_btn_wrap").width()/2);
}

// 전층안내에서 클릭했을 때
function onClickInfoFloorMove(p_type,p_block,p_floor){
    
    var pos_x = 0;
    var pos_y = 1800;

    console.log("onClickInfoFloorMove = " + p_type + " , " + p_block + " , " + p_floor);

    if(p_block == "TOWER"){
        pos_x = 1500;
        pos_y = 1900;
    }else if(p_block == "TA_BRIDGE"){
        pos_x = 1200;
        pos_y = 1900;
    }else if(p_block == "AVENUEL"){
        pos_x = 1200;
    }else if(p_block == "DUTY"){
        pos_x = 1200;
    }else if(p_block == "AM_BRIDGE"){
        pos_x = 2000;
        pos_y = 1800;
    }else if(p_block == "MALL"){
        pos_x = 3300;
        pos_y = 1500;
    }

    // 숫자가 작으면 밑으로 숫자가 크면 위로

    console.log("pos_x = " + pos_x + " , " + pos_y);

    $("#id_page_floor_all").fadeOut(gl_main_conf.speed);

    setMapMoveFloor(p_floor);

    setFloorBtnCenter(p_floor);

    gl_map_draws.moveCamera({
        "x": pos_x,
        "y": pos_y
    });
    gl_map_draws.zoomControl(250);

}


// 이동수단 선택  ELE / ESC 
function onClickPopUpSelect(p_obj,p_type){

    $(".pop_icon_way").removeClass("pop_icon_way_active");
    $(p_obj).addClass("pop_icon_way_active");

    $("#id_popup_bg").fadeOut(gl_main_conf.speed);
    $("#id_popup_select").fadeOut(gl_main_conf.speed);

    setTimeout(setMainWayFindStart,400,p_type);
}


// 팝업 클리어
function onClickPopupClose(p_type){

    if(p_type == "SELECT"){

        $("#id_popup_bg").fadeOut(gl_main_conf.speed);
        $("#id_popup_select").fadeOut(gl_main_conf.speed);

    }else if(p_type == ""){


    }
}

function getFindPoiToFloor(p_type,p_code){
    var i = 0;
    var obj;
    var ret_floor = "";
    for(i = 0; i < gl_arr_floor_list.length; i++){
        obj = gl_arr_floor_list[i];
        if(p_type == "POITOFLOOR"){
            if(obj[1] == p_code){
                ret_floor = obj[0];
                break;
            }
        }else{
            if(obj[0] == p_code){
                ret_floor = obj[1];
                break;
            }
        }
    }

    return ret_floor;
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
        console.log("getInfoLangNames FLOOR ERROR : " + p_attr);
    }
    return str_name;
}


function getFacilityIcon(p_code){
    var str_icon = "";

    if(p_code == "0400"){ str_icon = "01";
    }else if(p_code == "0435"){ str_icon = "02";
    }else if(p_code == "0425"){ str_icon = "03";
    }else if(p_code == "0427"){ str_icon = "04";
    }else if(p_code == "0426"){ str_icon = "05";
    }else if(p_code == "0413"){ str_icon = "06";
    }else if(p_code == "0414"){ str_icon = "07";
    }else if(p_code == "0423"){ str_icon = "08";
    }else if(p_code == "0407"){ str_icon = "09";
    }else if(p_code == "0401"){ str_icon = "10";
    }else if(p_code == "0418"){ str_icon = "11";
    }else if(p_code == "0417"){ str_icon = "12";
    }else if(p_code == "0443"){ str_icon = "13";
    }else if(p_code == "0404"){ str_icon = "14";
    }else if(p_code == "0444"){ str_icon = "15";
    }else if(p_code == "0410"){ str_icon = "16";
    }else if(p_code == "0445"){ str_icon = "17";
    }else if(p_code == "0408"){ str_icon = "18";
    }else if(p_code == "0403"){ str_icon = "19";
    }else if(p_code == "0420"){ str_icon = "20";
    }else if(p_code == "0421"){ str_icon = "21";
    }else if(p_code == "0405"){ str_icon = "22";
    }else if(p_code == "0432"){ str_icon = "23";
    }else if(p_code == "0411"){ str_icon = "24";
    }else if(p_code == "0437"){ str_icon = "25";
    }else if(p_code == "0438"){ str_icon = "26";
    }

    return str_icon;
}




/////////////////////////////////////////////////
// DEBUG EVENT
/////////////////////////////////////////////////

function onClickDebug01(){

    $("#id_page_map_main").hide();
}

function onClickDebug02(){
    $("#id_page_map_main").show();
}


function onClickDebugLang(p_type){
    setMainLang(p_type);
}


/*

size: {width: 5000, height: 3800}

FL-1iusqjg0imn1u7354 , 31F
floor.js:169 FL-1hbaz115xh0s87348 , 12F
floor.js:169 FL-1hrlz18bv8b517326 , 11F
floor.js:169 FL-1ievjivl3u3hw7319 , 10F
floor.js:169 FL-urrwu2r49rua7272 , 9F
floor.js:169 FL-1ibe9suzky6uq7332 , 8F
floor.js:169 FL-1ib0ejj39q8fl7265 , 7F
floor.js:169 FL-1iauu7iz5utes7249 , 6F
floor.js:169 FL-1ieuyh7ogs7qs7221 , 5F
floor.js:169 FL-qeco4i835pb67191 , 4F
floor.js:169 FL-1ibbkfokxop4j7167 , 3F
floor.js:169 FL-1ibc010wn71437143 , 2F
floor.js:169 FL-1hv5g9wigpt9h7085 , 1F
floor.js:169 FL-qxlil1hangpu7108 , B1f
floor.js:169 FL-qecoi93umzqd7289 , B2f
floor.js:169 FL-1k22ao6zs5cmp7299 , B3f
floor.js:169 FL-toamcpn6sk0z7305 , B4f
floor.js:169 FL-1ieviqvnyrm0o7310 , B5f
*/