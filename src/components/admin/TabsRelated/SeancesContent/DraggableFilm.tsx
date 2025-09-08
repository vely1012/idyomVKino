import { type MouseEvent } from "react"

export default function DraggableFilm() {
    
    const toggleSeancePopup = function(selectedFilmName: string, selectedHallName: string) {
        const addSeancePopup = document.getElementById('addSeancePopup') as HTMLElement
        addSeancePopup.classList.remove('hidden');
        (addSeancePopup.querySelector("#filmName_cmbx") as HTMLInputElement).value = selectedFilmName;
        (addSeancePopup.querySelector("#hallName_cmbx") as HTMLInputElement).value = selectedHallName;
    }

    const dragging = function(e: MouseEvent) {
        const draggableFilm = (e.target as HTMLElement).closest('.seances__draggable-film') as HTMLElement

        const meRect = draggableFilm.getBoundingClientRect()
        const meWidth = meRect.right - meRect.left
        const meHeight = meRect.bottom - meRect.top
        const { x: seancesX, y: seancesY } = (document.getElementById('seances-tab') as HTMLElement).getBoundingClientRect()
                
        draggableFilm.style.setProperty('--x', `${e.clientX - seancesX - meWidth / 2}px`)
        draggableFilm.style.setProperty('--y', `${e.clientY - seancesY - meHeight / 2}px`)
    }

    const dropDraggable = function(e: MouseEvent) {
        const draggableFilm = (e.target as HTMLElement).closest('.seances__draggable-film') as HTMLElement
        draggableFilm.classList.add('hidden')

        const hallSchedules = document.querySelectorAll('.seances__hall-schedule');
        const { clientX, clientY } = e;

        let isInsideHallSchedule = false;
        let acceptingHallSchedule: HTMLElement | undefined;

        hallSchedules.forEach(schedule => {
            const rect = schedule.getBoundingClientRect();
            if (
                clientX >= rect.left &&
                clientX <= rect.right &&
                clientY >= rect.top &&
                clientY <= rect.bottom
            ) {
                isInsideHallSchedule = true;
                acceptingHallSchedule = schedule as HTMLElement
            }
        });

        if (isInsideHallSchedule) {
            const filmName: string = (draggableFilm.querySelector('.seances__film-title') as HTMLElement).textContent || ""
            const acceptingHallName: string = (acceptingHallSchedule?.previousElementSibling as HTMLElement).textContent || ""
            toggleSeancePopup(filmName, acceptingHallName)
        } else {
            console.log('No hall schedule was involved')
        }
    }
    
    return (
        <div
            className="seances__draggable-film hidden"
            id='draggable-film'
            onMouseMove={dragging}
            onMouseUp={dropDraggable} />
    )
}