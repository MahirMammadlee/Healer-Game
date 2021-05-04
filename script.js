var gameBox = document.querySelector("#game-box");
var healer = document.querySelector("#healer");
var start = document.querySelector("#start");
var score = document.querySelector("#score");

healer.style.top = "150px";
healer.style.left =  "375px";

var upKey = document.querySelector("#up");
var rightKey = document.querySelector("#right");
var downKey = document.querySelector("#down");
var leftKey = document.querySelector("#left");

var topObj = "";
var leftObj = "";
var count = 0;


//------Create Random Div
createRandomDiv(gameBox);

//------Game Control
start.addEventListener("click", function() {
    
    this.style.opacity = 0;

    upKey.addEventListener("click", function () {
        goUp();
        checkHealerPosition();
    });
    
    rightKey.addEventListener("click", function () {
        goRight();
        checkHealerPosition();
    });
    
    downKey.addEventListener("click", function () {
        goDown();
        checkHealerPosition();
    });
    
    leftKey.addEventListener("click", function () {
        goLeft();
        checkHealerPosition();
    });

    window.addEventListener("keydown", function (event) {
        
        if(event.keyCode == 38 || event.keyCode == 87) {
            goUp();
            checkHealerPosition();
            upKey.style.background = "rgba(102, 95, 70, .6)";

            window.addEventListener("keyup", function (event) {
                upKey.style.background = "rgb(102, 95, 70)";
            });
        }
        if(event.keyCode == 39 || event.keyCode == 68) {
            goRight();
            checkHealerPosition();
            rightKey.style.background = "rgba(102, 95, 70, .6)"
            window.addEventListener("keyup", function (event) {
                rightKey.style.background = "rgb(102, 95, 70)";
            });
        }
        if(event.keyCode == 40 || event.keyCode == 83) {
            goDown();
            checkHealerPosition();
            downKey.style.background = "rgba(102, 95, 70, .6)"
            window.addEventListener("keyup", function (event) {
                downKey.style.background = "rgb(102, 95, 70)";
            });
        }
        if(event.keyCode == 37 || event.keyCode == 65) {
            goLeft();
            checkHealerPosition();
            leftKey.style.background = "rgba(102, 95, 70, .6)"
            window.addEventListener("keyup", function (event) {
                leftKey.style.background = "rgb(102, 95, 70)";
            });
        }
    });
});

//----------- Utils

//   Random Number Generator
function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//   Random Div Creator
function createRandomDiv(parent) {

    topObj = randomGenerator(0,365);
    leftObj = randomGenerator(0,770);

    var div = document.createElement("div");

    div.setAttribute("id", "patient");
    div.style.position = "absolute";
    div.style.top = topObj + "px";
    div.style.left = leftObj + "px";

    parent.appendChild(div);

    var patient = document.querySelector("#patient");

    var plus = document.createElement("span");
    plus.className = "fas fa-plus-circle";

    patient.appendChild(plus);

}

// Healer Control Functions Start
function goUp() {
    if(parseInt(healer.style.top.slice(0, -2)) > 0){
        healer.style.top = (parseInt(healer.style.top.slice(0, -2)) - 7.5) + 'px';
    }
}

function goRight() {
    if(parseInt(healer.style.left.slice(0, -2)) < 750){
        healer.style.left = (parseInt(healer.style.left.slice(0, -2)) + 7.5) + 'px';
    }
}

function goDown() {
    if(parseInt(healer.style.top.slice(0, -2)) < 340){
        healer.style.top = (parseInt(healer.style.top.slice(0, -2)) + 7.5) + 'px';
    }
}

function goLeft() {
    if(parseInt(healer.style.left.slice(0, -2)) > 0){
        healer.style.left = (parseInt(healer.style.left.slice(0, -2)) - 7.5) + 'px';
      }
}
//   Healer Control Functions End

//   Healer Position Checker
function checkHealerPosition() {

    if( Math.abs(parseInt(healer.style.top.slice(0, -2)) - parseInt(patient.style.top.slice(0, -2)))<20 
        && Math.abs(parseInt(healer.style.left.slice(0, -2)) - parseInt(patient.style.left.slice(0, -2)))<20 ) {

        var topHeart = parseInt(patient.style.top.slice(0, -2))-50;
        var leftHeart = parseInt(patient.style.left.slice(0, -2))-30;
    
        var heart = document.createElement("div");
    
        heart.setAttribute("id", "heart");
        heart.style.top = topHeart + "px";
        heart.style.left = leftHeart + "px";
    
        gameBox.appendChild(heart);
    
        var heartIcon = document.createElement("span");
        heartIcon.className = "fas fa-heart";
    
        heart.appendChild(heartIcon);

        heart.style.fontSize = "5rem";
        heart.style.fontSize = "15rem";

        heart.animate([
                
            { transform: 'translate(1px, 1px)', fontSize: "5rem" },
            { transform: 'translate(-1px, -2px)', fontSize: "15rem"},
            { transform: 'translate(1px, 1px)', fontSize: "5rem"}
        ],
            { 
                duration: 800,
            });
        
        heart.style.fontSize = "0";    
            
        patient.remove();
        createRandomDiv(gameBox);
        count++;
        score.innerText = "Hesab: " + count;
    }
}
