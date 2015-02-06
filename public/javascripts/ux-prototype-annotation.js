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
    loadCss('http://localhost:3000/stylesheets/style.css');
  };

  var loadDependencies = function(callback){
    $.when(
      $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js" ),
      $.getScript( "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js" ),
      $.getScript( "http://localhost:3000/javascripts/expanding.js" ),
      $.Deferred(function( deferred ){
          $( deferred.resolve );
      })
    ).done(function(){
      callback();
    });
  };

  var getProjectName = function(){
    return "cute-cat";
  };

  var getTemplate = function(name){
    $.ajax({
      url : 'http://localhost:3000/templates/' + name + '.tpl.html',
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
    $('body').addClass('annotation-tool-body');
    $('html').addClass('annotation-tool-html');
  };

  var enablePlugins = function(){
    $('.annotation textarea').expanding();
    $('figure').draggable();
  };

  var addDeleteEvent = function(){
    $('.delete-annotation').click(function(){
      var currentID = $(this).parent().find('.annotation-no').html();

      $('figure').each(function(i){
        if(currentID == $(this).html() ){
          $(this).remove();
        }
      });

      $(this).parent().remove();
    });
  };

  var addToggleBlobsEvent = function(){
    $('.toggle-blobs').click(function(){
      $('figure').toggle();
    });
  };

  var highlightAnnotation = function(target){
    var blobID = $(target).attr('id');
    $('.annotation').removeClass('selected');

    $('.annotation').each(function(i){
      ++i;
      if(blobID==i){
        $(this).addClass('selected')
      }
    });
  };

  var createAnnotation = function(scope, e){
    var offset = $(scope).offset();
    var relativeX = (e.pageX - offset.left);
    var relativeY = (e.pageY - offset.top);

    // alert("X: " + relativeX + "  Y: " + relativeY);
    var lastID = $('figure:eq(-1)').attr('id');
    var newID = ++lastID;

    var blob = $('<figure id="'+newID+'">#'+newID+'</figure>').css({
      'top': relativeY-25,
      'left': relativeX-25
    });

    var annotation = $('<figcaption class="annotation"><h3 class="clearfix"><span class="annotation-no">#'+newID+'</span><input class="annotation-title" type="text" placeholder="Annotation title"></h3><textarea placeholder="Annotation details"></textarea><button class="delete-annotation">Delete annotation</button></figcaption>');
    $('.to-annotate img').before(blob);
    $('.annotation-list').append(annotation);

    $('.annotation textarea').expanding();
    $('figure').draggable();
  };

  var addAnnotationClickEvent = function(){
    $(".to-annotate").click(function(e) {
      if (e.target.nodeName == 'FIGURE') {
        highlightAnnotation(e.target);
      }
      else{
        createAnnotation(this, e);
      }
      return false;
    });
  };

  var addEvents = function(){
    addDeleteEvent();
    addToggleBlobsEvent();
    addAnnotationClickEvent();
  };

  var findOrCreateProject = function(callback){
    $.ajax({
      url: 'http://localhost:3000/projects/' + getProjectName()
    }).done(callback);
  };

  var init = function(){
    loadDependencies(function(){
      loadCssDependencies();
      getTemplate('wrapper');
      wrapContent();

      findOrCreateProject(function(data, status){
        console.log(data);
        enablePlugins();
        addEvents();
      });

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
