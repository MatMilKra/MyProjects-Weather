import { useState } from "react"
import { AppContext } from "../App"
import { useContext } from "react"
import Axios from "axios"

export const Weather = () => {
    const { myobject } = useContext(AppContext)


    const createRow = (i) => {
        var sunrise = myobject.daily?.sunrise[i].split("T");
        var sunset = myobject.daily?.sunset[i].split("T");
        return (<tr>
            <td>{myobject.daily?.time[i]}</td>
            <td>{myobject.daily?.temperature_2m_min[i]}</td>
            <td>{myobject.daily?.temperature_2m_max[i]}</td>
            <td>{sunrise[1]}</td><td>{sunset[1]}</td>
        </tr>
        )
    }


    return (
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
                    {createRow(0)} {createRow(1)}{createRow(2)}{createRow(3)}
                    {createRow(4)}{createRow(5)}{createRow(6)}
                </tbody>
            </table>
        </div>
    )
}