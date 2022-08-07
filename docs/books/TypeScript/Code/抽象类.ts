// 计算面积
function makeArea(shape: Shape) {
  return shape.getArea();
}

abstract class Shape {
  abstract getArea();
}

class juxing extends Shape {
  private width: number;
  private height: number;

  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  // 抽象方法必须被子类实现
  getArea(): number {
    return this.width * this.height;
  }
}
console.log(makeArea(new juxing(10, 20)));
