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

  const stage = growthTime / 4;
  const stageOne = plantedAtDate.plus({ weeks: stage }) < now ? "O" : "";
  const stageTwo = plantedAtDate.plus({ weeks: stage * 2 }) < now ? "O" : "";
  const stageThree = plantedAtDate.plus({ weeks: stage * 3 }) < now ? "O" : "";
  const stageFour = plantedAtDate.plus({ weeks: stage * 4 }) < now ? "O" : "";

  return (
    <p>
      {stageOne}
      {stageTwo} {stageThree} {stageFour}
    </p>
  );
};
export default Harvest;
