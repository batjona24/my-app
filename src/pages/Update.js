import Header from "../components/Header.js";
import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "../App.css";

export default function Trips(){
    const onSubmit = async (event) => {
        const navigate = useNavigate();
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const user_id = Number(window.localStorage.getItem("user_id"));
        const trip_id = Number(window.localStorage.getItem("trip_id"));
        const date = formData.get("date");
        const vacation = formData.get("vacation");
        const days = formData.get("days");
        const rating = formData.get("rating");
        const values = { date, vacation, days, rating, user_id};
        const response = await fetch(`http://localhost:4000/api/trips/${trip_id}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        console.log(data);
        window.alert('The trip was updated!');
        navigate('/trips');
};

    return(
        <div>
            <Header />
            <h1>TRIPS</h1>
             <h2>Create a trip now!</h2>
                <form id="trips" onSubmit={onSubmit}>
                <label>Date</label>
                <input type="date" name="date" placeholder="Select a date"/>
                <label>Vacation</label>
                <input type="text" name="vacation" placeholder="Select a Vacation"/>
                <label>Days</label>
                <input type="number" name="days" placeholder="Select the number of days" min="1"/>
                <label>Rating</label>
                <input type="number" name="rating" placeholder="Rating" min="1" max="10"/>
                <button id="btn" className = "buttons" type="submit" name="submit">Create trip!</button>
                </form>
            <div id="container">
            </div>
        </div>   
    )
}