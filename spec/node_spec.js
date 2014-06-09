var Node = require("../app/javascripts/Node.js");


describe("Node", function(){

  describe("hasOwnProperty", function(){
    var node = new Node();

    it("'value' ", function(){
      expect(node.hasOwnProperty("value")).toEqual(true);
    });

    it("'next'", function(){
      expect(node.hasOwnProperty("next")).toEqual(true);
    });

    it("previous", function(){
      expect(node.hasOwnProperty("previous")).toEqual(true);
    });
  });

  describe("constructor defaults", function(){
    var node = new Node();

    it("'value' ", function(){
      expect(node["value"]).toBe(null);
    });

    it("'next'", function(){
      expect(node["next"]).toBe(null);
    });
    it("previous", function(){
      expect(node.previous()).toEqual(null);
    });
  });

  describe("constructor with value", function(){

    it("sets node.value ", function(){
      var node = new Node(1);
      expect(node.value).toBe(1);
    });

    it("sets node.previous to a function that returns null ", function(){
      var node = new Node(1);
      expect(node.previous.constructor.name).toBe("Function");
      expect(node.previous()).toBe(null);
    });

  });

  describe("prototype has own property", function(){
    var proto = Node.prototype;
    expect(proto.hasOwnProperty("setPrevious")).toBe(true)
  }); 

  describe("#setPrevious", function(){
    var node = new Node(2);
    var prev_node = new Node(1);
    node.setPrevious(prev_node)
    expect(node.previous()).toBe(prev_node);
  });
})
