var $ = require('jquery');

module.exports = function Marker(cursor) {
  var input = this;
  var copy = document.createElement('span');
  var simulator, el;

  function computedStyle(el, name) {
    return document.defaultView.getComputedStyle(el, null)[name];
  }

  function copyStyle(el, target, name) {
    el.style[name] = target.style[name] || computedStyle(target, name) || '';
  }

  function createMarker() {
    simulator = document.createElement('div');
    updateCopy(cursor.before());
    el = document.createElement('span');

    simulator.style.display = 'block';
    simulator.style.position = 'fixed';
    simulator.style.left = '-9999px';
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

  function updateCopy(content) {
    content = content.replace(/\r?\n/g, '<br />');
    copy.innerHTML = content;
  }

  var marker = function () {
    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    this.property('offsetHeight', {
      get: function () {
        updateCopy(cursor.before());
        return el ? el.offsetHeight : createMarker().offsetHeight;
      }
    });

    this.property('offsetTop', {
      get: function () {
        updateCopy(cursor.before());
        return el ? el.offsetTop : createMarker().offsetTop;
      }
    });

    this.property('offsetLeft', {
      get: function () {
        updateCopy(cursor.before());
        return el ? el.offsetLeft : createMarker().offsetLeft;
      }
    });

    this.property('pageTop', {
      get: function () {
        updateCopy(cursor.before());
        return el ? el.pageTop : createMarker().pageTop;
      }
    });

    this.property('pageLeft', {
      get: function () {
        updateCopy(cursor.before());
        return el ? el.pageLeft : createMarker().pageLeft;
      }
    });

    return this;
  }.call({});

  return marker;
}
