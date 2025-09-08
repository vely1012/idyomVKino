import { useEffect, useState, type FormEvent, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'redux';
import HallSeats from './HallSeats';


import ivkAPI, { /*type HallNode,*/ type Ticket } from '../../../ts/API/IvkAPI';

// import { type SetNamedPropAction, setNamedProp } from '../../../ts/stateManagement/actions';

import './SeanceHall.css';
import type { appState } from '../../../ts/stateManagement/reducers';
import { setPaymentInfo, /*setSeanceHall,*/ setTickets, type ClientAction, /*type SetPaymentInfoAction*/ } from '../../../ts/stateManagement/actions';

export interface SeanceHallProps {
    filmName: string,
    hallName: string,
    startingTime: string,
    hallPriceStandart: number,
    hallPriceVIP: number,
    seanceId: number,
    // chosenSeats: Ticket[],
}

export default function SeanceHall() {
    // const seanceHallProp = useSelector((state: any) =>  state.props.seanceHall)
    const seanceHallProps = useSelector((state: appState) => state.client.seanceHallProps)
    // const { filmName, hallName, hallPriceStandart, hallPriceVIP, startingTime, seanceId } = seanceHallProp
    if (!seanceHallProps) {
        throw new Error('No seanceHallProps found')
    }
    const { filmName, hallName, hallPriceStandart, hallPriceVIP, startingTime, seanceId } = seanceHallProps
    const chosenTickets: Ticket[] = useSelector((state: appState) => state.client.tickets) || []
    // const date = new Date(useSelector((state: appState) => state.plain.props.currentDate.selectedDateString))
    const date = new Date(useSelector((state: appState) => state.client.selectedDateString))

    const [hallSeats, setHallSeats] = useState<JSX.Element>(<></>);

    const navigate = useNavigate();
    // const dispatch = useDispatch<Dispatch<SetNamedPropAction>>();
    const dispatch = useDispatch<Dispatch<ClientAction>>();

    useEffect(() => {
        const fetchHallLayout = async () => {
            // let relevantData: any;
            let currentSeatsConfig: string[][];

            const responce = await ivkAPI.currentSeanceSeatsConfig(seanceId, date);
            if (responce.success) {
                // relevantData = responce.result;
                // currentSeatsConfig = (responce.result as HallNode).hall_config
                currentSeatsConfig = responce.result as string[][]
            } else {
                // relevantData = [];
                currentSeatsConfig = []
                console.error(responce.error);
            }

            // const seatElements = HallSeats(relevantData, seanceHallProp.chosenSeats);
            // const seatElements = <HallSeats seatsData={relevantData} chosenSeats={seanceHallProps.chosenSeats} />;
            // const seatElements = <HallSeats seatsData={currentSeatsConfig} chosenTickets={seanceHallProps.chosenSeats} />;
            const seatElements = <HallSeats seatsData={currentSeatsConfig} chosenTickets={chosenTickets} />;

            setHallSeats(seatElements);
        };

        fetchHallLayout();
    }, []);

    return (
        <main className="hall">
            <div className="hall__info">
                <div className="hall__seanse-data">
                    <h2 className="hall__film-title">{filmName}</h2>
                    <span className="hall__seanse-starts-at">Начало сеанса: {startingTime}</span>
                    <h2 className="hall__name">{hallName}</h2>
                </div>
                <div id="mobile_hint" className="hall__mobile-hint">
                    <img src="data:image/svg+xml,%3Csvg width='25' height='33' viewBox='0 0 25 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.0522 14.9998C16.0522 12 20.0522 12 20.0522 14.9998V17.4998C20.0522 14.4998 24.0522 14.4998 24.0522 17.4998V25.9998C24.0522 28.7997 19.0523 31.4995 16.0522 31.4998C10.4522 31.8998 4.0524 22 1.55224 17C-0.447758 13.8 3.55271 13.5 4.55224 14.5L7.55224 17.4999V6.9999C7.55224 4.00001 12.0522 4.00005 12.0522 6.9999V14M16.0522 14.9998V17M16.0522 14.9998V14C16.0522 11.4999 12.0522 11.6 12.0522 14M12.0522 14V17.4999M5.55273 9L2.05273 10M14.0527 9L17.5527 10M13.0527 5L16.0527 3M9.55273 3.5V0M6.05273 5L3.55273 3' stroke='black'/%3E%3C/svg%3E%0A"
                        alt="" className="hall__tap-icon" />
                    <p className="hall__mobile-hint-text">Тапните дважды, чтобы увеличить</p>
                </div>
            </div>
            <form className="hall__booking" onSubmit={function (e: FormEvent) {
                e.preventDefault();

                const allSeats = Array.from((e.target as HTMLFormElement).querySelectorAll('.hall__seat'))
                const currentChosenTickets: Ticket[] = []
                const hallSeatsEl = (e.target as HTMLFormElement).querySelector('.hall__seats') as HTMLElement
                const seatsCount = Number(hallSeatsEl.style.getPropertyValue('--seats'))


                allSeats.forEach((e: Element, i: number) => {
                    const seat = e as HTMLElement;

                    if (seat.classList.contains('hall__seat_chosen')) {
                        const isVipSeat = seat.classList.contains('hall__seat_vip');
                        currentChosenTickets.push({
                            row: Math.floor(i / seatsCount) + 1,
                            place: i % seatsCount + 1,
                            coast: isVipSeat ? hallPriceVIP : hallPriceStandart,
                        })
                    }
                })

                const totalCost = currentChosenTickets.reduce((cost: number, ticket: Ticket) => cost + ticket.coast, 0)

                if (currentChosenTickets.length === 0) {
                    alert('Выберете хотя бы одно место')
                    return
                }

                // dispatch(
                //     setNamedProp(
                //         'seanceHall',
                //         {
                //             ...seanceHallProps,
                //             chosenSeats
                //         }
                //     )
                // )
                // const newSeanceHallProps = {...seanceHallProps, seats: chosenSeats }
                dispatch(setTickets(currentChosenTickets))

                // dispatch(
                //     setNamedProp(
                //         'paymentInfo', 
                //         {
                //             filmName: filmName,
                //             seats: chosenSeats,
                //             hallName: hallName,
                //             seanceTime: startingTime,
                //             seanceId: seanceId,
                //             totalCost: totalCost
                //         }
                //     )
                // )
                dispatch(
                    setPaymentInfo(
                        {
                            filmName: filmName,
                            hallName: hallName,
                            seanceTime: startingTime,
                            seanceId: seanceId,
                            totalCost: totalCost
                        }
                    )
                )

                navigate('/payment');
            }}>
                <div className="hall__seats-manager">
                    <span className="hall__screen">экран</span>
                    {hallSeats}
                    <div className="hall__legend">
                        <div className="hall__legend-item">
                            <div className="hall__icon-seat hall__icon-seat_available"></div>
                            <span className="hall__legend-item-text currency">Свободно ({hallPriceStandart})</span>
                        </div>
                        <div className="hall__legend-item">
                            <div className="hall__icon-seat hall__icon-seat_occupied"></div>
                            <span className="hall__legend-item-text">Занято</span>
                        </div>
                        <div className="hall__legend-item">
                            <div className="hall__icon-seat hall__icon-seat_vip"></div>
                            <span className="hall__legend-item-text currency">Свободно ({hallPriceVIP})</span>
                        </div>
                        <div className="hall__legend-item">
                            <div className="hall__icon-seat hall__icon-seat_chosen"></div>
                            <span className="hall__legend-item-text">Выбрано</span>
                        </div>
                    </div>
                </div>
                <div className="hall__confirm-wrapper">
                    <button type="submit" className="shadow hall__confirm-booking">забронировать</button>
                </div>
            </form>
        </main>
    )
}