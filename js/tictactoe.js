$(document).ready(function(){

    var toggle = false;
    $(".cell").on("click", function(){        
        if(!toggle){
            $(this).html("X");
            $(this).css("color", "rgb(218, 107, 107)");
            toggle = !toggle;
        }else{
            $(this).html("O");
            $(this).css("color", "rgb(130, 194, 214)");
            toggle = !toggle;
        }
    });

    $("#one").on("click", function(){
        $("#overlay").css("display", "none");
    });
});