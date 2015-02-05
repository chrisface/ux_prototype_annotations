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

  var loadDependencies = function(){
    loadJavascript('https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js');
    // loadCss('https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js');
  };

  var getProjectName = function(){
    return "cute-cat";
  };

  var findOrCreateProject = function(){
    $.ajax({
      url: 'localhost:3000/projects/' + getProjectName()
    }).done(function(data, status){
      console.log(data, status);
    });
  };


  var init = function(){
    loadDependencies();
    console.log("Initialized Annotations Plugin");
  };

  return {
    init: init
  };
})();

$(document).ready(function(){
  Annotations.init();
});
