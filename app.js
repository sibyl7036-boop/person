/**
 * Sibyl 个人动态网页简历 — 主应用逻辑
 * 数据驱动渲染 + 交互动画
 */

;(function () {
  'use strict';

  const D = SITE_DATA;

  /* ============================================================
     工具函数
     ============================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') node.className = v;
      else if (k === 'innerHTML') node.innerHTML = v;
      else if (k === 'textContent') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
      else node.setAttribute(k, v);
    });
    children.forEach(c => {
      if (typeof c === 'string') node.appendChild(document.createTextNode(c));
      else if (c) node.appendChild(c);
    });
    return node;
  };

  /* ============================================================
     1. Hero 区域 — 打字机循环切换称谓
     ============================================================ */
  function initHero() {
    const titleEl = $('#heroTitle');
    const roleEl = $('#heroRole');

    titleEl.textContent = D.profile.heroHeading;

    // 打字机参数
    const roles = D.heroRoles;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 100;   // 打字速度 ms
    const DELETING_SPEED = 60;  // 删除速度 ms
    const PAUSE_AFTER_TYPE = 2000;  // 打完后停留 ms
    const PAUSE_AFTER_DELETE = 400; // 删完后停留 ms

    function typeWriter() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // 正在打字
        charIndex++;
        roleEl.textContent = currentRole.substring(0, charIndex);

        if (charIndex === currentRole.length) {
          // 打完了，停留一会儿再删除
          isDeleting = true;
          setTimeout(typeWriter, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(typeWriter, TYPING_SPEED);
      } else {
        // 正在删除
        charIndex--;
        roleEl.textContent = currentRole.substring(0, charIndex);

        if (charIndex === 0) {
          // 删完了，切换到下一个称谓
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeWriter, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(typeWriter, DELETING_SPEED);
      }
    }

    // 延迟启动打字机（等 hero 淡入动画完成）
    setTimeout(typeWriter, 1200);

    // ── 联系方式图标 ──
    initHeroContacts();
  }

  /* ============================================================
     1.5 Hero 联系方式图标
     ============================================================ */
  function initHeroContacts() {
    const container = $('#heroContacts');
    if (!D.contacts || !container) return;

    // SVG 图标映射
    const contactIcons = {
      github: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      wechat: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 01.177-.554C23.016 18.514 24 16.89 24 15.073c0-3.39-3.166-6.163-7.062-6.215zm-2.98 3.109c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/></svg>',
      email: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
      phone: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    };

    D.contacts.forEach(contact => {
      const iconSvg = contactIcons[contact.type] || '';

      const btn = el('button', {
        className: 'hero-contact-btn',
        'aria-label': contact.label,
        'data-tooltip': contact.value,
      }, []);
      btn.innerHTML = iconSvg;

      btn.addEventListener('click', () => {
        if (contact.action === 'link' && contact.url) {
          window.open(contact.url, '_blank', 'noopener,noreferrer');
        } else {
          // 复制到剪贴板
          navigator.clipboard.writeText(contact.value).then(() => {
            showCopyToast(contact.label + '已复制: ' + contact.value);
          }).catch(() => {
            // 降级方案
            const textarea = document.createElement('textarea');
            textarea.value = contact.value;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showCopyToast(contact.label + '已复制: ' + contact.value);
          });
        }
      });

      // Tooltip 容器
      const wrapper = el('div', { className: 'hero-contact-item' }, [btn]);
      container.appendChild(wrapper);
    });
  }

  /* 复制成功提示 */
  function showCopyToast(message) {
    const existing = document.querySelector('.copy-toast');
    if (existing) existing.remove();

    const toast = el('div', { className: 'copy-toast', textContent: message });
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  /* ============================================================
     2. Experiences — 教育图文卡片 + 实习时间轴
     ============================================================ */
  function initTimeline() {
    const container = $('#timeline');

    // ── Education Experience 分隔线 ──
    const eduSeparator = el('div', { className: 'timeline-separator animate-on-scroll' }, [
      el('span', { textContent: '✦  Education Experience  ✦' }),
    ]);
    container.appendChild(eduSeparator);

    // ── 教育经历：图文交错卡片 ──
    D.education.forEach((item, i) => {
      const isReversed = i % 2 === 1; // 奇数项图文反转（文字左+图片右）
      const isSingleImage = (item.images || []).length === 1;

      // 图片区域
      const imageEls = (item.images || []).map((src, imgIdx) =>
        el('div', { className: `edu-photo edu-photo-${imgIdx + 1}${isSingleImage ? ' edu-photo-single' : ''}` }, [
          el('img', { src, alt: `${item.institution} 照片 ${imgIdx + 1}`, loading: 'lazy' }),
        ])
      );
      const imageGroup = el('div', {
        className: `edu-images${isSingleImage ? ' edu-images-single' : ''}`,
      }, imageEls);

      // 文字区域
      const textChildren = [
        el('span', { className: 'edu-period', textContent: item.period }),
        el('h3', { className: 'edu-institution', textContent: item.institution }),
        el('p', { className: 'edu-role', textContent: item.role }),
      ];
      if (item.subtitle) {
        textChildren.push(el('p', { className: 'edu-subtitle-tag', textContent: item.subtitle }));
      }
      if (item.highlights && item.highlights.length > 0) {
        textChildren.push(
          el('ul', { className: 'edu-highlights' },
            item.highlights.map(h => el('li', { textContent: h }))
          )
        );
      }
      const textContent = el('div', { className: 'edu-text' }, textChildren);

      // ── 左右图文交错布局 ──
      const dot = el('div', { className: 'edu-dot' });
      const card = el('div', {
        className: `edu-card animate-on-scroll${isReversed ? ' edu-card-reversed' : ''}`,
      }, isReversed ? [textContent, dot, imageGroup] : [imageGroup, dot, textContent]);
      container.appendChild(card);
    });

    // ── 分隔线 ──
    const separator = el('div', { className: 'timeline-separator animate-on-scroll' }, [
      el('span', { textContent: '✦  Work Experience  ✦' }),
    ]);
    container.appendChild(separator);

    // ── 实习经历：featured 带图 + compact 并排 ──
    let i = 0;
    while (i < D.experiences.length) {
      const item = D.experiences[i];

      if (item.layout === 'featured') {
        // ── 带图片的大卡片（交替布局） ──
        // 腾讯(i=0): 图片左+文字右 → isReversed=false
        // 百度(i=1): 图片右+文字左 → isReversed=true
        const isReversed = i % 2 === 1;

        // 图片区域
        const imageEls = (item.images || []).map((src, imgIdx) =>
          el('div', { className: `work-photo work-photo-${imgIdx + 1}` }, [
            el('img', { src, alt: `${item.company} 项目截图 ${imgIdx + 1}`, loading: 'lazy' }),
          ])
        );
        const imageGroup = el('div', { className: 'work-images' }, imageEls);

        // 文字区域
        const textContent = el('div', { className: 'work-text' }, [
          el('span', { className: 'work-period', textContent: item.period }),
          el('h3', { className: 'work-company' }, [
            document.createTextNode(item.company),
            ...(item.department ? [el('span', { className: 'work-dept', textContent: ` · ${item.department}` })] : []),
          ]),
          el('p', { className: 'work-role', textContent: item.role }),
          el('ul', { className: 'work-highlights' },
            item.highlights.map(h => el('li', { textContent: h }))
          ),
        ]);

        const card = el('div', {
          className: `work-featured-card animate-on-scroll${isReversed ? ' work-featured-reversed' : ''}`,
        }, isReversed ? [textContent, imageGroup] : [imageGroup, textContent]);

        container.appendChild(card);
        i++;

      } else if (item.layout === 'compact' && item.pairWith === 'next' && i + 1 < D.experiences.length) {
        // ── 并排紧凑卡片 ──
        const nextItem = D.experiences[i + 1];

        const makeCompactCard = (exp) => {
          return el('div', { className: 'work-compact-card' }, [
            el('div', { className: 'work-compact-icon', textContent: exp.icon }),
            el('span', { className: 'work-period', textContent: exp.period }),
            el('h3', { className: 'work-company', textContent: exp.company }),
            el('p', { className: 'work-role', textContent: exp.role }),
            el('ul', { className: 'work-highlights' },
              exp.highlights.map(h => {
                const li = el('li', { textContent: h });
                // 以括号开头的技术栈项不显示左侧角标
                if (h.startsWith('（') || h.startsWith('(')) {
                  li.classList.add('no-marker');
                }
                return li;
              })
            ),
          ]);
        };

        const pairRow = el('div', { className: 'work-compact-pair animate-on-scroll' }, [
          makeCompactCard(item),
          makeCompactCard(nextItem),
        ]);

        container.appendChild(pairRow);
        i += 2;

      } else {
        // ── 普通时间轴卡片（兜底） ──
        const card = el('div', { className: 'timeline-item animate-on-scroll' }, [
          el('div', { className: 'timeline-dot' }),
          el('div', { className: 'timeline-content' }, [
            el('div', { className: 'timeline-period', textContent: item.period }),
            el('h3', { className: 'timeline-institution', textContent: item.company }),
            el('p', { className: 'timeline-role', textContent: `${item.department ? item.department + ' · ' : ''}${item.role}` }),
            el('ul', { className: 'timeline-highlights' },
              item.highlights.map(h => el('li', { textContent: h }))
            ),
          ]),
        ]);
        container.appendChild(card);
        i++;
      }
    }
  }

  /* ============================================================
     3. Vibe Coding — 单项目 Showcase 展示
     ============================================================ */
  function initProjects() {
    const wrapper = $('#showcaseWrapper');
    const s = D.showcase;

    // ── 顶部：徽章 + 标题 + 副标题 ──
    const header = el('div', { className: 'showcase-header animate-on-scroll' }, [
      el('span', { className: 'showcase-badge', textContent: s.badge }),
      el('h3', { className: 'showcase-title', textContent: s.title }),
      el('p', { className: 'showcase-subtitle-text', innerHTML: `"${s.subtitle}"` }),
    ]);
    wrapper.appendChild(header);

    // ── 主体：截图 + 描述 ──
    const mainCard = el('div', { className: 'showcase-main animate-on-scroll' }, [
      // 截图区域（模拟浏览器窗口）— 点击图片可跳转
      el('div', {
        className: 'showcase-browser',
        style: s.link ? 'cursor: pointer;' : '',
        onclick: s.link ? () => window.open(s.link, '_blank', 'noopener,noreferrer') : null,
      }, [
        el('div', { className: 'showcase-browser-bar' }, [
          el('div', { className: 'showcase-browser-dots' }, [
            el('span', { className: 'dot dot-red' }),
            el('span', { className: 'dot dot-yellow' }),
            el('span', { className: 'dot dot-green' }),
          ]),
          el('div', { className: 'showcase-browser-url' }, [
            el('span', { textContent: s.link ? `🔒 ${s.link.replace('https://', '')}` : '🔒 offer-journey.sibyl.dev' }),
          ]),
        ]),
        el('div', { className: 'showcase-screenshot' }, [
          el('img', { src: s.screenshot, alt: s.title, loading: 'lazy' }),
        ]),
      ]),
      // 描述区域
      el('div', { className: 'showcase-info' }, [
        el('p', { className: 'showcase-desc', textContent: s.description }),
        el('div', { className: 'showcase-ai-block' }, [
          el('div', { className: 'showcase-ai-icon', textContent: '✨' }),
          el('p', { className: 'showcase-ai-text', textContent: s.aiHighlight }),
        ]),
        // 技术标签
        el('div', { className: 'showcase-tags' },
          s.tags.map(t => el('span', { className: 'showcase-tag', textContent: t }))
        ),
        // 访问按钮（如果有链接）
        ...(s.link ? [el('a', {
          className: 'showcase-link-btn',
          href: s.link,
          target: '_blank',
          rel: 'noopener noreferrer',
          innerHTML: '🚀 访问系统 <span>→</span>',
        })] : []),
      ]),
    ]);
    wrapper.appendChild(mainCard);

    // ── 功能亮点卡片 ──
    const featuresGrid = el('div', { className: 'showcase-features animate-on-scroll' },
      s.features.map(f =>
        el('div', { className: 'showcase-feature-card' }, [
          el('div', { className: 'showcase-feature-icon', textContent: f.icon }),
          el('div', { className: 'showcase-feature-label', textContent: f.label }),
          el('div', { className: 'showcase-feature-desc', textContent: f.desc }),
        ])
      )
    );
    wrapper.appendChild(featuresGrid);
  }

  /* ============================================================
     4. Capability — 塔罗牌（点击翻转放大弹窗 + 收起缩小回去）
     ============================================================ */
  let flippedCards = new Set();
  let isAnimating = false;
  let currentOpenIndex = -1; // 当前打开弹窗的卡牌索引

  function initTarot() {
    const fan = $('#tarotFan');
    const total = D.tarotCards.length;

    const countTotal = $('#countTotal');
    if (countTotal) countTotal.textContent = total;

    D.tarotCards.forEach((card, i) => {
      const cardEl = el('div', {
        className: 'tarot-card',
        'data-index': String(i),
        style: `opacity: 0;`,
      }, [
        // 背面
        el('div', { className: 'tarot-card-face tarot-card-back' }, [
          el('div', { className: 'tarot-pattern', textContent: '✦' }),
          el('div', { className: 'tarot-label', textContent: 'SIBYL' }),
        ]),
        // 正面
        el('div', { className: 'tarot-card-face tarot-card-front' }, [
          el('div', { className: 'tarot-emoji', textContent: card.emoji }),
          el('div', { className: 'tarot-title', textContent: card.title }),
          el('div', { className: 'tarot-subtitle', textContent: card.subtitle }),
          el('div', { className: 'tarot-desc', textContent: card.description }),
          el('div', { className: 'tarot-fun-fact', textContent: card.funFact }),
        ]),
      ]);

      cardEl.addEventListener('click', () => openTarotCard(i));
      fan.appendChild(cardEl);

      // 依次发牌入场动画
      setTimeout(() => {
        cardEl.style.opacity = '';
        cardEl.classList.add('deal-in');
        cardEl.addEventListener('animationend', () => {
          cardEl.classList.remove('deal-in');
          cardEl.classList.add('deal-done');
        }, { once: true });
      }, 120 * i);
    });
  }

  function updateTarotCounter() {
    const countCurrent = $('#countCurrent');
    if (countCurrent) countCurrent.textContent = flippedCards.size;
  }

  /**
   * 新交互：
   * 1. 点击卡牌 → 卡牌原地3D翻转到正面（0.5s）
   * 交互：
   * 1. 点击卡牌 → 卡牌正反面 opacity 切换（0.45s）
   * 2. 切换完成后 → 弹窗展开
   * 3. 已翻开的卡牌直接打开弹窗
   */
  function openTarotCard(index) {
    if (isAnimating) return;

    const cardEl = $(`.tarot-card[data-index="${index}"]`);
    const card = D.tarotCards[index];

    // 如果已翻开，直接打开弹窗
    if (flippedCards.has(index)) {
      currentOpenIndex = index;
      fillAndShowModal(card);
      return;
    }

    isAnimating = true;
    currentOpenIndex = index;

    // 添加 flipped 类触发 opacity 切换动画
    cardEl.classList.add('flipped');

    // 记录已翻开
    flippedCards.add(index);
    updateTarotCounter();

    // 等待 opacity 切换动画完成后打开弹窗
    setTimeout(() => {
      fillAndShowModal(card);
      isAnimating = false;
      checkEasterEgg();
    }, 480);
  }

  /** 填充弹窗内容并以翻转放大方式显示 */
  function fillAndShowModal(card) {
    const overlay = $('#tarotOverlay');

    $('#modalEmoji').textContent = card.emoji;
    $('#modalTitle').textContent = card.title;
    $('#modalSubtitle').textContent = card.subtitle;
    $('#modalDesc').textContent = card.description;
    $('#modalFunFact').textContent = card.funFact;

    // 地图
    const mapContainer = $('#modalMapContainer');
    mapContainer.innerHTML = '';
    if (card.hasMap && typeof renderChinaMap === 'function') {
      renderChinaMap(mapContainer, D.visitedProvinces);
    }

    // 移除可能残留的 closing 类
    overlay.classList.remove('closing');
    // 展开弹窗
    overlay.classList.add('active');
  }

  /** 关闭弹窗 — 缩小翻转回去 */
  function closeTarotCard() {
    const overlay = $('#tarotOverlay');

    // 添加收起动画类
    overlay.classList.add('closing');

    // 等收起动画完成后移除所有状态
    setTimeout(() => {
      overlay.classList.remove('active');
      overlay.classList.remove('closing');
      currentOpenIndex = -1;
    }, 500);
  }

  function checkEasterEgg() {
    if (flippedCards.size >= D.tarotCards.length) {
      const completeMsg = $('#tarotCompleteMsg');
      if (completeMsg) completeMsg.classList.add('show');

      setTimeout(() => {
        showConfetti();
        const toast = $('#easterEgg');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }, 600);
    }
  }

  /* ============================================================
     5. 撒花彩蛋
     ============================================================ */
  function showConfetti() {
    const container = el('div', { className: 'confetti-container' });
    document.body.appendChild(container);

    const colors = ['#8B3A3A', '#F5E6C8', '#5C3D2E', '#4A5D4A', '#B85C5C', '#D4A574', '#E8C8A0'];
    for (let i = 0; i < 80; i++) {
      const confetti = el('div', {
        className: 'confetti',
        style: `
          left: ${Math.random() * 100}%;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          animation-delay: ${Math.random() * 1.5}s;
          animation-duration: ${2 + Math.random() * 2}s;
          width: ${4 + Math.random() * 8}px;
          height: ${4 + Math.random() * 8}px;
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        `,
      });
      container.appendChild(confetti);
    }

    setTimeout(() => container.remove(), 5000);
  }

  /* ============================================================
     6. 页脚
     ============================================================ */
  function initFooter() {
    const linksContainer = $('#footerLinks');
    const textEl = $('#footerText');

    // 社交图标（使用 SVG 内联）
    const iconMap = {
      github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      email: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    };

    D.footer.links.forEach(link => {
      const a = el('a', {
        href: link.url,
        title: link.label,
        'aria-label': link.label,
        innerHTML: iconMap[link.icon] || link.label,
      });
      if (link.url.startsWith('http') || link.url === '#') {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
      linksContainer.appendChild(a);
    });

    textEl.textContent = D.footer.text;
  }

  /* ============================================================
     7. 滚动交互 — Intersection Observer + 导航高亮
     ============================================================ */
  function initScrollObserver() {
    // 入场动画
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    $$('.animate-on-scroll').forEach(el => observer.observe(el));

    // 导航高亮
    const sections = ['experiences', 'projects', 'capability'];
    const navLinks = $$('.nav-links a');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('active', link.dataset.section === id);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    // 导航栏滚动样式
    window.addEventListener('scroll', () => {
      const navbar = $('#navbar');
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ============================================================
     8. 事件绑定
     ============================================================ */
  function bindEvents() {
    // 塔罗牌关闭
    $('#modalClose').addEventListener('click', closeTarotCard);
    $('#tarotOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeTarotCard();
    });

    // ── 汉堡菜单 ──
    const hamburger = $('#hamburger');
    const navLinks = $('#navLinks');

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'navOverlay';
    document.body.appendChild(overlay);

    function toggleMenu(open) {
      const isOpen = typeof open === 'boolean' ? open : !navLinks.classList.contains('open');
      hamburger.classList.toggle('active', isOpen);
      navLinks.classList.toggle('open', isOpen);
      overlay.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu(false));

    // 导航平滑滚动（同时关闭菜单）
    $$('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(false);
        const target = document.getElementById(link.dataset.section);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ============================================================
     初始化
     ============================================================ */
  function init() {
    initHero();
    initTimeline();
    initProjects();
    initTarot();
    initFooter();
    initScrollObserver();
    bindEvents();
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
