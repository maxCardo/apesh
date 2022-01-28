import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import Table from './_Table'
import DetailsModal from '../reporting/detailsModal/DetailsModal';
import {getScanner} from '../../../actions/scanner'


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
  
  //use effect for coustom comp
  useEffect(() => {
    getScanner()
  },[])

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

  const handleClickRow = (event, name) => {
    console.log('running handle click ')
    console.log(event, name)
  };

  return loading ? (<div>loading...</div>) : (
    <div>
        <Table
        headers={headers}
        list = {list}
        handleClickRow={startShowDetailFlow}
      />
        {selectedCompany && (
          <DetailsModal showModal={showModal.show} load={showModal.load} closeModal={closeModal} company={selectedCompany} />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  scanner: state.scanner
})


export default connect(mapStateToProps, {getScanner})(Scanner2)
