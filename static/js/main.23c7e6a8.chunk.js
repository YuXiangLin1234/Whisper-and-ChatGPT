(this["webpackJsonpWhisper-and-ChatGPT"]=this["webpackJsonpWhisper-and-ChatGPT"]||[]).push([[0],{10:function(e,t,n){},30:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),s=n(20),a=n.n(s),o=(n(30),n(5)),i=(n(10),n(4)),u=n(8),l=n(6),j=(n(19),n(21));function p(e){return e.toString().padStart(2,"0")}function b(e){return[p(e.getMonth()+1),p(e.getDate())].join("/")+" "+[p(e.getHours()),p(e.getMinutes()),p(e.getSeconds())].join(":")}var d=n(1),h=function(){return Object(d.jsxs)("div",{className:"spinner",children:[Object(d.jsx)("div",{className:"bounce1"}),Object(d.jsx)("div",{className:"bounce2"}),Object(d.jsx)("div",{className:"bounce3"})]})},O=function(e){var t=e.audio,n=e.transcription,c=e.translation,s=e.chat,a=Object(r.useState)(""),i=Object(o.a)(a,2),u=(i[0],i[1]),l=Object(r.useState)(""),j=Object(o.a)(l,2),p=j[0],O=j[1],f=Object(r.useState)(""),x=Object(o.a)(f,2),v=x[0],m=x[1];return Object(r.useEffect)((function(){var e=new Date;u(b(e))}),[n]),Object(r.useEffect)((function(){var e=new Date;O(b(e))}),[c]),Object(r.useEffect)((function(){var e=new Date;m(b(e))}),[s]),Object(d.jsx)("div",{style:{margin:"20px"},children:Object(d.jsxs)("div",{className:"msg-page",children:[Object(d.jsxs)("div",{className:"sent-chats",children:[Object(d.jsxs)("div",{className:"sent-chats-msg",children:[null!==t?Object(d.jsx)("audio",{controls:"True",src:t}):Object(d.jsx)(h,{}),null!==n?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("p",{children:n}),null!==c?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("p",{style:{marginTop:"1px"},children:c}),Object(d.jsx)("span",{className:"chat-time",children:p})]}):Object(d.jsx)(h,{})]}):null!==t?Object(d.jsx)(h,{}):Object(d.jsx)(d.Fragment,{})]}),Object(d.jsx)("div",{className:"sent-chats-img",children:Object(d.jsx)("img",{className:"chats-img",src:"old.png"})})]}),Object(d.jsx)("div",{className:"received-chats",children:null!==s?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"received-chats-img",children:Object(d.jsx)("img",{className:"chats-img",src:"chatgpt.png"})}),Object(d.jsx)("div",{className:"received-msg",children:Object(d.jsxs)("div",{className:"received-msg-inbox",children:[Object(d.jsx)("p",{children:s}),Object(d.jsx)("span",{className:"chat-time",children:v})]})})]}):null!==c?Object(d.jsx)(h,{}):Object(d.jsx)(d.Fragment,{})})]})})},f=n(37),x=n(17),v="gpt-3.5-turbo",m="https://api-inference.huggingface.co/models/Evan-Lin/whisper-large-v1-tw",g="https://api.openai.com/v1/chat/completions";function y(e){return w.apply(this,arguments)}function w(){return(w=Object(l.a)(Object(i.a)().mark((function e(t){var n,r;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={"content-type":"application/json",Authorization:"Bearer ".concat(t)},r={messages:[{role:"user",content:"Hello!"}],model:v},e.next=6,f.a.post(g,r,{headers:n});case 6:return e.sent,e.abrupt("return",!0);case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function k(e){return N.apply(this,arguments)}function N(){return(N=Object(l.a)(Object(i.a)().mark((function e(t){var n,r,c;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=Object(x.createSilentAudio)(5,44100),r=new Blob([n],{type:"audio/mp3"}),c={Authorization:"Bearer ".concat(t)},e.next=6,f.a.post(m,r,{headers:c});case 6:return e.sent,e.abrupt("return",!0);case 10:if(e.prev=10,e.t0=e.catch(0),console.log(e.t0.response.data.error),"Authorization header is correct, but the token seems invalid"!==e.t0.response.data.error){e.next=17;break}return e.abrupt("return",!1);case 17:return e.abrupt("return",!0);case 18:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function S(e){return A.apply(this,arguments)}function A(){return(A=Object(l.a)(Object(i.a)().mark((function e(t){var n,r,c,s;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=Object(x.createSilentAudio)(5,44100),r=new Blob([n],{type:"audio/mp3"}),c={Authorization:"Bearer ".concat(t)},e.next=6,f.a.post(m,r,{headers:c});case 6:return s=e.sent,console.log(s.status),e.abrupt("return",!0);case 11:if(e.prev=11,e.t0=e.catch(0),console.log(e.t0),console.log(e.t0.response.status),503!==e.t0.response.status){e.next=19;break}return e.abrupt("return",!1);case 19:return e.abrupt("return",!0);case 20:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}var T=function(){var e=Object(l.a)(Object(i.a)().mark((function e(t,n){var r,c,s;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={Authorization:"Bearer ".concat(n)},e.next=4,f.a.post(m,t,{headers:r});case 4:return c=e.sent,s=c.data.text,e.abrupt("return",s);case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,n){return e.apply(this,arguments)}}();function E(e,t){return B.apply(this,arguments)}function B(){return(B=Object(l.a)(Object(i.a)().mark((function e(t,n){var r,c,s,a,o;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={"content-type":"application/json",Authorization:"Bearer ".concat(n)},s={messages:c=[{role:"system",content:"Rewrite the sentence into a fluent chinese one"},{role:"user",content:t}],model:v},e.next=6,f.a.post(g,s,{headers:r});case 6:return a=e.sent,console.log(c),o=a.data.choices[0].message.content,e.abrupt("return",o);case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function C(e,t,n,r){return F.apply(this,arguments)}function F(){return(F=Object(l.a)(Object(i.a)().mark((function e(t,n,r,c){var s,a,o,u,l,j;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(e.prev=0,s={"content-type":"application/json",Authorization:"Bearer ".concat(c)},a=[{role:"system",content:"\u4f60\u662f\u4e00\u500b\u8a3a\u524d\u554f\u8a3a\u7cfb\u7d71\uff0c\u75c5\u4eba\u6703\u8ddf\u4f60\u8aaa\u4ed6\u76ee\u524d\u7684\u8eab\u9ad4\u72c0\u6cc1\uff0c                                                \u75c5\u4eba\u901a\u5e38\u6703\u8ddf\u4f60\u8b1b\u4ee5\u4e0b\u5e7e\u4ef6\u4e8b\u60c5:\n\n\u767c\u75c5\uff1a\u4ec0\u9ebc\u6642\u5019\u958b\u59cb                                                \u6ce8\u610f\u5230\u6709\u75c7\u72c0\u7522\u751f\uff1f\u8a98\u767c\u539f\u56e0\uff1a\u75c7\u72c0\u958b\u59cb\u51fa\u73fe\u7684\u6642\u9593\u9ede\u9644\u8fd1\uff0c                                                \u75c5\u4eba\u5728\u4ec0\u9ebc\u74b0\u5883\u505a\u4e86\u54ea\u4e9b\u4e8b\u60c5\uff1f\u6027\u8cea\uff1a\u75c7\u72c0\u51fa\u73fe\u6642\u7684\u611f\u89ba\u3001                                                \u75c7\u72c0\u7684\u7279\u5fb5\u75c7\u72c0\u6563\u5e03\uff1a\u51fa\u73fe\u75c7\u72c0\u7684\u90e8\u4f4d\u662f\u5426\u6539\u8b8a\u3001\u6216\u8005\u96a8\u8457                                                \u8eab\u9ad4\u7684\u79fb\u52d5\u800c\u6709\u8b8a\u5316\uff1f\u56b4\u91cd\u7a0b\u5ea6\uff1a\u75c7\u72c0\u4f55\u6642\u6700\u56b4\u91cd\uff1f\u6709\u591a\u56b4\u91cd\uff1f                                                \n\n\u8acb\u4f60\u5229\u7528\u7372\u5f97\u7684\u8a0a\u606f\uff0c\u4f86\u5efa\u7acb\u770b\u8a3a\u76ee\u6a19\uff0c\u53ef\u4ee5\u5f9e\u63d0\u51fa\u958b\u653e\u5f0f                                                \u7684\u554f\u984c\u958b\u59cb\uff0c\u5982\u679c\u4e0a\u8ff0\u95dc\u65bc\u767c\u75c5\u3001\u8a98\u767c\u539f\u56e0\u3001\u6027\u8cea\u3001\u75c7\u72c0\u6563\u5e03\u3001                                                \u56b4\u91cd\u7a0b\u5ea6\u6709\u4e0d\u6e05\u695a\u7684\u5730\u65b9\uff0c\u4e5f\u53ef\u4ee5\u8acb\u75c5\u4eba\u56de\u7b54\uff0c\u7136\u5f8c\u89c0\u5bdf\u75c5\u4eba\u7684                                                \u56de\u8986\uff0c\u4e26\u7d66\u51fa\u5efa\u8b70\u3002"}],console.log(n),o=0;o<n.length;o++)a.push({role:"user",content:n[o]}),a.push({role:"assistant",content:r[o]});return a.push({role:"user",content:t}),console.log(a),u={messages:a,model:v},e.next=10,f.a.post(g,u,{headers:s});case 10:return l=e.sent,j=l.data.choices[0].message.content,e.abrupt("return",j);case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))).apply(this,arguments)}var R=function(e){var t=e.apiKey,n=e.hfToken,c=Object(r.useState)(!1),s=Object(o.a)(c,2),a=s[0],p=s[1],b=Object(r.useState)([]),f=Object(o.a)(b,2),x=f[0],v=f[1],m=Object(r.useState)([]),g=Object(o.a)(m,2),y=g[0],w=g[1],k=Object(r.useState)([]),N=Object(o.a)(k,2),A=N[0],B=N[1],F=Object(r.useState)([]),R=Object(o.a)(F,2),z=R[0],D=R[1],K=Object(r.useState)(!1),P=Object(o.a)(K,2);P[0],P[1];function H(e,t){return L.apply(this,arguments)}function L(){return(L=Object(l.a)(Object(i.a)().mark((function e(r,c){var s,a,o;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T(c,n);case 2:return s=e.sent,w([].concat(Object(u.a)(y),[s])),e.next=6,E(s,t);case 6:return a=e.sent,B([].concat(Object(u.a)(A),[a])),e.next=10,C(a,A,z,t);case 10:o=e.sent,D([].concat(Object(u.a)(z),[o]));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I=function(){var e=Object(l.a)(Object(i.a)().mark((function e(t){var n;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=URL.createObjectURL(t),v([].concat(Object(u.a)(x),[n])),w([].concat(Object(u.a)(y),[null])),B([].concat(Object(u.a)(A),[null])),D([].concat(Object(u.a)(z),[null])),e.next=7,H(n,t);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){var e=function(){var t=Object(l.a)(Object(i.a)().mark((function t(){var r;return Object(i.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,S(n);case 2:return r=t.sent,console.log(r),!0===r?p(!0):setTimeout(e,8e3),t.abrupt("return",r);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();e()}),[]),Object(d.jsx)("div",{className:"App",style:{marginTop:"30px"},children:a?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"msg-container",children:x.map((function(e,t){return Object(d.jsx)(O,{audio:x[t],transcription:y[t],translation:A[t],chat:z[t]},t)}))}),Object(d.jsx)("div",{className:"bottom-line"}),Object(d.jsxs)("div",{className:"bottom-line-button",children:[Object(d.jsx)(j.a,{onRecordingComplete:I}),Object(d.jsx)("button",{className:"circle-button",disabled:!1,onClick:function(){v([]),w([]),B([]),D([])},children:Object(d.jsx)("ion-icon",{name:"trash",style:{fontSize:"17px"}})})]})]}):Object(d.jsxs)("div",{className:"center",children:[Object(d.jsx)("h2",{children:"Wait for model loading"}),Object(d.jsx)(h,{})]})})},z=function(e){var t=e.setApiKey,n=e.setHfToken,c=Object(r.useRef)(),s=Object(r.useRef)(),a=Object(r.useRef)(),o=Object(r.useRef)(),u=Object(r.useRef)(),j=function(){var e=Object(l.a)(Object(i.a)().mark((function e(){var r,l,j,p;return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r=s.current.value,l=c.current.value,0!==r.length&&0!==l.length){e.next=10;break}return a.current.style.display="inline",o.current.style.display="none",u.current.style.display="none",e.abrupt("return");case 10:a.current.style.display="none";case 11:return e.next=13,y(r);case 13:return j=e.sent,e.next=16,k(l);case 16:p=e.sent,!0===j&&!0===p?(t(r),n(l),o.current.style.display="none",u.current.style.display="none"):(o.current.style.display=!1===j?"inline":"none",u.current.style.display=!1===p?"inline":"none"),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(0),console.log(e.t0);case 23:case"end":return e.stop()}}),e,null,[[0,20]])})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=Object(l.a)(Object(i.a)().mark((function e(t){return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"Enter"===t.key&&j();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(l.a)(Object(i.a)().mark((function e(t){return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j();case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"App ask-key-container",children:[Object(d.jsx)("h2",{children:"\u8a3a\u524d\u554f\u8a3a\u7cfb\u7d71"}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{className:"ask-key-component",children:[Object(d.jsxs)("span",{children:["OpenAI Api Key : \xa0 \u2003\xa0",Object(d.jsx)("input",{type:"text",onKeyDown:p,ref:s})]}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsxs)("span",{children:["Huggingface Token : \xa0",Object(d.jsx)("input",{type:"text",onKeyDown:p,ref:c})]})]}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("button",{onClick:b,children:"\u78ba\u8a8d"}),Object(d.jsxs)("div",{className:"error",ref:a,style:{display:"none"},children:[Object(d.jsx)("h3",{style:{color:"red"},children:"Error!"}),Object(d.jsx)("p",{style:{color:"red"},children:"Please ensure that both two input box are filled"})]}),Object(d.jsxs)("div",{className:"error",ref:o,style:{display:"none"},children:[Object(d.jsx)("h3",{style:{color:"red"},children:"Error!"}),Object(d.jsx)("p",{style:{color:"red"},children:"Please ensure that a correct OpenAI apikey is provided"})]}),Object(d.jsxs)("div",{className:"error",ref:u,style:{display:"none"},children:[Object(d.jsx)("h3",{style:{color:"red"},children:"Error!"}),Object(d.jsx)("p",{style:{color:"red"},children:"Please ensure that a correct huggingface token is provided"})]})]})},D=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"anonymous";Object(r.useEffect)((function(){var r=document.createElement("script");return r.src=e,r.async=n,t&&(r.integrity=t),r.crossOrigin=c,document.body.appendChild(r),function(){document.body.removeChild(r)}}),[e,t,n,c])};var K=function(){D("https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.js");var e=Object(r.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)(""),a=Object(o.a)(s,2),i=a[0],u=a[1];return Object(d.jsx)("div",{className:"App",style:{marginTop:"30px"},children:n.length&&i.length?Object(d.jsx)(R,{apiKey:n,hfToken:i}):Object(d.jsx)(z,{setApiKey:c,setHfToken:u})})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,38)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),s(e),a(e)}))};a.a.createRoot(document.getElementById("root")).render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(K,{})})),P()}},[[36,1,2]]]);
//# sourceMappingURL=main.23c7e6a8.chunk.js.map