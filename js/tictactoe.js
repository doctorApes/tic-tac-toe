$(document).ready(function(){
    $("#overlay2").css("display", "none");
    var firstMove = true;
    var lastMove = "";
    var aiLastMove = "";
    var mode = "";
    var playerSwitch = false;
    var p1 = "X";    
    var p2 = "O";
    
    var red = "rgb(218, 107, 107)";
    var blue = "rgb(130, 194, 214)";
    var p1Color = red;
    var p2Color = blue;
    //Title screen selection
    $("#one").on("click", function(){
        $("#overlay2").css("display", "block");
        $("#overlay").css("display", "none");
        //clearBoard();
        mode="single";
    });

    $("#O").on("click", function(){
        p1 = "O";
        p1Color = blue;
        p2 = "X";
        p2Color = red;
        $("#overlay2").css("display", "none");
        clearBoard();
    });
    $("#X").on("click", function(){
        p1 = "X";
        p1Color = red;
        p2 = "O";
        p2Color = blue;
        $("#overlay2").css("display", "none");
        clearBoard();
    });

    $("#two").on("click", function(){
        $("#overlay").css("display", "none");
        clearBoard();
        mode="multi";
    });

    $(".cell").on("click", function(){
        if($(this).html() === ""){
            if(mode === "single"){
                switch ($(this)[0].id){
                    case "1-1": playerMove("1-1"); aiMove();
                    break;
                    case "1-2": playerMove("1-2"); aiMove();
                    break;
                    case "1-3": playerMove("1-3"); aiMove();
                    break;
                    case "2-1": playerMove("2-1"); aiMove();
                    break;
                    case "2-2": playerMove("2-2"); aiMove();
                    break;
                    case "2-3": playerMove("2-3"); aiMove();
                    break;
                    case "3-1": playerMove("3-1"); aiMove();
                    break;
                    case "3-2": playerMove("3-2"); aiMove();
                    break;
                    case "3-3": playerMove("3-3"); aiMove();
                    break;            
                }
            }else if(mode === "multi"){
                if(!playerSwitch){
                    $(this).html("X");
                    $(this).css("color", red);
                    checkForWinner("X");
                    playerSwitch = !playerSwitch;
                }else{
                    $(this).html("O");
                    $(this).css("color", blue);
                    checkForWinner("O");
                    playerSwitch = !playerSwitch;
                }
            }
        }
    });

    function clearBoard(){
        firstMove = true;
        for(var i=1; i<4; i++){            
            for(var j=1; j<4; j++){
                $("#"+i.toString()+"-"+j.toString()).html("");                        
            }                    
        }
    }

    function playerMove(x){
        $("#"+x).html(p1);
        $("#"+x).css("color", p1Color);
        lastMove = $("#"+x)[0].id;
        checkForWinner(p1);
        
    }

    function aiMove(){
        
        function setMove(x){
            firstMove = false;
            $("#"+x).html(p2);
            $("#"+x).css("color", p2Color);
            aiLastMove = x;
            checkForWinner(p2);
            
        }

        if(firstMove){
            
                //If player takes a corner take the center square
                if($("#1-1").html() === p1||
                $("#1-3").html() === p1||
                $("#3-1").html() === p1||
                $("#3-3").html() === p1){
                    setMove("2-2");
                //If player takes the center take a corner square
                }else if($("#2-2").html() ===p1){
                    var corner = Math.floor((Math.random() * 4) + 1);
                    switch (corner){
                        case 1: setMove("1-1"); 
                        break;
                        case 2: setMove("1-3"); 
                        break;
                        case 3: setMove("3-1"); 
                        break;
                        case 4: setMove("3-3"); 
                        break;                                                                        
                    }
                }else{
                    setMove("2-2");                    
                }
            
        }else{
            //Block all moves

            //player
            var coords = lastMove.split("-");
            var row = coords[0];
            var col = coords[1];

            //ai
            var aiCoords = aiLastMove.split("-");
            var aiRow = aiCoords[0];
            var aiCol = aiCoords[1];
            
            //check row     
            function checkRows(row, x){       
                if($("#"+row+"-1").html() === x && $("#"+row+"-2").html() === x && $("#"+row+"-3").html() === ""){                
                    setMove(row+"-3");
                    return true;
                }else if($("#"+row+"-1").html() === x && $("#"+row+"-3").html() === x && $("#"+row+"-2").html() === ""){                
                    setMove(row+"-2");
                    return true;
                }else if($("#"+row+"-2").html() === x && $("#"+row+"-3").html() === x && $("#"+row+"-1").html() === ""){                
                    setMove(row+"-1");
                    return true;
                }else{
                    return false;
                }
            }
            //check columns
            function checkCols(col, x){
                if($("#1-"+col).html() === x && $("#2-"+col).html() === x && $("#3-"+col).html() === ""){                
                    setMove("3-"+col);
                    return true;
                }else if($("#1-"+col).html() === x && $("#3-"+col).html() === x && $("#2-"+col).html() === ""){                
                    setMove("2-"+col);
                    return true;
                }else if($("#3-"+col).html() === x && $("#2-"+col).html() === x && $("#1-"+col).html() === ""){                
                    setMove("1-"+col);
                    return true;
                }else{
                    return false;
                }
            }
            //check diagonals
            function checkDiagonals(x){
                if($("#1-1").html() === x && $("#2-2").html() === x && $("#3-3").html() === ""){                
                    setMove("3-3");
                    return true;
                }else if($("#1-1").html() === x && $("#3-3").html() === x && $("#2-2").html() === ""){                
                    setMove("2-2");
                    return true;
                }else if($("#3-3").html() === x && $("#2-2").html() === x && $("#1-1").html() === ""){                
                    setMove("1-1");
                    return true;
                }else if($("#1-3").html() === x && $("#2-2").html() === x && $("#3-1").html() === ""){                
                    setMove("3-1");
                    return true;
                }else if($("#1-3").html() === x && $("#3-1").html() === x && $("#2-2").html() === ""){                
                    setMove("2-2");
                    return true;
                }else if($("#2-2").html() === x && $("#3-1").html() === x && $("#1-3").html() === ""){                
                    setMove("1-3");
                    return true;
                }else{
                    return false;
                }
            }
            function randomMove(){
                var toggle = false;             
                for(var i=1; i<4; i++){
                    if(toggle){break;}
                    for(var j=1; j<4; j++){
                        if($("#"+i.toString()+"-"+j.toString()).html() === ""){
                            setMove(i.toString()+"-"+j.toString());
                            toggle=true; 
                            break;                         
                        }
                    }                    
                }
            }
            //Check for potential good moves
            //debugger;
            if(!checkRows(aiRow, p2)){
                if(!checkCols(aiCol, p2)){
                    if(!checkDiagonals(p2)){
                        if(!checkDiagonals(p1)){
                            if(!checkRows(row, p1)){
                                if(!checkCols(col, p1)){
                                    randomMove();
                                }
                            }
                        }
                    }
                }
            }               
        }
    }

    function checkForWinner(player){
        
        if($("#1-1").html() === player && $("#1-2").html() === player && $("#1-3").html() === player ||
        $("#2-1").html() === player && $("#2-2").html() === player && $("#2-3").html() === player ||
        $("#3-1").html() === player && $("#3-2").html() === player && $("#3-3").html() === player ||
        $("#1-1").html() === player && $("#2-1").html() === player && $("#3-1").html() === player ||
        $("#1-2").html() === player && $("#2-2").html() === player && $("#3-2").html() === player ||
        $("#1-3").html() === player && $("#2-3").html() === player && $("#3-3").html() === player ||
        $("#1-1").html() === player && $("#2-2").html() === player && $("#3-3").html() === player ||
        $("#1-3").html() === player && $("#2-2").html() === player && $("#3-1").html() === player){
            $("#overlay").css("display", "block");
            //debugger;
            if(p1 === "O" && player === "O" && mode === "single"){
                $("#title").html("YOU WON");
            }else if(player === "O" && mode === "multi"){
                $("#title").html("NOUGHTS WON");
            }else if(p1 === "X" && player === "X" && mode === "single"){
                $("#title").html("YOU WON");
            }else if(player === "X" && mode === "multi"){
                $("#title").html("CROSSES WON");
            }else{
                $("#title").html("YOU LOST");
            }
            
            
        }else{
            //check for draw
            var toggle = false;
            for(var i=1; i<4; i++){    
                if(toggle){break;}            
                for(var j=1; j<4; j++){
                    if($("#"+i.toString()+"-"+j.toString()).html() === ""){                        
                        toggle=true; 
                        break;                         
                    }
                }                    
            }
            if(!toggle){
                $("#overlay").css("display", "block");
                $("#title").html("DRAW");
            }
        }           
    }
});