# Vue2

## 前言  
> 这块内容是之前上学时候写的，在之前的博客写的内容有点杂，有些代码的地方好像会报错，详细请看csdn上的吧，可能会全一点~

## 初体验

**1.  认识 Vue.js**

Vue是一个渐进式的框架，什么是**渐进式**呢？
简单来说，就是它可以做到一点一点把原本使用的技术替换成Vue的，两种技术可以共存，例如从jQuery慢慢地过渡到Vue.js。
它意味着你可以将Vue作为你应用地一部分嵌入其中，带来更丰富地交互体验，或者如果你希望将更多的业务逻辑使用Vue实现，那么Vue的核心库以及其生态系统，比如Core+Vue-router+Vuex也可以满足你的各种需求。
Vue有很多特点和Web开发中常见的高级功能：

 - 解耦试图和数据
 - 可复用的组件
 - 前端路由技术
 - 状态管理
 - 虚拟DOM
 
**2.  安装 Vue.js**

安装这里就不赘述了，详情可以见官网

然后是最简单的一个Vue大概的样子

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="container">
        <h1>{{name}}</h1>
        <h1>{{message}}</h1>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el:'#container', //用于挂在要管理的元素
            data:{	//定义数据
                name:'beanBag',
                message:'成功！'
            }
        })
    </script>
</body>
</html>
```  

## MVVM、插值操作及绑定属性  

**- 什么是MVVM**  
 	Model–view–viewmodel，它是一种软件架构模式（其实我也不理解，大概就是数据和视图相分离吧）
 	
 **- Vue中的MVVM**  
 ![](https://img-blog.csdnimg.cn/20200207185500355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)  
 如上图，Model模型对视图View中的DOM进行事件监听，视图View中的DOM的数据与Model模型进行绑定。
**- 插值操作**
Mustache（胡子/胡须）语法，也叫双大括号语法{{ }} ，大括号中间不仅可以写变量也可以写简单表达式。
下面是一些常用的插值操作,总的script代码如下：

```javascript
<script>
    setTimeout(()=>{
        const app = new Vue({
        el: '#container',
        data: {
            message:'插值操作相关 v-once操作 只显示一次',
            url: '<h1 style="color:red;">v-html操作 解析html</h1>',
            name: '插值操作相关 v-text操作 不灵活',
            age: '插值操作相关 v-pre操作 不解析',
            cloak:'插值操作相关 v-cloak操作 不闪动'
        } 
    })
    },2000)
</script>
```

 1. v-once：元素和指令只渲染一次，不会随着数据的改变而改变。 

	```javascript  
  `<h1 v-once>message</h1>`
  ```
 2. v-html：可以解析HTML元素  

	```javascript
  `<h1 v-html = 'url'></h1>`
  ```  
 3. v-text: 和{{}}功能类似，展示文本一般不用，因为不够灵活，会覆盖标签里面的内容
 	```javascript
   `<h1 v-text = 'name'>aa</h1>`
  ```
 4. v-pre: 不解析，原封不动的显示
 	```javascript 
   `<h1 v-pre>{{age}}</h1> `
  ```
 
 5. `v-cloak`:不会闪动，在vue解析之前 div中会有此属性，解析之后，此属性消失
 
 注：以上script标签加了延时函数，是为了让 `v-cloak` 的功能更好的展示
 
 **- 绑定属性**
 以上方法都是针对值而进行的改变，那么有没有一种是针对属性的呢，答案就是有的，就是 v-bind : 动态绑定 ，例如可以动态绑定 img 标签的 src 属性等等
 有两种语法：
 
 1. 对象语法，即类的值是一个对象，例如
 

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active{
            color:cyan;
        }
        .actives{
            font-size: 10em;
        }
    </style>
</head>
<body>
    <div id="container">
        <p v-bind:class="{active:isClass,actives:isActives}">{{message}}</p>
        <button v-on:click = 'change'>变色</button>
    </div>

    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data:{
                message:'hello',
                isClass:false,
                isActives:false
            },
            methods: {
                change:function(){
                    this.isClass = !this.isClass;
                    this.isActives = !this.isActives;
                }
            }
        })
    </script>
</body>
</html>
```

 2. 数组语法，即类的值是一个数组，例如

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active{
            color:cyan;
        }
        .actives{
            font-size: 10em;
        }
    </style>
</head>
<body>
    <div id="container">
        <p :class="getClass()">{{message}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el:'#container',
            data:{
                message:'数组语法',
                active:'active',
                actives:'actives'
            },
            methods:{
                getClass:function(){
                    return [this.active,this.actives];
                }
            }
        })
    </script>
</body>
</html>
```
v-bind的语法糖形式是省略前面的 v-bind，保留一个：
v-on的语法糖形式是把 v-on: 替换成 @

---
学习了以上内容，有一个案例需要实现 ：点击列表中的任意一项，使得那一项所在的li标签变色，代码如下：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .change {
            color: cyan;
        }
    </style>
</head>

<body>
    <div id="container">
        <ul>
            <li v-for='(attr,index) in movies' v-on:click='color(index)' :class='{change:index == status}'>{{attr}}</li>
        </ul>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                movies: ['海王', '小黄人大眼萌', '海绵宝宝', '进击的巨人'],
                status: 0
            },
            methods: {
                color: function (index) {
                    this.status = index;
                }
            }
        })
    </script>
</body>

</html>
```

## 动态绑定style及计算属性  
继昨天学习的动态绑定class属性，今天是动态绑定style属性，同样的，也分为数组语法和对象语法，一般数组语法应用的不多，了解即可。

 - 对象语法

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="container">
        <h2 v-bind:style="{fontSize:fontSize}">{{message}}</h2>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                message: 'hello',
                fontSize: '100px'
            }
        })
    </script>
</body>

</html>
```

 - 数组语法
 

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="container">
        <h1 :style='[baseStyle , baseStyles]'>{{message}}</h1>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                message: 'hello',
                baseStyle: { background: 'red' },
                baseStyles: { fontSize: '20px' },
            }
        })
    </script>
</body>

</html>
```
今天还学了一个计算属性 computed ，作用呢看起来与methods方法差不多，实际上它们的差别还是有的，在computed中，存在着 set 和 get两个方法，但是我们一般都将他们简写了，但是还是要知道有这两样东西
**computed 与 methods 的区别？**
computed在使用中，系统会存在有缓存，当检测到数据没有发生改变时，computed会使用缓存中的数据，但是methods会重复调用其中的函数，所以在这方面来说，methods的性能要比低一些。
下面是一些基本的例子：
set和get函数：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="container">
        <h1>{{message}} {{finalName}}</h1>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                message: 'hello',
                startName: 'real',
                endName: 'cute'
            },
            computed: {
                finalName: {
                    set: function(){
                        console.log('---');
                    },
                    get:function () { 
                        return this.startName + ' ' + this.endName; 
                    }

                }
            }
        })
    </script>
</body>
</html>
```
基本使用：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="container">
        <h1>总价格 {{totalPrice}}</h1>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                books: [{id:'1000',name:'Linux编程原理',price:100},
                        {id:'1001',name:'php编程原理',price:110},
                        {id:'1002',name:'C编程原理',price:120},
                        {id:'1003',name:'Java编程原理',price:130}]
            },
            computed:{ //计算属性 函数名一般不加动词
                totalPrice:function(){
                    let price = 0;
                    for(let attr in this.books){
                        price += this.books[attr].price
                    }
                    return price; 
                }
            }
        }) 
    </script>
</body>
</html>
```  

## 事件监听、条件判断及循环的使用
- 事件监听
 	**v-on:** 
	 - 语法糖形式：@
	 - 参数：event
	 - 作用：绑定事件监听器
	 - 注意事项：在传入参数时，有以下几种情况需要特别注意(见代码中的注释部分)并且在传入event作为参数的时候，要加＄，即$event
	 

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="container">
        <!-- 1.本身不需要传参时  加不加() 结果都一样 -->
        <button @click="btn1()">按钮一</button>
        <button @click="btn1">按钮一</button>

        <!-- 2.本身需要传参时 1).只写了()没传参 显示undefined  2). ()都没写 会把event打印出来-->
        <button @click="btn2()">按钮二</button>
        <button @click="btn2">按钮二</button>

        <!-- 3.本身既需要传入event 又需要传入其它参数  1)只写了()没传参 显示两个undefined 2).()都没写 会把event打印出来
                另一个显示undefined 3).只写了data那个参数，event没写 报错显示两个undefined  4).只写了$event 会显示event
                和undefined -->
        <button @click="btn3()">按钮三</button>
        <button @click="btn3">按钮三</button>
        <button @click="btn3($event)">按钮三</button>

    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            methods: {
                btn1() {
                    console.log('btn1 start');
                },
                btn2(data) {
                    console.log(data);
                },
                btn3(data, event) {
                    console.log(data, event);
                }
            }
        })
    </script>
</body>

</html>
```
	

 - 修饰符：修饰符主要有以下四种
 				1. **.strop**：阻止冒泡，例如在一个div中包含一个button，并且在div和button上都绑定有点击事件，当点击button时div中的点击事件也相应的触发，如果我们不希望它触发，可以使用本修饰符，详情可以见下面例子
 				2. **.prevent**：阻止默认事件，一般是阻止表单中的submit，由自己的方法进行提交时使用，详情可以见下面例子
 				3. **.{keyCode|keyAlias}**：阻止键盘事件，阻止键盘事件，并且以自己希望的某一个按键触发，详情可以见下面例子
 				4. **.once**：只触发一次回调 详情可以见下面例子
 	

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="container">
        <div @click='div' id="box">
            <!-- 1. .stop 阻止冒泡 -->
            <button @click.stop='btn1' id="btn1">按钮一</button>
        </div>
        <br />
        <form>
            <!-- 2. .prevent 阻止默认事件 -->
            <input type='submit' @click.prevent='btn2'>
        </form>
        <!-- 3. .{keyCode|keyAlias} 阻止键帽只对设置的起作用 -->
        <input type="text" @keyup.enter='btn3'>
        <!-- 4. .once 只触发一次回调 -->
        <button @click.once='btn4'>按钮4</button>
    </div>
    <script src="vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            methods: {
                btn1() {
                    console.log('btn1');
                },
                div() {
                    console.log('div');
                },
                btn2() {
                    console.log('submit');
                },
                btn3() {
                    console.log('阻止键帽')
                },
                btn4() {
                    console.log('btn4');
                }
            }
        })
    </script>
</body>

</html>
```

 - 条件判断,由于这个和以前的if语句差不多，就直接看案例吧
 		1. v-if
 		2. v-else
 		3. v-else-if

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="container">
        <h1 v-if='score>90'>优秀</h1>
        <h1 v-else-if='score>=70'>良好</h1>
        <h1 v-else-if='score>=60'>及格</h1>
        <h1 v-else>不及格</h1>

    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',   
            data: {
                score: 50
            }         
        })
    </script>
</body>
</html>
```
当然我们一般不会这么写，只是为了体现v-if的使用，一般都会另写函数进行判断。
案例一：实现点击切换登录按钮，将默认的账号登陆变为邮箱登录，见代码

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="container">
        <span v-if='isUser'>
            <label for="username">账号登陆</label>
            <input type="text" placeholder="账号登陆" id="username" key='username'>
        </span>
        <span v-else>
            <label for="username">邮箱登陆</label>
            <input type="text" placeholder="邮箱登陆" id="email" key='email'>
        </span>
        <button @click='isUser = !isUser'>切换登录</button>
    </div>

    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                isUser: true
            }
        })
    </script>
</body>

</html>
```
**问题**：当我们点击切换登录按钮时，虽然它确实切换成邮箱登录，但是如果已经在input标签中写有内容，这时候内容并不会清空，这是为什么？
**答**：很显然，vue在处理整个页面的时候，并没有重新渲染整个页面，而是出于性能考虑，会尽可能的服用已经存在的元素，而不是重新创建新的元素，vue中通过diff算法，会比较两次的不同再进行渲染，所以我们只需在input标签中添加key，并且保证两个input标签中的key不相同即可，vue就会帮助我们重新渲染这个标签。
这里同时引出了另一个知识点，就是 **v-show** 的使用，大致和v-if是差不多的，都是用来控制一个元素是否进行显示的下面介绍一下两者的**区别**。

	 - v-if：当条件为false时，根本就不会存在与dom中
	 - v-show：当条件为false时，v-show只是给元素增加了 display:none ，从而使其隐藏
 这些我们可以通过开发者模式中看出来，**那么如何选择呢？**
 当我们的显示与隐藏的频率特别高时，使用 v-show;
 当我们的频率特别低时，使用 v-if


- 循环，这部分内容也较简单，直接贴代码了

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="container">
        <!-- 1.遍历数组 格式：(index,attr)-->
        <p v-for='(attr,index)  in books'>{{index}}-{{attr}}</p>
        <!-- 2.遍历对象 格式: (value,key,index)-->
        <p v-for='(attr,value,index) in students'>{{attr}}-{{value}}-{{index}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data:{
                books: ['php开发教程','java开发教程','c语言开发教程','python开发教程'],
                students: {
                    name: 'beanBag',
                    age: 22
                }
            }
        })
    </script>
</body>
</html>
```
这里有几点值得注意的就是，**官方推荐我们在使用v-for的时候，最好是添加 :key**，这样可以是我们更高效的更新虚拟DOM，key值和后面跟着的数据的名称相同 例如 
```javascript
`<li v-for='attr in books' :key='attr'>{{attr}}</li> ` 

```
至于为什么，我的理解是当我们进行例如插入的操作时，如果没有指定key值，那么原来的key和value之间的配对关系会被重新分配，从而增加了开销，如果指定了key值，那么key和value之间的配对关系不会重新分配，而是只增加插入元素的配对关系，节约了开销。

---
最后补充一个知识点，数组中有些方法即使你改变了数组中的值，页面上也不会马上渲染出来，**比如通过索引值直接修改数组中的元素**，这点在下面那个购物车案例中，体现尤为明显。那么哪些方法是**响应式**的呢？

 1. push	在数组当中的末尾增加元素
 2. pop		删除数组中的末尾元素
 3. shift	删除数组中的首位元素
 4. unshift	在数组当中的首位添加元素
 5. splice		可以对数组进行删除/替换/插入操作，较为强大
 6. sort		对数组进行排序d
 7. reverse	翻转数组
 
 这里对splice方法进行一下说明，因为使用的较多
1.  **删除**：第一个参数表示从哪一个元素开始，第二个参数表示你要删除几个元素,第三个参数如果没传则删除后面的所有元素；
 2. **替换**：第一个参数表示从哪一个元素开始，第二个参数表示你哟啊替换几个元素，第三个参数是用来替换的元素；
2.  **插入**：第一个参数表示从哪一个元素开始，第二个参数为0，第三个参数为要的元素。

在vue中还有一个方法可以是响应式的修改数组中的数据
``Vue.set(要修改的对象，索引值，修改后的值)``

学完以上的知识后，可以实现一个案例，就是购物车案例，这里我另贴一篇博客好了，见链接( https://blog.csdn.net/qq_43709292/article/details/104240962 )。  

## 购物车案例  
实现的大致效果如下图：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209212641285.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)  

代码如下：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
    <div id="container">
        <table class="table table-striped table-hover" align="center" id="box">
            <tr>
                <th></th>
                <th>书籍名称</th>
                <th>出版日期</th>
                <th>价格</th>
                <th>购买数量</th>
                <th>操作</th>
            </tr>
            <tr v-for='i in id' v-if='isShow[i]'>
                <td>{{i+1}}</td>
                <td>{{books[i]}}</td>
                <td>{{date[i]}}</td>
                <td>￥{{price[i]}}</td>
                <td>
                    <button style="width: 30px;height:30px;" @click='UnAdd(i)'
                        v-bind:disabled='counter[i]<=1'>-</button>
                    <p style="display:inline-block">{{counter[i]}}</p>
                    <button style="width: 30px;height:30px;" @click='Add(i)'>+</button>
                </td>
                <td>
                    <button @click='remove(i)'>移除</button>
                </td>
            </tr>
        </table>
        <p>总价：￥ {{total}}</p>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                id: [0, 1, 2, 3],
                counter: [1, 1, 1, 1],
                price: [85.00, 59.00, 39.00, 128.00],
                books: ['《《算法导论》》', '《《UNIX编程艺术》》', '《《编程珠玑》》', '《《代码大全》》'],
                date: ['2006-9', '2006-2', '2008-10', '2006-3'],
                isShow: ['true', 'true', 'true', 'true']
            },
            computed: {
                total() {
                    let finalPrice = 0;
                    for (let i = 0; i <= 3; i++) {
                        finalPrice = finalPrice + this.counter[i] * this.price[i];
                    }
                    return finalPrice;
                }
            },
            methods: {
                Add(i) {
                    ++this.counter[i];
                    this.counter.splice(i, 1, this.counter[i]++);
                },
                UnAdd(i) {
                    --this.counter[i];
                    this.counter.splice(i, 1, this.counter[i]--);
                },
                remove(i) {
                    this.isShow[i] = !this.isShow[i];
                    this.isShow.splice(i, 1, this.isShow[i]);

                }
            }
        })
    </script>
</body>

</html>
```
本次案例由于是我自己写的，没有按照老师的写法，所以出现了一些问题，不过收获还是有的，这里记录一下。
 没有实现的功能：**总价在进行移除操作后，是没办法减去移除元素价格的**。
 在看了老师的写法后，才发现是数据结构的问题，老师的数据是在一个大的数组中放了4个对象，每个对象存入书的名称，价格等等，这样一来在获取数据方面就方便得多了，而我把它放在数组中，所以没有实现的功能基本上是无解的，这才意识到数据结构的重要性。另外还有几个补充知识点：
 

 1. 过滤器，在上面的案例中，价格前面有一个$符号，我采用的是拼接的方式，但是这样的方式对纯数据来说不太友好，所以引入过滤器，filters，本质上还是几个函数；
 2. 对数据的处理的一个方法 toFixed(numer) number表示要添加几个小数零；
 3. 为按钮绑定disabled后，按钮不能进行点击，见上面的代码即可。

在做这个案例的时候，一开始没有注意前面那个数组中的非响应式的方法，耽误了比较多的时间，后来才发现转为splice方法，下次要注意一下。  

## 表单绑定、组件化及ES6语法的补充  
 **- 表单绑定**  ``v-model ``    

 - 作用：实现表单元素和数据的**双向绑定**；
 - 本质：``v-bind`` 指令和 ``v-on``指令的结合，``v-bind``绑定一个value属性，并且          			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;``v-on``给当前元素绑定input事件;
```javascript
<input type="text" v-bind:value='message' v-on:input='message=$event.target.value'>
```
 - 与其它标签的结合使用(见代码)：
 		1. ``radio``
 		2. ``checkbox`` 单选：一般传递一个布尔值；多选：传递数组
 		3. ``select``

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 注：一般一个label会包一个input，这样点击文字的时候也会有反应 -->
    <div id="container">
        <!-- 1. 与 radio 的结合使用 -->
        <input type="radio" name="sex" v-model='sex' value="男">男
        <input type="radio" name="sex" v-model='sex' value="女">女
        <h3>您选择的是：{{sex}}</h3>

        <!-- 2. 与 checkbox 的结合使用 -->
        <input type="checkbox" id="agree" v-model='isAgree'>同意协议
        <button v-bind:disabled='!isAgree'>下一步</button>
        <h3>您选择的是：{{isAgree}}</h3>
        <input type="checkbox" value="打篮球" v-model='hobbies'>打篮球
        <input type="checkbox" value="打羽毛球" v-model='hobbies'>打羽毛球
        <input type="checkbox" value="打乒乓球" v-model='hobbies'>打乒乓球
        <input type="checkbox" value="打排球" v-model='hobbies'>打排球
        <h3>您选择的是：{{hobbies}}</h3>

        <!-- 3. 与 select 的结合使用 -->
        <select v-model='fruits'>
            <option>苹果</option>
            <option>西瓜</option>
            <option>香蕉</option>
            <option>草莓</option>
        </select>
        <h3>您选择的是：{{fruits}}</h3>
        <select v-model='moreFruits' multiple>
            <option>苹果</option>
            <option>西瓜</option>
            <option>香蕉</option>
            <option>草莓</option>
        </select>
        <h3>您选择的是：{{moreFruits}}</h3>

        <!-- 值绑定 -->
        <label v-for='attr in originHobbies'>
            <input type="checkbox" :value="attr" v-model='hobbies'>{{attr}}
        </label>
        <h3>您选择的是：{{hobbies}}</h3>
    </div>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                message: 'hello',
                sex: '男',
                isAgree: true,
                hobbies: ['打篮球'],
                originHobbies: ['打篮球', '打羽毛球', '打乒乓球', '打排球'],
                fruits: '',
                moreFruits: []
            }
        })
    </script>
</body>

</html>
```

以上代码引出一个知识点就是关于**值绑定**，项目实际开发过程中，不会让以上的例如爱好等数据定死，而是从服务器端请求回来的，所以要使用值绑定的操作，其实还是``v-bind``的使用。

 - 修饰符
 	1. ``lazy``回车或失去焦点时触发，双向绑定中，由于前台页面不需要实时的与数据像绑定，只需要用户输入结束时再更新数据，故有此修饰符来减少刷新次数；
 	2. ``number``保证数据的类型是number类型，若没有此修饰符，即使在input中指定类型为number,在你改变这个值之后，浏览器都会自动变成String类型来处理；
 	3. ``trim``去掉前面后面的空格，中间的空格是不会去的；
 	
 ---
 - **组件化**
 
	**什么是组件化？**
一个页面拆分成一个个小的功能块，每个功能块完成属于自己这部分独立功能，那么之后整个页面的管理和维护就会变得非常容易了。

	**Vue的组件化思想**
	它提供了一种抽象，让我们可以开发出一个个独立可复用的小组件，用来构造我们的应用，任何的应用都会被抽象成一棵组件树。

	**注册组件的基本步骤**(代码如下)
	1. 创建组件构造器(调用``Vue.extend()``方法创造组件构造器)；
	2. 注册组件(调用``Vue.component(使用的标签名，构造器实例名)``方法);
	3. 使用组件(在**Vue实例的作用范围内**使用组件)。
	

```javascript
	<div id="app">
        <my-cpn></my-cpn>
    </div>
    <script src="./vue.js"></script>
    <script>
        //1.创建组建构造器
        const cpn = Vue.extend({
            template: `
            <div>
                <p>这是模板嗷！</p>
            </div>
            `
        });
        //2.注册组件
        Vue.component('my-cpn', cpn);

        const app = new Vue({
            el: '#app'
        }) 
    </script>
```



**全局组件和局部组件的创建**(代码如下)

全局组件可以在多个Vue的实例下面使用，而局部组件只有在特定的实例下面才能使用。

```javascript
<body>
    <div id="container">
        <my-tpl></my-tpl>
        <my-tpl></my-tpl>
        <my-tpl></my-tpl>
        <tpl></tpl>
    </div>
    <div id="box">
        <!-- <tpl></tpl> -->
        <tpl></tpl>
    </div>
    <script src="./vue.js"></script>
    <script>
        //全局组件 只有在Vue的实例对象中才能用
        const cpn = Vue.extend({
            template: `
                <div>
                    <p>这是全局组件</p>
                </div>
            `
        });
        const cpns = Vue.extend({
            template: `
                <div>
                    <p>这是局部组件</p>
                </div>
            `
        });
        Vue.component('my-tpl', cpn);
        const app = new Vue({
            el: '#container'
        });
        const box = new Vue({
            el: '#box',
            //局部组件
            components: {
                // mytpl使用组件时的标签名
                tpl: cpns
            }
        })
    </script>
</body>
```
**父组件和子组件的创建**(代码如下)

```javascript
<body>
    <div id="container">
        <cpn2></cpn2>
        <cpn1></cpn1>
    </div>
    <script src="./vue.js"></script>
    <script>
        //子组件
        const cpnC1 = Vue.extend({
            template:`
                <div>
                    <p>这是第一个</p>
                </div>
            `
        });
        //父组件
        const cpnC2 = Vue.extend({
            template:`
                <div>
                    <p>这是第二个</p>
                    <cpn1></cpn1>
                </div>
            `,
            components:{
                cpn1:cpnC1
            }
        });
        const app = new Vue({
            el: '#container',
            components:{
                cpn2:cpnC2,
                cpn1:cpnC1
            }
        });
    </script>
</body>
```
这个父组件和子组件我口头表述也有点绕，还是看代码吧，具体就是在父组件被创建的时候，模板中使用到了子组件，就可以在父组件构造器中增添一个``compontents``属性，此属性下面跟着的对象就是原本正常注册组件的两个参数，即使用到的标签名和模板的标签名。

**注册组件的语法糖形式**(代码如下)
不难发现，在注册组件时传递的第二个参数就代表着创建组件构造器的的实例对象，我们只需将实例对象即``template``部分传递到注册组件中即可，这样一来就不用写``Vue.extend()``方法了

```javascript
<body>
    <div id="container">
        <cpn1></cpn1>
        <cpn2></cpn2>
    </div>
    <script src="./vue.js"></script>
    <script>
        Vue.component('cpn1', {
            template: `
                <div>
                    <p>语法糖形式全局组件</p>
                </div>
            `
        });
        const app = new Vue({
            el: '#container',
            components: {
                'cpn2': {
                    template: `
                    <div>
                        <p>语法糖形式局部组件</p>
                    </div>
                    `
                }
            }
        });
    </script>
</body>
```
**模板的分离写法**(代码如下)
以上的写法中，我们又发现，如果在script代码中书写大量的HTML语法显得非常臃肿，所以我们又可以将template进行分离，主要有两种方式。
1. 使用``<script type="text/x-template" >``标签
2. 使用``<template>``标签

将HTML标签写在这两个其中一个标签中均可。

```javascript
<body>
    <div id="container">
        <cpn></cpn>
        <cpn3></cpn3>
    </div>
    <script type="text/x-template" id="cpn1">
        <div>
            <p>全局分离这是模板哦</p>
        </div>
    </script>
    <template id="cpn2">
        <div>
            <p>局部分离这也是模板哦</p>
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        Vue.component('cpn',{
            template:'#cpn1'
        });
        const app = new Vue({
            el: '#container',
            components:{
                cpn3:{
                    template:'#cpn2'
                }                
            }
        })
    </script>
</body>
```
**数据的问题**
我们又想，以往的Vue实例中，可以很轻松的从data属性中获取数据，那么我现在如果在模板中也需要用到数据怎么办呢?可以直接像以往的Vue实例中拿到数据吗？答案是否定的，**在组件内部是不能够访问实例数据的**，此时问题就来了，怎么获取数据呢？实际上，在注册组件时的第二个传递对象的参数中，是可以添加data数据的，**并且组件中的data必须是一个函数，返回值必须是一个对象**。
至于为什么是一个函数，其实很好理解，如果像以往的Vue实例访问数据一样，那么如果有多个组件同时在对同一个数据进行处理的话，它们之间就会相互影响，这就违背了组件化的一个开发思想，所以Vue要求我们的data必须是一个函数，**因为每当调用一次函数的时候，其内部都会开辟一块内存空间**，这个内存空间是相互独立的，互不影响的，所以说这个值不会被其修改，避免了牵一发而动全身这样的情况。以下案例可以很好的说明这一点，代码如下：

```javascript
<body>
    <div id="container">
        <tpl></tpl>
        <tpl></tpl>
        <tpl></tpl>

    </div>
    <template id="tpl">
        <div>
            <h1>当前计数：{{counter}}</h1>
            <button v-on:click = 'add'>+</button>
            <button @click = 'down'>-</button>
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        // const counter={
        //     counter:0
        // }
        Vue.component('tpl',{
            template:'#tpl',
            data(){
                return {
                    counter:0
                }
            },
            methods:{
                add(){
                    this.counter++;
                },
                down(){
                    this.counter--;
                }
            }
        });
        const app = new Vue({
            el: '#container'
        })
    </script>
</body>
```
此时我们可以把我注释的那部分去掉注释，并将``counter：0``修改为``counter``，这时候可以模拟data不是函数的情况，此时我们调用了多次的组件，当你点击第一个组件的按钮时，其它组件的值全都会一起改变，这就很好的说明了以上那一点。

**父子组件的通信问题** 

1. 父组件向子组件传递数据
	我们通过props属性向子组件传递数据
	

```javascript
<body>
    <div id="container">
        <!-- 如果没有v-bind会把movie直接当字符串输出  不会当成变量 -->
        <cpn :cmessage="message" :cmovies="movie"></cpn>
    </div>
    <template id="cpn">
        <div>
            <ul>
                <li v-for='attr in cmovies'>{{attr}}</li>
            </ul>
            <p>{{cmovies}}</p>
            <p>{{cmessage}}</p>
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        const cpn = {
            template: '#cpn',
            //props:['cmovies'],
            props:{ //1.类型限制
                //cmovies:Array,
                // cmessage:String

                //2.提供一些默认值 上面没有传使用默认值
                cmessage:{
                    type:String,
                    default:'aaaa',
                    required:false   //此属性必传 不传报错  
                },
                // 类型是对象或者数组时 默认值必须是一个函数
                cmovies:{
                    type:Array,
                    // default:[]  //2.5.x 版本一下这样不会错 否则报错
                    default(){
                        return []
                    }
                }
            },
            data(){
                return{

                }
            }
        };
        const app = new Vue({
            el: '#container',
            data:{
                message: 'hello',
                movie: ['海王','海绵宝宝','海尔兄弟']
            },
            components:{
                cpn
            }
        })
    </script>
</body>
```
另外在props中还可以对数据进行一些类型 默认值 是否必须传递此属性等进行控制，可以学习一下

2. 子组件向父组件传递数据
	我们通过事件向父组件发送消息($emit)，父组件监听子组件的事件即可
	

```javascript
<body>
    <div id="container">
        <tpl v-on:sendclick='sendClicks'></tpl>
    </div>
    <template id="tpl">
        <div>
            <button v-for='attr in some' @click='btnClick(attr)'>{{attr.name}}</button>
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        const tpl = {
            template:'#tpl',
            data(){
                return {
                    some:[
                        {id:'aaa',name:'热门推荐'},
                        {id:'bbb',name:'手机数码'},
                        {id:'ccc',name:'家用电器'},
                        {id:'ddd',name:'酒水饮料'}
                    ]
                }
            },
            methods: {
                btnClick(attr){
                    //发送一个事件
                   this.$emit('sendclick',attr);
                }
            },
        }
        const app = new Vue({
            el: '#container',
            components:{
                tpl
            },
            methods: {
                sendClicks(attr){
                    console.log(attr);
                }
            },
        })
    </script>
</body>
```

注意**以上所有的props中的命名好像不能遵循驼峰原则，浏览器会报错**，之后在脚手架开发中是不会出现的，这点注意一下即可，改成小写或是加 - 都行；还有一个小问题即 **组件的模板里如果有多个标签，要有一个根标签包裹在它们外面**。

有关ES6语法的补充我把它放到和之前的博客一起好了，这里不再赘述了。  

## 父子组件之间访问及插槽使用相关  
继昨天学习了父子组件之间的通信后，有一个案例可以帮助我们加以巩固，需求如下图：
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211201406867.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)  

 当我们在第一个文本框中输入数据时，第一个父组件中的data和子组件中的props会一起改变，并且第二个父组件中的data要是第一个的100倍。步骤大致如下：
1. 父组件向子组件传递数据，拿到数据后props和data就会有值了；
2. 此时修改文本框中的值，虽然界面上的data改变了，但是实际我们发现父组件中的data并未发生改变，所以我们要将子组件中的数据(即input中的值)传递到父组件中，并修改父组件中的值，这时候vue有个关于类型的警号，我们在拿到数据后将它转换以下即可；
3. 至于最后一点100倍的需求，只要在上一步的子组件传递数据给父组件的方法当中将数据乘以100再发送一个请求让父组件监听denumber2值的改变即可。完整代码如下：

```javascript
<body>
    <div id="container">
        <cpn :number1="num1" :number2="num2" @change1='chang1' @change2='chang2'></cpn>
    </div>
    <template id="tpl">
        <div>
            <p>props: {{number1}}</p>
            <p>data: {{dnumber1}}</p>
            <!-- <input type="text" v-model="dnumber1"> -->
            <input type="text" :value="dnumber1" @input="num1input">
            <p>props: {{number2}}</p>
            <p>data: {{dnumber2}}</p>
            <!-- <input type="text" v-model="dnumber2"> -->
            <input type="text" :value="dnumber2" @input="num2input">
        </div>

    </template>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data: {
                num1: 0,
                num2: 1
            },
            methods: {
                chang1(dnumber1) {
                    final1 = parseInt(dnumber1);
                    this.num1 = final1;
                },
                chang2(dnumber2) {
                    final2 = parseInt(dnumber2);
                    this.num2 = final2;
                }
            },
            components: {
                cpn: {
                    template: '#tpl',
                    props: {
                        // 改变一定要来自父组件
                        number1: Number,
                        number2: Number
                    },
                    data() {
                        return {
                            dnumber1: this.number1,
                            dnumber2: this.number2
                        }
                    },
                    methods: {
                        num1input() {
                            this.dnumber1 = event.target.value;
                            this.$emit('change1', this.dnumber1);
                            this.dnumber2 = this.dnumber1 * 100;
                            this.$emit('change2', this.dnumber2);
                        },
                        num2input() {
                            this.dnumber2 = event.target.value;
                            this.$emit('change2', this.dnumber2);
                            this.dnumber1 = this.dnumber2 / 100;
                            this.$emit('change1', this.dnumber1);
                        }
                    }
                }
            }
        })
    </script>
</body>
```

 - **父子组件之间的访问**
在上面的案例中，我们了解了父子组件之间的通信，指的是父子组件之间可以互相传递数据，但是现在如果我们只是想要调用一下子组件或是父组件之间的方法或一些值，并不想改变它，我们应该怎么做呢？所以Vue提供了父子组件的访问方式。

1. 父组件访问子组件 
	1. ``$children``  这个方式主要是通过拿到下标的方式访问的，children返回的是一个数组，所以可以通过下标的方式访问，但是一般真实案例中，用的较少，因为方法本身不是很灵活
	2. ``$refs``	 reference的缩写，采用引用的方式，在父组件中调用模板时，在模板上添加属性实现 ``<tpl ref="aaa"></tpl>``实际开发中这个方式采用的较多

2. 子组件访问父组件
	1. ``$parents``,实际开发中也使用的较少，因为子组件访问父组件的方式，破坏了组件之间的耦合性，所以不建议使用。一些基本的使用见代码
	
	

```javascript
<body>
    <div id="container">
        <tpl ref="aaa"></tpl>
        <button @click='showMessage'>我是父组件中的按钮</button>
    </div>
    <template id="tpl">
        <div>
            <p>我是模板</p>
            <button @click='showPar'>我是子组件中的按钮</button>
            <son></son>
        </div>
    </template>
    <template id="son">
        <div>
            <p>我是孙子</p>
            <button @click='showParents'>我是孙组件中的按钮</button>
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            data:{
                name:'beanBag'
            },
            methods:{
                showMessage(){
                    console.log(this.$children);
                    this.$children[0].show();
                    console.log(this.$refs);
                    this.$refs.aaa.show();
                },
                showKey(){
                    console.log('子组件可以访问父组件啦！');
                }
            },
            components:{
                tpl:{
                    template:'#tpl',
                    methods:{
                        show(){
                            console.log('hello 父组件可以访问到子组件中啦');
                        },
                        showPar(){
                            console.log(this.$parent);
                            console.log(this.$parent.name);
                            this.$parent.showKey();
                            console.log(this.$root);
                        }
                    },
                    components:{
                        son:{
                            template:'#son',
                            methods:{
                                showParents(){
                                    console.log(this.$parent);
                                    console.log(this.$root);
                                }
                            }
                        }
                    }
                }
            }
        })
    </script>
</body>
```

---

**插槽的使用(slot)**  
	插槽的使用是为了让我们封装的组件更加具有拓展性，让使用者可以决定组件内部的一些内容到底展示什么。	
	**1. 插槽的基本使用**
		

```javascript
<body>
    <div id="container">
        <tpl></tpl>
        <tpl>
            <div>1</div>
            <p>2</p>
            <i>3</i>
        </tpl>
        <tpl>ss</tpl>
        <tpl></tpl>
    </div>
    <template id="tpl">
        <div>
            <p>haha</p>
            <!-- 1.插槽的基本使用 -->
            <!-- <slot></slot> -->
            <!-- 2.插槽的默认值 -->
            <!-- <slot>
                    <button>hello</button>
                </slot> -->
            <!-- 3.插槽中如果有多个值，同时放入组件进行替换时，一起作为替换元素 -->
            <slot>
                <p>beanBag</p>
            </slot>
        </div>
        
    </template>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            components: {
                tpl:{
                    template:'#tpl'
                }
            }
        })
    </script>
</body>
```
**2. 具名插槽的使用**  
以上案例我们可以看出当我们需要有多个插槽时，如果想要具体修改某一个插槽，从而不影响其它插槽是非常困难的，所以有具名插槽的提出，类似上面的``$refs``的一个使用，给每一个插槽起一个名字区分它们即可

```javascript
<body>
    <div id="container">
        <tpl>
            <p slot="center">标题</p>
        </tpl>
        <tpl>
            <i slot="right">hello</i>
        </tpl>
        <tpl></tpl>
    </div>
    <template id="tpl">
        <div>
            <slot name="left">
                <p>左边</p>
            </slot>
            <slot name="center">
                <p>中间</p>
            </slot>
            <slot name="right">
                <p>右边</p>
            </slot>           
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            components:{
                tpl:{
                    template:'#tpl'
                }
            }
        })
    </script>
</body>
```
**3. 作用域插槽**  
在这之前，我们需要了解一个知识点，就是**编译的作用域问题**：**父组件模板的所有东西都会在父级作用域内编译，子组件也是同理**，简单来说，就是在template的标签下的模板，都只能访问到子组件中的东西，而不能访问父组件，也就是Vue实例中的东西的，在我们引用这个模板时，编译器在编译到此 tpl(模板名称) 时，已经提前将它要使用的本身子组件中的东西拼接好了，不会再访问父组件中的任何东西，所以子组件此时也是不能访问到父组件中的内容的。
作用域插槽就是可以解决此问题，父组件替换插槽的标签，但是内容由子组件来提供，这样就解决了我们在父组件中不能访问子组件中的数据，但是又必须将子组件中的数据进行修改显示的情况，代码如下

```javascript
<body>
    <div id="container">
        <tpl></tpl>
        <tpl>
            <template slot-scope="slot">
                <!-- <span v-for="attr in slot.data">{{attr}}</span> -->
                <span>{{slot.data.join(' - ')}}</span>
            </template>
        </tpl>
        <tpl></tpl>
    </div>
    <template id="tpl">
        <div>
            <slot :data='languages'>
                <ul>
                    <li v-for='attr in languages'>{{attr}}</li>
                </ul>
            </slot>
        </div>
    </template>
    <script src="./vue.js"></script>
    <script>
        const app = new Vue({
            el: '#container',
            components:{
                tpl:{
                    template:'#tpl',
                    data() {
                        return {
                            languages:['c++','c','java','javascript']
                        }
                    },
                }
            }
        })
    </script>
</body>
```

## webpack的使用及ES6相关  
首先我们可以回顾一下，当我们学习了这么多关于前端开发的东西之后，真正使用到项目当中的时候，会带来什么问题，在实际开发过程中，同一个页面可能会由非常多的人共同完成，这时候就会带来一个问题，当我们把每一个人编写的文件汇总到一起的时候，难免会出现这个变量在你这有使用，在我这它也有被使用，那么我们很难确保同一个变量不会被别人所改变的情况出现，这时候，前端模块化的思想逐渐流行起来。
最开始，人们采用的是原始的JavaScript，用匿名函数和闭包完成一个独立的模块化，这时候问题也随之产生，使用匿名函数和闭包确实能够防止其它开发人员将此变量的值进行改变，但是文件之间的引用就没办法进行了，比如A写的文件中想要引用B写的文件中的一些方法的时候，就会变得非常麻烦，为了解决这个问题，ES6中也有相关的方法，我们可以先学习一下，我们来看下面一个例子：

40-1.js文件

```javascript
// 1. 导出方式一
let name = 'beanBag';
let age = 18;
let height = 1.80;

const sum = function(num1,num2){
    console.log(num1+num2);
}
sum(10,20);
export {name,age,height,sum}

// 2. 导出方式二 定义时直接导出
export let names = 'hqc';
export let ages = 20;

// 3.导出方式三 导出函数/类
export function lzx(){
    console.log('开心最重要');
}
export class Person{
    run(){
        console.log('开始奔跑了！')
    }
}

// 4.导出方式四 导出后参数不唯一 但是同一个模块中只能有一个
let fruits;
export default fruits = 'apple';


```

40-2.js文件

```javascript

let age = 15;
let weight = 70;

// 导入方式一 基本方式
import {height,sum} from './40-1.js'
sum(1,2);
console.log(height);

// 导入方式二 在定义时就导出
import {names} from './40-1.js'
console.log(names);

// 导入方式三 导入类或函数
import {Person,lzx} from './40-1.js'
const person = new Person;
person.run();
lzx();

// 导入方式四 导入后可自定义变量名  
import a from './40-1.js'
console.log(a);

// 导入方式五 使用通配符
import * as just from './40-1.js'
console.log(just.name);
```

html文件

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./40-1.js" type="module"></script>
    <script src="./40-2.js" type="module"></script>
</body>
</html>
```

首先在引用script文件的时候，指明类型为module类型，代表它们是一个单独的模块，互不影响，然后用``export``将需要使用到的方法或者变量甚至是类导出，在引用的文件中用``inport``进行导入即可，主要用以上几种方法。
不仅在ES6中有模块化的使用，同样的，在CommonJs中也有相关模块化的规范，相关案例见代码

info.js文件

```javascript
function add(num1,num2){
    console.log(num1+num2);
}

function Unadd(num1,num2){
    console.log(num1-num2);
}

// 1.CommonJs方式导出
module.exports = {add,Unadd};


```
main.js文件

```javascript
// 使用CommonJs方式导入
const {add,Unadd} = require('./js/info.js');
add(10,20);
Unadd(20,10);
```

有了以上的知识，我们就可以学习webpack了

---

**webpack**
其本质是**现代的JS应用的静态模块化打包工具**，它和grount/gulp的差别是，**grount/gulp更强调的是前端流程的自动化，模块化不是它的核心，恰恰相反的是webpack更加强调模块化的开发流程，而文件压缩合并预处理等功能仅仅使它附带的功能而已**


**1. webpack的起步**
由于webpack依赖于node的相关环境，所以在安装webpack前应该先安装node，
这里我是用的**10.16.2**版本，老师说版本应该大于8.9，所以问题不大，webpack我们使用的是**3.6.0**版本，为之后学习脚手架2做一点铺垫，同时和老师使用的同步，首先我们**全局安装**webpack,使用以下命令
``npm install webpack@3.6.0 -g`` 至于全局安装和局部安装的区别我在下面会说。

安装好了之后，我们在项目中新建一个dist目录用来存放待会儿webpack打包好的文件，再新建src目录存放编写的JavaScript文件,代码如下
main.js

```javascript
// 1.使用CommonJs方式导入
const {add,Unadd} = require('./info.js');
add(10,20);
Unadd(20,10);

// 2.使用ES6方式导入
import {chu} from './math.js';
chu(20,2);

```
info.js

```javascript
function add(num1,num2){
    console.log(num1+num2);
}

function Unadd(num1,num2){
    console.log(num1-num2);
}

// 1.CommonJs方式导出
module.exports = {add,Unadd};
```

math.js

```javascript
function chu(num1,num2){
    console.log(num1/num2);
}
// 2.使用ES6语法导出
export {chu}
```
在JS文件中，采用CommonJs或者是es6的语法都行，这时候轮到webpack出场了，在以往没有webpack中我们需要将每一个文件都进行引入才行，但是有了webpack我们就可以将其打包好的一个文件引入即可，在项目的终端中，输入命令``webpack ./src/main.js  ./dist/bundle.js``,这时候我们就会发现在dist目录下，多了一个bundle.js文件，webpack之后跟着的是**你将导出的变量或者方法等等导入到的那个文件**，千万不要错了嗷！这样就完成了我们对于webpack一个初步的了解。


**2. webpack的配置**
在以上的操作中我们发现，在终端中输入的命令太过于长了，有没有可以实现自动的找到相应目录呢，这时候我们就需要来了解webpack的一个配置了，在文件中新建``webpack.config.js``文件名不能输错，在文件中我们需要指明文件的入口和出口，也就是你将什么文件交给webpack和webpack将处理过后的文件放到哪里去，代码如下

```javascript
const path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    }
}
```
这里的出口需要我们指明的是一个对象类型，第一个path需要跟的是绝对路径，我们采用node中的path模块提供的相关方法，第一个参数就是当前文件所在的目录，第二个参数指文件名，在这之前我们要将node中的npm初始化一下，因为我们用到了这个path模块，使用命令``npm init``这里有一些参数需要填一下，都挺简单的，看着填就行，入口现在可以随便填一个，这里用不到，这时候会自动生成``package.json``文件，这个时候，我们就可以采用webpack的命令直接将我们的文件进行打包，是不是方便多了！
这里我们采用的webpack命令虽然说很简便，但是有的时候，这个命令会特别长，所以我们应该再将这个命令映射一下，找到``package.json``文件中的``script``属性，默认有一个test，它指的是当我们输入``npm run test``的时候，它会自动执行test后面跟着的命令，同样的，我们在它下面加一行``"build": "webpack"``，这时候，我们只要输入``npm run build``就可以使其运行webpack命令了，这里在后期中是比较方便的。
这时候，我们想象另外一个场景，就是当我们在公司中所采用的webpack的版本是4.0的时候，假如你在家里clone项目到本地之后，这时候你的电脑采用的是3.0版本的webpack，**那么当我们在终端中输入命令的时候，它采用的是全局安装的webpack版本**，不论你项目中的webpack是多少版本的，都是先去全局中找你的webpack，这时候就会有问题出现，那么怎么避免呢，这里面，有一个地方是优先在本地中搜索是否有webpack版本，**那就是刚才配置映射关系的scripts，当我们在中做好映射之后，它会优先观察项目中是否有webpack版本，没有再去搜索全局**，这就是全局安装和局部安装的区别，所以这里更推荐局部安装，这里采用命令``npm install webpack@3.6.0  --save-dev``这里的dev指的是``devDependencies``开发时依赖，即只是在开发的时候用到，运行的时候就不需要了，类似于工具人吧！

**3 webpack中的loader**
实际项目中，肯定不止是JavaScript文件需要打包，我们的css文件也是需要打包或转化的，这里就提出了loader，当然，对于webpack本身的能力来说，这些转化是不支持的，所以我们必须为他扩充一些东西即loader,那么怎么使css文件和需要转换的JavaScript文件进行联系呢，这时候，我们只需要在你需要转换的JavaScript文件中引入此css文件即可，例如``require('./css/nomal.css');``，然后在中断中输入命令安装loader,这里我们需要安装两个文件，**一个是用来解析css代码的css-loader,另一个是用来将导出的css代码作为样式添加到DOM中的style-loader**，分别使用命令``npm install --save-dev css-loader ``和``npm install style-loader --save-dev``,安装完成之后，还需要在webpack.config.json文件中进行如下module中的配置

```javascript
const path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
        ]
    }
}
```
其中use数组中的顺序不能错了，否则也会出问题，应该是样式在前，解析在后，为什么呢?因为**使用多个loader时，webpack是从右向左解析的**。  

## webpack中的loader、配置vue及插件使用  

### **- webpack中的loader**  
昨天我们学习了webpack中的css-loader和style-loader，今天我们来学习剩下常用的几个loader

**1. less-loader**
顾名思义，这个loader模块是用来加载less文件的，安装命令为``npm install --save-dev less-loader less`` 前一个less-loader是用来加载less文件，后一个less是为加载less提供的支持文件，用来转化less成css，安装完成后进行相应的配置即可，配置在webpack中的loader里都有，不过这里我还是贴一下好了

```javascript
{
  test: /\.less$/,
  use: [{
      loader: "style-loader" // creates style nodes from JS strings
  }, {
      loader: "css-loader" // translates CSS into CommonJS
  }, {
      loader: "less-loader" // compiles Less to CSS
  }]
},
```

**2. url-loader和file-loader**
less文件处理完了之后，还有图片文件要处理，这时候轮到我们的url-loader出场了，安装命令为``npm install --save-dev url-loader``，安装完成后，进入配置，代码如下

```javascript
{
 test: /\.(png|jpg|gif)$/,
 use: [
   {
     loader: 'url-loader',
     options: {
       // 当加载的图片大小小于limit时，他会将图片编译成base64字符串形式 不需要单独的文件来存储
       // 当加载的图片大小大于limit时，使用file-loader模块进行加载 会单独打包成另一个文件
       // 这个值默认是8k
       limit: 8192,
       name: 'img/[name][hash:8].[ext]'
     }
   }
 ]
},
```
我们注意到，这里面有一个limit属性，后面跟着的是默认值8192，也就是8k，这里我直接说一下他的作用好了
1. 当我们的图片文件小于这个limit值，这时候，图片会被编译成base64的字符串形式，不会生成新文件，这时候正常打包文件即可，页面也能正常显示；
2. 当我们的图片文件大于这个limit值，这时候，我们将文件打包时就会报错，并且要求我们安装**file-loader**，安装命令为``npm install --save-dev file-loader``,这个模块不需要另外进行配置，安装完成即可，这个时候我们就可以尝试着重新打包文件，发现并没有报错，但是当我们在浏览器打开它时，发现图片并不能显示，并且控制台显示找不到此文件，文件的路径为网站的根目录，并且在dist目录(存放打包完成后的目录)下，发现生成了一个新的图片文件，文件名为hash类型的，目的是防止重复，所以我们需要在webpack.config.js文件中添加**publicPath**的一个配置，目的是将路径前加入dist/这个路径，使得其能够找到此图片，具体的配置如下

```javascript
output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        // 涉及到路径 他都会在前面加一个dist 最后就不需要了
        publicPath: 'dist/'
    },
```
当然在我们后期进行开发的时候，由于index文件都要统一放置在dist目录下，所以就不存在找不到路径这一说了，到时候删去即可。
这时我们发现文件的名字很乱，这样就会导致我们一时间分不清是什么文件，所以我们还需要在limit下添加一个name属性，如上面的代码所示，这样当图片文件大于limit值时，会自动将生成的新文件在我们的name配置下的路径，并且我们还能指明它的文件名称，这样就方便辨认了。

**3.babel-loader**
当我们在查看打包完成的bundle.js文件时，我们发现其中还是有ES6的语法，这就意味着在不支持ES6的浏览器中，我们的代码是没有办法运行的，此时就需要我们采用babel-loader的模块帮助我们将ES6的语法转换成ES5。安装命令为：``npm install babel-loader@7 babel-core babel-preset-es2015``，官网上说的命令为``npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack``或``npm install babel-loader babel-core babel-preset-env webpack``,我们这里为了将babel-loader的版本和我们的webpack版本一致，采用7的版本，然后这个babel-loader还需要一些核心的东西就是后面跟着的babel-core，再后面的babel-preset-env是一些配置的东西，如果是typescript的转换则采用不同的配置文件，然后官网后面还跟着webpack这里我们已经有了就不需要了，安装完成之后，还要进行配置，代码如下：

```javascript
{
  test: /\.js$/,
   exclude: /(node_modules|bower_components)/,
   use: {
     loader: 'babel-loader',
     options: {
       presets: ['es2015']
     }
   }
 }
```
这时候我们再进行打包的时候bundle.js文件中就不会再有ES6相关的语法了。

---

## **- webpack中配置vue**
接下来我们就可以在webpack中配置我们的vue环境了，当然我们首先也要安装有关vue的相应的包及相应的loader，安装命令为``npm install vue --save``和``npm install vue-loader vue-template-compiler --save-dev``(执行完后需要修改package.json文件中``"vue-loader": "^13.0.0",``因为14.0以上版本需要安装其它插件)，我们也注意到前一个命令没有加--dev说明它在运行时也是需要我们的vue的，然后我们就可以重新打包文件了，在浏览器中打开文件，我们发现文件并不能运行，并且在控制台报错了，控制台显示我们正在使用的是tuntime-only版本，让我们使用runtime-compiler版本，实**际上vue在构建的时候，构建了以上两个版本，如果我们使用第一个版本，这就代表代码中不能有任何template，这个版本就没有关于编译template的文件，只有使用runtime-compiler版本，才能编译template代码**，那们怎么使用第二个版本呢，这时候就需要相应的配置了，代码如下：

```javascript
resolve:{
 // 导入的时候省略后缀
 //extensions:['.js','.css','.vue'],
 // 别名
 alias:{
   'vue$': 'vue/dist/vue.esm.js'
 }
}
```
完成以上配置后，我们再次打包文件就不会出现以上的情况了，然后就是Vue相关的编写了，这里我就不说明怎么一步步抽取出来了，直接上代码吧，首先在src中新建Vue文件夹，创建两个vue文件 Cpn.vue和Tpl.vue

Cpn.vue代码如下：

```javascript
<template>
    <div>
        <p>我是Cpn组件</p>
        <p>大家好啊，初次见面嗷</p>
        <button @click="hello">我是Cpn组件的按钮</button>
    </div>  
</template>

<script>
export default {
    methods: {
        hello(){
            alert('hello');
        }
    },
}
</script>

<style>

</style>
```

Tpl.vue

```javascript
<template>
   <div>
        <h1 class="yes">{{message}}</h1>
        <h1>{{date}}</h1>
        <Cpn/>
    </div>
</template>

<script>
    import Cpn from './Cpn.vue';

export default {
    data(){
        return {
            message: 'webpack',
            date: '2020-02-13'
        }
    },
    components:{
        Cpn
    }
}
</script>

<style>
    .yes{
        color:aqua
    }
</style>
```

main.js代码(主要看最后关于Vue的部分即可)

```javascript
// 1.使用CommonJs方式导入
const {add,Unadd} = require('./js/info.js');
add(10,20);
Unadd(20,10);

// 2.使用ES6方式导入
import {chu} from './js/math.js';
chu(20,2);


// 导入css文件
require('./css/nomal.css');

//导入less文件
require('./css/special.less');
document.writeln('<h1>hello beanBag</h1>');

// 导入vue文件
import Vue from 'vue';
// import Tpl from './vue/Tpl'
import Tpl from './vue/Tpl.vue'

new Vue({
    el: '#container',
    template: '<Tpl/>',
    components: {
        Tpl
    }
})
```
在加载.vue文件时还需要进行如下配置：

```javascript
{
  test: /\.vue$/,
  use:['vue-loader']
}
```

这里有一细节问题，就是在导入的时候如果你不想写文件后缀的话，可以添加下面这行配置：

```javascript
resolve:{
      // 导入的时候省略后缀
      extensions:['.js','.css','.vue'],
      // 别名
      alias:{
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
```

## **- webpack中Plugin的使用**
**plugin是插件的意思，它是对webpack本身的一种拓展，是一个扩展器，而loader是用于转换某些类型的模块，是一个转换器**。

今天只学习了一种插件，**BannerPlugin**用于添加版权信息
首先应该在webpack.config.js文件中引入webpack模块，并在plugin属性中做相应的设置，webpack.config.js文件完整代码如下：

```javascript
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        // 涉及到路径 他都会在前面加一个dist 最后就不需要了
        publicPath: 'dist/'
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          },
          {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  // 当加载的图片大小小于limit时，他会将图片编译成base64字符串形式 不需要单独的文件来存储
                  // 当加载的图片大小大于limit时，使用file-loader模块进行加载 会单独打包成另一个文件
                  // 这个值默认是8k
                  limit: 8192,
                  name: 'img/[name][hash:8].[ext]'
                }
              }
            ]
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
          {
            test: /\.vue$/,
            use:['vue-loader']
          }
        ]
    },
    resolve:{
      // 导入的时候省略后缀
      extensions:['.js','.css','.vue'],
      // 别名
      alias:{
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins:[
      new webpack.BannerPlugin('最终版权归beanBag所有')
    ]
}
```
这里注意最后一行即可，这时候当我们重新打包文件的时候，在你打包好的文件的第一行就会出现你在BannerPlugin里写的那行话。  

## webpack插件相关、配置分离及CLI的安装  

### 1.webpack插件相关
- **HtmlWebpackPlugin**

  作用：自动生成一个index.html文件(可以指定模板来生成)

  安装：``npm install html-webpack-plugin --save-dev``

  配置：下载完成之后，同样需要在webpack.config.js文件中进行引入，并且在plugins中进行相应的配置，``const HtmlWebpackPlugin = require('html-webpack-plugin');``

  ```javascript
  new HtmlWebpackPlugin({
      template:'index.html'
  })
  ```

  template的作用是指明它的模板，模板中的script标签可以省略，因为此插件会自动将用到的script进行引入，之后我们重新打包文件后就会自动在dist目录中生成一个新的index文件。**注：这里要把之前的publicPath注释掉，因为bundle.js文件已经和index文件在同一级目录下了**

- **UglifyjsWebpackPlugin**

  作用：对打包的js文件进行压缩

  安装：``npm install uglifyjs-webpack-plugin@1.1.1 --save-dev``

  配置：下载完成后，需要在webpack.config.js文件中进行引入，并且在plugins中进行相应的配置，``**const** UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');``

  ```javascript
  plugins:[
      new UglifyjsWebpackPlugin()
  ],
  ```

  配置后，重新打包文件我们就会发现js文件已经删去空格以及我们之前用BannerPlugin生成的版权说明，所以**此插件最好不要和BannerPlugin一起使用**

- **WebpackDevServer**

  作用：搭建本地服务器，能够自动监听代码是否有改变，并实时地在界面上进行渲染，就不用我们每一次都对文件进行打包了

  原理：它是基于node.js的，内部使用的是node中的express框架，当它监听到有改变的时候，就会重新进行编译，将编译后的代码放在内存中让我们进行测试，最终只需要执行一次对文件的打包即可

  安装：``npm install --save-dev webpack-dev-server@2.9.3``

  配置：下载完成后，需要在webpack.config.js文件中进行相应的配置

  ```javascript
  devServer:{
      contentBase:'./dist',	//指明服务于哪一个文件夹
      inline:true			   //是否需要实时刷新
  }
  ```

  此外还有两个可选参数

  1. port：指明它的端口号，默认是8080
  2. historyApiFallback：在SPA(单页面复应用)页面中，依赖HTML5的history模式

  配置完成后，有两种方式对我们的文件进行实时的刷新

  1. 采用命令``./node_modules/.bin/webpack-dev-server``
  2. 在package.json文件的script中，添加``"dev": "webpack-dev-server --open"``--open是用来当输完命令后它会自动打开浏览器，若没有写，则需要我们点击链接进入

  注意：**不能在终端中直接输入命令``webpack-dev-server``因为之前我们说过，在任何的终端中输入的命令都会去全局下找对应的文件，但是我们之前并没有全局安装**。

  ------

  

### 2.webpack配置文件的分离

​	背景：在我们完成上述操作后，我们会发现，在我们的开发模式中，对于``uglifyjs-webpack-plugin``插件的使用其实是用不到的，因为实际开发中，要反复调试我们的js代码，故应该省去此插件的使用；同理在我们的运行环境下本地服务器插件也是用不到的，所以将webpack配置文件的分离是非常必要的。

​	思路：我们将开发时用到的一些模块放到dev-config.js文件中，将运行时用到的文件放到prod.config.js文件中，将一些基本的代码放到base.config.js文件中，这样一来一旦我们是在开发环境中，执行开发环境的命令时，就将dev-config.js和base.config.js文件合并在一起，在运行环境中也是同理，那么什么插件可以**将我们的两个文件进行合并呢，那就是webpack-merge**

​	安装：``npm install webpack-merge --save-dev``

​	配置：新建build文件夹，文件夹中存放以上说的三个文件，代码下边我会贴出来，在dev-config.js文件和prod.config.js文件中需要引入我们安装的webpack-merge，还是贴代码吧

base.js文件

```javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'bundle.js',
        // 涉及到路径 他都会在前面加一个dist 最后就不需要了
        // publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 当加载的图片大小小于limit时，他会将图片编译成base64字符串形式 不需要单独的文件来存储
                            // 当加载的图片大小大于limit时，使用file-loader模块进行加载 会单独打包成另一个文件
                            // 这个值默认是8k
                            limit: 8192,
                            name: 'img/[name][hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    resolve:{
        // 导入的时候省略后缀
        extensions:['.js','.css','.vue'],
        // 别名
        alias:{
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins:[
        new webpack.BannerPlugin('最终版权归beanBag所有'),
        new HtmlWebpackPlugin({
            template:'index.html'
        })
    ]
}
```

dev.cofig.js文件

```javascript
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = webpackMerge(baseConfig,{
    devServer:{
        contentBase:'./dist',
        inline:true
    }
})
```

prod.config.js文件

```javascript
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(baseConfig,{
    plugins:[
        new UglifyjsWebpackPlugin()
    ]
})
```

这时候当我们重新打包后，终端也会报错，终端说找不到我们的webpack.config.js文件，所以我们要到package.json文件的scripts中做进一步的配置，代码如下：

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
}
```

这时候我们重新打包就不会报错了，但是会出现另外一个问题，就是打包生成的文件跑到了build文件夹下，因为base文件中指定目录是当前所在的目录，所以我们还需要修改base文件里的目录拼接部分``path: path.resolve(__dirname,'../dist'),``这时候再打包就可以了。现在我们就实现了一个简单的配置分离的工作

<hr/>

### 3.vuecli脚手架相关

背景：从以上webpack的配置来看，是不是感到非常的繁琐，事实上，当我们配置大型项目的时候，配置往往更加复杂，所以出现了我们的cli，也就是现在俗称的脚手架，当然并不是它的全称，而是它能够一次性地搭建出完整的骨架，所以形象地把它称为脚手架

安装：``npm install -g @vue/cli@3.2.1``我们之所以安装3.2.1版本而不是最新的版本是为了和老师地保持同步，免得又出岔子，由于后面老师会先讲vue2的搭建，所以**这里还需要拉取cli2.x的模板，命令为``npm install @vue/cli-init -g``**

介绍：CLI:Command-Line Interface 叫做命令行界面，VueCLI是官方发布的vue.js项目脚手架，使用脚手架可以快速搭建vue开发环境以及对应的webpack配置，当我们在编写大型项目中，往往需要考虑代码的目录结构、项目结构和部署、热加载以及代码的单元测试，脚手架帮我们考虑到了以上的问题，是一个非常好的工具

使用：接下来我们就创建一个脚手架2的项目，脚手架2和脚手架3在创建项目的时候，命令有点差别<br/>脚手架2：``vue init webpack my-project``<br>脚手架3：``vue create my_project``<br>安装过程中需要我们回答一些问题，稍微有一个看不懂的是``Use ESLint to lint your code?``这个指的是代码的规范，我们一般喜欢随心所欲所以回答No即可，还有一个单元测试，我们也选择No吧，完成后会生成以下图片的一个项目结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200214191912314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)
 
## webpack中VueCLI3的创建及ES6相关  
### 一. runtime-compiler和runtime-only的区别

​		在安装CLI2的版本的时候，我们同时安装了一个选择runtime-compiler另一个选择runtime-only的版本，我们现在来对比一下它们的区别

​		runtime-compiler版本：

```javascript
import Vue from 'Vue'
import App from './App'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
      APP
  }
})
```

​		runtime-only版本：

```javascript
import Vue from 'Vue'
import App from './App'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App)
})
```

​		我们发现在main.js文件中两者在创建Vue实例的属性和参数是不一样的，下面我们可以来分析一下两者的不同，实际上，在runtime-compiler版本中Vue内部的处理过程是这样的：

1. **Vue将template中的各个元素解析成AST(Absoult Syntax Tree)抽象语法树；**
2. **抽象语法树被编译成render函数；**
3. **render函数被渲染成virtual dom虚拟dom元素；**
4. **浏览器将虚拟dom元素展示在界面上；**

​        而我们的runtime-only版本会省略第一、二步，直接通过render函数渲染成虚拟dom，并展示在界面上，由此我们可以发现，runtime-only版本的性能较高，代码量也较少，所以在选择的时候它会提示我们选择runtime-only版本的文件会少6kb。

​		以上的h函数实际上就类似于createElement函数，它有两种用法：

1. ``createElement('标签名',{标签的类型},[标签的值])``例如：

   ```javascript
   render : function (createElement){
      return createElement('h2',{class:'box'},['hello']);
   }
   ```

2. ``createElement(组件的名称)``例如：

   ```javascript
   render : function (createElement){
      return createElement(App);
   }
   ```

​        在项目运行时，runtime-only版本中会将template预编译成JavaScript，一旦打包时，已经是编译完成的版本，浏览器不用做编译的步骤；runtime-compiler版本中并不是在打包时进行编译的，而是在客户端使用其自带的compiler进行编译。

那么，runtime-compiler版本中的.**vue文件中的template是由谁处理的呢**？

实际上是由 **vue-template-compiler** 处理的。**所以现在当我们了解了它们的区别后，会发现选择runtime-only更加合理。**

### 二. VueCLI3的创建及使用

- 安装命令：``vue create my-project``

- 配置：脚手架3的配置相较于脚手架2来说更加简洁一些，我们在选择安装的其他插件的时候勾选一个Babel即可；

- 与CLI2有哪些改变？

   	1. vue-cli3是基于webpack4打造，vue-cli2还是webpack3;
   	2. vue-cli3的设计原则是“0配置”，移除了配置文件根目录下的build和config等目录；
   	3. vue-cli3提供了vue ui命令，提供了可视化的配置，更加人性化；
   	4. vue-cli3移除了static文件夹，新增public文件夹，并且index.html移动到public中。

- 配置文件的查看与修改：

   	方法一：通过命令 ``vue ui`` 通过可视化界面来修改配置文件；

  ​     方法二：在 node_modeules/@vue/cli-service/webpack.config.js;

  ​	 方法三：在自己项目的根目录下，创建vue.config.js文件，添加自己的配置即可。

### 三. ES6语法相关

​		**1. 箭头函数的使用和this的指向**

​			使用就不赘述了，注意一下，没有参数的时候不用写（），没有返回值的时候不用 { }即可

​			这里讲一下箭头函数中this的指向，**箭头函数中的this引用的就是最近作用域中的this**，见以下		案例：

```javascript
<script>
    const obj = {
        aaa() {
            setTimeout(function () {
                setTimeout(function () {
                    console.log(this);
                })

                setTimeout(() => {
                    console.log(this);
                })
            })

            setTimeout(() => {
                setTimeout(function () {
                    console.log(this);
                });
            })

            setTimeout(() => {
                console.log(this);
            });
        }
    }
obj.aaa();
</script>
```

这里前三个的this指向的都是window，最后一个this指向的是obj对象，**当我们使用funciton时，内部自动会传入window对象，所以不论怎么变化，funciton中的this指向的都是window**，**而箭头函数的this就会往他上一级找，直到找到有this的定义，类似于冒泡出去**。

​		**2.作用域的问题**

​			**在ES5之前只有函数有作用域的概念，而for循环和if都没有块级作用域**，到ES6之后，使用let就	会有块级作用域，所以在ES6中我们优先使用const，只有需要改变某一个标识符的时候才使用let。

​		**3.高阶函数**

​			**1.filter**:对数据进行过滤，filter中的回调函数必须返回一个布尔值

​							true:函数内部会自动将这次回调的n创建一个新的数组；

​							false:函数内部会自动过滤掉这次的n

​			**2. map:** 对数据进行相关处理

​			**3.reduce**：对数组中的数据进行汇总，详情见下面的一个例子：

​			例子中要求先将小于100的数筛选出，再对小于100的数乘以2，最后将乘以2的数字相加

```javascript
<script>
    const array = [10,20,30,50,111,20,30,555,666,20];
// --------------写法一--------------------------
// // 1. filter的使用 必须返回的布尔值 
// //    若返回true 函数内部会自动将这次回调的数据创建一个新的数组并保存
// //    若返回false 函数内部会过滤掉这次的数据
// let array2=array.filter(function(n){
//     return n<100;
// });
// console.log(array2);

// //2. map的使用 对数据进行相关处理
// let array3 = array2.map(function(n){
//     return n*2;
//     //return 100;
// });
// console.log(array3);

// //3.reduce的使用 对数据进行汇总
// //array3=[20,40,60,100,40,60,40]
// //第一次： pre:0  n:20  
// //第二次： pre:20 n:40  
// //第三次:  pre:60 n:60   ......
// let total = array3.reduce(function(previous,n){
//     return n+previous;
// },0);
// console.log(total);

// --------------写法二--------------------------
// let total = array.filter(function(n){
//     return n<100;
// }).map(function(n){
//     return n*2;
// }).reduce(function(pre,n){
//     return pre+n;
// },0);
// console.log(total);

// --------------写法三--------------------------
let total = array.filter(n => n<100).map(n => n*2).reduce((pre,n) => pre+n);
console.log(total);

</script>
```

## vue中的路由基本使用  
#### 一. 概念相关

- 什么是路由

  ​		路由就是通过互联的网络把信息从源地址传输到目的地址的活动(维基百科)

  ​		路由器提供了两种机制，路由和转送

  1. 路由：路由是决定数据包从来源到目的地的途径

  2. 转送：转送是将输入端的数据转移到合适的输出端

     路由表：本质上就是一个映射表，决定了数据包的指向

- 什么是前端渲染、前端路由、后端渲染、后端路由

  ​		**在网站开发早期阶段（后端路由阶段）**，整个html页面是由服务器来渲染的，并返回给客户端进行展示，这种由服务器完成网址与对应页面的映射叫做后端路由，当然缺点也是非常明显的，后端人员需要负责整个页面的开发，对前端开发人员要求高，html代码和数据混合在一起都非常糟糕，**到了网站开发的中期（前后端分离阶段）**，随着Ajax技术的出现，有了前后端分离的开发模式，后端专注于数据的处理，而前端专注页面的交互和可视化上，目前很多的网站依然采用这种模式，到目前的一部分公司已经到了**单页面富应用阶段（SPA）**，也就是在前后端分离的基础上加了一层前端路由，也就是前端来维护一套路由规则。

#### 二. 如何改变URL并使页面不刷新

- hash

  vue-router默认的使用方式，地址栏会有一个#号，在浏览器中可以使用``location.hash = 'home'``来观察其模式，使用这个模式可以实现

- HTML5的history模式（地址栏不会出现# 所以较多使用）

  1. ``history.pushState({},'','home')``它采用的是**栈结构**，可以记录我们浏览的历史，我们可以用前进和后退的方式对页面进行访问。
  2. ``history.replaceState({},'','home')``和第一个pushState模式不同的是他不能使用我们的前进和后退对我们的页面进行访问
  3. ``history.go(-1)``栈中弹出一个地址
  4. ``history.back``此方法等价于``history.go(-1)``
  5. ``history.forward``此方法等价于``history.go(1)``

#### 三.vue-router安装和配置方式

- 概念

  Vue中的route是基于路由和组件的，路由用于设定访问路径，将路径和组件映射起来，在vue-router的单页面富应用中，页面的路径的改变就是组件的切换

- 安装：``npm install vue-router --save``

- 使用：

- 1. 导入路由对象，并且调用``Vue.use(插件)``安装插件
  2. 创建路由实例，并且传入路由映射配置
     2.1. 创建路由组件
     2.2. 配置路由映射，即组件和路径的映射关系
     2.3. 使用路由，通过 ``router-link``和``router-view``标签
  3. 在Vue实例中挂在创建的路由实例

  下面是完整的vue-router代码  router文件夹下的index.js

  ```javascript
  import VueRouter from 'vue-router'
  import Vue from 'vue'
  import index from '../components/index.vue'
  import about from '../components/about.vue'
  
  // 1.导入路由对象 安装插件
  Vue.use(VueRouter)
  
  // 2.创建路由实例，并且传入路由映射配置
  const routes = [
      {
          path:'',
          redirect: '/home'
      },
      {
          path: '/home',
          component: index
      },
      {
          path: '/about',
          component: about
      }
  ]
  
  const router = new VueRouter({
      routes,
      // mode: 'history',
      // linkActiveClass: 'active'
  })
  
  // 3.在Vue实例中挂载创建的路由实例
  export default router
  ```

  App.vue代码：

  ```javascript
  <template>
    <div id="app">
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  }
  </script>
  
  <style>
  </style>
  
  ```

  components文件夹下的about.vue组件

  ```javascript
  <template>
      <div>
          <p>我是关于组件嗷 别认错了</p>
      </div>
  </template>
  
  <script>
  export default {
      name: 'about'
  }
  </script>
  
  <style>
  
  </style>
  ```

  components文件夹下的index.vue组件

  ```javascript
  <template>
      <div>
          <p>我是首页组件嗷</p>
      </div>
  </template>
  
  <script>
  export default {
      name: 'index'
  }
  </script>
  
  <style>
  
  </style>
  ```

  main.js文件

  ```JavaScript
  import Vue from 'vue'
  import App from './App'
  import routes from './router/index.js'
  
  Vue.config.productionTip = false
  
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router:routes,
    render: h => h(App)
  })
  
  ```

  注意：这里面有一个坑，**在创建路由实例的时候，让我们传入路由映射配置时，这里我写的是``routes``，倘若你想叫其他名字，就必须写成``routes: 你的名字``。否则就必须定义为routes**，main.js中挂载实例的时候也同理，简写可以直接写``router``,如果你要自己命名，就必须写成``router: 你的名字``，千万要注意!

- 一些参数的问题

  1. 在vue-router中，可以添加一个默认的路径，比如开发过程中我们需要用户已进入我们的网页首先就跳转到某一个页面时，就需要我们添加一个默认的路径,这时你需要再配置一个映射关系，代码如下：

     ```javascript
     const routes = [
         {
             path:'',	//此处不写就代表一个默认路径，或者只写一个/
             redirect: '/home'	//此处指默认路径重定向的路径
         },
         {
             path: '/home',
             component: index
         },
         {
             path: '/about',
             component: about
         }
     ]
     ```

  2. 在vue-router的默认配置中是使用hash模式的，我们可以将它修改为history模式，只需要在创建实例的时候再传入一个参数，如下：

     ```javascript
     const router = new VueRouter({
         routes,
         mode: 'history',	//将模式修改为history
         // linkActiveClass: 'active'
     })
     ```

  3. router-link的其它属性

     - tag：可以指定router-link之后在页面上不被渲染成a标签，可以指定渲染成按钮等其它标签

       ``<router-link to='/about' tag="button">关于</router-link>``

     - replace: 不会留下history记录，也就是不能使用前进后退键跳转页面

       ``<router-link to='/about' replace>关于</router-link>``

     - active-class: 当我们选中标签时，默认会将此标签新增一个router-link-active样式，我们可以重新命名这个样式，只需要使用这个属性(以下这个案例就被修改为active)

       ``<router-link to='/home' active-class='active'>首页</router-link>``

       当我们需要修改多个名称时，不必每一个都这样修改，可以直接在创建实例的时候传入一个属性，如下：

       ```javascript
       const router = new VueRouter({
           routes,
           mode: 'history',
           linkActiveClass: 'active'
       })
       ```

- 通过代码跳转页面

  有时候我们没有在模板中定义router-link这个标签，我们可以使用通过代码跳转页面的方式进行，比如我们定义的是button标签，这时候我们只要监听button的点击事件，并在事件中使用$**router**属性即可实现页面跳转，此属性是vue-router给每一个组件中都会默认添加的属性，使用代码如下：

  ```javascript
  <template>
    <div id="app">
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
     methods: {
       clickHome(){
          this.$router.push('/home');
         // this.$router.replace('/home');
         console.log('aa');
       },
       clickAbout(){
          this.$router.push('/about');
         // this.$router.replace('/about');
         console.log('bb');
      }
     },
  }
  </script>
  
  <style>
  </style>
  
  ```
  
  同样的我们也可以使用replace等方法进行控制页面跳转。 

## 动态路由、懒加载、嵌套路由及传递参数相关  
### **一**.  **动态路由**
 - **背景**：有时候当我们在访问某些页面的时候，一个页面的path路径可能是不确定的，比如会有这样一个场景：我们在用户登录的时候，我们希望它的路径不是一个固定的，例如 www.xxx.com/user，我们希望后面跟着用户的id，类似这样www.xxx.com/user/beanBag，这样的需求我们怎么实现呢？
 - **使用**：  1. 创建用户组件 user.vue
	2. 建立路由映射关系(userId指待会儿传进来的值)
		```javascript
		{
	        path: '/user/:userId',
	        component: user
        }
		```
	3. 绑定router-link中的to属性
		``<router-link v-bind:to="'/user/'+userId">用户</router-link>``
	4. 在data中传入数据 
		
		
		```javascript
		export default {
		  name: 'App',
		  data() {
		    return {
		      userId: 'beanBag'
		    }
		  }
		}
		```



### **二**.  **路由懒加载**

 - **背景**：当我们打包构建应用时，JavaScript包会变得非常大，影响页面加载，所以必须由一种方法来提升用户体验
 - **了解**： 在我们打包好的Js文件中我们会发现有三个文件，分别是app、manifest和vendor，这三个Js文件分别负责我们的**业务代码、为打包代码做底层支撑以及第三方的一些代码(vue，axios...)**，**app中将我们的不同文件作为数组的参数传入相关函数中处理**，所以如果我们能**把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应组件**，这样就能解决此问题
 - **使用**：  1. 结合Vue的异步组件和Webpack的代码
	2. AMD写法
	3. **ES6写法(推荐使用)**
``const index = () => import('../components/index.vue'); //导入的时候就指定为懒加载``

### **三**.  **嵌套路由**

 - **背景**：当我们访问一个页面的时候，这个页面中有很多小的页面，倘若我们向以前一样配置映射关系，那么所有的路径都会是处于同一级别，不利于我们的管理，如果能够在大的路径下划分小的路径，就能方便我们的管理
 - **使用**： 1. 创建两个组件indexNews.vue和indexMessage.vue这两个组件是index界面下的两个子组件；
	2. 配置映射关系：
	

		```javascript
		{
		    path: '/home',
		    component: index,
		    children: [
		        {
		            path: 'message',
		            component: indexMessage
		        },
		        {
		            path: 'news',
		            component: indexNews
		        }
		    ]
		},
		```
	3.  index.vue中创建这两个文件的入口
		```javascript
		<router-link to='/home/news'>新闻</router-link>
		<router-link to='/home/message'>消息</router-link>
		<router-view></router-view>
		```

 - **拓展**：为嵌套路由添加默认路径，在children中添加默认路由的配置即可
	

```javascript
{
  path: '/home',
  component: index,
  children: [
      {
          path: '',
          redirect: 'message'
      },
      {
          path: 'message',
          component: indexMessage
      },
      {
          path: 'news',
          component: indexNews
      }
  ]
},
```

### **四**.  **传递参数**

 - **使用**：有 **params** 和 **query** 两种类型的传递方式
 - **比较**： 
<table>
  <tr>
    <th width=20%, bgcolor=yellow >类型</th>
    <th width=40%, bgcolor=yellow>params</th>
     <th width=40%, bgcolor=yellow>query</th>
  </tr>
	<tr>
	<td>配置路由格式</td>
	<td>/router/:id</td>
	<td>/router（一般配置）</td>
	</tr>
		<tr>
	<td>传递方式</td>
	<td>在path后面跟上对应的值</td>
	<td>对象中使用query的key作为传递方式</td>
	</tr>
		<tr>
	<td>传递后形成的路径</td>
	<td>/router/beanBag</td>
	<td>/router?id=beanBag</td>
	</tr>
	<tr>
	<td>使用场景</td>
	<td>数据传递较少</td>
	<td>数据传递较多</td>
	</tr>
</table>


 - **query方式的使用**：
	1. 创建profile组件
	2. 配置路由映射关系
	3. 在APP.vue中创建一个button(或者直接rputer-link标签)，button监听点击事件profileClick方法，在方法中写相关代码传入参数
	
		
		```javascript
		methods: {
		    profileClick(){
		      this.$router.push({
		        path: '/profile',
		        query: {
		          name: 'beanBag',
		          age:18
		        }
		      })
		    }
		  }
		```

	4. 在profile.vue界面中使用参数
		```javascript
		<template>
		  <div>
		      <h3>我是profile组件</h3>
		      <p>{{$route.query.name}}</p>
		      <p>{{$route.query.age}}</p>
		  </div>
		</template>
		```

**要注意，在使用代码方式进行路由跳转的时候使用的是``$router``,在拿到传入数据时使用的是``$route``**，``$router``对象是vue-router中的一个实例，在整个vue-router实例中都会存在，而``$route``只有在处于活跃路由时才会存在于对应的那个路由  

## 导航守卫、keep-alive、项目相关  
###  一. 导航守卫

 - 背景：有时候在我们的项目中，需要在跳转路由的时候进行相关操作，比如有这么一个需求，当我们跳转页面时，页面的title会随之发生改变，这时候就要用到我们的导航守卫。**导航守卫主要是用来监听路由的进入和离开，vue-router提供的beforeEach和afterEach的钩子函数，他们会在路由即将改变前和改变后触发**
 - 相关知识：
   	1.  生命周期函数
			在Vue中有几个生命周期函数需要我们了解一下
			``created() ``: 组件被创建完成后回调
			``destroyed() ``: 组件被销毁后回调
			``mounted() ``: 创建组件后(template)挂载在DOM上回调
			``updated() ``: 界面发生更新时回调
			几个生命周期函数配合我们的全局守卫是比较好用的，上面那个案例我们使用created函数也是可以解决的，但是一旦项目较大的时候，会比较不方便
	 2.  全局守卫
		``beforeEach()``，在源码中描述它为guard，也就是守卫
		``afterEach`` 在源码中描述它为hook，也就是钩子
		在以上两个全局守卫中都需要我们传递一个匿名函数进行回调，在上面那个函数也就是``router.beforeEach()``需要我们往匿名函数中传递三个参数(to,from,next)，我们必须在手动调用next(),使它进行路由跳转，下面一个函数就不需要传递next
		**to: 代表即将要进入的目标的路由对象
		from: 当前导航即将要离开的路由对象
		next: 调用该方法后才能进入下一个钩子**
	 3.  路由独享的守卫及组件内的守卫
		在vue中还存在有其它的守卫，也就是路由独享的守卫和组件内的守卫，路由独享的守卫比如有 **beforeEnter**,组件内的守卫比如有 **beforeRouterEnter及beforeRouterUpdate**，这些了解即可，用到的时候可以翻阅文档

 - 使用
在配置路由的index.js中，使用相关的导航守卫即可，这里使用beforeEach做示范

```javascript
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    document.title = to.matched[0].meta.title;
    next(); 
})
```
meta是在配置路由时加入的数据里面包含有title，matched[0]的使用时由于存在嵌套路由，所以拿不到首页的title，所以我们要到matched数组中拿到

```javascript
const routes = [
    {
        path:'',
        redirect: '/home',
        
    },
    {
        path: '/user/:userId',
        component: user,
        meta: {
            title: '用户'
        },
        // beforeEnter: (to, from, next) => {
        //     console.log('我是路由独享守卫');
        //     next();
        // }
    },
    {
        path: '/home',
        component: index,
        children: [
            {
                path: '',
                redirect: 'message'
            },
            {
                path: 'message',
                component: indexMessage
            },
            {
                path: 'news',
                component: indexNews
            }
        ],
        meta: {
            title: '首页'
        }
    },
    {
        path: '/about',
        component: about,
        meta: {
            title: '关于'
        }
    },
    {
        path: '/profile',
        component: profile,
        meta: {
            title: '档案'
        }
    }
]
```
	
### 二. keep-alive

 - 背景：在我们前几天的学习中，曾经提过一个需求我们当时没有实现，也就是在一个页面中存在嵌套路由，当我们点击嵌套路由中的那个路由时，跳转到其它路由，我们希望在跳转回来时，界面仍然跳转到之前访问的嵌套路由的那个页面，这就需要我们的keep-alive，**它是Vue内置的一个组件，可以使被包含的组件保留状态或避免重新渲染**
 - 使用：此函数的使用较为简单，只需要在``<router-view>``标签的外部包一层``keep-alive``即可，这里我们结合了组件内的守卫``beforeRouteLeave``和``activated``的使用完成了上面那个需求，在首页这个组件中使用组件内的守卫``beforeRouteLeave``拿到现在访问的路径，当再次访问此组件时，使用``activated``手动进行路由跳转，路径指定为使用组件内的守卫拿到的那个路径即可

```javascript
activated() {
    this.$router.push(this.path);
},
beforeRouteLeave (to, from, next) {
    this.path = this.$route.path;
    next();
}
```

 - 补充：需要注意的是``activated()和deactivated()``两个函数**只有在该组件为保持状态时，也就是使用了keep-alive时才有效**，否则都是重新创建，并不是处于活跃的。
另外这个keep-alive标签中有两个属性，``include``和``exclude``包含和排除，后面可以跟字符串或者是正则表达式，**只有匹配到的组件才会被缓存或是不缓存**，多个组件之间用逗号分隔，不能有空格。例如

```javascript
<keep-alive exclude="user,profile">
  <router-view></router-view>
</keep-alive>
```

### 三. 项目相关(TabBar的封装)
这是后面需要完成的一个项目中的一个组件，到最后我再把整个项目一起放上来好了  

## Promise的使用及了解Vuex  
**一、 Promise的使用**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**背景**】：Promise是ES6中的新特性，是异步编程的一种解决方案，一种很常见的应用场景就是网络请求，如果当我们的网络请求非常复杂时，就会出现**回调地狱**，就是如下代码的一种情况：

```javascript
<script>
    $.ajax('url1',function(data1){
        $.ajax(data1['url2'],function(data2){
            $.ajax(data2['url3'],function(data3){
                $.ajax(data3['url4'],function(data4){
                    console.log(data4);
                })
            })
        })
    })
</script>
```
在第一次网络请求到的数据是第二次网络请求的参数，一直这么下去，被称为回调地狱，说白了就是不能无限套娃，否则代码难以维护，我们希望以一种更加优雅的方式来进行异步操作，所以就出现了promise

【**使用**】：

 - 基本使用

```javascript
<script>
    new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve()
        }, 1000);
    }).then(()=>{
        console.log('Promise示例');
    })
</script>
```

 - 嵌套使用

```javascript
<script>
    new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve()
        }, 1000);
    }).then(()=>{
        console.log('1');
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }).then(()=>{
        console.log('2');
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }).then(()=>{
        console.log('3');
    })
</script>
```
在promise函数中需要我们填写两个参数，这两个参数对应也是函数，当我们执行resolve时，会自动调用then函数，如果调用reject时，会调用catch函数处理失败的情况，如下(控制台打印‘出错啦’)：

```javascript
<script>
    new Promise((resolve,reject)=>{
        setTimeout(() => {
            reject('出错啦！')
        }, 1000);
    }).then(()=>{
        console.log('成功')
    }).catch((data)=>{
        console.log(data)
    })
</script>
```
【**三种状态**】
	

 1. pending：等待状态，比如正在进行的网络请求，或者定时器没有到时间
 2. fulfill：满足状态，当我们主动回调了resolve时，就处于该状态，并且会回调.then()
 3. reject：拒绝状态，当我们主动毁掉了reject时，就处于该状态，并且会回调.catch()
注意：promise中的.then可以有另一种写法，如下：

```javascript
<script>
    new Promise((resolve,reject)=>{
        setTimeout(() => {
            // resolve('这是resolve函数');
            reject('这是reject函数');
        }, 1000);
    }).then(data=>{
        console.log(data)
    },err=>{
        console.log(err);
    })
</script>
```
【**案例**】下面有一个需求：

```javascript
// wrapped into 包裹 将异步操作包裹在promise里面
// 网络请求 aaa->自己处理第一次
// 处理：aaa1 -> 自己处理第二次
// 处理：aaa12 -> 自己处理第三次

//大致意思就是将网络请求回来的数据自己处理完成后做相应的转换然后传给下一次，
//要求将转换操作和处理操作相分离
<script>
    new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('aaa');
        }, 1000);
    }).then((res)=>{
        console.log(res,'第一次处理');
        return new Promise((resolve,reject)=>{
            resolve(res+'1');
        })
    }).then(res=>{
        console.log(res,'第二次处理');
        return new Promise((resolve,reject)=>{
            resolve(res+'2');
        })
    }).then(res=>{
        console.log(res,'第三次处理');
    })
</script>
```
第一次拆分

```javascript
 <!-- new Promise(resolve => resolve(结果))简写 -->
 <script>
     new Promise((resolve,reject)=>{
         setTimeout(() => {
             resolve('aaa');
         }, 1000);
     }).then((res)=>{
         console.log(res,'第一次处理');
         return Promise.resolve(res+'1');
     }).then(res=>{
         console.log(res,'第二次处理');
         return Promise.resolve(res+'2');
     }).then(res=>{
         console.log(res,'第三次处理');
     })
 </script>
```
第二次简写

```javascript
<!-- 省略掉Promise.resolve -->
<script>
    new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('aaa');
        }, 1000);
    }).then((res)=>{
        console.log(res,'第一次处理');
        return res+'1';
    }).then(res=>{
        console.log(res,'第二次处理');
        return res+'2';
    }).then(res=>{
        console.log(res,'第三次处理');
    })
</script>
```
如果中间出现了reject同理，第三种改为``throw 'error message'``就不用写``Promise.reject('error message')``

【**all方法的使用**】
对多个异步的处理，比如现在有两个网络请求，只有两个请求的数据都拿到了才能显示页面，所以出现了这个all方法，只有两个请求都完成才能完成此需求，all方法会判断两个异步操作是否完成，拿到的是一个数组

```javascript
<script>
     Promise.all([
         new Promise((resolve,reject) => {
             setTimeout(() => {
                 resolve('result1')
             }, 1000);
         }),
         new Promise((resolve,reject) => {
             setTimeout(() => {
                 resolve({
                     name: 'beanBag',
                     age:22
                 })
             }, 2000);
         })
     ]).then(result =>{
         console.log(result);
     })    
 </script>
```

**二、了解Vuex**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**官方解释**】Vuex是一个专门为Vuex.js应用程序开发的状态管理模式，它采用**集中式存储管理**应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化，说的简单一点，就是把大家都要互相用的东西放到一个文件中，这个文件统一来管理这些东西，并且可以很方便的为大家调用并且是**响应式**的
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**应用场景**】用户的登陆状态、用户名称、头像等等，商品的收藏，购物车的物品等
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】同vue-router一样，vuex是vue提供的一种插件，所以使用的步骤和vue-router类似，代码就明天再贴吧

**三、项目中的小知识点**
项目中如果遇见路径太复杂的话，我们可以将路径起一个别名，比如图片的路径每次都是../../找起来非常麻烦，所以我们可以给他起一个别名

 1. 修改webpack.base.conf.js中的resolve

```javascript
 resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'assets': resolve('src/assets'),
    }
  },
```
2.将你希望替代的别名写入，比如可以用assets代替src/assets这个路径  

3.使用，当我们起了别名后，**在引用的时候如果实在html代码中和属性中填写路径，要注意使用~符号，(在script标签中不用加)，否则是不生效的**
``<img src="~assets/img/tabbar/home.svg" slot="item-icon">``  

## Vuex中各个属性的使用
今天的学习围绕一张图片展开(图片引用自Vuex官方文档)，当我们的项目比较大时，Vuex为我们在可以在组件外部管理状态提供了条件
![图片引用自Vuex官方文档](https://img-blog.csdnimg.cn/20200221204510133.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)  

**一、 State**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**状态**的意思，顾名思义，这里就是存放状态的地方，简单来说，就是**存放你需要共享的某些变量的地方**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】当我们在state中设置了相应的变量后，我们就可以来引用它们了，之前说过，当我们安装了Vuex后，会在全局生成一个store对象，我们可以使用，我们就可以使用这个store对象来访问我们的变量，如
```javascript
<h2>{{$store.state.counter}}</h2>
```
couter我已经在state中添加了它的值
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**相关知识**】 **State单一状态树**(Single Source of Truth)又叫做**单一数据源**，也就是说Vuex中建议我们在Store中存放一个Store对象的实例，这个实例就是数据源，如果数据源特别多，就不容易进行后期的维护和管理，所以最好只有一个Store实例，这就叫做单一状态树
**二、 Mutations**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**转变、改变**的意思，和Vue实例中的methods属性差不多，**主要存放的是处理数据的各个方法**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】在Mutations中定义的各个函数都会有一个参数state，用来获取相应的数据，可以通过state调用state中存储的数据，进行相应转化，比如当我们在一个按钮中监听点击事件调用的那个函数时，函数中需要使用``this.$store.commit(Mutations中的函数名);``来调用Mutations中的函数进行处理，在commit中还可以同时提交一个对象交由Mutations处理，例如

```javascript
// 第一种风格
addStu(){
 const info = {
   id:1005,
   name:'lzx',
   age:20
 }
 //payload
 this.$store.commit('addStu',info);
// 第二种风格
jianCoun(num){
  this.$store.commit({
    type: 'resolveNum',
    num,
    age:18
  })
},
```
这里我们传了一个info对象，这个info对象就被叫做**payload**,负载、载荷的意思，同时我们可以这么处理(students是state中的一个数组)：

```javascript
addStu(state,info){
    state.students.push(info);
},
```
值得注意的是，**在Vuex中同样有像Vue中数组的有些方法一样不是响应式的**，因为**Vuex中store状态的更新唯一方式是提交Mutations**,比如``state.info['address'] = 'LiShui'``在info对象中添加属性address，值为‘LiShui',我们应该这样``Vue.set(state.info,'address','LiShui');``还有一个``delete state.info.age;``也不是响应式的，应该修改为``Vue.delete(state.info,'age');``总之，我们必须遵守一些规则才能做到响应式：**1. 提前在store中初始化好所需的属性；2.当给state中的对象添加新的属性时使用``Vue.set``或是用新对象给就对象重新赋值的方式进行**

**三、 Getters**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**获得、得到**的意思,和Vue实例中的computed属性差不多，是对数据进行转化的地方
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】同样，在getters中定义的各个函数都有一个state参数，除此之外还有一个geter参数，可以获得自己getter下的其它函数，例如：

```javascript
moreAge(state){
    return state.students.filter(s=>s.age>5);
},
numAge(state,get){
    return get.moreAge.length;
},
```
调用也很简单

```javascript
 <h2>{{$store.getters.moreAge}}</h2>
 <h2>{{$store.getters.numAge}}</h2>
```  
同样的调用的时候也可以传入参数例如：  

```javascript
   <h2>{{$store.getters.whatAge(30)}}</h2>
  ```
处理如下：

```javascript
whatAge(state){
    return age => {
        return state.students.filter(s=>s.age>age);
    }
}
```
这种用法注意一下，和灵活，**返回可以是一个函数**  
**四、 Actions**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**行动、行为**的意思，在这里编写我们的异步代码，由最开始的那张图片我们可以知道，当你有一些异步请求时如果我们在 Mutations中处理，我们的Devtools没办好很好的跟踪这个操作什么时候会很好的完成，所以我们在Actions中编写我们的异步代码  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】直接贴代码吧，一下是调用那端的代码

```javascript
changeStu(){
      // 1. 这种方式第二个参数可以传函数，但是如果有其他参数就不好用了
      // this.$store.dispatch('changeStu', () => {
      //   console.log('ok');
      // })

      // 2.既有函数又有其他参数 但是不够优雅
      // this.$store.dispatch('changeStu',{
      //   message:'hello actions',
      //   succeed(){
      //     console.log('已完成');
      //   }
      // })

      //3. Promise
      this.$store.dispatch('changeStu','hello actions').then(res => {
          console.log('里面已经完成了');
          console.log(res);
      })
    },
```
以下是处理那端代码，也就是actions中的代码：

```javascript
 // context 上下文
        changeStu(context,payload){
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    context.commit('changeStu');
                    console.log(payload);
                    resolve('11111')
                }, 1000);
            })
            // setTimeout(()=>{

            //     console.log(payload);
            //     context.commit('changeStu');
            //     console.log(payload.message);
            //     payload.succeed();

            // },1000)
        }
```

**五、 Modules**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】 **模块**的意思，Vue使用的是单一状态数，那么也意味着很多状态都会交给Vuex来管理，当应用变得非常复杂时，store对象就有可能变得相当臃肿，为了解决这个问题，Vuex允许我们将store分割成模块，而每一个模块拥有自己的state mutations actions getters
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
 【**使用**】代码如下：
调用端的代码：

```javascript
<h2>{{$store.state.a.name}}</h2>
<button @click="updataName">修改名字</button>
<h2>{{$store.getters.aUpdateName}}</h2>
<h2>{{$store.getters.bUpdateName}}</h2>
<h2>{{$store.getters.cUpdateName}}</h2>
<button @click="AsyncUpdataName">异步修改名字</button>
```
methods中的代码：
```javascript
updataName(){
  this.$store.commit('updateName','JYQ')
},
AsycUpdataName(){
  this.$store.dispatch('AsycUpdateName');
}
```

module中的代码

```javascript
 modules:{
	a: moduleA,
}
```


```javascript
const moduleA = {
    state:{
        name: 'beanBag'
    },
    mutations:{
        updateName(state,payload){
            state.name = payload;
        }
    },
    getters:{
        aUpdateName(state){
            return state.name + '1'
        },
        bUpdateName(state,getter){
            return getter.aUpdateName + '2'
        },
        cUpdateName(state,getter,rootState){
            return getter.bUpdateName + rootState.counter
        }
    },
    actions:{
        AsyncUpdateName(context){
            setTimeout(() => {
                context.commit('updateName','hqc');
            }, 1000);
        }
    },
}
```

## 网络请求模块axios及项目相关  
在开发项目的过程中，一定会使用到网络请求，使用一个合适的网络请求模块是很重要的，**不论哪一种网络请求方式我们都需要自己封装**，防止项目代码过于庞大不易管理，那么选择什么网络模块开发我们后边的项目呢？

**参考一** 、Ajax，ajax是基于XMLHttpRequest(XHR)，但是配置后调用该方式非常混乱，真实开发很少用，所以不推荐
**参考二**、 jQuery封装好的Ajax，相对于传统的ajax来说，使用jQuery是更有优势的，但是这里产生一个问题，就是我们的项目是采用Vue来写的，在整个Vue模块中从未使用到jQuery，意味着为了一个网络请求要引用上万行的代码，这是不必要的，所以不推荐
**参考三**、官方在Vue1.x推出了Vue-resource，体积相对于jQuery来说比较小，同时是官方推出的，但是在Vue2.0版本以后，Vue作者将它从Vue中去除了，并且也说不会再更新，考虑到项目的安全性和以后的维护这里不推荐
**参考四**、Vue的作者在移除Vue-resource之后，推荐了一个第三方的框架，就是axios，它可以在浏览器中发送XMLHttpRequest请求，可以在node.js中发送http请求，这一点是jQuery做不到的，它支持Promise API，它支持拦截请求和相应，它支持转换请求和相应数据并且支持多种请求方式，综上，**这里我们使用axios**OMG,你还在等什么,用它！用它！用它！

## axios
---
为了理解方便，coderwhy老师将它理解为**ajax i/o system**我认为也是非常贴切的，下面让我们来使用一下吧
【**基本使用**】

 1. 安装axios框架
	``npm install axios --save``
2. 导入
3. 使用 
	``axios(config) //这里传入的config是一个对象，可以将配置信息传进去``
	完整代码如下：
	

	```javascript
	import axios from 'axios'
	 axios({
	   url: 'http://123.207.32.32:8000/home/multidata'
	 }).then(res => {
	   console.log(res);
	 })
	```
4.注意点： axios返回的是一个Promise，这一点在后面的封装会用到，和ajax请求相同，默认是get请求方式，若要修改可以使用``axios.get(config)``或是在config中指明type即可	


【**axios发送并发请求**】
上一次我们遇到并发请求的是``Peomise.all``的使用，同样，这里也有.all方法来实现并发请求，axios.all此方法返回的是一个数组，使用如下：

```javascript
axios.all([
  axios({
    url: 'http://123.207.32.32:8000/home/multidata'
  }),
  axios.get('http://123.207.32.32:8000/home/data',{
    params:{
      type:'sell',
      page: 2
    }
  }
)]).then(results => {
  console.log(results);
})
```
这里浏览器返回的是一个数组，如下图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200222203049171.png)
我们可以在``then``中采用``axios.spread``方法直接返回两个对象，如下：

```javascript
axios.all([
  axios({
    url: 'http://123.207.32.32:8000/home/multidata'
  }),
  axios.get('http://123.207.32.32:8000/home/data',{
    params:{
      type:'sell',
      page: 2
    }
  }
)]).then(axios.spread( (res1,res2) => {
  console.log(res1);
  console.log(res2);
}))
```
这样打印出的是这样，两个对象的形式
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200222203236600.png)


【**axios全局配置**】
在以上使用的过程中，我们发现地址的前部分是相同，数据的请求方式也是相同的，这些相同的东西为了我们的简便以及后续的可维护性上考虑，我们可以将它抽离出来，即使用全局配置
如下：

```javascript
 //使用全局的axios和对应的配置在进行网络请求
 axios.defaults.baseURL = 'http://123.207.32.32:8000'
 axios.defaults.timeout = 5000
```
这里我们采用``.default``方法设置了一个基本的地址和浏览器的响应时间，在设置好了以后，就可以如下这么写我们的axios代码

```javascript
axios.all([
  axios({
    url: '/home/multidata'
  }),
  axios.get('/home/data',{
    params:{
      type:'sell',
      page: 2
    }
  }
)]).then(axios.spread( (res1,res2) => {
  console.log(res1);
  console.log(res2);
}))
```

注意点：这里我们还可以设置其它很多东西，例如请求方式，请求报文头中的一些信息，我们都可以将它指明，要注意的就是**一旦声明的是params那么就要对应get请求，如果是request body中的相关参数，则要对应post请求**


【**axios的实例和模块封装**】
在上面的全局配置中，我们又发现了一些问题，一旦我的网络请求很多，而每一个url有些相同，有些不同该怎么办，实际上在项目开发的过程中，如果是中大型的项目开发中，会将文件存放在多个服务器上，防止并发量过大造成的服务器的过载，在服务器端就会使用反向代理服务器(nginx部署)，这在客户端就会拿到很多的url地址，那么怎么解决呢，axios为我们提供了一种解决办法，**创建对应的axios实例，不再使用全局**，使用如下：

```javascript
const instance1 = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
});

instance1({
  url: '/home/multidata'
}).then(res => {
  console.log(res)
})
```
最开始我们可能会感到多此一举，但是一旦项目中使用到的网络请求增加，并且有一些地址相同，另一些地址相同的情况下，就会感到方便很多了。

下面就可以进行**模块封装**了：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一般情况下我们会先在src目录下新建一个文件夹，名称就叫network，代表用来处理网络相关的内容，文件夹下新建一个js文件文件名可以叫request.js，在这个页面中编写我们所有的网络请求的内容

 1. 基本使用(传入三个参数，对应的是三个函数)

```javascript	
import axios from 'axios'

export function request(config,success,failure){
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    instance(config).then(data=>{
        // console.log(data);
        success(data)
    }).catch(err => {
        // console.log(err);
        failure(err)
    })
}
```
调用时写的代码，按照指定的参数传入即可

```javascript
request({
  url:'/home/data',
  params:{
    type:'pop',
    page:2
  }
},success=>{
  console.log(success)
},err => {
  console.log(err)
});
```

2. 传入一个参数，其实就是传入一个对象，对象中包含了上面的三个参数

```javascript

export function request(config){
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    });
    instance(config.baseConfig).then(res=>{
        config.success(res);
    }).catch(err=>{
        config.failure(err);
    })
}
```
调用时写的代码

```javascript
request({
  baseConfig:{
    url:'/home/data',
    params:{
      type:'pop',
      page:2
    }
  },
  success(res){
    console.log(res)
  },
  failure(err){
    console.log(err)
  }
})
```

3. promise的使用(初期 为了理解这个过程)

```javascript
export function request(config){
    return new Promise((resolve,reject)=>{
        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000',
            timeout: 5000
        });

        instance(config).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })

}
```
调用时写的代码

```javascript
request({
  url:'/home/data',
  params:{
    type: 'pop',
    page: 1
  }
}).then(res=>{
  console.log(res);
}).catch(err => {
    console.log(err)
})
```
这时我们发现，最开始的时候我们不是说过axios方法返回的不就是一个promise吗，所以大可不必在套一层，直接return回我们的instance即可，代码如下：

```javascript
export function request(config){
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })
    return instance(config);
}
```
调用时的代码同上一个，这样就可以将我们处理从服务器端返回的数据和处理网络跳转的方法加以区分，更容易进行项目的维护

【**axios拦截器的使用**】
在axios中还有一个拦截器的特别我们没有介绍，拦截器可以分为以下2类，即拦截请求和拦截响应，这两类又对应着拦截成功和拦截失败的情况，下面先来看我们的拦截请求``request``
我们要使用到``interceptors.request.use``函数，具体看代码

```javascript
export function request(config){
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    instance.interceptors.request.use(config=>{
        console.log(config)
        return config
    },err=>{
        console.log(err)
    })
    
    return instance(config);
}
```
这里我们拦截了instance的请求，我们可以对拦截的请求进行相关处理后继续传给服务器端进行响应，这里有几种用途： **1. 对不符合信息我们可以将它过滤之后再发出；2. 我们可以在他发出这个请求出先做一些加载动画，再将它返回给服务器； 3. 在一些需要登录才能访问的界面我们可以先拦截请求，在检查请求中是否含有token令牌，有的话继续，没有就跳转到登录页面**，拦截失败的情况一般很少发生这里就不再赘述了；
另一个拦截响应的代码如下：

```javascript
export function request(config){
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    instance.interceptors.response.use(res=>{
        // console.log(res)
        return res.data
    },err=>{
        console.log(err)
    })

    return instance(config);
}
```
这里我们使用的是``interceptors.response.use``，拦截响应，具体项目中我们可以做什么呢，就像是以上代码的，我们可以将服务器返回的数据我们进行处理以后再返回到客户端，这样就方便我们的处理，响应失败的情况比如说服务器找不到页面发出404请求等，我们就可以将他们的错误信息进行一些打印

## 项目相关

---

这里主要介绍一下怎么样进行GitHub上的托管

 1. 再GitHub上点+号，新建一个项目仓库
 2. 仓库创建好以后，复制项目的地址，输入命令，将GitHub上的文件克隆到本地，要注意克隆下来的项目名字不要和本地的名字相同
	``git clone 复制的项目地址``
3. 将本地的文件拷贝到刚刚克隆的文件中，不要拷贝.git(里面已经有了)和node_modules(这个文件拷不拷贝都一样，配置文件中已经将它忽略)
4. 在控制台中进入到文件目录
		1. 输入命令：``git status``查看状态 会看到文件都是红色
		2. ``git add.`` 添加一下文件
		3. ``git commit -m '一些说明信息'``提交到本地
		4. ``git push``推到仓库中即可将它们联系起来

还有一个命令可以让我们省略几步
``git remote add origin 复制的项目地址``
``git push -u origin master``
这样就可以直接将本地有的仓库和远程仓库联系起来




