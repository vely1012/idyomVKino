import AddHallPopup from "../AddHallPopup/AddHallPopup"
import AddSeancePopup from "../AddSeancePopup/AddSeancePopup"
import AddFilmPopup from "../AddFilmPopup/AddFilmPopup"

import '../Popups.css'

export default function PopupsContainer() {
    return (
        <>
            <AddHallPopup />
            <AddSeancePopup />
            <AddFilmPopup />
        </>
    )
}