exports.ids = [14];
exports.modules = Array(60).concat([
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (options) {
  var mappedProps = options.mappedProps,
      name = options.name,
      ctr = options.ctr,
      ctrArgs = options.ctrArgs,
      events = options.events,
      beforeCreate = options.beforeCreate,
      afterCreate = options.afterCreate,
      props = options.props,
      rest = _objectWithoutProperties(options, ['mappedProps', 'name', 'ctr', 'ctrArgs', 'events', 'beforeCreate', 'afterCreate', 'props']);

  var promiseName = '$' + name + 'Promise';
  var instanceName = '$' + name + 'Object';

  assert(!(rest.props instanceof Array), '`props` should be an object, not Array');

  return _extends({}, typeof GENERATE_DOC !== 'undefined' ? { $vgmOptions: options } : {}, {
    mixins: [_mapElementMixin2.default],
    props: _extends({}, props, mappedPropsToVueProps(mappedProps)),
    render: function render() {
      return '';
    },
    provide: function provide() {
      var _this = this;

      var promise = this.$mapPromise.then(function (map) {
        // Infowindow needs this to be immediately available
        _this.$map = map;

        // Initialize the maps with the given options
        var options = _extends({}, _this.options, {
          map: map
        }, (0, _bindProps.getPropsValues)(_this, mappedProps));
        delete options.options; // delete the extra options

        if (beforeCreate) {
          var result = beforeCreate.bind(_this)(options);

          if (result instanceof Promise) {
            return result.then(function () {
              return { options: options };
            });
          }
        }
        return { options: options };
      }).then(function (_ref) {
        var _Function$prototype$b;

        var options = _ref.options;

        var ConstructorObject = ctr();
        // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
        _this[instanceName] = ctrArgs ? new ((_Function$prototype$b = Function.prototype.bind).call.apply(_Function$prototype$b, [ConstructorObject, null].concat(_toConsumableArray(ctrArgs(options, (0, _bindProps.getPropsValues)(_this, props || {}))))))() : new ConstructorObject(options);

        (0, _bindProps.bindProps)(_this, _this[instanceName], mappedProps);
        (0, _bindEvents2.default)(_this, _this[instanceName], events);

        if (afterCreate) {
          afterCreate.bind(_this)(_this[instanceName]);
        }
        return _this[instanceName];
      });
      this[promiseName] = promise;
      return _defineProperty({}, promiseName, promise);
    },
    destroyed: function destroyed() {
      // Note: not all Google Maps components support maps
      if (this[instanceName] && this[instanceName].setMap) {
        this[instanceName].setMap(null);
      }
    }
  }, rest);
};

exports.mappedPropsToVueProps = mappedPropsToVueProps;

var _bindEvents = __webpack_require__(65);

var _bindEvents2 = _interopRequireDefault(_bindEvents);

var _bindProps = __webpack_require__(62);

var _mapElementMixin = __webpack_require__(70);

var _mapElementMixin2 = _interopRequireDefault(_mapElementMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 *
 * @param {Object} options
 * @param {Object} options.mappedProps - Definitions of props
 * @param {Object} options.mappedProps.PROP.type - Value type
 * @param {Boolean} options.mappedProps.PROP.twoWay
 *  - Whether the prop has a corresponding PROP_changed
 *   event
 * @param {Boolean} options.mappedProps.PROP.noBind
 *  - If true, do not apply the default bindProps / bindEvents.
 * However it will still be added to the list of component props
 * @param {Object} options.props - Regular Vue-style props.
 *  Note: must be in the Object form because it will be
 *  merged with the `mappedProps`
 *
 * @param {Object} options.events - Google Maps API events
 *  that are not bound to a corresponding prop
 * @param {String} options.name - e.g. `polyline`
 * @param {=> String} options.ctr - constructor, e.g.
 *  `google.maps.Polyline`. However, since this is not
 *  generally available during library load, this becomes
 *  a function instead, e.g. () => google.maps.Polyline
 *  which will be called only after the API has been loaded
 * @param {(MappedProps, OtherVueProps) => Array} options.ctrArgs -
 *   If the constructor in `ctr` needs to be called with
 *   arguments other than a single `options` object, e.g. for
 *   GroundOverlay, we call `new GroundOverlay(url, bounds, options)`
 *   then pass in a function that returns the argument list as an array
 *
 * Otherwise, the constructor will be called with an `options` object,
 *   with property and values merged from:
 *
 *   1. the `options` property, if any
 *   2. a `map` property with the Google Maps
 *   3. all the properties passed to the component in `mappedProps`
 * @param {Object => Any} options.beforeCreate -
 *  Hook to modify the options passed to the initializer
 * @param {(options.ctr, Object) => Any} options.afterCreate -
 *  Hook called when
 *
 */


function assert(v, message) {
  if (!v) throw new Error(message);
}

/**
 * Strips out the extraneous properties we have in our
 * props definitions
 * @param {Object} props
 */
function mappedPropsToVueProps(mappedProps) {
  return Object.entries(mappedProps).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        prop = _ref4[1];

    var value = {};

    if ('type' in prop) value.type = prop.type;
    if ('default' in prop) value.default = prop.default;
    if ('required' in prop) value.required = prop.required;

    return [key, value];
  }).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        val = _ref6[1];

    acc[key] = val;
    return acc;
  }, {});
}

/***/ }),
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropsValues = getPropsValues;
exports.bindProps = bindProps;

var _WatchPrimitiveProperties = __webpack_require__(66);

var _WatchPrimitiveProperties2 = _interopRequireDefault(_WatchPrimitiveProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPropsValues(vueInst, props) {
  return Object.keys(props).reduce(function (acc, prop) {
    if (vueInst[prop] !== undefined) {
      acc[prop] = vueInst[prop];
    }
    return acc;
  }, {});
}

/**
  * Binds the properties defined in props to the google maps instance.
  * If the prop is an Object type, and we wish to track the properties
  * of the object (e.g. the lat and lng of a LatLng), then we do a deep
  * watch. For deep watch, we also prevent the _changed event from being
  * emitted if the data source was external.
  */
function bindProps(vueInst, googleMapsInst, props) {
  var _loop = function (attribute) {
    var _props$attribute = props[attribute],
        twoWay = _props$attribute.twoWay,
        type = _props$attribute.type,
        trackProperties = _props$attribute.trackProperties,
        noBind = _props$attribute.noBind;


    if (noBind) return 'continue';

    var setMethodName = 'set' + capitalizeFirstLetter(attribute);
    var getMethodName = 'get' + capitalizeFirstLetter(attribute);
    var eventName = attribute.toLowerCase() + '_changed';
    var initialValue = vueInst[attribute];

    if (typeof googleMapsInst[setMethodName] === 'undefined') {
      throw new Error(setMethodName + ' is not a method of (the Maps object corresponding to) ' + vueInst.$options._componentTag);
    }

    // We need to avoid an endless
    // propChanged -> event emitted -> propChanged -> event emitted loop
    // although this may really be the user's responsibility
    if (type !== Object || !trackProperties) {
      // Track the object deeply
      vueInst.$watch(attribute, function () {
        var attributeValue = vueInst[attribute];

        googleMapsInst[setMethodName](attributeValue);
      }, {
        immediate: typeof initialValue !== 'undefined',
        deep: type === Object
      });
    } else {
      (0, _WatchPrimitiveProperties2.default)(vueInst, trackProperties.map(function (prop) {
        return attribute + '.' + prop;
      }), function () {
        googleMapsInst[setMethodName](vueInst[attribute]);
      }, vueInst[attribute] !== undefined);
    }

    if (twoWay && (vueInst.$gmapOptions.autobindAllEvents || vueInst.$listeners[eventName])) {
      googleMapsInst.addListener(eventName, function () {
        // eslint-disable-line no-unused-vars
        vueInst.$emit(eventName, googleMapsInst[getMethodName]());
      });
    }
  };

  for (var attribute in props) {
    var _ret = _loop(attribute);

    if (_ret === 'continue') continue;
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"el-carousel__item": "x84UeskRpRX4nd27W9+XkA==",
	"el-carousel__mask": "IuHn0Pf1OgBGJD80eqn50Q==",
	"is-active": "_5ZbyOVEKO7HIxgtF8xdM8Q==",
	"el-carousel__item--card": "WQG45m4wCN43ABgWDnjHDg==",
	"is-animating": "Hn1x8PCnuif-U66Y-5XaKQ==",
	"is-in-stage": "v9eM56xG3YMN47pdqE4gKQ==",
	"is-hover": "u1hDqqQIxFUcCC9q7iMJyQ=="
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"el-carousel": "y7pKmAIM++1UuhycBo+A0w==",
	"el-carousel--horizontal": "H2Etx77PkACNTGFdxiGzwg==",
	"el-carousel--vertical": "_4X17rDCOo9njYfqKF+nUXw==",
	"el-carousel__container": "wVgRDImsdwpg93RucIcTzA==",
	"el-carousel__arrow": "AuP-W8OHht8iDWPu01zYww==",
	"el-carousel__arrow--left": "gwSwXw8QPS2Cd4FWJkxxYg==",
	"el-carousel__arrow--right": "a2UWh8zX12CTi0a1iEdufw==",
	"el-carousel__indicators": "UNL+OpvwO16TQQ8i-fxvAA==",
	"el-carousel__indicators--horizontal": "pXc5OSQGxZcMa5aULNkwhQ==",
	"el-carousel__indicators--vertical": "_9lM35zy+eD1OwAbqT4BaYw==",
	"el-carousel__indicators--outside": "_7cUQOv7se1bmVZYiZZSlQg==",
	"el-carousel__indicator": "cimQNsOTez16ekNAarnE5Q==",
	"el-carousel__indicators--labels": "HTxCL0aMhF2PzZDoC2nioA==",
	"el-carousel__button": "g1p0wgQdFfuuWk-h24ZrMA==",
	"el-carousel__indicator--horizontal": "F3iSuvfXG+K7PdEuUuHNCg==",
	"el-carousel__indicator--vertical": "_7ZU9fkXOYYomre+b3s1Zhw==",
	"is-active": "dJ1PH8v5D5REyAttefqi8A==",
	"carousel-arrow-left-enter": "JA8toe8FbmNDQ9OWbCDcpA==",
	"carousel-arrow-left-leave-active": "pilzh2m-6oxg6vY50AnYJA==",
	"carousel-arrow-right-enter": "Ee3v54B1WItZOXJouIguWQ==",
	"carousel-arrow-right-leave-active": "_7bTCSS3chc+Syf-TN4ehUw=="
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vueInst, googleMapsInst, events) {
  var _loop = function (eventName) {
    if (vueInst.$gmapOptions.autobindAllEvents || vueInst.$listeners[eventName]) {
      googleMapsInst.addListener(eventName, function (ev) {
        vueInst.$emit(eventName, ev);
      });
    }
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var eventName = _step.value;

      _loop(eventName);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WatchPrimitiveProperties;
/**
 * Watch the individual properties of a PoD object, instead of the object
 * per se. This is different from a deep watch where both the reference
 * and the individual values are watched.
 *
 * In effect, it throttles the multiple $watch to execute at most once per tick.
 */
function WatchPrimitiveProperties(vueInst, propertiesToTrack, handler) {
  var immediate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var isHandled = false;

  function requestHandle() {
    if (!isHandled) {
      isHandled = true;
      vueInst.$nextTick(function () {
        isHandled = false;
        handler();
      });
    }
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = propertiesToTrack[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var prop = _step.value;

      vueInst.$watch(prop, requestHandle, { immediate: immediate });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
Mixin for objects that are mounted by Google Maps
Javascript API.

These are objects that are sensitive to element resize
operations so it exposes a property which accepts a bus

*/

exports.default = {
  props: ['resizeBus'],

  data: function data() {
    return {
      _actualResizeBus: null
    };
  },
  created: function created() {
    if (typeof this.resizeBus === 'undefined') {
      this.$data._actualResizeBus = this.$gmapDefaultResizeBus;
    } else {
      this.$data._actualResizeBus = this.resizeBus;
    }
  },


  methods: {
    _resizeCallback: function _resizeCallback() {
      this.resize();
    },
    _delayedResizeCallback: function _delayedResizeCallback() {
      var _this = this;

      this.$nextTick(function () {
        return _this._resizeCallback();
      });
    }
  },

  watch: {
    resizeBus: function resizeBus(newVal) {
      // eslint-disable-line no-unused-vars
      this.$data._actualResizeBus = newVal;
    },
    '$data._actualResizeBus': function $data_actualResizeBus(newVal, oldVal) {
      if (oldVal) {
        oldVal.$off('resize', this._delayedResizeCallback);
      }
      if (newVal) {
        newVal.$on('resize', this._delayedResizeCallback);
      }
    }
  },

  destroyed: function destroyed() {
    if (this.$data._actualResizeBus) {
      this.$data._actualResizeBus.$off('resize', this._delayedResizeCallback);
    }
  }
};

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69);
/* harmony import */ var _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bindProps = __webpack_require__(62);

var _simulateArrowDown = __webpack_require__(74);

var _simulateArrowDown2 = _interopRequireDefault(_simulateArrowDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var props = {
  bounds: {
    type: Object
  },
  defaultPlace: {
    type: String,
    default: ''
  },
  componentRestrictions: {
    type: Object,
    default: null
  },
  types: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  placeholder: {
    required: false,
    type: String
  },
  className: {
    required: false,
    type: String
  },
  label: {
    required: false,
    type: String,
    default: null
  },
  selectFirstOnEnter: {
    require: false,
    type: Boolean,
    default: false
  }
};

exports.default = {
  mounted: function mounted() {
    var _this = this;

    var input = this.$refs.input;

    // Allow default place to be set
    input.value = this.defaultPlace;
    this.$watch('defaultPlace', function () {
      input.value = _this.defaultPlace;
    });

    this.$gmapApiPromiseLazy().then(function () {
      var options = (0, _bindProps.getPropsValues)(_this, props);
      if (_this.selectFirstOnEnter) {
        (0, _simulateArrowDown2.default)(_this.$refs.input);
      }

      if (typeof google.maps.places.Autocomplete !== 'function') {
        throw new Error('google.maps.places.Autocomplete is undefined. Did you add \'places\' to libraries when loading Google Maps?');
      }

      _this.autoCompleter = new google.maps.places.Autocomplete(_this.$refs.input, options);

      var placeholder = props.placeholder,
          place = props.place,
          defaultPlace = props.defaultPlace,
          className = props.className,
          label = props.label,
          selectFirstOnEnter = props.selectFirstOnEnter,
          rest = _objectWithoutProperties(props, ['placeholder', 'place', 'defaultPlace', 'className', 'label', 'selectFirstOnEnter']); // eslint-disable-line


      (0, _bindProps.bindProps)(_this, _this.autoCompleter, rest);

      _this.autoCompleter.addListener('place_changed', function () {
        _this.$emit('place_changed', _this.autoCompleter.getPlace());
      });
    });
  },
  created: function created() {
    console.warn('The PlaceInput class is deprecated! Please consider using the Autocomplete input instead'); // eslint-disable-line no-console
  },

  props: props
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @class MapElementMixin
 *
 * Extends components to include the following fields:
 *
 * @property $map        The Google map (valid only after the promise returns)
 *
 *
 * */
exports.default = {
  inject: {
    '$mapPromise': { default: 'abcdef' }
  },

  provide: function provide() {
    var _this = this;

    // Note: although this mixin is not "providing" anything,
    // components' expect the `$map` property to be present on the component.
    // In order for that to happen, this mixin must intercept the $mapPromise
    // .then(() =>) first before its component does so.
    //
    // Since a provide() on a mixin is executed before a provide() on the
    // component, putting this code in provide() ensures that the $map is
    // already set by the time the
    // component's provide() is called.
    this.$mapPromise.then(function (map) {
      _this.$map = map;
    });

    return {};
  }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TwoWayBindingWrapper;
/**
 * When you have two-way bindings, but the actual bound value will not equal
 * the value you initially passed in, then to avoid an infinite loop you
 * need to increment a counter every time you pass in a value, decrement the
 * same counter every time the bound value changed, but only bubble up
 * the event when the counter is zero.
 *
Example:

Let's say DrawingRecognitionCanvas is a deep-learning backed canvas
that, when given the name of an object (e.g. 'dog'), draws a dog.
But whenever the drawing on it changes, it also sends back its interpretation
of the image by way of the @newObjectRecognized event.

<input
  type="text"
  placeholder="an object, e.g. Dog, Cat, Frog"
  v-model="identifiedObject" />
<DrawingRecognitionCanvas
  :object="identifiedObject"
  @newObjectRecognized="identifiedObject = $event"
  />

new TwoWayBindingWrapper((increment, decrement, shouldUpdate) => {
  this.$watch('identifiedObject', () => {
    // new object passed in
    increment()
  })
  this.$deepLearningBackend.on('drawingChanged', () => {
    recognizeObject(this.$deepLearningBackend)
      .then((object) => {
        decrement()
        if (shouldUpdate()) {
          this.$emit('newObjectRecognized', object.name)
        }
      })
  })
})
 */
function TwoWayBindingWrapper(fn) {
  var counter = 0;

  fn(function () {
    counter += 1;
  }, function () {
    counter = Math.max(0, counter - 1);
  }, function () {
    return counter === 0;
  });
}

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"vue-map-container": "hwPH5-LYq+FFxaUYWdWZsw==",
	"vue-map": "N7BW64nkZ23bLsf5d-cEGQ==",
	"vue-map-hidden": "Nvbyom6IojX00GIjrAwV+g=="
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"vue-street-view-pano-container": "sUdSOpeLZNujzL7g2igWww==",
	"vue-street-view-pano": "_7931EsEoPCqREh3uyv39mw=="
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// This piece of code was orignally written by amirnissim and can be seen here
// http://stackoverflow.com/a/11703018/2694653
// This has been ported to Vanilla.js by GuillaumeLeclerc
exports.default = function (input) {
  var _addEventListener = input.addEventListener ? input.addEventListener : input.attachEvent;

  function addEventListenerWrapper(type, listener) {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
    // and then trigger the original listener.
    if (type === 'keydown') {
      var origListener = listener;
      listener = function (event) {
        var suggestionSelected = document.getElementsByClassName('pac-item-selected').length > 0;
        if (event.which === 13 && !suggestionSelected) {
          var simulatedEvent = document.createEvent('Event');
          simulatedEvent.keyCode = 40;
          simulatedEvent.which = 40;
          origListener.apply(input, [simulatedEvent]);
        }
        origListener.apply(input, [event]);
      };
    }
    _addEventListener.apply(input, [type, listener]);
  }

  input.addEventListener = addEventListenerWrapper;
  input.attachEvent = addEventListenerWrapper;
};

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_KEY; });
// ADD YOUR OWN GOOGLE MAPS API KEY HERE
const API_KEY = '';

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreetViewPanorama = exports.MountableMixin = exports.Autocomplete = exports.MapElementFactory = exports.MapElementMixin = exports.PlaceInput = exports.Map = exports.InfoWindow = exports.Rectangle = exports.Cluster = exports.Circle = exports.Polygon = exports.Polyline = exports.Marker = exports.loadGmapApi = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Vue component imports


exports.install = install;
exports.gmapApi = gmapApi;

var _lazyValue = __webpack_require__(79);

var _lazyValue2 = _interopRequireDefault(_lazyValue);

var _manager = __webpack_require__(80);

var _marker = __webpack_require__(81);

var _marker2 = _interopRequireDefault(_marker);

var _polyline = __webpack_require__(82);

var _polyline2 = _interopRequireDefault(_polyline);

var _polygon = __webpack_require__(83);

var _polygon2 = _interopRequireDefault(_polygon);

var _circle = __webpack_require__(84);

var _circle2 = _interopRequireDefault(_circle);

var _rectangle = __webpack_require__(85);

var _rectangle2 = _interopRequireDefault(_rectangle);

var _infoWindow = __webpack_require__(93);

var _infoWindow2 = _interopRequireDefault(_infoWindow);

var _map = __webpack_require__(94);

var _map2 = _interopRequireDefault(_map);

var _streetViewPanorama = __webpack_require__(95);

var _streetViewPanorama2 = _interopRequireDefault(_streetViewPanorama);

var _placeInput = __webpack_require__(91);

var _placeInput2 = _interopRequireDefault(_placeInput);

var _autocomplete = __webpack_require__(96);

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _mapElementMixin = __webpack_require__(70);

var _mapElementMixin2 = _interopRequireDefault(_mapElementMixin);

var _mapElementFactory = __webpack_require__(60);

var _mapElementFactory2 = _interopRequireDefault(_mapElementFactory);

var _mountableMixin = __webpack_require__(67);

var _mountableMixin2 = _interopRequireDefault(_mountableMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HACK: Cluster should be loaded conditionally
// However in the web version, it's not possible to write
// `import 'vue2-google-maps/src/components/cluster'`, so we need to
// import it anyway (but we don't have to register it)
// Therefore we use babel-plugin-transform-inline-environment-variables to
// set BUILD_DEV to truthy / falsy
var Cluster = undefined;

var GmapApi = null;

// export everything
exports.loadGmapApi = _manager.loadGmapApi;
exports.Marker = _marker2.default;
exports.Polyline = _polyline2.default;
exports.Polygon = _polygon2.default;
exports.Circle = _circle2.default;
exports.Cluster = Cluster;
exports.Rectangle = _rectangle2.default;
exports.InfoWindow = _infoWindow2.default;
exports.Map = _map2.default;
exports.PlaceInput = _placeInput2.default;
exports.MapElementMixin = _mapElementMixin2.default;
exports.MapElementFactory = _mapElementFactory2.default;
exports.Autocomplete = _autocomplete2.default;
exports.MountableMixin = _mountableMixin2.default;
exports.StreetViewPanorama = _streetViewPanorama2.default;
function install(Vue, options) {
  // Set defaults
  options = _extends({
    installComponents: true,
    autobindAllEvents: false
  }, options);

  // Update the global `GmapApi`. This will allow
  // components to use the `google` global reactively
  // via:
  //   import {gmapApi} from 'vue2-google-maps'
  //   export default {  computed: { google: gmapApi }  }
  GmapApi = new Vue({ data: { gmapApi: null } });

  var defaultResizeBus = new Vue();

  // Use a lazy to only load the API when
  // a VGM component is loaded
  var gmapApiPromiseLazy = makeGmapApiPromiseLazy(options);

  Vue.mixin({
    created: function created() {
      this.$gmapDefaultResizeBus = defaultResizeBus;
      this.$gmapOptions = options;
      this.$gmapApiPromiseLazy = gmapApiPromiseLazy;
    }
  });
  Vue.$gmapDefaultResizeBus = defaultResizeBus;
  Vue.$gmapApiPromiseLazy = gmapApiPromiseLazy;

  if (options.installComponents) {
    Vue.component('GmapMap', _map2.default);
    Vue.component('GmapMarker', _marker2.default);
    Vue.component('GmapInfoWindow', _infoWindow2.default);
    Vue.component('GmapPolyline', _polyline2.default);
    Vue.component('GmapPolygon', _polygon2.default);
    Vue.component('GmapCircle', _circle2.default);
    Vue.component('GmapRectangle', _rectangle2.default);
    Vue.component('GmapAutocomplete', _autocomplete2.default);
    Vue.component('GmapPlaceInput', _placeInput2.default);
    Vue.component('GmapStreetViewPanorama', _streetViewPanorama2.default);
  }
}

function makeGmapApiPromiseLazy(options) {
  // Things to do once the API is loaded
  function onApiLoaded() {
    GmapApi.gmapApi = {};
    return window.google;
  }

  if (options.load) {
    // If library should load the API
    return (0, _lazyValue2.default)(function () {
      // Load the
      // This will only be evaluated once
      if (typeof window === 'undefined') {
        // server side -- never resolve this promise
        return new Promise(function () {}).then(onApiLoaded);
      } else {
        return new Promise(function (resolve, reject) {
          try {
            window['vueGoogleMapsInit'] = resolve;
            (0, _manager.loadGmapApi)(options.load, options.loadCn);
          } catch (err) {
            reject(err);
          }
        }).then(onApiLoaded);
      }
    });
  } else {
    // If library should not handle API, provide
    // end-users with the global `vueGoogleMapsInit: () => undefined`
    // when the Google Maps API has been loaded
    var promise = new Promise(function (resolve) {
      if (typeof window === 'undefined') {
        // Do nothing if run from server-side
        return;
      }
      window['vueGoogleMapsInit'] = resolve;
    }).then(onApiLoaded);

    return (0, _lazyValue2.default)(function () {
      return promise;
    });
  }
}

function gmapApi() {
  return GmapApi.gmapApi && window.google;
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// This piece of code was orignally written by sindresorhus and can be seen here
// https://github.com/sindresorhus/lazy-value/blob/master/index.js

exports.default = function (fn) {
  var called = false;
  var ret = void 0;

  return function () {
    if (!called) {
      called = true;
      ret = fn();
    }

    return ret;
  };
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isApiSetUp = false;

/**
 * @param apiKey    API Key, or object with the URL parameters. For example
 *                  to use Google Maps Premium API, pass
 *                    `{ client: <YOUR-CLIENT-ID> }`.
 *                  You may pass the libraries and/or version (as `v`) parameter into
 *                  this parameter and skip the next two parameters
 * @param version   Google Maps version
 * @param libraries Libraries to load (@see
 *                  https://developers.google.com/maps/documentation/javascript/libraries)
 * @param loadCn    Boolean. If set to true, the map will be loaded from google maps China
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 *
 * Example:
 * ```
 *      import {load} from 'vue-google-maps'
 *
 *      load(<YOUR-API-KEY>)
 *
 *      load({
 *              key: <YOUR-API-KEY>,
 *      })
 *
 *      load({
 *              client: <YOUR-CLIENT-ID>,
 *              channel: <YOUR CHANNEL>
 *      })
 * ```
 */
var loadGmapApi = exports.loadGmapApi = function (options, loadCn) {
  if (typeof document === 'undefined') {
    // Do nothing if run from server-side
    return;
  }
  if (!isApiSetUp) {
    isApiSetUp = true;

    var googleMapScript = document.createElement('SCRIPT');

    // Allow options to be an object.
    // This is to support more esoteric means of loading Google Maps,
    // such as Google for business
    // https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      throw new Error('options should  be an object');
    }

    // libraries
    if (Array.prototype.isPrototypeOf(options.libraries)) {
      options.libraries = options.libraries.join(',');
    }
    options['callback'] = 'vueGoogleMapsInit';

    var baseUrl = 'https://maps.googleapis.com/';

    if (typeof loadCn === 'boolean' && loadCn === true) {
      baseUrl = 'https://maps.google.cn/';
    }

    var url = baseUrl + 'maps/api/js?' + Object.keys(options).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(options[key]);
    }).join('&');

    googleMapScript.setAttribute('src', url);
    googleMapScript.setAttribute('async', '');
    googleMapScript.setAttribute('defer', '');
    document.head.appendChild(googleMapScript);
  } else {
    throw new Error('You already started the loading of google maps');
  }
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapElementFactory = __webpack_require__(60);

var _mapElementFactory2 = _interopRequireDefault(_mapElementFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  animation: {
    twoWay: true,
    type: Number
  },
  attribution: {
    type: Object
  },
  clickable: {
    type: Boolean,
    twoWay: true,
    default: true
  },
  cursor: {
    type: String,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    twoWay: true,
    default: false
  },
  icon: {
    twoWay: true
  },
  label: {},
  opacity: {
    type: Number,
    default: 1
  },
  options: {
    type: Object
  },
  place: {
    type: Object
  },
  position: {
    type: Object,
    twoWay: true
  },
  shape: {
    type: Object,
    twoWay: true
  },
  title: {
    type: String,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  },
  visible: {
    twoWay: true,
    default: true
  }
};

var events = ['click', 'rightclick', 'dblclick', 'drag', 'dragstart', 'dragend', 'mouseup', 'mousedown', 'mouseover', 'mouseout'];

/**
 * @class Marker
 *
 * Marker class with extra support for
 *
 * - Embedded info windows
 * - Clustered markers
 *
 * Support for clustered markers is for backward-compatability
 * reasons. Otherwise we should use a cluster-marker mixin or
 * subclass.
 */
exports.default = (0, _mapElementFactory2.default)({
  mappedProps: props,
  events: events,
  name: 'marker',
  ctr: function ctr() {
    return google.maps.Marker;
  },

  inject: {
    '$clusterPromise': {
      default: null
    }
  },

  render: function render(h) {
    if (!this.$slots.default || this.$slots.default.length === 0) {
      return '';
    } else if (this.$slots.default.length === 1) {
      // So that infowindows can have a marker parent
      return this.$slots.default[0];
    } else {
      return h('div', this.$slots.default);
    }
  },
  destroyed: function destroyed() {
    if (!this.$markerObject) {
      return;
    }

    if (this.$clusterObject) {
      // Repaint will be performed in `updated()` of cluster
      this.$clusterObject.removeMarker(this.$markerObject, true);
    } else {
      this.$markerObject.setMap(null);
    }
  },
  beforeCreate: function beforeCreate(options) {
    if (this.$clusterPromise) {
      options.map = null;
    }

    return this.$clusterPromise;
  },
  afterCreate: function afterCreate(inst) {
    var _this = this;

    if (this.$clusterPromise) {
      this.$clusterPromise.then(function (co) {
        co.addMarker(inst);
        _this.$clusterObject = co;
      });
    }
  }
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mapElementFactory = __webpack_require__(60);

var _mapElementFactory2 = _interopRequireDefault(_mapElementFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  draggable: {
    type: Boolean
  },
  editable: {
    type: Boolean
  },
  options: {
    twoWay: false,
    type: Object
  },
  path: {
    type: Array,
    twoWay: true
  }
};

var events = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

exports.default = (0, _mapElementFactory2.default)({
  mappedProps: props,
  props: {
    deepWatch: {
      type: Boolean,
      default: false
    }
  },
  events: events,

  name: 'polyline',
  ctr: function ctr() {
    return google.maps.Polyline;
  },

  afterCreate: function afterCreate() {
    var _this = this;

    var clearEvents = function () {};

    this.$watch('path', function (path) {
      if (path) {
        clearEvents();

        _this.$polylineObject.setPath(path);

        var mvcPath = _this.$polylineObject.getPath();
        var eventListeners = [];

        var updatePaths = function () {
          _this.$emit('path_changed', _this.$polylineObject.getPath());
        };

        eventListeners.push([mvcPath, mvcPath.addListener('insert_at', updatePaths)]);
        eventListeners.push([mvcPath, mvcPath.addListener('remove_at', updatePaths)]);
        eventListeners.push([mvcPath, mvcPath.addListener('set_at', updatePaths)]);

        clearEvents = function () {
          eventListeners.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                obj = _ref2[0],
                listenerHandle = _ref2[1];

            return (// eslint-disable-line no-unused-vars
              google.maps.event.removeListener(listenerHandle)
            );
          });
        };
      }
    }, {
      deep: this.deepWatch,
      immediate: true
    });
  }
});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mapElementFactory = __webpack_require__(60);

var _mapElementFactory2 = _interopRequireDefault(_mapElementFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  draggable: {
    type: Boolean
  },
  editable: {
    type: Boolean
  },
  options: {
    type: Object
  },
  path: {
    type: Array,
    twoWay: true,
    noBind: true
  },
  paths: {
    type: Array,
    twoWay: true,
    noBind: true
  }
};

var events = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

exports.default = (0, _mapElementFactory2.default)({
  props: {
    deepWatch: {
      type: Boolean,
      default: false
    }
  },
  events: events,
  mappedProps: props,
  name: 'polygon',
  ctr: function ctr() {
    return google.maps.Polygon;
  },

  beforeCreate: function beforeCreate(options) {
    if (!options.path) delete options.path;
    if (!options.paths) delete options.paths;
  },
  afterCreate: function afterCreate(inst) {
    var _this = this;

    var clearEvents = function () {};

    // Watch paths, on our own, because we do not want to set either when it is
    // empty
    this.$watch('paths', function (paths) {
      if (paths) {
        clearEvents();

        inst.setPaths(paths);

        var updatePaths = function () {
          _this.$emit('paths_changed', inst.getPaths());
        };
        var eventListeners = [];

        var mvcArray = inst.getPaths();
        for (var i = 0; i < mvcArray.getLength(); i++) {
          var mvcPath = mvcArray.getAt(i);
          eventListeners.push([mvcPath, mvcPath.addListener('insert_at', updatePaths)]);
          eventListeners.push([mvcPath, mvcPath.addListener('remove_at', updatePaths)]);
          eventListeners.push([mvcPath, mvcPath.addListener('set_at', updatePaths)]);
        }
        eventListeners.push([mvcArray, mvcArray.addListener('insert_at', updatePaths)]);
        eventListeners.push([mvcArray, mvcArray.addListener('remove_at', updatePaths)]);
        eventListeners.push([mvcArray, mvcArray.addListener('set_at', updatePaths)]);

        clearEvents = function () {
          eventListeners.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                obj = _ref2[0],
                listenerHandle = _ref2[1];

            return (// eslint-disable-line no-unused-vars
              google.maps.event.removeListener(listenerHandle)
            );
          });
        };
      }
    }, {
      deep: this.deepWatch,
      immediate: true
    });

    this.$watch('path', function (path) {
      if (path) {
        clearEvents();

        inst.setPaths(path);

        var mvcPath = inst.getPath();
        var eventListeners = [];

        var updatePaths = function () {
          _this.$emit('path_changed', inst.getPath());
        };

        eventListeners.push([mvcPath, mvcPath.addListener('insert_at', updatePaths)]);
        eventListeners.push([mvcPath, mvcPath.addListener('remove_at', updatePaths)]);
        eventListeners.push([mvcPath, mvcPath.addListener('set_at', updatePaths)]);

        clearEvents = function () {
          eventListeners.map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                obj = _ref4[0],
                listenerHandle = _ref4[1];

            return (// eslint-disable-line no-unused-vars
              google.maps.event.removeListener(listenerHandle)
            );
          });
        };
      }
    }, {
      deep: this.deepWatch,
      immediate: true
    });
  }
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapElementFactory = __webpack_require__(60);

var _mapElementFactory2 = _interopRequireDefault(_mapElementFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  center: {
    type: Object,
    twoWay: true,
    required: true
  },
  radius: {
    type: Number,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    twoWay: false
  }
};

var events = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

exports.default = (0, _mapElementFactory2.default)({
  mappedProps: props,
  name: 'circle',
  ctr: function ctr() {
    return google.maps.Circle;
  },
  events: events
});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapElementFactory = __webpack_require__(60);

var _mapElementFactory2 = _interopRequireDefault(_mapElementFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  bounds: {
    type: Object,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    twoWay: false
  }
};

var events = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

exports.default = (0, _mapElementFactory2.default)({
  mappedProps: props,
  name: 'rectangle',
  ctr: function ctr() {
    return google.maps.Rectangle;
  },
  events: events
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapElementFactory = __webpack_require__(60);

var _mapElementFactory2 = _interopRequireDefault(_mapElementFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  options: {
    type: Object,
    required: false,
    default: function _default() {
      return {};
    }
  },
  position: {
    type: Object,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  }
};

var events = ['domready', 'closeclick', 'content_changed'];

exports.default = (0, _mapElementFactory2.default)({
  mappedProps: props,
  events: events,
  name: 'infoWindow',
  ctr: function ctr() {
    return google.maps.InfoWindow;
  },
  props: {
    opened: {
      type: Boolean,
      default: true
    }
  },

  inject: {
    '$markerPromise': {
      default: null
    }
  },

  mounted: function mounted() {
    var el = this.$refs.flyaway;
    el.parentNode.removeChild(el);
  },
  beforeCreate: function beforeCreate(options) {
    var _this = this;

    options.content = this.$refs.flyaway;

    if (this.$markerPromise) {
      delete options.position;
      return this.$markerPromise.then(function (mo) {
        _this.$markerObject = mo;
        return mo;
      });
    }
  },


  methods: {
    _openInfoWindow: function _openInfoWindow() {
      if (this.opened) {
        if (this.$markerObject !== null) {
          this.$infoWindowObject.open(this.$map, this.$markerObject);
        } else {
          this.$infoWindowObject.open(this.$map);
        }
      } else {
        this.$infoWindowObject.close();
      }
    }
  },

  afterCreate: function afterCreate() {
    var _this2 = this;

    this._openInfoWindow();
    this.$watch('opened', function () {
      _this2._openInfoWindow();
    });
  }
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bindEvents = __webpack_require__(65);

var _bindEvents2 = _interopRequireDefault(_bindEvents);

var _bindProps = __webpack_require__(62);

var _mountableMixin = __webpack_require__(67);

var _mountableMixin2 = _interopRequireDefault(_mountableMixin);

var _TwoWayBindingWrapper = __webpack_require__(71);

var _TwoWayBindingWrapper2 = _interopRequireDefault(_TwoWayBindingWrapper);

var _WatchPrimitiveProperties = __webpack_require__(66);

var _WatchPrimitiveProperties2 = _interopRequireDefault(_WatchPrimitiveProperties);

var _mapElementFactory = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  center: {
    required: true,
    twoWay: true,
    type: Object,
    noBind: true
  },
  zoom: {
    required: false,
    twoWay: true,
    type: Number,
    noBind: true
  },
  heading: {
    type: Number,
    twoWay: true
  },
  mapTypeId: {
    twoWay: true,
    type: String
  },
  tilt: {
    twoWay: true,
    type: Number
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};

var events = ['bounds_changed', 'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'idle', 'mousemove', 'mouseout', 'mouseover', 'resize', 'rightclick', 'tilesloaded'];

// Plain Google Maps methods exposed here for convenience
var linkedMethods = ['panBy', 'panTo', 'panToBounds', 'fitBounds'].reduce(function (all, methodName) {
  all[methodName] = function () {
    if (this.$mapObject) {
      this.$mapObject[methodName].apply(this.$mapObject, arguments);
    }
  };
  return all;
}, {});

// Other convenience methods exposed by Vue Google Maps
var customMethods = {
  resize: function resize() {
    if (this.$mapObject) {
      google.maps.event.trigger(this.$mapObject, 'resize');
    }
  },
  resizePreserveCenter: function resizePreserveCenter() {
    if (!this.$mapObject) {
      return;
    }

    var oldCenter = this.$mapObject.getCenter();
    google.maps.event.trigger(this.$mapObject, 'resize');
    this.$mapObject.setCenter(oldCenter);
  },


  /// Override mountableMixin::_resizeCallback
  /// because resizePreserveCenter is usually the
  /// expected behaviour
  _resizeCallback: function _resizeCallback() {
    this.resizePreserveCenter();
  }
};

exports.default = {
  mixins: [_mountableMixin2.default],
  props: (0, _mapElementFactory.mappedPropsToVueProps)(props),

  provide: function provide() {
    var _this = this;

    this.$mapPromise = new Promise(function (resolve, reject) {
      _this.$mapPromiseDeferred = { resolve: resolve, reject: reject };
    });
    return {
      '$mapPromise': this.$mapPromise
    };
  },


  computed: {
    finalLat: function finalLat() {
      return this.center && typeof this.center.lat === 'function' ? this.center.lat() : this.center.lat;
    },
    finalLng: function finalLng() {
      return this.center && typeof this.center.lng === 'function' ? this.center.lng() : this.center.lng;
    },
    finalLatLng: function finalLatLng() {
      return { lat: this.finalLat, lng: this.finalLng };
    }
  },

  watch: {
    zoom: function zoom(_zoom) {
      if (this.$mapObject) {
        this.$mapObject.setZoom(_zoom);
      }
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    return this.$gmapApiPromiseLazy().then(function () {
      // getting the DOM element where to create the map
      var element = _this2.$refs['vue-map'];

      // creating the map
      var options = _extends({}, _this2.options, (0, _bindProps.getPropsValues)(_this2, props));
      delete options.options;
      _this2.$mapObject = new google.maps.Map(element, options);

      // binding properties (two and one way)
      (0, _bindProps.bindProps)(_this2, _this2.$mapObject, props);
      // binding events
      (0, _bindEvents2.default)(_this2, _this2.$mapObject, events);

      // manually trigger center and zoom
      (0, _TwoWayBindingWrapper2.default)(function (increment, decrement, shouldUpdate) {
        _this2.$mapObject.addListener('center_changed', function () {
          if (shouldUpdate()) {
            _this2.$emit('center_changed', _this2.$mapObject.getCenter());
          }
          decrement();
        });

        (0, _WatchPrimitiveProperties2.default)(_this2, ['finalLat', 'finalLng'], function updateCenter() {
          increment();
          _this2.$mapObject.setCenter(_this2.finalLatLng);
        });
      });
      _this2.$mapObject.addListener('zoom_changed', function () {
        _this2.$emit('zoom_changed', _this2.$mapObject.getZoom());
      });
      _this2.$mapObject.addListener('bounds_changed', function () {
        _this2.$emit('bounds_changed', _this2.$mapObject.getBounds());
      });

      _this2.$mapPromiseDeferred.resolve(_this2.$mapObject);

      return _this2.$mapObject;
    }).catch(function (error) {
      throw error;
    });
  },

  methods: _extends({}, customMethods, linkedMethods)
};

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bindEvents = __webpack_require__(65);

var _bindEvents2 = _interopRequireDefault(_bindEvents);

var _bindProps = __webpack_require__(62);

var _mountableMixin = __webpack_require__(67);

var _mountableMixin2 = _interopRequireDefault(_mountableMixin);

var _TwoWayBindingWrapper = __webpack_require__(71);

var _TwoWayBindingWrapper2 = _interopRequireDefault(_TwoWayBindingWrapper);

var _WatchPrimitiveProperties = __webpack_require__(66);

var _WatchPrimitiveProperties2 = _interopRequireDefault(_WatchPrimitiveProperties);

var _mapElementFactory = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  zoom: {
    twoWay: true,
    type: Number
  },
  pov: {
    twoWay: true,
    type: Object,
    trackProperties: ['pitch', 'heading']
  },
  position: {
    twoWay: true,
    type: Object,
    noBind: true
  },
  pano: {
    twoWay: true,
    type: String
  },
  motionTracking: {
    twoWay: false,
    type: Boolean
  },
  visible: {
    twoWay: true,
    type: Boolean,
    default: true
  },
  options: {
    twoWay: false,
    type: Object,
    default: function _default() {
      return {};
    }
  }
};

var events = ['closeclick', 'status_changed'];

exports.default = {
  mixins: [_mountableMixin2.default],
  props: (0, _mapElementFactory.mappedPropsToVueProps)(props),
  replace: false, // necessary for css styles
  methods: {
    resize: function resize() {
      if (this.$panoObject) {
        google.maps.event.trigger(this.$panoObject, 'resize');
      }
    }
  },

  provide: function provide() {
    var _this = this;

    var promise = new Promise(function (resolve, reject) {
      _this.$panoPromiseDeferred = { resolve: resolve, reject: reject };
    });
    return {
      '$panoPromise': promise,
      '$mapPromise': promise // so that we can use it with markers
    };
  },


  computed: {
    finalLat: function finalLat() {
      return this.position && typeof this.position.lat === 'function' ? this.position.lat() : this.position.lat;
    },
    finalLng: function finalLng() {
      return this.position && typeof this.position.lng === 'function' ? this.position.lng() : this.position.lng;
    },
    finalLatLng: function finalLatLng() {
      return {
        lat: this.finalLat,
        lng: this.finalLng
      };
    }
  },

  watch: {
    zoom: function zoom(_zoom) {
      if (this.$panoObject) {
        this.$panoObject.setZoom(_zoom);
      }
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    return this.$gmapApiPromiseLazy().then(function () {
      // getting the DOM element where to create the map
      var element = _this2.$refs['vue-street-view-pano'];

      // creating the map
      var options = _extends({}, _this2.options, (0, _bindProps.getPropsValues)(_this2, props));
      delete options.options;

      _this2.$panoObject = new google.maps.StreetViewPanorama(element, options);

      // binding properties (two and one way)
      (0, _bindProps.bindProps)(_this2, _this2.$panoObject, props);
      // binding events
      (0, _bindEvents2.default)(_this2, _this2.$panoObject, events);

      // manually trigger position
      (0, _TwoWayBindingWrapper2.default)(function (increment, decrement, shouldUpdate) {
        // Panos take a while to load
        increment();

        _this2.$panoObject.addListener('position_changed', function () {
          if (shouldUpdate()) {
            _this2.$emit('position_changed', _this2.$panoObject.getPosition());
          }
          decrement();
        });

        (0, _WatchPrimitiveProperties2.default)(_this2, ['finalLat', 'finalLng'], function updateCenter() {
          increment();
          _this2.$panoObject.setPosition(_this2.finalLatLng);
        });
      });

      _this2.$panoPromiseDeferred.resolve(_this2.$panoObject);

      return _this2.$panoPromise;
    }).catch(function (error) {
      throw error;
    });
  }
};

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_streetViewPanorama_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73);
/* harmony import */ var _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_streetViewPanorama_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_streetViewPanorama_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_streetViewPanorama_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _css_loader_dist_cjs_js_ref_3_oneOf_1_0_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_ref_3_oneOf_1_1_vue_loader_lib_index_js_vue_loader_options_streetViewPanorama_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _placeInput_vue_vue_type_template_id_13bfbbee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(97);
/* harmony import */ var _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _placeInputImpl_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _placeInput_vue_vue_type_template_id_13bfbbee___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _placeInput_vue_vue_type_template_id_13bfbbee___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  "04d29dec"
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bindProps = __webpack_require__(62);

var _simulateArrowDown = __webpack_require__(74);

var _simulateArrowDown2 = _interopRequireDefault(_simulateArrowDown);

var _mapElementFactory = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mappedProps = {
  bounds: {
    type: Object
  },
  componentRestrictions: {
    type: Object,
    // Do not bind -- must check for undefined
    // in the property
    noBind: true
  },
  types: {
    type: Array,
    default: function _default() {
      return [];
    }
  }
};

var props = {
  selectFirstOnEnter: {
    required: false,
    type: Boolean,
    default: false
  },
  options: {
    type: Object
  }
};

exports.default = {
  mounted: function mounted() {
    var _this = this;

    this.$gmapApiPromiseLazy().then(function () {
      if (_this.selectFirstOnEnter) {
        (0, _simulateArrowDown2.default)(_this.$refs.input);
      }

      if (typeof google.maps.places.Autocomplete !== 'function') {
        throw new Error('google.maps.places.Autocomplete is undefined. Did you add \'places\' to libraries when loading Google Maps?');
      }

      /* eslint-disable no-unused-vars */
      var finalOptions = _extends({}, (0, _bindProps.getPropsValues)(_this, mappedProps), _this.options);

      _this.$autocomplete = new google.maps.places.Autocomplete(_this.$refs.input, finalOptions);
      (0, _bindProps.bindProps)(_this, _this.$autocomplete, mappedProps);

      _this.$watch('componentRestrictions', function (v) {
        if (v !== undefined) {
          _this.$autocomplete.setComponentRestrictions(v);
        }
      });

      // Not using `bindEvents` because we also want
      // to return the result of `getPlace()`
      _this.$autocomplete.addListener('place_changed', function () {
        _this.$emit('place_changed', _this.$autocomplete.getPlace());
      });
    });
  },

  props: _extends({}, (0, _mapElementFactory.mappedPropsToVueProps)(mappedProps), props)
};

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/infoWindow.vue?vue&type=template&id=25e3f758&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div>","</div>",[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/infoWindow.vue?vue&type=template&id=25e3f758&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/infoWindow.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var infoWindowvue_type_script_lang_js_ = ((function (x) {
  return x.default || x;
})(__webpack_require__(86)));
// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/infoWindow.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_infoWindowvue_type_script_lang_js_ = (infoWindowvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/infoWindow.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_infoWindowvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "7da4dfa7"
  
)

/* harmony default export */ var infoWindow = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/map.vue?vue&type=template&id=6839df3e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-map-container"},[_vm._ssrNode("<div class=\"vue-map\"></div> "),_vm._ssrNode("<div class=\"vue-map-hidden\">","</div>",[_vm._t("default")],2),_vm._ssrNode(" "),_vm._t("visible")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/map.vue?vue&type=template&id=6839df3e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/map.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var mapvue_type_script_lang_js_ = ((function (x) {
  return x.default || x;
})(__webpack_require__(87)));
// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/map.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_mapvue_type_script_lang_js_ = (mapvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/map.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(88)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_mapvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "71a63943"
  
)

/* harmony default export */ var map = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/streetViewPanorama.vue?vue&type=template&id=50f7f8d6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-street-view-pano-container"},[_vm._ssrNode("<div class=\"vue-street-view-pano\"></div> "),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/streetViewPanorama.vue?vue&type=template&id=50f7f8d6&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/streetViewPanorama.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
/* harmony default export */ var streetViewPanoramavue_type_script_lang_js_ = ((function (x) {
  return x.default || x;
})(__webpack_require__(89)));
// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/streetViewPanorama.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_streetViewPanoramavue_type_script_lang_js_ = (streetViewPanoramavue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/streetViewPanorama.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(90)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_streetViewPanoramavue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "4760acc6"
  
)

/* harmony default export */ var streetViewPanorama = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/autocomplete.vue?vue&type=template&id=5e569f3e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._g(_vm._b({ref:"input"},'input',_vm.$attrs,false),_vm.$listeners),[])}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/autocomplete.vue?vue&type=template&id=5e569f3e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/autocomplete.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var autocompletevue_type_script_lang_js_ = ((function (x) {
  return x.default || x;
})(__webpack_require__(92)));
// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/autocomplete.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_autocompletevue_type_script_lang_js_ = (autocompletevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/autocomplete.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_autocompletevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "6cad6fde"
  
)

/* harmony default export */ var autocomplete = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue2-google-maps/dist/components/placeInput.vue?vue&type=template&id=13bfbbee&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',[_vm._ssrNode("<span>"+_vm._ssrEscape(_vm._s(_vm.label))+"</span> <input type=\"text\""+(_vm._ssrAttr("placeholder",_vm.placeholder))+(_vm._ssrClass(null,_vm.className))+">")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/vue2-google-maps/dist/components/placeInput.vue?vue&type=template&id=13bfbbee&


/***/ }),
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */
/***/ (function(module, exports) {

// Exports
module.exports = {
	"carousel-centered": "f+t5QmAghM+PgwUcSpLPQA=="
};


/***/ }),
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Testimonials_vue_vue_type_style_index_0_id_6271d9cd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(104);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Testimonials_vue_vue_type_style_index_0_id_6271d9cd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Testimonials_vue_vue_type_style_index_0_id_6271d9cd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Testimonials_vue_vue_type_style_index_0_id_6271d9cd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Testimonials_vue_vue_type_style_index_0_id_6271d9cd_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/sections.vue?vue&type=template&id=0d7399db&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrapper sections-pge"},[_vm._ssrNode("<div class=\"section-space\"></div> "),_c('headers-section'),_vm._ssrNode(" "),_c('features-section'),_vm._ssrNode(" "),_c('blog-section'),_vm._ssrNode(" "),_c('teams-section'),_vm._ssrNode(" "),_c('projects-section'),_vm._ssrNode(" "),_c('pricing-section'),_vm._ssrNode(" "),_c('testimonial-section'),_vm._ssrNode(" "),_c('contact-section')],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/sections.vue?vue&type=template&id=0d7399db&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Headers.vue?vue&type=template&id=3461d138&
var Headersvue_type_template_id_3461d138_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"headers"}},[_vm._ssrNode("<div class=\"header-1\"><nav class=\"navbar navbar-expand-lg navbar-transparent bg-success navbar-absolute\"><div class=\"container\"><div class=\"navbar-translate\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#example-navbar-success\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" class=\"navbar-toggler\"><span class=\"navbar-toggler-bar bar1\"></span> <span class=\"navbar-toggler-bar bar2\"></span> <span class=\"navbar-toggler-bar bar3\"></span></button> <a href=\"#pablo\" class=\"navbar-brand\">Creative Tim</a></div> <div id=\"example-navbar-success2\" class=\"collapse navbar-collapse\"><ul class=\"navbar-nav mx-auto\"><li class=\"nav-item active\"><a href=\"#pablo\" class=\"nav-link\">\n                                Home\n                            </a></li> <li class=\"nav-item\"><a href=\"#pablo\" class=\"nav-link\">\n                                About Us\n                            </a></li> <li class=\"nav-item\"><a href=\"#pablo\" class=\"nav-link\">\n                                Contact Us\n                            </a></li></ul> <ul class=\"nav navbar-nav\"><li class=\"nav-item\"><a href=\"https://twitter.com/CreativeTim\" class=\"nav-link\"><i class=\"fab fa-twitter\"></i></a></li> <li class=\"nav-item\"><a href=\"https://www.facebook.com/CreativeTim\" class=\"nav-link\"><i class=\"fab fa-facebook-square\"></i></a></li> <li class=\"nav-item\"><a href=\"https://www.instagram.com/CreativeTimOfficial\" class=\"nav-link\"><i class=\"fab fa-instagram\"></i></a></li></ul></div></div></nav> <div class=\"page-header header-filter\"><div class=\"page-header-image\" style=\"background-image: url('img/bg16.jpg')\"></div> <div class=\"content-center\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-7 ml-auto text-right\"><h1 class=\"title\">History of surfing</h1> <h4 class=\"description\">The riding of waves has likely existed since humans began\n                                swimming in the ocean. In this sense, bodysurfing is the oldest type of\n                                wave-catching. Standing up on what is now called a surfboard is a relatively recent\n                                innovation developed by the Polynesians.</h4> <br> <div class=\"buttons\"><a href=\"#pablo\" class=\"btn btn-icon btn-link btn-neutral btn-lg\"><i class=\"fab fa-twitter\"></i></a> <a href=\"#pablo\" class=\"btn btn-icon btn-link btn-neutral btn-lg\"><i class=\"fab fa-facebook-square\"></i></a> <a href=\"#pablo\" class=\"btn btn-icon btn-link btn-neutral btn-lg\"><i class=\"fab fa-get-pocket\"></i></a> <a href=\"#pablo\" class=\"btn btn-info btn-lg mr-3\">\n                                    Read More\n                                </a></div></div></div></div></div></div></div> "),_vm._ssrNode("<div class=\"header-2\">","</div>",[_vm._ssrNode("<nav class=\"navbar navbar-expand-lg navbar-transparent bg-success navbar-absolute\"><div class=\"container\"><div class=\"navbar-translate\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#example-navbar-success\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" class=\"navbar-toggler\"><span class=\"navbar-toggler-bar bar1\"></span> <span class=\"navbar-toggler-bar bar2\"></span> <span class=\"navbar-toggler-bar bar3\"></span></button> <a href=\"#pablo\" class=\"navbar-brand\">Creative Tim</a></div> <div id=\"example-navbar-success\" class=\"collapse navbar-collapse\"><ul class=\"navbar-nav mx-auto\"><li class=\"nav-item active\"><a href=\"#pablo\" class=\"nav-link\">\n                                Home\n                            </a></li> <li class=\"nav-item\"><a href=\"#pablo\" class=\"nav-link\">\n                                About Us\n                            </a></li> <li class=\"nav-item\"><a href=\"#pablo\" class=\"nav-link\">\n                                Products\n                            </a></li> <li class=\"nav-item\"><a href=\"#pablo\" class=\"nav-link\">\n                                Contact Us\n                            </a></li></ul> <ul class=\"nav navbar-nav navbar-right\"><li class=\"nav-item\"><a href=\"https://twitter.com/CreativeTim\" class=\"nav-link\"><i class=\"fab fa-twitter\"></i></a></li> <li class=\"nav-item\"><a href=\"https://www.facebook.com/CreativeTim\" class=\"nav-link\"><i class=\"fab fa-facebook-square\"></i></a></li> <li class=\"nav-item\"><a href=\"https://www.instagram.com/CreativeTimOfficial\" class=\"nav-link\"><i class=\"fab fa-instagram\"></i></a></li></ul></div></div></nav> "),_vm._ssrNode("<div class=\"page-header header-filter\">","</div>",[_vm._ssrNode("<div class=\"page-header-image\" style=\"background-image: url('img/bg14.jpg')\"></div> "),_vm._ssrNode("<div class=\"content-center\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-8 ml-auto mr-auto text-center\"><h1 class=\"title\"> You should be here!</h1> <h5 class=\"description\">5,000 capacity venue, holding some of the latest technology\n                                lighting with a 24 colour laser system Amnesia is one of the islands most legendary\n                                clubs.</h5></div> "),_vm._ssrNode("<div class=\"col-md-10 ml-auto mr-auto\">","</div>",[_vm._ssrNode("<div data-background-color class=\"card card-raised card-form-horizontal card-plain\">","</div>",[_vm._ssrNode("<div class=\"card-body\">","</div>",[_vm._ssrNode("<form method action>","</form>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('fg-input',{attrs:{"value":"","placeholder":"Full Name"}})],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('fg-input',{attrs:{"value":"","placeholder":"Your Email"}})],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('fg-input',{attrs:{"value":"","placeholder":"Password"}})],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('n-button',{attrs:{"type":"success","round":"","block":""}},[_vm._v("Join Us")])],1)],2)])])])])],2)])])],2)],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"header-3\">","</div>",[_vm._ssrNode("<nav class=\"navbar navbar-expand-lg navbar-transparent bg-success navbar-absolute\"><div class=\"container\"><div class=\"navbar-translate\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#example-navbar-success\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" class=\"navbar-toggler\"><span class=\"navbar-toggler-bar bar1\"></span> <span class=\"navbar-toggler-bar bar2\"></span> <span class=\"navbar-toggler-bar bar3\"></span></button> <a href=\"#pablo\" class=\"navbar-brand\">Creative Tim</a></div> <div id=\"example-navbar-success\" class=\"collapse navbar-collapse\"><ul class=\"navbar-nav ml-auto\"><li class=\"nav-item active\"><a href=\"#pablo\" class=\"nav-link\">\n                                Home\n                            </a></li> <li class=\"nav-item\"><a href=\"#pablo\" class=\"nav-link\">\n                                About Us\n                            </a></li> <li class=\"nav-item\"><a href=\"#pablo\" class=\"nav-link\">\n                                Contact Us\n                            </a></li></ul></div></div></nav> "),_c('el-carousel',{attrs:{"height":"100vh"}},[_c('el-carousel-item',[_c('div',{staticClass:"page-header header-filter"},[_c('div',{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/bg20.jpg')"}}),_vm._v(" "),_c('div',{staticClass:"content-center"},[_c('div',{staticClass:"container text-left"},[_c('div',{staticClass:"content-center"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"iframe-container"},[_c('iframe',{attrs:{"height":"250","src":"https://www.youtube.com/embed/rmfmdKOLzVI?rel=0&controls=0&showinfo=0","frameborder":"0","allowfullscreen":""}})])]),_vm._v(" "),_c('div',{staticClass:"col-md-6 ml-auto mr-auto text-right"},[_c('h1',{staticClass:"title"},[_vm._v("On the run tour.")]),_vm._v(" "),_c('h4',{staticClass:"description "},[_vm._v("On the Run Tour: Beyoncé and Jay Z is a 2014\n                                            concert special which documents the September 12 and 13, 2014, shows\n                                            of American singers' Beyoncé and Jay-Z joint co-headlining venture\n                                            On the Run Tour.")])])])])])])])]),_vm._v(" "),_c('el-carousel-item',[_c('div',{staticClass:"page-header header-filter"},[_c('div',{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/bg15.jpg')"}}),_vm._v(" "),_c('div',{staticClass:"content-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"content-center"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-8 ml-auto mr-auto text-center"},[_c('h1',{staticClass:"title"},[_vm._v("Island of legends.")]),_vm._v(" "),_c('h4',{staticClass:"description "},[_vm._v("The islands of Malta and Gozo are brilliant for\n                                            a family holiday, packed with fun places to visit whatever your\n                                            children’s ages. The islands’ small size means everywhere is within\n                                            easy reach.")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('h5',[_vm._v("Connect with us on:")]),_vm._v(" "),_c('div',{staticClass:"buttons"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-danger btn-round mt-2",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-danger btn-round mt-2",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-danger btn-round mt-2",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-google-plus"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-danger btn-round  mt-2",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-instagram"})])])])])])])])])]),_vm._v(" "),_c('el-carousel-item',[_c('div',{staticClass:"page-header header-filter"},[_c('div',{staticClass:"page-header-image",staticStyle:{"background-image":"url('img/bg17.jpg')"}}),_vm._v(" "),_c('div',{staticClass:"content-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"content-center"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6 text-left"},[_c('h1',{staticClass:"title"},[_vm._v("Arctic Sea ice.")]),_vm._v(" "),_c('h4',{staticClass:"description "},[_vm._v("According to the National Oceanic and\n                                            Atmospheric Administration, Ted Scambos, NSIDC lead scientist, puts\n                                            the potentially record low maximum sea ice extent this year down to\n                                            low ice extent in the Pacific and a late drop in ice extent in the\n                                            Barents Sea.")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"buttons"},[_c('a',{staticClass:"btn btn-neutral btn-success btn-lg mr-1",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"now-ui-icons files_single-copy-04"}),_vm._v(" Read More..\n                                            ")]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-lg",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"now-ui-icons arrows-1_share-66"}),_vm._v(" Subscribe\n                                            ")])])])])])])])])])],1)],2)],2)}
var Headersvue_type_template_id_3461d138_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Headers.vue?vue&type=template&id=3461d138&

// EXTERNAL MODULE: ./node_modules/element-ui/lib/theme-chalk/carousel-item.css
var carousel_item = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/element-ui/lib/theme-chalk/base.css
var base = __webpack_require__(13);

// EXTERNAL MODULE: external "element-ui/lib/carousel-item"
var carousel_item_ = __webpack_require__(51);
var lib_carousel_item_default = /*#__PURE__*/__webpack_require__.n(carousel_item_);

// EXTERNAL MODULE: ./node_modules/element-ui/lib/theme-chalk/carousel.css
var carousel = __webpack_require__(64);

// EXTERNAL MODULE: external "element-ui/lib/carousel"
var carousel_ = __webpack_require__(52);
var lib_carousel_default = /*#__PURE__*/__webpack_require__.n(carousel_);

// EXTERNAL MODULE: ./components/index.js + 125 modules
var components = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Headers.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Headersvue_type_script_lang_js_ = ({
  components: {
    [components["b" /* Button */].name]: components["b" /* Button */],
    [components["i" /* FormGroupInput */].name]: components["i" /* FormGroupInput */],
    [lib_carousel_default.a.name]: lib_carousel_default.a,
    [lib_carousel_item_default.a.name]: lib_carousel_item_default.a
  }
});
// CONCATENATED MODULE: ./components/pages/sections/Headers.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Headersvue_type_script_lang_js_ = (Headersvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./components/pages/sections/Headers.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  sections_Headersvue_type_script_lang_js_,
  Headersvue_type_template_id_3461d138_render,
  Headersvue_type_template_id_3461d138_staticRenderFns,
  false,
  injectStyles,
  null,
  "548a1100"
  
)

/* harmony default export */ var Headers = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Features.vue?vue&type=template&id=72a3c785&
var Featuresvue_type_template_id_72a3c785_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"features"}},[_vm._ssrNode("<div class=\"features-1\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto\"><h2 class=\"title\">Full-Funnel Social Analytics</h2> <h4 class=\"description\">Insight to help you create, connect, and convert. Understand Your Audience's Interests, Influence, Interactions, and Intent. Discover emerging topics and influencers to reach new audiences.</h4></div></div> <div class=\"row\"><div class=\"col-md-4\"><div class=\"info info-hover\"><div class=\"icon icon-success\"><i class=\"now-ui-icons ui-2_chat-round\"></i></div> <h4 class=\"info-title\">Social Conversations</h4> <p class=\"description\">Gain access to the demographics, psychographics, and location of unique people.</p></div></div> <div class=\"col-md-4\"><div class=\"info info-hover\"><div class=\"icon icon-success\"><i class=\"now-ui-icons business_chart-pie-36\"></i></div> <h4 class=\"info-title\">Analyze Performance</h4> <p class=\"description\">Unify data from Facebook, Instagram, Twitter, LinkedIn, and Youtube to gain rich insights.</p></div></div> <div class=\"col-md-4\"><div class=\"info info-hover\"><div class=\"icon icon-warning\"><i class=\"now-ui-icons design-2_ruler-pencil\"></i></div> <h4 class=\"info-title\">Measure Conversions</h4> <p class=\"description\">Track actions taken on your website, understand the impact on your bottom line.</p></div></div></div></div></div> <div class=\"features-2 section-image\" style=\"background-image: url('img/bg22.jpg')\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-md-8 mr-auto ml-auto\"><h2 class=\"title\">Trello lets you work more.</h2> <h4 class=\"description text-white\">Trello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible and rewarding way.</h4></div></div> <div class=\"row\"><div class=\"col-md-4\"><div class=\"info\"><div class=\"icon icon-success icon-circle\"><i class=\"now-ui-icons users_single-02\"></i></div> <h4 class=\"info-title text-white\">Work With Any Team</h4> <p class=\"description text-white\">Whether it’s for work or even the next family vacation, Trello helps your team.</p></div></div> <div class=\"col-md-4\"><div class=\"info\"><div class=\"icon icon-danger icon-circle\"><i class=\"now-ui-icons business_chart-bar-32\"></i></div> <h4 class=\"info-title text-white\">A Productivity Platform</h4> <p class=\"description text-white\">Integrate the apps your team already uses directly into your workflow.</p></div></div> <div class=\"col-md-4\"><div class=\"info\"><div class=\"icon icon-warning icon-circle\"><i class=\"now-ui-icons arrows-1_refresh-69\"></i></div> <h4 class=\"info-title text-white\">Always In Sync</h4> <p class=\"description text-white\">No matter where you are, Trello stays in sync across all of your devices.</p></div></div></div></div></div> <div class=\"features-3\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto\"><h2 class=\"title\">Simpler. Smarter. Faster.</h2> <h4 class=\"description\">The CloudCheckr Cloud Management Platform (CMP) provides full visibility and control to reduce costs, improve cybersecurity posture, and automate critical tasks.</h4></div></div> <div class=\"row\"><div class=\"col-md-4\"><div class=\"info info-hover\"><div class=\"icon icon-success icon-circle\"><i class=\"now-ui-icons objects_globe\"></i></div> <h4 class=\"info-title\">Asset Management</h4> <p class=\"description\">Cross-account dashboards provide sophisticated reporting for enterprise.</p></div></div> <div class=\"col-md-4\"><div class=\"info info-hover\"><div class=\"icon icon-info icon-circle\"><i class=\"now-ui-icons education_atom\"></i></div> <h4 class=\"info-title\">Resource Utilization</h4> <p class=\"description\">CloudCheckr provides summary and detailed usage statistics for resources.</p></div></div> <div class=\"col-md-4\"><div class=\"info info-hover\"><div class=\"icon icon-success icon-circle\"><i class=\"now-ui-icons tech_watch-time\"></i></div> <h4 class=\"info-title\">Self-Healing</h4> <p class=\"description\">CloudCheckr enables users to save money, time, and effort.</p></div></div></div></div></div> "),_vm._ssrNode("<div class=\"features-4\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">Coming home, a pleasure!</h2> <h4 class=\"description\">Havenly is a convenient, personal and affordable way to redecorate your home room by room. Collaborate with our professional interior designers on our online platform. </h4></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{staticStyle:{"background-image":"url('img/bg24.jpg')"},attrs:{"type":"background","raised":"","color":"transparent"}},[_c('template',{slot:"info"},[_c('div',{staticClass:"icon icon-white"},[_c('i',{staticClass:"now-ui-icons business_bulb-63"})]),_vm._v(" "),_c('div',{staticClass:"description"},[_c('h4',{staticClass:"info-title"},[_vm._v("Collaborate on ideas")]),_vm._v(" "),_c('p',[_vm._v("Your designer will come back to you with an initial set of ideas.")]),_vm._v(" "),_c('a',{staticClass:"ml-3",attrs:{"href":"#pablo"}},[_vm._v("Find more...")])])])],2)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{staticStyle:{"background-image":"url('img/bg23.jpg')"},attrs:{"type":"background","raised":"","color":"transparent"}},[_c('template',{slot:"info"},[_c('div',{staticClass:"icon icon-white"},[_c('i',{staticClass:"now-ui-icons business_badge"})]),_vm._v(" "),_c('div',{staticClass:"description"},[_c('h4',{staticClass:"info-title"},[_vm._v("Pick your designer")]),_vm._v(" "),_c('p',[_vm._v("Havenly interior designers are vetted professionals and real people.")]),_vm._v(" "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Find more...")])])])],2)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{staticStyle:{"background-image":"url('img/bg25.jpg')"},attrs:{"type":"background","raised":"","color":"transparenr"}},[_c('template',{slot:"info"},[_c('div',{staticClass:"icon icon-white"},[_c('i',{staticClass:"now-ui-icons location_map-big"})]),_vm._v(" "),_c('div',{staticClass:"description"},[_c('h4',{staticClass:"info-title"},[_vm._v("Visualize your room")]),_vm._v(" "),_c('p',[_vm._v("Share a floor plan, and we'll create a visualization of your room.")]),_vm._v(" "),_c('a',{staticClass:"ml-3",attrs:{"href":"#pablo"}},[_vm._v("Find more...")])])])],2)],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"features-5\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-5\"><h2 class=\"title\">Working is a pleasure</h2> <div class=\"info info-horizontal\"><div class=\"icon icon-success icon-circle\"><i class=\"now-ui-icons location_world\"></i></div> <div class=\"description\"><h4 class=\"info-title\">Hundreds of Components</h4> <p>The moment you use Now UI Kit, you know you’ve never felt anything like it. With a single use lets you do more than ever before. </p></div></div> <div class=\"info info-horizontal\"><div class=\"icon icon-success icon-circle\"><i class=\"now-ui-icons sport_user-run\"></i></div> <div class=\"description\"><h4 class=\"info-title\">Easy to Use</h4> <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature.</p></div></div> <div class=\"info info-horizontal\"><div class=\"icon icon-success icon-circle\"><i class=\"now-ui-icons ui-2_time-alarm\"></i></div> <div class=\"description\"><h4 class=\"info-title\">Fast Prototyping</h4> <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature.</p></div></div></div> "),_vm._ssrNode("<div class=\"col-md-7\">","</div>",[_vm._ssrNode("<div class=\"tablet-container\">","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/ipad2-inverted.png'),expression:"'img/ipad2-inverted.png'"}]},[])])])],2)])]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"features-6\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">Working is a pleasure</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information.</h4></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\"><div class=\"info info-horizontal\"><div class=\"icon icon-info\"><i class=\"now-ui-icons design-2_html5\"></i></div> <div class=\"description\"><h5 class=\"info-title\">For Developers</h5> <p>The moment you use Now UI Kit, you know you’ve never felt anything like it. With a single use, this powerfull UI Kit lets you do more than ever before. </p></div></div> <div class=\"info info-horizontal\"><div class=\"icon icon-danger\"><i class=\"now-ui-icons design_palette\"></i></div> <div class=\"description\"><h4 class=\"info-title\">For Designers</h4> <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p></div></div></div> "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_vm._ssrNode("<div class=\"phone-container\">","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/iphone2.png'),expression:"'img/iphone2.png'"}]},[])])]),_vm._ssrNode(" <div class=\"col-md-4\"><div class=\"info info-horizontal\"><div class=\"icon icon-success\"><i class=\"now-ui-icons design-2_ruler-pencil\"></i></div> <div class=\"description\"><h5 class=\"info-title\">Bootstrap Grid</h5> <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p></div></div> <div class=\"info info-horizontal\"><div class=\"icon icon-success\"><i class=\"now-ui-icons files_single-copy-04\"></i></div> <div class=\"description\"><h4 class=\"info-title\">Example Pages Included</h4> <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p></div></div></div>")],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"features-7 section-image\" style=\"background-image: url('img/bg11.jpg')\">","</div>",[_vm._ssrNode("<div class=\"col-md-8 mr-auto ml-auto text-center\"><h2 class=\"title\">Working is a pleasure</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information.</h4></div> "),_vm._ssrNode("<div class=\"container-fluid\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6 px-0\"><div class=\"col-sm-12\"><div class=\"info info-horizontal\"><div class=\"icon\"><i class=\"now-ui-icons design-2_html5\"></i></div> <div class=\"description\"><h5 class=\"info-title\">For Developers</h5> <p class=\"description\">The moment you use Now UI Kit, you know you’ve never felt anything like it. With a single use, this powerfull UI Kit lets you do more than ever before. </p></div></div> <div class=\"info info-horizontal\"><div class=\"icon\"><i class=\"now-ui-icons design_palette\"></i></div> <div class=\"description\"><h5 class=\"info-title\">For Designers</h5> <p class=\"description\">The moment you use Now UI Kit, you know you’ve never felt anything like it. With a single use, this powerfull UI Kit lets you do more than ever before. </p></div></div> <div class=\"info info-horizontal\"><div class=\"icon\"><i class=\"now-ui-icons design-2_ruler-pencil\"></i></div> <div class=\"description\"><h5 class=\"info-title\">For Artists</h5> <p class=\"description\">The moment you use Now UI Kit, you know you’ve never felt anything like it. With a single use, this powerfull UI Kit lets you do more than ever before. </p></div></div></div></div> "),_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_vm._ssrNode("<div class=\"image-container\">","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/ipad3.png'),expression:"'img/ipad3.png'"}],attrs:{"alt":""}},[])])])],2)])],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"features-8 section-image\" style=\"background-image: url('img/bg30.jpg')\">","</div>",[_vm._ssrNode("<div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">Working is a pleasure</h2> <h4 class=\"description\">Woodpecker.co is a follow-up automation SaaS founded in 2015. We’re an international team of 17, speaking 4 languages. Our mission is to enable all B2B companies to connect with their Ideal Customers.</h4></div> "),_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',[_c('img',{staticClass:"rounded",attrs:{"slot":"image","src":"img/bg28.jpg","alt":""},slot:"image"}),_vm._v(" "),_c('div',{staticClass:"info text-center"},[_c('div',{staticClass:"icon"},[_c('i',{staticClass:"now-ui-icons ui-1_email-85"})]),_vm._v(" "),_c('h4',{staticClass:"info-title"},[_vm._v("Reply detection")]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v("If you get a reply, further follow-ups are automatically stopped.")])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',[_c('img',{staticClass:"rounded",attrs:{"slot":"image","src":"img/bg26.jpg","alt":""},slot:"image"}),_vm._v(" "),_c('div',{staticClass:"info text-center"},[_c('div',{staticClass:"icon"},[_c('i',{staticClass:"now-ui-icons ui-1_calendar-60"})]),_vm._v(" "),_c('h4',{staticClass:"info-title"},[_vm._v("Follow-up")]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v("Just set a number of days that you want send a follow-up. ")])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',[_c('img',{staticClass:"rounded",attrs:{"slot":"image","src":"img/bg27.jpg","alt":""},slot:"image"}),_vm._v(" "),_c('div',{staticClass:"info text-center"},[_c('div',{staticClass:"icon"},[_c('i',{staticClass:"now-ui-icons ui-1_send"})]),_vm._v(" "),_c('h4',{staticClass:"info-title"},[_vm._v("Cold email")]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v("Unlimited number of prospects daily with personalized emails.")])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',[_c('img',{staticClass:"rounded",attrs:{"slot":"image","src":"img/bg29.jpg","alt":""},slot:"image"}),_vm._v(" "),_c('div',{staticClass:"info text-center"},[_c('div',{staticClass:"icon"},[_c('i',{staticClass:"now-ui-icons ui-2_like"})]),_vm._v(" "),_c('h4',{staticClass:"info-title"},[_vm._v("Teamwork")]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v("You and your teammates won’t address the same person twice. ")])])])],1)],2)])],2)],2)}
var Featuresvue_type_template_id_72a3c785_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Features.vue?vue&type=template&id=72a3c785&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Features.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Featuresvue_type_script_lang_js_ = ({
  components: {
    Card: components["c" /* Card */]
  }
});
// CONCATENATED MODULE: ./components/pages/sections/Features.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Featuresvue_type_script_lang_js_ = (Featuresvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./components/pages/sections/Features.vue



function Features_injectStyles (context) {
  
  
}

/* normalize component */

var Features_component = Object(componentNormalizer["a" /* default */])(
  sections_Featuresvue_type_script_lang_js_,
  Featuresvue_type_template_id_72a3c785_render,
  Featuresvue_type_template_id_72a3c785_staticRenderFns,
  false,
  Features_injectStyles,
  null,
  "49136a9a"
  
)

/* harmony default export */ var Features = (Features_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Blogs.vue?vue&type=template&id=bb706cc2&
var Blogsvue_type_template_id_bb706cc2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"blogs"}},[_vm._ssrNode("<div id=\"blogs-1\" class=\"blogs-1\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-10 ml-auto mr-auto\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Latest Blogposts</h2> <br> "),_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"row",attrs:{"slot":"image"},slot:"image"},[_c('div',{staticClass:"col-md-5"},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog4.jpg"}})]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('h6',{staticClass:"category text-info"},[_vm._v("Enterprise")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Warner Music Group buys concert discovery service Songkick")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                    Warner Music Group announced today it’s acquiring the selected assets of the music platform Songkick, including its app for finding concerts and the company’s trademark. Songkick has been involved in a lawsuit against the major…\n                                    "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v(" Read More ")])]),_vm._v(" "),_c('p',{staticClass:"author"},[_vm._v("\n                                    by\n                                    "),_c('a',{attrs:{"href":"#pablo"}},[_c('b',[_vm._v("Sarah Perez")])]),_vm._v(", 2 days ago\n                                ")])])])]),_vm._ssrNode(" "),_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-7"},[_c('h6',{staticClass:"category text-danger"},[_c('i',{staticClass:"now-ui-icons now-ui-icons media-2_sound-wave"}),_vm._v(" Startup\n                                ")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Insticator raises $5.2M to help publishers")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                    Insticator is announcing that it has raised $5.2 million in Series A funding. The startup allows online publishers to add quizzes, polls and other interactive elements (either created by Insticator or by the publisher themselves) to their stories.\n                                    "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v(" Read More ")])]),_vm._v(" "),_c('p',{staticClass:"author"},[_vm._v("\n                                    by\n                                    "),_c('a',{attrs:{"href":"#pablo"}},[_c('b',[_vm._v("Anthony Ha")])]),_vm._v(", 5 days ago\n                                ")])]),_vm._v(" "),_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img img-raised rounded\n                            ",attrs:{"src":"img/examples/card-blog6.jpg"}})])])])])],2)])])]),_vm._ssrNode(" "),_vm._ssrNode("<div id=\"blogs-2\" class=\"blogs-2\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-10 ml-auto mr-auto\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Latest Blogposts 2</h2> <br> "),_vm._ssrNode("<div class=\"row justify-content-center\">","</div>",[_vm._ssrNode("<div class=\"col-md-5\">","</div>",[_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog7.jpg"}})])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('h6',{staticClass:"category text-info"},[_vm._v("Enterprise")]),_vm._v(" "),_c('h5',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Alexa brings hands-free TV to more devices")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Alexa’s latest trick is offering a hands-free TV viewing experience, that will allow consumers to turn on or off their television, change inputs, fast forward, rewind and more, without having to first invoke a specific skill, or even press a button on their remote.\n                                        "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Read More ")])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-5\">","</div>",[_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog9.jpg"}})])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('h6',{staticClass:"category text-success"},[_vm._v("\n                                        M&A\n                                    ")]),_vm._v(" "),_c('h5',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Uber, Yandex combine ridesharing and UberEATS in $3.72B. JV")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        As Uber works through a huge amount of internal management turmoil, the company is also consolidating and rationalizing more of its international business. Today, the company announced it will be combining its rides-on-demand business and UberEATS.\n                                        "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Read More")])])])])],1)],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"row justify-content-center\">","</div>",[_vm._ssrNode("<div class=\"col-md-5\">","</div>",[_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog16.jpg"}})])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('h6',{staticClass:"category text-info"},[_vm._v("Music")]),_vm._v(" "),_c('h5',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("The Affect Music Has On Different Teens")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Music is something that every person has his or her own specific opinion about. Different people have different taste, and various types of music have many ways of leaving an impact on someone.\n                                        "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Read More ")])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-5\">","</div>",[_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog15.jpg"}})])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('h6',{staticClass:"category text-success"},[_vm._v("\n                                        Broadcasting\n                                    ")]),_vm._v(" "),_c('h5',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Radio networks to broadcast a common radio format")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Radio broadcasting is a unidirectional wireless transmission over radio waves intended to reach a wide audience. Stations can be linked in radio networks to broadcast a common radio format.\n                                        "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v(" Read More ")])])])])],1)],2)],2)])])]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"blogs-3\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-10 ml-auto mr-auto\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Latest Blogposts 3</h2> <br> "),_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-4"},[_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog10.jpg"}})])]),_vm._v(" "),_c('div',{staticClass:"col-md-8"},[_c('h3',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Rover raised $65 million for pet sitting")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                    Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover, which raised $65 million to expand its pet sitting and dog-walking businesses..\n                                    "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v(" Read More ")])]),_vm._v(" "),_c('div',{staticClass:"author"},[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/olivia.jpg'),expression:"'img/olivia.jpg'"}],staticClass:"avatar img-raised",attrs:{"alt":"..."}}),_vm._v(" "),_c('span',[_vm._v("Katie Roof")])])])])]),_vm._ssrNode(" "),_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-4"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog11.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-8"},[_c('h3',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("MateLabs mixes machine learning with IFTTT")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                    If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with a new offering from MateLabs. MateVerse, a platform where novices can spin out machine...\n                                    "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v(" Read More ")])]),_vm._v(" "),_c('div',{staticClass:"author"},[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/james.jpg'),expression:"'img/james.jpg'"}],staticClass:"avatar img-raised",attrs:{"alt":"..."}}),_vm._v(" "),_c('span',[_vm._v("John Mannes")])])])])]),_vm._ssrNode(" "),_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-4"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog12.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-8"},[_c('h3',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("US venture investment ticks up in Q2 2017")])]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                    Venture investment in U.S. startups rose sequentially in the second quarter of 2017, boosted by large, late-stage financings and a few outsized early-stage rounds in tech and healthcare..\n                                    "),_c('a',{attrs:{"href":"#pablo"}},[_vm._v(" Read More ")])]),_vm._v(" "),_c('div',{staticClass:"author"},[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/michael.jpg'),expression:"'img/michael.jpg'"}],staticClass:"avatar img-raised",attrs:{"alt":"..."}}),_vm._v(" "),_c('span',[_vm._v("Devin Coldewey")])])])])])],2)])])]),_vm._ssrNode(" "),_vm._ssrNode("<div id=\"blogs-4\" class=\"blogs-4\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-8 ml-auto mr-auto\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Latest Blogposts 4</h2> <br> "),_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog13.jpg"}})])]),_vm._v(" "),_c('h6',{staticClass:"category text-info"},[_vm._v("Fashion")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Groupon Moves Into Flash Fashion")])]),_vm._v(" "),_c('h5',{staticClass:"card-description"},[_vm._v("\n                            More acquisitions for Groupon to widen the net of consumers using its platform for more than daily deals. Today it is announcing the acquisition of ideeli, a flash fashion retailer, for $43 million in...\n                        ")]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-round",attrs:{"href":"#pablo"}},[_vm._v("Read More")])]),_vm._ssrNode(" "),_c('card',{attrs:{"type":"blog","plain":""}},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/examples/card-blog14.jpg"}})])]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Entertainment")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("When music and technology collide")])]),_vm._v(" "),_c('h5',{staticClass:"card-description"},[_vm._v("\n                            Some might say that technology is killing the music industry. But if you look around, there’s a beautiful marriage there — the music industry is evolving every day, and artists are embracing technology in new and innovative ways...\n                        ")]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-round",attrs:{"href":"#pablo"}},[_vm._v(" Read More")])])],2)])])]),_vm._ssrNode(" "),_vm._ssrNode("<div data-background-color=\"gray\" class=\"blogs-5\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-10 ml-auto mr-auto\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Latest Blogposts 5</h2> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_vm._ssrNode("<div class=\"card card-blog\">","</div>",[_vm._ssrNode("<div class=\"card-image\"><a href=\"#pablo\"><img src=\"img/card-blog2.jpg\" class=\"img rounded\"></a></div> "),_vm._ssrNode("<div class=\"card-body\">","</div>",[_vm._ssrNode("<h6 class=\"category text-success\">Features</h6> <h5 class=\"card-title\">\n                                        That’s One Way To Ditch Your Passenger\n                                    </h5> <p class=\"card-description\">\n                                        As near as we can tell, this guy must have thought he was going over backwards and tapped the rear...\n                                    </p> "),_vm._ssrNode("<div class=\"card-footer\">","</div>",[_vm._ssrNode("<div class=\"author\">","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/julie.jpg'),expression:"'img/julie.jpg'"}],staticClass:"avatar img-raised",attrs:{"alt":"..."}},[]),_vm._ssrNode(" <span>Mike John</span>")],2),_vm._ssrNode(" <div class=\"stats stats-right\"><i class=\"now-ui-icons tech_watch-time\"></i> 5 min read\n                                        </div>")],2)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_vm._ssrNode("<div class=\"card card-blog\">","</div>",[_vm._ssrNode("<div class=\"card-image\"><a href=\"#pablo\"><img src=\"img/examples/card-blog18.jpg\" class=\"img rounded\"></a></div> "),_vm._ssrNode("<div class=\"card-body\">","</div>",[_vm._ssrNode("<h6 class=\"category text-danger\">Animals</h6> <h5 class=\"card-title\">\n                                        Shark Week: How to Watch It Like a Scientist\n                                    </h5> <p class=\"card-description\">\n                                        Just when you thought it was safe to turn on your television, the Discovery Channel's &quot;Shark Week&quot;...\n                                    </p> "),_vm._ssrNode("<div class=\"card-footer\">","</div>",[_vm._ssrNode("<div class=\"author\">","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/julie.jpg'),expression:"'img/julie.jpg'"}],staticClass:"avatar img-raised",attrs:{"alt":"..."}},[]),_vm._ssrNode(" <span>Mike John</span>")],2),_vm._ssrNode(" <div class=\"stats stats-right\"><i class=\"now-ui-icons tech_watch-time\"></i> 5 min read\n                                        </div>")],2)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_vm._ssrNode("<div class=\"card card-blog\">","</div>",[_vm._ssrNode("<div class=\"card-image\"><a href=\"#pablo\"><img src=\"img/examples/card-blog17.jpg\" class=\"img rounded\"></a></div> "),_vm._ssrNode("<div class=\"card-body\">","</div>",[_vm._ssrNode("<h6 class=\"category text-success\">Cars</h6> <h5 class=\"card-title\">\n                                        Who's Afraid of the Self-Driving Car?\n                                    </h5> <p class=\"card-description\">\n                                        It's been 60 years since the cover of Popular Mechanics magazine gave us the promise of flying cars...\n                                    </p> "),_vm._ssrNode("<div class=\"card-footer\">","</div>",[_vm._ssrNode("<div class=\"author\">","</div>",[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:('img/olivia.jpg'),expression:"'img/olivia.jpg'"}],staticClass:"avatar img-raised",attrs:{"alt":"..."}},[]),_vm._ssrNode(" <span>Johanna Zmud</span>")],2),_vm._ssrNode(" <div class=\"stats stats-right\"><i class=\"now-ui-icons ui-2_favourite-28\"></i> 2.4K\n                                        </div>")],2)],2)],2)])],2)],2)])])])],2)}
var Blogsvue_type_template_id_bb706cc2_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Blogs.vue?vue&type=template&id=bb706cc2&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Blogs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Blogsvue_type_script_lang_js_ = ({
  components: {
    Card: components["c" /* Card */]
  }
});
// CONCATENATED MODULE: ./components/pages/sections/Blogs.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Blogsvue_type_script_lang_js_ = (Blogsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./components/pages/sections/Blogs.vue



function Blogs_injectStyles (context) {
  
  
}

/* normalize component */

var Blogs_component = Object(componentNormalizer["a" /* default */])(
  sections_Blogsvue_type_script_lang_js_,
  Blogsvue_type_template_id_bb706cc2_render,
  Blogsvue_type_template_id_bb706cc2_staticRenderFns,
  false,
  Blogs_injectStyles,
  null,
  "3ef1b98b"
  
)

/* harmony default export */ var Blogs = (Blogs_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Teams.vue?vue&type=template&id=01830423&
var Teamsvue_type_template_id_01830423_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"teams"}},[_vm._ssrNode("<div class=\"team-1\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">Our Awesome Team 1</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your team.\n                        Keep you user engaged by providing meaningful information.</h4></div></div> "),_vm._ssrNode("<div class=\"row justify-content-center\">","</div>",[_vm._ssrNode("<div class=\"col-md-4 ml-1\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/james.jpg"},slot:"avatar"}),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Oliver Atticus")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Web Developer")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            If you want to know what a man's like, take a good look at how he treats his inferiors,\n                            not his equals.\n                        ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4 mr-1\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/michael.jpg"},slot:"avatar"}),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Smith College")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("CEO / Co-Founder")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Two things are infinite: the universe and human stupidity; and I'm not sure about the\n                            universe.\n                        ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-google"})])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4 ml-1 mt-4\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/emily.jpg"},slot:"avatar"}),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Sophia Madison")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Entrepreneur")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Be who you are and say what you feel, because those who mind don't matter, and those who\n                            matter don't mind.\n                        ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-linkedin"})])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4 mr-1 mt-4\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/olivia.jpg"},slot:"avatar"}),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Emily Chloe")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Entrepreneur")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            You know you're in love when you can't fall asleep because reality is finally better\n                            than your dreams.\n                        ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-google"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-success btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})])])])],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"team-2\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">The Executive Team 2</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your team.\n                        Keep you user engaged by providing meaningful information.</h4></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"image","src":"img/examples/card-profile1.jpg"},slot:"image"}),_vm._v(" "),_c('h4',{staticClass:"card-title"},[_vm._v("Sofia Scarlett")]),_vm._v(" "),_c('h6',{staticClass:"category"},[_vm._v("Account Manager")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-twitter btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-facebook btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-dribbble btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"image","src":"img/examples/card-profile2.jpg"},slot:"image"}),_vm._v(" "),_c('h4',{staticClass:"card-title"},[_vm._v("Lucas Jacob")]),_vm._v(" "),_c('h6',{staticClass:"category"},[_vm._v("Aerospace Engineer")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-dribbble btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-facebook btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"image","src":"img/examples/card-profile3.jpg"},slot:"image"}),_vm._v(" "),_c('h4',{staticClass:"card-title"},[_vm._v("Amelia Charlotte")]),_vm._v(" "),_c('h6',{staticClass:"category"},[_vm._v("Photographer")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-linkedin btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-linkedin"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-twitter btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-dribbble btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})])])])],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"team-3 section-image\" style=\"background-image: url('img/project21.jpg')\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">The Executive Team 3</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your team.\n                        Keep you user engaged by providing meaningful information.</h4></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-xl-6 col-lg-7 ml-auto mr-auto\">","</div>",[_c('card',{attrs:{"type":"profile"}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img",attrs:{"src":"img/olivia.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h3',{staticClass:"card-title"},[_vm._v("Ariana Hazel")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v(" Fashion Designer")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Happiness resides not in possessions, and not in gold, happiness dwells in\n                                        the soul...\n                                    ")])])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-xl-6 col-lg-7 ml-auto mr-auto\">","</div>",[_c('card',{attrs:{"type":"profile"}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img",attrs:{"src":"img/james.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h3',{staticClass:"card-title"},[_vm._v("Ryan Samuel")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Financial Examiner")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Today you are you! That is truer than true! There is no one alive who is\n                                        you-er than you!..\n                                    ")])])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-xl-6 col-lg-7 ml-auto mr-auto\">","</div>",[_c('card',{attrs:{"type":"profile"}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img",attrs:{"src":"img/michael.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h3',{staticClass:"card-title"},[_vm._v("Joshua Jackson")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Landscape Architect")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Success is not final, failure is not fatal: it is the courage to continue\n                                        that counts...\n                                    ")])])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-xl-6 col-lg-7 ml-auto mr-auto\">","</div>",[_c('card',{attrs:{"type":"profile"}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img",attrs:{"src":"img/emily.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h3',{staticClass:"card-title"},[_vm._v("Nora Hazel")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Legal Secretary")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Do not dwell in the past, do not dream of the future, concentrate the\n                                        mind...\n                                    ")])])])])])],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"team-4\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">The Executive Team 4</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your team.\n                        Keep you user engaged by providing meaningful information.</h4></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/olivia.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h4',{staticClass:"card-title"},[_vm._v("Ella Evelyn")]),_vm._v(" "),_c('h6',{staticClass:"category"},[_vm._v("Air Crew Member")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Think in the morning. Act in the noon. Eat in the evening. Sleep in the\n                                        night......\n                                    ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-twitter",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-facebook",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-google",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-google"})])])])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/emily.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h4',{staticClass:"card-title"},[_vm._v("Mila Skylar")]),_vm._v(" "),_c('h6',{staticClass:"category"},[_vm._v("Architect")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Love cures people - both the ones who give it and the ones who receive it...\n                                    ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-linkedin",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-linkedin"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-facebook",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-dribbble",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-google",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-google"})])])])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/james.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h4',{staticClass:"card-title"},[_vm._v("Daniel Carter")]),_vm._v(" "),_c('h6',{staticClass:"category"},[_vm._v("Aviation Inspector")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        Keep your face always toward the sunshine - and shadows will fall behind\n                                        you...\n                                    ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-youtube",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-youtube"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-twitter",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-instagram",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-instagram"})])])])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"profile","plain":""}},[_c('div',{staticClass:"row",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('div',{staticClass:"col-md-5"},[_c('div',{staticClass:"card-image"},[_c('a',{attrs:{"href":"#pablo"}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"src":"img/michael.jpg"}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-7"},[_c('div',{staticClass:"card-body"},[_c('h4',{staticClass:"card-title"},[_vm._v("Dylan Wyatt")]),_vm._v(" "),_c('h6',{staticClass:"category"},[_vm._v("Conservation Scientist")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                                        There is only one corner of the universe you can be certain of improving,\n                                        and that's your own self...\n                                    ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-linkedin",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-linkedin"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-facebook",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-facebook-square"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-google",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-google"})])])])])])])],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"team-5 section-image\" style=\"background-image: url('img/project9.jpg')\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">The Executive Team 5</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your team.\n                        Keep you user engaged by providing meaningful information.</h4></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"profile"}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/olivia.jpg"},slot:"avatar"}),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Natalie Paisley")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Credit Analyst")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Very little is needed to make a happy life; it is all within yourself, in your way\n                            of thinking...\n                        ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-linkedin"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"profile"}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/james.jpg"},slot:"avatar"}),_vm._v(" "),_c('h4',{staticClass:"card-title"},[_vm._v("Anthony Jackson")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Desktop Publisher")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Let us be grateful to people who make us happy, they are the charming gardeners who\n                            make our souls blossom...\n                        ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"profile"}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/emily.jpg"},slot:"avatar"}),_vm._v(" "),_c('h4',{staticClass:"card-title"},[_vm._v("Bella Audrey")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Economist")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            For it was not into my ear you whispered, but into my heart. It was not my lips you\n                            kissed, but my soul...\n                        ")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-dribbble"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-twitter"})]),_vm._v(" "),_c('a',{staticClass:"btn btn-icon btn-neutral btn-round",attrs:{"href":"#pablo"}},[_c('i',{staticClass:"fab fa-pinterest"})])])])],1)],2)],2)])],2)}
var Teamsvue_type_template_id_01830423_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Teams.vue?vue&type=template&id=01830423&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Teams.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Teamsvue_type_script_lang_js_ = ({
  components: {
    Card: components["c" /* Card */]
  }
});
// CONCATENATED MODULE: ./components/pages/sections/Teams.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Teamsvue_type_script_lang_js_ = (Teamsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./components/pages/sections/Teams.vue



function Teams_injectStyles (context) {
  
  
}

/* normalize component */

var Teams_component = Object(componentNormalizer["a" /* default */])(
  sections_Teamsvue_type_script_lang_js_,
  Teamsvue_type_template_id_01830423_render,
  Teamsvue_type_template_id_01830423_staticRenderFns,
  false,
  Teams_injectStyles,
  null,
  "0b81b8a0"
  
)

/* harmony default export */ var Teams = (Teams_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Projects.vue?vue&type=template&id=80f063a4&
var Projectsvue_type_template_id_80f063a4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"projects"}},[_vm._ssrNode("<div class=\"projects-1\">","</div>",[_vm._ssrNode("<div class=\"container-fluid\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-8 ml-auto mr-auto text-center\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Some of Our Awesome Products - 1</h2> "),_c('tabs',{attrs:{"type":"danger","centered":"","pills":""}},[_c('tab-pane',{attrs:{"label":"All"}}),_vm._v(" "),_c('tab-pane',{attrs:{"label":"History"}}),_vm._v(" "),_c('tab-pane',{attrs:{"label":"Satire"}}),_vm._v(" "),_c('tab-pane',{attrs:{"label":"Fiction"}})],1)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_c('card',{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project1.jpg')"},attrs:{"type":"background"}},[_c('h6',{staticClass:"category"},[_vm._v("History")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("\n                            The City Lost & Found\n                        ")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Developed on the occasion of an exhibition of the same name, The City Lost & Found:\n                            Capturing New York...\n                        ")]),_vm._v(" "),_c('n-button',{attrs:{"type":"danger","round":""}},[_c('i',{staticClass:"now-ui-icons ui-1_send"}),_vm._v(" View Book\n                        ")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_c('card',{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project18.jpg')"},attrs:{"type":"background","raised":""}},[_c('h6',{staticClass:"category"},[_vm._v("Satire")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("A Confederacy of Dunces")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Satires, in the most basic definition, are works making fun of some sort of person or\n                            institution...\n                        ")]),_vm._v(" "),_c('n-button',{attrs:{"type":"neutral","round":""}},[_c('i',{staticClass:"now-ui-icons ui-1_send"}),_vm._v(" View more\n                        ")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_c('card',{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project20.jpg')"},attrs:{"type":"background"}},[_c('h6',{staticClass:"category"},[_vm._v("Fiction")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("The Sun Also Rises")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            The most commonly read works are works of fiction. Fiction books are ones that have been\n                            made up...\n                        ")]),_vm._v(" "),_c('n-button',{attrs:{"type":"neutral","round":""}},[_c('i',{staticClass:"now-ui-icons ui-1_send"}),_vm._v(" Read Now\n                        ")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_c('card',{staticClass:"card-background-product card-no-shadow",staticStyle:{"background-image":"url('img/project19.jpg')"},attrs:{"type":"background"}},[_c('h6',{staticClass:"category"},[_vm._v("Basic Civitas")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("The Right Mistake")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Living in South Central L.A., Socrates Fortlow is a sixty-year-old ex-convict, still\n                            strong enough to kill men with...\n                        ")]),_vm._v(" "),_c('n-button',{attrs:{"type":"danger","round":""}},[_c('i',{staticClass:"now-ui-icons ui-1_send"}),_vm._v(" Read Now\n                        ")])],1)],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"projects-2\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h6 class=\"text-muted\">Our work</h6> <h2 class=\"title\">Some of Our Awesome Products - 2</h2> <h5 class=\"description\">This is the paragraph where you can write more details about your\n                        projects. Keep you user engaged by providing meaningful information.</h5> <div class=\"section-space\"></div></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"plain":""}},[_c('a',{attrs:{"slot":"image","href":"https:///www.creative-tim.com/product/now-ui-kit","target":"_blank"},slot:"image"},[_c('img',{staticClass:"img-raised rounded",attrs:{"src":"https:///s3.amazonaws.com/creativetim_bucket/products/38/original/opt_mk_thumbnail.jpg?1458052306"}})]),_vm._v(" "),_c('a',{attrs:{"href":"https:///www.creative-tim.com/product/now-ui-kit","target":"_blank"}},[_c('h4',{staticClass:"card-title"},[_vm._v("Now UI Kit Free")])]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Free UI Kit")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Now UI Kit is a Free Bootstrap UI Kit with a fresh, new design inspired by Google's\n                            material design. It's a great pleasure to introduce to you the material concepts in\n                            an easy to use and beautiful set of components.\n                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"plain":""}},[_c('a',{attrs:{"slot":"image","href":"https:///www.creative-tim.com/product/light-bootstrap-dashboard-pro","target":"_blank"},slot:"image"},[_c('img',{staticClass:"img-raised rounded",attrs:{"src":"https:///s3.amazonaws.com/creativetim_bucket/products/34/original/opt_lbd_pro_thumbnail.jpg?1449352503"}})]),_vm._v(" "),_c('a',{attrs:{"href":"https:///www.creative-tim.com/product/light-bootstrap-dashboard-pro","target":"_blank"}},[_c('h4',{staticClass:"card-title"},[_vm._v("Light Bootstrap Dashboard")])]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Premium Template")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Light Bootstrap Dashboard PRO is a Bootstrap Admin Theme designed to look simple and\n                            beautiful. Forget about boring dashboards and grab yourself a copy to kickstart new\n                            project!\n                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"plain":""}},[_c('a',{attrs:{"slot":"image","href":"https:///www.creative-tim.com/product/get-shit-done-pro","target":"_blank"},slot:"image"},[_c('img',{staticClass:"img-raised rounded",attrs:{"src":"https:///s3.amazonaws.com/creativetim_bucket/products/26/original/opt_gsdk_new_thumbnail.jpg"}})]),_vm._v(" "),_c('a',{attrs:{"href":"https:///www.creative-tim.com/product/get-shit-done-pro","target":"_blank"}},[_c('h4',{staticClass:"card-title"},[_vm._v("Get Shit Done Kit PRO")])]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Premium UI Kit")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Get Shit Done Kit Pro it's a Bootstrap Kit that comes with a huge number of\n                            customisable components. They are pixel perfect, light and easy to use and combine\n                            with other elements.\n                        ")])])],1)],2)],2)]),_vm._ssrNode(" <div data-background-color=\"black\" class=\"projects-3\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h6 class=\"category text-muted\">Our work</h6> <h2 class=\"title\">Some of Our Awesome Projects - 3</h2></div></div> <div class=\"section-story-overview\"><div class=\"row\"><div class=\"col-md-6\"><div class=\"image-container image-left\" style=\"background-image: url('img/project4.jpg')\"><p class=\"blockquote blockquote-success\">&quot;Amber Interiors is available to assist in all\n                                aspects of a project from start to finish including consulting with Architects and\n                                Builders&quot;\n                            </p></div></div> <div class=\"col-md-5\"><div class=\"image-container image-right\" style=\"background-image: url('img/project21.jpg')\"></div> <h6 class=\"category text-success\">Design</h6> <h4 class=\"card-title\">Coco Kelley</h4> <p>\n                            Amber Lewis’s interior design blog takes you inside the creative workings of her Los\n                            Angeles–based studio. Keep an eye on this website for an industry insider’s point of\n                            view.\n                        </p></div></div></div> <div class=\"section-story-overview\"><div class=\"row\"><div class=\"col-md-6\"><div class=\"image-container image-left\" style=\"background-image: url('img/project24.jpg')\"><p class=\"blockquote blockquote-success\">&quot;We provide a simple, approachable way to\n                                decorate your desired space with ease. Each e-décor is completely individualized&quot;\n                            </p></div></div> <div class=\"col-md-5\"><div class=\"image-container image-right\" style=\"background-image: url('img/project23.jpg')\"></div> <h6 class=\"category text-success\">E-Decor</h6> <h4 class=\"card-title\">Red Trad</h4> <p>\n                            We designed this new build family home located in Santa Monica with a mission to make\n                            the large size of the property, feel cozy, collected, and unique.\n                        </p></div></div></div></div></div> "),_vm._ssrNode("<div data-background-color=\"gray\" class=\"projects-4\">","</div>",[_vm._ssrNode("<div class=\"container-fluid\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 mr-auto ml-auto text-center\"><h6 class=\"category text-muted\">Our work</h6> <h2 class=\"title\">Some of Our Awesome Projects - 4</h2></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_c('card',{staticClass:"card-fashion",staticStyle:{"background-image":"url('img/project14.jpg')"},attrs:{"type":"background"}},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"card-title text-left"},[_c('h2',[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("\n                                        The “crazy idea that could lead to a big future commission” project.\n                                    ")])])]),_vm._v(" "),_c('div',{staticClass:"card-footer text-left"},[_c('div',{staticClass:"stats"},[_c('span',[_c('i',{staticClass:"now-ui-icons objects_globe"}),_vm._v("The “Crazy idea” project\n                                        ")])])])])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_vm._ssrNode("<div class=\"card-container\">","</div>",[_vm._ssrNode("<div class=\"card card-fashion\"><div class=\"card-title\"><a href=\"#pablo\"><h4><a href=\"#pablo\">\n                                            The next time you’re on vacation, take advantage of all the work you can\n                                            get done...\n                                        </a></h4></a></div> <div class=\"card-body\"><div class=\"card-footer\"><div class=\"stats\"><span><i class=\"now-ui-icons education_paper\"></i> The “I’m on vacation” project\n                                            </span></div></div></div></div> "),_c('card',{staticClass:"card-fashion",staticStyle:{"background-image":"url('img/project15.jpg')"},attrs:{"type":"background"}})],2)])],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_vm._ssrNode("<div class=\"card-container\">","</div>",[_c('card',{staticClass:"card-fashion",staticStyle:{"background-image":"url('img/project17.jpg')"},attrs:{"type":"background"}}),_vm._ssrNode(" <div class=\"card card-fashion arrow-left\"><div class=\"card-title\"><h4><a href=\"#pablo\">\n                                        The elements of Agile Project Management have been around for decades...\n                                    </a></h4></div> <div class=\"card-body\"><div class=\"card-footer\"><div class=\"stats\"><span><i class=\"now-ui-icons design_app\"></i>The &quot;Agile Project&quot; project\n                                            </span></div></div></div></div>")],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6 px-0\">","</div>",[_c('card',{staticClass:"card-fashion",staticStyle:{"background-image":"url('img/project16.jpg')"},attrs:{"type":"background"}},[_c('div',{staticClass:"card-title text-left"},[_c('h2',[_c('a',{attrs:{"href":"#pablo"}},[_vm._v("Performing a Project Premortem")])])]),_vm._v(" "),_c('div',{staticClass:"card-footer text-left"},[_c('div',{staticClass:"stats"},[_c('span',[_c('i',{staticClass:"now-ui-icons media-2_sound-wave"}),_vm._v("The \"Premortem\" project\n                                ")])])])])],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"projects-5\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-8 ml-auto mr-auto text-center\"><h2 class=\"title\">Some of Our Awesome Projects - 5</h2> <h4 class=\"description\">This is the paragraph where you can write more details about your\n                        projects. Keep you user engaged by providing meaningful information.</h4> <div class=\"section-space\"></div></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-5 ml-auto\">","</div>",[_c('card',{staticClass:"card-background-product",staticStyle:{"background-image":"url('img/project8.jpg')"},attrs:{"type":"background","raised":""}},[_c('h2',{staticClass:"card-title"},[_vm._v("Social Analytics")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Insight to help you create, connect, and convert. Understand Your Audience's\n                            Interests, Influence, Interactions, and Intent. Discover emerging topics and\n                            influencers to reach new audiences.\n                        ")]),_vm._v(" "),_c('badge',{attrs:{"type":"neutral"}},[_vm._v("Analytics")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-5 mr-auto\">","</div>",[_c('info-section',{attrs:{"type":"danger","icon":"now-ui-icons ui-2_chat-round","title":"Listen to Social Conversations","description":"Gain access to the demographics, psychographics, and location of unique people who talk about your brand."}}),_vm._ssrNode(" "),_c('info-section',{attrs:{"type":"danger","icon":"now-ui-icons business_chart-pie-36","title":"Performance Analyze","description":"Unify data from Facebook, Instagram, Twitter, LinkedIn, and Youtube to gain rich insights from easy-to-use reports."}}),_vm._ssrNode(" "),_c('info-section',{attrs:{"type":"danger","icon":"now-ui-icons design-2_ruler-pencil","title":"Social Conversions","description":"Track actions taken on your website that originated from social, and understand the impact on your bottom line."}})],2)],2),_vm._ssrNode(" <hr> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-5 ml-auto mt-5\">","</div>",[_c('info-section',{attrs:{"type":"warning","icon":"now-ui-icons users_single-02","title":"Work With Any Team","description":"Whether it’s for work or even the next family vacation, Trello helps your team."}}),_vm._ssrNode(" "),_c('info-section',{attrs:{"type":"warning","icon":"now-ui-icons business_chart-bar-32","title":"A Productivity Platform","description":"Integrate the apps your team already uses directly into your workflow."}}),_vm._ssrNode(" "),_c('info-section',{attrs:{"type":"warning","icon":"now-ui-icons arrows-1_refresh-69","title":"Always In Sync","description":"No matter where you are, Trello stays in sync across all of your devices."}})],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-5 mr-auto\">","</div>",[_c('card',{staticClass:"card-background-product",staticStyle:{"background-image":"url('img/project9.jpg')"},attrs:{"type":"background","raised":""}},[_c('h2',{staticClass:"card-title"},[_vm._v("Trello lets you work.")]),_vm._v(" "),_c('p',{staticClass:"card-description "},[_vm._v("\n                            Trello’s boards, lists, and cards enable you to organize and prioritize your\n                            projects in a fun, flexible and rewarding way.\n                        ")]),_vm._v(" "),_c('badge',{attrs:{"type":"neutral"}},[_vm._v("Trello")])],1)],1)],2)],2)])],2)}
var Projectsvue_type_template_id_80f063a4_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Projects.vue?vue&type=template&id=80f063a4&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Projects.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Projectsvue_type_script_lang_js_ = ({
  components: {
    Card: components["c" /* Card */],
    Tabs: components["u" /* Tabs */],
    TabPane: components["t" /* TabPane */],
    Badge: components["a" /* Badge */],
    InfoSection: components["j" /* InfoSection */],
    [components["b" /* Button */].name]: components["b" /* Button */]
  }
});
// CONCATENATED MODULE: ./components/pages/sections/Projects.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Projectsvue_type_script_lang_js_ = (Projectsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./components/pages/sections/Projects.vue



function Projects_injectStyles (context) {
  
  
}

/* normalize component */

var Projects_component = Object(componentNormalizer["a" /* default */])(
  sections_Projectsvue_type_script_lang_js_,
  Projectsvue_type_template_id_80f063a4_render,
  Projectsvue_type_template_id_80f063a4_staticRenderFns,
  false,
  Projects_injectStyles,
  null,
  "6937cf20"
  
)

/* harmony default export */ var Projects = (Projects_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Pricing.vue?vue&type=template&id=3c7b4678&
var Pricingvue_type_template_id_3c7b4678_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"pricing"}},[_vm._ssrNode("<div id=\"pricing-1\" class=\"pricing-1 section-image\" style=\"background-image: url('img/pricing1.jpg')\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-6 ml-auto mr-auto text-center\"><h2 class=\"title\">Pick the best plan for you</h2> <h4 class=\"description \">You have Free Unlimited Updates and Premium Support on each\n                        package.</h4> <div class=\"section-space\"></div></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category "},[_vm._v("Bravo Pack")]),_vm._v(" "),_c('div',{staticClass:"icon icon-warning"},[_c('i',{staticClass:"now-ui-icons media-1_button-power"})]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("$10")]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("Complete documentation")]),_vm._v(" "),_c('li',[_vm._v("Working materials in Sketch")])]),_vm._v(" "),_c('n-button',{staticClass:"btn-neutral",attrs:{"type":"warning","round":""}},[_vm._v("Add to Cart")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',{attrs:{"type":"pricing"}},[_c('h6',{staticClass:"category"},[_vm._v("Alpha Pack")]),_vm._v(" "),_c('div',{staticClass:"icon icon-success"},[_c('i',{staticClass:"now-ui-icons objects_diamond"})]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("$67")]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("Working materials in EPS")]),_vm._v(" "),_c('li',[_vm._v("6 months access to the library")])]),_vm._v(" "),_c('n-button',{staticClass:"btn-success",attrs:{"type":"success","round":""}},[_vm._v("Add to Cart")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category "},[_vm._v("Charlie Pack")]),_vm._v(" "),_c('div',{staticClass:"icon icon-success"},[_c('i',{staticClass:"now-ui-icons media-2_sound-wave"})]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("$69")]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("Working materials in PSD")]),_vm._v(" "),_c('li',[_vm._v("1 year access to the library")])]),_vm._v(" "),_c('n-button',{staticClass:"btn-neutral",attrs:{"type":"success","round":""}},[_vm._v("Add to Cart")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category "},[_vm._v("Extra Pack")]),_vm._v(" "),_c('div',{staticClass:"icon icon-danger"},[_c('i',{staticClass:"now-ui-icons education_atom"})]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("$159")]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("Complete documentation")]),_vm._v(" "),_c('li',[_vm._v("2GB cloud storage")])]),_vm._v(" "),_c('n-button',{staticClass:"btn-neutral",attrs:{"type":"danger","round":""}},[_vm._v("Add to Cart")])],1)],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div id=\"pricing-2\" class=\"pricing-2\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6 ml-auto mr-auto text-center\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Pick the best plan for you</h2> "),_c('tabs',{attrs:{"pills":"","type":"success","centered":""}},[_c('tab-pane',{attrs:{"label":"Legal Entity"}}),_vm._v(" "),_c('tab-pane',{attrs:{"label":"Individual"}})],1)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category"},[_vm._v("Enterprise")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            59\n                        ")]),_vm._v(" "),_c('ul',[_c('li',[_c('b',[_vm._v("10GB")]),_vm._v(" Disk Space\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("100GB")]),_vm._v(" Monthly Bandwidth\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("20")]),_vm._v(" Email Accounts\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("Unlimited")]),_vm._v(" subdomains\n                            ")])]),_vm._v(" "),_c('n-button',{attrs:{"type":"success","round":""}},[_vm._v("\n                            Sign Up\n                        ")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{staticClass:"card-background",staticStyle:{"background-image":"url('img/pricing2.jpg')"},attrs:{"type":"pricing","raised":""}},[_c('h6',{staticClass:"category text-info"},[_vm._v("Professional")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            29\n                        ")]),_vm._v(" "),_c('ul',[_c('li',[_c('b',[_vm._v("5GB")]),_vm._v(" Disk Space\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("50GB")]),_vm._v(" Monthly Bandwidth\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("10")]),_vm._v(" Email Accounts\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("Unlimited")]),_vm._v(" subdomains\n                            ")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-neutral btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                            Sign Up\n                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category"},[_vm._v("Standard")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            17\n                        ")]),_vm._v(" "),_c('ul',[_c('li',[_c('b',[_vm._v("2GB")]),_vm._v(" Disk Space\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("25GB")]),_vm._v(" Monthly Bandwidth\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("5")]),_vm._v(" Email Accounts\n                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("Unlimited")]),_vm._v(" subdomains\n                            ")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                            Get Started\n                        ")])])],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div id=\"pricing-3\" class=\"pricing-3 section-image\" style=\"background-image: url('img/pricing3.jpg')\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-6 ml-auto mr-auto text-center\"><h2 class=\"title\">Pick the best plan for you</h2> <h4 class=\"description\">You have Free Unlimited Updates on each package.</h4> <div class=\"section-space\"></div></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4 ml-auto\">","</div>",[_c('card',{attrs:{"type":"pricing"}},[_c('h6',{staticClass:"category"},[_vm._v("Freelance")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            29\n                            "),_c('small',[_vm._v("/mo")])]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("1 GB of space")]),_vm._v(" "),_c('li',[_vm._v("Limited Support")]),_vm._v(" "),_c('li',[_vm._v("Support at $25/hour")]),_vm._v(" "),_c('li',[_vm._v("Limited cloud access")])]),_vm._v(" "),_c('n-button',{attrs:{"type":"success","round":""}},[_vm._v("Get Started")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4 mr-auto\">","</div>",[_c('card',{attrs:{"type":"pricing","raised":"","color":"green"}},[_c('h6',{staticClass:"category"},[_vm._v("Business")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            59\n                            "),_c('small',[_vm._v("/mo")])]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("5 GB of space")]),_vm._v(" "),_c('li',[_vm._v("UnLimited Support")]),_vm._v(" "),_c('li',[_vm._v("Unlimited Downloads")]),_vm._v(" "),_c('li',[_vm._v("Full cloud access")])]),_vm._v(" "),_c('n-button',{attrs:{"type":"neutral","round":""}},[_vm._v("Get Started")])],1)],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div id=\"pricing-4\" class=\"pricing-4\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\"><div class=\"col-md-6 ml-auto mr-auto text-center\"><h2 class=\"title\">Pick the best plan for you</h2> <h4 class=\"description\">You have Free Unlimited Updates and Premium Support on each\n                        package.</h4> <div class=\"section-space\"></div></div></div> "),_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category"},[_vm._v("Starter")]),_vm._v(" "),_c('div',{staticClass:"icon icon-danger"},[_c('i',{staticClass:"now-ui-icons tech_headphones"})]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            10\n                        ")]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("1000 MB")]),_vm._v(" "),_c('li',[_vm._v("3 email")]),_vm._v(" "),_c('li',[_vm._v("5 Databases")])]),_vm._v(" "),_c('n-button',{attrs:{"type":"danger","round":""}},[_vm._v("Get it Now")])],1)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"pricing","color":"green"}},[_c('h6',{staticClass:"category"},[_vm._v("Professional")]),_vm._v(" "),_c('div',{staticClass:"icon icon-success"},[_c('i',{staticClass:"now-ui-icons tech_headphones"})]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            40\n                        ")]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("Unlimited MB")]),_vm._v(" "),_c('li',[_vm._v("Unlimited emails")]),_vm._v(" "),_c('li',[_vm._v("Full Support")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-neutral btn-success disabled btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                            Current Plan\n                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category"},[_vm._v("Basic")]),_vm._v(" "),_c('div',{staticClass:"icon icon-warning"},[_c('i',{staticClass:"now-ui-icons tech_headphones"})]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                            20\n                        ")]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("1000 MB")]),_vm._v(" "),_c('li',[_vm._v("3 email")]),_vm._v(" "),_c('li',[_vm._v("No Support")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-warning btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                            Upgrade Plan\n                        ")])])],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div id=\"pricing-5\" class=\"pricing-5 section-pricing-5 section-image\" style=\"background-image: url('img/bg31.jpg')\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-4\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Choose a plan for your next project</h2> "),_c('tabs',{attrs:{"pills":"","type":"success","no-content-space":""},model:{value:(_vm.pricing5Tab),callback:function ($$v) {_vm.pricing5Tab=$$v},expression:"pricing5Tab"}},[_c('tab-pane',{attrs:{"label":"Expensive"}}),_vm._v(" "),_c('tab-pane',{attrs:{"label":"Cheaper"}})],1),_vm._ssrNode(" <p class=\"description\">You have Free Unlimited Updates and Premium Support on each package. You\n                        also have 20 days to request a refund if you're not happy with your purchase.</p>")],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-7 ml-auto mr-auto\">","</div>",[_vm._ssrNode("<div class=\"tab-content tab-space\">","</div>",[(_vm.pricing5Tab === 'Expensive')?_vm._ssrNode("<div id=\"personal\" class=\"tab-pane active\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"pricing","raised":""}},[_c('h6',{staticClass:"category"},[_vm._v("Plus")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                                            100\n                                        ")]),_vm._v(" "),_c('ul',[_c('li',[_c('b',[_vm._v("15")]),_vm._v(" Projects\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("5GB")]),_vm._v(" Storage\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("Unlimited")]),_vm._v(" users\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("No time")]),_vm._v(" tracking\n                                            ")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                                            Buy Now!\n                                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category"},[_vm._v("Maximum")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                                            120\n                                        ")]),_vm._v(" "),_c('ul',[_c('li',[_c('b',[_vm._v("25")]),_vm._v(" Projects\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("15GB")]),_vm._v(" Storage\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("Unlimited")]),_vm._v(" users\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("No time")]),_vm._v(" tracking\n                                            ")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                                            Buy Now!\n                                        ")])])],1)],2)]):_vm._ssrNode("<div id=\"commercial\" class=\"tab-pane active\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"pricing","raised":""}},[_c('h6',{staticClass:"category"},[_vm._v("Standard")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                                            20\n                                        ")]),_vm._v(" "),_c('ul',[_c('li',[_c('b',[_vm._v("5")]),_vm._v(" Projects\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("2GB")]),_vm._v(" Storage\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("Unlimited")]),_vm._v(" users\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("No time")]),_vm._v(" tracking\n                                            ")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                                            Buy Now!\n                                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-6\">","</div>",[_c('card',{attrs:{"type":"pricing","plain":""}},[_c('h6',{staticClass:"category"},[_vm._v("Premium")]),_vm._v(" "),_c('h1',{staticClass:"card-title"},[_c('small',[_vm._v("$")]),_vm._v("\n                                            60\n                                        ")]),_vm._v(" "),_c('ul',[_c('li',[_c('b',[_vm._v("7")]),_vm._v(" Projects\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("3GB")]),_vm._v(" Storage\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("Unlimited")]),_vm._v(" users\n                                            ")]),_vm._v(" "),_c('li',[_c('b',[_vm._v("No time")]),_vm._v(" tracking\n                                            ")])]),_vm._v(" "),_c('a',{staticClass:"btn btn-success btn-round",attrs:{"href":"#pablo"}},[_vm._v("\n                                            Buy Now!\n                                        ")])])],1)],2)])])])],2)])])],2)}
var Pricingvue_type_template_id_3c7b4678_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Pricing.vue?vue&type=template&id=3c7b4678&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Pricing.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Pricingvue_type_script_lang_js_ = ({
  components: {
    Card: components["c" /* Card */],
    Tabs: components["u" /* Tabs */],
    TabPane: components["t" /* TabPane */],
    [components["b" /* Button */].name]: components["b" /* Button */]
  },

  data() {
    return {
      pricing5Tab: 'Expensive'
    };
  }

});
// CONCATENATED MODULE: ./components/pages/sections/Pricing.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Pricingvue_type_script_lang_js_ = (Pricingvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./components/pages/sections/Pricing.vue



function Pricing_injectStyles (context) {
  
  
}

/* normalize component */

var Pricing_component = Object(componentNormalizer["a" /* default */])(
  sections_Pricingvue_type_script_lang_js_,
  Pricingvue_type_template_id_3c7b4678_render,
  Pricingvue_type_template_id_3c7b4678_staticRenderFns,
  false,
  Pricing_injectStyles,
  null,
  "69c92140"
  
)

/* harmony default export */ var Pricing = (Pricing_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Testimonials.vue?vue&type=template&id=6271d9cd&scoped=true&
var Testimonialsvue_type_template_id_6271d9cd_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"testimonials"}},[_vm._ssrNode("<div class=\"testimonials-1 section-image\" style=\"background-image: url('img/bg19.jpg')\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"container\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"row\" data-v-6271d9cd><div class=\"col-md-6 ml-auto mr-auto text-center\" data-v-6271d9cd><h2 class=\"title\" data-v-6271d9cd>What is ALPHA?</h2> <h4 class=\"description \" data-v-6271d9cd>If you’re selected for ALPHA you’ll also get 3 tickets, opportunity to\n                        access Investor Office Hours and Mentor Hours and much more all for €850.</h4></div></div> "),_vm._ssrNode("<div class=\"row\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"col-md-4\" data-v-6271d9cd>","</div>",[_c('card',{attrs:{"type":"testimonial","no-footer-line":""}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/michael.jpg"},slot:"avatar"}),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            The networking at Web Summit is like no other European tech conference.\n                        ")]),_vm._v(" "),_c('div',{staticClass:"icon icon-success",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('i',{staticClass:"fas fa-quote-right"})]),_vm._v(" "),_c('template',{slot:"footer"},[_c('h4',{staticClass:"card-title"},[_vm._v("Michael Elijah")]),_vm._v(" "),_c('p',{staticClass:"category"},[_vm._v("@michaelelijah")])])],2)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\" data-v-6271d9cd>","</div>",[_c('card',{attrs:{"type":"testimonial","no-footer-line":""}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/olivia.jpg"},slot:"avatar"}),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            The connections you make at Web Summit are unparalleled, we met users all over the\n                            world.\n                        ")]),_vm._v(" "),_c('div',{staticClass:"icon icon-success",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('i',{staticClass:"fas fa-quote-right"})]),_vm._v(" "),_c('template',{slot:"footer"},[_c('h4',{staticClass:"card-title"},[_vm._v("Olivia Harper")]),_vm._v(" "),_c('p',{staticClass:"category"},[_vm._v("@oliviaharper")])])],2)],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\" data-v-6271d9cd>","</div>",[_c('card',{attrs:{"type":"testimonial","no-footer-line":""}},[_c('img',{staticClass:"img img-raised",attrs:{"slot":"avatar","src":"img/james.jpg"},slot:"avatar"}),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\n                            Web Summit will increase your appetite, your inspiration, and your network.\n                        ")]),_vm._v(" "),_c('div',{staticClass:"icon icon-success",attrs:{"slot":"raw-content"},slot:"raw-content"},[_c('i',{staticClass:"fas fa-quote-right"})]),_vm._v(" "),_c('template',{slot:"footer"},[_c('h4',{staticClass:"card-title"},[_vm._v("James Logan")]),_vm._v(" "),_c('p',{staticClass:"category"},[_vm._v("@jameslogan")])])],2)],1)],2)],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"testimonials-2\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"container\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"row\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"col-md-12 justify-content-center\" data-v-6271d9cd>","</div>",[_c('el-carousel',{staticClass:"carousel-centered",attrs:{"height":"500px"}},[_c('el-carousel-item',[_c('card',{attrs:{"type":"testimonial","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"avatar","src":"img/james.jpg"},slot:"avatar"}),_vm._v(" "),_c('h5',{staticClass:"card-description"},[_vm._v("\"Take up one idea. Make that one idea your life\n                                    - think of it, dream of it, live on that idea. Let the brain, muscles,\n                                    nerves, every part of your body, be full of that idea, and just leave\n                                    every other idea alone. This is the way to success. A single rose can be\n                                    my garden... a single friend, my world.\"\n                                ")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Isaac Hunter")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('h6',{staticClass:"category text-success"},[_vm._v("Human Resource Director")])])])],1),_vm._v(" "),_c('el-carousel-item',[_c('card',{attrs:{"type":"testimonial","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"avatar","src":"img/olivia.jpg"},slot:"avatar"}),_vm._v(" "),_c('h5',{staticClass:"card-description"},[_vm._v("\"When we are no longer able to change a\n                                    situation - we are challenged to change ourselves. Spread love\n                                    everywhere you go. Let no one ever come to you without leaving happier.\n                                    Problems are not stop signs, they are guidelines.\"\n                                ")]),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Alexa Hailey")]),_vm._v(" "),_c('div',{staticClass:"card-footer"},[_c('h6',{staticClass:"category text-success"},[_vm._v("Human Resource Director")])])])],1)],1)],1)])])]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"testimonials-3\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"container\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"row\" data-v-6271d9cd><div class=\"col-md-6 ml-auto mr-auto text-center\" data-v-6271d9cd><h2 class=\"title\" data-v-6271d9cd>What Clients Say</h2></div></div> "),_vm._ssrNode("<div class=\"row\" data-v-6271d9cd>","</div>",[_vm._ssrNode("<div class=\"col-md-4\" data-v-6271d9cd>","</div>",[_c('card',{attrs:{"type":"testimonial","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"avatar","src":"img/michael.jpg"},slot:"avatar"}),_vm._v(" "),_c('h3',{staticClass:"card-title"},[_vm._v("Andrew John")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Loan Counselor")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\"Do not go where the path may lead, go instead where there\n                            is no path and leave a trail.\"\n                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\" data-v-6271d9cd>","</div>",[_c('card',{attrs:{"type":"testimonial","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"avatar","src":"img/olivia.jpg"},slot:"avatar"}),_vm._v(" "),_c('h4',{staticClass:"card-title"},[_vm._v("Zoe Gabriella")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("Interpreter OR Translator")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\"Don't walk behind me; I may not lead. Don't walk in front\n                            of me; I may not follow. Just walk beside me and be my friend.\"\n                        ")])])],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-4\" data-v-6271d9cd>","</div>",[_c('card',{attrs:{"type":"testimonial","plain":""}},[_c('img',{staticClass:"img img-raised rounded",attrs:{"slot":"avatar","src":"img/james.jpg"},slot:"avatar"}),_vm._v(" "),_c('h4',{staticClass:"card-title"},[_vm._v("Joshiah Luke")]),_vm._v(" "),_c('h6',{staticClass:"category text-success"},[_vm._v("HR Specialist")]),_vm._v(" "),_c('p',{staticClass:"card-description"},[_vm._v("\"The pessimist complains about the wind; the optimist\n                            expects it to change; the realist adjusts the sails.\"\n                        ")])])],1)],2)],2)])],2)}
var Testimonialsvue_type_template_id_6271d9cd_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Testimonials.vue?vue&type=template&id=6271d9cd&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Testimonials.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Testimonialsvue_type_script_lang_js_ = ({
  components: {
    Card: components["c" /* Card */],
    [components["b" /* Button */].name]: components["b" /* Button */],
    [lib_carousel_default.a.name]: lib_carousel_default.a,
    [lib_carousel_item_default.a.name]: lib_carousel_item_default.a
  }
});
// CONCATENATED MODULE: ./components/pages/sections/Testimonials.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Testimonialsvue_type_script_lang_js_ = (Testimonialsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./components/pages/sections/Testimonials.vue



function Testimonials_injectStyles (context) {
  
  var style0 = __webpack_require__(112)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Testimonials_component = Object(componentNormalizer["a" /* default */])(
  sections_Testimonialsvue_type_script_lang_js_,
  Testimonialsvue_type_template_id_6271d9cd_scoped_true_render,
  Testimonialsvue_type_template_id_6271d9cd_scoped_true_staticRenderFns,
  false,
  Testimonials_injectStyles,
  "6271d9cd",
  "70ede3aa"
  
)

/* harmony default export */ var Testimonials = (Testimonials_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Contact.vue?vue&type=template&id=f4e8b698&
var Contactvue_type_template_id_f4e8b698_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cd-section",attrs:{"id":"contactus"}},[_vm._ssrNode("<div class=\"contactus-1 section-image\" style=\"background-image: url('img/contact1.jpg')\">","</div>",[_vm._ssrNode("<div class=\"container\">","</div>",[_vm._ssrNode("<div class=\"row\">","</div>",[_vm._ssrNode("<div class=\"col-md-5\">","</div>",[_vm._ssrNode("<h2 class=\"title\">Get in Touch</h2> <h4 class=\"description\">You need more information? Check what other persons are saying about our\n                        product. They are very happy with their purchase.</h4> "),_c('info-section',{attrs:{"type":"success","icon":"now-ui-icons location_pin"}},[_c('h4',{staticClass:"info-title"},[_vm._v("Find us at the office")]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v(" Bld Mihail Kogalniceanu, nr. 8,\n                            "),_c('br'),_vm._v(" 7652 Bucharest,\n                            "),_c('br'),_vm._v(" Romania\n                        ")])]),_vm._ssrNode(" "),_c('info-section',{attrs:{"type":"success","icon":"now-ui-icons tech_mobile"}},[_c('h4',{staticClass:"info-title"},[_vm._v("Give us a ring")]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v(" Michael Jordan\n                            "),_c('br'),_vm._v(" +40 762 321 762\n                            "),_c('br'),_vm._v(" Mon - Fri, 8:00-22:00\n                        ")])])],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-5 ml-auto mr-auto\">","</div>",[_c('card',{attrs:{"type":"contact","raised":"","header-classes":"text-center"}},[_c('h4',{staticClass:"card-title",attrs:{"slot":"header"},slot:"header"},[_vm._v("Contact Us")]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6 pr-2"},[_c('label',[_vm._v("First Name")]),_vm._v(" "),_c('fg-input',{attrs:{"placeholder":"First Name...","addon-left-icon":"now-ui-icons users_circle-08"}})],1),_vm._v(" "),_c('div',{staticClass:"col-md-6 pl-2"},[_c('label',[_vm._v("Last Name")]),_vm._v(" "),_c('fg-input',{attrs:{"placeholder":"Last Name...","addon-left-icon":"now-ui-icons text_caps-small"}})],1)]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Email address")]),_vm._v(" "),_c('fg-input',{attrs:{"placeholder":"Email Here...","addon-left-icon":"now-ui-icons ui-1_email-85"}})],1),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Your message")]),_vm._v(" "),_c('textarea',{staticClass:"form-control",attrs:{"name":"message","id":"message","rows":"6"}})]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('n-checkbox',[_vm._v("\n                                    I'm not a robot\n                                ")])],1),_vm._v(" "),_c('div',{staticClass:"col-md-6"},[_c('n-button',{staticClass:"pull-right",attrs:{"type":"success","round":""}},[_vm._v("Send Message")])],1)])])],1)],2)])]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"contactus-2\">","</div>",[_c('gmap-map',{staticClass:"map",attrs:{"id":"map","center":_vm.center,"zoom":13,"options":_vm.options,"map-type-id":"terrain"}},[_c('gmap-marker',{attrs:{"position":_vm.center}})],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-lg-6 col-md-10\">","</div>",[_c('card',{attrs:{"type":"contact","raised":"","header-classes":"text-center"}},[_c('h4',{staticClass:"card-title",attrs:{"slot":"header"},slot:"header"},[_vm._v("Contact Us")]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('info-section',{attrs:{"type":"success","icon":"now-ui-icons tech_mobile"}},[_c('h5',{staticClass:"info-title"},[_vm._v("Give us a ring")]),_vm._v(" "),_c('p',[_vm._v(" Michael Jordan\n                                "),_c('br'),_vm._v(" +40 762 321 762\n                                "),_c('br'),_vm._v(" Mon - Fri, 8:00-22:00\n                            ")])])],1),_vm._v(" "),_c('div',{staticClass:"col-md-6"},[_c('info-section',{attrs:{"type":"success","icon":"now-ui-icons location_pin"}},[_c('h5',{staticClass:"info-title"},[_vm._v("Find us at the office")]),_vm._v(" "),_c('p',[_vm._v(" Bld Mihail Kogalniceanu, nr. 8,\n                                "),_c('br'),_vm._v(" 7652 Bucharest,\n                                "),_c('br'),_vm._v(" Romania\n                            ")])])],1)]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6 pr-2"},[_c('label',[_vm._v("Full name")]),_vm._v(" "),_c('fg-input',{attrs:{"placeholder":"First Name...","addon-left-icon":"now-ui-icons users_circle-08"}})],1),_vm._v(" "),_c('div',{staticClass:"col-md-6 pl-2"},[_c('label',[_vm._v("Email address")]),_vm._v(" "),_c('fg-input',{attrs:{"placeholder":"Email Here...","addon-left-icon":"now-ui-icons users_circle-08"}})],1)]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('n-checkbox',[_vm._v("\n                            I'm not a robot\n                        ")])],1),_vm._v(" "),_c('div',{staticClass:"col-md-6"},[_c('n-button',{staticClass:"pull-right",attrs:{"type":"success","round":""}},[_vm._v("Send Message")])],1)])])],1)],2)],2)}
var Contactvue_type_template_id_f4e8b698_staticRenderFns = []


// CONCATENATED MODULE: ./components/pages/sections/Contact.vue?vue&type=template&id=f4e8b698&

// EXTERNAL MODULE: ./constants/index.js
var constants = __webpack_require__(77);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(1);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: ./node_modules/vue2-google-maps/dist/main.js
var main = __webpack_require__(78);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./components/pages/sections/Contact.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




external_vue_default.a.use(main, {
  load: {
    key: constants["a" /* API_KEY */]
  }
});
/* harmony default export */ var Contactvue_type_script_lang_js_ = ({
  components: {
    Card: components["c" /* Card */],
    InfoSection: components["j" /* InfoSection */],
    [components["b" /* Button */].name]: components["b" /* Button */],
    [components["d" /* Checkbox */].name]: components["d" /* Checkbox */],
    [components["i" /* FormGroupInput */].name]: components["i" /* FormGroupInput */],
    [lib_carousel_default.a.name]: lib_carousel_default.a,
    [lib_carousel_item_default.a.name]: lib_carousel_item_default.a
  },

  data() {
    return {
      center: {
        lat: 40.748817,
        lng: -73.985428
      },
      options: {
        styles: [{
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e9e9e9"
          }, {
            "lightness": 17
          }]
        }, {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }, {
            "lightness": 20
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 17
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 29
          }, {
            "weight": 0.2
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 18
          }]
        }, {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 16
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }, {
            "lightness": 21
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dedede"
          }, {
            "lightness": 21
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "visibility": "on"
          }, {
            "color": "#ffffff"
          }, {
            "lightness": 16
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "saturation": 36
          }, {
            "color": "#333333"
          }, {
            "lightness": 40
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f2f2f2"
          }, {
            "lightness": 19
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#fefefe"
          }, {
            "lightness": 20
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#fefefe"
          }, {
            "lightness": 17
          }, {
            "weight": 1.2
          }]
        }]
      }
    };
  }

});
// CONCATENATED MODULE: ./components/pages/sections/Contact.vue?vue&type=script&lang=js&
 /* harmony default export */ var sections_Contactvue_type_script_lang_js_ = (Contactvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./components/pages/sections/Contact.vue



function Contact_injectStyles (context) {
  
  
}

/* normalize component */

var Contact_component = Object(componentNormalizer["a" /* default */])(
  sections_Contactvue_type_script_lang_js_,
  Contactvue_type_template_id_f4e8b698_render,
  Contactvue_type_template_id_f4e8b698_staticRenderFns,
  false,
  Contact_injectStyles,
  null,
  "0f59e89a"
  
)

/* harmony default export */ var Contact = (Contact_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/sections.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var sectionsvue_type_script_lang_js_ = ({
  name: 'sections',
  layout: 'white-nav',
  components: {
    HeadersSection: Headers,
    FeaturesSection: Features,
    BlogSection: Blogs,
    TeamsSection: Teams,
    ProjectsSection: Projects,
    PricingSection: Pricing,
    TestimonialSection: Testimonials,
    ContactSection: Contact
  }
});
// CONCATENATED MODULE: ./pages/sections.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_sectionsvue_type_script_lang_js_ = (sectionsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./pages/sections.vue



function sections_injectStyles (context) {
  
  
}

/* normalize component */

var sections_component = Object(componentNormalizer["a" /* default */])(
  pages_sectionsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  sections_injectStyles,
  null,
  "dd35f79c"
  
)

/* harmony default export */ var sections = __webpack_exports__["default"] = (sections_component.exports);

/***/ })
]);;
//# sourceMappingURL=sections.js.map