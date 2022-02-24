import React, {useEffect, useState, Fragment} from 'react';
import {connect} from 'react-redux'

import IconButton from '../../common/IconButton/_IconButton'
import Table from './_Table'
import DetailsModal from '../reporting/detailsModal/DetailsModal';
import {getScanner, getFilterOptions, fetchFilteredData, submitSaveFilter, getSavedFilters, removeItem} from '../../../actions/scanner'
import {setAlert} from '../../../actions/alert'
import FilterModal from './filterModel/FilterModal'
import VarifyMod from './VerifyMod';
import { LegendOrientations } from '@carbon/charts/interfaces';

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
  //filter by date is not yet incorperated 
  // Reporting: {
  //   type: {
  //     label: "Don't Filter",
  //     value: "noFilter"
  //   },
  //   value: "",
  //   name: "Reporting",
  //   dataType: "date",
  //   accessor: "nextReporting.daysTo"
  // },
  Cash_Dept: {
    type: {
      label: "Don't Filter",
      value: "noFilter"
    },
    value: "",
    name: "Cash to Debt",
    dataType: "number",
    accessor: "cashDebtRatio"
  },
  PE_Ratio: {
    type: {
      label: "Don't Filter",
      value: "noFilter"
    },
    value: "",
    name: "Price to Earnings",
    dataType: "number",
    accessor: "peRatio"
  },
  Price: {
    type: {
      label: "Don't Filter",
      value: "noFilter"
    },
    value: "",
    name: "Price",
    dataType: "number",
    accessor: "price"
  },
  Industry: {
    type: {
      label: "Don't Filter",
      value: "noFilter"
    },
    value: "",
    name: "Industry",
    dataType: "array",
    accessor: "industry",
    dependency: 'sector'
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
}


const  Scanner2 = ({scanner: {loading, list, savedFilters, filterOptions, activeFilter, selected}, getScanner, getFilterOptions, fetchFilteredData, submitSaveFilter, getSavedFilters, removeItem, setAlert}) => {
  

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
            onClickFunc={() => removeListItem(item._id)}
          />
        </div>
      )
    }
  ]

  const [selectedCompany, setSelectedCompany] = useState({});
  const [showModal, setShowModal] = useState({show: false, load: false});

  //filter
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showVarMod, setShowVarMod] = useState(false)
  //const [selectedFilter, setSelectedFilter] = useState(undefined)
  

  //use effect for coustom comp
  useEffect(() => {
    getScanner()
    getFilterOptions(FILTERFIELDS)
    getSavedFilters()
  },[])

  const submitFilterModal = async (selectedFilters) => {
    console.log('submit filter: ', selectedFilters)
    //setSelectedFilter(undefined)
    fetchFilteredData({filters:selectedFilters})
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

  const removeListItem = (res) => {
    if (!selected) {
      const msg = 'You must have a saved active filter engaged in order to blacklist a record'
      setAlert(msg, 'scanner2', 'fail', 'Error', true)
    }else {
      removeItem({item_id: res, filter_id: selected._id})
    }
  }
  
  return loading ? (<div>loading...</div>) : (
    <div>
      <div>
        <Table
          headers={headers}
          list = {list}
          handleClickRow={startShowDetailFlow}
          removeItem={removeItem}
          showFilterModal = {(x) => setShowFilterModal(x)}
          savedFilters = {savedFilters}
          activeFilter = {activeFilter}
          saveFilter = {() => setShowVarMod(true)}
          selectedFilter = {selected}
          onFilterSelect={fetchFilteredData}
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
        <VarifyMod
          show={showVarMod}
          handleClose={() => setShowVarMod(false)}
          handleSubmit={(name) => submitSaveFilter(name, activeFilter)}
        />
    </div>
  )
}

const mapStateToProps = state => ({
  scanner: state.scanner
})


export default connect(mapStateToProps, {getScanner, getFilterOptions, fetchFilteredData, submitSaveFilter, getSavedFilters, removeItem, setAlert})(Scanner2)
