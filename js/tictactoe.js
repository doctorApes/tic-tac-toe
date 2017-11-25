$(document).ready(function(){

    var firstMove = true;
    var lastMove = "";
    var aiLastMove = "";

    //Title screen selection
    $("#one").on("click", function(){
        $("#overlay").css("display", "none");
        clearBoard();
    });

    $(".cell").on("click", function(){
        
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
        $("#"+x).html("X");
        $("#"+x).css("color", "rgb(218, 107, 107)");
        lastMove = $("#"+x)[0].id;
        checkForWinner("X");
        
    }

    function aiMove(){
        
        function setMove(x){
            firstMove = false;
            $("#"+x).html("O");
            $("#"+x).css("color", "rgb(130, 194, 214)");
            aiLastMove = x;
            checkForWinner("O");
            
        }

        if(firstMove){
            
                //If player takes a corner take the center square
                if($("#1-1").html() === "X"||
                $("#1-3").html() === "X"||
                $("#3-1").html() === "X"||
                $("#3-3").html() === "X"){
                    setMove("2-2");
                //If player takes the center take a corner square
                }else if($("#2-2").html() ==="X"){
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
            if(!checkRows(aiRow, "O")){
                if(!checkCols(aiCol, "O")){
                    if(!checkDiagonals("O")){
                        if(!checkDiagonals("X")){
                            if(!checkRows(row, "X")){
                                if(!checkCols(col, "X")){
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
            if(player === "O"){
                $("#title").html("YOU LOST");
            }else{
                $("#title").html("YOU WON");
            }
        }else{
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