function ne(o,f){for(var s=0;s<f.length;s++){const l=f[s];if(typeof l!="string"&&!Array.isArray(l)){for(const c in l)if(c!=="default"&&!(c in o)){const u=Object.getOwnPropertyDescriptor(l,c);u&&Object.defineProperty(o,c,u.get?u:{enumerable:!0,get:()=>l[c]})}}}return Object.freeze(Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}))}function ie(o){if(o.__esModule)return o;var f=o.default;if(typeof f=="function"){var s=function l(){if(this instanceof l){var c=[null];c.push.apply(c,arguments);var u=Function.bind.apply(f,c);return new u}return f.apply(this,arguments)};s.prototype=f.prototype}else s={};return Object.defineProperty(s,"__esModule",{value:!0}),Object.keys(o).forEach(function(l){var c=Object.getOwnPropertyDescriptor(o,l);Object.defineProperty(s,l,c.get?c:{enumerable:!0,get:function(){return o[l]}})}),s}var Q={},ae={get exports(){return Q},set exports(o){Q=o}};(function(o){var f=function(s){var l=Object.prototype,c=l.hasOwnProperty,u=Object.defineProperty||function(t,e,r){t[e]=r.value},g,y=typeof Symbol=="function"?Symbol:{},m=y.iterator||"@@iterator",O=y.asyncIterator||"@@asyncIterator",_=y.toStringTag||"@@toStringTag";function b(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{b({},"")}catch{b=function(e,r,a){return e[r]=a}}function W(t,e,r,a){var n=e&&e.prototype instanceof N?e:N,p=Object.create(n.prototype),E=new d(a||[]);return u(p,"_invoke",{value:J(t,r,E)}),p}s.wrap=W;function S(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(a){return{type:"throw",arg:a}}}var C="suspendedStart",B="suspendedYield",T="executing",G="completed",v={};function N(){}function U(){}function k(){}var x={};b(x,m,function(){return this});var z=Object.getPrototypeOf,M=z&&z(z(w([])));M&&M!==l&&c.call(M,m)&&(x=M);var $=k.prototype=N.prototype=Object.create(x);U.prototype=k,u($,"constructor",{value:k,configurable:!0}),u(k,"constructor",{value:U,configurable:!0}),U.displayName=b(k,_,"GeneratorFunction");function q(t){["next","throw","return"].forEach(function(e){b(t,e,function(r){return this._invoke(e,r)})})}s.isGeneratorFunction=function(t){var e=typeof t=="function"&&t.constructor;return e?e===U||(e.displayName||e.name)==="GeneratorFunction":!1},s.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,b(t,_,"GeneratorFunction")),t.prototype=Object.create($),t},s.awrap=function(t){return{__await:t}};function D(t,e){function r(p,E,j,P){var L=S(t[p],t,E);if(L.type==="throw")P(L.arg);else{var V=L.arg,Y=V.value;return Y&&typeof Y=="object"&&c.call(Y,"__await")?e.resolve(Y.__await).then(function(R){r("next",R,j,P)},function(R){r("throw",R,j,P)}):e.resolve(Y).then(function(R){V.value=R,j(V)},function(R){return r("throw",R,j,P)})}}var a;function n(p,E){function j(){return new e(function(P,L){r(p,E,P,L)})}return a=a?a.then(j,j):j()}u(this,"_invoke",{value:n})}q(D.prototype),b(D.prototype,O,function(){return this}),s.AsyncIterator=D,s.async=function(t,e,r,a,n){n===void 0&&(n=Promise);var p=new D(W(t,e,r,a),n);return s.isGeneratorFunction(e)?p:p.next().then(function(E){return E.done?E.value:p.next()})};function J(t,e,r){var a=C;return function(p,E){if(a===T)throw new Error("Generator is already running");if(a===G){if(p==="throw")throw E;return F()}for(r.method=p,r.arg=E;;){var j=r.delegate;if(j){var P=H(j,r);if(P){if(P===v)continue;return P}}if(r.method==="next")r.sent=r._sent=r.arg;else if(r.method==="throw"){if(a===C)throw a=G,r.arg;r.dispatchException(r.arg)}else r.method==="return"&&r.abrupt("return",r.arg);a=T;var L=S(t,e,r);if(L.type==="normal"){if(a=r.done?G:B,L.arg===v)continue;return{value:L.arg,done:r.done}}else L.type==="throw"&&(a=G,r.method="throw",r.arg=L.arg)}}}function H(t,e){var r=e.method,a=t.iterator[r];if(a===g)return e.delegate=null,r==="throw"&&t.iterator.return&&(e.method="return",e.arg=g,H(t,e),e.method==="throw")||r!=="return"&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),v;var n=S(a,t.iterator,e.arg);if(n.type==="throw")return e.method="throw",e.arg=n.arg,e.delegate=null,v;var p=n.arg;if(!p)return e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v;if(p.done)e[t.resultName]=p.value,e.next=t.nextLoc,e.method!=="return"&&(e.method="next",e.arg=g);else return p;return e.delegate=null,v}q($),b($,_,"Generator"),b($,m,function(){return this}),b($,"toString",function(){return"[object Generator]"});function i(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function h(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function d(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(i,this),this.reset(!0)}s.keys=function(t){var e=Object(t),r=[];for(var a in e)r.push(a);return r.reverse(),function n(){for(;r.length;){var p=r.pop();if(p in e)return n.value=p,n.done=!1,n}return n.done=!0,n}};function w(t){if(t){var e=t[m];if(e)return e.call(t);if(typeof t.next=="function")return t;if(!isNaN(t.length)){var r=-1,a=function n(){for(;++r<t.length;)if(c.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=g,n.done=!0,n};return a.next=a}}return{next:F}}s.values=w;function F(){return{value:g,done:!0}}return d.prototype={constructor:d,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=g,this.done=!1,this.delegate=null,this.method="next",this.arg=g,this.tryEntries.forEach(h),!t)for(var e in this)e.charAt(0)==="t"&&c.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=g)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if(e.type==="throw")throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(P,L){return p.type="throw",p.arg=t,e.next=P,L&&(e.method="next",e.arg=g),!!L}for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a],p=n.completion;if(n.tryLoc==="root")return r("end");if(n.tryLoc<=this.prev){var E=c.call(n,"catchLoc"),j=c.call(n,"finallyLoc");if(E&&j){if(this.prev<n.catchLoc)return r(n.catchLoc,!0);if(this.prev<n.finallyLoc)return r(n.finallyLoc)}else if(E){if(this.prev<n.catchLoc)return r(n.catchLoc,!0)}else if(j){if(this.prev<n.finallyLoc)return r(n.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&c.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var n=a;break}}n&&(t==="break"||t==="continue")&&n.tryLoc<=e&&e<=n.finallyLoc&&(n=null);var p=n?n.completion:{};return p.type=t,p.arg=e,n?(this.method="next",this.next=n.finallyLoc,v):this.complete(p)},complete:function(t,e){if(t.type==="throw")throw t.arg;return t.type==="break"||t.type==="continue"?this.next=t.arg:t.type==="return"?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):t.type==="normal"&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),h(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var a=r.completion;if(a.type==="throw"){var n=a.arg;h(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:w(t),resultName:e,nextLoc:r},this.method==="next"&&(this.arg=g),v}},s}(o.exports);try{regeneratorRuntime=f}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=f:Function("r","regeneratorRuntime = r")(f)}})(ae);var se={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}},fe=(o,f)=>{const s=o._malloc(f.length*Uint32Array.BYTES_PER_ELEMENT);return f.forEach((l,c)=>{const u=o.lengthBytesUTF8(l)+1,g=o._malloc(u);o.stringToUTF8(l,g,u),o.setValue(s+Uint32Array.BYTES_PER_ELEMENT*c,g,"i32")}),[f.length,s]};const ce="@ffmpeg/ffmpeg",le="0.11.6",ue="FFmpeg WebAssembly version",pe="src/index.js",he="src/index.d.ts",de={example:"examples"},me={start:"node scripts/server.js","start:worker":"node scripts/worker-server.js",build:"rimraf dist && webpack --config scripts/webpack.config.prod.js","build:worker":"rimraf dist && webpack --config scripts/webpack.config.worker.prod.js",prepublishOnly:"npm run build",lint:"eslint src",wait:"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js",test:"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node node_modules/mocha/bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},ge={"./src/node/index.js":"./src/browser/index.js"},ve={type:"git",url:"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},we=["ffmpeg","WebAssembly","video"],ye="Jerome Wu <jeromewus@gmail.com>",be="MIT",Fe={url:"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},Ee={node:">=12.16.1"},je="https://github.com/ffmpegwasm/ffmpeg.wasm#readme",Le={"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},Oe={"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.11.0","@types/emscripten":"^1.39.4","babel-eslint":"^10.1.0","babel-loader":"^8.1.0",chai:"^4.2.0",cors:"^2.8.5",eslint:"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1",express:"^4.17.1",mocha:"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.3.0",webpack:"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"},te={name:ce,version:le,description:ue,main:pe,types:he,directories:de,scripts:me,browser:ge,repository:ve,keywords:we,author:ye,license:be,bugs:Fe,engines:Ee,homepage:je,dependencies:Le,devDependencies:Oe},Pe=(typeof process<"u",`https://unpkg.com/@ffmpeg/core@${te.devDependencies["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`),Se={corePath:Pe};let K=!1,re=()=>{};const ke=o=>{K=o},_e=o=>{re=o},$e=(o,f)=>{re({type:o,message:f}),K&&console.log(`[${o}] ${f}`)};var A={logging:K,setLogging:ke,setCustomLogger:_e,log:$e};const Ce=o=>`
createFFmpegCore is not defined. ffmpeg.wasm is unable to find createFFmpegCore after loading ffmpeg-core.js from ${o}. Use another URL when calling createFFmpeg():

const ffmpeg = createFFmpeg({
  corePath: 'http://localhost:3000/ffmpeg-core.js',
});
`;var X={CREATE_FFMPEG_CORE_IS_NOT_DEFINED:Ce};const I=async(o,f)=>{A.log("info",`fetch ${o}`);const s=await(await fetch(o)).arrayBuffer();A.log("info",`${o} file size = ${s.byteLength} bytes`);const l=new Blob([s],{type:f}),c=URL.createObjectURL(l);return A.log("info",`${o} blob URL = ${c}`),c},Te=async({corePath:o,workerPath:f,wasmPath:s})=>{if(typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope){if(typeof o!="string")throw Error("corePath should be a string!");const y=new URL(o,import.meta.url).href,m=await I(y,"application/javascript"),O=await I(s!==void 0?s:y.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),_=await I(f!==void 0?f:y.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return typeof createFFmpegCore>"u"?new Promise(b=>{if(globalThis.importScripts(m),typeof createFFmpegCore>"u")throw Error(X.CREATE_FFMPEG_CORE_IS_NOT_DEFINED(y));A.log("info","ffmpeg-core.js script loaded"),b({createFFmpegCore,corePath:m,wasmPath:O,workerPath:_})}):(A.log("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:m,wasmPath:O,workerPath:_}))}if(typeof o!="string")throw Error("corePath should be a string!");const l=new URL(o,import.meta.url).href,c=await I(l,"application/javascript"),u=await I(s!==void 0?s:l.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),g=await I(f!==void 0?f:l.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return typeof createFFmpegCore>"u"?new Promise(y=>{const m=document.createElement("script"),O=()=>{if(m.removeEventListener("load",O),typeof createFFmpegCore>"u")throw Error(X.CREATE_FFMPEG_CORE_IS_NOT_DEFINED(l));A.log("info","ffmpeg-core.js script loaded"),y({createFFmpegCore,corePath:c,wasmPath:u,workerPath:g})};m.src=c,m.type="text/javascript",m.addEventListener("load",O),document.getElementsByTagName("head")[0].appendChild(m)}):(A.log("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:c,wasmPath:u,workerPath:g}))},Re=o=>new Promise((f,s)=>{const l=new FileReader;l.onload=()=>{f(l.result)},l.onerror=({target:{error:{code:c}}})=>{s(Error(`File could not be read! Code=${c}`))},l.readAsArrayBuffer(o)}),Ae=async o=>{let f=o;return typeof o>"u"?new Uint8Array:(typeof o=="string"?/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(o)?f=atob(o.split(",")[1]).split("").map(s=>s.charCodeAt(0)):f=await(await fetch(new URL(o,import.meta.url).href)).arrayBuffer():(o instanceof File||o instanceof Blob)&&(f=await Re(o)),new Uint8Array(f))},Ge=Object.freeze(Object.defineProperty({__proto__:null,defaultOptions:Se,fetchFile:Ae,getCreateFFmpegCore:Te},Symbol.toStringTag,{value:"Module"})),oe=ie(Ge),{defaultArgs:Ne,baseOptions:Ue}=se,Me=fe,{defaultOptions:De,getCreateFFmpegCore:Ie}=oe,{version:We}=te,Z=Error("ffmpeg.wasm is not ready, make sure you have completed load().");var Be=(o={})=>{const{log:f,logger:s,progress:l,...c}={...Ue,...De,...o};let u=null,g=null,y=null,m=null,O=!1,_=()=>{},b=f,W=l,S=0,C=0,B=!1,T=0;const G=i=>{i==="FFMPEG_END"&&y!==null&&(y(),y=null,m=null,O=!1)},v=(i,h)=>{_({type:i,message:h}),b&&console.log(`[${i}] ${h}`)},N=i=>{const[h,d,w]=i.split(":");return parseFloat(h)*60*60+parseFloat(d)*60+parseFloat(w)},U=(i,h)=>{if(typeof i=="string")if(i.startsWith("  Duration")){const d=i.split(", ")[0].split(": ")[1],w=N(d);h({duration:w,ratio:T}),(S===0||S>w)&&(S=w,B=!0)}else if(B&&i.startsWith("    Stream")){const d=i.match(/([\d.]+) fps/);if(d){const w=parseFloat(d[1]);C=S*w}else C=0;B=!1}else if(i.startsWith("frame")||i.startsWith("size")){const d=i.split("time=")[1].split(" ")[0],w=N(d),F=i.match(/frame=\s*(\d+)/);if(C&&F){const t=parseFloat(F[1]);T=Math.min(t/C,1)}else T=w/S;h({ratio:T,time:w})}else i.startsWith("video:")&&(h({ratio:1}),S=0)},k=({type:i,message:h})=>{v(i,h),U(h,W),G(h)},x=async()=>{if(v("info","load ffmpeg-core"),u===null){v("info","loading ffmpeg-core");const{createFFmpegCore:i,corePath:h,workerPath:d,wasmPath:w}=await Ie(c);u=await i({mainScriptUrlOrBlob:h,printErr:F=>k({type:"fferr",message:F}),print:F=>k({type:"ffout",message:F}),locateFile:(F,t)=>{if(typeof window<"u"||typeof WorkerGlobalScope<"u"){if(typeof w<"u"&&F.endsWith("ffmpeg-core.wasm"))return w;if(typeof d<"u"&&F.endsWith("ffmpeg-core.worker.js"))return d}return t+F}}),g=u.cwrap(c.mainName||"proxy_main","number",["number","number"]),v("info","ffmpeg-core loaded")}else throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.")},z=()=>u!==null,M=(...i)=>{if(v("info",`run ffmpeg command: ${i.join(" ")}`),u===null)throw Z;if(O)throw Error("ffmpeg.wasm can only run one command at a time");return O=!0,new Promise((h,d)=>{const w=[...Ne,...i].filter(F=>F.length!==0);y=h,m=d,g(...Me(u,w))})},$=(i,...h)=>{if(v("info",`run FS.${i} ${h.map(d=>typeof d=="string"?d:`<${d.length} bytes binary file>`).join(" ")}`),u===null)throw Z;{let d=null;try{d=u.FS[i](...h)}catch{throw Error(i==="readdir"?`ffmpeg.FS('readdir', '${h[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`:i==="readFile"?`ffmpeg.FS('readFile', '${h[0]}') error. Check if the path exists`:"Oops, something went wrong in FS operation.")}return d}},q=()=>{if(u===null)throw Z;m&&m("ffmpeg has exited"),O=!1;try{u.exit(1)}catch(i){v(i.message),m&&m(i)}finally{u=null,g=null,y=null,m=null}},D=i=>{W=i},J=i=>{_=i},H=i=>{b=i};return v("info",`use ffmpeg.wasm v${We}`),{setProgress:D,setLogger:J,setLogging:H,load:x,isLoaded:z,run:M,exit:q,FS:$}};const xe=Be,{fetchFile:ze}=oe;var ee={createFFmpeg:xe,fetchFile:ze};const Ye=ne({__proto__:null,default:ee},[ee]);export{Ye as i};
