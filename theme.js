/**
 * 思源笔记翻页按钮脚本
 * 在编辑区右下角添加上下翻页按钮，仅对当前激活的标签页生效
 * 针对墨水屏优化，禁用所有动画效果
 */
(()=>{
    // 创建并添加按钮到DOM
    const addButtons = () => {
        // 创建按钮容器
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'page-scroll-buttons';
        buttonsContainer.innerHTML = `
            <div class="page-scroll-button" id="page-scroll-up" title="向上翻页">
                <svg><use xlink:href="#iconUp"></use></svg>
            </div>
            <div class="page-scroll-button" id="page-scroll-down" title="向下翻页">
                <svg><use xlink:href="#iconDown"></use></svg>
            </div>
        `;
        document.body.appendChild(buttonsContainer);
    };

    // 获取当前激活的标签页的编辑区
    const getActiveProtyle = () => {
        // 查找活动的标签页
        const activeTab = document.querySelector('.layout__wnd--active .item--focus');
        if (activeTab) {
            // 获取标签页对应的ID
            const tabId = activeTab.getAttribute('data-id');
            if (tabId) {
                // 查找对应的编辑区
                const activeProtyle = document.querySelector(`.fn__flex-1.protyle[data-id="${tabId}"]`);
                if (activeProtyle) {
                    return activeProtyle;
                }
            }
        }
        
        // 备选方案：如果通过标签页找不到，尝试找到处于活动状态的编辑区
        const activeProtyle = document.querySelector('.fn__flex-1.protyle.protyle--active');
        if (activeProtyle) {
            return activeProtyle;
        }
        
        // 最后的备选：获取任何可见的编辑区
        return document.querySelector('.layout__wnd--active .fn__flex-1.protyle');
    };

    // 页面滚动逻辑
    const setupScrollEvents = () => {
        // 向上翻页
        document.getElementById('page-scroll-up').addEventListener('click', () => {
            const activeProtyle = getActiveProtyle();
            if (activeProtyle) {
                const protyleContent = activeProtyle.querySelector('.protyle-content');
                if (protyleContent) {
                    const currentScroll = protyleContent.scrollTop;
                    const viewportHeight = protyleContent.clientHeight;
                    protyleContent.scrollTop = currentScroll - viewportHeight;
                }
            }
        });

        // 向下翻页
        document.getElementById('page-scroll-down').addEventListener('click', () => {
            const activeProtyle = getActiveProtyle();
            if (activeProtyle) {
                const protyleContent = activeProtyle.querySelector('.protyle-content');
                if (protyleContent) {
                    const currentScroll = protyleContent.scrollTop;
                    const viewportHeight = protyleContent.clientHeight;
                    protyleContent.scrollTop = currentScroll + viewportHeight;
                }
            }
        });
    };

    // 检查DOM是否加载完成
    const checkDOMLoaded = (callback) => {
        if (document.querySelector('.fn__flex-1.protyle')) {
            callback();
            return;
        }
        // 使用MutationObserver监听DOM变化
        const observer = new MutationObserver((mutations, obs) => {
            if (document.querySelector('.fn__flex-1.protyle')) {
                callback();
                obs.disconnect(); // 停止观察
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    // 初始化函数
    const init = () => {
        addButtons();
        setupScrollEvents();
    };

    // 等待DOM加载完成后初始化
    checkDOMLoaded(init);
})();
