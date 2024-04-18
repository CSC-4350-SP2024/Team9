import React, { useState, useEffect } from 'react';

const EditContactInfo = () => {
    const [contactInfo, setContactInfo] = useState([]);
    const [formData, setFormData] = useState({ phone_number: '', discord_name: '' });
    const [confirmSaved, setConfirmedSaved] = useState([])
    const [errorText, setErrorText] = useState([])
    const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
    fetchInfo();
     }, []);
    
     const fetchInfo = async () => {
        fetch('/api/getContactInfo', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then(response => {
     if (response.ok) {
          return response.json();
        } else {
        throw new Error('Failed to fetch user data');
        }
    })
    .then(data => {
        setFormData({ phone_number: data.phone_number, discord_name: data.discord_name });
    })
    .catch(error => {
        console.error('Error fetching user data:', error.message);
     });
    };
    
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/editContactInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
          body: JSON.stringify(formData)
      });
        setConfirmedSaved("Information Updated")

      if (!response.ok) {
         setErrorText("Failed to save");
        throw new Error('Failed to edit contact info.');
      }
    } catch (err) {
      console.error('Error while editing contact info:', err);
    } finally {
      setIsLoading(false);
    }
  };
    return (
        <div className="flex flex-col items-center bg-slate-100 h-screen">
            <p className=' text-red-500 mb-8'>{errorText}</p>
            <p className=' text-green-500 mb-8'>{confirmSaved}</p>
      <h1 className="text-2xl font-bold text-gray-900 my-8">Edit Contact Info</h1>

        <div className="w-full max-w-md">

            <div className="bg-white my-4 p-4 rounded shadow-md w-full flex justify-between items-center">
              <form onSubmit={handleSubmit}>
                    <div className="mb-4">
            <label htmlFor="phone_number" className="block mb-2 font-semibold">Phone Number (Optional)</label>
            <input
              type="phone_number"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="discord_name" className="block mb-2 font-semibold">Discord (Optional)</label>
            <input
              type="discord_name"
              id="discord_name"
              name="discord_name"
              value={formData.discord_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                        </div>
                        </form>
            </div>
        </div>


    </div>
  )
}

export default EditContactInfo