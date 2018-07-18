// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js\\models\\StorageModel.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage(storage, score, operations, difficulty) {
    _classCallCheck(this, Storage);

    if (storage.length === 0) {
      this.default();
    } else {
      this.load();
    }
  }

  _createClass(Storage, [{
    key: 'default',
    value: function _default() {
      this.score = {
        correct: 0,
        incorrect: 0
      };
      this.operations = ['addition'];
      this.difficulty = 'easy';
      this.update('score', this.score);
      this.update('operations', this.operations);
      this.update('difficulty', this.difficulty);
    }
  }, {
    key: 'load',
    value: function load() {
      this.score = JSON.parse(localStorage.getItem('score'));
      this.operations = JSON.parse(localStorage.getItem('operations'));
      this.difficulty = JSON.parse(localStorage.getItem('difficulty'));
    }
  }, {
    key: 'update',
    value: function update(item, storage) {
      localStorage.setItem(item, JSON.stringify(storage));
      this.load();
    }
  }]);

  return Storage;
}();

exports.default = Storage;
},{}],"js\\models\\QuestionModel.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Question = function () {
  function Question(storage, question, answer, result) {
    _classCallCheck(this, Question);

    this.storage = storage;
    this.question = question;
    this.answer = answer;
    this.result = '';

    this.createQuestion();
  }

  _createClass(Question, [{
    key: 'createQuestion',
    value: function createQuestion() {
      var limit = void 0,
          operation = void 0;

      if (this.storage.operations.length > 0) {
        operation = this.storage.operations[Math.floor(Math.random() * this.storage.operations.length)];
      } else {
        operation = this.storage.operations[0];
      }

      if (this.storage.difficulty === 'easy') {
        if (operation === 'multiplication') limit = 12;else if (operation === 'division') limit = 6;else limit = 12;
      } else if (this.storage.difficulty === 'medium') {
        if (operation === 'multiplication') limit = 24;else if (operation === 'division') limit = 12;else limit = 44;
      } else if (this.storage.difficulty === 'hard') {
        if (operation === 'multiplication') limit = 64;else if (operation === 'division') limit = 24;else limit = 128;
      }

      function randomNumber(num) {
        num = Math.ceil(Math.random() * limit);
        return num;
      }

      var a = void 0;
      var b = randomNumber(b);
      if (operation == 3) a = randomNumber(a) * b;else a = randomNumber(a);

      if (operation === 'addition') {
        this.question = a + ' + ' + b + ' =';
        this.answer = a + b;
      } else if (operation === 'subtraction') {
        this.question = a + ' - ' + b + ' =';
        this.answer = a - b;
      } else if (operation === 'multiplication') {
        this.question = a + ' &#215; ' + b + ' =';
        this.answer = a * b;
      } else if (operation === 'division') {
        this.question = a + ' &#247; ' + b + ' =';
        this.answer = a / b;
      }
    }
  }, {
    key: 'isCorrect',
    value: function isCorrect(input) {
      this.result = this.question + ' ' + this.answer;
      if (input === this.answer) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Question;
}();

exports.default = Question;
},{}],"js\\models\\ElementsModel.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var element = exports.element = {
  question: document.querySelector('.question'),
  answer: document.querySelector('.answer'),
  score: {
    correct: document.querySelector('.score-correct'),
    incorrect: document.querySelector('.score-incorrect')
  },
  clearBtn: document.querySelector('.clear-btn'),
  result: document.querySelector('.result'),
  operations: document.querySelectorAll('.checkbox'),
  difficulty: document.querySelector('.difficulty')
};
},{}],"js\\views\\QuestionView.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionView = undefined;

var _ElementsModel = require('../models/ElementsModel');

var questionView = exports.questionView = {
  display: function display(question) {
    _ElementsModel.element.question.innerHTML = question.question;
    _ElementsModel.element.result.innerHTML = question.result;
  }
};
},{"../models/ElementsModel":"js\\models\\ElementsModel.js"}],"js\\views\\StorageView.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageView = undefined;

var _ElementsModel = require('../models/ElementsModel');

var storageView = exports.storageView = {
  updateOperations: function updateOperations(storage) {
    _ElementsModel.element.operations.forEach(function (operation) {
      operation.checked = false;
    });
    if (storage.operations.includes('addition')) _ElementsModel.element.operations[0].checked = true;
    if (storage.operations.includes('subtraction')) _ElementsModel.element.operations[1].checked = true;
    if (storage.operations.includes('multiplication')) _ElementsModel.element.operations[2].checked = true;
    if (storage.operations.includes('division')) _ElementsModel.element.operations[3].checked = true;
  }
};
},{"../models/ElementsModel":"js\\models\\ElementsModel.js"}],"js\\controllers\\StorageController.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageController = undefined;

var _ElementsModel = require('../models/ElementsModel');

var _QuestionView = require('../views/QuestionView');

var _StorageView = require('../views/StorageView');

var storageController = exports.storageController = {
  init: function init(storage, question) {
    var _this = this;

    _ElementsModel.element.score.correct.innerHTML = storage.score.correct;
    _ElementsModel.element.score.incorrect.innerHTML = storage.score.incorrect;
    _StorageView.storageView.updateOperations(storage);
    _ElementsModel.element.clearBtn.addEventListener('click', function () {
      storage.default();
      _this.updateScore(storage, null);
    });
    _ElementsModel.element.difficulty.addEventListener('click', function (e) {
      if (e.target.value != storage.difficulty) {
        storage.update('difficulty', e.target.value);
        question.createQuestion();
        _QuestionView.questionView.display(question);
      }
    });
    _ElementsModel.element.operations.forEach(function (operation) {
      operation.addEventListener('click', function () {
        storage.operations = [];
        _ElementsModel.element.operations.forEach(function (operation, i) {
          if (operation.checked) {
            storage.operations.push(operation.value);
          }
        });
        if (storage.operations.length > 0) {
          storage.update('operations', storage.operations);
          question.createQuestion();
          _QuestionView.questionView.display(question);
          _StorageView.storageView.updateOperations(storage);
        }
      });
    });
  },
  updateScore: function updateScore(storage, correct) {
    if (correct) {
      storage.score.correct++;
      _ElementsModel.element.score.correct.innerHTML = storage.score.correct;
    } else if (correct === false) {
      storage.score.incorrect++;
      _ElementsModel.element.score.incorrect.innerHTML = storage.score.incorrect;
    } else if (correct === null) {
      _ElementsModel.element.score.correct.innerHTML = storage.score.correct;
      _ElementsModel.element.score.incorrect.innerHTML = storage.score.incorrect;
    }
    storage.update('score', storage.score);
  }
};
},{"../models/ElementsModel":"js\\models\\ElementsModel.js","../views/QuestionView":"js\\views\\QuestionView.js","../views/StorageView":"js\\views\\StorageView.js"}],"js\\controllers\\QuestionController.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionController = undefined;

var _ElementsModel = require('../models/ElementsModel');

var _QuestionView = require('../views/QuestionView');

var _StorageController = require('./StorageController');

var questionController = exports.questionController = {
  watchInput: function watchInput(storage, question) {
    _ElementsModel.element.answer.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        _StorageController.storageController.updateScore(storage, question.isCorrect(parseInt(_ElementsModel.element.answer.value)));
        _ElementsModel.element.answer.value = null;
        question.createQuestion();
        _QuestionView.questionView.display(question);
      }
    });
  }
};
},{"../models/ElementsModel":"js\\models\\ElementsModel.js","../views/QuestionView":"js\\views\\QuestionView.js","./StorageController":"js\\controllers\\StorageController.js"}],"js\\controllers\\storageController.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageController = undefined;

var _ElementsModel = require('../models/ElementsModel');

var _QuestionView = require('../views/QuestionView');

var _StorageView = require('../views/StorageView');

var storageController = exports.storageController = {
  init: function init(storage, question) {
    var _this = this;

    _ElementsModel.element.score.correct.innerHTML = storage.score.correct;
    _ElementsModel.element.score.incorrect.innerHTML = storage.score.incorrect;
    _StorageView.storageView.updateOperations(storage);
    _ElementsModel.element.clearBtn.addEventListener('click', function () {
      storage.default();
      _this.updateScore(storage, null);
    });
    _ElementsModel.element.difficulty.addEventListener('click', function (e) {
      if (e.target.value != storage.difficulty) {
        storage.update('difficulty', e.target.value);
        question.createQuestion();
        _QuestionView.questionView.display(question);
      }
    });
    _ElementsModel.element.operations.forEach(function (operation) {
      operation.addEventListener('click', function () {
        storage.operations = [];
        _ElementsModel.element.operations.forEach(function (operation, i) {
          if (operation.checked) {
            storage.operations.push(operation.value);
          }
        });
        if (storage.operations.length > 0) {
          storage.update('operations', storage.operations);
          question.createQuestion();
          _QuestionView.questionView.display(question);
          _StorageView.storageView.updateOperations(storage);
        }
      });
    });
  },
  updateScore: function updateScore(storage, correct) {
    if (correct) {
      storage.score.correct++;
      _ElementsModel.element.score.correct.innerHTML = storage.score.correct;
    } else if (correct === false) {
      storage.score.incorrect++;
      _ElementsModel.element.score.incorrect.innerHTML = storage.score.incorrect;
    } else if (correct === null) {
      _ElementsModel.element.score.correct.innerHTML = storage.score.correct;
      _ElementsModel.element.score.incorrect.innerHTML = storage.score.incorrect;
    }
    storage.update('score', storage.score);
  }
};
},{"../models/ElementsModel":"js\\models\\ElementsModel.js","../views/QuestionView":"js\\views\\QuestionView.js","../views/StorageView":"js\\views\\StorageView.js"}],"js\\controllers\\AppController.js":[function(require,module,exports) {
'use strict';

var _StorageModel = require('../models/StorageModel');

var _StorageModel2 = _interopRequireDefault(_StorageModel);

var _QuestionModel = require('../models/QuestionModel');

var _QuestionModel2 = _interopRequireDefault(_QuestionModel);

var _QuestionView = require('../views/QuestionView');

var _QuestionController = require('../controllers/QuestionController');

var _storageController = require('../controllers/storageController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function appController() {
  var storage = new _StorageModel2.default(localStorage);
  var question = new _QuestionModel2.default(storage);

  _QuestionView.questionView.display(question);
  _QuestionController.questionController.watchInput(storage, question);
  _storageController.storageController.init(storage, question);
})();
},{"../models/StorageModel":"js\\models\\StorageModel.js","../models/QuestionModel":"js\\models\\QuestionModel.js","../views/QuestionView":"js\\views\\QuestionView.js","../controllers/QuestionController":"js\\controllers\\QuestionController.js","../controllers/storageController":"js\\controllers\\storageController.js"}],"C:\\Users\\JJ\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '3288' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\JJ\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","js\\controllers\\AppController.js"], null)
//# sourceMappingURL=/AppController.1d214a5b.map