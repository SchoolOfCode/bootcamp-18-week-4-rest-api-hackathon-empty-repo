// import express module
// import weapon functions from the weapon file
// use the express Router function and assign it to a variable

import express from "express";

import {
  getWeapons,
//   getWeaponsByName,
//   createWeapon,
//   findWeaponIndexByID,
  getWeaponById,
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

/* Get all weapons by Id */

//listen for a get req, the route is /:id
//after receiving, we need to get the matching astronaut to that id
//res with that astronaut

router.get("/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const oneWeapon = await getWeaponById(parseInt(id));
        res.json(oneWeapon);
    }
    catch (error){
        res.status(500).json({error: "Failed to fetch that weapon id" })
    }
  });




export default router;