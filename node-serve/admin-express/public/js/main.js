const App = function () {
  this.URI = window.location.href
  this.addURI = this.URI + 'add/'
}
$(function () {
  let modle = new App()
  $.ajax({
    url: modle.addURI,
    type: 'GET',
  	// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
  	data: {param1: 'value1'},
  })
  .done(function() {
  	console.log("success");
  })
  .fail(function() {
  	console.log("error");
  })
  .always(function() {
  	console.log("complete");
  });
})