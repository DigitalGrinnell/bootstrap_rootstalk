(function($) {

  // Lifted from https://github.com/mattbanks/jQuery.equalHeights/blob/master/jquery.equalheights.js
 
  $.fn.equalHeights = function() {
    var maxHeight = 0,
    $this = $(this);

    $this.each( function() {
      var height = $(this).innerHeight();
      if ( height > maxHeight ) { maxHeight = height; }
    });

    return $this.css('height', maxHeight);
  };

  // auto-initialize plugin
  $('[data-equal]').each(function(){
    var $this = $(this),
    target = $this.data('equal');
    $this.find(target).equalHeights();
  });

  // My stuff

  $(document).ready(function() {
    $(".col-1").equalHeights();
    $(".col-2").equalHeights();
    $(".col-3").equalHeights();
    $(".col-4").equalHeights();
    $(".col-5").equalHeights();
    $(".col-6").equalHeights();
    $(".col-7").equalHeights();
    $(".col-8").equalHeights();
  });

}(jQuery));


