function Popup({ message, show, color }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "30px",
        right: "50px",
        zIndex: "2",
        background: color,
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
      }}
    >
      {message}
    </div>
  );
}

export default Popup;
