function instructions(){API.chatLog("-----------------------------------------------------------------------------",true);API.chatLog("Hey :) commands won't run untill you call them, they're listed below: /fanback this will fan anyone who fans you /fanroom will fan everyone in the room /fanjoiners will fan people who join the room ",false);API.chatLog("/autounfan will unfan anyone who has been fanned 60 seconds after the bot has fanned them /fanmessages will post a message for you every 2 minutes asking for fans and /fan@user or /fan @user will fan/unfan that user (will ignore autounfan)",false);API.chatLog("type in /fanbotinstructions to view this message again!",false);API.chatLog("-----------------------------------------------------------------------------",true)}function callback(e){var t=e.length;var n=e.substring(1,t);console.log(n);switch(n){case"fanback":fanback();break;case"fanroom":fanroom();break;case"fanjoiners":fanjoiners();break;case"autounfan":autounfan();break;case"fanmessages":fanmessages();break;case"fanbotinstructions":instructions();break;default:break}if(n.indexOf("fan@")!=-1||n.indexOf("fan @")!=-1){fanUser(n)}}function fanUser(e){var t=e.indexOf("@")+1;var n=e.substring(t,e.length);var r=nameToId(n);var i=require("app/models/TheUserModel");var s=require("app/services/user/UserFanService");if(i.getRelationship(r)<2){s=new s(true,r)}else{s=new s(false,r)}}function fanback(){if(fanbackV===false){fanbackV=true;API.chatLog("fanback is now on, you will fan anyone who fans you",false)}else if(fanbackV===true){fanbackV=false;API.chatLog("fanback is now off, you will no longer fan those who fan you",false)}}function fanroom(){var e=[];var t=API.getUsers();for(var n=0;n<t.length;n++){var r=t[n].id;var i=require("app/models/TheUserModel");if(i.getRelationship(r)<2){var s=require("app/services/user/UserFanService");s=new s(true,r);e.push(r)}}if(autounfanV===true){setTimeout(function(){for(var t=0;t<e.length;t++){var n=require("app/services/user/UserFanService");n=new n(false,e[t])}},6e4)}}function fanjoiners(){if(fanjoinersV===false){fanjoinersV=true;API.chatLog("fanjoiners is now on, you will fan anyone who joins the room",false)}else if(fanjoinersV===true){fanjoinersV=false;API.chatLog("fanjoiners is now off, you will no longer fan those who join the room",false)}}function autounfan(){if(autounfanV===true){autounfanV=false;API.chatLog("anyone the bot fans will remain fanned",false)}else if(autounfanV===false){autounfanV=true;API.chatLog("anyone the bot fans will now be unfanned after 60 seconds",false)}}function fanmessages(){if(fanmessagesV===true){fanmessagesV=false;API.chatLog("messages asking for fans will no longer occour",false)}else if(fanmessagesV===false){fanmessagesV=true;API.chatLog("messages asking for fans will now occour every 2 minutes",false)}}function fanFanners(e){if(fanbackV===true){fanFannersAndSomeoneJoinedFan(e)}}function someoneJoined(e){if(fanjoinersV===true){fanFannersAndSomeoneJoinedFan(e)}}function fanFannersAndSomeoneJoinedFan(e){var t=e.id;var n=require("app/models/TheUserModel");if(n.getRelationship(t)<2){var r=require("app/services/user/UserFanService");r=new r(true,t);if(autounfanV===true){setTimeout(function(){var e=require("app/services/user/UserFanService");e=new e(false,t)},6e4)}}}function message(){var e,t;t=["I'm FanBOT, I do auto fan 4 fan. So what are you waiting for?","Free fans here! Just fan me","Pssst, I auto fan you back, just fan me!","Fan 4 Fan automatic, just fan me!","Automatic fan when you fan me!"];e=Math.floor(Math.random()*t.length);API.sendChat(t[e])}function nameToId(e){if(e.substring(e.length-1,e.length)==" "){e=e.substring(0,e.lastIndexOf(" "))}users=API.getUsers();var t=users.length;for(var n=0;n<t;n++){if(users[n].username==e){return users[n].id}}}API.on(API.CHAT_COMMAND,callback);instructions();var fanbackV=false,fanjoinersV=false,autounfanV=false,fanmessagesV=false;API.on(API.USER_FAN,fanFanners);API.on(API.USER_JOIN,someoneJoined);var messages=setInterval(function(){if(fanmessagesV===true){message()}},12e4)