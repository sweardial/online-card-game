import React from 'react'


const Rules = () => {
  return (
    <div>
      <h3 style={{color: 'red'}}>A little bit about the game:</h3>
      <p>This game is one of the most popular card games in Post Soviet countries,
        that was actually created in the 18th century
        <br></br>
        <br></br>
        <h3 style={{color: 'red'}}>Rules: </h3>
        Two players. One is attacking, one is defending. Players start with 6 cards.
        <br></br>
        In the deck on the right side you see a card with a trump suit and the rest of the cards that are used for filling 
        your hand back up to 6.
        <br></br>
        When it's your turn to attack,
        you start with any card, and then, if you have card with an equal value that you see any card on the battle table,
        you can toss your card in. As a defending player your main goal is to beat attacking cards. If you are using a card with
        a trump suit - you can beat any other cards regardless of its value (if it's not againt a trump suited card. In this case value pattern is the same)
        If you don't have a card that beats the attacking card, then you grab all of the cards on the battle table, including some cards from attacking player
        that he can toss in after you decided to grab.
        
        Value pattern: 
        
        2 is smaller than 3
        3 is smaller than 4
        .
        .
        .
        .
        10 is smaller than Jack
        Jack is smaller than Queen
        Queen is smaller than King
        King is smaller that Ace
        <br></br>
        Game is over and you win when the deck is empty and you don't have any cards left. 
        If both of players don't have cards - it's a Tie.
      </p>
    </div>
  )
}

export default Rules