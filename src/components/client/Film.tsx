import { Link } from 'react-router-dom'
import { type JSX } from "react"

export interface Seance {
    id: number,
    hallId: number,
    hallName: string,
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
        // Find the group for the current object's id
        const group: any = acc.find((e: Seance[]) => e[0].hallName === s.hallName);

        // If the group exists, push the object into it
        if (group) {
            group.push(s);
        } else {
            // If not, create a new group
            acc.push([s]);
        }

        return acc;
    }, []);

    return (
        <>
            {...hallSeances.map((hallData: Seance[]) => {
                return (
                    <div className="film__booking">
                        <h2 className="film__booking-hall">{hallData[0].hallName}</h2>
                        <div className="film__seanses">
                            {...hallData.map((s: Seance) =>
                                // <Link to={`/seance/${s.id}/${new Date()}`} className="shadow film__time">{s.time}</Link>
                                <Link to={`/seance/${
                                    JSON.stringify({
                                        filmName: filmName,
                                        hallName: s.hallName,
                                        startingTime: s.time,
                                        seanceId: s.id,
                                        date: new Date()
                                    })
                                }`} className="shadow film__time">{s.time}</Link>
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