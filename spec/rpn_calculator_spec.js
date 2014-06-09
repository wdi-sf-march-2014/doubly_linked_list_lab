var List = require("../app/javascripts/list.js"),
    Stack = require("../app/javascripts/stack.js"),
    RPNCalculator = require("../app/javascripts/rpn_calculator.js");


describe("RPNCalculator", function(){
  var rpnString = "5 1 2 + 4 * + 3 -",
    rpnList;
  it("should parse RPN strings into a List", function(){
    rpnList = RPNCalculator.parse(rpnString);
    expect(rpnList.constructor).toBe(List); 
  });

  it("rpnList should index an rpnString from Left to Right", function(){
    expect(rpnList[0]).toEqual("5");
    expect(rpnList[1]).toEqual("1");
    expect(rpnList[2]).toEqual("2");
    expect(rpnList[3]).toEqual("+");
    expect(rpnList[4]).toEqual("4");
    expect(rpnList[5]).toEqual("*");
    expect(rpnList[6]).toEqual("+");
    expect(rpnList[7]).toEqual("3");
    expect(rpnList[8]).toEqual("-");
  });

  it("should be able to identify a number", function(){
    expect(RPNCalculator.isNumber("5")).toBe(true);
    expect(RPNCalculator.isNumber("-2")).toBe(true);
    expect(RPNCalculator.isNumber("X")).toBe(false);
    expect(RPNCalculator.isNumber("+")).toBe(false);
  });

  it("should be able to identify an operation", function(){
    expect(RPNCalculator.is_operation("+")).toBe(true);
    expect(RPNCalculator.is_operation("-")).toBe(true);
    expect(RPNCalculator.is_operation("*")).toBe(true);
    expect(RPNCalculator.is_operation("/")).toBe(true);
    expect(RPNCalculator.is_operation("=")).toBe(false);

    expect(RPNCalculator.is_operation("+")).toBe(false)
  });
});