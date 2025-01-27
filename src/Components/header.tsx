import newsIcon from "../assets/news-icon.jpeg";
import "./Header.css";
function Header(){
    return (
        <header className="header">
            <img src={newsIcon} alt="News Icon" className="header-icon"/>
            <h1 className="header-title">News App </h1>
        </header>
    )
}

export default Header;