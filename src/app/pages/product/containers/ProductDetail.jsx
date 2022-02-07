import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { getDetailProduct, getRatings } from "../stores/action";
import { getListBrandNotPag } from "../../brand/stores/action";
import { getListCategoryNotPag } from "../../category/stores/action";
import ListComment from "../components/ListComment";
import Switch from "@mui/material/Switch";

const ProductDetail = () => {
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector((state) => state.productReducer.dataDetail);
  const listCategories = useSelector(
    (state) => state.categoryReducer.dataListNotPag
  );
  const listBrands = useSelector((state) => state.brandReducer.dataListNotPag);
  const listRatings = useSelector((state) => state.productReducer.listRatings);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getListCategoryNotPag());
      await dispatch(getListBrandNotPag());
      await dispatch(getDetailProduct(id));
      await dispatch(getRatings(id));
      setIsData(true);
    };
    getData();
  }, []);
  useEffect(() => {
    console.log(listRatings);
  }, [listRatings]);

  return (
    <section className="section-product-detail">
      <div className="container">
        <p className="title">Chi tiết sản phẩm</p>
        {productDetail && isData && listCategories && listBrands ? (
          <>
            <div className="product-detail row">
              <div className="col-6 product-detail-img">
                <img src={productDetail.image} alt={productDetail.name} />
              </div>
              <div className="col-6">
                <div className="form-row form-detail">
                  <p>Tên:</p>
                  <p>{productDetail?.name}</p>
                </div>
                <div className="form-row form-detail">
                  <p>Mô tả:</p>
                  <p>{productDetail?.description}</p>
                </div>
                <div className="form-row form-detail">
                  <p>Danh mục:</p>
                  <p>
                    {
                      listCategories?.find(
                        (item) => item._id === productDetail.categoryId
                      )?.name
                    }
                  </p>
                </div>
                <div className="form-row form-detail">
                  <p>Thương hiệu:</p>
                  <p>
                    {
                      listBrands?.find(
                        (item) => item._id === productDetail.brandId
                      )?.name
                    }
                  </p>
                </div>
                <div className="form-row form-detail">
                  <p>Chất liệu:</p>
                  <p>{productDetail?.material}</p>
                </div>
                <div className="form-row form-detail">
                  <p>Giá:</p>
                  <p>{productDetail?.price}</p>
                </div>
                <div className="form-row form-detail">
                  <p>Số lượng:</p>
                  <p>{productDetail?.quantity}</p>
                </div>
                <div className="form-row form-detail">
                  <p>Trạng thái:</p>
                  <Switch
                    {...label}
                    style={{ textAlign: "center" }}
                    checked={productDetail?.isActive}
                  />
                </div>
                <div className="form-row form-detail">
                  <p>Giảm giá:</p>
                  <p>{`${productDetail?.discount || 0}%`}</p>
                </div>
                <div className="action-profile action-edit">
                  <Link to="update" className="btn btn-primary">
                    Sửa
                  </Link>
                  <button
                    className="btn btn-black"
                    onClick={() => navigate(-1)}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
            <ListComment data={listRatings} />
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
