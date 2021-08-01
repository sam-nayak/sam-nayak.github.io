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

// START CLOCK SCRIPT

Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function clock() {// We create a new Date object and assign it to a variable called "time".
var time = new Date(),

    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),

    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes(),


    seconds = time.getSeconds();

document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);

  function harold(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}
setInterval(clock, 1000);
