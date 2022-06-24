import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import '../App.css'

var value = 0;
function RenderItem({data}) {
    return(
        <option value={data.id}>{data.name}</option>
    )
}



const FormControl = (props) => {

    const [tsp, setTsp] = useState(0)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    // const [id, setPostId] = useState(0)
    // const [error, setError] = useState("")

    const control = props.data.map((val) => {
        return(
            <RenderItem data={val}/>
        )
    })

    const displayElement = props.data.map((val) => {
        if(val.id == tsp) {
            return(
                <div>
                    <div>
                        {val.name}
                    </div>
                    <div>
                        <Map
                            google = {props.google}
                            style = {{width: "88%", height: "100%"}}
                            zoom = {10}
                            initialCenter = {
                                {
                                    lat: val.address.geo.lat,
                                    lng: val.address.geo.lng
                                }
                            }
                        />
                    </div>
                </div>
            )
        }
    })

    
    function getValue() { 
        var s = document.getElementById("name")
        //var id      = options[options.selectedIndex].id;
        value = s.value;
        //console.log(value)
        setTsp(() => value)
     }

    //  useEffect(() => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: title, body: body, userId: tsp })
    //     };
    //     fetch(`https://jsonplaceholder.typicode.com/posts`, requestOptions)
    //         .then(response => response.json())
    //         .then(data => setPostId(() => data.id))
    //         .catch(error => {
    //             setError(() => error.toString());
    //             console.error('There was an error!', error);
    //         });
    
    // }, []);

     let validate = async (event) => {
        if(tsp == 0) {
            alert("Select a User!")
        }
        else if(title == "") {
            alert("Provide a title!")
        }
        else if(body == "") {
            alert("Provide a body!")
        }
        else {
            event.preventDefault();
            try {
            let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({
                title: title,
                body: body,
                userId: tsp,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setTitle("");
                setBody("");
                setTsp(0);
                console.log("Posted Successfully!")
            }
            else{
                console.log("Some error occured")
            }
            } catch (err) {
            console.log(err);
            }
        }
      };

    function handleTitle(event) { 
        setTitle(() => event.target.value)
    }
    
    function handleBody(event) { 
        setBody(() => event.target.value)
    }

    return(
        <form>
            <label>Select a User: </label>
            <select id="name" onChange={getValue}>
                <option value={0}>--Choose User--</option>
                {control}
            </select>
            <div>
                <label>Title: </label>
                <input type="text" name="title" onChange={handleTitle} />
            </div>
            <div>
                <label>Body: </label>
                <input type="text" name="body" onChange={handleBody} />
            </div>
            <div>
                <button onClick={validate}>Submit</button>
            </div>
            <div>
                {displayElement}
            </div>
        </form>
    )
    
        
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyD5UshSlUFHq6mWbjxTVczuLmwHNoy84pI"
})(FormControl)