$(document).ready(function() {
  $.ajax({
    url: '/api/v1/ideas',
    method: "GET",
    dataType: "JSON",
    success: function(ideas){
      $(ideas).each(function(index, idea){
        $(".idea-list").append(
          "<div>" +
          idea.title + "<br>" +
          idea.body + "<br>" +
          idea.quality
          "</div>"
        )
      })
    },
    error: function(errorResponse){
      console.log(errorResponse)
    }
  })
});
