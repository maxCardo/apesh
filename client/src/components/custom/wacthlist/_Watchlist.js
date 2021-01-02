import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import Table from '../../common/Table/_Table'
import IconButton from '../../common/IconButton/_IconButton'
import DetailsModal from "./DetailsModal";
import './style.css'
import {getWatchlist, removeItem, likeItem} from '../../../actions/watchlist'


const Watchlist = ({watchlist: {loading, list}, getWatchlist, removeItem, likeItem}) => {


  useEffect(() => {
    getWatchlist()
    
  },[])

  const headers = [
    {
      label: 'Like',
      accessor: 'hot',
      mapper: (data) => data === true ? 'true' : 'false'
    },
    {
      label: 'Company',
      accessor: 'company.companyName'
    },
    {
      label: 'symbol',
      accessor: 'symbol'
    },
    {
      label: 'Sector',
      accessor: 'company.sector'
    },
    {
      label: 'Industry',
      accessor: 'company.industry'
    },
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
      label: 'POA',
      accessor: 'priceWhenAdded'
    },
    {
      label: 'value',
      accessor: 'value',
      mapper: 'money'
    },
    {
      label: 'Current Price',
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
                      tooltipContent='Details'
                      id='property-details-tooltip'
                      iconClass='fas fa-cube'
                      variant='action-button'
                      onClickFunc={() => startShowDetailFlow(item)}
          />
          <IconButton placement='bottom'
            tooltipContent='Like'
            id='property-details-tooltip'
            iconClass='fas fa-star'
            variant='action-button'
            onClickFunc={() => likeItem(item._id)}
          />
          <IconButton placement='bottom'
            tooltipContent='Trash'
            id='property-details-tooltip'
            iconClass='fas fa-link'
            variant='action-button'
            onClickFunc={() => removeItem(item._id)}
          />
        </div>
      )
    }
  ]

  const [selectedCompany, setSelectedCompany] = useState({});
  const [showModal, setShowModal] = useState(false);

  const startShowDetailFlow = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany({});
  }



  return loading ?(
    <div>loading...</div>
  ):(
    <div className='tableWithActions relative'>
      <Table
        //key={tablePageSize}
        //pageSize={tablePageSize}
        sorting={true}
        fontSize={12}
        data={list}
        headers={headers}
        onClickRow={(item) => startShowDetailFlow(item)}
      />
      {selectedCompany && (
          <DetailsModal showModal={showModal} closeModal={closeModal} company={selectedCompany} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  watchlist: state.watchlist
})

export default connect(mapStateToProps, {getWatchlist, removeItem, likeItem})(Watchlist);
