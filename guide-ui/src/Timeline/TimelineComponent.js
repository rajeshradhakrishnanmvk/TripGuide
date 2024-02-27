import React from 'react';
import { Chrono } from 'react-chrono';

const Timeline = ({ data }) => {
  const items = data.map((item) => ({
    title: item.Place,
    cardDetailedText: (
      <div>
        <p>Date: {item.Date}</p>
        <p>Start: {item.Start}</p>
        <p>Stop: {item.Stop}</p>
        <p>Travel Cost: {item.TravelCost}</p>
      </div>
    ),
  }));

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Chrono items={items} mode="VERTICAL_ALTERNATING" />
    </div>
  );
};

export default Timeline;
