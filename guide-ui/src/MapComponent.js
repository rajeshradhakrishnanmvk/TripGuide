// JavaScript (React)
import React from 'react'; // Import React
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import react-leaflet components

const MapComponent = () => {
    const position = [8.1386, 5.1026];
    const zoomLevel = 15;
   
    return (
        <div>
      <MapContainer zoom={zoomLevel} center={position} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            Omu-Aran the Head Post of Igbomina land, 
            is a town in the Nigerian state of Kwara. 
            It originated from Ife and currently the local
            government headquarters of Irepodun local government.
          </Popup>
        </Marker>
      </MapContainer>
      </div>
    );
};

export default MapComponent; // Export the MapComponent