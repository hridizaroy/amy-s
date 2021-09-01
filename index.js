
const dms = {
    "Web Design" : "Welcome to web design.",
    "Android App Design" : "Welcome to Android App Design.",
    "3D Modelling (Blender)" : "Welcome to 3D Modelling (Blender).",
    "3D Modelling (Sketchup)" : "Welcome to 3D Modelling (Sketchup).",
    "Web Development" : "Welcome to Web Development.",
    "Sound Mixing" : "Welcome to Sound Mixing.",
    "Video editing and Vfx" : "Welcome to Video editing and Vfx.",
    "Programming C++" : "Welcome to Programming C++.",
    "Programming Java" : "Welcome to Programming Java.",
    "Hardware" : "Welcome to Programming Java.",
    "Lego" : "Welcome to Lego."
}

const roles_nodes = ["750646022983647232", "750647253655486594", "750647622284345385", "750646801651990599", "750648305385603153", "750649203700662314", "750649647391047730", "750650271335710780", "750649876458635375", "750650524348710953", "750650765562871839"]

const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = ".";

client.on("message", function (message) {
    
    //If message author is another bot, no need to reply
    if (message.author.bot) return;

    //Checking for command prefix
    if (!message.content.startsWith(prefix)) {
        if (message.channel.type === "dm") {
            const guild = client.guilds.cache.get('750569259117051944');
            const members = guild.roles.cache.get('751515053395804240').members.map(m => m.user.tag);
            if ( members.includes(message.author.tag) ) {
                message.reply(`You do know that I'm a bot, right? I don't understand xD`);
            }
            else {
                var numbers = /^[0-9]+$/;
                var ans = String(message);
                if (ans.length === 4 && ans.match(numbers)) {
                    //Count no. of messages that match this pattern
                    //If attempts < 3, tally the code
                    //Else reply with no more attempts left
                    checkCode(ans, message, message.author);
                }
                else {
                    message.reply(`Umm... a 4 digit number please?`);
                }
            }
        }
        return;
    };


    const commandBody = message.content.slice(prefix.length); //remove prefix
    const args = commandBody.split(' '); //Array containing command name + arguments
    const command = args.shift().toLowerCase(); //Removes Command name from args array and returns Command name

    if (command == "schedmeet") {
        var time = args[0];
        var hrs = time.split(":")[0];
        var mins = time.split(":")[1];
        var user;
        var msg;
        var users = Array();
        var allUsers = message.guild.members.cache; //Throws error if msg type == dm
        allUsers.forEach(member => {
            if (message.channel.permissionsFor(member).has("VIEW_CHANNEL")) {
                if (!member.user.bot) {
                    user = member.user;
                    users.push(user);
                }
            }
        });

        var timeLeft = countDown(hrs, mins);
        users.forEach( u => {
            setTimeout(function () {
                msg = `Hey ${u.toString()}! I'm Amy S, the .createch bot. Just wanted to remind you about your meeting at ${time} today. Cheers!`;
                u.send(msg);
            }, timeLeft);
        });
    }
});

//To send welcome message upon adding of role
client.on("guildMemberUpdate", function (oldMember, newMember) {

    //If role added
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        //Message channel to send messages to
        const messageChannel = oldMember.guild.channels.cache.find(channel => channel.name === "test");

        const user = oldMember.user;
        const welcomed = "751515053395804240"; //Role id of 'Member'
        var newRole;
        var msg = ``;
        var msgDM = ``;
        var category = ``;
        for (const role of newMember.roles.cache.map(x => x.id)) {
            //Getting new role by checking which role of newMember is not present in oldMember
            if (!oldMember.roles.cache.has(role)) {
                newRole = `${oldMember.guild.roles.cache.get(role).name}`;
            }
        }

        // var oldMemberRoles = Array();
        //oldMember.roles.cache.forEach(role => oldMemberRoles.push(role.id));

        //if (oldMemberRoles.includes(welcomed)) {


        //if role begins with 'Element'
        if (newRole.split(' ')[0] == "Element") {
            category = newRole.slice(11);
            msg = `Glad to have you as a part of ${category} ${user.toString()}! :)`;
        }
        else if (newRole == "Associate Element") {
            msg = `Glad to have you as an ${newRole} ${user.toString()}! :)`;
        }


        //}
        /*else {
            //if role begins with 'Element'
            if (newRole.split(' ')[0] == "Element") {
                category = newRole.slice(11);
                msg = `Welcome to .createch ${user.toString()}. \nGlad to have you as a part of ${category}! :)`;
                newMember.roles.add(welcomed);
            }
            else if (newRole == "Associate Element") {
                msg = `Welcome to .createch ${user.toString()}. \nGlad to have you as an ${newRole}! :)`;
                newMember.roles.add(welcomed);
            }
        }*/

        if (msg.trim() != '') {
            messageChannel.send(msg);
            if (category.trim() != "") {
                if (dms[category].trim() != '') {
                    msgDM = `Hey ${user.toString()}! ` + dms[category];
                    user.send(msgDM);
                }   
            }         
        }
    }

    else if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        //Message channel to send messages to
        const messageChannel = oldMember.guild.channels.cache.find(channel => channel.name === "test");

        const user = oldMember.user;
        var roleRemoved;
        var msg = ``;
        var category;

        for (const role of oldMember.roles.cache.map(x => x.id)) {
            //Getting removed role by checking which role of oldMember is not present in newMember
            if (!newMember.roles.cache.has(role)) {
                roleRemoved = `${newMember.guild.roles.cache.get(role).name}`;
            }
        }

        //if role begins with 'Element'
        if (roleRemoved.split(' ')[0] == "Element") {
            msg = `You'll be missed at ${roleRemoved.slice(11)} ${user.toString()}! :(`;
        }

        if (msg.trim() != '') {
            messageChannel.send(msg);
        }        
    }
});

//When new member visits server

client.on("guildMemberAdd", function (member) {
    //member.guild.channels.create("enter-code")
    //member.guild.channels.create('')
    /*member.guild.channels.create('enter-code', 'text')
        .then(channel => {
            let category = member.guild.channels.cache.find(c => c.name == "Server door" && c.type == "category");

        // if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
        //}).catch(console.error);
    });*/
    const msg = `Hey ${member.user.toString()}! \nWelcome to .createch. I'm Amy S, the .createch bot. Please enter your 4-digit code to get access to the club conversations. \nYou get only 3 attempts though, so use them wisely.`;
    member.user.send(msg);
});


client.login(config.BOT_TOKEN);

//For scheduling meetings
function countDown(hrs, mins) {

    //Error handling for hrs > 23 and mins > 59
    
    var currentTime = new Date();

    hrs = parseInt(hrs);
    mins = parseInt(mins);

    var h = currentTime.getHours();
    var m = currentTime.getMinutes();

    var t = h*100 + m;
    var time = hrs*100 + mins;

    var hLeft, mLeft, ms;

    if (t > time) {
        h = h - 24;
    }

    if (m <= mins) {
        hLeft = hrs - h;
        mLeft = mins - m;
    }
    else {
        hLeft = hrs - 1 - h;
        mLeft = 60 - m + mins;
    }

    ms = hLeft * 60 * 60 * 1000 + mLeft * 60 * 1000;

    var reminderTime = 1000 * 60 * 5;

    if (ms <= reminderTime) {
        return 0;
    }
    else {
        return ms - reminderTime;
    }
}

//Checking the code
function checkCode(code, message, user) {

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();

    let url = new URL('https://ctrlscollab.co/bot/checkCode.php/');
    url.searchParams.set('code', code);
    url.searchParams.set('usertag', user.tag);

    xhttp.open('GET', url);
    
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset = UTF - 8');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (!xhttp.responseText.startsWith("<")) {
                if (xhttp.responseText == "err1") {
                    //Code not found in db
                    message.reply(`Member with that code does not exist buddy`);
                }
                else if (xhttp.responseText == "err2") {
                    //Member already active
                    message.reply(`Member with that code is already in`);
                }
                else if (xhttp.responseText == "err3") {
                    //Exhausted attempts
                    message.reply("Sorry, you've exhausted all your attempts :(");
                }
                else {
                    //No error
                    var nodes = Array.from(xhttp.responseText); //Nodes
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i] == 1) {
                            //Find user as guildmember
                            var guild = client.guilds.cache.get('750569259117051944');
                            var member = guild.member(user);
                            member.roles.add(roles_nodes[i]);
                        }
                    }
                    const welcomed = "751515053395804240"; //Role id of 'Member'
                    member.roles.add(welcomed);
                }
            }
            else {
                message.reply(`Nope. Could not connect :/`);
            }
        }
    };

    xhttp.send();
}
