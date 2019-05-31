---
title: Mise en place de ce blog
date: "2019-05-27T20:00:00.000Z"
description: Découvrons ensemble ce qui se cache derrière ce blog, et les améliorations que j'ai apporté au projet de base
published: true
---

Ce blog est mis en place grâce à [Gatsby], un framework basé sur React qui
permet de mettre en place rapidement un site statique. Il est possible d'utiliser des plugins
et des starters, utiles quand on doit générer plusieurs sites avec la même
logique.

Pour ma part, je suis parti sur le starter basique pour la mise en
place d'un blog : [gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/).
Il est très basique et j'expliquerai par la suite les améliorations que j'ai pu lui apporter.

En tout, de l'installation, en passant par la mise à jour des données les plus
classiques (principalement les méta-données telle que l'auteur, la bio, le titre)
à la mise en place sur les serveurs, il m'aura fallu une trentaine de minutes en
comptant le temps d'attente pour la disponibilité sur les serveurs, ce qui est
relativement correct car je ne connaissais pas l'outil et je me suis balladé
dans les fichiers pour mettre à jour les informations utiles.

---

Pour la mise à disposition sur le web, je passe par les [Github Pages] sous
forme de page personnelle, c'est à dire que le nom du dépôt Git correspond
au nom de mon utilisateur `yoannfleurydev.github.io`. Les Github Pages
permettent de mettre un site statique sur le web gratuitement, ce qui est utile
pour un blog pour éviter les coups d'hébergement.

Il existe un paquet [npm] qui permet de mettre rapidement des pages statiques sur
les Github Pages : [gh-pages]. J'ai donc ajouté ce paquet à mes dépendences et
j'ai ajouté une ligne dans mon `package.json` pour faire le déploiement en une
commande npm.

```json{3}
// ...
"scripts" : {
  "deploy": "gatsby build && gh-pages -d public -b master",
  // On build, puis on déploie le contenu du dossier public sur master.
  // On le fait sur master car c'est un dépôt Github Pages utilisateur, et le
  // site ne pourra pas se déployer si on le met sur une autre branche.
}
// ...
```

Maintenant, dès que je veux mettre mon site en ligne, j'ai juste à lancer la
commande :

```bash
npm run deploy
```

Enfin, comme j'ai mon nom de domaine en `.dev`, j'ai fais en sorte d'ajouter le
fichier [`static/CNAME`](https://github.com/yoannfleurydev/yoannfleurydev.github.io/blob/develop/static/CNAME) dans Gatsby de façon à ce que la Github Pages réagisse
en conséquence et il a aussi fallu que je déclare chez [Gandi] sur quel host devait
pointer le sous domaine `blog` pour être redirigé vers Github.

---

Je le disais tout à l'heure, le starter que j'ai utilisé est minimal et il
publie tous les articles qu'il trouve, peu importe leur état, brouillon ou pas.
J'ai donc voulu ajouter moi-même ce système de brouillon, car je veux pouvoir rédiger
plusieurs articles en même temps sans vouloir qu'ils soient tous publiés.

J'ai donc commencé par regarder comment fonctionnait le système de méta-données
des fichiers markdown. Oui, car je ne l'ai pas précisé pour le moment, mais ces
billets de blog sont écrit dans [des fichiers en markdown](https://github.com/yoannfleurydev/yoannfleurydev.github.io/tree/develop/content/blog).
Le système de méta-données est appelé `frontmatter` et il est possible d'ajouter
des éléments personnalisés sans trop de soucis.

J'ai donc décidé d'ajouter un champs `published` qui doit être mis à `true`
quand je veux qu'un article soit publié.

```yaml{4}
title: Les 3 commandes Git que j'utilise le plus
date: "2019-01-26T20:00:00.000Z"
description: Dévouvrons ensemble les 3 commandes git que j'utilise le plus !
published: true
```

Ensuite, il a fallu que j'ajoute des filtres dans les requêtes GraphQL de Gatsby
pour ne récupérer que les articles qui sont publiés, c'est à dire, les articles
à `true`.

J'ai donc amélioré la requête GraphQL avec un `filter` qui demande à ne
récupérer que les articles ayant une méta-données qui est égale à `true`, ce qui
se traduit par:

```graphql
filter: {
  frontmatter: {
    published: {
      eq: true
    }
  }
}
```

Désormais, grâce à cette requête pré-traitement, Gatsby ne me génère pas les
pages des articles qui ne sont pas publiés, ce qui correspond au comportement
désiré.

---

Etant un grand fan des _dark themes_, je tenais grandement à implémenter cette
dernière fonctionnalité. Il s'agit d'un CSS automatique en fonction des
préférences utilisateur, j'ai récemment [tweeté](https://twitter.com/YoannFleuryDev/status/1132689471093260288) sur cette implémentation.

Il faut savoir qu'à l'écriture de cet article, ça ne fonctionne que sur Firefox
67 et Safari 12.1, et arrivera sur Chrome dans la version 76 ou 77 selon
[caniuse.com](https://caniuse.com/#feat=prefers-color-scheme). À noter que ça
ne fonctionne sur aucun navigateur mobile pour le moment.

Si vous disposez d'une machine sous Windows ou MacOS, il est possible de changer
votre préférence de thème dans les paramètres de votre OS, et le blog devrait
changer de couleur si vous êtes sous Firefox ou Safari.

Voici la _media query_ qui me permet de gérer cette préférence utilisateur

```css
@media (prefers-color-scheme: dark) {
  body {
    -webkit-font-smoothing: antialiased;

    --bg: #282c35;
    --header: #ffffff;
    --textNormal: rgba(255, 255, 255, 0.88);
    --textTitle: #ffffff;
    --textLink: var(--blue);
    --hr: hsla(0, 0%, 100%, 0.2);
    --inlineCode-bg: hsl(222, 14%, 25%);
    --inlineCode-text: #e6e6e6;
    color: var(--inlineCode-text);
  }

  blockquote {
    color: #d1d1d1;
  }
}
```

Au final, grâce aux variables CSS, je n'ai pas besoin de redéfinir toutes les
règles, mais juste les variables que j'utilise dans mon CSS, ce qui évite une
énorme duplication, et encore, il y a des choses à améliorer (on peut prendre
ici l'exemple de `blockquote` qui pourrait être défini en dehors, et juste lui
fournir une variable), je ne suis pas expert en CSS, et je n'ai pour le moment
pas passé beaucoup de temps dessus.

---

Voilà pour le petit tour sur la création de ce blog. Je suis surement passé à
côté de chose, mais si vous avez des questions, je suis disponible pour en parler
sur [Twitter](https://twitter.com/yoannfleurydev), ou bien IRL si on se croise.

[gatsby]: https://www.gatsbyjs.org/
[github pages]: https://pages.github.com/
[npm]: https://www.npmjs.com/
[gh-pages]: https://www.npmjs.com/package/gh-pages
[gandi]: https://www.gandi.net
