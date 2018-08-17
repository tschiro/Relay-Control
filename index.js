var express = require('express');
var Gpio = require('onoff').Gpio;

var relay1 = new Gpio(5,'out');
var relay2 = new Gpio(6,'out');
var relay3 = new Gpio(13,'out');
var relay4 = new Gpio(19,'out');

var relaySelected=[relay1,relay2,relay3,relay4];

var t1EndSeconds=0;
var t1StartSeconds=0;
var t2StartSeconds=0;
var t2EndSeconds=0;
var t3EndSeconds=0;
var t3StartSeconds=0;
var t4StartSeconds=0;
var t4EndSeconds=0;
var t1Gpio;
var t2Gpio;
var t3Gpio;
var t4Gpio;

app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function(req,res) {
	res.render("index",{"timerParams":null});
	
});
app.post('/set', function(req,res) { 
	var t1StartTimeArray=req.body.t1Start.split(":");
	t1StartSeconds=Number(t1StartTimeArray[0])*3600 + Number(t1StartTimeArray[1])*60 + Number(t1StartTimeArray[2]);
	t1EndSeconds = t1StartSeconds+Math.round((req.body.t1Run)*60);
	t1Gpio=req.body.output1;
	
	var t2StartTimeArray=req.body.t2Start.split(":");
	t2StartSeconds=Number(t2StartTimeArray[0])*3600 + Number(t2StartTimeArray[1])*60 + Number(t2StartTimeArray[2]);
	t2EndSeconds = t2StartSeconds+Math.round((req.body.t2Run)*60);
	t2Gpio=req.body.output2;
	
	var t3StartTimeArray=req.body.t3Start.split(":");
	t3StartSeconds=Number(t3StartTimeArray[0])*3600 + Number(t3StartTimeArray[1])*60 + Number(t3StartTimeArray[2]);
	t3EndSeconds = t3StartSeconds+Math.round((req.body.t3Run)*60);
	t3Gpio=req.body.output3;
	
	var t4StartTimeArray=req.body.t4Start.split(":");
	t4StartSeconds=Number(t4StartTimeArray[0])*3600 + Number(t4StartTimeArray[1])*60 + Number(t4StartTimeArray[2]);
	t4EndSeconds = t4StartSeconds+Math.round((req.body.t4Run)*60);
	t4Gpio=req.body.output4;
	
	res.render("index", {"timerParams":req.body});
});	

app.listen(3000, function() {
	console.log("listening");		
});

var timeLoop = setInterval(checkTime, 1000); //Run checkTime every second

function checkTime() {
	var currentTime = new Date();
	var currentTimeSeconds = currentTime.getHours()*3600+currentTime.getMinutes()*60+currentTime.getSeconds();

	if(currentTimeSeconds == t1StartSeconds){
		console.log("Timer1 started at: "+ (new Date()).toLocaleTimeString());
		relaySelected[t1Gpio].writeSync(1);
	}
	if(currentTimeSeconds == t1EndSeconds){
		console.log("Timer1 ended at: "+(new Date()).toLocaleTimeString());
		relaySelected[t1Gpio].writeSync(0);
	}	
	if(currentTimeSeconds == t2StartSeconds){
		console.log("Timer2 started at: "+ (new Date()).toLocaleTimeString());
		relaySelected[t2Gpio].writeSync(1);
	}
	if(currentTimeSeconds == t2EndSeconds){
		console.log("Timer2 ended at: "+(new Date()).toLocaleTimeString());
		relaySelected[t2Gpio].writeSync(0);
	}
	if(currentTimeSeconds == t3StartSeconds){
		console.log("Timer3 started at: "+ (new Date()).toLocaleTimeString());
		relaySelected[t3Gpio].writeSync(1);
	}
	if(currentTimeSeconds == t3EndSeconds){
		console.log("Timer3 ended at: "+(new Date()).toLocaleTimeString());
		relaySelected[t3Gpio].writeSync(0);
	}	
	if(currentTimeSeconds == t4StartSeconds){
		console.log("Timer4 started at: "+ (new Date()).toLocaleTimeString());
		relaySelected[t4Gpio].writeSync(1);
	}
	if(currentTimeSeconds == t4EndSeconds){
		console.log("Timer4 ended at: "+(new Date()).toLocaleTimeString());
		relaySelected[t4Gpio].writeSync(0);
	}
}

