import { Link } from 'react-router-dom'
import DateBar from '../DateBar/DateBar'

import './IndexHeader.css'

export default function IndexHeader() {
    return (
        <header className="header">
            <div className="header__top">
                <Link to="/idyomVKino/" className="header__logo" tabIndex={-1} ></Link>
                <Link to="/idyomVKino/login" className="header__log-in">войти</Link>
            </div>
            <DateBar />
        </header>
    )
}