import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="header">
            <div className="header__top">
                {/* <a href="#" className="header__logo" tabIndex={-1} ></a> */}
                <Link to="/" className="header__logo" tabIndex={-1} ></Link>
            </div>
        </header>
    )
}