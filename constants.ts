
import { Task, PortfolioItem, User, FeedItem, ForumPost, FeedComment, ChatConversation, Transaction, Skill, StoreProduct, StoreAnnouncement, FeedPost } from './types';
import { PaintBrushIcon, PencilSquareIcon, CodeBracketIcon, CameraIcon, BriefcaseIcon, ChartBarIcon, AdobeIcon, OpenAIIcon, AnthropicIcon } from './components/Icons';

export const LEVELS = [
  { name: 'Desbravador do Vazio Visual', minTokens: 0 },
  { name: 'Conjurador de Formas e Cores', minTokens: 100 },
  { name: 'Feiticeiro do Olhar Criativo', minTokens: 300 },
  { name: 'Guardião da Estética Dimensional', minTokens: 600 },
  { name: 'Alquimista Pixelar Supremo', minTokens: 1000 },
  { name: 'Mago da Tela Infinita', minTokens: 1500 },
  { name: 'Arquiteto da Visão Cósmica', minTokens: 2200 },
  { name: 'Lorde da Ilusão Digital', minTokens: 3000 },
];

export const SKILL_LEVELS = [
  { name: 'Beginner', minTokens: 0 },
  { name: 'Intermediate', minTokens: 100 },
  { name: 'Advanced', minTokens: 300 },
  { name: 'Expert', minTokens: 600 },
];

export const MOCK_SKILLS: Skill[] = [
    { id: 1, name: 'Design Gráfico', description: 'Criação de elementos visuais para comunicação, incluindo logos, layouts e mais.', category: 'design', icon: PaintBrushIcon },
    { id: 2, name: 'Copywriting', description: 'Arte de escrever textos persuasivos para marketing, vendas e comunicação.', category: 'content', icon: PencilSquareIcon },
    { id: 3, name: 'Desenvolvimento Web', description: 'Criação de sites e aplicações web usando linguagens de programação e frameworks.', category: 'technical', icon: CodeBracketIcon },
    { id: 4, name: 'Edição de Vídeo', description: 'Produção e edição de conteúdo audiovisual para diferentes plataformas e propósitos.', category: 'creative', icon: CameraIcon },
    { id: 5, name: 'Marketing Digital', description: 'Estratégias de marketing online, incluindo SEO, redes sociais, email marketing e campanhas pagas.', category: 'business', icon: BriefcaseIcon },
    { id: 6, name: 'Análise de Dados', description: 'Coleta, processamento e interpretação de dados para insights de negócio.', category: 'technical', icon: ChartBarIcon },
];

export const MOCK_USER: User = {
  id: 1,
  name: 'Alex C.',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  coverPhoto: 'https://picsum.photos/seed/alexcover/1200/400',
  walletAddress: '',
  tokens: 50,
  subscriptionTier: 'None',
  followers: 125,
  following: 88,
  followingIds: [2, 3], // Follows Maria and Carlos
  skills: [
    { skillId: 5, tokensEarned: 120 }, // Marketing Digital (Intermediate)
    { skillId: 2, tokensEarned: 50 },  // Copywriting (Beginner)
  ],
};

export const MOCK_COMMUNITY_USERS: User[] = [
    {
      id: 2,
      name: 'Maria S.',
      avatar: 'https://i.pravatar.cc/150?u=maria',
      coverPhoto: 'https://picsum.photos/seed/mariacover/1200/400',
      walletAddress: '0x123...',
      tokens: 1500,
      subscriptionTier: 'Silver',
      followers: 430,
      following: 150,
      followingIds: [1], // Follows Alex back (mutual)
      skills: [
        { skillId: 1, tokensEarned: 350 }, // Design Gráfico (Advanced)
        { skillId: 3, tokensEarned: 150 }, // Desenvolvimento Web (Intermediate)
      ],
    },
    {
      id: 3,
      name: 'Carlos L.',
      avatar: 'https://i.pravatar.cc/150?u=carlos',
      coverPhoto: 'https://picsum.photos/seed/carloscover/1200/400',
      walletAddress: '0x456...',
      tokens: 300,
      subscriptionTier: 'None',
      followers: 80,
      following: 112,
      followingIds: [4], // Doesn't follow Alex
      skills: [
        { skillId: 3, tokensEarned: 250 }, // Desenvolvimento Web (Intermediate)
      ],
    },
    {
      id: 4,
      name: 'Julia P.',
      avatar: 'https://i.pravatar.cc/150?u=julia',
      coverPhoto: 'https://picsum.photos/seed/juliacover/1200/400',
      walletAddress: '0x789...',
      tokens: 5000,
      subscriptionTier: 'Gold',
      followers: 1200,
      following: 200,
      followingIds: [1, 2, 3],
      skills: [
        { skillId: 4, tokensEarned: 700 }, // Edição de Vídeo (Expert)
        { skillId: 1, tokensEarned: 500 }, // Design Gráfico (Advanced)
        { skillId: 5, tokensEarned: 200 }, // Marketing Digital (Intermediate)
      ],
    },
];


export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Logo Design for a Coffee Shop',
    description: 'Create a modern, minimalist logo for a new local coffee shop. The client wants earthy tones and a clean font.',
    category: 'Logo Design',
    reward: 150,
    requiredLevel: 0,
    requirements: ['Adobe Illustrator', 'Vector file (.svg)', 'High-res PNG'],
    creatorId: 2, // Maria S.
    status: 'open',
    skillId: 1, // Design Gráfico
  },
  {
    id: 2,
    title: 'Instagram Post Carousel',
    description: 'Design a 5-slide carousel for an Instagram post about sustainable fashion. Must be visually engaging and on-brand.',
    category: 'Social Media',
    reward: 80,
    requiredLevel: 1,
    requirements: ['Figma or Canva', '1080x1080px format'],
    creatorId: 3, // Carlos L.
    status: 'open',
    skillId: 5, // Marketing Digital
  },
  {
    id: 3,
    title: 'Edit a 30-second Video Ad',
    description: 'Edit raw footage into a punchy 30-second video ad for a new tech gadget. Add music, text overlays, and transitions.',
    category: 'Video Editing',
    reward: 250,
    requiredLevel: 2,
    requirements: ['Adobe Premiere Pro', '1080p MP4 output', 'Royalty-free music'],
    creatorId: 4, // Julia P.
    status: 'open',
    skillId: 4, // Edição de Vídeo
  },
  {
    id: 4,
    title: 'Website Banner Illustration',
    description: 'Illustrate a vibrant banner for the homepage of an e-commerce site selling handmade jewelry.',
    category: 'Illustration',
    reward: 180,
    requiredLevel: 2,
    requirements: ['Illustration skills', 'Procreate or Photoshop', 'Layered PSD file'],
    creatorId: 2, // Maria S.
    status: 'in_progress',
    skillId: 1, // Design Gráfico
  },
   {
    id: 5,
    title: 'Write a Blog Post about AI',
    description: 'Write a 500-word blog post about the future of Artificial Intelligence in creative industries.',
    category: 'Content Writing',
    reward: 120,
    requiredLevel: 1,
    requirements: ['SEO knowledge', 'Engaging tone'],
    creatorId: 1, // Alex C.
    status: 'open',
    skillId: 2, // Copywriting
  },
];

const MOCK_USER_PORTFOLIO: PortfolioItem[] = [
    {
        id: 1,
        userId: 1,
        title: 'Project Alpha Logo',
        description: 'A sleek logo designed for a tech startup.',
        imageUrl: 'https://picsum.photos/400/300?random=1',
        taskCategory: 'Logo Design'
    },
    {
        id: 2,
        userId: 1,
        title: 'Social Media Campaign "GoGreen"',
        description: 'A series of engaging posts for an environmental awareness campaign.',
        imageUrl: 'https://picsum.photos/400/300?random=2',
        taskCategory: 'Social Media'
    },
];

const MOCK_COMMUNITY_PORTFOLIOS: PortfolioItem[] = [
  {
      id: 3,
      userId: 4, // Julia P.
      title: '"Cyber Dreams" Music Video',
      description: 'Directed and edited a futuristic music video with heavy visual effects for an indie artist.',
      imageUrl: 'https://picsum.photos/seed/cyber/800/600',
      taskCategory: 'Video Editing'
  },
  {
      id: 4,
      userId: 2, // Maria S.
      title: 'Branding for "Aroma Cafe"',
      description: 'Developed a complete brand identity, including logo, color palette, and packaging design.',
      imageUrl: 'https://picsum.photos/seed/aroma/800/600',
      taskCategory: 'Branding'
  },
  {
      id: 5,
      userId: 3, // Carlos L.
      title: 'Infographic on Renewable Energy',
      description: 'Designed a visually appealing infographic to explain the benefits of solar power for a non-profit.',
      imageUrl: 'https://picsum.photos/seed/solar/800/600',
      taskCategory: 'Illustration'
  },
  {
      id: 6,
      userId: 4, // Julia P.
      title: 'Packaging Design for Skincare Line',
      description: 'Created elegant and minimalist packaging for a new line of organic skincare products.',
      imageUrl: 'https://picsum.photos/seed/skincare/800/600',
      taskCategory: 'Branding'
  },
   {
      id: 7,
      userId: 2, // Maria S.
      title: 'Mobile App UI/UX',
      description: 'Designed the user interface and experience for a habit-tracking mobile application.',
      imageUrl: 'https://picsum.photos/seed/app/800/600',
      taskCategory: 'UI/UX Design'
    },
];

export const ALL_PORTFOLIO_ITEMS = [...MOCK_USER_PORTFOLIO, ...MOCK_COMMUNITY_PORTFOLIOS];

const MOCK_FEED_COMMENTS: { [key: number]: FeedComment[] } = {
  1: [
    { id: 1, author: MOCK_COMMUNITY_USERS[0], content: "Wow, the VFX are insane! Amazing work.", timestamp: "1 hour ago" },
    { id: 2, author: MOCK_COMMUNITY_USERS[1], content: "Love the color grading.", timestamp: "30 minutes ago" }
  ],
  2: [
    { id: 3, author: MOCK_USER, content: "This is so clean and professional. Great job!", timestamp: "5 hours ago" }
  ],
  3: [],
  4: [
     { id: 4, author: MOCK_COMMUNITY_USERS[2], content: "Important message and beautiful design!", timestamp: "1 day ago" }
  ]
};

export const SUBSCRIPTION_DISCOUNTS: { [key in 'None' | 'Bronze' | 'Silver' | 'Gold']: number } = {
  'None': 0,
  'Bronze': 0.05, // 5%
  'Silver': 0.10,  // 10%
  'Gold': 0.15,   // 15%
};

export const MOCK_STORE_PRODUCTS: StoreProduct[] = [
    {
        id: 1,
        name: 'Adobe Creative Cloud',
        description: 'A suíte completa de aplicativos de criação, incluindo Photoshop, Illustrator, Premiere Pro e mais.',
        logoComponent: AdobeIcon,
        category: 'Software',
        plans: [
            { id: 1, name: 'Plano Mensal', basePrice: 250 },
            { id: 2, name: 'Plano Anual', basePrice: 2500 },
        ],
    },
    {
        id: 2,
        name: 'ChatGPT Plus',
        description: 'Acesso prioritário a novos recursos, tempos de resposta mais rápidos e disponibilidade geral aprimorada.',
        logoComponent: OpenAIIcon,
        category: 'AI',
        plans: [
            { id: 3, name: 'Plano Mensal', basePrice: 100 },
        ],
    },
    {
        id: 3,
        name: 'Claude Pro',
        description: 'Cinco vezes mais uso, acesso prioritário em horários de pico e acesso antecipado a novos recursos.',
        logoComponent: AnthropicIcon,
        category: 'AI',
        plans: [
            { id: 4, name: 'Plano Mensal', basePrice: 100 },
        ],
    },
];

const MOCK_ADOBE_ANNOUNCEMENT: StoreAnnouncement = {
    id: 1001,
    type: 'announcement',
    product: MOCK_STORE_PRODUCTS[0],
    title: 'Oferta Especial: Adobe Creative Cloud com Desconto!',
    content: 'Assinantes da SkillUp & Earn agora têm descontos exclusivos na suíte completa da Adobe. Melhore suas ferramentas e eleve seu trabalho para o próximo nível!',
    timestamp: '4 hours ago',
};


export const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    type: 'post',
    user: MOCK_COMMUNITY_USERS[2], // Julia P.
    portfolioItem: MOCK_COMMUNITY_PORTFOLIOS[0],
    timestamp: '2 hours ago',
    likes: 128,
    comments: MOCK_FEED_COMMENTS[1],
  },
  MOCK_ADOBE_ANNOUNCEMENT,
  {
    id: 2,
    type: 'post',
    user: MOCK_COMMUNITY_USERS[0], // Maria S.
    portfolioItem: MOCK_COMMUNITY_PORTFOLIOS[1],
    timestamp: '8 hours ago',
    likes: 76,
    comments: MOCK_FEED_COMMENTS[2],
  },
  {
    id: 3,
    type: 'post',
    user: MOCK_COMMUNITY_USERS[1], // Carlos L.
    portfolioItem: MOCK_COMMUNITY_PORTFOLIOS[2],
    timestamp: '1 day ago',
    likes: 45,
    comments: MOCK_FEED_COMMENTS[3],
  },
  {
    id: 4,
    type: 'post',
    user: MOCK_USER, // Alex C. (You)
    portfolioItem: MOCK_USER_PORTFOLIO[1],
    timestamp: '2 days ago',
    likes: 92,
    comments: MOCK_FEED_COMMENTS[4],
  },
];


export const SUBSCRIPTION_TIERS = [
  { name: 'Non-Subscriber', fee: '15%', price: 'Free' },
  { name: 'Bronze', fee: '10%', price: '5 SKILL / month' },
  { name: 'Silver', fee: '7%', price: '10 SKILL / month' },
  { name: 'Gold', fee: '5%', price: '15 SKILL / month' },
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: 1,
    title: 'Tutorial: Mastering the Pen Tool in Adobe Illustrator',
    content: 'The Pen Tool can be tricky, but it\'s the most powerful tool for creating precise vector shapes. Here\'s a step-by-step guide to get you started...',
    author: MOCK_COMMUNITY_USERS[2], // Julia P.
    category: 'Logo Design',
    timestamp: '3 hours ago',
    comments: [
      {
        id: 1,
        author: MOCK_COMMUNITY_USERS[0], // Maria S.
        content: 'This is amazing! I always struggled with bezier curves. Thanks for sharing!',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        author: MOCK_USER, // Alex C.
        content: 'Great tutorial! Do you have any tips for creating smooth S-curves?',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 2,
    title: 'How to Choose the Right Music for Your Video Edits',
    content: 'Music can make or break a video. It sets the tone and pace. In this post, I\'ll cover where to find royalty-free music and how to match it to your footage...',
    author: MOCK_COMMUNITY_USERS[0], // Maria S.
    category: 'Video Editing',
    timestamp: '1 day ago',
    comments: [
      {
        id: 3,
        author: MOCK_COMMUNITY_USERS[1], // Carlos L.
        content: 'Super helpful, I always spend hours looking for the right track.',
        timestamp: '1 day ago'
      }
    ]
  },
  {
    id: 3,
    title: 'Showcase: My Latest Website Build with React & Tailwind CSS',
    content: 'Just finished a new landing page for a client. Used React for the interactivity and Tailwind CSS for the styling. Check it out and let me know what you think!',
    author: MOCK_COMMUNITY_USERS[1], // Carlos L.
    category: 'Web Development',
    timestamp: '2 days ago',
    comments: []
  }
];

export const MOCK_CONVERSATIONS: ChatConversation[] = [
    {
        id: 1,
        participants: [MOCK_USER, MOCK_COMMUNITY_USERS[0]], // Alex and Maria (mutual follow)
        status: 'active',
        messages: [
            { id: 1, senderId: 1, content: 'Hey Maria, love your branding work!', timestamp: '2 hours ago' },
            { id: 2, senderId: 2, content: 'Thanks Alex! Your "GoGreen" campaign was really inspiring.', timestamp: '1 hour ago' },
        ],
    },
    {
        id: 2,
        participants: [MOCK_COMMUNITY_USERS[2], MOCK_USER], // Carlos wants to chat with Alex (pending)
        status: 'pending',
        messages: [
            { id: 1, senderId: 3, content: 'Hey Alex, I have a question about your infographic post on the forum.', timestamp: '3 days ago' },
        ],
    }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 1,
        type: 'earn',
        description: 'Completed: Logo Design for a Coffee Shop',
        tokenAmount: 150,
        timestamp: '1 day ago'
    },
    {
        id: 2,
        type: 'earn',
        description: 'Completed: Instagram Post Carousel',
        tokenAmount: 80,
        timestamp: '3 days ago'
    },
    {
        id: 3,
        type: 'spend',
        description: 'Subscription Fee: Bronze Tier',
        tokenAmount: -5,
        timestamp: '5 days ago'
    },
    {
        id: 4,
        type: 'earn',
        description: 'Completed: Website Banner Illustration',
        tokenAmount: 180,
        timestamp: '1 week ago'
    }
];
