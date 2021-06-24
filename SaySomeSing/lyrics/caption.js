txt = $("#mytext");
length = $("#mytext li").length;
height_ul = parseInt(txt.height());
height_li = parseInt(txt.height()) / length;
delta = 2;

var count=0;

var x = document.getElementById("myAudio");
var timestamp = [0,23.17,39.20,51.09,60.48,71.04,80.45,86.35,92.44,101,103.07,108.31,114.07,125.29,162.27,178.61,190.07,199.53,210.07,219.94,225.45,231.22,242.03,247.36,253.36,264.36,276.91,283.00,288.01,293.62];

var ts=0;
function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}

function next(){
    count++;
    if(count==29){
        count=0;
        document.getElementById("indicate1").innerHTML= "start";
    }
    else{
      x.currentTime = timestamp[count];
      x.play();
      document.getElementById("indicate1").innerHTML= "next";
      setTimeout(function(){
        x.pause();
      }, (timestamp[count+1]-timestamp[count])*1000);
    }
    run();
}

function next2(){
  count=count+2;
  if(count>=29){
      count=0;
      document.getElementById("indicate2").innerHTML= "start";
  }
  else{
    x.currentTime = timestamp[count];
    x.play();
    document.getElementById("indicate2").innerHTML= "next2";
    setTimeout(function(){
      x.pause();
    }, (timestamp[count+2]-timestamp[count+1])*1000);
  }
  for (let i = 0; i < 2; i++) {
    setTimeout(function(){
      run();
    },1000);
  }
  
}

function run() {
    delta = (delta - height_li < -1 * height_ul) ? height_ul : delta - height_li;

    if (delta <= 0) {
        scroll_li(delta);
    } else if (delta = height_ul) {
        txt.animate({
            top: delta
        }, 0, "linear");
        delta = 2;
        scroll_li(delta);
    }
    document.getElementById("indication2").innerHTML = delta;
    //setTimeout(run, 50);
}

function scroll_li(delta) {
    txt.animate({
        top: delta
    }, 250, "linear").delay(100);
}
