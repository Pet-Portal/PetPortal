const mongoose = require('mongoose');
const Pet = require('../models/pet.model');
const User = require('../models/user.model');
const petsData = require('../data/pets.json');
const usersData = require('../data/users.json');

require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
  mongoose.connection.db.dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => User.create(usersData))
    .then(users => {
      console.info(`- Added ${users.length} users`)
      const petsWithOwnerIds = petsData.map(pet => {
        pet.owner = users.find(user => user.email === pet.owner).id;
        return pet;
      })
      return Pet.create(petsWithOwnerIds)
    })
    .then(pets => console.info(`- Added ${pets.length} pets`))
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .then(() => process.exit(0))
})