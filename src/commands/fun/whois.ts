import {User} from "discord.js";
import {Command, NamedCommand, getMemberByUsername, CHANNEL_TYPE} from "../../core";

// Quotes must be used here or the numbers will change
const registry: {[id: string]: string} = {
    "465662909645848577": "You're an idiot, that's what.",
    "306499531665833984":
        "Kuma, you eldritch fuck, I demand you to release me from this Discord bot and let me see my Chromebook!",
    "137323711844974592": "The purple haired gunner man who makes loud noises.",
    "208763015657553921": "Minzy's master.",
    "229636002443034624": "The ***God*** of being Smug.",
    "280876114153308161": "The best girl.",
    "175823837835821067": "The somehow sentient pear.",
    "145839753118351360": "The blueberry with horns.",
    "173917366504259585": "A talented developer.",
    "216112465321263105": "The red strawberry cat.",
    "394808963356688394": "The cutest, bestest, most caring girl ever.",
    "142200534781132800": "The masters of chaos.",
    "186496078273708033": "The cute blue cat.",
    "241293368267767808": "The cute catgirl.",
    "540419616803913738": "The generically Generic hologram man.",
    "157598993298227211": "The somehow sentient bowl of nachos.",
    "225214401228177408": "The CMD user.",
    "224619540263337984": "The guy that did 50% of the work.",
    "374298111255773184": "The cutest fox around.",
    "150400803503472640": "The big huggy turtle boye.",
    "620777734427115523": "The small huggy turtle boye.",
    "310801870048198667": "An extremely talented artist and modder.",
    "328223274133880833": "The stealthiest hitman.",
    "219661798742163467": "An extremely talented artist and modder.",
    "440399719076855818":
        "You are, uhh, Stay Put, Soft Puppy, Es-Pee, Swift Pacemaker, Smug Poyo, and many more.\n...Seriously, this woman has too many names.",
    "243061915281129472":
        "Some random conlanger, worldbuilder and programmer doofus. ~~May also secretly be a nyan. :3~~",
    "367439475153829892": "A weeb.",
    "760375501775700038": "˙qǝǝʍ ∀",
    "389178357302034442": "In his dreams, he is the star. its him. <:itsMe:808174425253871657>",
    "606395763404046349": "Me."
};

export default new NamedCommand({
    description: "Tells you who you or the specified user is.",
    aliases: ["whoami"],
    async run({message, channel, guild, author, member, client, args}) {
        const id = author.id;

        if (id in registry) {
            channel.send(registry[id]);
        } else {
            channel.send("You haven't been added to the registry yet!");
        }
    },
    id: "user",
    user: new Command({
        async run({message, channel, guild, author, member, client, args}) {
            const user: User = args[0];
            const id = user.id;

            if (id in registry) {
                channel.send(`\`${user.username}\` - ${registry[id]}`);
            } else {
                channel.send(`\`${user.tag}\` hasn't been added to the registry yet!`);
            }
        }
    }),
    any: new Command({
        channelType: CHANNEL_TYPE.GUILD,
        async run({message, channel, guild, author, client, args}) {
            const query = args.join(" ") as string;
            const member = await getMemberByUsername(guild!, query);

            if (member && member.id in registry) {
                const id = member.id;

                if (id in registry) {
                    channel.send(`\`${member.nickname ?? member.user.username}\` - ${registry[member.id]}`);
                } else {
                    channel.send(
                        `\`${member.nickname ?? member.user.username}\` hasn't been added to the registry yet!`
                    );
                }
            } else {
                channel.send(`Couldn't find a user by the name of \`${query}\`!`);
            }
        }
    })
});
