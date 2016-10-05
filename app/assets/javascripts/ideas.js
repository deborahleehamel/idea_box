$(document).ready(function() {
  getIdeas();
  createIdea();
});

function getIdeas(){
$.ajax({
  url: '/api/v1/ideas',
  method: "GET",
  dataType: "JSON",
  success: function(ideas){
    $(ideas).each(function(index, idea){
      $("#idea-list").append(
        "<div>" +
        idea.title + "<br>" +
        idea.body + "<br>" +
        idea.quality +
        "</div>"
      )
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
        $("#idea-list").prepend(
          "<div>" +
          idea.title + "<br>" +
          idea.body + "<br>" +
          idea.quality +
          "</div>"
        )
      },
      error: function(errorResponse){
        console.log(errorResponse)
      }
    })
  });

}
