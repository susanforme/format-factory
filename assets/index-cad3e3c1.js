import{Q as ne}from"./element-plus-ef65c4b8.js";function ie(n,f){for(var s=0;s<f.length;s++){const u=f[s];if(typeof u!="string"&&!Array.isArray(u)){for(const l in u)if(l!=="default"&&!(l in n)){const p=Object.getOwnPropertyDescriptor(u,l);p&&Object.defineProperty(n,l,p.get?p:{enumerable:!0,get:()=>u[l]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var K={},ae={get exports(){return K},set exports(n){K=n}};(function(n){var f=function(s){var u=Object.prototype,l=u.hasOwnProperty,p=Object.defineProperty||function(t,e,r){t[e]=r.value},g,y=typeof Symbol=="function"?Symbol:{},m=y.iterator||"@@iterator",S=y.asyncIterator||"@@asyncIterator",_=y.toStringTag||"@@toStringTag";function b(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{b({},"")}catch{b=function(e,r,a){return e[r]=a}}function W(t,e,r,a){var o=e&&e.prototype instanceof N?e:N,c=Object.create(o.prototype),E=new d(a||[]);return p(c,"_invoke",{value:J(t,r,E)}),c}s.wrap=W;function k(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(a){return{type:"throw",arg:a}}}var C="suspendedStart",B="suspendedYield",T="executing",G="completed",w={};function N(){}function U(){}function P(){}var x={};b(x,m,function(){return this});var z=Object.getPrototypeOf,D=z&&z(z(v([])));D&&D!==u&&l.call(D,m)&&(x=D);var $=P.prototype=N.prototype=Object.create(x);U.prototype=P,p($,"constructor",{value:P,configurable:!0}),p(P,"constructor",{value:U,configurable:!0}),U.displayName=b(P,_,"GeneratorFunction");function q(t){["next","throw","return"].forEach(function(e){b(t,e,function(r){return this._invoke(e,r)})})}s.isGeneratorFunction=function(t){var e=typeof t=="function"&&t.constructor;return e?e===U||(e.displayName||e.name)==="GeneratorFunction":!1},s.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,P):(t.__proto__=P,b(t,_,"GeneratorFunction")),t.prototype=Object.create($),t},s.awrap=function(t){return{__await:t}};function I(t,e){function r(c,E,j,O){var L=k(t[c],t,E);if(L.type==="throw")O(L.arg);else{var Q=L.arg,Y=Q.value;return Y&&typeof Y=="object"&&l.call(Y,"__await")?e.resolve(Y.__await).then(function(R){r("next",R,j,O)},function(R){r("throw",R,j,O)}):e.resolve(Y).then(function(R){Q.value=R,j(Q)},function(R){return r("throw",R,j,O)})}}var a;function o(c,E){function j(){return new e(function(O,L){r(c,E,O,L)})}return a=a?a.then(j,j):j()}p(this,"_invoke",{value:o})}q(I.prototype),b(I.prototype,S,function(){return this}),s.AsyncIterator=I,s.async=function(t,e,r,a,o){o===void 0&&(o=Promise);var c=new I(W(t,e,r,a),o);return s.isGeneratorFunction(e)?c:c.next().then(function(E){return E.done?E.value:c.next()})};function J(t,e,r){var a=C;return function(c,E){if(a===T)throw new Error("Generator is already running");if(a===G){if(c==="throw")throw E;return F()}for(r.method=c,r.arg=E;;){var j=r.delegate;if(j){var O=H(j,r);if(O){if(O===w)continue;return O}}if(r.method==="next")r.sent=r._sent=r.arg;else if(r.method==="throw"){if(a===C)throw a=G,r.arg;r.dispatchException(r.arg)}else r.method==="return"&&r.abrupt("return",r.arg);a=T;var L=k(t,e,r);if(L.type==="normal"){if(a=r.done?G:B,L.arg===w)continue;return{value:L.arg,done:r.done}}else L.type==="throw"&&(a=G,r.method="throw",r.arg=L.arg)}}}function H(t,e){var r=e.method,a=t.iterator[r];if(a===g)return e.delegate=null,r==="throw"&&t.iterator.return&&(e.method="return",e.arg=g,H(t,e),e.method==="throw")||r!=="return"&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),w;var o=k(a,t.iterator,e.arg);if(o.type==="throw")return e.method="throw",e.arg=o.arg,e.delegate=null,w;var c=o.arg;if(!c)return e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,w;if(c.done)e[t.resultName]=c.value,e.next=t.nextLoc,e.method!=="return"&&(e.method="next",e.arg=g);else return c;return e.delegate=null,w}q($),b($,_,"Generator"),b($,m,function(){return this}),b($,"toString",function(){return"[object Generator]"});function i(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function h(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function d(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(i,this),this.reset(!0)}s.keys=function(t){var e=Object(t),r=[];for(var a in e)r.push(a);return r.reverse(),function o(){for(;r.length;){var c=r.pop();if(c in e)return o.value=c,o.done=!1,o}return o.done=!0,o}};function v(t){if(t){var e=t[m];if(e)return e.call(t);if(typeof t.next=="function")return t;if(!isNaN(t.length)){var r=-1,a=function o(){for(;++r<t.length;)if(l.call(t,r))return o.value=t[r],o.done=!1,o;return o.value=g,o.done=!0,o};return a.next=a}}return{next:F}}s.values=v;function F(){return{value:g,done:!0}}return d.prototype={constructor:d,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=g,this.done=!1,this.delegate=null,this.method="next",this.arg=g,this.tryEntries.forEach(h),!t)for(var e in this)e.charAt(0)==="t"&&l.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=g)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if(e.type==="throw")throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(O,L){return c.type="throw",c.arg=t,e.next=O,L&&(e.method="next",e.arg=g),!!L}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if(o.tryLoc==="root")return r("end");if(o.tryLoc<=this.prev){var E=l.call(o,"catchLoc"),j=l.call(o,"finallyLoc");if(E&&j){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(E){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else if(j){if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&l.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&(t==="break"||t==="continue")&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,w):this.complete(c)},complete:function(t,e){if(t.type==="throw")throw t.arg;return t.type==="break"||t.type==="continue"?this.next=t.arg:t.type==="return"?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):t.type==="normal"&&e&&(this.next=e),w},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),h(r),w}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var a=r.completion;if(a.type==="throw"){var o=a.arg;h(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:v(t),resultName:e,nextLoc:r},this.method==="next"&&(this.arg=g),w}},s}(n.exports);try{regeneratorRuntime=f}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=f:Function("r","regeneratorRuntime = r")(f)}})(ae);var se={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}},fe=(n,f)=>{const s=n._malloc(f.length*Uint32Array.BYTES_PER_ELEMENT);return f.forEach((u,l)=>{const p=n.lengthBytesUTF8(u)+1,g=n._malloc(p);n.stringToUTF8(u,g,p),n.setValue(s+Uint32Array.BYTES_PER_ELEMENT*l,g,"i32")}),[f.length,s]};const ce="@ffmpeg/ffmpeg",le="0.11.6",pe="FFmpeg WebAssembly version",ue="src/index.js",he="src/index.d.ts",de={example:"examples"},me={start:"node scripts/server.js","start:worker":"node scripts/worker-server.js",build:"rimraf dist && webpack --config scripts/webpack.config.prod.js","build:worker":"rimraf dist && webpack --config scripts/webpack.config.worker.prod.js",prepublishOnly:"npm run build",lint:"eslint src",wait:"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js",test:"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node node_modules/mocha/bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},ge={"./src/node/index.js":"./src/browser/index.js"},we={type:"git",url:"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},ve=["ffmpeg","WebAssembly","video"],ye="Jerome Wu <jeromewus@gmail.com>",be="MIT",Fe={url:"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},Ee={node:">=12.16.1"},je="https://github.com/ffmpegwasm/ffmpeg.wasm#readme",Le={"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},Se={"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.11.0","@types/emscripten":"^1.39.4","babel-eslint":"^10.1.0","babel-loader":"^8.1.0",chai:"^4.2.0",cors:"^2.8.5",eslint:"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1",express:"^4.17.1",mocha:"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.3.0",webpack:"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"},te={name:ce,version:le,description:pe,main:ue,types:he,directories:de,scripts:me,browser:ge,repository:we,keywords:ve,author:ye,license:be,bugs:Fe,engines:Ee,homepage:je,dependencies:Le,devDependencies:Se},Oe=(typeof process<"u",`https://unpkg.com/@ffmpeg/core@${te.devDependencies["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`),ke={corePath:Oe};let Z=!1,re=()=>{};const Pe=n=>{Z=n},_e=n=>{re=n},$e=(n,f)=>{re({type:n,message:f}),Z&&console.log(`[${n}] ${f}`)};var A={logging:Z,setLogging:Pe,setCustomLogger:_e,log:$e};const Ce=n=>`
createFFmpegCore is not defined. ffmpeg.wasm is unable to find createFFmpegCore after loading ffmpeg-core.js from ${n}. Use another URL when calling createFFmpeg():

const ffmpeg = createFFmpeg({
  corePath: 'http://localhost:3000/ffmpeg-core.js',
});
`;var X={CREATE_FFMPEG_CORE_IS_NOT_DEFINED:Ce};const M=async(n,f)=>{A.log("info",`fetch ${n}`);const s=await(await fetch(n)).arrayBuffer();A.log("info",`${n} file size = ${s.byteLength} bytes`);const u=new Blob([s],{type:f}),l=URL.createObjectURL(u);return A.log("info",`${n} blob URL = ${l}`),l},Te=async({corePath:n,workerPath:f,wasmPath:s})=>{if(typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope){if(typeof n!="string")throw Error("corePath should be a string!");const y=new URL(n,import.meta.url).href,m=await M(y,"application/javascript"),S=await M(s!==void 0?s:y.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),_=await M(f!==void 0?f:y.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return typeof createFFmpegCore>"u"?new Promise(b=>{if(globalThis.importScripts(m),typeof createFFmpegCore>"u")throw Error(X.CREATE_FFMPEG_CORE_IS_NOT_DEFINED(y));A.log("info","ffmpeg-core.js script loaded"),b({createFFmpegCore,corePath:m,wasmPath:S,workerPath:_})}):(A.log("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:m,wasmPath:S,workerPath:_}))}if(typeof n!="string")throw Error("corePath should be a string!");const u=new URL(n,import.meta.url).href,l=await M(u,"application/javascript"),p=await M(s!==void 0?s:u.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),g=await M(f!==void 0?f:u.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return typeof createFFmpegCore>"u"?new Promise(y=>{const m=document.createElement("script"),S=()=>{if(m.removeEventListener("load",S),typeof createFFmpegCore>"u")throw Error(X.CREATE_FFMPEG_CORE_IS_NOT_DEFINED(u));A.log("info","ffmpeg-core.js script loaded"),y({createFFmpegCore,corePath:l,wasmPath:p,workerPath:g})};m.src=l,m.type="text/javascript",m.addEventListener("load",S),document.getElementsByTagName("head")[0].appendChild(m)}):(A.log("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:l,wasmPath:p,workerPath:g}))},Re=n=>new Promise((f,s)=>{const u=new FileReader;u.onload=()=>{f(u.result)},u.onerror=({target:{error:{code:l}}})=>{s(Error(`File could not be read! Code=${l}`))},u.readAsArrayBuffer(n)}),Ae=async n=>{let f=n;return typeof n>"u"?new Uint8Array:(typeof n=="string"?/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(n)?f=atob(n.split(",")[1]).split("").map(s=>s.charCodeAt(0)):f=await(await fetch(new URL(n,import.meta.url).href)).arrayBuffer():(n instanceof File||n instanceof Blob)&&(f=await Re(n)),new Uint8Array(f))},Ge=Object.freeze(Object.defineProperty({__proto__:null,defaultOptions:ke,fetchFile:Ae,getCreateFFmpegCore:Te},Symbol.toStringTag,{value:"Module"})),oe=ne(Ge),{defaultArgs:Ne,baseOptions:Ue}=se,De=fe,{defaultOptions:Ie,getCreateFFmpegCore:Me}=oe,{version:We}=te,V=Error("ffmpeg.wasm is not ready, make sure you have completed load().");var Be=(n={})=>{const{log:f,logger:s,progress:u,...l}={...Ue,...Ie,...n};let p=null,g=null,y=null,m=null,S=!1,_=()=>{},b=f,W=u,k=0,C=0,B=!1,T=0;const G=i=>{i==="FFMPEG_END"&&y!==null&&(y(),y=null,m=null,S=!1)},w=(i,h)=>{_({type:i,message:h}),b&&console.log(`[${i}] ${h}`)},N=i=>{const[h,d,v]=i.split(":");return parseFloat(h)*60*60+parseFloat(d)*60+parseFloat(v)},U=(i,h)=>{if(typeof i=="string")if(i.startsWith("  Duration")){const d=i.split(", ")[0].split(": ")[1],v=N(d);h({duration:v,ratio:T}),(k===0||k>v)&&(k=v,B=!0)}else if(B&&i.startsWith("    Stream")){const d=i.match(/([\d.]+) fps/);if(d){const v=parseFloat(d[1]);C=k*v}else C=0;B=!1}else if(i.startsWith("frame")||i.startsWith("size")){const d=i.split("time=")[1].split(" ")[0],v=N(d),F=i.match(/frame=\s*(\d+)/);if(C&&F){const t=parseFloat(F[1]);T=Math.min(t/C,1)}else T=v/k;h({ratio:T,time:v})}else i.startsWith("video:")&&(h({ratio:1}),k=0)},P=({type:i,message:h})=>{w(i,h),U(h,W),G(h)},x=async()=>{if(w("info","load ffmpeg-core"),p===null){w("info","loading ffmpeg-core");const{createFFmpegCore:i,corePath:h,workerPath:d,wasmPath:v}=await Me(l);p=await i({mainScriptUrlOrBlob:h,printErr:F=>P({type:"fferr",message:F}),print:F=>P({type:"ffout",message:F}),locateFile:(F,t)=>{if(typeof window<"u"||typeof WorkerGlobalScope<"u"){if(typeof v<"u"&&F.endsWith("ffmpeg-core.wasm"))return v;if(typeof d<"u"&&F.endsWith("ffmpeg-core.worker.js"))return d}return t+F}}),g=p.cwrap(l.mainName||"proxy_main","number",["number","number"]),w("info","ffmpeg-core loaded")}else throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.")},z=()=>p!==null,D=(...i)=>{if(w("info",`run ffmpeg command: ${i.join(" ")}`),p===null)throw V;if(S)throw Error("ffmpeg.wasm can only run one command at a time");return S=!0,new Promise((h,d)=>{const v=[...Ne,...i].filter(F=>F.length!==0);y=h,m=d,g(...De(p,v))})},$=(i,...h)=>{if(w("info",`run FS.${i} ${h.map(d=>typeof d=="string"?d:`<${d.length} bytes binary file>`).join(" ")}`),p===null)throw V;{let d=null;try{d=p.FS[i](...h)}catch{throw Error(i==="readdir"?`ffmpeg.FS('readdir', '${h[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`:i==="readFile"?`ffmpeg.FS('readFile', '${h[0]}') error. Check if the path exists`:"Oops, something went wrong in FS operation.")}return d}},q=()=>{if(p===null)throw V;m&&m("ffmpeg has exited"),S=!1;try{p.exit(1)}catch(i){w(i.message),m&&m(i)}finally{p=null,g=null,y=null,m=null}},I=i=>{W=i},J=i=>{_=i},H=i=>{b=i};return w("info",`use ffmpeg.wasm v${We}`),{setProgress:I,setLogger:J,setLogging:H,load:x,isLoaded:z,run:D,exit:q,FS:$}};const xe=Be,{fetchFile:ze}=oe;var ee={createFFmpeg:xe,fetchFile:ze};const qe=ie({__proto__:null,default:ee},[ee]);export{qe as i};
