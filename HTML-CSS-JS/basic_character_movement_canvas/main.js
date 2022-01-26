var should_continue = true;

// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.last_rendered_x = new Date();
    this.last_rendered_y = new Date();
    this.airborn = true;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    this.x += this.velX;
    let now = new Date();
    if (this.last_rendered_x < now.setMilliseconds(now.getMilliseconds() - 10)) {
        this.last_rendered_x = new Date();
        if(this.velX > 0) {
            this.velX -= 0.2;
            if(this.velX < 0) this.velX = 0;
        }
        if(this.velX < 0) {
            this.velX += 0.2;
            if(this.velX > 0) this.velX = 0;
        }
    }

    if (this.airborn) {
        let now = new Date();

        if (this.last_rendered_y < now.setMilliseconds(now.getMilliseconds() - 10)) {
            this.velY += 0.3;
            this.last_rendered_y = new Date();
            if(this.velX > 0) {
                this.velX -= 1;
                if(this.velX < 0) this.velX = 0;
            }
            if(this.velX < 0) {
                this.velX += 1;
                if(this.velX > 0) this.velX = 0;
            }
        }
        
        if (this.y < (height - this.size)) {
            this.y += this.velY;
        }

        if (this.y > (height - this.size)) {
            this.y = (height - this.size);
            this.velY = 0;
            this.airborn = false;
        }
    }
};

let player = new Ball(
    width / 2, //x
    0, //y
    0, //velocity x
    1, //velocity y
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')', //color
    10 //size
);

function loop() {
    if (should_continue) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, width, height);

        player.draw();
        player.update();

        requestAnimationFrame(loop);
    }
}

document.addEventListener("keyup", (e) => {
    if(player.airborn == false){
        if(e.key == ' ' || e.key == "space"){
            player.velY -= 5;
            player.y -= 1;
            player.airborn = true;
        }
    }
});

document.addEventListener("keydown", (e) => {
    if(e.key == "ArrowRight") {
        player.velX += 5;
    }
});
document.addEventListener("keydown", (e) => {
    if(e.key == "ArrowLeft") {
        player.velX -= 5;
    }
});

loop();