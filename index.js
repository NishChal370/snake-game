const container = document.querySelector('.container');
const startButton = document.querySelector('.start__button');
const stopButton = document.querySelector('.stop__button');
const noticeStatus = document.querySelector('.status');
const scoreBoard = document.querySelector('.score__board');

let gameOverAudio = new Audio('gameover.mp3');
let snakeArray=[{x:1, y:2}];

let snakeTailPosition = {x:"", y: ""};

let foodPosition ={
    x: Math.floor(Math.random() * 14)+4 ,
    y: Math.floor(Math.random() * 14)+4 
};

let runTime = 0;
let foodTime = 0;
let score = 0;
let snakeDirection = "";
let startGame = false;

function main(){

    runTime ++;
    foodTime ++;
    if(runTime >= 12){
        moveSnake(snakeDirection);
        runTime  = 0;
    };

    if(foodTime >= 400){
        foodPosition = {
            x: Math.floor(Math.random() * 14)+4 ,
            y: Math.floor(Math.random() * 14)+4
        };
        foodTime = 0;
    };
    
    drawSnake();
    drawFood();
    selfCollide();
    scoreBoard.innerHTML= "Score : "+score;
    if(!borderCollide() && startGame){
        requestAnimationFrame(main);
    }
       
}

function drawSnake(){
    container.innerHTML = '';

    snakeArray.forEach((position, index)=>{
        const snake = document.createElement('div');

        snake.style.gridRowStart = position.y;
        snake.style.gridColumnStart = position.x;
        snake.style.margin= '2px';

        if(index === 0){
            snake.style.backgroundColor ='purple';
        }
        else{
            snake.style.backgroundColor ='black';
        }

        container.appendChild(snake);
    });
    
}


function drawFood(){
    const food = document.createElement('div');
    food.style.gridRowStart = foodPosition.y; 
    food.style.gridColumnStart = foodPosition.x;
    food.style.borderRadius = '50%';
    food.style.background='red';
    container.appendChild(food);
}


function moveSnake(key){
    
    snakeTailPosition = {
        x: snakeArray[ 0 ].x,
        y: snakeArray[ 0 ].y,
    };

    for(let i = snakeArray.length-1; i>-0; i--){
        snakeArray[i] = {...snakeArray[i-1]};
    }

    switch (key) {
        case "ArrowDown":
            snakeArray[0].y += 1;
            break;
        case "ArrowUp":
            snakeArray[0].y -= 1;
            break;
        case "ArrowLeft":
            snakeArray[0].x -= 1;
            break;
        case "ArrowRight":
            snakeArray[0].x += 1;
            break;
        default:
            snakeArray[0].x += 1;
            break;
    }

    if(snakeArray[0].x === foodPosition.x &&
        snakeArray[0].y === foodPosition.y){
        score += 1;
        collideWithFood();   
    }

}


function collideWithFood(){
    foodPosition ={
        x: Math.floor(Math.random() * 14)+4 ,
        y: Math.floor(Math.random() * 14)+4 
    };
    snakeArray.push(snakeTailPosition);
}       


function borderCollide(){
    if(snakeArray[0].x<1 || snakeArray[0].x >18 || snakeArray[0].y<1 || snakeArray[0].y >16){
        noticeStatus.innerHTML="Game Ended";
        container.style.background='black';
        startGame = false;
        gameOverAudio.play();
        return true;
    }
    else{
        return false;
    }
}


function selfCollide(){
    for (let index = 0; index < snakeArray.length; index++) {
        if(snakeArray[index] === snakeArray[0].x && snakeArray[index].y === snakeArray[0].y){
            return true;
        }
        else{
            return false;
        }
        
    }
}


function reset(){
    container.style.background='white';
    snakeArray=[{x:1, y:2}];
    snakeTailPosition = {x:"", y: ""}
    foodPosition ={
        x: Math.floor(Math.random() * 14)+4 ,
        y: Math.floor(Math.random() * 14)+4 
    };
    noticeStatus.innerHTML="";
    noticeStatus.style.color ='white';
    runTime =0;
    foodTime =0;
    score = 0;
    snakeDirection = "";
    requestAnimationFrame(main);
}


function gameStart(){
    reset();
    startGame = true;
}


function gameEnd(){
    noticeStatus.innerHTML="Game Stopped";
    noticeStatus.style.color ='black';
    startGame = false;
    requestAnimationFrame(main);
}

document.addEventListener('keydown',( {key} )=>{ snakeDirection = key });
startButton.addEventListener('click',()=>{!startGame && gameStart()});
stopButton.addEventListener('click',()=>{startGame && gameEnd()} );
window.requestAnimationFrame(main);
