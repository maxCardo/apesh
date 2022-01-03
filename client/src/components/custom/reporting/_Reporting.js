import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import Table from '../../common/Table/_Table'
import IconButton from '../../common/IconButton/_IconButton'
import DetailsModal from './detailsModal/DetailsModal'
import './style.css'
import {getReporting} from '../../../actions/reporting'


const Reporting = ({reporting: list, loading, getReporting}) => {


  useEffect(() => {
    getReporting()
    
  },[])

  const headers = [
    {
      label: 'Like',
      accessor: 'hot',
      mapper: (data) => data === true ? 
      <div>
          <i className='fas fa-star' style={{ fontSize: 15, color: '#6f9dd4' }}></i>
      </div> :
      <div>
          <i className='far fa-star' style={{ fontSize: 15, color: '#6f9dd4' }}></i>
      </div>      
    },
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
      label: 'Reporting',
      accessor: 'nextReporting.date',
      mapper: 'date'
    },
    {
      label: 'Current Price',
      accessor: 'price',
      mapper: 'money'
    },
    {
      reactComponent: true,
      label: 'Value',
      render: (item) => (
        <div>
          <p>{`$${item.valuation[0].currentValue.toFixed(2)}`}</p>
        </div>
      )
    },
    {
      reactComponent: true,
      label: 'Upside',
      render: (item) => (
        <div>
          <p>{`${(item.valuation[0].currentValue - item.price).toFixed(2)} / ${(((item.valuation[0].currentValue - item.price)/item.price)*100).toFixed(1)}%`}</p>
        </div>
      )
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
            iconClass='fas fa-thumbs-up'
            variant='action-button'
            //onClickFunc={() => likeItem(item._id)}
          />
          <IconButton placement='bottom'
            tooltipContent='Trash'
            id='property-details-tooltip'
            iconClass='fas fa-trash'
            variant='action-button'
            //onClickFunc={() => removeItem(item._id)}
          />
        </div>
      )
    }
  ]

  const [selectedCompany, setSelectedCompany] = useState({});
  const [showModal, setShowModal] = useState({show: false, load: false});

  const startShowDetailFlow = (company) => {
    setSelectedCompany(company);
    setShowModal({show: true, load: true});
  }

  const closeModal = () => {
    setShowModal({show:false, load: false});
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
          <DetailsModal showModal={showModal.show} load={showModal.load} closeModal={closeModal} company={selectedCompany} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  reporting: state.watchlist.reporting,
  loading: state.watchlist.loading
})

export default connect(mapStateToProps, {getReporting})(Reporting);
