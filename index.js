#!/usr/bin/env node

request = require("request-promise");

require('yargs')
  .command('statistiques', "Indique les statistiques de Jumplyn et permet de savoir si Jumplyn fonctionne", {}, (argv) => {
    if (argv.verbose) console.info(`Exécution de la commande statistiques`)
    let options = {
        method: 'POST',
        uri: 'https://jumplyn.com/api/graphql',
        body: {
            query: `{
              statistiques {
                numberOfDocuments
                numberOfProjects
                numberOfUsers
              }
            }`
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options)
    .then((res) => {
      console.log("Statistiques :", res.data.statistiques);
    })
    .catch((err) => {
      console.error("Gloups : ", err);
    })
  })


  .command('list [limit]', 'liste les projets publiques de Jumplyn', (yargs) => {
    yargs
      .positional('limit', {
        describe: 'nombre de projets listé',
        type: 'number',
        default: 10
      })
  }, (argv) => {
    if (argv.verbose) console.info(`Exécution de la commande list`)
    let options = {
        method: 'POST',
        uri: 'https://jumplyn.com/api/graphql',
        body: {
            query: `{
              projects {
              }
            }`
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options)
    .then((res) => {
      console.log("Vous croyez pas que je vais tout faire ?");
    })
    .catch((err) => {
      console.error("Gloups : ", err.error);
      console.log("\n#######################################\n");
      console.log("Vous croyez pas que je vais tout faire ?");
    })
  })


  .command('projet <id>', 'Affiche les données du projet', (yargs) => {
    yargs
      .positional('id', {
        describe: 'id du projet',
        type: 'string'
      })
  }, (argv) => {
    if (argv.verbose) console.info(`Exécution de la commande projet "${argv.id}"`)
    let options = {
        method: 'POST',
        uri: 'https://jumplyn.com/api/graphql',
        body: {
            query: `{
            }`
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options)
    .then((res) => {
      console.log("Vous croyez pas que je vais tout faire ?");
    })
    .catch((err) => {
      console.error("Gloups : ", err.error);
      console.log("\n#######################################\n");
      console.log("Vous croyez pas que je vais tout faire ?");
    })
  })


  .option('verbose', {
    alias: 'v',
    default: false
  })
  .demandCommand(1, 'Vous devez fournir au moins une commande')
  .strict()
  .help()
  .argv
