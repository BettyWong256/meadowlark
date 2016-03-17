var cake = [
	"Tell me why",
	"Plase don't cry",
	"Tell me why",
	"Say goodbye"
];

exports.getCake = function(){
	var idx = Math.floor(Math.random()*cake.length);
	return cake[idx];
}