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
import { getListContact, updateContact, deleteContact } from "../stores/action";
import { convertDate } from "../../../shared/helpers/utils/convertDate";

const ContactList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [dataShow, setDataShow] = useState();
  const [search, setSearch] = useState("");
  
  const listContacts = useSelector((state) => state.contactReducer.dataList);

  const columns = [
    { id: "name", label: "Tên", align: "left" },
    { id: "phone", label: "Số điện thoại" },
    { id: "email", label: "Địa chỉ email" },
    {
      id: "createdAt",
      label: "Ngày tạo",
    },
    {
      id: "updatedAt",
      label: "Ngày cập nhật",
    },
    {
      id: "status",
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
    dispatch(getListContact(page, search));
  }, [page, search]);

  useEffect(() => {
    if (listContacts) {
      setDataShow(listContacts.result);
    }
  }, [listContacts]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const changeStatus = async (_id) => {
    const contact = dataShow?.find((item) => item._id === _id);
    await dispatch(updateContact(_id, { status: !contact.status }));
    await dispatch(getListContact(page));
  };

  const deleteCt = async (_id) => {
    await dispatch(deleteContact(_id));
    await dispatch(getListContact(page));
  };

  return (
    <section className="section-category-list grid-data">
      <div className="container">
        <p className="title text-uppercase">Liên hệ</p>
        <Search setSearch={setSearch} placeholder="liên hệ" />
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
                          if (column.id === "status") {
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
                          if (column.id === "action") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Link
                                  to={`/contacts/${row._id}`}
                                  className="btn btn-edit"
                                >
                                  Chi tiết
                                </Link>
                                <button
                                  className="btn btn-delete"
                                  onClick={() => deleteCt(row._id)}
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
                count={listContacts?.numPages}
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

export default ContactList;
