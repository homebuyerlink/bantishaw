/*
* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
*/

jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})

/*!
* jQuery Browser Plugin 0.0.5
* https://github.com/gabceb/jquery-browser-plugin
*/
!function(a,b){"use strict";var c,d;if(a.uaMatch=function(a){a=a.toLowerCase();var b=/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(iphone)/.exec(a)||/(android)/.exec(a)||/(windows phone)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||[];return{browser:b[3]||b[1]||"",version:b[2]||"0",platform:c[0]||""}},c=a.uaMatch(b.navigator.userAgent),d={},c.browser&&(d[c.browser]=!0,d.version=c.version,d.versionNumber=parseInt(c.version)),c.platform&&(d[c.platform]=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv){var e="msie";c.browser=e,d[e]=!0}if(d.opr){var f="opera";c.browser=f,d[f]=!0}if(d.safari&&d.android){var g="android";c.browser=g,d[g]=!0}d.name=c.browser,d.platform=c.platform,a.browser=d}(jQuery,window);


/*
* jQuery.appear
* https://github.com/bas2k/jquery.appear/
* http://code.google.com/p/jquery-appear/
*
* Copyright (c) 2009 Michael Hixson
* Copyright (c) 2012 Alexander Brovikov
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
*/

!function(e){e.fn.appear=function(a,r){var n=e.extend({data:void 0,one:!0,accX:0,accY:0},r);return this.each(function(){var r=e(this);if(r.appeared=!1,!a)return void r.trigger("appear",n.data);var p=e(window),t=function(){if(!r.is(":visible"))return void(r.appeared=!1);var e=p.scrollLeft(),a=p.scrollTop(),t=r.offset(),c=t.left,i=t.top,o=n.accX,f=n.accY,s=r.height(),u=p.height(),d=r.width(),l=p.width();i+s+f>=a&&a+u+f>=i&&c+d+o>=e&&e+l+o>=c?r.appeared||r.trigger("appear",n.data):r.appeared=!1},c=function(){if(r.appeared=!0,n.one){p.unbind("scroll",t);var c=e.inArray(t,e.fn.appear.checks);c>=0&&e.fn.appear.checks.splice(c,1)}a.apply(this,arguments)};n.one?r.one("appear",n.data,c):r.bind("appear",n.data,c),p.scroll(t),e.fn.appear.checks.push(t),t()})},e.extend(e.fn.appear,{checks:[],timeout:null,checkAll:function(){var a=e.fn.appear.checks.length;if(a>0)for(;a--;)e.fn.appear.checks[a]()},run:function(){e.fn.appear.timeout&&clearTimeout(e.fn.appear.timeout),e.fn.appear.timeout=setTimeout(e.fn.appear.checkAll,20)}}),e.each(["append","prepend","after","before","attr","removeAttr","addClass","removeClass","toggleClass","remove","css","show","hide"],function(a,r){var n=e.fn[r];n&&(e.fn[r]=function(){var a=n.apply(this,arguments);return e.fn.appear.run(),a})})}(jQuery);

/*! device.js 0.1.58 */
(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")},device.fxos=function(){return(d("(mobile;")||d("(tablet;"))&&d("; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.meego=function(){return d("meego")},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()||device.meego()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.portrait=function(){return 90!==Math.abs(window.orientation)},device.landscape=function(){return 90===Math.abs(window.orientation)},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):device.android()?device.androidTablet()?b("android tablet"):b("android mobile"):device.blackberry()?device.blackberryTablet()?b("blackberry tablet"):b("blackberry mobile"):device.windows()?device.windowsTablet()?b("windows tablet"):device.windowsPhone()?b("windows mobile"):b("desktop"):device.fxos()?device.fxosTablet()?b("fxos tablet"):b("fxos mobile"):device.meego()?b("meego mobile"):b("desktop"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);

/*!
* classie - class helper functions
* from bonzo https://github.com/ded/bonzo
*
* classie.has( elem, 'my-class' ) -> true/false
* classie.add( elem, 'my-new-class' )
* classie.remove( elem, 'my-unwanted-class' )
* classie.toggle( elem, 'my-class' )
*/

/*jshint browser: true, strict: true, undef: true */
/*global define: false */


!function(s){"use strict";function e(s){return new RegExp("(^|\\s+)"+s+"(\\s+|$)")}function n(s,e){var n=a(s,e)?c:t;n(s,e)}var a,t,c;"classList"in document.documentElement?(a=function(s,e){return s.classList.contains(e)},t=function(s,e){s.classList.add(e)},c=function(s,e){s.classList.remove(e)}):(a=function(s,n){return e(n).test(s.className)},t=function(s,e){a(s,e)||(s.className=s.className+" "+e)},c=function(s,n){s.className=s.className.replace(e(n)," ")});var i={hasClass:a,addClass:t,removeClass:c,toggleClass:n,has:a,add:t,remove:c,toggle:n};"function"==typeof define&&define.amd?define(i):s.classie=i}(window);

/*
* Snap.js
*
* Copyright 2013, Jacob Kelley - http://jakiestfu.com/
* Released under the MIT Licence
* http://opensource.org/licenses/MIT
*
* Github:  http://github.com/jakiestfu/Snap.js/
* Version: 1.9.2
*/
(function(c,b){var a=a||function(k){var f={element:null,dragger:null,disable:"none",addBodyClasses:true,hyperextensible:true,resistance:0.5,flickThreshold:50,transitionSpeed:0.3,easing:"ease",maxPosition:266,minPosition:-266,tapToClose:true,touchToDrag:true,slideIntent:40,minDragDistance:5},e={simpleStates:{opening:null,towards:null,hyperExtending:null,halfway:null,flick:null,translation:{absolute:0,relative:0,sinceDirectionChange:0,percentage:0}}},h={},d={hasTouch:(b.ontouchstart===null),eventType:function(m){var l={down:(d.hasTouch?"touchstart":"mousedown"),move:(d.hasTouch?"touchmove":"mousemove"),up:(d.hasTouch?"touchend":"mouseup"),out:(d.hasTouch?"touchcancel":"mouseout")};return l[m]},page:function(l,m){return(d.hasTouch&&m.touches.length&&m.touches[0])?m.touches[0]["page"+l]:m["page"+l]},klass:{has:function(m,l){return(m.className).indexOf(l)!==-1},add:function(m,l){if(!d.klass.has(m,l)&&f.addBodyClasses){m.className+=" "+l}},remove:function(m,l){if(f.addBodyClasses){m.className=(m.className).replace(l,"").replace(/^\s+|\s+$/g,"")}}},dispatchEvent:function(l){if(typeof h[l]==="function"){return h[l].call()}},vendor:function(){var m=b.createElement("div"),n="webkit Moz O ms".split(" "),l;for(l in n){if(typeof m.style[n[l]+"Transition"]!=="undefined"){return n[l]}}},transitionCallback:function(){return(e.vendor==="Moz"||e.vendor==="ms")?"transitionend":e.vendor+"TransitionEnd"},canTransform:function(){return typeof f.element.style[e.vendor+"Transform"]!=="undefined"},deepExtend:function(l,n){var m;for(m in n){if(n[m]&&n[m].constructor&&n[m].constructor===Object){l[m]=l[m]||{};d.deepExtend(l[m],n[m])}else{l[m]=n[m]}}return l},angleOfDrag:function(l,o){var n,m;m=Math.atan2(-(e.startDragY-o),(e.startDragX-l));if(m<0){m+=2*Math.PI}n=Math.floor(m*(180/Math.PI)-180);if(n<0&&n>-180){n=360-Math.abs(n)}return Math.abs(n)},events:{addEvent:function g(m,l,n){if(m.addEventListener){return m.addEventListener(l,n,false)}else{if(m.attachEvent){return m.attachEvent("on"+l,n)}}},removeEvent:function g(m,l,n){if(m.addEventListener){return m.removeEventListener(l,n,false)}else{if(m.attachEvent){return m.detachEvent("on"+l,n)}}},prevent:function(l){if(l.preventDefault){l.preventDefault()}else{l.returnValue=false}}},parentUntil:function(n,l){var m=typeof l==="string";while(n.parentNode){if(m&&n.getAttribute&&n.getAttribute(l)){return n}else{if(!m&&n===l){return n}}n=n.parentNode}return null}},i={translate:{get:{matrix:function(n){if(!d.canTransform()){return parseInt(f.element.style.left,10)}else{var m=c.getComputedStyle(f.element)[e.vendor+"Transform"].match(/\((.*)\)/),l=8;if(m){m=m[1].split(",");if(m.length===16){n+=l}return parseInt(m[n],10)}return 0}}},easeCallback:function(){f.element.style[e.vendor+"Transition"]="";e.translation=i.translate.get.matrix(4);e.easing=false;clearInterval(e.animatingInterval);if(e.easingTo===0){d.klass.remove(b.body,"snapjs-right");d.klass.remove(b.body,"snapjs-left")}d.dispatchEvent("animated");d.events.removeEvent(f.element,d.transitionCallback(),i.translate.easeCallback)},easeTo:function(l){if(!d.canTransform()){e.translation=l;i.translate.x(l)}else{e.easing=true;e.easingTo=l;f.element.style[e.vendor+"Transition"]="all "+f.transitionSpeed+"s "+f.easing;e.animatingInterval=setInterval(function(){d.dispatchEvent("animating")},1);d.events.addEvent(f.element,d.transitionCallback(),i.translate.easeCallback);i.translate.x(l)}if(l===0){f.element.style[e.vendor+"Transform"]=""}},x:function(m){if((f.disable==="left"&&m>0)||(f.disable==="right"&&m<0)){return}if(!f.hyperextensible){if(m===f.maxPosition||m>f.maxPosition){m=f.maxPosition}else{if(m===f.minPosition||m<f.minPosition){m=f.minPosition}}}m=parseInt(m,10);if(isNaN(m)){m=0}if(d.canTransform()){var l="translate3d("+m+"px, 0,0)";f.element.style[e.vendor+"Transform"]=l}else{f.element.style.width=(c.innerWidth||b.documentElement.clientWidth)+"px";f.element.style.left=m+"px";f.element.style.right=""}}},drag:{listen:function(){e.translation=0;e.easing=false;d.events.addEvent(f.element,d.eventType("down"),i.drag.startDrag);d.events.addEvent(f.element,d.eventType("move"),i.drag.dragging);d.events.addEvent(f.element,d.eventType("up"),i.drag.endDrag)},stopListening:function(){d.events.removeEvent(f.element,d.eventType("down"),i.drag.startDrag);d.events.removeEvent(f.element,d.eventType("move"),i.drag.dragging);d.events.removeEvent(f.element,d.eventType("up"),i.drag.endDrag)},startDrag:function(n){var m=n.target?n.target:n.srcElement,l=d.parentUntil(m,"data-snap-ignore");if(l){d.dispatchEvent("ignore");return}if(f.dragger){var o=d.parentUntil(m,f.dragger);if(!o&&(e.translation!==f.minPosition&&e.translation!==f.maxPosition)){return}}d.dispatchEvent("start");f.element.style[e.vendor+"Transition"]="";e.isDragging=true;e.hasIntent=null;e.intentChecked=false;e.startDragX=d.page("X",n);e.startDragY=d.page("Y",n);e.dragWatchers={current:0,last:0,hold:0,state:""};e.simpleStates={opening:null,towards:null,hyperExtending:null,halfway:null,flick:null,translation:{absolute:0,relative:0,sinceDirectionChange:0,percentage:0}}},dragging:function(s){if(e.isDragging&&f.touchToDrag){var v=d.page("X",s),u=d.page("Y",s),t=e.translation,o=i.translate.get.matrix(4),n=v-e.startDragX,p=o>0,q=n,w;if((e.intentChecked&&!e.hasIntent)){return}if(f.addBodyClasses){if((o)>0){d.klass.add(b.body,"snapjs-left");d.klass.remove(b.body,"snapjs-right")}else{if((o)<0){d.klass.add(b.body,"snapjs-right");d.klass.remove(b.body,"snapjs-left")}}}if(e.hasIntent===false||e.hasIntent===null){var m=d.angleOfDrag(v,u),l=(m>=0&&m<=f.slideIntent)||(m<=360&&m>(360-f.slideIntent)),r=(m>=180&&m<=(180+f.slideIntent))||(m<=180&&m>=(180-f.slideIntent));if(!r&&!l){e.hasIntent=false}else{e.hasIntent=true}e.intentChecked=true}if((f.minDragDistance>=Math.abs(v-e.startDragX))||(e.hasIntent===false)){return}d.events.prevent(s);d.dispatchEvent("drag");e.dragWatchers.current=v;if(e.dragWatchers.last>v){if(e.dragWatchers.state!=="left"){e.dragWatchers.state="left";e.dragWatchers.hold=v}e.dragWatchers.last=v}else{if(e.dragWatchers.last<v){if(e.dragWatchers.state!=="right"){e.dragWatchers.state="right";e.dragWatchers.hold=v}e.dragWatchers.last=v}}if(p){if(f.maxPosition<o){w=(o-f.maxPosition)*f.resistance;q=n-w}e.simpleStates={opening:"left",towards:e.dragWatchers.state,hyperExtending:f.maxPosition<o,halfway:o>(f.maxPosition/2),flick:Math.abs(e.dragWatchers.current-e.dragWatchers.hold)>f.flickThreshold,translation:{absolute:o,relative:n,sinceDirectionChange:(e.dragWatchers.current-e.dragWatchers.hold),percentage:(o/f.maxPosition)*100}}}else{if(f.minPosition>o){w=(o-f.minPosition)*f.resistance;q=n-w}e.simpleStates={opening:"right",towards:e.dragWatchers.state,hyperExtending:f.minPosition>o,halfway:o<(f.minPosition/2),flick:Math.abs(e.dragWatchers.current-e.dragWatchers.hold)>f.flickThreshold,translation:{absolute:o,relative:n,sinceDirectionChange:(e.dragWatchers.current-e.dragWatchers.hold),percentage:(o/f.minPosition)*100}}}i.translate.x(q+t)}},endDrag:function(m){if(e.isDragging){d.dispatchEvent("end");var l=i.translate.get.matrix(4);if(e.dragWatchers.current===0&&l!==0&&f.tapToClose){d.dispatchEvent("close");d.events.prevent(m);i.translate.easeTo(0);e.isDragging=false;e.startDragX=0;return}if(e.simpleStates.opening==="left"){if((e.simpleStates.halfway||e.simpleStates.hyperExtending||e.simpleStates.flick)){if(e.simpleStates.flick&&e.simpleStates.towards==="left"){i.translate.easeTo(0)}else{if((e.simpleStates.flick&&e.simpleStates.towards==="right")||(e.simpleStates.halfway||e.simpleStates.hyperExtending)){i.translate.easeTo(f.maxPosition)}}}else{i.translate.easeTo(0)}}else{if(e.simpleStates.opening==="right"){if((e.simpleStates.halfway||e.simpleStates.hyperExtending||e.simpleStates.flick)){if(e.simpleStates.flick&&e.simpleStates.towards==="right"){i.translate.easeTo(0)}else{if((e.simpleStates.flick&&e.simpleStates.towards==="left")||(e.simpleStates.halfway||e.simpleStates.hyperExtending)){i.translate.easeTo(f.minPosition)}}}else{i.translate.easeTo(0)}}}e.isDragging=false;e.startDragX=d.page("X",m)}}}},j=function(l){if(l.element){d.deepExtend(f,l);e.vendor=d.vendor();i.drag.listen()}};this.open=function(l){d.dispatchEvent("open");d.klass.remove(b.body,"snapjs-expand-left");d.klass.remove(b.body,"snapjs-expand-right");if(l==="left"){e.simpleStates.opening="left";e.simpleStates.towards="right";d.klass.add(b.body,"snapjs-left");d.klass.remove(b.body,"snapjs-right");i.translate.easeTo(f.maxPosition)}else{if(l==="right"){e.simpleStates.opening="right";e.simpleStates.towards="left";d.klass.remove(b.body,"snapjs-left");d.klass.add(b.body,"snapjs-right");i.translate.easeTo(f.minPosition)}}};this.close=function(){d.dispatchEvent("close");i.translate.easeTo(0)};this.expand=function(l){var m=c.innerWidth||b.documentElement.clientWidth;if(l==="left"){d.dispatchEvent("expandLeft");d.klass.add(b.body,"snapjs-expand-left");d.klass.remove(b.body,"snapjs-expand-right")}else{d.dispatchEvent("expandRight");d.klass.add(b.body,"snapjs-expand-right");d.klass.remove(b.body,"snapjs-expand-left");m*=-1}i.translate.easeTo(m)};this.on=function(l,m){h[l]=m;return this};this.off=function(l){if(h[l]){h[l]=false}};this.enable=function(){d.dispatchEvent("enable");i.drag.listen()};this.disable=function(){d.dispatchEvent("disable");i.drag.stopListening()};this.settings=function(l){d.deepExtend(f,l)};this.state=function(){var l,m=i.translate.get.matrix(4);if(m===f.maxPosition){l="left"}else{if(m===f.minPosition){l="right"}else{l="closed"}}return{state:l,info:e.simpleStates}};j(k)};if((typeof module!=="undefined")&&module.exports){module.exports=a}if(typeof ender==="undefined"){this.Snap=a}if((typeof define==="function")&&define.amd){define("snap",[],function(){return a})}}).call(this,window,document);


/*!
* headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
* Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
* License: MIT
*/

!function(t,n){"use strict";function i(t){this.callback=t,this.ticking=!1}function e(n){return n&&"undefined"!=typeof t&&(n===t||n.nodeType)}function s(t){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var n,i,o=t||{};for(i=1;i<arguments.length;i++){var r=arguments[i]||{};for(n in r)o[n]="object"!=typeof o[n]||e(o[n])?o[n]||r[n]:s(o[n],r[n])}return o}function o(t){return t===Object(t)?t:{down:t,up:t}}function r(t,n){n=s(n,r.options),this.lastKnownScrollY=0,this.elem=t,this.debouncer=new i(this.update.bind(this)),this.tolerance=o(n.tolerance),this.classes=n.classes,this.offset=n.offset,this.scroller=n.scroller,this.initialised=!1,this.onPin=n.onPin,this.onUnpin=n.onUnpin,this.onTop=n.onTop,this.onNotTop=n.onNotTop}var l={bind:!!function(){}.bind,classList:"classList"in n.documentElement,rAF:!!(t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame)};t.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame,i.prototype={constructor:i,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},r.prototype={constructor:r,init:function(){return r.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var t=this.classes;this.initialised=!1,this.elem.classList.remove(t.unpinned,t.pinned,t.top,t.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var t=this.elem.classList,n=this.classes;(t.contains(n.pinned)||!t.contains(n.unpinned))&&(t.add(n.unpinned),t.remove(n.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var t=this.elem.classList,n=this.classes;t.contains(n.unpinned)&&(t.remove(n.unpinned),t.add(n.pinned),this.onPin&&this.onPin.call(this))},top:function(){var t=this.elem.classList,n=this.classes;t.contains(n.top)||(t.add(n.top),t.remove(n.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var t=this.elem.classList,n=this.classes;t.contains(n.notTop)||(t.add(n.notTop),t.remove(n.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(n.documentElement||n.body.parentNode||n.body).scrollTop},getViewportHeight:function(){return t.innerHeight||n.documentElement.clientHeight||n.body.clientHeight},getDocumentHeight:function(){var t=n.body,i=n.documentElement;return Math.max(t.scrollHeight,i.scrollHeight,t.offsetHeight,i.offsetHeight,t.clientHeight,i.clientHeight)},getElementHeight:function(t){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},getScrollerHeight:function(){return this.scroller===t||this.scroller===n.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(t){var n=0>t,i=t+this.getViewportHeight()>this.getScrollerHeight();return n||i},toleranceExceeded:function(t,n){return Math.abs(t-this.lastKnownScrollY)>=this.tolerance[n]},shouldUnpin:function(t,n){var i=t>this.lastKnownScrollY,e=t>=this.offset;return i&&e&&n},shouldPin:function(t,n){var i=t<this.lastKnownScrollY,e=t<=this.offset;return i&&n||e},update:function(){var t=this.getScrollY(),n=t>this.lastKnownScrollY?"down":"up",i=this.toleranceExceeded(t,n);this.isOutOfBounds(t)||(t<=this.offset?this.top():this.notTop(),this.shouldUnpin(t,i)?this.unpin():this.shouldPin(t,i)&&this.pin(),this.lastKnownScrollY=t)}},r.options={tolerance:{up:0,down:0},offset:0,scroller:t,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},r.cutsTheMustard="undefined"!=typeof l&&l.rAF&&l.bind&&l.classList,t.Headroom=r}(window,document);

!function(o){o&&(o.fn.headroom=function(t){return this.each(function(){var a=o(this),e=a.data("headroom"),n="object"==typeof t&&t;n=o.extend(!0,{},Headroom.options,n),e||(e=new Headroom(this,n),e.init(),a.data("headroom",e)),"string"==typeof t&&e[t]()})},o("[data-headroom]").each(function(){var t=o(this);t.headroom(t.data())}))}(window.Zepto||window.jQuery);
