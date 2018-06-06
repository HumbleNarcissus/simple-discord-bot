const Discord = require('discord.js');
const axios = require('axios');

//create bot
const bot = new Discord.Client();

//login bot
require("dotenv").config();
bot.login(process.env.TOKEN);

bot.on('message', message => {
    //store recent message content
    const content = message.content;

    //react on commands
    if (content === '!ping') {
        message.channel.send('pong');
    } else if (content === '!chuck') {
        chuck(message);
    } else if (content === '!yomama') {
        yomama(message);
    } else if (message.content === '!help') {
        message.channel.send("Commands: \n> !chuck\n> !yomama");
    }
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

