// import express module
// import weapon functions from the weapon file
// use the express Router function and assign it to a variable

import express from "express";

import {
//   resetWeapons,
  getWeapons,
//   getWeaponsByName,
//   createWeapon,
//   findWeaponIndexByID,
//   getWeaponById,
//   replaceWeaponById,
} from "../helperFunctions/helperFunctions.js";

const router = express.Router();

// /* Get all weapons and display on home route */

// // listen for a get req, the route is /
// // after receiving req, we need to get all of the weapons
// // respond with all of the weapons

router.get("/", async (req, res) => {
    try {
      const weapons = await getWeapons();
      res.json(weapons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weapons." });
    }
  });

// router.get("/", async function (req, res) {
//   const weapons = await getWeapons();
//   res.status(200).json({
//     success: true,
//     payload: weapons,
//   });
// });

// export default router;




export default router;