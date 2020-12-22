import ContentDOM from "./ContentDOM.js";

export default class Card extends ContentDOM{
    constructor(question,answer,column){
        super();
        this.question = question;
        this.answer = answer;
        this.column = column;

        //construction du dom de la carte
        this.cardElements = this.render();
        
        //Gestion des évènements 
        this.handleEvents();

        
    }

    handleEvents = () => {
        //gestion des événements
        this.cardElements.button_remove.onclick = () => {
            console.log("Click sur le bouton pour supprimer une carte");
            //On appelle la methode removeCard du Context Column en lui passant en paramètre le context Card(this)
            this.column.removeCard(this);
        }

        ////Affichage formulaire
        this.cardElements.button_param.onclick = () => {
            this.cardElements.form.hidden = false;
        }

        //affichage de la réponse
        this.cardElements.question.onclick = () => {
            if (this.cardElements.answer.hidden){
                this.cardElements.answer.hidden = false;
            } else {
                this.cardElements.answer.hidden = true;
            }
        }

        //gestion soumission formulaire
        this.cardElements.form.onsubmit = (event) =>{
            event.preventDefault();

            //// Récupération des nouvelles valeurs
            const new_question = this.cardElements.input_question.value;
            const new_answer = this.cardElements.input_answer.value;

            //// Modification à la fois des propriétés question et answer mais aussi des éléments  du dom correspondant
            this.question = new_question;
            this.cardElements.question.textContent = new_question;
            this.answer = new_answer;
            this.cardElements.answer.textContent = new_answer;

            //on chache le formulaire
            //this.cardElements.form.hidden = false;
        }
    }

    /////Creation d'une carte avec un titre, un paragraphe et un bouton
    render = () => {
        const article = this.createDOM("article","",this.column.domElements.section_cards, {class: "text-light bg-dark rounded p-4 mt-2 mb-2"});
        const question = this.createDOM("h4",this.question,article,{
            id: "question"
        })
        const answer= this.createDOM("p",this.answer,article,{
            id : "answer"
        });
        answer.hidden = true;

        ////////////Création du formulaire
        const form = this.createDOM("form","",document.querySelector(".modal-body"),{class: "form-group"})
        const label_question = this.createDOM("label","Question",form);
        const input_question = this.createDOM("input","",form, {type: "text", name: "question", id: "question", value: "", class: "form-control"});
        const label_answer = this.createDOM("label","Réponse",form);
        const input_answer = this.createDOM("input","",form, {type: "text", name: "answer", id: "answer", value: "", class: "form-control"});

        //on cache le formulaire
        form.hidden = true;

        /////Création bouton
        const button_remove = this.createDOM("button","Supprimer la carte",article,{class: "btn btn-danger mr-2"});
        const button_param = this.createDOM("button","Modifier la carte",article,{class: "btn btn-warning"});
        const button_validation = this.createDOM("input","",form,{type: "submit", value:"Valider", class: "btn btn-success"});


        return {
            article: article,
            question: question,
            answer: answer,
            button_remove: button_remove,
            button_param: button_param,
            form: form,
            input_question: input_question,
            input_answer: input_answer,
            button_validation: button_validation
        }
    }

};


//Par défaut, la réponse est cachée, et au click sur la question ,a réponse est affichée ou cachée

// Faire en sorte que ajouter bouton, affiche un formulaire qui permet de crée une carte avec la question et la réponse de notre choix
 