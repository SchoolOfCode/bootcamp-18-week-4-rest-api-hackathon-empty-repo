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
// Find weapon index by ID
function findWeaponIndexById(weaponId) {
  return skyrimWeapons.findIndex(({ id }) => id === weaponId);
}

// Retrieve weapon by ID
export async function getWeaponById(weaponId) {
  return skyrimWeapons.find(({ id }) => id === weaponId);
}

// Replace a weapon by ID
export async function replaceWeaponById(weaponId, weaponReplacement) {
  const index = findWeaponIndexById(weaponId);

  if (index === -1) {
    return;
  }

  const newWeapon = { ...weaponReplacement, id: weaponId };

  skyrimWeapons = [
    ...skyrimWeapons.slice(0, index),
    newWeapon,
    ...skyrimWeapons.slice(index + 1),
  ];

  return newWeapon;
}

// Delete a weapon by ID
export async function deleteWeaponById(weaponId) {
  const index = findWeaponIndexById(weaponId);

  if (index === -1) {
    return;
  }

  const deleted = skyrimWeapons[index];
  skyrimWeapons = [
    ...skyrimWeapons.slice(0, index),
    ...skyrimWeapons.slice(index + 1),
  ];
  return deleted;
}

// Update a weapon by ID with partial updates
export async function updateWeaponById(weaponId, updates) {
  const index = findWeaponIndexById(weaponId);

  if (index === -1) {
    return;
  }

  const oldWeapon = skyrimWeapons[index];
  const updated = { ...oldWeapon, ...updates, id: weaponId };

  skyrimWeapons = [
    ...skyrimWeapons.slice(0, index),
    updated,
    ...skyrimWeapons.slice(index + 1),
  ];

  return updated;
}
