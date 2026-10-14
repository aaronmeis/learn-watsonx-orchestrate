/* Lightbox for Architecture diagrams: click opens a pop-up, arrows/swipe cycle, Esc closes. No dependencies. */
(function(){
"use strict";
let box,img,cap,full,idx=0,items=[],lastFocus=null,x0=null;
function build(){
 box=document.createElement("div");box.className="lb";box.hidden=true;
 box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-label","Diagram viewer");
 box.innerHTML='<div class="lb-inner"><button type="button" class="lb-x" aria-label="Close">×</button>'+
  '<button type="button" class="lb-prev" aria-label="Previous diagram">‹</button>'+
  '<figure class="lb-fig"><img alt=""><figcaption><span class="lb-cap"></span> <span class="lb-n"></span> · <a class="lb-full" target="_blank" rel="noopener">Open full-size</a></figcaption></figure>'+
  '<button type="button" class="lb-next" aria-label="Next diagram">›</button></div>';
 document.body.appendChild(box);
 img=box.querySelector("img");cap=box.querySelector(".lb-cap");full=box.querySelector(".lb-full");
 box.addEventListener("click",e=>{
  if(e.target===box||e.target.closest(".lb-x"))close();
  else if(e.target.closest(".lb-prev"))go(-1);
  else if(e.target.closest(".lb-next"))go(1);});
 box.addEventListener("touchstart",e=>{x0=e.touches[0].clientX;},{passive:true});
 box.addEventListener("touchend",e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40)go(dx<0?1:-1);});
}
function show(){const a=items[idx];img.src=a.dataset.lbSrc;img.alt=a.querySelector("img").alt;
 cap.textContent=a.dataset.lbCap;box.querySelector(".lb-n").textContent="("+(idx+1)+" of "+items.length+")";full.href=a.href;}
function go(d){idx=(idx+d+items.length)%items.length;show();}
function open(a){if(!box)build();items=Array.from(document.querySelectorAll("a[data-lb]"));idx=Math.max(0,items.indexOf(a));
 lastFocus=a;show();box.hidden=false;document.body.classList.add("lb-open");box.querySelector(".lb-x").focus();}
function close(){box.hidden=true;document.body.classList.remove("lb-open");img.removeAttribute("src");if(lastFocus)lastFocus.focus();}
document.addEventListener("click",e=>{const a=e.target.closest("a[data-lb]");if(!a||e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();e.stopPropagation();open(a);},true);
document.addEventListener("keydown",e=>{if(!box||box.hidden)return;
 if(e.key==="Escape"){e.preventDefault();close();}else if(e.key==="ArrowRight"){e.preventDefault();go(1);}else if(e.key==="ArrowLeft"){e.preventDefault();go(-1);}
 else if(e.key==="Tab"){const f=Array.from(box.querySelectorAll("button,a[href]"));const i=f.indexOf(document.activeElement);
  if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus();}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus();}}});
window.addEventListener("hashchange",()=>{if(box&&!box.hidden)close();});
})();
