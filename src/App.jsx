import React from 'react';
import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard.jsx';
import CountdownTimer from './CountdownTimer.jsx';

import bulbasaur from './assets/bulbasaur.png'
import charmander from './assets/charmander.png'
import squirtle from './assets/squirtle.png'
import pikachu from './assets/pikachu.png'
import mankey from './assets/mankey.png'
import snorlax from './assets/snorlax.png'
import gengar from './assets/gengar.png'
import mew from './assets/mew.png'
import dragonite from './assets/dragonite.png'


const pokemons = [
  {'name':'bulbasaur', 'src': bulbasaur, matched: false},
  {'name':'charmander','src': charmander, matched: false},
  {'name':'squirtle','src': squirtle, matched: false},
  {'name':'pikachu','src': pikachu, matched: false},
  {'name':'mankey','src': mankey, matched: false},
  {'name':'snorlax','src': snorlax, matched: false},
  {'name':'gengar','src': gengar, matched: false},
  {'name':'mew','src': mew, matched: false},
  {'name':'dragonite','src': dragonite, matched: false},
];



function App() {
  
const [gameOnOFF, setGameOnOFF] = useState(false);
const [cards, setCards] = useState([]);

const [choiceONE, setChoiceONE] = useState(null);
const [choiceTWO, setChoiceTWO] = useState(null);
const [disabled, setDisabled] = useState(false)

const [turns, setTurns] = useState(0);
const [pokemonNumber, setPokemonNumber] = useState(0);
const [points, setPoints] = useState(0)
const [time, setTime] = useState(1)

// Handle shuffling cards
  function shuffleCards() {
    const shuffledCards = [...pokemons, ...pokemons]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    setCards(shuffledCards)
  }
// Handle user choices
  function handleChoice(card) {
    choiceONE ? setChoiceTWO(card) : setChoiceONE(card)
  }
// Increase turns and reset cards choices
  function resetTurn() {
    setChoiceONE(null);
    setChoiceTWO(null);
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  }

// Handle Game ON/OFF
function startGame() {
  setGameOnOFF(!gameOnOFF);
  shuffleCards();
  setTurns(0);
  setPokemonNumber(0);
  setPoints(0);
}


useEffect(() => {

  if (pokemonNumber === 9) {
     shuffleCards();
     setPokemonNumber(0);
  }
  
  if (choiceONE && choiceTWO) {
    setDisabled(true)
    if (choiceONE.src === choiceTWO.src) {
    setPokemonNumber(prev => prev + 1);
    setPoints(prev => prev + 1)
    setCards(prevCards => {
      return prevCards.map(card => {
        if (card.src === choiceONE.src) {
          return {...card, matched: true}
        } else {
          return card;
        }
      })
    })
    resetTurn()}
    else { 
    setTimeout(() => resetTurn(), 500)
    }
  }
}, [choiceONE, choiceTWO])




if (gameOnOFF === false) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Pokémon Memory Game</h1>
            <p className="text-lg text-gray-600">Test your memory and match all the Pokémon pairs!</p>
        </header>
        <section className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Play</h2>
            <p className="text-md text-gray-700 mb-2">1. Click on a card to flip it over.</p>
            <p className="text-md text-gray-700 mb-2">2. Try to find the matching card.</p>
            <p className="text-md text-gray-700 mb-2">3. Match all the pairs to win the game.</p>
            <p className="text-md text-gray-700">4. Find as many pokemons as you can!</p>
            <p className="text-md text-gray-700">5. Have fun!</p>
        </section>
        <div className='text-center mb-8'>
            <button onClick={startGame} className="bg-[#313167] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 animate-pulse">
                Start Game
            </button>
            <p className="text-sm text-gray-600 mt-4"> For the best experience, please use a larger screen. </p>
        </div>

    </div>)
}
  return (
    <div className="min-h-screen p-4">
    <div className="flex flex-col items-center justify-between text-black mb-4 space-y-4 md:flex-row md:justify-between md:space-y-0">
      <div className="flex flex-col items-center md:flex-row md:space-x-4">
        <h1 className="m-2 p-2 bg-white rounded shadow">Turns: {turns}</h1>
        <h1 className="m-2 p-2 bg-white rounded shadow">Pokemons: {points}</h1>
      </div>
    </div>
    <CountdownTimer initialMinutes={time} initialSeconds={0} total={points} restartGame={startGame}/>
    <div className="grid grid-cols-6 gap-2 md:grid-cols-6 px-2">
        {cards.map((card) => (
            <PokemonCard 
                key={card.id}
                card={card}
                src={card.src}
                handleChoice={handleChoice}
                disabled={disabled}
                flipped={card === choiceONE || card === choiceTWO || card.matched}
            />
        ))}
    </div>

</div>

  )
}

export default App
