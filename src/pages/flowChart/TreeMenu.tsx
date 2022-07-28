import { FLOW_DRAG_KEY, munuList, toTreeAndMap } from "./config";

import React from "react";
import { Tree } from "antd";

const treeMenu = toTreeAndMap(munuList, { key: "id", title: "name" });

interface Props {
  onClick: (item: any) => void;
}

const Wrap: React.FC<Props> = (props) => {
  const { onClick } = props;

  // 点击菜单
  const onMenuClick = (item: any) => {
    const { key, parent_id, label, code } = item;
    onClick({ id: key, parent_id, name: label, code });
  };

  const renderTreeNodes = (data: any) => {
    return data.map((item: any) => {
      item.title = (
        <div
          draggable="true"
          className="menu-name"
          //   onDragStart={onDragStart.bind(null, item)}
          onClick={onMenuClick.bind(null, item)}
        >
          {item.title}
        </div>
      );
      if (item.children) {
        renderTreeNodes(item.children);
      }
      return item;
    });
  };

  // onDragStart
  const onDragStart = (item: any, e: React.DragEvent) => {
    const { id, parent_id, name, code } = item;
    const info = JSON.stringify({ id, parent_id, name, code });
    e.dataTransfer?.setData(FLOW_DRAG_KEY, info);
  };

  const treeData = renderTreeNodes(treeMenu);
  console.log("treeData", treeData);
  return <Tree selectable={false} defaultExpandAll treeData={treeData} />;
};

export default Wrap;
