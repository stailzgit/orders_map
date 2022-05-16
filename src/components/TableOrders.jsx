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

  const onChangeSelect = (value) => {
    setLoadingPoint(value);
  };

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
      minWidth: 200,
      render: (loading) => (
        <Select
          style={{ minWidth: 150, width: 200 }}
          defaultValue={loading?.id}
          key={loading.id}
          onChange={onChangeSelect}
        >
          {points.map(({ name, id, subName }) => (
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
      width: "auto",
      minWidth: 200,
      render: (unLoading) => (
        <Select
          style={{ minWidth: 150, width: 200 }}
          defaultValue={unLoading?.name}
          key={unLoading.id}
          onChange={(value) => setUnLoadingPoint(value)}
        >
          {points.map(({ name, id, subName }) => (
            <Option key={id} value={id}>
              {name}
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
