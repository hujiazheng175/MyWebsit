document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // 声明全局变量
    let sections, navLinks;

    function initializeGlobalVariables() {
        sections = document.querySelectorAll('.section');
        navLinks = document.querySelectorAll('nav .nav-link');
    }

    initializeGlobalVariables();

    // 修改滚动效果
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // 头部滚动效果
        const header = document.getElementById('main-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 烟花和彩蛋功能
    const fireworksContainer = document.getElementById('fireworks-container');
    const welcomeMessage = document.getElementById('welcome-message');
    const fireworksBtn = document.getElementById('fireworks-btn');
    const easterEgg = document.getElementById('easter-egg');

    console.log('Fireworks button:', fireworksBtn);
    console.log('Fireworks container:', fireworksContainer);

    function startFireworks() {
        if (fireworksContainer) {
            fireworksContainer.style.display = 'block';

            try {
                const fireworks = new Fireworks(fireworksContainer, {
                    // 保持现有的配置
                    autoresize: true,
                    opacity: 0.5,
                    acceleration: 1.05,
                    friction: 0.97,
                    gravity: 1.5,
                    particles: 50,
                    traceLength: 3,
                    traceSpeed: 10,
                    explosion: 5,
                    intensity: 30,
                    flickering: 50,
                    lineStyle: 'round',
                    hue: {
                        min: 0,
                        max: 360
                    },
                    delay: {
                        min: 30,
                        max: 60
                    },
                    rocketsPoint: {
                        min: 50,
                        max: 50
                    },
                    lineWidth: {
                        explosion: {
                            min: 1,
                            max: 3
                        },
                        trace: {
                            min: 1,
                            max: 2
                        }
                    },
                    brightness: {
                        min: 50,
                        max: 80
                    },
                    decay: {
                        min: 0.015,
                        max: 0.03
                    },
                    mouse: {
                        click: false,
                        move: false,
                        max: 1
                    }
                });

                console.log('Fireworks instance created');
                fireworks.start();

                // 5秒后停止烟火
                setTimeout(() => {
                    console.log('Stopping fireworks');
                    fireworks.stop();
                    fireworksContainer.style.display = 'none';
                }, 5000);
            } catch (error) {
                console.error('Error creating fireworks:', error);
            }
        } else {
            console.error('Fireworks container not found');
        }
    }

    // 烟花按钮功能
    if (fireworksBtn) {
        fireworksBtn.addEventListener('click', function() {
            console.log('Fireworks button clicked');
            startFireworks();
        });
    } else {
        console.error('Fireworks button not found');
    }

    // 彩蛋功能
    document.body.addEventListener('click', function() {
        if (easterEgg && (!easterEgg.style.display || easterEgg.style.display === 'none')) {
            easterEgg.style.display = 'block';
            setTimeout(() => {
                easterEgg.style.display = 'none';
            }, 3000);  // 3秒后隐藏彩蛋
        }
    });

    // 处理联系表单提交
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    formStatus.textContent = '感谢您的留言！我们会尽快回复您。';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                } else {
                    formStatus.textContent = '发送失败，请稍后再试。';
                    formStatus.style.color = 'red';
                }
                formStatus.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = '发送失败，请稍后再试。';
                formStatus.style.color = 'red';
                formStatus.style.display = 'block';
            });
        });
    }

    // 滚动动画
    let lastScrollTop = 0;

    const animateOnScroll = () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
            
            if (isVisible) {
                if (!section.classList.contains('animate__animated')) {
                    if (st > lastScrollTop) {
                        // 向下滚动
                        section.classList.add('animate__animated', 'animate__fadeInUp');
                    } else {
                        // 向上滚动
                        section.classList.add('animate__animated', 'animate__fadeInDown');
                    }
                }
            } else {
                section.classList.remove('animate__animated', 'animate__fadeInUp', 'animate__fadeInDown');
            }
        });
        lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // 为作品集添加特殊动画
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // AI助手功能
    const openChatSection = document.getElementById('open-chat-section');
    const aiChatOverlay = document.getElementById('ai-chat-overlay');
    const closeAiChat = document.getElementById('close-ai-chat');
    const aiUserInput = document.getElementById('ai-user-input');
    const aiSendMessage = document.getElementById('ai-send-message');
    const aiChatMessages = document.getElementById('ai-chat-messages');

    if (openChatSection) {
        openChatSection.addEventListener('click', function() {
            aiChatOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    }

    if (closeAiChat) {
        closeAiChat.addEventListener('click', function() {
            aiChatOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        });
    }

    if (aiSendMessage) {
        aiSendMessage.addEventListener('click', sendAiMessage);
    }

    if (aiUserInput) {
        aiUserInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAiMessage();
            }
        });
    }

    function sendAiMessage() {
        const message = aiUserInput.value.trim();
        if (message) {
            addAiMessage('user', message);
            aiUserInput.value = '';
            // 这里可以添加发送消息到AI服务的逻辑
            setTimeout(() => {
                addAiMessage('ai', '这是AI助手的回复示例。');
            }, 1000);
        }
    }

    function addAiMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender + '-message');
        messageElement.textContent = text;
        aiChatMessages.appendChild(messageElement);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    // 平滑滚动到AI助手板块
    const aiAssistantLink = document.querySelector('a[href="#ai-assistant"]');
    if (aiAssistantLink) {
        aiAssistantLink.addEventListener('click', function(e) {
            e.preventDefault();
            const aiAssistantSection = document.querySelector('#ai-assistant');
            if (aiAssistantSection) {
                aiAssistantSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // 添加事件监听器，使其他板块变灰色并不可点击
    if (openChatSection) {
        openChatSection.addEventListener('click', function() {
            sections.forEach(section => {
                if (section.id !== 'ai-assistant') {
                    section.style.backgroundColor = '#f8f9fa';
                    section.style.pointerEvents = 'none';
                }
            });
            navLinks.forEach(link => {
                link.style.pointerEvents = 'none';
            });
        });
    }

    if (closeAiChat) {
        closeAiChat.addEventListener('click', function() {
            sections.forEach(section => {
                section.style.backgroundColor = '';
                section.style.pointerEvents = '';
            });
            navLinks.forEach(link => {
                link.style.pointerEvents = '';
            });
        });
    }
});