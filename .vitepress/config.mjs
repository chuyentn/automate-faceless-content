import { defineConfig } from 'vitepress'

const sharedSidebar = {
  '/course/': [
    {
      text: '🎓 Course Overview',
      link: '/course/',
      items: [
        { text: 'Module 0: Welcome', link: '/course/module-0/welcome' },
      ]
    },
    {
      text: '📘 Module 1: Foundations',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/course/module-1/' },
        { text: 'Lesson 1: What is Faceless Video?', link: '/course/module-1/lesson-1-what-is-faceless-video' },
        { text: 'Lesson 2: Why It Works', link: '/course/module-1/lesson-2-why-it-works' },
        { text: 'Lesson 3: Economics', link: '/course/module-1/lesson-3-economics' },
        { text: 'Lesson 4: Choosing Niche', link: '/course/module-1/lesson-4-choosing-niche' },
        { text: 'Lesson 5: Market Research', link: '/course/module-1/lesson-5-market-research' },
        { text: 'Lesson 6: Channel Setup', link: '/course/module-1/lesson-6-channel-setup' },
      ]
    },
    {
      text: '🛠️ Module 2: Mastering Syllaby',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-2/' },
        { text: 'Lesson 1: Dashboard', link: '/course/module-2/lesson-1-dashboard' },
        { text: 'Lesson 2: Faceless Generator', link: '/course/module-2/lesson-2-faceless-generator' },
        { text: 'Lesson 3: AI Scripts', link: '/course/module-2/lesson-3-ai-scripts' },
        { text: 'Lesson 4: Editing', link: '/course/module-2/lesson-4-editing' },
        { text: 'Lesson 5: Character Consistency', link: '/course/module-2/lesson-5-character-consistency' },
        { text: 'Lesson 6: Bulk Scheduler', link: '/course/module-2/lesson-6-bulk-scheduler' },
        { text: 'Lesson 7: Idea Discovery', link: '/course/module-2/lesson-7-idea-discovery' },
        { text: 'Lesson 8: Advanced Features', link: '/course/module-2/lesson-8-advanced-features' },
      ]
    },
    {
      text: '🎯 Module 3: Content Creation',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-3/' },
        { text: 'Lesson 1: 5-Minute System', link: '/course/module-3/lesson-1-5-minute-system' },
        { text: 'Lesson 2: Script Writing', link: '/course/module-3/lesson-2-script-writing' },
        { text: 'Lesson 3: Thumbnails', link: '/course/module-3/lesson-3-thumbnails' },
        { text: 'Lesson 4: Titles', link: '/course/module-3/lesson-4-titles' },
        { text: 'Lesson 5: Repurposing', link: '/course/module-3/lesson-5-repurposing' },
        { text: 'Lesson 6: Content Calendar', link: '/course/module-3/lesson-6-content-calendar' },
        { text: 'Lesson 7: Quality vs Quantity', link: '/course/module-3/lesson-7-quality-quantity' },
      ]
    },
    {
      text: '💰 Module 4: Getting Monetized',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-4/' },
        { text: 'Lesson 1: YouTube Requirements', link: '/course/module-4/lesson-1-youtube-requirements' },
        { text: 'Lesson 2: Monetization Strategy', link: '/course/module-4/lesson-2-monetization-strategy' },
        { text: 'Lesson 3: Watch Time', link: '/course/module-4/lesson-3-watch-time' },
        { text: 'Lesson 4: Shorts vs Long', link: '/course/module-4/lesson-4-shorts-vs-long' },
        { text: 'Lesson 5: Multi-Channel', link: '/course/module-4/lesson-5-multi-channel' },
        { text: 'Lesson 6: Platform Requirements', link: '/course/module-4/lesson-6-platform-requirements' },
        { text: 'Lesson 7: Getting Approved', link: '/course/module-4/lesson-7-getting-approved' },
      ]
    },
    {
      text: '💎 Module 5: Revenue Streams',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-5/' },
        { text: 'Lesson 1: Revenue Stack', link: '/course/module-5/lesson-1-revenue-stack' },
        { text: 'Lesson 2: AdSense', link: '/course/module-5/lesson-2-adsense' },
        { text: 'Lesson 3: Affiliate', link: '/course/module-5/lesson-3-affiliate' },
        { text: 'Lesson 4: YouTube Extras', link: '/course/module-5/lesson-4-youtube-extras' },
        { text: 'Lesson 5: Brand Deals', link: '/course/module-5/lesson-5-brand-deals' },
        { text: 'Lesson 6: Multi-Platform', link: '/course/module-5/lesson-6-multi-platform' },
        { text: 'Lesson 7: Scaling', link: '/course/module-5/lesson-7-scaling' },
      ]
    },
    {
      text: '📈 Module 6: Growth & Scaling',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-6/' },
        { text: 'Lesson 1: Consistency', link: '/course/module-6/lesson-1-consistency' },
        { text: 'Lesson 2: Multi-Platform', link: '/course/module-6/lesson-2-multi-platform' },
        { text: 'Lesson 3: Repurposing', link: '/course/module-6/lesson-3-repurposing' },
        { text: 'Lesson 4: Community', link: '/course/module-6/lesson-4-community' },
        { text: 'Lesson 5: SEO', link: '/course/module-6/lesson-5-seo' },
        { text: 'Lesson 6: A/B Testing', link: '/course/module-6/lesson-6-ab-testing' },
        { text: 'Lesson 7: Analytics', link: '/course/module-6/lesson-7-analytics' },
      ]
    },
    {
      text: '🚀 Module 7: Advanced',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-7/' },
        { text: 'Lesson 1: Multi-Channel', link: '/course/module-7/lesson-1-multi-channel' },
        { text: 'Lesson 2: Niche Expansion', link: '/course/module-7/lesson-2-niche-expansion' },
        { text: 'Lesson 3: Team Building', link: '/course/module-7/lesson-3-team-building' },
        { text: 'Lesson 4: Automation', link: '/course/module-7/lesson-4-automation' },
        { text: 'Lesson 5: Scaling', link: '/course/module-7/lesson-5-scaling' },
        { text: 'Lesson 6: Empire', link: '/course/module-7/lesson-6-empire' },
      ]
    },
    {
      text: '📱 Module 8: Platforms',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-8/' },
        { text: 'Lesson 1: YouTube', link: '/course/module-8/lesson-1-youtube' },
        { text: 'Lesson 2: TikTok', link: '/course/module-8/lesson-2-tiktok' },
        { text: 'Lesson 3: Instagram', link: '/course/module-8/lesson-3-instagram' },
        { text: 'Lesson 4: Facebook', link: '/course/module-8/lesson-4-facebook' },
        { text: 'Lesson 5: Cross-Platform', link: '/course/module-8/lesson-5-cross-platform' },
        { text: 'Lesson 6: Adaptation', link: '/course/module-8/lesson-6-adaptation' },
      ]
    },
    {
      text: '🔧 Module 9: Troubleshooting',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-9/' },
        { text: 'Lesson 1: Common Issues', link: '/course/module-9/lesson-1-common-issues' },
        { text: 'Lesson 2: Credits', link: '/course/module-9/lesson-2-credits' },
        { text: 'Lesson 3: Performance', link: '/course/module-9/lesson-3-performance' },
        { text: 'Lesson 4: Quality', link: '/course/module-9/lesson-4-quality' },
        { text: 'Lesson 5: Updates', link: '/course/module-9/lesson-5-updates' },
        { text: 'Lesson 6: Advanced Tips', link: '/course/module-9/lesson-6-advanced-tips' },
      ]
    },
    {
      text: '🏢 Module 10: Business',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/course/module-10/' },
        { text: 'Lesson 1: Hobby to Business', link: '/course/module-10/lesson-1-hobby-to-business' },
        { text: 'Lesson 2: Legal & Tax', link: '/course/module-10/lesson-2-legal-tax' },
        { text: 'Lesson 3: Brand Building', link: '/course/module-10/lesson-3-brand-building' },
        { text: 'Lesson 4: Long Term', link: '/course/module-10/lesson-4-long-term' },
        { text: 'Lesson 5: Exit Strategies', link: '/course/module-10/lesson-5-exit-strategies' },
        { text: 'Lesson 6: Next Steps', link: '/course/module-10/lesson-6-next-steps' },
      ]
    },
  ],
  '/guides/': [
    {
      text: '🎯 Getting Started',
      items: [
        { text: 'Introduction', link: '/guides/getting-started/introduction' },
        { text: 'Account Setup', link: '/guides/getting-started/account-setup' },
        { text: 'Dashboard Overview', link: '/guides/getting-started/dashboard-overview' },
        { text: 'Your First Video', link: '/guides/getting-started/your-first-video' },
        { text: 'Connecting Accounts', link: '/guides/getting-started/connecting-accounts' },
      ]
    },
    {
      text: '🛠️ Core Features',
      collapsed: false,
      items: [
        { text: 'Faceless Video Generator', link: '/guides/features/faceless-video-generator' },
        { text: 'Video Editing', link: '/guides/features/video-editing' },
        { text: 'Character Consistency', link: '/guides/features/character-consistency' },
        { text: 'Bulk Scheduler', link: '/guides/features/bulk-scheduler' },
        { text: 'Idea Discovery', link: '/guides/features/idea-discovery' },
        { text: 'Thumbnail Generator', link: '/guides/features/thumbnail-generator' },
        { text: 'Real Clone', link: '/guides/features/real-clone' },
        { text: 'URL to Video', link: '/guides/features/url-to-video' },
        { text: 'Audio to Video', link: '/guides/features/audio-to-video' },
        { text: 'Text to Scene', link: '/guides/features/text-to-scene' },
      ]
    },
    {
      text: '💰 Monetization',
      collapsed: true,
      items: [
        { text: 'Complete Guide', link: '/guides/monetization/complete-guide' },
        { text: 'YouTube Monetization', link: '/guides/monetization/youtube-monetization' },
        { text: 'Platform Requirements', link: '/guides/monetization/platform-requirements' },
        { text: 'Revenue Streams', link: '/guides/monetization/revenue-streams' },
        { text: 'Getting Monetized Fast', link: '/guides/monetization/getting-monetized-fast' },
        { text: 'Affiliate Marketing', link: '/guides/monetization/affiliate-marketing' },
      ]
    },
    {
      text: '💎 Top Niches',
      collapsed: true,
      items: [
        { text: 'Top Paying Niches', link: '/guides/niches/top-paying-niches' },
        { text: 'Niche Selection', link: '/guides/niches/niche-selection' },
        { text: 'Finance & Investing', link: '/guides/niches/finance-investing' },
        { text: 'Health & Wellness', link: '/guides/niches/health-wellness' },
        { text: 'Technology', link: '/guides/niches/technology' },
        { text: 'Business', link: '/guides/niches/business' },
        { text: 'Multi-Niche Strategy', link: '/guides/niches/multi-niche-strategy' },
      ]
    },
    {
      text: '📱 Platforms',
      collapsed: true,
      items: [
        { text: 'YouTube', link: '/guides/platforms/youtube-guide' },
        { text: 'TikTok', link: '/guides/platforms/tiktok-guide' },
        { text: 'Instagram', link: '/guides/platforms/instagram-guide' },
        { text: 'Facebook', link: '/guides/platforms/facebook-guide' },
        { text: 'Cross-Platform', link: '/guides/platforms/cross-platform' },
      ]
    },
    {
      text: '🔄 Workflows',
      collapsed: true,
      items: [
        { text: 'Daily Workflow', link: '/guides/workflows/daily-workflow' },
        { text: 'Monthly Workflow', link: '/guides/workflows/monthly-workflow' },
        { text: 'Content Repurposing', link: '/guides/workflows/content-repurposing' },
        { text: 'Affiliate Workflow', link: '/guides/workflows/affiliate-workflow' },
        { text: 'U-Log Workflow', link: '/guides/workflows/ulog-workflow' },
        { text: 'Multi-Channel', link: '/guides/workflows/multi-channel' },
      ]
    },
    {
      text: '📖 Resources',
      collapsed: true,
      items: [
        { text: 'Tools & Integrations', link: '/guides/resources/tools-integrations' },
        { text: 'ChatGPT Integration', link: '/guides/resources/chatgpt-integration' },
        { text: 'FAQ', link: '/guides/resources/faq' },
        { text: 'Troubleshooting', link: '/guides/resources/troubleshooting' },
        { text: 'Credit Management', link: '/guides/resources/credit-management' },
        { text: 'Best Practices', link: '/guides/resources/best-practices' },
      ]
    },
    {
      text: '🎯 Strategies',
      collapsed: true,
      items: [
        { text: 'Success Strategies', link: '/guides/strategies/success-strategies' },
        { text: 'Content Strategies', link: '/guides/strategies/content-strategies' },
        { text: 'Growth Strategies', link: '/guides/strategies/growth-strategies' },
        { text: 'Multi-Platform', link: '/guides/strategies/multi-platform' },
        { text: 'Community Building', link: '/guides/strategies/community-building' },
      ]
    },
  ],
}

export default defineConfig({
  ignoreDeadLinks: true,
  title: 'Faceless Video Mastery',
  description: 'Complete Guide and Full Learning Course to Automating Faceless Video Content',
  lastUpdated: false,
  cleanUrls: false,

  head: [
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Faceless Video Mastery Course' }],
    ['meta', { property: 'og:description', content: 'Automate faceless video content and dominate social media' }],
  ],

  locales: {
    root: {
      label: '🇺🇸 English',
      lang: 'en-US',
    },
    vi: {
      label: '🇻🇳 Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      themeConfig: {
        nav: [
          { text: '🏠 Trang chủ', link: '/vi/' },
          { text: '🎓 Khóa học', link: '/course/' },
          { text: '📚 Hướng dẫn', link: '/guides/getting-started/introduction' },
          { text: '🛠️ Công cụ', link: '/best-automating-tools-vi' },
          { text: '🔥 AI Tools', link: '/tools/' },
        ],
        outline: { label: 'Mục lục' },
        docFooter: { prev: 'Trang trước', next: 'Trang sau' },
        darkModeSwitchLabel: 'Giao diện',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Lên đầu trang',
      }
    },
    zh: {
      label: '🇨🇳 中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '🏠 首页', link: '/zh/' },
          { text: '🎓 课程', link: '/course/' },
          { text: '📚 指南', link: '/guides/getting-started/introduction' },
          { text: '🛠️ 工具', link: '/best-automating-tools' },
          { text: '🔥 AI Tools', link: '/tools/' },
        ],
        outline: { label: '目录' },
        docFooter: { prev: '上一页', next: '下一页' },
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
      }
    },
    es: {
      label: '🇪🇸 Español',
      lang: 'es-ES',
      link: '/es/',
      themeConfig: {
        nav: [
          { text: '🏠 Inicio', link: '/es/' },
          { text: '🎓 Curso', link: '/course/' },
          { text: '📚 Guías', link: '/guides/getting-started/introduction' },
          { text: '🛠️ Herramientas', link: '/best-automating-tools' },
          { text: '🔥 AI Tools', link: '/tools/' },
        ],
        outline: { label: 'En esta página' },
        docFooter: { prev: 'Anterior', next: 'Siguiente' },
        darkModeSwitchLabel: 'Tema',
        sidebarMenuLabel: 'Menú',
        returnToTopLabel: 'Volver arriba',
      }
    },
    fr: {
      label: '🇫🇷 Français',
      lang: 'fr-FR',
      link: '/fr/',
      themeConfig: {
        nav: [
          { text: '🏠 Accueil', link: '/fr/' },
          { text: '🎓 Cours', link: '/course/' },
          { text: '📚 Guides', link: '/guides/getting-started/introduction' },
          { text: '🛠️ Outils', link: '/best-automating-tools' },
          { text: '🔥 AI Tools', link: '/tools/' },
        ],
        outline: { label: 'Sur cette page' },
        docFooter: { prev: 'Précédent', next: 'Suivant' },
        darkModeSwitchLabel: 'Thème',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Haut de page',
      }
    },
  },

  themeConfig: {
    logo: '🎬',
    siteTitle: 'Faceless Video Mastery',

    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '🎓 Course', link: '/course/' },
      { text: '📚 Guides', link: '/guides/getting-started/introduction' },
      { text: '🛠️ Tools', link: '/best-automating-tools' },
      { text: '🔥 AI Tools', link: '/tools/' },
      { text: '🔐 Login', link: '/auth' },
      {
        text: '🚀 Start Free',
        items: [
          { text: 'Syllaby.io - Free Trial', link: 'https://syllaby.io/?via=victorchuyen68' },
        ]
      }
    ],

    sidebar: sharedSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/victorchuyen/automate-faceless-content' },
    ],

    search: { provider: 'local' },

    footer: {
      message: '⭐ Star this repo if you find it helpful!',
      copyright: '© 2025 Faceless Video Mastery Course'
    },

    editLink: {
      pattern: 'https://github.com/victorchuyen/automate-faceless-content/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    outline: { level: [2, 3], label: 'On this page' },
  }
})
