Annotations = (function(){

  var loadJavascript = function(url){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    $("head").append(script);
  };

  var loadCss = function(url){
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    $("head").append(link);
  };

  var loadCssDependencies = function(){
    // loadCss('something.csss');
  };

  var getProjectName = function(){
    return "cute-cat";
  };

  var getTemplate = function(name){
    $.ajax({
      url : 'templates/' + name + '.tpl.html',
      success : function (data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        }
        Handlebars.templates[name] = Handlebars.compile(data);
      },
      dataType: "text",
      async : false
    });
  };

  var wrapContent = function(){


    var contentHtml = $('body').html();
    var wrappedHtml = Handlebars.templates.wrapper({content: contentHtml});

    $('body').empty();
    $('body').html(wrappedHtml);
  };

  var findOrCreateProject = function(){
    $.ajax({
      url: 'localhost:3000/projects/' + getProjectName()
    }).done(function(data, status){
      console.log(data, status);
    });
  };


  var init = function(){
    $.when(
      $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js" ),
      $.Deferred(function( deferred ){
          $( deferred.resolve );
      })
    ).done(function(){
      loadCssDependencies();
      getTemplate('wrapper');
      wrapContent();
      console.log("Initialized Annotations Plugin");
    });
  };

  return {
    init: init
  };
})();

$(document).ready(function(){
  Annotations.init();
});
