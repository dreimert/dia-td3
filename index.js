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
              projects(limit: ${argv.limit}) {
                name
              }
            }`
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options)
    .then((res) => {
      console.info(res.data.projects);
    })
    .catch((err) => {
      console.error("Gloups : ", err.error);
      console.log("\n#######################################\n");
      console.log("Vous croyez pas que je vais tout faire ?");
    })
  })

  // En GraphQL, il n'y a pas de fonction *count* standard comme en SQL
  // Le concepteur de l'API, doit la définir lui-même
  // ou vous devez récupèrer les données pour faire les calcules vous-même.
  // ici, je ne fournis pas cette API.
  // Il faut donc le calculer nous-même.
  .command('moyenne', 'Calcule le nombre moyen de membres par projet', {}, (argv) => {
    if (argv.verbose) console.info(`Exécution de la commande moyenne`)
    let options = {
        method: 'POST',
        uri: 'https://jumplyn.com/api/graphql',
        body: {
            query: `{
              projects {
                users {
                  roles
                }
              }
            }`
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options)
    .then((res) => {
      //console.info(res.data.projects);
      let nbProjet = res.data.projects.length;
      // La question est qu'est ce qu'un membre ?
      // Si je fais le choix de ne choisir comme membres que les utilisateurs dont le role est 'owner'
      // j'utilise la fonction reduce sur les tableaux : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
      let nbOwners = res.data.projects.reduce((somme, project) => {
        // J'utilse filter pour ne concerver que les owners
        // puis je regarde la taille du tableau
        const nbOwners = project.users.filter((user) => {
          // renvoie true si roles contient owner : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/includes
          return user.roles.includes("owner");
        }).length;
        // Je renvoie la somme calculé pour les éléments précédents + le nombre d'owner de ce projet
        return somme + nbOwners;
      }, 0)
      console.log("Nombre moyen de membres par projet :", nbOwners/nbProjet);
    })
    .catch((err) => {
      console.error("Gloups : ", err.error);
      console.log("\n#######################################\n");
      console.log("Vous croyez pas que je vais tout faire ?");
    })
  })

  // Il faut limiter la liste des projets au projet qui ont le label "insal-tc-pi"
  // Sans documentation ni le vocabulaire, il faut explorer les données à la main pour comprendre
  // Tous les projets / application vont créer leur propre vocabulaire.
  // Par exemple : tweet pour twitter.
  .command('moyenne-pi', 'Calcule le nombre moyen de membres par projet pour pi', {}, (argv) => {
    if (argv.verbose) console.info(`Exécution de la commande moyenne-pi`)
    let options = {
        method: 'POST',
        uri: 'https://jumplyn.com/api/graphql',
        body: {
            query: `{
              projects(hasLabel: "insal-tc-pi") {
                users {
                  roles
                }
              }
            }`
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options)
    .then((res) => {
      //console.info(res.data.projects);
      let nbProjet = res.data.projects.length;
      // La question est qu'est ce qu'un membre ?
      // Si je fais le choix de ne choisir comme membres que les utilisateurs dont le role est 'owner'
      // j'utilise la fonction reduce sur les tableaux : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
      let nbOwners = res.data.projects.reduce((somme, project) => {
        // J'utilse filter pour ne concerver que les owners
        // puis je regarde la taille du tableau
        const nbOwners = project.users.filter((user) => {
          // renvoie true si roles contient owner : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/includes
          return user.roles.includes("owner");
        }).length;
        // Je renvoie la somme calculé pour les éléments précédents + le nombre d'owner de ce projet
        return somme + nbOwners;
      }, 0)
      console.log("Nombre moyen de membres par projet :", nbOwners/nbProjet);
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
              project(id: "${argv.id}") {
                name
              }
            }`
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options)
    .then((res) => {
      console.info(res.data.project);
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
