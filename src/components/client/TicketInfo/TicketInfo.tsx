import { useSelector } from "react-redux";
import { type Ticket } from '../../../ts/API/IvkAPI'
import QRCode from "react-qr-code";
import type { appState } from "../../../ts/stateManagement/reducers";

import './TicketInfo.css'

export default function TicketInfo() {
    const paymentInfoProps = useSelector((state: appState) => state.client.paymentInfoProps)
    if(!paymentInfoProps) {
        throw new Error('No paymentInfoProps found')
    }
    const tickets = useSelector((state: appState) => state.client.tickets)
    if(!tickets) {
        throw new Error('No tickets chosen')
    }
    const { filmName, hallName, seanceTime, totalCost } = paymentInfoProps;

    const ticketsData = tickets.reduce((ticketStrings: string[], t: Ticket) => { ticketStrings.push(JSON.stringify(t)); return ticketStrings }, [])
    const qrValue = ticketsData.join('\n')

    return (
        <main className="ticket">
            <h2 className="ticket__heading ticket-border">электронный билет</h2>
            <div className="ticket__content ticket-border">
                <div className="ticket__ticket-info">
                    <div className="ticket__info-row">
                        <span className="ticket__data-name">На фильм</span>
                        <span className="ticket__data"> {filmName}</span>
                    </div>
                    <div className="ticket__info-row">
                        <span className="ticket__data-name">Места</span>
                        <span className="ticket__data"> {tickets.map((t: Ticket) => `R${t.row}S${t.place}`).join(', ')}</span>
                    </div>
                    <div className="ticket__info-row">
                        <span className="ticket__data-name">В зале</span>
                        <span className="ticket__data"> {hallName}</span>
                    </div>
                    <div className="ticket__info-row">
                        <span className="ticket__data-name">Начало сеанса</span>
                        <span className="ticket__data"> {seanceTime}</span>
                    </div>
                    <div className="ticket__info-row">
                        <span className="ticket__data-name">Стоимость</span>
                        <span className="ticket__data currency"> {totalCost}</span>
                    </div>
                </div>
                {
                    // single QR containing all booked tickets info
                    <QRCode value={qrValue} className="ticket__qr"/>
                }
                {
                    // each ticket is represented as an individual QR
                    /* {...ticketsData.map((td: string) => <QRCode value={td} className="ticket__qr"/>)} */
                }

                <p className="ticket__additional">Покажите QR-код нашему контролёру для подтверждения бронирования</p>
                <p className="ticket__additional">Приятного просмотра!</p>
            </div>
        </main>
    )
}