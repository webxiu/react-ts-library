import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

import {
  BpmnElement,
  Control,
  DndPanel,
  InsertNodeInPolyline,
  Menu,
  MiniMap,
  SelectionSelect,
  Snapshot,
} from "@logicflow/extension";
import LogicFlow, { GraphModel } from "@logicflow/core";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "antd";
import { FLOW_DRAG_KEY } from "./config";
import TreeMenu from "./TreeMenu";

const plugins = [
  Menu,
  MiniMap,
  DndPanel,
  SelectionSelect,
  Control,
  Snapshot,
  InsertNodeInPolyline,
];

plugins.forEach((plugin) => LogicFlow.use(plugin));

const Wrap: React.FC = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [logicFlow, setLogicFlow] = useState<LogicFlow>();

  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (viewSize.width === 0 || viewSize.height === 0) return;
    try {
      const logicflow = new LogicFlow({
        container: refContainer.current as HTMLElement,
        grid: true,
        keyboard: {
          enabled: true,
        },
        plugins: plugins,
        snapline: true,
      });

      setPatternItems(logicflow);
      addMenuConfig(logicflow);
      setMenuConfig(logicflow);
      addNodeMoveRules(logicflow);
      // addNavList(logicflow);
      // addNode(logicflow);

      // 缩放比例
      logicflow.zoom(1);

      render(logicflow);
      setLogicFlow(logicflow); // 缓存实例

      // 显示缩略图
      logicflow.extension.miniMap.show(
        viewSize.width - 152 - 5,
        viewSize.height - 242 - 5
      );
      logicflow.on("connection:not-allowed", (msg) => {
        console.log(msg);
      });

      /* 事件 */
      logicflow.on("connection:not-allowed", (data, msg) => {
        console.log("不允许建立连接", data, msg);
      });
      logicflow.on("anchor:dragstart", (data) => {
        console.log("dragstart", data.nodeModel);
      });
      logicflow.on("anchor:drop", (data) => {
        console.log("drop", data.nodeModel);
      });
      logicflow.on("node:add", (data) => {
        console.log("添加事件:", data);
      });
      logicflow.on("node:drop", (data) => {
        console.log("节点拖拽放开:", data);
      });
      logicflow.on("edge:adjust", (data) => {
        console.log("边拖拽调整:", data);
      });
      logicflow.on("node:dnd-add", (data) => {
        console.log("外部拖入节点添加时触发:", data);
      });
    } catch (error) {
      console.log("error:", error);
    }
  }, [viewSize]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize, false);
  }, []);

  const resize = () => {
    if (refContainer.current) {
      const rect = refContainer.current.getBoundingClientRect();
      setViewSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      });
    }
  };

  /** 设置节点面板 */
  const setPatternItems = (logicflow: LogicFlow) => {
    logicflow.setPatternItems([
      {
        label: "选区",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=",
        callback: () => {
          logicflow.openSelectionSelect();
          logicflow.once("selection:selected", () => {
            logicflow.closeSelectionSelect();
          });
        },
      },
      {
        type: "circle",
        text: "开始",
        label: "开始节点",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==",
      },
      {
        type: "rect",
        label: "用户任务",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
        className: "important-node",
      },
      {
        type: "diamond",
        label: "条件判断",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
      },
      {
        type: "circle",
        text: "结束",
        label: "结束节点",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC",
      },
    ]);
  };
  /** 右键菜单（必须在 lf.render() 之前设置） */
  const addMenuConfig = (logicflow: LogicFlow) => {
    logicflow.extension.menu.addMenuConfig({
      showMenu: false,
      nodeMenu: [
        {
          text: "删除",
          callback(node: any) {
            // node为该节点数据
            logicflow.deleteNode(node.id);
          },
        },
        {
          text: "分享啊",
          callback() {
            alert("分享成功！");
          },
        },
        {
          text: "属性",
          callback(node: any) {
            alert(`
                节点id：${node.id}
                节点类型：${node.type}
                节点坐标：(x: ${node.x}, y: ${node.y})`);
          },
        },
      ],
      edgeMenu: [
        {
          text: "属性",
          callback(edge: any) {
            alert(`
                边id：${edge.id}
                边类型：${edge.type}
                边坐标：(x: ${edge.x}, y: ${edge.y})
                源节点id：${edge.sourceNodeId}
                目标节点id：${edge.targetNodeId}`);
          },
        },
      ],
      graphMenu: [
        {
          text: "分享",
          callback() {
            alert("分享成功98！");
          },
        },
      ],
    });
  };
  /** 配置右键菜单(覆盖默认菜单) */
  const setMenuConfig = (logicflow: LogicFlow) => {
    logicflow.extension.menu.setMenuConfig({
      nodeMenu: [
        {
          text: "删除",
          callback(node: any) {
            console.log("删除", node);
            logicflow.deleteNode(node.id);
          },
        },
        {
          text: "编辑",
          callback(node: any) {
            console.log("编辑", node);
            logicflow.editText(node.id);
          },
        },
        {
          text: "属性",
          callback(node: any) {
            alert(`
                节点id：${node.id}
                节点类型：${node.type}
                节点坐标：(x: ${node.x}, y: ${node.y})`);
          },
        },
      ],
      edgeMenu: [
        {
          text: "属性",
          callback(edge: any) {
            alert(`
                边id：${edge.id}
                边类型：${edge.type}
                边坐标：(x: ${edge.x}, y: ${edge.y})
                源节点id：${edge.sourceNodeId}
                目标节点id：${edge.targetNodeId}`);
          },
        },
      ],
      graphMenu: [
        {
          text: "分享",
          callback() {
            alert("分享成功98！");
          },
        },
      ],
    });
  };
  /** 限制1,3节点移动 */
  const addNodeMoveRules = (logicflow: LogicFlow) => {
    logicflow.graphModel.addNodeMoveRules((model, deltaX, deltaY) => {
      // if (["1", "3"].includes(model.id)) {
      //   return false;
      // }
      return true;
    });
  };
  /** 添加导航栏 */
  const addNavList = (logicflow: LogicFlow) => {
    logicflow.extension.control.addItem({
      iconClass: "custom-minimap",
      title: "",
      text: "导航",
      onMouseEnter: (lf, ev) => {
        const position = lf.getPointByClient(ev.x, ev.y);
        lf.extension.miniMap.show(
          position.domOverlayPosition.x - 120,
          position.domOverlayPosition.y + 35
        );
      },
      onClick: (lf, ev) => {
        const position = lf.getPointByClient(ev.x, ev.y);
        lf.extension.miniMap.show(
          position.domOverlayPosition.x - 120,
          position.domOverlayPosition.y + 35
        );
      },
    });
  };
  /** 渲染流程图 */
  const render = (logicflow: LogicFlow) => {
    logicflow.render({
      nodes: [
        {
          id: "111",
          type: "rect",
          x: 400,
          y: 100,
          text: "音频浓缩",
          properties: { sort: 98 },
        },
        {
          id: "222",
          type: "diamond",
          x: 400,
          y: 300,
          text: "神经网络降噪",
          properties: { sort: 97 },
        },
        {
          id: "333",
          type: "rect",
          x: 400,
          y: 500,
          text: "样本库",
          properties: { sort: 99 },
        },
      ],
      edges: [
        {
          sourceNodeId: "111",
          targetNodeId: "222",
          type: "polyline",
          text: "11",
        },
      ],
    });
  };
  /** 添加一个节点 */
  const addNode = (logicflow: LogicFlow) => {
    // 添加节点
    let idIndex = 3;
    const timer = setInterval(() => {
      logicflow.addNode({
        id: `${idIndex}`,
        type: "rect",
        x: 200,
        y: 50 + idIndex * 150,
        text: `节点${idIndex}`,
      });
      const edge = {
        sourceNodeId: `${idIndex - 1}`,
        targetNodeId: `${idIndex}`,
        type: "polyline",
        text: `连线${idIndex}`,
      };
      console.log("edge", idIndex, edge);
      logicflow.addEdge(edge);
      // logicflow.deleteNode()
      idIndex++;
      if (idIndex > 5) {
        clearInterval(timer);
      }
    }, 1000);
  };

  // 下载缩略图
  const downloadImage = async (bgColor = "#fff") => {
    if (logicFlow) {
      const snapshot: Snapshot = logicFlow.extension.snapshot;
      snapshot.getSnapshot("缩略图", bgColor);
      const res = (await snapshot.getSnapshotBase64(bgColor)) as any;
      console.log("缩略图", res.data);
    }
  };
  // 获取当前选中
  const getSelect = () => {
    if (!logicFlow) return;
    // 获取所有的节点
    const graphModel: GraphModel = logicFlow.graphModel;
    const selectNode = graphModel.selectElements;
    // graphModel.resize(200, 200);
    for (const value of selectNode) {
      const obj = value[1];
      console.log("id:", value[0]);
      console.log("properties:", {
        id: obj.id,
        text: obj.text.value,
        properties: obj.properties,
      });
    }
    logicFlow.render({
      nodes: [...graphModel.nodes],
      edges: [
        ...graphModel.edges,
        {
          sourceNodeId: "222",
          targetNodeId: "333",
          type: "polyline",
          text: "3333",
        },
      ],
    });
    console.log("所有节点", graphModel.nodes);
    console.log("所有连线", graphModel.edges);
  };

  /** 点击菜单 */
  const onMenuClick = (item: any) => {
    console.log("item", item);
    if (logicFlow) {
      console.log("first", logicFlow);
    }
  };

  /** 拖拽移动,激活选中样式 */
  const onDragHandle = (e: React.DragEvent, active: boolean) => {
    if (!FLOW_DRAG_KEY) return;
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer?.getData(FLOW_DRAG_KEY);
    const res = JSON.parse(data);
    console.log("res", res);
  };
  // onDrop
  const onDrop = (e: React.DragEvent) => {
    console.log("FLOW_DRAG_KEY", FLOW_DRAG_KEY);
    if (!FLOW_DRAG_KEY) return;
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer?.getData(FLOW_DRAG_KEY);
    const res = JSON.parse(data);
    console.log("res", res);
  };

  return (
    <div className="flex-col ui-h-100 ui-w-100" style={{ padding: 20 }}>
      <div>
        <Button type="primary" onClick={() => downloadImage()}>
          下载
        </Button>
        <Button type="primary" onClick={() => getSelect()}>
          打印
        </Button>
      </div>
      <div className="flex flex-1 ui-h-100">
        <div className="left-menu" style={{ width: 300 }}>
          <TreeMenu onClick={onMenuClick} />
        </div>
        <div
          onDragEnter={(e: React.DragEvent) => onDragHandle(e, true)}
          onDragOver={(e: React.DragEvent) => onDragHandle(e, true)}
          onDragLeave={(e: React.DragEvent) => onDragHandle(e, false)}
          onDrop={onDrop}
          className="flex-1 ui-w-100 ui-h-100"
        >
          <div
            id="container"
            className="ui-w-100 ui-h-100"
            ref={refContainer}
            style={{ border: "1px solid #f60" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Wrap;
