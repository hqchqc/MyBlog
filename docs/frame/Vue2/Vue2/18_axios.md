# 18_axios

---

为了理解方便，coderwhy 老师将它理解为**ajax i/o system**我认为也是非常贴切的，下面让我们来使用一下吧
【**基本使用**】

1.  安装 axios 框架
    `npm install axios --save`
2.  导入
3.  使用
    `axios(config) //这里传入的config是一个对象，可以将配置信息传进去`
    完整代码如下：

        ```javascript
        import axios from 'axios'
         axios({
           url: 'http://123.207.32.32:8000/home/multidata'
         }).then(res => {
           console.log(res);
         })
        ```

    4.注意点： axios 返回的是一个 Promise，这一点在后面的封装会用到，和 ajax 请求相同，默认是 get 请求方式，若要修改可以使用`axios.get(config)`或是在 config 中指明 type 即可

【**axios 发送并发请求**】
上一次我们遇到并发请求的是`Peomise.all`的使用，同样，这里也有.all 方法来实现并发请求，axios.all 此方法返回的是一个数组，使用如下：

```javascript
axios
  .all([
    axios({
      url: "http://123.207.32.32:8000/home/multidata",
    }),
    axios.get("http://123.207.32.32:8000/home/data", {
      params: {
        type: "sell",
        page: 2,
      },
    }),
  ])
  .then((results) => {
    console.log(results);
  });
```

这里浏览器返回的是一个数组，如下图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200222203049171.png)
我们可以在`then`中采用`axios.spread`方法直接返回两个对象，如下：

```javascript
axios
  .all([
    axios({
      url: "http://123.207.32.32:8000/home/multidata",
    }),
    axios.get("http://123.207.32.32:8000/home/data", {
      params: {
        type: "sell",
        page: 2,
      },
    }),
  ])
  .then(
    axios.spread((res1, res2) => {
      console.log(res1);
      console.log(res2);
    })
  );
```

这样打印出的是这样，两个对象的形式
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200222203236600.png)

【**axios 全局配置**】
在以上使用的过程中，我们发现地址的前部分是相同，数据的请求方式也是相同的，这些相同的东西为了我们的简便以及后续的可维护性上考虑，我们可以将它抽离出来，即使用全局配置
如下：

```javascript
//使用全局的axios和对应的配置在进行网络请求
axios.defaults.baseURL = "http://123.207.32.32:8000";
axios.defaults.timeout = 5000;
```

这里我们采用`.default`方法设置了一个基本的地址和浏览器的响应时间，在设置好了以后，就可以如下这么写我们的 axios 代码

```javascript
axios
  .all([
    axios({
      url: "/home/multidata",
    }),
    axios.get("/home/data", {
      params: {
        type: "sell",
        page: 2,
      },
    }),
  ])
  .then(
    axios.spread((res1, res2) => {
      console.log(res1);
      console.log(res2);
    })
  );
```

注意点：这里我们还可以设置其它很多东西，例如请求方式，请求报文头中的一些信息，我们都可以将它指明，要注意的就是**一旦声明的是 params 那么就要对应 get 请求，如果是 request body 中的相关参数，则要对应 post 请求**

【**axios 的实例和模块封装**】
在上面的全局配置中，我们又发现了一些问题，一旦我的网络请求很多，而每一个 url 有些相同，有些不同该怎么办，实际上在项目开发的过程中，如果是中大型的项目开发中，会将文件存放在多个服务器上，防止并发量过大造成的服务器的过载，在服务器端就会使用反向代理服务器(nginx 部署)，这在客户端就会拿到很多的 url 地址，那么怎么解决呢，axios 为我们提供了一种解决办法，**创建对应的 axios 实例，不再使用全局**，使用如下：

```javascript
const instance1 = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 5000,
});

instance1({
  url: "/home/multidata",
}).then((res) => {
  console.log(res);
});
```

最开始我们可能会感到多此一举，但是一旦项目中使用到的网络请求增加，并且有一些地址相同，另一些地址相同的情况下，就会感到方便很多了。

下面就可以进行**模块封装**了：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一般情况下我们会先在 src 目录下新建一个文件夹，名称就叫 network，代表用来处理网络相关的内容，文件夹下新建一个 js 文件文件名可以叫 request.js，在这个页面中编写我们所有的网络请求的内容

1.  基本使用(传入三个参数，对应的是三个函数)

```javascript
import axios from "axios";

export function request(config, success, failure) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000,
  });

  instance(config)
    .then((data) => {
      // console.log(data);
      success(data);
    })
    .catch((err) => {
      // console.log(err);
      failure(err);
    });
}
```

调用时写的代码，按照指定的参数传入即可

```javascript
request(
  {
    url: "/home/data",
    params: {
      type: "pop",
      page: 2,
    },
  },
  (success) => {
    console.log(success);
  },
  (err) => {
    console.log(err);
  }
);
```

2. 传入一个参数，其实就是传入一个对象，对象中包含了上面的三个参数

```javascript
export function request(config) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000,
  });
  instance(config.baseConfig)
    .then((res) => {
      config.success(res);
    })
    .catch((err) => {
      config.failure(err);
    });
}
```

调用时写的代码

```javascript
request({
  baseConfig: {
    url: "/home/data",
    params: {
      type: "pop",
      page: 2,
    },
  },
  success(res) {
    console.log(res);
  },
  failure(err) {
    console.log(err);
  },
});
```

3. promise 的使用(初期 为了理解这个过程)

```javascript
export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: "http://123.207.32.32:8000",
      timeout: 5000,
    });

    instance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
```

调用时写的代码

```javascript
request({
  url: "/home/data",
  params: {
    type: "pop",
    page: 1,
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

这时我们发现，最开始的时候我们不是说过 axios 方法返回的不就是一个 promise 吗，所以大可不必在套一层，直接 return 回我们的 instance 即可，代码如下：

```javascript
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000,
  });
  return instance(config);
}
```

调用时的代码同上一个，这样就可以将我们处理从服务器端返回的数据和处理网络跳转的方法加以区分，更容易进行项目的维护

【**axios 拦截器的使用**】
在 axios 中还有一个拦截器的特别我们没有介绍，拦截器可以分为以下 2 类，即拦截请求和拦截响应，这两类又对应着拦截成功和拦截失败的情况，下面先来看我们的拦截请求`request`
我们要使用到`interceptors.request.use`函数，具体看代码

```javascript
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      console.log(config);
      return config;
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}
```

这里我们拦截了 instance 的请求，我们可以对拦截的请求进行相关处理后继续传给服务器端进行响应，这里有几种用途： **1. 对不符合信息我们可以将它过滤之后再发出；2. 我们可以在他发出这个请求出先做一些加载动画，再将它返回给服务器； 3. 在一些需要登录才能访问的界面我们可以先拦截请求，在检查请求中是否含有 token 令牌，有的话继续，没有就跳转到登录页面**，拦截失败的情况一般很少发生这里就不再赘述了；
另一个拦截响应的代码如下：

```javascript
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000,
  });

  instance.interceptors.response.use(
    (res) => {
      // console.log(res)
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}
```

这里我们使用的是`interceptors.response.use`，拦截响应，具体项目中我们可以做什么呢，就像是以上代码的，我们可以将服务器返回的数据我们进行处理以后再返回到客户端，这样就方便我们的处理，响应失败的情况比如说服务器找不到页面发出 404 请求等，我们就可以将他们的错误信息进行一些打印
