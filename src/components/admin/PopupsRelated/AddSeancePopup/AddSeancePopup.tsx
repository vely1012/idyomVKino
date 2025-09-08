import { useContext, type FormEvent } from "react"
// import { adminContext } from "../../../../pages/Admin"
import { adminContext } from "../../../../ts/stateManagement/adminContext"
import type { FilmNode, HallNode, SeanceNode } from "../../../../ts/API/IvkAPI"
import TimeInput from "./TimeInput"
import ivkAPI from "../../../../ts/API/IvkAPI"
import { SetSeances } from "../../../../ts/stateManagement/actions"

export default function AddSeancePopup() {
    const { adminData, dispatch } = useContext(adminContext)

    const hallOptions: HallNode[] = adminData.halls
    const filmOptions: FilmNode[] = adminData.films

    const submitAdding = async function (e: FormEvent) {
        e.preventDefault()

        const selectedFilmName = (document.getElementById('filmName_cmbx') as HTMLInputElement).value
        const selectedHallName = (document.getElementById('hallName_cmbx') as HTMLInputElement).value

        const filmId = adminData.films.filter((f: FilmNode) => f.film_name === selectedFilmName)[0].id
        const hallId = adminData.halls.filter((h: HallNode) => h.hall_name === selectedHallName)[0].id
        const timeValues = (document.getElementById('timeInput1')?.dataset.time as string).split(':')
        const seanceTime = new Date()
        seanceTime.setHours(Number(timeValues[0]), Number(timeValues[1]), 0, 0)
        
        const response = await ivkAPI.addSeance(hallId, filmId, seanceTime)

        if(response.success) {
            dispatch(SetSeances((response.result as { seances: SeanceNode[] }).seances))
            closePopup()
        } else {
            alert(response.error)
        }
    }

    const closePopup = function () {
        document.getElementById('addSeancePopup')?.classList.add('hidden')
    }

    return (
        <div id="addSeancePopup" className="popup-wrapper hidden">
            <form className="popup" id="add_seance" onSubmit={submitAdding}>
                <h1 className="popup__heading">
                    добавление сеанса
                    <a href="#" className="popup__close" onClick={(e: React.MouseEvent) => { e.preventDefault(); closePopup() } }></a>
                </h1>
                <label htmlFor="hallName_cmbx" className="popup__label">Название зала</label>
                <div className="popup__input popup__cmbx">
                    <input className="popup__cmbx-input" type="text" list="options1" id="hallName_cmbx" placeholder="Select an option" autoComplete="off" required />
                    <datalist id="options1">
                        { ...hallOptions.map((h: HallNode) => <option value={h.hall_name} />) }
                    </datalist>
                    <span className="popup__cmbx-arrow" />
                </div>

                <label htmlFor="filmName_cmbx" className="popup__label">Название фильма</label>
                <div className="popup__input popup__cmbx">
                    <input className="popup__cmbx-input" type="text" list="options2" id="filmName_cmbx" placeholder="Select an option" autoComplete="off" required />
                    <datalist id="options2">
                        { ...filmOptions.map((f: FilmNode) => <option value={f.film_name} />) }
                    </datalist>
                    <span className="popup__cmbx-arrow" />
                </div>

                <label htmlFor="timeInput1" className="popup__label">Время начала</label>
                <TimeInput />

                <div className="popup__btn-wrapper">
                    <button className="shadow popup__btn popup__btn_submit" type="submit">добавить сеанс</button>
                    <button className="shadow popup__btn" type="button" onClick={closePopup}>отмена</button>
                </div>
            </form>
        </div>
    )
}