# 16_Vuex 中各个属性的使用

今天的学习围绕一张图片展开(图片引用自 Vuex 官方文档)，当我们的项目比较大时，Vuex 为我们在可以在组件外部管理状态提供了条件
![图片引用自Vuex官方文档](https://img-blog.csdnimg.cn/20200221204510133.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNzA5Mjky,size_16,color_FFFFFF,t_70)

**一、 State**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**状态**的意思，顾名思义，这里就是存放状态的地方，简单来说，就是**存放你需要共享的某些变量的地方**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】当我们在 state 中设置了相应的变量后，我们就可以来引用它们了，之前说过，当我们安装了 Vuex 后，会在全局生成一个 store 对象，我们可以使用，我们就可以使用这个 store 对象来访问我们的变量，如

```javascript
<h2>{{$store.state.counter}}</h2>
```

couter 我已经在 state 中添加了它的值
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**相关知识**】 **State 单一状态树**(Single Source of Truth)又叫做**单一数据源**，也就是说 Vuex 中建议我们在 Store 中存放一个 Store 对象的实例，这个实例就是数据源，如果数据源特别多，就不容易进行后期的维护和管理，所以最好只有一个 Store 实例，这就叫做单一状态树
**二、 Mutations**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**转变、改变**的意思，和 Vue 实例中的 methods 属性差不多，**主要存放的是处理数据的各个方法**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】在 Mutations 中定义的各个函数都会有一个参数 state，用来获取相应的数据，可以通过 state 调用 state 中存储的数据，进行相应转化，比如当我们在一个按钮中监听点击事件调用的那个函数时，函数中需要使用`this.$store.commit(Mutations中的函数名);`来调用 Mutations 中的函数进行处理，在 commit 中还可以同时提交一个对象交由 Mutations 处理，例如

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

这里我们传了一个 info 对象，这个 info 对象就被叫做**payload**,负载、载荷的意思，同时我们可以这么处理(students 是 state 中的一个数组)：

```javascript
addStu(state,info){
    state.students.push(info);
},
```

值得注意的是，**在 Vuex 中同样有像 Vue 中数组的有些方法一样不是响应式的**，因为**Vuex 中 store 状态的更新唯一方式是提交 Mutations**,比如`state.info['address'] = 'LiShui'`在 info 对象中添加属性 address，值为‘LiShui',我们应该这样`Vue.set(state.info,'address','LiShui');`还有一个`delete state.info.age;`也不是响应式的，应该修改为`Vue.delete(state.info,'age');`总之，我们必须遵守一些规则才能做到响应式：**1. 提前在 store 中初始化好所需的属性；2.当给 state 中的对象添加新的属性时使用`Vue.set`或是用新对象给就对象重新赋值的方式进行**

**三、 Getters**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**获得、得到**的意思,和 Vue 实例中的 computed 属性差不多，是对数据进行转化的地方
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**使用**】同样，在 getters 中定义的各个函数都有一个 state 参数，除此之外还有一个 geter 参数，可以获得自己 getter 下的其它函数，例如：

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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】**行动、行为**的意思，在这里编写我们的异步代码，由最开始的那张图片我们可以知道，当你有一些异步请求时如果我们在 Mutations 中处理，我们的 Devtools 没办好很好的跟踪这个操作什么时候会很好的完成，所以我们在 Actions 中编写我们的异步代码  
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

以下是处理那端代码，也就是 actions 中的代码：

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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;【**解释**】 **模块**的意思，Vue 使用的是单一状态数，那么也意味着很多状态都会交给 Vuex 来管理，当应用变得非常复杂时，store 对象就有可能变得相当臃肿，为了解决这个问题，Vuex 允许我们将 store 分割成模块，而每一个模块拥有自己的 state mutations actions getters
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

methods 中的代码：

```javascript
updataName(){
  this.$store.commit('updateName','JYQ')
},
AsycUpdataName(){
  this.$store.dispatch('AsycUpdateName');
}
```

module 中的代码

```javascript
 modules:{
	a: moduleA,
}
```

```javascript
const moduleA = {
  state: {
    name: "beanBag",
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload;
    },
  },
  getters: {
    aUpdateName(state) {
      return state.name + "1";
    },
    bUpdateName(state, getter) {
      return getter.aUpdateName + "2";
    },
    cUpdateName(state, getter, rootState) {
      return getter.bUpdateName + rootState.counter;
    },
  },
  actions: {
    AsyncUpdateName(context) {
      setTimeout(() => {
        context.commit("updateName", "hqc");
      }, 1000);
    },
  },
};
```
