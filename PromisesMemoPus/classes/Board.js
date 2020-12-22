import ContentDOM from "./ContentDOM.js";
import Column from "./Column.js";

export default class Board extends ContentDOM{
    constructor(title,columns){
        super();
        this.columns = columns;
        this.title = title;

        this.render();
        
    }

    render = () => {
        // Supression de tous les éléments du Dom présent dans main
        const main = document.querySelector("#board");
        main.innerHTML = "";
        //Titre
        this.createDOM(
            "h2",
            this.title,
            main,
            {class : "col-12"}
        );

        //Colonnes en utilisant Column.js
        for (let col of this.columns){
            new Column (col.name, col.cartes);
        }

    }
}