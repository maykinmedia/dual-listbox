const MAIN_BLOCK = 'dual-listbox';

const CONTAINER_ELEMENT = 'dual-lsitbox__container';
const AVAILABLE_ELEMENT = 'dual-listbox__available';
const SELECTED_ELEMENT = 'dual-listbox__selected';
const TITLE_ELEMENT = 'dual-listbox__title';
const ITEM_ELEMENT = 'dual-listbox__item';
const BUTTONS_ELEMENT = 'dual-listbox__buttons';
const BUTTON_ELEMENT = 'dual-listbox__button';
const SEARCH_ELEMENT = 'dual-listbox__search';

const SELECTED_MODIFIER = 'dual-listbox__item--selected';

const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';


/**
 * Dual select interface allowing the user to select items from a list of provided options.
 * @class
 */
class DualListbox {
    constructor(selector, options={}) {
        this.select = document.querySelector(selector);

        this.selected = [];
        this.available = [];

        this._initOptions(options);
        this._initReusableElements();
        this._splitSelectOptions(this.select);
        this._buildDualListbox(this.select.parentNode);
        this._addActions();

        if (this.sortable) {
            this._initializeSortButtons();
        }

        this.redraw();
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
            this.selected.push(listItem);
            this._selectOption(listItem.dataset.id);
            this.redraw();
        }
    }

    /**
     * Redraws the Dual listbox content
     */
    redraw() {
        this.updateAvailableListbox();
        this.updateSelectedListbox();
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
            this.available.push(listItem);
            this._deselectOption(listItem.dataset.id);
            this.redraw();
        }
    }

    /**
     * Filters the listboxes with the given searchString.
     *
     * @param {Object} searchString
     */
    searchLists(searchString, dualListbox) {
        let items = dualListbox.querySelectorAll(`.${ITEM_ELEMENT}`);

        for(let i = 0; i < items.length; i++) {
            let item = items[i];

            if(searchString) {
                if(item.textContent.indexOf(searchString) === -1) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'list-item';
                }
            } else {
                item.style.display = 'list-item';
            }
        }
    }

    /**
     * Update the elements in the availeble listbox;
     */
    updateAvailableListbox() {
        this.availebleList.innerHTML = '';
        this.availebleList.appendChild(this.availableListTitle);
        for(let i = 0; i < this.available.length; i++) {
            let listItem= this.available[i];
            this.availebleList.appendChild(listItem);
        }
    }

    /**
     * Update the elements in the selected listbox;
     */
    updateSelectedListbox() {
        this.selectedList.innerHTML = '';
        this.selectedList.appendChild(this.selectedListTitle);
        for(let i = 0; i < this.selected.length; i++) {
            let listItem= this.selected[i];
            this.selectedList.appendChild(listItem);
        }
    }

    //
    //
    // PRIVATE FUNCTIONS
    //
    //

    /**
     * Action to set all listItems to selected.
     */
    _actionAllSelected(event) {
        event.preventDefault();

        while(this.available.length > 0) {
            this.addSelected(this.available[0]);
        }
    }

    /**
     * Action to set one listItem to selected.
     */
    _actionItemSelected(event) {
        event.preventDefault();

        let selected = this.dualListbox.querySelector(`.${SELECTED_MODIFIER}`);
        if(selected) {
            this.addSelected(selected);
        }
    }

    /**
     * Action to set all listItems to available.
     */
    _actionAllDeselected(event) {
        event.preventDefault();

        while(this.selected.length > 0) {
            this.removeSelected(this.selected[0]);
        }
    }

    /**
     * Action to set one listItem to available.
     */
    _actionItemDeselected(event) {
        event.preventDefault();

        let selected = this.dualListbox.querySelector(`.${SELECTED_MODIFIER}`);
        if(selected) {
            this.removeSelected(selected);
        }
    }

    /**
     * Action when double clicked on a listItem.
     */
    _actionItemDoubleClick(listItem, event=null) {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (this.selected.indexOf(listItem) > -1) {
            this.removeSelected(listItem);
        } else {
            this.addSelected(listItem);
        }
    }

    /**
     * Action when single clicked on a listItem.
     */
    _actionItemClick(listItem, dualListbox, event=null) {
        if(event) {
            event.preventDefault();
        }

        let items = dualListbox.querySelectorAll(`.${ITEM_ELEMENT}`);

        for(let i = 0; i < items.length; i++) {
            let value = items[i];
            if (value !== listItem) {
                value.classList.remove(SELECTED_MODIFIER);
            }
        }

        if(listItem.classList.contains(SELECTED_MODIFIER)) {
            listItem.classList.remove(SELECTED_MODIFIER);
        } else{
            listItem.classList.add(SELECTED_MODIFIER);
        }
    }

    /**
     * @Private
     * Adds the needed actions to the elements.
     */
    _addActions() {
        this._addButtonActions();
        this._addSearchActions();
    }

    /**
     * Adds the actions to the buttons that are created.
     */
    _addButtonActions() {
        this.add_all_button.addEventListener('click', (event) => this._actionAllSelected(event));
        this.add_button.addEventListener('click', (event) => this._actionItemSelected(event));
        this.remove_button.addEventListener('click', (event) => this._actionItemDeselected(event));
        this.remove_all_button.addEventListener('click', (event) => this._actionAllDeselected(event));
    }

    /**
     * Adds the click items to the listItem.
     *
     * @param {Object} listItem
     */
    _addClickActions(listItem) {
        listItem.addEventListener('dblclick', (event) => this._actionItemDoubleClick(listItem, event));
        listItem.addEventListener('click', (event) => this._actionItemClick(listItem, this.dualListbox, event));
        return listItem;
    }

    /**
     * @Private
     * Adds the actions to the search input.
     */
    _addSearchActions() {
        this.search.addEventListener('change', (event) => this.searchLists(event.target.value, this.dualListbox));
        this.search.addEventListener('keyup', (event) => this.searchLists(event.target.value, this.dualListbox));
    }

    /**
     * @Private
     * Builds the Dual listbox and makes it visible to the user.
     */
    _buildDualListbox(container) {
        this.select.style.display = 'none';

        this.dualListBoxContainer.appendChild(this.availebleList);
        this.dualListBoxContainer.appendChild(this.buttons);
        this.dualListBoxContainer.appendChild(this.selectedList);

        this.dualListbox.appendChild(this.search);
        this.dualListbox.appendChild(this.dualListBoxContainer);

        container.insertBefore(this.dualListbox, this.select);
    }

    /**
     * Creates the buttons to add/remove the selected item.
     */
    _createButtons() {
        this.buttons = document.createElement('div');
        this.buttons.classList.add(BUTTONS_ELEMENT);

        this.add_all_button = document.createElement('button');
        this.add_all_button.classList.add(BUTTON_ELEMENT);
        this.add_all_button.innerHTML = this.addAllButtonText;

        this.add_button = document.createElement('button');
        this.add_button.classList.add(BUTTON_ELEMENT);
        this.add_button.innerHTML = this.addButtonText;

        this.remove_button = document.createElement('button');
        this.remove_button.classList.add(BUTTON_ELEMENT);
        this.remove_button.innerHTML = this.removeButtonText;

        this.remove_all_button = document.createElement('button');
        this.remove_all_button.classList.add(BUTTON_ELEMENT);
        this.remove_all_button.innerHTML = this.removeAllButtonText;

        this.buttons.appendChild(this.add_all_button);
        this.buttons.appendChild(this.add_button);
        this.buttons.appendChild(this.remove_button);
        this.buttons.appendChild(this.remove_all_button);
    }

    /**
     * @Private
     * Creates the listItem out of the option.
     */
    _createListItem(option) {
        let listItem = document.createElement('li');

        listItem.classList.add(ITEM_ELEMENT);
        listItem.innerHTML = option.innerHTML;
        listItem.dataset.id = option.value;

        this._addClickActions(listItem);

        return listItem;
    }

    /**
     * @Private
     * Creates the search input.
     */
    _createSearch() {
        this.search = document.createElement('input');
        this.search.classList.add(SEARCH_ELEMENT);
        this.search.attributes.placehold = this.searchPlaceholder;
    }

    /**
     * @Private
     * Deselects the option with the matching value
     *
     * @param {Object} value
     */
    _deselectOption(value) {
        let options = this.select.options;

        for(let i = 0; i < options.length; i++) {
            let option = options[i];
            if(option.value === value) {
                option.selected = false;
            }
        }

        if(this.removeEvent) {
            this.removeEvent(value);
        }
    }

    /**
     * @Private
     * Set the option variables to this.
     */
    _initOptions(options) {
        this.addEvent = options.addEvent;
        this.removeEvent = options.removeEvent;
        this.availableTitle = options.availableTitle || 'Available options';
        this.selectedTitle = options.selectedTitle || 'Selected options';
        this.addButtonText = options.addButtonText || 'add';
        this.removeButtonText = options.removeButtonText || 'remove';
        this.addAllButtonText = options.addAllButtonText || 'add all';
        this.removeAllButtonText = options.removeAllButtonText || 'remove all';
        this.searchPlaceholder = options.searchPlaceholder || 'Search';
        this.sortable = options.sortable || false;
        this.upButtonText = options.upButtonText || 'up';
        this.downButtonText = options.downButtonText || 'down';
    }

    /**
     * @Private
     * Creates all the static elements for the Dual listbox.
     */
    _initReusableElements() {
        this.dualListbox = document.createElement('div');
        this.dualListbox.classList.add(MAIN_BLOCK);
        if(this.select.id) {
            this.dualListbox.classList.add(this.select.id);
        }

        this.dualListBoxContainer = document.createElement('div');
        this.dualListBoxContainer.classList.add(CONTAINER_ELEMENT);

        this.availebleList = document.createElement('ul');
        this.availebleList.classList.add(AVAILABLE_ELEMENT);

        this.selectedList = document.createElement('ul');
        this.selectedList.classList.add(SELECTED_ELEMENT);

        this.availableListTitle = document.createElement('li');
        this.availableListTitle.classList.add(TITLE_ELEMENT);
        this.availableListTitle.innerText = this.availableTitle;

        this.selectedListTitle = document.createElement('li');
        this.selectedListTitle.classList.add(TITLE_ELEMENT);
        this.selectedListTitle.innerText = this.selectedTitle;

        this._createButtons();
        this._createSearch();
    }

    /**
     * @Private
     * Selects the option with the matching value
     *
     * @param {Object} value
     */
    _selectOption(value) {
        let options = this.select.options;

        for(let i = 0; i < options.length; i++) {
            let option = options[i];
            if(option.value === value) {
                option.selected = true;
            }
        }

        if(this.addEvent) {
            this.addEvent(value);
        }
    }

    /**
     * @Private
     * Splits the select options and places them in the correct list.
     */
    _splitSelectOptions(select) {
        let options = select.options;

        for(let i = 0; i < options.length; i++) {
            let option = options[i];
            let listItem = this._createListItem(option);

            if(option.attributes.selected) {
                this.selected.push(listItem);
            } else {
                this.available.push(listItem);
            }
        }
    }


    /**
     * @private
     * @return {void}
     */
    _initializeSortButtons() {
        const sortUpButton = document.createElement('button');
        sortUpButton.classList.add('dual-listbox__button');
        sortUpButton.innerText = this.upButtonText;
        sortUpButton.addEventListener('click', event => this._onSortButtonClick(event, DIRECTION_UP));

        const sortDownButton = document.createElement('button');
        sortDownButton.classList.add('dual-listbox__button');
        sortDownButton.innerText = this.downButtonText;
        sortDownButton.addEventListener('click', event => this._onSortButtonClick(event, DIRECTION_DOWN));

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('dual-listbox__buttons');
        buttonContainer.appendChild(sortUpButton);
        buttonContainer.appendChild(sortDownButton);

        this.dualListBoxContainer.appendChild(buttonContainer);
    }

    /**
     * @private
     * @param {MouseEvent} event
     * @param {string} direction
     * @return {void}
     */
    _onSortButtonClick(event, direction) {
        event.preventDefault();

        const [oldIndex, newIndex] = this._findSelected(direction);
        if (oldIndex !== newIndex) {
            this._sortUnderlyingSelectOptions(oldIndex, newIndex);
            this._sortSelected(oldIndex, newIndex);
            this.redraw();
        }
    }

    /**
     * Returns an array where the first element is the old index of the currently
     * selected item in the right box and the second element is the new index.
     *
     * @private
     * @param {string} direction
     * @return {int[]}
     */
    _findSelected(direction) {
        const oldIndex = this.selected.findIndex(element => element.classList.contains('dual-listbox__item--selected'));

        let newIndex = oldIndex;
        if (DIRECTION_UP === direction && oldIndex > 0) {
            newIndex -= 1;
        } else if (DIRECTION_DOWN === direction && oldIndex < (this.selected.length - 1)) {
            newIndex += 1;
        }

        return [oldIndex, newIndex];
    }

    /**
     * Sorts the <option>'s in the underlying <select> in order to ensure
     * that submitted form value are in the correct order.
     *
     * Note: This method must be called before {@link _sortSelected} as it
     *       relies on the selected elements being in the old state.
     *
     * @private
     * @param {int} oldIndex
     * @param {int} newIndex
     * @return {void}
     */
    _sortUnderlyingSelectOptions(oldIndex, newIndex) {
        // `this.selected` are the list elements that are currently 'selected' in
        // the right box. The indexes of these are different from the indexes of the
        // underlying select, since the latter contains all options. The indexes are
        // mapped correctly using `data-id` which contains the value of the option.
        const oldValue = this.selected[oldIndex].getAttribute('data-id');
        const newValue = this.selected[newIndex].getAttribute('data-id');
        const oldOptionIndex = [...this.select.children].findIndex(option => option.value === oldValue);
        const newOptionIndex = [...this.select.children].findIndex(option => option.value === newValue);

        // Remove old element
        const option = this.select.children[oldOptionIndex];
        option.remove();

        // Re-insert it at correct posision
        this.select.insertBefore(option, this.select.children[newOptionIndex]);
    }

    /**
     * Sorts the `selected` array that forms the basis of the visual
     * rendering of the DualListBox.
     *
     * Note: After this method was called you will probably want to call
     *       {@link redraw} in order to ensure that the DOM output matches
     *       the new order.
     *
     * @private
     * @param {int} oldIndex
     * @param {int} newIndex
     * @return {void}
     */
    _sortSelected(oldIndex, newIndex) {
        const selected = this.selected[oldIndex];
        this.selected.splice(oldIndex, 1);
        this.selected.splice(newIndex, 0, selected);
    }
}

export default DualListbox;
export { DualListbox };
