$(document).ready(function() {
    $("#header").load("../private/header.html");
    $("#footer").load("../private/footer.html").delay("200");
    $("body").removeClass('.wrapper').fadeIn("1000");
});