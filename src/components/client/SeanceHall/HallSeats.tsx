
import { type JSX, type MouseEvent } from 'react';
import { type Ticket } from "../../../ts/API/IvkAPI";

export interface HallSeatsProps {
    seatsData: string[][],
    chosenTickets: Ticket[]
}

export default function HallSeats({ seatsData, chosenTickets }: HallSeatsProps) {
    const seatElements: JSX.Element[] = [];

    const cellClick = function (e: MouseEvent) {
        (e.target as HTMLElement).classList.toggle('hall__seat_chosen');
    }

    let i = 0;
    const seatsCount = seatsData[0]?.length;

    seatsData.flat().forEach((seatModifier: string) => {
        const isChosen = chosenTickets.find((t: Ticket) => (t.row - 1) * seatsCount + t.place - 1 === i);
        const additionalClasses = `hall__seat_${seatModifier} ${isChosen ? "hall__seat_chosen" : ""}`;
        seatElements.push(<div className={`hall__seat ${additionalClasses}`} onClick={ seatModifier !== "disabled" ? cellClick : ()=>{} }></div>);
        i++;
    })

    return (
        <div className="hall__seats" style={{ '--seats': seatsCount } as React.CSSProperties}>
            { ...seatElements }
        </div>
    )
}