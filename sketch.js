var ball;
var database,position;

function setup(){
    // establishing connection with database.
    database=firebase.database();
    console.log(database);

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    // .ref() refer to the location of the database which we want to access.
    var ballref=database.ref('ball/position');
    // .on() creates a listener which keeps listening the changes in the database.
    // whenever any change is made to the database values then read position function will be called.
    // if there is any error while reading the values, showerror function will be called.
     ballref.on("value",readPosition,showerror);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
       writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x+x,
        'y': position.y+y,
    })
}

function readPosition(data){
    position=data.val();// storing the values of data in position variable.
    ball.x=position.x;
    ball.y=position.y;
}

function showerror(){
    console.log("error");
}