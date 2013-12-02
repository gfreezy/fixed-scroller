/*
  fixed-scroller
  https://github.com/gfreezy/fixed-scroller
  Copyright (c) 2013 Alex.F
  Licensed under the MIT license.
*/


(function() {
  (function($, window, document) {
    /*
    使用方式：
      <div class="fixed-scroller" data-start-id="fixed-scroller-start"
        data-stop-id="fixed-scroller-stop">
        需要固定滚动的区域
      </div>
    
      <script>
        $('.fixed-scroller').fixedScroller()
      </script>
    
    
    data-start-id: 区域从id对应的元素开始相对屏幕固定，默认为文档流中的位置
                  （即未处理前的位置）
    data-stop-id: 从id对应的元素开始不再相对固定，跟随滚动。默认为
                  #fixed-scroller-stop
    */

    var FixedScroller, uuid;
    uuid = function() {
      var j, result, s;
      result = [];
      j = 9;
      s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      while (--j) {
        result.push(s.charAt(Math.floor(Math.random() * 64)));
      }
      return result.join('');
    };
    FixedScroller = (function() {
      function FixedScroller(el) {
        var _this = this;
        this.el = el;
        this.$el = $(this.el);
        this.$window = $(window);
        this.$startEl = this.startTop = this.$stopEl = this.stopTop = null;
        this.posFixed = this.posAbsolute = false;
        this.posStatic = true;
        this.prevScrollLeft = this.$window.scrollLeft();
        this.$placeholder = null;
        this.$el.css('z-index', 2);
        this.insertPlaceholder();
        this.reset();
        this.scroll();
        this.$window.on('scroll', function() {
          return _this.scroll();
        });
      }

      FixedScroller.prototype.insertPlaceholder = function() {
        this.$placeholder = $("<div id=\"" + (uuid()) + "\" style=\"height: 0;\"></div> ");
        this.$placeholder.width(this.$el.width());
        return this.$el.before(this.$placeholder);
      };

      FixedScroller.prototype.reset = function() {
        var $startEl, $stopEl, stopBottom;
        this.$el.width(this.$el.width());
        $startEl = $("#" + (this.$el.data('start-id')));
        this.$startEl = $startEl.size() ? $startEl : this.$placeholder;
        $stopEl = $("#" + (this.$el.data('stop-id')));
        this.$stopEl = $stopEl.size() ? $stopEl : $('#fixed-scroller-stop');
        this.startTop = this.$startEl.offset().top;
        stopBottom = this.$stopEl.size() ? this.$stopEl.offset().top : void 0;
        return this.stopTop = stopBottom - this.$el.outerHeight();
      };

      FixedScroller.prototype.scroll = function() {
        var scrollLeft, scrollTop;
        scrollLeft = this.$window.scrollLeft();
        if (scrollLeft !== this.prevScrollLeft) {
          this.prevScrollLeft = scrollLeft;
          return;
        }
        if (this.startTop >= this.stopTop) {
          return;
        }
        scrollTop = this.$window.scrollTop();
        if (!this.posStatic && this.keepPositionStatic(scrollTop)) {
          this.$el.css('position', 'static');
          this.posStatic = true;
          return this.posFixed = this.posAbsolute = false;
        } else if (!this.posFixed && this.keepPositionFixed(scrollTop)) {
          this.$el.css({
            position: 'fixed',
            top: 0
          });
          this.posFixed = true;
          return this.posStatic = this.posAbsolute = false;
        } else if (!this.posAbsolute && this.keepPositionAbsolute(scrollTop)) {
          this.$el.css({
            position: 'absolute'
          });
          this.$el.offset({
            top: this.stopTop,
            left: 'auto'
          });
          this.posAbsolute = true;
          return this.posFixed = this.posStatic = false;
        }
      };

      FixedScroller.prototype.keepPositionStatic = function(scrollTop) {
        return scrollTop < this.startTop;
      };

      FixedScroller.prototype.keepPositionFixed = function(scrollTop) {
        return (this.startTop <= scrollTop && scrollTop < this.stopTop);
      };

      FixedScroller.prototype.keepPositionAbsolute = function(scrollTop) {
        return scrollTop >= this.stopTop;
      };

      return FixedScroller;

    })();
    return $.fn.fixedScroller = function(settings) {
      return this.each(function() {
        var options, scroller;
        if (!(scroller = this.fixedScroller)) {
          options = $.extend({}, settings);
          return this.fixedScroller = scroller = new FixedScroller(this, options);
        } else {
          return scroller.reset();
        }
      });
    };
  })($, window, document);

}).call(this);
