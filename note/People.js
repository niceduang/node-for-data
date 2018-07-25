function People(name) {
	this.name = name ? name : 'duang';
}
People.prototype.say = function() {
	console.log('say: my name is ' + this.name);
}
module.exports = People;