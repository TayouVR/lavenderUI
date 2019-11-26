// ui themes
var registeredThemes = ["lavender", "dark", "light", "default"]
var themePicturePaths = ["/themes/supra/pictures/colors_lavender.jpg", "/themes/supra/pictures/colors_dark.jpg", "/themes/supra/pictures/colors_light.jpg", "/themes/supra/pictures/colors_default.jpg"];

// ui icon themes
var registeredIcons = ["dark", "light"]
var iconsDark = ["/themes/supra/icons/dark/settings.png", "/themes/supra/icons/dark/content.png", "/themes/supra/icons/dark/galaxy.png"];
var iconsLight = ["/themes/supra/icons/light/settings.png", "/themes/supra/icons/light/content.png", "/themes/supra/icons/light/galaxy.png"];
var icons = [iconsDark, iconsLight];

//--------------------------------------------------------------------------



//#region dropdown
function selectDropDown(option, id) {

	var doc = document.getElementById(id);
	doc.getElementsByClassName("drop-down-text")[0].innerText = option;

	closeDropDown();

	game.Content.ChangeSearchSetting(id, option);
}

function closeDropDown() {
	var elms = document.getElementsByClassName("drop-down-inner");

	for (var i = 0; i < elms.length; i++) {
		elms[i].remove();
	}
}

function toggleDropDown(elm, array) {
	var openDropdown = document.getElementsByClassName("drop-down-inner");
	if (openDropdown.length > 0 && openDropdown[0].classList.contains(elm.id)) {
		closeDropDown();
	} else {
		openDropDown(elm, array);
	}
}

function openDropDown(elm, array) {
	var p = elm;
	var rect = p.getBoundingClientRect();

	var elms = document.getElementsByClassName("drop-down-inner");

	for (var i = 0; i < elms.length; i++) {
		elms[i].remove();
	}

	var inner = document.createElement("div");
	inner.classList.add("drop-down-inner");
	inner.classList.add(elm.id);

	for (var i = 0; i < array.length; i++) {
		var t = document.createElement("div");
		t.classList.add("drop-down-option");
		t.innerText = array[i];
		t.setAttribute("onclick", "selectDropDown('" + array[i] + "', '" + p.id + "')");
		inner.appendChild(t);
	}

	inner.style.position = "fixed";
	inner.style.top = rect.y + 64;
	inner.style.left = rect.x;
    inner.style.width = rect.width;

	p.parentElement.parentElement.parentElement.appendChild(inner);
}
//#endregion



//#region settings
function LoadSettings() {
	console.log("[JS] loading settings");
	SettingsPage(0);
}

function LoadThemes() {
	var themeContainer = document.getElementById("themeList");

	themeContainer.innerHTML = "";

	for(var i = 0; i < registeredThemes.length; i++) {
		themeContainer.innerHTML += '<button class="themeCard" onclick="ChangeTheme("' + registeredThemes[i] + '")"><img class="themeImage" src="' + themePicturePaths[i] + '" ></img><div>' + registeredThemes[i] + '</div></button>';
	}
}

function LoadIcons() {
	var iconContainer = document.getElementById("iconList")

	iconContainer.innerHTML = "";

	for(var i = 0; i < registeredIcons.length; i++) {
		iconContainer.innerHTML += '<button class="themeCard" onclick="ChangeTheme("' + registeredIcons[i] + '")"><div class="themeImage" style="margin-left: -10px;"><img style="width: 90px; height: 90px;" src="' + icons[i][0] + '"></img><img style="width: 90px; height: 90px;" src="' + icons[i][1] + '"></img><img style="width: 90px; height: 90px;" src="' + icons[i][2] + '"></img></div><div>' + registeredIcons[i] + '</div></button>';
	}
}

function ChangeTheme(name) {
	/*console.log("trying to load " + name);
    var fileref=document.createElement("link");
    fileref.setAttribute("id", "colorHolder");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("href", "/themes/supra/colors/colors-" + name + ".css");
	console.log("trying to add " + fileref + " to head");

	document.getElementsByTagName("head")[0].removeChild(document.getElementById("colorHolder"));
    document.getElementsByTagName("head")[0].appendChild(fileref)*/
	var themeTag;
	for (var i in document.getElementsByTagName("link")) {
		for (var e in registeredThemes) {
			if (i.getAttribute("href") == registeredThemes[e]) {
				themeTag = i;
			}
		}
	}
	themeTag.setAttribute("href", name);

	/*panorama = fopen("/Panorama.html", 0); // Open the file for reading
	if(panorama!=-1) // If the file has been successfully opened
	{
	    length = flength(panorama);         // Get the length of the file
	    str = fread(panorama, length);     // Read in the entire file
	    fclose(panorama);                    // Close the file

	// Display the contents of the file
	    write(str);
	}*/
	//document.getElementById("colorHolder").innerHTML = '<link rel="stylesheet" type="text/css" href="/themes/supra/colors/colors-' + name + '.css">';
}

function changeSettingsCat(newState) {
	//newState is a state enum with the values:
	//0 Gameplay
	//1 Graphics
	//2 Audio
	//3 Online
	//4 UI

	console.log("[JS] Switching settings page to " + newState);

	//Grab the various elements we care about

	var core = document.getElementById("settingsCore");
	var graphics = document.getElementById("settingsGraphics");
	var audio = document.getElementById("settingsAudio");
	var server = document.getElementById("settingsServer");
	var player = document.getElementById("settingsPlayer");
	var ui = document.getElementById("settingsUI");

	//buttons
	var coreButton = document.getElementById("coreButton");
	var graphicsButton = document.getElementById("graphicsButton");
	var audioButton = document.getElementById("audioButton");
	var serverButton = document.getElementById("serverButton");
	var playerButton = document.getElementById("playerButton");
	var uiButton = document.getElementById("uiButton");

	coreButton.classList.remove("active");
	graphicsButton.classList.remove("active");
	audioButton.classList.remove("active");
	serverButton.classList.remove("active");
	playerButton.classList.remove("active");
	uiButton.classList.remove("active");

	//Hide all of them
	core.style.display = graphics.style.display = audio.style.display = server.style.display = player.style.display = ui.style.display = "none";

	//Show the ones for the state we just entered
	switch (newState) {
		case 0:
			{
				core.style.display = "";
				coreButton.classList.add("active");
			}
			break;
		case 1:
			{
				graphics.style.display = "";
				graphicsButton.classList.add("active");
			}
			break;
		case 2:
			{
				audio.style.display = "";
				audioButton.classList.add("active");
			}
			break;
		case 3:
			{
				server.style.display = "";
				serverButton.classList.add("active");
			}
			break;
		case 4:
			{
				player.style.display = "";
				playerButton.classList.add("active");
			}
			break;
		case 5:
			{
				LoadThemes();
				LoadIcons();
				ui.style.display = "";
				uiButton.classList.add("active");
			}
			break;
	}
}
//#endregion


//Exposed functions for the game to call to change things
function ChangeState(newState) {
	//newState is a state enum with the values:
	//0 Login
	//1 Login in progress
	//2 Main
	//3 Social
	//4 Content
	//5 Galaxy
	//6 Testing
	//7 Settings
	//8 Connecting to a server

	console.log("[JS] Switching to " + newState);

	//Grab the various elements we care about
	var menuButtons = document.getElementById("menuButtons");

	var login = document.getElementById("login");
	var main = document.getElementById("main");
	var loginInProgress = document.getElementById("loginInProgress");
	var social = document.getElementById("social");
	var content = document.getElementById("content");
	var galaxy = document.getElementById("galaxy");
	//var testing = document.getElementById("testing");
	var settings = document.getElementById("settings");
	//var connecting = document.getElementById("connecting");


	//buttons
	var mainButton = document.getElementById("mainButton");
	var socialButton = document.getElementById("socialButton");
	var contentButton = document.getElementById("contentButton");
	var galaxyButton = document.getElementById("galaxyButton");
	var settingsButton = document.getElementById("settingsButton");

	//Hide all of them
	menuButtons.style.display = "none";
	login.style.display = "none";
	loginInProgress.style.display = "none";
	main.style.display = "none";
	social.style.display = "none";
	content.style.display = "none";
	galaxy.style.display = "none";
	//testing.style.display = "none";
	settings.style.display = "none";
	//connecting.style.display = "none";

	//buttons
	mainButton.classList.remove("active");
	socialButton.classList.remove("active");
	contentButton.classList.remove("active");
	galaxyButton.classList.remove("active");
	settingsButton.classList.remove("active");

	//Show the ones for the state we just entered
	switch (parseInt(newState)) {
		case 0:
			{
				login.style.display = "";
			}
			break;
		case 1:
			{
				loginInProgress.style.display = "";
			}
			break;
		case 2:
			{
				main.style.display = "";
				menuButtons.style.display = "";
				//mainButton.classList.add("active");
				updateUserProfile();
			}
			break;
		case 3:
			{
				social.style.display = "";
				menuButtons.style.display = "";
				socialButton.classList.add("active");
				GetFriends();
			}
			break;
		case 4:
			{
				content.style.display = "";
				menuButtons.style.display = "";
				contentButton.classList.add("active");
				searchContent();
			}
			break;
		case 5:
			{
				galaxy.style.display = "";
				menuButtons.style.display = "";
				galaxyButton.classList.add("active");
				getServerList();
			}
			break;
		case 6:
			{
				testing.style.display = "";
				menuButtons.style.display = "";
				testingButton.classList.add("active");
			}
			break;
		case 7:
			{
				settings.style.display = "";
				menuButtons.style.display = "";
				settingsButton.classList.add("active");
				LoadSettings();
			}
			break;
		case 8:
			{
				connecting.style.display = "";
			}
			break;
	}
}

function FailToLogin(reason) {
	document.getElementById("loginBox").style.display = "block";
	document.getElementById("loginLoader").style.display = "none";
	var fail = document.getElementById("errorText");
	fail.innerText = reason;
	fail.style.display = "block";
}


/*document.addEventListener('keyup', (e) => {
	switch(e.key) {
		case "a":
			alert("a");
			break;
		default:

	}
});
*/
