class Building {
	constructor(name, cost, increment=0, time=1) {
		this._group = "Building";
		this._amount = 0;
		this._name = name;
		this._cost = cost;
		this._increment = increment;
		this._time = time;
	}
}

var cookies,
		cps,
		currentCookie,
		buildings,
		hasBought = false;

function init(){
	if (typeof(Storage) !== "undefined") {
		cookies = localStorage.cookies ? Number(localStorage.cookies) : 0;
		cps = localStorage.cps ? Number(localStorage.cps) : 0;

		if (localStorage.purchases){
			buildings = JSON.parse(localStorage.getItem("purchases"));
			hasBought = true;
		}
		else {
			buildings = [
				new Building("Cursor", 10, 0.25),
				new Building("Grandma", 100, 1),
				new Building("Farm", 500, 8),
				new Building("Mine", 10000, 20),
				new Building("Factory", 50000, 100),
				new Building("Bank", 100000, 250),
				new Building("Temple", 250000, 1000),
				new Building("Wizard Tower", 500000, 2500),
				new Building("Shipment", 1000000, 7500),
				new Building("Alchemy Lab", 5000000, 50000),
				new Building("Portal", 10000000, 150000),
				new Building("End Game", 100000000000)
			];
		}
	}

}

function clickCookie(){
	cookies++;
	updateCookies();
}

function buy(item){
	if (!hasBought){
		hasBought = true;
		if (timeLoop)
			clearTimeout(timeLoop);
		timeLoop = loop();
	}
	if (cookies >= item._cost){
		if (item._name === "End Game"){
			alert("Congratulations!");
		}

		item._amount++;
		cookies -= item._cost;

		if (item._group == "Building"){
			item._cost = Math.floor(item._cost * 1.3);

			cps += item._increment / item._time;

			updateCookies();
			autosave();

			document.getElementById(item._name).value = `${item._name}: ${item._amount} (costs ${item._cost})`;
		}
	}
}

function loop(){
	cookies += (document.hidden ? cps : cps / 100)
	//cookies += cps/100
	document.getElementById("cookie-amount").innerHTML = `Cookies = ${Math.floor(cookies)}`;
	timeLoop = setTimeout(loop, 10);
}

function updateCookies(){
	localStorage.cookies = cookies;
	document.title = `${Math.floor(cookies)} Cookies - Fortune Cookie Clicker | Sam Nayak`;
	document.getElementById("cps-amount").innerHTML = `CPS = ${cps}`;
	document.getElementById("cookie-amount").innerHTML = `Cookies = ${Math.floor(cookies)}`;
}

function autosave(){
	localStorage.cookies = cookies;
	localStorage.cps = cps;
	localStorage.setItem("purchases", JSON.stringify(buildings));
}

function restartGame(){
	cookies = 0;
	cps = 0;
	hasBought = false;
	if (timeLoop)
		clearTimeout(timeLoop);

	localStorage.clear();
	init();
	buttonCreation();

	buildings.forEach(item => {
		let input = document.getElementById(item._name);
		input.value = `${item._name}: ${item._amount} (costs ${item._cost})`;
	});

	updateCookies();
	autosave();
}

function buttonCreation(){
	var store = document.getElementById("store");
	store.removeChild(document.getElementById("buildings-shop"));

	var div = document.createElement("div");
	div.id = "buildings-shop";
	div.class = "button-column";

	buildings.forEach(item => {
		var br = document.createElement("br");
		var input = document.createElement("input");
		input.type = "button";
		input.onclick = _ => buy(item);
		input.id = item._name;
		input.value = `${item._name}: ${item._amount} (costs ${item._cost})`;
		div.appendChild(input);
		div.appendChild(br);
	});

	document.getElementById("store").appendChild(div);
}


window.onload = function() {
	document.getElementById("cookie-image").ondragstart = function() { return false; };

	init();
	buttonCreation();
	updateCookies();
	if (hasBought)
		loop();

	setInterval(autosave, 30000);
	setInterval(updateCookies, 2000);

}
