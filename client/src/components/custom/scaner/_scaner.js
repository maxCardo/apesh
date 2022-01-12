import React, {useEffect} from "react";
import {connect} from 'react-redux'

import {getScanner} from '../../../actions/scanner'

const Scanner = ({scanner: {loading, list}, getScanner}) => {
    
    useEffect(() => {
        getScanner()
    },[])
    
    return loading ? (<div>...loading</div>) : (
        <div>
            <h1>Hello Scanner</h1>
            {console.log(list)}
        </div>
    )
}

const mapStateToProps = state => ({
    scanner: state.scanner
})
  
export default connect(mapStateToProps, {getScanner})(Scanner);
  