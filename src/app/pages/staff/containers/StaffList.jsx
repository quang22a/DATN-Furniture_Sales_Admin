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
import { getListStaff, updateStaff, deleteStaff } from "../stores/action";
import { convertDate } from "../../../shared/helpers/utils/convertDate";

const StaffList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [dataShow, setDataShow] = useState();
  const [search, setSearch] = useState("");

  const role = JSON.parse(localStorage.getItem("userInfo"))?.role;

  const listStaffs = useSelector((state) => state.staffReducer.dataList);

  const columns = [
    { id: "name", label: "Tên" },
    { id: "phone", label: "Số điện thoại" },
    {
      id: "email",
      label: "Địa chỉ email",
    },
    {
      id: "address",
      label: "Địa chỉ",
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
      align: "right",
    },
  ];

  useEffect(() => {
    dispatch(getListStaff(page, search));
  }, [page, search]);

  useEffect(() => {
    if (listStaffs) {
      setDataShow(listStaffs.result);
    }
  }, [listStaffs]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const deleteStaf = async (_id) => {
    await dispatch(deleteStaff(_id));
    dispatch(getListStaff(page));
  };

  const updateActive = async (_id) => {
    const staff = dataShow.find((item) => item._id === _id);
    delete staff?.id;
    await dispatch(updateStaff(_id, { ...staff, isActive: !staff.isActive }));
    dispatch(getListStaff(page));
  };

  return (
    <section className="section-staff-list grid-data">
      <div className="container">
        <p className="title">Nhân viên</p>
        {role === "admin" && (
          <Link to="/staffs/add-staff" className="btn btn-primary">
            Thêm
          </Link>
        )}
        <Search setSearch={setSearch} placeholder="nhân viên" />
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
                          if (column.id === "isActive") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Switch
                                  {...label}
                                  style={{ textAlign: "center" }}
                                  checked={value}
                                  onChange={() => {
                                    if (role && role === 'admin') {
                                      updateActive(row._id)
                                    }                                 
                                  }}
                                />
                              </TableCell>
                            );
                          }
                          if (column.id === "action" && role === "admin") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Link
                                  to={`/staffs/${row._id}`}
                                  className="btn btn-edit"
                                >
                                  Chi tiết
                                </Link>
                                <button
                                  className="btn btn-delete"
                                  onClick={() => deleteStaf(row._id)}
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
                count={listStaffs?.numPages}
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

export default StaffList;
