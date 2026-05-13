const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true, typographer: true }).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addFilter("formatDate", (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("recentWriting", (arr) => {
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 5);
    return arr.filter((p) => p.date >= cutoff);
  });

  eleventyConfig.addFilter("archivedWriting", (arr) => {
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 5);
    return arr.filter((p) => p.date < cutoff);
  });

  eleventyConfig.addFilter("prevInSeries", (collection, seriesName, currentUrl) => {
    const items = collection
      .filter((p) => p.data.series === seriesName && !p.data.draft)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
    const idx = items.findIndex((p) => p.url === currentUrl);
    return idx > 0 ? items[idx - 1] : null;
  });

  eleventyConfig.addFilter("nextInSeries", (collection, seriesName, currentUrl) => {
    const items = collection
      .filter((p) => p.data.series === seriesName && !p.data.draft)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
    const idx = items.findIndex((p) => p.url === currentUrl);
    return idx !== -1 && idx < items.length - 1 ? items[idx + 1] : null;
  });

  eleventyConfig.addCollection("writing", (api) =>
    api.getFilteredByGlob("src/writing/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/writing/*.md")
      .filter((p) => !p.data.draft && p.data.type === "post")
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("essays", (api) =>
    api.getFilteredByGlob("src/writing/*.md")
      .filter((p) => !p.data.draft && p.data.type === "essay")
      .sort((a, b) => (b.data.title > a.data.title ? 1 : -1))
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
