function getToken(){
    return new Promise((resolve,reject) => {
        if (Math.random() > 0.5){
            console.log("Cas Favorable");
            resolve("LJBKIAJ554AFAF64654")
        } else {
            reject("Aie dommache");
        }
    });    
}

function getUser() {
    return new Promise((resolve,reject) => {
        if (Math.random() > 0.5){
            resolve({ login:"Bob", uid: "157"});
        } else {
            reject("Erreur dans l'obtention des informations concernant l'utilisateur");
        }
    });
}

/* getToken()
    .then(token => {
        console.log("Valeur token : " , token);
        //Chainage possible de getUser car renvoie également une promesse
        return getUser();
    })
    .then(user => {
        console.log("Valeur user : ", user);
    })
    .catch(error => console.error(error)); 
*/

async function getTokenUser(){ //async prévient qu'on manipule des fonctions asynchrone
    try{
        //récupération du toke
        const token = await getToken();
        console.log("Token value: ", token);
        //récupération des infos utilisateur si la récup du token est ok
        const user = await getUser();
        console.log("User infos : ", user)
    } catch (error){
        console.log ('Erreur attrapée ? : ', error)
    }
}

getTokenUser();
    
