<template>
    <div class="table-container" :key="change">
        <div class="title">股权架构图</div>
        <div v-if="!imageLoaded" >
            <!-- 占位符内容，可以是 loading 图标等 -->
            <span>Loading...</span>
        </div>
        <div id="appc" style="height: 600px"></div>
        <div class="legend">
            <div class="legend-items">
                <div v-for="(industry) in industryColorMap" :key="industry" class="legend-item">
                    <div class="legend-color" :style="{ backgroundColor: industry[1] }"></div>
                    <span>{{ industry[0] }}</span>
                </div>
                <div v-if="!indus" class="legend-item">
                    <div class="legend-color2"></div>
                    <span>海外实体</span>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import * as $d3 from "d3";
import {
    getActualController,
    getLatestStockInvestment,
    getRealTimeData,
    getTopTenShareholders,
    getTTShReportDate
} from "@/api/search";
import {inject, ref} from "vue";

export default {
    name: "CompanyStructure",
    data() {
        return {
            d3: $d3,
            stkCd: inject('$company'),
            change:'',
            industryColorMap:'',
            data: {
                id: "abc1005",
                // 根节点名称
                name: "",
                // 子节点列表
                children: [
                    {
                        id: "abc1006",
                        name: "铜陵有色金属集团控股有限公司",
                        percent: "100%",
                    },
                    {
                        id: "abc1009",
                        name: "香港中央结算有限公司",
                        percent: "100%",
                        children: [
                            {
                                id: "abc1010",
                                name: "香港中央结算有限公司",
                                percent: "100%",
                                children: [
                                    {
                                        id: "abc1011",
                                        name: "香港中央结算有限公司的子公司一",
                                        percent: "80%",
                                    }
                                ],
                            },
                        ],
                    },
                    {
                        id: "abc1014",
                        name: "中国铁建投资集团有限公司",
                        percent: "100%",
                        children: [
                            {
                                id: "abc1015",
                                name: "中国铁建投资集团有限公司",
                                percent: "100%",
                                children: [
                                    {
                                        id: "abc1016",
                                        name: "中国铁建投资集团有限公司的子公司一",
                                        percent: "100%",
                                    },
                                    {
                                        id: "abc1017",
                                        name: "中国铁建投资集团有限公司的子公司二",
                                        percent: "90%",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "abc1020",
                        name: "中国铁建投资集团有限公司",
                        percent: "100%",
                        children: [
                            {
                                id: "abc1021",
                                name: "中国铁建投资集团有限公司",
                            },
                        ],
                    },
                ],
                // 父节点列表
                parents: [
                    {
                        id: "abc2001",
                        name: "全国社保基金一一八组合",
                        percent: "60%",
                        parents: [
                            {
                                id: "abc2000",
                                name: "全国社保基金一一八组合",
                                percent: "100%",
                            },
                        ],
                    },
                    {
                        id: "abc2003",
                        name: "全国社保基金一一八组合",
                        percent: "60%",
                        controlling:1,
                    },
                    {
                        id: "abc2002",
                        name: "全国社保基金一一八组合全国社保基金一一八组合",
                        percent: "40%",
                        parents: [
                            {
                                id: "abc1010",
                                name: "全国社保基金一一八组合",
                                percent: "100%",
                                parents: [
                                    {
                                        id: "abc1011",
                                        name: "全国社保基金子公司一",
                                        percent: "80%",
                                    },
                                    {
                                        id: "abc1012",
                                        name: "全国社保基金子公司二",
                                        percent: "90%",
                                    },

                                ],
                            },
                        ],
                    },

                ],
            },
            imageLoaded:false,
            indus : true,
        };
    },
    mounted() {
        this.fetchData()
    },
    watch: {
        stkCd(newValue, oldValue) {
            this.fetchData()
            this.change++
        }
    },
    methods: {
        async fetchData() {
            try {
                //查询公司名称
                const nameRes = await getRealTimeData(this.stkCd);
                this.data.name = nameRes.data.data.name;

                //最新日期
                const dateRes = await getTTShReportDate(this.stkCd);
                const date = dateRes.data.data[dateRes.data.data.length - 1];

                //十大股东
                const shareholdersRes = await getTopTenShareholders(this.stkCd, date);
                const par = shareholdersRes.data.data[0].data;
                this.data.parents = this.formatParentData(par);

                //实际控制人
                const controllerRes = await getActualController(this.stkCd);
                const controllerName = controllerRes.data.data.s0701b;
                this.data.parents[0].controllerName = controllerName.length > 8 ? controllerName.substring(0, 8) + "..." : controllerName;
                this.data.parents[0].controllerPercent = controllerRes.data.data.s0704a;
                this.data.parents[0].controlling = 1;

                // 股权投资公司(子树)
                const stockInvestmentRes = await getLatestStockInvestment(this.stkCd);
                const children1data = stockInvestmentRes.data.data;
                this.data.children = await this.formatChildrenData(children1data, 0);

                //同行业相同颜色,颜色随机
                this.industryColorMap = new Map();
                this.data.children.forEach(item => {
                    if (!this.industryColorMap.has(item.industry)) {
                        this.industryColorMap.set(item.industry, this.getRandomColor());
                    }
                    this.assignColorToData(item, this.industryColorMap.get(item.industry));
                });
                this.constructor();
                this.imageLoaded = true;
                this.indus = false;
            } catch (error) {
                console.error('Error occurred while fetching data:', error);
            }
        },

        formatParentData(shareholders) {
            const formattedData = [];
            shareholders.forEach(item => {
                const formattedItem = {
                    id: item.stkCd + '_'+Math.random(),
                    name: item.s0301a,
                    percent: item.s0304a !== null ? item.s0304a + '%' : '',
                };
                formattedData.push(formattedItem);
            });
            return formattedData;
        },

        async formatChildrenData(shareholders,times) {
            //限制层数为3层
            if (times===3){
                return
            }
            times++

            //处理子树数据,根据id迭代查找子公司
            const formattedData = [];
            for (const item of shareholders) {
                if (typeof item.investCompany === 'string') {
                    try {
                        const res1 = await getLatestStockInvestment(item.investCompany);
                        const children2data = res1.data.data;
                        item.investCompany = await this.formatChildrenData(children2data,times);
                    } catch (error) {
                        item.investCompany = "";
                    }
                } else {
                    item.investCompany = "";
                }
                const formattedItem = {
                    id: item.stkCd + '_'+Math.random(),
                    name: item.holdInstitutionName,
                    percent: item.endDateRatio !== null ? item.endDateRatio + '%' : '',
                    industry: item.industry !==null ? item.industry : "其他",
                    children: item.investCompany,
                };
                formattedData.push(formattedItem);
            }

            return formattedData;
        },

        assignColorToData(data, color) {
            if (!data || typeof data !== 'object') {
                return;
            }
            // 给当前对象赋值颜色
            data.color = color;

            // 递归处理子对象
            if (Array.isArray(data.children)) {
                data.children.forEach(child => {
                    this.assignColorToData(child, color);
                });
            }
        },

        getRandomColor() {
            // 控制红色,绿色,蓝色 获得浅色系
            const r = Math.floor(Math.random() * 128) + 128;
            const g = Math.floor(Math.random() * 128) + 128;
            const b = Math.floor(Math.random() * 128) + 128;
            return `rgb(${r},${g},${b})`;
        },

        // 股权树
        constructor(options) {
            // 树的源数据
            this.originTreeData = this.data;
            // 宿主元素选择器
            this.el = document.getElementById("appc");
            // 一些配置项
            this.config = {
                // 节点的横向距离
                dx: 150,
                // 节点的纵向距离
                dy: 125,
                // svg的viewBox的宽度
                width: 0,
                // svg的viewBox的高度
                height: 500,
                // 节点的矩形框宽度
                rectWidth: 120,
                // 节点的矩形框高度
                rectHeight: 50,
            };
            this.svg = null;
            this.gAll = null;
            this.gLinks = null;
            this.gNodes = null;
            // 给树加坐标点的方法
            this.tree = null;
            // 投资公司树的根节点
            this.rootOfDown = null;
            // 股东树的根节点
            this.rootOfUp = null;
            this.drawChart({
                type: "fold",
            });
        },

        // 初始化树结构数据
        drawChart(options) {
            // 宿主元素的d3选择器对象
            let host = this.d3.select(this.el);
            // 宿主元素的DOM，通过node()获取到其DOM元素对象
            let dom = host.node();
            // 宿主元素的DOMRect
            let domRect = dom.getBoundingClientRect();
            // svg的宽度和高度
            this.config.width = domRect.width;
            this.config.height = domRect.height;
            let oldSvg = this.d3.select("svg");
            // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
            if (!oldSvg.empty()) {
                oldSvg.remove();
            }
            const svg = this.d3
                .create("svg")
                .attr("viewBox", () => {
                    let parentsLength = this.originTreeData.parents
                        ? this.originTreeData.parents.length
                        : 0;
                    return [
                        -this.config.width / 2,
                        // 如果有父节点，则根节点居中，否则根节点上浮一段距离
                        parentsLength > 0
                            ? -this.config.height / 2
                            : -this.config.height / 3,
                        this.config.width,
                        this.config.height,
                    ];
                })
                .style("user-select", "none")
                .style("cursor", "move");

            // 包括连接线和节点的总集合
            const gAll = svg.append("g").attr("id", "all");
            svg
                .call(
                    this.d3
                        .zoom()
                        .scaleExtent([0.2, 5])
                        .on("zoom", (e) => {
                            gAll.attr("transform", () => {
                                return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`;
                            });
                        })
                )
                .on("dblclick.zoom", null); // 取消默认的双击放大事件
            this.gAll = gAll;
            // 连接线集合
            this.gLinks = gAll.append("g").attr("id", "linkGroup");
            // 节点集合
            this.gNodes = gAll.append("g").attr("id", "nodeGroup");
            // 设置好节点之间距离的tree方法
            this.tree = this.d3.tree().nodeSize([this.config.dx, this.config.dy]);
            this.rootOfDown = this.d3.hierarchy(
                this.originTreeData,
                (d) => d.children
            );
            this.rootOfUp = this.d3.hierarchy(this.originTreeData, (d) => d.parents);
            this.tree(this.rootOfDown);
            [this.rootOfDown.descendants(), this.rootOfUp.descendants()].forEach(
                (nodes) => {
                    nodes.forEach((node) => {
                        node._children = node.children || null;
                        if (options.type === "all") {
                            //如果是all的话，则表示全部都展开
                            node.children = node._children;
                        } else if (options.type === "fold") {
                            //如果是fold则表示除了父节点全都折叠
                            // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
                            if (node.depth) {
                                node.children = null;
                            }
                        }
                    });
                }
            );
            //箭头(下半部分)
            svg
                .append("marker")
                .attr("id", "markerOfDown")
                .attr("markerUnits", "userSpaceOnUse")
                .attr("viewBox", "0 -5 10 10") //坐标系的区域
                .attr("refX", 50) //箭头坐标
                .attr("refY", 0)
                .attr("markerWidth", 10) //标识的大小
                .attr("markerHeight", 10)
                .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
                .attr("stroke-width", 2) //箭头宽度
                .append("path")
                .attr("d", "M0,-5L10,0L0,5") //箭头的路径
                .attr("fill", "#2FA8FF"); //箭头颜色
            //箭头(上半部分)
            svg
                .append("marker")
                .attr("id", "markerOfUp")
                .attr("markerUnits", "userSpaceOnUse")
                .attr("viewBox", "0 -5 10 10") //坐标系的区域
                .attr("refX", -40) //箭头坐标
                .attr("refY", 0)
                .attr("markerWidth", 10) //标识的大小
                .attr("markerHeight", 10)
                .attr("orient", "90") //绘制方向，可设定为：auto（自动确认方向）和 角度值
                .attr("stroke-width", 2) //箭头宽度
                .append("path")
                .attr("d", "M0,-5L10,0L0,5") //箭头的路径
                .attr("fill", "#2FA8FF"); //箭头颜色
            this.svg = svg;
            this.update();
            // 将svg置入宿主元素中
            host.append(function () {
                return svg.node();
            });
        },
        // 更新数据
        update(source) {
            if (!source) {
                source = {
                    x0: 0,
                    y0: 0,
                };
                // 设置根节点所在的位置（原点）
                this.rootOfDown.x0 = 0;
                this.rootOfDown.y0 = 0;
                this.rootOfUp.x0 = 0;
                this.rootOfUp.y0 = 0;
            }
            let nodesOfDown = this.rootOfDown.descendants().reverse();
            let linksOfDown = this.rootOfDown.links();
            let nodesOfUp = this.rootOfUp.descendants().reverse();
            let linksOfUp = this.rootOfUp.links();
            this.tree(this.rootOfDown);
            this.tree(this.rootOfUp);
            const myTransition = this.svg.transition().duration(500);
            /***  绘制子公司树  ***/
            const node1 = this.gNodes
                .selectAll("g.nodeOfDownItemGroup")
                .data(nodesOfDown, (d) => {
                    return d.data.id;
                });
            const node1Enter = node1
                .enter()
                .append("g")
                .attr("class", "nodeOfDownItemGroup")
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .style("cursor", "pointer");
            //股权投资外层的矩形框
            node1Enter
                .append("rect")
                .attr("width", (d) => {
                    if (d.depth === 0) {
                        return (d.data.name.length + 5) * 16;
                    }
                    return this.config.rectWidth;
                })
                .attr("height", (d) => {
                    if (d.depth === 0) {
                        return 60;
                    }
                    return this.config.rectHeight;
                })
                .attr("x", (d) => {
                    if (d.depth === 0) {
                        return (-(d.data.name.length + 5) * 16) / 2;
                    }
                    return -this.config.rectWidth / 2;
                })
                .attr("y", (d) => {
                    if (d.depth === 0) {
                        return -30;
                    }
                    return -this.config.rectHeight / 2;
                })
                .attr("rx", 5)
                .attr("stroke-width", (d) => {
                    if (/^[A-Za-z\s.]+$/.test(d.data.name)) {
                        return 3; // 海外设置虚线边框宽度为2
                    }
                    return 1;
                })
                .attr("stroke", (d) => {
                    if (d.depth === 0) {
                        return "#1877F2";
                    }
                    if (/^[A-Za-z\s.]+$/.test(d.data.name)) {
                        return "#DB3439"; // 如果全是英文字符则返回红色
                    }
                    return "#8ECDFF";
                })
                .attr("stroke-dasharray", (d) => {
                    // 如果名称全是英文字符，则设置虚线边框
                    if (d.data.name && /^[A-Za-z\s.]+$/.test(d.data.name)) {
                        return "20, 10"; // 设置虚线样式
                    }
                    return "none";
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#1877F2";
                    }
                    return d.data.color;
                })
                .on("click", (e, d) => {
                    this.nodeClickEvent(e, d);
                })
                .on("mouseover", (e, d) => {
                    // 在这里添加弹窗显示逻辑，可以使用现有的弹窗组件或自定义弹窗
                    console.log("需要弹出公司信息")
                })
                .on("mouseleave", (e, d) => {
                    // 鼠标移开
                })
            ;


            //股权投资 文本主标题
            node1Enter
                .append("text")
                .attr("class", "main-title")
                .attr("x", (d) => {
                    return 0;
                })
                .attr("y", (d) => {
                    if (d.depth === 0) {
                        return 5;
                    }
                    return -3;
                })
                .attr("text-anchor", (d) => {
                    return "middle";
                })
                .text((d) => {
                    if (d.depth === 0) {
                        return d.data.name;
                    } else {
                        return d.data.name.length > 8
                            ? d.data.name.substring(0, 8)
                            : d.data.name;
                    }
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#2c2b2b";
                })
                .style("font-size", (d) => (d.depth === 0 ? 18 : 14))
                .style("font-family", "黑体")
                // .style("font-weight", "bold");
            //股权投资 副标题
            node1Enter
                .append("text")
                .attr("class", "sub-title")
                .attr("x", (d) => {
                    return 0;
                })
                .attr("y", (d) => {
                    if (d.depth === 0) {
                        return 5;
                    }
                    return 13;
                })
                .attr("text-anchor", (d) => {
                    return "middle";
                })
                .text((d) => {
                    if (d.depth !== 0) {
                        let subTitle = d.data.name.substring(8);
                        if (subTitle.length > 6) {
                            return subTitle.substring(0, 6) + "...";
                        }
                        return subTitle;
                    }
                })
                .style("font-size", (d) => 14)
                .style("font-family", "黑体")
                // .style("font-weight", "bold");

            //股权投资 控股比例
            node1Enter
                .append("text")
                .attr("class", "percent")
                .attr("x", (d) => {
                    return 10;
                })
                .attr("y", (d) => {
                    return -35;
                })
                .text((d) => {
                    if (d.depth !== 0) {
                        return d.data.percent;
                    }
                })
                .attr("fill", "#2FA8FF")
                .style("font-family", "黑体")
                .style("font-size", (d) => 14);

            //股权投资 增加展开按钮
            const expandBtnG = node1Enter
                .append("g")
                .attr("class", "expandBtn")
                .attr("transform", (d) => {
                    return `translate(${0},${this.config.rectHeight / 2})`;
                })
                .style("display", (d) => {
                    // 如果是根节点，不显示
                    if (d.depth === 0) {
                        return "none";
                    }
                    // 如果没有子节点，则不显示
                    if (!d._children) {
                        return "none";
                    }
                })
                .on("click", (e, d) => {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                    }
                    this.update(d);
                });

            expandBtnG
                .append("circle")
                .attr("r", 7)
                .attr("fill", "#2FA8FF")
                .attr("cy", 9);

            expandBtnG
                .append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "#ffffff")
                .attr("y", 13)
                .style("font-size", 14)
                .style("font-family", "微软雅黑")
                .text((d) => {
                    return d.children ? "-" : "+";
                });

            //股权投资 链接
            const link1 = this.gLinks
                .selectAll("path.linkOfDownItem")
                .data(linksOfDown, (d) => d.target.data.id);

            const link1Enter = link1
                .enter()
                .append("path")
                .attr("class", "linkOfDownItem")
                .attr("d", (d) => {
                    let o = {
                        source: {
                            x: source.x0,
                            y: source.y0,
                        },
                        target: {
                            x: source.x0,
                            y: source.y0,
                        },
                    };
                    return this.drawLink(o);
                })
                .attr("fill", "none")
                .attr("stroke", "#8ECDFF")
                .attr("stroke-width", 1)
                .attr("marker-end", "url(#markerOfDown)");

            // 有元素update更新和元素新增enter的时候
            node1
                .merge(node1Enter)
                .transition(myTransition)
                .attr("transform", (d) => {
                    return `translate(${d.x},${d.y})`;
                })
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);

            // 有元素消失时
            node1
                .exit()
                .transition(myTransition)
                .remove()
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            link1.merge(link1Enter).transition(myTransition).attr("d", this.drawLink);

            link1
                .exit()
                .transition(myTransition)
                .remove()
                .attr("d", (d) => {
                    let o = {
                        source: {
                            x: source.x,
                            y: source.y,
                        },
                        target: {
                            x: source.x,
                            y: source.y,
                        },
                    };
                    return this.drawLink(o);
                });

            /***  绘制股东树  ***/

            nodesOfUp.forEach((node) => {
                node.y = -node.y;
            });

            const node2 = this.gNodes
                .selectAll("g.nodeOfUpItemGroup")
                .data(nodesOfUp, (d) => {
                    return d.data.id;
                });

            const node2Enter = node2
                .enter()
                .append("g")
                .attr("class", "nodeOfUpItemGroup")
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .style("cursor", "pointer");

            //股东 外层的矩形框
            node2Enter
                .append("rect")
                .attr("width", (d) => {
                    if (d.depth === 0) {
                        return (d.data.name.length + 5) * 16;
                    }
                    return this.config.rectWidth;
                })
                .attr("height", (d) => {
                    if (d.depth === 0) {
                        return 60;
                    }
                    return this.config.rectHeight;
                })
                .attr("x", (d) => {
                    if (d.depth === 0) {
                        return (-(d.data.name.length + 5) * 16) / 2;
                    }
                    return -this.config.rectWidth / 2;
                })
                .attr("y", (d) => {
                    if (d.depth === 0) {
                        return -30;
                    }
                    return -this.config.rectHeight / 2;
                })
                .attr("rx", 5)
                .attr("stroke-width", (d) => {
                    if (/^[A-Za-z\s.]+$/.test(d.data.name)) {
                        return 3; // 海外设置虚线边框宽度为2
                    }
                    return 1;
                })
                .attr("stroke", (d) => {
                    if (d.depth === 0) {
                        return "#1877F2";
                    }
                    if (/^[A-Za-z\s.]+$/.test(d.data.name)) {
                        return "#DB3439"; // 如果全是英文字符则返回红色
                    }
                    return "#8ECDFF";
                })
                .attr("stroke-dasharray", (d) => {
                    // 如果名称全是英文字符，则设置虚线边框
                    if (d.data.name && /^[A-Za-z\s.]+$/.test(d.data.name)) {
                        return "20, 10"; // 设置虚线样式
                    }
                    return "none";
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#1877F2";
                    }
                    return "#E3F3FF";
                })
                .on("click", (e, d) => {
                    this.nodeClickEvent(e, d);
                });
            //股东 文本主标题
            node2Enter
                .append("text")
                .attr("class", "main-title")
                .attr("x", (d) => {
                    return 0;
                })
                .attr("y", (d) => {
                    if (d.depth === 0) {
                        return 5;
                    }
                    return -3;
                })
                .attr("text-anchor", (d) => {
                    return "middle";
                })
                .text((d) => {
                    if (d.depth === 0) {
                        return d.data.name;
                    } else {
                        return d.data.name.length > 8
                            ? d.data.name.substring(0, 8)
                            : d.data.name;
                    }
                })
                .attr("fill", (d) => {
                    if (d.depth === 0) {
                        return "#FFFFFF";
                    }
                    return "#000000";
                })
                .style("font-size", (d) => (d.depth === 0 ? 18 : 14))
                .style("font-family", "黑体")
                // .style("font-weight", "bold");
            //股东 副标题
            node2Enter
                .append("text")
                .attr("class", "sub-title")
                .attr("x", (d) => {
                    return 0;
                })
                .attr("y", (d) => {
                    if (d.depth === 0) {
                        return 5;
                    }
                    return 15;
                })
                .attr("text-anchor", (d) => {
                    return "middle";
                })
                .text((d) => {
                    if (d.depth !== 0) {
                        let subTitle = d.data.name.substring(8);
                        if (subTitle.length > 6) {
                            return subTitle.substring(0, 6) + "...";
                        }
                        return subTitle;
                    }
                })
                .style("font-size", (d) => 14)
                .style("font-family", "黑体")
                // .style("font-weight", "bold");

            //股东 控股比例
            node2Enter
                .append("text")
                .attr("class", "percent")
                .attr("x", (d) => {
                    return 10;
                })
                .attr("y", (d) => {
                    return 40;
                })
                .text((d) => {
                    if (d.depth !== 0) {
                        return d.data.percent;
                    }
                })
                .attr("fill", "#2FA8FF")
                .style("font-family", "黑体")
                .style("font-size", (d) => 14);

            //股东 实际控股人
            node2Enter
                .append("svg:rect")
                .attr("x", -75)
                .attr("y", -98)
                .attr("width", function (d) {
                    return d.data.controlling ? 150 : 0;
                })
                .attr("height", function (d) {
                    return d.data.controlling ? 45 : 0;
                })
                .attr("rx", 5)
                .style("stroke", function (d) {
                    return d.data.controlling ? "#DB3439" : "#F1B03A";
                })
                .style("fill", function (d) {
                    return d.data.controlling ? "#DB3439" : "#F1B03A"; //节点背景色
                });
            node2Enter
                .append("svg:path")
                .attr("fill", (d) => {
                    return d.data.controlling ? "#2FA8FF" : "";
                })
                .attr("d", function (d) {
                    if (d.data.controlling) {
                        return "M-5,-35 L5,-35 L0,-45";
                    } else {
                        return "";
                    }
                });
            node2Enter
                .append("svg:path")
                .attr("stroke", (d) => {
                    return d.data.controlling ? "#2FA8FF" : "";
                })
                .attr("d", "M0 -25 L0 -52")
            node2Enter
                .append("text")
                .attr("x", "0")
                .attr("dy", "-80")
                .attr("text-anchor", "middle")
                .style("fill", "#fff")
                .style("font-size", 14)
                .text(function (d) {
                    return d.data.controlling ? d.data.controllerName: "";
                });
            node2Enter
                .append("text")
                .attr("x", "0")
                .attr("dy", "-60")
                .attr("text-anchor", "middle")
                .style("fill", "#fff")
                .style("font-size", 14)
                .text(function (d) {
                    return d.data.controlling ?"控股比例： "+d.data.controllerPercent+"%" : "";
                });


            // 增加展开按钮
            const expandBtnG2 = node2Enter
                .append("g")
                .attr("class", "expandBtn")
                .attr("transform", (d) => {
                    return `translate(${0},${-this.config.rectHeight / 2})`;
                })
                .style("display", (d) => {
                    // 如果是根节点，不显示
                    if (d.depth === 0) {
                        return "none";
                    }
                    // 如果没有子节点，则不显示
                    if (!d._children) {
                        return "none";
                    }
                })
                .on("click", (e, d) => {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                    }
                    this.update(d);
                });

            expandBtnG2
                .append("circle")
                .attr("r", 7)
                .attr("fill", "#2FA8FF")
                .attr("cy", -9);

            expandBtnG2
                .append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "#ffffff")
                .attr("y", -4)
                .style("font-size", 14)
                .style("font-family", "微软雅黑")
                .text((d) => {
                    return d.children ? "-" : "+";
                });

            const link2 = this.gLinks
                .selectAll("path.linkOfUpItem")
                .data(linksOfUp, (d) => d.target.data.id);

            const link2Enter = link2
                .enter()
                .append("path")
                .attr("class", "linkOfUpItem")
                .attr("d", (d) => {
                    let o = {
                        source: {
                            x: source.x0,
                            y: source.y0,
                        },
                        target: {
                            x: source.x0,
                            y: source.y0,
                        },
                    };
                    return this.drawLink(o);
                })
                .attr("fill", "none")
                .attr("stroke", "#8ECDFF")
                .attr("stroke-width", 1)
                .attr("marker-end", "url(#markerOfUp)");

            // 有元素update更新和元素新增enter的时候
            node2
                .merge(node2Enter)
                .transition(myTransition)
                .attr("transform", (d) => {
                    return `translate(${d.x},${d.y})`;
                })
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);
            // 有元素消失时
            node2
                .exit()
                .transition(myTransition)
                .remove()
                .attr("transform", (d) => {
                    return `translate(${source.x0},${source.y0})`;
                })
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);
            link2.merge(link2Enter).transition(myTransition).attr("d", this.drawLink);
            link2
                .exit()
                .transition(myTransition)
                .remove()
                .attr("d", (d) => {
                    let o = {
                        source: {
                            x: source.x,
                            y: source.y,
                        },
                        target: {
                            x: source.x,
                            y: source.y,
                        },
                    };
                    return this.drawLink(o);
                });
            // node数据改变的时候更改一下加减号
            const expandButtonsSelection = this.d3.selectAll("g.expandBtn");
            expandButtonsSelection
                .select("text")
                .transition()
                .text((d) => {
                    return d.children ? "-" : "+";
                });

            this.rootOfDown.eachBefore((d) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
            this.rootOfUp.eachBefore((d) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },
        // 直角连接线 by
        drawLink({ source, target }) {
            const halfDistance = (target.y - source.y) / 2;
            const halfY = source.y + halfDistance;
            return `M${source.x},${source.y} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`;
        },
        // 展开所有的节点
        expandAllNodes() {
            this.drawChart({
                type: "all",
            });
        },
        // 将所有节点都折叠
        foldAllNodes() {
            this.drawChart({
                type: "fold",
            });
        },
        //点击节点获取节点数据
        nodeClickEvent(e, d) {
            console.log("当前节点的数据：", d);
        },
    },
};
</script>
<style  scoped>

.table-container{
    border: #e1e3e5 1px solid;
    border-radius: 10px;
    padding: 20px 15px 50px ;
    margin-bottom: 50px;
}
.title{
    font-size: large;
    font-weight: bold;
    color: #000000;
    margin-left: 50px;
}
.legend {
    margin-top: 20px;
}

.legend-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.legend-item {
    display: flex;
    align-items: center;
    margin:0 5px 5px 5px;

}

.legend-color {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #8ECDFF;
}
.legend-color2 {
     width: 30px;
     height: 30px;
     margin-right: 10px;
     border-radius: 5px;
     border: 2px dashed #DB3439;
 }
</style>
