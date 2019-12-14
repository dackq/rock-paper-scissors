const choices = {
	paper: "You chose paper!",
	rock: "You chose paper!",
	scissors: "You chose paper!"
};

const choose = choice => {
	return choices[choice];
};

console.log(choose("paper"));
