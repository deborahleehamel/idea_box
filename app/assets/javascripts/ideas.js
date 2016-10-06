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
    console.log(this)
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
          idea.quality +
          "<button specific-id=" +
          idea.id +
          " class='delete-idea btn btn-success' type='button'>Delete</button>" +
          "</div>"
}

function clearTextFields(){
  $('.add-title').val("");
  $('.add-body').val("");
}
