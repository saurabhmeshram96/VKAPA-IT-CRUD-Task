
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ApiCalls from "./ApiCalls";
import "./FormOne.css"

function FormOne() {


    const [userDetails, setDetails] = useState({
        firstName: "",
        email: "",
        phone: "",
    })

    // post request
    const handleInputChange = (e) => {
        setDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        console.log(userDetails);
        // e.preventDefault();
        ApiCalls.post("/saveUser", userDetails)
            .then((res) => {
                console.log(res.data)
            });

    };

    // get Request
    const [userList, setList] = useState([]);
    useEffect(() => {
        ApiCalls.get("/getAllUsers")
            .then((res) => {
                console.log(res);
                setList(res.data);
                console.log(userList);
            });
    }, []);

    //delete Record

    const deleteRecord = (id) => {
        console.log(id);
        ApiCalls.delete(`http://localhost:8989/api/deleteUser/${id}`)
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <>
            <div className="container mt-5">
                <form>
                    <h2>Register</h2>
                    <div className="form-group">
                        <input className="form-control" type="text" name="firstName" required placeholder="firstName" value={userDetails.firstName} onChange={handleInputChange} />

                    </div>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" required placeholder="Email" value={userDetails.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" name="phone" required placeholder="Phone" value={userDetails.phone} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary btn-block" type="submit" value="Submit" onClick={handleClick} />
                    </div>
                </form>
            </div>

            <div className="table-responsive container mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>firstName</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {userList.map((user, id) => (
                        <tbody>
                            <tr key={id}>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td><Link to={`/edit/${user._id}`}><button type="button" class="btn btn-danger">Edit</button></Link></td>
                                <td><button type="button" class="btn btn-danger" onClick={() => deleteRecord(user._id)}>Delete</button></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )
}

export default FormOne
