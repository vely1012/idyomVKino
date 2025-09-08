import { type HallNode } from '../../../ts/API/IvkAPI'

import './HallSelector.css'

export interface HallSelectorProps {
    halls: HallNode[],
    selectedHallId?: number,
    selectionCallback: (value: number) => void
}

export default function HallSelector({ halls, selectionCallback, selectedHallId }: HallSelectorProps) {    
    selectedHallId = selectedHallId || halls[0].id

    return (
        <div className="hall-selector">
            {
                ...halls.map((h: HallNode) => {
                    const classes = `shadow hall-selector__item ${h.id === selectedHallId ? 'hall-selector__item_selected' : ''}`
                    const hallClick = () => { selectionCallback(h.id) }

                    return <span className={classes} onClick={hallClick}>{h.hall_name}</span>
                })
            }
        </div>
    )
}