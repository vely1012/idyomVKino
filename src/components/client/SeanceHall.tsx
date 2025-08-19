import { Link } from 'react-router-dom'
import { useEffect, useState, type JSX } from 'react';
import { default as ivkAPI } from '../../ts/API/Request';

export interface SeanceHallProps {
    filmName: string,
    hallName: string,
    startingTime: string,
    seanceId: number,
    date: Date
}

function formSeats(seatsData: string[][]): JSX.Element {
    // standart - Обычное место
    // vip - ВИП место
    // taken - Занятое место (которое уже купили)
    // disabled - Неактивное место (его нельзя ни купить ни продать)

    // a (seat value -> classModifier) map
    let classModifier: any = {
        standart: 'available',
        vip: 'vip',
        taken: 'occupied',
        disabled: 'disabled'
    }
    let seatElements: JSX.Element[] = [];

    seatsData.flat().forEach((seat: string) => {
        seatElements.push(<div className={`hall__seat hall__seat_${classModifier[seat]}`}></div>)
    })

    return (
        <div className="hall__seats">
            { ...seatElements }
        </div>
    )
}

export default function SeanceHall({ filmName, hallName, startingTime, seanceId, date, }: SeanceHallProps) {
    const [hallSeats, setHallSeats] = useState<JSX.Element>(<></>);

    useEffect(() => {
            const fetchHallLayout = async () => {
                let relevantData: any;
    
                let responce = await ivkAPI.currentSeanceSeatsConfig(seanceId, date);
                if(responce.success) {
                    relevantData = responce.result;
                } else {
                    relevantData = [];
                    console.error(responce.error);
                }

                setHallSeats(formSeats(responce.result));
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
            <form className="hall__booking">
                <div className="hall__seats-manager">
                    <span className="hall__screen">экран</span>
                    { hallSeats }
                    <div className="hall__legend">
                        <div className="hall__legend-item">
                            <div className="hall__icon-seat hall__icon-seat_available"></div>
                            <span className="hall__legend-item-text">Свободно (250Р)</span>
                        </div>
                        <div className="hall__legend-item">
                            <div className="hall__icon-seat hall__icon-seat_occupied"></div>
                            <span className="hall__legend-item-text">Занято</span>
                        </div>
                        <div className="hall__legend-item">
                            <div className="hall__icon-seat hall__icon-seat_vip"></div>
                            <span className="hall__legend-item-text">Свободно (350Р)</span>
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