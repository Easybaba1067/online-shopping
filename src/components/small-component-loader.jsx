import "../css-files/spinner.css";

const Spinner = () => {
  return (
    <div className="small-spinner-container">
      <div className="wave-loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Spinner;
