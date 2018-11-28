Commits

1. Plain simple box

![](https://i.imgur.com/sdIzbRR.png)

2. Back to start point

![](https://i.imgur.com/1ycrMzz.png)

3. added blue color to stroke

![](https://i.imgur.com/Z5VJ6JU.png)

4. Converting things from absolute pixel to variables + colorStrokes

![](https://i.imgur.com/N7eIygq.png)

5. Made everything a variable, can change delta

![](https://i.imgur.com/XvXA8YJ.png)

Code sample

![](https://i.imgur.com/Zk6JyQk.png)

6. Semi working slider

![](https://i.imgur.com/3Dzzojg.gif)

this is what it should do though??

![](https://i.imgur.com/BLFQngZ.png)

7. Working Prototype from stackoverflow, number coercion from slider

![](https://i.imgur.com/XU4AozG.gif)

```
slider.oninput = function () {
  ct.clearRect(0, 0, canvas.width, canvas.height); // reset lines
  delta = +this.value; // convert the slider value to a number for type coersion (see stackoverflow)
  requestAnimationFrame(init()); // redraw everything
}
```

16. Refactoring, part 1 destructuring with spread operator

![](https://i.imgur.com/JnxL44Q.png)

17. oh shit I made it work, two faces with remade formulas. Codes way cleaner now, code golf

![](https://i.imgur.com/8LxmBuh.png)

![](https://i.imgur.com/6LXc7NM.png)