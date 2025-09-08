import type { FilmNode, HallNode, SeanceNode } from '../../../../ts/API/IvkAPI'
import { useContext } from 'react'
import { adminContext } from '../../../../ts/stateManagement/adminContext'
import DraggableFilm from './DraggableFilm'
import ivkAPI from '../../../../ts/API/IvkAPI'

import HallSchedule, { type SeanceEssentials } from './HallSchedule'
import SeanceFilm from './SeanceFilm'

import DraggableSeance from './DraggableSeance'

import './SeancesContent.css'
import { SetFilms, SetSeances } from '../../../../ts/stateManagement/actions'

export default function SeancesContent() {
    const { adminData, dispatch } = useContext(adminContext)

    const deleteFilmCallback = async function(filmId: number) {
        const response = await ivkAPI.deleteFilm(filmId)

        if(response.success) {
            const data = response.result as { films: FilmNode[]; seances: SeanceNode[]; }

            dispatch(SetFilms(data.films))
            dispatch(SetSeances(data.seances))
        } else {
            console.error(response.error)
        }

    }

    const activateFilmPopup = function () {
        document.getElementById('addFilmPopup')?.classList.remove('hidden')
    }

    return (
        <div className="seances" id="seances-tab">
            <DraggableFilm />
            <DraggableSeance />
            <button type="button" className="shadow seances__add-film-btn" onClick={activateFilmPopup}>добавить фильм</button>
            <div className="seances__film-container">
                { ...adminData.films.map((f: FilmNode) => {
                    return <SeanceFilm film={f} dataColor={(f.id % 60) * 110} deleteCallback={deleteFilmCallback} />
                })}
            </div>
            <div className="seances__schedules">
                {
                    ...adminData.halls.map((h: HallNode) => {
                        const hallSeances: SeanceNode[] = adminData.seances.filter((s: SeanceNode) => s.seance_hallid === h.id)

                        const seancesData: SeanceEssentials[] = hallSeances.map((s: SeanceNode) => {
                            const seanceFilm: FilmNode = adminData.films.find((f:  FilmNode) => s.seance_filmid === f.id) as FilmNode
                            return ({
                                id: s.id,
                                time: s.seance_time,
                                filmName: seanceFilm.film_name,
                                duration: seanceFilm.film_duration,
                                dataColor: (seanceFilm.id % 60) * 110
                            }) 
                        })

                        return <HallSchedule seances={seancesData} hallName={h.hall_name} />
                    })
                }
            </div>

            <div className="seances__btn-wrapper">
                <button type="button" className="shadow seances__deny-btn">отмена</button>
                <button type="button" className="shadow seances__save-btn">сохранить</button>
            </div>
        </div>
    )
}