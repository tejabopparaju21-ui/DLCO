import type { Topic } from '../types';

export const INITIAL_TOPICS: Topic[] = [
  {
    id: 'topic-1',
    number: 1,
    title: 'Memory Hierarchy',
    category: 'System Architecture',
    summary: 'Explores the structural pyramid of computer memory balancing access time, capacity, and cost per bit, driven by the principle of locality of reference.',
    keyConcepts: [
      'Hierarchy Pyramid (Registers, L1-L3 Cache, Main Memory, Secondary, Archival)',
      'Access Time vs. Cost vs. Capacity Trade-offs',
      'Locality of Reference (Temporal and Spatial Locality)',
      'Hit Ratio and Effective Memory Access Time (EMAT)'
    ],
    presentation: {
      id: 'pres-topic-1',
      topicId: 'topic-1',
      fileName: 'DLCO_Topic01_Memory_Hierarchy_Seminar.pdf',
      fileType: 'pdf',
      fileSize: 2458120, // ~2.4 MB
      fileUrl: '/presentations/DLCO_Topic01_Memory_Hierarchy_Seminar.pdf',
      uploadedAt: '2026-10-28T09:30:00.000Z',
      uploadedBy: 'Prof. Computer Architecture (Faculty Coordinator)',
      description: 'Comprehensive seminar slide deck covering memory hierarchy design principles, access latency comparisons, locality laws, and numerical problems on Effective Memory Access Time.',
      slideCount: 16,
      slides: [
        {
          slideNumber: 1,
          title: 'Title Slide: Memory Hierarchy Design',
          bulletPoints: [
            'Course: Digital Logic and Computer Organization (DLCO)',
            'Unit: Computer Memory System and Organization',
            'Seminar Topic 01: Memory Hierarchy Design & Performance Analysis',
            'Department of Computer Science & Engineering'
          ],
          speakerNotes: 'Welcome students to the first seminar presentation on Computer Memory Organization.'
        },
        {
          slideNumber: 2,
          title: 'The Need for Memory Hierarchy',
          bulletPoints: [
            'Processor-Memory Speed Gap: CPU cycle times decrease much faster than DRAM access times.',
            'Cost vs. Speed Trade-off: High-speed static storage (SRAM) is prohibitively expensive per bit compared to dynamic storage (DRAM) or magnetic/flash storage.',
            'Capacity Constraint: Large memories are inherently slower due to physical interconnect delays and decoding logic.',
            'Architectural Solution: Build a layered memory system combining fast, small memory at the top and slow, cheap, large memory at the bottom.'
          ],
          speakerNotes: 'Highlight the widening speed divergence known as the "Memory Wall".'
        },
        {
          slideNumber: 3,
          title: 'The Memory Hierarchy Pyramid',
          bulletPoints: [
            'Level 0 - Internal CPU Registers: 0.25 - 0.5 ns access, 32 to 128 words, managed by compiler.',
            'Level 1 - On-Chip L1 Cache (Split I-Cache & D-Cache): 0.5 - 1.5 ns, 32KB - 128KB, managed by hardware.',
            'Level 2 - L2 Cache: 3 - 7 ns, 256KB - 1MB per core, managed by hardware.',
            'Level 3 - L3 Shared Cache: 10 - 25 ns, 8MB - 64MB shared on-chip, managed by hardware.',
            'Level 4 - Main Memory (DRAM): 50 - 80 ns, 8GB - 64GB, managed by OS/Hardware (Virtual Memory).',
            'Level 5 - Secondary Storage (NVMe SSD / HDD): 10 µs - 10 ms, 512GB - 4TB, managed by File System.',
            'Level 6 - Tertiary & Cloud Storage: > 100 ms, archival tape / distributed object storage.'
          ],
          speakerNotes: 'Walk students through each tier from top (fastest, smallest, costliest) to bottom.'
        },
        {
          slideNumber: 4,
          title: 'Key Operational Parameters Across Levels',
          bulletPoints: [
            'Access Latency: Increases monotonically down the pyramid by orders of magnitude (ns -> µs -> ms).',
            'Cost per Bit ($/bit): Decreases exponentially from top to bottom tiers.',
            'Total Storage Capacity: Increases geometrically from registers (bytes) to secondary disks (terabytes).',
            'CPU Frequency of Access: Decreases as we move down the pyramid due to filtering by higher tiers.'
          ]
        },
        {
          slideNumber: 5,
          title: 'Foundation Principle: Locality of Reference',
          bulletPoints: [
            'Temporal Locality: If a memory location is accessed once, it is likely to be accessed again in the near future (e.g., loop variables, subroutine calls).',
            'Spatial Locality: If a memory location is accessed, nearby memory locations are likely to be accessed soon (e.g., sequential code execution, array traversals).',
            'Why Locality Works: High-level computer programs are structured with iterations, modular routines, and continuous data structures.'
          ]
        },
        {
          slideNumber: 6,
          title: 'Effective Memory Access Time (EMAT)',
          bulletPoints: [
            'Hit Ratio (h): Fraction of memory references found in the upper-level memory (0 ≤ h ≤ 1).',
            'Miss Ratio (m): Fraction of memory references that must be retrieved from the lower level (m = 1 - h).',
            'Two-Level Formula: EMAT = h × T_cache + (1 - h) × (T_cache + T_main)',
            'Hierarchical Miss Penalty: In modern pipelines, Miss Penalty = T_main, so EMAT = T_cache + (1 - h) × Miss Penalty.'
          ]
        },
        {
          slideNumber: 7,
          title: 'Numerical Example: EMAT Calculation',
          bulletPoints: [
            'Given Parameters: Cache access time Tc = 2 ns, Main memory access time Tm = 50 ns.',
            'Scenario A (Hit Ratio = 90%): EMAT = 0.90 × 2 + 0.10 × 52 = 1.8 + 5.2 = 7.0 ns.',
            'Scenario B (Hit Ratio = 98%): EMAT = 0.98 × 2 + 0.02 × 52 = 1.96 + 1.04 = 3.0 ns.',
            'Observation: An 8% improvement in hit ratio yields more than a 2.3x speedup in average memory access time!'
          ]
        },
        {
          slideNumber: 8,
          title: 'Multi-Level Cache Performance Model',
          bulletPoints: [
            'Modern CPUs deploy L1, L2, and L3 cache hierarchies.',
            'Formula: EMAT = T_L1 + m1 × (T_L2 + m2 × (T_L3 + m3 × T_DRAM))',
            'Local Miss Rate vs Global Miss Rate distinction.',
            'Inclusion Property: Strict Inclusion vs Non-inclusive vs Exclusive (e.g., AMD Zen victim cache).'
          ]
        },
        {
          slideNumber: 9,
          title: 'Memory Interleaving and Bandwidth',
          bulletPoints: [
            'High-Order Interleaving: Memory split into consecutive modules; low spatial bandwidth.',
            'Low-Order Interleaving: Consecutive memory addresses fall in distinct modules allowing concurrent access.',
            'Multi-Channel Architecture: Dual-channel and Quad-channel DDR memory busses provide simultaneous pipelined transfers.'
          ]
        },
        {
          slideNumber: 10,
          title: 'Summary & Key Takeaways',
          bulletPoints: [
            'Memory hierarchy creates the illusion of a memory as fast as the fastest component and as large as the cheapest one.',
            'The entire scheme relies upon the 90/10 rule of locality of reference.',
            'Optimizing cache hit ratio is the single most critical factor for compute-bound and memory-bound systems.'
          ]
        }
      ]
    }
  },
  {
    id: 'topic-2',
    number: 2,
    title: 'Memory Classification',
    category: 'Memory Fundamentals',
    summary: 'Taxonomy of semiconductor and magnetic memories, distinguishing volatile vs non-volatile, random access vs sequential access, and static vs dynamic technologies.',
    keyConcepts: [
      'Volatile vs Non-Volatile Memory',
      'RAM, ROM, Flash, Magnetic, and Optical Storage',
      'Sequential, Direct, Random, and Associative Access Modes',
      'Static RAM (SRAM) vs Dynamic RAM (DRAM) Cell Structures'
    ],
    presentation: null
  },
  {
    id: 'topic-3',
    number: 3,
    title: 'Primary Memory (RAM) – With Mapping',
    category: 'Primary Memory',
    summary: 'Detailed examination of Random Access Memory organization, 1D and 2D decoding, memory chip expansion (word length and capacity), and address decoding logic.',
    keyConcepts: [
      'SRAM 6-Transistor Cell vs DRAM 1T-1C Cell',
      'Row and Column Address Strobes (RAS, CAS)',
      'Memory Module Expansion (Horizontal & Vertical Banking)',
      'Address Decoding Logic and Chip Select Generation'
    ],
    presentation: null
  },
  {
    id: 'topic-4',
    number: 4,
    title: 'Primary Memory (ROM) – With Mapping',
    category: 'Primary Memory',
    summary: 'Architecture of Read-Only Memory, programmable variants (PROM, EPROM, EEPROM, Flash), and diode/transistor ROM array address mapping.',
    keyConcepts: [
      'Types of ROM: Mask ROM, PROM, EPROM, EEPROM, Flash NOR/NAND',
      'ROM Internal Matrix Structure and Decoder Interconnection',
      'Combinational Logic Realization using ROM Arrays',
      'Firmware, BIOS, and Bootstrapping Architectures'
    ],
    presentation: null
  },
  {
    id: 'topic-5',
    number: 5,
    title: 'Secondary Memory',
    category: 'Storage Subsystems',
    summary: 'Analysis of secondary and auxiliary storage devices including hard disk drives (HDD geometry, seek time, rotational latency), solid-state drives (SSD NAND flash), and optical storage.',
    keyConcepts: [
      'HDD Physical Architecture (Platters, Tracks, Sectors, Cylinders)',
      'Disk Access Time: Seek Time, Rotational Delay, Transfer Time',
      'Solid-State Drive (SSD) Flash Translation Layer (FTL) and Wear Leveling',
      'RAID Levels 0, 1, 5, 6, and 10 Fault Tolerance'
    ],
    presentation: null
  },
  {
    id: 'topic-6',
    number: 6,
    title: 'Cache Memory',
    category: 'Cache Architecture',
    summary: 'Principles of ultra-high-speed buffer memory, cache line structures, tag/index/offset address fields, and write strategies.',
    keyConcepts: [
      'Cache Line / Block Size and Spatial Exploitation',
      'Cache Tag Directory and Valid/Dirty Bit Flags',
      'Write-Through vs Write-Back Policies',
      'Write-Allocate vs No-Write-Allocate on Cache Miss'
    ],
    presentation: null
  },
  {
    id: 'topic-7',
    number: 7,
    title: 'Cache Memory Mapping',
    category: 'Cache Architecture',
    summary: 'Comparative study and mathematical address breakdown of Direct Mapping, Fully Associative Mapping, and Set-Associative Mapping.',
    keyConcepts: [
      'Direct Mapping: Tag, Index, and Block Offset Partitioning',
      'Associative Mapping: Tag and Word Offset with Parallel Comparator Array',
      'Set-Associative Mapping: K-way Sets, Tag, Set Index, Word Offset',
      'Conflict Misses vs Capacity Misses vs Compulsory Misses'
    ],
    presentation: null
  },
  {
    id: 'topic-8',
    number: 8,
    title: 'Cache Memory Policies',
    category: 'Cache Architecture',
    summary: 'Coherence and consistency mechanisms, multi-core cache synchronization, snooping protocols (MESI/MOESI), and replacement policy interactions.',
    keyConcepts: [
      'Write Hit Policies: Write-Through with Buffer vs Write-Back with Dirty Bit',
      'Write Miss Policies: Write-Allocate vs Write-Around',
      'Cache Coherence Problem in Multiprocessor Architectures',
      'MESI Protocol (Modified, Exclusive, Shared, Invalid) State Transitions'
    ],
    presentation: null
  },
  {
    id: 'topic-9',
    number: 9,
    title: 'Virtual Memory',
    category: 'Virtual Memory & OS',
    summary: 'Bridging the physical memory boundary through paging, segmentation, translation lookaside buffers (TLB), page tables, and virtual-to-physical address translation.',
    keyConcepts: [
      'Paging Mechanics: Virtual Page Number (VPN) and Page Offset',
      'Page Table Architecture: Multi-Level, Inverted Page Tables',
      'Translation Lookaside Buffer (TLB) Fast Associative Path',
      'Page Fault Handling Flow and OS Exception Handler'
    ],
    presentation: null
  },
  {
    id: 'topic-10',
    number: 10,
    title: 'Replacement Algorithms',
    category: 'Algorithms & Policies',
    summary: 'Page and cache block replacement strategies including FIFO, LRU, Optimal (OPT/Belady), Clock/Second-Chance, and LFU algorithms.',
    keyConcepts: [
      'Least Recently Used (LRU): Matrix and Counter Hardware Implementations',
      'First-In, First-Out (FIFO) and Belady\'s Anomaly Demonstration',
      'Optimal Page Replacement (Belady\'s Clairvoyant Benchmark)',
      'Clock / Second Chance Algorithm using Reference Bits'
    ],
    presentation: null
  },
  {
    id: 'topic-11',
    number: 11,
    title: 'Memory Management Requirements',
    category: 'System Architecture',
    summary: 'Core hardware and operating system requisites: relocation, protection, sharing, logical organization, and physical organization.',
    keyConcepts: [
      'Relocation: Dynamic address translation using Base and Limit Registers',
      'Protection: Preventing unauthorized memory accesses between processes',
      'Sharing: Allowing concurrent processes to access shared code libraries',
      'Internal vs External Memory Fragmentation Solutions'
    ],
    presentation: null
  },
  {
    id: 'topic-12',
    number: 12,
    title: 'Memory Performance',
    category: 'Evaluation & Benchmarks',
    summary: 'Comprehensive quantitative evaluation of memory subsystems: bandwidth, throughput, cycle time, latency hiding techniques, and memory wall analysis.',
    keyConcepts: [
      'Memory Bandwidth vs Latency Metrics',
      'DDR SDRAM Evolution (DDR4, DDR5, LPDDR, HBM)',
      'Latency Hiding: Non-Blocking Caches, Out-of-Order Execution, Prefetching',
      'Amdahl\'s Law and Memory Bottlenecks in Modern Workloads'
    ],
    presentation: null
  }
];
