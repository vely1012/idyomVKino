import { type MouseEvent } from "react"
import { type FilmNode } from "../../../../ts/API/IvkAPI"

export interface FilmElementProps {
    film: FilmNode,
    dataColor: number,
    deleteCallback: (filmId: number) => void
}

export default function SeanceFilm({ film, dataColor, deleteCallback }: FilmElementProps) {
    const deleteFilm = async function() {
        const deletionConfirmed = confirm(`Фильм "${film.film_name}" будет удалён без возможности восстановления. Продолжить`)

        if(!deletionConfirmed) {
            return
        }

        deleteCallback(film.id)
    }

    const startDragging = function(e: MouseEvent) {
        e.preventDefault()
        
        const clickedFilm = (e.target as HTMLElement).closest('.seances__film') as HTMLElement
        const draggableFilm = document.getElementById('draggable-film') as HTMLElement

        draggableFilm.classList.remove('hidden')
        draggableFilm.innerHTML = clickedFilm.outerHTML
        
        const meRect = draggableFilm.getBoundingClientRect()
        const meWidth = meRect.right - meRect.left
        const meHeight = meRect.bottom - meRect.top
        
        const { x: seancesX, y: seancesY } = (document.getElementById('seances-tab') as HTMLElement).getBoundingClientRect()
        
        
        draggableFilm.style.setProperty('--x', `${e.clientX - seancesX - meWidth / 2}px`)
        draggableFilm.style.setProperty('--y', `${e.clientY - seancesY - meHeight / 2}px`)
    }

    return (
        <div onMouseDown={startDragging} className="seances__film" data-color={dataColor} style={{ '--hue-rotate': `${dataColor}deg` } as React.CSSProperties}>
            <img src={film.film_poster} alt="" className="seances__poster-thumb" />
            <h3 className="seances__film-title">{film.film_name}</h3>
            <span className="seances__film-duration">{film.film_duration} минут</span>
            <button type="button" className="shadow seances__delete-film-btn" onClick={deleteFilm}></button>
        </div>
    )
}