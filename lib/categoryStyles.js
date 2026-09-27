export const CATEGORY_STYLES = {
  CHEST: "bg-red-500/15 text-white-400 border border-red-500/30",
  BACK: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  LEGS: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  ARMS: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
  SHOULDERS: "bg-teal-500/15 text-teal-400 border border-teal-500/30",
  CORE: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  ABS: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  FULL_BODY: "bg-pink-500/15 text-pink-400 border border-pink-500/30",
  CARDIO: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
};

export function tagStyle(tag) {
  const key = (tag || "").toString().toUpperCase().replace(/\s+/g, "_");
  return CATEGORY_STYLES[key] || "bg-white/10 text-white border border-white/20";
}
