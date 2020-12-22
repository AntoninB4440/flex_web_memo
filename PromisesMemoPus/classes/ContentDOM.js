export default class ContentDOM {
/**
 * 
 * @param {string} tagname 
 * @param {string} text 
 * @param {DOM Element} parentEl
 * @param {Object} attributes
 */

    createDOM = (tagname,text,parentEl,attributes) => {
    let element = document.createElement(tagname);
    element.textContent = text;
    parentEl.appendChild(element);
    
    for(let attribute in attributes){
        element.setAttribute(attribute , attributes[attribute]);
    };
    return element;

};
}