import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
import keys from './varprod.json' assert {type: 'json'};
console.log(keys,keys["APIKEY"])
const rest = new REST({ version: '10' }).setToken(keys["APIKEY"]);
import fetch from 'node-fetch'; // Importez le module fetch
import histoires  from './histoirennk.json' assert {type: 'json'};
const fs = import('fs');
const JSON_FILE = 'histoirennk.json';
const client = new Client({
	intents: [ // Toutes les autorisations du BOT
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
	],
});
const commands = [
  {
    name: 'histoirennk',
    description: 'Génère une histoire aléatoire BREF on va la faire courte',
  },
];
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(keys["APPID"]), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'histoire') {
    try {
      // Charger le contenu du fichier JSON en utilisant require
      const data = histoires;

      const response = [];

      for (const bloc in data) {
        if (data.hasOwnProperty(bloc)) {
          const phrases = data[bloc];
          const phraseAleatoire = phrases[Math.floor(Math.random() * phrases.length)];
          response.push(`${phraseAleatoire}`);
        }
      }

      // Envoyer les phrases choisies dans la réponse de la commande
      await interaction.reply(response.join(' '));
    } catch (error) {
      console.error(error);
      await interaction.reply('Une erreur s\'est produite lors de la récupération de l\'histoire.');
    }
  }
});
client.on('ready', () => {
  console.log(`Connecté sous ${client.user.tag}!`);
});
client.login(keys["APIKEY"]);