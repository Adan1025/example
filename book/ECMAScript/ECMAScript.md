# ECMAScript 2015+

# ES7
## Array.prototype.includes
>用于检测数组是否包含元素  

### 1. 常用写法Array.prototype.indexOf()
```
[1,2,3,4].indexOf(3) !== -1 // true
~[1,2,3,4].indexOf(3) // true
```
> ~(位异或),对任何数字相当于-(a + 1)   

对于判断元素是否存在的场景存在不足：  
* indexOf()返回的是元素的索引，不存在返回-1，不能只管的告诉你这个元素是否存在，而需要去判断返回的索引是否合法(-1不是合法的索引值)  
* 采用严格比较，所以[NaN].indexOf(NaN) == -1 // true
```
[1,NaN].indexOf(1) // 0
[1,NaN].indexOf(2) // -1
[1,NaN].indexOf(NaN) // -1
```
### 2. **Array.prototype.includes**  
采用SameValueZero比较算法，并且直观的返回true | false
```
[1,NaN].includes(1) // true
[1,NaN].includes(2) // false
[1,NaN].includes(NaN) // true
```

### 3.[语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
* arr.includes(searchElement)  
* arr.includes(searchElement, fromIndex)


searchElement 必填  
　　需要查找的元素值。   
fromIndex 可选  
　　从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索，默认为 0。
```
[1,2].includes(1) // true
[1,2].includes(1,0) // true
```
如果fromIndex大于array.length，则直接返回false。
```
[1,2].includes(2,1) // true
[1,2].includes(1,1) // false
[1,2].includes(2,3) // false
```
如果计算出来的值小于0,则搜索整个数组
```
// [1,2].length + ( -1 ) == 1
[1,2].includes(1,-1) // false 
// [1,2].length + ( -1 ) == 0
[1,2].includes(1,-2) // true
// [1,2].length + ( -3 ) == -1
[1,2].includes(1,-3) // true
```
### 4. 其他用法
```
// 字符串
'hello world'.includes('world') // true

// 函数入参
function fn(){
    [].includes.call(arguments, 'world') // true
}
fn('hello', 'world');
```


## Exponentiation Operator(求幂运算)
```
2 ** 3 // 8
```
```
let a = 2
a **= 3 // 8
```
#### 其它方式
```
// Math.pow函数的实现
Math.pow(2,3) // 8
```
```
// 递归实现
function pow(base, ex) {
    return ex === 1 ? base : base * pow(base, ex - 1)
}
```



# ES8 | ECMAScript 2017
## 一、Async functions
### 1. 概述
Async functions(异步函数)的出现，是为了解决同步回调的噩梦。函数返回的是一个Promise对象
### 2. 声明
- 异步函数声明： `async function foo() {}`
- 异步函数表达式： `const foo = async function () {};`
- 异步函数定义：`let obj = { async foo() {} }`
- 异步箭头函数： `const foo = async () => {};`

### 3. await  
在`async`函数中存在运算符`await`, 执行一个Promis对象并等待其返回结果，如果promise是resolved状态,则await返回结果值，如果是rejected状态,则抛出异常。  
对于异常通过发fn().catch(){} 捕获异常|reject状态值，也可通过`try{}catch(err){}` 捕获

```
let sleep = function() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log('开始执行sleep');
            if (Math.random() * 2 > 1) {
                resolve('success');
            } else {
                reject('error');
            }
        }, 3000)
    });
}
let run = async function() {
    let result = await sleep();
    console.log('sleep执行完毕')
    return result;
}
run().then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
```
执行结果
```
D:\Users\天冰\Desktop\demo\ECMAScript>babel-node async.js
开始执行sleep
error

D:\Users\天冰\Desktop\demo\ECMAScript>babel-node async.js
开始执行sleep
sleep执行完毕
success
```
注意：async本身返回的就是一个Promise对象， 所以await后面可以接async函数 
```
await asyncFunc();
```
### 4. 处理多个异步函数
- 顺序处理
```
async function run(){
    let result1 = await asyncFunc1();
    cosole.log('result1')
    let result2 = await asyncFunc2();
    cosole.log('result2')
}

// 执行结果
// result1
// result2
```
- 并行处理
```
async function run(){
    let [result1, result2] = await Promise.all([
        asyncFunc1(),
        asyncFunc2()
    ]);
    console.log(result1, result2);
}
```

## 二、Object.entries()和Object.values()

### 1. Object.entries()
将对象拆成一个二维数组
```
let obj = {key1: 1, key2:2};
Object.entries(obj) // [['key1', 1], ['key2', 2]]
```
和for-of结合
```
let obj = {key1: 1, key2:2};
for(let [key,value] of Object.entries(obj) ){
    console.log(`key: ${key}, value: ${value}`);
}
// key: key1, value: 1
// key: key2, value: 2
```
### 2. Object.values()
获取到对象的value值组
```
let obj = {key1: 1, key2:2};
Object.values(obj) // [1,2]
```
### 3. 注意
- symbols属性会被忽略
```
let obj = {key1: 1, [Symbol()]:2}
Object.entries(obj) // [['key1', 1]]
Object.values(obj)  // [1]
```
- 入参不能为空、null、undefined(其它类型暂未发现异常)
```
Object.entries(0) // []
Object.entries('') // []
Object.entries(Symbol) // []
Object.entries('ab') // [['0','a'], ['1','b']]

Object.entries() // Uncaught TypeError: Cannot convert undefined or null to object
Object.entries(null) // Uncaught TypeError
Object.entries(undefined) // Uncaught TypeError
```
## 三、Object.getOwnPropertyDescriptors()
### 1. 概述
返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性，如果没有任何自身属性，则返回空对象。
```
var obj = {
    [Symbol()]: 123,
    get bar() { return 'bar' },
    foo: 'foo'
};
console.log(Object.getOwnPropertyDescriptors(obj));

// {bar: {…}, foo: {…}, Symbol(): {…}}
// bar: {get: ƒ, set: undefined, enumerable: true, configurable: true}
// foo: {value: "foo", writable: true, enumerable: true, // configurable: true}
// Symbol(): {value: 123, writable: true, enumerable: true, configurable: true}
// __proto__: Object
```
### 2. 参数
Object.getOwnPropertyDescriptors(obj)  
- obj   
需要查找的对象

### 3. 属性描述符
一个属性描述符是一个记录，由下面属性当中的某些组成的：

- value
该属性的值(仅针对数据属性描述符有效)
- writable
当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
- get
获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- set
获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- configurable
当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
- enumerable
当且仅当指定对象的属性可以被枚举出时，为 true。


## 四、padStart和padEnd
填充字符串，在字符串前或者后添加指定字符,并且规定填充最长长度
### 1. 参数
String.prototype.padStart(maxLength, fillString=' ')  
String.prototype.padEnd(maxLength, fillString=' ')
- maxLength  最大字符串长度   
　　若被操作的字符串本身长度大于maxLength，则返回原始字符串
    负责填充fillString值直到长度为maxLength的字符串   
- fillString=' ' 填充的字符串，默认为' '  
　　padStart在字符串开始位置插入，padEnd在字符串结束位置插入
```
'x'.padStart(5,'0') // '0000x'
'x'.padEnd(5,'0')   // 'x0000'
'x'.padStart(5)     // '    x'
'uvwxyz'.padEnd(5,'0')  // 'uvwxyz'
```
### 2. 为什么要用padStart和padEnd
填充字符串的用例包括：

- 以等宽字体显示平整的数据。
- 在文件名或URL中添加计数或ID：'file 001.txt'。
- 对齐控制台输出： 'Test 001: ✓'。
- 打印具有固定位数的十六进制或二进制数字：’0x00FF’。
- 输出十位数格式的月、日： '01' 

## 五、尾随逗号
> Trailing commas in function parameter lists and calls
### 1. 合法尾随逗号
- 参数定义中的尾随逗号现在是合法的：
```
function callback(arg1, arg2, ){}
```
- 函数调用中的尾随逗号也合法
```
callback('arg1', 'arg2', );
```
- 数组会忽略最后那个逗号
```
[1,2,3,].length // length: 3
[1,2,3,,,].length // length: 5
```
- 从ECMAScript 5开始，对象文字中的尾随逗号也是合法的
```
let obj = { 
  foo: "bar", 
  baz: "qwerty",
  age: 42,
};
```

### 2. 非法尾随逗号
```
function f(,) {} // SyntaxError: missing formal parameter
(,) => {};       // SyntaxError: expected expression, got ','
f(,);             // SyntaxError: expected expression, got ','

function f(...p,) {} // SyntaxError: parameter after rest parameter
(...p,) => {}        // SyntaxError: expected closing parenthesis, got ','
```
### 3.解构尾随逗号
```
let [a, b,] = [1, 2];
let {p, q,} = {
  p: 42, 
  q: true,
};
```
使用延伸操作符时，尾随逗号会抛出异常
```
let [a, ...b,] = [1, 2]; // SyntaxError: Rest element must be last element

```

## 六、Shared memory and atomics
> 容我实践实践


## 参考
[GitHub](https://github.com/tc39/proposals/blob/master/finished-proposals.md)  
[exploringjs](http://exploringjs.com/es2016-es2017/)