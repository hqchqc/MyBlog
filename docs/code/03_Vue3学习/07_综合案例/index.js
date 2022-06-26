Vue.createApp({
  template: "#my-app",
  data() {
    return {
      books: [
        {
          id: 0,
          name: "<<算法导论>>",
          date: "2006-09",
          price: 85,
          count: 1,
        },
        {
          id: 1,
          name: "<<UNIX编程艺术>>",
          date: "2006-02",
          price: 59,
          count: 1,
        },
        {
          id: 2,
          name: "<<编程珠玑>>",
          date: "2008-10",
          price: 39,
          count: 1,
        },
        {
          id: 3,
          name: "<<代码大全>>",
          date: "2006-03",
          price: 128,
          count: 1,
        },
      ],
    };
  },
  computed: {
    totalPrice() {
      let totalProce = 0;
      this.books.forEach((book) => {
        totalProce += book.price * book.count;
      });
      return totalProce;
    },

    // Vue3不支持过滤器，推荐两种做法： 使用计算属性 / 使用全局方法
    filterBooks() {
      // Object.assign 对于引用数据类型是浅拷贝 对于简单数据类型是深拷贝
      return this.books.map((item) => {
        const newItem = Object.assign({}, item);
        newItem.price = "￥" + newItem.price;
        return newItem;
      });
    },
  },
  methods: {
    increament(index) {
      console.log(index);
      this.books[index].count++;
    },
    decreament(index) {
      console.log(index);
      this.books[index].count--;
    },
    remove(index) {
      this.books.splice(index, 1);
    },
    formatPrice(price) {
      return "￥" + price;
    },
  },
}).mount("#app");
