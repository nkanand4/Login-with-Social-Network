/**
 * Logging support
 */
var logger = function() {
	var ANNOY=true,
	loggingPanel=document.getElementById('logger-div');
	if(!loggingPanel) {		
		var loggingPanel = document.createElement('ol');
		loggingPanel.setAttribute('id', 'logger-div');
		loggingPanel.style.position='fixed';
		loggingPanel.style.bottom='0px';
		loggingPanel.style.height='100px';
		loggingPanel.style.width=(window.innerWidth-150)+'px';
		loggingPanel.style.overflow='auto';
		document.getElementsByTagName('body')[0].appendChild(loggingPanel);
	}
	
	var messenger = !ANNOY ? console.log : function() {
		var row=document.createElement('li');
		row.innerHTML=arguments[0];
		row.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);
		loggingPanel.appendChild(row);
	};
	
	function log() {
		var m;
		if(typeof arguments[0] === 'object') {
			try {
				m=JSON.stringify(arguments[0]);
				messenger(m);
			}catch(e){
				console.log(e);
				alert(m);
			}
		} else {
			messenger(arguments[0].toString());
		}
	}
	
	for(var i=0;i<arguments.length;i++) {
		log(arguments[i]);
	}
};