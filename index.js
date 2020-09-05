
var dms = {
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
            message.reply(`You do know that I'm a bot, right? I don't understand XD`);
        }
        return;
    };


    /*const commandBody = message.content.slice(prefix.length); //remove prefix
    const args = commandBody.split(' '); //Array containing command name + arguments
    const command = args.shift().toLowerCase(); //Removes Command name from args array and returns Command name

    if (command === "randomreply") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Yup! This message had a latency of ${timeTaken}ms.`);
    }
    else if (command === "sum") {
        const nums = args.map(x => parseFloat(x));
        const sum = nums.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }*/
});

//To send welcome message upon adding of role
client.on("guildMemberUpdate", function (oldMember, newMember) {

    //If role added
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        //Message channel to send messages to
        const messageChannel = oldMember.guild.channels.cache.find(channel => channel.name === "test");

        const user = oldMember.user;
        const welcomed = "751515053395804240";
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

        var oldMemberRoles = Array();
        oldMember.roles.cache.forEach(role => oldMemberRoles.push(role.id));

        if (oldMemberRoles.includes(welcomed)) {
            //if role begins with 'Element'
            if (newRole.split(' ')[0] == "Element") {
                category = newRole.slice(11);
                msg = `Glad to have you as a part of ${category} ${user.toString()}! :)`;
            }
            else if (newRole == "Associate Element") {
                msg = `Glad to have you as an ${newRole} ${user.toString()}! :)`;
            }
        }
        else {
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
        }

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

client.login(config.BOT_TOKEN);