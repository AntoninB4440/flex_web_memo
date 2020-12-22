import ContentDOM from "./ContentDOM.js"

export default class Term extends ContentDOM{
    constructor(term,createBoard){
        super();

        //propriété
        this.name = term.name;
        this.id = term.id;


        //Appel du render et stockage des infos
        this.termDomButton = this.render();

        //Gestion des évènements
        this.termDomButton.onclick = () => {
            console.log("Click on : " , this.name,this.id);
            createBoard(this.name, this.id);
        }
    }

    render = () => {
        const button = this.createDOM(
            "button",this.name,document.getElementById("terms"), {class: "btn btn-secondary p-2 m-2"});

        return button
    }
}