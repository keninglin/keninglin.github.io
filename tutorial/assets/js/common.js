/* 網站教學課程共用 JavaScript 函式庫 */

// 程式碼複製功能
function copyCode(button) {
    // 找到包含程式碼的容器
    let codeContainer = button.parentElement;
    let codeElement = null;
    
    // 檢查是否在 .code-container 內
    if (codeContainer.classList.contains('code-container')) {
        codeElement = codeContainer.querySelector('code');
    } else {
        // 直接插入到 pre 元素中的情況
        codeElement = codeContainer.querySelector('code');
        if (!codeElement) {
            // 如果沒找到 code 元素，使用整個 pre 的文字內容
            codeElement = codeContainer;
        }
    }
    
    const textToCopy = codeElement.textContent || codeElement.innerText;
    
    // 使用 Clipboard API 複製程式碼
    navigator.clipboard.writeText(textToCopy).then(function() {
        // 複製成功後的視覺回饋
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i>已複製';
        button.classList.add('copied');
        
        // 2秒後恢復原始狀態
        setTimeout(function() {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(function(err) {
        // 如果 Clipboard API 不可用，使用舊的方法
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // 顯示複製成功訊息
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i>已複製';
        button.classList.add('copied');
        
        setTimeout(function() {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

// 回到頂部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 初始化共用功能
document.addEventListener('DOMContentLoaded', function() {
    // 監聽滾動事件，控制回到頂部按鈕顯示
    window.addEventListener('scroll', function() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // 自動為所有未包裹的程式碼區塊新增複製按鈕
    const preElements = document.querySelectorAll('pre:not(.code-container pre)');
    preElements.forEach(function(pre) {
        // 檢查是否已經被 code-container 包裹
        if (!pre.closest('.code-container')) {
            // 建立複製按鈕
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-button';
            copyBtn.onclick = function() { copyCode(this); };
            copyBtn.title = '複製程式碼';
            copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>複製';
            
            // 直接插入到 pre 元素內
            pre.appendChild(copyBtn);
        }
    });

    // 為手動包裹的 code-container 也確保有複製按鈕
    const codeContainers = document.querySelectorAll('.code-container');
    codeContainers.forEach(function(container) {
        const copyBtn = container.querySelector('.copy-button');
        if (copyBtn) {
            copyBtn.onclick = function() { copyCode(this); };
        }
    });

    // 索引選單相關功能
    const indexLinks = document.querySelectorAll('.index-menu a[href^="#"]');
    indexLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 確保目標元素可見
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 控制索引展開/收合圖示
    const indexContent = document.getElementById('indexContent');
    const toggleIcon = document.getElementById('toggleIcon');

    if (indexContent && toggleIcon) {
        indexContent.addEventListener('show.bs.collapse', function() {
            toggleIcon.className = 'fa-solid fa-chevron-up';
        });

        indexContent.addEventListener('hidden.bs.collapse', function() {
            toggleIcon.className = 'fa-solid fa-chevron-down';
        });
    }
});

// 為新增的程式碼區塊新增複製按鈕（動態內容使用）
function addCopyButtonToPre(preElement) {
    if (preElement.querySelector('.copy-button')) {
        return; // 已經有複製按鈕了
    }
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-button';
    copyBtn.onclick = function() { copyCode(this); };
    copyBtn.title = '複製程式碼';
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>複製';
    
    preElement.appendChild(copyBtn);
}

// 工具函式：顯示成功提示
function showSuccessMessage(message) {
    // 建立提示元素
    const toast = document.createElement('div');
    toast.className = 'toast-message success';
    toast.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        ${message}
    `;
    
    // 新增到頁面
    document.body.appendChild(toast);
    
    // 顯示動畫
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 3秒後移除
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 工具函式：顯示錯誤提示
function showErrorMessage(message) {
    // 建立提示元素
    const toast = document.createElement('div');
    toast.className = 'toast-message error';
    toast.innerHTML = `
        <i class="fa-solid fa-exclamation-circle"></i>
        ${message}
    `;
    
    // 新增到頁面
    document.body.appendChild(toast);
    
    // 顯示動畫
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 3秒後移除
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
