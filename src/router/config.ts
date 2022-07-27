/**
 * 路由表, 都去掉了/admin路由, 如首页: /admin/home ...
 */

import {
  ApartmentOutlined,
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const menuList = [
  { title: "首页", key: "/home", icon: HomeOutlined },

  {
    title: "系统设置",
    key: "/setting",
    icon: SettingFilled,
    children: [
      { title: "角色管理", key: "/role", icon: SyncOutlined },
      { title: "权限设置", key: "/permission", icon: SmileOutlined },
    ],
  },
  { title: "表格数据", key: "/table", icon: SettingFilled },
  { title: "表单数据", key: "/form", icon: SmileOutlined },

  { title: "消息列表", key: "/mssage", icon: LoadingOutlined },
  { title: "流程图", key: "/flowChart", icon: ApartmentOutlined },
];

export default menuList;
