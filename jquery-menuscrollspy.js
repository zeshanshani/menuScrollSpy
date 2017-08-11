/**
 * Scroll Spy jQuery Plugin for your Menus
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2017 Zeshan Ahmed
 * @author-uri http://www.zeshanahmed.com/
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @package https://github.com/zeshanshani/menuScrollSpy
 * @version 0.0.1
 */
(function($) {

  $.fn.menuScrollSpy = function( options ) {

    // Plugin Options
    var settings = $.extend({
      offsetTop: 0,
      activeClassName: 'active'
    }, options);

    // Plugin Settings
    var defaults = {
      offsetTop: settings.offsetTop
    };

    console.log( settings.offsetTop, defaults.offsetTop );

    // Check if offsetTop is string
    // If it is, then search for the elements on page with that selector. 
    if ( typeof settings.offsetTop === 'string' ) {
      defaults.offsetTop = 0;
      // search for the element on page.
      if ( $(settings.offsetTop).length > 0 ) {
        // Check if the elements are more then 1.
        if ( $(settings.offsetTop).length > 1 ) {
          // Run each loop to add each element's height in the
          // offsetTop. 
          $(settings.offsetTop).each(function(i, el) {
            console.log( $(this).outerHeight() );
            defaults.offsetTop += $(this).outerHeight();
          });
        } else {
          // If the length is 1, add the main element's height to the 
          // offsetTop. 
          defaults.offsetTop = $(settings.offsetTop).outerHeight();
        }
      }
    }

    console.log( settings.offsetTop, defaults.offsetTop );

    var $window = $(window),
        $menu,
        $menuLinks,
        $link,
        $firstLink,
        $firstSection,
        $section;

    return this.each(function() {

      $menu = $(this);
      $menuLinks = $menu.find('a[href^="#"]');

      $window.scroll(function() {
        menuLinks();
      });
      
    });

    // Scroll Function
    function menuLinks() {

      $menuLinks.each(function(i, el) {

        if ( typeof $firstLink === 'undefined' && i === 0 ) {
          $firstLink = $(this);
          var firstLinkHref = $firstLink.attr('href');
          if ( $(firstLinkHref).length ) {
            $firstSection = $(firstLinkHref);
          }

          console.log( $firstLink, $firstSection );
        }

        $link = $(this);

        var sectionID = $link.attr('href');

        // Check if link has # href and is not only character
        // if ( href.indexOf('#') === 0 && href !== '#' && sectionID ) {
        // Store the link href and check if element with this ID exists on the page. 
        if ( $(sectionID).length > 0 ) {
          $section = $(sectionID);
          console.log( 'link has it.' );
          // runScrollFunction();
          if ( 
            $window.scrollTop() >= $section.offset().top - defaults.offsetTop
            && $window.scrollTop() <= ( $section.offset().top + $section.outerHeight() ) - defaults.offsetTop
          ) {
            console.log( $window.scrollTop(), $section.offset().top, defaults.offsetTop );
            console.log( $section, $link, $menu, $menuLinks );
            console.log( 'window exceeds it...' );
            if ( ! $link.hasClass('active') ) {
              $menuLinks.removeClass('active');
              $link.addClass('active');
            }
          } else {
            if ( $link.hasClass('active') ) {
              $link.addClass('active');
            }
          }

          if ( $window.scrollTop() <= $firstSection.offset().top - defaults.offsetTop ) {
            console.log( 'removing class' );
            $menuLinks.removeClass('active');
          }
        }

      });

    }
    
  }

}(jQuery));