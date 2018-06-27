const Discord = require('discord.js');
const axios = require('axios');
const express = require('express');
const ytdl = require('ytdl-core');

//create express app
const app = express();
//create bot
const bot = new Discord.Client();
//port
const port = process.env.PORT || 3000;

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
        switch ( arg[0] ) {
            case '!ping':
                message.channel.send('pong');
                break;
            case '!chuck':
                chuck(message);
                break;
            case '!yomama':
                yomama(message);
                break;
            case '!help':
                message.channel.send("Commands: \n> !chuck\n> !yomama \n> !play + link \n> !stop");
                break;
            case '!play':
                console.log('play');
                play(message, arg);
                break;
            case '!stop':
                let voiceChannel = message.member.voiceChannel;
                voiceChannel.leave();
                break;
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

function play(message, arg) {
    console.log('arg', arg);
    let voiceChannel = message.member.voiceChannel;
    voiceChannel.join().then(connection => {
        console.log("begin");
        const dispatcher = connection.playStream(ytdl(
                arg[1],
                { filter: 'audioonly' }
            ));
        dispatcher.on("end", end => voiceChannel.leave());
        })
        .catch((err) => {
            console.log(err);
            voiceChannel.leave();
        });
}