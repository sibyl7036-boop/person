/**
 * Sibyl 个人动态网页简历 — 数据配置文件
 * 所有个人信息通过此文件驱动，修改内容只需编辑此文件
 */

const SITE_DATA = {
  /* ========== 基本信息 ========== */
  profile: {
    englishName: 'Sibyl',
    chineseName: '王语彤',
    title: 'AI Product Manager',
    heroHeading: 'Know about Sibyl',
    heroSubtitle: '王语彤 | AI Product Manager',
  },

  /* ========== Hero 打字机切换称谓 ========== */
  heroRoles: [
    'AI Product Manager',
    'ESFJ',
    'Agent Builder',
    'Skill Creator',
  ],

  /* ========== 联系方式 ========== */
  contacts: [
    {
      type: 'github',
      label: 'GitHub',
      value: 'sibyl7036-boop',
      url: 'https://github.com/sibyl7036-boop',
      action: 'link',
    },
    {
      type: 'wechat',
      label: '微信',
      value: 'Sibylsleeping',
      action: 'copy',
    },
    {
      type: 'email',
      label: '邮箱',
      value: '3298415208@qq.com',
      url: 'mailto:3298415208@qq.com',
      action: 'link',
    },
    {
      type: 'phone',
      label: '电话',
      value: '19962621398',
      url: 'tel:19962621398',
      action: 'copy',
    },
  ],

  /* ========== 教育经历 ========== */
  education: [
    {
      period: '2021.09 — 2025.06',
      institution: '南京大学',
      role: '电子信息科学与技术（本科）',
      highlights: [
        '3D Vision-LAB 科研er',
        'GPA 4.5/5.0（90/100），排名 8%（22/261）',
        '南京大学优秀毕业生',
      ],
      icon: '🎓',
      images: [
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/c34bb2dc-b6d5-4507-9c0b-4c4f08c89be7/70e0b8c8453e51a817c7cfbf46496e11.jpg',
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/a00b60f7-c7d1-4442-a81f-268d60b5154b/9162432732fa4d16691615d0b367d394.jpg',
      ],
    },
    {
      period: '2025.09 — 2027.01',
      institution: '香港科技大学',
      role: '电子工程（硕士）',
      highlights: [
        '亚洲最美校园摄影第一人',
      ],
      icon: '🎓',
      images: [
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/67d9947c-6fd3-4338-817c-011130f4f47e/a6dbd0f72157384ad208802f2e7b8758.jpg',
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/09e14715-54d4-46e4-b7ae-374c829e75da/5a416a75bdbfae7903157a0b330d43ed.jpg',
      ],
    },
  ],

  /* ========== 实习经历 ========== */
  experiences: [
    {
      period: '2026.02 — 至今',
      company: '腾讯',
      department: '数据中台 Data Agent',
      role: 'AI 产品经理',
      layout: 'featured',  // 带图片的大卡片
      highlights: [
        'Data Agent 策略设计',
        'Vibe Coding 独立交付数据洞察产品',
        'Agent 交互功能优化',
      ],
      images: [
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/d6d38020-433b-4d8e-86b0-fb973cd93a9a/image.png',
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/c8149583-ed36-4c4d-a83e-44122ba08128/b65c90ee64ef6056bd2e8d565d5dd6a0.jpg',
      ],
      icon: '💼',
    },
    {
      period: '2025.10 — 2026.01',
      company: '百度',
      department: '低代码 Agent 构建平台',
      role: 'AI 产品经理',
      layout: 'featured',  // 带图片的大卡片
      highlights: [
        '市场运营场景 AI 解决方案：Agent 设计、Workflow 编排、Skill 创建……',
        '平台基础功能建设',
      ],
      images: [
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/8bdcb7d5-ccbc-428a-8a91-e150f99807e1/image.png',
        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/680cbcf6-f1b3-48da-ab15-bafbbef1e1eb/image.png',
      ],
      icon: '💼',
    },
    {
      period: '2025.05 — 2025.08',
      company: '土星视界科技',
      department: '',
      role: '大模型开发工程师',
      layout: 'compact',  // 紧凑卡片，与下一个并排
      pairWith: 'next',   // 标记与下一个并排
      highlights: [
        '设备管理系统后端开发',
        '（Java/Spring Boot/Mybatis/MySQL）',
        'Agent 客服',
        '（LangChain/RAG）',
      ],
      icon: '⚙️',
    },
    {
      period: '2024.07 — 2024.08',
      company: '光影焕像科技',
      department: '',
      role: 'AIGC 算法工程师',
      layout: 'compact',  // 紧凑卡片
      highlights: [
        '数字人偶生成',
        '（ComfyUI / Stable Diffusion）',
        '稀疏视点三维重建',
        '（Python/Pytorch/3DGS/VGGT）',
      ],
      icon: '🎨',
    },
  ],

  /* ========== Vibe Coding 项目展示 ========== */
  showcase: {
    title: '求职进度管理系统',
    badge: 'VIBE CODING',
    subtitle: 'Know your Offer Journey',
    description: '一款面向求职季大学生的一站式求职流程管理看板。系统以看板 + 日历 + 公司流程图三视图打通投递全链路，覆盖面试、笔试、测评、HR 面到 Offer 全节点，配套多版本简历管理与 PDF 预览。',
    aiHighlight: '核心亮点是深度融合的 AI 求职小助手：基于豆包大模型，一个聊天框自然语言对话，并一键触发四大能力——面试邮件解析自动建日程、JD 解析抽取能力画像、面试题生成定制高频考点、面试复盘归纳回答与建议。AI 结果先出草稿可改可存，让求职全流程清晰、高效、可追踪。🌸',
    screenshot: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/with/a3bdb3a1-eec7-4d60-b421-76020cbd7829/image.png',
    features: [
      { icon: '📋', label: '看板视图', desc: '心愿单 → 已投递 → 面试中 → Offer → 已结束' },
      { icon: '📅', label: '日历视图', desc: '面试/笔试日程一目了然' },
      { icon: '🤖', label: 'AI 小助手', desc: '邮件解析 / JD 解析 / 面试题 / 复盘' },
      { icon: '🔐', label: '用户系统', desc: '独立登录 · 数据隔离 · 安全可靠' },
    ],
    tags: ['Vibe Coding', '全栈独立开发', 'AI Agent', '大模型部署'],
    link: 'https://system-pi-three.vercel.app',  // 求职进度管理系统在线访问链接
  },

  /* ========== 塔罗牌 — 能力 & 兴趣 ========== */
  tarotCards: [
    {
      id: 'travel',
      emoji: '🌍',
      title: '旅行者',
      subtitle: '足迹遍布中国',
      description: '从冰雪哈尔滨到热带海南，从大漠新疆到繁华港澳，用脚步丈量祖国的每一寸土地。',
      funFact: '已解锁 16+ 省份/地区',
      hasMap: true,
    },
    {
      id: 'photo',
      emoji: '📸',
      title: '摄影师',
      subtitle: '用镜头记录世界',
      description: '喜欢用镜头捕捉旅途中的美好瞬间，记录生活中每一个值得珍藏的画面。',
      funFact: '相册存储 999+ 张',
    },
    {
      id: 'sport',
      emoji: '🏸',
      title: '运动达人',
      subtitle: '羽毛球爱好者',
      description: '热爱羽毛球运动，享受挥拍的畅快感，在球场上释放压力、挑战自我。',
      funFact: '最爱双打配合',
    },
    {
      id: 'game',
      emoji: '🎮',
      title: '二次元玩家',
      subtitle: '游戏世界的探索者',
      description: '沉浸在二次元游戏的奇幻世界中，享受剧情与角色带来的沉浸式体验。',
      funFact: '氪金但快乐着',
    },
    {
      id: 'drama',
      emoji: '📺',
      title: '追剧达人',
      subtitle: '优质剧集鉴赏家',
      description: '热衷于发掘优质剧集，从国产剧到海外剧，总能找到打动人心的好故事。',
      funFact: '年度观剧 50+ 部',
    },
    {
      id: 'food',
      emoji: '🍽️',
      title: '美食社交家',
      subtitle: '和朋友们一起聚餐',
      description: '最幸福的事莫过于和好朋友们围坐一桌，分享美食、分享故事、分享快乐。',
      funFact: '聚餐发起人 No.1',
    },
    {
      id: 'esfj',
      emoji: '💖',
      title: 'ESFJ 执政官',
      subtitle: '天生的氛围担当',
      description: '外向、热情、有责任感，擅长照顾身边每一个人的感受，是朋友圈里公认的"暖心组织者"。',
      funFact: '朋友们的首席情绪价值官',
    },
    {
      id: 'pet',
      emoji: '🐾',
      title: '毛孩子狂热粉',
      subtitle: '萨摩耶 & 金渐层',
      description: '看到萨摩耶的微笑就会融化，撸到金渐层的圆脸就走不动路。终极梦想：一猫一狗一个家。',
      funFact: '云吸猫/狗日均 30min+',
    },
    {
      id: 'park',
      emoji: '🌿',
      title: '公园疗愈师',
      subtitle: '公园 20 分钟效应信徒',
      description: '坚信"在公园待 20 分钟就能回血"。躺草坪、散步、野餐……公园就是最好的充电站。',
      funFact: '周末公园打卡率 95%',
    },
    {
      id: 'drink',
      emoji: '🍷',
      title: '微醺冒险家',
      subtitle: '又菜又爱喝的酒懵子',
      description: '酒量不大但热情满分，三杯就上头却永远第一个举杯。人生信条：微醺是最好的状态。',
      funFact: '战绩：一杯倒但从不认输',
    },
  ],

  /* ========== 中国地图 — 去过的省份/地区 ========== */
  visitedProvinces: [
    '江苏', '上海', '浙江', '广东', '香港', '澳门',
    '福建', '台湾', '海南', '黑龙江', '新疆', '青海',
    '甘肃', '陕西', '山西',
  ],

  /* ========== 页脚 ========== */
  footer: {
    text: 'Made with ♥ by Sibyl',
    links: [
      { icon: 'github', url: 'https://github.com/sibyl7036-boop', label: 'GitHub' },
      { icon: 'email', url: 'mailto:3298415208@qq.com', label: 'Email' },
    ],
  },
};
