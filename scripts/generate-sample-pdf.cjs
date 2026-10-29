const fs = require('fs');
const path = require('path');

function createPresentationPDF(outputPath) {
  const pages = [
    {
      title: "MEMORY HIERARCHY",
      subtitle: "Organization of Memory in Computer Systems | DLCO Unit IV",
      content: [
        "Digital Logic and Computer Organization (DLCO) | Unit IV",
        "JNTUK R23 Regulation | Department of Computer Science & Engineering",
        "",
        "Presented by (Team of 5 Members - CAI 2-1):",
        "  - Member 1: Karthikeya (Intro & Hierarchy Structure)",
        "  - Member 2: Nikhil (Semiconductor RAM & ROM)",
        "  - Member 3: Teja (Cache Memory & Performance)",
        "  - Member 4: Srinivas (Virtual Memory & Management)",
        "  - Member 5: Manohar (Secondary Storage & Summary)",
        "",
        "Seminar Presentation & Comprehensive Architectural Study"
      ]
    },
    {
      title: "1. Introduction to Memory Organization",
      subtitle: "Presented by: Member 1 (Karthikeya) | Basic Concepts & Trade-offs",
      content: [
        "Role of Memory in Systems:",
        "  - Memory stores programs, instructions, operational data, and computation results.",
        "  - Crucial subsystem directly determining processor utilization and throughput.",
        "  - CPU executes instructions at nanosecond clock speeds requiring rapid data access.",
        "  - A single memory technology cannot satisfy both maximum speed and maximum capacity.",
        "",
        "The Core Trade-offs & Hierarchy Strategy:",
        "  - Speed vs. Cost: Faster memory technologies are substantially more expensive per bit.",
        "  - Capacity vs. Speed: Larger capacity memories exhibit longer physical access latencies.",
        "  - Hierarchy Strategy: Combines multiple memory technologies in a tiered structure.",
        "  - Goal: Delivers nearly the speed of fastest memory with the capacity and cost of cheapest."
      ]
    },
    {
      title: "2. Structure of Memory Hierarchy",
      subtitle: "Presented by: Member 1 (Karthikeya) | The Memory Pyramid",
      content: [
        "The Memory Pyramid (Top to Bottom):",
        "  1. CPU Internal Registers : Access < 1 ns | Bytes to KB | Highest cost per bit",
        "  2. Cache Memory (L1, L2, L3) : Fast SRAM bridging processor & main memory speeds",
        "  3. Main Memory (RAM) : System DRAM holding active applications and datasets (50-100 ns)",
        "  4. USB / Flash Memory : High-density solid-state intermediate storage",
        "  5. Magnetic Disk / Hard Disk : Secondary storage; high capacity, low cost per bit",
        "  6. Magnetic Tapes / Drives : Archival storage; highest capacity, lowest cost per bit",
        "",
        "Key Hierarchy Trends:",
        "  - Downward trend: Access latency increases, capacity expands, cost per bit decreases."
      ]
    },
    {
      title: "3. Semiconductor RAM Memories",
      subtitle: "Presented by: Member 2 (Nikhil) | Random Access Memory (SRAM & DRAM)",
      content: [
        "Static RAM (SRAM):",
        "  - Storage: Built using bistable flip-flop logic circuits (4 to 6 transistors per cell).",
        "  - Speed: Very fast access times (sub-nanosecond to few nanoseconds).",
        "  - Refreshing: Does NOT require dynamic periodic refreshing while power is maintained.",
        "  - Primary Application: Used exclusively for CPU internal and external Cache memory.",
        "",
        "Dynamic RAM (DRAM):",
        "  - Storage: Stores bits as electrical charges in tiny capacitor-transistor pairs.",
        "  - Refreshing: Charge leaks away continuously; requires periodic refreshing cycles.",
        "  - Density & Cost: Extremely high bit density, simple cell layout, very low cost per bit.",
        "  - Primary Application: Standard choice for computer Main Memory (System RAM)."
      ]
    },
    {
      title: "4. Read-Only Memory (ROM)",
      subtitle: "Presented by: Member 2 (Nikhil) | Non-Volatile Semiconductor Storage",
      content: [
        "ROM Characteristics & Role:",
        "  - Non-Volatile: Retains program code permanently even when electrical power is disconnected.",
        "  - System Bootstrap: Holds initialization programs (BIOS / UEFI) and startup routines.",
        "  - Embedded Firmware: Stores dedicated control routines in microcontrollers & appliances.",
        "  - Normal Operation: Standard CPU operation is strictly read-only during execution.",
        "",
        "Evolution & Types of ROM:",
        "  - Mask ROM: Hardwired during fabrication; cannot be modified or updated.",
        "  - PROM: Shipped blank and electrically programmed once using fuse links.",
        "  - EPROM: Erased by exposing chip die to ultraviolet (UV) light.",
        "  - EEPROM: Electrically Erasable PROM; erased in-circuit via electrical signals byte-by-byte.",
        "  - Flash Memory: High-density EEPROM variation erasable in large sector blocks."
      ]
    },
    {
      title: "5. Cache Memory Architecture",
      subtitle: "Presented by: Member 3 (Teja) | High-Speed Buffer & Multi-Level Cache",
      content: [
        "Principles of Cache Operation:",
        "  - Buffer Role: Small, ultra-fast memory placed directly between CPU execution units & DRAM.",
        "  - Temporal Locality: Recently accessed items are likely to be accessed again in near future.",
        "  - Spatial Locality: Items stored near recently accessed items are likely to be accessed soon.",
        "  - Transparency: Operates automatically in hardware without programmer management.",
        "",
        "Multi-Level Cache Organization:",
        "  - L1 Cache: Integrated inside CPU core; smallest (32-64 KB), fastest (sub-nanosecond).",
        "  - L2 Cache: Dedicated per-core buffer; larger (256 KB-1 MB), slightly slower access.",
        "  - L3 Cache: Shared across all processor cores; high capacity (8-64 MB).",
        "  - Access Flow: CPU checks L1 -> L2 -> L3 -> falls back to DRAM only on cache miss."
      ]
    },
    {
      title: "6. Cache Performance Considerations",
      subtitle: "Presented by: Member 3 (Teja) | Metrics & Access Time Analysis",
      content: [
        "Key Performance Metrics:",
        "  - Cache Hit: Requested memory word is found directly within cache buffer.",
        "  - Cache Miss: Requested word is not present, requiring retrieval from main memory.",
        "  - Hit Ratio (h): Fraction of memory references satisfied by cache: (Hits) / (Total Accesses).",
        "  - Miss Ratio: Complement of hit ratio, equal to (1 - Hit Ratio).",
        "  - Miss Penalty: Extra latency required to fetch the required block from DRAM into cache.",
        "",
        "Performance Analysis & Average Memory Access Time (AMAT):",
        "  - Typical Hit Ratio: 90% - 95% hit ratio drastically lowers effective memory latency.",
        "  - Formula: AMAT = Hit Time + (Miss Rate * Miss Penalty).",
        "  - High hit rates ensure CPU rarely experiences the full DRAM access delay."
      ]
    },
    {
      title: "7. Virtual Memory Architecture",
      subtitle: "Presented by: Member 4 (Srinivas) | Address Translation & Paging",
      content: [
        "Concept & Hardware Support:",
        "  - Logical Address Space: Grants running programs an illusion of large, contiguous memory.",
        "  - Overcoming Limits: Programs can run even if they exceed physical RAM size.",
        "  - Memory Management Unit (MMU): Hardware component performing fast address translation.",
        "  - Decoupling: Decouples user logical addresses from actual physical memory locations.",
        "",
        "Paging & Page Fault Mechanism:",
        "  - Pages & Frames: Virtual memory divided into pages; physical RAM into page frames.",
        "  - Page Table: Maps process virtual pages to corresponding physical RAM frames.",
        "  - Page Fault: Triggered when an active instruction references a page not currently in RAM.",
        "  - Demand Paging: OS retrieves required page from secondary storage into free RAM frame.",
        "  - Replacement Policy: Replaces inactive pages (using LRU or FIFO) when memory is full."
      ]
    },
    {
      title: "8. Memory Management Requirements",
      subtitle: "Presented by: Member 4 (Srinivas) | Core Operating System Functions",
      content: [
        "Core Hardware and OS Functions:",
        "  - Relocation: Dynamic address translation allowing programs to be loaded anywhere in RAM.",
        "  - Protection: Prevents processes from unauthorized access to other memory areas.",
        "  - Base & Limit Registers: Enforce hardware protection boundaries.",
        "  - Sharing: Allows cooperating processes to access common code safely (shared DLLs).",
        "  - Logical Organization: Structures memory into logical modules, procedures, and arrays.",
        "  - Physical Organization: Coordinates transparent flow between volatile RAM & secondary disk.",
        "  - Maximizes multitasking throughput and system stability."
      ]
    },
    {
      title: "9. Secondary Storage Systems",
      subtitle: "Presented by: Member 5 (Manohar) | Non-Volatile Mass Storage",
      content: [
        "Role in Memory Hierarchy:",
        "  - Permanent Repository: Non-volatile storage for OS kernel, applications, and user files.",
        "  - Massive Capacity: Provides hundreds of gigabytes to several terabytes of storage volume.",
        "  - Lowest Cost per Bit: Highly economical compared to semiconductor SRAM and DRAM.",
        "  - Virtual Memory Backing: Serves as swap space holding inactive pages displaced from RAM.",
        "",
        "Storage Media Technologies:",
        "  - Solid State Drives (SSD): NAND flash memory; no moving parts, high IOPS, fast random access.",
        "  - Hard Disk Drives (HDD): Magnetic platters with mechanical arms; high capacity, economical.",
        "  - Removable & Optical Media: USB flash drives and optical discs (CD/DVD/Blu-ray)."
      ]
    },
    {
      title: "10. Comparison of Memory Levels",
      subtitle: "Presented by: Member 5 (Manohar) | Quantitative Summary Across Hierarchy",
      content: [
        "Quantitative Comparison Matrix:",
        "  - CPU Registers : CMOS Flip-Flops | < 1 ns | Bytes to KB | Highest Cost/Bit",
        "  - Cache Memory : Static RAM (SRAM) | 1 - 10 ns | KB to MB | Very High Cost/Bit",
        "  - Main Memory : Dynamic RAM (DRAM) | 50 - 100 ns | 8 - 64 GB | Moderate Cost/Bit",
        "  - Secondary Storage : SSD Flash / HDD Magnetic | Micro-ms | 512GB - 4TB | Lowest Cost/Bit",
        "",
        "Key Architectural Law on Memory Trade-offs:",
        "  - As we move downward: Access time increases by orders of magnitude,",
        "    capacity expands dramatically, and cost per bit plummets.",
        "  - Ensures high-speed execution without prohibitive semiconductor manufacturing costs."
      ]
    },
    {
      title: "11. Summary & Key Takeaways",
      subtitle: "Presented by: Member 5 (Manohar) | Key Insights & Wrap-up",
      content: [
        "Seminar Synthesis:",
        "  - Unified Hierarchy: Bridges the growing processor-memory performance gap (Memory Wall).",
        "  - Complementary Roles: Fast SRAM caches mask DRAM latencies, while virtual memory",
        "    pages leverage secondary storage capacity.",
        "  - Cost-Effective Performance: Delivers near-cache access speed at main memory capacity & budget.",
        "  - System Stability: OS memory management ensures isolation, protection, and relocation."
      ]
    },
    {
      title: "12. Conclusion & Team Acknowledgements",
      subtitle: "Department of Computer Science & Engineering | JNTUK R23",
      content: [
        "THANK YOU!",
        "",
        "Seminar Presentation Team (CAI 2-1):",
        "  - Member 1: Karthikeya (Intro & Hierarchy Structure)",
        "  - Member 2: Nikhil (Semiconductor RAM & ROM)",
        "  - Member 3: Teja (Cache Memory & Performance)",
        "  - Member 4: Srinivas (Virtual Memory & Management)",
        "  - Member 5: Manohar (Secondary Storage & Summary)",
        "",
        "Course: Digital Logic and Computer Organization (DLCO)",
        "Unit IV: Memory System Architecture & Organization"
      ]
    }
  ];

  let currentId = 5;
  const pageObjectIds = [];

  const pageContents = pages.map((p) => {
    const pageId = currentId++;
    const contentId = currentId++;
    pageObjectIds.push(pageId);

    let streamText = "BT\n";
    // Title
    streamText += "/F1 18 Tf\n";
    streamText += "50 545 Td\n";
    streamText += `(${escapePdf(p.title)}) Tj\n`;

    // Subtitle
    streamText += "/F2 11 Tf\n";
    streamText += "0 -22 Td\n";
    streamText += `(${escapePdf(p.subtitle)}) Tj\n`;

    // Horizontal rule
    streamText += "ET\n";
    streamText += "50 508 m 742 508 l S\n";
    streamText += "BT\n";

    // Content lines
    streamText += "/F2 10.5 Tf\n";
    streamText += "50 482 Td\n";

    p.content.forEach((line) => {
      streamText += `(${escapePdf(line)}) Tj\n`;
      streamText += "0 -16 Td\n";
    });

    // Footer
    streamText += "/F2 8.5 Tf\n";
    streamText += "0 -25 Td\n";
    streamText += `(Digital Logic and Computer Organization -- JNTUK R23 DLCO Portal -- Team Seminar Deck) Tj\n`;
    streamText += "ET\n";

    return {
      pageId,
      contentId,
      streamText
    };
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [];

  function recordOffset() {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
  }

  // Obj 1: Font F1
  recordOffset();
  pdf += "1 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n";

  // Obj 2: Font F2
  recordOffset();
  pdf += "2 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";

  // Obj 3: Catalog
  recordOffset();
  pdf += "3 0 obj\n<< /Type /Catalog /Pages 4 0 R >>\nendobj\n";

  // Obj 4: Pages
  recordOffset();
  const kidsStr = pageObjectIds.map(id => `${id} 0 R`).join(' ');
  pdf += `4 0 obj\n<< /Type /Pages /Kids [${kidsStr}] /Count ${pageObjectIds.length} >>\nendobj\n`;

  // Page and Stream objects
  pageContents.forEach(p => {
    recordOffset();
    pdf += `${p.pageId} 0 obj\n<< /Type /Page /Parent 4 0 R /MediaBox [0 0 792 612] /Resources << /Font << /F1 1 0 R /F2 2 0 R >> >> /Contents ${p.contentId} 0 R >>\nendobj\n`;

    recordOffset();
    const streamLen = Buffer.byteLength(p.streamText, 'latin1');
    pdf += `${p.contentId} 0 obj\n<< /Length ${streamLen} >>\nstream\n${p.streamText}\nendstream\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'latin1');
  pdf += "xref\n";
  pdf += `0 ${currentId}\n`;
  pdf += "0000000000 65535 f \n";

  offsets.forEach(off => {
    pdf += off.toString().padStart(10, '0') + " 00000 n \n";
  });

  pdf += "trailer\n";
  pdf += `<< /Size ${currentId} /Root 3 0 R >>\n`;
  pdf += "startxref\n";
  pdf += `${xrefOffset}\n`;
  pdf += "%%EOF\n";

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, pdf, { encoding: 'latin1' });
  console.log(`Generated PDF at ${outputPath} (${Buffer.byteLength(pdf)} bytes)`);
}

function escapePdf(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

const targetPath = path.join(__dirname, '..', 'public', 'presentations', 'DLCO_Topic01_Memory_Hierarchy_Seminar.pdf');
createPresentationPDF(targetPath);

// Also copy to dist if dist exists
const distPath = path.join(__dirname, '..', 'dist', 'presentations', 'DLCO_Topic01_Memory_Hierarchy_Seminar.pdf');
if (fs.existsSync(path.dirname(distPath))) {
  createPresentationPDF(distPath);
}
