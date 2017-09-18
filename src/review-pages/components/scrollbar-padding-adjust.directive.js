import Vue from 'vue'

Vue.directive('focus', {
  data: function() {
    return {
      hostConfigOk,
      wrapper,
      list          
    }
  },
  methods: {
    getHostConfig(el) {
      this.wrapper = el  //   this.elementRef.nativeElement;
      this.list = this.wrapper.querySelector('ul');
      if (!this.list) {
        this.hostConfigOk = false;
        return;
      }
      const overflowY = this.list.ownerDocument.defaultView
        .getComputedStyle(this.list, undefined).overflowY;
      this.hostConfigOk = (overflowY === 'auto' || overflowY === 'scroll') && this.wrapper && this.list;
    },
    calcListPaddingRight() {
      // Ref: https://github.com/milichev/ng2-if-scrollbars/blob/master/IfScrollbars.ts
      const scrollIsVisible = this.list.clientHeight < this.list.scrollHeight;
      this.wrapper.style.paddingRight = scrollIsVisible ? '0.2em' : '1em';
    }  
  },
  bind: function (el) {
    this.getHostConfig(el)
  },
  componentUpdated: function (el) {
    if (this.hostConfigOk) {
      this.calcListPaddingRight()
    }
  }
})
