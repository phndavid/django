angular.module('myApp')
	.factory("factoryData",function($http){
        'use strict';
        var factoryData = {};
        var semesters = [];
        factoryData.getData = function(url){
           return  $http.get(url);
        };
        factoryData.get = function(){
            return semesters;
        };
         factoryData.getSemesters = function(url){
            this.getData(url)
             .success(function (subjects) {
                for(var i=1; i<= 10; i++){
                    semesters[i] = [];
                    semesters[i].estado = false;
                    for (var j = 0; j < subjects.length;j++){
                        var s = subjects[j].semestre;
                        if(s == (i)){
                            var m1 = new Subject(subjects[j].materia,0,false);
                            m1.groups = [];
                            var gr = subjects[j].grupos;
                            for(var k = 0; k < gr.length; k++){
                                var g1 = new Group(gr[k].profesor, m1, gr[k].id,false);
                                m1.groups.push(g1);
                                g1.classes = [];
                                for(var c = 0; c < gr[k].clases.length; c++){
                                    var c1 = gr[k].clases[c];
                                    var c2 = new Class(c1.dia,c1.horaInicio,c1.horaFin,c1.salon);
                                    g1.classes.push(c2);
                                }
                            }
                            semesters[s].push(m1);
                        }
                    }
                }
              })
              .error(function (error) {
                  alert("No found program") ;
              });
              console.log(semesters);
              return semesters;
        };
        factoryData.getSelectedSemester = function(semester){
            for(var i = 1; i<semesters.length;i++){
                if(semesters[i] == semester){
                    return semesters[i];
                }        
            }
           return null;
        };
        factoryData.getSelectedSubject = function(subject){
            for(var i = 1; i<semesters.length;i++){
                for(var j = 0; j< semesters[i].length;j++){
                    if(semesters[i][j] == subject)
                            return semesters[i][j].groups;
                }  
            }
            return null;
        };
        factoryData.semesterFilter = function(semester){
            var change = false;
            for(var i = 1; i < semesters.length && !change;i++){
                if(semesters[i] == semester){
                        semesters[i].estado = !semester.estado;
                        for(var j = 0; j< semesters[i].length;j++){
                            semesters[i][j].state = !semesters[i][j].state;
                            for(var k = 0; k<semesters[i][j].groups.length;k++)
                                semesters[i][j].groups[k].state = !semesters[i][j].groups[k].state;  
                        }
                   change = true;
                }
            }
            this.getSelectedSemester(semester);
            return semesters;
        };
        factoryData.subjectFilter = function(subject)
        {
            var change = false;
            for(var i = 1; i < semesters.length && !change;i++){
                for(var j = 0; j< semesters[i].length && !change;j++){
                    if(semesters[i][j] == subject){
                        semesters[i][j].state = !semesters[i][j].state; 
                        for(var k = 0; k<semesters[i][j].groups.length;k++)
                            semesters[i][j].groups[k].state = !semesters[i][j].groups[k].state; 
                            change = true;
                    }  
                }
            }
            this.getSelectedSubject(subject);
            return semesters;
        };
        factoryData.groupFilter = function(group)
        {
            var change = false;
            for(var i = 1; i < semesters.length && !change;i++){
                for(var j = 0; j< semesters[i].length && !change;j++){
                        for(var k = 0; k<semesters[i][j].groups.length;k++){
                            if( semesters[i][j].groups[k] ==group){
                                semesters[i][j].groups[k].state = !semesters[i][j].groups[k].state; 
                                change = true;
                            }       
                        }
                }
            }
            return semesters;
        };
        factoryData.safeGroup = function(){
            var safeGroup = [];
            for(var i = 1; i < semesters.length ;i++){
                for(var j = 0; j< semesters[i].length;j++){
                    for(var k = 0; k<semesters[i][j].groups.length;k++){
                        if(semesters[i][j].groups[k].state){
                             safeGroup.push(semesters[i][j].groups[k]);
                        }    
                    }
                }
            }
            return safeGroup;
        };
        return factoryData;
    });