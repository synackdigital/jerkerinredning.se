function initializeInstafeed(t){uniqid=Date.now(),t.attr("id","instafeed-canvas-"+uniqid),$canvas_data=t.data("instafeed");var e="col-md-3";"standard_resolution"===$canvas_data.resolution&&(e="col-md-4");var i=new Instafeed({clientId:PHPVAR.instagram_client_id,userId:parseInt(PHPVAR.instagram_user_id),accessToken:PHPVAR.instagram_access_token,target:t.attr("id"),get:$canvas_data.get,limit:parseInt($canvas_data.limit),resolution:$canvas_data.resolution,links:$canvas_data.links,template:'<div class="col-xs-12 '+e+'"><div class="thumbnail"><a href="{{link}}"><img src="{{image}}" alt="{{caption}}"></a></div></div>',before:function(){},success:function(){},after:function(){},error:function(){}});i.run()}+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,n=this;t(this).one("bsTransitionEnd",function(){i=!0});var o=function(){i||t(n).trigger(t.support.transition.end)};return setTimeout(o,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(t){"use strict";function e(e){var i,n=e.attr("data-target")||(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return t(n)}function i(e){return this.each(function(){var i=t(this),o=i.data("bs.collapse"),s=t.extend({},n.DEFAULTS,i.data(),"object"==typeof e&&e);!o&&s.toggle&&"show"==e&&(s.toggle=!1),o||i.data("bs.collapse",o=new n(this,s)),"string"==typeof e&&o[e]()})}var n=function(e,i){this.$element=t(e),this.options=t.extend({},n.DEFAULTS,i),this.$trigger=t(this.options.trigger).filter('[href="#'+e.id+'"], [data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};n.VERSION="3.3.2",n.TRANSITION_DURATION=350,n.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},n.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},n.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,o=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(o&&o.length&&(e=o.data("bs.collapse"),e&&e.transitioning))){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){o&&o.length&&(i.call(o,"hide"),e||o.data("bs.collapse",null));var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var a=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return a.call(this);var l=t.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(n.TRANSITION_DURATION)[r](this.$element[0][l])}}}},n.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var o=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(o,this)).emulateTransitionEnd(n.TRANSITION_DURATION):o.call(this)}}},n.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},n.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(i,n){var o=t(n);this.addAriaAndCollapsedClass(e(o),o)},this)).end()},n.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var o=t.fn.collapse;t.fn.collapse=i,t.fn.collapse.Constructor=n,t.fn.collapse.noConflict=function(){return t.fn.collapse=o,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(n){var o=t(this);o.attr("data-target")||n.preventDefault();var s=e(o),r=s.data("bs.collapse"),a=r?"toggle":t.extend({},o.data(),{trigger:this});i.call(s,a)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),o=n.data("bs.tooltip"),s="object"==typeof e&&e;(o||"destroy"!=e)&&(o||n.data("bs.tooltip",o=new i(this,s)),"string"==typeof e&&o[e]())})}var i=function(t,e){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)};i.VERSION="3.3.2",i.TRANSITION_DURATION=150,i.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},i.prototype.init=function(e,i,n){this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(n),this.$viewport=this.options.viewport&&t(this.options.viewport.selector||this.options.viewport);for(var o=this.options.trigger.split(" "),s=o.length;s--;){var r=o[s];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},i.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,n){i[t]!=n&&(e[t]=n)}),e},i.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i&&i.$tip&&i.$tip.is(":visible")?void(i.hoverState="in"):(i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show())},i.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide()},i.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var n=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!n)return;var o=this,s=this.tip(),r=this.getUID(this.type);this.setContent(),s.attr("id",r),this.$element.attr("aria-describedby",r),this.options.animation&&s.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(a);h&&(a=a.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element);var c=this.getPosition(),p=s[0].offsetWidth,d=s[0].offsetHeight;if(h){var u=a,f=this.options.container?t(this.options.container):this.$element.parent(),m=this.getPosition(f);a="bottom"==a&&c.bottom+d>m.bottom?"top":"top"==a&&c.top-d<m.top?"bottom":"right"==a&&c.right+p>m.width?"left":"left"==a&&c.left-p<m.left?"right":a,s.removeClass(u).addClass(a)}var g=this.getCalculatedOffset(a,c,p,d);this.applyPlacement(g,a);var v=function(){var t=o.hoverState;o.$element.trigger("shown.bs."+o.type),o.hoverState=null,"out"==t&&o.leave(o)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",v).emulateTransitionEnd(i.TRANSITION_DURATION):v()}},i.prototype.applyPlacement=function(e,i){var n=this.tip(),o=n[0].offsetWidth,s=n[0].offsetHeight,r=parseInt(n.css("margin-top"),10),a=parseInt(n.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top=e.top+r,e.left=e.left+a,t.offset.setOffset(n[0],t.extend({using:function(t){n.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),n.addClass("in");var l=n[0].offsetWidth,h=n[0].offsetHeight;"top"==i&&h!=s&&(e.top=e.top+s-h);var c=this.getViewportAdjustedDelta(i,e,l,h);c.left?e.left+=c.left:e.top+=c.top;var p=/top|bottom/.test(i),d=p?2*c.left-o+l:2*c.top-s+h,u=p?"offsetWidth":"offsetHeight";n.offset(e),this.replaceArrow(d,n[0][u],p)},i.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},i.prototype.hide=function(e){function n(){"in"!=o.hoverState&&s.detach(),o.$element.removeAttr("aria-describedby").trigger("hidden.bs."+o.type),e&&e()}var o=this,s=this.tip(),r=t.Event("hide.bs."+this.type);return this.$element.trigger(r),r.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",n).emulateTransitionEnd(i.TRANSITION_DURATION):n(),this.hoverState=null,this)},i.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},i.prototype.hasContent=function(){return this.getTitle()},i.prototype.getPosition=function(e){e=e||this.$element;var i=e[0],n="BODY"==i.tagName,o=i.getBoundingClientRect();null==o.width&&(o=t.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var s=n?{top:0,left:0}:e.offset(),r={scroll:n?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},a=n?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},o,r,a,s)},i.prototype.getCalculatedOffset=function(t,e,i,n){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-n,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-n/2,left:e.left-i}:{top:e.top+e.height/2-n/2,left:e.left+e.width}},i.prototype.getViewportAdjustedDelta=function(t,e,i,n){var o={top:0,left:0};if(!this.$viewport)return o;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-s-r.scroll,l=e.top+s-r.scroll+n;a<r.top?o.top=r.top-a:l>r.top+r.height&&(o.top=r.top+r.height-l)}else{var h=e.left-s,c=e.left+s+i;h<r.left?o.left=r.left-h:c>r.width&&(o.left=r.left+r.width-c)}return o},i.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},i.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},i.prototype.tip=function(){return this.$tip=this.$tip||t(this.options.template)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},i.prototype.enable=function(){this.enabled=!0},i.prototype.disable=function(){this.enabled=!1},i.prototype.toggleEnabled=function(){this.enabled=!this.enabled},i.prototype.toggle=function(e){var i=this;e&&(i=t(e.currentTarget).data("bs."+this.type),i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),i.tip().hasClass("in")?i.leave(i):i.enter(i)},i.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type)})};var n=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=i,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=n,this}}(jQuery),function(){var t,e;t=function(){function t(t,e){var i,n;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(i in t)n=t[i],this.options[i]=n;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},t.prototype.run=function(e){var i,n,o;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(o=document.createElement("script"),o.id="instafeed-fetcher",o.src=e||this._buildUrl(),i=document.getElementsByTagName("head"),i[0].appendChild(o),n="instafeedCache"+this.unique,window[n]=new t(this.options,this),window[n].unique=this.unique),!0},t.prototype.parse=function(t){var e,i,n,o,s,r,a,l,h,c,p,d,u,f,m,g,v,y,b,w,C,_;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(f="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),u="least"===f[0]?!0:!1,f[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",u);break;case"liked":t.data=this._sortBy(t.data,"likes.count",u);break;case"commented":t.data=this._sortBy(t.data,"comments.count",u);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&this.options.mock===!1){if(l=t.data,null!=this.options.limit&&l.length>this.options.limit&&(l=l.slice(0,this.options.limit+1||9e9)),i=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(l=this._filter(l,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(o="",r="",c="",m=document.createElement("div"),g=0,b=l.length;b>g;g++)s=l[g],a=s.images[this.options.resolution].url,this.options.useHttp||(a=a.replace("http://","//")),r=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:a,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),o+=r;for(m.innerHTML=o,_=[].slice.call(m.childNodes),v=0,w=_.length;w>v;v++)d=_[v],i.appendChild(d)}else for(y=0,C=l.length;C>y;y++)s=l[y],h=document.createElement("img"),a=s.images[this.options.resolution].url,this.options.useHttp||(a=a.replace("http://","//")),h.src=a,this.options.links===!0?(e=document.createElement("a"),e.href=s.link,e.appendChild(h),i.appendChild(e)):i.appendChild(h);document.getElementById(this.options.target).appendChild(i),n=document.getElementsByTagName("head")[0],n.removeChild(document.getElementById("instafeed-fetcher")),p="instafeedCache"+this.unique,window[p]=void 0;try{delete window[p]}catch(k){}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,i;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if("string"!=typeof this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if("number"!=typeof this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if("number"!=typeof this.options.userId)throw new Error("No user specified. Use the 'userId' option.");if("string"!=typeof this.options.accessToken)throw new Error("No access token. Use the 'accessToken' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return i=""+t+"/"+e,i+=null!=this.options.accessToken?"?access_token="+this.options.accessToken:"?client_id="+this.options.clientId,null!=this.options.limit&&(i+="&count="+this.options.limit),i+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},""+t()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var i,n,o,s,r;for(n=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,i=t;n.test(i);)o=i.match(n)[1],s=null!=(r=this._getObjectProperty(e,o))?r:"",i=i.replace(n,""+s);return i},t.prototype._getObjectProperty=function(t,e){var i,n;for(e=e.replace(/\[(\w+)\]/g,".$1"),n=e.split(".");n.length;){if(i=n.shift(),!(null!=t&&i in t))return null;t=t[i]}return t},t.prototype._sortBy=function(t,e,i){var n;return n=function(t,n){var o,s;return o=this._getObjectProperty(t,e),s=this._getObjectProperty(n,e),i?o>s?1:-1:s>o?1:-1},t.sort(n.bind(this)),t},t.prototype._filter=function(t,e){var i,n,o,s,r;for(i=[],o=function(t){return e(t)?i.push(t):void 0},s=0,r=t.length;r>s;s++)n=t[s],o(n);return i},t}(),e="undefined"!=typeof exports&&null!==exports?exports:window,e.Instafeed=t}.call(this),function(){"use strict";function t(e,n){function o(t,e){return function(){return t.apply(e,arguments)}}var s;if(n=n||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=n.touchBoundary||10,this.layer=e,this.tapDelay=n.tapDelay||200,this.tapTimeout=n.tapTimeout||700,!t.notNeeded(e)){for(var r=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,l=0,h=r.length;h>l;l++)a[r[l]]=o(a[r[l]],a);i&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,i,n){var o=Node.prototype.removeEventListener;"click"===t?o.call(e,t,i.hijacked||i,n):o.call(e,t,i,n)},e.addEventListener=function(t,i,n){var o=Node.prototype.addEventListener;"click"===t?o.call(e,t,i.hijacked||(i.hijacked=function(t){t.propagationStopped||i(t)}),n):o.call(e,t,i,n)}),"function"==typeof e.onclick&&(s=e.onclick,e.addEventListener("click",function(t){s(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,i=navigator.userAgent.indexOf("Android")>0&&!e,n=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,o=n&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=n&&/OS [6-7]_\d/.test(navigator.userAgent),r=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(n&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!i;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var i,n;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),n=e.changedTouches[0],i=document.createEvent("MouseEvents"),i.initMouseEvent(this.determineEventType(t),!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),i.forwardedTouchEvent=!0,t.dispatchEvent(i)},t.prototype.determineEventType=function(t){return i&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;n&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,i;if(e=t.fastClickScrollParent,!e||!e.contains(t)){i=t;do{if(i.scrollHeight>i.offsetHeight){e=i,t.fastClickScrollParent=i;break}i=i.parentElement}while(i)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,i,s;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),i=t.targetTouches[0],n){if(s=window.getSelection(),s.rangeCount&&!s.isCollapsed)return!0;if(!o){if(i.identifier&&i.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=i.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=i.pageX,this.touchStartY=i.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],i=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>i||Math.abs(e.pageY-this.touchStartY)>i?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,r,a,l,h,c=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,r=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(h=t.changedTouches[0],c=document.elementFromPoint(h.pageX-window.pageXOffset,h.pageY-window.pageYOffset)||c,c.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=c.tagName.toLowerCase(),"label"===a){if(e=this.findControl(c)){if(this.focus(c),i)return!1;c=e}}else if(this.needsFocus(c))return t.timeStamp-r>100||n&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(c),this.sendClick(c,t),n&&"select"===a||(this.targetElement=null,t.preventDefault()),!1);return n&&!o&&(l=c.fastClickScrollParent,l&&l.fastClickLastScrollTop!==l.scrollTop)?!0:(this.needsClick(c)||(t.preventDefault(),this.sendClick(c,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;i&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,n,o,s;if("undefined"==typeof window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!i)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(r&&(o=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),o[1]>=10&&o[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(s=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],s>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,i){return new t(e,i)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}(),function(t){var e={common:{init:function(){FastClick.attach(document.body),t(".instafeed-canvas").each(function(e){initializeInstafeed(t(this))}),t("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=t(this.hash);if(e=e.length?e:t("[name="+this.hash.slice(1)+"]"),e.length)return t("html,body").animate({scrollTop:e.offset().top-130},720),!1}})},finalize:function(){}},home:{init:function(){},finalize:function(){}},bord:{init:function(){}}},i={fire:function(t,i,n){var o,s=e;i=void 0===i?"init":i,o=""!==t,o=o&&s[t],o=o&&"function"==typeof s[t][i],o&&s[t][i](n)},loadEvents:function(){i.fire("common"),t.each(document.body.className.replace(/-/g,"_").split(/\s+/),function(t,e){i.fire(e),i.fire(e,"finalize")}),i.fire("common","finalize")}};t(document).ready(i.loadEvents)}(jQuery),function(t,e,i,n){"use strict";function o(t,e){this.options=i.extend(!0,i.fn[s].defaults,e),this.$element=i(t),this.$modelsContainer=i(".tableflip__models",this.$element),this.$modelsSlides=i(".tableflip__slides",this.$modelsContainer),this.$modelsNextControl=i(".tableflip__control--next",this.$modelsContainer),this.$modelsPrevControl=i(".tableflip__control--prev",this.$modelsContainer),this.$modelLabel=i(".tableflip__label--model",this.$modelsContainer),this.$widthControl=i(".tableflip__control--width",this.$element),this.$widthLabel=i(".tableflip__label--width",this.$element),this.$lengthControl=i(".tableflip__control--length",this.$element),this.$lengthLabel=i(".tableflip__label--length",this.$element),this.$materialsContainer=i(".tableflip__materials",this.$element),this.$finishesContainer=i(".tableflip__finishes",this.$element),this.$customerContainer=i(".tableflip__customer",this.$element),this.$thankyouContainer=i(".tableflip__thankyou",this.$element),this.$orderControl=i(".tableflip__control--order",this.$element),i.each(i(".tableflip__model",this.$modelsContainer),i.proxy(function(t,e){var n=i(e).data("tableflip-model");n.base_price=parseInt(n.base_price,10),n.max_length=parseInt(n.max_length,10),n.max_width=parseInt(n.max_width,10),n.min_length=parseInt(n.min_length,10),n.min_width=parseInt(n.min_width,10),n.sqm_price=parseInt(n.sqm_price,10),n.$element=e,this.options.models.push(n)},this)),i.each(i(".tableflip__material",this.$materialsContainer),i.proxy(function(t,e){var n=i(e).data("tableflip-material");n.price_modifier=parseFloat(n.price_modifier,10),n.$element=e,this.options.materials.push(n)},this)),i.each(i(".tableflip__finish",this.$finishesContainer),i.proxy(function(t,e){var n=i(e).data("tableflip-finish");n.price_modifier=parseFloat(n.price_modifier,10),n.$element=e,this.options.finishes.push(n)},this))}var s="tableflip";o.prototype={constructor:o,version:"0.1.0",init:function(){console.log("(╯°□°）╯︵ ┻━┻"),this.$customerContainer.hide(),this.$thankyouContainer.hide(),this.setModel(0),this.setWidth(800),this.setLength(1850),this.setMaterial(1),this.setFinish(4,!0),this.$modelsNextControl.on("click",i.proxy(function(t){t.preventDefault(),this.setModel("next",!0)},this)),this.$modelsPrevControl.on("click",i.proxy(function(t){t.preventDefault(),this.setModel("prev",!0)},this)),this.$orderControl.on("click",i.proxy(function(t){t.preventDefault(),this.sendOrder()},this)),this.$widthControl.on("input",i.proxy(function(t){t.preventDefault(),this.setWidth(t.currentTarget.value,!0)},this)),this.$lengthControl.on("input",i.proxy(function(t){t.preventDefault(),this.setLength(t.currentTarget.value,!0)},this)),i(".tableflip__material",this.$materialsContainer).on("click",i.proxy(function(t){this.setMaterial(i(".tableflip__material",this.$materialsContainer).index(t.currentTarget),!0)},this)),i(".tableflip__finish",this.$finishesContainer).on("click",i.proxy(function(t){this.setFinish(i(".tableflip__finish",this.$finishesContainer).index(t.currentTarget),!0)},this))},setModel:function(t,e){if("string"==typeof t){var i=t;switch(t=this.options.models.indexOf(this.options.order.model),i){case"next":t>=this.options.models.length-1?t=0:t+=1;break;case"prev":0>=t?t=this.options.models.length-1:t-=1}}this.options.order.model=this.options.models[t],this.setWidth(this.options.order.width),this.setLength(this.options.order.length),e&&this.refresh()},getModel:function(){return this.options.order.model},setMaterial:function(t,e){this.options.order.material=this.options.materials[t],e&&this.refresh()},getMaterial:function(){return this.options.order.material},verifyMaterialAvailability:function(){this.options.order.material.disable_for_model===this.options.order.model.name&&this.setMaterial(0,!0)},setFinish:function(t,e){this.options.order.finish=this.options.finishes[t],e&&this.refresh()},getFinish:function(){return this.options.order.finish},setWidth:function(t,e){t=t>this.options.order.model.max_width?this.options.order.model.max_width:t,t=t<this.options.order.model.min_width?this.options.order.model.min_width:t,this.options.order.width=t,e&&this.refresh()},getWidth:function(){return this.options.order.width},setLength:function(t,e){t=t>this.options.order.model.max_length?this.options.order.model.max_length:t,t=t<this.options.order.model.min_length?this.options.order.model.min_length:t,
this.options.order.length=t,e&&this.refresh()},getLength:function(){return this.options.order.length},setPrice:function(t){var e=this.options.order.model,i=this.options.order.material,n=this.options.order.finish,o=e.base_price+this.getSqm()*e.sqm_price*i.price_modifier*n.price_modifier,s=100*Math.ceil(o/100);this.options.order.price=s,t&&this.refresh()},getPrice:function(){return this.setPrice(),this.options.order.price},getPriceString:function(){if(0<this.getPrice()){var t=this.getPrice().toString().split("").reverse();return i.each(t,function(e,i){0!==e&&e%3===0&&(t[e]=i+"&thinsp;")}),"Beställ nu för "+t.reverse().join("")+"&thinsp;<abbr>"+this.options.order.currency+"</abbr>"}return"Skicka en offertförfrågan"},getSqm:function(){return this.getLength()*this.getWidth()/1e6},refresh:function(){this.options.order.material&&this.verifyMaterialAvailability();var t=i(this.options.order.model.$element).position();this.$modelsSlides.css("left",-1*t.left),this.$modelsSlides.css("height",i(this.options.order.model.$element).outerHeight()),i.each(this.options.materials,i.proxy(function(t,e){i(e.$element).removeClass("disabled"),e.disable_for_model===this.options.order.model.name&&i(e.$element).addClass("disabled")},this)),this.verifyMaterialAvailability(),i(".tableflip__material",this.$materialsContainer).removeClass("selected"),i(".tableflip__finish",this.$finishesContainer).removeClass("selected"),i(this.options.order.material.$element).addClass("selected"),i(this.options.order.finish.$element).addClass("selected"),this.$widthControl.attr("min",this.options.order.model.min_width).attr("max",this.options.order.model.max_width).attr("value",this.options.order.width),this.$lengthControl.attr("min",this.options.order.model.min_length).attr("max",this.options.order.model.max_length).attr("value",this.options.order.length),this.$modelLabel.html(this.options.order.model.name),this.$widthLabel.html(this.options.order.width/10+" cm"),this.$lengthLabel.html(this.options.order.length/10+" cm"),this.$orderControl.html(this.getPriceString())},getOrderJSON:function(){var t=this.options.order;return delete t.model.$element,delete t.material.$element,delete t.finish.$element,JSON.stringify(t,null,"	")},sendOrder:function(){var t="",e=i("#tableflip__control__customer-name").val(),n=i("#tableflip__control__customer-email").val(),o=i("#tableflip__control__customer-phone").val();if(e&&n&&o?t=JSON.stringify({name:e,email:n,phone:o},null,"	"):this.$customerContainer.show("fast"),""!==t){var s=this.getOrderJSON()+"\n\n"+t+"\n\n";i.getJSON("https://mandrillapp.com/api/1.0/messages/send.json",{key:"Dc-Fq14eZF279Fst3umiOQ",message:{subject:"Order from jerkerinredning.se",from_email:"post@jerker.eu",from_name:"Jerker Inredning & Form",to:[{email:"post@jerker.eu",name:"Jerker Inredning & Form",type:"to"}],text:s}},i.proxy(function(t,e){this.$thankyouContainer.show("fast"),this.$customerContainer.hide("fast"),this.$orderControl.hide()},this))}}},i.fn[s]=function(t,e){return this.each(function(){var n=i(this),r=n.data(s);e="object"==typeof t?t:e,r||n.data(s,r=new o(this,e)),r["string"==typeof t?t:"init"]()})},i.fn[s].defaults={models:[],materials:[],finishes:[],order:{model:null,material:null,finish:null,width:0,length:0,price:0,currency:"SEK"}},i(t).on("load",function(t){i("."+s).each(function(){i(this)[s]()})})}(this,this.document,this.jQuery);
//# sourceMappingURL=main.js.map
