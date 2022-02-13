import React, {useEffect, useState, Fragment} from 'react';
import {connect} from 'react-redux'

import IconButton from '../../common/IconButton/_IconButton'
import Table from './_Table'
import DetailsModal from '../reporting/detailsModal/DetailsModal';
import {getScanner, getFilterOptions, fetchFilteredData} from '../../../actions/scanner'
import FilterModal from './filterModel/FilterModal'

const FILTERFIELDS = {
  // Price: {
  //   type: {
  //     label: "This",
  //     value: "noFilter"
  //   },
  //   value: "",
  //   name: "orThis",
  //   dataType: "number",
  //   accessor: "price"
  // },
  Exchange: {
    type: {
      label: "Don't Filter",
      value: "noFilter"
    },
    value: "",
    name: "Exchange",
    dataType: "array",
    accessor: "exchangeShortName"
  },
  Sector: {
    type: {
      label: "Don't Filter",
      value: "noFilter"
    },
    value: "",
    name: "Sector",
    dataType: "array",
    accessor: "sector"
  },
  // Industry: {
  //   type: {
  //     label: "Don't Filter",
  //     value: "noFilter"
  //   },
  //   value: "",
  //   name: "Industry",
  //   dataType: "array",
  //   accessor: "industry",
  //   dependency: 'exchangeShortName'
  // },

}


const  Scanner2 = ({scanner: {loading, list, filterOptions}, getScanner, getFilterOptions, fetchFilteredData}) => {
  
  //use effect for coustom comp
  useEffect(() => {
    getScanner()
    getFilterOptions(FILTERFIELDS)
  },[])

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
    {
      reactComponent: true,
      label: 'Actions',
      className: "Marketplace__actions",
      render: (item) => (
        <div style={{display: 'flex'}}>
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
            // onClickFunc={() => likeItem(item._id)}
          />
          <IconButton placement='bottom'
            tooltipContent='Trash'
            id='property-details-tooltip'
            iconClass='fas fa-trash'
            variant='action-button'
            onClickFunc={() => removeItem(item._id)}
          />
        </div>
      )
    }
  ]

  const [selectedCompany, setSelectedCompany] = useState({});
  const [showModal, setShowModal] = useState({show: false, load: false});
  const [hit, punch] = useState()

  //filter
  const [showFilterModal, setShowFilterModal] = useState(false)
  //const [selectedFilter, setSelectedFilter] = useState(undefined)
  

  
  const submitFilterModal = async (selectedFilters) => {
    console.log('submit filter: ', selectedFilters)
    //setSelectedFilter(undefined)
    fetchFilteredData(selectedFilters)
    //.then(r => {})
  }

  
  const startShowDetailFlow = (company) => {
    setSelectedCompany(company);
    setShowModal({show: true, load: true});
  }

  const closeModal = () => {
    setShowModal({show:false, load: false});
    setSelectedCompany({});
  }

  const handleClickRow = (event, name) => {
    console.log('running handle click ')
    console.log(event, name)
  };

  const removeItem = (res) => {
    console.log('running remove item')
    console.log(res)
    console.log('hit: ', hit)
    punch(res)
  }
  
  return loading ? (<div>loading...</div>) : (
    <div>
      <div>
        <Table
          headers={headers}
          list = {list}
          handleClickRow={startShowDetailFlow}
          removeItem={removeItem}
          hit={hit}
          showFilterModal = {(x) => setShowFilterModal(x)}
        />
        {selectedCompany && (
          <DetailsModal showModal={showModal.show} load={showModal.load} closeModal={closeModal} company={selectedCompany} />
        )}
      </div>
        <FilterModal
          show={showFilterModal}
          filterFields={FILTERFIELDS}
          options={filterOptions}
          handleClose={() => setShowFilterModal(false)}
          onSubmit={submitFilterModal}
        />
    </div>
  )
}

const mapStateToProps = state => ({
  scanner: state.scanner
})


export default connect(mapStateToProps, {getScanner, getFilterOptions, fetchFilteredData})(Scanner2)
