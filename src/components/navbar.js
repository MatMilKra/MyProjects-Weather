import Axios from "axios"
import { AppContext } from "../App"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
    const {
        latitude,
        longitude,
        setLatitude,
        setLongitude,
        correct,
        setCorrect,
        myobject,
        setMyobject
    } = useContext(AppContext);

    const navigate = useNavigate();

    const fetchData = () => {
        if (isNaN(latitude) || isNaN(longitude) ||
            latitude < -90 || latitude > 90 ||
            longitude < -180 || longitude > 180) {
            setCorrect(false)
        }
        else {
            setCorrect(true)

            Axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=CET&hourly=&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`)
                .then((res) => {
                    setMyobject(res.data)
                    navigate("/weather")
                });
        }
    }

    return (
        <div className="Navbar-style">
            <input placeholder={"Latitude"} onChange={(event) => {
                setLatitude(event.target.value);
            }} />
            <input placeholder={"Longitude"} onChange={(event) => {
                setLongitude(event.target.value);
            }} />
            <button onClick={fetchData}>Find</button>
            {correct ? <div></div> : <div style={{ color: "red" }}>Wrong latitude and/or longitude</div>}
        </div>
    )
}