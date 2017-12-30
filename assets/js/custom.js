(function($) {

// prettyPhoto
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function() {
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});  	
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	}); 

        jQuery(document).ready(function() {

          var speed = 2;
          var omega = 1;

          var dx = speed;
          var dy = speed;

          var paused = false;

          var $pero = $('#pero');
          $('body').on('touchstart', function() {
            paused = false;
            $('.zhenghun').removeClass('superzhenghun');
            $('.pero-background').hide();
          });
          $pero.on('touchstart', function(e) {
            paused = true;
            $('.zhenghun').addClass('superzhenghun');
            $('.pero-background').show();
            e.preventDefault();
            e.stopPropagation();
          });
          $pero.mouseenter(function() {
            paused = true;
            $('.zhenghun').addClass('superzhenghun');
            $('.pero-background').show();
          });

          $pero.mouseout(function() {
            paused = false;
            $('.zhenghun').removeClass('superzhenghun');
            $('.pero-background').hide();
          });

          var curX = 0;
          var curY = 0;
          
          var rotation = 0;
          function frame() {
            var $pero = $('#pero');

            if(!paused) {
              curX += dx;
              curY += dy;

              if(curY + $pero.height() >= window.innerHeight) {
                dy = -speed;
                omega = -omega;
              }
              if(curY <= 0) {
                dy = speed;
                omega = -omega;
              }

              if(curX + $pero.width() >= window.innerWidth) {
                dx = -speed;
                omega = -omega;
              }
              if(curX <= 0) {
                dx = speed;
                omega = -omega;
              }
            }

            rotation += omega;
            
            $pero.css('transform', 'translate(' + curX + 'px, ' + curY + 'px) rotate(' + rotation + 'deg)');

            requestAnimationFrame(frame);
          }

          frame();
        });
})(jQuery);
