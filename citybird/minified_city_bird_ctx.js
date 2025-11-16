const SCREEN_HEIGHT=512;const SCREEN_WIDTH=288;const canvas=document.getElementById("gameCanvas");const ctx=canvas.getContext("2d");canvas.width=SCREEN_WIDTH;canvas.height=SCREEN_HEIGHT;const RED="#ff0000";const WHITE="#ffffff";const BLACK="#000000";const GRAY="#36454f";const c_list=[RED,BLACK,WHITE];let FPS=45;let running=!0;let home_page=!0;let score_page=!1;let bird_dead=!1;let score=0;let high_score=0;let move_left=!1;let move_right=!0;let prev_x=0;let p_count=0;let score_msg=null;let score_point=null;let bar_speed=4;let bar_frequency=1200;let touched=!1;let pos=null;let last_bar=0;let next_bar=0;let particles=[];let bar_gap=120;let bar_width_list=[];let score_list=[];let offset_x=0;for(let i=40;i<150;i+=10){bar_width_list.push(i)}
let bar_group=[];let ball_group=[];let block_group=[];let destruct_group=[];let win_particle_group=[];let images={};let sounds={};let fonts={};let bg_list=[];let home_bg=null;let bg=null;function random_randint(min,max){return Math.floor(Math.random()*(max-min))+min}
function random_choice(array){return array[Math.floor(Math.random()*array.length)]}
function random_randrange(min,max){return Math.floor(Math.random()*(max-min))+min}
class Rect{constructor(x,y,width,height){this.x=x;this.y=y;this.width=width;this.height=height}
get center(){return[this.x+this.width/2,this.y+this.height/2]}
set center(value){this.x=value[0]-this.width/2;this.y=value[1]-this.height/2}
collidepoint(point){return(point[0]>=this.x&&point[0]<=this.x+this.width&&point[1]>=this.y&&point[1]<=this.y+this.height)}
colliderect(other){return(this.x<other.x+other.width&&this.x+this.width>other.x&&this.y<other.y+other.height&&this.y+this.height>other.y)}}
class Player{constructor(win){this.win=win;this.image=null;this.loadImage();this.reset()}
async loadImage(){try{const img=new Image();img.src="citybird/Assets/red.png";await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});this.image=img}catch(e){console.log("Error loading player image:",e);this.image=null}}
update(){if(this.image){ctx.drawImage(this.image,this.rect.x,this.rect.y,44,44)}else{ctx.fillStyle=RED;ctx.fillRect(this.rect.x,this.rect.y,44,44)}}
reset(){this.x=145;this.y=340;this.rect=new Rect(this.x-22,this.y-22,44,44)}}
class Bar{constructor(x,y,width,color,win){this.rect=new Rect(x,y,width,20);this.win=win;this.color=color;this.alive=!0}
update(speed){this.rect.y+=speed;if(this.rect.y>=SCREEN_HEIGHT){this.kill()}
if(this.alive){ctx.fillStyle=this.color;this.fillRoundedRect(this.rect.x,this.rect.y,this.rect.width,this.rect.height,8)}}
fillRoundedRect(x,y,width,height,radius){ctx.beginPath();ctx.moveTo(x+radius,y);ctx.lineTo(x+width-radius,y);ctx.quadraticCurveTo(x+width,y,x+width,y+radius);ctx.lineTo(x+width,y+height-radius);ctx.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);ctx.lineTo(x+radius,y+height);ctx.quadraticCurveTo(x,y+height,x,y+height-radius);ctx.lineTo(x,y+radius);ctx.quadraticCurveTo(x,y,x+radius,y);ctx.closePath();ctx.fill()}
kill(){this.alive=!1}}
class Ball{constructor(x,y,type,color,win){this.x=x;this.y=y;this.color=color;this.win=win;this.alive=!0;const color_dict={red:"#ff0000",white:"#ffffff",gray:"#36454f"};this.c=color_dict[this.color];this.rect=new Rect(x-5,y-5,12,12);this.gray=color_dict.gray}
update(speed){this.y+=speed;if(this.y>=SCREEN_HEIGHT){this.kill()}
if(this.alive){ctx.fillStyle=this.gray;ctx.beginPath();ctx.arc(this.x+2,this.y+2,6,0,2*Math.PI);ctx.fill();ctx.fillStyle=this.c;ctx.beginPath();ctx.arc(this.x,this.y,6,0,2*Math.PI);ctx.fill();this.rect.x=this.x-6;this.rect.y=this.y-6;this.rect.width=12;this.rect.height=12}}
kill(){this.alive=!1}}
class Block{constructor(x,y,max,win){this.win=win;this.scale=1;this.counter=0;this.inc=1;this.x=x;this.y=y;this.max=max;this.alive=!0;this.orig=null;this.loadImage();this.rect=new Rect(x,y,this.scale,this.scale)}
async loadImage(){try{const img=new Image();img.src="citybird/Assets/block.jpeg";await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});this.orig=img}catch(e){console.log("Error loading block image:",e);this.orig=null}}
update(){if(!this.alive)return;this.counter+=1;if(this.counter>=2){this.scale+=this.inc;if(this.scale<=0||this.scale>=this.max){this.inc*=-1}
this.rect=new Rect(this.x-this.scale/2,this.y-this.scale/2,this.scale,this.scale);this.counter=0}
if(this.orig&&this.scale>0){ctx.drawImage(this.orig,this.rect.x,this.rect.y,this.scale,this.scale)}else if(this.scale>0){ctx.fillStyle=GRAY;ctx.fillRect(this.rect.x,this.rect.y,this.scale,this.scale)}}
kill(){this.alive=!1}}
class ScoreCard{constructor(x,y,win){this.win=win;this.size=50;this.inc=1;this.animate=!1;this.x=x;this.y=y;this.style="BubblegumSans-Regular"}
update(score){if(this.animate){this.size+=this.inc;if(this.size<=50||this.size>=65){this.inc*=-1}
if(this.size==50){this.animate=!1}}
ctx.font=`${this.size}px ${this.style}, Arial`;ctx.fillStyle=GRAY;ctx.textAlign="center";ctx.fillText(`${score}`,this.x+3,this.y+3);ctx.fillStyle=WHITE;ctx.fillText(`${score}`,this.x,this.y)}}
class Message{constructor(x,y,size,text,font,color,win){this.win=win;this.x=x;this.y=y;this.size=size;this.text=text;this.font=font||"Verdana";this.color=color;this.shadow_color=GRAY}
update(){ctx.font=`${this.size}px ${this.font}, Arial`;ctx.fillStyle=this.shadow_color;ctx.textAlign="center";ctx.fillText(this.text,this.x+2,this.y+2);ctx.fillStyle=this.color;ctx.fillText(this.text,this.x,this.y)}}
class Particle{constructor(x,y,size,color,win){this.x=x;this.y=y;this.color=color;this.win=win;this.size=random_randint(4,7);this.alive=!0;let xr,yr,f;if(size==0){xr=[-1,2];yr=[-2,2];f=1;this.life=60}else if(size==1){xr=[-3,3];yr=[-6,6];f=2;this.life=60}else if(size==2){xr=[-3,3];yr=[-3,3];f=2;this.life=40}
this.x_vel=random_randrange(xr[0],xr[1])*f;this.y_vel=random_randrange(yr[0],yr[1])*f;this.lifetime=0}
update(){if(!this.alive)return;this.size-=0.1;this.lifetime+=1;if(this.lifetime<=this.life){this.x+=this.x_vel;this.y+=this.y_vel;let s=Math.floor(this.size);if(s>0){ctx.fillStyle=this.color;ctx.fillRect(this.x,this.y,s,s)}}else{this.kill()}}
kill(){this.alive=!1}}
function generate_particles(p,particles,color,win){let particle_pos=[...p.rect.center];particle_pos[1]+=25;particles.push([particle_pos,[Math.random()*2-1,-2],random_randint(4,8)]);for(let i=particles.length-1;i>=0;i--){let particle=particles[i];particle[0][0]-=particle[1][0];particle[0][1]-=particle[1][1];particle[2]-=0.1;if(particle[2]>0){ctx.fillStyle=color;ctx.beginPath();ctx.arc(particle[0][0],particle[0][1],Math.floor(particle[2]),0,2*Math.PI);ctx.fill()}
if(particle[2]<=0){particles.splice(i,1)}}
return particles}
function safe_load_sound(path){try{const audio=new Audio(path);return audio}catch(e){return null}}
let coin_fx=safe_load_sound("citybird/Sounds/coin.mp3");let death_fx=safe_load_sound("citybird/Sounds/death.mp3");let move_fx=safe_load_sound("citybird/Sounds/move.mp3");async function loadBackgrounds(){for(let i=1;i<=4;i++){let ext=i==2?"jpeg":"jpg";try{const img=new Image();img.src=`citybird/Assets/Backgrounds/bg${i}.${ext}`;await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});bg_list.push(img)}catch(e){}}
try{const img=new Image();img.src="citybird/Assets/Backgrounds/home.jpeg";await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});home_bg=img}catch(e){const canvas_bg=document.createElement("canvas");canvas_bg.width=SCREEN_WIDTH;canvas_bg.height=SCREEN_HEIGHT;const ctx_bg=canvas_bg.getContext("2d");ctx_bg.fillStyle=BLACK;ctx_bg.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);home_bg=canvas_bg}
bg=home_bg}
let p=new Player(ctx);let score_card=new ScoreCard(140,40,ctx);function destroy_bird(){let[x,y]=p.rect.center;for(let i=0;i<50;i++){let c=random_choice(c_list);let particle=new Particle(x,y,1,c,ctx);destruct_group.push(particle)}}
function win_particles(){let positions=[[40,120],[SCREEN_WIDTH-20,240],[15,SCREEN_HEIGHT-30],];for(let[x,y]of positions){for(let i=0;i<10;i++){let particle=new Particle(x,y,2,WHITE,ctx);win_particle_group.push(particle)}}}
let title_font="Robus-BWqOd";let dodgy=new Message(134,90,100,"City",title_font,WHITE,ctx);let walls=new Message(164,145,80,"Bird",title_font,WHITE,ctx);let tap_to_play_font="DebugFreeTrial-MVdYB";let tap_to_play=new Message(144,400,32,"TAP TO PLAY",tap_to_play_font,WHITE,ctx);let tap_to_replay=new Message(144,400,30,"Tap to Replay",tap_to_play_font,WHITE,ctx);function updateSpriteGroup(group,...args){for(let i=group.length-1;i>=0;i--){if(group[i].alive){group[i].update(...args)}else{group.splice(i,1)}}}
function emptySpriteGroup(group){group.length=0}
function checkCollision(sprite,group){for(let other of group){if(other.alive&&sprite.rect.colliderect(other.rect)){return other}}
return null}
function getMousePos(event){const rect=canvas.getBoundingClientRect();return[event.clientX-rect.left,event.clientY-rect.top]}
canvas.addEventListener("mousedown",(event)=>{let mousePos=getMousePos(event);if(home_page||score_page){home_page=!1;score_page=!1;emptySpriteGroup(win_particle_group);bg=random_choice(bg_list);particles=[];last_bar=Date.now()-bar_frequency;next_bar=0;bar_speed=4;bar_frequency=1200;bird_dead=!1;score=0;p_count=0;score_list=[];score_msg=null;score_point=null;emptySpriteGroup(block_group);for(let i=0;i<15;i++){let x=random_randint(30,SCREEN_WIDTH-30);let y=random_randint(60,SCREEN_HEIGHT-60);let max=random_randint(8,16);let b=new Block(x,y,max,ctx);block_group.push(b)}}
if(!home_page){if(p.rect.collidepoint(mousePos)){touched=!0;let[x,y]=mousePos;offset_x=p.rect.x-x}}});canvas.addEventListener("mouseup",(event)=>{if(!home_page){touched=!1}});canvas.addEventListener("mousemove",(event)=>{if(!home_page&&touched){let[x,y]=getMousePos(event);if(move_right&&prev_x>x){move_right=!1;move_left=!0;if(move_fx){move_fx.play().catch((e)=>console.log("Audio play error:",e))}}
if(move_left&&prev_x<x){move_right=!0;move_left=!1;if(move_fx){move_fx.play().catch((e)=>console.log("Audio play error:",e))}}
prev_x=x;p.rect.x=x+offset_x}});canvas.addEventListener("touchstart",(event)=>{event.preventDefault();let touch=event.touches[0];let mouseEvent={clientX:touch.clientX,clientY:touch.clientY};let mousePos=getMousePos(mouseEvent);if(home_page||score_page){home_page=!1;score_page=!1;emptySpriteGroup(win_particle_group);bg=random_choice(bg_list);particles=[];last_bar=Date.now()-bar_frequency;next_bar=0;bar_speed=4;bar_frequency=1200;bird_dead=!1;score=0;p_count=0;score_list=[];score_msg=null;score_point=null;emptySpriteGroup(block_group);for(let i=0;i<15;i++){let x=random_randint(30,SCREEN_WIDTH-30);let y=random_randint(60,SCREEN_HEIGHT-60);let max=random_randint(8,16);let b=new Block(x,y,max,ctx);block_group.push(b)}}
if(!home_page){if(p.rect.collidepoint(mousePos)){touched=!0;let[x,y]=mousePos;offset_x=p.rect.x-x}}});canvas.addEventListener("touchend",(event)=>{event.preventDefault();if(!home_page){touched=!1}});canvas.addEventListener("touchmove",(event)=>{event.preventDefault();if(!home_page&&touched){let touch=event.touches[0];let mouseEvent={clientX:touch.clientX,clientY:touch.clientY};let[x,y]=getMousePos(mouseEvent);if(move_right&&prev_x>x){move_right=!1;move_left=!0;if(move_fx){move_fx.play().catch((e)=>console.log("Audio play error:",e))}}
if(move_left&&prev_x<x){move_right=!0;move_left=!1;if(move_fx){move_fx.play().catch((e)=>console.log("Audio play error:",e))}}
prev_x=x;p.rect.x=x+offset_x}});async function main(){await loadBackgrounds();try{while(running){ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);if(bg){if(bg instanceof HTMLCanvasElement){ctx.drawImage(bg,0,0)}else{ctx.drawImage(bg,0,0,SCREEN_WIDTH,SCREEN_HEIGHT)}}
if(home_page){bg=home_bg;particles=generate_particles(p,particles,WHITE,ctx);dodgy.update();walls.update();tap_to_play.update();p.update()}else if(score_page){bg=home_bg;particles=generate_particles(p,particles,WHITE,ctx);tap_to_replay.update();p.update();if(score_msg!==null){score_msg.update()}
if(score_point!==null){score_point.update()}
if(p_count%5==0){win_particles()}
p_count+=1;updateSpriteGroup(win_particle_group)}else{next_bar=Date.now();if(next_bar-last_bar>=bar_frequency&&!bird_dead){let bwidth=random_choice(bar_width_list);let b1prime=new Bar(0,0,bwidth+3,GRAY,ctx);let b1=new Bar(0,-3,bwidth,WHITE,ctx);let b2prime=new Bar(bwidth+bar_gap+3,0,SCREEN_WIDTH-bwidth-bar_gap,GRAY,ctx);let b2=new Bar(bwidth+bar_gap,-3,SCREEN_WIDTH-bwidth-bar_gap,WHITE,ctx);bar_group.push(b1prime);bar_group.push(b1);bar_group.push(b2prime);bar_group.push(b2);let color=random_choice(["red","white"]);pos=random_choice([0,1]);let x;if(pos==0){x=bwidth+12}else if(pos==1){x=bwidth+bar_gap-12}
let ball=new Ball(x,10,1,color,ctx);ball_group.push(ball);last_bar=next_bar}
for(let ball of ball_group){if(ball.alive&&ball.rect.colliderect(p.rect)){if(ball.color=="white"){ball.kill();if(coin_fx){coin_fx.play().catch((e)=>console.log("Audio play error:",e))}
score+=1;if(score>high_score){high_score=score}
score_card.animate=!0}else if(ball.color=="red"){if(!bird_dead){if(death_fx){death_fx.play().catch((e)=>console.log("Audio play error:",e))}
destroy_bird()}
bird_dead=!0;bar_speed=0}}}
let collision=checkCollision(p,bar_group);if(collision){if(!bird_dead){if(death_fx){death_fx.play().catch((e)=>console.log("Audio play error:",e))}
destroy_bird()}
bird_dead=!0;bar_speed=0}
updateSpriteGroup(block_group);updateSpriteGroup(bar_group,bar_speed);updateSpriteGroup(ball_group,bar_speed);if(bird_dead){updateSpriteGroup(destruct_group)}
score_card.update(score);ctx.font="20px BubblegumSans-Regular, Arial";ctx.fillStyle=WHITE;ctx.textAlign="right";ctx.fillText("High: "+high_score,SCREEN_WIDTH-10,30);if(!bird_dead){particles=generate_particles(p,particles,WHITE,ctx);p.update()}
if(score&&score%10==0){let rem=Math.floor(score/10);if(!score_list.includes(rem)){score_list.push(rem);bar_speed+=1;bar_frequency-=200}}
if(bird_dead&&destruct_group.length==0){score_page=!0;let font="BubblegumSans-Regular";if(score<high_score){score_msg=new Message(144,60,55,"Score",font,WHITE,ctx)}else{score_msg=new Message(144,60,55,"New High",font,WHITE,ctx)}
score_point=new Message(144,110,45,`${score}`,font,WHITE,ctx)}
if(score_page){emptySpriteGroup(block_group);emptySpriteGroup(bar_group);emptySpriteGroup(ball_group);p.reset();ctx.save();ctx.globalAlpha=0.85;ctx.fillStyle=BLACK;ctx.fillRect(60,40,168,150);ctx.restore();if(score_point!==null){score_point.update()}
ctx.font="28px BubblegumSans-Regular, Arial";ctx.fillStyle=WHITE;ctx.textAlign="center";ctx.fillText("High Score: "+high_score,144,160);if(score_msg!==null){score_msg.update()}}}
await new Promise((resolve)=>setTimeout(resolve,1000/FPS))}}catch(e){console.trace()}}
main()