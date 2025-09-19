import HallElement from './HallElement'
import { type HallNode } from '../../../../ts/API/IvkAPI'
import { type AdminAction, SetHalls } from '../../../../ts/stateManagement/actions'

import { useDispatch, useSelector } from 'react-redux'
import type { appState } from '../../../../ts/stateManagement/reducers'
import { type Dispatch } from 'redux'

import './HallsContent.css'

export default function HallsContent() {
    const adminData = useSelector((state: appState) => state.admin)
    const dispatch = useDispatch<Dispatch<AdminAction>>()
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