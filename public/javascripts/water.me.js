/*global $:false, Cufon:false, document:false*/

(function() {
  var WaterMe = {
    initHeadlines: function() {
      Cufon.replace('h1,h2,h3,h4,h5')
    },

    highlightMenuItem: function() {
      $('ul#nav > li > a').each(function() {
        var $anchor = $(this)

        if ($anchor.attr('href') === document.location.pathname) {
          $anchor.addClass('active')
        }
      })
    }
  }

  $(function() {
    WaterMe.initHeadlines()
    WaterMe.highlightMenuItem()
  })
})()
