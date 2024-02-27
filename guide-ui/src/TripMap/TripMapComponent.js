import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

const TripMap = ({ data }) => {
    return (
        <div>
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
    }
export default TripMap;
