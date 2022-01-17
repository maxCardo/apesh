import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {getScanner} from '../../../actions/scanner'


const Scanner = ({scanner: {loading, list}, getScanner}) => {
  
  const [firstLine, setFirstLine] = useState([])
  
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

  const getData = function (dataItem, header) {
    if (!dataItem || !header) return null
    if (header.reactComponent) {
        return header.render(dataItem)
    } else {
        const { accessor } = header
        if (accessor.includes('.')) {
            const accessorsArray = accessor.split('.')
            let item = dataItem;
            accessorsArray.forEach((accessor) => {
                if (item) {
                    item = item[accessor]
                }
            })
            return item
        } else {
            return dataItem[accessor]
        }
    }
  };
    
  
    useEffect(() => {
        getScanner()
        headers.forEach((header) => {
          console.log('header:', header.accessor)
        }
        )
    },[])

    
    
    return loading ? (<div>...loading</div>) : (
        <TableContainer component={Paper}>
          {console.log(firstLine)}
          {console.log(list)}

        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <TableCell padding = 'checkbox' align="left" key={i}>{header.label}</TableCell>
              ))}
              {/* <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((tikr) => (
              <TableRow key={tikr.symbol} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {headers.map(header => (
                  <TableCell align="left">{getData(tikr, header)}</TableCell>  
                ))}
                {/* <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
                <TableCell align="left">{row.carbs}</TableCell>
                <TableCell align="left">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

const mapStateToProps = state => ({
    scanner: state.scanner
})
  
export default connect(mapStateToProps, {getScanner})(Scanner);
  