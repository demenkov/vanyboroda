$(function(){

	/* counters */

	function Counter(item){
		var days = 0,
	        hours = 0,
	        mins = 0,
	        secs = 0,
	        out = "";
			currentDate = new Date();
			content = $('#'+item),
			time = content.data('time');
			dateFuture = new Date(time).getTime();
	 		amount = +dateFuture - currentDate.getTime();

	 	if(amount < 0){
	 		out = "<div id='day'><span>0</span><span>0</span></div>" + "<div id='hour'><span>0</span><span>0</span></div>" + "<div id='min'><span>0</span><span>0</span></div>" + "<div id='sec'><span>0</span><span>0</span></div>";
			document.getElementById(item).innerHTML = out;
	 	}
	 	else {	 		
		 	function GetCount() {
			     if (amount < 0) {
			         out = "<div id='day'><span>0</span><span>0</span></div>" + "<div id='hour'><span>0</span><span>0</span></div>" + "<div id='min'><span>0</span><span>0</span></div>" + "<div id='sec'><span>0</span><span>0</span></div>";
			         document.getElementById(item).innerHTML = out;
			     } else {
			     	setInterval(function() {
			     		currentDate = new Date();
			     		amount = +dateFuture - currentDate.getTime();
			     		
			     		days = Math.floor(amount / 86400000);
				        hours = Math.floor(amount / 3600000 % 60);
				        mins = Math.floor((amount / 60000) % 60);
				        secs = Math.floor((amount / 1000) % 60);

				        out = "<div id='day'><span>" + Math.floor(days/10) + "</span><span>" + days%10 + "</span></div>" 
				        + "<div id='hour'><span>" + Math.floor(hours/10) + "</span><span>" + hours%10 + "</span></div>" 
				        + "<div id='min'><span>" + Math.floor(mins/10) + "</span><span>" + mins%10 + "</span></div>" 
				        + "<div id='sec'><span>" + Math.floor(secs/10) + "</span><span>" + secs%10 + "</span></div>";
				        document.getElementById(item).innerHTML = out;

			    	}, 1000);
			    }
			}
			GetCount();
		}
	}	
	Counter('counter-bottom');
	Counter('counter-top');

	/*validation*/

	$('.rf').each(function(){
        var form = $(this),
        	btn = form.find('.submit');        

        form.find('.rfield').each(function(){
            $(this).addClass('empty-filed'); //пустое
        });

        function checkInput(){
            form.find('.rfield').each(function(){
                if ($(this).val().length > 4) {
                    $(this).removeClass('empty-filed');
                }
                else{
                    $(this).addClass('empty-filed');
                }
            });    
            form.find('[name="email"]').each(function(){
                var vl = $(this).val();
        		var re = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/; 
        		if( !re.test(vl)) {
           			$(this).addClass('empty-filed');          

        		}
        		else{
        			$(this).removeClass('empty-filed');
        		}           	
            });      
        }

        form.find('.rfield').bind('focusout',function(){
            if ($(this).hasClass('empty-filed')){
                $(this).css({'border':'1px solid #C04B75','background':'rgb(255, 181, 181)'});
            }
            else{
                $(this).removeAttr('style');
            }
        });

        function lightEmpty(){
            form.find('.empty-filed').css({'border':'1px solid #C04B75','background':'rgb(255, 181, 181)'});
            setTimeout(function(){
                form.find('.empty-filed').removeAttr('style');
            }, 2000);
        }

        setInterval(function(){
            checkInput();
            var sizeEmpty = form.find('.empty-filed').size();
            if (sizeEmpty > 0){
                if (btn.hasClass('disabled')){
                	return false;
                }
                else {
                    btn.addClass('disabled');
                }
            }
            else{
                btn.removeClass('disabled');
            }
        },500);

        btn.click(function(e){
            if ($(this).hasClass('disabled')) {
                lightEmpty();
                return false;                
            }
            else{
            	e.preventDefault();
                form.submit(function(e){
                	e.preventDefault();
                	f=form.serialize();
                    $.post('/mail.php', $('.rf').serialize(), function(){ 
						$('.popup.success').show();						
       			 	});	
                });
                form.submit();   
                setTimeout(function() {form.find('.rfield').val('').change(); }, 800);                         
            }
        });
    });

	/* form ff */

	$('.ff').each(function(){
        var form = $(this),
        	btn = form.find('.submit');        

        form.find('.rfield').each(function(){
            $(this).addClass('empty-filed'); //пустое
        });

        function checkInput(){
            form.find('.rfield').each(function(){
                if ($(this).val().length > 4) {
                    $(this).removeClass('empty-filed');
                }
                else{
                    $(this).addClass('empty-filed');
                }
            });      
        }

        function lightEmpty(){
            form.find('.empty-filed').css({'border':'1px solid #C04B75','background':'rgb(255, 181, 181)'});
            setTimeout(function(){
                form.find('.empty-filed').removeAttr('style');
            }, 2000);
        }

        setInterval(function(){
            checkInput();
            var sizeEmpty = form.find('.empty-filed').size();
            if (sizeEmpty > 0){
                if (btn.hasClass('disabled')){
                	return false;
                }
                else {
                    btn.addClass('disabled');
                }
            }
            else{
                btn.removeClass('disabled');
            }
        },500);

        btn.click(function(e){
            if ($(this).hasClass('disabled')) {
                lightEmpty();
                return false;                
            }
            else{
            	e.preventDefault();
            	$('.popup.callback').hide();	
            	$('.popup.success').show();	
                setTimeout(function() {form.find('.rfield').val('').change(); }, 800);                         
            }
        });
    });

	/* modal */
    $('.close').click(function(e){
        e.preventDefault();
        $('.popup').hide();
    });

    $('.show-modal').click(function(e){
        e.preventDefault();
        $('.popup.'+$(this).attr('href')).show();        
    });

    $('.popup').click(function(event) {
        e = event || window.event
        if (e.target == this) {
            $(this).hide();
        }
    });

    /* animation */

    $('h3, .form-wrap p, .about .left, .reviews .item, .about .center .video, .about .right').addClass("hidden");

	$('h3, .form-wrap p').viewportChecker({
        classToAdd: 'visible animated fadeIn'
    });

    $('.about .left, .reviews .item.two').viewportChecker({
    	classToAdd: 'visible animated fadeInLeftBig'
    });

    $('.about .right, .reviews .item.three, .reviews .item.one').viewportChecker({
    	classToAdd: 'visible animated fadeInRightBig'
    });

    $('.about .center .video').viewportChecker({
    	classToAdd: 'visible animated zoomIn',
    	callbackFunction: function(){
    		$('.about .center .video').removeClass('hidden');
    	}
    });    
});