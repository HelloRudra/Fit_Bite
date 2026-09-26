export const CATEGORY_STYLES = {
  CHEST: "bg-red-500/15 text-red-400 border border-red-500/30",
  BACK: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  LEGS: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  ARMS: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
  SHOULDERS: "bg-teal-500/15 text-teal-400 border border-teal-500/30",
  CORE: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
};

export function tagStyle(tag) {
  return CATEGORY_STYLES[tag] || "bg-white/10 text-white border border-white/20";
}
