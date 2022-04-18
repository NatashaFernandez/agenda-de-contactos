import { useNavigate } from "react-router-dom";
import Button from "./Button";

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
const FloatingButton = ({
  title,
  img,
  urlToAction,
  shouldReplace,
  className,
  tooltip,
}) => {
  const navigate = useNavigate();

  const goToAction = () => {
    navigate(urlToAction, { replace: shouldReplace });
  };

  return (
    <Button
      className={`${className} --is-floating-btn`}
      action={goToAction}
      icon={img}
      label={title}
      tooltip={tooltip}
      toolTipDirection={"left"}
    />
  );
};

export default FloatingButton;
