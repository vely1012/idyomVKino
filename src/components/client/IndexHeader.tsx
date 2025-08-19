import { Link } from 'react-router-dom'

export default function IndexHeader() {
    return (
        <header className="header">
            <div className="header__top">
                <Link to="/" className="header__logo" tabIndex={-1} ></Link>
                <Link to="/login" className="header__log-in">войти</Link>
            </div>
            <div className="header__date-bar">
                <a href="#" className="shadow header__date">Пн, 31</a>
                <a href="#" className="shadow header__date">Вт, 1</a>
                <a href="#" className="shadow header__date header__date_current">Ср, 2</a>
                <a href="#" className="shadow header__date">Чт, 3</a>
                <a href="#" className="shadow header__date">Пт, 4</a>
                <a href="#" className="shadow header__date header__date_weekend">Сб, 5</a>
                <a href="#" className="shadow header__date">&gt;</a>
            </div>
        </header>
    )
}