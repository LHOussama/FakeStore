# React + TypeScript + Vite

# 1- Components
###    1- Navbar
  Le composant NavBar est une barre de navigation créée avec React et react-router-dom. Il utilise le composant Link pour rediriger vers la page d'accueil sans rechargement, affiche un logo accompagné du texte "FakeStore", et est stylisé avec Tailwind CSS pour une présentation simple et responsive.

###    2- Product
Le composant Product est une carte isolée et réutilisable qui affiche les détails d’un produit. Il inclut une image, un titre limité à deux lignes et un prix formaté, avec des effets visuels modernes grâce à Tailwind CSS. Ce composant simplifie la structure du code et facilite son amélioration ou son extension future. Il utilise également Link de react-router-dom pour permettre une navigation fluide vers la page détaillée du produit.

### 3-Products
Le composant ProductList est une interface interactive qui affiche une liste de produits récupérés dynamiquement depuis une API. Il offre des fonctionnalités avancées comme le filtrage par catégorie, la recherche par mot-clé, et la pagination, permettant aux utilisateurs de naviguer facilement parmi les produits. Grâce à des états gérés avec useState, les produits et catégories sont affichés de manière réactive, tandis que les appels à l'API sont effectués via useEffect. L’interface, stylisée avec Tailwind CSS, intègre des éléments conviviaux, comme un sélecteur de catégorie, un champ de recherche, et une barre de pagination intuitive. En cas de chargement ou d’erreur, des messages adaptés sont affichés. Ce composant bien structuré est un excellent exemple de modularité et de design moderne, assurant une expérience utilisateur fluide et agréable.

### 3-ProductDetails
Le composant ProductDetail est conçu pour afficher les détails d'un produit spécifique, basé sur l'ID récupéré depuis l'URL via le hook useParams. Il utilise les hooks React comme useState et useEffect pour gérer l'état et effectuer une requête à l'API externe. Initialement, l'état du produit est défini à null, et une fois l'ID disponible, une requête API est déclenchée pour récupérer les informations associées au produit. Ces données sont ensuite utilisées pour mettre à jour l'état.

Lorsque les données ne sont pas encore chargées, un indicateur de chargement animé est affiché, centré à l'écran pour signaler à l'utilisateur que les données sont en cours de récupération. Une fois les données disponibles, les détails du produit sont présentés dans une carte élégante et réactive, conçue avec Tailwind CSS. Cette carte contient plusieurs sections, telles que l'image du produit, son titre, sa catégorie, sa description, son prix, la quantité disponible, et une évaluation basée sur des étoiles. Le système de notation affiche dynamiquement des étoiles jaunes pour représenter la note moyenne et des étoiles grises pour le reste, tout en incluant la note numérique à côté.
# 2- Model
### 1 - Product
L'interface Product définit la structure d'un objet représentant un produit dans l'application. Elle inclut plusieurs propriétés : id, un identifiant numérique unique pour chaque produit ; title, le titre du produit sous forme de chaîne de caractères ; price, le prix du produit, également en format numérique ; image, qui contient l'URL de l'image associée au produit ; description, une chaîne qui fournit une brève description du produit ; et category, qui indique la catégorie à laquelle le produit appartient, comme par exemple "Électronique" ou "Vêtements". En plus de ces attributs, l'interface contient un objet rating qui comprend deux propriétés : rate, la note moyenne attribuée au produit, et count, le nombre total d'avis ou de votes reçus. Cette interface permet ainsi d'assurer que les données des produits dans l'application sont bien structurées et cohérentes.

# 3- Démonstration
### Vidéo Démonstrative

Voici une vidéo démonstrative de l'application en action :

<video width="600" controls>
  <source src="./demonstration/app_video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

