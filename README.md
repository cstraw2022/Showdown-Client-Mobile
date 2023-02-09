# Description

[Play.pokemonshowdown.com](https://play.pokemonshowdown.com/) is a great way to enjoy battling both with friends and competitively on your computer. While you can easily access the site on your mobile device, the navigation experience is _less than ideal_. I thought building this app would be a fun little project that improves the battling experience on the go, and also would help me brush up my knowledge of react. 

# Files

WebSocketProvider.tsx
* Creates and maintains the websocket connection between the server and the client. Various parts of the app pull from the exported message list.


FileAccess.tsx
* Expo functions for interacting with the file system. Used mainly to update settings.


Components/
* Basic code for various components used across the app.


Navigation/
* The navigation wrapper that links the screens together (mostly taken from Expo tabs template).


Screens/
* Contains the various screens of the app.

# Login Protocol

play.pokemonshowdown.com has a two factor authentication that requires an assertion key being requested from the server’s action.php. The implementation I used (All contained within LoginScreen.tsx) goes as follows:



1. When first establishing a websocket connection, the server sends a message containing the “challenge string” (first part of auth) which is stored for later

2. After the user enters their username (and optionally password) and taps login, the event is handled in one of two ways:

    1. If the user did not enter a password, an `HTTP POST` request is sent to action.php with the act ‘getassertion’, the username and the challstr. (only works on unregistered usernames)

    2. If the user entered a password, an `HTTP POST` request is sent to action.php with the act ‘login’, and the username, password and challstr
    
3. If the account information is correct, the server’s action.php returns an assertion key. LoginScreen waits for this assertion, and when received, sends a websocket message `/trn USERNAME,0,ASSERTION` which should successfully authenticate the user.

A more in-depth explanation of the server protocol can be found [here](https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md).

# Checklist

This project is far from complete, so here is a  [Figma Sketch I drafted up](https://www.figma.com/proto/H0tcs37vxU51gGzh3uNEZs/Untitled?node-id=1%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2) in the meantime :). It’s rough around the edges but loosely gives an idea as to what the project will look like closer to the finish!



* ~~Establishing and maintaining a websocket connection~~✅
* ~~Home Screen~~✅
* ~~Login Screen~~✅
* ~~Options Screen~~✅
* ~~Themes~~✅
* Battles
* Pokedex
* Teams
* Rooms
* Chat
* News
* Battle Requests
