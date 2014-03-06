var socket = io.connect('http://localhost:3000');
var myHexColor;

var haterCount = 0,
	loverCount = 0;

function responseCounter(e){
	if (e.properties.love_or_hate === "love"){
		loverCount = loverCount + 1;
		$( "#loverText" ).html("<b> " + String(loverCount) + " Lovers</b>");
	}
	if (e.properties.love_or_hate === "hate"){
		haterCount = haterCount + 1;
		$( "#haterText" ).html("<b> " + String(haterCount) + " Haters</b>");
	}

	var totalCount = loverCount + haterCount;

	Morris.Donut({
	  element: 'myfirstchart',
	  data: [
	    {label: "Total", value: loverCount},
	    {label: "Total", value: haterCount}
	  ],
	  colors: ["#0000FF","#FF0000"],
	  formatter: function () {
	    var total = 0;
	    for (var k in this.data){
	      total = this.data[k].value + total
	    }
	    return String(total)
	  }
	});

}

function responseColor(e){
	if (e.properties.love_or_hate === "love"){
		return "#0000FF";
	}
	if (e.properties.love_or_hate === "hate") {
		return "#FF0000";
	}
	else {
		return "FFFFFF"
	}
}

function myChart(){

}

myChart()

socket.on('news', function (data) {

	responseCounter(data)
	var styleMarkerOptions = {
	    radius: 4,
	    fillColor: responseColor(data),
	    color: "#FFFFFF",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};

	L.circleMarker(data.geometry.coordinates, styleMarkerOptions).bindPopup(
			data.properties.name + " (@" + data.properties.twitter_handle + ")</br>" + data.properties.text)
	.addTo(map);
	var myHexColor = "";
	//socket.emit('my other event', { my: 'data' });
});

var map = L.map('map').setView([25, -35], 3);

L.tileLayer.provider('Nokia.terrainDay', {
    devID: 'Z3K4myAR0Fv1bzOrQniEDQ',
    appId: 'kI3XbjsvV7R2M2iqDTZg'
}).addTo(map);


