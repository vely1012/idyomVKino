import { type MouseEvent } from "react"

export interface SeanceEssentials {
    id: number,
    time: string,
    duration: number,
    filmName: string,
    dataColor: number,
}

export interface HallScheduleProps {
    seances: SeanceEssentials[],
    hallName: string
}

export default function HallSchedule({ seances, hallName }: HallScheduleProps) {
    const startDragging = function(e: MouseEvent, seanceId: number) {
        e.preventDefault();

        const clickedSeance = (e.target as HTMLElement).closest(".seances__seance") as HTMLElement;
        const draggableSeance = document.getElementById('draggable-seance') as HTMLElement;

        draggableSeance.classList.remove('hidden');
        
        draggableSeance.style.setProperty('--hue-rotate', clickedSeance.dataset.color as string);
        
        // draggableSeance.style.setProperty('width', `${clickedSeance.getBoundingClientRect().width}px`);
        // draggableSeance.style.setProperty('height', `${clickedSeance.getBoundingClientRect().height}px`);
        // draggableSeance.textContent = clickedSeance.textContent
        
        const meRect = draggableSeance.getBoundingClientRect();
        const meWidth = meRect.right - meRect.left;
        const meHeight = meRect.bottom - meRect.top;
        const { x: seancesX, y: seancesY } = (document.getElementById('seances-tab') as HTMLElement).getBoundingClientRect();
        draggableSeance.style.setProperty('--x', `${e.clientX - seancesX - meWidth / 2}px`);
        draggableSeance.style.setProperty('--y', `${e.clientY - seancesY - meHeight / 2}px`);

        const film = document.querySelector(`.seances__film-container .seances__film[data-color="${clickedSeance.dataset.color}"]`) as HTMLElement;
        // (draggableSeance as HTMLImageElement).src = film.querySelector('img')?.src || "#";
        draggableSeance.style.setProperty('background-image', `url(${film.querySelector('img')?.src || "#"})`);

        // const parentHallSchedule = clickedSeance.parentElement
        const hallIndex = Array.from(document.querySelectorAll('.seances__hall-schedule')).indexOf(clickedSeance.parentElement as HTMLElement);
        draggableSeance.setAttribute('data-hallindex', `${hallIndex}`);
        draggableSeance.setAttribute('data-seanceid', `${seanceId}`);

        const scheduleTrashbin = clickedSeance.parentElement?.children[0];
        scheduleTrashbin?.classList.remove('hidden');
    }
    
    return (
        <>
            <h2 className="seances__hall-name">{hallName}</h2>
            <div className="seances__hall-schedule">
                <div className="seances__schedule-trashbin hidden" />
                {
                    ...seances.map((s: SeanceEssentials) => {
                        const seanceStyles: React.CSSProperties = {
                            '--hue-rotate': s.dataColor,
                            '--starting-at': s.time.split(":").reduce((acc, val) => acc * 60 + Number(val), 0),
                            // '--starting-at': s.time.split(":").reduce((acc, val) => acc * 60 + Number(val), 0) + 1,
                            '--time-span': s.duration
                        } as React.CSSProperties;

                        return (
                            <span 
                                className="seances__seance"
                                data-time={s.time}
                                data-color={s.dataColor}
                                title={s.filmName}
                                style={seanceStyles}
                                onMouseDown={(e: MouseEvent) => { startDragging(e, s.id) }}>
                                    {/* {s.filmName} */}
                                    <span className="seances__seance-inner-wrapper">
                                        {s.filmName}
                                    </span>
                            </span>
                        )
                    }
                )
                }
            </div>
        </>
    )
}