import React from 'react'

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
]

export default headers

