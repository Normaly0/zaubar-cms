import { React, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './dashboard.scss';
import Table from './table';

const fields = "?fields=Tour_title,date_created,date_updated,Stations,Stations.Station_id.station_title,Stations.Station_id.date_created,Stations.Station_id.thumbnail,Stations.Station_id.Scenes,Stations.Station_id.Scenes.Scene_id.scene_title"

function sortData(json) {
    let arr = [];

    json.forEach((el, index) => {
        arr.push({});
        Object.keys(el).forEach(key => (key === "Stations") 
        ? arr[index][key] = (() => {
            let stationArr = [];
            el[key].forEach((el, index) => {
                stationArr.push({});
                Object.keys(el.Station_id).forEach(key => (key === "Scenes") 
                ? stationArr[index][key] = (() => {
                    let sceneArr = [];
                    el.Station_id[key].forEach((el, index) => {
                        sceneArr.push({});
                        Object.keys(el.Scene_id).forEach(key => sceneArr[index][key] = el.Scene_id[key])
                    })
                    return sceneArr;
                })()
                : stationArr[index][key] = el.Station_id[key])
            })
            return stationArr;
        })()
        : arr[index][key] = el[key])
    })

    return arr
}

function Dashboard() {

    const dispatch = useDispatch();
    const data = useSelector((store) => store.data);

    useEffect(() => {
        
        const access_token = localStorage.getItem("token");
        
        (async () => {
            try {
                let response = await fetch("http://localhost:8055/items/Tour" + fields , {
                    method: "GET",
                    headers: {authorization: "bearer " + access_token}
                })
                let json = await response.json();
                console.log(json.data)
                dispatch({type: "DATA", value: sortData(json.data)});
            } catch(e) {
                console.log(e)
            }
        })();
    }, [])
    
    function handleLogout() {
        localStorage.clear()
        dispatch({type: "AUTHENTICATION", value: false})
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
        
    return (
        <div className = "dashboard">
            <nav className = "nav-bar">

            </nav>
            <div className = "dahsboard-container">

            </div>
            {/* <Table columns={columns} data={data} /> */}
        </div>
    )
}

export default Dashboard;

// json.data.forEach((el) => {
//     el.date_created = el.date_created.slice(0, 10);
//     if (el.date_updated !== null) {
//         el.date_updated = el.date_updated.slice(0, 10);
//     } else {
//         return el.date_updated;
//     }
// });

//To get all the data
// http://localhost:8055/items/Tour?fields=*.*.*.*.*.*