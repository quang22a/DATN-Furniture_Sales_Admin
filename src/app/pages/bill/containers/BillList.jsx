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
import { getBills, updateBill, deleteBill } from "../stores/action";
import { convertDate } from "../../../shared/helpers/utils/convertDate";
import { formatPrice } from '../../../shared/helpers/utils/formatPrice';

const BillList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [dataShow, setDataShow] = useState();
  const [search, setSearch] = useState("");

  const listBills = useSelector((state) => state.billReducer.listBills);

  const columns = [
    { id: "name", label: "Khách hàng" },
    {
      id: "address",
      label: "Địa chỉ",
    },
    {
      id: "totalPrice",
      label: "Tổng tiền",
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
      id: "paymentStatus",
      label: "Thanh toán",
      type: "boolean",
      align: "center",
    },
    {
      id: "status",
      label: "Trạng thái",
      align: "center",
    },
    {
      id: "action",
      label: "",
    },
  ];

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(getBills(page, search));
  }, [page, search]);

  useEffect(() => {
    if (listBills) {
      setDataShow(listBills.result);
    }
  }, [listBills]);

  const changeStatus = async (_id, value, type) => {
    const bill = dataShow?.find((item) => item._id === _id);
    const dataUpdate = {
      customerId: bill.customerId,
      name: bill.name,
      email: bill.email,
      phone: bill.phone.toString(),
      address: bill.address,
      totalPrice: bill.totalPrice,
      totalProduct: bill.totalProduct,
      paymentMethod: bill.paymentMethod,
      paymentStatus: type === 'payment' ? !bill.paymentStatus : bill.paymentStatus,
      status:  type === 'status' ? value : bill.status,
      additional: bill.additional,
    };
    if (!bill.additional) {
      delete dataUpdate.additional;
    }
    await dispatch(updateBill(_id, dataUpdate));
    dispatch(getBills(page));
  };

  const deletePr = async (_id) => {
    await dispatch(deleteBill(_id));
    await dispatch(getBills());
  };

  return (
    <section className="section-product-list grid-data">
      <div className="container">
        <p className="title text-uppercase">Hóa đơn</p>
        <Search setSearch={setSearch} placeholder="hóa đơn" />
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
                  {dataShow &&
                    dataShow.map((row, index) => {
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
                                  <select
                                    value={value}
                                    onChange={(e) =>
                                      changeStatus(row._id, e.target.value, 'status')
                                    }
                                  >
                                    <option value="new">Mới</option>
                                    <option value="shipping">Đang giao</option>
                                    <option value="done">Đã hoàn thành</option>
                                  </select>
                                </TableCell>
                              );
                            }
                            if (column.id === "paymentStatus") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Switch
                                    {...label}
                                    style={{ textAlign: "center" }}
                                    checked={value}
                                    onChange={() =>
                                      changeStatus(row._id, '', 'payment')
                                    }
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
                                    to={`/bills/${row._id}`}
                                    className="btn btn-edit"
                                  >
                                    Chi tiết
                                  </Link>
                                  <button
                                    className="btn btn-delete"
                                    onClick={() => deletePr(row._id)}
                                  >
                                    Xóa
                                  </button>
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === 'totalPrice' ? formatPrice(value) : value}
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
                count={listBills?.numPages}
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

export default BillList;
