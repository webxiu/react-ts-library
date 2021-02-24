import "./index.less";

import { Button, Menu } from "antd";

import React from "react";
import routes from "./config";
import { useHistory } from "react-router";

console.log("routes", routes);

const { SubMenu } = Menu;

interface Props {}

const Wrap: React.FC<Props> = (props) => {
  const history = useHistory();

  // submenu keys of first level
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 菜单渲染
  const renderMenu = (data: any) => {
    let path = "";
    return data.map((item: any) => {
      if (item.children) {
        const cItem = item.children.find((cItem: any) => cItem.key === path);
        if (cItem) {
          setOpenKeys(item.key); // 把openKey存在this种
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <item.icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      // 判断item是否是当前对应的item
      // if (item.key === path || path.indexOf(item.key) ===0) { //存在二季子路由判断

      return (
        <Menu.Item title={item.title} key={item.key}>
          <span
            key={item.key}
            onClick={() => {
              history.push(item.key);
            }}
          >
            <item.icon type={item.icon} />
            <span> {item.title}</span>
          </span>
        </Menu.Item>
      );
    });
  };
  return (
    <div className="container">
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
      >
        {renderMenu(routes)}
      </Menu>
      <div className="content">{props.children}</div>
    </div>
  );
};
export default Wrap;
