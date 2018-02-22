# Dia : TD

TD3 du cours de développement et intégration d'applications distribuées.

L'objectif de ce TD est de voir l'utilisation d'API pour interroger des services distants.

## Installation de node

Voir le TD précédent : https://github.com/dreimert/dia-td2

## Protocole

On va interroger l'API de Jumplyn. Si vous rencontrer des bugs, failles ou autres comportements étranges, merci de me contacter rapidement !

L'API de Jumplyn n'est pas conçu pour être ouverte sur l'extérieur. Du coup, pas de documentation mise à part ce TD et puis j'ai vraiment la flemme de faire une documentation. "Heureusement" pour vous, une partie de l'API, celle qui nous intéresse, utilise GraphQL : http://graphql.org/.

GraphQL, c'est un truc développé par Facebook, c'est de plus en plus populaire et ça a pleins d'avantages :

* introspection : le système se décrit lui même. Vous pouvez demander au système de vous décrire ce que vous pouvez faire avec !
* Auto-documenter : le système contient sa doc.
* Un IDE WEB trop cool : https://jumplyn.com/api/graphql/i
* Et cet IDE, il utilise l'introspection. Du coup, vous pouvez avoir de l'auto-completion quand vous construisez une requête en faisant \<ctrl\> + \<espace\> !

Le but sera de faire un Client Line Interface (CLI) minimaliste pour Jumplyn. Par exemple, un CLI capable de lister les projets et d'avoir des informations dessus. Pareil, si vous voyez des données qui devraient être privées, envoyez moi un message que je patches !

## Implémentation

Cloner ce dépot :

    git clone https://github.com/dreimert/dia-td3.git

Installation des dépendances :

    npm install

Vérifiez que ça fonctionne :

    npm start statistiques

    npm start statistiques -- -v

Vous pouvez maintenant modifier le fichier `index.js` pour implémenter les fonctions `list` et `projet`.

## Test

Lancer les commandes suivantes :

    npm start list
    npm start projet 545cdefaec73bef2af7b063c

Vos yeux.

## Par où commencer ?

Par lire l'introduction http://graphql.org/learn/ et les sections `fields` et `arguments` : http://graphql.org/learn/queries/.

Dans l'IDE de GraphQL de Jumplyn, abuser du \<ctrl\> + \<espace\> : https://jumplyn.com/api/graphql/i.

Essayer de comprendre le fichier `index.js` et l'exemple sur statistiques.

## Ce que je dois retenir

Le standard sur le Web actuellement pour une API, c'est REST mais GraphQL gagne de plus en plus de terrain.

La documentation, c'est important !

Les APIs, c'est la vie. En mettant à disposition une API, les développeurs peuvent mettre en place des choses auxquelles vous n'avez pas pensé ou que vous n'avez pas le temps de faire.

## Pour aller plus loin

### API ou IPA

Vous pouvez essayer l'API BreweryDB (http://www.brewerydb.com/developers/apps), pour ce faire, il faut commencer par créer un compte et une application. Il faut par contre, plusieurs heures pour que l'application soit validée et le nombre de requêtes est limité à 400 par jours. Dommage, je ne peux pas faire un TD dessus dans ces conditions !

### Besoin d'une voiture ?

Vous pouvez aussi aller voir du coté de Uber : https://developer.uber.com/

### Explorer Github

Pour la version 4 de son API, Github a choisi de migrer de REST pour la V3 à GraphQL pour la V4. À ce jour en début 2018, REST reste la méthode la plus classique pour fournir une API à un service WEB. Mais GraphQL, qui est principalement développé par Facebook, gagne de plus en plus de terrain comme par exemple avec Github.

Pour en savoir plus sur REST : https://fr.wikipedia.org/wiki/Representational_state_transfer.

Et pour GraphQL : http://graphql.org/.

Le but est de développer un Client Line Interface (CLI) pour faire des recherches sur Github et, pourquoi pas, commencer à faire de l'analyse de données.

Le point d'entrée de la documentation est le suivant : https://developer.github.com/v4/.
