/**
 * 中国地图 SVG 组件
 * 使用简化版省份轮廓 path 数据
 * 可爱简洁风格，暖色调标注去过的省份
 */

// 暖色调色板（去过的省份用不同暖色）
const WARM_COLORS = [
  '#F4A6A0', '#F7C59F', '#F5E6C8', '#E8C8A0', '#D4A574',
  '#F2B5B5', '#FFDAB9', '#E6C9A8', '#F0C987', '#DEB887',
  '#F5C6AA', '#E8B4B8', '#D4C5A9', '#F0D9B5', '#E0C8B0',
];
const UNVISITED_COLOR = '#E8E4E0';

/**
 * 渲染中国地图到指定容器
 * 使用 echarts 风格的简化 SVG
 */
function renderChinaMap(container, visitedList) {
  const visited = new Set(visitedList);
  container.classList.add('china-map-container');
  container.style.position = 'relative';

  // tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'map-tooltip';
  container.appendChild(tooltip);

  // 使用内联 SVG 绘制简化中国地图
  const mapHTML = buildChinaMapSVG(visited, tooltip, container);
  container.insertAdjacentHTML('beforeend', mapHTML);

  // 绑定事件
  const paths = container.querySelectorAll('.province');
  paths.forEach(path => {
    const name = path.getAttribute('data-name');
    const isVisited = visited.has(name);

    path.addEventListener('mouseenter', () => {
      tooltip.textContent = name + (isVisited ? ' ✓ 已去过' : '');
      tooltip.style.opacity = '1';
    });
    path.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
      tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
    });
    path.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });

  // 图例
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;justify-content:center;gap:16px;margin-top:8px;font-size:0.75rem;color:#5C3D2E;';
  legend.innerHTML = `
    <span style="display:flex;align-items:center;gap:4px;">
      <span style="width:12px;height:12px;border-radius:3px;background:${WARM_COLORS[0]};display:inline-block;"></span>
      去过
    </span>
    <span style="display:flex;align-items:center;gap:4px;">
      <span style="width:12px;height:12px;border-radius:3px;background:${UNVISITED_COLOR};display:inline-block;"></span>
      未去过
    </span>
  `;
  container.appendChild(legend);
}

function buildChinaMapSVG(visited) {
  // 省份数据：name, cx, cy (中心坐标), 简化多边形
  const provinces = [
    { name: '黑龙江', points: '340,18 365,12 385,20 395,42 390,68 375,78 358,82 342,72 332,50 335,30' },
    { name: '吉林', points: '348,82 375,78 392,88 395,105 382,115 360,112 345,100 342,88' },
    { name: '辽宁', points: '338,105 360,112 382,118 385,138 370,150 348,148 332,135 328,118' },
    { name: '内蒙古', points: '195,22 240,15 290,12 330,18 340,42 335,70 320,82 295,88 265,82 235,72 215,55 200,38' },
    { name: '新疆', points: '68,25 130,15 175,18 195,35 200,65 195,100 180,125 155,138 120,135 88,120 65,95 55,60' },
    { name: '西藏', points: '68,130 120,125 155,130 175,145 172,175 160,200 130,210 95,205 70,185 58,158' },
    { name: '青海', points: '155,105 190,98 210,108 215,130 205,150 180,158 158,150 148,130' },
    { name: '甘肃', points: '185,72 215,65 245,78 260,95 255,115 240,128 225,125 210,115 195,105 188,88' },
    { name: '宁夏', points: '242,92 255,88 262,100 258,115 248,118 240,108' },
    { name: '陕西', points: '248,108 265,100 280,108 282,130 278,155 268,168 255,162 248,142 245,125' },
    { name: '山西', points: '278,85 298,80 308,95 305,120 295,138 280,132 275,112 276,95' },
    { name: '河北', points: '295,72 325,68 338,82 335,105 328,118 315,128 298,125 290,108 288,88' },
    { name: '北京', points: '310,78 322,75 325,85 318,90 308,88' },
    { name: '天津', points: '322,90 332,88 335,98 328,102 320,98' },
    { name: '山东', points: '308,125 330,118 350,125 358,142 348,158 325,162 308,152 302,138' },
    { name: '河南', points: '272,138 298,132 312,145 308,168 292,178 272,175 262,158 265,145' },
    { name: '江苏', points: '318,142 345,138 355,155 350,172 338,182 322,178 312,165 315,150' },
    { name: '安徽', points: '302,158 322,152 330,170 325,192 310,200 295,195 288,178 295,165' },
    { name: '上海', points: '348,170 358,168 360,178 352,182 346,176' },
    { name: '浙江', points: '325,185 345,180 352,195 345,215 330,222 318,215 315,198' },
    { name: '湖北', points: '255,162 278,158 298,165 302,185 290,200 268,205 252,192 248,175' },
    { name: '四川', points: '172,148 210,142 240,150 252,168 248,198 232,215 205,218 182,208 168,185 165,162' },
    { name: '重庆', points: '242,185 258,180 268,195 262,212 248,215 238,205' },
    { name: '湖南', points: '268,200 292,195 305,210 298,235 280,245 262,240 252,222 258,208' },
    { name: '江西', points: '298,200 322,195 332,215 325,240 310,250 295,245 288,225 292,208' },
    { name: '福建', points: '322,222 342,218 350,235 345,258 330,268 318,260 312,242' },
    { name: '台湾', points: '358,235 368,230 372,252 365,268 355,262 352,245' },
    { name: '广东', points: '262,248 295,242 318,252 325,268 312,282 288,288 265,280 255,265' },
    { name: '广西', points: '222,248 262,242 268,265 258,282 238,288 218,278 212,262' },
    { name: '海南', points: '252,295 268,292 272,308 262,315 250,308' },
    { name: '贵州', points: '222,215 252,210 262,228 258,250 240,258 222,252 215,235' },
    { name: '云南', points: '168,218 215,212 225,240 222,268 210,288 188,292 170,275 160,248' },
    { name: '香港', points: '312,278 320,276 322,284 316,286' },
    { name: '澳门', points: '302,282 308,280 310,287 304,289' },
  ];

  let colorIndex = 0;
  let pathsHTML = '';

  provinces.forEach(prov => {
    const isVisited = visited.has(prov.name);
    const fill = isVisited ? WARM_COLORS[colorIndex++ % WARM_COLORS.length] : UNVISITED_COLOR;
    pathsHTML += `<polygon class="province" data-name="${prov.name}" points="${prov.points}" fill="${fill}" stroke="#fff" stroke-width="1" stroke-linejoin="round"/>`;
  });

  return `<svg viewBox="40 5 350 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="max-width:380px;margin:0 auto;display:block;">${pathsHTML}</svg>`;
}
