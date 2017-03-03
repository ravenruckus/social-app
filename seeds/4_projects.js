'use strict';

exports.seed = function(knex) {
  return knex('projects').del()
    .then(() => {
      return knex('projects').insert([{
        id: 1,
        user_id: 1,
        title: 'An App for Yogis',
        description: 'Put toy mouse in food bowl run out of litter box at full speed fall asleep on the washing machine
        Cat ipsum dolor sit amet, sleep in the bathroom sink for scratch the box yet stick butt in face. Favor packaging over toy meow to be let out and thug cat but gnaw the corn cob, and and sometimes switches in french and say  just because well why not slap  face at 5am until human fills food dish dream about hunting birds. Lick yarn hanging out of own butt groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked,',
        img_url: 'https://static.pexels.com/photos/317157/pexels-photo-317157.jpeg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 3,
      },
      {
        id: 2,
        user_id: 1,
        title: 'Find the Most Dangerous Mountains to Climb',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img_url: 'Be fabulous for the rest of the day - checked!, or cat slap dog in face kitten is playing with dead mouse yet spend all night ensuring people sleep sleep all day lick sellotape. I am the best plays league of legends or spread kitty litter all over house but stare at wall turn and meow stare at wall some more meow again continue staring yet cat slap dog in face spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce. Friends are not food groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked! chase laser.',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 1,
      },
      {
        id: 3,
        user_id: 1,
        title: 'Design Your Own Deck of Cards!',
        description: 'Where is my slave? getting hungry hunt anything that moves, so knock over christmas tree lounge in doorway so play time, for rub whiskers on bare skin act innocent. Paw at beetle and eat it before it gets away under the bed, and massacre a bird in the living room and then look like the cutest and most innocent animal on the planet.',
        img_url: 'https://static.pexels.com/photos/253360/pexels-photo-253360.jpeg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 3,
      },
      {
        id: 4,
        user_id: 1,
        title: 'This is Your Year Planner',
        description: 'Inspect anything brought into the house stare at ceiling human give me attention meow Cat ipsum dolor sit amet, love to play with  hair tie. Scream for no reason at 4 am loves cheeseburgers unwrap toilet paper chase the pig around the house inspect anything brought into the house shove bum in face like camera lens. Meow.',
        img_url: 'https://static.pexels.com/photos/332825/pexels-photo-332825.jpeg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 1,
      },
      {
        id: 5,
        user_id: 1,
        title: 'Print the Perfect Picture',
        description: 'Have my breakfast spaghetti yarn lick the other cats. Purr. Cats secretly make all the worlds muffins spend all night ensuring people sleep sleep all day scream at teh bath human is washing you why halp oh the horror flee scratch hiss bite, for drink water out of the faucet hunt by meowing loudly at 5am next to human slave food dispenser get video posted to internet for chasing red dot.',
        img_url: 'https://static.pexels.com/photos/297648/pexels-photo-297648.jpeg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 3,
      },
      {
        id: 6,
        user_id: 1,
        title: 'Draw From Your Phone',
        description: 'Meow for food, then when human fills food dish, take a few bites of food and continue meowing lick butt and make a weird face or howl uncontrollably for no reason kick up litter but massacre a bird in the living room and then look like the cutest and most innocent animal on the planet.',
        img_url: 'https://static.pexels.com/photos/316465/pexels-photo-316465.jpeg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 1,
      },
      {
        id: 7,
        user_id: 1,
        title: 'An App for Dog Lovers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img_url: 'https://static.pexels.com/photos/1173/animal-dog-pet-cute.jpg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 3,
      },
      {
        id: 8,
        user_id: 1,
        title: 'An App for Cat Lovers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img_url: 'https://static.pexels.com/photos/96938/pexels-photo-96938.jpeg',
        web_url: 'https://www.seattle.gov/animal-shelter/adopt/applications',
        github_link: 'https://github.com/',
        likes: 1,
      }
    ])
    })
    .then(function() {
      return knex.raw("SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));");
    });
};
