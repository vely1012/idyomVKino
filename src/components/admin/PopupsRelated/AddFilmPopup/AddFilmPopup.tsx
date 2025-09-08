import { useContext, type FormEvent } from "react"
// import { useSelector } from "react-redux"
// import { setNamedProp } from "../../../../ts/stateManagement/actions"
import ivkAPI, { type FilmNode} from "../../../../ts/API/IvkAPI"
// import { adminContext } from "../../../../pages/Admin"
// import { adminContext } from "../../../../pages/Admin"
import { adminContext } from "../../../../ts/stateManagement/adminContext"
// import { type appState } from "../../../../ts/stateManagement/reducers"
import { SetFilms } from "../../../../ts/stateManagement/actions"
// import { useDispatch } from "react-redux"

export default function AddFilmPopup() {
    // const { active } = useSelector((state: appState) => state.plain.props.addFilmPopup) || { active: false }
    const { dispatch } = useContext(adminContext)

    const submitAdding = async function (e: FormEvent) {
        e.preventDefault()
        const popup = e.target as HTMLFormElement

        const filmName = popup.filmName.value
        const filmDuration = Number(popup.filmDuration.value)
        const filmDescription = popup.filmDescription.value
        const filmOrigin = popup.filmOrigin.value
        const filmPoster = popup.filmPoster.files[popup.filmPoster.files.length - 1]
        
        const response = await ivkAPI.addFilm(filmName, filmDuration, filmDescription, filmOrigin, filmPoster)
        
        if(response.success) {
            // dispatch(
            //     setNamedProp(
            //         'adminData',
            //         {
            //             ...adminData
            //         }
            //     )
            // )
            dispatch(SetFilms((response.result as { films: FilmNode[] }).films))
            closePopup()
        } else {
            alert(response.error)
        }

    }

    const closePopup = function () {
        // dispatch(
        //     setNamedProp(
        //         'addFilmPopup',
        //         {
        //             active: false,
        //         }
        //     )
        // )
        document.getElementById('addFilmPopup')?.classList.add('hidden')
    }

    const loadPoster = function() {
        document.getElementById('filmPoster_input')?.click()
    }

    return (
        <div id="addFilmPopup" className="popup-wrapper hidden">
            <form className="popup" id="add_seance" onSubmit={submitAdding}>
                <h1 className="popup__heading">
                    добавление фильма
                    <a href="#" className="popup__close" onClick={(e: React.MouseEvent) => { e.preventDefault(); closePopup() } }></a>
                </h1>
                <label htmlFor="filmName_input" className="popup__label">Название фильма</label>
                <input className="popup__input" type="text" name="filmName" id="filmName_input" placeholder='Например, "Гражданин Кейн"' required />
                
                <label htmlFor="filmDuration_input" className="popup__label">Продолжительность фильма (мин.)</label>
                <input className="popup__input" type="number" min={1} max={240} step={1} name="filmDuration" id="filmDuration_input" required />
                
                <label htmlFor="filmDescription_input" className="popup__label">Описание фильма</label>
                <textarea className="popup__input popup__input_textarea" maxLength={500} name="filmDescription" id="filmDescription_input" required></textarea>

                <label htmlFor="filmOrigin_input" className="popup__label">Страна</label>
                <input className="popup__input" type="text" name="filmOrigin" id="filmOrigin_input" required />
                
                <input type="file" name="filmPoster" id="filmPoster_input" className="hidden" />

                <div className="popup__btn-wrapper">
                    <button className="shadow popup__btn popup__btn_submit" type="submit">добавить фильм</button>
                    <button className="shadow popup__btn popup__btn_submit" type="button" onClick={loadPoster}>загрузить постер</button>
                    <button className="shadow popup__btn" type="button" onClick={closePopup}>отменить</button>
                </div>
            </form>
        </div>
    )
}