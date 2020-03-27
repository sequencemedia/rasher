"use strict";require("core-js/modules/es.symbol");require("core-js/modules/es.symbol.description");require("core-js/modules/es.symbol.iterator");require("core-js/modules/es.array.iterator");require("core-js/modules/es.array.map");require("core-js/modules/es.object.get-prototype-of");require("core-js/modules/es.object.set-prototype-of");require("core-js/modules/es.object.to-string");require("core-js/modules/es.reflect.construct");require("core-js/modules/es.regexp.to-string");require("core-js/modules/es.string.iterator");require("core-js/modules/web.dom-collections.iterator");Object.defineProperty(exports,"__esModule",{value:true});exports.TouchEventFacade=exports.KeyboardEventFacade=exports.MouseEventFacade=exports.FocusEventFacade=exports.ChangeEventFacade=void 0;function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _createSuper(Derived){return function(){var Super=_getPrototypeOf(Derived),result;if(_isNativeReflectConstruct()){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var keyMap={25:9,// SHIFT-TAB
63232:38,// u
63233:40,// d
63234:37,// l
63235:39,// r
63272:46,// DEL
63273:36,// home
63275:35,// END
63276:33,// page u
63277:34// page d
};function initialize(event,currentTarget){this.target=event.target||event.srcElement;this.originalEvent=event;this.currentTarget=currentTarget||null;this.relatedTarget=event.relatedTarget||null;}function ingestEvent(facadeMap,event,eventFacade){var key;for(key in facadeMap){if(key in event){var KEY=facadeMap[key];eventFacade[KEY]=event[key];}}}var EventFacade=/*#__PURE__*/function(){function EventFacade(){_classCallCheck(this,EventFacade);}_createClass(EventFacade,[{key:"stopPropagation",value:function stopPropagation(){this.originalEvent.stopPropagation();}},{key:"preventDefault",value:function preventDefault(){this.originalEvent.preventDefault();}},{key:"stop",value:function stop(){var originalEvent=this.originalEvent;originalEvent.stopPropagation();originalEvent.preventDefault();}}]);return EventFacade;}();var ChangeEventFacade=/*#__PURE__*/function(_EventFacade){_inherits(ChangeEventFacade,_EventFacade);var _super=_createSuper(ChangeEventFacade);function ChangeEventFacade(event,currentTarget){var _this;_classCallCheck(this,ChangeEventFacade);initialize.call(_this=_super.call(this),event,currentTarget);return _this;}return ChangeEventFacade;}(EventFacade);exports.ChangeEventFacade=ChangeEventFacade;var FocusEventFacade=/*#__PURE__*/function(_EventFacade2){_inherits(FocusEventFacade,_EventFacade2);var _super2=_createSuper(FocusEventFacade);function FocusEventFacade(event,currentTarget){var _this2;_classCallCheck(this,FocusEventFacade);initialize.call(_this2=_super2.call(this),event,currentTarget);return _this2;}return FocusEventFacade;}(EventFacade);exports.FocusEventFacade=FocusEventFacade;var MouseEventFacade=/*#__PURE__*/function(_EventFacade3){_inherits(MouseEventFacade,_EventFacade3);var _super3=_createSuper(MouseEventFacade);function MouseEventFacade(event,currentTarget){var _this3;_classCallCheck(this,MouseEventFacade);initialize.call(_this3=_super3.call(this),event,currentTarget);var key;if(typeof((key=event.keyCode||event.charCode)in keyMap?keyMap[key]:key)==='number'){_this3.key=key;}ingestEvent(MouseEventFacade.map,event,_assertThisInitialized(_this3));return _this3;}return MouseEventFacade;}(EventFacade);exports.MouseEventFacade=MouseEventFacade;_defineProperty(MouseEventFacade,"map",{ctrlKey:'ctrl',altKey:'alt',metaKey:'meta',shiftKey:'shift',altGraphKey:'altGraph',clientX:'clientX',clientY:'clientY',pageX:'pageX',pageY:'pageY'});var KeyboardEventFacade=/*#__PURE__*/function(_EventFacade4){_inherits(KeyboardEventFacade,_EventFacade4);var _super4=_createSuper(KeyboardEventFacade);function KeyboardEventFacade(event,currentTarget){var _this4;_classCallCheck(this,KeyboardEventFacade);initialize.call(_this4=_super4.call(this),event,currentTarget);var key;if(((key=event.keyCode||event.charCode)in keyMap?keyMap[key]:key)==='number'){_this4.key=key;}ingestEvent(KeyboardEventFacade.map,event,_assertThisInitialized(_this4));return _this4;}return KeyboardEventFacade;}(EventFacade);exports.KeyboardEventFacade=KeyboardEventFacade;_defineProperty(KeyboardEventFacade,"map",{ctrlKey:'ctrl',altKey:'alt',metaKey:'meta',shiftKey:'shiftKey',altGraphKey:'altGraph'});var TouchEventFacade=/*#__PURE__*/function(_EventFacade5){_inherits(TouchEventFacade,_EventFacade5);var _super5=_createSuper(TouchEventFacade);// eslint-disable-line
function TouchEventFacade(event,currentTarget){var _this5;_classCallCheck(this,TouchEventFacade);initialize.call(_this5=_super5.call(this),event,currentTarget);return _this5;}return TouchEventFacade;}(EventFacade);exports.TouchEventFacade=TouchEventFacade;