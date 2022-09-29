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
        this.dragged = null;
        this.options = [];

        if (DualListbox.isDomElement(selector)) {
            this.select = selector;
        } else {
            this.select = document.querySelector(selector);
        }

        this._initOptions(options);
        this._initReusableElements();
        if (options.options !== undefined) {
            this.options = options.options;
        } else {
            this._splitOptions(this.select.options);
        }

        this._buildDualListbox(this.select.parentNode);
        this._addActions();

        if (this.showSortButtons) {
            this._initializeSortButtons();
        }

        this.redraw();
    }

    /**
     * Sets the default values that can be overwritten.
     */
    setDefaults() {
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

        this.showSortButtons = false;
        this.sortFunction = (a, b) => {
            if (a.selected) {
                return -1;
            }
            if (b.selected) {
                return 1;
            }
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        };
        this.upButtonText = "up";
        this.downButtonText = "down";

        this.enableDoubleClick = true;
        this.draggable = true;
    }

    changeOrder(liItem, newPosition) {
        console.log(liItem);
        const index = this.options.findIndex((option) => {
            console.log(option, liItem.dataset.id);
            return option.value === liItem.dataset.id;
        });
        console.log(index);
        const cutOptions = this.options.splice(index, 1);
        console.log(cutOptions);
        this.options.splice(newPosition, 0, cutOptions[0]);
    }

    addOptions(options) {
        options.forEach((option) => {
            this.addOption(option);
        });
    }

    addOption(option, index = null) {
        if (index) {
            this.options.splice(index, 0, option);
        } else {
            this.options.push(option);
        }
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
    changeSelected(listItem) {
        const changeOption = this.options.find(
            (option) => option.value === listItem.dataset.id
        );
        changeOption.selected = !changeOption.selected;
        this.redraw();

        setTimeout(() => {
            let event = document.createEvent("HTMLEvents");
            if (changeOption.selected) {
                event.initEvent("added", false, true);
                event.addedElement = listItem;
            } else {
                event.initEvent("removed", false, true);
                event.removedElement = listItem;
            }

            this.dualListbox.dispatchEvent(event);
        }, 0);
    }

    actionAllSelected(event) {
        if (event) {
            event.preventDefault();
        }
        this.options.forEach((option) => (option.selected = true));
        this.redraw();
    }

    actionAllDeselected(event) {
        if (event) {
            event.preventDefault();
        }
        this.options.forEach((option) => (option.selected = false));
        this.redraw();
    }

    /**
     * Redraws the Dual listbox content
     */
    redraw() {
        this.options.sort(this.sortFunction);

        this.updateAvailableListbox();
        this.updateSelectedListbox();
        this.syncSelect();
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
        this._updateListbox(
            this.availableList,
            this.options.filter((option) => !option.selected)
        );
    }

    /**
     * Update the elements in the selected listbox;
     */
    updateSelectedListbox() {
        this._updateListbox(
            this.selectedList,
            this.options.filter((option) => option.selected)
        );
    }

    syncSelect() {
        while (this.select.firstChild) {
            this.select.removeChild(this.select.lastChild);
        }

        this.options.forEach((option) => {
            let optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.innerText = option.text;
            if (option.selected) {
                optionElement.setAttribute("selected", "selected");
            }
            this.select.appendChild(optionElement);
        });
    }

    //
    //
    // PRIVATE FUNCTIONS
    //
    //

    /**
     * Update the elements in the listbox;
     */
    _updateListbox(list, options) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        options.forEach((option) => {
            list.appendChild(this._createListItem(option));
        });
    }

    /**
     * Action to set one listItem to selected.
     */
    actionItemSelected(event) {
        event.preventDefault();

        let selected = this.availableList.querySelector(
            `.${SELECTED_MODIFIER}`
        );
        if (selected) {
            this.changeSelected(selected);
        }
    }

    /**
     * Action to set one listItem to available.
     */
    actionItemDeselected(event) {
        event.preventDefault();

        let selected = this.selectedList.querySelector(`.${SELECTED_MODIFIER}`);
        if (selected) {
            this.changeSelected(selected);
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
        if (this.enableDoubleClick) this.changeSelected(listItem);
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
            this.actionAllSelected(event)
        );
        this.add_button.addEventListener("click", (event) =>
            this.actionItemSelected(event)
        );
        this.remove_button.addEventListener("click", (event) =>
            this.actionItemDeselected(event)
        );
        this.remove_all_button.addEventListener("click", (event) =>
            this.actionAllDeselected(event)
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

        this._liListeners(listItem);
        this._addClickActions(listItem);

        if (this.draggable) {
            listItem.setAttribute("draggable", "true");
        }

        return listItem;
    }

    _liListeners(li) {
        li.addEventListener("dragstart", (event) => {
            // store a ref. on the dragged elem
            console.log("drag start", event);
            this.dragged = event.currentTarget;
            event.currentTarget.classList.add("dragging");
        });
        li.addEventListener("dragend", (event) => {
            event.currentTarget.classList.remove("dragging");
        });

        // For changing the order
        li.addEventListener(
            "dragover",
            (event) => {
                // Allow the drop event to be emitted for the dropzone.
                event.preventDefault();
            },
            false
        );

        li.addEventListener("dragenter", (event) => {
            event.target.classList.add("drop-above");
        });

        li.addEventListener("dragleave", (event) => {
            event.target.classList.remove("drop-above");
        });

        li.addEventListener("drop", (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.target.classList.remove("drop-above");
            let newIndex = this.options.findIndex(
                (option) => option.value === event.target.dataset.id
            );
            if (event.target.parentElement === this.dragged.parentElement) {
                this.changeOrder(this.dragged, newIndex);
                this.redraw();
            } else {
                this.changeSelected(this.dragged);
                this.changeOrder(this.dragged, newIndex);
                this.redraw();
            }
        });
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
     * Create drag and drop listeners
     */
    _createDragListeners() {
        [this.availableList, this.selectedList].forEach((dropzone) => {
            dropzone.addEventListener(
                "dragover",
                (event) => {
                    // Allow the drop event to be emitted for the dropzone.
                    event.preventDefault();
                },
                false
            );

            dropzone.addEventListener("dragenter", (event) => {
                event.target.classList.add("drop-in");
            });

            dropzone.addEventListener("dragleave", (event) => {
                event.target.classList.remove("drop-in");
            });

            dropzone.addEventListener("drop", (event) => {
                event.preventDefault();

                event.target.classList.remove("drop-in");
                if (
                    dropzone.classList.contains("dual-listbox__selected") ||
                    dropzone.classList.contains("dual-listbox__available")
                ) {
                    this.changeSelected(this.dragged);
                }
            });
        });
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
        if (this.draggable) {
            setTimeout(() => {
                this._createDragListeners();
            }, 10);
        }
    }

    /**
     * @Private
     * Splits the options and places them in the correct list.
     */
    _splitOptions(options) {
        [...options].forEach((option, index) => {
            this.addOption({
                text: option.innerHTML,
                value: option.value,
                selected: option.attributes.selected || false,
                order: index,
            });
        });
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

        const selected = this.dualListbox.querySelector(
            ".dual-listbox__item--selected"
        );
        const option = this.options.find(
            (option) => option.value === selected.dataset.id
        );
        if (selected) {
            const newIndex = this._getNewIndex(selected, direction);
            if (newIndex >= 0) {
                this.changeOrder(selected, newIndex);
                this.redraw();
            }
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
    _getNewIndex(selected, direction) {
        const oldIndex = this.options.findIndex(
            (option) => option.value === selected.dataset.id
        );

        let newIndex = oldIndex;
        if (DIRECTION_UP === direction) {
            newIndex -= 1;
        } else if (
            DIRECTION_DOWN === direction &&
            oldIndex < selected.length - 1
        ) {
            newIndex += 1;
        }

        return newIndex;
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
