import { allModel } from "../models/AllModel.js";

export const allControl = {
  readUrls: async (req, res) => {
    const { link } = req.params;

    if (!link)
      return res.json({
        success: false,
        message: "Parameter of link is empty!",
      });

    const username = req.username;

    try {
      const findData = await allModel.readUrls(username, link);
      if (findData.length === 0)
        return res.json({
          success: false,
          message: "Link cannot found!",
        });

      setTimeout(() => {
        return res.json({
          success: true,
          message: `Get Link from ${username} is success!`,
          results: findData[0],
        });
      }, 3000);
    } catch (error) {
      return res.json({
        success: false,
        message: "Read Urls is Error, Try again later!",
      });
    }
  },
};
