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
     








 

### <a name="T">泛型</a>  

<CommentService />
