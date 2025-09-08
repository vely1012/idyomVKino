import { useContext } from 'react'
import HallElement from './HallElement'
import { type HallNode } from '../../../../ts/API/IvkAPI'
import { adminContext } from '../../../../ts/stateManagement/adminContext'
import { SetHalls } from '../../../../ts/stateManagement/actions'

import './HallsContent.css'

export default function HallsContent() {

    const { adminData, dispatch } = useContext(adminContext)
    const halls = adminData.halls
        
    const deletionCallback = function(deletedHallId: number) {
        const newHalls: HallNode[] = halls.filter((h: HallNode) => h.id !== deletedHallId)
        dispatch(SetHalls(newHalls))
    }

    const activatePopup = () => {
        document.getElementById('addHallPopup')?.classList.remove('hidden')
    }

    return (
        <div className="halls-tab">
            <p className="halls-tab__heading">Доступные залы:</p>
            <ul className="halls-tab__list">
                { ...halls.map((h: HallNode) => <HallElement hallId={h.id} hallName={h.hall_name} deletionCallback={deletionCallback}/>)}
            </ul>
            <button type="button" className="shadow halls-tab__add-btn" onClick={activatePopup}>создать зал</button>
        </div>
    )
}