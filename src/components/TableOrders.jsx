import React from "react";
import { Table, Select } from "antd";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
const { Option } = Select;

const TableOrders = React.memo(() => {
  const { setLoadingPoint, setUnLoadingPoint, setCurrentOrder } = useActions();
  const { orders, points, currentOrderId } = useSelector(
    (state) => state.orders
  );

  const [selectedKeys, setSelectedKeys] = React.useState([]);

  const myRowSelection = {
    selectedRowKeys: selectedKeys,
    onSelect: (record, selected) => {
      console.log(record);
    },
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

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
      width: "auto",
      render: (loading) => (
        <Select
          title={`${loading.name}, ${loading.subName}`}
          style={{ width: 150 }}
          defaultValue={loading?.id}
          key={loading.id}
          onChange={(value) => setLoadingPoint(value)}
        >
          {points.map(({ name, id, subName }) => (
            <Option key={id} value={id} title={`${name}, ${subName}`}>
              {name}, {subName}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Разгрузка",
      dataIndex: "unLoading",
      key: "unLoading",
      width: "auto",
      render: (unLoading) => (
        <Select
          title={`${unLoading.name}, ${unLoading.subName}`}
          style={{ width: 150 }}
          defaultValue={unLoading?.id}
          key={unLoading.id}
          onChange={(value) => setUnLoadingPoint(value)}
        >
          {points.map(({ name, id, subName }) => (
            <Option key={id} value={id} title={`${name}, ${subName}`}>
              {name}, {subName}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  const onCurrentOrderChange = (id) => {
    if (id !== currentOrderId) setCurrentOrder(id);
  };

  return (
    <div className="table-wrap">
      <Table
        onRow={(record) => ({
          onClick: () => {
            onCurrentOrderChange(record.id);
            setSelectedKeys([record.key]);
          },
        })}
        rowSelection={{
          type: "radio",
          ...myRowSelection,
        }}
        dataSource={dataSource}
        columns={columns}
        className="table"
        pagination={false}
      />
    </div>
  );
});

export default TableOrders;
