import ivkAPI from "../../../../ts/API/IvkAPI"

export interface HallElementProps {
    hallId: number,
    hallName: string,
    deletionCallback: (value: number) => void
}

export default function HallElement({ hallId, hallName, deletionCallback }: HallElementProps) {
    const tryDeleteHall = async function() {
        const deletionConfirmed = confirm(`Вы действительно хотите удалить зал с именем "${hallName}"?`)
        if(!deletionConfirmed) {
            return
        }

        const response = await ivkAPI.deleteHall(hallId)
        
        if(response.success) {
            deletionCallback(hallId)
        } else {
            alert(response.error)
        }
    }

    return (
        <li className="halls-tab__item">
            <span className="halls-tab__item-name">{hallName}</span>
            <button type="button" className="halls-tab__delete-item shadow" onClick={tryDeleteHall}></button>
        </li>
    )
}