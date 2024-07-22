import airplane from "../../../assets/airplane.png";
import "./Airplane.scss";

export const Airplane = () => {
  return (
    <div className="airplane">
      <img className="airplane__img" src={airplane} alt="airplane" />
    </div>
  );
};
