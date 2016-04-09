angular.module('myApp')
    //--------------------------------------------------------
    // Filters
    //--------------------------------------------------------
    .filter("range", function ($filter){
        return function (schedules, page, size){
            if(angular.isArray(schedules) && angular.isNumber(page) && angular.isNumber(size)){
                var start_index = (page - 1 ) * size;
                if(schedules.length < start_index){
                    return [];
                }else{
                    var array = [];
                    for(var i = start_index; i < size+start_index;i++){
                        array.push(schedules[i]);
                    }
                    return array;
                }
            }else{
                return schedules;
            }
        }
    })
    .filter("pageCount", function(){
        return function(schedules, size){
            if(angular.isArray(schedules)){
                var result = [];
                for(var i = 0; i < Math.ceil(schedules.length/size); i++){
                    result.push(i);
                }
                return result;
            }else{
                return schedules;
            }
        }
    });
