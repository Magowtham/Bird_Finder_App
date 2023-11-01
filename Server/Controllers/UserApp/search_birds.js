const BirdModel = require("../../Models/bird_data");
const searchBirds = async (req, res) => {
  try {
    const { size, majorColor, minorColor, beakShape, footShape } = req.query;
    const birdSearchQuery = [];
    if (size) {
      birdSearchQuery.push({ "size.value": size });
    }
    if (majorColor) {
      birdSearchQuery.push({ majorColor });
    }
    if (minorColor) {
      birdSearchQuery.push({ minorColor });
    }
    if (beakShape) {
      birdSearchQuery.push({ "beakShape.value": beakShape });
    }
    if (footShape) {
      birdSearchQuery.push({ "footShape.value": footShape });
    }
    const birds = await BirdModel.find(
      birdSearchQuery.length !== 0 ? { $and: birdSearchQuery } : {},
      { _id: 0, commonName: 1, scientificName: 1, kannadaName: 1, imageSrc: 1 }
    );
    res.status(200).json({ birds });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "oops something went wrong" });
  }
};

module.exports = searchBirds;
