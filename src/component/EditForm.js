import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {useParams } from "react-router";
import ApiCalls from "./ApiCalls";
import "./FormOne.css"

function EditForm() {
    // const history = useHistory();
    const { id } = useParams();
    const [updateDetails, setUpdate] = useState({
        firstName: "",
        email: "",
        phone: "",
    })


    const handleUpdate = (e) => {
        setUpdate({ ...updateDetails, [e.target.name]: e.target.value });
    };

    // get Request
    useEffect(() => {
        ApiCalls.get("/getAllUsers")
            .then((res) => {
                console.log(res);
                setUpdate(res.data);
                console.log(updateDetails);
            });
    }, []);


    const update = () => {
        ApiCalls.put(`http://localhost:8989/api/updateUser/${id}`, updateDetails)
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <div>
            <div className="container mt-5">
                <form>
                    <h2 className="text-center fs-2">Edit Form</h2>
                    <div className="form-group">
                        <input className="form-control" type="text" name="firstName" required placeholder="firstName" value={updateDetails.firstName} onChange={handleUpdate}  />

                    </div>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" required placeholder="Email" value={updateDetails.email} onChange={handleUpdate}  />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="phone" required placeholder="phone" value={updateDetails.phone} onChange={handleUpdate}  />
                    </div>
                     
                    <Link to="/">
                    <div className="form-group">
                        <input className="btn btn-primary btn-block" type="submit" value="Submit" onClick={update} />
                    </div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default EditForm
