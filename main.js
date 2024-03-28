//Function which iterates through the given array and returns all the elements which do not meet the condition
var filterOut = function (array, filterCondition) {
    let tempArray = [];

    array.forEach(function (word) {
        if(filterCondition(word) === false) {
            tempArray.push(word);
        }
    });

    return tempArray;
};

//Initialize variable which will later hold sentence count and define a function which returns the number of times a word ends in punctuation in an array
var amountSentences;
var sentenceCount = function(array) {
    let counter = 0;

    array.forEach(function (word) {
        lastCharIndex = word.length - 1;

        if(word.charAt(lastCharIndex) === '.' || word.charAt(lastCharIndex) === '!' || word.charAt(lastCharIndex) === '?') {
            counter += 1;
        }
    });

    return counter;
};

//Defines function which outputs all formatted metrics about the inputted story
var printCrit = function () {
    console.log(`Your revised story is ${amountSentences} sentences long and contains ${betterWords.length} words.`);
    console.log(`You used the following amount of each overused word: `);
    for(let i = 0; i < overusedWords.length; i++) {
        console.log(`${overusedWords[i]}: ${amountOverusedWords[i]} times`);
    } 

    console.log('The revised version of your story reads: ')
    console.log(betterWords.join(' '));
};

//Define our user's story contents
let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

//Defines an array of words which may be deleted and a linked array which will track the usage of each
let overusedWords = ['really', 'very', 'basically'];
var amountOverusedWords = [];
for(let i = 0; i < overusedWords.length; i++) {
    amountOverusedWords[i] = 0;
}

//Defines an array of words for definite removal
let unnecessaryWords = ['extremely', 'literally', 'actually' ];

//Splits our original story text into its word components
var storyWords = story.split(' ');
console.log(`Your original story was ${storyWords.length} words long.`);

//Defines another array which containing all words sans ones we have defined in our array as unnecessary
var betterWords = filterOut(storyWords, function (word) {
    return unnecessaryWords.includes(word);
});

//Updates our sentence counter to reflect correct amount
amountSentences = sentenceCount(betterWords);

//Updates counter array to reflect overused word usage while deleting every other occurance
for(let i = 0; i < betterWords.length; i++) {
    for(let j = 0; j < overusedWords.length; j++) {
        if(overusedWords[j] === betterWords[i]) {
            amountOverusedWords[j] += 1;

            if(amountOverusedWords[j] != 0 && amountOverusedWords[j] % 2 === 0) {
                betterWords.splice(i, 1);
            }
        }
    }
}

printCrit();
