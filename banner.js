$(document).ready(function() {
    $("#banner")
      .delay(0)
      .slideDown("slow");
    $("#closeButton").click(function() {
      $("#banner").slideUp("slow");
    });
  });