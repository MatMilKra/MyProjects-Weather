import { useState } from "react"

import Axios from "axios"

export const Weather = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [myobject, setMyobject] = useState({});
    const [correct, setCorrect] = useState(true);
    const arr = [0, 1, 2, 3, 4, 5, 6, 7];

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
                    console.log(res.data)
                    setMyobject(res.data)

                    console.log(myobject)
                });
        }
    }

    const createRow = (i) => {
        return (<tr>
            <td>
                {myobject.daily?.time[i]}</td><td>{myobject.daily?.temperature_2m_min[i]}</td>
            <td>{myobject.daily?.temperature_2m_max[i]}</td>
            <td>{myobject.daily?.sunrise[i]}</td><td>{myobject.daily?.sunset[i]}</td>
        </tr>
        )
    }


    return (
        <div>
            <input placeholder={"Latitude"} onChange={(event) => {
                setLatitude(event.target.value);
            }} />
            <input placeholder={"Longitude"} onChange={(event) => {
                setLongitude(event.target.value);
            }} />
            <button onClick={fetchData}>Find</button>
            {correct ? <div></div> : <div style={{ color: "red" }}>Wrong latitude and/or longitude</div>}

            <div>
                <table>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            Min temperature
                        </th>
                        <th>
                            Max temperature
                        </th>
                        <th>
                            Sunrise
                        </th>
                        <th>
                            Sunset
                        </th>
                    </tr>
                    <tbody>
                        {() => arr.forEach((i) =>
                            createRow(i)
                        )
                        }
                        {createRow(0)} {createRow(1)}{createRow(2)}{createRow(3)}
                        {createRow(4)}{createRow(5)}{createRow(6)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}