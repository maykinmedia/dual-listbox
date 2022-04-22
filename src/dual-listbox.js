const MAIN_BLOCK = "dual-listbox";

const CONTAINER_ELEMENT = "dual-listbox__container";
const AVAILABLE_ELEMENT = "dual-listbox__available";
const SELECTED_ELEMENT = "dual-listbox__selected";
const TITLE_ELEMENT = "dual-listbox__title";
const ITEM_ELEMENT = "dual-listbox__item";
const BUTTONS_ELEMENT = "dual-listbox__buttons";
const BUTTON_ELEMENT = "dual-listbox__button";
const SEARCH_ELEMENT = "dual-listbox__search";

const SELECTED_MODIFIER = "dual-listbox__item--selected";

const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";

/**
 * Dual select interface allowing the user to select items from a list of provided options.
 * @class
 */
class DualListbox {
    constructor(selector, options = {}) {
        this.setDefaults();
        this.selected = [];
        this.available = [];

        if (DualListbox.isDomElement(selector)) {
            this.select = selector;
        } else {
            this.select = document.querySelector(selector);
        }

        this._initOptions(options);
        this._initReusableElements();
        this._splitOptions(this.select.options);
        if (options.options !== undefined) {
            this._splitOptions(options.options);
        }
        this._buildDualListbox(this.select.parentNode);
        this._addActions();

        if (this.sortable) {
            this._initializeSortButtons();
        }

        this.redraw();
    }

    /**
     * Sets the default values that can be overwritten.
     */
    setDefaults() {
        this.addEvent = null; // TODO: Remove in favor of eventListener
        this.removeEvent = null; // TODO: Remove in favor of eventListener
        this.availableTitle = "Available options";
        this.selectedTitle = "Selected options";

        this.showAddButton = true;
        this.addButtonText = "add";

        this.showRemoveButton = true;
        this.removeButtonText = "remove";

        this.showAddAllButton = true;
        this.addAllButtonText = "add all";

        this.showRemoveAllButton = true;
        this.removeAllButtonText = "remove all";

        this.searchPlaceholder = "Search";

        this.sortable = false;
        this.upButtonText = "up";
        this.downButtonText = "down";
    }

    /**
     * Add eventListener to the dualListbox element.
     *
     * @param {String} eventName
     * @param {function} callback
     */
    addEventListener(eventName, callback) {
        this.dualListbox.addEventListener(eventName, callback);
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

            setTimeout(() => {
                let event = document.createEvent("HTMLEvents");
                event.initEvent("added", false, true);
                event.addedElement = listItem;
                this.dualListbox.dispatchEvent(event);
            }, 0);
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

            setTimeout(() => {
                let event = document.createEvent("HTMLEvents");
                event.initEvent("removed", false, true);
                event.removedElement = listItem;
                this.dualListbox.dispatchEvent(event);
            }, 0);
        }
    }

    /**
     * Filters the listboxes with the given searchString.
     *
     * @param {Object} searchString
     * @param dualListbox
     */
    searchLists(searchString, dualListbox) {
        let items = dualListbox.querySelectorAll(`.${ITEM_ELEMENT}`);
        let lowerCaseSearchString = searchString.toLowerCase();

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (
                item.textContent
                    .toLowerCase()
                    .indexOf(lowerCaseSearchString) === -1
            ) {
                item.style.display = "none";
            } else {
                item.style.display = "list-item";
            }
        }
    }

    /**
     * Update the elements in the available listbox;
     */
    updateAvailableListbox() {
        this._updateListbox(this.availableList, this.available);
    }

    /**
     * Update the elements in the selected listbox;
     */
    updateSelectedListbox() {
        this._updateListbox(this.selectedList, this.selected);
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

        let selected = this.available.filter(
            (item) => item.style.display !== "none"
        );
        selected.forEach(function (listItem) {
            let index = this.available.indexOf(listItem);
            if (index > -1) {
                this.available.splice(index, 1);
                this.selected.push(listItem);
                this._selectOption(listItem.dataset.id);

                setTimeout(() => {
                    let event = document.createEvent("HTMLEvents");
                    event.initEvent("added", false, true);
                    event.addedElement = listItem;
                    this.dualListbox.dispatchEvent(event);
                }, 0);
            }
        });
        this.redraw();
    }

    /**
     * Update the elements in the listbox;
     */
    _updateListbox(list, elements) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        for (let i = 0; i < elements.length; i++) {
            let listItem = elements[i];
            list.appendChild(listItem);
        }
    }

    /**
     * Action to set one listItem to selected.
     */
    _actionItemSelected(event) {
        event.preventDefault();

        let selected = this.dualListbox.querySelector(`.${SELECTED_MODIFIER}`);
        if (selected) {
            this.addSelected(selected);
        }
    }

    /**
     * Action to set all listItems to available.
     */
    _actionAllDeselected(event) {
        event.preventDefault();

        let deselected = this.selected.filter(
            (item) => item.style.display !== "none"
        );
        deselected.forEach(function (listItem) {
            let index = this.selected.indexOf(listItem);
            if (index > -1) {
                this.selected.splice(index, 1);
                this.available.push(listItem);
                this._deselectOption(listItem.dataset.id);

                setTimeout(() => {
                    let event = document.createEvent("HTMLEvents");
                    event.initEvent("removed", false, true);
                    event.removedElement = listItem;
                    this.dualListbox.dispatchEvent(event);
                }, 0);
            }
        });
        this.redraw();
    }

    /**
     * Action to set one listItem to available.
     */
    _actionItemDeselected(event) {
        event.preventDefault();

        let selected = this.dualListbox.querySelector(`.${SELECTED_MODIFIER}`);
        if (selected) {
            this.removeSelected(selected);
        }
    }

    /**
     * Action when double clicked on a listItem.
     */
    _actionItemDoubleClick(listItem, event = null) {
        if (event) {
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
    _actionItemClick(listItem, dualListbox, event = null) {
        if (event) {
            event.preventDefault();
        }

        let items = dualListbox.querySelectorAll(`.${ITEM_ELEMENT}`);

        for (let i = 0; i < items.length; i++) {
            let value = items[i];
            if (value !== listItem) {
                value.classList.remove(SELECTED_MODIFIER);
            }
        }

        if (listItem.classList.contains(SELECTED_MODIFIER)) {
            listItem.classList.remove(SELECTED_MODIFIER);
        } else {
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
        this.add_all_button.addEventListener("click", (event) =>
            this._actionAllSelected(event)
        );
        this.add_button.addEventListener("click", (event) =>
            this._actionItemSelected(event)
        );
        this.remove_button.addEventListener("click", (event) =>
            this._actionItemDeselected(event)
        );
        this.remove_all_button.addEventListener("click", (event) =>
            this._actionAllDeselected(event)
        );
    }

    /**
     * Adds the click items to the listItem.
     *
     * @param {Object} listItem
     */
    _addClickActions(listItem) {
        listItem.addEventListener("dblclick", (event) =>
            this._actionItemDoubleClick(listItem, event)
        );
        listItem.addEventListener("click", (event) =>
            this._actionItemClick(listItem, this.dualListbox, event)
        );
        return listItem;
    }

    /**
     * @Private
     * Adds the actions to the search input.
     */
    _addSearchActions() {
        this.search_left.addEventListener("change", (event) =>
            this.searchLists(event.target.value, this.availableList)
        );
        this.search_left.addEventListener("keyup", (event) =>
            this.searchLists(event.target.value, this.availableList)
        );
        this.search_right.addEventListener("change", (event) =>
            this.searchLists(event.target.value, this.selectedList)
        );
        this.search_right.addEventListener("keyup", (event) =>
            this.searchLists(event.target.value, this.selectedList)
        );
    }

    /**
     * @Private
     * Builds the Dual listbox and makes it visible to the user.
     */
    _buildDualListbox(container) {
        this.select.style.display = "none";

        this.dualListBoxContainer.appendChild(
            this._createList(
                this.search_left,
                this.availableListTitle,
                this.availableList
            )
        );
        this.dualListBoxContainer.appendChild(this.buttons);
        this.dualListBoxContainer.appendChild(
            this._createList(
                this.search_right,
                this.selectedListTitle,
                this.selectedList
            )
        );

        this.dualListbox.appendChild(this.dualListBoxContainer);

        container.insertBefore(this.dualListbox, this.select);
    }

    /**
     * Creates list with the header.
     */
    _createList(search, header, list) {
        let result = document.createElement("div");
        result.appendChild(search);
        result.appendChild(header);
        result.appendChild(list);
        return result;
    }

    /**
     * Creates the buttons to add/remove the selected item.
     */
    _createButtons() {
        this.buttons = document.createElement("div");
        this.buttons.classList.add(BUTTONS_ELEMENT);

        this.add_all_button = document.createElement("button");
        this.add_all_button.innerHTML = this.addAllButtonText;

        this.add_button = document.createElement("button");
        this.add_button.innerHTML = this.addButtonText;

        this.remove_button = document.createElement("button");
        this.remove_button.innerHTML = this.removeButtonText;

        this.remove_all_button = document.createElement("button");
        this.remove_all_button.innerHTML = this.removeAllButtonText;

        const options = {
            showAddAllButton: this.add_all_button,
            showAddButton: this.add_button,
            showRemoveButton: this.remove_button,
            showRemoveAllButton: this.remove_all_button,
        };

        for (let optionName in options) {
            if (optionName) {
                const option = this[optionName];
                const button = options[optionName];

                button.setAttribute("type", "button");
                button.classList.add(BUTTON_ELEMENT);

                if (option) {
                    this.buttons.appendChild(button);
                }
            }
        }
    }

    /**
     * @Private
     * Creates the listItem out of the option.
     */
    _createListItem(option) {
        let listItem = document.createElement("li");

        listItem.classList.add(ITEM_ELEMENT);
        listItem.innerHTML = option.text;
        listItem.dataset.id = option.value;

        this._addClickActions(listItem);

        return listItem;
    }

    /**
     * @Private
     * Creates the search input.
     */
    _createSearchLeft() {
        this.search_left = document.createElement("input");
        this.search_left.classList.add(SEARCH_ELEMENT);
        this.search_left.placeholder = this.searchPlaceholder;
    }

    /**
     * @Private
     * Creates the search input.
     */
    _createSearchRight() {
        this.search_right = document.createElement("input");
        this.search_right.classList.add(SEARCH_ELEMENT);
        this.search_right.placeholder = this.searchPlaceholder;
    }

    /**
     * @Private
     * Deselects the option with the matching value
     *
     * @param {Object} value
     */
    _deselectOption(value) {
        let options = this.select.options;

        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            if (option.value === value) {
                option.selected = false;
                option.removeAttribute("selected");
            }
        }

        if (this.removeEvent) {
            this.removeEvent(value);
        }
    }

    /**
     * @Private
     * Set the option variables to this.
     */
    _initOptions(options) {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }

    /**
     * @Private
     * Creates all the static elements for the Dual listbox.
     */
    _initReusableElements() {
        this.dualListbox = document.createElement("div");
        this.dualListbox.classList.add(MAIN_BLOCK);
        if (this.select.id) {
            this.dualListbox.classList.add(this.select.id);
        }

        this.dualListBoxContainer = document.createElement("div");
        this.dualListBoxContainer.classList.add(CONTAINER_ELEMENT);

        this.availableList = document.createElement("ul");
        this.availableList.classList.add(AVAILABLE_ELEMENT);

        this.selectedList = document.createElement("ul");
        this.selectedList.classList.add(SELECTED_ELEMENT);

        this.availableListTitle = document.createElement("div");
        this.availableListTitle.classList.add(TITLE_ELEMENT);
        this.availableListTitle.innerText = this.availableTitle;

        this.selectedListTitle = document.createElement("div");
        this.selectedListTitle.classList.add(TITLE_ELEMENT);
        this.selectedListTitle.innerText = this.selectedTitle;

        this._createButtons();
        this._createSearchLeft();
        this._createSearchRight();
    }

    /**
     * @Private
     * Selects the option with the matching value
     *
     * @param {Object} value
     */
    _selectOption(value) {
        let options = this.select.options;

        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            if (option.value === value) {
                option.selected = true;
                option.setAttribute("selected", "");
            }
        }

        if (this.addEvent) {
            this.addEvent(value);
        }
    }

    /**
     * @Private
     * Splits the options and places them in the correct list.
     */
    _splitOptions(options) {
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            if (DualListbox.isDomElement(option)) {
                this._addOption({
                    text: option.innerHTML,
                    value: option.value,
                    selected: option.attributes.selected,
                });
            } else {
                this._addOption(option);
            }
        }
    }

    /**
     * @Private
     * Adds option to the selected of available list (depending on the data).
     */
    _addOption(option) {
        let listItem = this._createListItem(option);

        if (option.selected) {
            this.selected.push(listItem);
        } else {
            this.available.push(listItem);
        }
    }

    /**
     * @private
     * @return {void}
     */
    _initializeSortButtons() {
        const sortUpButton = document.createElement("button");
        sortUpButton.classList.add("dual-listbox__button");
        sortUpButton.innerText = this.upButtonText;
        sortUpButton.addEventListener("click", (event) =>
            this._onSortButtonClick(event, DIRECTION_UP)
        );

        const sortDownButton = document.createElement("button");
        sortDownButton.classList.add("dual-listbox__button");
        sortDownButton.innerText = this.downButtonText;
        sortDownButton.addEventListener("click", (event) =>
            this._onSortButtonClick(event, DIRECTION_DOWN)
        );

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("dual-listbox__buttons");
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
        const oldIndex = this.selected.findIndex((element) =>
            element.classList.contains("dual-listbox__item--selected")
        );

        let newIndex = oldIndex;
        if (DIRECTION_UP === direction && oldIndex > 0) {
            newIndex -= 1;
        } else if (
            DIRECTION_DOWN === direction &&
            oldIndex < this.selected.length - 1
        ) {
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
        const oldValue = this.selected[oldIndex].getAttribute("data-id");
        const newValue = this.selected[newIndex].getAttribute("data-id");
        const oldOptionIndex = [...this.select.children].findIndex(
            (option) => option.value === oldValue
        );
        const newOptionIndex = [...this.select.children].findIndex(
            (option) => option.value === newValue
        );

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

    /**
     * @Private
     * Returns true if argument is a DOM element
     */
    static isDomElement(o) {
        return typeof HTMLElement === "object"
            ? o instanceof HTMLElement //DOM2
            : o &&
                  typeof o === "object" &&
                  o !== null &&
                  o.nodeType === 1 &&
                  typeof o.nodeName === "string";
    }
}

window.DualListbox = DualListbox;
export default DualListbox;
export { DualListbox };
