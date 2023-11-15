// JavaScript (React)
import React, { useState } from 'react';
import axios from 'axios';
import { ProgressBar, Table } from 'react-bootstrap';

const FileUpload = ({ onUpload }) => {
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    onUpload(formData);
  };

  return <input type="file" onChange={handleUpload} />;
};

const DataTable = ({ data }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {/* Replace with your actual column names */}
        <th>Column 1</th>
        <th>Column 2</th>
        {/* Add more columns as needed */}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {/* Replace with your actual column values */}
          <td>{row.column1}</td>
          <td>{row.column2}</td>
          {/* Add more columns as needed */}
        </tr>
      ))}
    </tbody>
  </Table>
);

const App = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState([]);

  const handleUpload = (formData) => {
    axios.post('/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
    })
    .then(() => axios.get('/data'))
    .then((response) => setData(response.data))
    .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <FileUpload onUpload={handleUpload} />
      <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
      <DataTable data={data} />
    </div>
  );
};

export default App;