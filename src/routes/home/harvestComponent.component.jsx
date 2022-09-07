const { DateTime } = require("luxon");

const Harvest = ({ plantedAt, growthTime }) => {
  const now = DateTime.now();
  //console.log(growthTime);
  const plantedAtDate = new DateTime(plantedAt);
  const plantedAtPlusGrowthTime = plantedAtDate.plus({ weeks: growthTime });
  // console.log(plantedAtDate.toLocaleString(), "planted at");
  console.log(
    plantedAtPlusGrowthTime.toLocaleString(),
    "planted at plus growth time"
  );
  // Planted at + Growthtime Diff
  const papgtDiff = plantedAtPlusGrowthTime.diff(plantedAtDate, ["days"]);
  const totalDays = papgtDiff.values.days;

  // Now vs Plant time
  const curDayCount = plantedAtDate.diff(now, ["days"]);
  const dayCountCmpq = Math.ceil(curDayCount.values.days);

  console.log(dayCountCmpq, "Current day count");
  // console.log(now.toLocaleString(), "now");
  // console.log(plantedAtPlusGrowthTime > now, "planted at greater than now");
  //console.log("Growth Time ", growthTime);
  const stage = growthTime / 4;
  console.log("Stage", stage);
  const stageOne = plantedAtDate
    .plus({ weeks: stage })
    .diff(now, ["days", "hours"]);
  console.log("Stage One", stageOne.values.days);
  const stageTwo = plantedAtDate
    .plus({ weeks: stage * 2 })
    .diff(now, ["days", "hours"]);
  console.log("Stage Two", stageTwo.values.days);
  const stageThree = plantedAtDate
    .plus({ weeks: stage * 3 })
    .diff(now, ["days", "hours"]);
  console.log("Stage Three", stageThree.values.days);
  const stageFour = plantedAtDate
    .plus({ weeks: stage * 4 })
    .diff(now, ["days", "hours"]);
  console.log("Stage Four", stageFour.values.days);

  let loadingOne = " - ";
  let loadingTwo = " - ";
  let loadingThree = " - ";
  let loadingFour = " - ";
  if (stageOne >= dayCountCmpq) {
    loadingOne = "O";
  }
  return (
    <p>
      {loadingOne}
      {loadingTwo}
      {loadingThree}
      {loadingFour} {dayCountCmpq}/{totalDays}
    </p>
  );
};
export default Harvest;
