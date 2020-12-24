import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux'
import Table from '../../common/Table/_Table'
import IconButton from '../../common/IconButton/_IconButton'
import './style.css'
import {getWatchlist, removeItem} from '../../../actions/watchlist'


const Watchlist = ({watchlist: {loading, list}, getWatchlist, removeItem}) => {
  
  useEffect(() => {
    getWatchlist()
    
  },[])

  const testFunc = (i) => {
    console.log('running test func');
    console.log(i);
  }

  const headers = [
    {
      label: 'Date Added',
      accessor: 'dateAdded',
      mapper: 'date'
    },
    {
      label: 'List',
      accessor: 'list'
    },
    {
      label: 'symbol',
      accessor: 'symbol'
    },
    {
      label: 'value',
      accessor: 'value',
      mapper: 'money'
    },
    {
      label: 'Price',
      accessor: 'price',
      mappper: 'money'
    },
    {
      reactComponent: true,
      label: 'Actions',
      className: "Marketplace__actions",
      render: (item) => (
        <div>
          <IconButton placement='bottom'
            tooltipContent='Like'
            id='property-details-tooltip'
            iconClass='fas fa-list'
            variant='action-button'
            onClickFunc={() => removeItem(item._id)}
          />
          <IconButton placement='bottom'
            tooltipContent='Trash'
            id='property-details-tooltip'
            iconClass='fas fa-link'
            variant='action-button'
            onClickFunc={() => {
              console.log('hit second button');
            }}
          />
        </div>
      )
    }
  ]

  return loading ?(
    <div>loading...</div>
  ):(
    <div className = 'tableWithActions'>  
      <Table
        //key={tablePageSize}
        //pageSize={tablePageSize}
        sorting={true}
        fontSize={12}
        data={list}
        headers={headers}
      //onClickRow={(item) => startShowDetailFlow(item)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  watchlist: state.watchlist
})

export default connect(mapStateToProps, {getWatchlist, removeItem})(Watchlist);
