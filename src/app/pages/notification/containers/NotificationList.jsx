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
import Pagination from "@mui/material/Pagination";

import { Search } from "../../../shared/components/search";
import {
  getListNotification,
  deleteNotification,
} from "../stores/action";
import { convertDate } from "../../../shared/helpers/utils/convertDate";

const NotificationList = () => {
  const dispatch = useDispatch();
  
  const [page, setPage] = useState(1);
  const [dataShow, setDataShow] = useState();
  const [search, setSearch] = useState("");

  const listNotifications = useSelector(
    (state) => state.notificationReducer.dataList
  );

  const columns = [
    { id: "title", label: "Tiêu đề", align: "left" },
    { id: "content", label: "Nội dung", align: "left" },
    { id: "image", label: "Ảnh" },
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
    dispatch(getListNotification(page, search));
  }, [page, search]);

  useEffect(() => {
    if (listNotifications) {
      setDataShow(listNotifications.result);
    }
  }, [listNotifications]);

  const deleteNot = async (_id) => {
    await dispatch(deleteNotification(_id));
    await dispatch(getListNotification(page));
  };

  return (
    <section className="section-notification-list grid-data">
      <div className="container">
        <p className="title text-uppercase">Thông báo</p>
        <Link to="/notifications/add-notification" className="btn btn-primary">
          Thêm
        </Link>
        <Search setSearch={setSearch} placeholder="Thông báo" />
        {dataShow ? (
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{  }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: '#022d42', color: 'white' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataShow.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                        style={{ backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.04)' : 'white' }}
                      >
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (
                            column.id === "createdAt" ||
                            column.id === "updatedAt"
                          ) {
                            value = convertDate(value);
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
                                  to={`/notifications/${row._id}`}
                                  className="btn btn-edit"
                                >
                                  Chi tiết
                                </Link>
                                <button
                                  className="btn btn-delete"
                                  onClick={() => deleteNot(row._id)}
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
                count={listNotifications?.numPages}
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

export default NotificationList;
