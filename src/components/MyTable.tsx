import { Radio, Table } from "antd";

import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";

interface DataSource {
  key: number | string;
  name: string;
  age: number;
  address: string;
}
interface Props {}

const MyTable: React.FC<Props> = () => {
  const [value, setValue] = React.useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const dataSource: DataSource[] = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <Table
        rowSelection={{
          type: "radio",
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              "selectedRowKeys, selectedRows",
              selectedRowKeys,
              selectedRows
            );
          },
        }}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
};

export default MyTable;
