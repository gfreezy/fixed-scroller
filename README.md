# Fixed Scroller

jQuery plugin for Xiachufang like scrolling effect.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/gfreezy/fixed-scroller/master/dist/fixed-scroller.min.js
[max]: https://raw.github.com/gfreezy/fixed-scroller/master/dist/fixed-scroller.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/fixed-scroller.min.js"></script>
<div class="main-panel">
  main content
  <div id="fixed-scroller-stop"></div>
</div>

<div class="right-panel">
  <div class="fixed-scroller">
    content to be scrolled.
  </div>
</div>

<script>
jQuery(function($) {
  $('.fixed-scroller').fixedScroller();
});
</script>
```

## Documentation
Fixed Scroller has only one method `fixedScroller()`. You call the method
when you want your content to scroll. Call the method another time will
make **Fixed Scroller** recalculate the height.

## Examples
http://www.xiachufang.com/explore/menu/collect/

## Release History
_(Nothing yet)_
