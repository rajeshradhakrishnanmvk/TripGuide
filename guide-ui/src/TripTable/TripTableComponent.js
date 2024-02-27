import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Table, 
        TableBody, TableCell, 
        TableContainer, TableHead, 
        TableRow, Paper, Checkbox, Button } from '@mui/material';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const TripTableComponent = ({ columns, data }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedRows = data.map((row) => row.SeqNo);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" style={{ margin: '10px' }}>
        Add
      </Button>
      <StyledTable aria-label="trip table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                checked={data.length > 0 && selectedRows.length === data.length}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all trips' }}
              />
            </TableCell>
            {columns.map((column) => {
              return <TableCell key={column.Header}>{column.accessor}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const isRowSelected = isSelected(row.SeqNo);

            return (
              <TableRow
                key={row.SeqNo}
                hover
                onClick={(event) => handleRowClick(event, row.SeqNo)}
                role="checkbox"
                aria-checked={isRowSelected}
                selected={isRowSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isRowSelected} />
                </TableCell>

                {Object.values(row).map((value, index) => {
                  const key = `${row.SeqNo}-${index}`;
                  return <TableCell key={key}>{value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default TripTableComponent;
