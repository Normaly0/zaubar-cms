import React from 'react';
import {useTable, useExpanded} from 'react-table';
import './table.scss';

export default function Table({ columns, data}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { expanded }
    } = useTable({columns, data}, useExpanded);

    return (
        <table {...getTableProps()} className = "table">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}


const columns = useMemo(
    () => [
        {
            // Build our expander column
            id: 'expander', // Make sure it has an ID
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {/* {isAllRowsExpanded ? '🢃' : '🢂'} */}
              </span>
            ),
            Cell: ({ row }) =>
              // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
              // to build the toggle for expanding a row
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      // We can even use the row.depth property
                      // and paddingLeft to indicate the depth
                      // of the row
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? '🢃' : '🢂'}
                </span>
              ) : null,
          },
        {
            Header: "Tours",
            columns: [
                {
                    Header: "Tour Name",
                    accessor: "Tour_title"
                },
                {
                    Header: "Date Created",
                    accessor: "date_created"
                },
                {
                    Header: "Date Updated",
                    accessor: "date_updated"
                },
                {
                    Header: "Stations",
                    accessor: "Stations.length"
                },
            ]
        }
    ]
    )