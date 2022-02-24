import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import Pagination from "@mui/material/Pagination";

import { Search } from "../../../shared/components/search";
import { getListProduct, editProduct, deleteProduct } from "../stores/action";
import { convertDate } from "../../../shared/helpers/utils/convertDate";

const ProductList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [dataShow, setDataShow] = useState();
  const [search, setSearch] = useState("");
  const role = JSON.parse(localStorage.getItem("userInfo"))?.role;

  const listProducts = useSelector((state) => state.productReducer.dataList);

  const columns = [
    { id: "name", label: "Tên sản phẩm", align: "left" },
    { id: "image", label: "Ảnh" },
    {
      id: "price",
      label: "Giá",
      type: "number",
      align: "right",
    },
    {
      id: "quantity",
      label: "Số lượng",
      type: "number",
      align: "right",
    },
    {
      id: "rating",
      label: "Đánh giá",
      type: "number",
      align: "right",
    },
    {
      id: "createdAt",
      label: "Ngày tạo",
    },
    {
      id: "updatedAt",
      label: "Ngày cập nhật",
    },
    {
      id: "isActive",
      label: "Trạng thái",
      type: "boolean",
      align: "center",
    },
    {
      id: "action",
      label: "",
    },
  ];

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(getListProduct(page, search));
  }, [page, search]);

  useEffect(() => {
    if (listProducts) {
      setDataShow(listProducts.result);
    }
  }, [listProducts]);

  const changeStatus = async (_id) => {
    const product = dataShow?.find((item) => item._id === _id);
    delete product._id;
    product.isActive = !product.isActive;
    await dispatch(editProduct(_id, product));
    await dispatch(getListProduct(page));
  };

  const deletePr = async (_id) => {
    await dispatch(deleteProduct(_id));
    await dispatch(getListProduct(page));
  };

  return (
    <section className="section-product-list grid-data">
      <div className="container">
        <p className="title">Sản phẩm</p>
        <Link to="/products/add-product" className="btn btn-primary">
          Thêm
        </Link>
        <Search setSearch={setSearch} placeholder="sản phẩm" />
        {dataShow ? (
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataShow &&
                    dataShow.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            let value = row[column.id];
                            if (
                              column.id === "createdAt" ||
                              column.id === "updatedAt"
                            ) {
                              value = convertDate(value);
                            }
                            if (column.id === "isActive") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Switch
                                    {...label}
                                    style={{ textAlign: "center" }}
                                    checked={value}
                                    onChange={() => changeStatus(row._id)}
                                  />
                                </TableCell>
                              );
                            }
                            if (column.id === "image") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <div className="img-item">
                                    <img
                                      src={row[column.id]}
                                      alt={row["name"]}
                                    />
                                  </div>
                                </TableCell>
                              );
                            }
                            if (column.id === "action") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Link
                                    to={`/products/${row._id}`}
                                    className="btn btn-edit"
                                  >
                                    Chi tiết
                                  </Link>
                                  {role && role === "admin" && (
                                    <button
                                      className="btn btn-delete"
                                      onClick={() => deletePr(row._id)}
                                    >
                                      Xóa
                                    </button>
                                  )}
                                </TableCell>
                              );
                            }
                            if (column.id === "rating") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value} <i className="far fa-star active"></i>
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="pagination">
              <Pagination
                count={listProducts?.numPages}
                showFirstButton
                showLastButton
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                }}
              />
            </div>
          </Paper>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default ProductList;
