var dateOptions = ["All Time", "Hour", "Day", "Week", "Month", "6 Months"];
var orderByOptions = ["Date Added", "Name", "Type", "Subscribers", "Likes", "Size"];
var typeOptions = ["Avatar", "World", "Prop", "Gamemode"];

function nextPage() {
	game.NextPage();
}

function previousPage() {
	game.PreviousPage();
}

function updateSearchSettings(personal) {
	document.getElementById("personalText").innerText = "Personal: " + personal;
}


function updateAssetInfo(asset) {

	var a = JSON.parse(asset);
	var name = document.getElementById("assetInfoName");
	var desc = document.getElementById("assetInfoDescription");
	var img = document.getElementById("assetInfoImage");
	var size = document.getElementById("assetInfoSize");
	var buttonContainer = document.getElementById("assetInfoButtons");

	name.innerText = a.Name;
	desc.innerText = a.Description;
	size.innerText = a.Size;

	img.src = a.AssetImageURL + "-sm";

	if (a.Type == 1) {
		buttonContainer.lastElementChild.addEventListener("click", function (event) {
			game.SpawnAvatar(a.ID);
		});
	}
	else if (a.Type == 2) {
		buttonContainer.lastElementChild.addEventListener("click", function (event) {
			game.SpawnWorld(a.ID);
		});
	}

	document.getElementById("noAssetText").style.display = "none";
	document.getElementById("assetInfo").style.display = "block";
}



function selectDropDown(option, id) {

	var doc = document.getElementById(id);
	doc.getElementsByClassName("drop-down-text")[0].innerText = option;

	game.ChangeSearchSetting(id, option);

	closeDropDown();
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

	p.parentElement.parentElement.parentElement.appendChild(inner);
}

function togglePasswordField(elm) {

	var p = document.getElementById('password');

	var data = p.value;


	if (p.type == 'text')
		p.type = 'password';
	else if (p.type == 'password')
		p.type = 'text';

	p.value = "";
	p.value = data;

}


function UpdateProfileData(profile) {
	var obj = JSON.parse(profile);
	document.getElementById("nameText").innerText = obj.DisplayName;

}

function SetProfileImage(image) {
	document.getElementById("profileImage").src = image;
}


function SetName(name) {
	document.getElementById("nameText").innerText = "Hello " + name + "!";
}

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
	//var social = document.getElementById("social");
	var content = document.getElementById("content");
	//var galaxy = document.getElementById("galaxy");
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
	//loginInProgress.style.display = "none";
	main.style.display = "none";
	//social.style.display = "none";
	content.style.display = "none";
	//galaxy.style.display = "none";
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
			}
			break;
		case 3:
			{
				social.style.display = "";
				menuButtons.style.display = "";
				socialButton.classList.add("active");
			}
			break;
		case 4:
			{
				content.style.display = "";
				menuButtons.style.display = "";
				contentButton.classList.add("active");
			}
			break;
		case 5:
			{
				galaxy.style.display = "";
				menuButtons.style.display = "";
				galaxyButton.classList.add("active");
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

function TogglePassword() {
    var pass = document.getElementById("password");
    var type = pass.getAttribute("type");

    if (type == "password") {
        pass.setAttribute("type", "text");
        console.log(type + " -> text");
    }
    else
    {
        pass.setAttribute("type", "password");
        console.log(type + " -> password");
    }
}

function Login() {
	//clear the error text before starting to login
	var fail = document.getElementById("errorText");
	fail.innerText = "";
	fail.style.display = "none";

	document.getElementById("loginBox").style.display = "none";
	document.getElementById("loginLoader").style.display = "block";

	var user = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	game.Login(user, pass);
}

function Connect() {
	//clear the error text before starting to connect
	var fail = document.getElementById("connectFail");
	fail.innerText = "";
	fail.style.display = "none";

	var ip = document.getElementById("ip").value;
	var port = document.getElementById("port").value;
	game.Connect(ip, port);
}

function FailToConnect(reason) {
	var fail = document.getElementById("connectFail");
	fail.innerText = reason;
	fail.style.display = "block";
}

function ClickDiscord() {
	game.OpenLink("https://discord.gg/fWHjNfg");
}

function LoadSettings() {
	console.log("[JS] loading settings");
	SettingsPage(0);
}

function LoadThemes() {
	var registeredThemes = ["lavender", "dark", "light", "default"]
	var themePicturePaths = ["/themes/supra/pictures/screenshot 2019-08-03 162046.png", "/themes/supra/pictures/screenshot 2019-08-03 165131.png", "/themes/supra/pictures/screenshot 2019-08-03 165205.png"];
	var themeContainer = document.getElementById("themeList");

	themeContainer.innerHTML = "";

	for(var i = 0; i < registeredThemes.length; i++) {
		themeContainer.innerHTML += '<button class="themeCard" onclick="ChangeTheme("' + registeredThemes[i] + '")"><img class="themeImage" src="' + themePicturePaths[i] + '" ></img><div>' + registeredThemes[i] + '</div></button>';
	}
}

function LoadIcons() {
	var registeredIcons = ["dark", "light"]
	var iconsDark = ["/themes/supra/icons/dark/settings.png", "/themes/supra/icons/dark/content.png", "/themes/supra/icons/dark/galaxy.png"];
	var iconsLight = ["/themes/supra/icons/light/settings.png", "/themes/supra/icons/light/content.png", "/themes/supra/icons/light/galaxy.png"];
	var icons = [iconsDark, iconsLight];
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
	document.getElementById("colorHolder").innerHTML = '<link rel="stylesheet" type="text/css" href="/themes/supra/colors/colors-' + name + '.css">';
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

function SettingsPage(newState) {
	//newState is a state enum with the values:
	//0 Gameplay
	//1 Graphics
	//2 Audio
	//3 Online
	//4 UI

	//var newState = newState.parseInt();
	console.log("[JS] newState type = " + typeof newState);

	console.log("[JS] Switching settings page to " + newState);

	//Grab the various elements we care about

	console.log("[JS] are pages the error?");
	var gameplay = document.getElementById("gameplaySettings");
	var graphics = document.getElementById("graphicsSettings");
	var audio = document.getElementById("audioSettings");
	var online = document.getElementById("onlineSettings");
	var ui = document.getElementById("uiSettings");

	console.log("[JS] are buttons the error?");
	//buttons
	var gameplayButton = document.getElementById("gameplayButton");
	var graphicsButton = document.getElementById("graphicsButton");
	var audioButton = document.getElementById("audioButton");
	var onlineButton = document.getElementById("onlineButton");
	var uiButton = document.getElementById("uiButton");

	console.log("[JS] is button active removing the error?");
	gameplayButton.classList.remove("active");
	graphicsButton.classList.remove("active");
	audioButton.classList.remove("active");
	onlineButton.classList.remove("active");
	uiButton.classList.remove("active");

	console.log("[JS] is page hiding the error?");
	//Hide all of them
	gameplay.style.display = "none";
	graphics.style.display = "none";
	audio.style.display = "none";
	online.style.display = "none";
	ui.style.display = "none";

	console.log("[JS] is switch the error?");
	//Show the ones for the state we just entered
	switch (newState) {
		case 0:
			{
				gameplay.style.display = "";
				gameplayButton.classList.add("active");
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
				online.style.display = "";
				onlineButton.classList.add("active");
			}
			break;
		case 4:
			{
				LoadThemes();
				LoadIcons();
				ui.style.display = "";
				uiButton.classList.add("active");
			}
			break;
	}
}
