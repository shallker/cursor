var $ = require('jquery');

module.exports = function Marker(cursor) {
  var input = this;
  var copy = document.createTextNode('');
  var simulator, el;

  function computedStyle(el, name) {
    return document.defaultView.getComputedStyle(el, null)[name];
  }

  function copyStyle(el, target, name) {
    el.style[name] = target.style[name] || computedStyle(target, name) || '';
  }

  function createMarker() {
    simulator = document.createElement('div');
    copy.textContent = cursor.before();
    el = document.createElement('span');

    simulator.style.display = 'block';
    simulator.style.position = 'fixed';
    simulator.style.left = '-999999999999px';
    copyStyle(simulator, input, 'textDecoration');
    copyStyle(simulator, input, 'textIndent');
    copyStyle(simulator, input, 'textTransform');
    copyStyle(simulator, input, 'whiteSpace');
    copyStyle(simulator, input, 'wordWrap');
    copyStyle(simulator, input, 'wordSpacing');
    copyStyle(simulator, input, 'letterSpacing');
    copyStyle(simulator, input, 'fontFamily');
    copyStyle(simulator, input, 'fontSize');
    copyStyle(simulator, input, 'fontStyle');
    copyStyle(simulator, input, 'fontVariant');
    copyStyle(simulator, input, 'fontWeight');
    copyStyle(simulator, input, 'boxSizing');
    copyStyle(simulator, input, 'width');
    copyStyle(simulator, input, 'minWidth');
    copyStyle(simulator, input, 'maxWidth');
    copyStyle(simulator, input, 'height');
    copyStyle(simulator, input, 'minHeight');
    copyStyle(simulator, input, 'maxHeight');
    copyStyle(simulator, input, 'lineHeight');
    copyStyle(simulator, input, 'padding');
    copyStyle(simulator, input, 'border');
    document.body.appendChild(simulator);
    el.innerHTML = '&nbsp;';
    simulator.appendChild(copy);
    simulator.appendChild(el);
    setTimeout(destroy, 3000);

    function destroy() {
      simulator.parentNode.removeChild(simulator);
      el = null;
    }

    return el;
  }

  var marker = function () {
    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    this.property('offsetHeight', {
      get: function () {
        copy.textContent = cursor.before();
        return el ? el.offsetHeight : createMarker().offsetHeight;
      }
    });

    this.property('offsetTop', {
      get: function () {
        copy.textContent = cursor.before();
        return el ? el.offsetTop : createMarker().offsetTop;
      }
    });

    this.property('offsetLeft', {
      get: function () {
        copy.textContent = cursor.before();
        return el ? el.offsetLeft : createMarker().offsetLeft;
      }
    });

    this.property('pageTop', {
      get: function () {
        copy.textContent = cursor.before();
        return el ? el.pageTop : createMarker().pageTop;
      }
    });

    this.property('pageLeft', {
      get: function () {
        copy.textContent = cursor.before();
        return el ? el.pageLeft : createMarker().pageLeft;
      }
    });

    return this;
  }.call({});

  return marker;
}
