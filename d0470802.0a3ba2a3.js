(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{102:function(e,t,n){e.exports=!n(113)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},103:function(e,t,n){var r=n(106);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},104:function(e,t,n){var r=n(109),i=n(127);e.exports=n(102)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},106:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},108:function(e,t){var n=e.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)},109:function(e,t,n){var r=n(103),i=n(138),o=n(139),a=Object.defineProperty;t.f=n(102)?Object.defineProperty:function(e,t,n){if(r(e),t=o(t,!0),r(n),i)try{return a(e,t,n)}catch(u){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},110:function(e,t,n){var r=n(98),i=n(104),o=n(112),a=n(117)("src"),u=n(142),s=(""+u).split("toString");n(108).inspectSource=function(e){return u.call(e)},(e.exports=function(e,t,n,u){var c="function"==typeof n;c&&(o(n,"name")||i(n,"name",t)),e[t]!==n&&(c&&(o(n,a)||i(n,a,e[t]?""+e[t]:s.join(String(t)))),e===r?e[t]=n:u?e[t]?e[t]=n:i(e,t,n):(delete e[t],i(e,t,n)))})(Function.prototype,"toString",(function(){return"function"==typeof this&&this[a]||u.call(this)}))},111:function(e,t,n){var r=n(98),i=n(108),o=n(104),a=n(110),u=n(119),s=function(e,t,n){var c,l,f,p,m=e&s.F,d=e&s.G,v=e&s.S,h=e&s.P,y=e&s.B,b=d?r:v?r[t]||(r[t]={}):(r[t]||{}).prototype,g=d?i:i[t]||(i[t]={}),x=g.prototype||(g.prototype={});for(c in d&&(n=t),n)f=((l=!m&&b&&void 0!==b[c])?b:n)[c],p=y&&l?u(f,r):h&&"function"==typeof f?u(Function.call,f):f,b&&a(b,c,f,e&s.U),g[c]!=f&&o(g,c,p),h&&x[c]!=f&&(x[c]=f)};r.core=i,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},112:function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},113:function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},117:function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},118:function(e,t,n){var r=n(108),i=n(98),o=i["__core-js_shared__"]||(i["__core-js_shared__"]={});(e.exports=function(e,t){return o[e]||(o[e]=void 0!==t?t:{})})("versions",[]).push({version:r.version,mode:n(128)?"pure":"global",copyright:"\xa9 2019 Denis Pushkarev (zloirock.ru)"})},119:function(e,t,n){var r=n(123);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},122:function(e,t,n){var r=n(125),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},123:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},124:function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},125:function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},126:function(e,t,n){var r=n(106),i=n(98).document,o=r(i)&&r(i.createElement);e.exports=function(e){return o?i.createElement(e):{}}},127:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},128:function(e,t){e.exports=!1},138:function(e,t,n){e.exports=!n(102)&&!n(113)((function(){return 7!=Object.defineProperty(n(126)("div"),"a",{get:function(){return 7}}).a}))},139:function(e,t,n){var r=n(106);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},142:function(e,t,n){e.exports=n(118)("native-function-to-string",Function.toString)},170:function(e,t,n){"use strict";var r=n(98),i=n(109),o=n(102),a=n(99)("species");e.exports=function(e){var t=r[e];o&&t&&!t[a]&&i.f(t,a,{configurable:!0,get:function(){return this}})}},173:function(e,t,n){var r=n(103),i=n(123),o=n(99)("species");e.exports=function(e,t){var n,a=r(e).constructor;return void 0===a||null==(n=r(a)[o])?t:i(n)}},174:function(e,t,n){var r,i,o,a=n(119),u=n(224),s=n(141),c=n(126),l=n(98),f=l.process,p=l.setImmediate,m=l.clearImmediate,d=l.MessageChannel,v=l.Dispatch,h=0,y={},b=function(){var e=+this;if(y.hasOwnProperty(e)){var t=y[e];delete y[e],t()}},g=function(e){b.call(e.data)};p&&m||(p=function(e){for(var t=[],n=1;arguments.length>n;)t.push(arguments[n++]);return y[++h]=function(){u("function"==typeof e?e:Function(e),t)},r(h),h},m=function(e){delete y[e]},"process"==n(124)(f)?r=function(e){f.nextTick(a(b,e,1))}:v&&v.now?r=function(e){v.now(a(b,e,1))}:d?(o=(i=new d).port2,i.port1.onmessage=g,r=a(o.postMessage,o,1)):l.addEventListener&&"function"==typeof postMessage&&!l.importScripts?(r=function(e){l.postMessage(e+"","*")},l.addEventListener("message",g,!1)):r="onreadystatechange"in c("script")?function(e){s.appendChild(c("script")).onreadystatechange=function(){s.removeChild(this),b.call(e)}}:function(e){setTimeout(a(b,e,1),0)}),e.exports={set:p,clear:m}},175:function(e,t,n){"use strict";var r=n(123);function i(e){var t,n;this.promise=new e((function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r})),this.resolve=r(t),this.reject=r(n)}e.exports.f=function(e){return new i(e)}},183:function(e,t,n){var r=n(103);e.exports=function(e,t,n,i){try{return i?t(r(n)[0],n[1]):t(n)}catch(a){var o=e.return;throw void 0!==o&&r(o.call(e)),a}}},184:function(e,t,n){var r=n(116),i=n(99)("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||o[i]===e)}},185:function(e,t,n){var r=n(151),i=n(99)("iterator"),o=n(116);e.exports=n(108).getIteratorMethod=function(e){if(null!=e)return e[i]||e["@@iterator"]||o[r(e)]}},186:function(e,t,n){var r=n(99)("iterator"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,(function(){throw 2}))}catch(a){}e.exports=function(e,t){if(!t&&!i)return!1;var n=!1;try{var o=[7],u=o[r]();u.next=function(){return{done:n=!0}},o[r]=function(){return u},e(o)}catch(a){}return n}},221:function(e,t,n){"use strict";var r,i,o,a,u=n(128),s=n(98),c=n(119),l=n(151),f=n(111),p=n(106),m=n(123),d=n(222),v=n(223),h=n(173),y=n(174).set,b=n(225)(),g=n(175),x=n(226),_=n(227),w=n(228),j=s.TypeError,k=s.process,P=k&&k.versions,E=P&&P.v8||"",S=s.Promise,O="process"==l(k),M=function(){},T=i=g.f,q=!!function(){try{var e=S.resolve(1),t=(e.constructor={})[n(99)("species")]=function(e){e(M,M)};return(O||"function"==typeof PromiseRejectionEvent)&&e.then(M)instanceof t&&0!==E.indexOf("6.6")&&-1===_.indexOf("Chrome/66")}catch(r){}}(),C=function(e){var t;return!(!p(e)||"function"!=typeof(t=e.then))&&t},F=function(e,t){if(!e._n){e._n=!0;var n=e._c;b((function(){for(var r=e._v,i=1==e._s,o=0,a=function(t){var n,o,a,u=i?t.ok:t.fail,s=t.resolve,c=t.reject,l=t.domain;try{u?(i||(2==e._h&&I(e),e._h=1),!0===u?n=r:(l&&l.enter(),n=u(r),l&&(l.exit(),a=!0)),n===t.promise?c(j("Promise-chain cycle")):(o=C(n))?o.call(n,s,c):s(n)):c(r)}catch(f){l&&!a&&l.exit(),c(f)}};n.length>o;)a(n[o++]);e._c=[],e._n=!1,t&&!e._h&&D(e)}))}},D=function(e){y.call(s,(function(){var t,n,r,i=e._v,o=N(e);if(o&&(t=x((function(){O?k.emit("unhandledRejection",i,e):(n=s.onunhandledrejection)?n({promise:e,reason:i}):(r=s.console)&&r.error&&r.error("Unhandled promise rejection",i)})),e._h=O||N(e)?2:1),e._a=void 0,o&&t.e)throw t.v}))},N=function(e){return 1!==e._h&&0===(e._a||e._c).length},I=function(e){y.call(s,(function(){var t;O?k.emit("rejectionHandled",e):(t=s.onrejectionhandled)&&t({promise:e,reason:e._v})}))},A=function(e){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),F(t,!0))},L=function(e){var t,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===e)throw j("Promise can't be resolved itself");(t=C(e))?b((function(){var r={_w:n,_d:!1};try{t.call(e,c(L,r,1),c(A,r,1))}catch(i){A.call(r,i)}})):(n._v=e,n._s=1,F(n,!1))}catch(r){A.call({_w:n,_d:!1},r)}}};q||(S=function(e){d(this,S,"Promise","_h"),m(e),r.call(this);try{e(c(L,this,1),c(A,this,1))}catch(t){A.call(this,t)}},(r=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n(229)(S.prototype,{then:function(e,t){var n=T(h(this,S));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=O?k.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&F(this,!1),n.promise},catch:function(e){return this.then(void 0,e)}}),o=function(){var e=new r;this.promise=e,this.resolve=c(L,e,1),this.reject=c(A,e,1)},g.f=T=function(e){return e===S||e===a?new o(e):i(e)}),f(f.G+f.W+f.F*!q,{Promise:S}),n(132)(S,"Promise"),n(170)("Promise"),a=n(108).Promise,f(f.S+f.F*!q,"Promise",{reject:function(e){var t=T(this);return(0,t.reject)(e),t.promise}}),f(f.S+f.F*(u||!q),"Promise",{resolve:function(e){return w(u&&this===a?S:this,e)}}),f(f.S+f.F*!(q&&n(186)((function(e){S.all(e).catch(M)}))),"Promise",{all:function(e){var t=this,n=T(t),r=n.resolve,i=n.reject,o=x((function(){var n=[],o=0,a=1;v(e,!1,(function(e){var u=o++,s=!1;n.push(void 0),a++,t.resolve(e).then((function(e){s||(s=!0,n[u]=e,--a||r(n))}),i)})),--a||r(n)}));return o.e&&i(o.v),n.promise},race:function(e){var t=this,n=T(t),r=n.reject,i=x((function(){v(e,!1,(function(e){t.resolve(e).then(n.resolve,r)}))}));return i.e&&r(i.v),n.promise}})},222:function(e,t){e.exports=function(e,t,n,r){if(!(e instanceof t)||void 0!==r&&r in e)throw TypeError(n+": incorrect invocation!");return e}},223:function(e,t,n){var r=n(119),i=n(183),o=n(184),a=n(103),u=n(122),s=n(185),c={},l={};(t=e.exports=function(e,t,n,f,p){var m,d,v,h,y=p?function(){return e}:s(e),b=r(n,f,t?2:1),g=0;if("function"!=typeof y)throw TypeError(e+" is not iterable!");if(o(y)){for(m=u(e.length);m>g;g++)if((h=t?b(a(d=e[g])[0],d[1]):b(e[g]))===c||h===l)return h}else for(v=y.call(e);!(d=v.next()).done;)if((h=i(v,b,d.value,t))===c||h===l)return h}).BREAK=c,t.RETURN=l},224:function(e,t){e.exports=function(e,t,n){var r=void 0===n;switch(t.length){case 0:return r?e():e.call(n);case 1:return r?e(t[0]):e.call(n,t[0]);case 2:return r?e(t[0],t[1]):e.call(n,t[0],t[1]);case 3:return r?e(t[0],t[1],t[2]):e.call(n,t[0],t[1],t[2]);case 4:return r?e(t[0],t[1],t[2],t[3]):e.call(n,t[0],t[1],t[2],t[3])}return e.apply(n,t)}},225:function(e,t,n){var r=n(98),i=n(174).set,o=r.MutationObserver||r.WebKitMutationObserver,a=r.process,u=r.Promise,s="process"==n(124)(a);e.exports=function(){var e,t,n,c=function(){var r,i;for(s&&(r=a.domain)&&r.exit();e;){i=e.fn,e=e.next;try{i()}catch(o){throw e?n():t=void 0,o}}t=void 0,r&&r.enter()};if(s)n=function(){a.nextTick(c)};else if(!o||r.navigator&&r.navigator.standalone)if(u&&u.resolve){var l=u.resolve(void 0);n=function(){l.then(c)}}else n=function(){i.call(r,c)};else{var f=!0,p=document.createTextNode("");new o(c).observe(p,{characterData:!0}),n=function(){p.data=f=!f}}return function(r){var i={fn:r,next:void 0};t&&(t.next=i),e||(e=i,n()),t=i}}},226:function(e,t){e.exports=function(e){try{return{e:!1,v:e()}}catch(t){return{e:!0,v:t}}}},227:function(e,t,n){var r=n(98).navigator;e.exports=r&&r.userAgent||""},228:function(e,t,n){var r=n(103),i=n(106),o=n(175);e.exports=function(e,t){if(r(e),i(t)&&t.constructor===e)return t;var n=o.f(e);return(0,n.resolve)(t),n.promise}},229:function(e,t,n){var r=n(110);e.exports=function(e,t,n){for(var i in t)r(e,i,t[i],n);return e}},94:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return w})),n.d(t,"metadata",(function(){return j})),n.d(t,"rightToc",(function(){return k})),n.d(t,"default",(function(){return E}));var r=n(2),i=n(6),o=n(0),a=n.n(o),u=n(97),s=n(114),c=(n(221),n(144),{display:"flex"}),l={display:"flex",flexDirection:"column",padding:20,whiteSpace:"nowrap"},f={flex:1,padding:20},p=[{key:"Lorem"},{key:"Mauris"},{key:"Nam"},{key:"Curabitur"}],m={Lorem:[{key:"Lorem",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas iaculis nibh, vel vestibulum augue. Nunc imperdiet, tortor et accumsan egestas, nisl mi porta mi, bibendum congue libero orci sit amet orci. Ut pharetra at urna a accumsan. Nulla leo felis, tristique eget metus maximus, rhoncus ornare ante. Donec mi est, aliquet pretium placerat id, dignissim in erat. Suspendisse convallis a mauris id tincidunt. Curabitur et mattis arcu, ac sodales massa. Praesent porttitor mauris eu nunc tempor, sit amet imperdiet lacus vulputate. Aliquam scelerisque risus eu elementum molestie. Aenean blandit euismod molestie."}],Mauris:[{key:"Mauris",desc:"Mauris ac sollicitudin odio. Integer nec viverra purus. Quisque eget sodales velit, et pulvinar enim. Pellentesque pulvinar faucibus lorem, at sagittis lectus suscipit ut. Phasellus tristique enim eu feugiat rutrum. Quisque sollicitudin eros erat, eget rhoncus arcu euismod in. Sed non enim nulla. Duis non sagittis lorem. Fusce at vulputate dui, at faucibus turpis. In vel cursus dolor, quis hendrerit urna. Proin non ultricies augue, semper placerat sem. Sed at metus quis nisl sodales consectetur in in dolor."}],Nam:[{key:"Nam",desc:"Nam convallis efficitur faucibus. Suspendisse molestie mauris vitae turpis vestibulum, vel finibus dolor tempus. Nullam non urna sed neque dignissim pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque pretium diam vitae mollis elementum. In vitae pretium sem, ut euismod enim. Fusce varius justo in massa viverra, ac pellentesque libero dignissim. Sed ullamcorper eleifend diam. Ut leo turpis, pharetra nec ipsum vitae, elementum dignissim sem. Donec eu lectus eget tellus pharetra vulputate. Vivamus non mi ac turpis accumsan egestas at iaculis lectus."}],Curabitur:[{key:"Curabitur",desc:"Curabitur efficitur laoreet libero non vulputate. Fusce ultricies sapien in ligula rhoncus accumsan. Nunc ac est blandit tellus convallis maximus nec quis risus. Mauris tincidunt sapien id lacinia mollis. Curabitur suscipit egestas ante at porta. Nam dui justo, lobortis a auctor et, viverra non nunc. Quisque cursus aliquet tortor eget finibus. Suspendisse potenti. Vestibulum neque augue, suscipit vitae augue ut, tristique imperdiet leo. Suspendisse ante mi, pharetra quis pretium facilisis, dignissim in neque. Donec vehicula sem nec leo rutrum tincidunt. Nulla facilisi."}]},d=Object(s.atom)({path:["data","activeMaster"],defaultValue:null}),v=Object(s.selector)({path:["data","master"],defaultValue:[],get:function(){return new Promise((function(e){setTimeout((function(){return e(p)}),1e3)}))}}),h=Object(s.selector)({path:["data","details",":key"],defaultValue:[],get:function(e){var t=e.params;return(null==t?void 0:t.key)?new Promise((function(e){setTimeout((function(){return e(m[t.key])}),1e3)})):[]}});function y(){var e,t=Object(s.useStateXValue)(d),n=Object(s.useStateXValue)(h,{params:{key:null!==(e=null==t?void 0:t.key)&&void 0!==e?e:"DEFAULT"}});return t&&n?a.a.createElement(a.a.Fragment,null,t.key,n.map((function(e){return a.a.createElement("div",{key:e.key},e.desc)}))):a.a.createElement("div",null,"\u261c Click on a master link...")}function b(){var e=Object(s.useStateXValue)(v),t=Object(s.useStateX)(d),n=t[0],r=t[1];return a.a.createElement(a.a.Fragment,null,e.map((function(e){return a.a.createElement("div",{key:e.key},n===e?a.a.createElement(a.a.Fragment,null,"\u27a3 "):null,a.a.createElement("a",{href:"#/",onClick:function(){return r(e)}},e.key))})))}function g(){return a.a.createElement("div",{style:c},a.a.createElement("div",{style:l},a.a.createElement(o.Suspense,{fallback:"Loading Master..."},a.a.createElement(b,null))),a.a.createElement("div",{style:f},a.a.createElement(o.Suspense,{fallback:"Loading Details..."},a.a.createElement(y,null))))}var x=n(8);function _(){return x.a.canUseDOM?a.a.createElement(s.StateXProvider,null,a.a.createElement(g,null)):null}var w={id:"master-detail",title:"Master Detail"},j={id:"examples/master-detail",isDocsHomePage:!1,title:"Master Detail",description:"In this example, both master & details are load using async selectors.",source:"@site/docs/examples/master-detail.md",permalink:"/statex/docs/examples/master-detail",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/examples/master-detail.md",sidebar:"someSidebar",previous:{title:"Canvas",permalink:"/statex/docs/examples/canvas"},next:{title:"TodoMVC",permalink:"/statex/docs/examples/todomvc"}},k=[],P={rightToc:k};function E(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(u.b)("wrapper",Object(r.a)({},P,n,{components:t,mdxType:"MDXLayout"}),Object(u.b)("p",null,"In this example, both master & details are load using async ",Object(u.b)("a",Object(r.a)({parentName:"p"},{href:"../api-reference/core/selector"}),"selectors"),"."),Object(u.b)(_,{mdxType:"App"}),Object(u.b)("p",null,Object(u.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/CloudIOInc/statex/blob/master/website/src/components/master-details/App.tsx"}),"View this code on github")))}E.isMDXComponent=!0},98:function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)}}]);