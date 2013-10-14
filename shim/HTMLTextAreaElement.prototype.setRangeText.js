if (HTMLTextAreaElement.prototype.setRangeText) return;

HTMLTextAreaElement.prototype.setRangeText = function (text) {
  if (document.selection) {
    this.focus();
    var range = document.selection.createRange();
    return range.text = text;
  }

  if (this.selectionStart) {
    return this.value = ''
      + this.value.substring(0, this.selectionStart)
      + text
      + this.value.substring(this.selectionEnd, this.value.length);
  }

  return this.value += text;
};
