###
  fixed-scroller
  https://github.com/gfreezy/fixed-scroller
  Copyright (c) 2013 Alex.F
  Licensed under the MIT license.
###

do ($, window, document) ->
  ###
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
  ###

  uuid = ->
    result = []
    j = 9
    s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    while(--j)
      result.push(s.charAt(Math.floor(Math.random()*64)))
    result.join('')

  class FixedScroller
    constructor: (@el) ->
      @$el = $ @el
      @$window = $ window
      @$startEl = @startTop = @$stopEl = @stopTop = null
      @posFixed = @posAbsolute = false
      @posStatic = true
      @prevScrollLeft = do @$window.scrollLeft
      @$placeholder = null
      @$el.css 'z-index', 2
      do @insertPlaceholder
      do @reset
      do @scroll

      @$window.on 'scroll', => do @scroll

    insertPlaceholder: ->
      @$placeholder = $ """<div id="#{uuid()}" style="height: 0;"></div> """
      @$placeholder.width @$el.width()
      @$el.before @$placeholder

    reset: ->
      @$el.width @$el.width()
      $startEl = $("##{@$el.data('start-id')}")
      @$startEl = if $startEl.size() then $startEl else @$placeholder

      $stopEl = $("##{@$el.data('stop-id')}")
      @$stopEl = if $stopEl.size() then $stopEl else $('#fixed-scroller-stop')
      @startTop = @$startEl.offset().top
      stopBottom = if @$stopEl.size() then @$stopEl.offset().top else undefined
      @stopTop = stopBottom - @$el.outerHeight()

    scroll: ->
      # ignore horizontal scroll event
      scrollLeft = @$window.scrollLeft()
      if scrollLeft != @prevScrollLeft
        @prevScrollLeft = scrollLeft
        return

      if @startTop >= @stopTop
        # 页面高度不够滚动
        return

      scrollTop = @$window.scrollTop()

      if !@posStatic && @keepPositionStatic(scrollTop)
        @$el.css 'position', 'static'
        @posStatic = true
        @posFixed = @posAbsolute = false
      else if !@posFixed && @keepPositionFixed(scrollTop)
        @$el.css
          position: 'fixed'
          top: 0
        @posFixed = true
        @posStatic = @posAbsolute = false
      else if !@posAbsolute && @keepPositionAbsolute(scrollTop)
        @$el.css
          position: 'absolute'
        @$el.offset top: @stopTop, left: 'auto'
        @posAbsolute = true
        @posFixed = @posStatic = false

    keepPositionStatic: (scrollTop)->
      scrollTop < @startTop

    keepPositionFixed: (scrollTop)->
      @startTop <= scrollTop < @stopTop

    keepPositionAbsolute: (scrollTop)->
      scrollTop >= @stopTop

  $.fn.fixedScroller = (settings) ->
    @each ->
      if not scroller = @fixedScroller
        options = $.extend {}, settings
        @fixedScroller = scroller = new FixedScroller this, options
      else
        do scroller.reset
