// Tim Otholt - Driver
// Jonathan Young -- Passenger
// Malik Hussain -- Passenger
// Zena Nazim -- Passenger
// Yongfang - Passenger

const express = require(`express`);
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// Part 1 - beep boop
app.get(`/`, (request, response) => {
    response.send(`Beep boop!  Welcome to the Robot Server!`);
});

// Part 2 - superhero name generator
app.get(`/hero/:name`, (request, response) => {
    response.send(`Hello ${request.params.name}, your superhero name is Captain ${request.params.name}!`);
})

// Part 3 - Magic 8-ball
app.get(`/8ball/:question`, (request, response) => {
    let random = Math.floor(Math.random() * 3);
    switch (random) {
        case 0:
            response.send(`yes`);
            break;
        case 1:
            response.send(`no`);
            break;
        case 2:
            response.send(`ask again homie!`);
            break;
    }
})

// 4 - Random Animal Facts
app.get(`/animal-fact`, (request, response) => {

    // make an array of animal facts
    const animalFacts = [    
        `The unicorn is the national animal of Scotland.`,
        `The ostrich is the national bird of Ireland.`,
        `The dolphin is the national animal of the Bahamas.`
    ];

    // Randomly select a fact and return it
    let random = Math.floor(Math.random() * 3);
    response.send(animalFacts[random]);
})

// 5 - Random Quote Generator
app.get(`/compliment{/:name}?`, (request, response) => {

    // make an array of compliments (5 of them)
    const compliments = [
        `you are smart`,
        `you are funny`,
        `you are cute`,
        `you are pretty`,
        `you are lovely`
    ];

    // If name doesn't exist
    if (!request.query.name) {
        let s = compliments[Math.round(Math.random() * 1)];
        s[0] = s[0].toUpperCase();
        response.send(s);
        return;
    }

    response.send(`${request.query.name}", "${compliments[Math.round(Math.random() * 1)]}`);

})