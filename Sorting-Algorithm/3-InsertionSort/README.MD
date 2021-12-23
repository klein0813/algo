# 插入排序(Insertion sort)

插入排序，一般也被称为直接插入排序。对于少量元素的排序，它是一个有效的算法 [1]  。插入排序是一种最简单的排序方法，它的基本思想是将一个记录插入到已经排好序的有序表中，从而一个新的、记录数增1的有序表

- 最优时间复杂度：O(n)
- 最差时间复杂度：O(n²)
- 稳定性：稳定

## 算法步骤

- 将第一个元素看成已排序队列，第二到最后一个元素看成未排序队列
- 从头到尾依次扫描未排序队列，将扫描到的元素插入到已排序队列的适当位置。（如果扫描到的元素和已排序队列的某个元素相等，则放在其后面）

## 动图演示

![插入排序](./index.gif)

## 代码

- 伪代码

  ```txt
  INSERTION-SORT(A)
    for j=2 to A.length:
      key=A[j]
      //将A[j]插入已排序序列A[1..j-1]
      i=j-1
      while i>0 and A[i]>key
          A[i+1]= A[i]
          i=i-1
      A[i+1]=key
  ```

- js

  ```js
    function insertionsort (arr) {
      let i, j, current;
      const { length } = arr; 
      for (i = 0; i < length - 1; i++) {
        j = i + 1;
        current = arr[j];
        while (j-- > 0 && arr[j] > current) {
          arr[j + 1] = arr[j];
        }
        arr[j + 1] = current;
      }
      return arr;
    }
  ```

## 性能分析

### 时间复杂度

- 正序时，只需当前数跟前一个数比较一下就可以了，这时一共需要比较N- 1次，时间复杂度为 O(n)
- 反序时，比较次数最多，总次数记为：1+2+3+…+N-1，所以，插入排序最坏情况下的时间复杂度为 O(n²)

### 稳定性
