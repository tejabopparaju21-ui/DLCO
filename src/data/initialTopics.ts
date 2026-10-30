import type { Topic } from '../types';

export const INITIAL_TOPICS: Topic[] = [
  {
    id: 'topic-1',
    number: 1,
    title: 'Memory Hierarchy',
    category: 'System Architecture',
    summary: 'Organization of Memory in Computer Systems under JNTUK R23 Regulation (DLCO Unit IV). Covers memory trade-offs, pyramid structure, SRAM/DRAM, ROM, multi-tier cache, AMAT performance, virtual memory paging, and secondary storage.',
    keyConcepts: [
      'Memory Pyramid (Registers, L1-L3 Cache, Main Memory, Flash, Hard Disk, Tapes)',
      'Semiconductor RAM (SRAM Flip-Flops vs DRAM 1T-1C Cells)',
      'Non-Volatile Storage (Mask ROM, PROM, EPROM, EEPROM, Flash)',
      'Cache Architecture & AMAT (Locality of Reference, Hit Ratio, Miss Penalty)',
      'Virtual Memory & MMU (Paging, Page Tables, Page Faults, Demand Paging)',
      'Secondary Storage Technologies (SSD NAND vs HDD Mechanical Platters)'
    ],
    presentation: {
      id: 'pres-topic-1',
      topicId: 'topic-1',
      fileName: 'DLCO_Topic01_Memory_Hierarchy_Seminar.pdf',
      fileType: 'pdf',
      fileSize: 967261, // ~967 KB
      fileUrl: '/presentations/DLCO_Topic01_Memory_Hierarchy_Seminar.pdf',
      uploadedAt: '2026-10-30T12:30:00.000Z',
      uploadedBy: 'Seminar Presentation Team (Karthikeya, Nikhil, Teja, Srinivas, Manohar)',
      description: 'Official Seminar Presentation on Memory Hierarchy in Computer Systems (JNTUK R23 Regulation | DLCO Unit IV | Department of ACSE).',
      slideCount: 12,
      slides: [
        {
          slideNumber: 1,
          title: 'MEMORY HIERARCHY: Organization of Memory in Computer Systems',
          bulletPoints: [
            'Digital Logic and Computer Organization (DLCO) | Unit IV',
            'JNTUK R23 Regulation | Department of ACSE',
            'Presented by (Team of 5 Members):',
            '• Member 1: Karthikeya (Intro & Hierarchy Structure)',
            '• Member 2: Nikhil (Semiconductor RAM & ROM)',
            '• Member 3: Teja (Cache Memory & Performance)',
            '• Member 4: Srinivas (Virtual Memory & Management)',
            '• Member 5: Manohar (Secondary Storage & Summary)'
          ],
          speakerNotes: 'Welcome faculty and students. This seminar covers the organization of memory in computer systems presented by our 5-member team.'
        },
        {
          slideNumber: 2,
          title: 'Introduction to Memory Organization',
          bulletPoints: [
            'Presented by: Member 1 (Karthikeya) | Basic Concepts & Trade-offs',
            'Role of Memory in Systems:',
            '• Stores active instructions & computation data.',
            '• Directly bounds CPU execution throughput.',
            '• Trade-off: No single tech gives top speed & capacity.',
            'Core Hierarchy Principles:',
            '• Speed vs. Cost: Faster memory = higher cost per bit.',
            '• Capacity vs. Speed: Larger capacity = higher access latency.',
            '• Tiered Hierarchy: Blends fast SRAM caches with cheap, mass storage.',
            'Access Hierarchy Flow: CPU Core (< 1 ns clock) <-> SRAM Cache (1-10 ns) <-> Main Memory (50-100 ns) <-> Storage (10 µs - 10 ms).'
          ],
          speakerNotes: 'Presented by Karthikeya (Member 1). Focus on fundamental trade-offs between speed, cost, and physical storage capacity.'
        },
        {
          slideNumber: 3,
          title: 'Structure of Memory Hierarchy',
          bulletPoints: [
            'Presented by: Member 1 (Karthikeya) | The Memory Pyramid',
            'Memory Pyramid Takeaways:',
            '• Registers (< 1 ns): Internal CPU; fastest, most expensive.',
            '• Cache SRAM (1-10 ns): L1-L3 buffers bridging CPU & DRAM.',
            '• Main DRAM (50-100 ns): Working system RAM.',
            '• Secondary Storage (10 µs - 10 ms): SSD/HDD mass storage.',
            '• Archival Storage: Magnetic Tapes & Tape Drives for long-term backup.',
            '• Trend: Downward = speed drops, capacity & affordability jump.'
          ],
          speakerNotes: 'Presented by Karthikeya (Member 1). Walking through the 6-tier memory pyramid.'
        },
        {
          slideNumber: 4,
          title: 'Semiconductor RAM Memories',
          bulletPoints: [
            'Presented by: Member 2 (Nikhil) | Random Access Memory (SRAM & DRAM)',
            'Static RAM (SRAM):',
            '• Cell: 4-6 transistors (flip-flop logic circuit).',
            '• Speed: Ultra-fast (< 1 - 5 ns).',
            '• Refresh: None required (static).',
            '• Density: Lower bit density, costly.',
            '• Role: CPU Caches (L1, L2, L3).',
            'Dynamic RAM (DRAM):',
            '• Cell: 1 transistor + 1 capacitor (1T-1C structure).',
            '• Refresh: Periodic refresh needed as charge leaks away.',
            '• Speed: Moderate (50 - 100 ns).',
            '• Density: Very high, cost-effective.',
            '• Role: Main Computer System RAM.'
          ],
          speakerNotes: 'Presented by Nikhil (Member 2). Contrasting SRAM flip-flop circuits with DRAM capacitor refresh cycles.'
        },
        {
          slideNumber: 5,
          title: 'Read-Only Memory (ROM)',
          bulletPoints: [
            'Presented by: Member 2 (Nikhil) | Non-Volatile Semiconductor Storage',
            'ROM Characteristics:',
            '• Non-Volatile: Retains state without electrical power.',
            '• Bootstrapping: Houses BIOS / UEFI firmware.',
            '• Embedded: Controls peripheral hardware and appliance routines.',
            '• Read-Only: Normal execution provides read access.',
            'Evolution & Types of ROM:',
            '• Mask ROM: Hardwired at fab; non-alterable.',
            '• PROM: User programmable once.',
            '• EPROM: UV-light erased and rewritten.',
            '• EEPROM: Electrically erased byte-by-byte.',
            '• Flash: Block-erasable, high-density EEPROM.'
          ],
          speakerNotes: 'Presented by Nikhil (Member 2). Reviewing non-volatile memory evolution from Mask ROM to modern Flash.'
        },
        {
          slideNumber: 6,
          title: 'Cache Memory Architecture',
          bulletPoints: [
            'Presented by: Member 3 (Teja) | High-Speed Buffer & Multi-Level Cache',
            'Principles of Cache:',
            '• Fast SRAM buffer placed directly between CPU execution units & DRAM.',
            '• Temporal Locality: Recently used data reused soon.',
            '• Spatial Locality: Nearby addresses fetched together.',
            '• Transparent: Managed automatically by hardware.',
            'Multi-Level Hierarchy:',
            '• L1: Dedicated per-core (< 1 ns, 32-64 KB).',
            '• L2: Per-core buffer (256 KB - 1 MB).',
            '• L3: Shared across all CPU cores (8 - 64 MB).',
            '• Search Order: Check L1 -> L2 -> L3 -> DRAM.'
          ],
          speakerNotes: 'Presented by Teja (Member 3). Principles of cache buffering, locality laws, and multi-tier L1-L3 cache architectures.'
        },
        {
          slideNumber: 7,
          title: 'Cache Performance Considerations',
          bulletPoints: [
            'Presented by: Member 3 (Teja) | Metrics & Access Time Analysis',
            'Key Performance Metrics:',
            '• Hit: Found in cache (1 - 5 ns); Miss: Fetched from DRAM (50 - 100 ns).',
            '• Hit Ratio (h): Hits / Total Accesses (~90-95%).',
            '• Miss Penalty: Extra latency to fetch block from RAM.',
            '• AMAT = Hit Time + (Miss Rate × Miss Penalty).',
            'Target Cache Hit Ratio: 90% - 95%',
            '• Ensures CPU rarely experiences full DRAM latency, minimizing effective memory access time.'
          ],
          speakerNotes: 'Presented by Teja (Member 3). AMAT numerical breakdown, hit vs miss ratios, and cache latency mitigation.'
        },
        {
          slideNumber: 8,
          title: 'Virtual Memory Architecture',
          bulletPoints: [
            'Presented by: Member 4 (Srinivas) | Address Translation & Paging',
            'Concept & MMU:',
            '• Logical Space: Programs see continuous memory.',
            '• Beyond RAM: Runs apps larger than physical memory.',
            '• MMU: Translates virtual addresses to physical RAM.',
            '• Isolation: Strict per-process protection.',
            'Paging & Faults:',
            '• Paging: Virtual pages map to physical frames.',
            '• Page Table: Stores virtual-to-physical translations.',
            '• Page Fault: Trap when accessed page is absent.',
            '• Demand Paging: OS swaps pages between RAM & disk.'
          ],
          speakerNotes: 'Presented by Srinivas (Member 4). MMU hardware translation, paging, and demand paging page fault handling.'
        },
        {
          slideNumber: 9,
          title: 'Memory Management Requirements',
          bulletPoints: [
            'Presented by: Member 4 (Srinivas) | Core Operating System Functions',
            'Relocation & Protection:',
            '• Relocation: Program executes anywhere in RAM.',
            '• Protection: Prevents cross-process corruption.',
            '• Hardware: Base & limit register verification.',
            'Sharing & Modularity:',
            '• Sharing: Common libraries (DLLs) shared in RAM.',
            '• Modularity: Organized into functions & data modules.',
            '• Efficiency: Maximizes physical memory density.',
            '• Kernel Handling: OS Virtual Memory Manager handles page faults & frame swapping.'
          ],
          speakerNotes: 'Presented by Srinivas (Member 4). The 5 fundamental requirements: Relocation, Protection, Sharing, and Modularity.'
        },
        {
          slideNumber: 10,
          title: 'Secondary Storage Systems',
          bulletPoints: [
            'Presented by: Member 5 (Manohar) | Non-Volatile Mass Storage',
            'Storage Role in Hierarchy:',
            '• Non-Volatile: Retains OS, binaries & data persistently.',
            '• Massive: Gigabytes to terabytes at lowest cost/bit.',
            '• Swap Store: Backs virtual memory page swapping.',
            'Storage Technologies:',
            '• SSD: NAND flash; silent, ultra-fast random I/O.',
            '• HDD: Magnetic platters; high capacity & cheap.',
            '• Removable: Flash USB & optical archival media.'
          ],
          speakerNotes: 'Presented by Manohar (Member 5). Mass storage technology comparison between solid-state flash and magnetic platters.'
        },
        {
          slideNumber: 11,
          title: 'Comparison of Memory Levels',
          bulletPoints: [
            'Presented by: Member 5 (Manohar) | Quantitative Summary Across Hierarchy',
            'Quantitative Hierarchy Matrix:',
            '• CPU Registers: Flip-Flops (CMOS) | Fastest (< 1 ns) | Bytes to Kilobytes | Highest Cost/Bit',
            '• Cache Memory: Static RAM (SRAM) | Very Fast (1-10 ns) | Kilobytes to Megabytes | Very High Cost/Bit',
            '• Main Memory: Dynamic RAM (DRAM) | Moderate (50-100 ns) | Gigabytes (8-64 GB) | Moderate Cost/Bit',
            '• Secondary Storage: SSD Flash / HDD Magnetic | Slower (Micro to Milliseconds) | Terabytes (512 GB - 4 TB) | Lowest Cost/Bit',
            'Key Takeaway on Memory Trade-offs:',
            '• Hierarchy Rule: Downward = speed drops ~1000x, capacity multiplies, cost/bit falls drastically.',
            '• Outcome: Systems achieve near-SRAM speed with terabytes of affordable storage.'
          ],
          speakerNotes: 'Presented by Manohar (Member 5). Comprehensive comparative matrix across latency, capacity, and cost tiers.'
        },
        {
          slideNumber: 12,
          title: 'Summary & Conclusion',
          bulletPoints: [
            'Presented by: Member 5 (Manohar) | Key Insights & Wrap-up',
            'Seminar Synthesis:',
            '• Hierarchy bridges the processor-memory speed gap (Memory Wall).',
            '• Caches mask DRAM delay; VM enables massive address spaces.',
            '• Delivers optimal price-performance for modern computing.',
            'THANK YOU!',
            'Seminar Presentation Team (CAI 2-1):',
            '• Member 1: Karthikeya (Intro & Hierarchy Structure)',
            '• Member 2: Nikhil (Semiconductor RAM & ROM)',
            '• Member 3: Teja (Cache Memory & Performance)',
            '• Member 4: Srinivas (Virtual Memory & Management)',
            '• Member 5: Manohar (Secondary Storage & Summary)',
            'Subject: Digital Logic and Computer Organization (DLCO) | Department of Computer Science & Engineering (ACSE)'
          ],
          speakerNotes: 'Presented by Manohar (Member 5). Final seminar wrap-up and team acknowledgements.'
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
