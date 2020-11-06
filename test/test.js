function doSomething(){}
doSomething.prototype.foo='bar';

var doSomeInstancing = new doSomething();
doSomeInstancing.prop = 'some value';
console.log(doSomeInstancing);

var person1=new doSomething();
var person2 = Object.create(person1);
