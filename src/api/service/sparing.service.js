const { XMLParser } = require("fast-xml-parser");
const { readFileSync } = require("fs");
const _ = require("lodash");
const xmlData = readFileSync("./src/assets/banksparing.xml", "utf8");
const parser = new XMLParser();
const jsonData = parser.parse(xmlData);

const uniqueGroups = _.uniqBy(jsonData.feed.entry, "f:gruppe").map(
  (entry) => entry["f:gruppe"]
);


 
class service {
  getSparingData(payload) {
    const {
      accountType, //f.gruppe
      currentSavings, 
      freeWithdrawal, //fri_uttak
      interestRateMax, //f.rentesats1, f.rentesats2, f.rentesats3, f.rentesats4, f.rentesats5,  f.rentesats6
      interestRateMin,
      maxDepositAmount, //f.maks_belop
      minDepositAmount, //f.min_belop
    } = { ...payload };
    const data = jsonData?.feed?.entry?.filter((entry) => {
      return (
        entry["f:gruppe"] === accountType ||
        // currentSavings >= entry["f.min_belop"] &&
        Number(freeWithdrawal) <= Number(entry["f.fri_uttak"]) &&
        Number(interestRateMin) <= Number(entry["f.rentesats1"]) &&
        Number(interestRateMax) >= Number(entry["f.rentesats1"]) 
        // maxDepositAmount >= entry["f.maks_belop"] &&
        // minDepositAmount <= entry["f.min_belop"]
      );
    }); 
    return data || null;
  }

  getUniqueGroups() {
    const uniqueGroups = _.uniqBy(jsonData.feed.entry, "f:gruppe").map(
      (entry) => entry["f:gruppe"]
    );

    return uniqueGroups || null;
  }
}

module.exports = new service();
