import { type FormEvent, useContext } from "react"
// import { adminContext } from "../../../../pages/Admin"
import { adminContext } from "../../../../ts/stateManagement/adminContext"
import ivkAPI, { type HallNode } from "../../../../ts/API/IvkAPI"
import { SetHalls } from "../../../../ts/stateManagement/actions"

export default function AddHallPopup() {
    const { dispatch } = useContext(adminContext)

    const submitAdding = async function(e: FormEvent) {
        e.preventDefault()
        const newHallName: string = (e.target as HTMLFormElement).hallName.value

        const response = await ivkAPI.addHall(newHallName)
        if(response.success) {
            dispatch(SetHalls((response.result as { halls: HallNode[] }).halls))
        } else {
            alert(response.error)
        }

        closePopup()
    }

    const closePopup = function() {
        document.getElementById('addHallPopup')?.classList.add('hidden')
    }

    return (
        <div id="addHallPopup" className="popup-wrapper hidden">
            <form className="popup" id="add_hall" onSubmit={submitAdding}>
                <h1 className="popup__heading">
                    добавление зала
                    <a href="#" className="popup__close" onClick={(e: React.MouseEvent) => { e.preventDefault(); closePopup() } }></a>
                </h1>
                <label htmlFor="hallname_input" className="popup__label">Название зала</label>
                <input className="popup__input" type="text" name="hallName" id="hallname_input" placeholder='Например, "Зал 1"' required />
                <div className="popup__btn-wrapper">
                    <button className="shadow popup__btn popup__btn_submit" type="submit">добавить фильм{/*нет не ошибка так в тз было ничего менять не собираюсь*/}</button>
                    <button className="shadow popup__btn" type='button' onClick={closePopup}>отмена</button>
                </div>
            </form>
        </div>
    )
}