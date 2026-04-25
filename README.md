# Sibyl's Personal Resume ✦

> 一份用 Vibe Coding 独立完成的动态网页简历，纯原生 HTML / CSS / JavaScript，零框架依赖。

**在线访问：** https://person-delta.vercel.app/

---

## ✨ 有趣的功能

### 1. 打字机模式 — Hero 称谓循环切换

进入页面，标题下方的角色标签会像打字机一样逐字打出、停留、再逐字删除，循环切换多个身份标签：

```
AI Product Manager → ESFJ → Agent Builder → Skill Creator → ...
```

- 打字速度 100ms / 字，删除速度 60ms / 字
- 打完后停留 2 秒再删除，删完后 400ms 切换下一个
- 光标闪烁动画，高度还原真实终端手感

---

### 2. 塔罗牌模式 — 点击翻牌解锁能力卡

`Chapter III · The Explorer` 区域排列着一组塔罗牌，每张牌背面印有 **SIBYL** 字样。

- **扇形发牌入场**：页面滚动到此区域，牌依次以 120ms 间隔动画飞入，排成扇形
- **点击翻牌**：卡牌正反面以 opacity 过渡切换，翻到正面后弹出放大弹窗，显示完整内容
- **翻牌计数器**：已翻开 `N / 10` 实时更新
- **彩蛋撒花**：集齐全部 10 张后触发 🎉 撒花动效（80 颗随机颜色、随机大小的彩纸从屏幕顶部飘落）+ Toast 提示"你已解锁 Sibyl 的全部秘密"

---

### 3. 交互式中国地图 — 足迹可视化

塔罗牌"旅行者"一张翻开后，弹窗内嵌入一张 **SVG 中国地图**，已到访的 15+ 省份/地区高亮显示，从哈尔滨到海南、从新疆到港澳，一眼看清足迹分布。

---

### 4. 滚动入场动画 — Intersection Observer

全站所有卡片、时间轴节点均使用 `IntersectionObserver` 监听可见性：

- 元素滚动进入视口 15% 时触发 `visible` 类，执行淡入 + 上移入场动画
- 观察完毕后立即 `unobserve`，保证性能不打折

---

### 5. 导航高亮 + 平滑滚动

- 滚动到不同 Section 时，顶部导航对应项自动高亮
- 点击导航项触发 `scrollIntoView({ behavior: 'smooth' })`，平滑定位
- 移动端自动切换为汉堡菜单，点击遮罩关闭，配合 `overflow: hidden` 锁定背景滚动

---

### 6. 联系方式一键复制 / 跳转

Hero 区域的联系方式图标各有不同行为：

| 图标 | 行为 |
|------|------|
| GitHub | 新标签页打开主页 |
| 邮箱 | 调起系统邮件客户端 |
| 微信 | 复制 ID 到剪贴板 + Toast 提示 |
| 电话 | 复制号码到剪贴板 + Toast 提示 |

复制降级兼容：优先 `navigator.clipboard`，不支持时回退 `execCommand('copy')`。

---

### 7. Vibe Coding 项目展示 — 仿浏览器窗口

`Chapter II · The Creator` 以模拟浏览器窗口的形式展示求职进度管理系统，包含红黄绿三点装饰、地址栏、项目截图，点击截图区域可直接跳转在线系统。

---

### 8. 数据驱动架构

所有个人信息（经历、联系方式、塔罗牌内容、足迹省份……）全部集中在 `data.js` 一个文件中维护，`app.js` 负责纯逻辑渲染，更新简历只需改数据，无需动逻辑。

---

## 🗂 文件结构

```
person/
├── index.html              # 页面骨架（无内容，纯结构）
├── data.js                 # 所有个人数据配置
├── app.js                  # 渲染逻辑 + 交互动画
├── styles.css              # 全站样式（暖色系设计）
├── china-map.js            # SVG 中国地图渲染
└── showcase-screenshot.png # 项目截图
```

---

## 🛠 技术栈

- **原生 HTML5 / CSS3 / JavaScript（ES6+）**，零框架、零依赖
- **GSAP**（CDN 引入，用于塔罗牌动画增强）
- **Intersection Observer API**（滚动入场动画）
- **CSS 自定义属性 + Flexbox / Grid**（响应式布局）
- 部署：**Vercel**（连接 GitHub 仓库自动 CI/CD）

---

Made with ♥ by Sibyl
