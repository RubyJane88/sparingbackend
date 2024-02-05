const service = require("../service/sparing.service");

class controller {
  async getSparingData(payload) {
    try {
      const data = service.getSparingData();

      return {
        status: 200,
        success: true,
        message: "Sparing data received",
        data: data.slice(0, 50),
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "Error getting sparing data",
        error,
      };
    }
  }

  async getUniqueGroups() {
    try {
      const data = service.getUniqueGroups();
      if (!data.length > 0) {
        return {
          status: 200,
          success: false,
          message: "No Unique groups received",
          data: null,
        };
      }
      return {
        status: 200,
        success: true,
        message: "Unique groups received",
        data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "Error getting unique groups",
        error,
      };
    }
  }
}

module.exports = new controller();
