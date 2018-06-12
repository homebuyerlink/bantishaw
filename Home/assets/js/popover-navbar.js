
		$(function(){
		    // Enables popover
		    $("#example-popover1").popover({
		        html : true, 
		        content: function() {
		          return $("#example-popover-content1").html();
		        },
		        title: function() {
		          return $("#example-popover-title1").html();
		        }
		    });
		});