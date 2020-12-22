import React, {Fragment, useEffect} from 'react';
import Table from '../../common/Table/_Table'
import headers from './headers'




const Watchlist = () => {
  return (
    <Fragment>
      <div>
        <p>this is the watchlist page</p>
      </div>
      <div>
        <Table
          //key={tablePageSize}
          //pageSize={tablePageSize}
          sorting={true}
          fontSize={12}
          data= {data}
          headers={headers}
          //onClickRow={(item) => startShowDetailFlow(item)}
        />
      </div>

    </Fragment>
  );
};

export default Watchlist;
