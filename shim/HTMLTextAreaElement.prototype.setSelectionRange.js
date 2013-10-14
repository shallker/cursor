if (HTMLTextAreaElement.prototype.setSelectionRange) return;

HTMLTextAreaElement.prototype.setSelectionRange = function (selectionStart, selectionEnd) {
  if (this.createTextRange) {
    var range = this.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}
