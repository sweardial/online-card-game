import React from 'react'
import { useSelector } from 'react-redux'
import MemoCards from './Cards'


const SuccessfulDefense = () => {
  const successfulDefense = useSelector(state => state.cards.successfulDefense)
  return (
    <div style={{ paddingLeft: '15rem', marginTop: '-29rem' }}>
        <MemoCards cards={successfulDefense}></MemoCards>
      </div>
  )
}

export default SuccessfulDefense;