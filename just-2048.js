// just 2048 v0.0
// 2024.5.23

const SIZE = 4;
var board = new Array(SIZE);
var score = 0;

function get_rand(min, max) {  // get a random int between min(include) and max(exclude)
    return Math.floor(Math.random() * (max - min) ) + min;
}

function start(){
    if (SIZE < 4){
        console.error("Board too small");
        return;
    }
    // New Board
    score = 0;
    board = new Array(SIZE);
    for (let i=0; i<SIZE; i++){
        board[i] = new Array(SIZE).fill(0);
    }
    // Generate new pieces
    let r1, r2;
    do{
        r1 = [get_rand(0, SIZE), get_rand(0, SIZE)];
        r2 = [get_rand(0, SIZE), get_rand(0, SIZE)];   
    } while (r1[0] === r2[0] && r1[1] === r2[1]);
    board[r1[0]][r1[1]] = get_rand(0,4) == 3 ? 4 : 2;
    board[r2[0]][r2[1]] = get_rand(0,4) == 3 ? 4 : 2;
    update();
}

function move(direction){
    if (SIZE < 4){
        console.error("Board too small");
        return;
    }
    // Move
    let moved = false;
    for (let i=0; i<SIZE; i++){
        for (let j=0; j<SIZE; j++){
            switch (direction) {
                case "up":
                    if (board[i][j] == 0 || i == 0) continue;
                    if (board[i-1][j] == 0){
                        board [i-1][j] = board[i][j];
                        board[i][j] = 0;
                        moved = true;
                    }
                    if (board[i][j] == board[i-1][j]){
                        board [i-1][j] *= 2;
                        score += board [i-1][j];
                        board[i][j] = 0;
                        moved = true;
                    }
                    break;
                case "down":
                    if (board[i][j] == 0 || i == SIZE-1) continue;
                    if (board[i+1][j] == 0){
                        board [i+1][j] = board[i][j];
                        board[i][j] = 0;
                        moved = true;
                    }
                    if (board[i][j] == board[i+1][j]){
                        board [i+1][j] *= 2;
                        score += board [i+1][j];
                        board[i][j] = 0;
                        moved = true;
                    }    
                    break;
                case "left":
                    if (board[i][j] == 0 || j == 0) continue;
                    if (board[i][j-1] == 0){
                        board [i][j-1] = board[i][j];
                        board[i][j] = 0;
                        moved = true;
                    }
                    if (board[i][j] == board[i][j-1]){
                        board [i][j-1] *= 2;
                        score += board [i][j-1];
                        board[i][j] = 0;
                        moved = true;
                    }
                    break;
                case "right":
                    if (board[i][j] == 0 || j == SIZE-1) continue;
                    if (board[i][j+1] == 0){
                        board [i][j+1] = board[i][j];
                        board[i][j] = 0;
                        moved = true;
                    }
                    if (board[i][j] == board[i][j+1]){
                        board [i][j+1] *= 2;
                        score += board [i][j+1];
                        board[i][j] = 0;
                        moved = true;
                    }
                    break;
                default:
                    return;
            }
        }
    }
    if (moved){
        move(direction);
        return false;
    };
    // Generate new piece
    let ran = new Array();
    for (let i=0; i<SIZE; i++){
        for (let j=0; j<SIZE; j++){
            if (board[i][j] == 0) ran.push([i,j]);
        }
    }
    if (ran.length < 1){
        // You lose lmao
        alert("You lose! ")
    } else {
        let r = ran[get_rand(0,ran.length)];
        board[r[0]][r[1]] = get_rand(0,4) == 3 ? 4 : 2;
    }
    console.log(board);
    return true;
}

function update(){
    for (let i=0; i<SIZE; i++){
        for (let j=0; j<SIZE; j++){
            let element = document.getElementById(`t${i}${j}`);
            element.classList.remove("t0");
            element.classList.remove("t2");
            element.classList.remove("t4");
            element.classList.remove("t8");
            element.classList.remove("t16");
            element.classList.remove("t32");
            element.classList.remove("t64");
            element.classList.remove("t128");
            element.classList.remove("t256");
            element.classList.remove("t512");
            element.classList.remove("t1024");
            element.classList.remove("t2048");
            element.classList.add(`t${board[i][j]}`);
            element.innerText = board[i][j] == 0 ? '' : board[i][j];
        }
    }
    document.getElementById("score").innerText = `分數：${score}`
}


start();


document.addEventListener('keydown', function(event){  // key binds
    if (event.key == 'ArrowUp') move("up");
    if (event.key == 'ArrowDown') move("down");
    if (event.key == 'ArrowLeft') move("left");
    if (event.key == 'ArrowRight') move("right");
    update();
});