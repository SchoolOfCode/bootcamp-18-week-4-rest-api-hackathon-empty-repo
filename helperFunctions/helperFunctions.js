// Import the Skyrim weapons dataset
import { weapons } from "../libs/data.js";

let weaponId = 0;
let skyrimWeapons = weapons.map((weapon) => ({ ...weapon, id: ++weaponId }));

// Save the original weapons - therefore always having a ref to the initial data after delete adding or updating
export const originalWeapons = skyrimWeapons.map((weapon) => {
  return JSON.parse(JSON.stringify(weapon));
});

// Reset weapons to original state - just in case
export function resetWeapons() {
  weaponId = 0;
  skyrimWeapons = weapons.map((weapon) => ({ ...weapon, id: ++weaponId }));
}

// Get all weapons
export async function getWeapons() {
  return [...skyrimWeapons];
}

// Get weapons by name (partial search)
export async function getWeaponsByName(search) {
  const lowercased = search.toLowerCase();
  return skyrimWeapons.filter(({ name }) =>
    name.toLowerCase().includes(lowercased)
  );
}

// Create a new weapon
export async function createWeapon(newWeapon) {
  const created = {
    ...newWeapon,
    id: ++weaponId,
  };

  skyrimWeapons = [...skyrimWeapons, created];
  return created;
}
