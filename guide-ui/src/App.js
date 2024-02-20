// JavaScript (React)
import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for making HTTP requests

const App = () => {
  const [data, setData] = useState([]); // Initialize state for storing the data

  useEffect(() => { // Use the useEffect hook to fetch data when the component mounts
    axios.get('http://localhost:3000/fetch') // Send a GET request to the /fetch endpoint
      .then((response) => {
        setData(response.data.data); // Update the data state with the response data
      })
      .catch((error) => {
        console.error('Error:', error); // Log any errors
      });
  }, []); // The empty array means this effect runs once when the component mounts

  return (
    
    <ul> {/* Start of the list */}
      {(Array.isArray(data) && data.length > 0) ? (
        data.map((item, index) => ( // Map over the data array
          <li key={index}> {/* Create a list item for each data item */}
            {/* Display the data item properties */}
            {/* Replace 'property1', 'property2', etc. with your actual property names */}
            {item.SeqNo}, {item.Place}, {item.Distance}
          </li>
        ))
      ) : (
        <li>No data available</li>
      )}
    </ul> // End of the list
  );
};

export default App; // Export the App component