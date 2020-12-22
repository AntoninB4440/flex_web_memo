import Board from "./classes/Board.js";
import Term from "./classes/Term.js";
import Coopernet from "./services/Coopernet.js"

//instantiation de la classe Coopernet
const coop = new Coopernet("https://www.coopernet.fr");

/**
 * Chainage de promesse
 * 1 - promesse de token
 * 2 - promesse de user uniquement si promesse token valide
 * 3 - promesse de term uniquement si promesse user valide
 */
let token;
let user;

async function getTokenUser(){
  try {
      //récupération du token
      token = await coop.getToken();
      console.log("Token : ", token);
      
      //récupération des données de l'utilisateur
      user = await coop.getUser("y","y",token);

      //récupération des termes (rubriques)
      const terms = await coop.getTerms(user,token);
      console.log("termes de y : ", terms);

      //parcours du tableau terms
      for(let term of terms){
        //Callback : c'est à dire passage de la référence vers la méthode createBoard
        new Term(term, createBoard);
      }
      
  } catch (error) {
      console.error("Erreur attrapée dans getTokenUser: ", error);
  }
};

getTokenUser();

async function createBoard(title,id){
  try{
    console.log("Dans createBoard: ", title, id);
    if(token && user){
      //Récupération des colones
      const columns = await coop.getCards(user,token,id);
      console.log("Colonnes : ", columns);

      const board = new Board(title,columns);
      console.log("Board : ", board);
    }
  } catch (error){
    console.error("Erreur attrapée dasn createBoard: ", error);
  }
}


/////////////////////////////////////////////////////////////////////////
/* getToken= () => {
    return fetch("https://www.coopernet.fr/rest/session/token/")
    .then(function(response) {
      if (response.status !== 200) { // si ça c'est mal passé
        throw new Error("Le serveur n'a pas répondu correctement");
      } else return response.text(); // renvoie une promesse
    })
    .then(function(data) { // data correspond au retour du résolve (ici deux lignes au dessus)
      console.log("Token récupéré : ", data);
    })
    .catch(error => {console.log("Erreur attrapée : ", error)});
}

getTokenUser = async () => {
    try {
        //récupération du token
        const token = await getToken();
        
        //récupération des données de l'utilisateur
        //const user = await getUser(token);

    } catch (error) {
        console.log("Erreur attrapée: ", error);
    }
}

getTokenUser(); */
