import React from "react";
import { Table, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
const { Option } = Select;

const TableOrders = React.memo(({ setWay }) => {
  const { setLoadingPoint, setUnLoadingPoint, setCurrentOrder } = useActions;

  const { orders, points, currentOrderId } = useSelector(
    (state) => state.orders
  );

  const getPointById = (id) => {
    return points.filter((point) => point.id === id)[0];
  };

  const dataSource = orders.map((order) => ({
    id: order.id,
    loading: getPointById(order.loading),
    unLoading: getPointById(order.unLoading),
    key: order.id,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Погрузка",
      dataIndex: "loading",
      key: "loading",
      render: (loading) => (
        <Select
          style={{ width: 200 }}
          value={loading?.name}
          key={loading.id}
          onChange={() => setLoadingPoint(loading.id)}
        >
          {points.map(({ name, id }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Разгрузка",
      dataIndex: "unLoading",
      key: "unLoading",
      render: (unLoading) => (
        <Select
          style={{ width: 200 }}
          value={unLoading?.name}
          key={unLoading.id}
          onChange={() => setUnLoadingPoint(unLoading.id)}
        >
          {points.map(({ name, id }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  const onWayClick = (way) => {
    setWay(way);
  };
  return (
    <div className="table-wrap">
      <Table dataSource={dataSource} columns={columns} className="table" />

      {/* {data.map((item) => (
        <div key={item.id} onClick={() => onWayClick(item.way)}>
          {item.name}
        </div>
      ))} */}
    </div>
  );
});

export default TableOrders;
