(()=>{const e=document.createElement("DIV"),t=document.createElement("DIV"),n=(document.createElement("INPUT"),document.createElement("DIV")),s=document.createElement("DIV"),r=document.createElement("DIV");let a="",i=!1;function c(){document.querySelector("body").removeChild(e),i=!1}e.classList.add("ext-main"),t.id="ext-name",n.id="ext-btn",s.id="ext-btn",r.id="ext-unit",n.innerHTML="Search",s.innerHTML="Copy",e.appendChild(t),e.appendChild(s),e.appendChild(n),setTimeout((()=>{!async function(){await fetch("https://www.floatrates.com/daily/eur.json").then((e=>e.json())).then((e=>{chrome.storage.local.set({fiatCurrencies:e})}))}()}),1e3),setTimeout((()=>{chrome.runtime.sendMessage({message:"get_fiat"},(e=>{e.message}))}),12e3),document.onkeydown=e=>{e.key&&i&&c()},document.addEventListener("mouseup",(t=>{let n={x:t.pageX+"px",y:t.pageY+30+"px"};e.style.top=n.y,e.style.left=n.x;let s=window.getSelection().toString();s=s.trim(),0===s.length&&i&&c(),function(t,n){let o="",m="",u={},d=/^[0-9]+$/,l=!0;t=t.trim();for(let e=0;e<t.length;e++)d.test(t[0])?d.test(t[e])&&(m=m.concat("",t[e]),l=!1):l=!0,l?u={}:(o=t.slice(m.length,t.length).trim(),u={number:m,unit:o,conversionRate:.69});u=function(e,t){let n,s={};!function(e,t){let n={isCurrency:!1,conversionRate:.2,currency:e};chrome.runtime.sendMessage({message:"get_fiat"},(s=>{"success"===s.message&&(n.isCurrency=e in s.payload,n.isCurrency?(n.conversionRate=s.payload[e].inverseRate,t(n)):t(n))}))}(e.unit,(r=>{switch(r.isCurrency&&(e.unit="currency"),e.unit){case"inch":n=2.54*e.number,s={number:n.toFixed(2),unit:"cm"};break;case"mile":case"miles":n=1.609344*e.number,s={number:n.toFixed(2),unit:"km"};break;case"F":n=(e.number-32)/1.8,s={number:n.toFixed(1),unit:"°C"};break;case"oz":n=28.34952*e.number,s={number:n.toFixed(1),unit:"g"};break;case"currency":n=e.number*r.conversionRate,s={number:n.toFixed(2),unit:"eur"};break;default:s={}}t(s)}))}(u,(t=>{var n;n=t,s.length>0&&s!==a?(chrome.storage.local.set({name:s}),i=!0,document.querySelector("body").appendChild(e)):(null!==document.getElementById("ext-name")&&s===a&&c(),i=!1),0!==Object.entries(n).length?(r.innerHTML=`${n.number} ${n.unit}`,e.appendChild(r)):null!==document.getElementById(r.id)&&0===Object.entries(n).length&&e.removeChild(r),a=s}))}(s)})),s.addEventListener("mousedown",(()=>{chrome.runtime.sendMessage({message:"get_name"},(e=>{if("success"===e.message){let t=e.payload;navigator.clipboard.writeText(t).then((()=>{}))}}))})),n.addEventListener("mousedown",(()=>{chrome.runtime.sendMessage({message:"get_name"},(e=>{"success"===e.message&&(chrome.runtime.sendMessage({message:"open_url",payload:e.payload},(e=>{})),c())}))}))})();