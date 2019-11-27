import DualListbox, {DualListbox as DualListbox2} from '../../src/dual-listbox.js';


const SELECT_CLASS = 'select';


const FIXTURE_EMPTY_SELECT = `
    <select class="${SELECT_CLASS}"></select>
`;


const FIXTURE_FILLED_SELECT = `
    <select class="${SELECT_CLASS}">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
        <option value="9">Nine</option>
        <option value="10">Ten</option>
    </select>
`;


const FIXTURE_FILLED_SELECT_PRESELECTED = `
    <select class="${SELECT_CLASS}">
        <option value="1">One</option>
        <option value="2" selected>Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
        <option value="9">Nine</option>
        <option value="10">Ten</option>
    </select>
`;


const FIXTURE_FILLED_SELECT_WITH_ID = `
    <select class="${SELECT_CLASS}" id='select'>
        <option value="1">One</option>
        <option value="2" selected>Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
        <option value="9">Nine</option>
        <option value="10">Ten</option>
    </select>
`;


const FIXTURE_FILLED_SELECT_PRESELECTED_MULTIPLE = `
    <select class="${SELECT_CLASS}">
        <option value="1">One</option>
        <option value="2" selected>Two</option>
        <option value="3" selected>Three</option>
        <option value="4" selected>Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
        <option value="9">Nine</option>
        <option value="10">Ten</option>
    </select>
`;


const OPTIONS_WITH_SELECTED_VALUE = [
    {
        text: "option 1",
        value: "VAL1"
    }, {
        text: "option 2",
        value: "VAL2"
    }, {
        text: "option 3",
        value: "VAL3",
        selected: true
    }
];


describe('module', function () {
    it('should export a default', () => {
        expect(DualListbox).toBeTruthy();
    });

    it('should export a name', () => {
        expect(DualListbox2).toBeTruthy();
    });
});


describe('Duallistbox', function () {
    it('should be able to initialize an empty select', () => {
        fixture.set(FIXTURE_EMPTY_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        expect(dlb.available.length).toBe(0);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able to initialize an empty select with additional items', () => {
        fixture.set(FIXTURE_EMPTY_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`, {options: OPTIONS_WITH_SELECTED_VALUE});
        expect(dlb.available.length).toBe(2);
        expect(dlb.selected.length).toBe(1);
    });

    it('should be able to initialize a filled select', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able to initialize a filled select with preselected items', () => {
        fixture.set(FIXTURE_FILLED_SELECT_PRESELECTED);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);
    });

    it('should be able to initialize a filled select with additional items', () => {
        fixture.set(FIXTURE_FILLED_SELECT_PRESELECTED);
        let dlb = new DualListbox(`.${SELECT_CLASS}`, {options: OPTIONS_WITH_SELECTED_VALUE});
        expect(dlb.available.length).toBe(11);
        expect(dlb.selected.length).toBe(2);
    });

    it('should be able to initialize a filled select with id', () => {
        fixture.set(FIXTURE_FILLED_SELECT_WITH_ID);
        let dlb = new DualListbox(`#select`);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);
    });

    it('should be able to add a list item to selected', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        let listItem = document.querySelector('[data-id="1"]');
        dlb.addSelected(listItem);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);
    });

    it('should be able to add a list item to selected that is already selected', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        let listItem = document.querySelector('[data-id="1"]');
        dlb.addSelected(listItem);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);

        dlb.addSelected(listItem);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);
    });

    it('should be able to remove a list item from selected', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        let listItem = document.querySelector('[data-id="1"]');
        dlb.addSelected(listItem);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);

        dlb.removeSelected(listItem);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able to remove a list item from selected that is not selected', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        let listItem = document.querySelector('[data-id="1"]');
        dlb.removeSelected(listItem);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able to search the items', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let query = 'One';
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        dlb.searchLists(query, dlb.dualListbox);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
        for (let i = 0; i < dlb.available.length; i++) {
            let element = dlb.available[i];
            expect(element.style.display !== "none").toBe(element.innerHTML.toLowerCase().indexOf(query.toLowerCase()) >= 0);
        }
    });

    it('should be able to perform case insensitive search', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let query = 'tWO';
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        dlb.searchLists(query, dlb.dualListbox);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
        for (let i = 0; i < dlb.available.length; i++) {
            let element = dlb.available[i];
            expect(element.style.display !== "none").toBe(element.innerHTML.toLowerCase().indexOf(query.toLowerCase()) >= 0);
        }
    });

    it('should be able to search the items with no text', () => {
        fixture.set(FIXTURE_FILLED_SELECT);
        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        dlb.searchLists('', dlb.dualListbox);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able to hit the addEvent callback', () => {
        fixture.set(FIXTURE_FILLED_SELECT);

        function addCallback(value) {
            expect(value).toBe("1");
        }

        let dlb = new DualListbox(`.${SELECT_CLASS}`, {
            addEvent: addCallback
        });
        let listItem = document.querySelector('[data-id="1"]');
        dlb.addSelected(listItem);
    });

    it('should be able to hit the removeEvent callback', () => {
        fixture.set(FIXTURE_FILLED_SELECT_PRESELECTED);

        function addCallback(value) {
            expect(value).toBe("2");
        }

        let dlb = new DualListbox(`.${SELECT_CLASS}`, {
            removeEvent: addCallback
        });
        let listItem = document.querySelector('[data-id="2"]');
        dlb.removeSelected(listItem);
    });

    it('should be able to click on one of the elements', () => {
        fixture.set(FIXTURE_FILLED_SELECT);

        new DualListbox(`.${SELECT_CLASS}`);
        let listItem = document.querySelector('[data-id="2"]');
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        listItem.dispatchEvent(clickEvent);

        let selectedItem = document.querySelector('.dual-listbox__item--selected');
        expect(selectedItem).toBeTruthy();
    });

    it('should be able to click on one of the elements to remove the class', () => {
        fixture.set(FIXTURE_FILLED_SELECT);

        new DualListbox(`.${SELECT_CLASS}`);
        let listItem = document.querySelector('[data-id="2"]');
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        listItem.dispatchEvent(clickEvent);

        let selectedItem = document.querySelector('.dual-listbox__item--selected');
        expect(selectedItem).toBeTruthy();

        listItem.dispatchEvent(clickEvent);

        let selectedItem2 = document.querySelector('.dual-listbox__item--selected');
        expect(selectedItem2).toBeFalsy();
    });

    it('should be able to doubleclick on one of the elements to select', () => {
        fixture.set(FIXTURE_FILLED_SELECT);

        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);

        let listItem = document.querySelector('[data-id="2"]');
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('dblclick', true, true);
        listItem.dispatchEvent(clickEvent);

        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);
    });

    it('should be able to doubleclick on one of the elements to deselect', () => {
        fixture.set(FIXTURE_FILLED_SELECT_PRESELECTED);

        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);

        let listItem = document.querySelector('[data-id="2"]');
        let clickEvent  = document.createEvent('MouseEvents');
        clickEvent.initEvent('dblclick', true, true);
        listItem.dispatchEvent(clickEvent);

        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able fire search on change', () => {
        fixture.set(FIXTURE_FILLED_SELECT);

        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        let search = document.querySelector('.dual-listbox__search');
        let changeEvent = document.createEvent('MouseEvents');
        changeEvent.initEvent('change', true, true);
        search.dispatchEvent(changeEvent);

        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able fire search with the keyboard', () => {
        fixture.set(FIXTURE_FILLED_SELECT);

        let dlb = new DualListbox(`.${SELECT_CLASS}`);
        let search = document.querySelector('.dual-listbox__search');
        let keyupEvent = document.createEvent('MouseEvents');
        keyupEvent.initEvent('keyup', true, true);
        search.dispatchEvent(keyupEvent);

        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should be able to create object from DOM element', () => {
        let domParent = document.createElement("div");
        domParent.innerHTML = FIXTURE_FILLED_SELECT;
        let dlb = new DualListbox(domParent.getElementsByTagName('select')[0]);

        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should set the item to availeble.', () => {
        let domParent = document.createElement("div");
        domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;

        let dlb = new DualListbox(domParent.getElementsByTagName('select')[0]);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);

        dlb.selected[0].classList.add('dual-listbox__item--selected');
        let event = {};
        event.preventDefault = () => {};
        dlb._actionItemDeselected(event);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);
    });

    it('should set the item to selected.', () => {
        let domParent = document.createElement("div");
        domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;

        let dlb = new DualListbox(domParent.getElementsByTagName('select')[0]);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);

        dlb.available[0].classList.add('dual-listbox__item--selected');
        let event = {};
        event.preventDefault = () => {};
        dlb._actionItemSelected(event);
        expect(dlb.available.length).toBe(8);
        expect(dlb.selected.length).toBe(2);
    });

    it('should only set the searched results to selected.', () => {
        let domParent = document.createElement("div");
        domParent.innerHTML = FIXTURE_FILLED_SELECT;

        let dlb = new DualListbox(domParent.getElementsByTagName('select')[0]);
        expect(dlb.available.length).toBe(10);
        expect(dlb.selected.length).toBe(0);

        let event = {};
        event.preventDefault = () => {};
        dlb.searchLists('Four', dlb.dualListbox);
        dlb._actionAllSelected(event);
        expect(dlb.available.length).toBe(9);
        expect(dlb.selected.length).toBe(1);
    });

    it('should only set the searched results to available.', () => {
        let domParent = document.createElement("div");
        domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED_MULTIPLE;

        let dlb = new DualListbox(domParent.getElementsByTagName('select')[0]);
        expect(dlb.available.length).toBe(7);
        expect(dlb.selected.length).toBe(3);

        let event = {};
        event.preventDefault = () => {};
        dlb.searchLists('Four', dlb.dualListbox);
        dlb._actionAllDeselected(event);
        expect(dlb.available.length).toBe(8);
        expect(dlb.selected.length).toBe(2);
    });

    it('should be able to add the removed eventListener', (done) => {
        let domParent = document.createElement("div");
        domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED_MULTIPLE;

        let dlb = new DualListbox(domParent.getElementsByTagName('select')[0]);
        expect(dlb.available.length).toBe(7);
        expect(dlb.selected.length).toBe(3);

        dlb.addEventListener('removed', event => {
            expect(event.removedElement).toBeTruthy();
            expect(event.removedElement.textContent).toBe('Two');
            done();
        });

        dlb.selected[0].classList.add('dual-listbox__item--selected');
        let event = {};
        event.preventDefault = () => {};
        dlb._actionItemDeselected(event);
    });

    it('should be able to add the added eventListener', (done) => {
        let domParent = document.createElement("div");
        domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED_MULTIPLE;

        let dlb = new DualListbox(domParent.getElementsByTagName('select')[0]);
        expect(dlb.available.length).toBe(7);
        expect(dlb.selected.length).toBe(3);

        dlb.addEventListener('added', event => {
            expect(event.addedElement).toBeTruthy();
            expect(event.addedElement.outerHTML).toBe('<li class="dual-listbox__item dual-listbox__item--selected" data-id="1" draggable="true">One</li>');
            done();
        });

        dlb.available[0].classList.add('dual-listbox__item--selected');
        let event = {};
        event.preventDefault = () => {};
        dlb._actionItemSelected(event);
    });
});
