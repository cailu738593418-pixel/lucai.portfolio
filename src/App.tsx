/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { X, Search, User, ChevronLeft, ChevronRight, Mail, Phone, Calendar, MapPin, Award, BookOpen, Briefcase, GraduationCap, Heart, Star, Upload, MousePointer2 } from 'lucide-react';

// --- Types ---
type ViewState = 'home' | 'mypage' | 'GRAPHIC DESIGN' | 'DIGITAL MEDIA DESIGN' | 'AIGC DESIGN · WAITING';

interface PosterSet {
  title: string;
  subtitle?: string;
  footerNote?: string;
  images: string[];
  aspect?: string;
  maxWidth?: string;
}

interface VideoSet {
  title: string;
  subtitle?: string;
  footerNote?: string;
  urls: string[];
}

interface Project {
  id: string;
  title: string;
  category: 'GRAPHIC DESIGN' | 'DIGITAL MEDIA DESIGN' | 'AIGC DESIGN · WAITING';
  year: string;
  description: string;
  longDescription?: string;
  image: string;
  thumbnail?: string;
  gallery?: string[];
  bookPages?: string[];
  bookDetailPages?: string[];
  interactiveImages?: string[];
  posterSets?: PosterSet[];
  videoSets?: VideoSet[];
  videoUrl?: string;
  videoUrls?: string[];
  researchAssets?: {
    personas: string[];
    userJourney: string[];
    diagrams: {
      stakeholder?: string;
      blueprint?: string;
      system?: string;
    };
  };
  interactiveMockups?: {
    title: string;
    subtitle?: string;
    description?: string;
    images: string[];
    aspect: string;
    maxWidth?: string;
  }[];
  finishedProductDisplay?: string[];
  type: 'image' | 'sticky' | 'framed' | 'text-box' | 'crumpled';
  isUnderConstruction?: boolean;
}

// --- Data based on the resume and aesthetic ---
const PROJECTS: Project[] = [
  {
    id: 'fountain-2023',
    title: 'FOUNTAIN 2023',
    category: 'GRAPHIC DESIGN',
    year: '2023',
    description: 'Book Design and Installation',
    longDescription: 'When people discuss toilets today, they focus not only on traditional functionality but also extend their view towards artistic qualities, cultural values, and future developments. FOUNTAIN 2023 focuses on the multi-definition of today\'s toilets. The work presents a new perspective on observing traditional objects humorously, using graffiti and light-hearted content.',
    image: 'https://img.heliar.top/file/1774221979739_1.png',
    gallery: [
      'https://img.heliar.top/file/1774222471008_马桶_1__1_.png',
      'https://img.heliar.top/file/1774273486095_IMG_3898_1_.jpg',
      'https://img.heliar.top/file/1774273363898_腿1.png',
      'https://img.heliar.top/file/1774273355074_尿.png',
      'https://img.heliar.top/file/1774273352321_胶带1.png',
      'https://img.heliar.top/file/1774290392164_FD3717E39F870FDEB8C125EAED4D55A2.png'
    ],
    bookPages: [
      'https://img.heliar.top/file/1774272236511_厕所书2.jpg',
      'https://img.heliar.top/file/1774271490605_厕所书24.jpg',
      'https://img.heliar.top/file/1774271487353_厕所书25.jpg',
      'https://img.heliar.top/file/1774271500177_厕所书216.jpg',
      'https://img.heliar.top/file/1774271498047_厕所书217.jpg',
      'https://img.heliar.top/file/1774271512000_厕所书228.jpg',
      'https://img.heliar.top/file/1774271518493_厕所书229.jpg',
      'https://img.heliar.top/file/1774271522841_厕所书242.jpg',
      'https://img.heliar.top/file/1774271532526_厕所书243.jpg',
      'https://img.heliar.top/file/1774272453483_厕所书256.jpg',
      'https://img.heliar.top/file/1774272450731_厕所书257.jpg',
      'https://img.heliar.top/file/1774272463102_厕所书274.jpg',
      'https://img.heliar.top/file/1774272465945_厕所书275.jpg',
      'https://img.heliar.top/file/1774272469575_厕所书2100.jpg',
      'https://img.heliar.top/file/1774272469288_厕所书2101.jpg',
      'https://img.heliar.top/file/1774272478377_厕所书2106.jpg',
      'https://img.heliar.top/file/1774272476247_厕所书2107.jpg',
      'https://img.heliar.top/file/1774272480551_厕所书2108.jpg',
      'https://img.heliar.top/file/1774272479485_厕所书2109.jpg',
      'https://img.heliar.top/file/1774272495675_厕所书2116.jpg',
      'https://img.heliar.top/file/1774272495406_厕所书2117.jpg',
      'https://img.heliar.top/file/1774272496905_厕所书2118.jpg',
      'https://img.heliar.top/file/1774272502985_厕所书2119.jpg',
      'https://img.heliar.top/file/1774272503315_厕所书2130.jpg',
      'https://img.heliar.top/file/1774272509185_厕所书2131.jpg',
      'https://img.heliar.top/file/1774272514023_厕所书2136.jpg',
      'https://img.heliar.top/file/1774272518722_厕所书2137.jpg',
      'https://img.heliar.top/file/1774272518603_厕所书2146.jpg'
    ],
    type: 'crumpled',
  },
  {
    id: 'g1',
    title: 'NO BOUNDARY WITHIN',
    category: 'GRAPHIC DESIGN',
    year: '2026',
    description: 'Book Design, Posters and Exhibition Design',
    longDescription: 'No Boundary Within approaches “loss of control” as a structural condition, defining it not as formal randomness or disorder, but as the fissure that emerges when institutional narratives fail to fully encompass lived experience.\n\nSituated within the context of migrant eviction in the UK, the project does not attempt to directly represent acts of eviction. Instead, it examines how their visual outcomes are constructed and circulated. Through the juxtaposition and analysis of news imagery and traces of dwelling within urban space, it reveals how eviction is rendered de-causalised and naturalised at the level of visual representation, thereby obscuring the institutional logics that underpin it.\n\nMethodologically, the project draws upon the critical compositional strategies of Jan van Toorn, employing obstruction, layering, and the deferral of information to construct a stratified visual hierarchy. The double-layered poster operates as the primary medium, distributing content across multiple surfaces and interrupting linear modes of reading, such that viewing becomes a process of active recognition and reconstruction.\n\nHere, “obstruction” is not deployed as a formal device, but functions as a structural operation that intervenes in the production of meaning. By regulating the relationship between the visible and the concealed, the project exposes how images construct reality through processes of selection and omission, while simultaneously rendering the gradual erasure of lived experience within institutional narratives perceptible.\n\nRather than offering resolution, the project seeks to recalibrate modes of viewing through visual intervention—shifting the image from an object of passive reception to one open to questioning and reinterpretation, and in doing so, reopening the conditions through which structure itself may be recognised.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IiNlNWU1ZTUiLz4KICA8ZyBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ij4KICAgIDxsaW5lIHgxPSIwIiB5MT0iMTAwIiB4Mj0iODAwIiB5Mj0iMTAwIiAvPgogICAgPGxpbmUgeDE9IjAiIHkxPSIyMDAiIHgyPSI4MDAiIHkyPSIyMDAiIC8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjMwMCIgeDI9IjgwMCIgeTI9IjMwMCIgLz4KICAgIDxsaW5lIHgxPSIwIiB5MT0iNDAwIiB4Mj0iODAwIiB5Mj0iNDAwIiAvPgogICAgPGxpbmUgeDE9IjAiIHkxPSI1MDAiIHgyPSI4MDAiIHkyPSI1MDAiIC8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjYwMCIgeDI9IjgwMCIgeTI9IjYwMCIgLz4KICAgIDxsaW5lIHgxPSIwIiB5MT0iNzAwIiB4Mj0iODAwIiB5Mj0iNzAwIiAvPgogICAgPGxpbmUgeDE9IjAiIHkxPSI4MDAiIHgyPSI4MDAiIHkyPSI4MDAiIC8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjkwMCIgeDI9IjgwMCIgeTI9IjkwMCIgLz4KICAgIDxsaW5lIHgxPSIxMDAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSIyMDAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSIzMDAiIHkxPSIwIiB4Mj0iMzAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI0MDAiIHkxPSIwIiB4Mj0iNDAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI1MDAiIHkxPSIwIiB4Mj0iNTAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI2MDAiIHkxPSIwIiB4Mj0iNjAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI3MDAiIHkxPSIwIiB4Mj0iNzAwIiB5Mj0iMTAwMCIgLz4KICA8L2c+CiAgPHJlY3QgeD0iMTUwIiB5PSI0MDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogIDx0ZXh0IHg9IjQwMCIgeT0iNDkwIiBmYW50LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtc3R5bGU9Iml0YWxpYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjgiIGZpbGw9ImJsYWNrIj5DT01JTkcgU09PTjwvdGV4dD4KICA8dGV4dCB4PSI0MDAiIHk9IjU1MCIgZmFudC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMTIiIGZpbGw9IiM5OTkiPuaVrOivt+acn+W+hDwvdGV4dD4KPC9zdmc+',
    gallery: [],
    type: 'framed',
    isUnderConstruction: true,
  },
  {
    id: 'plant-manipulation',
    title: 'PLANT MANIPULATION',
    category: 'GRAPHIC DESIGN',
    year: '2023',
    description: 'Typeface Design, Layout Design, Posters and Vedio',
    longDescription: 'In the high-end fruit market, fruits with special appearances that do not conform to natural growth patterns but are shaped by human intervention are often sold. This shaping is a result of businesses interfering with the growth process of plants in pursuit of economic gain. However, when human intervention conflicts with the plant\'s autonomous growth plan, it brings adverse effects to both humans and plants.\n\nI have simulated the forced intervention and molding of human beings on plant growth and presented the result of plant domestication in the form of typography. use this to create protest posters，By observing the mutual relationship between humans and these controlled plants, I delve into the interaction and impact between human behavior and nature.',
    image: 'https://img.heliar.top/file/1774295040363_图层_0_1_.png',
    thumbnail: 'https://img.heliar.top/file/1774442377103_.CAILU_portfolio_the_glasgow_school_of_art_graphic_design_13914596879.pdf.png', // 新照片上传代码: 在这里替换 Graphic 和 Home 显示的封面图
    bookPages: [
      'https://img.heliar.top/file/1774296396531_a3_01.jpg',
      'https://img.heliar.top/file/1774296392174_a3_04.jpg',
      'https://img.heliar.top/file/1774296387285_a3_02.jpg',
      'https://img.heliar.top/file/1774296512971_a3_03.jpg'
    ],
    bookDetailPages: [
      'https://img.heliar.top/file/1774298208089_27.jpg',
      'https://img.heliar.top/file/1774298210272_211.jpg',
      'https://img.heliar.top/file/1774298207711_212.jpg',
      'https://img.heliar.top/file/1774298210451_213.jpg',
      'https://img.heliar.top/file/1774298221123_214.jpg',
      'https://img.heliar.top/file/1774298223710_219.jpg',
      'https://img.heliar.top/file/1774298224819_220.jpg',
      'https://img.heliar.top/file/1774298226838_册子23.jpg',
      'https://img.heliar.top/file/1774298228616_册子210.jpg',
      'https://img.heliar.top/file/1774298235675_册子211.jpg',
      'https://img.heliar.top/file/1774298236276_册子217.jpg',
      'https://img.heliar.top/file/1774298239826_册子221.jpg',
      'https://img.heliar.top/file/1774298240353_册子237.jpg',
      'https://img.heliar.top/file/1774298249253_册子242.jpg'
    ],
    videoUrl: 'https://www.youtube.com/embed/LMm6y3EfjSo',
    gallery: [
      'https://img.heliar.top/file/1774293903957_背景_1_.png',
      'https://img.heliar.top/file/1774294731227_IMG_4620.JPG',
      'https://img.heliar.top/file/1774294733708_IMG_3706.JPG'
    ],
    type: 'image',
  },
  {
    id: 'g4',
    title: '404 NOT FOUND',
    category: 'GRAPHIC DESIGN',
    year: '2025',
    description: 'Poster Design and Pop-up Exhibition',
    longDescription: 'This project begins with a comparative testing of AI systems across different national contexts. By inputting identical prompts into multiple platforms, it observes variations in generated outputs in terms of content, tone, and even affective inclination: most responses appear neutral, some reveal implicit positions, while in certain cases, the system directly withdraws.\n\nSuch differences suggest that AI, often regarded as an objective and neutral technological system, does not operate independently of context. Although it exists as a non-sentient, silicon-based structure, its outputs remain shaped by underlying ideological frameworks. This tendency becomes particularly evident in specific subject matters. For instance, when prompts involve representations of racial power relations, some mainstream generative systems tend to avoid or refuse such content, rendering “invisibility” itself a constructed outcome.\n\nThis mechanism of “appearance and withdrawal” recalls the flash mob as a form of brief yet tangible collective presence. In response, I initiated and organised a flash mob titled Pretend to Sleep, in which participants collectively entered a state of deliberate stillness within public space, translating “non-response” into a visible social action. In this context, “silence” is no longer a neutral absence, but becomes a structurally recognisable position.',
    image: 'https://img.heliar.top/file/1774218608746_print普通_00.jpg',
    gallery: [
      'https://img.heliar.top/file/1774723887441_Image_11_-_副本__2__1_.png',
      'https://img.heliar.top/file/1774723882604_Image_11_1_.png',
      'https://img.heliar.top/file/1774647524623_Image_8.png',
      'https://img.heliar.top/file/1774725576890_Image_18.jpg'
    ],
    type: 'framed',
  },
  {
    id: 'g5',
    title: 'ADVERTISING DESIGN',
    category: 'GRAPHIC DESIGN',
    year: '2022-2023',
    description: 'Poster Design, Photography and Illustration',
    image: 'https://img.heliar.top/file/1774303018057_1__3_.jpg',
    posterSets: [
      {
        title: 'NO FEAR OF SWEAT OR STAINS',
        subtitle: '获得2023第十五届全国大学生广告艺术大赛省级一等奖',
        images: [
          'https://img.heliar.top/file/1774303251572_new1-01.jpg',
          'https://img.heliar.top/file/1774303251399_new2-01.jpg'
        ]
      },
      {
        title: 'YONGQING PROPERTY',
        subtitle: '获得2023时报金犊奖广告设计奖： 优秀奖',
        footerNote: 'The project images were generated by AI',
        images: [
          'https://img.heliar.top/file/1774303369309_永庆房屋-04.jpg',
          'https://img.heliar.top/file/1774303359999_永庆房屋-05.jpg',
          'https://img.heliar.top/file/1774303374075_永庆房屋-06.jpg'
        ]
      },
      {
        title: 'KESONANCE',
        subtitle: '获得2022未来设计师NCDA全国高校数字艺术大赛省级二等奖',
        images: [
          'https://img.heliar.top/file/1774303018057_1__3_.jpg',
          'https://img.heliar.top/file/1774303009741_1__1_.jpg',
          'https://img.heliar.top/file/1774303015251_1__2_.jpg'
        ]
      },
      {
        title: 'UT IS REALLY INTERESTING!',
        subtitle: '获得2022第十四届全国大学生广告艺术大赛省级一等奖',
        images: [
          'https://img.heliar.top/file/1774303047112_Uniqio上海-01.jpg',
          'https://img.heliar.top/file/1774303048492_Uniqlo北京-01.jpg',
          'https://img.heliar.top/file/1774303043022_Uniqio广州-01.jpg'
        ]
      }
    ],
    type: 'framed',
  },
  {
    id: 'd2',
    title: 'THE ART OF ICE RECREATION CRAFT',
    category: 'DIGITAL MEDIA DESIGN',
    year: '2024',
    description: 'Information Design and 3D Exhibition Design',
    longDescription: 'Ice play is a traditional culture in Northeast China and also the precursor to modern skiing and ice skating. However, this traditional ice-snow sport has gradually disappeared from the public eye. We aim to use design to promote it and help people rediscover and understand ice play.\n\nWe extracted six main ice play tools—ice bed, ice cart, sled, ice top, bamboo horse, etc.—and deconstructed and redesigned them. The complex shapes of the tools are presented simply to the audience, using information design and video to narrate how each tool was used and evolved, showcasing the unique charm of ice-snow culture.\n\nIn the design, we use blue as the primary color to create an atmosphere of being in a snowy world. Stylistically, we drew inspiration from the forms and painting techniques of ancient ice play illustrations, giving the design both classical charm and modern simplicity, highlighting the evolution and appeal of ice play culture.',
    image: 'https://img.heliar.top/file/1774360834996_宫廷冰床0004_1_.png',
    interactiveImages: [
      'https://img.heliar.top/file/1774307145793_1.jpg',
      'https://img.heliar.top/file/1774307147602_2.jpg',
      'https://img.heliar.top/file/1774307160757_3.jpg',
      'https://img.heliar.top/file/1774307166364_4.jpg',
      'https://img.heliar.top/file/1774307183879_5.jpg',
      'https://img.heliar.top/file/1774307186018_6.jpg'
    ],
    gallery: [
      'https://img.heliar.top/file/1774307197832_图层_0.png'
    ],
    videoUrls: [
      'https://www.youtube.com/embed/yKvO0w90Vsc',
      'https://www.youtube.com/embed/-5ycZATv7h0'
    ],
    type: 'crumpled',
  },
  {
    id: 'd3',
    title: 'EIGHT BANNERS WINE COLLECTION',
    category: 'DIGITAL MEDIA DESIGN',
    year: '2023',
    description: 'Service Design',
    longDescription: '获得2023年辽宁省文创赛暨后备箱大集： 铜奖\n\nThis project takes Banlashan Village in Faku, Shenyang, as the practical site, focusing on local liquor culture resources to build a “digital cultural IP integrated design” service system, exploring new pathways for integrating rural cultural tourism and industry. Addressing issues such as fragmented brand identity, limited visitor experiences, and traditional agricultural product sales models, the project proposes a systematic visual solution centered on an exclusive IP character.\n\nBy creating the Manchu liquor culture IP “Jiu Xiaoqi”, a 3D stamp-collection map, and a mobile sales-exhibition vehicle, the project reconstructs visitor routes and interactive experiences. It also integrates liquor products, agricultural goods, and cultural-creative derivatives under a unified visual system, enhancing brand recognition and consumer conversion efficiency. Using service design methodology as the framework, the project systematically plans from user experience and stakeholder relationships to the service blueprint, achieving integrated innovation in cultural dissemination, tourism interaction, and rural economic development.',
    // --- 图片上传分区 (WINE Project Assets) ---
    researchAssets: {
      // 05. 用户画像照片 (建议比例 2481:2768)
      personas: [
        'https://img.heliar.top/file/1774364331010_用户画像3个_画板_1_副本_2.jpg',
        'https://img.heliar.top/file/1774364336399_用户画像3个_画板_1_副本_3.jpg',
        'https://img.heliar.top/file/1774364343507_用户画像3个_画板_1_副本_4.jpg'
      ],
      // 06. 用户旅程图 (建议比例 3509:2481)
      userJourney: [
        'https://img.heliar.top/file/1774363479251_图2-6用户旅程图1.jpg',
        'https://img.heliar.top/file/1774363481914_图2-7用户旅程图2.jpg',
        'https://img.heliar.top/file/1774364296138_图2-8用户旅程图.3jpg.jpg'
      ],
      // 06. 其他服务设计图表
      diagrams: {
        blueprint: 'https://img.heliar.top/file/1774365718196_服务蓝图_1_.jpg',     // 服务蓝图 (建议比例 3134:2127)
      },
    },
    // --- 07. 最终产出物 (Standalone Sections) ---
    // INTERACTIVE MOCKUPS (建议比例 6828:3704 / 4002:2481)
    interactiveMockups: [
      { 
        title: "Exclusive IP Character 'Jiu Xiaoqi'", 
        subtitle: 'Interactive Mockups 01',
        description: 'Adopting royal style colors (bright yellow and royal blue) as the theme, it integrates Manchu Eight Banners culture with Aisin Gioro liquor culture. The image is both cute and majestic, suitable for all ages.',
        images: [
          'https://img.heliar.top/file/1774368513667_2_ip三视图.jpg',
          'https://img.heliar.top/file/1774368525424_3酒小旗对应售卖点动态设计.jpg'
        ],
        aspect: 'aspect-[6828/3704]',
        maxWidth: 'max-w-5xl'
      },
      { 
        title: '3D Foldable Stamp Map', 
        subtitle: 'Interactive Mockups 02',
        description: 'Upgrading the service of Banlashan Village scenic area, planning better tour routes for tourists, designing check-in points and stamps to enhance interactivity during the tour.',
        images: [
          'https://img.heliar.top/file/1774368210092_4.2印章打卡.jpg',
          'https://img.heliar.top/file/1774368211391_4.1路线规划.jpg',
          'https://img.heliar.top/file/1774368287295_3踩点印章打卡落地_new.jpg',
          'https://img.heliar.top/file/1774368249891_2.2细节排版.jpg'
        ],
        aspect: 'aspect-[4002/2481]',
        maxWidth: 'max-w-5xl'
      },
      { 
        title: 'Poster Display', 
        subtitle: 'Interactive Mockups 03',
        description: 'Displaying posters related to the Eight Banners wine collection, showcasing the integration of traditional culture and modern design.',
        images: [
          'https://img.heliar.top/file/1774442496309_0_画板_1_副本.jpg',
          'https://img.heliar.top/file/1774442501552_0-03.jpg'
        ],
        aspect: 'aspect-[3508/2481]',
        maxWidth: 'max-w-5xl'
      },
      { 
        title: '', 
        subtitle: '',
        description: '',
        images: [
          'https://img.heliar.top/file/1774442478917_0两张IP插画_画板_1_副本.jpg',
          'https://img.heliar.top/file/1774442481628_0两张IP插画_画板_1.jpg'
        ],
        aspect: 'aspect-[3508/4961]',
        maxWidth: 'max-w-md'
      },
      { 
        title: 'Cultural and Creative Models Display', 
        subtitle: 'Interactive Mockups 04',
        description: 'Displaying cultural creative models related to the Eight Banners wine collection.',
        images: [
          'https://img.heliar.top/file/1774368541616_文创站及细节模型.jpg',
          'https://img.heliar.top/file/1774368537001_酒品站及细节模型.jpg',
          'https://img.heliar.top/file/1774368548926_蔬果站及细节模型.jpg',
          'https://img.heliar.top/file/1774368564717_6IP＋文创站.jpg',
          'https://img.heliar.top/file/1774368557298_5IP＋酒品站.jpg',
          'https://img.heliar.top/file/1774368581442_4IP_蔬果站_new.jpg'
        ],
        aspect: 'aspect-video',
        maxWidth: 'max-w-5xl'
      }
    ],
    finishedProductDisplay: [
      'https://img.heliar.top/file/1774442550636_3.2.jpg',
      'https://img.heliar.top/file/1774442520575_1.1.jpg',
      'https://img.heliar.top/file/1774442561519_IP包装.jpg',
      'https://img.heliar.top/file/1774442556701_3123123123123.jpg',
      'https://img.heliar.top/file/1774442561395_酒包装全景.jpg',
      'https://img.heliar.top/file/1774442509810_02.jpg'
    ],
    image: 'https://img.heliar.top/file/1774365585173_图层_1.png',
    videoUrls: [
      'https://www.youtube.com/embed/v1xYe1Z6tB4',
      'https://www.youtube.com/embed/8u1TPgwXp98'
    ],
    type: 'image',
  },
  {
    id: 'd5',
    title: 'VIDEO DESIGN',
    category: 'DIGITAL MEDIA DESIGN',
    year: '2021-2023',
    description: 'Illustration, Motion Graphics Animation, UI and Collage Video',
    image: 'https://img.heliar.top/file/1774645944411_上擦大V个人访谈发货.png',
    videoSets: [
      {
        title: 'At Jimu, meet TA',
        subtitle: '获得2023时报金犊奖广告设计奖： 佳作奖以及优秀奖',
        urls: [
          'https://www.youtube.com/embed/04SBq9mDlUo'
        ]
      },
      {
        title: 'Frozen',
        subtitle: '获得第十七届中国好创意暨全国数字艺术设计大赛二等奖',
        urls: [
          'https://www.youtube.com/embed/q6KwpAC3Ce4'
        ]
      },
      {
        title: 'Two Tigers',
        subtitle: '获得2022未来设计师NCDA全国高校数字艺术大赛省级二等奖',
        urls: [
          'https://www.youtube.com/embed/Pf9Z1oUjjEM'
        ]
      },
      {
        title: 'WANDER',
        subtitle: '获得2021英国生态设计奖银奖',
        urls: [
          'https://www.youtube.com/embed/rbcI6kRW8Ic'
        ]
      }
    ],
    type: 'sticky',
  },
  {
    id: 'd6',
    title: 'NURSERY RHYME',
    category: 'DIGITAL MEDIA DESIGN',
    year: '2023',
    description: 'Modelling Apparatus',
    longDescription: '',
    image: 'https://img.heliar.top/file/1774360393419_图层_0.png', // Placeholder cover
    posterSets: [
      {
        title: 'INTERACTIVE DEVICE MOCKUP',
        images: [
          'https://img.heliar.top/file/1774359675327_untitled.390.jpg',
          'https://img.heliar.top/file/1774359679814_untitled.391.jpg',
          'https://img.heliar.top/file/1774359688146_untitled.408.jpg',
          'https://img.heliar.top/file/1774359688875_untitled.409.jpg'
        ],
        aspect: 'aspect-[2560/1600]',
        maxWidth: 'max-w-6xl'
      }
    ],
    type: 'framed',
  },
  {
    id: 'a1',
    title: 'COMING SOON',
    category: 'AIGC DESIGN · WAITING',
    year: '2026',
    description: 'Motion Poster Design',
    longDescription: '',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIHZpZXdCb3g9IjAgMCA4MDAgMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IiNlNWU1ZTUiLz4KICA8ZyBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ij4KICAgIDxsaW5lIHgxPSIwIiB5MT0iMTAwIiB4Mj0iODAwIiB5Mj0iMTAwIiAvPgogICAgPGxpbmUgeDE9IjAiIHkxPSIyMDAiIHgyPSI4MDAiIHkyPSIyMDAiIC8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjMwMCIgeDI9IjgwMCIgeTI9IjMwMCIgLz4KICAgIDxsaW5lIHgxPSIwIiB5MT0iNDAwIiB4Mj0iODAwIiB5Mj0iNDAwIiAvPgogICAgPGxpbmUgeDE9IjAiIHkxPSI1MDAiIHgyPSI4MDAiIHkyPSI1MDAiIC8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjYwMCIgeDI9IjgwMCIgeTI9IjYwMCIgLz4KICAgIDxsaW5lIHgxPSIwIiB5MT0iNzAwIiB4Mj0iODAwIiB5Mj0iNzAwIiAvPgogICAgPGxpbmUgeDE9IjAiIHkxPSI4MDAiIHgyPSI4MDAiIHkyPSI4MDAiIC8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjkwMCIgeDI9IjgwMCIgeTI9IjkwMCIgLz4KICAgIDxsaW5lIHgxPSIxMDAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSIyMDAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSIzMDAiIHkxPSIwIiB4Mj0iMzAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI0MDAiIHkxPSIwIiB4Mj0iNDAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI1MDAiIHkxPSIwIiB4Mj0iNTAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI2MDAiIHkxPSIwIiB4Mj0iNjAwIiB5Mj0iMTAwMCIgLz4KICAgIDxsaW5lIHgxPSI3MDAiIHkxPSIwIiB4Mj0iNzAwIiB5Mj0iMTAwMCIgLz4KICA8L2c+CiAgPHJlY3QgeD0iMTUwIiB5PSI0MDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogIDx0ZXh0IHg9IjQwMCIgeT0iNDkwIiBmYW50LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtc3R5bGU9Iml0YWxpYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjgiIGZpbGw9ImJsYWNrIj5DT01JTkcgU09PTjwvdGV4dD4KICA8dGV4dCB4PSI0MDAiIHk9IjU1MCIgZmFudC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMTIiIGZpbGw9IiM5OTkiPuaVrOivt+acn+W+hDwvdGV4dD4KPC9zdmc+',
    gallery: [],
    type: 'framed',
  }
];

// --- Components ---

const MenuItems = ({ className = "", onNavigate }: { className?: string; onNavigate?: (view: ViewState) => void }) => {
  const items: { label: string; view: ViewState; rotate: number; mt?: string }[] = [
    { label: 'home', view: 'home', rotate: -2 },
    { label: 'GRAPHIC DESIGN', view: 'GRAPHIC DESIGN', rotate: 1 },
    { label: 'DIGITAL MEDIA DESIGN', view: 'DIGITAL MEDIA DESIGN', rotate: -1 },
    { label: 'AIGC DESIGN · WAITING', view: 'AIGC DESIGN · WAITING', rotate: 2, mt: 'mt-[2px]' },
    { label: 'MY  PAGE', view: 'mypage', rotate: -1 },
  ];

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {items.map((item, i) => (
        <motion.button
          key={item.view}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
          style={{ rotate: item.rotate }}
          whileHover={{ 
            rotate: item.rotate * 5,
            scale: 1.1,
            x: 10,
            backgroundColor: '#e2f331',
            color: '#000',
            transition: { type: 'spring', stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate?.(item.view)}
          className={`px-4 py-1 border border-black rounded-full bg-white title-meta !text-[9px] hover:border-black transition-colors w-fit shadow-sm pointer-events-auto text-black uppercase ${item.mt || ''}`}
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  );
};

const Navbar = ({ onNavigate, currentView, onProjectClose, isProjectOpen }: { onNavigate?: (view: ViewState) => void; currentView: ViewState; onProjectClose?: () => void; isProjectOpen?: boolean }) => {
  const handleNavigate = (view: ViewState) => {
    onProjectClose?.();
    onNavigate?.(view);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[300] px-8 py-6 pointer-events-none">
      <div className="flex justify-between items-start w-full">
        {/* Left Menu */}
        <MenuItems onNavigate={handleNavigate} />

        <div className="flex gap-4 pointer-events-auto">
          {/* Top Right Logo Removed as per request */}
        </div>
      </div>
    </nav>
  );
};
// --- Components ---

const Book: React.FC<{ project: Project }> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pages = project.bookPages || [];
  const totalLeaves = Math.floor(pages.length / 2);

  const nextPage = () => {
    if (currentIndex < totalLeaves) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth * 0.95;
      const targetWidth = 146 * 2.0 * 2; 
      if (containerWidth < targetWidth) {
        setScale(containerWidth / targetWidth);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageWidth = 146 * 2.0 * scale; 
  const pageHeight = 206 * 2.0 * scale;

  // Calculate horizontal offset to keep the "visual center" of the book centered
  const xOffset = useMemo(() => {
    if (currentIndex === 0) return -pageWidth / 2;
    if (currentIndex === totalLeaves) return pageWidth / 2;
    return 0;
  }, [currentIndex, pageWidth, totalLeaves]);

  return (
    <div className="relative flex flex-col items-center justify-center py-20 select-none w-full overflow-visible">
      <div className="relative flex items-center justify-center w-full">
        <motion.div 
          className="relative preserve-3d group touch-none cursor-grab active:cursor-grabbing"
          animate={{ x: xOffset }}
          transition={{ type: 'spring', stiffness: 80, damping: 30 }}
          onPanEnd={(_, info) => {
            const swipeThreshold = 30;
            const velocityThreshold = 200;
            if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
              prevPage();
            } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
              nextPage();
            }
          }}
          style={{ 
            width: pageWidth * 2, 
            height: pageHeight,
            perspective: '3000px',
          }}
        >
          {/* Clickable areas */}
          <div className="absolute left-0 top-0 w-1/2 h-full z-[100] cursor-pointer" onClick={(e) => { e.stopPropagation(); prevPage(); }} />
          <div className="absolute right-0 top-0 w-1/2 h-full z-[100] cursor-pointer" onClick={(e) => { e.stopPropagation(); nextPage(); }} />

          {/* Book Base / Spine Shadow */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black/20 -translate-x-1/2 z-[50]" />

          {/* Flipping Leaves */}
          {[...Array(totalLeaves)].map((_, i) => {
            const isFlipped = i < currentIndex;
            const isFlipping = i === currentIndex || i === currentIndex - 1;
            
            // Stacking logic: flipping page should be on top
            const zIndex = isFlipping ? 100 : (isFlipped ? i : totalLeaves - i);
            
            return (
              <motion.div
                key={i}
                className="absolute inset-0 preserve-3d pointer-events-none"
                initial={false}
                animate={{ 
                  rotateY: isFlipped ? -180 : 0,
                  z: isFlipping ? 200 : (isFlipped ? i * 0.2 : (totalLeaves - i) * 0.2),
                  y: isFlipping ? -15 : 0,
                  scale: isFlipping ? 1.03 : 1,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 30, 
                  damping: 15,
                  mass: 2
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: '50%',
                  height: '100%',
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  zIndex: zIndex,
                }}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden overflow-hidden bg-white shadow-[-10px_0_20px_rgba(0,0,0,0.1)]">
                  <img 
                    src={pages[i * 2]} 
                    className="w-full h-full object-cover block" 
                    alt={`page ${i * 2}`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Page Shadow Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-black/20 pointer-events-none"
                    animate={{ opacity: isFlipped ? 0.4 : 0 }}
                  />
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 backface-hidden overflow-hidden bg-white shadow-[10px_0_20px_rgba(0,0,0,0.1)]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <img 
                    src={pages[i * 2 + 1]} 
                    className="w-full h-full object-cover block" 
                    alt={`page ${i * 2 + 1}`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Page Shadow Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-black/20 pointer-events-none"
                    animate={{ opacity: isFlipped ? 0 : 0.4 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {[...Array(totalLeaves + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-black' : 'w-2 bg-black/10 hover:bg-black/20'}`} 
            />
          ))}
        </div>
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-black/40">
          Swipe or click edges to flip pages
        </p>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, isLarge = false }: { title: string; subtitle?: string; isLarge?: boolean }) => (
  <div className="w-full max-w-screen-xl mx-auto px-8 md:px-20 mb-16 text-center">
    <div className="flex flex-col items-center gap-3">
      <h3 className={isLarge ? "title-section" : "title-section-small"}>{title}</h3>
      <div className="h-[2px] w-8 bg-black" />
      {subtitle && (
        <p className="title-meta mt-2">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const PosterFlip = ({ 
  title, 
  subtitle,
  footerNote,
  images, 
  hintText = "Click poster to flip", 
  nextText = "NEXT POSTER",
  aspect = "aspect-[3638/5102]",
  maxWidth = "max-w-sm",
  isLarge = false,
  hideHeader = false,
  noBackground = false,
  alwaysShowNext = true
}: { 
  title: string; 
  subtitle?: string;
  footerNote?: string;
  images: string[]; 
  hintText?: string; 
  nextText?: string; 
  aspect?: string;
  maxWidth?: string;
  isLarge?: boolean;
  hideHeader?: boolean;
  noBackground?: boolean;
  alwaysShowNext?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const posters = images;
  
  if (posters.length === 0) return null;

  const nextPoster = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  return (
    <div className={`w-full flex flex-col items-center ${noBackground ? '' : 'py-20 bg-white'}`}>
      {!hideHeader && <SectionHeader title={title} subtitle={subtitle} isLarge={isLarge} />}

      <div className={`relative w-full ${maxWidth} ${aspect} perspective-2000 group cursor-pointer`} onClick={nextPoster}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ 
              opacity: 1, 
              rotateY: 0, 
              rotateX: 0,
              x: 0,
              y: 0,
              scale: 1,
              zIndex: 10
            }}
            animate={{ 
              opacity: 1,
              rotateY: 0,
              rotateX: 0,
              x: 0,
              y: 0,
              scale: 1,
              zIndex: 10
            }}
            exit={{ 
              opacity: 0,
              rotateY: -20,
              rotateX: 20,
              x: -200,
              y: -300,
              scale: 0.9,
              transition: { 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1] 
              }
            }}
            className="absolute inset-0 w-full h-full rounded-sm overflow-hidden bg-white"
          >
            <img 
              src={posters[currentIndex]} 
              alt={`${title} ${currentIndex}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
        
        {/* Hint for next poster */}
        <div className={`absolute -right-24 md:-right-28 top-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-300`}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-black flex items-center justify-center bg-white shadow-md">
              <ChevronRight className="w-6 h-6 md:w-7 h-7" />
            </div>
            <span className="title-meta font-bold text-black whitespace-nowrap text-[10px] md:text-xs uppercase tracking-[0.2em]">{nextText}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {posters.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-black' : 'w-3 bg-black/10 hover:bg-black/20'}`} 
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="title-meta">
            {hintText}
          </p>
          {footerNote && (
            <p className="title-meta italic text-black/30 mt-2">
              {footerNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail = ({ project, onClose, onNavigate }: { project: Project; onClose: () => void; onNavigate?: (view: ViewState) => void }) => {
  const handleNavigate = (view: ViewState) => {
    onClose();
    onNavigate?.(view);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#e2f331] overflow-y-auto scrollbar-hide p-4 md:p-8"
    >
      <div className="w-full max-w-[1920px] mx-auto bg-white min-h-full relative shadow-2xl">
        {/* Header / Close Button only - Main Navbar will show through at z-[300] */}
        <div className="fixed top-4 md:top-8 right-4 md:right-8 z-[310] px-8 py-6 pointer-events-none">
          <div className="flex justify-end items-start w-full">
            <div className="flex gap-4 pointer-events-auto items-center">
              <motion.button
                onClick={onClose}
                className="p-2 bg-white border border-black rounded-full hover:bg-black/5 transition-colors shadow-sm"
                whileHover={{ rotate: 90 }}
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="w-full">
        {project.id === 'g5' || project.id === 'd5' || project.id === 'd6' ? (
          /* Section 1: Hero (Cover + Text) - Simplified Centered Layout for ADVERTISING DESIGN & VIDEO DESIGN */
          <div className="flex flex-col items-center pt-40 pb-20 px-8">
            <div className="max-w-4xl w-full text-center space-y-12">
              {/* Info */}
              <div className="space-y-6">
                <p className="title-meta">{project.category} / {project.year}</p>
                <h2 className="title-hero">
                  {project.title}
                </h2>
                <div className="h-px w-12 bg-black/20 mx-auto" />
                <p className="title-intro max-w-2xl mx-auto">
                  {project.description}
                </p>
              </div>

              {/* Long Description */}
              {project.longDescription && (
                <div className="max-w-2xl mx-auto text-center">
                  <p className="title-body">
                    {project.longDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Section 1: Hero (Cover + Text) - Side-by-side Layout for other projects */
          <div className={`${project.id === 'd2' ? 'max-w-screen-xl px-8 md:px-20' : (project.id === 'd3' ? 'max-w-full pl-4 md:pl-12 pr-4 md:pr-12' : 'max-w-screen-xl px-8 md:px-20')} mx-auto pt-40 pb-20`}>
            <div className={`flex flex-col md:flex-row-reverse items-center justify-center ${project.id === 'd2' ? 'gap-12 md:gap-20' : (project.id === 'd3' ? 'gap-0' : 'gap-12 md:gap-20')}`}>
              {/* Right Side: Info */}
              <div className={`w-full ${project.id === 'd2' ? 'md:w-[35%]' : (project.id === 'd3' ? 'md:w-[40%]' : 'md:w-1/2')} space-y-12`}>
                <div className="space-y-4">
                  <p className="title-meta">{project.category} / {project.year}</p>
                  <h2 className="title-hero">
                    {project.title}
                  </h2>
                </div>

                <div className="h-px w-12 bg-black/20" />

                <div className="space-y-6">
                  <p className="title-intro">
                    {project.description}
                  </p>
                  <p className="title-body">
                    {project.longDescription}
                  </p>
                </div>
              </div>

              {/* Left Side: Cover Image */}
              <div className={`w-full ${project.id === 'd2' ? 'md:w-[65%]' : (project.id === 'd3' ? 'md:w-[60%]' : 'md:w-1/2')} flex items-center justify-end`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`w-full ${project.id === 'd2' ? '' : (project.id === 'd3' ? 'aspect-video' : 'aspect-[4/5] md:aspect-[3/4]')} overflow-hidden bg-transparent flex items-center justify-end`}
                >
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full ${project.id === 'd2' ? 'h-auto object-cover' : (project.id === 'plant-manipulation' ? 'h-full object-cover' : (project.id === 'd3' ? 'h-full object-contain' : 'h-full object-contain'))} ${project.id === 'd3' ? '' : 'drop-shadow-2xl'}`} 
                      referrerPolicy="no-referrer" 
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${project.id === 'plant-manipulation' ? 'bg-transparent' : 'bg-black/5'} rounded-sm`}>
                      <p className="text-[10px] font-mono uppercase opacity-20 tracking-widest">No Main Image</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2+: Immersive Content (Gallery) */}
        <div className={`w-full ${project.id === 'd3' ? 'space-y-24 md:space-y-32' : 'space-y-20 md:space-y-40'} pb-40`}>
          {/* For FOUNTAIN 2023, we show the book as the first item in the gallery section */}
          {project.id === 'fountain-2023' && (
            <div className="w-full px-0">
              <SectionHeader title="BOOK INTERACTION" />
              <Book project={project} />
            </div>
          )}

          {/* For PLANT MANIPULATION, we show the poster flip */}
          {project.id === 'plant-manipulation' && (
            <div className="w-full px-0 space-y-0">
              <PosterFlip title="POSTER DISPLAY" images={project.bookPages || []} isLarge={false} />
              <PosterFlip 
                title="BOOK PAGE DISPLAY" 
                images={project.bookDetailPages || []} 
                hintText="Click book page to flip"
                nextText="NEXT PAGE"
                isLarge={false}
              />
            </div>
          )}

          {/* For THE ART OF ICE RECREATION CRAFT, we show horizontal poster flip */}
          {project.id === 'd2' && (
            <div className="w-full px-0">
              <PosterFlip 
                title="EXHIBITION DESIGN DISPLAY" 
                images={project.interactiveImages || []} 
                aspect="aspect-[9713/4500]"
                maxWidth="max-w-6xl"
                isLarge={false}
              />
            </div>
          )}

          {/* For EIGHT BANNERS WINE COLLECTION, we show the optimized Research Section */}
          {project.id === 'd3' && (
            <ResearchSection project={project} />
          )}

          {/* Render posterSets if they exist (e.g., for ADVERTISING DESIGN) */}
          {project.posterSets && project.posterSets.map((set, idx) => (
            <div key={idx} className="w-full px-0">
              <PosterFlip 
                title={set.title} 
                subtitle={set.subtitle}
                footerNote={set.footerNote}
                images={set.images} 
                isLarge={project.id === 'g5'}
                aspect={set.aspect}
                maxWidth={set.maxWidth}
              />
            </div>
          ))}

          {/* Render videoSets if they exist (e.g., for VIDEO DESIGN) */}
          {project.videoSets && project.videoSets.map((set, idx) => (
            <div key={idx} className="w-full py-20 bg-white">
              <div className="max-w-4xl mx-auto px-8 space-y-12">
                <SectionHeader title={set.title} subtitle={set.subtitle} isLarge={true} />
                <div className="flex flex-col gap-12">
                  {set.urls.map((url, vIdx) => (
                    <div key={vIdx} className="aspect-video w-full bg-black/5 rounded-sm overflow-hidden relative group">
                      <iframe 
                        src={url} 
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
                {set.footerNote && (
                  <p className="text-[10px] font-mono uppercase opacity-40 tracking-widest text-center">{set.footerNote}</p>
                )}
              </div>
            </div>
          ))}

          {/* Rest of the gallery - Simple Stack + Special Grid for Fountain */}
          <div className={`flex flex-col ${project.id === 'd3' ? 'gap-24 md:gap-32' : 'gap-20'} px-8 md:px-20 max-w-screen-xl mx-auto`}>
            {project.id === 'fountain-2023' ? (
              <>
                {/* First two images full width */}
                {project.gallery?.slice(0, 2).map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full overflow-hidden aspect-auto"
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} gallery ${idx}`} 
                      className="w-full h-auto transition-all duration-1000 rounded-sm" 
                      referrerPolicy="no-referrer" 
                    />
                  </motion.div>
                ))}
                
                {/* Last 4 images - 4 column grid with gray background */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto">
                  {project.gallery?.slice(2).map((img, idx) => (
                    <motion.div
                      key={idx + 2}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="w-full overflow-hidden bg-black/5 rounded-sm"
                    >
                      <img 
                        src={img} 
                        alt={`${project.title} detail ${idx}`} 
                        className="w-full h-auto object-contain" 
                        referrerPolicy="no-referrer" 
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {project.gallery?.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full overflow-hidden aspect-auto"
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} gallery ${idx}`} 
                      className="w-full h-auto transition-all duration-1000 rounded-sm" 
                      referrerPolicy="no-referrer" 
                    />
                  </motion.div>
                ))}
                {project.id === 'g4' && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    className="text-[10px] font-mono uppercase tracking-widest text-center -mt-10"
                  >
                    All product images are generated by AI
                  </motion.p>
                )}
              </>
            )}
          </div>

          {/* Render interactiveMockups if they exist */}
          {project.interactiveMockups && (
            <div className={`max-w-screen-xl mx-auto px-8 md:px-20 ${project.id === 'd3' ? 'space-y-24 md:space-y-32' : 'space-y-40'}`}>
              <div className="space-y-16">
                <div className={`${project.id === 'd3' ? 'space-y-24 md:space-y-32' : 'space-y-32'}`}>
                  {project.interactiveMockups.map((mockup, mIdx) => (
                    <div 
                      key={mIdx} 
                      className="space-y-16"
                    >
                      {mockup.title && (
                        <div className="flex flex-col items-center text-center space-y-6 border-b border-black/10 pb-12">
                          <div className="space-y-3">
                            <h3 className="title-section-small">{mockup.title}</h3>
                            <div className="h-[2px] w-8 bg-black mx-auto" />
                            <p className="title-meta">{mockup.subtitle || `Mockup / 0${mIdx + 1}`}</p>
                          </div>
                          {mockup.description && <p className="title-body max-w-2xl">{mockup.description}</p>}
                        </div>
                      )}
                      <div className={`w-full ${mockup.aspect} bg-black/[0.01] rounded-sm relative`}>
                        <PosterFlip 
                          images={mockup.images}
                          title={mockup.title}
                          aspect={mockup.aspect}
                          maxWidth={mockup.maxWidth || "max-w-5xl"}
                          hideHeader
                          noBackground
                          alwaysShowNext={true}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Render finishedProductDisplay if it exists */}
          {project.finishedProductDisplay && (
            <div className={`max-w-screen-xl mx-auto px-8 md:px-20 ${project.id === 'd3' ? 'space-y-24 md:space-y-32' : 'space-y-16'}`}>
              <SectionHeader title="FINISHED PRODUCT DISPLAY" subtitle="Final Deliverables" />
              <div className={`flex flex-col ${project.id === 'd3' ? 'gap-24 md:gap-32 items-center' : 'gap-20'}`}>
                <div className={`grid ${project.id === 'd3' ? 'gap-24 md:gap-32 grid-cols-1 max-w-5xl' : 'gap-8 grid-cols-1 md:grid-cols-2 w-full'}`}>
                  {project.finishedProductDisplay.map((img, idx) => (
                    <div key={idx} className={`w-full bg-black/5 rounded-sm overflow-hidden ${project.id === 'd3' ? 'aspect-auto' : 'aspect-video'}`}>
                      <img 
                        src={img} 
                        alt={`Finished Product ${idx}`} 
                        className={`w-full h-auto ${project.id === 'd3' ? 'object-contain' : 'object-cover'}`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(project.videoUrl || (project.videoUrls && project.videoUrls.length > 0)) && (
            <div className="max-w-screen-xl mx-auto px-8 md:px-20">
              <div className={`${project.id === 'd3' ? 'space-y-24 md:space-y-32' : 'space-y-12'}`}>
                <SectionHeader title="VIDEO PRESENTATION" />
                
                <div className={`flex flex-col ${project.id === 'd3' ? 'gap-24 md:gap-32' : 'gap-12'}`}>
                  {/* Single videoUrl */}
                  {project.videoUrl && (
                    <div className="aspect-video w-full bg-black/5 rounded-sm overflow-hidden relative group">
                      <iframe 
                        src={project.videoUrl} 
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                  
                  {/* Multiple videoUrls */}
                  {project.videoUrls?.map((url, idx) => (
                    <div key={idx} className="aspect-video w-full bg-black/5 rounded-sm overflow-hidden relative group">
                      {url ? (
                        <iframe 
                          src={url} 
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                          <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-black border-b-[10px] border-b-transparent ml-1" />
                          </div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-black/40">Video Link {idx + 1} Placeholder</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Components ---

const ResearchSection = ({ project }: { project: Project }) => {
  const assets = project.researchAssets;
  if (!assets) return null;

  return (
    <div className={`w-full ${project.id === 'd3' ? 'space-y-24 md:space-y-32' : 'space-y-40 md:space-y-64'} bg-white text-black`}>
      {/* 01. Context Analysis - Vertical Layout */}
      <section className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="space-y-24 md:space-y-32">
          <div className="space-y-8 text-center flex flex-col items-center">
            <div className="space-y-3">
              <h3 className="title-section-small">Context Analysis</h3>
              <div className="h-[2px] w-8 bg-black mx-auto" />
              <p className="text-[10px] font-mono tracking-[0.5em] text-black/30 uppercase">01 / Context Analysis</p>
            </div>
            <p className="text-xs leading-relaxed text-black/60 font-sans max-w-2xl mx-auto">
              Banlashan Village is located in Faku County, Shenyang, Liaoning Province, with a rich Manchu cultural heritage.<br/>
              This project aims to build a "Digital Cultural IP Integrated Design" service system through service design thinking, exploring new paths for the integration of rural cultural tourism and industry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5">
            {[
              { title: 'Natural Environment', en: 'Natural Environment', content: 'Banlashan Village is located 10 km west of Dagu Jiazi Town, Faku County, Shenyang. It has convenient transportation, a beautiful environment, and rich resources. The village area is 11 sq km with a population of 1,132, maintaining a complete Manchu architectural style.' },
              { title: 'Cultural Heritage', en: 'Cultural Heritage', content: 'Banlashan Village has a long history and rich cultural heritage, inheriting Manchu culture, liquor brewing techniques, folk songs, and dances. The tourism resources centered on liquor culture are quite abundant.' },
              { title: 'Aroma', en: 'Aroma', content: 'The Aisin Gioro Royal Museum was rated as a national AAAA-level tourist attraction in 2017. Entering the wine cellar, you can smell the pure and elegant aroma of liquor, which is rich and refreshing.' },
              { title: 'Brand Pain Points', en: 'Pain Points', content: 'Short development time for tourism leads to insufficient management planning, low publicity, lack of a systematic IP image, and incomplete brand identity.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 space-y-6 hover:bg-[#f2f7b8] transition-colors cursor-default">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-sans font-bold">{item.title}</h4>
                  <span className="text-[10px] font-mono opacity-20">0{i+1}</span>
                </div>
                <p className="text-[9px] font-mono opacity-30 uppercase tracking-widest">{item.en}</p>
                <p className="text-xs leading-relaxed text-black/60 font-sans">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Insights & Solutions - Editorial Layout */}
      <section className="max-w-screen-xl mx-auto px-8 md:px-20">
        <div className="space-y-24 md:space-y-32">
          {/* Solutions */}
          <div className="flex flex-col items-center text-center space-y-24 md:space-y-32">
            <div className="space-y-3">
              <h3 className="title-section-small">Strategic Solutions</h3>
              <div className="h-[2px] w-8 bg-black mx-auto" />
              <p className="title-meta">Strategy</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { t: 'Stall Management', c: 'Plan sales areas for similar farmers to provide unified selling points, facilitating management.' },
                  { t: 'Product Upgrade', c: 'Deep processing of agricultural products, unified individual sales of liquor products, and unified sales of IP-derived cultural products.' },
                  { t: 'Information Service', c: 'Increase publicity and create personal IPs for farmers through vehicle design to form a brand effect.' },
                  { t: 'Overall Planning', c: 'Strengthen communication between government managers and farmers to assist in product sales and expand scale.' }
                ].map((item, i) => (
                  <div key={i} className="p-10 border border-black/10 rounded-sm bg-white hover:bg-[#f2f7b8] text-black group transition-all duration-500 text-left cursor-default">
                    <h4 className="title-card mb-4 group-hover:text-black text-black">{item.t}</h4>
                    <p className="title-card-desc group-hover:text-black/60 text-black/50 leading-relaxed">{item.c}</p>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 text-left lg:pl-12 space-y-6">
                <p className="title-body">Based on service design methodology, we proposed systematic solutions from four dimensions: management, product, service, and planning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03.5 IP & Vehicle Functions - Technical Specs */}
      <section className="w-full bg-[#f2f7b8] py-40 text-black">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 md:gap-32">
            <div className="space-y-24 md:space-y-32">
              <div className="space-y-3 flex flex-col items-start">
                <h4 className="title-section-small">Main Functions of Manchu Liquor Culture IP</h4>
                <div className="h-[2px] w-8 bg-black" />
                <p className="title-meta">IP Functions</p>
              </div>
              <div className="space-y-8">
                {[
                  { t: 'Navigation', c: 'Guide tourists around the scenic area and learn about the Aisin Gioro liquor production process.' },
                  { t: 'Interaction', c: 'Create stamp-collecting activities to increase interactivity.' },
                  { t: 'Traffic Conversion', c: 'Drive traffic to Banlashan Village, encouraging tourists to taste fine wines and promoting sales of liquor and agricultural products.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 items-start border-b border-black/10 pb-8">
                    <span className="text-xl font-mono text-black/20">0{i+1}</span>
                    <div className="space-y-2">
                      <h5 className="title-card">{item.t}</h5>
                      <p className="title-card-desc">{item.c}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-3 flex flex-col items-start">
                <h4 className="title-section-small">Main Functions of Mobile Sales Vehicle</h4>
                <div className="h-[2px] w-8 bg-black" />
                <p className="title-meta">Vehicle Functions</p>
              </div>
              <div className="space-y-8">
                {[
                  { t: 'Display & Sales', c: 'Display and sell local specialty agricultural products, such as shrimp rice, liquor, and apples.' },
                  { t: 'Branding', c: 'Create personal IPs for farmers through vehicle design to form a brand effect.' },
                  { t: 'Flexible Deployment', c: 'Can be moved according to site planning, facilitating display and sales for farmers.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 items-start border-b border-black/10 pb-8">
                    <span className="text-xl font-mono text-black/20">0{i+1}</span>
                    <div className="space-y-2">
                      <h5 className="title-card">{item.t}</h5>
                      <p className="title-card-desc">{item.c}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. User Research & Data - Clean Data Grid */}
      <section className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="space-y-24">
          <div className="flex flex-col items-center text-center space-y-6 border-b border-black pb-12">
            <div className="space-y-3">
              <h3 className="title-section-small">Research & Survey</h3>
              <div className="h-[2px] w-8 bg-black mx-auto" />
              <p className="title-meta">Research Data</p>
            </div>
            <p className="title-meta opacity-40">Quantitative Analysis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-black/5">
            {[
              { label: 'Gender Ratio', val: '54.9% Male / 45.1% Female' },
              { label: 'Core Age Group', val: '18-28 years old (57.84%)' },
              { label: 'Primary Occupation', val: 'Student (55.88%)' },
              { label: 'Travel Preference', val: 'With friends (50%)' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-12 space-y-4 text-center">
                <p className="title-meta opacity-30">{stat.label}</p>
                <p className="title-card">{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <h4 className="title-meta font-bold border-l-4 border-black pl-6">Most Interested Sales Format</h4>
              <div className="space-y-8">
                {[
                  { label: 'Mobile Sales Vehicle', p: 38.71 },
                  { label: 'Specialty Store', p: 31.38 },
                  { label: 'Street Stall', p: 23.04 },
                  { label: 'Personal Selling', p: 6.87 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between title-meta">
                      <span className="opacity-60">{item.label}</span>
                      <span className="font-bold">{item.p}%</span>
                    </div>
                    <div className="h-[2px] bg-black/5 w-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.p}%` }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              <h4 className="title-meta font-bold border-l-4 border-black pl-6">Most Interested Product Category</h4>
              <div className="space-y-8">
                {[
                  { label: 'Handicrafts', p: 55.88 },
                  { label: 'Specialty Liquor', p: 27.45 },
                  { label: 'Organic Vegetables', p: 11.76 },
                  { label: 'Grain', p: 4.9 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between title-meta">
                      <span className="opacity-60">{item.label}</span>
                      <span className="font-bold">{item.p}%</span>
                    </div>
                    <div className="h-[2px] bg-black/5 w-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.p}%` }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Personas - Luxury Profile Cards */}
      <section className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="space-y-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-3">
              <h3 className="title-section-small">User Personas</h3>
              <div className="h-[2px] w-8 bg-black mx-auto" />
              <p className="title-meta">Personas</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Zhang Banla', age: 21, role: 'Student', desc: 'Energetic, quick to accept information, and loves experiencing new things.', tag: 'Student', color: 'bg-blue-50', img: assets.personas[0] },
              { name: 'Li Jiazi', age: 35, role: 'Married Workaholic', desc: 'Often lives under high pressure, longing for a way to relieve stress and accompany family.', tag: 'Elite', color: 'bg-orange-50', img: assets.personas[1] },
              { name: 'Wang Dagu', age: 65, role: 'Retired Traveler', desc: 'Has always loved traveling; considering age and health, wants to enrich retirement with short trips.', tag: 'Senior', color: 'bg-green-50', img: assets.personas[2] }
            ].map((p, i) => (
              <div key={i} className={`group relative p-12 transition-all duration-700 overflow-hidden`}>
                <div className="relative space-y-10">
                  <div className="space-y-6">
                    <div className="aspect-[2481/2768] w-full bg-black/5 overflow-hidden rounded-sm">
                      <img 
                         src={p.img} 
                         alt={p.name} 
                         className="w-full h-full object-cover transition-all duration-700"
                         referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-4">
                      <span className="px-3 py-1 bg-black text-white title-meta !text-[9px]">{p.tag}</span>
                      <div className="space-y-1">
                        <h4 className="title-section-small">{p.name}</h4>
                        <p className="title-meta opacity-40">{p.role} / {p.age}岁</p>
                      </div>
                    </div>
                  </div>
                  <p className="title-intro">"{p.desc}"</p>
                  <div className="pt-10 border-t border-black/10 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between title-meta opacity-40">
                        <span>Tech Savvy</span>
                        <span>{i === 0 ? '90%' : (i === 1 ? '70%' : '30%')}</span>
                      </div>
                      <div className="h-px bg-black/5 w-full">
                        <div className="h-full bg-black" style={{ width: i === 0 ? '90%' : (i === 1 ? '70%' : '30%') }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. Service Design Diagrams - Immersive Display */}
      <section className="max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="space-y-40">
          {/* User Journey Map with Interactive Flip */}
          <div className="space-y-16">
            <div className="flex flex-col items-center text-center space-y-6 border-b border-black/10 pb-12">
              <div className="space-y-3">
                <h3 className="title-section-small">User Journey Map</h3>
                <div className="h-[2px] w-8 bg-black mx-auto" />
                <p className="title-meta">Diagram / 01</p>
              </div>
            </div>
            <div className="w-full max-w-5xl mx-auto aspect-[3509/2481] bg-black/[0.01] rounded-sm relative">
              <PosterFlip 
                images={assets.userJourney}
                title="User Journey Analysis"
                aspect="aspect-[3509/2481]"
                maxWidth="max-w-5xl"
                hideHeader
                noBackground
                alwaysShowNext={true}
              />
            </div>
          </div>

          {assets.diagrams.blueprint && (
            <div className="space-y-16">
              <div className="flex flex-col items-center text-center space-y-6 border-b border-black/10 pb-12">
                <div className="space-y-3">
                  <h3 className="title-section-small">Service Blueprint</h3>
                  <div className="h-[2px] w-8 bg-black mx-auto" />
                  <p className="title-meta">Diagram / 02</p>
                </div>
              </div>
              <div className="w-full max-w-5xl mx-auto aspect-[3134/2127] bg-black/[0.01] rounded-sm overflow-hidden">
                <img 
                  src={assets.diagrams.blueprint} 
                  alt="Service Blueprint" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const CategoryView = ({ category, onSelect }: { category: string; onSelect: (p: Project) => void }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const filteredProjects = PROJECTS.filter(p => p.category === category).sort((a, b) => parseInt(b.year) - parseInt(a.year));
  
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 pt-24 bg-[#e2f331] text-black overflow-y-auto z-[80]"
    >
      {/* Portfolio Subtitle - Scrolls away */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 z-[10] pointer-events-auto cursor-pointer">
        <h1 className="text-lg font-mono italic tracking-[0.4em] uppercase text-black">
          Portfolio
        </h1>
      </div>
      <div className="w-full max-w-[1920px] mx-auto flex flex-col">
        {/* Grid Container with vertical dashed lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t-2 border-black bg-white">
          {paginatedProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`relative group cursor-pointer flex flex-col border-b-2 border-black ${
                idx % 4 !== 3 ? 'lg:border-r-4 lg:border-dashed lg:border-black' : ''
              } ${
                idx % 2 !== 1 ? 'md:border-r-4 md:border-dashed md:border-black lg:border-r-0' : ''
              } lg:border-r-4 lg:border-dashed lg:border-black`}
              onClick={() => onSelect(project)}
            >
              {/* Image Section */}
              <div className={`aspect-square overflow-hidden bg-white relative ${category === 'DIGITAL MEDIA DESIGN' && project.id === 'd2' ? 'p-4' : 'p-10'}`}>
                <img 
                  src={project.thumbnail || project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badges from reference */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {idx % 3 === 0 && project.id !== 'fountain-2023' && project.id !== 'plant-manipulation' && project.id !== 'd5' && (
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#f39c12]">
                        <path d="M50 0 L54 35 L85 15 L65 45 L100 50 L65 55 L85 85 L54 65 L50 100 L46 65 L15 85 L35 55 L0 50 L35 45 L15 15 L46 35 Z" />
                      </svg>
                      <span className="relative text-[9px] font-black text-white uppercase tracking-tighter">new</span>
                    </div>
                  )}
                  {((idx % 2 === 0 && project.id !== 'g1' && project.id !== 'fountain-2023' && project.id !== 'plant-manipulation' && project.id !== 'd6' && project.id !== 'a1' && project.id !== 'd2') || project.id === 'd5' || project.id === 'd3') && (
                    <div className="flex flex-col items-center gap-0">
                      <div className="bg-[#a67c52] p-1 rounded-sm">
                        <Award size={18} className="text-white" />
                      </div>
                      <span className="bg-[#a67c52] text-white text-[8px] px-1 font-bold uppercase leading-tight">Award</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Section - Multiple lines separated by solid lines */}
              <div className="flex flex-col bg-white">
                <div className="px-6 py-4 border-t-2 border-black min-h-[3.5rem] flex items-center title-card">
                  {project.title}
                </div>
                <div className="px-6 py-4 border-t-2 border-black min-h-[3.5rem] flex items-center title-card-desc">
                  {project.description}
                </div>
                <div className="px-6 py-4 border-t-2 border-black title-card">
                  {project.year}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Fill empty grid cells to maintain dashed lines */}
          {Array.from({ length: (4 - (paginatedProjects.length % 4)) % 4 }).map((_, i) => (
            <div key={`empty-${i}`} className="hidden lg:block border-b-2 border-black border-r-4 border-dashed border-black bg-white" />
          ))}
        </div>

        {/* Pagination & Footer */}
        <div className="bg-[#e2f331] p-8 space-y-8 border-t-2 border-black pb-32">
          {/* Page Indicator */}
          <div className="flex justify-center gap-4 mb-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-8 h-8 flex items-center justify-center font-bold text-sm transition-colors ${i === currentPage ? 'bg-black text-white' : 'bg-white text-black hover:bg-black/10 border border-black'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Footer Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 border border-black rounded-2xl text-[10px] font-mono leading-relaxed space-y-1 shadow-sm flex flex-col items-center justify-center text-center">
              <p className="font-bold">LUCAI</p>
              <p>Visual & Digital Designer</p>
              <p>Based in CHINA and UK</p>
            </div>
            <div className="bg-white p-6 border border-black rounded-2xl text-[10px] font-mono leading-relaxed shadow-sm flex flex-col items-center justify-center text-center">
              <p>Focus on visual research,</p>
              <p>image construction, and social narratives</p>
            </div>
            <div className="bg-white p-6 border border-black rounded-2xl text-[10px] font-mono leading-relaxed shadow-sm flex flex-col items-center justify-center text-center">
              <p>With visual design at its core, our design practice integrates imagery, moving images, 3D modelling</p>
              <p>and cross-media approaches</p>
            </div>
            <div className="bg-white p-6 border border-black rounded-2xl text-[10px] font-mono flex items-center justify-center text-center shadow-sm">
              <p>Email: cailu738593418@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Fixed positions for home page to match reference image exactly
const FIXED_POSITIONS: Record<string, { x: number; y: number; z: number; rotate: number; scale: number; width?: number; height?: number; borderRadius?: string; backgroundColor?: string }> = {
  'g5': { x: -500, y: -350, z: 20, rotate: -15, scale: 0.8, width: 220, height: 220 },      // Top Left
  'g4': { x: 550, y: -380, z: 40, rotate: 10, scale: 0.8, width: 280, height: 280 },        // Top Right (Shrink)
  'fountain-2023': { x: 0, y: -420, z: 60, rotate: -5, scale: 0.9, width: 240, height: 240 }, // Top Mid
  'd3': { x: -650, y: 0, z: 30, rotate: 5, scale: 0.9, width: 300, height: 300 },           // Mid Left (Shrink)
  'plant-manipulation': { x: 0, y: 0, z: 50, rotate: 0, scale: 0.9, width: 260, height: 260 }, // Center (Shrink)
  'd2': { x: 650, y: 80, z: 70, rotate: -10, scale: 1.0, width: 240, height: 240 },         // Mid Right
  'g1': { x: -550, y: 380, z: 10, rotate: 15, scale: 0.9, width: 220, height: 220 },        // Bot Left
  'd6': { x: 0, y: 450, z: 15, rotate: -8, scale: 0.8, width: 260, height: 260 },          // Bot Mid (Shrink)
  'd5': { x: 550, y: 400, z: 25, rotate: 12, scale: 0.8, width: 220, height: 220 },         // Bot Right
  'a1': { x: -300, y: -200, z: 5, rotate: -20, scale: 0.7, width: 180, height: 180 },       // Staggered
};

// Helper to get position for home page
const getProjectPos = (id: string) => {
  if (FIXED_POSITIONS[id]) {
    return FIXED_POSITIONS[id];
  }
  
  // Fallback to seeded random if ID not in fixed list
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  return {
    x: (random(seed) - 0.5) * 1400,
    y: (random(seed + 1) - 0.5) * 900,
    z: random(seed + 2) * 100,
    rotate: (random(seed + 3) - 0.5) * 60,
    scale: 0.4 + random(seed + 4) * 0.8,
    width: 256,
    height: 192,
    backgroundColor: 'transparent'
  };
};

const ArtworkCard: React.FC<{ project: Project; onSelect: (p: Project) => void }> = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pos = getProjectPos(project.id);

  const renderContent = () => {
    return (
      <div 
        className="w-full h-full flex items-center justify-center overflow-visible transition-all duration-300"
        style={{ 
          borderRadius: pos.borderRadius || '0px',
          backgroundColor: pos.backgroundColor || 'transparent',
          padding: pos.backgroundColor ? '12px' : '0px'
        }}
      >
        <img 
          src={project.thumbnail || project.image} 
          alt={project.title} 
          className="w-full h-full object-contain drop-shadow-2xl" 
          referrerPolicy="no-referrer" 
        />
      </div>
    );
  };

  return (
    <motion.div
      style={{
        x: pos.x,
        y: pos.y,
        z: pos.z,
        rotateZ: pos.rotate,
        scale: pos.scale,
        width: pos.width || 256,
        height: pos.height || 192,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: pos.scale }}
      whileHover={{ 
        z: pos.z + 50, 
        scale: pos.scale * 1.05,
        rotateZ: pos.rotate * 0.8, // Slight rotation adjustment on hover
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="absolute cursor-pointer overflow-visible group"
    >
      {renderContent()}
    </motion.div>
  );
};

// --- Components ---

const UploadView = () => {
  const [spreads, setSpreads] = useState<string[]>(() => {
    const saved = localStorage.getItem('fountain-2023-book-spreads');
    if (saved) return JSON.parse(saved);
    return Array(13).fill('');
  });
  const [showPreview, setShowPreview] = useState(false);

  const fountainProject = PROJECTS.find(p => p.id === 'fountain-2023')!;

  const handleUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSpreads = [...spreads];
        newSpreads[index] = reader.result as string;
        setSpreads(newSpreads);
        localStorage.setItem('fountain-2023-book-spreads', JSON.stringify(newSpreads));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAll = () => {
    if (window.confirm('Clear all uploaded book spreads?')) {
      localStorage.removeItem('fountain-2023-book-spreads');
      window.location.reload();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 pt-32 pb-20 bg-zinc-50 overflow-y-auto z-[80]"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12 border-b border-black pb-6">
          <div>
            <h2 className="text-4xl font-display font-bold tracking-tighter uppercase">Spread Manager</h2>
            <p className="text-sm font-mono text-black/40 mt-2">PROJECT: FOUNTAIN 2023 / 13 SPREADS TOTAL (LANDSCAPE)</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className={`px-6 py-2 border border-black rounded-full text-[10px] font-mono uppercase transition-all ${showPreview ? 'bg-black text-white' : 'hover:bg-black/5'}`}
            >
              {showPreview ? 'Close Preview' : 'Preview Book'}
            </button>
            <button 
              onClick={clearAll}
              className="px-6 py-2 border border-black rounded-full text-[10px] font-mono uppercase hover:bg-black hover:text-white transition-all"
            >
              Reset to Default
            </button>
          </div>
        </div>

        {showPreview ? (
          <div className="bg-white rounded-3xl border border-black/10 p-12 mb-12 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-display italic">Live Interactive Preview</h3>
              <p className="text-[10px] font-mono text-black/40 uppercase">Drag or click to flip spreads</p>
            </div>
            <div className="scale-75 origin-top">
              <Book project={fountainProject} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spreads.map((img, i) => (
              <div key={i} className="group relative aspect-video bg-white border border-black/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-mono w-6 h-6 flex items-center justify-center rounded-full">
                  {i + 1}
                </div>
                
                {img ? (
                  <img src={img} className="w-full h-full object-cover" alt={`Spread ${i+1}`} referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <Upload className="w-8 h-8 mb-2 text-black/20" />
                    <p className="text-[10px] font-mono uppercase text-black/40">Empty Spread Slot</p>
                  </div>
                )}

                <label className="absolute inset-0 cursor-pointer bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleUpload(i, e)}
                  />
                  <span className="px-4 py-2 bg-white text-black text-[10px] font-mono uppercase rounded-full shadow-lg">
                    {img ? 'Replace Spread' : 'Upload Spread'}
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 p-8 bg-black text-white rounded-2xl">
          <h3 className="text-xl font-display mb-4 italic">Instructions</h3>
          <ul className="text-xs font-mono space-y-2 opacity-70">
            <li>• UPLOAD 13 LANDSCAPE IMAGES (ONE FOR EACH SPREAD).</li>
            <li>• EACH IMAGE WILL BE AUTOMATICALLY SPLIT INTO LEFT AND RIGHT PAGES.</li>
            <li>• RECOMMENDED RATIO: 3:2 OR 16:10 (LANDSCAPE).</li>
            <li>• THIS FIXES THE "3-PAGE" CLIPPING ISSUE BY TREATING SPREADS AS COHESIVE UNITS.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const MyPage = () => {
  const [profileImage, setProfileImage] = useState("https://img.heliar.top/file/1774637258687_1.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const timeline = [
    { date: '2025.11 - 2026.03', title: 'Overseas Art & Design Practice；The Glasgow School of Art', type: 'project', desc: 'Master\'s degree in Communication Design (QS 100；QS Art 8).' },
    { date: '2025.08 - 2025.09', title: 'Xinhua Daily Media — Video Production', type: 'work', desc: 'Oversaw digital video production and developed standardized motion visual systems.' },
    { date: '2025.07 - 2025.08', title: 'Nanjing TV — Illustration Designer', type: 'work', desc: 'Led visual design for news media, improved efficiency by 40% using AIGC tools.' },
    { date: '2024.09 - 2026.07', title: 'The Glasgow School of Art', type: 'edu', desc: 'Master\'s degree in Communication Design (QS 100；QS Art 8).' },
    { date: '2024.01 - 2024.06', title: 'Graduation Project – Ice Play Artefacts', type: 'project', desc: 'Visual redesign of intangible cultural heritage using Midjourney & Stable Diffusion.' },
    { date: '2022.11 - 2022.12', title: 'Rural Revitalisation Service Design', type: 'project', desc: 'Contributed to Banlashan Village project using AI design tools for IP character concepts.' },
    { date: '2022.08 - 2023.11', title: 'Cross-Media Social Issue Project', type: 'project', desc: 'Explored relationship between objects and ecology through book design and installation.' },
    { date: '2021.03 - 2022.03', title: 'Independent Media Illustrator / Designer', type: 'work', desc: 'Managed personal design channels across Xiaohongshu, Weibo, and Douyin, achieving over 65K likes, with a single post reaching 21K likes, 20K comments, and 5.61M views.' },
    { date: '2020.09 - 2024.06', title: 'Luxun Academy of Fine Arts', type: 'edu', desc: 'Bachelor\'s degree in Digital Media Art (China Top 8 Fine Arts Academies)' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 pt-24 bg-[#e2f331] text-black overflow-y-auto scroll-smooth z-[90]"
    >
      {/* Portfolio Subtitle - Scrolls away */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 z-[10] pointer-events-auto cursor-pointer">
        <h1 className="text-lg font-mono italic tracking-[0.4em] uppercase text-black">
          Portfolio
        </h1>
      </div>
      <div className="w-full max-w-[1920px] mx-auto bg-white border-t-2 border-black min-h-screen">
        <div className="max-w-screen-xl mx-auto px-8 md:px-20 py-24 space-y-24">
        {/* Header Section */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="aspect-[3/4] bg-black/5 overflow-hidden rounded-sm transition-all duration-700 shadow-2xl relative group"
            >
              <img 
                src={profileImage} 
                alt="Cailu" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                referrerPolicy="no-referrer"
                onClick={handleImageClick}
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
            </motion.div>
          </div>
          <div className="md:col-span-8 space-y-8 pb-4">
            <div className="space-y-2">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-7xl md:text-9xl font-display font-bold tracking-tighter uppercase leading-none"
              >
                蔡露<span className="text-2xl md:text-4xl ml-4 opacity-50 font-mono tracking-[0.3em]">（LU CAI）</span>
              </motion.h2>
              <p className="text-sm md:text-lg font-mono tracking-[0.3em] text-black/40 uppercase">Communication Designer / Digital Media Artist</p>
            </div>
            <div className="flex flex-wrap gap-8 text-[10px] font-mono uppercase tracking-widest text-black/60">
              <div className="flex items-center gap-2"><Mail size={12} /> cailu738593418@gmail.com</div>
              <div className="flex items-center gap-2"><Phone size={12} /> 13914596879</div>
              <div className="flex items-center gap-2"><Calendar size={12} /> 2001.06.21</div>
              <div className="flex items-center gap-2"><MapPin size={12} /> 江苏省镇江市</div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Left Column: Skills & Awards */}
          <div className="md:col-span-5 space-y-20">
            {/* Skills */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <Star className="text-[#e2f331] fill-[#e2f331]" size={20} />
                <h3 className="text-[10px] font-mono tracking-[0.5em] uppercase text-black/30">Technical Skills</h3>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'AI / ID / PS / AE / PROCREAT / CHATGPT / GEMINI', value: 100 },
                  { label: 'PR / MIDJOURNEY / 即梦 / TAPNOW', value: 80 },
                  { label: 'NOMAND / C4D / XD / LR / LOVART', value: 50 },
                ].map((skill) => (
                  <div key={skill.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                      <span>{skill.label}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="h-1 bg-black/5 w-full rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 text-[11px] font-mono uppercase tracking-wider text-black/60">
                <p>English: IELTS 5.5 (Speaking 6.5), PTE 66</p>
              </div>
            </section>

            {/* Awards */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <Award className="text-black" size={20} />
                <h3 className="text-[10px] font-mono tracking-[0.5em] uppercase text-black/30">Awards (30+)</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  '校三等奖学金及三好学生',
                  '辽宁省文创赛：铜奖',
                  '中国银行IP形象设计大赛：优秀奖',
                  '香港大学生当代设计奖：优秀奖',
                  '未来设计师NCDA数字艺术大赛：二等奖 (x2)',
                  '中国好创意暨全国数字艺术设计大赛：二等奖',
                  '全国大学生广告艺术大赛：一等奖 (x2)',
                  '时报金犊奖广告设计奖：佳作奖/优秀奖 (x3)',
                  'CADA日本概念艺术设计奖：三等奖 (x2)',
                  '中英国际创意大赛：铜奖',
                  '米兰设计周：三等奖',
                  '香港数字艺术设计大赛：二等奖',
                  '第七届“包豪斯”奖国际设计大赛：银奖',
                  '英国生态设计奖：银奖',
                ].map((award, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 border border-black/5 rounded-sm hover:bg-[#e2f331] transition-colors"
                  >
                    <span className="text-[10px] font-mono text-black/20">0{i+1}</span>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-black/70">{award}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Hobbies */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <Heart className="text-red-400 fill-red-400" size={20} />
                <h3 className="text-[10px] font-mono tracking-[0.5em] uppercase text-black/30">Hobbies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Photography', 'Korean Language', 'Psychology', 'Handcraft', 'Material Making'].map((hobby) => (
                  <span key={hobby} className="px-4 py-2 bg-black/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-black/60">
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Timeline */}
          <div className="md:col-span-7 space-y-20">
            <section className="space-y-12">
              <div className="flex items-center gap-4">
                <BookOpen className="text-black" size={20} />
                <h3 className="text-[10px] font-mono tracking-[0.5em] uppercase text-black/30">Journey & Timeline</h3>
              </div>
              
              <div className="relative border-l border-black/10 ml-4 pl-8 space-y-12">
                {timeline.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                      item.type === 'edu' ? 'bg-blue-400' : 
                      item.type === 'work' ? 'bg-orange-400' : 'bg-green-400'
                    }`} />
                    
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-black/30 tracking-widest">{item.date}</span>
                      <h4 className="text-xl font-bold uppercase tracking-tighter">{item.title}</h4>
                      <p className="text-sm text-black/60 leading-relaxed font-sans italic">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Bottom Yellow Bar */}
      <div className="w-full h-24 bg-[#e2f331] border-t-2 border-black" />
    </div>
  </motion.div>
);
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<ViewState>('home');
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { stiffness: 60, damping: 25, mass: 1 };
  
  // Create smooth movement based on mouse position
  // We transform the mouse position (-0.5 to 0.5) to a movement range (e.g., -400 to 400)
  const smoothX = useSpring(useTransform(mouseX, [-0.5, 0.5], [400, -400]), springConfig);
  const smoothY = useSpring(useTransform(mouseY, [-0.5, 0.5], [300, -300]), springConfig);
  const smoothRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const smoothRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`relative w-full ${view === 'home' && !selectedProject ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-white text-black font-sans selection:bg-black selection:text-white`}>
      <Navbar onNavigate={(v) => setView(v)} currentView={view} onProjectClose={() => setSelectedProject(null)} isProjectOpen={!!selectedProject} />

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.section 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] bg-[#e2f331] p-4 md:p-8 flex items-center justify-center overflow-hidden"
          >
            <div className="w-full max-w-[1920px] mx-auto bg-white h-full relative shadow-2xl flex items-center justify-center overflow-visible">
              {/* Portfolio Subtitle - Fixed at top of Home (since Home doesn't scroll) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-10 z-[10] pointer-events-auto cursor-pointer">
                <h1 className="text-lg font-mono italic tracking-[0.4em] uppercase text-black">
                  Portfolio
                </h1>
              </div>

              {/* Background "Welcome!" */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center justify-center gap-[0.1em]">
                  {"Welcome!".split("").map((char, i) => {
                    const sizes = ["text-[10vw]", "text-[12vw]", "text-[14vw]", "text-[11vw]", "text-[13vw]"];
                    const weights = ["font-light", "font-normal", "font-medium", "font-bold", "font-black"];
                    const rotates = ["rotate-0", "rotate-3", "-rotate-3", "rotate-6", "-rotate-6"];
                    
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`font-mono ${sizes[i % sizes.length]} ${weights[(i * 2) % weights.length]} ${rotates[(i * 3) % rotates.length]} inline-block text-black`}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </div>
              </div>

              {/* 3D Scene Container */}
              <div 
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center overflow-visible"
              >
                <motion.div
                  style={{
                    x: smoothX,
                    y: smoothY,
                  }}
                  className="relative w-0 h-0 flex items-center justify-center overflow-visible"
                >
                  {PROJECTS.filter(p => !p.isUnderConstruction).map((project) => (
                    <ArtworkCard 
                      key={project.id} 
                      project={project} 
                      onSelect={(p) => setSelectedProject(p)} 
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : view === 'mypage' ? (
          <MyPage key="mypage" />
        ) : (
          <CategoryView 
            category={view} 
            onSelect={(p) => setSelectedProject(p)} 
          />
        )}
      </AnimatePresence>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            onNavigate={(v) => setView(v)}
          />
        )}
      </AnimatePresence>

      {/* Footer Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.4em] uppercase pointer-events-none font-mono"
      >
        Move mouse to explore • Click to interact
      </motion.div>
    </div>
  );
}
