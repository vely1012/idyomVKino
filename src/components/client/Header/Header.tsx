import { Link } from 'react-router-dom'

import './Header.css'

export default function Header() {
    return (
        <header className="header">
            <div className="header__top">
                <Link to="/idyomVKino/" className="header__logo" tabIndex={-1} ></Link>
            </div>
        </header>
    )
}