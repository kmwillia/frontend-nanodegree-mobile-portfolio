/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/


// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {};
pizzaIngredients.meats = [
	"Pepperoni","Sausage","Fennel Sausage","Spicy Sausage","Chicken","BBQ Chicken","Chorizo",
	"Chicken Andouille","Salami","Tofu","Bacon","Canadian Bacon","Proscuitto","Italian Sausage",
	"Ground Beef","Anchovies","Turkey","Ham","Venison","Lamb","Duck","Soylent Green","Carne Asada",
	"Soppressata Picante","Coppa","Pancetta","Bresola","Lox","Guanciale","Chili","Beef Jerky",
	"Pastrami","Kielbasa","Scallops","Filet Mignon"
];
pizzaIngredients.nonMeats = [
	"White Onions","Red Onions","Sauteed Onions","Green Peppers","Red Peppers","Banana Peppers",
	"Ghost Peppers","Habanero Peppers","Jalapeno Peppers","Stuffed Peppers","Spinach","Tomatoes",
	"Pineapple","Pear Slices","Apple Slices","Mushrooms","Arugula","Basil","Fennel","Rosemary",
	"Cilantro","Avocado","Guacamole","Salsa","Swiss Chard","Kale","Sun Dried Tomatoes","Walnuts",
	"Artichoke","Asparagus","Caramelized Onions","Mango","Garlic","Olives","Cauliflower","Polenta",
	"Fried Egg","Zucchini","Hummus"
];
pizzaIngredients.cheeses = [
	"American Cheese","Swiss Cheese","Goat Cheese","Mozzarella Cheese","Parmesean Cheese",
	"Velveeta Cheese","Gouda Cheese","Muenster Cheese","Applewood Cheese","Asiago Cheese",
	"Bleu Cheese","Boursin Cheese","Brie Cheese","Cheddar Cheese","Chevre Cheese","Havarti Cheese",
	"Jack Cheese","Pepper Jack Cheese","Gruyere Cheese","Limberger Cheese","Manchego Cheese",
	"Marscapone Cheese","Pecorino Cheese","Provolone Cheese","Queso Cheese","Roquefort Cheese",
	"Romano Cheese","Ricotta Cheese","Smoked Gouda"
];
pizzaIngredients.sauces = [
	"Red Sauce","Marinara","BBQ Sauce","No Sauce","Hot Sauce"
];
pizzaIngredients.crusts = [
	"White Crust","Whole Wheat Crust","Flatbread Crust","Stuffed Crust"
];

// Changed the functions to get Pizza name parts to an object definition
var words = {
	adjectives: {
		dark: [
			"dark","morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted",
			"morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty",
			"dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"
		],
		color: [
			"blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red",
			"maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta",
			"chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan",
			"raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"
		],
		whimsical: [
			"whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing",
			"hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy",
			"cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked",
			"brainwashed"
		],
		shiny: [
			"sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise",
			"starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy",
			"metallic"
		],
		noisy: [
			"untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic",
			"orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling",
			"yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping",
			"humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"
		],
		apocalyptic: [
			"nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic",
			"radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying",
			"rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"
		],
		insulting: [
			"stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow",
			"gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous",
			"boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless",
			"lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed",
			"disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide",
			"horrible", "syncophantic", "unhelpful", "bootlicking"
		],
		praise: [
			"beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful",
			"talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous",
			"dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave",
			"noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome",
			"majestic", "grand", "stunning"
		],
		scientific: [
			"scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
			"innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
			"extinct", "galactic"
		],
		default: [
			"scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
			"innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
			"extinct", "galactic"
		]
	},
	nouns: {
		animals: [
			"flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo",
			"wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan",
			"raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper",
			"gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale",
			"hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish",
			"butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture",
			"rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"
		],
		profession: [
			"doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic",
			"comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor",
			"senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot",
			"priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"
		],
		fantasy: [
			"centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost",
			"knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester",
			"tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"
		],
		music: [
			"violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums",
			"harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone",
			"bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor",
			"singer"
		],
		horror: [
			"murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf",
			"vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter",
			"poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath",
			"fiend", "satanist", "moon", "fullMoon"
		],
		gross: [
			"slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm",
			"centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance",
			"fluid", "moisture", "garbage", "trash", "bug"
		],
		everyday: [
			"mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV",
			"book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen",
			"garden", "school", "wallet", "bottle"
		],
		jewelry: [
			"earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry",
			"anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin",
			"costume", "ornament", "treasure"
		],
		places: [
			"swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood",
			"city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery",
			"shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"
		],
		scifi: [
			"robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
			"computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
			"quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
			"universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"
		],
		default: [
			"robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
			"computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
			"quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
			"universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"
		]
	}
}

// Other global variables used throughout
var movers = [],									// Array of '.mover' pizza image elements
	pizzas = [],									// Array of '.randomPizzaContainer' elements
	ticking = false,								// true if currently in callback from requestAnimationFrame
	adjKeys = Object.keys(words.adjectives),		// Array of keys for pizza name adjectives
	nounKeys = Object.keys(words.nouns),			// Array of keys for pizza name nouns
	pizzaSizes = {1: "small", 2: "medium", 3: "large"};		//Object of pizza sizes and their corresponding size word



// Pizza name, ingredients, and element creation ------------------------------
//-----------------------------------------------------------------------------
// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
/* Function to construct a random pizza name
 * @params {String} adj Name of key in words.adjectives to get list of possible Adjectives
 * @params {String} noun Name of key in words.nouns to get list of possible Nouns
 * @returns {String} "The [Adjective] [Noun]"
 */
function generator(adj, noun) {
	//Get adjective and noun lists from passed in adj and noun Categories
	var adjectives = words.adjectives[adj];
	var nouns = words.nouns[noun];

	//Create random name from those lists
	return (
		"The " +
		adjectives[Math.floor(Math.random() * adjectives.length)].capitalize() +
		" " +
		nouns[Math.floor(Math.random() * nouns.length)].capitalize()
	);
}

// Chooses random adjective and random noun
/* Function to generate a random pizza name
 * @returns {String} Random Pizza name from generator()
 */
function randomName() {
	return generator(
		adjKeys[Math.floor(Math.random() * adjKeys.length)],
		nounKeys[Math.floor(Math.random() * nounKeys.length)]
	);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
	return pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
};

var selectRandomNonMeat = function() {
	return pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
};

var selectRandomCheese = function() {
	return pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
};

var selectRandomSauce = function() {
	return pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
};

var selectRandomCrust = function() {
	return pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
};

var ingredientItemizer = function(string) {
	return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
/* Function to generate a string of pizza ingredients, all inside <li> tags
 * @returns {String} 0-3 meats, 0-2 non-meats, 0-1 cheeses, sauce, and crust
 */
var makeRandomPizza = function() {
	var pizza = "";

	for (var i = 0; i < Math.floor(Math.random() * 4); i++) {
		pizza += ingredientItemizer(selectRandomMeat());
	}

	for (var j = 0; j < Math.floor(Math.random() * 3); j++) {
		pizza += ingredientItemizer(selectRandomNonMeat());
	}

	for (var k = 0; k < Math.floor(Math.random() * 2); k++) {
		pizza += ingredientItemizer(selectRandomCheese());
	}

	pizza += ingredientItemizer(selectRandomSauce());
	pizza += ingredientItemizer(selectRandomCrust());

	return pizza;
};


// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
	var pizzaContainer,             // contains pizza title, image and list of ingredients
		pizzaImageContainer,        // contains the pizza image
		pizzaImage,                 // the pizza image itself
		pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
		pizzaName,                  // the pizza name itself
		ul;                         // the list of ingredients

	pizzaContainer  = document.createElement("div");
	pizzaImageContainer = document.createElement("div");
	pizzaImage = document.createElement("img");
	pizzaDescriptionContainer = document.createElement("div");

	pizzaContainer.id = "pizza" + i;// gives each pizza element a unique id
	pizzaContainer.classList.add("randomPizzaContainer");
	/* Inline styles moved to inline CSS in pizza.html to speed things up */

	pizzaImageContainer.classList.add("col-md-6");
	pizzaImage.src = "images/pizza.png";
	pizzaImage.classList.add("img-responsive");
	pizzaImageContainer.appendChild(pizzaImage);
	pizzaContainer.appendChild(pizzaImageContainer);

	pizzaDescriptionContainer.classList.add("col-md-6");
	pizzaName = document.createElement("h4");
	pizzaName.innerHTML = randomName();
	pizzaDescriptionContainer.appendChild(pizzaName);

	ul = document.createElement("ul");
	ul.innerHTML = makeRandomPizza();
	pizzaDescriptionContainer.appendChild(ul);
	pizzaContainer.appendChild(pizzaDescriptionContainer);

	return pizzaContainer;
};



// Pizza Resizing -------------------------------------------------------------
//-----------------------------------------------------------------------------
// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
/* Function to resize the random pizzas
 * @params {Integer} size 1, 2, or 3 for small, medium, and large respectively
 */
var resizePizzas = function(size) {
	window.performance.mark("mark_start_resize");   // User Timing API function

	//Map numeric size to its string
	var sizeName = pizzaSizes[size] || "bug in resizePizzas";

	// Changes the value for the size of the pizza above the slider
	//		Changed from function to declaration
	document.querySelector("#pizzaSize").innerHTML = sizeName.capitalize();

	/* Function to calculate the class name of a given pizza size
	 * @params {String} size String size of new pizza size
	 * @returns {String} name of new pizza size's class
	 */
	function pizzaSizeClass (size) {
		return size + "-pizza";
	}

	/* Function to change size of pizzas
	 * 	Iterates through all randomPizzaContainer elements, removes the 
	 * 	old size class, and adds the new size class
	 * @params {String} size String size of new pizza size
	 */
	function changePizzaSizes(size) {
		pizzas.forEach(function(pizza) {
			pizza.classList.remove("small-pizza","medium-pizza","large-pizza");
			pizza.classList.add(pizzaSizeClass(size));
		});
	}

	// Change size
	changePizzaSizes(sizeName);


	// User Timing API is awesome
	window.performance.mark("mark_end_resize");
	window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
	var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
	console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
};



// Generate Random Pizzas -----------------------------------------------------
//-----------------------------------------------------------------------------
window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
// Also add all pizzaContainers to the pizzas Array, so they can be referenced more easily
pizzas.push(document.getElementById("pizza0"));
pizzas.push(document.getElementById("pizza1"));

var pizzasDiv = document.getElementById("randomPizzas");

// Create 98 Random pizzas, (100 minus the 2 standard pizzas)
for (var i = 2; i < 100; i++) {
	pizza = pizzaElementGenerator(i);
	pizzas.push(pizza);
	pizzasDiv.appendChild(pizza);
}


// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");



// BG Pizzas, their on Scroll -------------------------------------------------
//-----------------------------------------------------------------------------

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
	var numberOfEntries = times.length;
	var sum = 0;
	for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
		sum = sum + times[i].duration;
	}
	console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
	// Update frame count, and start perf log
	frame++;
	window.performance.mark("mark_start_frame");

	// Calc the DOM heavy part of phase calc outside the loop
	var phaseBase = window.scrollY / 1250;

	// Iterate on '.mover's and change their position through CSS translate
	// as it's more efficient than left/top
	movers.forEach(function(mover, index) {
		mover.style.transform = "translate(" + 100 * Math.sin(phaseBase + (index % 5)) + "px, 0)";
	});

	// Reset state of tick
	ticking = false;

	// User Timing API to the rescue again. Seriously, it's worth learning.
	// Super easy to create custom metrics.
	window.performance.mark("mark_end_frame");
	window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
	if (frame % 10 === 0) {
		var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
		logAverageFrame(timesToUpdatePosition);
	}

}

/* Function to handle onScroll events
 */
function onScroll() {
	// Only update the position of the movers if we aren't already in the middle of an update
	if(!ticking) {
		// Set that we've started an update
		ticking = true;
		// Request an update when the browser next can
		requestAnimationFrame(updatePositions);
	}
}

// Attach Sroll event
window.addEventListener('scroll', onScroll);

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
	// Set up vars
	var s = 256, // base vertical & horizontal spacing between movers
		cols = Math.min(Math.ceil(window.innerWidth / s), 8), // number of columns necessary to fill viewport
		rows = Math.ceil(window.innerHeight / s), // number of rows necessary to fill viewport
		pizzaContainer = document.querySelector("#movingPizzas1"); // Get container element outside the loop

	// Only create as many pizzas as we need to fill the screen, no need for 200
	for (var i = 0; i < cols * rows; i++) {
		var elem = document.createElement('img');
		elem.className = 'mover';
		elem.src = "images/pizza.png";
		// Since we're using translate to update now, basicLeft isn't needed and the 
		// initial left can be done here, and is static.
		elem.style.left = (i % cols) * s + 'px';
		elem.style.top = (Math.floor(i / cols) * s) + 'px';
		pizzaContainer.appendChild(elem);
		movers.push(elem);
	}

	// Initial position update
	updatePositions();
});
