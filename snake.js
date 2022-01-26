function init(){
canvas=document.getElementById("my-canvas");
W = H = canvas.width = canvas.height = 550;
pen=canvas.getContext('2d');
cell_size=45;
score=5;
game_over="false";

food_img=new Image();
food_img.src="Assets/apple.png"

score_img=new Image();
score_img.src="Assets/trophy.png"
food=getRandomFood();
snake = {
    init_len:2,
    color:"blue",
    cells:[],
    direction:"right",

    createSnake:function(){
        for(var i=this.init_len-1;i>=0;i--){
            this.cells.push({x:i,y:0});
        }

    },

    drawSnake: function(){
        for(var i=0;i<this.cells.length;i++){
            pen.fillStyle = this.color;
           
            pen.fillRect(this.cells[i].x*cell_size,this.cells[i].y*cell_size,cell_size-3,cell_size-3);
          
        }
    },
    updateSnake: function(){
        //updating accorsing to direction

        // increase snake size if snake has eaten food and return new food object
        
        var headX = this.cells[0].x;
        var headY = this.cells[0].y;

        if(headX==food.x && headY==food.y){
           // console.log("Food eaten");
           score+=5;
            food = getRandomFood();
           
        }
        else
        {
            this.cells.pop();
        }
        
        var head_x=this.cells[0].x;
         var head_y=this.cells[0].y;

        var newX,newY;
if(this.direction=="right"){
    newX=head_x+1;
    newY=head_y;
}
else if(this.direction=="left"){
    newX=head_x-1;
    newY=head_y;
}
else if(this.direction=="up"){
    newX=head_x;
    newY=head_y-1;
}
else {
    newX=head_x;
    newY=head_y+1;
}

// checking if snake is outside the grid(game over condition)
var headx=Math.round(W/cell_size);
var heady=Math.round(H/cell_size);
// if(newX<0 || newX>=W || newY<0 || newY>=H){
//     return;
// }
if(this.cells[0].x<0 || this.cells[0].x>headx || this.cells[0].y<0 || this.cells[0].y>heady){
    game_over="true";

}

         this.cells.unshift({x:newX,y:newY});

    }
 

};
snake.createSnake();
function keyPressed(e){
    if(e.key=="ArrowRight"){
        snake.direction="right";
    }
   else if(e.key=="ArrowLeft"){
        snake.direction="left";
    }
   else if(e.key=="ArrowUp"){
        snake.direction="up";
    }
   else{
        snake.direction="down";
    }
}

//adding keydown movements for movement of snake
document.addEventListener('keydown',keyPressed) ;


}
 function draw(){
   pen.clearRect(0, 0, H, W);
    snake.drawSnake();

  pen.fillStyle = food.color;
 pen.drawImage(food_img,food.x*cell_size,food.y*cell_size,cell_size,cell_size);

 pen.drawImage(score_img,18,20,cell_size,cell_size);
 pen.fillStyle = "blue";
 pen.font = "20px Roboto"
 pen.fillText(score,35,45);
 }

 function update(){
snake.updateSnake();
 }

 function getRandomFood(){
     var foodX=Math.round(Math.random()*(W-cell_size)/cell_size);
     var foodY=Math.round(Math.random()*(H-cell_size)/cell_size);

     var food={
           x:foodX,
           y:foodY,
           color:"red"
     }

     return food;
 }

function gameLoop(){
    if(game_over=="true"){
        clearInterval(f);
        alert("GAME OVER!");
        return;
    }
    
draw();
update();
 }

init();

 var f = setInterval(gameLoop,100);