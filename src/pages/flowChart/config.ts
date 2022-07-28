export const FLOW_DRAG_KEY = "flow_drag_key";

export const munuList = [
  { id: 1, parent_id: 0, name: "音频预处理", code: "PreProcessing" },
  { id: 2, parent_id: 1, name: "音频降噪", code: "AudioDenoise" },
  { id: 3, parent_id: 1, name: "音频浓缩", code: "AudioCondense" },
  { id: 4, parent_id: 1, name: "人声分离", code: "VoiceSeparation" },
  { id: 5, parent_id: 0, name: "音频智能处理", code: "InteProcessing" },
  { id: 6, parent_id: 5, name: "声纹比对", code: "VoiceCompare" },
  { id: 7, parent_id: 6, name: "1比1", code: "VoiceCompareOne" },
  { id: 8, parent_id: 6, name: "1比N", code: "VoiceCompareMore" },
  { id: 9, parent_id: 6, name: "N比N", code: "VoiceCompareMoreThanMore" },
  { id: 10, parent_id: 5, name: "音频布控", code: "AudioTask" },
  { id: 11, parent_id: 10, name: "布控任务", code: "DeployTask" },
  { id: 12, parent_id: 10, name: "布控告警", code: "DeployAlarm" },
  { id: 13, parent_id: 5, name: "以音搜音", code: "VoiceSearch" },
  { id: 14, parent_id: 5, name: "声纹聚类", code: "VoiceCluster" },
  {
    id: 15,
    parent_id: 5,
    name: "智能鉴伪",
    code: "AuthenticIdentification",
  },
  { id: 16, parent_id: 0, name: "声纹库管理", code: "VoiceManagement" },
  { id: 17, parent_id: 16, name: "样本库", code: "SampleLibrary" },
  { id: 18, parent_id: 16, name: "检材库", code: "MaterialLibrary" },
  { id: 19, parent_id: 16, name: "专题库", code: "SpecialLibrary" },
  { id: 20, parent_id: 0, name: "个人中心", code: "PersonalCenter" },
  { id: 21, parent_id: 20, name: "个人信息", code: "Personalinformation" },
  { id: 22, parent_id: 0, name: "系统管理", code: "SystemManagement" },
  { id: 23, parent_id: 22, name: "用户管理", code: "UserManagement" },
  { id: 24, parent_id: 22, name: "角色管理", code: "RoleManagement" },
];

/**
 * 对象数组组合节点树
 * @param data 对象数组[必填]
 * @param option 生成字段: 生成指定字段的树形数据选项, 默认为: {key: 'id', title: 'name', parent_id: 'parent_id' }
 * @param fileds 替换生成字段option中的键名, 例如: key->value/title->label, 可配置:{ key: 'value', title: 'label' }
 * @returns 树形结构数组
 */
export const toTreeAndMap = (data: any, option?: any, fileds?: any) => {
  /** 数据字段 */
  const key = option?.key || "key";
  const title = option?.title || "title";
  const parent_id = option?.parent_id || "parent_id";
  /** 替换数据字段 */
  const key_f = fileds?.key || "key";
  const title_f = fileds?.title || "title";
  const parent_id_f = fileds?.parent_id || "parent_id";

  const map = {};
  const tempData: any = [];
  const newArr = data?.map((item) => {
    // const newItem = { ...item, key: item[key], title: item[title], parent_id: item[parent_id] || '0' };
    const newItem = {
      ...item,
      [key_f]: item[key],
      [title_f]: item[title],
      [parent_id_f]: item[parent_id] || 0,
      value: item[key],
      label: item[title],
      level: 1,
    };
    // 删除被替换的字段
    option?.key && option?.key !== "key" && delete newItem[option?.key];
    option?.title && option?.title !== "title" && delete newItem[option?.title];
    option?.parent_id &&
      option?.parent_id !== "parent_id" &&
      delete newItem[option?.parent_id];
    return newItem;
  });
  newArr.forEach((item) => (map[item[key_f]] = item));
  newArr.forEach((item) => {
    const parent = map[item[parent_id_f]];
    if (parent) {
      item.level = parent.level + 1;
      item.parent = parent;
      (parent.children || (parent.children = [])).push(item);
    } else {
      tempData.push(item);
    }
  });
  return tempData;
};
