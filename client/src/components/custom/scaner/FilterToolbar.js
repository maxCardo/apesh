import React, {useState, Fragment} from 'react'

//dep for filter comp
import Select from 'react-select'
import './style.css'


const FilterdToolbar = ({checkbox, numSelected, filterActive}) => {

      //-------------  dep for filter comp ---------------------- //
  const [savedFilters, setSavedFilters] = useState([])
  const [selectedFilter, setSelectedFilter] = useState()
  const [showFilterModal, setShowFilterModal] = useState()
  const [filters, setFiltes] = useState(undefined)


  const handleFilterChange = () => {
    console.log('handle Filter Change')
    
  }
 
  const saveFilter = () => {
    console.log('saveFilter')
  }

  const clearFilter = () => {
    console.log('clearFilter')
  }

  //filter string function
  const setFilterString = () => {
    console.log('running setFilter string')
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

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const selectedTest = () => {
    console.log('selected test')
    filterActive()
  }
  



    return (
        <div className='searchContainer agentsSearchContainer'>
            <div style={{display: 'flex'}}>
            <Select
                className="marketplace__filter-select"
                onChange={handleFilterChange}
                onFocus={selectedTest}
                onBlur={selectedTest}
                defaultValue="All"
                // options={savedFilters}
                options={options}
                placeholder='Select Filter'
                value={selectedFilter}
            />
            <input
                className='form-control searchInput'
                tabIndex={0}
                onChange={(e) => setFilterString(e.target.value)}
                placeholder='Search'
            />
            </div>
            <div className='marketplace__filter-icons'>
            {filters &&
            <Fragment>
                {!selectedFilter &&
                <button onClick={saveFilter}>Save filter</button>
                }
                <button onClick={clearFilter}>Clear filter</button>
            </Fragment>
            }
            <button onClick={() => setShowFilterModal(true)}>
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
            {console.log('checkBox:', checkbox)}
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
