import FrontCard from "./front-card";
import "../css-files/home.css";
const CategoryShop = ({ title, datas }) => {
  return (
    <>
      <div className="display-card">
        <h3>{title}</h3>
        <div className="front-card-flex">
          {datas.map((data, index) => {
            return (
              <FrontCard
                key={index}
                logo={data.http}
                tag={data.category || data.sex}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default CategoryShop;
