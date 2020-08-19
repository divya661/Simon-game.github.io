var ans = [],
  ques = [];
var counter = 0,
  alength;

var mode = "normal";

function ansPush(id) {
  ans.push(id);
  console.log("answer array=" + ans);
}

function blink(id) {
  console.log("answer array" + ans);
 if (id == 1) {
         $("#green").css("background-color", "rgba(0,255,0,1)");
    setTimeout(function() {
       
    $("#green").css("background-color", "rgba(0,255,0,0.5)");

    }, 200);
    var a1= new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    a1.play();
  }else if (id == 2) {
         $("#red").css("background-color", "rgba(255,0,0,1)");
    setTimeout(function() {
       
    $("#red").css("background-color", "rgba(255,0,0,0.5)");

    }, 200);
    var a2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    a2.play();
  }else if (id == 3) {
         $("#yellow").css("background-color", "rgba(255,255,0,0.5)");
    setTimeout(function() {
       
    $("#yellow").css("background-color", "rgba(255,255,0,1)");

    }, 200);
    var a3= new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    a3.play();
  }
  else if (id == 4) {
         $("#blue").css("background-color", "rgba(0,0,255,1)");
    setTimeout(function() {
       
    $("#blue").css("background-color", "rgba(0,0,255,0.5)");

    }, 200);
    var a4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    a4.play();
  }
}
function choice(i) {
  if (i === 0) {
    console.log("game off");
    document.getElementById("start").disabled = true;
    document.getElementById("strict").disabled = true;
    ans = [];
    ques = [];
    counter = 0;
    toggle = 0;
    $("#level").html("level");
  } else if (i == 1) {
    console.log("game on");
    document.getElementById("start").disabled = false;
    document.getElementById("strict").disabled = false;
  }
}
function startGame() {
  console.log("game starts");
  setTimeout(function() {
    question("pass");
  }, 300);
  ans = [];
  ques = [];
  counter = 0;
  toggle = 0;
  $("#win").hide();
  $("#play").hide();
  $("#hint").hide();
}
function strictMode() {
  if (mode === "normal") {
    $("#strict").css("background-color", "rgba(255,0,0,0.3)");
    mode = "strict";
    console.log("mode is " + mode);
    if (ques.length != 0) {
      console.log("length of question array:" + ques.length);
      startGame();
    }
  } else if (mode === "strict") {
    $("#strict").css("background-color", "red");
    mode = "normal";
    console.log("strict-mode-off " + mode);
    if (ques.length !== 0) {
      console.log("length of question array:" + ques.length);
      startGame();
    }
  }
}
function update() {
  $("#level").html("<div>" + ques.length + "</div>");
}
function checkMove() {
  console.log("checking");
  if (ans[counter] === ques[counter]) {
    if (ans.length === ques.length) {
      if (ans.length === 20) {
        $(function() {
          (function pulse() {
            $("#win").show().delay(400).fadeOut("slow");
          })();
        });
        setTimeout(function() {
          $("#win").hide();
        }, 3000);
        return startGame();
      }
      question("pass");
      disdiv();
      counter = 0;
      ans = [];
      console.log("answer array=" + ans);
    } else {
      console.log(counter + "correct");
      counter++;
    }
  } else {
    counter = 0;
    ans = [];
    console.log("answer" + ans);
    console.log(counter + "wrong");
   
    $("#level")
      .html("!!!")
      .toggle("vibrate")
      .toggle("vibrate");

    question("fail");
  }
  console.log(ques[counter] + " " + ans[counter]);
}
function pattern(arr) {
  disdiv();
  //var arr=[1,2,3,4,4,3,2,1]
  var i = 0,
    patlen = arr.length;
  function fun() {
    blink(arr[i]);
    i++;
    if (i < patlen) {
      setTimeout(fun, 400);
    }
  }
  fun();
  enablediv();
  update();
}

function question(judge) {
  if (mode === "normal") {
    console.log("current mode is " + mode);
    if (judge == "pass") {
      ques.push(Math.floor(Math.random() * 4) + 1);
      console.log("<b>question array=</b>" + ques);
      setTimeout(function() {
        pattern(ques);
      }, 500);
      qlen = ques.length;
    } else {
      disdiv();
      setTimeout(function() {
        pattern(ques);
      }, 500);
      qlen = ques.length;
    }
  } else if (mode === "strict") {
    console.log("current mode is " + mode);
    if (judge === "pass") {
      ques.push(Math.floor(Math.random() * 4) + 1);
      console.log("<b>question array is</b>" + ques);
      setTimeout(function() {
        pattern(ques);
      }, 500);
      qlen = ques.length;
    } else {
      disdiv();
     
      startGame();
    }
  }
}

function enablediv() {
  console.log("enable div");
  $("#green")
    .removeClass("unclickable")
    .addClass("clickable");
  $("#red")
    .removeClass("unclickable")
    .addClass("clickablle");
  $("#blue")
    .removeClass("unclickable")
    .addClass("clickable");
  $("#yellow")
    .removeClass("unclickable")
    .addClass("clickablle");
}

function disdiv() {
  console.log("disable clicks...");
  $("#green")
    .removeClass("clickable")
    .addClass("unclickable");
  $("#red")
    .removeClass("clickable")
    .addClass("unclickablle");
  $("#blue")
    .removeClass("Clickable")
    .addClass("unclickable");
  $("#yellow")
    .removeClass("Clickable")
    .addClass("unclickablle");
}

$(document).ready(function() {
  disdiv();
  $("#play,#hint")
    .delay(3000)
    .fadeOut("slow");
  
  $("#win").hide();

  console.log(ans);
});
