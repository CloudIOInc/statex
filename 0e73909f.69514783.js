(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{165:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return I})),n.d(t,"metadata",(function(){return N})),n.d(t,"rightToc",(function(){return V})),n.d(t,"default",(function(){return A}));var a=n(2),r=n(9),o=n(0),i=n.n(o),c=n(168),s=(n(178),n(91),n(264),n(24),n(20),n(18),n(55),n(366)),u=n(173),l=n(373),d=(n(266),n(243));function f(e){var t=e.children,n=e.moveItem,a=e.i,r=e.className,c=e.left,s=e.top,l=e.onDragEnd,f=e.onDragStart,b=(e.dragging,Object(u.useStateXRefValue)(["ui","canvas"])),m=Object(d.c)(0),g=Object(d.c)(0),p=Object(d.c)(0),v=Object(d.c)(0),h=Object(o.useState)(!1),O=h[0],j=h[1],x=Object(o.useState)(!1),y=x[0],S=x[1],E=Object(o.useState)(!0),k=E[0],w=E[1];return Object(o.useEffect)((function(){if(!O&&!y){var e=setTimeout((function(){w(!0)}),20);return function(){return clearTimeout(e)}}w(!1)}),[y,O]),Object(o.useEffect)((function(){k&&(m.set(c,!0),g.set(s,!0))}),[k,c,s,m,g]),i.a.createElement(d.b.div,{key:a,className:r,animate:k?{x:c,y:s}:void 0,style:{x:m,y:g,zIndex:k?void 0:10},drag:!0,dragOriginY:v,dragOriginX:p,dragConstraints:b&&null!==b.current?b:void 0,onAnimationStart:function(){S(!0)},onAnimationComplete:function(){S(!1),l(a,{x:m.get(),y:g.get()})},dragMomentum:!0,onDragStart:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){j(!0),f(a,{x:m.get(),y:g.get()})})),onDragEnd:function(e,t){j(!1)},dragElastic:!1,onDrag:function(e,t){var r=t.point;return n(a,r)}},t)}var b=n(170),m=n(378),g=Object(u.atom)({path:["settings","boxSize"],defaultValue:60,updater:function(e){var t=e.value;return Math.min(Math.max(30,t),100)}});function p(){var e=Object(u.useStateX)(g),t=e[0],n=e[1];return i.a.createElement(m.a,{value:t,onChange:function(e,t){return n(t)},"aria-labelledby":"discrete-slider-restrict",valueLabelDisplay:"auto",step:10,marks:!0,min:30,max:100})}var v=Object(l.a)({root:function(e){var t=e.boxSize;return{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:t-10,width:t-10,padding:0,margin:5,position:"absolute",display:"inline-block",userSelect:"none"}},dragging:{background:"linear-gradient(45deg, #FE1B8B 10%, #FF1E53 90%)",zIndex:9999}});function h(e,t){if(t<4)return e;var n=e%t;return n>=t/2?e+n+(t-n):e-n}function O(e,t,n,a){var r=null==e?void 0:e.current;if(!r)return t;var o=r.scrollTop,i=r.scrollLeft,c=r.offsetHeight,s=r.offsetWidth;return Object.assign({},t,{left:h(Math.max(0,Math.min(s+i-a-20,n.x)),0),top:h(Math.max(0,Math.min(c+o-a-20,n.y)),0)})}var j=Object(o.memo)((function(e){var t=e.item,n=Object(u.useStateXValue)(g),r=v({boxSize:n}),c=Object(u.useStateXRefValue)(["ui","canvas"]),s=Object(u.useStateX)(["root","items",t.id],t),l=s[0],d=s[1];if(!l)throw Error("Missing item!");var m=Object(u.useStateXValueSetter)(["root","dragItem"]),p=Object(o.useCallback)((function(e,t){if(c){var a=d((function(e){return O(c,e,t,n)}));a&&m(a)}}),[n,c,m,d]),h=Object(o.useCallback)((function(e,t){if(c){var a=d((function(e){return Object.assign({},O(c,e,t,n),{dragging:!0})}));a&&m(a)}}),[n,c,m,d]),j=Object(o.useCallback)((function(e,t){if(c){var a=d((function(e){return Object.assign({},O(c,e,t,n),{dragging:!1})}));a&&m(a)}}),[n,c,m,d]);return i.a.createElement(f,Object(a.a)({onDragStart:h,onDragEnd:j,setPosition:function(e,t){},moveItem:p,className:Object(b.a)(r.root,l.dragging?r.dragging:null),i:l.id},l))}));j.displayName="Box";var x=j,y=(n(80),Object(l.a)({root:{background:"#000",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:"auto",width:160,padding:12,margin:0,position:"absolute",display:"inline-block",userSelect:"none",zIndex:9999,top:8,right:8},pre:{background:"#000",color:"#fff"}}));function S(){var e=Object(u.useStateXValue)(["root","items"],{}),t=y(),n=Object.values(e).filter((function(e){return e.dragging}));return n.length?i.a.createElement("div",{className:t.root,style:{top:window.document.documentElement.scrollTop}},n.length," moving",i.a.createElement("pre",{className:t.pre},n.map((function(e){return Math.round(e.left)+" X "+Math.round(e.top)})).join("\n"))):null}var E=n(376),k=Object(s.a)({root:{display:"flex",flex:1,overflow:"hidden",position:"absolute",top:0,bottom:0,left:0,right:0},canvas:{display:"flex",flex:1,overflow:"hidden",position:"absolute",top:0,bottom:0,left:0,right:0}});function w(){var e=Object(u.useStateXValue)(g),t=k(),n=Object(u.useStateXRef)(["ui","canvas"]),a=Object(u.useStateXValueGetter)(),r=Object(u.useStateX)(["root","items"],{},{shouldComponentUpdate:function(e,t){return void 0===t&&(t={}),Object.keys(e).length!==Object.keys(t).length}}),c=r[0],s=r[1],l=Object.keys(c).length;if(Object(o.useEffect)((function(){if(n.current){var t=function(e,t){return Math.floor(Math.floor((e.offsetHeight-20)/t)*Math.floor((e.offsetWidth-20)/t))}(n.current,e);if(l!==t){var a=n.current.offsetWidth,r={},o=Math.floor(a/e);Array.from(Array(t).keys()).forEach((function(t){var n=t%o,a=Math.floor(t/o),i={id:t+"-"+Object(E.a)(),left:n*e,top:a*e};r[i.id]=i})),s(r)}}}),[e,n,l,s]),!c)throw Error("Missing items!!!");return n?i.a.createElement("div",{onDoubleClick:function(){var e,t=["root","items",c[Object.keys(c)[10]].id],n=a(t),r=a(["root","items"]);n&&s(Object.assign({},r,((e={})[n.id]=Object.assign({},n,{left:0}),e)))},className:t.root},i.a.createElement(S,null),i.a.createElement("div",{className:t.canvas,ref:n},Object.keys(c).map((function(e){var t=c[e];return i.a.createElement(x,{key:t.id,item:t})})))):null}var M=n(52),X=n(208),D=n(367),T={width:"100%",height:"600px",position:"relative",overflow:"hidden"};function C(){var e=Object(X.a)();return M.a.canUseDOM?i.a.createElement(u.StateXProvider,null,i.a.createElement(D.a,{theme:e},i.a.createElement(p,null),i.a.createElement("div",{style:T},i.a.createElement(w,null)))):null}var I={id:"canvas",title:"Canvas"},N={id:"examples/canvas",title:"Canvas",description:"Some random boxes are rendered below. While dragging, only the dragged boxes get's re-rendered.",source:"@site/docs/examples/canvas.md",permalink:"/statex/docs/examples/canvas",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/examples/canvas.md",sidebar:"someSidebar",previous:{title:"Performance",permalink:"/statex/docs/examples/performance"},next:{title:"Master Detail",permalink:"/statex/docs/examples/master-detail"}},V=[],z={rightToc:V};function A(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},z,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Some random boxes are rendered below. While dragging, only the dragged boxes get's re-rendered."),Object(c.b)(C,{mdxType:"App"}),Object(c.b)("p",null,Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/CloudIOInc/statex/blob/master/website/src/components/canvas/App.tsx"}),"View this code on github")))}A.isMDXComponent=!0},208:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(324),r=n(0),o=n(185);function i(){var e=Object(o.a)().isDarkTheme;return Object(r.useMemo)((function(){return Object(a.a)({palette:{type:e?"dark":"light",primary:{light:"rgba(239, 103, 13, 0.65)",main:"#ef670d",dark:"#ef670d",contrastText:"#fff"},secondary:{light:"rgba(239, 103, 13, 0.65)",main:"#ef670d",dark:"#ef670d",contrastText:"#fff"}},overrides:{MuiButton:{root:{textTransform:"none"}},MuiTab:{root:{textTransform:"none"}}}})}),[e])}}}]);