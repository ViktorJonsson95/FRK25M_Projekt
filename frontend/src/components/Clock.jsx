import { useState, useEffect } from 'react'

const Clock = () => {
    // Skapar ett state som håller nuvarande datum och tid
    const [time, setTime] = useState(new Date())

    // useEffect körs efter första renderingen.
    useEffect(() => {
        const updateTime = () => setTime(new Date())
        const timer = setInterval(updateTime, 1000) // Startar ett interval som kör updateTime varje sekund.
        return () => clearInterval(timer) // Cleanup-funktion som körs när komponenten dismountas
    }, [])

    // Returnernar tiden i 24-timmarsformat (HH:MM:SS)
    const getFormattedTime = () => {
        return time.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Tvingar 24-timmarsformat, stängar av PM/AM
        })
    }

    // Funktion som returnerar rätt suffix för datum. T.ex 1st, 2nd, 3rd
    const getDaySuffix = (day) => {
        // Specialfall: 11, 12, 13 får alltid "th"
        if (day >= 11 && day <= 13) return "th"
        // Modulo (%) ger resten efter heltalsdivison.
        // T.ex 23 % 10 = 3 => 23rd
        switch (day % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    }

    // Funktion som formaterar datum till läsbar text
    const getFormattedDate = () => {
        const weekday = time.toLocaleDateString("en-GB", { weekday: "long" })
        const day = time.getDate()
        const month = time.toLocaleDateString("en-GB", { month: "long" })
        const suffix = getDaySuffix(day)

        // Returnerar datum i format: "Friday 13th of March"
        return `${weekday} ${day}${suffix} of ${month}`
    }

    return (
        <div className="clock">
            <div className="clock-date">{getFormattedDate()}</div>
            <div className="clock-time">{getFormattedTime()}</div>
        </div>
    )
}

export default Clock