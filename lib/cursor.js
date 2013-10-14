require('../shim/HTMLInputElement.prototype.setRangeText');
require('../shim/HTMLInputElement.prototype.setSelectionRange');
require('../shim/HTMLTextAreaElement.prototype.setRangeText');
require('../shim/HTMLTextAreaElement.prototype.setSelectionRange');

var Marker = require('./marker');

module.exports = function cursor() {
  var input = this;
  var marker;

  var cursor = function () {
    this.property = function (name, defines) {
      Object.defineProperty(this, name, defines);
    }

    this.property('position', {
      get: function () {
        if (typeof input.selectionStart !== 'undefined') return input.selectionStart;

        if (document.selection) {
          var c = "\001",
              sel = document.selection.createRange(),
              dul = sel.duplicate(),
              len = 0;

          dul.moveToElementText(input);
          sel.text = c;
          len = dul.text.indexOf(c);
          sel.moveStart('character', -1);
          sel.text = "";
          return len;
        }

        if (document.selection) {
          // this.focus();
          var range = document.selection.createRange();
          var length = document.selection.createRange().text.length;

          range.moveStart('character', - this.value.length);
          return range.text.length - length;
        }

        return 0;
      },

      set: function (value) {
        input.focus();
        input.setSelectionRange(value, value);
      }
    });

    this.property('offsetTop', {
      get: function () {
        return marker.offsetTop;
      }
    });

    this.property('offsetLeft', {
      get: function () {
        return marker.offsetLeft;
      }
    });

    this.property('pageLeft', {
      get: function () {
        var inputOffsetX = input.getBoundingClientRect().left + window.pageXOffset;

        return inputOffsetX + marker.offsetLeft;
      }
    });

    this.property('pageTop', {
      get: function () {
        var inputOffsetY = input.getBoundingClientRect().top + window.pageYOffset;

        return inputOffsetY + marker.offsetTop;
      }
    });

    this.property('height', {
      get: function () {
        return marker.offsetHeight;
      }
    });

    marker = Marker.call(input, this);
    return this;
  }.call({});

  cursor.before = function (text) {
    if (text) {
      input.value = text + input.value.substring(this.position, input.value.length);
    }

    return input.value.substring(0, this.position);
  }

  cursor.after = function (text) {
    if (text) {
      input.value = input.value.substring(0, this.position) + text;
    }

    return input.value.substring(this.position, input.value.length);
  }

  cursor.insert = function (text) {
    input.setRangeText(text);
  }

  return cursor;  
}
