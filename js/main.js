function App(name, displayName) {
	this.name = name;
	this.displayName = displayName;
	this.imagePath = "/themes/supra/app-icons/" + name + ".png";
}

var apps = [new App("chromium", "Browser"),
			new App("youtube", "Youtube"),
			new App("calculator", "Calculator"),
			new App("camera", "Camera")];

window.onloadeddata = function() {
	var appContainer = document.getElementsByClassName("home-center")[0].appendChild(document.createElement("ons-row"));
	placeApps(appsContainer);
}

function placeApps(appsContainer) {
	appsContainer.style.float = "left";
	apps.forEach((app, i) => {
		var appElement = document.createElement("div");
		var appText = document.createElement("div");
		appText.innerText = app.displayName;
		appElement.classList = "app";
		appElement.style.backgroundImage = "url(" + app.imagePath + ")";
		appElement.appendChild(appText);
		appsContainer.appendChild(appElement);
	});

}
