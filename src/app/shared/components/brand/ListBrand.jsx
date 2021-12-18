import { Link } from "react-router-dom";

export const ListBrand = ({ data }) => {
  return (
    <>
      <ul className="row brand-group">
        {data && Array.isArray(data) && data.length > 0
          ? data.map((item, index) => {
              return (
                <li
                  className={`brand-item col-3 ${index === 1 ? "up" : ""}`}
                  key={`brand-${index}`}
                >
                  <Link to={`/product?brands=${item?.title}`}>
                    <div className="brand-item-description">
                      <div className="product-img">
                        <img src={item?.img} alt={item?.name} />
                      </div>
                      <div className="brand-body">
                        <div className="product-title">
                          <h4 className="product-name">{item?.name}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
          : ""}
      </ul>
    </>
  );
};
