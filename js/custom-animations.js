/**
 * 自定义动画效果 JavaScript
 * Custom animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // 页面加载动画
  function initPageLoadAnimations() {
    document.body.classList.add('page-loaded');
    
    // 为文章卡片添加延迟动画
    const postItems = document.querySelectorAll('.recent-post-item');
    postItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('animate-fade-in-up');
    });
    
    // 为侧边栏卡片添加延迟动画
    const cardWidgets = document.querySelectorAll('.card-widget');
    cardWidgets.forEach((widget, index) => {
      widget.style.animationDelay = `${index * 0.15}s`;
      widget.classList.add('animate-fade-in-left');
    });
  }
  
  // 滚动触发动画
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // 观察所有需要滚动动画的元素
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));
  }
  
  // 导航栏滚动效果增强
  function enhanceNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('nav');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 添加滚动方向检测
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 向下滚动
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // 向上滚动
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // 按钮波纹效果
  function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .site-page, .social-icon');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  // 平滑滚动
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // 图片懒加载增强
  function enhanceImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('fade-in');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // 鼠标跟随效果（可选）
  function initMouseFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    // 悬停效果
    const hoverElements = document.querySelectorAll('a, button, .card-widget');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }
  
  // 主题切换动画
  function enhanceThemeToggle() {
    const themeToggle = document.querySelector('[data-theme]');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        document.body.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
          document.body.style.transition = '';
        }, 300);
      });
    }
  }
  
  // 返回顶部按钮增强
  function enhanceBackToTop() {
    const backToTop = document.getElementById('go-up');
    
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      });
      
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  // 初始化所有动画效果
  function initAllAnimations() {
    initPageLoadAnimations();
    initScrollAnimations();
    enhanceNavbarScroll();
    addRippleEffect();
    initSmoothScroll();
    enhanceImageLoading();
    enhanceThemeToggle();
    enhanceBackToTop();
    
    // 可选：鼠标跟随效果（在桌面端启用）
    if (window.innerWidth > 768) {
      // initMouseFollower();
    }
  }
  
  // 启动动画
  initAllAnimations();
  
  // 添加CSS样式
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .custom-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(73, 177, 245, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
    }
    
    .custom-cursor.hover {
      transform: scale(1.5);
      background: rgba(73, 177, 245, 0.8);
    }
    
    #go-up {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }
    
    #go-up.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    img.fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
});

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
