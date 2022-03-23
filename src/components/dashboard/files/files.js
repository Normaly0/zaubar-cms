import { React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './files.scss';

function Files(props) {

    const {files} = useSelector(store => store);
    const dispatch = useDispatch(); 

    useEffect(() => {

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
        })();
    },[]);

    return (
        <div className = "dashboard-container-body-files">
            {[...Array(files.length)].map(
                            (value, index) => {
                                return (
                                    <div
                                    className = "dashboard-container-body-files-preview"
                                    id={index + 1} 
                                    key={index}>
                                        <div className = "dashboard-container-body-files-preview-img">
                                            <img src = {"http://localhost:8055/assets/" + files[index].id + "?access_token=" + props.access_token}></img>
                                        </div>
                                    </div>
                                );
                            } 
                        )}
        </div>
    )
}

export default Files;