var List = require("../app/javascripts/list.js"),
    Stack = require("../app/javascripts/stack.js");

describe("Stack", function(){
  describe("hasOwnProperty", function(){
    var stack = new Stack();

    it("'length'", function(){
      expect(stack.hasOwnProperty("length")).toEqual(true);
    });
    it("'list'", function(){
      expect(stack.hasOwnProperty("list")).toEqual(true);
    });
  }); 

  describe("constructor defaults", function(){
    var stack = new Stack();

    it("'length' is zero", function(){
      expect(stack.length).toBe(0);
    });

    it("'list' a List type", function(){
      expect(stack.list.constructor).toBe(List);
    });
  });

  describe("prototype methods", function(){
    describe("#push", function(){
      var stack = new Stack();

      it("should update length", function(){
        stack.push(1);
        expect(stack.length).toEqual(1);
        stack.push(2);
        expect(stack.length).toEqual(2);
        stack.push(3);
        expect(stack.length).toEqual(3);
      });

    });    

    describe("#pop", function(){
      var stack;
      beforeEach(function(){
        stack = new Stack();
      });

      it("should remove values from end of list", function(){
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.pop()).toEqual(3);
        expect(stack.pop()).toEqual(2);
        expect(stack.pop()).toEqual(1);
      });

      it("should update length", function(){
        stack.push(1);
        stack.push(2);
        stack.push(3);        
        stack.pop();
        expect(stack.length).toEqual(2);
        stack.pop();
        expect(stack.length).toEqual(1);
        stack.pop();
        expect(stack.length).toEqual(0);
      });

      it("should return null for empty stack and have length 0", function(){
        expect(stack.pop()).toBe(null);
        expect(stack.length).toEqual(0);
      });
    });
  });
});