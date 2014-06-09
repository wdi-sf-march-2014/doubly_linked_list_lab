var List = require("../app/javascripts/list.js");



describe("List", function(){

  describe("hasOwnProperty", function(){
    var list = new List();

    it("'head' ", function(){
      expect(list.hasOwnProperty("head")).toEqual(true);
    });

    it("'tail'", function(){
      expect(list.hasOwnProperty("tail")).toEqual(true);
    });

    it("'length'", function(){
      expect(list.hasOwnProperty("length")).toEqual(true);
    });
  });

  describe("constructor defaults", function(){
    var list = new List();

    it("should set head to `null`", function(){
      expect(list.head).toBe(null)
    });

    it("should set tail to `null`", function(){
      expect(list.tail).toBe(null)
    });

    it("should set length to `0`", function(){
      expect(list.length).toEqual(0)
    });
  });

  describe("prototype has own property", function(){

    it("push", function(){
      expect(List.prototype.hasOwnProperty("push")).toEqual(true);
    });

    it("pop", function(){
      expect(List.prototype.hasOwnProperty("pop")).toEqual(true);
    });

    it("getIndex", function(){
      expect(List.prototype.hasOwnProperty("getIndex")).toEqual(true);
    });

    it("setIndex", function(){
      expect(List.prototype.hasOwnProperty("setIndex")).toEqual(true);
    });

    it("shift", function(){
      expect(List.prototype.hasOwnProperty("shift")).toEqual(true);
    });

    it("unshift", function(){
      expect(List.prototype.hasOwnProperty("unshift")).toEqual(true);
    });

    it("insert", function(){
      expect(List.prototype.hasOwnProperty("insert")).toEqual(true);
    });

  });


  describe("#push", function(){
    var list;
    beforeEach(function(){
      list = new List();
    });

    it("should set head for empty list", function(){
      list.push(1);
      expect(list.head).not.toBe(null);
    });

    it("should update tail", function(){
      old_last = list.tail;
      list.push(1);
      expect(list.tail).not.toEqual(old_last);
    });

    it("should update tail with value equal to pushed value", function(){
      list.push(1);
      list.push(2);
      expect(list.tail.value).toEqual(2);
    });

    it("should update length", function(){
      list.push(1);
      list.push(2);
      expect(list.length).toEqual(2);
    });

    it("should set previous() on new node", function(){
      list.push(1).push(2)
      expect(list.tail.previous()).toBe(list.head);
    });

    it("should return self", function(){
      expect(list.push(1)).toEqual(list);
    });


  });


  describe("#pop", function(){
    var list;
    beforeEach(function(){
      list = new List();
    });
    it("should return null for empty list", function(){
      expect(list.pop()).toBe(null)
    });

    it("should set head to null for one item list", function(){
      list.push(1);
      list.pop();
      expect(list.head).toEqual(null);
    });

    it("should set tail to null for one item list", function(){
      list.push(1);
      list.pop();
      expect(list.tail).toEqual(null);
    });

    it("should set next of node at index `length - 2` to null", function(){
      list.push(1);
      list.push(2);
      list.push(3);
      var secondToLast = list.tail.previous();
      list.pop();
      expect(secondToLast.next).toEqual(null);
    });

    it("should update secondToLast to equal tail", function(){
      list.push(1);
      list.push(2);
      list.push(3);
      var secondToLast = list.tail.previous();
      expect(secondToLast).toBe(list.tail)
    });

    it("should return the old tail", function(){
      var tail = list.tail;
      expect(list.pop()).toEqual(tail);
    });
  });


  describe("#head", function(){
    it("should return null if empty", function(){
      var list = new List();
      expect(list.head()).toEqual(null);
    });

    it("should return first node.value when nonempty", function(){
      var list = new List();
      list.push(1);
      expect(list.head()).toEqual(1);
    });
  });


  describe("#shift", function(){
    it("should set head to be second node", function(){
      var list = new List(); 
      list.push(1).push(2).push(3);
      var second = list.head.next;
      list.shift();
      expect(list.head).toEqual(second);
    });
    it("should set head.previous() to null", function(){
      var list = new List(); 
      list.push(1).push(2)
      list.shift()
      expect(list.head.previous()).toBe(null);
    });
  });

  describe("#insert", function(){
    var list;
    beforeEach(function(){
      list = new List();
    });


    it("should throw a RangeError if index is too large ", function(){
      try{
        list.insert(1,3);
      } catch(e){
        expect(e.constructor).toBe(RangeError)
      }
    });

    it("should throw a RangeError if index is too small ", function(){
      try{
        list.insert(-1,1);
      } catch(e){
        expect(e.constructor).toBe(RangeError)
      }
    });

    it("should initialize head and tail for empty list", function(){
      list.insert(0,1);
      expect(list.head).toBe(list.tail);
      expect(list.value).toBe(1);
    });

    it("should insert at beginning of list and update head and previous of old head", function(){
      list.push(2).push(3);
      var oldHead = list.head
      list.insert(0,1);
      expect(list.head.value).toBe(1);
      expect(list.head.next).toBe(oldHead);
      expect(oldHead.previous()).toBe(list.head);
    });

    it("should insert between exisiting indicies and with appropriate 'next' and 'previous'",function(){
      list.push(1).push(3).push(4);
      var old_node = list.head.next;
      list.insert(1,2);
      var new_node = list.head.next;
      expect(new_node.value).toEqual(2);
      expect(new_node.next).toBe(old_node)
      expect(new_node.previous()).toBe(list.head)
    });

    it("should insert between indicies and update old nodes 'previous' and 'next'", function(){
      list.push(1).push(3);
      var old_node = list.head.next;
      list.insert(1,2);
      var new_node = list.head.next;
      expect(new_node.previous()).toBe(list.head);
      expect(old_node.previous()).toBe(new_node)
    });

    it("should insert after last and update last",function(){
      list.push(1).push(2);
      var old_node = list.node.next;
      list.insert(2,3);
      var new_node = list.node.next.next;
      expect(new_node.value).toEqual(3);
      expect(list.tail).toBe(new_node);
      expect(list.tail.previous()).toBe(old_node);
    });

  });


  describe("#unshift", function(){
    var list;
    beforeEach(function(){
      list = new List();
    });

    it("should add a node to an empty list", function(){
      list.unshift(1);
      expect(list.head.value).toEqual(1);
    });

    it("should update head and tail for empty list", function(){
      list.unshift(1);
      expect(list.head).toEqual(1);
      expect(list.tail).toBe(list.head);
    });

    it("should update the head of an existing list", function(){
      list.push(2)
      var oldHead = list.head;
      list.unshift(1);
      expect(list.head.value).toEqual(1);
      expect(list.head.next).toEqual(oldHead);
    });

    it("should properly update next node after unshift", function(){
      var oldHeadNode = list.push(2).head;
      list.unshift(1)
      expect(oldHeadNode.previous()).toBe(list.head);
    });
  });

  describe("#getIndex", function(){
    var list;
    beforeEach(function(){
      list = new List();
    });

    it("should start at index 0", function(){
      list.push(1);
      expect(list.getIndex(0)).toEqual(1);
    });
    it("should return the value at an existing index", function(){
      list.push(1).push(2).push(3);
      expect(list.getIndex(1)).toEqual(2);
    });
    it("should return undefined for non-existant indexes", function(){
      expect(list.getIndex(4)).toBe(undefined);
    });
  });  

  describe("#setIndex", function(){
    var list;
    beforeEach(function(){
      list = new List();
    });

    it("should throw a RangeError for indexes greater than length or less than 0", function(){
      expect(list.setIndex(4,5)).toThrow();
    });

    it("should add a node to an empty list", function(){
      list.setIndex(0,1);
      expect(list.head.value).toEqual(1);
    });

    it("should update head and tail for empty list", function(){
      list.setIndex(0,1);
      expect(list.head).toEqual(1);
      expect(list.tail).toBe(list.head);
    });

    it("should update an existing node", function(){
      list.push(1).push(4).push(3);
      var oldNode = list.head.next.next;
      list.setIndex(1,2)
      expect(list.head.next.value).toEqual(2);
    });

    it("should push a new node with value if index is length", function(){
      list.push(1).push(2);
      list.setIndex(2,3);
      expect(list.tail.value).toBe(3);
      expect(list.tail.previous().value).toBe(2);
    });

  });

});
