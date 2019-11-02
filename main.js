// assets
var dateOptions = ["All Time", "Hour", "Day", "Week", "Month", "6 Months"];
var sortByOptions = ["Date Added", "Name", "Type", "Subscribers", "Likes", "Size"];
var typeOptions = ["Avatar", "World", "Prop", "Gamemode"];

// ui themes
var registeredThemes = ["lavender", "dark", "light", "default"]
var themePicturePaths = ["/themes/supra/pictures/screenshot 2019-08-03 162046.png", "/themes/supra/pictures/screenshot 2019-08-03 165131.png", "/themes/supra/pictures/screenshot 2019-08-03 165205.png"];

// ui icon themes
var registeredIcons = ["dark", "light"]
var iconsDark = ["/themes/supra/icons/dark/settings.png", "/themes/supra/icons/dark/content.png", "/themes/supra/icons/dark/galaxy.png"];
var iconsLight = ["/themes/supra/icons/light/settings.png", "/themes/supra/icons/light/content.png", "/themes/supra/icons/light/galaxy.png"];
var icons = [iconsDark, iconsLight];

// social
var friendSearchOptions = {
	"page": 0
};

var friendData = {
	"onlinePage": 0,
	"offlinePage": 0,
	"totalFriends": 0,
	"offlineFriends": 0,
	"onlineFriends": 0
};

//--------------------------------------------------------------------------


// #region friends
function SearchFriends() {
    var d = document.getElementById("friendSearchResults");
    document.getElementById("friendSearchError").children[0].style.display = "hidden";
    while (d.children.length > 0)
        d.removeChild(d.firstElementChild);

    game.Friends.SearchUsers(document.getElementById('friendSearchInput').value, friendSearchOptions.page, 6, function (results) {

        if (results.Count == 0) {
            document.getElementById("friendSearchError").children[0].style.display = "";
            document.getElementById("friendSearchError").children[0].textContent = "No results";
            return;
        }

        var curElm = document.createElement("div");
        curElm.classList.add("row");
        curElm.style.marginBottom = "25px";


        for (var i = 0; i < results.Count; i++) {

            if (i % 2 == 0 && i != 0) {
                d.appendChild(curElm);
                curElm = document.createElement("div");
                curElm.classList.add("row");
                curElm.style.marginBottom = "25px";
            }

            var temp = document.createElement("div");
            temp.classList.add("friend-item");
            var img = document.createElement("img");
            var text = document.createElement("p");

            if (results[i].AccountPicture != null && results[i].AccountPicture != "")
                img.src = "image://" + results[i].AccountPictureURL;
            else
                img.src = "image://icon_app_19.png";

            text.textContent = results[i].DisplayName;

            temp.appendChild(img);
            temp.appendChild(text);
            function f(n) {
                temp.addEventListener("click", function (event) {
                    game.Friends.GetUserInfo(n.ID.toString(), function (r) {
                        UpdateUserInfo(r);
                    });
                });
            } f(results[i]);


            curElm.appendChild(temp);
        }
        d.appendChild(curElm);
    }, function (e) {
        document.getElementById("friendSearchError").children[0].style.display = "";
        if (e.StatusCode == "429") {
            document.getElementById("friendSearchError").children[0].textContent = "Error: To many requests";
        }
        else {

            document.getElementById("friendSearchError").children[0].textContent = "Error: " + e.StatusResult;
        }
    });
}

function UpdateUserInfo(user) {
    var nft = document.getElementById("noFriendText");
    var oui = document.getElementById("otherUserInfo");
    var fi = document.getElementById("friendInfo");
    fi.style.display = "none";
    oui.style.display = "none";
    nft.style.display = "none";

    if (user.FriendSince == null) {
        oui.style.display = "block";
        var addFriendButton = document.getElementById("addFriendButton");
        var afbParent = addFriendButton.parentElement;
        addFriendButton.remove();

        addFriendButton = document.createElement("button");
        addFriendButton.classList.add("friend-button-add");
        addFriendButton.id = "addFriendButton";

        //need to do this to get around power ui's image bug
        var img = document.getElementById("otherUserImage");
        var imgParent = img.parentElement;
        img.remove();

        img = document.createElement("img");
        img.id = "otherUserImage";
        img.style.width = "auto";
        img.style.height = "256px";
        if (user.AccountPicture == null) {
            img.src = "image://icon_app_19.png";
        }
        else {
            img.src = "image://" + user.AccountPictureURL;
        }
        //

        imgParent.appendChild(img);


        function f(x) {
            document.getElementById("otherUserName").textContent = x.DisplayName;
            if (user.RequestPending) {
                addFriendButton.textContent = "Request Pending";
            }
            else {
                addFriendButton.textContent = "Add Friend";
                addFriendButton.addEventListener("click", function (e) {
                    AddFriend(x.ID.toString());
                    addFriendButton.textContent = "Sent!";
                });
            }
        } f(user);

        afbParent.appendChild(addFriendButton);
    }
    else {
        fi.style.display = "block";
        var sendMessageButton = document.getElementById("sendMessageButton");
        var joinGameButton = document.getElementById("joinGameButton");
        var friendButtonParent = sendMessageButton.parentElement;

        document.getElementById("friendName").textContent = user.DisplayName;
        document.getElementById("friendImage").src = user.AccountPictureURL;

        //sendMessageButton.remove();
        //joinGameButton.remove();

        //sendMessageButton = document.createElement("button");
        //joinGameButton = document.createElement("button");

        ////message system not implememented yet
        //sendMessageButton.classList.add("");
        //sendMessageButton.textContent = "Send Message";

        ////needs to be conditional on if the user is running a game or not
        //joinGameButton.classList.add("");
        //joinGameButton.textContent = "Join Game";

    }
}

function AddFriend(friendID) {
    game.Friends.AddFriend(friendID,
        function () {


        },
        function (e) {
            console.log(e.StatusResult);
        });
}

function nextFriendPage() {
    friendSearchOptions.page++;
    SearchFriends();
}

function previousFriendPage() {
    friendSearchOptions.page--;
    if (friendSearchOptions.page < 0)
        friendSearchOptions.page = 0;

    SearchFriends();
}

function GetFriends() {
    game.Friends.GetFriends(
        function (x) {
            UpdateFriends(x);
        }, function (e) {
            console.log(e);
        });
}

function UpdateFriends(x) {
    friendData.onlineFriends = x.OnlineFriends.Count;
    friendData.offlineFriends = x.OfflineFriends.Count;
    friendData.totalFriends = x.TotalFriends;

    var offlineContainer = document.getElementById("offlineFriendsContainer");
    var onlineContainer = document.getElementById("onlineFriendsContainer");
    while (offlineContainer.firstChild)
        offlineContainer.firstChild.remove();
    while (onlineContainer.firstChild)
        onlineContainer.firstChild.remove();

    var offBackButton = document.createElement("button");
    offBackButton.classList.add("friends-back");
    offBackButton.addEventListener("click", function (e) { previousOfflineFriendPage(); });
    offBackButton.textContent = "<";
    offlineContainer.appendChild(offBackButton);

    var onBackButton = document.createElement("button");
    onBackButton.classList.add("friends-back");
    onBackButton.addEventListener("click", function (e) { previousOnlineFriendPage(); });
    onBackButton.textContent = "<";
    onlineContainer.appendChild(onBackButton);


    //online
    for (var i = friendData.onlinePage * 3; i < x.OnlineFriends.Count; i++) {
        if (friendData.onlinePage > 0)
            if (i >= friendData.onlinePage * 3)
                break;

        var child = document.createElement("div");
        child.classList.add("friend-item");
        child.addEventListener("click", function (e) { SelectFriend(child, x.OnlineFriends[i].ID.toString()); });
        var img = document.createElement("img");

        if (x.OnlineFriends[i].AccountPicture == null)
            img.src = "image://icon_app_19.png";
        else
            img.src = "image://" + x.OnlineFriends[i].AccountPictureURL;

        var p = document.createElement("p");
        p.textContent = x.OnlineFriends[i].DisplayName;

        child.appendChild(img);
        child.appendChild(p);

        onlineContainer.appendChild(child);
    }

    //offline
    for (var i = friendData.offlinePage * 3; i < x.OfflineFriends.Count; i++) {
        if (friendData.offlinePage > 0) {
            if (i > friendData.offlinePage * 3) {
                break;
            }
        }
        else {
            if (i > 2)
                break;
        }

        var child = document.createElement("div");
        child.classList.add("friend-item");
        child.addEventListener("click", function (e) { SelectFriend(child, x.OfflineFriends[i].ID.toString()); });
        var img = document.createElement("img");

        if (x.OfflineFriends[i].AccountPicture == null)
            img.src = "image://icon_app_19.png";
        else
            img.src = "image://" + x.OfflineFriends[i].AccountPictureURL;

        var p = document.createElement("p");
        p.textContent = x.OfflineFriends[i].DisplayName;

        child.appendChild(img);
        child.appendChild(p);


        offlineContainer.appendChild(child);
    }

    var offNext = document.createElement("button");
    offNext.classList.add("friends-forward");
    offNext.addEventListener("click", function (e) { nextOfflineFriendPage(); });
    offNext.textContent = ">";
    offlineContainer.appendChild(offNext);

    var onNext = document.createElement("button");
    onNext.classList.add("friends-forward");
    onNext.addEventListener("click", function (e) { nextOnlineFriendPage(); });
    onNext.textContent = ">";
    onlineContainer.appendChild(onNext);


    document.getElementById("totalOnlineFriends").textContent = "Online: " + x.OnlineFriends.Count;
    document.getElementById("totalOfflineFriends").textContent = "Offline: " + x.OfflineFriends.Count;

}

function nextOnlineFriendPage() {
}
function previousOnlineFriendPage() {

}

function nextOfflineFriendPage() {
    friendData.offlinePage++;

    if (((friendData.offlinePage + 1) * 3) > friendData.offlineFriends + 3) {
        friendData.offlinePage--;
    }
    else {
        UpdateFriends();
    }
}
function previousOfflineFriendPage() {
    friendData.offlinePage--;

    if (friendData.offlinePage < 0) {
        friendData.offlinePage = 0;
    }
    else {
        UpdateFriends();
    }
}
//#endregion

// #region content
function searchContent() {
    var searchInput = document.getElementById("contentSearchInput");

    if (searchInput.value != null) {
        game.Content.SearchSettings.SearchTerm = searchInput.value.toString();
    }
    else {
        game.Content.SearchSettings.SearchTerm = "";
    }

    game.Content.Search(
        function (result) {
            var container = document.getElementById("contentItemContainer");

            while (container.firstElementChild)
                container.removeChild(container.firstElementChild);

            var currentRow = document.createElement("div");
            currentRow.classList.add("row");
            currentRow.classList.add("content-row");

            for (var i = 0; i < result.Elements.Count; i++) {
                if (i % 3 == 0 && i != 0) {
                    container.appendChild(currentRow);
                    currentRow = document.createElement("div");
                    currentRow.classList.add("row");
                    currentRow.classList.add("content-row");
                }

                var elm = document.createElement("div");
                elm.classList.add("content-item");

                function f(asset) {
                    elm.addEventListener("click", function (e) {
                        updateAssetInfo(asset);
                    });
                } f(result.Elements[i]);


                var img = document.createElement("img");
                img.src = "image://" + result.Elements[i].AssetImageURL;
                elm.appendChild(img);

                var p = document.createElement("p");
                p.textContent = result.Elements[i].Name;
                elm.appendChild(p);

                currentRow.appendChild(elm);
            }
            container.appendChild(currentRow);
        },
        function (error) {
            console.log(error);
        }
    );
}
function nextPage() {
    game.Content.SearchSettings.Page++;
    searchContent();
}
function previousPage() {
    game.Content.SearchSettings.Page--;
    if (game.Content.SearchSettings.Page < 0)
        game.Content.SearchSettings.Page = 0;
    else
        searchContent();
}
//#endregion

//#region notification
function openNotification() {
    game.GetNotifications()
        .then(function (resolve) {

            console.log("RESOLVE: " + resolve);


        })
        .catch(
            function (e) {
                console.log("ERROR: " + e)
            });



    var popup = document.getElementById("notificationPopup");
    var info = document.getElementById("notificationPopupInfo");
    var controls = document.getElementById("notificationPopupControls");
    popup.style.display = "block";

    // while (controls.firstElementChild)
    //     controls.removeChild(controls.firstElementChild);





    console.log(guid);
}
function dismissNotification(guid) {
    console.log(guid);
}
//#endregion


function updateAssetInfo(asset) {
	var a = JSON.parse(asset);
	//var name = $("#assetInfoName");
	var name = document.getElementById("assetInfoName");
	//var desc = $("#assetInfoDescription");
	var desc = document.getElementById("assetInfoDescription");

	var img = document.getElementById("assetInfoImage");
	var size = document.getElementById("assetInfoSize");
	var buttonContainer = document.getElementById("assetInfoButtons");
	var assetInfoAuthor = document.getElementById("assetInfoAuthor");

	name.textContent = a.Name;
	desc.textContent = a.Description;
	size.textContent = "Size: " + formatBytes(a.Size, 2);
	assetInfoAuthor.textContent = "Author: " + a.OwnerName;
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
	else if (a.Type == 3) {
		buttonContainer.lastElementChild.addEventListener("click", function (event) {
			game.SpawnProp(a.ID);
		});
	}

	document.getElementById("noAssetText").style.display = "none";
	document.getElementById("assetInfo").style.display = "block";
}


//#region dropdown
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
//#endregion


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


function updateUserProfile() {
    game.Friends.UpdateProfile(function (result) {
        var container = document.getElementById("profileImageContainer");
        container.removeChild(container.firstElementChild);
        var elm = document.createElement("img");
        elm.style.width = "400";
        elm.style.height = "400";

        if (result.AccountPicture != null)
            elm.src = "image://" + result.AccountPictureURL;
        else
            elm.src = "image://icon_app_19_gray.png";

        container.appendChild(elm);

        document.getElementById("nameText").innerText = "Hello " + result.DisplayName + "!";

    }, function (error) { console.log(error.StatusResult); });
}

function UpdateProfileData(profile) {
	var obj = JSON.parse(profile);
	document.getElementById("nameText").innerText = obj.DisplayName;

}


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

function SettingsPage(newState) {
	//newState is a state enum with the values:
	//0 Gameplay
	//1 Graphics
	//2 Audio
	//3 Online
	//4 UI

	console.log("[JS] Switching settings page to " + newState);

	//Grab the various elements we care about

	var gameplay = document.getElementById("gameplaySettings");
	var graphics = document.getElementById("graphicsSettings");
	var audio = document.getElementById("audioSettings");
	var online = document.getElementById("onlineSettings");
	var ui = document.getElementById("uiSettings");

	//buttons
	var gameplayButton = document.getElementById("gameplayButton");
	var graphicsButton = document.getElementById("graphicsButton");
	var audioButton = document.getElementById("audioButton");
	var onlineButton = document.getElementById("onlineButton");
	var uiButton = document.getElementById("uiButton");

	gameplayButton.classList.remove("active");
	graphicsButton.classList.remove("active");
	audioButton.classList.remove("active");
	onlineButton.classList.remove("active");
	uiButton.classList.remove("active");

	//Hide all of them
	gameplay.style.display = "none";
	graphics.style.display = "none";
	audio.style.display = "none";
	online.style.display = "none";
	ui.style.display = "none";

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
	loginInProgress.style.display = "none";
	main.style.display = "none";
	social.style.display = "none";
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

//https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(a, b) {
	if (0 == a)
		return "0 Bytes";
	var c = 1024, d = b || 2,
		e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		f = Math.floor(Math.log(a) / Math.log(c));
	return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

//runs once when the UI is first loaded
//Bind all functions and events here
function loaded() {
	game.Friends.AddEventListener("updatefriendlist", UpdateFriends);
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
