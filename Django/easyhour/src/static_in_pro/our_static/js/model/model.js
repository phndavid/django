//------------------
// class EasyHour
//------------------
var LIMIT_SUBJECTS = 8;
var LIMIT_CREDIT = 21;
//------------------
// constructor EasyHour
//------------------
function generateSchedule(grupos) 
{
	var finales = [];
	var iniciales = getShedulesInitOfGroups(grupos);
	for(var i=0; i< LIMIT_SUBJECTS+1; i++){
			finales[i] = [];
	}
	finales[1] = iniciales;
	combineSchedules(finales,iniciales,grupos,1);
	return finales;
}
//------------------
// class Class
//------------------
//------------------
// constructor Class
//------------------
function Class(day,hInit,hEnd,classroom) 
{
	this.day = day;
	this.hInit = hInit;
	this.hEnd = hEnd; 
	this.classroom = classroom;
}
Class.prototype.classCross = function(c)
{
		if(c.day == this.day)
		{
			var i = c.hInit;
			var f = c.hEnd;
			if(i < this.hInit && this.hInit < f){
				return true;
			}
			if(i < this.hEnd && this.hEnd < f){
				return true;
			}
			if(this.hInit < i && i < this.hEnd){
				return true;
			}	
			if(this.hInit < f && f < this.hEnd){
				return true;
			}	
			if(this.hInit == i && this.hEnd == f){
				return true;
			}
		}
		return false;
};
//------------------
// class Subject
//------------------
//------------------
// constructor Subject
//------------------
function Subject(name,credit,state)
{
	this.name = name;
	this.credit = credit;
	this.state = state;		
}
//------------------
// class Group
//------------------
//------------------
// constructor Group
//------------------
function Group(nameProfessor,subject,id,state)
{
	this.nameProfessor = nameProfessor;
	this.subject = subject;
	this.id = id;
	this.state = state;
}
Group.prototype.cross = function(g)
{
	for(var i=0; i < g.classes.length; i++)
	{	
		for(var j=0; j < this.classes.length; j++)
		{
			if(g.classes[i].classCross(this.classes[j])){
				return true;
			}	
		}
	}
	return false;
};
//------------------
// class Schedule
//------------------	
function Schedule(id)
{
	this.id = id;
	this.credits = 0;
}
//------------------
// initialize Subjects 
//------------------

function getGroupOfSubjects(subjects)
{
	var groups = [];
	for (var i = 0; i < subjects.length; i++){
		var sub = subjects[i];
		for (var j = 0; j < sub.groups.length; j++){
			var subgr = sub.groups[j];
			groups.push(subgr);
		}
	}
	return groups;
}
function getShedulesInitOfGroups(groups)
{
	var schedules = [];
	for (var i = 0; i < groups.length; i++){
		var h = new Schedule(i);
		h.groups = [];
		h.groups.push(groups[i]);
		schedules.push(h);
	}
	return schedules;
}
//------------------
// verify if the subjects are equals or have crosses
//------------------
function verify(group,schedule)
{
	var grs = schedule.groups;
	for (var j = 0; j < grs.length; j++){
		var gr = grs[j];
		if((gr.subject == group.subject) || (gr.cross(group))) 
			return false;
	}		
	return true;
}
//------------------
// combine schedules
//------------------
function combineSchedules(finales,schedule,grupos,pG)
{
	for (var i = 0; i < schedule.length; i++){	
		var h = schedule[i];
		var lista = [];
		if (h.groups.length < LIMIT_SUBJECTS)
        {
			for (var j = grupos.indexOf(h.groups[h.groups.length-1])+1; j < grupos.length; j++){
				var gr0 = grupos[j];
				if(verify(gr0,h)){
					var hT = angular.copy(h);
					hT.groups.push(gr0);
					finales[hT.groups.length].push(hT);
					lista.push(hT); 
				}
			}
			if(lista.length !== 0)
				combineSchedules(finales, lista, grupos, ++pG);
		}
	}
}
