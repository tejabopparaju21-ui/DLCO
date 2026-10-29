const fs = require('fs');
const path = require('path');

// Helper to build a clean valid multi-page PDF 1.4
function createPresentationPDF(outputPath) {
  const pages = [
    {
      title: "Digital Logic & Computer Organization",
      subtitle: "Topic 01: Memory Hierarchy Design & Performance",
      content: [
        "Department of Computer Science & Engineering",
        "Faculty: Prof. Computer Architecture",
        "Interactive Seminar Presentation Deck",
        "",
        "Overview:",
        "- Need for Memory Hierarchy & The Memory Wall",
        "- The Multi-Tier Pyramid Structure",
        "- Locality of Reference (Temporal & Spatial)",
        "- Effective Memory Access Time (EMAT) & Numerical Analysis"
      ]
    },
    {
      title: "1. The Need for Memory Hierarchy",
      subtitle: "Bridging the Processor-Memory Gap",
      content: [
        "Key Challenges in Modern Systems:",
        "- Speed Divergence: CPU frequency scales faster than DRAM latency.",
        "- Cost Constraint: Fast memory (SRAM) is costly; large memory (DRAM) is slower.",
        "- Capacity Demands: Modern workloads require gigabytes of address space.",
        "- The Ideal Memory: As fast as SRAM, as large as disk, as cheap as flash.",
        "- Solution: Layered hierarchy leveraging caching and spatial/temporal locality."
      ]
    },
    {
      title: "2. The Memory Hierarchy Pyramid",
      subtitle: "Levels, Access Times & Typical Capacities",
      content: [
        "Level 0 - CPU Internal Registers : 0.25 - 0.5 ns | ~1 KB | Compiler Managed",
        "Level 1 - L1 Cache (I-Cache/D-Cache) : 0.5 - 1.5 ns | 32-128 KB | Hardware Managed",
        "Level 2 - L2 Cache (Per Core) : 3.0 - 7.0 ns | 256KB-1MB | Hardware Managed",
        "Level 3 - L3 Shared Cache : 10 - 25 ns | 8 - 64 MB | Hardware Managed",
        "Level 4 - Main Memory (DRAM) : 50 - 80 ns | 8 - 64 GB | OS & Hardware Managed",
        "Level 5 - Solid-State Drive (SSD) : 10 - 50 us | 512GB - 2TB | File System Managed",
        "Level 6 - Cloud & Tertiary Archival : >100 ms | Unlimited | Distributed Storage"
      ]
    },
    {
      title: "3. Locality of Reference Principle",
      subtitle: "The Foundation of Caching Effectiveness",
      content: [
        "Temporal Locality (Locality in Time):",
        "  - If a memory location is accessed, it will be accessed again soon.",
        "  - Examples: Loop counters, recurrent variables, subroutines.",
        "",
        "Spatial Locality (Locality in Space):",
        "  - If a location is referenced, adjacent locations are likely to be accessed.",
        "  - Examples: Sequential instruction fetch, array iterations, struct records.",
        "",
        "Empirical Law: 90/10 Rule - 90% of execution time is spent in 10% of the code."
      ]
    },
    {
      title: "4. Effective Memory Access Time (EMAT)",
      subtitle: "Formula & Numerical Analysis",
      content: [
        "Basic Two-Tier Formula:",
        "  EMAT = h * Tc + (1 - h) * (Tc + Tm)",
        "  Where: h = Hit Ratio, Tc = Cache Access Time, Tm = Main Memory Time",
        "",
        "Numerical Demonstration:",
        "  Given Tc = 2 ns, Tm = 50 ns",
        "  If h = 0.90 (90% hit rate):",
        "    EMAT = 0.90 * 2 + 0.10 * 52 = 1.8 + 5.2 = 7.0 ns",
        "  If h = 0.98 (98% hit rate):",
        "    EMAT = 0.98 * 2 + 0.02 * 52 = 1.96 + 1.04 = 3.0 ns",
        "  Conclusion: An 8% hit rate increase more than doubles performance!"
      ]
    },
    {
      title: "5. Summary and Review Questions",
      subtitle: "Key Takeaways for Students",
      content: [
        "Takeaway 1: Memory hierarchy hides latency through predictive caching.",
        "Takeaway 2: Lower tiers provide non-volatile, economical bulk storage.",
        "Takeaway 3: Cache replacement and mapping determine real-world throughput.",
        "",
        "Seminar Review Questions:",
        "1. Differentiate between spatial and temporal locality with C++ examples.",
        "2. Compute EMAT for a 3-tier system (L1, L2, DRAM).",
        "3. Explain why registers cannot replace cache memories entirely."
      ]
    }
  ];

  let objects = [];
  let pageObjectIds = [];

  // Font descriptor object (id 1)
  // Font object (id 2)
  // Catalog (id 3)
  // Pages (id 4)
  // Next IDs will be 5, 6, 7... for each page and stream

  let currentId = 5;

  const pageContents = pages.map((p) => {
    const pageId = currentId++;
    const contentId = currentId++;
    pageObjectIds.push(pageId);

    // Build PDF content stream
    let streamText = "BT\n";
    // Title
    streamText += "/F1 20 Tf\n";
    streamText += "50 540 Td\n";
    streamText += `(${escapePdf(p.title)}) Tj\n`;

    // Subtitle
    streamText += "/F2 12 Tf\n";
    streamText += "0 -25 Td\n";
    streamText += `(${escapePdf(p.subtitle)}) Tj\n`;

    // Horizontal rule
    streamText += "ET\n";
    streamText += "50 500 m 750 500 l S\n";
    streamText += "BT\n";

    // Content lines
    streamText += "/F2 11 Tf\n";
    streamText += "50 470 Td\n";

    p.content.forEach((line) => {
      streamText += `(${escapePdf(line)}) Tj\n`;
      streamText += "0 -18 Td\n";
    });

    // Footer
    streamText += "/F2 9 Tf\n";
    streamText += "0 -40 Td\n";
    streamText += `(Digital Logic and Computer Organization -- DLCO Seminar Portal) Tj\n`;
    streamText += "ET\n";

    return {
      pageId,
      contentId,
      streamText
    };
  });

  // Assemble Objects
  // 1: Font Helvetica-Bold
  // 2: Font Helvetica
  // 3: Catalog
  // 4: Pages tree

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
    // Page obj
    recordOffset();
    pdf += `${p.pageId} 0 obj\n<< /Type /Page /Parent 4 0 R /MediaBox [0 0 792 612] /Resources << /Font << /F1 1 0 R /F2 2 0 R >> >> /Contents ${p.contentId} 0 R >>\nendobj\n`;

    // Stream obj
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
