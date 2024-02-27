// JavaScript (React)
import React,{ useState }  from 'react'; // Import Reactand useState hook
import TripMapComponent from './TripMap/TripMapComponent'; // Adjust the path based on your project structure
import TimelineComponent from './Timeline/TimelineComponent'
import TripTableComponent from './TripTable/TripTableComponent'; // Adjust the path based on your project structure

const App = () => {
  const [input, setInput] = useState(''); // State for the input

  const handleInputChange = (event) => { // Function to handle input changes
    setInput(event.target.value); // Update the input state with the new input
  };

  const handleButtonClick = () => { // Function to handle button clicks
    // Your button click logic here
  };
   // Your data here
   const data = React.useMemo(() => [
    {
      SeqNo: '1',
      Place: 'Place1',
      Distance: '100',
      lat: '51.505',
      lng: '-0.09',
      Start: '9:00',
      Stop: '10:00',
      TravelCost: '10',
      Date: '2022-01-01',
    },
    {
      SeqNo: '2',
      Place: 'Place2',
      Distance: '10',
      lat: '51.505',
      lng: '-0.09',
      Start: '9:00',
      Stop: '10:00',
      TravelCost: '10',
      Date: '2022-01-01',
    },
  ], []);

  // Define columns based on your data structure
  const columns = [
    { Header: 'SeqNo', accessor: 'SeqNo' },
    { Header: 'Place', accessor: 'Place' },
    { Header: 'Distance', accessor: 'Distance' },
    { Header: 'Start', accessor: 'Start' },
    { Header: 'Stop', accessor: 'Stop' },
    { Header: 'TravelCost', accessor: 'TravelCost' },
    { Header: 'Date', accessor: 'Date' },
  ];

  return (
    <div style={{ display: 'flex' }}> {/* Main content */}
      <div style={{ marginRight: '1rem', width: '50%', display: 'flex' }}> {/* Left panel */}
      <div style={{ flex: 1 }}> {/* Left panel content */}
        <div>
          {/* Header section */}
          <div>
            <h1>PlanMyTrip</h1>
          </div>

          {/* Middle section */}
          <div>
            {/* Timeline with places in SeqNo */}
            <TimelineComponent data={data} />
          </div>

          {/* Footer section */}
          <div>
            {/* Functionalities */}
            <button>Open</button>
            <button>Save</button>
            <button>Help</button>
          </div>
        </div>
        </div>
        <div style={{ flex: 1 }}> {/* Right panel content */}
          {/* Data input */}
          <input type="text" value={input} onChange={handleInputChange} />
          {/* Settings */}
          <button onClick={handleButtonClick}>Apply Settings</button>
          {/* Render the DataTable component with the dummyData and columns */}
          <TripTableComponent data={data} columns={columns} />
        </div>
      </div>
      <div style={{ width: '50%' }}> {/* Right panel */}
        <TripMapComponent data={data} />
      </div>
    </div>
  );
};

export default App; // Export the App component