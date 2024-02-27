import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const TripMap = ({ data }) => {
    return (
        <div>
            {/* Map */}
            <MapContainer center={[9.9656, 76.2422]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Your markers here */}
            </MapContainer>
        </div>
    );
    }
export default TripMap;
