import goBackButtonIcon from "../../assets/Icons/go-back.svg";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const onGoback = () => navigate(-1);

  return (
    <button className="back-button" onClick={onGoback}>
      <img src={goBackButtonIcon} alt="" />
    </button>
  );
};

export default BackButton;
