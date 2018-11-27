<style>
  img {
    width: 50% !important;
  }
</style>
# musical-visualization-

Version 1 -> Original File

Version 2 -> New File

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

8. Created partial line using slope formulas in purple

![](https://i.imgur.com/Yo1AwTF.png)

9. Working shaded value face

![](https://i.imgur.com/o6ykolr.png)

10. Simple box finished

![](https://i.imgur.com/q8ILYqV.png)

11. Growing Box

![](https://i.imgur.com/qr0Tb2E.gif)

12. Made a full house

![](https://i.imgur.com/6xFKNRG.gif)

13. Second Slider on baseY point does weird stuff

![](https://i.imgur.com/BRCHXiP.gif)

14. Slope_B now console.logs correctly

![](https://i.imgur.com/yAXKCR7.gif)

15. Had Slope formula upsidedown, swap x and y

![](https://i.imgur.com/QhUdwIq.gif)

16. Refactoring to stackoverflow post initialization