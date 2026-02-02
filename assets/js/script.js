let facts = [
    {
        title: "Strawberries",
        content: "Strawberries wear their seeds on the outside — the only fruit that does!",
    },
    {
        title: "Berries",
        content: "Nearly all berries are self-pollinating. Scientifically, this means that a single berry flower has both the male and female parts. Hooray, you will only need one plant in order to produce fruit, which is great news for those of us who have smaller spaces to work with."
    },
    {
        title: "Mushrooms",
        content: "Without mushrooms, forests would be buried under dead organic matter; they act as the planet's primary recyclers."
    },
    {
        title: "Trees",
        content: "There are currently about 400 trees for every person on Earth."
    },
    {
        title: "Forests",
        content: "Forests act as natural water filters and 'air conditioners', releasing water into the atmosphere that triggers rain."
    }
];

let factsIndex = 0;
const factsContainer = document.getElementById("facts-container");
const btnsContainer = document.getElementById("buttons-container");
const newFactBtn = document.getElementsByClassName("btn-green");

function addFact() {
    const fact =facts[factsIndex];
const newFactElement = document.createElement("div");
newFactElement.classList.add("fact-card");
newFactElement.innerHTML = `<h5>${fact.title}</h5>
                            <p>${fact.content}</p>`;
factsContainer.appendChild(newFactElement);
factsIndex++;
if (factsIndex === facts.length) {
    btnsContainer.removeChild(newFactBtn[0]);
}
}

function clearAllFacts() {
    factsContainer.innerHTML = "";
    if (factsIndex === facts.length) {
    btnsContainer.removeChild(newFactBtn[0]);
    }
factsIndex = 0;
}

$("button").click(function() {
	$("p").toggle();
});