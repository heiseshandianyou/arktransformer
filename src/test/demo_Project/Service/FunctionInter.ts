interface MyFunction {
    (param1: string, param2: number): boolean;
  }
  
  // 实现这个接口
  const myFunction: MyFunction = (param1, param2) => {
    console.log(param1, param2);
    return param2 > 0; // 示例返回值
  };

  const youFunction: MyFunction = (param1, param2) => {
    console.log(param1, param2);
    return param2 > 0; // 示例返回值
  };
  