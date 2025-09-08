import { Link } from 'react-router-dom'
import { type JSX } from "react"
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';

import './Film.css';
import { setSeanceHall, setTickets, type ClientAction } from '../../../ts/stateManagement/actions';

export interface Seance {
    id: number,
    hallId: number,
    hallName: string,
    hallPriceStandart: number,
    hallPriceVIP: number,
    filmId: number,
    time: string
}

export interface FilmProps {
    filmName: string,
    posterSrc: string,
    description: string,
    duration: number,
    origin: string,

    seances: Seance[],
}

function SortSeances(filmName:string, seances: Seance[]): JSX.Element {
    const hallSeances = seances.reduce((acc: Seance[][], s) => {
        const group: Seance[] | undefined = acc.find((e: Seance[]) => e[0].hallName === s.hallName);

        if (group) {
            group.push(s);
        } else {
            acc.push([s]);
        }

        return acc;
    }, []);

    const dispatch = useDispatch<Dispatch<ClientAction>>();

    const onLinkClick = (s: Seance) => {
        dispatch(setTickets([]))
        dispatch(
            setSeanceHall(
                {
                    filmName: filmName,
                    hallName: s.hallName,
                    startingTime: s.time,
                    hallPriceStandart: s.hallPriceStandart,
                    hallPriceVIP: s.hallPriceVIP,
                    seanceId: s.id,
                }
            )
        )
    }

    return (
        <>
            {...hallSeances.map((hallData: Seance[]) => {
                return (
                    <div className="film__booking">
                        <h2 className="film__booking-hall">{hallData[0].hallName}</h2>
                        <div className="film__seanses">
                            {...hallData.map((s: Seance) =>
                                <Link
                                    to='/seance'
                                    onClick={() => { onLinkClick(s) }}
                                    className="shadow film__time">
                                    {s.time}
                                </Link>
                            )}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default function Film({ filmName, posterSrc, description, duration, origin, seances }: FilmProps) {

    return (
        <article className="film">
            <div className="film__info">
                <img src={posterSrc} alt={`${filmName} poster`} className="film__poster" />
                <div className="film__text-wrapper">
                    <h2 className="film__title">{filmName}</h2>
                    <p className="film__description">{description}</p>
                    <span className="film__additional-info">{duration} min, {origin}</span>
                </div>
            </div>
            <div className="film__booking-options">
                { SortSeances(filmName, seances) }
            </div>
        </article>
    )
}