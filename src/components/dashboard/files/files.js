import { React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { Skeleton } from '@mui/material'
import './files.scss';

function Files(props) {

    const {files} = useSelector(store => store);
    const { promiseInProgress } = usePromiseTracker();
    const dispatch = useDispatch();

    useEffect(() => {
        loadFiles();
    },[]);

    function loadFiles() {
        trackPromise(
            (async() => {
                try {
                    let response = await fetch("http://localhost:8055/files" , {
                    method: "GET",
                    headers: {authorization: "bearer " + props.access_token}
                });
                    let json = await response.json();
                    dispatch({type: "FILES", value: json.data});
                } catch(e) {
                    console.log(e);
                }
            })());
    };

    function handleMouseEnter(e) {
        let arr = e.currentTarget.querySelectorAll("button");
        for (let y = 0; y < arr.length; y++) {
            arr[y].style.opacity = 1;
        }
    }

    function handleMouseLeave(e) {
        let arr = e.currentTarget.querySelectorAll("button");
        for (let y = 0; y < arr.length; y++) {
            arr[y].style.opacity = 0;
        }
    }

    function handleFileUpload(e) {
        const file = e.target.files
        const formData = new FormData();
        formData.append("File", file[0]);

        (async() => {
            try {
                    await fetch("http://localhost:8055/files", {
                    method: "POST",
                    headers: {
                        authorization: "bearer " + props.access_token,
                    },
                    body: formData});
                    loadFiles();
            } catch(e) {
                console.log(e)
            }
        })();
    }

    function handleDelete(e) {
        (async() => {
            try {
                    let id = e.currentTarget.id
                    let response = await fetch("http://localhost:8055/files/" + id, {
                    method: "DELETE",
                    headers: {authorization: "bearer " + props.access_token}});
                    if (response.status === 204) {
                        loadFiles();
                    }
            } catch(e) {
                console.log(e)
            }
        })();
    }

    return (
        <div className = "dashboard-container-body-files">
            <label htmlFor = "file-upload" className = "dashboard-container-body-files-preview" style = {{cursor: "pointer"}} >
                <input type = "file" id = "file-upload" style = {{display: "none"}} onChange = {handleFileUpload}></input>
                <i className="fa-solid fa-plus" style = {{color: "white", fontSize: "4rem"}}></i>
            </label>
            {promiseInProgress
            ? [...Array(15)].map(
                (value, index) => {
                    return (
                        <Skeleton
                        style = {{
                            transform: "none",
                            margin: "3% 0 2% 4%",
                            height: "200px",
                            width: "200px",
                            borderRadius: "5px"
                        }}
                        id = {index + 1}
                        key = {index}/>
                    )
                }
            )
            :[...Array(files.length)].map(
                            (value, index) => {
                                return (
                                    <div
                                    className = "dashboard-container-body-files-preview"
                                    id= {files[index].id}
                                    key={index}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}>
                                        <div className = "dashboard-container-body-files-preview-img">
                                            <img src = {"http://localhost:8055/assets/" + files[index].id + "?access_token=" + props.access_token}></img>    
                                        </div>
                                        <button type = "button" id = {files[index].id} className = "dashboard-container-body-files-preview-button button-download">
                                            <a href={"http://localhost:8055/assets/" + files[index].id  + "?download&access_token=" + props.access_token} target="_blank" download="Your File.pdf">
                                                <i className="fa-solid fa-download"></i>
                                            </a>
                                        </button>
                                        <button type = "button" id = {files[index].id} className = "dashboard-container-body-files-preview-button button-delete" onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                );
                            } 
                        )}
        </div>
    )
}

export default Files;