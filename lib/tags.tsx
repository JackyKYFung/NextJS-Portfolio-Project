// lib/tags.ts

export const TAG_THEMES: Record<string, string> = {
  javascript: "bg-[#FFA556]", // The orange from your screenshot
  react: "bg-[#61AFEF]",      // The blue from your screenshot
  nextjs: "bg-[#ABB2BF]",     // A sleek gray
  tailwind: "bg-[#56B6C2]",   // Teal
  css: "bg-[#ff7b71]",
  wordpress: "bg-[#ffd800]",
  acf: "bg-[#D6FF79]",
  php: "bg-[#7BC5F6]",
  elementor: "bg-[#4ec9b0]",
  wpbakery: "bg-[#6A69B5]",
  jquery: "bg-[#4ec9b0]",
  html5: "bg-[#EE4266]",
  default: "bg-zinc-700",
};

/**
 * Helper to get the theme safely
 */
export const getTagTheme = (tagName: string) => {
  return TAG_THEMES[tagName.toLowerCase()] || TAG_THEMES.default;
};
