import React, { useEffect, useState } from 'react'
import pokeballSVG from './assets/pokeball.svg'


const PokemonCard = ({card, src, handleChoice, flipped, disabled}) => {


  function handleClick() {
    if (!disabled) {
    handleChoice(card)
    }
  }

if (flipped === true) {
    return (
      <div className='flex justify-center border-black border-2 bg-[#6d6d96] gap-4 rounded-lg shadow-xl'>
            <img className='w-full h-full object-scale-down' src={src} alt=""/>
      </div>
      )
}
  return (
    <div onClick={handleClick} className='flex flex-cols justify-center bg-[#313167] border-black border-2 gap-4 rounded-lg shadow-xl'>
        <img className='p-3 w-full h-full object-scale-down shadow-lg'alt="" size={280} src={pokeballSVG}/>
    </div> 

  )
}

export default PokemonCard
