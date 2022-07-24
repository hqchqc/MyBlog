export const demoMixin = {
  data() {
    return {
      message: "这是混入的message",
    };
  },
  created() {
    console.log("这是混入的created");
  },
  methods: {
    sayHi() {
      console.log("这里say mixin");
    },
  },
};
