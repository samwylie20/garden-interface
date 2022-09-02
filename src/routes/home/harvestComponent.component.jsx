const { DateTime } = require("luxon");

const Harvest = ({ plantedAt, growthTime }) => {
  const now = DateTime.now();
  const plantedAtDate = new DateTime(plantedAt);
  const plantedAtPlusGrowthTime = plantedAtDate.plus({ weeks: growthTime });
  console.log(plantedAtDate.toLocaleString(), "planted at");
  console.log(
    plantedAtPlusGrowthTime.toLocaleString(),
    "planted at plus growth time"
  );
  console.log(now.toLocaleString(), "now");
  console.log(plantedAtPlusGrowthTime > now, "planted at greater than now");

  return <p></p>;
};
export default Harvest;
