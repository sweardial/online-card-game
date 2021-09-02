import React from 'react'


const Rules = () => {
  return (
    <div>
      <h3 style={{color: 'red'}}>A little bit about the game:</h3>
      <p>This game is one of the most popular card games in Post Soviet countries,
        that was actually created in the 18th century </p>
        <br></br>
        <br></br>
        <h3 style={{color: 'red'}}>Rules: </h3>
        Two players. One is attacking, one is defending. Players start with 6 cards.
        <br></br>
        <p>
        In the deck on the right side you see a card with a trump suit and the rest of the cards that are used for filling 
        your hand back up to 6. </p>

        <p>
        <b>When it's your turn to attack,</b>
        you start with any card, and then, if you have card with an equal value that you see any card on the battle table,
        you can toss your card in. <b>As a defending player</b> your main goal is to beat attacking cards.</p>

        <p>
        <b>If you are using a card with
        a trump suit</b> - you can beat any other cards regardless of its value (if it's not againt a trump suited card. 
        In this case value pattern is the same)
        <b>If you don't have a card that beats the attacking card</b>, then you grab all of the cards on the battle table, 
        including some cards from attacking player
        that he can toss in after you decided to grab.</p>
        <b>Value pattern:</b>
        <br></br>
        2 is smaller than 3<br></br>
        3 is smaller than 4<br></br>
        .<br></br>
        .<br></br>
        .<br></br>
        .<br></br>
        10 is smaller than Jack<br></br>
        Jack is smaller than Queen<br></br>
        Queen is smaller than King<br></br>
        King is smaller that Ace<br></br>
        <p>
        <b>Game is over</b> when the deck is empty one of the users don't have any cards left. 
        Empty hand player is a <b>winner</b>.
        If both of players don't have cards - it's a <b>Tie</b>.
        </p>
    </div>
  )
}

export default Rules