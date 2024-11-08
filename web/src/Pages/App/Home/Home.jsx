// Home.js
import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import doc_profile from './doctor.png';
import axios from 'axios';
const Home = () => {
    const isDoctor = true;
const handleSubmit = async () => {

     
       
        try {
            const response = await axios.get('http://localhost:8000/getInfo/',{withCredentials:true});
          console.log(response)
        } catch (error) {
            console.error('Error loging :', error);
            // alert('Failed to login . Please try again.');
        }
    };
    useEffect(()=>{
        handleSubmit()
    },[])
    return (
        <>
            {isDoctor && (
                <nav className="navbar navbar-expand-sm navbar-dark bg-myblue px-5">
                    <div className="container-fluid">
                        <a className="navbar-brand mytitle" href="javascript:void(0)">Carify</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav ms-auto d-flex align-items-center">
                                <li className="nav-item me-3">
                                    <a className="nav-link active" href="/">Home</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="/patient_info">Schedule</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="/patient_info">Patients</a>
                                </li>
                                <li className="nav-item me-3">
                                    <a className="nav-link" href="/patient_info">Dashboard</a>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <a className="nav-link" href="/profile">
                                        <img src={doc_profile} alt="Profile" height="40px" className="rounded-circle" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
            {!isDoctor && <>Patient</>}
        </>
    );
};

export default Home;
