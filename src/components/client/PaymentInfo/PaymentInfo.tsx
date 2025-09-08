// import type { Dispatch } from "redux";
import { /*useDispatch,*/ useSelector } from "react-redux";
// import { setNamedProp, type SetNamedPropAction } from "../../../ts/stateManagement/actions";

import { useNavigate } from "react-router-dom";
import ivkAPI from "../../../ts/API/IvkAPI";
import { type Ticket } from '../../../ts/API/IvkAPI'

import './PaymentInfo.css'
import type { appState } from "../../../ts/stateManagement/reducers";
// import { type Dispatch } from "redux";
// import { setTickets, type SetTicketsAction } from "../../../ts/stateManagement/actions_updated";
// import { type SetTicketInfoAction } from "../../../ts/stateManagement/actions_updated";

export interface PaymentInfoProps {
    filmName: string,
    hallName: string,
    seanceTime: string,
    // seats: Ticket[],
    seanceId: number,
    totalCost: number
}

export default function PaymentInfo() {
    // const { filmName, seats, hallName, seanceTime, seanceId, totalCost } = (useSelector((state: appState) => state.plain.props.paymentInfo));
    const paymentInfoProps = useSelector((state: appState) => state.client.paymentInfoProps)
    if(!paymentInfoProps) {
        throw new Error('No paymentInfoProps found')
    }
    const tickets = useSelector((state: appState) => state.client.tickets)
    if(! tickets) {
        throw new Error('No tickets chosen')
    }
    const { filmName, hallName, seanceTime, seanceId, totalCost } = paymentInfoProps;
    // const seanceDate = new Date(useSelector((state: appState) => state.plain.props.currentDate.selectedDateString));
    const seanceDate = new Date(useSelector((state: appState) => state.client.selectedDateString));
    const navigate = useNavigate();
    // const dispatch = useDispatch<Dispatch<SetNamedPropAction>>();
    // const dispatch = useDispatch<Dispatch<SetTicketsAction>>()

    const confirmBtnClick = async function() {
        const responce = await ivkAPI.buyTicket(seanceId, seanceDate, tickets)
        if(responce.success) {
            // dispatch(
            //     setNamedProp(
            //         'ticketInfo',
            //         responce.result
            //     )
            // )
            // dispatch(setTickets([]))
            navigate('/idyomVKino/ticket')
        } else {
            console.error(responce.error)
        }

    }

    return (
        <main className="payment">
            <h2 className="payment__heading ticket-border">вы выбрали билеты:</h2>
            <div className="payment__content ticket-border">
                <div className="payment__ticket-info">
                    <div className="payment__info-row">
                        <span className="payment__data-name">На фильм</span>
                        <span className="payment__data"> {filmName}</span>
                    </div>
                    <div className="payment__info-row">
                        <span className="payment__data-name">Места</span>
                        <span className="payment__data"> {tickets.map((t: Ticket) => `R${t.row}S${t.place}`).join(', ')}</span>
                    </div>
                    <div className="payment__info-row">
                        <span className="payment__data-name">В зале</span>
                        <span className="payment__data"> {hallName}</span>
                    </div>
                    <div className="payment__info-row">
                        <span className="payment__data-name">Начало сеанса</span>
                        <span className="payment__data"> {seanceTime}</span>
                    </div>
                    <div className="payment__info-row">
                        <span className="payment__data-name">Стоимость</span>
                        <span className="payment__data currency"> {totalCost}</span>
                    </div>
                </div>
                <button type="button" className="payment__get-qr-btn" onClick={confirmBtnClick}>получить код бронирования</button>
                <p className="payment__additional">После оплаты билет будет доступен в этом окне, а также придёт вам на
                    почту. Покажите QR-код нашему контролёру у входа в зал</p>
                <p className="payment__additional">Приятного просмотра!</p>
            </div>
        </main>
    )
}