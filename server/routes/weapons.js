// import express module
// import weapon functions from the weapon file
// use the express Router function and assign it to a variable

import express from "express";

import {
  getWeapons,
  getWeaponsByName,
  createWeapon,
  //   findWeaponIndexByID,
  getWeaponById,
  updateWeaponById,
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
//after receiving, we need to get the matching weapon to that id
//res with that weapon

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const oneWeapon = await getWeaponById(parseInt(id));
    res.json(oneWeapon);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch that weapon id" });
  }
});

/* Create a new Weapon */

// listen for a post req, the route is /
// after receiving, we need to store req.body in a variable
// res.json the new weapon into the array.

router.post("/", async function (req, res) {
  try {
    const newWeapon = await createWeapon(req.body);
    res.status(201).json({ newWeapon });
  } catch (error) {
    res.status(500).json({ error: "Failed to create new weapon." });
  }
});

/* Update a Weapon */

// listen for a patch req, the route is /:id
// after receiving, we need to store req.body in a var and params id with parseInt
// call the updateWeaponById function and replace weapon in the db with the updated content

router.patch("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updateWeapon = await updateWeaponById(parseInt(id), updateData);
    res.json(updateWeapon);
  } catch (error) {
    res.status(500).json({ error: `Failed to update weapon.` });
  }
});

/* Get weapons by name*/

//listen for a get req, the route is /:id
//after receiving, we need to get the matching weapon to that id
//res with that weapon

router.get("/", async (req, res) => {
  try {
    const search = req.query.name; // Check for a "name" query parameter
    let weapons;

    if (search) {
      weapons = await getWeaponsByName(search); // Filter by name
    } else {
      weapons = await getWeapons(); // Return all weapons
    }

    res.json(weapons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weapons." });
  }
});

export default router;
