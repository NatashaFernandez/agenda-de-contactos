import goBackButtonIcon from "../../img/go-back.svg";

const BackButton = ({onGoback}) => {

    return(
    <>
        {!onGoback ? <></>:
        <button className="body__go-back-btn" onClick={onGoback}>
            <img src={goBackButtonIcon} alt="" />
        </button>
        }
    </>
    );
}

export default BackButton;