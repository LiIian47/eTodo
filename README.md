Manuel D'utilisation : 

     -Lancement du Front-End , Back-End et de la Base de Donnee.
            1. -- Executer docker compose up -d --build. (Si besoin sudo docker compose up -d --build). --
            2. -- Ouvrir un navigateur web et copier coller cette adresse : http://localhost:5173. --
                Si besoin vous devrez peut etre rajouter un .env a la racine du projet.
                    Dans celui-ci vous devrez entrer ces valeurs : 
                        MYSQL_DATABASE=todoapp
                        MYSQL_HOST=db
                        MYSQL_USER_BACK=root
                        MYSQL_ROOT_PASSWORD=root
                        PORT=3000
                        JWT_SECRET=MaSuperCléSecrèteUltraSécurisée

            3. -- Voila maintenant vous vous retrouvez sur la page principale. --
    
     -Utilisation de notre site Etodo:
            1. -- Si vous n'avez de compte veuillez cloquer sur register sinon login.--
            2. -- Register : 
                            -Veuillez saisir un nom , prenom , email et mot de passe.
               -- Login : 
                            -Veulliez saisir votre email et votre mot de passe.

            3. Vous etes maintenant connectes a votre compte etodo:
               -- Vous pouvez ajouter des tasks avec le bouton New Task situe en haut a droite de la page.

               -- Un menu s'ouvrira , dans celui ci veuillez a remplir obligatoirement un Titre , une Description 
                        et une Date de rendue. Sauvegardez le tout avec le bouton <Add>.

               -- Vous venez maintenant de creer une carte. Par default elle se situera dans la colonne "Not Started".
                        Vous pouvez la bouger en la maintenant cliquee et en la glissant sur les trois autres colonnes qui sont :
                            "Todo" , "In Progress" et "Done".

               -- Vous pouvez donc grace a ce systeme organiser vos cartes comme bon vous semble.
                       - Si vous avez besoin de supprimer une de vos taches , vous pouvez cliquer sur update et 
                            la poubelle situee en haut a droite du formulaire.
                       - Si par contre vous avez besoin de modifier votre taches pour n'importe quelles raisons,
                            veuillez cliquer sur update puis la chose que vous voulez modifier soit le titre , la description
                                ou la date.
                
                -- En haut de la page vous allez trouver une barre de recherche.
                    - Pour l'utiliser rien de plus simple selectionner la et remplissez la avec le titre de la taches que 
                        vous recherchez. Elle devrait apparaitre en brillant.

                -- Un menu deroulant et a votre disposisiton.
                    - Pour l'utiliser veuiller selectionner les trois barres en haut a droite.
                        Des boutons light mode , Settings , et Logout devraient apparaitre.
                            Light mode > pour changer de sombre a clair le site web et inversement.
                            Settings > bouton qui affichera vos parametres utilisateurs.
                            Logout > pour bous deconnecter.
                    Settings > 
                        Une fois ouvert : vous pouvez changer votre nom , prenom , email et mot de passe.
                            Vous pouvez aussi si vous le souhaitez supprimer votre compte avec le bouton <Delete Account>
                            Sinon vous voulez confirmer vos changements avec Confirm et si aucun changement a ete fait vous pouvez 
                                revenir a la page principale avec le bouton <Todo>

            ---- Vous savez maintenant comment utiliser a la perfection notre application site web ----

