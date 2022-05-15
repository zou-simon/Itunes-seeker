# Itunes seeker

Application React Native pour chercher des musiques et les noter

Le site d’iTunes propose une [API publique](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/).
Elle permet de faire des query dans l’immense database.

### Les consignes :

- Créer une app permettant d’utiliser cette API
- Une vue permettant d’effectuer une recherche
    - Celle-ci permet de récupérer une liste de résultats
        - Recherche par artistes
        - Recherche par titre de la musique
        - Affichage d’une liste d’éléments sélectionnable
- Une vue d’affichage d’un résultat
    - Possibilité d’ajouter un résultat à sa propre bibliothèque
    - Système pour noter les musiques
- Une vue permettant d'avoir une bibliothèque local
    - Possibilité de supprimer une musique
    - Possibilité de noter une musique
    - Implémenter le système de filtre avec un filteredSelector (sur les notes des musiques)
- Gestion de la librairie locale par un store Redux 
- Implémenter un store persistant

> LP Projet Web 2021-2022
