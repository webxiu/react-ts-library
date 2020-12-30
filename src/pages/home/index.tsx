import "./index.less";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

import React from "react";
import routes from "../../router/config";
import { useHistory } from "react-router";

console.log("routes", routes);

const { SubMenu } = Menu;

interface Props {}

const Home: React.FC<Props> = (props) => {
    // const history = useHistory();
    // const location = history.location;

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
    // let path = history.location.pathname;
    let path = '';
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
                {/* <Icon type={item.icon} /> */}
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
              console.log(8);
              // history.push(item.key)
            }}
          >
            {/* <Icon type={item.icon} /> */}
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
        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu> */}
        {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
      <div className="content">
          {props.children}
          <Button type="primary">Button</Button>
      </div>
    </div>
  );
};
export default Home;
