// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const p = document.querySelector('p');
// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor(){
  return 'rgb(' +
    random(0,255)+', ' +
    random(0,255)+', ' +
    random(0,255)+')';
}

function Shape(x,y,velX,velY,exists){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function Ball(x,y,velX,velY,exists,color,size){
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x,this.y,this.size,0,2* Math.PI);
  ctx.fill();
}

Ball.prototype.update = function(){
  if((this.x + this.size ) >= width){
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0){
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height){
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0){
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function(){
  for(let j =0 ;j<Balls.length;j++){
    if(this !== Balls[j]){
      const dx = this.x - Balls[j].x;
      const dy = this.y - Balls[j].y;
      const distance = Math.sqrt(dx * dx+dy * dy);
      
      if(distance < this.size + Balls[j].size){
        Balls[j].color = this.color = randomColor();
      }
    }
  }
}

function EvilCircle(x,y,exists){
  Shape.call(this,x,y,10,10,exists);
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x,this.y,this.size,0,2* Math.PI);
  ctx.stroke();
};

EvilCircle.prototype.checkBounds = function(){
  if((this.x + this.size ) >= width){
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0){
    this.x += this.size;
  }

  if((this.y + this.size) >= height){
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0){
    this.y += this.size;
  }
};

EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    switch(e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        this.x -= this.velX;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        this.x += this.velX;
        break;
      case 'w':
      case 'W':
      case 'ArrowUp':
        this.y -= this.velY;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        this.y += this.velY;
        break;
    }
  };
};

EvilCircle.prototype.collisionDetect = function (){
  for(let j =0 ;j<Balls.length;j++){
    if(Balls[j].exists){
      const dx = this.x - Balls[j].x;
      const dy = this.y - Balls[j].y;
      const distance = Math.sqrt(dx * dx+dy * dy);
      
      if(distance < this.size + Balls[j].size){
        Balls[j].exists = false;
        p.textContent -= 1;
      }
    }
  }
};

const Balls = [];
while(Balls.length <52){
  let size = random(10,20);
  let ball = new Ball(
    random(0 + size,width - size ),
    random(0 + size,height - size) ,
    random(-7,7),
    random(-7,7),
    true,
    randomColor(),
    size
  );

  Balls.push(ball);
}
p.textContent = Balls.length;

let evil = new EvilCircle(random(0,width),random(0,height),true);
evil.setControls();

function loop(){
  ctx.fillStyle = 'rgb(0,0,0,1)';
  ctx.fillRect(0,0,width,height);

  for(let i =0;i<Balls.length;i++){
    if(Balls[i].exists){
      Balls[i].draw();
      Balls[i].update();
      Balls[i].collisionDetect();
    }
  }

  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();

  requestAnimationFrame(loop);
}

loop();