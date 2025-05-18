<template>
  <div class="mystonks-app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img src="https://mystonks.org/logo.png" alt="Mystonks Logo" class="logo">
          <span class="brand-name">Mystonks</span>
        </div>
        <div class="navbar-menu">
          <a href="#home" class="nav-item active">首页</a>
          <a href="#about" class="nav-item">关于我们</a>
          <a href="#community" class="nav-item">社区</a>
          <a href="#tokenomics" class="nav-item">经济模型</a>
          <a href="#roadmap" class="nav-item">路线图</a>
          <a href="#team" class="nav-item">团队</a>
        </div>
        <div class="navbar-actions">
          <button class="btn btn-outline">连接钱包</button>
          <button class="btn btn-primary">加入社区</button>
        </div>
      </div>
    </nav>

    <!-- 英雄区域 -->
    <section id="home" class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Web3 生活方式革命</h1>
          <p class="subtitle">加入 Mystonks 社区，通过运动赚取收益，开启健康财富双赢生活</p>
          <div class="cta-buttons">
            <button class="btn btn-primary btn-large">下载应用</button>
            <button class="btn btn-outline btn-large">观看视频</button>
          </div>
          <div class="stats">
            <div class="stat-item">
              <div class="stat-value">300万+</div>
              <div class="stat-label">活跃用户</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">$1亿+</div>
              <div class="stat-label">总收益</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">50+</div>
              <div class="stat-label">覆盖国家</div>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://mystonks.org/hero-image.png" alt="Mystonks 应用预览">
        </div>
      </div>
    </section>

    <!-- 合作伙伴 -->
    <section class="partners">
      <div class="container">
        <h2 class="section-title">合作伙伴与投资者</h2>
        <div class="partner-logos">
          <img src="https://mystonks.org/partners/solana.png" alt="Solana">
          <img src="https://mystonks.org/partners/binance.png" alt="Binance">
          <img src="https://mystonks.org/partners/sequoia.png" alt="Sequoia">
          <img src="https://mystonks.org/partners/alameda.png" alt="Alameda">
          <img src="https://mystonks.org/partners/coinbase.png" alt="Coinbase">
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">关于 Mystonks</h2>
        <div class="about-content">
          <div class="about-text">
            <p>Mystonks 是一个创新的 Web3 生活方式平台，将运动与加密经济相结合，激励人们通过日常运动赚取收益。</p>
            <p>我们的使命是通过区块链技术，让健康生活方式变得更有价值、更有趣。用户可以通过步行、跑步等运动获得代币奖励，同时改善健康状况。</p>
            <p>作为社区驱动的项目，Mystonks 致力于打造一个去中心化的健康经济生态系统，让每个参与者都能从中受益。</p>
          </div>
          <div class="about-image">
            <img src="https://mystonks.org/about-image.png" alt="关于我们">
          </div>
        </div>
      </div>
    </section>

    <!-- 功能介绍 -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">如何运作</h2>
        <div class="feature-cards">
          <div class="feature-card">
            <div class="card-icon">1</div>
            <h3>下载并设置</h3>
            <p>下载应用并连接钱包，开启您的 Mystonks 之旅。</p>
          </div>
          <div class="feature-card">
            <div class="card-icon">2</div>
            <h3>获取运动装备</h3>
            <p>购买或租赁 NFT 运动装备，开始运动赚取收益。</p>
          </div>
          <div class="feature-card">
            <div class="card-icon">3</div>
            <h3>运动即赚取</h3>
            <p>步行、慢跑或跑步，通过运动赚取代币并改善健康。</p>
          </div>
          <div class="feature-card">
            <div class="card-icon">4</div>
            <h3>升级成长</h3>
            <p>升级您的运动装备，最大化您的收益潜力。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 社区特色 -->
    <section id="community" class="community">
      <div class="container">
        <h2 class="section-title">社区特色</h2>
        <div class="community-features">
          <div class="community-feature">
            <div class="feature-icon">
              <img src="https://mystonks.org/icons/dao.png" alt="DAO">
            </div>
            <h3>社区治理</h3>
            <p>通过 DAO 参与项目决策，共同塑造 Mystonks 的未来。</p>
          </div>
          <div class="community-feature">
            <div class="feature-icon">
              <img src="https://mystonks.org/icons/events.png" alt="Events">
            </div>
            <h3>线下活动</h3>
            <p>定期举办线上线下活动，促进社区成员互动交流。</p>
          </div>
          <div class="community-feature">
            <div class="feature-icon">
              <img src="https://mystonks.org/icons/rewards.png" alt="Rewards">
            </div>
            <h3>丰富奖励</h3>
            <p>参与社区活动赢取限量版 NFT 和特殊奖励。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 经济模型 -->
    <section id="tokenomics" class="tokenomics">
      <div class="container">
        <h2 class="section-title">经济模型</h2>
        <div class="tokenomics-content">
          <div class="tokenomics-text">
            <h3>$STONK 代币</h3>
            <p>Mystonks 的原生代币 $STONK 是整个生态系统的核心，用于奖励、治理和交易。</p>
            <div class="token-distribution">
              <h4>代币分配</h4>
              <ul>
                <li>40% - 运动奖励池</li>
                <li>20% - 生态系统发展</li>
                <li>15% - 团队和顾问</li>
                <li>10% - 私募投资者</li>
                <li>10% - 流动性池</li>
                <li>5% - 社区奖励</li>
              </ul>
            </div>
          </div>
          <div class="tokenomics-chart">
            <img src="https://mystonks.org/tokenomics-chart.png" alt="经济模型图表">
          </div>
        </div>
      </div>
    </section>

    <!-- 路线图 -->
    <section id="roadmap" class="roadmap">
      <div class="container">
        <h2 class="section-title">发展路线图</h2>
        <div class="roadmap-timeline">
          <div class="roadmap-item">
            <div class="roadmap-date">2023 Q2</div>
            <div class="roadmap-content">
              <h3>项目启动</h3>
              <ul>
                <li>核心团队组建</li>
                <li>智能合约开发</li>
                <li>私募融资完成</li>
              </ul>
            </div>
          </div>
          <div class="roadmap-item">
            <div class="roadmap-date">2023 Q3</div>
            <div class="roadmap-content">
              <h3>测试网发布</h3>
              <ul>
                <li>Beta 版应用上线</li>
                <li>社区测试活动</li>
                <li>代币经济学优化</li>
              </ul>
            </div>
          </div>
          <div class="roadmap-item">
            <div class="roadmap-date">2023 Q4</div>
            <div class="roadmap-content">
              <h3>主网上线</h3>
              <ul>
                <li>正式版应用发布</li>
                <li>$STONK 代币发行</li>
                <li>首批 NFT 运动装备发售</li>
              </ul>
            </div>
          </div>
          <div class="roadmap-item">
            <div class="roadmap-date">2024 H1</div>
            <div class="roadmap-content">
              <h3>生态系统扩张</h3>
              <ul>
                <li>全球市场拓展</li>
                <li>合作伙伴计划</li>
                <li>社区治理启动</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队 -->
    <section id="team" class="team">
      <div class="container">
        <h2 class="section-title">核心团队</h2>
        <div class="team-members">
          <div class="team-member">
            <div class="member-avatar">
              <img src="https://mystonks.org/team/member1.jpg" alt="张明">
            </div>
            <div class="member-info">
              <h3>张明</h3>
              <p class="role">创始人 & CEO</p>
              <p>区块链行业资深专家，曾就职于多家知名区块链项目。</p>
            </div>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <img src="https://mystonks.org/team/member2.jpg" alt="李华">
            </div>
            <div class="member-info">
              <h3>李华</h3>
              <p class="role">技术总监</p>
              <p>全栈开发专家，擅长区块链智能合约开发。</p>
            </div>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <img src="https://mystonks.org/team/member3.jpg" alt="王芳">
            </div>
            <div class="member-info">
              <h3>王芳</h3>
              <p class="role">社区经理</p>
              <p>社区建设专家，拥有多年区块链社区运营经验。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 应用截图 -->
    <section class="screenshots">
      <div class="container">
        <h2 class="section-title">应用截图</h2>
        <div class="screenshot-gallery">
          <img src="https://mystonks.org/screenshots/1.png" alt="应用截图1">
          <img src="https://mystonks.org/screenshots/2.png" alt="应用截图2">
          <img src="https://mystonks.org/screenshots/3.png" alt="应用截图3">
          <img src="https://mystonks.org/screenshots/4.png" alt="应用截图4">
        </div>
      </div>
    </section>

    <!-- 底部CTA -->
    <section class="bottom-cta">
      <div class="container">
        <h2>准备开始您的健康财富之旅了吗？</h2>
        <p>加入数百万用户，在保持活跃的同时赚取收益</p>
        <button class="btn btn-primary btn-large">立即下载</button>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="https://mystonks.org/logo.png" alt="Mystonks Logo" class="logo">
            <span class="brand-name">Mystonks</span>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>产品</h4>
              <a href="#">应用</a>
              <a href="#">市场</a>
              <a href="#">代币</a>
            </div>
            <div class="link-group">
              <h4>资源</h4>
              <a href="#">白皮书</a>
              <a href="#">文档</a>
              <a href="#">博客</a>
            </div>
            <div class="link-group">
              <h4>公司</h4>
              <a href="#">关于我们</a>
              <a href="#">团队</a>
              <a href="#">加入我们</a>
            </div>
            <div class="link-group">
              <h4>社区</h4>
              <a href="#">Twitter</a>
              <a href="#">Discord</a>
              <a href="#">Telegram</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="copyright">© 2023 Mystonks. 保留所有权利。</div>
          <div class="legal-links">
            <a href="#">条款</a>
            <a href="#">隐私</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 可以在这里添加组件数据
    }
  },
  mounted() {
    // 添加滚动时导航栏样式变化
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        navbar.style.padding = '15px 0';
      } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        navbar.style.padding = '20px 0';
      }
    }
  }
}
</script>

<style>
/* 全局样式 */
:root {
  --primary-color: #00ffa3;
  --secondary-color: #1a1a1a;
  --text-color: #ffffff;
  --bg-color: #000000;
  --card-bg: #121212;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 255, 163, 0.2);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: inherit;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid transparent;
  font-size: 1rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--box-shadow);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline:hover {
  background-color: rgba(0, 255, 163, 0.1);
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.1rem;
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  transition: var(--transition);
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  height: 30px;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #00ffa3, #00e676);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-menu {
  display: flex;
  gap: 30px;
}

.nav-item {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.nav-item:hover {
  color: var(--primary-color);
}

.nav-item.active {
  color: var(--primary-color);
  font-weight: 600;
}

.navbar-actions {
  display: flex;
  gap: 15px;
}

/* 英雄区域 */
.hero {
  padding: 180px 0 100px;
  background: radial-gradient(circle at 70% 30%, rgba(0, 255, 163, 0.1) 0%, rgba(0, 0, 0, 0) 50%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
}

.hero-image img {
  width: 100%;
  max-width: 500px;
  height: auto;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

h1 {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  background: linear-gradient(to right, #ffffff, #00ffa3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  max-width: 500px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 60px;
}

.stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 合作伙伴 */
.partners {
  padding: 80px 0;
  text-align: center;
  background-color: var(--card-bg);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 50px;
  text-align: center;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, transparent, var(--primary-color), transparent);
}

.partner-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
}

.partner-logos img {
  height: 40px;
  opacity: 0.7;
  transition: var(--transition);
}

.partner-logos img:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* 关于我们 */
.about {
  padding: 80px 0;
}

.about-content {
  display: flex;
  gap: 50px;
  align-items: center;
}

.about-text {
  flex: 1;
}

.about-text p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* 功能卡片 */
.features {
  padding: 80px 0;
  background-color: var(--card-bg);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  padding: 30px;
  transition: var(--transition);
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--box-shadow);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 20px;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.7);
}

/* 社区特色 */
.community {
  padding: 80px 0;
}

.community-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.community-feature {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: var(--border-radius);
  text-align: center;
  transition: var(--transition);
}

.community-feature:hover {
  transform: translateY(-10px);
  box-shadow: var(--box-shadow);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 255, 163, 0.1);
  border-radius: 50%;
}

.feature-icon img {
  width: 50px;
  height: 50px;
}

.community-feature h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.community-feature p {
  color: rgba(255, 255, 255, 0.7);
}

/* 经济模型 */
.tokenomics {
  padding: 80px 0;
  background-color: var(--card-bg);
}

.tokenomics-content {
  display: flex;
  gap: 50px;
  align-items: center;
}

.tokenomics-text {
  flex: 1;
}

.tokenomics-text h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.tokenomics-text p {
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.token-distribution {
  margin-top: 30px;
}

.token-distribution h4 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.token-distribution ul {
  list-style: none;
}

.token-distribution li {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
}

.tokenomics-chart {
  flex: 1;
}

.tokenomics-chart img {
  width: 100%;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* 路线图 */
.roadmap {
  padding: 80px 0;
}

.roadmap-timeline {
  position: relative;
  margin-top: 50px;
}

.roadmap-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: rgba(0, 255, 163, 0.2);
}

.roadmap-item {
  display: flex;
  margin-bottom: 50px;
  position: relative;
}

.roadmap-item:nth-child(odd) {
  flex-direction: row-reverse;
  text-align: right;
}

.roadmap-item:nth-child(odd) .roadmap-content {
  margin-right: 50px;
}

.roadmap-item:nth-child(even) .roadmap-content {
  margin-left: 50px;
}

.roadmap-date {
  width: 25%;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.roadmap-content {
  width: 75%;
  padding: 30px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  position: relative;
}

.roadmap-content::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
}

.roadmap-item:nth-child(odd) .roadmap-content::before {
  right: -40px;
}

.roadmap-item:nth-child(even) .roadmap-content::before {
  left: -40px;
}

.roadmap-content h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.roadmap-content ul {
  list-style: none;
}

.roadmap-content li {
  padding: 10px 0;
  position: relative;
  padding-left: 25px;
}

.roadmap-content li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  width: 10px;
  height: 2px;
  background-color: var(--primary-color);
}

/* 团队 */
.team {
  padding: 80px 0;
  background-color: var(--card-bg);
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.team-member {
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: var(--box-shadow);
}

.member-avatar {
  height: 300px;
  overflow: hidden;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.team-member:hover .member-avatar img {
  transform: scale(1.1);
}

.member-info {
  padding: 30px;
}

.member-info h3 {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.role {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 15px;
}

.member-info p {
  color: rgba(255, 255, 255, 0.7);
}

/* 截图区域 */
.screenshots {
  padding: 80px 0;
}

.screenshot-gallery {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
  margin-top: 50px;
}

.screenshot-gallery::-webkit-scrollbar {
  height: 8px;
}

.screenshot-gallery::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.screenshot-gallery::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

.screenshot-gallery img {
  height: 400px;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: var(--transition);
  flex-shrink: 0;
}

.screenshot-gallery img:hover {
  transform: scale(1.05);
}

/* 底部CTA */
.bottom-cta {
  background-color: #111;
  padding: 80px 0;
  text-align: center;
}

.bottom-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.bottom-cta p {
  font-size: 1.25rem;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
}

.bottom-cta .btn-large {
  padding: 16px 32px;
  font-size: 1.2rem;
}

/* 页脚 */
.footer {
  background-color: #111;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.8);
}

.footer .container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-content {
  flex: 1;
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 250px;
}

.footer-links {
  flex: 1;
  display: flex;
  gap: 40px;
  justify-content: space-between;
}

.link-group {
  display: flex;
  flex-direction: column;
}

.link-group h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.link-group a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 10px;
  transition: var(--transition);
}

.link-group a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
  font-size: 0.9rem;
}

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-links a {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  transition: var(--transition);
}

.legal-links a:hover {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero .container {
    flex-direction: column;
    text-align: center;
  }

  .hero-content, .hero-image {
    width: 100%;
  }

  .hero-image img {
    max-width: 400px;
    margin: 0 auto;
  }

  .stats {
    justify-content: center;
    flex-wrap: wrap;
  }

  .about-content {
    flex-direction: column;
  }

  .tokenomics-content {
    flex-direction: column;
  }

  .roadmap-item {
    flex-direction: column;
    text-align: center !important;
  }

  .roadmap-date {
    width: 100%;
    margin-bottom: 15px;
  }

  .roadmap-content {
    width: 100%;
    margin: 0 !important;
  }

  .roadmap-content::before {
    display: none;
  }

  .footer-content {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .navbar-menu {
    display: none;
  }

  .navbar-actions {
    display: none;
  }

  .screenshot-gallery img {
    height: 300px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .btn-large {
    width: 100%;
  }

  .stats {
    gap: 20px;
  }

  .stat-item {
    padding: 0 10px;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .screenshot-gallery img {
    height: 250px;
  }
}
</style>
