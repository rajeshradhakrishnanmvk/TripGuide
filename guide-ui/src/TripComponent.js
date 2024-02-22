// JavaScript (React)
import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'; // Import react-leaflet components



const TripComponent = () => {
  const [data, setData] = useState([]); // Initialize state for storing the data
  const [newItem, setNewItem] = useState({ SeqNo: '', Place: '', Distance: '', lat: '', lng: '', Start: '', Stop: '', TravelCost:'', Date:''}); // Initialize state for new item
  const [editItem, setEditItem] = useState(null); // Initialize state for editing item
  const [search, setSearch] = useState(''); // Initialize state for storing the search input

  useEffect(() => { // Use the useEffect hook to fetch data when the component mounts
    fetchData();
  }, []); // The empty array means this effect runs once when the component mounts

  const handleSearch = (event) => { // Function to handle search input changes
    setSearch(event.target.value); // Update the search state with the new input
  };

  const filteredData = data.filter((item) => { // Filter the data based on the search input
    return item.Place.toLowerCase().includes(search.toLowerCase()); // Case-insensitive search
  });
  
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
        setNewItem({ SeqNo: '', Place: '', Distance: '', lat: '', lng: '', Start: '', Stop: '', TravelCost:'', Date:'' }); // Reset the new item state
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
    <input type="text" value={search} onChange={handleSearch} placeholder="Search by place" /> {/* Search input */}
      <ul> {/* Start of the list */}
        {(Array.isArray(filteredData) && filteredData.length > 0) ? (
          filteredData.map((item, index) => ( // Map over the filteredData array
            <li key={index}> {/* Create a list item for each filteredData item */}
              {/* Display the filteredData item properties */}
              {/* Replace 'property1', 'property2', etc. with your actual property names */}
              {item.SeqNo}, {item.Place}, {item.Distance}, {item.lat}, {item.lng}, {item.Start}, {item.Stop}, {item.TravelCost}, {item.Date}
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
        <input
          type="text"
          placeholder="Latitude"
          value={newItem.lat}
          onChange={(e) => setNewItem({ ...newItem, lat: e.target.value })}
        />
                <input
          type="text"
          placeholder="Longitude"
          value={newItem.lng}
          onChange={(e) => setNewItem({ ...newItem, lng: e.target.value })}
        />
        <input
          type="text"
          placeholder="Start"
          value={newItem.Start}
          onChange={(e) => setNewItem({ ...newItem, Start: e.target.value })}
        />
        <input
          type="text"
          placeholder="Stop"
          value={newItem.Stop}
          onChange={(e) => setNewItem({ ...newItem, Stop: e.target.value })}
        />
        <input
          type="text"
          placeholder="TravelCost"
          value={newItem.TravelCost}
          onChange={(e) => setNewItem({ ...newItem, TravelCost: e.target.value })}
        />
        <input
          type="text"
          placeholder="Date"
          value={newItem.Date}
          onChange={(e) => setNewItem({ ...newItem, Date: e.target.value })}
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
           <input
          type="text"
          placeholder="Latitude"
          value={newItem.lat}
          onChange={(e) => setEditItem({ ...newItem, lat: e.target.value })}
        />
                <input
          type="text"
          placeholder="Longitude"
          value={newItem.lng}
          onChange={(e) => setEditItem({ ...newItem, lng: e.target.value })}
        />
        <input
          type="text"
          placeholder="Start"
          value={newItem.Start}
          onChange={(e) => setEditItem({ ...newItem, Start: e.target.value })}
        />
        <input
          type="text"
          placeholder="Stop"
          value={newItem.Stop}
          onChange={(e) => setEditItem({ ...newItem, Stop: e.target.value })}
        />
        <input
          type="text"
          placeholder="TravelCost"
          value={newItem.TravelCost}
          onChange={(e) => setEditItem({ ...newItem, TravelCost: e.target.value })}
        />
        <input
          type="text"
          placeholder="Date"
          value={newItem.Date}
          onChange={(e) => setEditItem({ ...newItem, Date: e.target.value })}
        />
          <button type="submit">Update</button>
        </form>
      )}
      {data.length > 0 && (
        <MapContainer center={[data[0].lat, data[0].lng]} zoom={13} style={{ height: "100vh", width: "100%" }}> {/* Map container */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          /> {/* Tile layer */}
          {data.map((item, index) => ( // Map over the data array
            <Marker key={index} position={[item.lat, item.lng]}> {/* Marker for each data item */}
                <Popup>
                    SeqNo: {item.SeqNo}, {item.Place}, {item.Start}, {item.Stop}, {item.TravelCost}, {item.Date} {/* Popup with data item properties */}
                </Popup>
            </Marker>
          ))}
            {/* Draw lines between markers */}
            {data.map((item, index) => {
                            if (index < data.length - 1) {
                                const startPoint = [data[index].lat, data[index].lng];
                                const endPoint = [data[index + 1].lat, data[index + 1].lng];
                                const linePoints = [startPoint, endPoint];

                                return <Polyline key={index} positions={linePoints} color="blue" />;
                            }
                            return null;
                        })}
        </MapContainer>
      )}
    </div>
  );
};

export default TripComponent; // Export the App component