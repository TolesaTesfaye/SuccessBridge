// Simple script to seed freshman resources
import('./src/scripts/seedFreshmanResources.ts')
  .then(module => module.default())
  .catch(console.error)