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
    summary: 'Hardware organization, internal array logic, capacity sizing, and system address decoding for Read-Only Memory (ROM) and RAM under Computer Organization & Architecture.',
    keyConcepts: [
      'Primary Memory Fundamentals (Address, Data, Control Bus Coupling)',
      'RAM vs. ROM Comparative Characteristics (Volatile vs Non-Volatile)',
      'Classification of ROM (Mask ROM, PROM, EPROM, EEPROM, Flash)',
      'Internal ROM Architecture (Row Decoder k → 2^k, Crosspoint Array 2^k × w)',
      'ROM Capacity Sizing Formulation (Capacity = 2^k × w bits)',
      'Address Mapping & Decoding (High-Order vs Low-Order Bits, Chip Select CS)',
      'Practical 64 KB Memory Map Design (Boot ROM, System RAM, Reserved Blocks)'
    ],
    presentation: {
      id: 'pres-topic-4',
      topicId: 'topic-4',
      fileName: 'DLCO_Topic04_ROM_Architecture_Mapping.pdf',
      fileType: 'pdf',
      fileSize: 855073, // ~855 KB
      fileUrl: '/presentations/DLCO_Topic04_ROM_Architecture_Mapping.pdf',
      uploadedAt: '2026-10-30T12:45:00.000Z',
      uploadedBy: 'Seminar Presentation Team (John Paul, Nishant, Ganesh, Ram Charan, Seshu)',
      description: 'Official Seminar Presentation on Primary Memory, ROM Architecture & Address Mapping (Computer Organization & Architecture Seminar).',
      slideCount: 11,
      slides: [
        {
          slideNumber: 1,
          title: 'Primary Memory, ROM Architecture & Address Mapping',
          bulletPoints: [
            'Hardware Organization, Internal Array Logic, and System Address Decoding',
            'Computer Organization & Architecture Seminar',
            'Presented by Seminar Team:',
            '• John Paul (Primary Memory Fundamentals & RAM vs ROM)',
            '• Nishant (Classification of ROM)',
            '• Ganesh (Internal ROM Architecture & Sizing)',
            '• Ram Charan (Introduction to Memory Mapping & Concepts)',
            '• Seshu (Practical 64 KB Memory Map & Summary)'
          ],
          speakerNotes: 'Welcome faculty and students to the seminar on Primary Memory, ROM Architecture, and Address Mapping.'
        },
        {
          slideNumber: 2,
          title: 'Primary Memory Fundamentals',
          bulletPoints: [
            'Presented by: John Paul | Immediate Working Store',
            'Primary memory is the CPU’s immediate working store directly coupled through address, data, and control buses.',
            'RAM prioritizes high execution speed and volatility; ROM preserves instructions without power.',
            'Nanosecond cycle times keep memory access aligned with high-frequency processor clocks.',
            'Bus Interconnection: CPU communicates via Address Bus, Data Bus, and Control Bus.',
            'Volatile State: Fast working memory (RAM), lost when electrical power is disconnected.',
            'Non-Volatile State: Persistent firmware (ROM), permanently retained without power.'
          ],
          speakerNotes: 'Presented by John Paul. Explaining primary memory roles and the tri-bus coupling mechanism with the CPU.'
        },
        {
          slideNumber: 3,
          title: 'RAM vs ROM Comparative Matrix',
          bulletPoints: [
            'Presented by: John Paul | Core Operating Differences',
            'Volatility: RAM is Volatile | ROM is Non-Volatile (retains state without power).',
            'Operation: RAM supports dynamic Read/Write | ROM is Read-Only during normal program execution.',
            'System Role: RAM runs the OS and active programs | ROM houses bootstrap initialization firmware (BIOS/UEFI).',
            'Control Signals: RAM requires Read + Write strobes | ROM requires Output Enable (OE) + Chip Select (CS).'
          ],
          speakerNotes: 'Presented by John Paul. Detailed comparison between volatile working RAM and non-volatile boot ROM.'
        },
        {
          slideNumber: 4,
          title: 'Classification of ROM Technologies',
          bulletPoints: [
            'Presented by: Nishant | Technological Variants',
            '01 MASK ROM: Hardwired during semiconductor fabrication; non-alterable; best economics at massive manufacturing scale.',
            '02 PROM (Programmable ROM): Shipped blank and programmed once by blowing microscopic fuse links permanently.',
            '03 EPROM (Erasable PROM): Erased by exposing quartz window to ultraviolet (UV) light; uses floating-gate MOS cells.',
            '04 EEPROM (Electrically Erasable PROM): In-circuit electrically erasable and byte-by-byte programmable without removing chip.'
          ],
          speakerNotes: 'Presented by Nishant. Tracing the evolution of ROM from hardwired Mask ROM to electrically reprogrammable EEPROM.'
        },
        {
          slideNumber: 5,
          title: 'Internal ROM Architecture',
          bulletPoints: [
            'Presented by: Ganesh | Internal Array Logic',
            'Address Inputs: k address lines supplied to the decoder.',
            'Row Decoder: k-to-2^k decoder generating 2^k distinct word lines.',
            'Crosspoint Array: 2^k × w memory cell array of diodes or transistors storing individual bit patterns.',
            'Sense Buffers: w data bit output lines transferring retrieved data to the system bus.',
            'Core Operational Rule: Exactly one word line is selected by the decoder, driving w sensed output bits onto the data lines.'
          ],
          speakerNotes: 'Presented by Ganesh. Walkthrough of internal ROM organization from address input decoding to sense amplifiers.'
        },
        {
          slideNumber: 6,
          title: 'ROM Capacity Sizing Formulation',
          bulletPoints: [
            'Presented by: Ganesh | Sizing Calculations',
            'Capacity Formula: Capacity (bits) = 2^k × w',
            '• Where k = number of address input lines, w = word width in bits.',
            'Step 1: Given 13 address lines (k = 13).',
            'Step 2: Total addressable words = 2^13 = 8,192 words.',
            'Step 3: Total bit capacity = 8,192 words × 8 bits/word = 65,536 bits.',
            'Conclusion: 65,536 bits / (8 bits/byte × 1024 bytes/KB) = 8 KB ROM chip.'
          ],
          speakerNotes: 'Presented by Ganesh. Mathematical proof and capacity sizing calculation for an 8 KB ROM array.'
        },
        {
          slideNumber: 7,
          title: 'Introduction to Memory Mapping',
          bulletPoints: [
            'Presented by: Ram Charan | System Address Allocation',
            'Definition: Memory mapping assigns specific contiguous address ranges to physical RAM and ROM devices.',
            'CPU Access: Helps CPU locate and access the correct memory device deterministically without address bus conflict.',
            'Unique Addressing: Every individual byte location in memory is assigned a unique, unambiguous system address.',
            'Address Decoder: Decodes high-order address bits from the CPU to identify and enable the targeted memory chip.',
            'Chip Select (CS): Active-low signal that activates only the selected memory chip while keeping all other chips in high-impedance state.',
            'Address Mapping Example: RAM assigned 0x0000–0xBFFF (48 KB) | ROM assigned 0xC000–0xCFFF (4 KB).'
          ],
          speakerNotes: 'Presented by Ram Charan. Explaining system address mapping and chip-select activation.'
        },
        {
          slideNumber: 8,
          title: 'Working & Important Architectural Concepts',
          bulletPoints: [
            'Presented by: Ram Charan | Decoding Hardware and Signals',
            'High-Order Address Bits: Act as chip-select control inputs to choose which specific memory chip responds to the CPU.',
            'Low-Order Address Bits: Act as internal address offsets to pinpoint the exact storage cell or byte within the selected chip.',
            'Address Decoder: Dedicated combinational logic hardware matching incoming address ranges to physical chip enables.',
            'Chip Select (CS): An enable pin that activates data transfer exclusively for the targeted memory unit.',
            'Bus Contention Prevention: Occurs when multiple devices attempt to drive data onto the system bus simultaneously. Proper address decoding and mutual exclusion prevent bus conflicts.'
          ],
          speakerNotes: 'Presented by Ram Charan. Explaining high-order vs low-order bit splitting and bus contention mitigation.'
        },
        {
          slideNumber: 9,
          title: 'Practical 64 KB Memory Map Design',
          bulletPoints: [
            'Presented by: Seshu | 16-Bit Address Space (A15–A0)',
            'System Architecture: 16-bit address space (64 KB total), Internal chip offset: 13 lines (A12–A0 = 8 KB each).',
            '0000H–1FFFH: BOOT ROM | High-order bits A15 A14 A13 = 000 | 8 KB Capacity.',
            '2000H–3FFFH: SYSTEM RAM 1 | High-order bits A15 A14 A13 = 001 | 8 KB Capacity.',
            '4000H–5FFFH: SYSTEM RAM 2 | High-order bits A15 A14 A13 = 010 | 8 KB Capacity.',
            '6000H–FFFFH: EXPANSION / RESERVED | High-order bits = 011 to 111 | 40 KB Address Space.',
            'Decoding Principle: 3 high-order bits select the 8 KB memory block; 13 low-order bits locate the exact byte inside it.'
          ],
          speakerNotes: 'Presented by Seshu. Step-by-step breakdown of a practical 64 KB memory map with boot ROM and RAM banks.'
        },
        {
          slideNumber: 10,
          title: 'Summary & Key Takeaways',
          bulletPoints: [
            'Presented by: Seshu | Core Engineering Principles',
            '01 RETAIN: Non-volatile ROM safeguards boot vectors, reset vectors, and initial system firmware reliability.',
            '02 DECODE: Efficient selection logic and block decoders minimize microprocessor pin count and hardware wiring complexity.',
            '03 ISOLATE: Absolute address decoding prevents bus contention, floating bus lines, and destructive address aliasing.'
          ],
          speakerNotes: 'Presented by Seshu. The three golden rules: Retain, Decode, and Isolate.'
        },
        {
          slideNumber: 11,
          title: 'Q&A - Questions & Discussion',
          bulletPoints: [
            'Thank you for your attention! The floor is now open for questions and technical discussion.',
            'Seminar Topic: Primary Memory, ROM Architecture & Address Mapping',
            'Computer Organization & Architecture Seminar',
            'Seminar Presentation Team:',
            '• John Paul • Nishant • Ganesh • Ram Charan • Seshu'
          ],
          speakerNotes: 'Presented by Seminar Team (John Paul, Nishant, Ganesh, Ram Charan, Seshu). Final seminar conclusion and open floor Q&A.'
        }
      ]
    }
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
    summary: 'Principles of ultra-high-speed buffer memory, cache levels (L1/L2/L3), Hit Ratio and Miss Ratio formulations, and Average Memory Access Time (AMAT) performance analysis.',
    keyConcepts: [
      'Cache Memory Concept & Principles (Small, high-speed memory close to CPU)',
      'Multi-Level Cache Architecture (L1 Closest/Fastest, L2 Larger, L3 Shared)',
      'Cache Operation Flow (Cache Hit vs. Cache Miss Pathways)',
      'Hit Ratio Formulation (Hits / Total Requests × 100)',
      'Miss Ratio Formulation (Misses / Total Requests × 100)',
      'Complementary Ratio Property (Hit Ratio + Miss Ratio = 100%)',
      'Average Memory Access Time (AMAT = Hit Time + (Miss Rate × Miss Penalty))'
    ],
    presentation: {
      id: 'pres-topic-6',
      topicId: 'topic-6',
      fileName: 'DLCO_Topic06_Cache_Memory_Hit_Miss_Ratio.pdf',
      fileType: 'pdf',
      fileSize: 143273, // 143 KB
      fileUrl: '/presentations/DLCO_Topic06_Cache_Memory_Hit_Miss_Ratio.pdf',
      uploadedAt: '2026-10-30T13:00:00.000Z',
      uploadedBy: 'Computer Organization Seminar Team (Batch 14)',
      description: 'Official Seminar Presentation on Cache Memory: Hit Ratio, Miss Ratio, and AMAT Performance Analysis.',
      slideCount: 11,
      slides: [
        {
          slideNumber: 1,
          title: 'Cache Memory – Hit Ratio / Miss Ratio',
          bulletPoints: [
            'Computer Organization Seminar | Batch 14',
            'Understanding how a computer finds data quickly — and what happens when it does not.',
            'Core Theme: Fast Access • Fewer Slow Memory Trips',
            'Focus Areas:',
            '• What is cache memory and why do processors need it?',
            '• Multi-level cache hierarchy (L1, L2, L3)',
            '• Hit vs. Miss pathways and operational mechanisms',
            '• Quantitative Hit Ratio & Miss Ratio formulas with worked examples',
            '• Average Memory Access Time (AMAT) performance modeling'
          ],
          speakerNotes: 'Welcome everyone. Today we present Cache Memory in Computer Organization, focusing on Hit Ratio, Miss Ratio, and how cache prevents costly memory trips.'
        },
        {
          slideNumber: 2,
          title: 'What is Cache Memory? (The Concept)',
          bulletPoints: [
            '02 / THE CONCEPT | Core Definition & Role',
            'Core Principle: Cache keeps useful information close to the CPU so it can be accessed quickly.',
            '• CACHE: Small, high-speed semiconductor memory positioned adjacent to the processor core.',
            '• STORES: Holds recently accessed or frequently executed instructions and data.',
            '• PURPOSE: Drastically reduces the time CPU spends waiting for data from main memory.',
            '• Desk Analogy: Think of cache as the reference notes on your study desk — immediately reachable when needed, saving you repeated long walks to the library.'
          ],
          speakerNotes: 'Presented by Batch 14. Cache functions like notes kept directly on your desk, keeping vital information within immediate reach.'
        },
        {
          slideNumber: 3,
          title: 'Why Do Computers Need Cache? (Why It Matters)',
          bulletPoints: [
            '03 / WHY IT MATTERS | The Processor-Memory Speed Gap',
            'The Speed Disparity: The processor and main memory do not operate at the same speed (Memory Wall).',
            '• Processor Demand: The CPU repeatedly requests instructions and data every cycle while running programs.',
            '• RAM Latency: RAM is larger, but access generally takes much longer (dozens of ns) than a cache hit (sub-nanosecond).',
            '• Cache Advantage: Keeps selected high-priority data near the CPU to reduce average access time.',
            '• Ultimate Aim: Less processor waiting, smoother program execution, and higher IPC.',
            'Simplified Memory Hierarchy Overview:',
            '• CPU: Processor core execution engine (Fastest)',
            '• CACHE: Very fast / Small capacity buffer',
            '• RAM: Large capacity / Slower access time',
            '• SSD / STORAGE: Persistent secondary storage / High latency'
          ],
          speakerNotes: 'Presented by Batch 14. CPU cycle times are fractions of a nanosecond, whereas DRAM access takes 50-100 ns. Cache bridges this critical speed disparity.'
        },
        {
          slideNumber: 4,
          title: 'Cache Can Have Multiple Levels (L1, L2, L3)',
          bulletPoints: [
            '04 / A LITTLE MORE DETAIL | Hierarchical Cache Organization',
            'Multi-Level Design: Modern microprocessors implement hierarchical L1, L2, and L3 caches.',
            '• L1 Cache: Closest to the CPU core; smallest capacity (32–64 KB) and fastest access speed (typically 1–4 clock cycles).',
            '• L2 Cache: Larger secondary level; often dedicated per core with moderate latency (8–14 clock cycles).',
            '• L3 Cache: Shared across multiple CPU cores; largest cache capacity (megabytes) acting as the final buffer before RAM.',
            'Architectural Note: Exact cache capacities, latencies, and core-sharing topologies vary by processor family; these represent general architectural patterns rather than fixed rules.'
          ],
          speakerNotes: 'Presented by Batch 14. Multi-level caching balances speed and capacity: ultra-fast private L1/L2 per core and a larger shared L3 cache.'
        },
        {
          slideNumber: 5,
          title: 'How It Works – Every Request Takes One of Two Paths',
          bulletPoints: [
            '05 / HOW IT WORKS | Cache Request Flow & Decision Logic',
            'Request Initiation: Whenever the CPU requests an address, it checks the cache first.',
            'Path 1 — CACHE HIT:',
            '• The requested data or instruction is present in the cache line.',
            '• Data is found and supplied to the CPU immediately without delay.',
            'Path 2 — CACHE MISS:',
            '• The requested data is absent from cache memory.',
            '• Data must be fetched from a lower level in the memory hierarchy.',
            '• If lower-level caches (L2/L3) also miss, the request is forwarded to main memory (RAM).'
          ],
          speakerNotes: 'Presented by Batch 14. Every memory reference branches into either a Cache Hit (data supplied immediately) or a Cache Miss (request routed to lower levels).'
        },
        {
          slideNumber: 6,
          title: 'Hit Ratio – How Often Is Data Found in Cache?',
          bulletPoints: [
            '06 / HIT RATIO | Measuring Cache Effectiveness',
            'Definition: A cache hit occurs when the CPU requested data is found in cache memory.',
            'Hit Ratio Mathematical Formula:',
            '• Hit Ratio (%) = (Hits ÷ Total Requests) × 100',
            '• Hit Rate (Decimal) = Hits ÷ Total Requests',
            'Significance: A high hit ratio indicates that the vast majority of memory references are served directly from fast cache.',
            'Benchmark Metric: Hit ratio is the primary indicator of cache efficiency and program locality.',
            'Worked Example Calculation:',
            '• 80 hits out of 100 total requests:',
            '• Hit Ratio = (80 ÷ 100) × 100 = 80%'
          ],
          speakerNotes: 'Presented by Batch 14. Hit ratio represents the percentage of requests satisfied by the cache. In this example, 80 hits out of 100 requests gives an 80% hit ratio.'
        },
        {
          slideNumber: 7,
          title: 'Miss Ratio – How Often Is Data Absent from Cache?',
          bulletPoints: [
            '07 / MISS RATIO | Measuring Cache Misses',
            'Definition: A cache miss occurs when the CPU requested data is not found in cache memory.',
            'Miss Ratio Mathematical Formula:',
            '• Miss Ratio (%) = (Misses ÷ Total Requests) × 100',
            '• Miss Rate (Decimal) = Misses ÷ Total Requests',
            'Consequence: A miss forces the memory controller to query lower memory levels (L2, L3, or DRAM).',
            'Performance Penalty: Misses introduce substantial wait cycles and inflate average access time.',
            'Worked Example Calculation:',
            '• 20 misses out of 100 total requests:',
            '• Miss Ratio = (20 ÷ 100) × 100 = 20%'
          ],
          speakerNotes: 'Presented by Batch 14. Miss ratio measures the proportion of requests that miss. For 20 misses out of 100 requests, the miss ratio is 20%.'
        },
        {
          slideNumber: 8,
          title: 'Worked Example – Calculating Both Ratios',
          bulletPoints: [
            '08 / WORKED EXAMPLE | Step-by-Step Numerical Walkthrough',
            'Problem Scenario: Suppose an executing program performs 100 memory requests.',
            'Given Parameters:',
            '• Total Memory Requests = 100',
            '• Cache Hits = 80',
            '• Cache Misses = 20',
            'Calculations:',
            '• Hit Ratio = (80 ÷ 100) × 100 = 80%',
            '• Miss Ratio = (20 ÷ 100) × 100 = 20%',
            'Sum & Balance Check:',
            '• 80% + 20% = 100%',
            'Verification Principle: Total Hits + Total Misses must always equal Total Requests.'
          ],
          speakerNotes: 'Presented by Batch 14. Demonstrating the complete calculation: 80 hits give 80%, 20 misses give 20%, summing cleanly to 100% of all requests.'
        },
        {
          slideNumber: 9,
          title: 'Relationship – The Two Ratios Are Complementary',
          bulletPoints: [
            '09 / RELATIONSHIP | Complementary Nature of Hit and Miss Ratios',
            'Fundamental Axiom: For any single set of requests, every request is counted as either a hit or a miss.',
            'Mathematical Relationship:',
            '• Hit Ratio + Miss Ratio = 100%',
            '• Or in decimal rate form: Hit Rate + Miss Rate = 1.0',
            '• Derived Formulas: Miss Ratio = 100% - Hit Ratio | Hit Ratio = 100% - Miss Ratio',
            'Architectural Implications:',
            '• Higher Hit Ratio: Directly translates to fewer slow-memory accesses.',
            '• Lower Miss Ratio: Crucial to minimizing Average Memory Access Time (AMAT).',
            '• Design Goal: Maximize hit ratio within chip area and power constraints.'
          ],
          speakerNotes: 'Presented by Batch 14. Hit Ratio and Miss Ratio are mathematically complementary: Hit Ratio + Miss Ratio = 100%. Improving one directly reduces the other.'
        },
        {
          slideNumber: 10,
          title: 'Performance – Why Do These Ratios Matter? (AMAT)',
          bulletPoints: [
            '10 / PERFORMANCE | Average Memory Access Time (AMAT) Modeling',
            'Why Ratios Matter: Misses incur severe latency stalls, meaning hit rate alone does not reveal the full performance picture.',
            '• Higher Hit Ratio: Generally leads to fewer expensive misses and smoother execution.',
            '• Higher Miss Ratio: Causes severe processor idling while awaiting RAM responses.',
            'Average Memory Access Time (AMAT) Formula:',
            '• AMAT = Hit Time + (Miss Rate × Miss Penalty)',
            'Parameter Breakdown:',
            '• Hit Time: Time required to access cache (e.g., 1 ns / 1 clock cycle).',
            '• Miss Rate: The miss ratio expressed as a decimal (e.g., 20% = 0.20).',
            '• Miss Penalty: The additional latency needed to fetch data from main memory into cache (e.g., 50–100 ns).'
          ],
          speakerNotes: 'Presented by Batch 14. AMAT formula models real-world memory latency. Because Miss Penalty is so high, reducing the Miss Rate has an outsized impact on system throughput.'
        },
        {
          slideNumber: 11,
          title: 'Recap & Conclusion – Three Things to Remember',
          bulletPoints: [
            '11 / RECAP | Key Takeaways & Summary',
            'Three Core Principles to Remember:',
            '1. CACHE: Small, high-speed memory placed close to the CPU to buffer frequent data.',
            '2. HIT RATIO: Measures how often requested data is successfully found in cache.',
            '3. MISS RATIO: Measures how often requested data is absent and requires a trip to slower memory.',
            'Performance Rule: More hits + fewer misses = generally superior computer performance.',
            'THANK YOU! • QUESTIONS & DISCUSSION',
            'Computer Organization Seminar Presentation | Batch 14'
          ],
          speakerNotes: 'Presented by Batch 14. To wrap up: Cache minimizes CPU idle time; Hit Ratio measures success; Miss Ratio measures penalties. Together they determine AMAT. Thank you!'
        }
      ]
    }
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
