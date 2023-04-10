
const pokedex = document.getElementById('pokemon-display');
let currentPokemon = 1;


const fetchPokemon = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/?limit=151`;

    fetch(url)
        .then((res) => res.json())
        .then((result) => {
            const pokemon = {
                name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', '),
                id: result.id
            };
            displayPokemon(pokemon);

        });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);

    const firstType = pokemon.type.split(',')[0].toLowerCase();
    let subtitleClass;
    switch (firstType) {
        case 'normal':
            subtitleClass = 'type-normal';
            break;
        case 'fire':
            subtitleClass = 'type-fire';
            break;
        case 'water':
            subtitleClass = 'type-water';
            break;
        case 'electric':
            subtitleClass = 'type-electric';
            break;
        case 'grass':
            subtitleClass = 'type-grass';
            break;
        case 'ice':
            subtitleClass = 'type-ice';
            break;
        case 'fighting':
            subtitleClass = 'type-fighting';
            break;
        case 'poison':
            subtitleClass = 'type-poison';
            break;
        case 'ground':
            subtitleClass = 'type-ground';
            break;
        case 'flying':
            subtitleClass = 'type-flying';
            break;
        case 'psychic':
            subtitleClass = 'type-psychic';
            break;
        case 'bug':
            subtitleClass = 'type-bug';
            break;
        case 'rock':
            subtitleClass = 'type-rock';
            break;
        case 'ghost':
            subtitleClass = 'type-ghost';
            break;
        case 'dragon':
            subtitleClass = 'type-dragon';
            break;
        case 'dark':
            subtitleClass = 'type-dark';
            break;
        case 'steel':
            subtitleClass = 'type-steel';
            break;
        case 'fairy':
            subtitleClass = 'type-fairy';
            break;
        default:
            subtitleClass = '';
            break;
    }


    const pokemonHTMLString = `
            <img class="card-image" src="${pokemon.image}"/>
            <h2 class="card-title">#${pokemon.id} ${pokemon.name}</h2>
            <p class="card-subtitle ${subtitleClass}">${pokemon.type}</p>
    `;
    pokedex.innerHTML = pokemonHTMLString;
};

const searchPokemon = () => {
 const searchInput = document.getElementById('search-input').value.toLowerCase().trim();
 let pokemonId;
 if (!isNaN(searchInput)) {
     pokemonId = parseInt(searchInput);
 } else {
     // Search for Pokemon by name
     const url = `https://pokeapi.co/api/v2/pokemon/${searchInput}/?limit=151`;
     fetch(url)
         .then((res) => res.json())
         .then((result) => {
             pokemonId = result.id;
             currentPokemon = pokemonId;
             fetchPokemon(currentPokemon);
         })
         .catch((err) => console.error(err));
     return;
 }
 if (pokemonId >= 1 && pokemonId <= 151) {
     currentPokemon = pokemonId;
     fetchPokemon(currentPokemon);
 } else {
     alert('Please enter a valid Pokemon ID (1-151)');
 }
};

document.getElementById('search-btn').addEventListener('click', searchPokemon);

fetchPokemon(currentPokemon);

//search bar display
const endpoint = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

const pokemons = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => pokemons.push(...data.results));
  console.log(pokemons)

function findMatches(wordToMatch, pokemons) {
  return pokemons.filter(pokemon => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return pokemon.name.match(regex)
  });
}

function displayMatches() {
    if (this.value === '') {
        suggestions.innerHTML = '';
        return;
    }
  const matchArray = findMatches(this.value, pokemons);
  const html = matchArray.map(pokemon => {
    const regex = new RegExp(this.value, 'gi');
    const pokemonName = pokemon.name.replace(regex, `<span class="hl">${this.value}</span>`);
  
    return `
      <li>
        <span class="name">${pokemonName}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;

  const suggestionItems = suggestions.querySelectorAll('li')
  suggestionItems.forEach(item =>{
     item.addEventListener('click',()=>{
         searchInput.value = item.querySelector('.name').textContent
         suggestions.innerHTML = '';
    })
   })

}

const searchInput = document.querySelector('#search-input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);


// Add event listeners to display the previous and next Pokemon when the corresponding buttons are clicked.
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPokemon > 1) {
        currentPokemon--;
    }
    fetchPokemon(currentPokemon);
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPokemon < 151) {
        currentPokemon++;
    }
    fetchPokemon(currentPokemon);
});

