import goBackButtonIcon from "../../assets/Icons/go-back.svg";
import { useNavigate } from "react-router-dom";

const BackButton = ({ onBack }) => {
  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => (onBack ? onBack() : navigate(-1))}
    >
      <img src={goBackButtonIcon} alt="" />
    </button>
  );
};

export default BackButton;
