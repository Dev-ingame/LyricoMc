import { MolangVariableMap, system, world } from "@minecraft/server";

const overworld = world.getDimension("overworld");

async function spawnLyrics(segments, startLocation, size = 1, Ddelay = 0) {
    const spawnLetter = (char, xOffset, yOffset) => {
        const letterCoordinate = letterCoordinates[char.toUpperCase()];
        if (letterCoordinate) {
            for (const point of letterCoordinate) {
                const newLocation = {
                    x: startLocation.x + point.x * size + xOffset,
                    y: startLocation.y + point.y * size + yOffset,
                    z: startLocation.z + point.z * size,
                };

                const molang = new MolangVariableMap();
                molang.setColorRGB("variable.color", {
                    red: 0.6,
                    green: 0.2,
                    blue: 1,
                });
                overworld.spawnParticle(
                    "minecraft:colored_flame_particle",
                    newLocation,
                    molang
                );
            }
        }
    };

    const spawnSegment = async (text, delay) => {
        let xOffset = 0;
        let yOffset = 0;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (char === "\n") {
                yOffset -= size * 6;
                xOffset = 0;
                continue;
            }

            spawnLetter(char, xOffset, yOffset);
            xOffset += size * 6;
            await new Promise((resolve) =>
                system.runTimeout(resolve, delay + Ddelay)
            );
        }
    };

    for (const segment of segments) {
        await spawnSegment(segment.text, segment.delay);
    }
}

const location = { x: 8, y: 10, z: 10.5 };

const lyrics = [
    {
        text: "A flower is not a flower until they bloom\nLike my first time living life the day I met you",
        delay: 0.85,
    },
    {
        text: "Hate to think that humans have to die someday\nA thousand years won't do oo",
        delay: 0.8,
    },
    {
        text: "No wonder I fell in love\nEven though I'm scared to love (ah)\nBaby I know the pain is unbearable\nThere's no way",
        delay: 0.9,
    },
    {
        text: "Pinsala'y ikinamada\nOh binibining may salamangka\nYou've turned my limbics into a bouquet",
        delay: 0.8,
    },
    {
        text: "Ikaw ay tila sining sa museong 'di naluluma\nBinibini kong ginto hanggang kaluluwa\nGonna keep you like the nu couché\nAll my life",
        delay: 0.9,
    },
    {
        text: "At kung sa tingin mo na ang oras mo'y lumipas na\nAko'y patuloy na mararahuyo sa ganda\nI'd still kiss you every single day",
        delay: 0.85,
    },
    {
        text: "All my life\nIf I could paint a perfect picture\nOf the girl of my dreams with a curvy figure\nVoice of an angel like a symphony",
        delay: 0.8,
    },
    {
        text: "No doubt she's a masterpiece\nNo matter the color you're beautiful\nYou're one of a kind like a miracle\nHindi ka papanaw hanggang huling araw",
        delay: 0.9,
    },
    {
        text: "Maging kabilang buhay ikaw ay ikaw\nNo wonder I fell in love\nEven though I'm scared to love\nBaby I know the pain is unbearable",
        delay: 0.8,
    },
    {
        text: "There's no way\nPinsala'y ikinamada\nBinibining may salamangka\nYou've turned my limbics into a bouquet (oh binibini)",
        delay: 0.9,
    },
    {
        text: "Ikaw ay tila sining sa museong 'di naluluma\nBinibini kong ginto hanggang kaluluwa\nGonna keep you like the nu couché\nAll my life",
        delay: 1.0,
    },
    {
        text: "At kung sa tingin mo na ang oras mo'y lumipas na\nAko'y patuloy na mararahuyo sa ganda\nI'd still kiss you every single day\nAll my life",
        delay: 0.85,
    },
    {
        text: "At sa pagdating ng huling araw 'wag mag-alala\nNaramdama'y habang buhay nakamantsa\nThat the world will never take away\nAfter life",
        delay: 0.9,
    },
];

const size = 0.2;

spawnTextWithDynamicDelays(lyrics, location, size, 0.2);
system.runTimeout(() => {
    spawnTextWithDynamicDelays(lyrics, location, size, 0.2);
}, 20);

// system.runInterval(() => {
//     // console.warn(distance)
//     // const location = { x: 10, y: -50, z: 10 };
//     spawnLyrics(location, lyrics, 0.2, 1);
// }, 5);
