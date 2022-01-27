import React, {useEffect} from 'react';
import {connect} from 'react-redux'

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

import {getScanner} from '../../../actions/scanner'
import {useStyles, useToolbarStyles} from './styles'
import {stableSort, getComparator, getData} from './scripts'
import TableHeader from './TableHeader';
import EnhancedToolbar from './EnhancedToolbar';

const headers = [
  {
    label: 'Company',
    accessor: 'companyName'
  },
  {
    label: 'symbol',
    accessor: 'symbol'
  },
  {
    label: 'Sector',
    accessor: 'sector'
  },
  {
    label: 'Industry',
    accessor: 'industry'
  },
  {
    label: 'value',
    accessor: 'value',
    mapper: 'money'
  },
  {
    label: 'Current Price',
    accessor: 'lastClose.price',
    mapper: 'money'
  },
]

const  Scanner2 = ({scanner: {loading, list}, getScanner}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getScanner()
    setOrderBy(headers[0].accessor)
  },[])

 
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.map((n) => n.symbol);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
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
    console.log(property, orderBy, order)
    const isAsc = orderBy === property && order === 'asc';
    console.log(isAsc)
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(property, orderBy, order)
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

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);
  const emptyRows = 0;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25,50, 100]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <EnhancedToolbar numSelected={selected.length} classes={useToolbarStyles()} />
        
        <TableContainer>
       
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <TableHeader
              headers = {headers}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={list.length}
            />
            <TableBody>
              {stableSort(list, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.symbol);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.symbol)}
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
                        />
                      </TableCell>
                      {
                        headers.map(header => (
                          <TableCell align="left">{getData(row, header)}</TableCell>  
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

const mapStateToProps = state => ({
  scanner: state.scanner
})


export default connect(mapStateToProps, {getScanner})(Scanner2)
