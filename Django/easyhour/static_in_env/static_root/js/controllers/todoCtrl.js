angular.module('myApp')
    //--------------------------------------------------------
    // Constants
    //--------------------------------------------------------
    .constant("scheduleListActiveClass","btn-primary")
    .constant("scheduleListPageCount",1)
    //--------------------------------------------------------
    // Controller
    //--------------------------------------------------------
	.controller("ScheduleCtrl", function ScheduleCtrl($scope,$filter,servicePrograms,factoryData,scheduleListActiveClass,scheduleListPageCount){
		'use strict';
		var day = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
        $scope.days = day;
		$scope.programs = servicePrograms.universityProgram();
		$scope.semester = factoryData.get();
        
        var safeGroups = factoryData.safeGroup();
        var schedules = generateSchedule(safeGroups);
        var find = false;
        for (var i = schedules.length;i > 0 && !find ; i--){
            if(schedules[i] != null && schedules[i].length>0 && schedules[i].length < 8){
                    $scope.schedules = schedules[i];
                    find = true;     
            }         
        }
        
        $scope.loadData = function (){
			var url = 'http://localhost:8090/json/HORPROG'+$scope.selected+'.json';
			factoryData.getSemesters(url);
		};
		$scope.selectedSemester = function(semester){
			$scope.subjects = factoryData.getSelectedSemester(semester);
            $scope.groups = factoryData.getSelectedSubject(semester[0]);
		};
		$scope.selectedSubject = function(subject){
			$scope.groups = factoryData.getSelectedSubject(subject);
            console.log($scope.groups);
		};
        $scope.checkSemester = function(semester){
    	 	factoryData.semesterFilter(semester);
        };
        $scope.checkSubject = function(subject){
        	factoryData.subjectFilter(subject);
        };
        $scope.checkGroup = function(group){
        	factoryData.groupFilter(group);
        };
        $scope.formatHour = function(value){
            var value2 = value+"";
            if(value2.length == 3)
                value2 = "0"+value2;
            value2 = value2.substring(0,2)+":"+value2.substring(2,4);
            return value2;
         };
        $scope.selectedPage = 1;
        $scope.pageSize = scheduleListPageCount;
        $scope.selectPage = function(newPage){
            $scope.selectedPage = newPage;
        };
        $scope.getPageClass = function(page){
            return $scope.selectedPage == page ? scheduleListActiveClass:"";
        };
 	});
