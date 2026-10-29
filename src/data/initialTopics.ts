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
      fileName: 'DLCO_Topic01_Memory_Hierarchy_Seminar.pptx',
      fileType: 'pptx',
      fileSize: 1080728, // 1.08 MB
      fileUrl: '/presentations/DLCO_Topic01_Memory_Hierarchy_Seminar.pptx',
      uploadedAt: '2026-10-29T18:00:00.000Z',
      uploadedBy: 'Seminar Presentation Team (Karthikeya, Nikhil, Teja, Srinivas, Manohar)',
      description: 'Official Seminar Presentation on Memory Hierarchy in Computer Systems (JNTUK R23 Regulation | DLCO Unit IV | Department of CSE).',
      slideCount: 12,
      slides: [
        {
          slideNumber: 1,
          title: 'MEMORY HIERARCHY: Organization of Memory in Computer Systems',
          bulletPoints: [
            'Course: Digital Logic and Computer Organization (DLCO) | Unit IV',
            'Regulation & Department: JNTUK R23 Regulation | Department of CSE',
            'Presented by Seminar Team (CAI 2-1):',
            '• Member 1: Karthikeya (Intro & Hierarchy Structure)',
            '• Member 2: Nikhil (Semiconductor RAM & ROM)',
            '• Member 3: Teja (Cache Memory & Performance)',
            '• Member 4: Srinivas (Virtual Memory & Management)',
            '• Member 5: Manohar (Secondary Storage & Summary)'
          ],
          speakerNotes: 'Welcome faculty and students. This seminar covers complete memory organization in modern computers presented by our 5-member team.'
        },
        {
          slideNumber: 2,
          title: 'Introduction to Memory Organization',
          bulletPoints: [
            'Role of Memory: Stores programs, instructions, operational data, and computation results.',
            'Crucial Subsystem: Directly determines processor utilization, instruction throughput, and system responsiveness.',
            'CPU-Memory Speed Divergence: Processors execute instructions at nanosecond clock speeds requiring rapid data availability.',
            'Architectural Constraint: A single memory technology cannot satisfy both maximum speed and maximum capacity simultaneously.',
            'Speed vs. Cost Trade-off: Faster memory technologies are substantially more expensive per bit.',
            'Capacity vs. Speed Trade-off: Larger capacity memories exhibit longer physical access latencies.',
            'Hierarchy Strategy: Combines multiple memory technologies in a tiered pyramid structure.',
            'Design Goal: Delivers nearly the speed of the fastest memory with the capacity and cost of the cheapest.'
          ],
          speakerNotes: 'Presented by Karthikeya (Member 1). Focus on the fundamental trade-offs between speed, cost, and physical storage capacity.'
        },
        {
          slideNumber: 3,
          title: 'Structure of Memory Hierarchy: The Memory Pyramid',
          bulletPoints: [
            'Level 1 - CPU Internal Registers: Inside processor, fastest access (< 1 ns), smallest capacity (bytes), highest cost per bit.',
            'Level 2 - Cache Memory: High-speed SRAM (L1, L2, L3) bridging CPU and main memory clock speeds (1–10 ns).',
            'Level 3 - Main Memory (RAM): Dynamic RAM (DRAM) holding active applications and datasets (50–100 ns, 8–64 GB).',
            'Level 4 - USB / Flash Memory: High-density solid-state intermediate storage.',
            'Level 5 - Magnetic Disk / Hard Disk: Large capacity secondary storage with low cost per bit (512 GB–4 TB).',
            'Level 6 - Magnetic Tapes / Drives: Archival offline storage with highest capacity and lowest cost per bit.',
            'Core Trend Downward: Increasing access time (latency), increasing storage capacity, decreasing cost per bit.'
          ],
          speakerNotes: 'Presented by Karthikeya (Member 1). Explaining the 6-tier pyramid from registers down to archival tape storage.'
        },
        {
          slideNumber: 4,
          title: 'Semiconductor RAM Memories: SRAM vs DRAM',
          bulletPoints: [
            'Static RAM (SRAM): Built using bistable flip-flop logic circuits (4 to 6 transistors per cell).',
            'SRAM Access Latency: Very fast access times (sub-nanosecond to a few nanoseconds).',
            'SRAM Refreshing: Does NOT require dynamic periodic refreshing while power is maintained.',
            'SRAM Application: Exclusively used for CPU internal L1/L2 and shared L3 cache memories.',
            'Dynamic RAM (DRAM): Stores bits as electrical charges across tiny capacitor-transistor (1T-1C) pairs.',
            'DRAM Refreshing: Electrical charge leaks continuously; requires dynamic periodic refresh cycles.',
            'DRAM Density & Economics: Extremely high packing density, simple cell layout, very low cost per bit.',
            'DRAM Application: Standard technological choice for computer Main Memory (System RAM DDR4/DDR5).'
          ],
          speakerNotes: 'Presented by Nikhil (Member 2). Contrasting SRAM flip-flop circuits with DRAM capacitor refresh cycles.'
        },
        {
          slideNumber: 5,
          title: 'Read-Only Memory (ROM): Non-Volatile Semiconductor Storage',
          bulletPoints: [
            'Non-Volatile Characteristic: Retains program code permanently even when electrical power is removed.',
            'System Bootstrap: Holds initialization programs (BIOS / UEFI) and system startup routines.',
            'Embedded Firmware: Stores dedicated control routines in microcontrollers, IoT devices, and appliances.',
            'Read Operations: Standard CPU operation is read-only during normal computing execution.',
            'Mask ROM: Hardwired during semiconductor fabrication; cannot be modified or updated.',
            'PROM (Programmable ROM): Shipped blank and electrically programmed once using microscopic fuse links.',
            'EPROM (Erasable PROM): Erased by exposing quartz window to ultraviolet (UV) light.',
            'EEPROM (Electrically Erasable PROM): Erased in-circuit via electrical signals byte-by-byte.',
            'Flash Memory: High-density EEPROM variation erasable in large sector blocks (NAND/NOR).'
          ],
          speakerNotes: 'Presented by Nikhil (Member 2). Reviewing the technological evolution from Mask ROM to modern Flash memory.'
        },
        {
          slideNumber: 6,
          title: 'Cache Memory Architecture: High-Speed Buffer & Multi-Level Cache',
          bulletPoints: [
            'Buffer Role: Small, ultra-fast memory placed directly between CPU execution units and Main RAM.',
            'Temporal Locality: If a memory location is accessed once, it is likely to be accessed again in the near future.',
            'Spatial Locality: If a memory location is accessed, nearby memory locations are likely to be accessed soon.',
            'Hardware Transparency: Operates completely automatically in hardware without requiring programmer management.',
            'L1 Cache (Primary): Integrated inside CPU core; smallest (32–64 KB), fastest (sub-nanosecond access).',
            'L2 Cache (Secondary): Dedicated per-core buffer; larger capacity (256 KB–1 MB), slightly slower access.',
            'L3 Cache (System-Level): Shared across all processor cores; high capacity (8–64 MB).',
            'Access Hierarchy Flow: CPU checks L1 -> then L2 -> then L3 -> falls back to DRAM only on cache miss.'
          ],
          speakerNotes: 'Presented by Teja (Member 3). Principles of cache buffering, locality laws, and multi-tier L1-L3 cache architectures.'
        },
        {
          slideNumber: 7,
          title: 'Cache Performance Considerations: Metrics & Access Time Analysis',
          bulletPoints: [
            'Cache Hit: Requested memory word is found directly within the high-speed cache buffer.',
            'Cache Miss: Requested word is not present, requiring retrieval from lower-tier main memory.',
            'Hit Ratio (h): Fraction of total memory references satisfied by cache: (Cache Hits) / (Total Accesses).',
            'Miss Ratio (m): Complement of hit ratio, equal to (1 - Hit Ratio).',
            'Miss Penalty: Extra latency required to fetch the required block from DRAM into cache.',
            'Typical Performance: A 90% to 95% hit ratio drastically lowers effective memory latency.',
            'Average Memory Access Time (AMAT): AMAT = Hit Time + (Miss Rate × Miss Penalty).',
            'Architectural Goal: High hit rates ensure the CPU rarely experiences the full DRAM access delay.'
          ],
          speakerNotes: 'Presented by Teja (Member 3). AMAT numerical formula, hit vs miss ratios, and cache latency mitigation.'
        },
        {
          slideNumber: 8,
          title: 'Virtual Memory Architecture: Address Translation & Paging',
          bulletPoints: [
            'Logical Address Space: Grants programs an illusion of large, contiguous virtual memory.',
            'Overcoming Physical RAM Limits: Programs can run successfully even if they exceed physical RAM size.',
            'Memory Management Unit (MMU): Hardware component performing fast virtual-to-physical address translation.',
            'Address Decoupling: Decouples user logical addresses from actual physical memory locations.',
            'Pages & Frames: Virtual memory is divided into fixed pages; physical RAM into page frames.',
            'Page Table: Maps process virtual pages to corresponding physical RAM frames.',
            'Page Fault: Triggered when an active instruction references a page not currently residing in RAM.',
            'Demand Paging: Operating system retrieves required page from secondary storage into free RAM frame.',
            'Replacement Policy: Replaces inactive pages (using LRU or FIFO) when physical memory is saturated.'
          ],
          speakerNotes: 'Presented by Srinivas (Member 4). MMU hardware translation, paging, and demand paging page fault handling.'
        },
        {
          slideNumber: 9,
          title: 'Memory Management Requirements: Core Operating System Functions',
          bulletPoints: [
            'Relocation: Dynamic address translation allowing programs to be loaded anywhere in RAM upon execution.',
            'Protection: Prevents processes from unauthorized access to other memory areas (base & limit registers).',
            'Hardware Enforcement: Hardware base and limit registers protect the operating system kernel.',
            'Sharing: Allows multiple cooperating processes to safely access common code (shared DLL libraries).',
            'Logical Organization: Structures memory into logical modules, procedures, and data arrays.',
            'Physical Organization: Coordinates transparent data flow between volatile RAM and secondary storage.',
            'System Responsibility: Managed by OS kernel and hardware without burdening application programmers.'
          ],
          speakerNotes: 'Presented by Srinivas (Member 4). The 5 fundamental requirements: Relocation, Protection, Sharing, Logical, and Physical Organization.'
        },
        {
          slideNumber: 10,
          title: 'Secondary Storage Systems: Non-Volatile Mass Storage',
          bulletPoints: [
            'Permanent Data Repository: Non-volatile storage for OS kernel, applications, and user files.',
            'Massive Storage Capacity: Provides hundreds of gigabytes to several terabytes of storage volume.',
            'Lowest Cost per Bit: Highly economical compared to semiconductor SRAM and DRAM.',
            'Virtual Memory Backing: Serves as swap space holding inactive pages displaced from RAM.',
            'Solid State Drives (SSD): Uses NAND flash memory; no moving parts, high IOPS, fast random access.',
            'Hard Disk Drives (HDD): Magnetic platters with mechanical read/write arms; high capacity, economical.',
            'Removable & Optical Media: USB flash drives and optical discs (CD/DVD/Blu-ray) for portable/archival storage.'
          ],
          speakerNotes: 'Presented by Manohar (Member 5). Mass storage technology comparison between solid-state flash and magnetic platters.'
        },
        {
          slideNumber: 11,
          title: 'Comparison of Memory Levels: Quantitative Summary Across Hierarchy',
          bulletPoints: [
            'CPU Registers: CMOS Flip-Flops | Access < 1 ns | Capacity Bytes-KB | Cost/Bit Highest.',
            'Cache Memory: Static RAM (SRAM) | Access 1–10 ns | Capacity KB-MB | Cost/Bit Very High.',
            'Main Memory: Dynamic RAM (DRAM) | Access 50–100 ns | Capacity 8–64 GB | Cost/Bit Moderate.',
            'Secondary Storage: SSD / HDD Magnetic | Access Micro to Milliseconds | Capacity 512GB–4TB | Cost/Bit Lowest.',
            'Hierarchy Law: As we move downward, access latency increases, capacity expands, and cost per bit plummets.',
            'Engineering Harmony: High-speed execution is sustained without incurring prohibitive semiconductor manufacturing costs.'
          ],
          speakerNotes: 'Presented by Manohar (Member 5). Comprehensive comparative matrix across latency, capacity, and cost tiers.'
        },
        {
          slideNumber: 12,
          title: 'Summary, Conclusion & Team Acknowledgements',
          bulletPoints: [
            'Unified Hierarchy: Bridges the growing processor-memory performance gap (Memory Wall).',
            'Complementary Roles: Fast SRAM caches mask DRAM latencies, while virtual memory leverages disk capacity.',
            'Cost-Effective Performance: Delivers near-cache access speed at main memory capacity and budget.',
            'System Stability: OS memory management ensures isolation, protection, and dynamic relocation.',
            'THANK YOU! Seminar Presentation Team (CAI 2-1):',
            '• Member 1: Karthikeya (Intro & Hierarchy Structure)',
            '• Member 2: Nikhil (Semiconductor RAM & ROM)',
            '• Member 3: Teja (Cache Memory & Performance)',
            '• Member 4: Srinivas (Virtual Memory & Management)',
            '• Member 5: Manohar (Secondary Storage & Summary)',
            'Subject: Digital Logic and Computer Organization (DLCO) | JNTUK R23 Regulation | Department of CSE'
          ],
          speakerNotes: 'Presented by Manohar (Member 5). Final seminar wrap-up and acknowledgements.'
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
