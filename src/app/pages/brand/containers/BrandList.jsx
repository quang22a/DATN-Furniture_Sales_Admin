import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getListBrand, editBrand, deleteBrand } from "../stores/action";
import { convertDate } from "../../../shared/helpers/utils/convertDate";

const BrandList = () => {
  const dispatch = useDispatch();
  
  const [page, setPage] = useState(1);
  const [dataShow, setDataShow] = useState();
  const [search, setSearch] = useState("");

  const listBrands = useSelector((state) => state.brandReducer.dataList);

  const columns = [
    { id: "name", label: "Thương hiệu", align: "left" },
    { id: "image", label: "Ảnh" },
    {
      id: "isFeatured",
      label: "Xu hướng",
      type: "boolean",
      align: "center",
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
      id: "action",
      label: "",
    },
  ];

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(getListBrand(page, search));
  }, [page, search]);

  useEffect(() => {
    if (listBrands) {
      setDataShow(listBrands.result);
    }
  }, [listBrands]);

  const changeFeatured = async (_id) => {
    const brand = dataShow?.find((item) => item._id === _id);
    delete brand._id;
    brand.isFeatured = !brand.isFeatured;
    await dispatch(editBrand(_id, brand));
    await dispatch(getListBrand());
  };

  const deleteBr = async (_id) => {
    await dispatch(deleteBrand(_id));
    await dispatch(getListBrand());
  };

  return (
    <section className="section-category-list grid-data">
      <div className="container">
        <p className="title">Thương hiệu</p>
        <Link to="/brands/add-brand" className="btn btn-primary">
          Thêm
        </Link>
        <Search setSearch={setSearch} placeholder="thương hiệu sản phẩm" />
        {dataShow ? (
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                  {dataShow.map((row) => {
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
                          if (column.id === "isFeatured") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Switch
                                  {...label}
                                  style={{ textAlign: "center" }}
                                  checked={value}
                                  onChange={() => changeFeatured(row._id)}
                                />
                              </TableCell>
                            );
                          }
                          if (column.id === "image") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <div className="img-item">
                                  <img src={row[column.id]} alt={row["name"]} />
                                </div>
                              </TableCell>
                            );
                          }
                          if (column.id === "action") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Link
                                  to={`/brands/${row._id}`}
                                  className="btn btn-edit"
                                >
                                  Chi tiết
                                </Link>
                                <button
                                  className="btn btn-delete"
                                  onClick={() => deleteBr(row._id)}
                                >
                                  Xóa
                                </button>
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
                count={listBrands?.numPages}
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

export default BrandList;
