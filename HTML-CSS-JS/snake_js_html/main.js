var should_continue = true;

// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}


let game_unit = 50;

function Piece(x, y, color, size) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.color = color;
    this.size = size;
    this.direction = 0;
}

Piece.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
}

function middleX() {
    return parseInt(width / game_unit / 2) * game_unit;
}

function middleY() {
    return parseInt(height / game_unit/ 2) * game_unit;
}

var snek;
function new_snek() {
    return [new Piece(
        middleX(), //x
        middleY(), //y
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')', //color
        game_unit, //size
    )];
}
snek = new_snek();

function random_snack() {
    let x = random(0, parseInt(width / game_unit)) * game_unit;
    let y = random(0, parseInt(height / game_unit)) * game_unit;
    return new Piece(x,y,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',game_unit);
}

var snack = random_snack();

function draw() {
    snack.draw();
    for (let i = 0; i < snek.length; i++) {
        snek[i].draw();
    }
}

function get_position_facing(direction, x, y) {
    var new_position;
    switch (direction) {
        case 0:
            new_position = {x: x, y: y-game_unit};
            break;
        case 1:
            new_position = {x: x+game_unit, y: y};
            break;
        case 2:
            new_position = {x: x, y: y+game_unit};
            break;
        case 3:
            new_position = {x: x-game_unit, y: y};
            break;
        default:
            break;
    }
    return new_position
}

function add_piece() {
    let tail = snek[snek.length-1];
    let position = get_position_facing(((tail.direction + 2)%4), tail.x, tail.y);
    new_piece = new Piece(position.x, position.y,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        game_unit)
    snek.push(new_piece);
}

function front_obstructed(piece) {
    var position = get_position_facing(piece.direction, piece.x, piece.y)
    if (snack.x == position.x && snack.y == position.y) {
        snack = random_snack();
        add_piece();
        return false;
    };
    if (snek.length > 1) {
        for (let i = 1; i < snek.length; i++) {
            if(snek[i].x == position.x && snek[i].y == position.y) {
                return true;
            }
        }
    }
    return false;
}

var last_update = new Date();
function update () {
    let now = new Date();
    if(last_update < now.setMilliseconds(now.getMilliseconds() - 200)) {
        if (front_obstructed(snek[0])){
            snek = new_snek();
            snack = random_snack();
        }
        else{
            for (let i = snek.length - 1; i > 0; i--) {
                console.log("crack");
                snek[i].x = snek[i - 1].x;
                snek[i].y = snek[i - 1].y;
                snek[i].direction = snek[i - 1].direction;
            }
            var new_head_position = get_position_facing(snek[0].direction,snek[0].x, snek[0].y)
            snek[0].x = new_head_position.x;
            snek[0].y = new_head_position.y;
        }
        last_update = new Date();
    }
}

function loop( ) {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);

    draw();
    update();

    requestAnimationFrame(loop);
}

document.addEventListener("keyup", (e) => {
    var new_direction;
    switch (e.key) {
        case "ArrowUp":
                new_direction = 0;
            break;
        case "ArrowRight":
                new_direction = 1;
            break;
        case "ArrowDown":
                new_direction = 2;
            break;
        case "ArrowLeft":
                new_direction = 3;
            break;
        default:
                new_direction = snek[0].direction;
            break;
    }
    if((new_direction + 2)%4 != snek[0].direction && new_direction != snek[0].direction){
        snek[0].direction = new_direction;
    }
});

loop();