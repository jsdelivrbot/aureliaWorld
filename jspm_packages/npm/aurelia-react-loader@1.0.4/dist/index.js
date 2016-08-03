/* */ 
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.configure = configure;

var _aureliaTemplating = require('aurelia-templating');

var _aureliaMetadata = require('aurelia-metadata');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash.kebabcase');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function configure(_ref) {
	var aurelia = _ref.aurelia;

	var loader = aurelia.loader;
	loader.addPlugin('react-component', {
		fetch: function fetch(address) {
			return loader.loadModule(address).then(getReactCustomElements);
		}
	});
}

function getReactCustomElements(module) {
	var elements = {};

	for (var name in module) {
		if (module.hasOwnProperty(name)) {
			var component = module[name];
			if (typeof component === 'function') {
				var elementName = (0, _lodash2.default)(name);
				elements[elementName] = createReactElement(component, elementName);
			}
		}
	}

	return elements;
}

function createReactElement(component, name) {
	return (0, _aureliaMetadata.decorators)((0, _aureliaTemplating.noView)(), (0, _aureliaTemplating.customElement)(name), (0, _aureliaTemplating.bindable)({
		name: 'props',
		attribute: 'props',
		changeHandler: 'propsChanged',
		defaultBindingMode: 1
	})).on(createCustomElementClass(component));
}

function createCustomElementClass(component) {
	return function () {
		_createClass(ReactComponent, null, [{
			key: 'inject',
			value: function inject() {
				return [Element];
			}
		}]);

		function ReactComponent(element) {
			_classCallCheck(this, ReactComponent);

			this.element = element;
			this.component = null;
		}

		_createClass(ReactComponent, [{
			key: 'propsChanged',
			value: function propsChanged() {
				this.render();
			}
		}, {
			key: 'bind',
			value: function bind() {
				this.render();
			}
		}, {
			key: 'unbind',
			value: function unbind() {
				_reactDom2.default.unmountComponentAtNode(this.element);
				this.component = null;
			}
		}, {
			key: 'render',
			value: function render() {
				this.component = _reactDom2.default.render(_react2.default.createElement(component, this.props), this.element);
			}
		}]);

		return ReactComponent;
	}();
}