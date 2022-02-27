import React, {useState, Fragment} from 'react'

//dep for filter comp
import Select from 'react-select'
import './style.css'


const FilterdToolbar = ({checkbox = true, dataModel, numSelected, filterActive, showFilterModal, filter, saveFilter, selected, savedFilters, onChange, clearFilter}) => {

  const handleFilterChange = (e) => {
    const {label, value: {filters, blacklist}} = e
    onChange(dataModel, e.value , {label: e.label, _id: e.value._id})    
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
           
            {
                numSelected > 0 ?
                <Fragment>
                <button onClick={exportCsv}>
                    <i className="fas fa-file-csv"></i>
                </button>
                <button onClick={recommendBatch}>
                    <i className="fas fa-star"></i>
                </button>
                </Fragment>
                :
                <button onClick={() => showFilterModal(true)}>
                <i className="fas fa-filter"></i>
                </button>
            }
            {/* {!checkbox && (
                <button onClick={toggleCheckFlow}>
                    <i className="fas fa-check-square"></i>
                </button>
            )} */}
            
            </div>
      </div>
    )
    
}


export default FilterdToolbar
