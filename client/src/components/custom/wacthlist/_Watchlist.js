import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux'
import Table from '../../common/Table/_Table'
import headers from './headers'
import {getWatchlist} from '../../../actions/watchlist'
import watchlist from '../../../reducers/watchlist';


const Watchlist = ({watchlist: {loading, list}, getWatchlist}) => {
  
  useEffect(() => {
    getWatchlist()
    
  },[])

  return loading ?(
    <div>loading...</div>
  ):(
    <Fragment>
      <div>
        <p>this is the watchlist page</p>
      </div>
      <div className= 'col-12 p-0'>
        <Table
          //key={tablePageSize}
          //pageSize={tablePageSize}
          sorting={true}
          fontSize={12}
          data= {list}
          headers={headers}
          //onClickRow={(item) => startShowDetailFlow(item)}
        />
      </div>

    </Fragment>
  );
};

const mapStateToProps = state => ({
  watchlist: state.watchlist
})

export default connect(mapStateToProps, {getWatchlist})(Watchlist);
