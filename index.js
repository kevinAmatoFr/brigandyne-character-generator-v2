import races from "./data/races.js";
import { getNode, newRow, setSecondaryStats } from "./utils.js";

const btn = getNode("button");
const saveBtn = getNode("#saveBtn");
const raceIs = getNode("#race");

btn.addEventListener("click", () => {
  getNode("#tBodyPrimary").innerHTML = "";

  const checkedRaces = [];
  const raceList = document.querySelectorAll("input");

  raceList.forEach((race) => {
    race.checked
      ? checkedRaces.push(race.nextSibling.data.trim().toLowerCase())
      : null;
  });

  const rand = Math.floor(
    Math.random() *
      (checkedRaces.length <= 0 ? races.length : checkedRaces.length)
  );
  const checkedRaceList = races.filter((race) =>
    checkedRaces.includes(race.race.toLowerCase())
  );
  const { race, stats, special } =
    checkedRaces.length <= 0 ? races[rand] : checkedRaceList[rand];

  raceIs.innerHTML = race;
  raceIs.style.fontWeight = 900;
  raceIs.style.textDecoration = "underline #ffdd57";

  const storedChar = [];

  for (const stat of stats) {
    storedChar.push(newRow(stat));
  }

  setSecondaryStats(special);
  saveBtn.style.display = "";
});

saveBtn.addEventListener("click", function () {
  html2canvas(document.querySelector("#capture"), {
    onrendered: function (canvas) {
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
});
