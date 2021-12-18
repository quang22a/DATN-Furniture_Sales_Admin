import { Link } from "react-router-dom";

export const ListCategory = ({ data }) => {
  return (
    <>
      <ul className="row category-group">
        {data && Array.isArray(data) && data.length > 0
          ? data.map((item, index) => {
              return (
                <li
                  className={`category-item col-4 ${index === 1 ? "up" : ""}`}
                  key={`cate-${index}`}
                >
                  <Link to={`/product?category=${item?.title.toLowerCase()}`}>
                    <div className="cate-item-description">
                      <div className="cate-img">
                        <img src={item?.img} alt={item?.name} />
                      </div>
                      <div className="cate-body">
                        <div className="cate-title">
                          <h4 className="cate-name">{item?.name}</h4>
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
