var Node = require("./node.js");

function List(){
  this.head = null;
  this.tail = null;
  this.length = 0;
};

List.prototype.push = function(value){
  var newNode = new Node(value),
      oldTail ;
  if(this.head === null) {
    this.head = newNode;
  } else {
    oldTail = this.tail;
    oldTail.next = newNode.setPrevious(oldTail);
  }
  this.tail = newNode;
  this.length += 1;

  return this;
};

List.prototype.pop = function(){
  var secondToLast, oldTail;
  switch(this.length){
    case 0:
      return null;
    case 1:
      this.length -= 1;
      oldTail = this.tail;
      this.tail = this.head = null;
      return oldTail;
    default:
      this.length -= 1;
      oldTail = this.tail;
      this.tail = secondToLast = oldTail.previous()
      secondToLast.next = null;
      return oldTail;
  }
};

List.prototype.getIndex = function(index){
  if (index < 0 || this.length < index) {
    return undefined;
  } else {
    var currNode = this.head;
    for (var i = 0; i < index; i++) {
     currNode = currNode.next;
    };
    return currNode.value;
  }
};

List.prototype.setIndex = function(index, value){
  if (index < 0 || this.length < index) {
    throw new RangeError("");
  }

  var setNode = function(index, value){
    var currNode = this.head;
    for (var i = 0; i < index; i++) {
      currNode = currNode.next;
    };
    return currNode.value = value;
  };

  if(this.length === index){
      this.push(value);
  } else{
      setNode.call(this, index, value);
  }
  return this;
};

List.prototype.shift = function(){
  var oldHead;

  switch(this.length){
    case 0:
      return oldHead;
    case 1:
      oldHead = this.head;
      this.tail = this.head = null;
      return oldHead;
    default:
      oldHead = this.head;
      this.head = oldHead.next;
      this.head.setPrevious(null);
      return oldHead;
  }
};

List.prototype.unshift = function(value){
  var newHead = new Node(value), oldHead;

  if(this.length === 0){
    this.head = this.tail = newHead;
  } else {
    oldHead = this.head;
    newHead.next = oldHead;
    oldHead.setPrevious(newHead);
    this.head = newHead;
  }
  return this;
};

List.prototype.insert = function(index, value){

  if (index < 0 || this.length < index) {
    throw new RangeError("");
  }
  var handleInsert = function(index, value){
    var newNode = new Node(value),
        currNode = this.head,
        oldNext;
    for (var i = 1; i < index; i++) {
      currNode = currNode.next;
    };
    oldNext = currNode.next;
    currNode.next = newNode;
    newNode.setPrevious(currNode);
    newNode.next = oldNext;
    oldNext.setPrevious(newNode);
  };

  switch(index){
    case 0:
      this.unshift(value);
      return this;
    case this.length:
      this.push(value);
      return this;
    default:
      handleInsert.call(this, index, value);
      return this;
  }

};

try {
  module.exports = List;
} catch(e){

}
