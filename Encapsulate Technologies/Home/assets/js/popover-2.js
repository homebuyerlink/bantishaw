$(function(){
	    // Enables popover
	    $("#example-popover").popover({
	        html : true, 
	        content: function() {
	          return $("#example-popover-content").html();
	        },
	        title: function() {
	          return $("#example-popover-title").html();
	        }
	    });
	});