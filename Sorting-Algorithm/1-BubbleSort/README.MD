# 冒泡排序(Bubble sort)

- 最优时间复杂度：O(n)
- 最差时间复杂度：O(n²)
- 稳定性：稳定

冒泡排序还有一种优化算法，就是立一个 flag，当在一趟序列遍历中元素没有发生交换，则证明该序列已经有序。但这种改进对于提升性能来说并没有什么太大作用。`??????`

## 算法步骤

- 比较相邻的元素。如果第一比第二大，就交换他们
- 对每一对相邻的元素做同样的工作，从开始到最后一对元素。做完这一步，最后一个元素即为最大元素
- 针对所有元素重复以上步骤，除了最后一个
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

## 动图演示

![冒泡排序](./index.gif)

## 代码

- 伪代码

- js

  ```js
    function bubblesort (arr) {
      let i, j, tmp;
      const { length } = arr;
      for (i = 0; i < length - 1; i++) {
        for (j = 0; j < length - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        }
      }
      return arr;
    }
  ```

- js(优化)

  ```js
    function bubblesort (arr) {
      let i, j, tmp, flag, lastIndex;
      const { length } = arr;
      for (i = 0, flag = length - 1; i < length - 1; i++) {
        lastIndex = flag;
        for (j = 0; j < lastIndex; j++) {
          if (arr[j] > arr[j + 1]) {
            tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;

            flag = j;
          }
        }
        if (flag === lastIndex) {
          break;
        }
      }
      return arr;
    }
  ```

## 性能分析

### 时间复杂度

- 常规的冒泡算法

  - 比较次数为：`n * (n - 1) / 2 = (n - 1) + (n - 2) + ... + 1`
  - 正序时，赋值次数为 0，逆序时赋值次数为 比较次数 * 3
  - 时间复杂度为 O(n²)

- 优化后的冒泡算法：

  - 正序时，比较次数是 n(n - 1 + 1)，赋值次数为 n - 1，时间复杂度为 O(n)
  - 反序时，比较次数是 `n * (n + 1) / 2 = n + (n - 1) + (n - 2) + ... + 1`，赋值次数为 `3 * n * (n - 1) / 2 = ((n - 1) + (n - 2) + ... + 1) * 3`，时间复杂度为 O(n²)

### 稳定性

冒泡排序就是把小的元素往前调或者把大的元素往后调。比较是相邻的两个元素比较，交换也发生在这两个元素之间。所以，如果两个元素相等，是不会再交换的；如果两个相等的元素没有相邻，那么即使通过前面的两两交换把两个相邻起来，这时候也不会交换，所以相同元素的前后顺序并没有改变，所以冒泡排序是一种稳定排序算法。
