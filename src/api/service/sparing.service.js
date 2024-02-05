const { XMLParser } = require("fast-xml-parser");
const { readFileSync } = require("fs");
const _ = require("lodash");
const xmlData = readFileSync("./src/assets/banksparing.xml", "utf8");
const parser = new XMLParser();
const jsonData = parser.parse(xmlData);

const uniqueGroups = _.uniqBy(jsonData.feed.entry, "f:gruppe").map(
  (entry) => entry["f:gruppe"]
);
console.log(uniqueGroups);

class service {
  getSparingData() {
    return jsonData.feed.entry || null;
  }

  getUniqueGroups() {
    const uniqueGroups = _.uniqBy(jsonData.feed.entry, "f:gruppe").map(
      (entry) => entry["f:gruppe"]
    );

    return uniqueGroups || null;
  }
}

module.exports = new service();
