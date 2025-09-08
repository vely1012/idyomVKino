import { useState, useContext } from 'react'
import HallSelector from '../../HallSelector/HallSelector'

import ivkAPI, { type HallNode } from '../../../../ts/API/IvkAPI'
import { adminContext } from '../../../../ts/stateManagement/adminContext'

import './StartSellingContent.css'
import { SetHalls } from '../../../../ts/stateManagement/actions'

export default function StartSellingContent() {
    const { adminData, dispatch } = useContext(adminContext)
    const halls = adminData.halls
    
    const [selectedHallIndex, setSelectedHallIndex] = useState(0)

    const selectAnotherHall = function(anotherHallId: number) {
        if(anotherHallId === halls[selectedHallIndex].id) {
            return
        }
        
        setSelectedHallIndex(halls.findIndex((h: HallNode) => h.id === anotherHallId))
    }

    const btnClick = async function () {
        const response = await ivkAPI.toggleHallSales(halls[selectedHallIndex].id, !halls[selectedHallIndex].hall_open)

        if(response.success) {
            const newHalls: HallNode[] = (response.result?.halls) as HallNode[]
            dispatch(SetHalls(newHalls))
        } else {
            alert(response.error)
        }
    }

    const btnClasses = `shadow start-selling__btn ${ halls[selectedHallIndex].hall_open ? "start-selling__btn_stop" : "start-selling__btn_start"}`
    
    return (
        <div className="start-selling">
            <span className="start-selling__control-text">Выберете зал для конфигурации</span>
            <HallSelector halls={halls} selectionCallback={selectAnotherHall} selectedHallId={halls[selectedHallIndex].id}/>
            <span className="start-selling__hall-status">Всё готово к открытию</span>
            <button type="button" className={btnClasses} onClick={btnClick}></button>
        </div>
    )
}