/**
 * @jest-environment jsdom
 */
import { test, expect } from "vitest";
import DualListbox, {
    DualListbox as DualListbox2,
} from "../src/dual-listbox.js";

const SELECT_CLASS = "select";

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
        value: "VAL1",
    },
    {
        text: "option 2",
        value: "VAL2",
    },
    {
        text: "option 3",
        value: "VAL3",
        selected: true,
    },
];

test("should export a default", () => {
    expect(DualListbox).toBeTruthy();
});

test("should export a name", () => {
    expect(DualListbox2).toBeTruthy();
});

test("should be able to initialize an empty select", () => {
    document.body.innerHTML = FIXTURE_EMPTY_SELECT;
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    expect(dlb.options.length).toBe(0);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able to initialize an empty select with additional items", () => {
    document.body.innerHTML = FIXTURE_EMPTY_SELECT;
    let dlb = new DualListbox(`.${SELECT_CLASS}`, {
        options: OPTIONS_WITH_SELECTED_VALUE,
    });
    expect(dlb.options.length).toBe(3);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);
});

test("should be able to initialize a filled select", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able to initialize a filled select with preselected items", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);
});

test("should be able to initialize a filled select with additional items", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;
    let dlb = new DualListbox(`.${SELECT_CLASS}`, {
        options: OPTIONS_WITH_SELECTED_VALUE,
    });
    expect(dlb.options.length).toBe(3);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);
});

test("should be able to initialize a filled select with id", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT_WITH_ID;
    let dlb = new DualListbox(`#select`);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);
});

test("should be able to add a list item to selected", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    let listItem = document.querySelector('[data-id="1"]');
    dlb.changeSelected(listItem);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);
});

test("should be able to remove a list item from selected", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    let listItem = document.querySelector('[data-id="1"]');
    dlb.changeSelected(listItem);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);

    dlb.changeSelected(listItem);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able to remove a list item from selected that is not selected", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    let listItem = document.querySelector('[data-id="1"]');
    dlb.changeSelected(listItem);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);
});

test("should be able to search the items", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let query = "One";
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    dlb.searchLists(query, dlb.dualListbox);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
    [...dlb.availableList.querySelectorAll(".dual-listbox__item")].forEach(
        (element) => {
            expect(element.style.display !== "none").toBe(
                element.innerHTML.toLowerCase().indexOf(query.toLowerCase()) >=
                    0
            );
        }
    );
});

test("should be able to perform case insensitive search", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let query = "tWO";
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    dlb.searchLists(query, dlb.dualListbox);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
    [...dlb.availableList.querySelectorAll(".dual-listbox__item")].forEach(
        (element) => {
            expect(element.style.display !== "none").toBe(
                element.innerHTML.toLowerCase().indexOf(query.toLowerCase()) >=
                    0
            );
        }
    );
});

test("should be able to search the items with no text", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    dlb.searchLists("", dlb.dualListbox);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able to hit the addEvent callback", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;

    function addCallback(value) {
        expect(value).toBe("1");
    }

    let dlb = new DualListbox(`.${SELECT_CLASS}`, {
        addEvent: addCallback,
    });
    let listItem = document.querySelector('[data-id="1"]');
    dlb.changeSelected(listItem);
});

test("should be able to hit the removeEvent callback", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;

    function addCallback(value) {
        expect(value).toBe("2");
    }

    let dlb = new DualListbox(`.${SELECT_CLASS}`, {
        removeEvent: addCallback,
    });
    let listItem = document.querySelector('[data-id="2"]');
    dlb.changeSelected(listItem);
});

test("should be able to click on one of the elements", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;

    new DualListbox(`.${SELECT_CLASS}`);
    let listItem = document.querySelector('[data-id="2"]');
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    listItem.dispatchEvent(clickEvent);

    let selectedItem = document.querySelector(".dual-listbox__item--selected");
    expect(selectedItem).toBeTruthy();
});

test("should be able to click on one of the elements to remove the class", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;

    new DualListbox(`.${SELECT_CLASS}`);
    let listItem = document.querySelector('[data-id="2"]');
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    listItem.dispatchEvent(clickEvent);

    let selectedItem = document.querySelector(".dual-listbox__item--selected");
    expect(selectedItem).toBeTruthy();

    listItem.dispatchEvent(clickEvent);

    let selectedItem2 = document.querySelector(".dual-listbox__item--selected");
    expect(selectedItem2).toBeFalsy();
});

test("should be able to doubleclick on one of the elements to select", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;

    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);

    let listItem = document.querySelector('[data-id="2"]');
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("dblclick", true, true);
    listItem.dispatchEvent(clickEvent);

    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);
});

test("should be able to doubleclick on one of the elements to deselect", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;

    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);

    let listItem = document.querySelector('[data-id="2"]');
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("dblclick", true, true);
    listItem.dispatchEvent(clickEvent);

    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able fire search on change", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;

    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    let search = document.querySelector(".dual-listbox__search");
    let changeEvent = document.createEvent("MouseEvents");
    changeEvent.initEvent("change", true, true);
    search.dispatchEvent(changeEvent);

    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able fire search with the keyboard", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;

    let dlb = new DualListbox(`.${SELECT_CLASS}`);
    let search = document.querySelector(".dual-listbox__search");
    let keyupEvent = document.createEvent("MouseEvents");
    keyupEvent.initEvent("keyup", true, true);
    search.dispatchEvent(keyupEvent);

    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able to create object from DOM element", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;
    let dlb = new DualListbox(document.body.getElementsByTagName("select")[0]);

    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should set the item to availeble.", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;

    let dlb = new DualListbox(document.body.getElementsByTagName("select")[0]);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);

    dlb.selectedList
        .querySelector(".dual-listbox__item")
        .classList.add("dual-listbox__item--selected");
    let event = {};
    event.preventDefault = () => {};
    dlb.actionItemDeselected(event);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should set the item to selected.", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED;

    let dlb = new DualListbox(document.body.getElementsByTagName("select")[0]);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(1);

    dlb.availableList
        .querySelector(".dual-listbox__item")
        .classList.add("dual-listbox__item--selected");
    let event = {};
    event.preventDefault = () => {};
    dlb.actionItemSelected(event);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(2);
});

test("should only set the searched results to selected.", () => {
    document.body.innerHTML = FIXTURE_FILLED_SELECT;

    let dlb = new DualListbox(document.body.getElementsByTagName("select")[0]);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);

    let event = {};
    event.preventDefault = () => {};
    dlb.searchLists("Four", dlb.dualListbox);
    dlb.actionAllSelected(event);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(10);
});

test("should only set the searched results to available.", () => {
    let domParent = document.createElement("div");
    domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED_MULTIPLE;

    let dlb = new DualListbox(domParent.getElementsByTagName("select")[0]);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(3);

    let event = {};
    event.preventDefault = () => {};
    dlb.searchLists("Four", dlb.dualListbox);
    dlb.actionAllDeselected(event);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(0);
});

test("should be able to add the removed eventListener", (done) => {
    let domParent = document.createElement("div");
    domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED_MULTIPLE;

    let dlb = new DualListbox(domParent.getElementsByTagName("select")[0]);
    expect(dlb.options.length).toBe(10);
    expect(dlb.options.filter((option) => option.selected).length).toBe(3);

    dlb.addEventListener("removed", (event) => {
        expect(event.removedElement).toBeTruthy();
        expect(event.removedElement.textContent).toBe("Two");
        done();
    });

    let listItem = document.querySelector('[data-id="2"]');
    dlb.changeSelected(listItem);
});

// test("should be able to add the added eventListener", (done) => {
//     let domParent = document.createElement("div");
//     domParent.innerHTML = FIXTURE_FILLED_SELECT_PRESELECTED_MULTIPLE;

//     let dlb = new DualListbox(domParent.getElementsByTagName("select")[0]);
//     expect(dlb.options.length).toBe(10);
//     expect(dlb.options.filter((option) => option.selected).length).toBe(3);

//     dlb.addEventListener("added", (event) => {
//         expect(event.addedElement).toBeTruthy();
//         expect(event.addedElement.outerHTML).toBe(
//             '<li class="dual-listbox__item dual-listbox__item--selected" data-id="1">One</li>'
//         );
//         done();
//     });

//     let listItem = document.querySelector('[data-id="1"]');
//     dlb.changeSelected(listItem);
// });
