# 02_MVVM、插值操作及绑定属性

**- 什么是 MVVM**  
 Model–view–viewmodel，它是一种软件架构模式（其实我也不理解，大概就是数据和视图相分离吧）
**- Vue 中的 MVVM**  
 ![](https://img-blog.csdnimg.cn/20200207185500355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)  
 如上图，Model 模型对视图 View 中的 DOM 进行事件监听，视图 View 中的 DOM 的数据与 Model 模型进行绑定。
**- 插值操作**
Mustache（胡子/胡须）语法，也叫双大括号语法{{ }} ，大括号中间不仅可以写变量也可以写简单表达式。
下面是一些常用的插值操作,总的 script 代码如下：

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

1.  v-once：元素和指令只渲染一次，不会随着数据的改变而改变。

    ```javascript
    `<h1 v-once>message</h1>`;
    ```

````
2. v-html：可以解析HTML元素

	```javascript
`<h1 v-html = 'url'></h1>`
````

3.  v-text: 和{{}}功能类似，展示文本一般不用，因为不够灵活，会覆盖标签里面的内容
    ```javascript
    `<h1 v-text = 'name'>aa</h1>`;
    ```

````
4. v-pre: 不解析，原封不动的显示
	```javascript
 `<h1 v-pre>{{age}}</h1> `
````

5.  `v-cloak`:不会闪动，在 vue 解析之前 div 中会有此属性，解析之后，此属性消失

注：以上 script 标签加了延时函数，是为了让 `v-cloak` 的功能更好的展示

**- 绑定属性**
以上方法都是针对值而进行的改变，那么有没有一种是针对属性的呢，答案就是有的，就是 v-bind : 动态绑定 ，例如可以动态绑定 img 标签的 src 属性等等
有两种语法：

1.  对象语法，即类的值是一个对象，例如

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

2.  数组语法，即类的值是一个数组，例如

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

v-bind 的语法糖形式是省略前面的 v-bind，保留一个：
v-on 的语法糖形式是把 v-on: 替换成 @

---

学习了以上内容，有一个案例需要实现 ：点击列表中的任意一项，使得那一项所在的 li 标签变色，代码如下：

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
