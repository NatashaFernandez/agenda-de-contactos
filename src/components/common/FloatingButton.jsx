import { useNavigate } from "react-router-dom";

/**
 *
 * @param {{
 *  title?:string,
 *  img?: string,
 *  urlToAction: string,
 *  shouldReplace?: boolean
 * }} param0
 * @returns
 */
const FloatingButton = ({ title, img, urlToAction, shouldReplace}) => {
  const navigate = useNavigate();
  
  const goToAction = () => {
    navigate(urlToAction, {replace: shouldReplace});
  };

  return (
    <button className="body__action-btn" onClick={goToAction}>
      {img ? <img src={img} alt="" /> : "+"}
      {`${title ? title : ""}`}
    </button>
  );
};

export default FloatingButton;
