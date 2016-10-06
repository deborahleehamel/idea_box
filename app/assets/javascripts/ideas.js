$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
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

function ideaHtml(idea){
  return "<div id='" + idea.id + "'>" +
          idea.title + "<br>" +
          idea.body + "<br>" +
          idea.quality + "<br>" +
          "<button specific-id=" +
          idea.id +
          " class='delete-idea btn btn-success' type='button'>Delete</button>" +
          "<button type='button' id='thumbs-up' class='btn btn-default' aria-label='Right Align'>" +
          "<span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span></button>" +
          "<button type='button' id='thumbs-down' class='btn btn-default' aria-label='Right Align'>" +
          "<span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span></button><br><br>" +
          "</div>"
}

function clearTextFields(){
  $('.add-title').val("");
  $('.add-body').val("");
}
