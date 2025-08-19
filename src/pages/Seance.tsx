import Header from '../components/client/Header'
import SeanceHall, { type SeanceHallProps } from '../components/client/SeanceHall';

import { useParams, Link, useNavigate } from "react-router-dom"
// import PostComponent from "./components/PostComponent";

// export default function PostPage() {
    

export default function Seance() {
    // const { seanceId, date } = useParams();
    const seanceProps: SeanceHallProps = JSON.parse(useParams().seanceProps || "{}")
    seanceProps.date = new Date(seanceProps.date);

    return (
        <>
        <Header />
        <SeanceHall { ...seanceProps } />
        </>
    )
}