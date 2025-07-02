const { Events } = require('discord.js');
const grok = require('../grok/grok.js');

const updoot = async (msg) => {
  await msg.react("<:upvote:1069229932829478992>");
  await msg.react("<:downvote:1069229943923421295>");
}

const disabled = [
  (msg) => msg.channel.id == '1196351856780247040'
];

module.exports = {
  name: Events.MessageCreate,
  execute(msg) {
    if (disabled.some(condition => condition(msg))) return;

    if (msg.guild.id != 836303195335688232) updoot(msg);

    if (msg.author.id == process.env.CLIENT) return;
    for (let cue of cues) {
      if (cue.screen(msg)) cue.execute(msg);
    }
  }
};

const toWords = str => str.split(/\W+/).map(w => w.toLowerCase());

const cues = [
  { // pine sol
    screen(msg) {
      if (!msg.content.includes("pine")) return false;
      if (!msg.content.includes("sol")) return false;
      return true;
    },
    execute(msg) {
      ;
      msg.reply("HEY I'M CALLING POISON CONTROL!!!!! 🙀🙀🙀");
    }
  },
  { // nat
    screen(msg) {
      return msg.content.includes("nat");
    },
    async execute(msg) {
      msg.react('👀')
        .then()
        .catch(console.error);
    }
  },
  { // metal gear
    screen(msg) {
      const words = toWords(msg.content);
      if (words.includes("mgs")) return true;
      if (words.includes("metal") && words.includes("gear")) return true;
      if (words.includes("snake")) return true;
      if (words.includes("colonel")) return true;
      return false;
    },
    async execute(msg) {
      for (let chunk of chunkify(MGS_COPY)) {
        await msg.reply(chunk);
      }
    }
  },
  { // orzo 
    screen(msg) {
      const words = toWords(msg.content);
      return words.includes("orzo");
    },
    execute(msg) {
      msg.reply("😡😡😡 orzo is just a pasta");
    }
  },
  { // bpd
    screen(msg) {
      const words = toWords(msg.content);
      if (words.includes("bpd")) return true;
      if (words.includes("borderline")) return true;
      if (words.includes("disorder")) return true;
      if (msg.content.includes("mental") && msg.content.includes("ill")) return true;
      return false;
    },
    execute(msg) {
      msg.reply("🤣🤣🤣 my mom had that and she maxxed credit cards under my sisters name 🤣🤣🤣 she is dead");
    }
  },
  { // maffie
    screen(msg) {
      return msg.content.includes("maffie");
    },
    execute(msg) {
      msg.channel.send("<@596145309177085973> SHUT UP WOMAN 🤬🤬🤬");
    }
  },
  { // yusef
    screen(msg) {
      return msg.content.includes("yusef");
    },
    execute(msg) {
      msg.reply("MY GRANDPARENTS HATE MUSLIMS");
    }
  },
  { // music 
    screen(msg) {
      const words = toWords(msg.content);
      return words.includes("music");
    },
    execute(msg) {
      msg.reply("don’t worry maffie listens to kanye");
    }
  },
  { // cfa
    screen(msg) {
      const words = toWords(msg.content);
      if (words.includes('fil') && msg.content.includes('chi')) return true;
      if (words.includes('cfa')) return true;
      return false;
    },
    execute(msg) {
      msg.reply("I HATE CHIC FIL A 😡😡😡😡🤬🤬🤬🤬🤬");
    }
  },
  { // i hardly know her 
    screen(msg) {
      return /er\b/i.test(msg.content);
    },
    execute(msg) {
      const words = toWords(msg.content);
      for (let word of words) {
        if (/(?<!\bh)er\b/i.test(word)) {
          const wordWithoutER = word.split(/(?<!\bh)er\b/i)[0];
          msg.reply(`${wordWithoutER} her?? i hardly know her!1 😃😃😃`);
        }
      }
    }
  },
  { // do u hate me
    screen(msg) {
      return /do (yo)?u hate me/i.test(msg.content);
    },
    execute(msg) {
      msg.reply("yes");
    }
  },
  { // grok
    screen(msg) {
      if (msg.webhookId) return false; // ignore webhooks
      if (process.env.experimental === 'true') return true;
      return /grok/i.test(msg.content);
    },
    async execute(msg) {
      console.log("im grokking");
      const toUnix = (isoString) => Math.floor(new Date(isoString).getTime() / 1000);

      const grokInput = {
        currentTime: toUnix(Date.now()),
        message: {
          author: msg.author.username,
          id: msg.author.id,
          content: msg.content,
          createdAt: toUnix(msg.createdAt.toISOString()),
        },
        repliedTo: {
          author: "this message was not a reply",
          id: "this message was not a reply",
          content: "this message was not a reply",
          createdAt: "this message was not a reply",
        },
        context: [],
      }

      if (msg.reference) {
        const refMsg = await msg.channel.messages.fetch(msg.reference.messageId);
        grokInput.repliedTo.author = refMsg.author.username;
        grokInput.repliedTo.id = refMsg.author.id;
        grokInput.repliedTo.content = refMsg.content;
        grokInput.repliedTo.createdAt = toUnix(refMsg.createdAt.toISOString());
      }

      const pastTen = await msg.channel.messages.fetch({ limit: 10, cache: false });
      grokInput.context = pastTen.map(m => ({
        author: m.author.username,
        id: m.author.id,
        content: m.content,
        createdAt: toUnix(m.createdAt.toISOString()),
      }));

      const webhook = await msg.channel.createWebhook({
        name: "grok",
        avatar: "https://pbs.twimg.com/profile_images/1893219113717342208/Vgg2hEPa_400x400.jpg",
      })

      const thinking = await webhook.send({ content: "thinking..." });
      const response = await grok.getGrokResponse(grokInput);
      console.log(response);
      if (!/[no response]/.test(response)) {
        await webhook.send({ content: response });
      }
      await thinking.delete();
      await webhook.delete();
    }
  }
];

function chunkify(str) {
  if (str.length < 2000) return [str];
  return [str.substring(0, 2000), ...chunkify(str.slice(2000))];
}

const MGS_COPY = `Metal Gear Solid 1 is the third game in the metal gear series and the seventh game in order of the timeline. It takes place six years after Meal Gear 2: Solid Snake, who is a secret agent that has to infiltrate Shadow Moses, which is a secret base that was captured by Fox Hound, who is holding the United States hostage for the remains of Big Boss, who is the same guy as Solid Snake except with a eyepatch. Solid snake, not Big Boss, sneaks into the air vent to save DARPA Chief, but then he dies, so you fight a man called Revolver Ocelot, but your duel is interrupted by a mysterious ninja, called Grey Fox, who is a man called Frank Jaeger, who used to be in Fox Hound, but then defected to Zanzibarland because he was in love with a former figure skater from Czechoslovakia. Because he is a robot, he has to cut off Revolver Ocelot's hand. Then Snake finds a peeing man called Otacon, who is the son of a famous scientist that killed himself because his second wife cheated on him with his own son. You see, Otacon's father, Huey Emmerich built Metal Gear Zeke for Naked Snake and then built Metal Gear Sahelanthropist for a man called Skull Face. This is why Otacon builds a secret robot called Metal Gear Rex for a man called Liquid Snake, who is a clone of Solid Snake, created from the DNA of Big Boss, who is also known as Naked Snake, who is both of their fathers, and, he has an eye patch. Solid Snake is tricked into activating Metal Gear because Cambell thought that Miller was NOT Liquid Snake, but he actually was, but, turns out, Revolver Ocelot was actually a double agent the entire time, and was secretly working for the third Snake Brother, called Solidus Snake, who is also the President of the United States, and has a Dr. Octupus suit with flamethrowers on it, and, he has an eye patch. Are you following me so far? Next we have Metal Gear Solid 2, this is where things start to get a little confusing. 2 years after Shadow Moses, Solid Snake jumps onto a boat where he is confronted by Revolver Ocelot, and it turns out, he is now possessed by the spirit of Liquid Snake because he grafted Liquid's arm onto his body, so now Ocelot is voiced acted by the voice actor for Liquid Snake and he blows up the entire boat and steals an all-new robot called Metal Gear Ray. Then 2 years later, the new president is taken hostage by the old president, so the Colonel sends in Snake, who is actually Raiden, who is a part of Fox Hound, but not the old Fox Hound, a new version.Turns out, Solid Snake is the leader of the terrorists, but not the real Solid Snake, who is now known as Pliskin, you see, after you rescue the new president, he reveals that the entire democratic process is actually a sham staged by a secret organization called The Patriots, who rule the United States from the shadows, turns out, Big Shell is actually a facade, merely created to conceal a super-secret robot fortress hidden beneath it, called Arsenal Gear, which houses a powerful AI, called GW, which allows The Patriots to censor and control the flow of information. To stop GW, Raiden teams up with Otacon's sister, who is killed by a vampire. After they upload the virus to Arsenal Gear, The Colonel tells Raiden to turn the game off, because he was actually an AI construct created by GW the entire time. Raiden then has to fight 25 Metal Gear Rays on foot with a pistol. After the battle, Liquid Ocelot reveals that he was actually a triple agent working for The Patriots all along. Turns out the entire video game of Metal Gear Solid 2 was orchestrated by The Patriots to simulate the events of metal Gear Solid 1 so that Raiden could get good army training. Ocelot is once again possessed by Liquid Snake who declares he is now a reverse quadruple agent and will destroy The Patriots and jumps off of a building. Then for no reason, the AI Colonel contacts Raiden and reveals that GW was only one of many AIs developed by The Patriots, the TRUE purpose of the simulation was to serve as a microcosm of society entering into the digital age, The Patriots were concerned that with the arrival of the internet, humanity would become too fixated on trivial information like overly complicated video game story-lines. Then we have Metal Gear Solid 3, which is set 41 years before Metal Gear Solid 1. Big Boss is betrayed by The Boss, who is a different person, but he doesn't know that she was only pretending to defect to Russia because the United States told her to do that so she could be a scapegoat for the Cold War. After being thrown off of a bridge, Naked Snake is tasked with destroying an early Metal Gear prototype, called Shagohod, and eliminating Colonel Volgin, who has lightning powers, and eliminating The Boss, who he is in love with. And he has to steal a secret micro film that is worth one hundred billion dollars. He teams up with a woman called EVA, also known as Tachiana, also known as Matka Pluku, also known as Big Mama, who is Solid Snake's mother, who, in a shocking twist, is actually revealed to be a double agent working for China, and she steals the microfilm, but, it was a fake. Then, in Metal Gear Solid V, you play as Venom Snake.

Metal Gear Solid 4. The real Colonel brings Solid Snake out of retirement for the fourth time, even though he is now 200 years old. His mission is to stop Liquid Ocelot once and for all, the only problem is that Metal Gears have now merged with the technology of a cow, so he has to meet Drebin, who has a little monkey. Drebin injects Snake with nano-machines so that he can shoot guns and learns that Liquid's new plan is to use Big Boss's bio-metric data as a key to take sole command of The Patriots firearms control system. The vampire working for Liquid then throws Big Boss's comatose body into a fire because he forgot what the story-line was, then everybody goes back to Shadow Moses, where Liquid reveals his new battleship called Outer Heaven, which is the name of the secret base where Solid Snake blew up Big Boss with a rocket launcher 19 years ago. Snake sneaks into the core of Outer Heaven, which is actually a modified version of Arsenal Gear and installs a secret virus that disables the entire AI network perpetrated by The Patriots, thus de-activating all weapons in the entire world, but, turns out, this was actually all a part of Revolver Ocelot's plan the entire time, you see, he was never actually possessed by Liquid Snake, he merely used hypnotherapy to make himself think that he was; his true goal all along was to achieve world peace but also, he wants to fight Solid Snake in a brawl to the death, you see, Big Boss was actually Revolver Ocelot's greatest friend and idol, even though he killed his mom. During their fight, Ocelot is exposed to the FoxDie virus, which kills him, because it was injected into Snake by Drebin, even though he should have been exposed to it earlier in the game and died, but they forgot. And THAT is the entire story line of Metal Gear Solid.

BUT THEN IN A SURPRISE CUT-SCENE, IT IS REVEALED BY BIG BOSS, WHO IS STILL ALIVE, THAT EVERY SINGLE EVENT IN THE ENTIRE SERIES WAS FAKE, AND STAGED BY THE SHADOW PATRIOTS, YOU SEE, TURNS OUT, E E Y O R E.`;