/*! For license information please see 2.fe94880a.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{116:function(e,t){e.exports={}},126:function(e,t,a){var n=a(107).f,r=a(109),c=a(97)("toStringTag");e.exports=function(e,t,a){e&&!r(e=a?e:e.prototype,c)&&n(e,c,{configurable:!0,value:t})}},137:function(e,t,a){for(var n=a(141),r=a(128),c=a(108),o=a(95),i=a(103),s=a(116),l=a(97),u=l("iterator"),f=l("toStringTag"),d=s.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=r(h),v=0;v<m.length;v++){var p,b=m[v],g=h[b],k=o[b],y=k&&k.prototype;if(y&&(y[u]||i(y,u,d),y[f]||i(y,f,b),s[b]=d,g))for(p in n)y[p]||c(y,p,n[p],!0)}},138:function(e,t,a){var n=a(95).document;e.exports=n&&n.documentElement},141:function(e,t,a){"use strict";var n=a(144),r=a(157),c=a(116),o=a(125);e.exports=a(158)(Array,"Array",(function(e,t){this._t=o(e),this._i=0,this._k=t}),(function(){var e=this._t,t=this._k,a=this._i++;return!e||a>=e.length?(this._t=void 0,r(1)):r(0,"keys"==t?a:"values"==t?e[a]:[a,e[a]])}),"values"),c.Arguments=c.Array,n("keys"),n("values"),n("entries")},144:function(e,t,a){var n=a(97)("unscopables"),r=Array.prototype;null==r[n]&&a(103)(r,n,{}),e.exports=function(e){r[n][e]=!0}},156:function(e,t,a){"use strict";var n=a(95),r=a(107),c=a(101),o=a(97)("species");e.exports=function(e){var t=n[e];c&&t&&!t[o]&&r.f(t,o,{configurable:!0,get:function(){return this}})}},157:function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},158:function(e,t,a){"use strict";var n=a(121),r=a(112),c=a(108),o=a(103),i=a(116),s=a(159),l=a(126),u=a(162),f=a(97)("iterator"),d=!([].keys&&"next"in[].keys()),h=function(){return this};e.exports=function(e,t,a,m,v,p,b){s(a,t,m);var g,k,y,O=function(e){if(!d&&e in C)return C[e];switch(e){case"keys":case"values":return function(){return new a(this,e)}}return function(){return new a(this,e)}},E=t+" Iterator",_="values"==v,j=!1,C=e.prototype,w=C[f]||C["@@iterator"]||v&&C[v],N=w||O(v),S=v?_?O("entries"):N:void 0,T="Array"==t&&C.entries||w;if(T&&(y=u(T.call(new e)))!==Object.prototype&&y.next&&(l(y,E,!0),n||"function"==typeof y[f]||o(y,f,h)),_&&w&&"values"!==w.name&&(j=!0,N=function(){return w.call(this)}),n&&!b||!d&&!j&&C[f]||o(C,f,N),i[t]=N,i[E]=h,v)if(g={values:_?N:O("values"),keys:p?N:O("keys"),entries:S},b)for(k in g)k in C||c(C,k,g[k]);else r(r.P+r.F*(d||j),t,g);return g}},159:function(e,t,a){"use strict";var n=a(160),r=a(124),c=a(126),o={};a(103)(o,a(97)("iterator"),(function(){return this})),e.exports=function(e,t,a){e.prototype=n(o,{next:r(1,a)}),c(e,t+" Iterator")}},160:function(e,t,a){var n=a(100),r=a(161),c=a(135),o=a(130)("IE_PROTO"),i=function(){},s=function(){var e,t=a(120)("iframe"),n=c.length;for(t.style.display="none",a(138).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),s=e.F;n--;)delete s.prototype[c[n]];return s()};e.exports=Object.create||function(e,t){var a;return null!==e?(i.prototype=n(e),a=new i,i.prototype=null,a[o]=e):a=s(),void 0===t?a:r(a,t)}},161:function(e,t,a){var n=a(107),r=a(100),c=a(128);e.exports=a(101)?Object.defineProperties:function(e,t){r(e);for(var a,o=c(t),i=o.length,s=0;i>s;)n.f(e,a=o[s++],t[a]);return e}},162:function(e,t,a){var n=a(109),r=a(136),c=a(130)("IE_PROTO"),o=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=r(e),n(e,c)?e[c]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?o:null}},163:function(e,t,a){"use strict";var n=a(0),r=a(172);t.a=function(){return Object(n.useContext)(r.a)}},168:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(225),o=a(110),i=a(148),s="",l="dark",u=function(){var e=Object(o.a)().siteConfig,t=(e=void 0===e?{}:e).themeConfig.disableDarkMode,a=Object(n.useState)("undefined"!=typeof document?document.documentElement.getAttribute("data-theme"):s),r=a[0],c=a[1],i=Object(n.useCallback)((function(e){try{localStorage.setItem("theme",e)}catch(t){console.error(t)}}),[c]),u=Object(n.useCallback)((function(){c(s),i(s)}),[]),f=Object(n.useCallback)((function(){c(l),i(l)}),[]);return Object(n.useEffect)((function(){document.documentElement.setAttribute("data-theme",r)}),[r]),Object(n.useEffect)((function(){if(!t)try{var e=localStorage.getItem("theme");null!==e&&c(e)}catch(a){console.error(a)}}),[c]),Object(n.useEffect)((function(){t||window.matchMedia("(prefers-color-scheme: dark)").addListener((function(e){var t=e.matches;c(t?l:s)}))}),[]),{isDarkTheme:r===l,setLightTheme:u,setDarkTheme:f}},f=a(172);var d=function(e){var t=u(),a=t.isDarkTheme,n=t.setLightTheme,c=t.setDarkTheme;return r.a.createElement(f.a.Provider,{value:{isDarkTheme:a,setLightTheme:n,setDarkTheme:c}},e.children)},h=(a(154),a(226),function(){var e=Object(n.useState)({}),t=e[0],a=e[1],r=Object(n.useCallback)((function(e,t){try{localStorage.setItem("docusaurus.tab."+e,t)}catch(a){console.error(a)}}),[]);return Object(n.useEffect)((function(){try{for(var e={},t=0;t<localStorage.length;t+=1){var n=localStorage.key(t);if(n.startsWith("docusaurus.tab."))e[n.substring("docusaurus.tab.".length)]=localStorage.getItem(n)}a(e)}catch(r){console.error(r)}}),[]),{tabGroupChoices:t,setTabGroupChoices:function(e,t){a((function(a){var n;return Object.assign({},a,((n={})[e]=t,n))})),r(e,t)}}}),m=function(){var e=Object(o.a)().siteConfig,t=(e=void 0===e?{}:e).themeConfig.announcementBar,a=(t=void 0===t?{}:t).id,r=Object(n.useState)(!0),c=r[0],i=r[1];return Object(n.useEffect)((function(){if(a){var e=localStorage.getItem("docusaurus.announcement.id"),t=a!==e;localStorage.setItem("docusaurus.announcement.id",a),t&&localStorage.setItem("docusaurus.announcement.dismiss",!1),(t||"false"===localStorage.getItem("docusaurus.announcement.dismiss"))&&i(!1)}}),[]),{isAnnouncementBarClosed:c,closeAnnouncementBar:function(){localStorage.setItem("docusaurus.announcement.dismiss",!0),i(!0)}}},v=a(173);var p=function(e){var t=h(),a=t.tabGroupChoices,n=t.setTabGroupChoices,c=m(),o=c.isAnnouncementBarClosed,i=c.closeAnnouncementBar;return r.a.createElement(v.a.Provider,{value:{tabGroupChoices:a,setTabGroupChoices:n,isAnnouncementBarClosed:o,closeAnnouncementBar:i}},e.children)},b=a(174),g=a(47),k=a.n(g);var y=function(){var e=Object(o.a)().siteConfig,t=(e=void 0===e?{}:e).themeConfig.announcementBar,a=void 0===t?{}:t,n=a.content,c=a.backgroundColor,i=a.textColor,s=Object(b.a)(),l=s.isAnnouncementBarClosed,u=s.closeAnnouncementBar;return!n||l?null:r.a.createElement("div",{className:k.a.announcementBar,style:{backgroundColor:c,color:i},role:"banner"},r.a.createElement("div",{className:k.a.announcementBarContent,dangerouslySetInnerHTML:{__html:n}}),r.a.createElement("button",{type:"button",className:k.a.announcementBarClose,onClick:u,"aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")))},O=a(2),E=(a(227),a(6)),_=a(98),j=a(140),C=(a(137),a(175)),w=a(229),N=a(48),S=a.n(N);var T=({handleSearchBarToggle:e,isSearchBarExpanded:t})=>{const[c,i]=Object(n.useState)(!1),s=Object(n.useRef)(null),{siteConfig:l={}}=Object(o.a)(),{themeConfig:{algolia:u}}=l,f=Object(C.b)(),{navigateToSearchPage:d}=Object(w.a)();const h=(e=!0)=>{c||Promise.all([Promise.all([a.e(5),a.e(42)]).then(a.t.bind(null,454,7)),a.e(32).then(a.t.bind(null,455,7))]).then(([{default:t}])=>{i(!0),window.docsearch=t,function(e){window.docsearch({appId:u.appId,apiKey:u.apiKey,indexName:u.indexName,inputSelector:"#search_input_react",algoliaOptions:u.algoliaOptions,autocompleteOptions:{openOnFocus:!0,autoselect:!1,hint:!1,tabAutocomplete:!1},handleSelected:(e,t,a)=>{t.stopPropagation();const n=document.createElement("a");n.href=a.url;const r="#__docusaurus"===n.hash?""+n.pathname:`${n.pathname}${n.hash}`;f.push(r)}}),e&&s.current.focus()}(e)})},m=Object(n.useCallback)(()=>{h(),c&&s.current.focus(),e(!t)},[t]),v=Object(n.useCallback)(()=>{e(!t)},[t]),p=Object(n.useCallback)(e=>{const t="mouseover"!==e.type;h(t)}),b=Object(n.useCallback)(e=>{e.defaultPrevented||"Enter"!==e.key||d(e.target.value)});return r.a.createElement("div",{className:"navbar__search",key:"search-box"},r.a.createElement("div",{className:S.a.searchWrapper},r.a.createElement("span",{"aria-label":"expand searchbar",role:"button",className:Object(_.a)(S.a.searchIconButton,{[S.a.searchIconButtonHidden]:t}),onClick:m,onKeyDown:m,tabIndex:0}),r.a.createElement("input",{id:"search_input_react",type:"search",placeholder:"Search","aria-label":"Search",className:Object(_.a)("navbar__search-input",S.a.searchInput,{[S.a.searchInputExpanded]:t}),onMouseOver:p,onFocus:p,onBlur:v,onKeyDown:b,ref:s})))},x=a(289),L=a.n(x),P=a(49),B=a.n(P),M=function(){return r.a.createElement("span",{className:Object(_.a)(B.a.toggle,B.a.moon)})},D=function(){return r.a.createElement("span",{className:Object(_.a)(B.a.toggle,B.a.sun)})},I=function(e){var t=Object(o.a)().isClient;return r.a.createElement(L.a,Object(O.a)({disabled:!t,icons:{checked:r.a.createElement(M,null),unchecked:r.a.createElement(D,null)}},e))},A=a(163);var R=function(e){var t=Object(n.useState)(e),a=t[0],r=t[1];return Object(n.useEffect)((function(){var e=function(){return r(window.location.hash)};return window.addEventListener("hashchange",e),function(){return window.removeEventListener("hashchange",e)}}),[]),[a,r]},F=a(230),H=function(e){var t=Object(n.useState)(!0),a=t[0],r=t[1],c=Object(n.useState)(!1),o=c[0],i=c[1],s=Object(n.useState)(0),l=s[0],u=s[1],f=Object(n.useState)(0),d=f[0],h=f[1],m=Object(n.useCallback)((function(e){null!==e&&h(e.getBoundingClientRect().height)}),[]),v=Object(C.c)(),p=R(v.hash),b=p[0],g=p[1];return Object(F.a)((function(t){var a=t.scrollY;if(e&&(0===a&&r(!0),!(a<d))){if(o)return i(!1),r(!1),void u(a);var n=document.documentElement.scrollHeight-d,c=window.innerHeight;l&&a>=l?r(!1):a+c<n&&r(!0),u(a)}}),[l,d]),Object(n.useEffect)((function(){e&&(r(!0),g(v.hash))}),[v]),Object(n.useEffect)((function(){e&&b&&i(!0)}),[b]),{navbarRef:m,isNavbarVisible:a}},U=a(231),X=a(232),G=a(233),V=a(50),W=a.n(V);function K(e){var t=e.activeBasePath,a=e.activeBaseRegex,n=e.to,c=e.href,o=e.label,s=e.activeClassName,l=void 0===s?"navbar__link--active":s,u=e.prependBaseUrlToHref,f=Object(E.a)(e,["activeBasePath","activeBaseRegex","to","href","label","activeClassName","prependBaseUrlToHref"]),d=Object(i.a)(n),h=Object(i.a)(t),m=Object(i.a)(c,{forcePrependBaseUrl:!0});return r.a.createElement(j.a,Object(O.a)({},c?{target:"_blank",rel:"noopener noreferrer",href:u?m:c}:Object.assign({isNavLink:!0,activeClassName:l,to:d},t||a?{isActive:function(e,t){return a?new RegExp(a).test(t.pathname):t.pathname.startsWith(h)}}:null),f),o)}function q(e){var t=e.items,a=e.position,n=void 0===a?"right":a,c=e.className,o=Object(E.a)(e,["items","position","className"]),i=function(e,t){return void 0===t&&(t=!1),Object(_.a)({"navbar__item navbar__link":!t,dropdown__link:t},e)};return t?r.a.createElement("div",{className:Object(_.a)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===n,"dropdown--right":"right"===n})},r.a.createElement(K,Object(O.a)({className:i(c)},o,{onClick:function(e){return e.preventDefault()},onKeyDown:function(e){"Enter"===e.key&&e.target.parentNode.classList.toggle("dropdown--show")}}),o.label),r.a.createElement("ul",{className:"dropdown__menu"},t.map((function(e,t){var a=e.className,n=Object(E.a)(e,["className"]);return r.a.createElement("li",{key:t},r.a.createElement(K,Object(O.a)({activeClassName:"dropdown__link--active",className:i(a,!0)},n)))})))):r.a.createElement(K,Object(O.a)({className:i(c)},o))}function Y(e){var t=e.items,a=(e.position,e.className),n=Object(E.a)(e,["items","position","className"]),c=function(e,t){return void 0===t&&(t=!1),Object(_.a)("menu__link",{"menu__link--sublist":t},e)};return t?r.a.createElement("li",{className:"menu__list-item"},r.a.createElement(K,Object(O.a)({className:c(a,!0)},n),n.label),r.a.createElement("ul",{className:"menu__list"},t.map((function(e,t){var a=e.className,o=Object(E.a)(e,["className"]);return r.a.createElement("li",{className:"menu__list-item",key:t},r.a.createElement(K,Object(O.a)({activeClassName:"menu__link--active",className:c(a)},o,{onClick:n.onClick})))})))):r.a.createElement("li",{className:"menu__list-item"},r.a.createElement(K,Object(O.a)({className:c(a)},n)))}var $=function(){var e,t,a=Object(o.a)(),c=a.siteConfig.themeConfig,i=c.navbar,s=(i=void 0===i?{}:i).title,l=i.links,u=void 0===l?[]:l,f=i.hideOnScroll,d=void 0!==f&&f,h=c.disableDarkMode,m=void 0!==h&&h,v=a.isClient,p=Object(n.useState)(!1),b=p[0],g=p[1],k=Object(n.useState)(!1),y=k[0],E=k[1],C=Object(A.a)(),w=C.isDarkTheme,N=C.setLightTheme,S=C.setDarkTheme,x=H(d),L=x.navbarRef,P=x.isNavbarVisible,B=Object(G.a)(),M=B.logoLink,D=B.logoLinkProps,R=B.logoImageUrl,F=B.logoAlt;Object(U.a)(b);var V=Object(n.useCallback)((function(){g(!0)}),[g]),K=Object(n.useCallback)((function(){g(!1)}),[g]),$=Object(n.useCallback)((function(e){return e.target.checked?S():N()}),[N,S]),z=Object(X.a)();Object(n.useEffect)((function(){z===X.b.desktop&&g(!1)}),[z]);var J=function(e){return{leftLinks:e.filter((function(e){var t;return"left"===(null!==(t=e.position)&&void 0!==t?t:"right")})),rightLinks:e.filter((function(e){var t;return"right"===(null!==(t=e.position)&&void 0!==t?t:"right")}))}}(u),Q=J.leftLinks,Z=J.rightLinks;return r.a.createElement("nav",{ref:L,className:Object(_.a)("navbar","navbar--light","navbar--fixed-top",(e={"navbar-sidebar--show":b},e[W.a.navbarHideable]=d,e[W.a.navbarHidden]=!P,e))},r.a.createElement("div",{className:"navbar__inner"},r.a.createElement("div",{className:"navbar__items"},null!=u&&0!==u.length&&r.a.createElement("div",{"aria-label":"Navigation bar toggle",className:"navbar__toggle",role:"button",tabIndex:0,onClick:V,onKeyDown:V},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 30 30",role:"img",focusable:"false"},r.a.createElement("title",null,"Menu"),r.a.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))),r.a.createElement(j.a,Object(O.a)({className:"navbar__brand",to:M},D),null!=R&&r.a.createElement("img",{key:v,className:"navbar__logo",src:R,alt:F}),null!=s&&r.a.createElement("strong",{className:Object(_.a)("navbar__title",(t={},t[W.a.hideLogoText]=y,t))},s)),Q.map((function(e,t){return r.a.createElement(q,Object(O.a)({},e,{key:t}))}))),r.a.createElement("div",{className:"navbar__items navbar__items--right"},Z.map((function(e,t){return r.a.createElement(q,Object(O.a)({},e,{key:t}))})),!m&&r.a.createElement(I,{className:W.a.displayOnlyInLargeViewport,"aria-label":"Dark mode toggle",checked:w,onChange:$}),r.a.createElement(T,{handleSearchBarToggle:E,isSearchBarExpanded:y}))),r.a.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:K}),r.a.createElement("div",{className:"navbar-sidebar"},r.a.createElement("div",{className:"navbar-sidebar__brand"},r.a.createElement(j.a,Object(O.a)({className:"navbar__brand",onClick:K,to:M},D),null!=R&&r.a.createElement("img",{key:v,className:"navbar__logo",src:R,alt:F}),null!=s&&r.a.createElement("strong",{className:"navbar__title"},s)),!m&&b&&r.a.createElement(I,{"aria-label":"Dark mode toggle in sidebar",checked:w,onChange:$})),r.a.createElement("div",{className:"navbar-sidebar__items"},r.a.createElement("div",{className:"menu"},r.a.createElement("ul",{className:"menu__list"},u.map((function(e,t){return r.a.createElement(Y,Object(O.a)({},e,{onClick:K,key:t}))})))))))},z=a(51),J=a.n(z);function Q(e){var t=e.to,a=e.href,n=e.label,c=e.prependBaseUrlToHref,o=Object(E.a)(e,["to","href","label","prependBaseUrlToHref"]),s=Object(i.a)(t),l=Object(i.a)(a,{forcePrependBaseUrl:!0});return r.a.createElement(j.a,Object(O.a)({className:"footer__link-item"},a?{target:"_blank",rel:"noopener noreferrer",href:c?l:a}:{to:s},o),n)}var Z=function(e){var t=e.url,a=e.alt;return r.a.createElement("img",{className:"footer__logo",alt:a,src:t})};var ee=function(){var e=Object(o.a)().siteConfig,t=(void 0===e?{}:e).themeConfig,a=(void 0===t?{}:t).footer,n=a||{},c=n.copyright,s=n.links,l=void 0===s?[]:s,u=n.logo,f=void 0===u?{}:u,d=Object(i.a)(f.src);return a?r.a.createElement("footer",{className:Object(_.a)("footer",{"footer--dark":"dark"===a.style})},r.a.createElement("div",{className:"container"},l&&l.length>0&&r.a.createElement("div",{className:"row footer__links"},l.map((function(e,t){return r.a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?r.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?r.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,t){return e.html?r.a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):r.a.createElement("li",{key:e.href||e.to,className:"footer__item"},r.a.createElement(Q,e))}))):null)}))),(f||c)&&r.a.createElement("div",{className:"text--center"},f&&f.src&&r.a.createElement("div",{className:"margin-bottom--sm"},f.href?r.a.createElement("a",{href:f.href,target:"_blank",rel:"noopener noreferrer",className:J.a.footerLogoLink},r.a.createElement(Z,{alt:f.alt,url:d})):r.a.createElement(Z,{alt:f.alt,url:d})),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:c}})))):null};a(52);t.a=function(e){var t=Object(o.a)().siteConfig,a=void 0===t?{}:t,n=a.favicon,s=a.title,l=a.themeConfig.image,u=a.url,f=e.children,h=e.title,m=e.noFooter,v=e.description,b=e.image,g=e.keywords,k=e.permalink,O=e.version,E=h?h+" | "+s:s,_=b||l,j=Object(i.a)(_,{absolute:!0}),C=Object(i.a)(n);return r.a.createElement(d,null,r.a.createElement(p,null,r.a.createElement(c.a,null,r.a.createElement("html",{lang:"en"}),E&&r.a.createElement("title",null,E),E&&r.a.createElement("meta",{property:"og:title",content:E}),n&&r.a.createElement("link",{rel:"shortcut icon",href:C}),v&&r.a.createElement("meta",{name:"description",content:v}),v&&r.a.createElement("meta",{property:"og:description",content:v}),O&&r.a.createElement("meta",{name:"docsearch:version",content:O}),g&&g.length&&r.a.createElement("meta",{name:"keywords",content:g.join(",")}),_&&r.a.createElement("meta",{property:"og:image",content:j}),_&&r.a.createElement("meta",{property:"twitter:image",content:j}),_&&r.a.createElement("meta",{name:"twitter:image:alt",content:"Image for "+E}),k&&r.a.createElement("meta",{property:"og:url",content:u+k}),k&&r.a.createElement("link",{rel:"canonical",href:u+k}),r.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),r.a.createElement(y,null),r.a.createElement($,null),r.a.createElement("div",{className:"main-wrapper"},f),!m&&r.a.createElement(ee,null)))}},172:function(e,t,a){"use strict";var n=a(0),r=a.n(n).a.createContext({isDarkTheme:!1,setLightTheme:function(){},setDarkTheme:function(){}});t.a=r},173:function(e,t,a){"use strict";var n=a(0),r=Object(n.createContext)({tabGroupChoices:{},setTabGroupChoices:function(){},isAnnouncementBarClosed:!1,closeAnnouncementBar:function(){}});t.a=r},174:function(e,t,a){"use strict";var n=a(0),r=a(173);t.a=function(){return Object(n.useContext)(r.a)}},175:function(e,t,a){"use strict";var n=a(14);a.d(t,"a",(function(){return n.d})),a.d(t,"b",(function(){return n.e})),a.d(t,"c",(function(){return n.f}))},188:function(e,t,a){var n=a(189),r=a(129);e.exports=function(e,t,a){if(n(t))throw TypeError("String#"+a+" doesn't accept regex!");return String(r(e))}},189:function(e,t,a){var n=a(104),r=a(118),c=a(97)("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[c])?!!t:"RegExp"==r(e))}},190:function(e,t,a){var n=a(97)("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(a){try{return t[n]=!1,!"/./"[e](t)}catch(r){}}return!0}},226:function(e,t,a){"use strict";var n=a(112),r=a(119),c=a(188),o="".startsWith;n(n.P+n.F*a(190)("startsWith"),"String",{startsWith:function(e){var t=c(this,e,"startsWith"),a=r(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),n=String(e);return o?o.call(t,n,a):t.slice(a,a+n.length)===n}})},227:function(e,t,a){var n=a(95),r=a(285),c=a(107).f,o=a(288).f,i=a(189),s=a(228),l=n.RegExp,u=l,f=l.prototype,d=/a/g,h=/a/g,m=new l(d)!==d;if(a(101)&&(!m||a(111)((function(){return h[a(97)("match")]=!1,l(d)!=d||l(h)==h||"/a/i"!=l(d,"i")})))){l=function(e,t){var a=this instanceof l,n=i(e),c=void 0===t;return!a&&n&&e.constructor===l&&c?e:r(m?new u(n&&!c?e.source:e,t):u((n=e instanceof l)?e.source:e,n&&c?s.call(e):t),a?this:f,l)};for(var v=function(e){e in l||c(l,e,{configurable:!0,get:function(){return u[e]},set:function(t){u[e]=t}})},p=o(u),b=0;p.length>b;)v(p[b++]);f.constructor=l,l.prototype=f,a(108)(n,"RegExp",l)}a(156)("RegExp")},228:function(e,t,a){"use strict";var n=a(100);e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},229:function(e,t,a){"use strict";var n=a(175),r=a(8),c=a(110);t.a=function(){const e=Object(n.b)(),t=Object(n.c)(),{siteConfig:{baseUrl:a}={}}=Object(c.a)();return{searchValue:r.a.canUseDOM&&new URLSearchParams(t.search).get("q")||"",updateSearchPath:a=>{const n=new URLSearchParams(t.search);a?n.set("q",a):n.delete("q"),e.replace({search:n.toString()})},navigateToSearchPage:t=>{e.push(`${a}search?q=${t}`)}}}},230:function(e,t,a){"use strict";var n=a(0),r=a(8),c=function(){return{scrollX:r.a.canUseDOM?window.pageXOffset:0,scrollY:r.a.canUseDOM?window.pageYOffset:0}};t.a=function(e,t){void 0===t&&(t=[]);var a=Object(n.useState)(c()),r=a[0],o=a[1],i=function(){var t=c();o(t),e&&e(t)};return Object(n.useEffect)((function(){return window.addEventListener("scroll",i),function(){return window.removeEventListener("scroll",i,{passive:!0})}}),t),r}},231:function(e,t,a){"use strict";var n=a(0);t.a=function(e){void 0===e&&(e=!0),Object(n.useEffect)((function(){return document.body.style.overflow=e?"hidden":"visible",function(){document.body.style.overflow="visible"}}),[e])}},232:function(e,t,a){"use strict";a.d(t,"b",(function(){return r}));var n=a(0),r={desktop:"desktop",mobile:"mobile"};t.a=function(){var e="undefined"!=typeof window;function t(){if(e)return window.innerWidth>996?r.desktop:r.mobile}var a=Object(n.useState)(t),c=a[0],o=a[1];return Object(n.useEffect)((function(){if(!e)return!1;function a(){o(t())}return window.addEventListener("resize",a),function(){return window.removeEventListener("resize",a)}}),[]),c}},233:function(e,t,a){"use strict";var n=a(110),r=a(163),c=a(148),o=a(171);t.a=function(){var e=Object(n.a)().siteConfig,t=(e=void 0===e?{}:e).themeConfig.navbar,a=(t=void 0===t?{}:t).logo,i=void 0===a?{}:a,s=Object(r.a)().isDarkTheme,l=Object(c.a)(i.href||"/"),u={};i.target?u={target:i.target}:Object(o.a)(l)||(u={rel:"noopener noreferrer",target:"_blank"});var f=i.srcDark&&s?i.srcDark:i.src;return{logoLink:l,logoLinkProps:u,logoImageUrl:Object(c.a)(f),logoAlt:i.alt}}},285:function(e,t,a){var n=a(104),r=a(286).set;e.exports=function(e,t,a){var c,o=t.constructor;return o!==a&&"function"==typeof o&&(c=o.prototype)!==a.prototype&&n(c)&&r&&r(e,c),e}},286:function(e,t,a){var n=a(104),r=a(100),c=function(e,t){if(r(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{(n=a(115)(Function.call,a(287).f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(r){t=!0}return function(e,a){return c(e,a),t?e.__proto__=a:n(e,a),e}}({},!1):void 0),check:c}},287:function(e,t,a){var n=a(170),r=a(124),c=a(125),o=a(132),i=a(109),s=a(131),l=Object.getOwnPropertyDescriptor;t.f=a(101)?l:function(e,t){if(e=c(e),t=o(t,!0),s)try{return l(e,t)}catch(a){}if(i(e,t))return r(!n.f.call(e,t),e[t])}},288:function(e,t,a){var n=a(146),r=a(135).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,r)}},289:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),c=a(0),o=d(c),i=d(a(290)),s=d(a(7)),l=d(a(291)),u=d(a(292)),f=a(293);function d(e){return e&&e.__esModule?e:{default:e}}var h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleClick=a.handleClick.bind(a),a.handleTouchStart=a.handleTouchStart.bind(a),a.handleTouchMove=a.handleTouchMove.bind(a),a.handleTouchEnd=a.handleTouchEnd.bind(a),a.handleFocus=a.handleFocus.bind(a),a.handleBlur=a.handleBlur.bind(a),a.previouslyChecked=!(!e.checked&&!e.defaultChecked),a.state={checked:!(!e.checked&&!e.defaultChecked),hasFocus:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var a=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:a})}},{key:"handleTouchStart",value:function(e){this.startX=(0,f.pointerCoord)(e).x,this.activated=!0}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,f.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var a=(0,f.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>a?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<a&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(e){var a=this.props.icons;return a?void 0===a[e]?t.defaultProps.icons[e]:a[e]:null}},{key:"render",value:function(){var e=this,t=this.props,a=t.className,r=(t.icons,function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["className","icons"])),c=(0,i.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},a);return o.default.createElement("div",{className:c,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},o.default.createElement("div",{className:"react-toggle-track"},o.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),o.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),o.default.createElement("div",{className:"react-toggle-thumb"}),o.default.createElement("input",n({},r,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),t}(c.PureComponent);t.default=h,h.displayName="Toggle",h.defaultProps={icons:{checked:o.default.createElement(l.default,null),unchecked:o.default.createElement(u.default,null)}},h.propTypes={checked:s.default.bool,disabled:s.default.bool,defaultChecked:s.default.bool,onChange:s.default.func,onFocus:s.default.func,onBlur:s.default.func,className:s.default.string,name:s.default.string,value:s.default.string,id:s.default.string,"aria-labelledby":s.default.string,"aria-label":s.default.string,icons:s.default.oneOfType([s.default.bool,s.default.shape({checked:s.default.node,unchecked:s.default.node})])}},290:function(e,t,a){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var c=typeof n;if("string"===c||"number"===c)e.push(n);else if(Array.isArray(n)&&n.length){var o=r.apply(null,n);o&&e.push(o)}else if("object"===c)for(var i in n)a.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},291:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),c=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return c.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},c.default.createElement("title",null,"switch-check"),c.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))}},292:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),c=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return c.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},c.default.createElement("title",null,"switch-x"),c.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))}},293:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var a=t[0];return{x:a.clientX,y:a.clientY}}var n=e.pageX;if(void 0!==n)return{x:n,y:e.pageY}}return{x:0,y:0}}},97:function(e,t,a){var n=a(114)("wks"),r=a(113),c=a(95).Symbol,o="function"==typeof c;(e.exports=function(e){return n[e]||(n[e]=o&&c[e]||(o?c:r)("Symbol."+e))}).store=n}}]);