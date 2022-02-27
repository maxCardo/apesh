import React , {useState, useEffect} from 'react'
import {connect} from 'react-redux' 

import FilterdToolbar from './FilterToolbar'
import FilterModal from './filterModel/FilterModal'
import VarifyMod from './VerifyMod'

import {getData, getFilterOptions, fetchFilteredData, submitSaveFilter, getSavedFilters, removeItem} from '../../../actions/filteredData'


const FilterWrapper = ({children, dataModel, filterActive, filterFields, filteredData: {loading, savedFilters, filterOptions, activeFilter, selected}, getData, getSavedFilters, getFilterOptions, fetchFilteredData }) => {
 
    const [showFilterModal, setShowFilterModal] = useState(false)

    useEffect(() => {
        console.log('running use effect on filterwrapper')
        getData(dataModel)
        getSavedFilters(dataModel)
        getFilterOptions(dataModel, filterFields)
    },[])

    return loading ? (<div>loading...</div>) : (
        <div>
            <FilterdToolbar
                dataModel = {dataModel}
                filterActive={filterActive}
                savedFilters = {savedFilters}
                onChange = {fetchFilteredData}
                filter = {activeFilter}
                selected= {selected}
                showFilterModal = {() => setShowFilterModal(true)}
                clearFilter = {() => getData(dataModel)}
            />
            {children}
            <FilterModal
                show={showFilterModal}
                filterFields={filterFields}
                options={filterOptions}
                handleClose={() => setShowFilterModal(false)}
                onSubmit={(e) => fetchFilteredData(dataModel, {filters: e})}
            />
            {/* <VarifyMod
            //   show={showVarMod}
            //   handleClose={() => setShowVarMod(false)}
            //   handleSubmit={(name) => submitSaveFilter(name, activeFilter)}
            /> */}

        </div>
    )
}

const mapStateToProps = state => ({
    filteredData: state.scanner
})


export default connect(mapStateToProps, {getData, getSavedFilters, getFilterOptions, fetchFilteredData})(FilterWrapper)