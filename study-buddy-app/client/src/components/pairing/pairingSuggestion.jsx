import React from 'react'
import PairsSuggested from './pairsSuggested.jsx'

const pairingSuggestion = () => {
  return (
    <div className='flex-1 absolute w-5/6 h-full w-full'>
        <div className="h-12 bg-blue-500 flex items-center justify-between p-2 text-white"> {/* chat info bar */}
            Suggested Buddies
        </div>
    <div className="bg-blue-200 p-2 h-full">
      <PairsSuggested />
     </div>
    </div>
  )
}

export default pairingSuggestion