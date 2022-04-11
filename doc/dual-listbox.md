<a name="module_dual-listbox"></a>

## dual-listbox
Formset module
Contains logic for generating django formsets


* [dual-listbox](#module_dual-listbox)
    * [~DualListbox](#module_dual-listbox..DualListbox)
        * [.setDefaults()](#module_dual-listbox..DualListbox+setDefaults)
        * [.addEventListener(eventName, callback)](#module_dual-listbox..DualListbox+addEventListener)
        * [.addSelected(listItem)](#module_dual-listbox..DualListbox+addSelected)
        * [.redraw()](#module_dual-listbox..DualListbox+redraw)
        * [.removeSelected(listItem)](#module_dual-listbox..DualListbox+removeSelected)
        * [.searchLists(searchString, dualListbox)](#module_dual-listbox..DualListbox+searchLists)
        * [.updateAvailableListbox()](#module_dual-listbox..DualListbox+updateAvailableListbox)
        * [.updateSelectedListbox()](#module_dual-listbox..DualListbox+updateSelectedListbox)
        * [._actionAllSelected()](#module_dual-listbox..DualListbox+_actionAllSelected)
        * [._updateListbox()](#module_dual-listbox..DualListbox+_updateListbox)
        * [._actionItemSelected()](#module_dual-listbox..DualListbox+_actionItemSelected)
        * [._actionAllDeselected()](#module_dual-listbox..DualListbox+_actionAllDeselected)
        * [._actionItemDeselected()](#module_dual-listbox..DualListbox+_actionItemDeselected)
        * [._actionItemDoubleClick()](#module_dual-listbox..DualListbox+_actionItemDoubleClick)
        * [._actionItemClick()](#module_dual-listbox..DualListbox+_actionItemClick)
        * [._addButtonActions()](#module_dual-listbox..DualListbox+_addButtonActions)
        * [._addClickActions(listItem)](#module_dual-listbox..DualListbox+_addClickActions)
        * [._createList()](#module_dual-listbox..DualListbox+_createList)
        * [._createButtons()](#module_dual-listbox..DualListbox+_createButtons)

<a name="module_dual-listbox..DualListbox"></a>

### dual-listbox~DualListbox
Dual select interface allowing the user to select items from a list of provided options.

**Kind**: inner class of [<code>dual-listbox</code>](#module_dual-listbox)  

* [~DualListbox](#module_dual-listbox..DualListbox)
    * [.setDefaults()](#module_dual-listbox..DualListbox+setDefaults)
    * [.addEventListener(eventName, callback)](#module_dual-listbox..DualListbox+addEventListener)
    * [.addSelected(listItem)](#module_dual-listbox..DualListbox+addSelected)
    * [.redraw()](#module_dual-listbox..DualListbox+redraw)
    * [.removeSelected(listItem)](#module_dual-listbox..DualListbox+removeSelected)
    * [.searchLists(searchString, dualListbox)](#module_dual-listbox..DualListbox+searchLists)
    * [.updateAvailableListbox()](#module_dual-listbox..DualListbox+updateAvailableListbox)
    * [.updateSelectedListbox()](#module_dual-listbox..DualListbox+updateSelectedListbox)
    * [._actionAllSelected()](#module_dual-listbox..DualListbox+_actionAllSelected)
    * [._updateListbox()](#module_dual-listbox..DualListbox+_updateListbox)
    * [._actionItemSelected()](#module_dual-listbox..DualListbox+_actionItemSelected)
    * [._actionAllDeselected()](#module_dual-listbox..DualListbox+_actionAllDeselected)
    * [._actionItemDeselected()](#module_dual-listbox..DualListbox+_actionItemDeselected)
    * [._actionItemDoubleClick()](#module_dual-listbox..DualListbox+_actionItemDoubleClick)
    * [._actionItemClick()](#module_dual-listbox..DualListbox+_actionItemClick)
    * [._addButtonActions()](#module_dual-listbox..DualListbox+_addButtonActions)
    * [._addClickActions(listItem)](#module_dual-listbox..DualListbox+_addClickActions)
    * [._createList()](#module_dual-listbox..DualListbox+_createList)
    * [._createButtons()](#module_dual-listbox..DualListbox+_createButtons)

<a name="module_dual-listbox..DualListbox+setDefaults"></a>

#### dualListbox.setDefaults()
Sets the default values that can be overwritten.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+addEventListener"></a>

#### dualListbox.addEventListener(eventName, callback)
Add eventListener to the dualListbox element.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  

| Param | Type |
| --- | --- |
| eventName | <code>String</code> | 
| callback | <code>function</code> | 

<a name="module_dual-listbox..DualListbox+addSelected"></a>

#### dualListbox.addSelected(listItem)
Add the listItem to the selected list.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  

| Param | Type |
| --- | --- |
| listItem | <code>NodeElement</code> | 

<a name="module_dual-listbox..DualListbox+redraw"></a>

#### dualListbox.redraw()
Redraws the Dual listbox content

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+removeSelected"></a>

#### dualListbox.removeSelected(listItem)
Removes the listItem from the selected list.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  

| Param | Type |
| --- | --- |
| listItem | <code>NodeElement</code> | 

<a name="module_dual-listbox..DualListbox+searchLists"></a>

#### dualListbox.searchLists(searchString, dualListbox)
Filters the listboxes with the given searchString.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  

| Param | Type |
| --- | --- |
| searchString | <code>Object</code> | 
| dualListbox |  | 

<a name="module_dual-listbox..DualListbox+updateAvailableListbox"></a>

#### dualListbox.updateAvailableListbox()
Update the elements in the available listbox;

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+updateSelectedListbox"></a>

#### dualListbox.updateSelectedListbox()
Update the elements in the selected listbox;

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_actionAllSelected"></a>

#### dualListbox.\_actionAllSelected()
Action to set all listItems to selected.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_updateListbox"></a>

#### dualListbox.\_updateListbox()
Update the elements in the listbox;

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_actionItemSelected"></a>

#### dualListbox.\_actionItemSelected()
Action to set one listItem to selected.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_actionAllDeselected"></a>

#### dualListbox.\_actionAllDeselected()
Action to set all listItems to available.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_actionItemDeselected"></a>

#### dualListbox.\_actionItemDeselected()
Action to set one listItem to available.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_actionItemDoubleClick"></a>

#### dualListbox.\_actionItemDoubleClick()
Action when double clicked on a listItem.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_actionItemClick"></a>

#### dualListbox.\_actionItemClick()
Action when single clicked on a listItem.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_addButtonActions"></a>

#### dualListbox.\_addButtonActions()
Adds the actions to the buttons that are created.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_addClickActions"></a>

#### dualListbox.\_addClickActions(listItem)
Adds the click items to the listItem.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  

| Param | Type |
| --- | --- |
| listItem | <code>Object</code> | 

<a name="module_dual-listbox..DualListbox+_createList"></a>

#### dualListbox.\_createList()
Creates list with the header.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
<a name="module_dual-listbox..DualListbox+_createButtons"></a>

#### dualListbox.\_createButtons()
Creates the buttons to add/remove the selected item.

**Kind**: instance method of [<code>DualListbox</code>](#module_dual-listbox..DualListbox)  
