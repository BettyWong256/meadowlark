var cake = [
	"Tell me why",
	"Plase don't cry",
	"Tell me why",
	"Say goodbye"
];
var location={
	locations: [
		{
			name:'Portland',
			forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
			iconUrl:'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
			weather: 'Overcast',
			temp:'54.1 F'
		},{
			name:'Bend',
			forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
			iconUrl:'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
			weather: 'Partly Cloudy',
			temp:'55.0 F'
		},{
			name:'Manzanita',
			forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
			iconUrl:'http://icons-ak.wxug.com/i/c/k/rain.gif',
			weather: 'Rain',
			temp:'55.0 F'
		}

	]
};


exports.getCake = function(){
	var idx = Math.floor(Math.random()*cake.length);
	return cake[idx];
};

exports.weather = function(){
	return location;
};