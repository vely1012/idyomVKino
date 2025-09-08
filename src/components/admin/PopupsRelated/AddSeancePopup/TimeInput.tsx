import { type ChangeEvent } from "react"

export default function TimeInput() {
    const formatValue = function(e: ChangeEvent) {
        const input = (e.target as HTMLInputElement)
        const newValue = Number(input.value) > 9 ? input.value : `0${input.value}` 
        input.value = newValue

        const timeElement = input.parentElement as HTMLElement
        const previousTime = timeElement.dataset.time
        if(input.name === 'hoursInput') {
            timeElement.dataset.time = `${newValue}:${previousTime?.split(':')[1]}`
        } else {
            timeElement.dataset.time = `${previousTime?.split(':')[0]}:${newValue}`
        }
    }

    return (
        <div className="popup__input popup__time" id="timeInput1" data-time="00:00" >
            <input type="number" className="popup__time-input" name="hoursInput" id="hoursInput" min="0" max="23" placeholder="00" onChange={formatValue}/>
            <span className="popup__time-devider">:</span>
            <input type="number" className="popup__time-input" name="minutesInput" id="minutesInput" min="0" max="59" placeholder="00" onChange={formatValue}/>
            <div className="popup__clock-image"></div>
        </div>
    )
}