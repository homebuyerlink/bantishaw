
		  	$('ul.nav li.dropdown').hover(function() {
			  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
			}, function() {
			  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
			});

		  $(document).ready(function(){
		    $('.selectpicker').on('change', function() {
		      if ( this.value == '2')
		      //.....................^.......
		      {
		        $(".yesdes").show();
		      }
		      else
		      {
		        $(".yesdes").hide();
		      }
		       if ( this.value == '1')
		      //.....................^.......
		      {
		        $(".no").show();
		      }
		      else
		      {
		        $(".no").hide();
		      }
		      if ( this.value == '3')
		      //.....................^.......
		      {
		        $(".third").show();
		      }
		      else
		      {
		        $(".third").hide();
		      }
		    });
		});


	