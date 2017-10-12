<a name="DualListbox"></a>

## DualListbox
Dual select interface allowing the user to select items from a list of provided options.

**Kind**: global class  

* [DualListbox](#DualListbox)
    * [.setDefaults()](#DualListbox+setDefaults)
    * [.addEventListener(eventName, callback)](#DualListbox+addEventListener)
    * [.addSelected(listItem)](#DualListbox+addSelected)
    * [.redraw()](#DualListbox+redraw)
    * [.removeSelected(listItem)](#DualListbox+removeSelected)
    * [.searchLists(searchString, dualListbox)](#DualListbox+searchLists)
    * [.updateAvailableListbox()](#DualListbox+updateAvailableListbox)
    * [.updateSelectedListbox()](#DualListbox+updateSelectedListbox)
    * [._actionAllSelected()](#DualListbox+_actionAllSelected)
    * [._updateListbox()](#DualListbox+_updateListbox)
    * [._actionItemSelected()](#DualListbox+_actionItemSelected)
    * [._actionAllDeselected()](#DualListbox+_actionAllDeselected)
    * [._actionItemDeselected()](#DualListbox+_actionItemDeselected)
    * [._actionItemDoubleClick()](#DualListbox+_actionItemDoubleClick)
    * [._actionItemClick()](#DualListbox+_actionItemClick)
    * [._addButtonActions()](#DualListbox+_addButtonActions)
    * [._addClickActions(listItem)](#DualListbox+_addClickActions)
    * [._createList()](#DualListbox+_createList)
    * [._createButtons()](#DualListbox+_createButtons)

<a name="DualListbox+setDefaults"></a>

### dualListbox.setDefaults()
Sets the default values that can be overwritten.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+addEventListener"></a>

### dualListbox.addEventListener(eventName, callback)
Add eventListener to the dualListbox element.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  

| Param | Type |
| --- | --- |
| eventName | <code>String</code> | 
| callback | <code>function</code> | 

<a name="DualListbox+addSelected"></a>

### dualListbox.addSelected(listItem)
Add the listItem to the selected list.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  

| Param | Type |
| --- | --- |
| listItem | <code>NodeElement</code> | 

<a name="DualListbox+redraw"></a>

### dualListbox.redraw()
Redraws the Dual listbox content

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+removeSelected"></a>

### dualListbox.removeSelected(listItem)
Removes the listItem from the selected list.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  

| Param | Type |
| --- | --- |
| listItem | <code>NodeElement</code> | 

<a name="DualListbox+searchLists"></a>

### dualListbox.searchLists(searchString, dualListbox)
Filters the listboxes with the given searchString.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  

| Param | Type |
| --- | --- |
| searchString | <code>Object</code> | 
| dualListbox |  | 

<a name="DualListbox+updateAvailableListbox"></a>

### dualListbox.updateAvailableListbox()
Update the elements in the available listbox;

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+updateSelectedListbox"></a>

### dualListbox.updateSelectedListbox()
Update the elements in the selected listbox;

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_actionAllSelected"></a>

### dualListbox._actionAllSelected()
Action to set all listItems to selected.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_updateListbox"></a>

### dualListbox._updateListbox()
Update the elements in the listbox;

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_actionItemSelected"></a>

### dualListbox._actionItemSelected()
Action to set one listItem to selected.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_actionAllDeselected"></a>

### dualListbox._actionAllDeselected()
Action to set all listItems to available.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_actionItemDeselected"></a>

### dualListbox._actionItemDeselected()
Action to set one listItem to available.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_actionItemDoubleClick"></a>

### dualListbox._actionItemDoubleClick()
Action when double clicked on a listItem.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_actionItemClick"></a>

### dualListbox._actionItemClick()
Action when single clicked on a listItem.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_addButtonActions"></a>

### dualListbox._addButtonActions()
Adds the actions to the buttons that are created.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_addClickActions"></a>

### dualListbox._addClickActions(listItem)
Adds the click items to the listItem.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  

| Param | Type |
| --- | --- |
| listItem | <code>Object</code> | 

<a name="DualListbox+_createList"></a>

### dualListbox._createList()
Creates list with the header.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
<a name="DualListbox+_createButtons"></a>

### dualListbox._createButtons()
Creates the buttons to add/remove the selected item.

**Kind**: instance method of <code>[DualListbox](#DualListbox)</code>  
