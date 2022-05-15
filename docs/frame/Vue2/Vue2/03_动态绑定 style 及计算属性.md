# 03\_动态绑定 style 及计算属性

继昨天学习的动态绑定 class 属性，今天是动态绑定 style 属性，同样的，也分为数组语法和对象语法，一般数组语法应用的不多，了解即可。

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

今天还学了一个计算属性 computed ，作用呢看起来与 methods 方法差不多，实际上它们的差别还是有的，在 computed 中，存在着 set 和 get 两个方法，但是我们一般都将他们简写了，但是还是要知道有这两样东西
**computed 与 methods 的区别？**
computed 在使用中，系统会存在有缓存，当检测到数据没有发生改变时，computed 会使用缓存中的数据，但是 methods 会重复调用其中的函数，所以在这方面来说，methods 的性能要比低一些。
下面是一些基本的例子：
set 和 get 函数：

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
