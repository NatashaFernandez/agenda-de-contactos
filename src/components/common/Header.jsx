import BackButton from "./BackButton";

const Header = ({title, goBackAction}) => {

    return(
        <header className={`app-header`}>
            <BackButton onGoBack={goBackAction}/>
            <h1 className={`app-header__title`}>{title}</h1>
        </header>
    );
}
export default Header;