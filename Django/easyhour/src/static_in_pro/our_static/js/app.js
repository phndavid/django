angular.module('myApp',['ngRoute','ngResource'])
	.config(function($routeProvider)
{   'use strict';
    $routeProvider.when('/',{
            controller:'LoginCtrl',
            templateUrl:'view/signin.html'
        })
        .when('/home',{
            controller:'ScheduleCtrl',
            templateUrl: 'view/home.html'
        })
	    .when('/create-schedule',{
            controller:'ScheduleCtrl',
            templateUrl: 'view/create.html'
        })
	    .when('/personal-info',{
            controller:'ScheduleCtrl',
            templateUrl: 'view/personal-info.html'
        })
        .when('/my-schedule',{
            controller:'ScheduleCtrl',
            templateUrl: 'view/my-schedule.html'
        }).otherwise({
            redirectTo: '/'
        });
});
