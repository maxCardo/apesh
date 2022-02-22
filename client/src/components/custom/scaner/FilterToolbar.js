import React, {useState, Fragment} from 'react'

//dep for filter comp
import Select from 'react-select'
import './style.css'


const FilterdToolbar = ({checkbox, numSelected, filterActive, showFilterModal, filter, saveFilter, selected, savedFilters, onChange}) => {

  const handleFilterChange = (e) => {
    console.log('handle Filter Change', e)
    const {label, value: {filters, blacklist}} = e
    console.log('label: ', label)
    console.log('filters: ', filters)
    console.log('blacklist: ', blacklist)
    onChange(e.value , {label: e.label, _id: e.value._id})    
  }

  const clearFilter = () => {
    console.log('clearFilter')
  }

  //checkbar
  const [checkFlowActive, setCheckFlowActice] = useState(false)

  const exportCsv = () => {
    console.log('exportCsv')
  }

      //component spacific
  const recommendBatch = () => {
    console.log('recomend batch')
  }

  const toggleCheckFlow = () => {
    console.log('toggle check flow')
  }

  const selectedTest = () => {
    console.log('selected test')
    filterActive()
  }
  



    return (
        <div className='searchContainer agentsSearchContainer'>
            <div style={{display: 'flex'}}>
            <Select
                className="marketplace__filter-select"
                onChange={e => handleFilterChange(e)}
                onFocus={selectedTest}
                onBlur={selectedTest}
                defaultValue="All"
                options={savedFilters}
                placeholder='Select Filter'
                value={selected}
            />
            {/* filter string can be added in the future.  */}
            {/* <input
                className='form-control searchInput'
                tabIndex={0}
                onChange={(e) => setFilterString(e.target.value)}
                placeholder='Search'
            /> */}
            </div>
            <div className='marketplace__filter-icons'>
            {filter.length ?
            <Fragment>
                {!selected &&
                <button onClick={saveFilter}>Save filter</button>
                }
                <button onClick={clearFilter}>Clear filter</button>
            </Fragment>
            : null}
            <button onClick={() => showFilterModal(true)}>
                <i className="fas fa-filter"></i>
            </button>
            {
                numSelected > 0 &&
                <Fragment>
                <button onClick={exportCsv}>
                    <i className="fas fa-file-csv"></i>
                </button>
                <button onClick={recommendBatch}>
                    <i className="fas fa-star"></i>
                </button>
                </Fragment>
            }
            {!checkbox && (
                <button onClick={toggleCheckFlow}>
                    <i className="fas fa-check-square"></i>
                </button>
            )}
            
            </div>
      </div>
    )
    
}


export default FilterdToolbar
