import { Article } from '../types/blog';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-tech-01',
    slug: 'the-quiet-era-of-ambient-computing',
    title: 'The Quiet Era of Ambient Computing: When Interfaces Fade Into Thought',
    subtitle: 'As screens dissolve into physical architecture, computing ceases to demand our attention and begins to inhabit our atmosphere.',
    category: 'technology',
    author: {
      name: 'Elena Vance-Moreau',
      role: 'Principal Technologist & Human-System Fellow',
      avatar: 'EV',
      bio: 'Writes on post-screen ergonomics, computational architecture, and the cognitive psychology of tools.'
    },
    publishedAt: 'October 14, 2026',
    readTimeMinutes: 7,
    coverTheme: 'indigo',
    tags: ['Ambient Systems', 'Interface Architecture', 'Post-Screen', 'Cognitive Ergonomics'],
    claps: 342,
    isLead: true,
    audioDurationSeconds: 420,
    content: {
      leadParagraph: 'For four decades, human civilization has lived in an uneasy truce with the illuminated rectangle. From the glowing cathode-ray tube to the sleek glass monolith in our palms, computing has demanded that we stop what we are doing, bend our cervical spines, and surrender our gaze. Yet the most profound technological transition of our lifetime is not the arrival of brighter displays, but their quiet, inevitable disappearance.',
      sections: [
        {
          heading: '01. The Fallacy of the Interruption Engine',
          paragraphs: [
            'Traditional user interface design was forged in an era of scarcity. When computation was rare, a computer had to scream for our attention to justify its existence. It buzzed, pinged, and vibrated. Even today, modern smart systems operate on the primitive logic of interruption: every notification is an unsolicited bid for your irreplaceable cognitive bandwidth.',
            'Ambient computing reverses this relationship entirely. Instead of pulling the human observer into an artificial virtual canvas, computation recedes into the physical environment. Light, sound, tactile textures, and spatial acoustics become the medium. You do not check an ambient system; you simply exist within an ecosystem that anticipates friction and quietly dissolves it.'
          ],
          pullQuote: 'The best interface is not the one with the highest pixel density, but the one that leaves no cognitive residue after you have achieved your intent.',
          takeawayBox: {
            title: 'Core Architectural Tenets',
            points: [
              'Zero unprompted visual alerts: Communication happens via natural spatial gradients and ambient cues.',
              'Edge processing over perpetual transmission: Data stays local to the physical room.',
              'Calm technology principles: Tools should amplify human presence rather than displace it.'
            ]
          }
        },
        {
          heading: '02. Acoustic and Spatial Integration',
          paragraphs: [
            'Consider the architectural transition of the modern workspace. In our experimental lab in Zurich, walls are rendered with micro-acoustic resonant timber. When a collaboration request arrives, no banner pops up across your field of view; instead, a warm localized acoustic tone—modelled after a resonant bronze bell—gently locates itself in your peripheral space.',
            'By honoring the human brain’s peripheral sensory perception—which evolution perfected over millennia to track weather, foliage, and subtle environmental shifts—ambient systems deliver profound utility without precipitating cognitive fatigue.'
          ]
        },
        {
          heading: '03. The Human Agency Paradox',
          paragraphs: [
            'Critics rightly ask: if computing becomes invisible, do we lose control over its governance? The answer lies in deterministic boundaries. An ambient system must never act without a clear, physical tactile anchor. A turn of a machined brass dial, the physical placement of an oak paperweight, the deliberate shutting of a wooden study door.',
            'When the tool understands its boundaries, we regain something we almost forgot we lost: the continuous, unbroken horizon of deep thought.'
          ]
        }
      ]
    },
    comments: [
      {
        id: 'c1',
        author: 'Julian Thorne',
        avatar: 'JT',
        timestamp: '2 hours ago',
        content: 'Elena hits the nail on the head regarding peripheral sensory processing. We spent 15 years designing notifications as car horns when they should have been designed as gentle wind rustles.',
        likes: 18
      },
      {
        id: 'c2',
        author: 'Dr. Aris Thorne',
        avatar: 'AT',
        timestamp: '5 hours ago',
        content: 'The brass dial analogy resonates deeply. Tactile anchors preserve intentionality in a world where everything has become weightless pixels.',
        likes: 12
      }
    ]
  },
  {
    id: 'art-life-01',
    slug: 'the-architecture-of-stillness',
    title: 'The Architecture of Stillness: Designing Sanctuaries for Deliberate Solitude',
    subtitle: 'How intentional negative space, tactile timber, and diurnal light rhythms restore sovereignty to the domestic realm.',
    category: 'lifestyle',
    author: {
      name: 'Mateo Lindqvist',
      role: 'Architectural Essayist & Spatial Designer',
      avatar: 'ML',
      bio: 'Researches high-latitude domestic architecture, Nordic light modulation, and acoustic sanctuaries.'
    },
    publishedAt: 'October 12, 2026',
    readTimeMinutes: 5,
    coverTheme: 'stone',
    tags: ['Spatial Design', 'Solitude', 'Nordic Light', 'Intentional Living'],
    claps: 289,
    isFeatured: true,
    audioDurationSeconds: 320,
    content: {
      leadParagraph: 'To cross the threshold of a truly quiet room is to experience an immediate deceleration of the nervous system. The heart rate slows by a modest two or three beats; the muscles in the trapezius unclamp. Yet in our relentless quest for open floor plans and hyper-connected domesticity, we have inadvertently designed modern homes that behave like noisy transit halls rather than sanctuaries.',
      sections: [
        {
          heading: '01. The Lost Grammar of the Threshold',
          paragraphs: [
            'In traditional Japanese machiya and classic Scandinavian timber cottages, entering a sanctuary required passing through deliberate transitional layers: the genkan step, the vestibule, the heavy linen noren curtain. These were not decorative flourishes; they were psychological decompression chambers.',
            'When every room connects without acoustic or sensory friction to the next, the mind never registers a clear boundary between public expectation and private restoration. To build a sanctuary today, one must begin with the boundary: thick doors of solid core oak, acoustic perimeter gaskets, and entryways that force an intentional pause.'
          ],
          pullQuote: 'Solitude is not the absence of companionship; it is the presence of an unbroken relationship with one’s own consciousness.'
        },
        {
          heading: '02. Diurnal Illumination Over Uniform Lumens',
          paragraphs: [
            'Most modern interiors commit the crime of uniform, ceiling-mounted glare. Sixty recessed LEDs wash the floor in 4000K cold light, signaling to the ancient circadian clock that it is forever midday under an artificial sky.',
            'Sanctuary design demands pools of light. A singular low-wattage shaded lamp at 2200K placed near the reading chair; unlacquered brass reflectors that bounce morning rays onto untreated plaster; candles made from natural beeswax that flicker at the frequency of human breath.'
          ],
          takeawayBox: {
            title: 'Design Guidelines for Domestic Sanctuaries',
            points: [
              'Establish one zero-device chamber where only books, notebooks, and acoustic instruments reside.',
              'Prioritize untreated, tactile materials: unbleached linen, soap-finished ash, porous limestone.',
              'Install low-horizon lighting: no lamp taller than your seated eye-level in evening rooms.'
            ]
          }
        }
      ]
    },
    comments: [
      {
        id: 'c3',
        author: 'Sora Takahashi',
        avatar: 'ST',
        timestamp: '1 day ago',
        content: 'This captures the essence of Tanizaki’s "In Praise of Shadows" translated into modern living. Beautifully reasoned.',
        likes: 24
      }
    ]
  },
  {
    id: 'art-dev-01',
    slug: 'the-deep-work-monolith',
    title: 'The Deep Work Monolith: Reclaiming Four Hours of Unbroken Cognitive Flow',
    subtitle: 'Why fractional attention destroys intellectual craftsmanship, and the rigorous rituals that protect our highest creative capacity.',
    category: 'personal-development',
    author: {
      name: 'Dr. Marcus Sterling',
      role: 'Cognitive Neuroscientist & Author',
      avatar: 'MS',
      bio: 'Investigates prefrontal cortex stamina, attention restoration theory, and deep intellectual productivity.'
    },
    publishedAt: 'October 10, 2026',
    readTimeMinutes: 6,
    coverTheme: 'amber',
    tags: ['Deep Focus', 'Cognitive Stamina', 'Attention Economics', 'Habits'],
    claps: 512,
    isFeatured: true,
    audioDurationSeconds: 380,
    content: {
      leadParagraph: 'The tragedy of modern intellectual work is not that people work too few hours, but that they work in five-minute fragments. When you switch tasks between an essay, an email notification, and a messaging thread, your prefrontal cortex suffers from what neuroscientists term "attention residue." A fraction of your working memory remains stranded in the previous context.',
      sections: [
        {
          heading: '01. The Math of Attention Residue',
          paragraphs: [
            'Every time you glance at an incoming notification—even for a mere 1.8 seconds—it requires up to twenty-three minutes for the brain to regain the exact depth of semantic association and structural synthesis that was present beforehand.',
            'If you check an inbox four times an hour, you never actually enter deep work. You spend your entire career operating in a shallow, anxious twilight of cognitive half-capacity.'
          ],
          pullQuote: 'You cannot write a magnum opus in the cracks between answering other people’s emergencies.'
        },
        {
          heading: '02. The Four-Hour Biological Ceiling',
          paragraphs: [
            'Empirical research on concert violinists, grandmaster chess tacticians, and theoretical mathematicians consistently reveals a sobering truth: the human brain cannot sustain true, maximal deep concentration for more than four hours in a twenty-four-hour cycle.',
            'The remaining four to six hours of the working day are best spent on low-cognitive administration, physical walking, reading, and contemplative digestion. When you accept the four-hour ceiling, your strategy changes: you guard those four hours with unyielding, monastic zeal.'
          ],
          takeawayBox: {
            title: 'The Monolithic Protocol',
            points: [
              'Morning Monolith (08:00 - 12:00): Router toggled off, phone in airplane mode in a separate room.',
              'Physical Start Ritual: Black coffee, fountain pen on fresh notebook, clear singular objective.',
              'Zero Context-Switching: If an errand or question pops up, write it on an analog capture index card for the afternoon.'
            ]
          }
        }
      ]
    },
    comments: [
      {
        id: 'c4',
        author: 'Clara Oswald',
        avatar: 'CO',
        timestamp: '3 days ago',
        content: 'Implementing the 4-hour ceiling completely cured my burnout. Working 10 shallow hours was killing my spirit.',
        likes: 31
      }
    ]
  },
  {
    id: 'art-tech-02',
    slug: 'synthetic-biology-and-architectural-silicon',
    title: 'Synthetic Biology & Architectural Silicon: Living Machines in the 21st Century',
    subtitle: 'When micro-electronic logic merges with cellular metabolic pathways, manufacturing shifts from extraction to cultivation.',
    category: 'technology',
    author: {
      name: 'Kenji Sato',
      role: 'Bio-Computational Architect',
      avatar: 'KS',
      bio: 'Investigates photosynthetic computing substrates and living structural mycelium composites.'
    },
    publishedAt: 'October 08, 2026',
    readTimeMinutes: 8,
    coverTheme: 'sage',
    tags: ['Synthetic Biology', 'Mycelium', 'Clean Tech', 'Bio-Computing'],
    claps: 198,
    audioDurationSeconds: 480,
    content: {
      leadParagraph: 'We have spent two centuries stamping steel and etching silicon—treating the creation of machines as an exercise in violent subtraction. We dig up rare minerals from open-pit mines, heat them to thousands of degrees, and discard them when their planned obsolescence arrives. But nature solves computational and structural problems not through thermal violence, but through metabolic self-assembly.',
      sections: [
        {
          heading: '01. The Photosynthetic Logic Gate',
          paragraphs: [
            'At the intersection of synthetic biology and solid-state physics, researchers are now growing circuits using modified bacterial proteins that transport electrons with near-zero heat dissipation. Unlike silicon wafers that degrade with heat, biological substrates repair micro-cracks through enzymatic cellular turnover.',
            'Imagine a server farm that does not consume millions of gallons of potable water for evaporative chillers, but operates as a submerged algal canopy, generating oxygen while balancing global data loads.'
          ],
          pullQuote: 'The ultimate pinnacle of engineering is not a machine that looks like an engine; it is a machine that behaves like a forest.'
        }
      ]
    },
    comments: [
      {
        id: 'c5',
        author: 'David Chen',
        avatar: 'DC',
        timestamp: '4 days ago',
        content: 'The shift from extraction to cultivation is the defining paradigm shift of the next fifty years.',
        likes: 9
      }
    ]
  },
  {
    id: 'art-life-02',
    slug: 'culinary-cadence-the-slow-geometry-of-meals',
    title: 'Culinary Cadence: Rediscovering the Slow Geometry of Communal Meals',
    subtitle: 'Moving beyond quick nourishment to embrace the dining table as the foundational hearth of human dialogue.',
    category: 'lifestyle',
    author: {
      name: 'Camille Laurent',
      role: 'Culinary Anthropologist & Food Historian',
      avatar: 'CL',
      bio: 'Writes on heirloom agriculture, seasonal preservation, and the ritual table.'
    },
    publishedAt: 'October 04, 2026',
    readTimeMinutes: 4,
    coverTheme: 'terracotta',
    tags: ['Slow Food', 'Gastronomy', 'Communal Rituals', 'Pacing'],
    claps: 165,
    audioDurationSeconds: 240,
    content: {
      leadParagraph: 'To eat while standing at a kitchen island staring at a feed of short-form videos is one of the quietest tragedies of contemporary domestic life. Fueling the body has been optimized into a frictionless chore, while the ancient ceremony of breaking bread has been hollowed out. Yet the communal table remains the single most resilient civic forum ever devised by humanity.',
      sections: [
        {
          heading: '01. The Spatial Geography of Conversation',
          paragraphs: [
            'A round wooden table with a low pendant light creates a gravitational well. The circular geometry eliminates the hierarchical head of the table; the low amber pendant casts light on the faces and the food while keeping the rest of the room in gentle shadow. Conversation naturally deepens because the visual distractions of the room disappear.',
            'When a meal is paced across three modest courses rather than shoveled down in seven minutes, the autonomic nervous system enters a rest-and-digest state that transforms interpersonal empathy.'
          ],
          pullQuote: 'A shared meal is not merely nutrition; it is an unwritten covenant of mutual safety and attentive listening.'
        }
      ]
    },
    comments: []
  },
  {
    id: 'art-dev-02',
    slug: 'the-mental-models-of-high-stakes-solitude',
    title: 'The Mental Models of High-Stakes Solitude: Thinking in Centuries',
    subtitle: 'How Marcus Aurelius, Montaigne, and Darwin used radical intellectual insulation to discern signal through noise.',
    category: 'personal-development',
    author: {
      name: 'Dr. Marcus Sterling',
      role: 'Cognitive Neuroscientist & Author',
      avatar: 'MS',
      bio: 'Investigates prefrontal cortex stamina, attention restoration theory, and deep intellectual productivity.'
    },
    publishedAt: 'September 28, 2026',
    readTimeMinutes: 6,
    coverTheme: 'obsidian',
    tags: ['Mental Models', 'Stoicism', 'Long-term Thinking', 'Solitude'],
    claps: 421,
    audioDurationSeconds: 360,
    content: {
      leadParagraph: 'When Marcus Aurelius sat in his military tent along the freezing Danube border writing notes to himself, he was presiding over an empire reeling from plague, revolt, and economic distress. Yet not once in the Meditations does he complain about daily headlines or seek immediate validation from his contemporaries. His vantage point was cosmological: he asked how each decision would look against the backdrop of eternity.',
      sections: [
        {
          heading: '01. The Century Filter',
          paragraphs: [
            'Whenever an apparent crisis or viral controversy arises, ask: "Will this matter in one hundred years?" Ninety-nine point nine percent of what inflames the public consciousness today will be less than dust a century from now.',
            'Applying the Century Filter instantly evaporates reactive panic and frees the intellectual architect to work on structural foundations: timeless books, durable institutions, and grounded personal ethics.'
          ],
          pullQuote: 'When you step outside the 24-hour cycle of outrage, you do not become ignorant; you finally become capable of strategic wisdom.'
        }
      ]
    },
    comments: [
      {
        id: 'c6',
        author: 'Nadia Solis',
        avatar: 'NS',
        timestamp: '1 week ago',
        content: 'The Danube tent perspective is exactly what we need when modern social timelines make everything feel like an existential emergency.',
        likes: 19
      }
    ]
  }
];
