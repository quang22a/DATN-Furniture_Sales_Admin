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
import {
  getListCategory,
  editCategory,
  deleteCategory,
} from "../stores/action";
import { convertDate } from "../../../shared/helpers/utils/convertDate";

const CategoryList = () => {
  const dispatch = useDispatch();
  const role = JSON.parse(localStorage.getItem("userInfo"))?.role;
  const [page, setPage] = useState(1);
  const [dataShow, setDataShow] = useState();
  const [search, setSearch] = useState("");

  const listCategories = useSelector((state) => state.categoryReducer.dataList);

  const columns = [
    { id: "name", label: "Danh mục", align: "left" },
    { id: "image", label: "Ảnh" },
    {
      id: "isTrending",
      label: "Nổi bật",
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
      align: "right",
    },
  ];

  useEffect(() => {
    dispatch(getListCategory(page, search));
  }, [page, search]);

  useEffect(() => {
    if (listCategories) {
      setDataShow(listCategories.result);
    }
  }, [listCategories]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const changeTrending = async (_id) => {
    const category = dataShow?.find((item) => item._id === _id);
    delete category._id;
    category.isTrending = !category.isTrending;
    await dispatch(editCategory(_id, category));
    await dispatch(getListCategory());
  };

  const deleteCate = async (_id) => {
    await dispatch(deleteCategory(_id));
    await dispatch(getListCategory());
  };

  return (
    <section className="section-category-list grid-data">
      <div className="container">
        <p className="title">Danh mục</p>
        <Link to="/categories/add-category" className="btn btn-primary">
          Thêm
        </Link>
        <Search setSearch={setSearch} placeholder="danh mục sản phẩm" />
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
                          if (column.id === "isTrending") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Switch
                                  {...label}
                                  style={{ textAlign: "center" }}
                                  checked={value}
                                  onChange={() => changeTrending(row._id)}
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
                                  to={`/categories/${row._id}`}
                                  className="btn btn-edit"
                                >
                                  Chi tiết
                                </Link>
                                {role && role === "admin" && (
                                  <button
                                    className="btn btn-delete"
                                    onClick={() => deleteCate(row._id)}
                                  >
                                    Xóa
                                  </button>
                                )}
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
                count={listCategories?.numPages}
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

export default CategoryList;
