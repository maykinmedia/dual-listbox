/**
 * Dual select interface allowing the user to select items from a list of provided options.
 * @class
 */
const CONTAINER_BLOCK = 'dual-listbox';
const AVAILABLE_ELEMENT = 'dual-listbox__available';
const SELECTED_ELEMENT = 'dual-listbox__selected';
const ITEM_ELEMENT = 'dual-listbox__item';
const SELECTED_MODIFIER = 'dual-listbox__item--selected';


class DualListbox {
    constructor(selector) {
        this.select = document.querySelector(selector);
        this.selected = [];
        this.available = [];

        this.splitSelectOptions(this.select);
        this.initDualListbox(this.select.parentNode);
    }

    /**
     * Add the listItem to the selected list.
     * 
     * @param {NodeElement} listItem
     */
    addSelected(listItem) {
        let index = this.available.indexOf(listItem);
        if (index > -1) {
            this.available.splice(index, 1);
        }
        this.selected.push(listItem);
        this.selectOption(listItem.dataset.id);
        this.redraw();
    }

    /**
     * Removes the listItem from the selected list.
     * 
     * @param {NodeElement} listItem
     */
    removeSelected(listItem) {
        let index = this.selected.indexOf(listItem);
        if (index > -1) {
            this.selected.splice(index, 1);
        }
        this.available.push(listItem);
        this.deselectOption(listItem.dataset.id);
        this.redraw();
    }

    /**
     * Selects the option with the matching value
     * 
     * @param {Object} value
     */
    selectOption(value) {
        let options = this.select.options;

        for(let option of options) {
            if(option.value === value) {
                option.selected = true;
            }
        }
    }

    /**
     * Deselects the option with the matching value
     * 
     * @param {Object} value
     */
    deselectOption(value) {
        let options = this.select.options;

        for(let option of options) {
            if(option.value === value) {
                option.selected = false;
            }
        }
    }

    /**
     * Redraws the Dual listbox content
     */
    redraw() {
        let that = this;

        let availebleList = this.createListbox(this.available, AVAILABLE_ELEMENT);
        let selectedList = this.createListbox(this.selected, SELECTED_ELEMENT);
        let buttons = this.createButtons();

        let search = document.createElement('input');
        search.onchange = function(){that.search(this.value);};
        search.onkeyup = function(){that.search(this.value);};

        this.dualListbox.innerHTML = '';
        this.dualListbox.appendChild(search);
        this.dualListbox.appendChild(availebleList);
        this.dualListbox.appendChild(buttons);
        this.dualListbox.appendChild(selectedList);
    }

    /**
     * Filters the listboxes.
     * 
     * @param {Object} searchString
     */
    search(searchString) {
        let items = this.dualListbox.querySelectorAll(`.${ITEM_ELEMENT}`);
        items.forEach(function(item) {
            if(searchString) {
                if(!item.innerText.includes(searchString)) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            } else {
                item.style.display = 'block';
            }
        });
    }

    /**
     * Creates the DualListbox.
     */
    initDualListbox(container) {
        let dualListbox = document.createElement('div');
        dualListbox.classList.add(CONTAINER_BLOCK);
        
        container.insertBefore(dualListbox, this.select);

        this.select.style.display = 'none';
        this.dualListbox = dualListbox;
        this.redraw();
    }

    /**
     * Creates a listbox
     */
    createListbox(optionList, className) {
        let selectList = document.createElement('ul');
        selectList.classList.add(className);

        for(let listItem of optionList){
            selectList.appendChild(this.addClickActions(listItem));
        }
        return selectList;
    }

    /**
     * Adds the click items to the listItem
     */
    addClickActions(listItem) {
        let that = this;
        
        listItem.ondblclick = function() {
            if (that.selected.indexOf(this) > -1) {
                that.removeSelected(listItem);
            } else {
                that.addSelected(listItem);
            }
        };

        listItem.onclick = function() {
            let items = that.dualListbox.querySelectorAll(`.${ITEM_ELEMENT}`);
            items.forEach(function(value) { 
                value.classList.remove(SELECTED_MODIFIER);
            });
            if(this.classList.contains(SELECTED_MODIFIER)) {
                this.classList.remove(SELECTED_MODIFIER);
            } else{
                this.classList.add(SELECTED_MODIFIER);
            }
        };

        return listItem;
    }

    /**
     * Creates the buttons to add/remove the selected item.
     */
    createButtons() {
        let that = this;

        let buttons = document.createElement('div');
        let add_button = document.createElement('button');
        let remove_button = document.createElement('button');

        add_button.innerText = 'Add';
        add_button.onclick = function() {
            let selected = that.dualListbox.querySelector(`.${SELECTED_MODIFIER}`);
            if(selected) {
                that.addSelected(selected);
            }
        };
        remove_button.innerText = 'remove';
        remove_button.onclick = function() {
            let selected = that.dualListbox.querySelector(`.${SELECTED_MODIFIER}`);
            if(selected) {
                that.removeSelected(selected);
            }
        };

        buttons.appendChild(add_button);
        buttons.appendChild(remove_button);

        return buttons;
    }
    
    /**
     * splits the select options and places them in the correct list.
     */
    splitSelectOptions(select) {
        let options = select.options;

        for(let option of options){
            let listItem = this.createListItem(option);

            if(option.attributes.selected) {
                this.selected.push(listItem);
            } else {
                this.available.push(listItem);
            }
        }
    }

    /**
     * Creates the listItem out of the option
     */
    createListItem(option) {
        let listItem = document.createElement('li');
        listItem.classList.add(ITEM_ELEMENT);
        listItem.innerText = option.innerText;
        listItem.dataset.id = option.value;

        return listItem;
    }
}

export default DualListbox;
export { DualListbox };
