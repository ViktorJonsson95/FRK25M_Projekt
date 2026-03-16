import { useState, useEffect } from 'react'

const Clock = () => {
    const [time, setTime] = useState(new Date())

    // Körs när komponenten renderas första gången.
    // Startar intervall som uppdaterar tiden varje sekund.
    useEffect(() => {
        const updateTime = () => setTime(new Date())
        const timer = setInterval(updateTime, 1000)
        // Stoppar timern om klockan försvinner från sidan
        return () => clearInterval(timer)
    }, [])

    // Returnernar tiden i 24-timmarsformat (HH:MM:SS)
    const getFormattedTime = () => {
        return time.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        })
    }

    // Funktion som sätter rätt suffix för datum. T.ex 1st, 2nd, 3rd
    const getDaySuffix = (day) => {
        // 11-13 är specialfall och använder alltid "th"
        if (day >= 11 && day <= 13) return "th"
        // % 10 = resten efter division med 10, ger oss sista siffran i talet.
        // T.ex. 23 % 10 = 3 => 23rd
        switch (day % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    }

    // Returnerar datum i format: "Friday 13th of March"
    const getFormattedDate = () => {
        const weekday = time.toLocaleDateString("en-GB", { weekday: "long" })
        const day = time.getDate()
        const month = time.toLocaleDateString("en-GB", { month: "long" })
        const suffix = getDaySuffix(day)

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