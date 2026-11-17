export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "link"; text: string; href: string };

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; inlines: Inline[] }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] };

export type Faq = { q: string; a: string };

const LINK_OR_STRONG = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)\s]+)\))/g;

export function parseInlines(source: string): Inline[] {
  const inlines: Inline[] = [];
  let cursor = 0;
  for (const match of source.matchAll(LINK_OR_STRONG)) {
    const index = match.index ?? 0;
    if (index > cursor) inlines.push({ type: "text", text: source.slice(cursor, index) });
    if (match[2]) inlines.push({ type: "strong", text: match[2] });
    else inlines.push({ type: "link", text: match[4], href: match[5] });
    cursor = index + match[0].length;
  }
  if (cursor < source.length) inlines.push({ type: "text", text: source.slice(cursor) });
  return inlines.filter((item) => item.type !== "text" || item.text.length > 0);
}

export function plainInlines(inlines: Inline[]): string {
  return inlines.map((item) => item.text).join("");
}

export function splitFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) throw new Error("Guide is missing frontmatter");
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) throw new Error("Guide frontmatter is not closed");
  const data: Record<string, string> = {};
  for (const line of text.slice(4, end).split("\n")) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx === -1) throw new Error(`Bad frontmatter line: ${line}`);
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { data, body: text.slice(end + 5).trim() };
}

export function parseMarkdown(body: string): { blocks: Block[]; faqs: Faq[] } {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  const faqs: Faq[] = [];
  let inFaq = false;
  let current: { q: string; parts: string[] } | null = null;

  function flushFaq() {
    if (!current) return;
    const answer = current.parts.join(" ").replace(/\s+/g, " ").trim();
    if (answer) faqs.push({ q: current.q, a: answer });
    current = null;
  }

  function pushParagraph(text: string) {
    const inlines = parseInlines(text.trim());
    blocks.push({ type: "p", inlines });
    if (current) current.parts.push(plainInlines(inlines));
  }

  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushFaq();
      const text = trimmed.slice(4).trim();
      blocks.push({ type: "h3", text });
      if (inFaq) current = { q: text, parts: [] };
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushFaq();
      const text = trimmed.slice(3).trim();
      blocks.push({ type: "h2", text });
      inFaq = text === "Common questions";
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: Inline[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        const item = parseInlines(lines[index].trim().slice(2).trim());
        items.push(item);
        index += 1;
      }
      blocks.push({ type: "ul", items });
      if (current) current.parts.push(items.map((item) => plainInlines(item)).join("; "));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        const item = parseInlines(lines[index].trim().replace(/^\d+\.\s+/, ""));
        items.push(item);
        index += 1;
      }
      blocks.push({ type: "ol", items });
      if (current) current.parts.push(items.map((item) => plainInlines(item)).join("; "));
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("#") &&
      !lines[index].trim().startsWith("- ") &&
      !/^\d+\.\s+/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    pushParagraph(paragraph.join(" "));
  }

  flushFaq();
  return { blocks, faqs };
}

export function blockHasShopLink(blocks: Block[], isShop: (href: string) => boolean): boolean {
  for (const block of blocks) {
    const groups = block.type === "p" ? [block.inlines] : block.type === "ul" || block.type === "ol" ? block.items : [];
    for (const inlines of groups) {
      for (const inline of inlines) {
        if (inline.type === "link" && isShop(inline.href)) return true;
      }
    }
  }
  return false;
}
