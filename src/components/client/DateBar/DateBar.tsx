import { type Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useState, type MouseEvent, type JSX } from 'react';

import { selectDate, type SelectDateAction } from '../../../ts/stateManagement/actions';
import { type appState } from '../../../ts/stateManagement/reducers';

import './DateBar.css';

export default function DateBar() {
    const dispatch = useDispatch<Dispatch<SelectDateAction>>();
    const [datePage, setDatePage] = useState(0);
    
    const selectedDateString = useSelector((s: appState) => s.client.selectedDateString);
    const selectedDate: Date = new Date(selectedDateString);
    const dbFirstDate: Date = new Date();
    dbFirstDate.setDate(dbFirstDate.getDate() + datePage * 5);

    dbFirstDate.setHours(0,0,0,0);
    selectedDate.setHours(0,0,0,0);
    const daysDiff = (Number(selectedDate) - Number(dbFirstDate)) / 86400000; 
    let selectedDateIndex = daysDiff;
    
    if(daysDiff < 0 || daysDiff > 5 + Number(datePage === 0)) {
        selectedDateIndex = 1;
    }

    let dateBarElements : JSX.Element[] = [];

    const getDateElement = (index: number) => {
        const date = new Date(dbFirstDate);
        date.setDate(dbFirstDate.getDate() + index);

        const day = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][date.getDay()];
        const dayNumber = date.getDate();
        const isWeekend = date.getDay() % 6 == 0;
        const isSelected = index === selectedDateIndex;
        const classes = `shadow header__date ${isSelected ? 'header__date_selected' : ''} ${isWeekend ? 'header__date_weekend' : ''}`;

        const topTextContent = !index ? "Сегодня" : `${day},`;
        const bottomTextContent = !index ? `${day}, ${dayNumber}` : `${dayNumber}`;

        const dateClick = (e: MouseEvent) => {
            e.preventDefault();
            dispatch(selectDate(date.toDateString()));
        };

        return (
            <a key={index} href="#" className={classes} onClick={dateClick}>
                {topTextContent}
                <br />
                {bottomTextContent}
            </a>
        );
    }

    for(let i = 1; i < 6; i++) {
        dateBarElements.push(getDateElement(i));
    }


    const rewindDatesForwards = () => {
        setDatePage(p => p + 1);
        dbFirstDate.setDate(dbFirstDate.getDate() + 6);
        dispatch(selectDate(dbFirstDate.toDateString()));
    };
    const rewindDatesBackwards = () => {
        setDatePage(p => p - 1);
        dbFirstDate.setDate(dbFirstDate.getDate() - 4);
        dispatch(selectDate(dbFirstDate.toDateString()));
    };

    if(datePage !== 0) {
        dateBarElements.unshift(<a key={0} href="#" className="shadow header__date header__date_prev" onClick={rewindDatesBackwards}></a>); 
    } else {
        dateBarElements.unshift(getDateElement(0));
    }

    dateBarElements[6] = <a key={6} href="#" className="shadow header__date header__date_next" onClick={rewindDatesForwards}></a>;
    
    return (
        <div className="header__date-bar">
            {...dateBarElements}
        </div>
    );
}
