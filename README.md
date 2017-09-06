# xDrag
xDrag is a Native JavaScript plugin to enable dragging and dropping as well as on a grid. 

## Installation
To install copy the javascripts directories into your project and add the following snippet to the header:
<code><script src="src/xDrag.js"></script></code>

## Examples
    <style>
      .box {
        width: 100px;
        height: 100px;
      }
    </style>
    <div class="wrapper" id="test">
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
    </div>
    <script>
      xDrag({
        id: 'test',
        dragClassName: 'box',
        rowMax: 4,
        gridGap: 20
      })
    </script>
