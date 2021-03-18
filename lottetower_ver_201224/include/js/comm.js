/******************************************
   name :  comm.js
   auth :  ELTOV
   date :  2020.11.08
   desc :  기본유틸과 디파인 구성정보들
*******************************************/



// 널체크 
function getChkNull(p_src){
    if(p_src == null || p_src == undefined){
        return "";
    }else{
        return p_src + "";
    }
}

function getCvtXmlTag(p_src){
    var p1 = /&amp;/gi;
    var p2 = /&lt;/gi;
    var p3 = /&gt;/gi;
    var p4 = /&quot;/gi;
    var p5 = /&apos;/gi;

    if(p_src == null || p_src == undefined){
        return "";
    }

    p_src = p_src + "";
    p_src = p_src.replace(p1,"&");
    p_src = p_src.replace(p2,"<");
    p_src = p_src.replace(p3,">");
    p_src = p_src.replace(p4,"\"");
    p_src = p_src.replace(p5,"\'");
    p_src = p_src.trim();
    return p_src;
}

function getCvtSearchName(p_src){

    if(p_src == null || p_src == undefined){
        return "";
    }
    //var p1 = / /gi;
    var p1 = /[^a-z^0-9]/gi;
    //var p1 = /[^a-z]/gi;
    p_src = p_src.toLowerCase();
    p_src = p_src.replace(p1,"");
    //p_src = p_src.trim();
    return p_src;
}

function getCvtXmlNum(p_src,p_default){
    if(p_default == undefined) p_default = 0;
    if(p_src == null ) return p_default;
    if(isNaN(p_src) == true) return p_default;
    return Number(p_src);
}

function getCvtRemoveWhite(p_src){
    var p1 = / /gi;
    var p2 = /\t/gi;
    var p3 = /\n/gi;

    if(p_src == null || p_src == undefined){
        return "";
    }

    p_src = p_src + "";
    p_src = p_src.replace(p1,"");
    p_src = p_src.replace(p2,"");
    p_src = p_src.replace(p3,"");
    p_src = p_src.trim();
    return p_src;
}


function getMapPosition(p_obj){

    var ret_obj = { left:0, top:0 };
    var left = p_obj.style.left;
    var top = p_obj.style.top;

    //console.log(p_obj.translate3d);

    left = left.replace(/px/gi,"");
    top = top.replace(/px/gi,"");

    ret_obj.left = parseFloat(left);
    ret_obj.top = parseFloat(top);

    return ret_obj;
}


function getUrlParams(p_url) {
    var params = {};
    p_url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}


function getPosTransform(p_obj){

    var ret_obj = { left:0, top:0 };

    var str_trans = p_obj.style.transform;
    console.log("str_transstr_trans = " + str_trans);
    if(str_trans.indexOf("translate") >= 0){
        str_trans = str_trans.replace(/translate/gi,"");
        str_trans = str_trans.replace(/\(/gi,"");
        str_trans = str_trans.replace(/\)/gi,"");
        str_trans = str_trans.replace(/ /gi,"");
        str_trans = str_trans.replace(/px/gi,"");

        var arr_str = str_trans.split(',');
        if(arr_str.length == 2){
            ret_obj.left = parseFloat(arr_str[0]);
            ret_obj.top = parseFloat(arr_str[1]);
        }
    }else if(str_trans.indexOf("matrix") >= 0){
        str_trans = str_trans.replace(/matrix/gi,"");
        str_trans = str_trans.replace(/\(/gi,"");
        str_trans = str_trans.replace(/\)/gi,"");
        str_trans = str_trans.replace(/ /gi,"");
        str_trans = str_trans.replace(/px/gi,"");

        var arr_str = str_trans.split(',');
        if(arr_str.length == 6){
            ret_obj.left = parseFloat(arr_str[4]);
            ret_obj.top = parseFloat(arr_str[5]);
        }
    }
    return ret_obj;
}



$.fn.elTOVModal = function(cmd,parameters,callback){
    var settings;
    var fnc;
    if($.isPlainObject(parameters)){
        settings = $.extend(true, {}, $.fn.mymodal.settings, parameters);
    }else{
        settings = $.extend({}, $.fn.mymodal.settings);
    }

    if($.isPlainObject(callback)){
        fnc = callback;
    }

    if(cmd.toUpperCase() == "SHOW"){
        $(this).fadeIn(settings.speed);
        $(this).children('.popup_bg').show();
        $(this).children('.modal_nor_cts').addClass('showall');

        if(settings.backclose == true){
            $(this).children('.popup_bg').click(function(e){
                $(this).parent().fadeOut(settings.speed);
                $(this).unbind('click');
                $(this).parent().children('.modal_nor_cts').removeClass('showall');
                $(this).parent().children('.modal_nor_cts').unbind('click');
                if(settings.onHide){
                    settings.onHide();
                }
            });
        }
    }else if(cmd.toUpperCase() == "HIDE"){
        $(this).fadeOut(settings.speed);
        $(this).unbind('click');
        $(this).children('.modal_nor_cts').removeClass('showall');
        $(this).children('.modal_nor_cts').unbind('click');
        $(this).children('.modal_nor_bg').unbind('click');
        if(settings.onHide){
            settings.onHide();
        }
    }
}
$.fn.elTOVModal.settings = {
    backclose     : true,
    speed         : 300,
    onHide        : function(){},
}