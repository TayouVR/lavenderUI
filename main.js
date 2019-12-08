// ui themes
var registeredThemes = ["lavender", "dark", "light", "default"]
var themePicturePaths = ["/themes/supra/pictures/colors_lavender.jpg", "/themes/supra/pictures/colors_dark.jpg", "/themes/supra/pictures/colors_light.jpg", "/themes/supra/pictures/colors_default.jpg"];

// ui icon themes
var registeredIcons = ["dark", "light"]
var iconsDark = ["/themes/supra/icons/dark/settings.png", "/themes/supra/icons/dark/content.png", "/themes/supra/icons/dark/galaxy.png"];
var iconsLight = ["/themes/supra/icons/light/settings.png", "/themes/supra/icons/light/content.png", "/themes/supra/icons/light/galaxy.png"];
var icons = [iconsDark, iconsLight];

//--------------------------------------------------------------------------

function updateClock () {
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

  // Update the time display
  document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}

/*window.onload = function() {
	selectedTheme = getCookie("theme");
	changeCSS(selectedTheme);
};*/

/*
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function changeCSS(theme) {
    var d = new Date();
    d.setTime(d.getTime() + (2190*24*60*60*1000));
    var expires = d.toUTCString();
	document.cookie = "theme=" + theme + "; expires=" + expires;
	if (theme == "light") {
		document.getElementById('lightStyle').disabled = false;
		document.getElementById('darkStyle').disabled  = true;
	}
	if (theme == "dark") {
		document.getElementById('lightStyle').disabled = true;
		document.getElementById('darkStyle').disabled  = false;
	}
}*/


//#region dropdown
/*function selectDropDown(option, id) {

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
}*/
//#endregion

/*function loadWebsite() {
	document.getElementsByClassName("displayArea")[0].innerHTML = "<iframe"
}*/

//location.href='https://play.famobi.com/perfect-piano'

function openNotificationMenu() {
    var npanel = document.getElementById("notificationQuickMenu");
	document.getElementsByClassName("home-notification-panel-open")[0].style.display = "none";
    npanel.style.display = "block";
}
function closeNotificationMenu() {
    var npanel = document.getElementById("notificationQuickMenu");
	document.getElementsByClassName("home-notification-panel-open")[0].style.display = "";
    npanel.style.display = "none";
}

//#region settings

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

function changeSettingsCat(cat) {
    var s1 = document.getElementById("settingsCore");
    var s2 = document.getElementById("settingsAudio");
    var s3 = document.getElementById("settingsGraphics");
    var s4 = document.getElementById("settingsServer");
    var s5 = document.getElementById("settingsPlayer");
    var s6 = document.getElementById("settingsPlayerMisc");
	var s7 = document.getElementById("settingsUI");

	//buttons
	var b1 = document.getElementById("settingsButtonCore");
	var b2 = document.getElementById("settingsButtonAudio");
	var b3 = document.getElementById("settingsButtonGraphics");
	var b4 = document.getElementById("settingsButtonServer");
	var b5 = document.getElementById("settingsButtonPlayer");
	var b6 = document.getElementById("settingsButtonPlayerMisc");
	var b7 = document.getElementById("settingsButtonUI");

	b1.classList.remove("active");
	b2.classList.remove("active");
	b3.classList.remove("active");
	b4.classList.remove("active");
	b5.classList.remove("active");
	b6.classList.remove("active");
	b7.classList.remove("active");

    s1.style.display = s2.style.display = s3.style.display = s4.style.display = s5.style.display = s6.style.display = s7.style.display = "none";

    if (cat == 0) { s1.style.display = "block"; b1.classList.add("active"); }
    else if (cat == 1) { s2.style.display = "block"; b2.classList.add("active"); }
    else if (cat == 2) { s3.style.display = "block"; b3.classList.add("active"); }
    else if (cat == 3) { s4.style.display = "block"; b4.classList.add("active"); }
    else if (cat == 4) { s5.style.display = "block"; b5.classList.add("active"); }
    else if (cat == 5) { s6.style.display = "block"; b6.classList.add("active"); }
    else if (cat == 6) { s7.style.display = "block"; b7.classList.add("active"); LoadThemes(); LoadIcons(); }

}
//#endregion


function ChangeState(newState, makeCrumb) {
    //newState is a state enum with the values:
    //0 homepage
    //1 Content
    //2 Social
    //3 Galaxy
    //4 Camera
    //5 a player
    //6 Settings
    //7 Gamemode
    //8 Settings
    //9 Downloads
    //10 Image Share
    //11 Desktop Share
    //12 Scripting
    //console.log("[JS] Opening page " + newState + " bread:" + makeCrumb);

	closeCamera();

    if (makeCrumb === true)
        breadcrumb.push(newState);

    //Grab the various elements we care about
    var login = document.getElementById("loginPage");
    var loginLoading = document.getElementById("loginLoading");
    var headerCenter = document.getElementById("headerCenter");
    var homepage = document.getElementById("homepage");
    var galaxy = document.getElementById("galaxy");

    var content = document.getElementById("content");
    var contentProps = document.getElementById("contentProps");
    var contentAvatars = document.getElementById("contentAvatars");
    var contentWorlds = document.getElementById("contentWorlds");


    var social = document.getElementById("social");
    var socialFriends = document.getElementById("socialFriends");
    var socialSearch = document.getElementById("socialSearch");
    var socialRequests = document.getElementById("socialRequests");

    var camera = document.getElementById("camera");
    var downloads = document.getElementById("downloads");
    var share = document.getElementById("share");

    var notifications = document.getElementById("notifications");

	var browser = document.getElementById("browser");
	var youtube = document.getElementById("youtube");
	var calculator = document.getElementById("calculator");

    var players = document.getElementById("players");
    var player = document.getElementById("player");

    var setting = document.getElementById("settings");

    var power = document.getElementById("power");

    //Hide all of them
    login.style.display = "none";
    loginLoading.style.display = "none";
    homepage.style.display = "none";
    galaxy.style.display = "none";

    content.style.display = "none";
    contentProps.style.display = "none";
    contentAvatars.style.display = "none";
    contentWorlds.style.display = "none";

    social.style.display = "none";
    socialFriends.style.display = "none";
    socialSearch.style.display = "none";
    socialRequests.style.display = "none";

    camera.style.display = "none";
    downloads.style.display = "none";
    share.style.display = "none";

	browser.style.display = "none";
	youtube.style.display = "none";
	calculator.style.display = "none";


    notifications.style.display = "none";



    setting.style.display = "none";
    players.style.display = "none";
    player.style.display = "none";
    power.style.display = "none";

    //Show the ones for the panel we just entered
    switch (parseInt(newState)) {
        case -2:
            loginLoading.style.display = "block";
            break;
        case -1:
            login.style.display = "block";
            break;
        case 0:
            homepage.style.display = "block";
            headerCenter.innerText = "Home";
            break;
        case 1000:
            power.style.display = "block";
            headerCenter.innerText = "Power";
            break;
        //Content////////////////////////////////////
        case 1:
            searchSettings.page = 0;
            content.style.display = "block";
            headerCenter.innerText = "Content";
            break;
        case 11:
            searchSettings.count = 18;
            contentProps.style.display = "block";
            headerCenter.innerText = "Props";
            break;
        case 12:
            searchSettings.count = 10;
            contentAvatars.style.display = "block";
            headerCenter.innerText = "Avatars";
            break;
        case 13:
            searchSettings.count = 10;
            contentWorlds.style.display = "block";
            headerCenter.innerText = "Worlds";
            break;
        /////////////////////////////////////////////
        //Social/////////////////////////////////////
        case 2:
            socialSearchSettings.page = 0;
            socialSearchSettings.count = 10;
            social.style.display = "block";
            headerCenter.innerText = "Social";
            break;
        case 21:
            socialFriends.style.display = "block";
            headerCenter.innerText = "Friends";
            break;
        case 22:
            socialSearch.style.display = "block";
            headerCenter.innerText = "Search";
            break;
        case 23:
            socialRequests.style.display = "block";
            headerCenter.innerText = "Friend Requests";
            break;
        ////////////////////////////////////////////
        case 3:
            updateWorldList();
            galaxy.style.display = "block";
            headerCenter.innerText = "Galaxy";
            break;
        case 4:
            openCamera();
            camera.style.display = "block";
            headerCenter.innerText = "Camera";
            break;
        /////////////////////////////////////////////
        case 7:
            players.style.display = "block";
            headerCenter.innerText = "Players";
            break;
        case 71:
            player.style.display = "block";
            headerCenter.innerText = "Player Info";
            break;
        /////////////////////////////////////////////
        case 8:
            setting.style.display = "block";
            headerCenter.innerText = "Settings";
            changeSettingsCat(0);
            break;
        case 9:
            notifications.style.display = "block";
            headerCenter.innerText = "Notifications";
            break;
        case 10:
            browser.style.display = "block";
            headerCenter.innerText = "Chromium";
            break;
        case 102:
            youtube.style.display = "block";
            headerCenter.innerText = "Youtube";
            break;
        case 103:
            calculator.style.display = "block";
            headerCenter.innerText = "Calculator";
            break;
        default:
            break;
    }
}

/*document.addEventListener('keyup', (e) => {
	switch(e.key) {
		case "a":
			alert("a");
			break;
		default:

	}
});*/
