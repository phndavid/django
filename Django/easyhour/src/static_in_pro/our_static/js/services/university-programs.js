angular.module('myApp')
.service('servicePrograms', function(){
     this.universityProgram = function(){
        return [
				{name:'Administración de empresas plan diurno',id:'01'},
				{name:'Administración de empresas plan nocturno',id:'02'},
				{name:'Ingeniería de sistemas',id:'03'},
				{name:'Ingeniería industrial',id:'04'},
				{name:'Diseno industrial',id:'05'},
				{name:'Economica y negocios internacionales',id:'06'},
				{name:'Ingeniería telemática',id:'07'},
				{name:'Contaduria pública y finanzas internacionales',id:'08'},
				{name:'Derecho',id:'09'},
				{name:'Mecadeo internacional y publicidad',id:'11'},
				{name:'Diseño de medios interativos',id:'12'},
				{name:'Antropologia',id:'13'},
				{name:'Sociologia',id:'14'},
				{name:'Economia con énfasis en politicas públicas',id:'15'},
				{name:'Psicologia',id:'16'},
				{name:'Ciencia politica',id:'17'},
				{name:'Biologia',id:'18'},
				{name:'Quimica',id:'19'},
				{name:'Quimica farmacéutica',id:'20'},
				{name:'Medicina',id:'21'}
			]
     }
});
