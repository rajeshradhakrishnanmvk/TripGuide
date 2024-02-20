// JavaScript (React)
import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for making HTTP requests

const App = () => {
  const [data, setData] = useState([]); // Initialize state for storing the data
  const [newItem, setNewItem] = useState({ SeqNo: '', Place: '', Distance: '' }); // Initialize state for new item
  const [editItem, setEditItem] = useState(null); // Initialize state for editing item

  useEffect(() => { // Use the useEffect hook to fetch data when the component mounts
    fetchData();
  }, []); // The empty array means this effect runs once when the component mounts

  const fetchData = () => {
    axios.get('http://localhost:3000/fetch') // Send a GET request to the /fetch endpoint
      .then((response) => {
        setData(response.data.data); // Update the data state with the response data
      })
      .catch((error) => {
        console.error('Error:', error); // Log any errors
      });
  };

  const handleAddItem = () => {
    axios.post('http://localhost:3000/insert', newItem) // Send a POST request to the /add endpoint with the new item data
      .then(() => {
        fetchData(); // Fetch the updated data
        setNewItem({ SeqNo: '', Place: '', Distance: '' }); // Reset the new item state
      })
      .catch((error) => {
        console.error('Error:', error); // Log any errors
      });
  };

  const handleEditItem = (item) => {
    setEditItem(item); // Set the item to be edited
  };

  const handleUpdateItem = () => {
    axios.put(`http://localhost:3000/edit/${editItem._id}`, editItem) // Send a PUT request to the /edit endpoint with the edited item data
      .then(() => {
        fetchData(); // Fetch the updated data
        setEditItem(null); // Reset the edit item state
      })
      .catch((error) => {
        console.error('Error:', error); // Log any errors
      });
  };

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`) // Send a DELETE request to the /delete endpoint with the item id
      .then(() => {
        fetchData(); // Fetch the updated data
      })
      .catch((error) => {
        console.error('Error:', error); // Log any errors
      });
  };

  return (
    <div>
      <ul> {/* Start of the list */}
        {(Array.isArray(data) && data.length > 0) ? (
          data.map((item, index) => ( // Map over the data array
            <li key={index}> {/* Create a list item for each data item */}
              {/* Display the data item properties */}
              {/* Replace 'property1', 'property2', etc. with your actual property names */}
              {item.SeqNo}, {item.Place}, {item.Distance}
              <button onClick={() => handleEditItem(item)}>Edit</button> {/* Edit button */}
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button> {/* Delete button */}
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul> {/* End of the list */}

      {/* Add new item form */}
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="SeqNo"
          value={newItem.SeqNo}
          onChange={(e) => setNewItem({ ...newItem, SeqNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Place"
          value={newItem.Place}
          onChange={(e) => setNewItem({ ...newItem, Place: e.target.value })}
        />
        <input
          type="text"
          placeholder="Distance"
          value={newItem.Distance}
          onChange={(e) => setNewItem({ ...newItem, Distance: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      {/* Edit item form */}
      {editItem && (
        <form onSubmit={handleUpdateItem}>
          <input
            type="text"
            placeholder="SeqNo"
            value={editItem.SeqNo}
            onChange={(e) => setEditItem({ ...editItem, SeqNo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Place"
            value={editItem.Place}
            onChange={(e) => setEditItem({ ...editItem, Place: e.target.value })}
          />
          <input
            type="text"
            placeholder="Distance"
            value={editItem.Distance}
            onChange={(e) => setEditItem({ ...editItem, Distance: e.target.value })}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default App; // Export the App component