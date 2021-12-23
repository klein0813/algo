# 十大经典排序算法

<https://www.runoob.com/w3cnote/ten-sorting-algorithm.html>

排序算法可以分为内部排序和外部排序，内部排序是数据记录在内存中进行排序，而外部排序是因排序的数据很大，一次不能容纳全部的排序记录，在排序过程中需要访问外存。常见的内部排序算法有：插入排序、希尔排序、选择排序、冒泡排序、归并排序、快速排序、堆排序、基数排序

![sort1](../assets/sort1.png)

![sort2](../assets/sort2.png)

名词解释：

- n：数据规模
- k："桶"的个数
- In-place：占用常数内存，不占用额外内存
- Out-place：占用额外内存
- 稳定性：排序后 2 个相等键值的顺序和排序之前它们的顺序相同

稳定性分析:

如果待排序的序列中存在两个或两个以上具有相同关键词的数据，排序后这些数据的相对次序保持不变，即它们的位置保持不变，通俗地讲，就是两个相同的数的相对顺序不会发生改变，则该算法是稳定的；如果排序后，数据的相对次序发生了变化，则该算法是不稳定的

包含以下内容：

1. [冒泡排序](./Sorting-Algorithm/1-BubbleSort/README.MD)
2. [选择排序](./Sorting-Algorithm/2-SelectionSort/README.MD)
3. [插入排序](./Sorting-Algorithm/3-InsertionSort/README.MD)
4. 希尔排序
5. 归并排序
6. 快速排序
7. 堆排序
8. 计数排序
9. 桶排序
10. 基数排序
