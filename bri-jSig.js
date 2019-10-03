(function($) {
	var topics = {};
	$.publish = function(topic, args) {
	    if (topics[topic]) {
	        var currentTopic = topics[topic],
	        args = args || {};
	
	        for (var i = 0, j = currentTopic.length; i < j; i++) {
	            currentTopic[i].call($, args);
	        }
	    }
	};
	$.subscribe = function(topic, callback) {
	    if (!topics[topic]) {
	        topics[topic] = [];
	    }
	    topics[topic].push(callback);
	    return {
	        "topic": topic,
	        "callback": callback
	    };
	};
	$.unsubscribe = function(handle) {
	    var topic = handle.topic;
	    if (topics[topic]) {
	        var currentTopic = topics[topic];
	
	        for (var i = 0, j = currentTopic.length; i < j; i++) {
	            if (currentTopic[i] === handle.callback) {
	                currentTopic.splice(i, 1);
	            }
	        }
	    }
	};
})(jQuery);

// Below are 
$(document).ready(function() {
	
	// This is the part where jSignature is initialized.
	var $sigdiv = $("#signature").jSignature({'UndoButton':true});
	
	// All the code below is just code driving the demo. 
	var $tools = $('#tools');
	var $reset = $('#reset');

	var dataString;
	$('#Printsign').click(function () {
		dataString = $("#signature").jSignature("getData", "image/svg+xml;base64");
		var i = new Image();
		i.src = 'data:' + dataString[0] + ',' + dataString[1];
		$('#aTest').append(i);
	});

	
	$($reset).bind('click', function(e){
		$sigdiv.jSignature('reset')
	});

	
})