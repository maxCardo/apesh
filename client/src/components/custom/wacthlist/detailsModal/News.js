import React from 'react'

import Table from '../../../common/Table/_Table'


const News = ({news}) => {

    const headers = [
        {
            label: 'Date',
            accessor: 'publishedDate'
        },
        {
            label: 'From',
            accessor: 'site'
        },
        {
            label: 'Title',
            accessor: 'title'
        }
    ]
    
    return <Table
        //key={tablePageSize}
        //pageSize={tablePageSize}
        sorting={true}
        fontSize={12}
        data={news}
        headers={headers}
        //onClickRow={(item) => startShowDetailFlow(item)}
    />
}

export default News