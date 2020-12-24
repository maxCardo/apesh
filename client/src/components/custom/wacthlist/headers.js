import React from 'react'
import IconButton from '../../common/IconButton/_IconButton'
import {removeItem} from '../../../actions/watchlist'


const headers = [
    {
        label: 'Date Added',
        accessor: 'dateAdded',
        mapper: 'date'
    },
    {
        label: 'List',
        accessor: 'list'
    },
    {
        label: 'symbol',
        accessor: 'symbol'
    },
    {
        label: 'value',
        accessor: 'value',
        mapper: 'money'
    },
    {
        label: 'Price',
        accessor: 'price',
        mappper: 'money'
    },
    {
        reactComponent: true,
        label: 'Actions',
        className: "Marketplace__actions",
        render: (item) => (
            <div>
                <IconButton placement='bottom'
                    tooltipContent='Like'
                    id='property-details-tooltip'
                    iconClass='fas fa-list'
                    variant='action-button'
                    onClickFunc={() => removeItem()}
                />
                <IconButton placement='bottom'
                    tooltipContent='Trash'
                    id='property-details-tooltip'
                    iconClass='fas fa-link'
                    variant='action-button'
                    onClickFunc={() => {
                        console.log('hit second button');
                    }}
                />
            </div>
        )
    }
]

export default headers

