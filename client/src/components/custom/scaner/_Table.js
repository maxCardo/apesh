import React, {useEffect, useState} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {useStyles, useToolbarStyles} from './styles'
import {stableSort, getComparator, getData} from './scripts'
import TableHeader from './TableHeader';
import EnhancedToolbar from './EnhancedToolbar';
import FilterdToolbar from './FilterToolbar';


const  TableComp = ({headers, list, handleClickRow, _orderBy, checkbox = true, pagination = true, filter = true,  _rowsPerPage = 10, hit }) => {
  
  //state for table comp
  const classes = useStyles();
  const [tableData, setTableData] = useState([]) 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(_orderBy ? _orderBy : headers[0].accessor);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(_rowsPerPage);
  const [sticky, setSticky] = useState(true)

  useEffect(() => {
    console.log('running use effect in table')
    const data = list.map((rec) => {
      rec.isActive = true
      return rec
    })
    setTableData(data)
  },[])

  useEffect(() => {
    if (hit) {
      console.log('recording hit')
      console.log(hit)
      const n = tableData.filter(x => x._id != hit)
      setTableData(n)
      return
    } 
    console.log('hit object empty')
     
  },[hit])

  //funcs for table comp 
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.symbol);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  //@desc handle click for checkbox
  const handleClick = (event, name) => {
    console.log('handle Click')
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const toolbarStyles = useToolbarStyles()


//ToDo: work on dynamic function to determain amonnt of space needed: is this neccecery??
  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);
  const emptyRows = 0;

  //table props [pagination?, toolbar, denseity: small, medium, select   ]

  return (
    <div className={classes.root}>
      {console.log(tableData)}
      <Paper className={classes.paper}>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        
        {filter ? <FilterdToolbar numSelected={selected.length} filterActive={() => setSticky(!sticky)} checkbox/>: <EnhancedToolbar numSelected={selected.length} classes={toolbarStyles} /> }

        
        <TableContainer className={classes.container}>
       
          <Table 
            stickyHeader = {sticky}
            // sticky header creating issues with dropdown 
            aria-label="sticky table"
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHeader
              headers = {headers}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.symbol);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.symbol}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onChange={(event) => handleClick(event, row.symbol)}
                        />
                      </TableCell>
                      {
                        headers.map(header => (
                          <TableCell align="left" onClick={(event) => handleClickRow(row)}>
                            {getData(row, header)}
                          </TableCell>  
                        ))
                      }

                      {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.symbol}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
       
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default TableComp
