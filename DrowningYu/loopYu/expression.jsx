function getexPressionText(){
	return '''

function getPreKeyIndex(property){
	if(time<property.key(1)){
	return 1;		
	}
	for(var i=1;i<property.numKeys;i++){
		if(property.key(i).time<=time&&time<property.key(i+1).time){
			return i;
		}
	}
	return i;
}
function time2Frame(thisTime){
	return Math.floor(thisTime / thisComp.frameDuration);
	}
function frame2Time(frame){
	return frame*thisComp.frameDuration;
	}


type=inputCon2.value;
var curKeyIndex=inputCon1.value;
var curKeyTime=inputCon1.key(getPreKeyIndex(inputCon1)).time;
var staTime=key(curKeyIndex).time;
var finTime=key(curKeyIndex+1).time;
var cycleDuration=key(curKeyIndex+1).time-key(curKeyIndex).time;
var offsetTime=curKeyTime%cycleDuration;



if(type===1){
	valueAtTime(staTime+((time-offsetTime)%cycleDuration));
	}
else
if(type===2){
	if(time<curKeyTime+cycleDuration){
		valueAtTime(staTime+((time-offsetTime)%cycleDuration));
	}
	else{
		valueAtTime(key(curKeyIndex+1).time)
	}
}
else
if(type===3){
	
	selectedFrame=Math.floor(Math.floor(inputCon3)/10);
	totalFrames=time2Frame(cycleDuration);
	if(selectedFrame<0)
		selectedFrame=0;
	if(selectedFrame>totalFrames)
		selectedFrame=totalFrames;
	valueAtTime(key(curKeyIndex).time+frame2Time(selectedFrame))
}
else
if(type===4){
	if(time<curKeyTime+cycleDuration){
		valueAtTime(finTime-((time-offsetTime)%cycleDuration));
	}
	else{
		valueAtTime(key(curKeyIndex).time)
	}
}
else
if(type===5){
	valueAtTime(finTime-((time-offsetTime)%cycleDuration));
	}
else
if(type===6){
	if((Math.floor( (time-staTime) / cycleDuration )%2)===0){
		valueAtTime(staTime+((time-offsetTime)%cycleDuration));
	}
	else{
		valueAtTime(finTime-((time-offsetTime)%cycleDuration));
	}
}
else{
	valueAtTime(staTime+((time-offsetTime)%cycleDuration));
}
	''';
}
