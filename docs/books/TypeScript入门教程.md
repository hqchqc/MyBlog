# TypeScript入门教程

> 🎨 原文链接： [TypeScript入门教程](https://ts.xcatliu.com/) 这里主要记录阅读的笔记部分！

## 简介
### 什么是TypeScript

> Typed JavaScript at Any Scale.   
> 添加了**类型系统**的 JavaScript，适用于**任何规模**的项目。

#### TypeScript的特性  
##### 类型系统
从 TypeScript 的名字就可以看出来，「类型」是其最核心的特性。  

我们知道，JavaScript 是一门非常灵活的编程语言：  
- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
- 函数是 JavaScript 中的一等公民，可以赋值给变量，也可以当作参数或返回值。  

这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，从 2013 年开始就一直蝉联最普遍使用的编程语言排行榜冠军；另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。

而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。  

###### TypeScript是静态类型  
类型系统按照「类型检查的时机」来分类，可以分为**动态类型**和**静态类型**。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型。  

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型  

###### TypeScript是弱类型  
类型系统按照「是否允许隐式类型转换」来分类，可以分为**强类型**和**弱类型**。  

>强/弱是相对的，Python 在处理整型和浮点型相加时，会将整型隐式转换为浮点型，但是这并不影响 Python 是强类型的结论，因为大部分情况下 Python 并不会进行隐式类型转换。相比而言，JavaScript 和 TypeScript 中不管加号两侧是什么类型，都可以通过隐式类型转换计算出一个结果——而不是报错——所以 JavaScript 和 TypeScript 都是弱类型。

##### 适用于任何规模
TypeScript可以适用任何规模的项目，而且是渐进式的！

##### 与标准同步发展  
TypeScript 的另一个重要的特性就是坚持与 ECMAScript 标准同步发展。 

#### 总结  
什么是 TypeScript？  

- TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
- TypeScript 是一门静态类型、弱类型的语言。
- TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性。
- TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
- TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
- TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
- TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。

### Hello TypeScript
任何语言都逃不出被Hello Word支配的命运!  

首先创建一个``hello.ts``文件，编写以下代码  

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

然后执行 ``tsc hello.ts``   
这时候会生成一个编译好的文件 ``hello.js`` ：

```javascript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```  

**TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查  
**TypeScript 编译的时候即使报错了，还是会生成编译结果**，我们仍然可以使用这个编译之后的文件。  

## 基础

### 原始数据类型
JavaScript数据分为两种数据类型，一种是原始数据类型，一种是对象类型  
原始数据类型有七种  
- 布尔值(boolean)
- 数值(number)
- 字符串(string)
- null
- undefined
- Symbol
- bigInt

#### 布尔值
TypeScript中使用``boolean``定义布尔值类型  

```typescript
let isDone:boolean = false
```

使用构造函数``Boolean``创造的对象返回的不是布尔值

```typescript
let createdByNewBoolean: boolean = new Boolean(1);

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
```

事实上``new Boolean()``返回的是一个``Boolean``对象
```typescript
let createdByNewBoolean: Boolean = new Boolean(1);
```

直接调用``Boolean``也能返回一个``boolean``类型  
```typescript
let createdByBoolean: boolean = Boolean(1);
```  

在 TypeScript 中，``boolean``是 JavaScript 中的基本类型，而`` Boolean ``是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样，不再赘述。  

#### 数值
 使用``number``定义数值类型  
 ```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
 ```  

#### 字符串 
使用``string``定义字符串类型  

```typescript
  let myName: string = "Tom";
  let myAge: number = 25;

  // 模板字符串
  let sentence: string = `Hello, my name is ${myName}.
  I'll be ${myAge + 1} years old next month.`;
```  

#### Null和Undefined
在 TypeScript 中，可以使用 ``null`` 和 ``undefined``来定义这两个原始数据类型  
```typescript
  let u: undefined = undefined;
  let n: null = null;
```  

与 ``void`` 的区别是，``undefined`` 和 ``null`` 是所有类型的子类型。也就是说 ``undefined`` 类型的变量，可以赋值给 ``number`` 类型的变量：  

```typescript
// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u: undefined;
let num: number = u;
```  

而 ``void`` 类型的变量不能赋值给 ``number`` 类型的变量：  
```typescript
  let u: void;
  let num: number = u;

  // Type 'void' is not assignable to type 'number'.
```  

#### 空值
JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 ``void`` 表示没有任何返回值的函数：  

```typescript
function alertName(): void {
  alert('My name is Tom');
}
```  

声明一个 ``void`` 类型的变量没有什么用，因为你只能将它赋值为 ``undefined`` 和 ``null``（只在 --strictNullChecks 未指定时）：  
```typescript
let unusable: void = undefined;
```  

### 任意值  
任意值（Any）用来表示允许赋值为任意类型。  

#### 什么是任意值类型  
如果是一个普通类型，在赋值过程中改变类型是不被允许的  

```javascript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```  
但如果是 ``any`` 类型，则允许被赋值为任意类型。

```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```  

### 类型推论  
如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。  

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查**  

```typescript
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 联合类型  
联合类型（Union Types）表示取值可以为多种类型中的一种。  

#### 例子  

联合类型使用 ``|`` 分隔每个类型。  

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```  

#### <a name="Common">访问联合类型的属性或方法</a>

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里**共有的属性或方法**：  

```typescript
function myTest(sonmething: string | number):number {
  return sonmething.length
} 

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

### 对象的类型——接口  
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。  

#### 什么是接口  
在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。  

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。  

#### 简单的例子  

```typescript
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: "qc",
  age: 24,
};
```  

**接口一般首字母大写**。有的编程语言中会建议接口的名称加上**I**前缀。  

定义的变量比接口少或是多了一些的属性是不被允许的。  

**赋值的时候，变量的形状必须和接口的形状保持一致**  

#### 可选属性  
有时我们希望不要完全匹配一个形状，那么可以用可选属性：  

```typescript
interface Person {
  name: string;
  age?: number;
}

let person: Person = {
  name: "qc",
};
```  

这时仍然不允许添加未定义的属性：  
```typescript
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};

// examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```  

#### 任意属性  
有时候我们希望一个接口允许有任意的属性，可以使用如下方式：  
```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
};
```  

使用 ``[propName: string]`` 定义了任意属性取 string 类型的值。  

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：  

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：  
```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
```  

#### 只读属性  
有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：  

```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```  

**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**  

```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: 'Tom',
  gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

### 数组的类型  

在 TypeScript 中，数组类型有多种定义方式，比较灵活。  

#### 「类型 + 方括号」表示法  
最简单的方法是使用「类型 + 方括号」来表示数组：  

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
```  

数组的项中不允许出现其他的类型： 

```typescript
let fibonacci: number[] = [1, '1', 2, 3, 5];

// Type 'string' is not assignable to type 'number'.
```  

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：  

```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');

// Argument of type '"8"' is not assignable to parameter of type 'number'.
```  

上例中，push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了。这里 "8" 是一个字符串字面量类型，会在后续章节中详细介绍。   

#### 数组泛型  
我们也可以使用数组泛型（Array Generic） ``Array<elemType>`` 来表示数组：  

```typescript
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

关于泛型，可以参考<a href="#T">泛型</a>一章。  

#### 用接口表示数组  
接口也可以用来描述数组：  
```typescript
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```  

**NumberArray** 表示：只要索引的类型是数字时，那么值的类型必须是数字。  

虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。  

不过有一种情况例外，那就是它常用来表示类数组  

#### 类数组  
类数组（Array-like Object）不是数组类型，比如 **arguments**：  

```typescript
function sum() {
  let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```  
上例中，arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：  
```typescript
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```  

这个例子要注意一下，在之前的章节我们讲了如果采用``[]``的声明方式，那么对象中其它值得类型应该是这个类型得子集，这里要说明一下，这个限制只针对``[]``中得值的类型为``string``的时候有这项限制！  

>有一个前提，任意属性的类型为string时，那么确定属性和可选属性的类型都必须为它的类型的子集，这个例子是number类型，所以没有报错，你把任意属性类型换成string就会  

事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：  

```typescript
function sum() {
  let args: IArguments = arguments;
}
```

其中 ``IArguments`` 是 TypeScript 中定义好了的类型，它实际上就是：  

```typescript
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```  

#### any在数组中的作用  
一个比较常见的做法是，用 ``any`` 表示数组中允许出现任意类型   

```typescript
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

### 函数的类型 

#### 函数声明
在 JavaScript 中，有两种常见的定义函数的方式——函数声明和函数表达式：  

```javascript
// 函数声明（Function Declaration）
function sum(x, y) {
  return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
  return x + y;
};
```  

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：  

```typescript
function sum(x: number, y: number): number {
    return x + y;
}
```  

注意，**输入多余的（或者少于要求的）参数，是不被允许的**:   

```typescript
function sum(x: number, y: number): number {
    return x + y;
}
sum(1, 2, 3);

sum(1);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
```   

#### 函数表达式  

```typescript
let mySum = function (x: number, y: number): number {
  return x + y;
};
```

**要注意我们使用上面那种声明方式时，其实我们只定义了右边匿名函数的部分，mySum还是依靠类型推论出来的**  

```typescript
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```  

注意不要混淆了 TypeScript 中的 ``=>`` 和 ES6 中的 ``=>``。  

在 TypeScript 的类型定义中，``=>`` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。  

#### 用接口定义函数的形状  
我们也可以使用接口的方式来定义一个函数需要符合的形状：  

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```  
采用函数表达式或接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。  

#### 可选参数  
前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？

与接口中的可选属性类似，我们用 ``?`` 表示可选的参数：  

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```  

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**  

```typescript
function buildName(firstName?: string, lastName: string) {
  if (firstName) {
    return firstName + ' ' + lastName;
  } else {
    return lastName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
```  

#### 参数默认值  
在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**  

```typescript
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```  

此时就不受「可选参数必须接在必需参数后面」的限制了  

```typescript
function buildName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```  

#### 剩余参数  
ES6 中，可以使用 ``...rest`` 的方式获取函数中的剩余参数（rest 参数）：  

```typescript
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
  });
}

let a: any[] = [];
push(a, 1, 2, 3);
```  

事实上，``items`` 是一个数组。所以我们可以用数组的类型来定义它：  

```typescript
function push(array: number[], ...items: number[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```  

注意，rest 参数只能是最后一个参数   

#### 重载  
重载允许一个函数接受不同数量或类型的参数时，作出不同的处理  

比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。  

利用联合类型，我们可以这么实现：  

```typescript
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```  

**这样就会有一个问题就是不够精确，也和重载这个定义可以说有那么一点不相关，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串**  

这时，我们可以使用重载定义多个 ``reverse`` 的函数类型  

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```  

并且这里函数的实现要在函数类型声明的后面  

上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。  

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。


### 类型断言  
类型断言（Type Assertion）可以用来手动指定一个值的类型。  

#### 语法  

```typescript
值 as 类型
```  

或  

```typescript
<类型>值
```  

要注意的是如果在``react``中``<>``除了表示是一个``ReactNode``之外还可能表示泛型  

#### 类型断言的用途  

类型断言的常见用途有以下几种：  
  1. 将一个联合类型断言为其中一个类型  
     <a href="#Common">之前提到过</a>，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，**我们只能访问此联合类型的所有类型中共有的属性或方法**：  
      ```typescript
        interface Cat {
          name: string;
          run(): void;
        }
        interface Fish {
          name: string;
          swim(): void;
        }

        function getName(animal: Cat | Fish) {
          return animal.name;
        }
      ```  

      而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如  

      ```typescript
        interface Cat {
          name: string;
          run(): void;
        }
        interface Fish {
          name: string;
          swim(): void;
        }

        function isFish(animal: Cat | Fish) {
          if (typeof animal.swim === 'function') {
            return true;
          }
          return false;
        }

        // index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
        // Property 'swim' does not exist on type 'Cat'.
      ```  

      上面的例子中，获取 ``animal.swim`` 的时候会报错。

      此时可以使用类型断言，将 ``animal`` 断言成 ``Fish``  

      ```typescript
        interface Cat {
          name: string;
          run(): void;
        }
        interface Fish {
          name: string;
          swim(): void;
        }

        function isFish(animal: Cat | Fish) {
          if (typeof (animal as Fish).swim === 'function') {
            return true;
          }
          return false;
        }
      ```  
      这样就可以解决访问 ``animal.swim`` 时报错的问题了。  

      需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：  

      ```typescript
        interface Cat {
          name: string;
          run(): void;
        }
        interface Fish {
          name: string;
          swim(): void;
        }

        function swim(animal: Cat | Fish) {
          (animal as Fish).swim();
        }

        const tom: Cat = {
          name: 'Tom',
          run() { console.log('run') }
        };
        swim(tom);
        // Uncaught TypeError: animal.swim is not a function`
      ```  

      上面的例子编译时不会报错，但在运行时会报错：  

      ``Uncaught TypeError: animal.swim is not a function``  

      原因是 (animal as Fish).swim() 这段代码隐藏了 animal 可能为 Cat 的情况，将 animal 直接断言为 Fish 了，而 TypeScript 编译器信任了我们的断言，故在调用 swim() 时没有编译错误。  
      
      可是 swim 函数接受的参数是 Cat | Fish，一旦传入的参数是 Cat 类型的变量，由于 Cat 上没有 swim 方法，就会导致运行时错误了。  

      总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。  

  2. 将一个父类断言为更加具体的子类  
     当类之间有继承关系时，类型断言也是很常见的：  
    
     ```typescript
      class APIError extends Error {
        code: number = 500;
      }
      class InterfaceError extends Error {
        statusCode: number = 200;
      }

      function isAPIError(error: Error) {
        if (typeof (error as APIError).code === "number") {
          return true;
        }
        return false;
      }
     ``` 

     这里我们看到我们声明了``isAPIError``函数，用来判断传入的是不是``APIError``类型，为了达成目的，这里只能将``error``断言为``APIError``类型, 即它的参数的类型肯定得是比较抽象的父类``Error``，这样的话这个函数就能接受 ``Error`` 或它的子类作为参数了  

     但是由于父类``Error``中没有 ``code`` 属性，故直接获取 ``error.code`` 会报错，需要使用类型断言获取 ``(error as ApiError).code``。  

     大家可能会注意到，在这个例子中有一个更合适的方式来判断是不是 ``ApiError``，那就是使用 ``instanceof``。  

     ```typescript
      class ApiError extends Error {
        code: number = 0;
      }
      class HttpError extends Error {
        statusCode: number = 200;
      }

      function isApiError(error: Error) {
        if (error instanceof ApiError) {
          return true;
        }
        return false;
      }
     ```  

     上面的例子中，确实使用`` instanceof ``更加合适，因为 ``ApiError`` 是一个 ``JavaScript`` 的类，能够通过 ``instanceof`` 来判断 ``error`` 是否是它的实例。    
     
     但是有的情况下 ``ApiError`` 和 ``HttpError`` 不是一个真正的类，而只是一个 ``TypeScript`` 的接口（interface），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 ``instanceof`` 来做运行时判断了  

     ```typescript
      interface ApiError extends Error {
        code: number;
      }
      interface HttpError extends Error {
        statusCode: number;
      }

      function isApiError(error: Error) {
        if (error instanceof ApiError) {
          return true;
        }
        return false;
      }

      // index.ts:9:26 - error TS2693: 'ApiError' only refers to a type, but is being used as a value here.
     ```  

     此时就只能用类型断言，通过判断是否存在 ``code`` 属性，来判断传入的参数是不是 ``ApiError`` 了：  

     ```typescript
      interface ApiError extends Error {
        code: number;
      }
      interface HttpError extends Error {
        statusCode: number;
      }

      function isApiError(error: Error) {
        if (typeof (error as ApiError).code === 'number') {
          return true;
        }
        return false;
      }
     ```  

  3. 将任何一个类型断言为``any``  
     
     理想情况下，TypeScript 的类型系统运转良好，每个值的类型都具体而精确。  

     需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。

     **它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any**。  

     总之，一方面不能滥用 ``as any``，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。  
    
  4. 将``any``断言为一个更加具体的子类   
     
     在日常的开发中，我们不可避免的需要处理 ``any`` 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 ``TypeScript`` 类型系统的限制而无法精确定义类型的场景。   

     遇到 ``any`` 类型的变量时，我们可以选择无视它，任由它滋生更多的 ``any``。

     我们也可以选择改进它，通过类型断言及时的把 ``any`` 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

     举例来说，历史遗留的代码中有个 ``getCacheData``，它的返回值是 any：  

     ```typescript
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }
     ```  
     那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：  

     ```typescript
      function getCacheData(key: string): any {
        return (window as any).cache[key];
      }

      interface Cat {
        name: "mimi";
        run: () => void;
      }

      const result = getCacheData("tom") as Cat;
      result.run();
     ```  

     上面的例子中，我们调用完 ``getCacheData`` 之后，立即将它断言为 ``Cat`` 类型。这样的话明确了 ``tom`` 的类型，后续对 ``tom`` 的访问时就有了代码补全，提高了代码的可维护性。  

     

 

#### 类型断言的限制  

从上面的例子中，我们可以总结出  
- 联合类型可以断言为其中一个类型  
- 父类可以断言为子类  
- 任何类型都可以被断言为any  
- any可以被断言为任何类型  

那么类型断言到底有没有限制呢？是不是任何类型都可以被断言为另一个类型呢？  

答案是否定的——并不是任何类型都可以被断言为任何另一个类型  

具体来说，若``A``兼容``B``,那么``A``能够被断言为``B``，``B``也能被断言为``A``   

下面我们通过一个简化的例子，来理解类型断言的限制：  

```typescript
interface Animal {
  name: string;
}

interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: "miao",
  run() {
    console.log("miao miao");
  },
};
let animal: Animal = tom;
```   

上面例子中我们把``Car``类型的``tom``赋值给``Animal``类型的``animal``,但其实``animal``仍然是只有``Animal``类型中的属性，并没有``run``方法。  

我们知道，``TypeScript`` 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。

在上面的例子中，``Cat`` 包含了 ``Animal`` 中的所有属性，除此之外，它还有一个额外的方法 ``run``。``TypeScript`` 并不关心 ``Cat`` 和 ``Animal`` 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 ``Cat extends Animal`` 是等价的：   

```typescript
interface Animal {
  name: string;
}

interface Cat extends Animal {
  run(): void;
}
```  

那么也不难理解为什么 ``Cat`` 类型的 ``tom`` 可以赋值给 ``Animal`` 类型的 ``animal`` 了——就像面向对象编程中我们可以将子类的实例赋值给类型为父类的变量。

我们把它换成 ``TypeScript`` 中更专业的说法，即：``Animal`` **兼容** ``Cat``  

当 ``Animal`` 兼容 ``Cat`` 时，它们就可以互相进行类型断言了：  

```typescript
interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: "miao",
  run() {
    console.log("miao miao");
  },
};
let animal: Animal = tom;

function testAnimal(animal: Animal) {
  return animal as Cat;
}

function testCat(cat: Cat) {
  return cat as Animal;
}
```  

即  

- 允许 ``animal as Cat`` 是因为「父类可以被断言为子类」，这个前面已经学习过了
- 允许 ``cat as Animal`` 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」  

需要注意的是，这里我们使用了简化的父类子类的关系来表达类型的兼容性，而实际上 TypeScript 在判断类型的兼容性时，比这种情况复杂很多。  

总之，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。  

同理，若 B 兼容 A，那么 A 能够被断言为 B，B 也能被断言为 A。  

所以这也可以换一种说法：  

要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可，这也是为了在类型断言时的安全考虑，毕竟毫无根据的断言是非常危险的。  

综上所述：  

- 联合类型可以被断言为其中一个类型   
- 父类可以被断言为子类  
- 任何类型都可以被断言为 ``any`` 
- ``any``可以被断言为任何类型  
- 要使得 ``A`` 能够被断言为 ``B``，只需要 ``A`` 兼容 ``B`` 或 ``B`` 兼容 ``A``即可  

其实前四种情况都是最后一个的特例。  

#### 双重断言  
既然：  

- 任何类型都可以被断言为 any  
- any 可以被断言为任何类型   

那么我们是不是可以使用双重断言 as any as Foo 来将任何一个类型断言为任何另一个类型呢？   

```typescript
interface Cat {
  run(): void;
}
interface Fish {
  swim(): void;
}

function testCat(cat: Cat) {
  return (cat as any as Fish);
}
```  

在上面的例子中，若直接使用 cat as Fish 肯定会报错，因为 Cat 和 Fish 互相都不兼容。

但是若使用双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，将任何一个类型断言为任何另一个类型。

若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。  

**除非迫不得已，千万别用双重断言。**  

#### 类型断言 vs 类型转换  

类型断言只会影响 ``TypeScript`` 编译时的类型，类型断言语句在编译结果中会被删除：  

```typescript
function toBoolean(something: any): boolean {
  return something as boolean;
}

toBoolean(1);
// 返回值为 1  
```  

在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：  

```typescript
function toBoolean(something) {
  return something;
}

toBoolean(1);
// 返回值为 1
```  

所以类型断言不是类型转换，它不会真的影响到变量的类型。  

若要进行类型转换，需要直接调用类型转换的方法：  

```typescript
function toBoolean(something: any): boolean {
  return Boolean(something);
}

toBoolean(1);
// 返回值为 true
```  

#### 类型断言 vs 类型声明  

在这个例子中：  

```typescript  
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

let data = getCacheData("Hello") as Cat;

data.run();
```  

我们使用 ``as Cat`` 将 ``any`` 类型断言为了 ``Cat`` 类型。  

但实际上还有其他方式可以解决这个问题：  

```typescript
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

let data: Cat = getCacheData("Hello");
data.run();
```  
上面的例子中，我们通过类型声明的方式，将 tom 声明为 Cat，然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。  

这和类型断言是非常相似的，而且产生的结果也几乎是一样的——tom 在接下来的代码中都变成了 Cat 类型。  

它们的区别，可以通过这个例子来理解：  

```typescript  
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: "tom",
};
let tom = animal as Cat;  
```  

在上面的例子中，由于 Animal 兼容 Cat，故可以将 animal 断言为 Cat 赋值给 tom。

但是若直接声明 tom 为 Cat 类型  

```typescript
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: 'tom'
};
let tom: Cat = animal;

// index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
```  

则会报错，不允许将 animal 赋值为 Cat 类型的 tom。

这很容易理解，Animal 可以看作是 Cat 的父类，当然不能将父类的实例赋值给类型为子类的变量。

深入的讲，它们的核心区别就在于  

- animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
- animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行  

但是 Cat 并不兼容 Animal。

而在前一个例子中，由于 getCacheData('tom') 是 any 类型，any 兼容 Cat，Cat 也兼容 any，故  

`` const tom = getCacheData('tom') as Cat; ``  

等价于  

`` const tom: Cat = getCacheData('tom'); ``  

知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。  

所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。  

#### 类型断言 vs 泛型

还是这个例子：  

```typescript
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```  

我们还有第三种方式可以解决这个问题，那就是泛型：  

```typescript
function getCacheData<T>(key: string): T {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```  

通过给 getCacheData 函数添加了一个泛型 ``<T>``，我们可以更加规范的实现对 getCacheData 返回值的约束，这也同时去除掉了代码中的 any，是最优的一个解决方案。   

### 内置对象  

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。  

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。  

#### ECMAScript 的内置对象  

ECMAScript 标准提供的内置对象有：  

``Boolean、Error、Date、RegExp`` 等。  

我们可以在 TypeScript 中将变量定义为这些类型：  

```typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```  

#### DOM 和 BOM 的内置对象  

DOM 和 BOM 提供的内置对象有：  

``Document、HTMLElement、Event、NodeList`` 等。  

TypeScript 中会经常用到这些类型：  

```typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```  

它们的定义文件同样在 TypeScript 核心库的定义文件中  

#### TypeScript 核心库的定义文件  

TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。  

当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，比如：  

```typescript
Math.pow(10, '2');

// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```  

上面的例子中，Math.pow 必须接受两个 number 类型的参数。事实上 Math.pow 的类型定义如下：  

```typescript
interface Math {
  /**
   * Returns the value of a base expression taken to a specified power.
   * @param x The base value of the expression.
   * @param y The exponent value of the expression.
   */
  pow(x: number, y: number): number;
}
```  

**注意，TypeScript 核心库的定义中不包含 Node.js 部分。**  

#### 用 TypeScript 写 Node.js  

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：   

`` npm install @types/node --save-dev ``  

### 声明文件  
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。  

#### 什么是声明语句  

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 ``<script>`` 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了。  

我们通常这样获取一个 id 是 foo 的元素：   

```typescript
$('#foo');
// or
jQuery('#foo');
```  

但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西：  

```typescript
jQuery('#foo');
// ERROR: Cannot find name 'jQuery'.
```  

这时，我们需要使用 ``declare var`` 来定义它的类型：  

```typescript
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```  

上例中，**declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查**，在编译结果中会被删除。它编译结果是：  

```typescript
jQuery('#foo');
```  

#### 什么是声明文件  

通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件：  

声明文件必需以 .d.ts 为后缀。  

一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。  

假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。  

##### 第三方声明文件  

当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：jQuery in DefinitelyTyped。  

我们可以直接下载下来使用，但是更推荐的是使用 @types 统一管理第三方库的声明文件。  

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：   

``npm install @types/jquery --save-dev``  

#### 书写声明文件  

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。前面只介绍了最简单的声明文件内容，而真正书写一个声明文件并不是一件简单的事，以下会详细介绍如何书写声明文件。  

在不同的场景下，声明文件的内容和使用方式会有所区别。  

库的使用场景主要有以下几种：  

- 全局变量：通过 ``<script>`` 标签引入第三方库，注入全局变量
- npm 包：通过 import foo from 'foo' 导入，符合 ``ES6`` 模块规范
- UMD 库：既可以通过 ``<script>`` 标签引入，又可以通过 ``import`` 导入
- 直接扩展全局变量：通过 ``<script>`` 标签引入后，改变一个全局变量的结构
- 在 npm 包或 UMD 库中扩展全局变量：引用 ``npm`` 包或 ``UMD`` 库后，改变一个全局变量的结构
- 模块插件：通过 ``<script>`` 或 ``import`` 导入后，改变另一个模块的结构  

##### 全局变量  

全局变量是最简单的一种场景，之前举的例子就是通过 ``<script>`` 标签引入 jQuery，注入全局变量 $ 和 jQuery。   

使用全局变量的声明文件时，如果是以 ``npm install @types/xxx --save-dev`` 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）：   

```
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```  

全局变量的声明文件主要有以下几种语法：  

- ``declare var`` 声明全局变量
- ``declare function`` 声明全局方法
- ``declare class`` 声明全局类
- ``declare enum`` 声明全局枚举类型
- ``declare namespace`` 声明（含有子属性的）全局对象
- ``interface`` 和 ``type`` 声明全局类型  

``declare var``  
在所有的声明语句中，declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别：  

```typescript
// src/jQuery.d.ts

declare let jQuery: (selector: string) => any;
```  

``declare function``  

declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义  

```typescript
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
```  

``declare class``  

当全局变量是一个类的时候，我们用 declare class 来定义它的类型  

```typescript
// src/Animal.d.ts

declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}
```  

``declare enum``  
使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums），举例如下  

```typescript
// src/Directions.d.ts

declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
```  

与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值。  

Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。它编译结果是：  

``var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];``  

``declare namespace``  

namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间    

由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。  

随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了，故我们不再需要学习 namespace 的使用了。  

namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。  

比如 jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，那么我们就应该使用 declare namespace jQuery 来声明这个拥有多个子属性的全局变量。  

```typescript
// src/jQuery.d.ts

declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
}
```  

###### 嵌套的命名空间  

如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型   

```typescript
// src/jQuery.d.ts

declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
  namespace fn {
    function extend(object: any): void;
  }
}
```  

假如 jQuery 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套 namespace:   

```typescript
// src/jQuery.d.ts

declare namespace jQuery.fn {
  function extend(object: any): void;
}
```  

``interface`` 和 ``type``  

除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型  

```typescript
// src/jQuery.d.ts

interface AjaxSettings {
  method?: 'GET' | 'POST'
  data?: any;
}
declare namespace jQuery {
  function ajax(url: string, settings?: AjaxSettings): void;
}
```  

``type`` 与 ``interface`` 类似  

###### 防止命名冲突  

暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下  

```typescript
// src/jQuery.d.ts

declare namespace jQuery {
  interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
  }
  function ajax(url: string, settings?: AjaxSettings): void;
}
```  

注意，在使用这个 interface 的时候，也应该加上 jQuery 前缀：  

```typescript
// src/index.ts

let settings: jQuery.AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo'
  }
};
jQuery.ajax('/api/post_something', settings);
```  

###### 声明合并  

如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们不会冲突的合并起来  

##### npm包  

一般我们通过 import foo from 'foo' 导入一个 npm 包，这是符合 ES6 模块规范的。  

在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文件可能存在于两个地方：   

1. 与该 npm 包绑定在一起。判断依据是 package.json 中有 types 字段，或者有一个 index.d.ts 声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。  

2. 发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 ``npm install @types/foo --save-dev``。这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 @types 里了。  

假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 import 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：  

1. 创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。这种方式不需要额外的配置，但是 node_modules 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。  

2. 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。  

目录结构：  
```
/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```  

tsconfig.json 内容：  

```
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
      "*": ["types/*"]
    }
  }
}
```  

如此配置之后，通过 import 导入 foo 的时候，也会去 types 目录下寻找对应的模块的声明文件了。  

注意 module 配置可以有很多种选项，不同的选项会影响模块的导入导出模式。这里我们使用了 commonjs 这个最常用的选项，后面的教程也都默认使用的这个选项。    

npm 包的声明文件主要有以下几种语法：  

- ``export``导出变量  
- ``export namespace``导出（含有子属性的）对象
- ``export default``ES6 默认导出  
- ``export=``commonjs 导出模块   

##### UMD库  

既可以通过 ``<script>`` 标签引入，又可以通过 ``import`` 导入的库，称为 ``UMD`` 库。相比于 ``npm`` 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 ``export as namespace``  

``export as namespace``  

一般使用 ``export as namespace`` 时，都是先有了 ``npm`` 包的声明文件，再基于它添加一条 ``export as namespace`` 语句，即可将声明好的一个变量声明为全局变量，举例如下  

```typescript
// types/foo/index.d.ts

export as namespace foo;
export = foo;

declare function foo(): string;
declare namespace foo {
  const bar: number;
}
```  

当然它也可以与 export default 一起使用：  

```typescript
// types/foo/index.d.ts

export as namespace foo;
export default foo;

declare function foo(): string;
declare namespace foo {
  const bar: number;
}
```  

##### 声明文件中的依赖  

一个声明文件有时会依赖另一个声明文件中的类型，比如在前面的 ``declare module`` 的例子中，我们就在声明文件中导入了 ``moment``，并且使用了 ``moment.CalendarKey`` 这个类型  

```typescript
// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
  export function foo(): moment.CalendarKey;
}
```  

除了可以在声明文件中通过 import 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，那就是**三斜线指令**。  

###### 三斜线指令  

与 namespace 类似，三斜线指令也是 ts 在早期版本中为了描述模块之间的依赖关系而创造的语法。随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的三斜线指令来声明模块之间的依赖关系了。  

但是在声明文件中，它还是有一定的用武之地。   

类似于声明文件中的 import，它可以用来导入另一个声明文件。与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：  

1. 当我们在书写一个全局变量的声明文件时
2. 当我们需要依赖一个全局变量的声明文件时














## 进阶  
### 类型别名   

类型别名用来给一个类型起个新名字。  

#### 简单的例子  

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```  

上例中，我们使用 ``type`` 创建类型别名。  

类型别名常用于联合类型。   

### 字符串字面量类型  
字符串字面量类型用来约束取值只能是某几个字符串中的一个  

#### 简单的例子  
```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvenet(ele: Element,event:EventNames) {
  // do something
}  
handle(document,getElementById('hello'), 'scroll');  // 没问题
handle(document.getElementById('world'), 'dbclick');  // 报错 event不能为 ‘dbClick'
```  

上例中，我们使用``type``定义了一个字符串字面量类型``EventNames``,它只能取三种字符串中的一种。  

注意，**类型别名与字符串字面量类型都是使用 ``type`` 进行定义**。
### <a name="T">泛型</a>  

<CommentService />
