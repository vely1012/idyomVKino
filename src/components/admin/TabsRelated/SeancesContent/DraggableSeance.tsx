import { type MouseEvent } from "react"
import ivkAPI, { type SeanceNode } from "../../../../ts/API/IvkAPI"
import { type AdminAction, SetSeances } from "../../../../ts/stateManagement/actions"
import { useDispatch } from "react-redux"
import { type Dispatch } from "redux"

export default function DraggableSeance() {
    const dispatch = useDispatch<Dispatch<AdminAction>>();

    const dragging = function(e: MouseEvent) {
        const draggableSeance = e.target as HTMLElement;

        const meRect = draggableSeance.getBoundingClientRect();
        const meWidth = meRect.right - meRect.left;
        const meHeight = meRect.bottom - meRect.top;
        const { x: seancesX, y: seancesY } = (document.getElementById('seances-tab') as HTMLElement).getBoundingClientRect();
                
        draggableSeance.style.setProperty('--x', `${e.clientX - seancesX - meWidth / 2}px`);
        draggableSeance.style.setProperty('--y', `${e.clientY - seancesY - meHeight / 2}px`);
    }

    const dropDraggable = async function(e: MouseEvent) {
        const draggableSeance = e.target as HTMLElement;

        draggableSeance.classList.add('hidden');

        const scheduleTrashbin = document.querySelectorAll('.seances__schedule-trashbin')[Number(draggableSeance.dataset.hallindex)];
        const { clientX, clientY } = e;

        const rect = scheduleTrashbin.getBoundingClientRect();

        const isInTrashbin = (clientX >= rect.left) && (clientX <= rect.right) && (clientY >= rect.top) && (clientY <= rect.bottom);
        if(!isInTrashbin) {
            draggableSeance.classList.add('hidden');
            scheduleTrashbin.classList.add('hidden');
            return;
        }

        const seanceDelitionConfirmed = confirm('Вы точно хотите удалить данный сеанс? Это действие необратимо');
        if(!seanceDelitionConfirmed) {
            draggableSeance.classList.add('hidden');
            scheduleTrashbin.classList.add('hidden');
            return;
        }

        const seanceId = Number(draggableSeance.dataset.seanceid);
        const response = await ivkAPI.deleteSeance(seanceId);

        if(response.success) {
            draggableSeance.classList.add('hidden');
            const newSeances = (response.result as { seances: SeanceNode[] }).seances;
            dispatch(SetSeances(newSeances));
        } else {
            alert(response.error);
        }

        scheduleTrashbin.classList.add('hidden');
    }
    
    // return (
    //     <span className="seances__draggable-seance hidden" data-hallindex={-1} data-seanceid={-1} id="draggable-seance" onMouseUp={dropDraggable} onMouseMove={dragging}/>
    // )
    return (
        // <img src="#" className="seances__draggable-seance hidden" data-hallindex={-1} data-seanceid={-1} id="draggable-seance" onMouseUp={dropDraggable} onMouseMove={dragging} />
        // <img src="#" className="seances__draggable-seance-poster hidden" data-hallindex={-1} data-seanceid={-1} id="draggable-seance" onMouseUp={dropDraggable} onMouseMove={dragging} />
        <div className="seances__draggable-seance-poster hidden" data-hallindex={-1} data-seanceid={-1} id="draggable-seance" onMouseUp={dropDraggable} onMouseMove={dragging} />
    )
}