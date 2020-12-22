import ContentDOM from "./ContentDOM.js";
import Card from "./Card.js";

export default class Column extends ContentDOM{
    constructor(title,cards){
        super();
        this.title = title;
        this.cards = cards;

        //Appel de la méthode qui va afficher la colomn
        this.domElements = this.render();
        this.cardsDisplay();
        //this.formElements = this.creationFormulaire();
        
        this.handleEvents();

        

        // this.domElement.button.onclick = function(){
        //     console.log("Click sur le bouton d'ajout d'une carte");
        //     console.log(this);
        //     this.addCard();
        // }.bind(this)
    }

        ///////Handle Events
        handleEvents = () =>{
            
            //Affichage fenêtre modal avec formualaire pour nouvel carte
            this.domElements.button.onclick = () => {
                //toggle class for modal.
                const modal = document.querySelector("#exampleModal");
                const body = document.querySelector("body");
                    body.classList.toggle("modal-open");
                    modal.classList.toggle("show");
                    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';                    
                    //this.addCard();
            }

        }

        /////Ajout d'une carte dans la colonne
        addCard = () => {
            //On crée une instance Card avec une question et réponse avec le context de la Colomn(this)
            new Card("question", "réponse", this);
        }

        /////Retrait d'une carte dans la colonne
        removeCard = (card) => {
            console.log("Dans removeCard");
            card.cardElements.article.remove();
        }

        ////création d'une colonne avec 1 titre et 1 bouton
        render = () => {
            //On va créer des éléments du DOM
            //this.createDOM("div","text",document.getElementById("main"));
            //Créer une section sans texte qui correspond à la colum
            //puis un titre de niveau 2 avec le titre de la column
            //puis un btn ajouter une carte
            const section = this.createDOM("section","",document.querySelector("#board"),{class : "col-3"});
            const title = this.createDOM("h3",this.title,section);
            const button = this.createDOM(
                "button",
                "+",
                section, 
                {type: "button", class: "btn btn-success", "data-bs-target": "exempleModal", "data-bs-toggle" : "modal"
            });
            const section_cards = this.createDOM("section","",section, {class : "cards"});

            return {
                "section": section,
                "title": title,
                "button": button,
                "section_cards": section_cards,
                //button_validation: button_validation
                }
        };

        //il faut faire en sorte que les cartes déjà dans this.cards génère des éléments du DOM en passant par Card.js
        cardsDisplay = () =>{
            for (let card of this.cards){
                new Card (card.question,card.reponse,this);
            }
        }

        creationFormulaire = () => {
            ////////////Création du formulaire
            const form = this.createDOM("form","",document.querySelector(".modal-body"),{class: "form-group"})
            const label_question = this.createDOM("label","Question",form);
            const input_question = this.createDOM("input","",form, {type: "text", name: "question", id: "question", value: "", class: "form-control"});
            const label_answer = this.createDOM("label","Réponse",form);
            const input_answer = this.createDOM("input","",form, {type: "text", name: "answer", id: "answer", value: "", class: "form-control"});

            return{
                form: form,
                input_question: input_question,
                input_answer: input_answer,
            }
        }

}