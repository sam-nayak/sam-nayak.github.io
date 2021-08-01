const navbar = document.getElementById("header");
const logo = document.getElementById("logo-header");
const headerText = document.getElementById("header-text");
const DEFAULT_RADIUS = 20;
let canvas;

let drawLogoAnimation = false;
let radius = DEFAULT_RADIUS;
let opacity = 255;

function onLogoHover(e) {
    drawLogoAnimation = true;
    radius = DEFAULT_RADIUS;
    opacity = 255;
}

function getNavbarHeight() {
    return navbar.getBoundingClientRect().height;
}

function getLogoPosition() {
    const rect = logo.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

function setup() {
    canvas = createCanvas(windowWidth, getNavbarHeight());
    canvas.position(0, 0);
    canvas.parent(navbar);
}

function draw() {
    if (!drawLogoAnimation) {
        return;
    }

    clear();

    const pos = getLogoPosition();
    strokeWeight(2);
    noFill();

    for (let i = 0; i < 20; i++) {
        let r = radius * i / 20;
        stroke(83, 165, 72, opacity);
        circle(pos.x, pos.y, r);
    }

    radius += 8;
    opacity -= 3;
}

function onCopyClicked(e) {
    navigator.clipboard.writeText(e.target.dataset.copyTarget);
    e.target.innerHTML = "Copied!";
}

logo.onmouseover = onLogoHover;

for (let elem of document.getElementsByClassName("tighten-ph")) {
    elem.classList.add("tight");
}

for (let elem of document.getElementsByName("copy-button")) {
    elem.onclick = onCopyClicked;
}

let currentTheme = document.documentElement.getAttribute('data-theme');
if (!currentTheme) {
    currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

if (currentTheme === "dark") {
    document.getElementById("theme-toggle").innerHTML = "Light Mode";
} else {
    document.getElementById("theme-toggle").innerHTML = "Dark Mode";
}

var clock = {

  digits : ["zero", "one", "two", "three", "foure", "five", "six", "seven", "eight", "nine"],

  init : function(){
    var $digit = $('.digit');

    // Ugly....
    this.hour = [$($digit[0]), $($digit[1])];
    this.min  = [$($digit[2]), $($digit[3])];
    this.sec  = [$($digit[4]), $($digit[5])];


    this.drawInterval(this.drawSecond, function(time){
      return 1000 - time[3];
    })

    this.drawInterval(this.drawMinute, function(time){
      return 60000 - time[2] * 1000 - time[3];
    })


   this.drawInterval(this.drawHour, function(time){
      return (60 - time[1]) * 60000 - time[2] * 1000 - time[3];
    })

  },

  getTimeArray : function(){
    var dat = new Date();
    return [dat.getHours(), dat.getMinutes(), dat.getSeconds(), dat.getMilliseconds()];
  },

  drawInterval : function(func, timeCallback){
    var time = this.getTimeArray();

    func.call(this, time);

    var that = this;
    setTimeout(function(){
        that.drawInterval(func, timeCallback);
    }, timeCallback(time));
  },

  drawHour : function(time){
    this.drawDigits(this.hour, time[0]);
  },

  drawMinute : function(time){
  	this.drawDigits(this.min,  time[1]);
  },

  drawSecond : function(time){
  	this.drawDigits(this.sec,  time[2]);
  },

  drawDigits : function(digits, digit){
    var ten = Math.floor(digit / 10);
    var one = Math.floor(digit % 10);

    digits[0].attr('class', 'digit '+this.digits[ten]);
    digits[1].attr('class', 'digit '+this.digits[one]);
  }

};

clock.init();
