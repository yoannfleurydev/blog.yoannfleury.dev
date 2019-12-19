---
title: Nouveautés de create-react-app
date: "2019-12-19T09:00:00.000Z"
published: true
---

![package.json](./package-json.png)

> Pourquoi un article sur `create-react-app` en version 3.3.0 me diras-tu ?
> Pourquoi cette version précise ?

Eh bien tout simplement parce que cette mise à jour apporte un bon nombre de
nouveautés qui sont extrêmement intéressantes, et pas que pour TypeScript ! En
effet, les différents ajouts présentés ci-dessous sont aussi possible pour du
React en JavaScript grâce à des ajouts internes dans la transpilation avec Babel.

Pour rappel, on appelle communément `create-react-app` tous les paquets qui sont
dans le dépôt [facebook/create-react-app](https://github.com/facebook/create-react-app)
et donc ici, on va surtout parler des `react-scripts`, c'est-à-dire que si tu as
précédemment créé un projet depuis `create-react-app`, tu peux mettre à jour la
dépendance `react-scripts` en 3.3.0 et tu auras ces nouveautés.

## Séparateur numérique

C'est surement le changement le moins intéressant, du coup je le case ici
histoire que tu restes jusqu'au bout. `create-react-app` supporte désormais le
[séparateur numérique](https://tc39.es/proposal-numeric-separator/) pour une
lecture plus simple des grands nombres.

```javascript{4-5}
1000000000; // C'est 1 milliard, 100 million, 10 million ?
101475938.38; // Idem ici, quel est l'ordre de grandeur ?

1_000_000_000; // 1 milliard
101_475_938.38; // Ordre de 100 million
```

## Chainage optionnel

Grâce au [chainage optionnel](https://tc39.es/proposal-optional-chaining/), on
gagne en concision et en sûreté de code. Prenons l'exemple suivant :

```javascript{7-8}
const user = {
  firstname: "Léodagan",
  lastname: "De Carmélide",
  realm: undefined,
};

const boom = user.realm.castle; // TypeError: user.realm is undefined
const notBoom = user.realm && user.realm.castle; // undefined
```

Ici, notre code va renvoyer une erreur sur l'affectation de la constante `boom`
car on fait appel à un attribut sur une variable qui est `undefined` , chose que
nous contournons avec la ligne suivante qui permet de vérifier que `realm` n'est
pas `undefined`, et donc l'affectation à la constante `notBoom` se passe bien
(même si ici, elle est affectée avec `undefined`). Je suis sûr qu'on en a tous
un peu (beaucoup) dans notre code, car on est obligé de faire ces vérifications
pour que ça ne pète pas à la tronche de l'utilisateur final.

Maintenant, grâce au chainage optionnel qu'est l'[opérateur Elvis](https://en.wikipedia.org/wiki/Elvis_operator)
`?.`, on peut s'éviter les `&&` à tout bout de champs. Si on prend le même
exemple :

```javascript{7}
const user = {
  firstname: "Léodagan",
  lastname: "De Carmélide",
  realm: undefined,
};

const notBoom = user.realm?.castle; // undefined
```

Ici, notre code va affecter `undefined` dans la variable `notBoom` sans
déclancher de `TypeError`.

## Union sur la `null`ité

Bon, je suis d'accord avec toi, cette traduction est pas forcément la plus
parlante comme ça. En anglais, on parle de [Nullish Coalescing](https://tc39.es/proposal-nullish-coalescing/)
et permet de court-circuiter comme le fais l'opérateur `||` tout en faisant
attention que la valeur soit présente ou différente de null. Exemple:

```javascript
const A = undefined || "valeur"; //  'valeur'
const B = null || "valeur"; // 'valeur'

const C = "" || "valeur"; // 'valeur' or ici, on veut peut-être avoir ''
const D = 0 || 42; // 42 alors qu'on souhaite peut-être 0
const E = false || true; // true alors qu'on souhaite surement false
```

L'exemple de la proposition est surement plus parlant, car il simule la réponse d'un service web:

```javascript{14-16}
const response = {
  settings: {
    nullValue: null,
    height: 400,
    animationDuration: 0,
    headerText: "",
    showSplashScreen: false,
  },
};

const undefinedValue = response.settings.undefinedValue || "some other default"; // result: 'some other default'
const nullValue = response.settings.nullValue || "some other default"; // result: 'some other default'

const headerText = response.settings.headerText || "Hello, world!"; // Potentially unintended. '' is falsy, result: 'Hello, world!'
const animationDuration = response.settings.animationDuration || 300; // Potentially unintended. 0 is falsy, result: 300
const showSplashScreen = response.settings.showSplashScreen || true; // Potentially unintended. false is falsy, result: true
```

Dans les deux cas, les trois dernières affectations ne correspondent pas forcément à ce que l'on souhaite, on veut juste s'assurer que les valeurs ne sont pas `null` ou `undefined`. Voici ce que cela donne avec l'opérateur `??` :

```javascript{4-7,11-13}
const undefinedValue = response.settings.undefinedValue ?? "some other default"; // result: 'some other default'
const nullValue = response.settings.nullValue ?? "some other default"; // result: 'some other default'

const headerText = response.settings.headerText ?? "Hello, world!"; // result: ''
const animationDuration = response.settings.animationDuration ?? 300; // result: 0
const showSplashScreen = response.settings.showSplashScreen ?? true; // result: false

const A = undefined ?? "valeur"; //  'valeur'
const B = null ?? "valeur"; // 'valeur'

const C = "" ?? "valeur"; // ''
const D = 0 ?? 42; // 0
const E = false ?? true; // false
```

## Modéles personnalisés

Il est possible avec cette nouvelle version de _CRA_ de créer une application
depuis un modèle bien précis. L'équipe de _CRA_ en fourni deux basiques:

- [cra-template](https://github.com/facebook/create-react-app/tree/master/packages/cra-template)
  (celui-ci sera pris par défaut par CRA quand tu fais `npx create-react-app my-app`
- [cra-template-typescript](https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript)
  (celui-ci est considéré comme un template et sera utilisé si tu fais
  `npx create-react-app my-app --template typescript`)

Il est également possible de créer son propre modèle comme je l'ai fait pour
démarrer rapidement un projet avec [chakra-ui](https://github.com/yoannfleurydev/cra-template-chakra-ui).
Il est possible de trouver tous les templates sur npm grâce à la recherche
[cra-template-\*](https://www.npmjs.com/search?q=cra-template-*) et de démarrer
un projet avec le paramètre `--template <nom_du_template>` dans la commande de
création d'un projet, par exemple : `npx create-react-app my-app --template chakra-ui`.
