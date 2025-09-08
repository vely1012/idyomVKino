import Header from '../components/client/Header/Header'
import SeanceHall/*, { type SeanceHallProps }*/ from '../components/client/SeanceHall/SeanceHall';

// import { useParams } from "react-router-dom"
// import { useSelector } from 'react-redux';

export default function Seance() {
    // const { seanceId, date } = useParams();
    // const seanceProps: SeanceHallProps = JSON.parse(useParams().seanceProps || "{}")
    // seanceProps.date = new Date(seanceProps.date);
    // const seanceProps = useSelector((state: any) => state)

    return (
        <>
        <Header />
        {/* <SeanceHall { ...(seanceProps.props) } /> */}
        <SeanceHall />
        </>
    )
}