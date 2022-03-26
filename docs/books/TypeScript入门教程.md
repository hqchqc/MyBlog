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

#### 访问联合类型的属性或方法  

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


<CommentService />
