const Discord = require('discord.js');
const axios = require('axios');
const express = require('express');
const ytdl = require('ytdl-core');

//create express app
const app = express();
//create bot
const bot = new Discord.Client();
//port
const port = process.env.PORT || 5500;

//information about bot running
app.get('/', (req, res) => {
    res.send('Bot is running.');
});


//login bot
app.listen(port, () => {
    console.log("Bot is ready to work!");
    require("dotenv").config();
    bot.login(process.env.TOKEN);

    bot.on('message', message => {
        //store recent message content
        const content = message.content;
        //spliting arguments
        const arg = content.split(' ');
        console.log(arg);
        //react on commands
        if (content === '!ping') {
            message.channel.send('pong');
        } else if (content === '!chuck') {
            chuck(message);
        } else if (content === '!yomama') {
            yomama(message);
        } else if (content === '!help') {
            message.channel.send("Commands: \n> !chuck\n> !yomama");
        } else if (arg[0] === '!play') {
            console.log("here");
            console.log("arg[1]", arg[1])
            let voiceChannel = message.member.voiceChannel;
            voiceChannel.join().then(connection => {
                console.log("begin")
                const dispatcher = connection.playStream(ytdl(
                    arg[1],
                    { filter: 'audioonly' }));
                  
                console.log("end")
                dispatcher.on("end", end => voiceChannel.leave());
            })
            .catch( (err) => { 
                console.log(err); 
                voiceChannel.leave();
            });
        }
    })
});

//send norris joke
async function chuck(message) {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    const joke = response.data.value;
    message.channel.send(`${joke}`);
}

//send yomamam joke
async function yomama(message) {
    const response = await axios.get('http://api.yomomma.info/');
    const joke = response.data.joke;
    message.channel.send(`${joke}`);
}

