var trimInput = function (value) {
    return value.replace(/^\s*|\s*$/g, '');
};

var isNotEmpty = function (value) {
    if (value && value !== ''){
        return true;
    }
    return false;
};

var isEmail = function (value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    return false;
};
var login = function(){
    console.log("login");
    var email =  trimInput($('#email').val());
    var password =  $('#password').val();
    console.log(email);
    console.log(password);
    var obj = '"email": '+ email +', "password": '+ password;
    if(isNotEmpty(email) && isNotEmpty(password) && isEmail(email)){
       $.ajax({
            type: "POST",
            data: obj,
            url: "http://"+window.location.hostname + ":8090/login",
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, error, errorThrown) {
                $.unblockUI();
            }
        });
    }
      
}
var signup = function(){
    console.log("login");
    var email =  trimInput($('#email').val());
    var password =  $('#password').val();
    console.log(email);
    console.log(password);
    var obj = '{ "email": '+email +', "password": '+password+'}';

    console.log(obj);
    console.log(window.location.hostname);
    if(isNotEmpty(email) && isNotEmpty(password) && isEmail(email)){
         $.ajax({
            type: "POST",
            data: JSON.parse(obj),
            url: "http://"+window.location.hostname + ":8090/register",
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, error, errorThrown) {
                $.unblockUI();
            }
        });
    }
     
}
//ng-click="login('email@hotmail.com','123')"