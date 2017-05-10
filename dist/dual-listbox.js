(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var CONTAINER_BLOCK='dual-listbox';var AVAILABLE_ELEMENT='dual-listbox__available';var SELECTED_ELEMENT='dual-listbox__selected';var ITEM_ELEMENT='dual-listbox__item';var SELECTED_MODIFIER='dual-listbox__item--selected';var DualListbox=function(){function DualListbox(selector){_classCallCheck(this,DualListbox);this.select=document.querySelector(selector);this.selected=[];this.available=[];this.splitSelectOptions(this.select);this.dualListbox=this.initDualListbox(this.select.parentNode);}_createClass(DualListbox,[{key:'addSelected',value:function addSelected(listItem){var index=this.available.indexOf(listItem);if(index>-1){this.available.splice(index,1);}this.selected.push(listItem);this.selectOption(listItem.dataset.id);this.redraw();}},{key:'removeSelected',value:function removeSelected(listItem){var index=this.selected.indexOf(listItem);if(index>-1){this.selected.splice(index,1);}this.available.push(listItem);this.deselectOption(listItem.dataset.id);this.redraw();}},{key:'selectOption',value:function selectOption(value){var options=this.select.options;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=options[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var option=_step.value;if(option.value===value){option.selected=true;}}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}},{key:'deselectOption',value:function deselectOption(value){var options=this.select.options;var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=options[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var option=_step2.value;if(option.value===value){option.selected=false;}}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}}},{key:'redraw',value:function redraw(){var that=this;var availebleList=this.createListbox(this.available,AVAILABLE_ELEMENT);var selectedList=this.createListbox(this.selected,SELECTED_ELEMENT);var buttons=this.createButtons();var search=document.createElement('input');search.onchange=function(){that.search(this.value);};search.onkeyup=function(){that.search(this.value);};this.dualListbox.innerHTML='';this.dualListbox.appendChild(search);this.dualListbox.appendChild(availebleList);this.dualListbox.appendChild(buttons);this.dualListbox.appendChild(selectedList);}},{key:'search',value:function search(searchString){var items=this.dualListbox.querySelectorAll('.'+ITEM_ELEMENT);items.forEach(function(item){if(searchString){if(!item.innerText.includes(searchString)){item.style.display='none';}else{item.style.display='block';}}else{item.style.display='block';}});}},{key:'initDualListbox',value:function initDualListbox(container){var dualListbox=document.createElement('div');dualListbox.classList.add(CONTAINER_BLOCK);container.insertBefore(dualListbox,this.select);this.select.style.display='none';this.redraw();return dualListbox;}},{key:'createListbox',value:function createListbox(optionList,className){var selectList=document.createElement('ul');selectList.classList.add(className);var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=optionList[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var listItem=_step3.value;selectList.appendChild(this.addClickActions(listItem));}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return();}}finally{if(_didIteratorError3){throw _iteratorError3;}}}return selectList;}},{key:'addClickActions',value:function addClickActions(listItem){var that=this;listItem.ondblclick=function(){if(that.selected.indexOf(this)>-1){that.removeSelected(listItem);}else{that.addSelected(listItem);}};listItem.onclick=function(){var items=that.dualListbox.querySelectorAll('.'+ITEM_ELEMENT);items.forEach(function(value){value.classList.remove(SELECTED_MODIFIER);});if(this.classList.contains(SELECTED_MODIFIER)){this.classList.remove(SELECTED_MODIFIER);}else{this.classList.add(SELECTED_MODIFIER);}};return listItem;}},{key:'createButtons',value:function createButtons(){var that=this;var buttons=document.createElement('div');var add_button=document.createElement('button');var remove_button=document.createElement('button');add_button.innerText='Add';add_button.onclick=function(){var selected=that.dualListbox.querySelector('.'+SELECTED_MODIFIER);if(selected){that.addSelected(selected);}};remove_button.innerText='remove';remove_button.onclick=function(){var selected=that.dualListbox.querySelector('.'+SELECTED_MODIFIER);if(selected){that.removeSelected(selected);}};buttons.appendChild(add_button);buttons.appendChild(remove_button);return buttons;}},{key:'splitSelectOptions',value:function splitSelectOptions(select){var options=select.options;var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=options[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var option=_step4.value;var listItem=this.createListItem(option);if(option.attributes.selected){this.selected.push(listItem);}else{this.available.push(listItem);}}}catch(err){_didIteratorError4=true;_iteratorError4=err;}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return();}}finally{if(_didIteratorError4){throw _iteratorError4;}}}}},{key:'createListItem',value:function createListItem(option){var listItem=document.createElement('li');listItem.classList.add(ITEM_ELEMENT);listItem.innerText=option.innerText;listItem.dataset.id=option.value;return listItem;}}]);return DualListbox;}();exports.default=DualListbox;exports.DualListbox=DualListbox;

/***/ }
/******/ ])
});
;