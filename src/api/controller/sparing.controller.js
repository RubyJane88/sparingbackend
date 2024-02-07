const service = require("../service/sparing.service");
const Joi = require("joi");

class controller {
  async getSparingData(payload) {
    const schema = Joi.object({
      accountType: Joi.string(),
      currentSavings: Joi.number(),
      freeWithdrawal: Joi.number(),
      // interestRateMin: Joi.number(),
      interestRateMax: Joi.number(),
      maxDepositAmount: Joi.number(),
      minDepositAmount: Joi.number(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      return {
        status: 400,
        success: false,
        message: "Validation error",
        error: error.details[0].message,
      };
    }

    try {
      const data = service.getSparingData(payload);
      if (!data.length > 0) {
        return {
          status: 200,
          success: false,
          message: "No sparing data received",
          data: null,
        };
      }

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
