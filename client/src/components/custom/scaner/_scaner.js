import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import FilterWrapper from '../../common/filterWrapper/FilterWrapper'
import Table from '../../common/newTable/Table'

import IconButton from '../../common/IconButton/_IconButton'

import DetailsModal from '../reporting/detailsModal/DetailsModal';
import {removeItem} from '../../../actions/filteredData'
import {exportCSV} from '../../../actions/scanner'
import {setAlert} from '../../../actions/alert'
import { getData } from '../../common/newTable/scripts';


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


const  Scanner = ({scanner: {list, savedFilters, activeFilter, selected}, removeItem, setAlert, exportCSV}) => {
  

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
            onClickFunc={() => removeListItem([item._id])}
          />
        </div>
      )
    }
  ]

  const csvFormat = [
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

  //details model onselect cell
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

  //alter css on MUI table to make header non sticky when filter is active
  const [sticky, setSticky] = useState(true)
  useEffect(() => {
    setSticky(true)
  },[list])
  
  //custome function(s) implemented on headers 
  const removeListItem = (res) => {
    if (!selected) {
      const msg = 'You must have a saved active filter engaged in order to blacklist a record'
      setAlert(msg, 'scanner2', 'fail', 'Error', true)
    }else {
      const ids = res.map(x => x._id)
      removeItem('company',{item_id: ids, filter_id: selected._id})
    }
  }

  const addToWatchList = () => {
    console.log('multi add to watchlist')
  }

  const exportToCSV = async (data) => {
    console.log('running export csv', data)
    const dataFormated = data.map(async record => {
      let dataObj ={}
      csvFormat.forEach(key => {
        dataObj[key.label] = getData(record, key)    
      })
      
      return dataObj
    })
    const promise = await Promise.all(dataFormated)
    exportCSV(promise)
  }
  
   
  const bulkActions = [
    {
      Action: 'Add To Watchlist',
      icon: 'far fa-eye',
      function: () => addToWatchList()
    },
    {
      Action: 'Export to CSV',
      icon: 'fas fa-file-csv',
      function: (e) => exportToCSV(e)
    },
    {
      Action: 'Delete',
      icon: 'fas fa-trash-alt',
      function: (e) => removeListItem(e)
    } 
  ]

  
  return (
    <div>
      <FilterWrapper
        dataModel = 'company'
        numSelected
        filterActive = {() => setSticky(!sticky)}
        filterFields = {FILTERFIELDS}
        // showFilterModel
        filter= {activeFilter}
        //saveFilter= {() => setShowVarMod(true)}
        selected = {selected}
        savedFilters = {savedFilters}
        bulkActions = {bulkActions}
      >

        <div>
          <Table
            headers={headers}
            list = {list}
            handleClickRow={startShowDetailFlow}
            sticky = {sticky}
          />
          {selectedCompany && (
            <DetailsModal showModal={showModal.show} load={showModal.load} closeModal={closeModal} company={selectedCompany} />
          )}
        </div>
      </FilterWrapper>
    </div>
  )
}

const mapStateToProps = state => ({
  scanner: state.scanner
})


export default connect(mapStateToProps, {removeItem, setAlert,exportCSV})(Scanner)
