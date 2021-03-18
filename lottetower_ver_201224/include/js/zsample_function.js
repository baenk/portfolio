    var str = '¤¤¤·¤»';
    for(i = 0; i < gl_arr_store_list.length; i++){
        obj = gl_arr_store_list[i];

        if(obj.STORE_NAME_CHO.indexOf(str) == 0){
            console.log(obj.STORE_NAME_KOR + " , " + obj.STORE_NAME_CHO);
        }
        /*
        if(obj.STORE_NAME_CHO.includes(str) == true){
            console.log(obj.STORE_NAME_KOR + " , " + obj.STORE_NAME_CHO);
        }
        */
    }
