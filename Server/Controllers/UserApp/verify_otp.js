const OtpModel = require("../../Models/otp");
const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const [isOtpExists] = await OtpModel.find({ otp }, { email: 1, _id: 0 });
    if (!isOtpExists) {
      return res.status(401).json({ error: "invalid otp" });
    }
    res.status(200).json({ message: "otp varified" });
  } catch (error) {
    res.status(500).json({ error: "oops something went wrong" });
  }
};

module.exports = verifyOtp;
