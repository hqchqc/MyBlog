# 15_Promise 的使用及了解 Vuex

**一、 Promise 的使用**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**背景**】：Promise 是 ES6 中的新特性，是异步编程的一种解决方案，一种很常见的应用场景就是网络请求，如果当我们的网络请求非常复杂时，就会出现**回调地狱**，就是如下代码的一种情况：

```javascript
<script>
  $.ajax('url1',function(data1)
  {$.ajax(data1["url2"], function (data2) {
    $.ajax(data2["url3"], function (data3) {
      $.ajax(data3["url4"], function (data4) {
        console.log(data4);
      });
    });
  })})
</script>
```

在第一次网络请求到的数据是第二次网络请求的参数，一直这么下去，被称为回调地狱，说白了就是不能无限套娃，否则代码难以维护，我们希望以一种更加优雅的方式来进行异步操作，所以就出现了 promise

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

在 promise 函数中需要我们填写两个参数，这两个参数对应也是函数，当我们执行 resolve 时，会自动调用 then 函数，如果调用 reject 时，会调用 catch 函数处理失败的情况，如下(控制台打印‘出错啦’)：

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

1.  pending：等待状态，比如正在进行的网络请求，或者定时器没有到时间
2.  fulfill：满足状态，当我们主动回调了 resolve 时，就处于该状态，并且会回调.then()
3.  reject：拒绝状态，当我们主动毁掉了 reject 时，就处于该状态，并且会回调.catch()
    注意：promise 中的.then 可以有另一种写法，如下：

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

如果中间出现了 reject 同理，第三种改为`throw 'error message'`就不用写`Promise.reject('error message')`

【**all 方法的使用**】
对多个异步的处理，比如现在有两个网络请求，只有两个请求的数据都拿到了才能显示页面，所以出现了这个 all 方法，只有两个请求都完成才能完成此需求，all 方法会判断两个异步操作是否完成，拿到的是一个数组

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

**二、了解 Vuex**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**官方解释**】Vuex 是一个专门为 Vuex.js 应用程序开发的状态管理模式，它采用**集中式存储管理**应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化，说的简单一点，就是把大家都要互相用的东西放到一个文件中，这个文件统一来管理这些东西，并且可以很方便的为大家调用并且是**响应式**的
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**应用场景**】用户的登陆状态、用户名称、头像等等，商品的收藏，购物车的物品等
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】同 vue-router 一样，vuex 是 vue 提供的一种插件，所以使用的步骤和 vue-router 类似，代码就明天再贴吧

**三、项目中的小知识点**
项目中如果遇见路径太复杂的话，我们可以将路径起一个别名，比如图片的路径每次都是../../找起来非常麻烦，所以我们可以给他起一个别名

1.  修改 webpack.base.conf.js 中的 resolve

```javascript
 resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'assets': resolve('src/assets'),
    }
  },
```

2.将你希望替代的别名写入，比如可以用 assets 代替 src/assets 这个路径

3.使用，当我们起了别名后，**在引用的时候如果实在 html 代码中和属性中填写路径，要注意使用~符号，(在 script 标签中不用加)，否则是不生效的**
`<img src="~assets/img/tabbar/home.svg" slot="item-icon">`
