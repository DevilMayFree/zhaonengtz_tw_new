"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[40],{99415:function(e,t,i){i.r(t),i.d(t,{default:function(){return e1}});var o,r=i(59499),n=i(27812),a=i(67294),s=i(5152),c=i.n(s),l=i(57557),d=i.n(l),u=i(26113);i(66337);var p=i(45308),h=i(45374),m=i(97674),v=i(2475),f=i(55869),g=i(8521),x=i(38042),b=i(78773),j=i(85893),y=function(e){var t=e.index,i=e.data,o=e.layout,r=(0,f.wk)({data:i,layout:o});return(0,j.jsx)("div",{className:(0,u.iv)(v.Kw,w),children:i.length>0&&i.map(function(e,i){var n=e.srcUrl,a=e.title;return(0,j.jsx)("div",{className:(0,u.iv)(r,O),children:(0,j.jsx)(b.Z,{disabled:!0,href:n,target:"_blank",children:(0,j.jsx)(x.Z,{customBgStyle:(0,u.iv)(g.A),title:a,layout:o})})},"listfeed".concat(t,"-").concat(i))})})},w={margin:"1.5rem 0 0 0","@media(max-width: 768px)":{margin:"1.5rem 1rem 0 1rem"}},O={margin:"0 1rem .5rem 1rem","@media(max-width: 768px)":{margin:0}},P=i(53988);function S(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function Z(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?S(Object(i),!0).forEach(function(t){(0,r.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):S(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}var N=function(e){var t;return{margin:"1rem 1rem 2rem 1rem","> div":(t={},(0,r.Z)(t,"> div:nth-child(".concat(e,") ~ div "),{display:"none"}),(0,r.Z)(t,"@media(max-width: 480px)",{padding:"0 35px","> div ~ div ":{display:"none"}}),t)}},k=function(e){var t=e.index,i=e.data,o=e.query.isMobile,r=e.customStyle,n=e.pdCardTemplate,a=3;2===n&&(a=4),3===n&&(a=1);var s=(0,f.xL)({data:i,slidesToShow:a,pdCardTemplate:n,isMobile:o});return 3!==n||o||(s.width="60rem"),(0,j.jsx)("div",{className:(0,u.iv)(N(a),v.Kw,r),children:(0,j.jsx)("div",{className:(0,u.iv)(s,v.Kw),children:i.length>0&&i.map(function(i,o){var r=i.srcUrl;return(0,j.jsx)("div",{className:(0,u.iv)({flex:1,margin:".3rem"}),children:(0,j.jsx)(b.Z,{disabled:!0,href:r,target:"_blank",children:(0,j.jsx)(P.Z,Z(Z(Z({customBgStyle:(0,u.iv)(g.A)},i),d()(e,["data"])),{},{defaultImgUrl:"https://assets.fevercdn.com/nc/icons/pic.svg"}))})},"carousel".concat(t,"-").concat(o))})})})},C=function(e){var t=e.embed,i=t.height,o=t.mbHeight,r=e.layout;return(0,j.jsx)("div",{className:(0,u.iv)(L(r)),children:(0,j.jsx)("div",{className:(0,u.iv)(g.A,B(i,o))})})},L=function(e){return{width:"100%",position:"relative",margin:"full"!==e&&"1.5rem 0",background:"transparent"}},B=function(e,t){return{height:"".concat(e,"px"),"@media(max-width: 480px)":{height:"".concat(t,"px")}}};function D(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function I(e){var t,i=e.type,o=e.index,n=e.data,a=e.embed,s=e.mbHeight,c=e.height,l=e.layout,d=e.children,u=e.query.isMobile,v=!0;switch(i){case"IMG":t=(0,j.jsx)(h.Z,{height:c,mbHeight:s,holderStyle:(0,g.L)(l)});break;case"SlideShow":t=(0,j.jsx)(h.Z,{height:c,holderStyle:(0,g.L)(l)});break;case"Video":t=(0,j.jsx)(h.Z,{height:"56.25%",holderStyle:(0,g.L)(l)});break;case"ListFeed":t=(0,j.jsx)(y,{index:o,data:n,layout:l});break;case"Carousel":t=(0,j.jsx)(m.Z,{index:o,data:n,layout:l,isMobile:u});break;case"PdCard":t=(0,j.jsx)(k,function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?D(Object(i),!0).forEach(function(t){(0,r.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):D(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}({},e));break;case"Embed":t=(0,j.jsx)(C,{embed:a,layout:l});break;default:v=!1}return v?(0,j.jsx)(p.Z,{once:!0,placeholder:t,children:d}):d}var z=i(55491),M=i(62074),E=i(32643),U=i(84228),_=i(7557),R=i.n(_),q=function(){var e=800;e=window.document.documentElement.clientHeight,R().toY(e)},T=function(){return(0,j.jsx)(U.Z,{isActive:!0,children:function(e){var t=e.pageYOffset,i=e.removeScrollListener;return t>0&&i(),(0,j.jsx)("div",{className:(0,u.iv)(v.UF,J,{visibility:0===t?"visible":"hidden"}),children:(0,j.jsx)("span",{className:(0,u.iv)(F,(0,u.e4)(A),(0,u.bb)(W)),onClick:q})})}})},H=u.iv.keyframes({"0%":{opacity:0},"30%":{opacity:1},"60%":{boxShadow:"0 0 0 60px rgba(255,255,255,.1)",opacity:0},"100%":{opacity:0}}),A={position:"absolute",top:"50%",left:"50%",content:'""',width:"16px",height:"16px",margin:"-12px 0 0 -8px",borderLeft:"1px solid #fff",borderBottom:"1px solid #fff",transform:"rotate(-45deg)",boxSizing:"border-box"},W={position:"absolute",top:"50%",left:"50%",zIndex:-1,content:'""',width:"44px",height:"44px",margin:"-23px 0 0 -23px",boxShadow:"0 0 0 0 rgba(255,255,255,.1)",borderRadius:"100%",opacity:0,animation:"".concat(H," 3s infinite"),boxSizing:"border-box"},F={width:"46px",height:"46px",cursor:"pointer",border:"1px solid #fff",borderRadius:"100%",boxSizing:"border-box",":hover":{opacity:"0.5"}},J={position:"fixed",left:0,right:0,bottom:0,zIndex:2,padding:"1.5rem 1rem"},K=i(73664),G=i(41120),Y=i(44987),V=i(32692),Q=i(73637),X=(0,G.Z)({modal:{display:"flex",alignItems:"center",justifyContent:"center"}});function $(e){var t=e.open,i=e.children,o=e.onClose,r=X();return(0,j.jsx)(Y.Z,{open:t,onClose:o,className:r.modal,closeAfterTransition:!0,BackdropComponent:V.Z,BackdropProps:{timeout:500},children:(0,j.jsx)(Q.Z,{in:t,children:i})})}var ee=i(89823),et=i(4730),ei=["children"];function eo(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function er(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?eo(Object(i),!0).forEach(function(t){(0,r.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):eo(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}function en(e){var t=e.children,i=(0,et.Z)(e,ei);return(0,j.jsx)("div",er(er({className:(0,u.iv)(ea)},i),{},{children:t}))}var ea={width:"100%",height:"100%",position:"relative","& *":{boxSizing:"border-box"}},es=i(22318),ec={xsm:480,sm:768,md:1024,lg:1200,xlg:1440};function el(e){var t=ec[e];return t||console.error("Size not defined in defalutBreakpoints"),t}function ed(e){var t=el(e);return"@media screen and (min-width: ".concat(t+1,"px)")}var eu=i(16835),ep=["src","alt","onLoad"];function eh(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function em(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?eh(Object(i),!0).forEach(function(t){(0,r.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):eh(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}function ev(e){var t=e.src,i=void 0===t?"":t,o=e.alt,r=e.onLoad,n=void 0===r?function(){}:r,s=(0,et.Z)(e,ep),c=(0,a.useMemo)(function(){return function(e){var t=/(https:\/\/.+?)\/(.+?)\/(.+)\/(.+)\.(\w+)/i.exec(e);if(t){var i=(0,eu.default)(t,6),o=i[1],r=i[2],n=i[3],a=i[4],s=i[5];if("picture-origin"===r)return ef.map(function(e){var t=e.size,i=e.type;return{srcSet:"".concat(o,"/").concat("picture-compressed","/").concat(n,"/").concat(a,"-").concat(i,".").concat(s),media:"(max-width: ".concat(t,"px)")}})}return[]}(i)},[i]);return c.length>0?(0,j.jsxs)("picture",{children:[c.map(function(e){return(0,j.jsx)("source",em({},e),e.srcSet)}),(0,j.jsx)("img",em({src:i,alt:o,onLoad:n},s))]}):(0,j.jsx)("img",em({src:i,alt:o,onLoad:n},s))}var ef=[{size:800,type:"md"},{size:1200,type:"lg"}],eg=i(56310),ex=i(95477);function eb(e){var t=e.url,i=e.onReady,o=e.controls,r=(0,a.useState)(0),n=r[0],s=r[1],c=(0,a.useState)(0),l=c[0],d=c[1];return(0,j.jsx)("div",{ref:function(e){e&&(s(e.offsetWidth),d(e.offsetHeight))},className:(0,u.iv)(ej),children:(0,j.jsx)("iframe",{src:"https://www.facebook.com/plugins/video.php?width=".concat(n,"&height=").concat(l,"&href=").concat(t,"&show_text=false&controls=").concat(void 0!==o&&o),width:n,height:l,title:t,className:(0,u.iv)(ey),onLoad:void 0===i?function(){}:i,scrolling:"no",frameBorder:"0",allowFullScreen:!0,allow:"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"})})}var ej={width:"100%",height:"100%",position:"relative"},ey={width:"100%",height:"100%",position:"absolute",top:0,left:0},ew=/facebook\.com|fb\.watch/i;function eO(e){var t=e.url,i=e.style,o=(0,a.useState)(!0),r=o[0],n=o[1],s=ew.test(t);return(0,j.jsxs)("div",{className:(0,u.iv)(eP,i),children:[r&&(0,j.jsx)(ex.Z,{className:"".concat((0,u.iv)(eS))}),s?(0,j.jsx)(eb,{url:t,onReady:function(){return n(!1)},controls:!0}):(0,j.jsx)(eg.Z,{onReady:function(){return n(!1)},url:t,width:"100%",height:"100%",controls:!0})]})}var eP={width:"100%",height:"100%",backgroundColor:"#ececec",position:"relative"},eS={position:"absolute",margin:"auto",top:0,left:0,right:0,bottom:0},eZ=i(17812),eN=i(80366),ek=i(47298),eC=i(63457);function eL(e){var t=e.onClose,i=(0,eC.Z)("(max-width:".concat(ec.sm,"px)"));return(0,j.jsx)(eZ.Z,{size:"medium",className:"".concat((0,u.iv)(eB)),onClick:t,children:i?(0,j.jsx)(ek.Z,{}):(0,j.jsx)(eN.Z,{})})}var eB=(0,r.Z)({position:"absolute",zIndex:2,top:"16px",right:"16px"},(o=el("sm"),"@media screen and (max-width: ".concat(o-1,"px)")),{top:"8px",right:"8px"});function eD(e){var t=e.styles,i=e.onClose,o=e.mediaUrl,r=e.mediaMode,n=e.title,a=e.children,s=Boolean(o)&&Boolean(r),c=(0,j.jsxs)("div",{className:"media",children:["img"===r&&(0,j.jsx)("div",{children:(0,j.jsx)(ev,{src:o,alt:n,className:(0,u.iv)(eM)})}),"video"===r&&(0,j.jsx)("div",{className:(0,u.iv)(e_),children:(0,j.jsx)("div",{children:(0,j.jsx)("div",{children:(0,j.jsx)(eO,{url:o})})})})]}),l=(0,j.jsx)("div",{className:"text",children:(0,j.jsx)("div",{className:(0,u.iv)(eU),children:(0,j.jsxs)("div",{children:[(0,j.jsx)(es.Z,{variant:"h5",className:"".concat((0,u.iv)(eE)),children:n}),"function"==typeof a?a():a]})})});return(0,j.jsxs)("div",{className:(0,u.iv)(eI,void 0===t?"":t),children:[(0,j.jsx)(eL,{onClose:i}),(0,j.jsxs)("div",{className:(0,u.iv)(ez),children:[s&&c,l]})]})}var eI={position:"relative",backgroundColor:"#fff","&:focus":{outline:"none"}},ez=(0,r.Z)({position:"relative",zIndex:1,overflow:"auto",height:"100%",boxSizing:"border-box","> div.text":{padding:"0 16px 16px"}},ed("sm"),{width:"100%",display:"flex",justifyContent:"center","> div":{height:"100%"},"> div.media":{flex:"0 1 55%",padding:"64px",paddingRight:0,"> div":{width:"100%",height:"100%",position:"relative"}},"> div.text":{flex:"0 1 45%",padding:"64px",paddingRight:0}}),eM=(0,r.Z)({width:"100%"},ed("sm"),{position:"absolute",margin:"auto",width:"auto",maxWidth:"100%",maxHeight:"100%",top:0,left:0,right:0,bottom:0}),eE={padding:"24px 0",whiteSpace:"pre-wrap"},eU=(0,r.Z)({width:"100%"},ed("sm"),{height:"100%",paddingRight:"64px",overflow:"auto",display:"flex","> div":{margin:"auto",width:"100%"}}),e_={display:"flex",alignItems:"center","> div":{width:"100%",paddingTop:"56.25%",position:"relative","> div":{position:"absolute",width:"100%",height:"100%",top:0,left:0}}};function eR(e){var t=e.onClose,i=e.title,o=e.mediaUrl,r=e.mediaMode,n=e.styles,a=Boolean(o)&&Boolean(r);return(0,j.jsxs)("div",{className:(0,u.iv)(eq,n),children:[(0,j.jsx)(eL,{onClose:t}),a&&(0,j.jsxs)("div",{className:(0,u.iv)(eT),children:["img"===r&&(0,j.jsx)("div",{children:(0,j.jsx)(ev,{src:o,alt:i,className:(0,u.iv)(eH)})}),"video"===r&&(0,j.jsx)("div",{className:(0,u.iv)(eA),children:(0,j.jsx)("div",{children:(0,j.jsx)("div",{children:(0,j.jsx)(eO,{url:o})})})})]})]})}var eq={position:"relative",height:"100%",backgroundColor:"#fff","&:focus":{outline:"none"}},eT=(0,r.Z)({height:"100%",boxSizing:"border-box","> div":{width:"100%",height:"100%",position:"relative"}},ed("sm"),{width:"80%",margin:"auto",padding:"64px"}),eH={position:"absolute",margin:"auto",width:"auto",maxWidth:"100%",maxHeight:"100%",top:0,left:0,right:0,bottom:0},eA={display:"flex",alignItems:"center","> div":{width:"100%",paddingTop:"56.25%",position:"relative","> div":{position:"absolute",width:"100%",height:"100%",top:0,left:0}}};function eW(e){var t=e.onClose,i=e.title,o=e.description,r=e.styles;return(0,j.jsxs)("div",{className:(0,u.iv)(eF,r),children:[(0,j.jsx)(eL,{onClose:t}),(0,j.jsx)("div",{className:(0,u.iv)(eJ),children:(0,j.jsxs)("div",{children:[(0,j.jsx)(es.Z,{variant:"h5",className:(0,u.iv)(eK),children:i}),(0,j.jsx)(ee.Z,{content:o,shouldLazyLoad:!1})]})})]})}var eF={position:"relative",height:"100%",overflow:"auto",backgroundColor:"#fff","&:focus":{outline:"none"}},eJ=(0,r.Z)({boxSizing:"border-box",display:"flex",alignItems:"center",padding:"8px",height:"100%"},ed("sm"),{padding:"64px",maxWidth:"50%",margin:"auto"}),eK={padding:"24px 0",whiteSpace:"pre-wrap"};function eG(e){var t=e.componentStyle,i=void 0===t?{}:t,o=e.optionInfo,r=e.onClose,n=void 0===r?function(){}:r,a=Boolean(o),s=(o=o||{}).mode,c=!1;if("video-desc"===s||"img-desc"===s){var l=o,d=l.label,u=l.description,p=l.imageUrl,h=l.videoUrl;c=(0,j.jsx)(eD,{title:d,mediaUrl:"video-desc"===s?h:p,mediaMode:"video-desc"===s?"video":"img",styles:eY(i),onClose:n,children:(0,j.jsx)(ee.Z,{content:u,shouldLazyLoad:!1})})}else if("video"===s||"img"===s){var m=o,v=m.label,f=m.imageUrl,g=m.videoUrl;c=(0,j.jsx)(eR,{title:v,mediaUrl:"video"===s?g:f,mediaMode:s,styles:eY(i),onClose:n})}else{var x=o,b=x.label,y=x.description;c=(0,j.jsx)(eW,{title:b,description:y,styles:eY(i),onClose:n})}return(0,j.jsx)($,{open:a,children:(0,j.jsx)(en,{children:c})})}var eY=function(e){return{width:"100%",height:"100%",backgroundColor:e.contentBgColor,"& svg, & .MuiTypography-root":{color:e.titleColor},"& .MuiButtonBase-root":{backgroundColor:e.contentBgColor,borderRadius:"50%",padding:"4px"}}},eV=i(92056);function eQ(){var e=(0,a.useState)(null),t=e[0],i=e[1],o=(0,a.useState)({}),r=o[0],n=o[1];return(0,a.useEffect)(function(){function e(e){var t,o,r,a=null!==(t=e.data)&&void 0!==t?t:{};switch(a.event){case eV.tZ:i(null==a?void 0:null===(o=a.payload)||void 0===o?void 0:o.info),n(null==a?void 0:null===(r=a.payload)||void 0===r?void 0:r.style);break;case eV.q0:e.source.postMessage({event:eV.q0},e.origin)}}return window.addEventListener("message",e),function(){return window.removeEventListener("message",e)}},[]),(0,j.jsx)(eG,{optionInfo:t,componentStyle:r,onClose:function(){i(null),n({})}})}function eX(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,o)}return i}function e$(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?eX(Object(i),!0).forEach(function(t){(0,r.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):eX(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}var e0=c()(function(){return i.e(983).then(i.bind(i,37983))},{ssr:!1,loading:function(){return(0,j.jsx)("div",{style:{display:"none"}})},loadableGenerated:{webpack:function(){return[37983]}}}),e1=function(e){var t=e.query,i=e.promo,o=i.id,r=i.uuid,a=i.loginType,s=e.newPromotionInfo,c=e.newSecondaryPromotionInfo,l=e.sections,p=e.customStyle,h=e.toogleBurgerMenu,m=e.showBurgerMenu,v=e.promoLocale,f=e.promoLangJson,g=e.newMgmPromotionInfo,x=t.params.serialno,b=t.enableLogin,y=t.enterPrizeLogOutUrl,w=l.filter(function(e){return!e.hidden}),O=Boolean(o)&&!Boolean(r);return(0,j.jsx)("div",{className:"pure-g ".concat(u.iv.apply(void 0,(0,n.Z)(p))),children:(0,j.jsxs)("div",{className:"pure-u-1",children:[O&&Boolean(x)&&Boolean(a)&&(0,j.jsx)(e0,{serialno:x,promoId:o}),(0,j.jsx)(eQ,{}),(0,j.jsx)(z.Z,{query:t,promoLocale:v,promoLangJson:f,newPromotionInfo:s,children:w.map(function(i){var o,r=d()(e,["sections","url","intl","customStyle"]),n=i.id,a=i._id,l=i.type,p=i.anchorName,x="section-".concat(n||a);return o=l.startsWith("Promo")?(0,j.jsx)(E.Z,{sectionId:a,query:t,montageDisabled:0,newPromotionInfo:s,newSecondaryPromotionInfo:c,promoLocale:v,promoLangJson:f,newMgmPromotionInfo:g}):(0,j.jsx)(M.Z,{_id:a,type:l,query:t,toogleBurgerMenu:h,showBurgerMenu:m}),(0,j.jsxs)("div",{className:(0,u.iv)({margin:" -1px auto"}),id:x,children:[Boolean(p)&&(0,j.jsx)("span",{id:p.replace(/\s+/g,"_")}),(0,j.jsx)(I,e$(e$(e$({},i),r),{},{children:o}))]},x)})}),(0,j.jsx)(T,{}),(0,j.jsx)(K.Z,{enableLogoutBtn:b,enterPrizeLogOutUrl:y})]})})}}}]);