import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Paper,
  Link, 
  IconButton
} from '@mui/material';
import { Undo, Redo, Settings } from '@mui/icons-material';
import TripMapComponent from './TripMap/TripMapComponent'; // Adjust the path based on your project structure
import TimelineComponent from './Timeline/TimelineComponent'
import TripTableComponent from './TripTable/TripTableComponent'; // Adjust the path based on your project structure
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const App = () => {
  const dummyData = React.useMemo(() => [
    {
      SeqNo: 1,
      Place: "Fort Kochi",
      Distance: 5,
      lat: 9.9656,
      lng: 76.2422,
      Start: "Morning",
      Stop: "Afternoon",
      TravelCost: 50,
      Date: "2024-02-21"
    },
    {
      SeqNo: 2,
      Place: "Mattancherry Palace",
      Distance: 3,
      lat: 9.9665,
      lng: 76.2596,
      Start: "Afternoon",
      Stop: "Evening",
      TravelCost: 30,
      Date: "2024-02-21"
    },
    {
      SeqNo: 3,
      Place: "Chinese Fishing Nets",
      Distance: 2,
      lat: 9.9667,
      lng: 76.2422,
      Start: "Evening",
      Stop: "Night",
      TravelCost: 20,
      Date: "2024-02-21"
    },
    {
      SeqNo: 4,
      Place: "Marine Drive",
      Distance: 6,
      lat: 9.9647,
      lng: 76.2423,
      Start: "Night",
      Stop: "Late Night",
      TravelCost: 40,
      Date: "2024-02-21"
    },
    {
      SeqNo: 5,
      Place: "Kochi Backwaters",
      Distance: 8,
      lat: 9.9665,
      lng: 76.3183,
      Start: "Late Night",
      Stop: "Midnight",
      TravelCost: 60,
      Date: "2024-02-21"
    }
  ], []);

  const columns = [
    { Header: 'SeqNo', accessor: 'SeqNo' },
    { Header: 'Place', accessor: 'Place' },
    { Header: 'Distance', accessor: 'Distance' },
    { Header: 'lat', accessor: 'lat' },
    { Header: 'lng', accessor: 'lng' },
    { Header: 'Start', accessor: 'Start' },
    { Header: 'Stop', accessor: 'Stop' },
    { Header: 'TravelCost', accessor: 'TravelCost' },
    { Header: 'Date', accessor: 'Date' },
  ];

  return (
    <Container>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            {/* First Section */}
            <Grid item>
              <Typography variant="h6">Plan My Trip</Typography>
            </Grid>

            {/* Second Section */}
            <Grid item>
              <Grid container alignItems="center">
                {/* First Row */}
                <Grid item>
                  <Button startIcon={<Undo />} color="inherit" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', marginRight: '10px' }}>
                    Undo
                  </Button>
                  <Button startIcon={<Redo />} color="inherit" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', marginRight: '10px' }}>
                    Redo
                  </Button>
                </Grid>

                {/* Second Row */}
                <Grid item>
                  <Typography variant="body2" style={{ marginRight: '10px' }}>5 places visited out of 10</Typography>
                </Grid>
                <Grid item>
                  <Button startIcon={<Settings />} color="inherit" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
                    Settings
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Grid container spacing={3}>
        {/* Left Column with Chrono */}
        <Grid item xs={3}>
          <Paper style={{ padding: '20px' }}>
            <TimelineComponent data={dummyData} />
            <Box mt={2}>
              <Button variant="contained" color="primary" fullWidth>
                Open
              </Button>
              <Button variant="contained" color="secondary" fullWidth style={{ marginTop: '10px' }}>
                Save
              </Button>
              <Button variant="contained" fullWidth style={{ marginTop: '10px' }}>
                HippoCampus
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column with Table and Map */}
        <Grid item xs={9}>
          <Grid container spacing={3}>
            {/* First Subcolumn with Table */}
            <Grid item xs={6}>
              <Paper style={{ padding: '20px', height: '100%' }}>
                <TripTableComponent data={dummyData} columns={columns} />
              </Paper>
            </Grid>

            {/* Second Subcolumn with Map */}
            <Grid item xs={6}>
              <Paper style={{ padding: '20px', height: '100%' }}>
                <TripMapComponent data={dummyData} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <AppBar position="static" color="default" style={{ marginTop: '20px' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" component={Link} href="https://www.facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://www.twitter.com">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} href="https://www.instagram.com">
                <InstagramIcon />
              </IconButton>
            </Box>
            <Typography variant="body2">Bhadra Stores</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default App;
