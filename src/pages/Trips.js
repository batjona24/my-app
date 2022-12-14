import Header from "../components/Header.js";
import React from "react";
import "../App.css";

export default function Trips(){
    const [table,setTable] = React.useState([]);
    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const user_id = Number(window.localStorage.getItem("user_id"));
        const date = formData.get("date");
        const vacation = formData.get("vacation");
        const days = formData.get("days");
        const rating = formData.get("rating");
        const values = { date, vacation, days, rating, user_id};
        const response = await fetch(`http://localhost:4000/api/trips/${user_id}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        console.log(data);
        // autoRefresh(2000);
};
async function showTrips() {
    const user_id = Number(window.localStorage.getItem("user_id"));
    const response = await fetch(`http://localhost:4000/api/trips/${user_id}`);
    const data = await response.json();
    // console.log(data);
    setTable(data);      
}   


// async function autoRefresh( t ) {
//     setTimeout("location.reload(true);", t);
// }
showTrips();

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
            <table id="table">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Vacation</th>
                    <th>Days</th>
                    <th>Rating</th>
                    <th>UserId</th>
                    <th>Update trips</th>
                    <th>Delete trips</th>
                    </tr>
                    {table.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.vacation}</td>
                            <td>{item.days}</td>
                            <td>{item.rating}</td>
                            <td>{item.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>   
    )
}