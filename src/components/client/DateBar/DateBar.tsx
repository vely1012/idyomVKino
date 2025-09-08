import { type  Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// import { type SetNamedPropAction, setNamedProp } from '../../../ts/stateManagement/actions';
import { type MouseEvent } from 'react'

import './DateBar.css'
import { selectDate, type SelectDateAction } from '../../../ts/stateManagement/actions';
import { type appState } from '../../../ts/stateManagement/reducers';

export default function DateBar() {
    // const dispatch = useDispatch<Dispatch<SetNamedPropAction>>();
    const dispatch = useDispatch<Dispatch<SelectDateAction>>();

    const today = new Date();
    // const selectedDateString = useSelector((state: appState) => state.plain.props.currentDate.selectedDateString)
    const selectedDateString = useSelector((state: appState) => state.client.selectedDateString)

    const dates = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);

        const day = date.toLocaleString('ru-RU', { weekday: 'short' });
        const dayNumber = date.getDate();
        const isWeekend = date.getDay() % 6 == 0;
        const isSelected = date.toDateString() === selectedDateString;
        const classes = `shadow header__date ${isSelected ? 'header__date_current' : ''} ${isWeekend ? 'header__date_weekend' : ''}`;

        const dateClick = (e: MouseEvent) => {
            e.preventDefault();
            // dispatch(
            //     setNamedProp(
            //         'currentDate',
            //         {
            //             selectedDateString: date.toDateString()
            //         }
            //     )
            // )
            dispatch(selectDate(date.toDateString()))
        };

        return (
            <a key={index} href="#" className={classes} onClick={dateClick}>
                {`${day}, ${dayNumber}`}
            </a>
        );
    });
    
    return (
        <div className="header__date-bar">
            { ...dates }
        </div>
    );
}
