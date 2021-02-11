import React from 'react'

import Table from '../../../common/Table/_Table'
import IconButton from '../../../common/IconButton/_IconButton'


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
        },
        {
            label: 'Title',
            accessor: 'title'
        },

        {
            reactComponent: true,
            label: 'Actions',
            className: "Marketplace__actions",
            render: (item) => (
                <div>  
                    <IconButton placement='bottom'
                        tooltipContent='View On Site'
                        id='link-tooltip'
                        iconClass='fas fa-link'
                        variant='link'
                        href={`${item.url}`}
                    />
                    
                </div>
            )
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