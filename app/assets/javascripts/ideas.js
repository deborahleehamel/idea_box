$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
  updateQuality();
  updateTitle();
  updateBody();
});

function getIdeas(){
$.ajax({
  url: '/api/v1/ideas',
  method: "GET",
  dataType: "JSON",
  success: function(ideas){
    $(ideas).each(function(index, idea){
      $("#idea-list").append(ideaHtml(idea))
    })
  },
  error: function(errorResponse){
    console.log(errorResponse)
  }
})
}

 function createIdea(){
  $("#create-idea").on('click', function(){
    var ideaTitle = $(".add-title").val();
    var ideaBody = $(".add-body").val();
    var ideaData = {idea: {title: ideaTitle, body: ideaBody}};
    $.ajax({
      method: "POST",
      url: "/api/v1/ideas",
      dataType: "JSON",
      data: ideaData,
      success: function(idea){
        $("#idea-list").prepend(ideaHtml(idea))
        clearTextFields();
      },
      error: function(errorResponse){
        console.log(errorResponse)
      }
    })
  });
}

function deleteIdea(){
  $("#idea-list").on('click', ".delete-idea", function(){
    var specificId = $(this).parent().attr("id")
    $.ajax({
      url: "/api/v1/ideas/" + specificId,
      method: "DELETE",
      success: function(){
        $("#" + specificId ).remove()
      },
      error: function(errorResponse){
        console.log(errorResponse)
      }
    })
  })
}

function updateQuality(){
  $("#idea-list").on('click', "#thumbs-up", function(){
    var ideaQuality = $(this).parent().children('#quality').text();
    var specificId = $(this).parent().attr("id");
    var thumbsUp = { idea: { quality: newQualities['up'][ideaQuality]}};
    $.ajax({
      url: "/api/v1/ideas/" + specificId,
      method: "PUT",
      data: thumbsUp,
      success: function(idea){
        $('#idea-list').children('#' + idea.id).children('#quality').text(idea.quality)
      },
      error: function(errorResponse){
        console.log(errorResponse)
      }
    })
  })

  $("#idea-list").on('click', "#thumbs-down", function(){
    var ideaQuality = $(this).parent().children('#quality').text();
    var specificId = $(this).parent().attr("id");
    var thumbsDown = { idea: { quality: newQualities['down'][ideaQuality]}};
    $.ajax({
      url: "/api/v1/ideas/" + specificId,
      method: "PUT",
      data: thumbsDown,
      success: function(idea){
        $('#idea-list').children('#' + idea.id).children('#quality').text(idea.quality)
      },
      error: function(errorResponse){
        console.log(errorResponse)
      }
    })
  })
}

var newQualities = {
  'up': {
    'swill':     'plausible',
    'plausible': 'genius',
    'genius':    'genius'
  },
  'down': {
    'swill':     'swill',
    'plausible': 'swill',
    'genius':    'plausible'
  }
};



function updateTitle(){
  $("#idea-list").on('click', "#title", function(){
    var specificId = $(this).parent().attr("id");
    $(this).keypress(function(event) {
      if(event.which === 13) {
        event.preventDefault();
        debugger;
      }
    })
    $(this).focusout(function() {
      debugger;
    })
    // grab text and send it to my update


  })
}

// function updateBody(){
//   $
// }

function ideaHtml(idea){
  return "<div id='" + idea.id + "'>" +
          "<p id='title' class='text' contentEditable=true>" + idea.title + "</p>" +
          "<p id='body' class='text'  contentEditable=true>" + idea.body + "</p>" +
          "<p id='quality'>" + idea.quality + "</p>" +
          "<button specific-id=" +
          idea.id +
          " class='delete-idea btn btn-success' type='button'>Delete</button>" +
          "<button type='button' id='thumbs-up' class='thumbs-up btn btn-default'>" +
          "<span class='glyphicon glyphicon-thumbs-up'</span></button>" +
          "<button type='button' id='thumbs-down' class='btn btn-default'>" +
          "<span class='glyphicon glyphicon-thumbs-down'></span></button><br><br>" +
          "</div>"
}

function clearTextFields(){
  $('.add-title').val("");
  $('.add-body').val("");
}
