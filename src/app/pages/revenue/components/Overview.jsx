import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { getRevenueDetail } from '../stores/action';
import { formatPrice } from '../../../shared/helpers/utils/formatPrice';

const OverView = () => {
  const dispatch = useDispatch();
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

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
    dispatch(getRevenueDetail(dateStart, dateEnd));
  }, [dateStart, dateEnd])

  const handleDateChange = (date, position) => {
    if (position === 'start') {
      setDateStart(date);
    } else {
      setDateEnd(date);
    }
  }

  return (
    <div className="overview-revenue grid-data">
      <h3 className="title title-overview-revenue">Doanh thu theo thời gian</h3>
      <div className="select-time">
        <div className="option-time">
          <p>Ngày bắt đầu</p>
          <DatePicker
            selected={dateStart}
            onChange={(date) => handleDateChange(date, 'start')} //only when value has changed
          />
        </div>
        <div className="option-time">
          <p>Ngày kết thúc</p>
          <DatePicker
            selected={dateEnd}
            onChange={(date) => handleDateChange(date, 'end')} //only when value has changed
          />
        </div>
      </div>
      {
        dataOverview && (
          <div className="total">
            <p>Doanh thu</p>
            <p className="price">{formatPrice(dataOverview.reduce((pre, cur) => pre + cur.price, 0))}</p>    
          </div>
        )
      }
      
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
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
              {dataOverview &&
                dataOverview.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      style={{ backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.04)' : 'white' }}
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
                            {column.id === 'price' ? formatPrice(value) : value}
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
