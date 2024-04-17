import React, {useState} from 'react'
import PairingSuggestion from '../components/pairing/pairingSuggestion.jsx'

const PairingSuggestionPage = () => {
  const [isAdded, setIsAdded] = useState(false);

  const handleIsAdded = () => {
    setIsAdded(!isAdded);
  }
  
  return (
     <div className="flex flex-col items-center bg-slate-100 h-screen">
      <h2 className="text-2xl font-bold text-gray-900 my-8">Matches</h2>

        <div className="w-full max-w-md">

            <div className="bg-white my-4 p-4 rounded shadow-md w-full flex justify-between items-center">
              <p className="text-lg font-semibold">Friend 1</p>
          <div className="flex space-x-4">
            {!isAdded ? (
              < button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick = {handleIsAdded}>Add</button>
            ) : (
                <button
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
                  onClick={handleIsAdded}
                >Added</button>
            )}

              </div>
            </div>

        </div>

    </div>
  )
}

export default PairingSuggestionPage