$(function() {
    // Add New Burger (POST Method)
    $("#burger-form").on("submit", function(event) {
      event.preventDefault();
  
      const newBurger = {
        burger_name: $("#newBurger")
          .val()
          .trim()
      };
  
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(() => {
        location.reload();
      });
    });
  
    // Update Burger State (PUT Method)
    $(".btn-devour").on("click", function(event) {
      const id = $(this).data("id");
      const newDevour = $(this).data("devour");
  
      const newDevourStatus = {
        devour: newDevour
      };
  
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourStatus
      }).then(() => {
        location.reload();
      });
    });
  });