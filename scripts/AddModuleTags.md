<%*
const filePath = tp.file.path.toLowerCase();

const moduleMap = {
  "simulation": "#module/simulation",
  "diagnostic": "#module/diagnostic",
  "showcontrol": "#module/showcontrol",
  "artistique": "#module/artistique",
  "réseau": "#module/reseau",
  "reseau": "#module/reseau",
  "rigging": "#module/rigging",
  "électricité": "#module/electricite",
  "electricite": "#module/electricite",
  "dmx": "#module/dmx",
  "hf": "#module/hf",
  "policies": "#module/policies",
  "versioning": "#module/versioning"
};

let moduleTag = "";

for (const key in moduleMap) {
  if (filePath.includes(key)) {
    moduleTag = moduleMap[key];
    break;
  }
}

if (moduleTag) {
  const content = await tp.file.read();
  if (!content.includes(moduleTag)) {
    const updated = content.replace(/^---([\s\S]*?)---/, (match, yaml) => {
      return `---${yaml}\ntags+: ${moduleTag}\n---`;
    });
    await tp.file.write(updated);
  }
}
%>
