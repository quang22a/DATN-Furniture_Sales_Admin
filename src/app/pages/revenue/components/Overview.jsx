import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { getRevenueDetail } from '../stores/action';

const OverView = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState((new Date().getMonth()) - 1);

  const d = new Date();

  const columns = [
    { id: "name", label: "Tên sản phẩm", align: "left" },
    { id: "image", label: "Ảnh" },
    {
      id: "quantity",
      label: "Số lượng",
      type: "number",
      align: "right",
    },
    {
      id: "price",
      label: "Tổng giá",
      type: "number",
      align: "right",
    },
  ];

  const dataOverview = useSelector((state) => state.revenueReducer.dataDetail);

  useEffect(() => {
    dispatch(getRevenueDetail(month, year));
  }, [year, month])

  return (
    <div className="overview-revenue grid-data">
      <h3 className="title title-overview-revenue">Tổng quát</h3>
      <div className="select-time">
        <select id="year" name="year" onChange={(e) => setYear(parseInt(e.target.value))}>
          {[...Array(5)].map((item, index) => {
            return (
              <option value={d.getFullYear() - index} key={index}>
                {d.getFullYear() - index}
              </option>
            );
          })}
        </select>
        <select id="month" name="month" defaultValue={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
          <option>Chọn tháng</option>
          <option value="0">1</option>
          <option value="1">2</option>
          <option value="2">3</option>
          <option value="3">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="6">7</option>
          <option value="7">8</option>
          <option value="8">9</option>
          <option value="9">10</option>
          <option value="10">11</option>
          <option value="11">12</option>
        </select>
      </div>
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
              {dataOverview &&
                dataOverview.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                    >
                      {columns.map((column) => {
                        let value = column.id === "name" ? row.product[0][column.id] : row[column.id];
                        if (column.id === "image") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div className="img-item">
                                <img
                                  src={row.product[0][column.id]}
                                  alt={row.product[0]["name"]}
                                />
                              </div>
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
      </Paper>
    </div>
  )
}

export default OverView;
