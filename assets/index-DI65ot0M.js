(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Te={"nav.home":"Home","nav.projects":"Projects","nav.game":"Game","nav.about":"About","nav.support":"Support","hero.name":"Daived","hero.subtitle":"Software Engineer & Security Researcher","hero.phrase1":"Software Engineer & Security Researcher","hero.phrase2":"Malware Analyst","hero.phrase3":"Reverse Engineer","hero.phrase4":"Open-Source Developer","social.instagram":"Instagram","social.snapchat":"Snapchat","social.github":"GitHub","social.discord":"Discord","social.telegram":"Telegram","projects.title":"My Projects","projects.loading":"Loading projects...","projects.error":"Failed to load projects. Check back later.","projects.open":"Open on GitHub","projects.stars":"stars","projects.forks":"forks","game.title":"Tower Bloxx Challenge","game.instructions":"Tap to drop blocks and build the tallest tower!","game.name_prompt":"Enter your name to play","game.name_placeholder":"Your name","game.start":"Start Game","game.game_over":"Game Over","game.score":"Score","game.high_score":"New High Score!","game.play_again":"Play Again","game.back_home":"Back to Home","game.leaderboard":"Leaderboard","game.no_scores":"No scores yet. Be the first!","about.title":"About Me","about.skills_title":"Skills","about.bio_title":"Bio","skill.python":"Python","skill.csharp":"C#","skill.cpp":"C++","skill.re":"Reverse Engineering","skill.go":"Go","skill.web":"Web Development","skill.asm":"Assembly","skill.malware":"Malware Analysis","skill.network":"Network Security","skill.api":"API Development","bio.line1":"// Professional programmer since 2013","bio.line2":"const origin = 'Iraq';","bio.line3":"const role = 'Software Engineer & Security Researcher';","bio.line4":"// Founder of a private Security Research company","bio.line5":"const expertise = ['Malware Analysis', 'Reverse Engineering'];","bio.line6":"// Passionate about building innovative tools","timeline.2013":"Started the programming journey","timeline.2016":"Specialized in cybersecurity","timeline.2019":"Founded a Security Research company","timeline.2021":"Open-source projects & community","timeline.2024":"Advanced reverse engineering expertise","support.title":"Support My Work","support.button":"Support Me","support.message":"Your support helps me build more awesome projects!","support.wallet_label":"USDT Wallet Address","support.network":"Network: TRC20","support.copy":"Copy Address","support.copied":"Copied!"},Be={"nav.home":"الرئيسية","nav.projects":"المشاريع","nav.game":"اللعبة","nav.about":"حول","nav.support":"الدعم","hero.name":"Daived","hero.subtitle":"مهندس برمجيات وباحث أمني","hero.phrase1":"مهندس برمجيات وباحث أمني","hero.phrase2":"محلل برمجيات خبيثة","hero.phrase3":"مهندس هندسة عكسية","hero.phrase4":"مطور مفتوح المصدر","social.instagram":"انستغرام","social.snapchat":"سناب شات","social.github":"قيثاب","social.discord":"ديسكورد","social.telegram":"تيليغرام","projects.title":"مشاريعي","projects.loading":"جاري تحميل المشاريع...","projects.error":"فشل تحميل المشاريع. حاول لاحقاً.","projects.open":"افتح في قيثاب","projects.stars":"نجوم","projects.forks":"تفرعات","game.title":"تحدي برج البلوكات","game.instructions":"انقر لإسقاط البلوكات وابنِ أطول برج!","game.name_prompt":"أدخل اسمك للعب","game.name_placeholder":"اسمك","game.start":"ابدأ اللعبة","game.game_over":"انتهت اللعبة","game.score":"النتيجة","game.high_score":"رقم قياسي جديد!","game.play_again":"العب مجدداً","game.back_home":"العودة للرئيسية","game.leaderboard":"لوحة المتصدرين","game.no_scores":"لا توجد نتائج بعد. كن الأول!","about.title":"حول","about.skills_title":"المهارات","about.bio_title":"السيرة الذاتية","skill.python":"بايثون","skill.csharp":"C#","skill.cpp":"C++","skill.re":"الهندسة العكسية","skill.go":"Go","skill.web":"تطوير الويب","skill.asm":"لغة التجميع","skill.malware":"تحليل البرمجيات الخبيثة","skill.network":"أمن الشبكات","skill.api":"تطوير واجهات برمجية","bio.line1":"// مبرمج محترف منذ عام 2013","bio.line2":"const الموطن = 'العراق';","bio.line3":"const الدور = 'مهندس برمجيات وباحث أمني';","bio.line4":"// مؤسس شركة خاصة للبحث الأمني","bio.line5":"const الخبرة = ['تحليل البرمجيات الخبيثة', 'الهندسة العكسية'];","bio.line6":"// شغف بالتعلم المستمر وبناء أدوات مبتكرة","timeline.2013":"بداية رحلة البرمجة","timeline.2016":"التخصص في الأمن السيبراني","timeline.2019":"تأسيس شركة البحث الأمني","timeline.2021":"مشاريع مفتوحة المصدر","timeline.2024":"خبرات متقدمة في الهندسة العكسية","support.title":"ادعم عملي","support.button":"ادعمني","support.message":"دعمك يساعدني على بناء مشاريع أكثر إبداعاً!","support.wallet_label":"عنوان محفظة USDT","support.network":"الشبكة: TRC20","support.copy":"نسخ العنوان","support.copied":"تم النسخ!"},fe="daived-lang",R={en:Te,ar:Be};let x=localStorage.getItem(fe)||"en",k=R[x]||R.en;function ye(){document.querySelectorAll("[data-i18n]").forEach(n=>{const o=n.dataset.i18n;k[o]!==void 0&&(n.textContent=k[o])}),document.querySelectorAll("[data-i18n-placeholder]").forEach(n=>{const o=n.dataset.i18nPlaceholder;k[o]!==void 0&&(n.placeholder=k[o])});const e=x==="ar";document.documentElement.dir=e?"rtl":"ltr",document.documentElement.lang=x;const t=document.getElementById("lang-toggle");t&&(t.querySelector(".lang-current").textContent=x.toUpperCase(),t.setAttribute("aria-label",`Switch to ${e?"English":"Arabic"}`))}function Ce(e){x=e,k=R[e]||R.en,localStorage.setItem(fe,e),document.body.classList.add("lang-transition"),ye(),document.dispatchEvent(new CustomEvent("langchange")),setTimeout(()=>document.body.classList.remove("lang-transition"),300)}function d(e){return k[e]??e}function _e(){return x}function Re(){ye()}const ee=["{","}","<",">","/",";","=>","()","[]","::","#","&&","||"],qe=200,te=.12,Oe=38,ne=Oe/2;let p=null,L=null,ve=0,be=0,F=0,z=0;function je(){if(window.matchMedia("(hover: none)").matches||(p=document.getElementById("cursor"),!p))return;L=document.createElement("span"),L.className="cursor-symbol",L.textContent="{",p.appendChild(L),p.style.display="block",document.documentElement.classList.add("custom-cursor");let e=0;setInterval(()=>{e=(e+1)%ee.length,L.textContent=ee[e]},qe),window.addEventListener("mousemove",He),window.addEventListener("mousedown",Pe),window.addEventListener("mouseup",Ne),document.addEventListener("mouseover",De),document.addEventListener("mouseleave",()=>{p.style.opacity="0"}),document.addEventListener("mouseenter",()=>{p.style.opacity="1"}),requestAnimationFrame(we)}function He(e){ve=e.clientX-ne,be=e.clientY-ne}function Pe(){p.classList.add("cursor-click"),p.classList.remove("cursor-hover")}function Ne(){p.classList.remove("cursor-click")}function De(e){if(p.classList.contains("cursor-click"))return;const t=e.target.closest('a, button, input, textarea, select, [role="button"], [tabindex]');p.classList.toggle("cursor-hover",!!t)}function we(){F+=(ve-F)*te,z+=(be-z)*te,p.style.transform=`translate(${F}px, ${z}px)`,requestAnimationFrame(we)}const oe=["0","1","{","}","<",">","/",";","#","(",")"],Fe=90,G=110,B=130,re=2.5;let $=null,u=null,h=[],q={x:-9999,y:-9999},w=null,I=0,O=0;class ze{constructor(t=!1){this.init(t)}init(t=!1){this.x=Math.random()*I,this.y=t?Math.random()*O:O+20,this.vx=(Math.random()-.5)*.12,this.vy=-(.18+Math.random()*.35),this.symbol=oe[Math.floor(Math.random()*oe.length)],this.opacity=.07+Math.random()*.16,this.size=11+Math.random()*6}update(){const t=this.x-q.x,n=this.y-q.y,o=t*t+n*n;if(o<B*B&&o>0){const r=Math.sqrt(o),a=(B-r)/B;this.x+=t/r*a*re,this.y+=n/r*a*re}this.x+=this.vx,this.y+=this.vy,this.y<-24&&this.init(!1),this.x<-24&&(this.x=I+20),this.x>I+24&&(this.x=-20)}draw(){u.globalAlpha=this.opacity,u.font=`${this.size}px JetBrains Mono, monospace`,u.fillStyle="#f0f0f0",u.fillText(this.symbol,this.x,this.y)}}function Ge(){u.strokeStyle="#f0f0f0",u.lineWidth=.5;for(let e=0;e<h.length;e++)for(let t=e+1;t<h.length;t++){const n=h[e].x-h[t].x,o=h[e].y-h[t].y,r=n*n+o*o;if(r<G*G){const a=(1-Math.sqrt(r)/G)*.055;u.globalAlpha=a,u.beginPath(),u.moveTo(h[e].x,h[e].y),u.lineTo(h[t].x,h[t].y),u.stroke()}}}function ie(){I=$.width=window.innerWidth,O=$.height=window.innerHeight}function Y(){u.clearRect(0,0,I,O),Ge();for(const e of h)e.update(),e.draw();u.globalAlpha=1,w=requestAnimationFrame(Y)}function Ye(){$=document.getElementById("bg-canvas"),$&&(u=$.getContext("2d"),ie(),window.addEventListener("resize",ie,{passive:!0}),window.addEventListener("mousemove",e=>{q.x=e.clientX,q.y=e.clientY},{passive:!0}),h=Array.from({length:Fe},()=>new ze(!0)),document.addEventListener("visibilitychange",()=>{document.hidden?(cancelAnimationFrame(w),w=null):w||(w=requestAnimationFrame(Y))}),w=requestAnimationFrame(Y))}let ae=null;function Qe(){Ue(),We(),Je(),Ke()}function Ue(){const e=document.getElementById("navbar");if(!e)return;const t=()=>e.classList.toggle("scrolled",window.scrollY>20);window.addEventListener("scroll",t,{passive:!0}),t()}function We(){const e=document.querySelectorAll(".section"),t=document.querySelectorAll(".nav-links a[data-section]");!e.length||!t.length||(ae=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&t.forEach(r=>r.classList.toggle("active",r.dataset.section===o.target.id))})},{threshold:.45}),e.forEach(n=>ae.observe(n)))}function Je(){const e=document.querySelector(".nav-hamburger"),t=document.querySelector(".nav-links");!e||!t||(e.addEventListener("click",()=>{const n=t.classList.toggle("open");e.setAttribute("aria-expanded",String(n)),e.classList.toggle("open",n)}),t.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>{t.classList.remove("open"),e.classList.remove("open"),e.setAttribute("aria-expanded","false")})}))}function Ke(){const e=document.getElementById("scroll-arrow"),t=document.getElementById("hero");if(!e||!t)return;new IntersectionObserver(([o])=>e.classList.toggle("hidden",!o.isIntersecting),{threshold:.1}).observe(t),e.addEventListener("click",()=>{var o;(o=document.getElementById("projects"))==null||o.scrollIntoView({behavior:"smooth"})})}const C=450;let j="hero",Q=!1;function Ve(){const e=location.hash.slice(1);e&&document.getElementById(e)&&(j=e),document.addEventListener("click",Xe,!0)}function Xe(e){const t=e.target.closest('a[href^="#"]');if(!t)return;const n=t.getAttribute("href").slice(1);document.getElementById(n)&&(e.preventDefault(),e.stopPropagation(),!(n===j||Q)&&ke(n))}async function ke(e){Q=!0;const t=document.getElementById(j),n=document.getElementById(e),o=t==null?void 0:t.querySelector(".section-inner, .hero-content");o&&(o.style.animation=`teleportOut ${C}ms ease forwards`,await se(C),o.style.animation=""),n.scrollIntoView({behavior:"instant"}),history.replaceState(null,"",`#${e}`),j=e;const r=n==null?void 0:n.querySelector(".section-inner, .hero-content");r&&(r.style.animation=`teleportIn ${C}ms ease both`,await se(C),r.style.animation=""),Q=!1}function se(e){return new Promise(t=>setTimeout(t,e))}function Ze(){et(),nt()}function et(){const e=document.querySelector(".profile-img"),t=document.querySelector(".profile-placeholder");if(!(!e||!t)){if(e.complete&&!e.naturalWidth){le(e,t);return}e.addEventListener("error",()=>le(e,t)),e.addEventListener("load",()=>tt(e,t))}}function le(e,t){e.style.display="none",t.style.display="flex"}function tt(e,t){t.style.display="none",e.style.display="block"}function nt(){document.querySelectorAll(".social-link").forEach(e=>{e.addEventListener("click",t=>{const n=document.createElement("span");n.className="social-ripple",e.appendChild(n),n.addEventListener("animationend",()=>n.remove())})})}const ot="https://api.github.com/users/McDaived/repos?sort=updated&per_page=30",ce="daived-github-repos";async function rt(){const e=document.getElementById("projects-grid");if(e){it(),st(e);try{const t=await at();lt(e,t)}catch{ut(e)}}}function it(){const e=document.querySelector("#projects .section-title");if(!e)return;const t=()=>{e.classList.add("animate-glitch"),setTimeout(()=>e.classList.remove("animate-glitch"),420),setTimeout(t,7e3+Math.random()*5e3)};setTimeout(t,4e3)}async function at(){const e=sessionStorage.getItem(ce);if(e)return JSON.parse(e);const t=await fetch(ot);if(!t.ok)throw new Error(`GitHub API ${t.status}`);const o=(await t.json()).filter(r=>!r.fork&&r.description).sort((r,a)=>a.stargazers_count-r.stargazers_count);return sessionStorage.setItem(ce,JSON.stringify(o)),o}function st(e){e.innerHTML=Array.from({length:6}).map(()=>`
    <div class="project-card project-card--skeleton" aria-hidden="true">
      <div class="skeleton skeleton--name"></div>
      <div class="skeleton skeleton--desc"></div>
      <div class="skeleton skeleton--desc short"></div>
      <div class="skeleton skeleton--meta"></div>
    </div>
  `).join("")}function lt(e,t){if(!t.length){e.innerHTML='<p class="projects-empty">No public repositories found.</p>';return}e.innerHTML=t.map(dt).join("");const n=e.querySelectorAll(".project-card:not(.project-card--skeleton)"),o=new IntersectionObserver(r=>{r.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),o.unobserve(a.target))})},{threshold:.1});n.forEach((r,a)=>{r.style.transitionDelay=`${a*55}ms`,o.observe(r)}),n.forEach(r=>r.addEventListener("click",ct))}function ct(e){if(e.target.closest(".card-github-btn"))return;const t=e.currentTarget;t.querySelector(".card-expanded");const n=t.classList.contains("expanded");document.querySelectorAll(".project-card.expanded").forEach(o=>{o!==t&&o.classList.remove("expanded")}),t.classList.toggle("expanded",!n),n||setTimeout(()=>t.scrollIntoView({behavior:"smooth",block:"nearest"}),420)}function dt(e){const t=(e.topics||[]).slice(0,5),n=pt(e.size);return`
    <article class="project-card" data-url="${e.html_url}" aria-label="Repository: ${M(e.name)}">
      <div class="card-main">
        <div class="card-header">
          <svg class="repo-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
          </svg>
          <h3 class="card-name">${M(e.name)}</h3>
        </div>

        <p class="card-desc">${M(e.description||"")}</p>

        <div class="card-meta">
          ${e.language?`
            <span class="card-lang">
              <span class="lang-dot" aria-hidden="true"></span>
              ${M(e.language)}
            </span>`:""}
          ${e.stargazers_count>0?`<span class="card-stat">★ ${e.stargazers_count}</span>`:""}
          ${e.forks_count>0?`<span class="card-stat">⑂ ${e.forks_count}</span>`:""}
          <span class="card-updated">${ht(e.updated_at)}</span>
        </div>
      </div>

      <div class="card-expanded">
        ${t.length?`
          <div class="card-topics">
            ${t.map(o=>`<span class="topic-tag">${M(o)}</span>`).join("")}
          </div>`:""}
        ${n?`<p class="card-size">Size: ${n}</p>`:""}
        <a class="card-github-btn"
           href="${e.html_url}"
           target="_blank"
           rel="noopener noreferrer">
          Open on GitHub
          <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/>
          </svg>
        </a>
      </div>
    </article>
  `}function ut(e){e.innerHTML=`
    <div class="projects-error">
      <p>Failed to load projects. Check back later.</p>
      <a class="card-github-btn"
         href="https://github.com/McDaived"
         target="_blank"
         rel="noopener noreferrer">
        View GitHub Profile
      </a>
    </div>
  `}function ht(e){const t=Date.now()-new Date(e).getTime(),n=Math.floor(t/6e4),o=Math.floor(t/36e5),r=Math.floor(t/864e5),a=Math.floor(t/2592e6);return n<60?`${n}m ago`:o<24?`${o}h ago`:r<30?`${r}d ago`:a<12?`${a}mo ago`:`${Math.floor(a/12)}y ago`}function pt(e){return e?e<1024?`${e} KB`:`${(e/1024).toFixed(1)} MB`:""}function M(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const xe="daived-leaderboard",f=24,mt=2.8,gt=9,ft=10;let l,i,U="",v=0,c=[],s=null,E=[],H=0,W=0,S=0,y=null,g="idle",J=!1,b=null,de=null;function yt(){l=document.getElementById("game-canvas"),l&&(i=l.getContext("2d"),Ee(),window.addEventListener("resize",vt),It(),Ie(),K(),bt(),wt(),kt(),xt())}function Ee(){l.width=Math.max(280,Math.min(360,window.innerWidth-48)),l.height=Math.max(300,Math.min(480,window.innerHeight-240)),S=l.height-20}function vt(){Ee(),b=null,g==="idle"&&K()}function bt(){const e=document.getElementById("game-modal"),t=document.getElementById("player-name"),n=document.getElementById("start-game-btn");!e||!n||!t||(n.addEventListener("click",()=>{const o=t.value.trim();if(!o){t.focus();return}U=o,e.hidden=!0,Et()}),t.addEventListener("keydown",o=>{o.key==="Enter"&&n.click()}))}function wt(){l.addEventListener("click",ue),l.addEventListener("touchend",e=>{e.preventDefault(),ue()},{passive:!1})}function ue(){if(g==="idle"){const e=document.getElementById("game-modal"),t=document.getElementById("player-name");e&&(e.hidden=!1,t==null||t.focus())}else g==="playing"&&St()}function kt(){document.addEventListener("visibilitychange",()=>{g==="playing"&&(document.hidden?cancelAnimationFrame(y):y=requestAnimationFrame(P))})}function xt(){const e=document.getElementById("game");e&&(de=new IntersectionObserver(t=>{g==="playing"&&(t[0].isIntersecting?(cancelAnimationFrame(y),y=requestAnimationFrame(P)):cancelAnimationFrame(y))},{threshold:.1}),de.observe(e))}function K(){i.clearRect(0,0,l.width,l.height),i.fillStyle="#0a0a0a",i.fillRect(0,0,l.width,l.height),b||Me(),$e();const e=Math.round(l.width*.55),t=(l.width-e)/2;for(let n=0;n<5;n++)i.fillStyle=`rgba(240,240,240,${.12+n*.07})`,i.fillRect(t,S-(n+1)*f,e,f-2);i.textAlign="center",i.fillStyle="rgba(240,240,240,0.75)",i.font='700 18px "JetBrains Mono", monospace',i.fillText("CLICK TO PLAY",l.width/2,l.height/2),i.fillStyle="rgba(240,240,240,0.3)",i.font='11px "JetBrains Mono", monospace',i.fillText("Stack blocks — build the tallest tower",l.width/2,l.height/2+26)}function Et(){v=0,c=[],E=[],H=0,W=0,g="playing",J=!1,b=null;const e=Math.round(l.width*.55);c.push({x:(l.width-e)/2,width:e,color:Ae(0)}),Se(),cancelAnimationFrame(y),y=requestAnimationFrame(P);const t=document.getElementById("game-over-overlay");t&&(t.hidden=!0)}function Se(){const e=c[c.length-1],t=Math.min(mt+v*.12,gt);s={x:0,width:e.width,vx:t,color:Ae(c.length)}}function St(){if(!s)return;const e=c[c.length-1],t=Math.max(s.x,e.x),n=Math.min(s.x+s.width,e.x+e.width),o=n-t;if(o<=1){he();return}if(s.x<t&&_(s.x,t-s.x,c.length),s.x+s.width>n&&_(n,s.x+s.width-n,c.length),c.push({x:t,width:o,color:s.color}),v++,_(t,o,c.length),Math.abs(o-e.width)<3&&_(t,o,c.length),W=Math.max(0,c.length*f-l.height*.55+20),o<6){he();return}Se()}function he(){var t;g="over",cancelAnimationFrame(y);const e=V();J=v>0&&(e.length<10||v>(((t=e[e.length-1])==null?void 0:t.score)??0)),$t(U,v),Ie(),Le(),Mt()}function P(){Lt(),Le(),g==="playing"&&(y=requestAnimationFrame(P))}function Lt(){if(s){s.x+=s.vx;const e=l.width-s.width;s.x>=e&&(s.x=e,s.vx=-Math.abs(s.vx)),s.x<=0&&(s.x=0,s.vx=Math.abs(s.vx))}H+=(W-H)*.07,E=E.filter(e=>e.life>0),E.forEach(e=>{e.x+=e.vx,e.y+=e.vy,e.vy+=.2,e.life-=1})}function Le(){if(i.clearRect(0,0,l.width,l.height),i.fillStyle="#0a0a0a",i.fillRect(0,0,l.width,l.height),b||Me(),$e(),i.save(),i.translate(0,Math.round(H)),c.forEach((e,t)=>{pe(e.x,S-(t+1)*f,e.width,f,e.color,!1)}),s){const e=S-c.length*f-f,t=S-c.length*f,n=c[c.length-1],o=Math.max(s.x,n.x),r=Math.min(s.x+s.width,n.x+n.width);r>o&&(i.fillStyle="rgba(240,240,240,0.18)",i.fillRect(o,t-2,r-o,2)),pe(s.x,e,s.width,f,s.color,!0)}E.forEach(e=>{const t=Math.max(0,e.life/e.maxLife)*.8;i.fillStyle=`rgba(240,240,240,${t.toFixed(2)})`,i.fillRect(Math.round(e.x),Math.round(e.y),e.size,e.size)}),i.restore(),g==="playing"&&(i.textAlign="center",i.fillStyle="rgba(240,240,240,0.9)",i.font='700 30px "JetBrains Mono", monospace',i.fillText(v,l.width/2,46),i.fillStyle="rgba(240,240,240,0.3)",i.font='10px "JetBrains Mono", monospace',i.fillText("SCORE",l.width/2,62))}function pe(e,t,n,o,r,a){i.fillStyle=r,i.fillRect(e,t,n,o-1),i.fillStyle="rgba(255,255,255,0.22)",i.fillRect(e,t,n,2),i.fillStyle="rgba(0,0,0,0.28)",i.fillRect(e,t+o-3,n,2),a&&(i.shadowColor="rgba(240,240,240,0.3)",i.shadowBlur=10,i.fillStyle="rgba(255,255,255,0.04)",i.fillRect(e,t,n,o-1),i.shadowBlur=0)}function Me(){b=Array.from({length:30},()=>({x:Math.random()*l.width,y:Math.random()*l.height,r:Math.random()*1+.3,a:Math.random()*.3+.08}))}function $e(){b.forEach(e=>{i.fillStyle=`rgba(240,240,240,${e.a})`,i.beginPath(),i.arc(e.x,e.y,e.r,0,Math.PI*2),i.fill()})}function Mt(){let e=document.getElementById("game-over-overlay");e||(e=document.createElement("div"),e.id="game-over-overlay",document.body.appendChild(e));const t=l.getBoundingClientRect();Object.assign(e.style,{top:t.top+"px",left:t.left+"px",width:t.width+"px",height:t.height+"px"}),e.innerHTML=`
    <p class="go-title">GAME OVER</p>
    ${J?'<p class="go-badge">&#10022; NEW HIGH SCORE &#10022;</p>':""}
    <p class="go-score">${v}</p>
    <p class="go-label">blocks stacked</p>
    <div class="go-btns">
      <button class="go-btn go-btn--primary" id="go-play-again">Play Again</button>
      <button class="go-btn" id="go-home">Back to Home</button>
    </div>
  `,e.hidden=!1,document.getElementById("go-play-again").addEventListener("click",()=>{e.hidden=!0,g="idle",b=null,K();const n=document.getElementById("game-modal"),o=document.getElementById("player-name");n&&o&&(o.value=U,n.hidden=!1,o.select(),o.focus())}),document.getElementById("go-home").addEventListener("click",()=>{e.hidden=!0,g="idle",ke("hero")})}function _(e,t,n){const o=S-n*f;for(let r=0;r<ft;r++)E.push({x:e+Math.random()*t,y:o,vx:(Math.random()-.5)*3.5,vy:Math.random()*-3.5-.5,size:Math.random()*3+1,life:40+Math.random()*20,maxLife:60})}function V(){try{return JSON.parse(localStorage.getItem(xe))||[]}catch{return[]}}function $t(e,t){if(!e||t===0)return;const n=V();n.push({name:e,score:t}),n.sort((o,r)=>r.score-o.score),localStorage.setItem(xe,JSON.stringify(n.slice(0,10)))}function Ie(){const e=document.getElementById("leaderboard");if(!e)return;const t=V();e.innerHTML=`
    <h3 class="lb-title">Leaderboard</h3>
    ${t.length===0?'<p class="lb-empty">No scores yet. Be the first!</p>':`<ol class="lb-list">
          ${t.map((n,o)=>`
            <li class="lb-entry${o===0?" lb-first":""}">
              <span class="lb-rank">${o+1}</span>
              <span class="lb-name">${At(n.name)}</span>
              <span class="lb-score">${n.score}</span>
            </li>
          `).join("")}
        </ol>`}
  `}function It(){const e=document.querySelector("#game .section-title");if(!e)return;const t=()=>{e.classList.add("animate-glitch"),setTimeout(()=>e.classList.remove("animate-glitch"),420),setTimeout(t,8e3+Math.random()*6e3)};setTimeout(t,5e3)}function Ae(e){const t=Math.min(e/25,1);return`hsl(0, 0%, ${Math.round(48+t*42)}%)`}function At(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const Tt=[{key:"skill.python",pct:90},{key:"skill.csharp",pct:70},{key:"skill.cpp",pct:90},{key:"skill.re",pct:90},{key:"skill.go",pct:40},{key:"skill.web",pct:80},{key:"skill.asm",pct:75},{key:"skill.malware",pct:85},{key:"skill.network",pct:80},{key:"skill.api",pct:70}],Bt=["bio.line1","bio.line2","bio.line3","bio.line4","bio.line5","bio.line6"],Ct=[{year:"2013",key:"timeline.2013"},{year:"2016",key:"timeline.2016"},{year:"2019",key:"timeline.2019"},{year:"2021",key:"timeline.2021"},{year:"2024",key:"timeline.2024"}];function _t(){Rt(),me(),qt(),Ot(),document.addEventListener("langchange",()=>{var t;const e=!!document.querySelector(".bio-terminal--visible");me(),e&&((t=document.querySelector(".bio-terminal"))==null||t.classList.add("bio-terminal--visible"))})}function Rt(){const e=document.querySelector(".skills-container");if(!e)return;e.innerHTML=`
    <h3 class="about-sub-title" data-i18n="about.skills_title">${d("about.skills_title")}</h3>
    ${Tt.map(n=>`
      <div class="skill-bar-wrapper">
        <div class="skill-header">
          <span data-i18n="${n.key}">${d(n.key)}</span>
          <span class="skill-pct">${n.pct}%</span>
        </div>
        <div class="skill-track"
             role="progressbar"
             aria-valuenow="${n.pct}"
             aria-valuemin="0"
             aria-valuemax="100"
             aria-label="${d(n.key)} ${n.pct}%">
          <div class="skill-fill" data-pct="${n.pct}"></div>
        </div>
      </div>
    `).join("")}
  `;const t=new IntersectionObserver(n=>{n[0].isIntersecting&&(e.querySelectorAll(".skill-fill").forEach((o,r)=>{setTimeout(()=>{o.style.width=o.dataset.pct+"%"},r*60)}),t.unobserve(e))},{threshold:.25});t.observe(e)}function me(){const e=document.querySelector(".bio-container");if(!e)return;e.innerHTML=`
    <h3 class="about-sub-title" data-i18n="about.bio_title">${d("about.bio_title")}</h3>
    <div class="bio-terminal">
      ${Bt.map((o,r)=>`
        <div class="bio-line">
          <span class="bio-line-num">${r+1}</span>
          <span class="bio-text">${jt(d(o))}</span>
        </div>
      `).join("")}
    </div>
  `;const t=e.querySelector(".bio-terminal"),n=new IntersectionObserver(o=>{o[0].isIntersecting&&(t.classList.add("bio-terminal--visible"),n.unobserve(t))},{threshold:.2});n.observe(t)}function qt(){const e=document.querySelector(".timeline-container");if(!e)return;e.innerHTML=`
    <div class="timeline">
      ${Ct.map(n=>`
        <div class="timeline-item">
          <p class="timeline-year">${n.year}</p>
          <p class="timeline-desc" data-i18n="${n.key}">${d(n.key)}</p>
        </div>
      `).join("")}
    </div>
  `;const t=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(o.target.classList.add("visible"),t.unobserve(o.target))})},{threshold:.3});e.querySelectorAll(".timeline-item").forEach(n=>t.observe(n))}function Ot(){const e=document.querySelector("#about .section-title");if(!e)return;const t=()=>{e.classList.add("animate-glitch"),setTimeout(()=>e.classList.remove("animate-glitch"),420),setTimeout(t,9e3+Math.random()*7e3)};setTimeout(t,6e3)}function jt(e){const t=Ht(e);return t.startsWith("//")?`<span class="bio-comment">${t}</span>`:t.replace(/\b(const|let|var)\b/g,'<span class="bio-keyword">$1</span>').replace(/'([^']*)'/g,`'<span class="bio-string">$1</span>'`)}function Ht(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const X="TFgGqieX6gn28GUy273p4AgdZ7Qh3X8Zhk",Pt=`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(X)}`,Nt=`
<svg class="character-svg" viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <!-- ═══ Sofa ═══ -->
  <!-- Back cushion -->
  <rect x="18" y="140" width="164" height="72" rx="14" fill="#0f0f0f" stroke="var(--color-text)" stroke-width="1.8"/>
  <!-- Seat cushion left -->
  <rect x="26" y="182" width="68" height="26" rx="8" fill="#161616" stroke="var(--color-border)" stroke-width="1.2"/>
  <!-- Seat cushion right -->
  <rect x="102" y="182" width="68" height="26" rx="8" fill="#161616" stroke="var(--color-border)" stroke-width="1.2"/>
  <!-- Left arm rest -->
  <rect x="14" y="162" width="22" height="42" rx="9" fill="#0f0f0f" stroke="var(--color-text)" stroke-width="1.8"/>
  <!-- Right arm rest -->
  <rect x="164" y="162" width="22" height="42" rx="9" fill="#0f0f0f" stroke="var(--color-text)" stroke-width="1.8"/>
  <!-- Sofa legs -->
  <line x1="36"  y1="212" x2="34"  y2="226" stroke="var(--color-border)" stroke-width="2" stroke-linecap="round"/>
  <line x1="164" y1="212" x2="166" y2="226" stroke="var(--color-border)" stroke-width="2" stroke-linecap="round"/>
  <!-- Cushion seam -->
  <line x1="100" y1="182" x2="100" y2="207" stroke="var(--color-border)" stroke-width="1" opacity="0.6"/>

  <!-- ═══ Shy symbols (hidden, shown on .character-shy) ═══ -->
  <g class="char-shy-symbols">
    <text x="52"  y="36" font-size="14" fill="var(--color-text)" text-anchor="middle" font-family="serif">✦</text>
    <text x="100" y="22" font-size="11" fill="var(--color-text)" text-anchor="middle" font-family="serif">♥</text>
    <text x="148" y="36" font-size="14" fill="var(--color-text)" text-anchor="middle" font-family="serif">✦</text>
  </g>

  <!-- ═══ Head group (rotates on .character-shy) ═══ -->
  <g class="char-head-group">
    <!-- Head -->
    <circle cx="100" cy="70" r="30" fill="#0a0a0a" stroke="var(--color-text)" stroke-width="2"/>
    <!-- Hair — simple arcs on top -->
    <path d="M 74 62 Q 78 48 100 44 Q 122 48 126 62" fill="#1a1a1a" stroke="var(--color-text)" stroke-width="1.5"/>
    <!-- Eyes -->
    <circle class="char-eye char-eye-l" cx="88"  cy="68" r="3.8" fill="var(--color-text)"/>
    <circle class="char-eye char-eye-r" cx="112" cy="68" r="3.8" fill="var(--color-text)"/>
    <!-- Mouth (relaxed smile) -->
    <path d="M 91 82 Q 100 89 109 82" fill="none" stroke="var(--color-text)" stroke-width="1.6" stroke-linecap="round"/>
    <!-- Blush (shown on .character-shy) -->
    <ellipse class="char-blush" cx="80"  cy="77" rx="9" ry="5" fill="rgba(220,160,140,0.45)" opacity="0"/>
    <ellipse class="char-blush" cx="120" cy="77" rx="9" ry="5" fill="rgba(220,160,140,0.45)" opacity="0"/>
  </g>

  <!-- ═══ Body ═══ -->
  <rect x="76" y="102" width="48" height="80" rx="8" fill="#0a0a0a" stroke="var(--color-text)" stroke-width="2"/>
  <!-- Shirt collar hint -->
  <path d="M 92 102 L 100 112 L 108 102" fill="none" stroke="var(--color-border)" stroke-width="1.2"/>

  <!-- ═══ Left arm (resting on left sofa arm) ═══ -->
  <path d="M 78 120 Q 52 138 34 168" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- ═══ Right arm + coffee cup (animates up occasionally) ═══ -->
  <g class="char-cup-arm">
    <!-- Upper arm -->
    <path d="M 122 120 Q 152 140 158 164" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>
    <!-- Cup body -->
    <rect x="150" y="157" width="20" height="17" rx="4" fill="#111" stroke="var(--color-text)" stroke-width="1.6"/>
    <!-- Cup handle -->
    <path d="M 170 161 Q 178 161 178 166 Q 178 172 170 172" fill="none" stroke="var(--color-text)" stroke-width="1.6"/>
    <!-- Liquid surface line -->
    <line x1="152" y1="162" x2="168" y2="162" stroke="var(--color-text)" stroke-width="1" opacity="0.4"/>
    <!-- Steam wisps -->
    <path class="char-steam"   d="M 155 157 Q 157 150 155 143" fill="none" stroke="rgba(240,240,240,0.55)" stroke-width="1.5" stroke-linecap="round"/>
    <path class="char-steam char-steam-2" d="M 162 157 Q 164 149 162 142" fill="none" stroke="rgba(240,240,240,0.55)" stroke-width="1.5" stroke-linecap="round"/>
  </g>

  <!-- ═══ Legs (bent, feet forward over sofa edge) ═══ -->
  <path d="M 88  182 Q 82  200 72  215" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 112 182 Q 118 200 128 215" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Shoes -->
  <path d="M 72  215 Q 63 219 57 216" stroke="var(--color-text)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M 128 215 Q 137 219 143 216" stroke="var(--color-text)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
</svg>`,ge=["0x4A3F","push rbp","const x","0xDEAD","jmp 0x80","import *","MOV AX","return;","0xFF00","sub esp","fn() {}","let y=0"];function Dt(){return`
    <div class="digital-scene" aria-hidden="true">
      <div class="digital-geo">
        <svg viewBox="0 0 80 200" width="80" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="30"  r="22" fill="none" stroke="var(--color-border)" stroke-width="1"/>
          <circle cx="40" cy="30"  r="12" fill="none" stroke="var(--color-border)" stroke-width="0.6" stroke-dasharray="3 4"/>
          <rect   x="18" y="80"  width="44" height="44" rx="4" fill="none" stroke="var(--color-border)" stroke-width="1" transform="rotate(15 40 102)"/>
          <line   x1="40" y1="60"  x2="40"  y2="78"   stroke="var(--color-border)" stroke-width="0.8"/>
          <circle cx="40" cy="165" r="16" fill="none" stroke="var(--color-border)" stroke-width="1"/>
          <line   x1="24" y1="165" x2="56" y2="165"   stroke="var(--color-border)" stroke-width="0.6" opacity="0.5"/>
          <line   x1="40" y1="149" x2="40" y2="181"   stroke="var(--color-border)" stroke-width="0.6" opacity="0.5"/>
        </svg>
      </div>
      <div class="code-stream-wrap">
        <div class="code-stream">
          ${[...ge,...ge].map(t=>`<span class="code-stream-line">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `}function Ft(){zt(),Ut()}function zt(){const e=document.querySelector(".support-container");e&&(e.innerHTML=`
    <div class="support-left">
      <div class="support-character" aria-hidden="true">
        ${Nt}
      </div>
      ${Dt()}
    </div>

    <div class="support-content">
      <p class="support-message" data-i18n="support.message">${d("support.message")}</p>

      <button class="support-btn" id="support-btn" aria-label="${d("support.button")}">
        <span data-i18n="support.button">${d("support.button")}</span> ☕
      </button>

      <div class="wallet-panel" id="wallet-panel">
        <div class="wallet-info">
          <p class="wallet-label" data-i18n="support.wallet_label">${d("support.wallet_label")}</p>
          <p class="wallet-network" data-i18n="support.network">${d("support.network")}</p>
        </div>
        <div class="qr-wrapper">
          <img
            src="${Pt}"
            class="qr-img"
            alt="USDT wallet QR code"
            width="160"
            height="160"
            loading="lazy"
          />
        </div>
        <div class="wallet-address-row">
          <code class="wallet-address" id="wallet-address">${X}</code>
          <button class="copy-btn" id="copy-btn" data-i18n="support.copy">${d("support.copy")}</button>
        </div>
      </div>
    </div>
  `,Gt())}function Gt(){const e=document.getElementById("support-btn"),t=document.getElementById("wallet-panel"),n=document.getElementById("copy-btn"),o=document.querySelector(".character-svg");e==null||e.addEventListener("click",()=>{Yt(e),t==null||t.classList.add("wallet-panel--open"),Qt(o)}),n==null||n.addEventListener("click",()=>{navigator.clipboard.writeText(X).then(()=>{n.textContent=d("support.copied"),n.classList.add("copy-btn--copied"),setTimeout(()=>{n.textContent=d("support.copy"),n.classList.remove("copy-btn--copied")},2e3)}).catch(()=>{const r=document.createRange(),a=document.getElementById("wallet-address");a&&(r.selectNode(a),window.getSelection().removeAllRanges(),window.getSelection().addRange(r))})})}function Yt(e){const t=document.createElement("span");t.className="support-ripple",t.setAttribute("aria-hidden","true"),e.appendChild(t),t.addEventListener("animationend",()=>t.remove(),{once:!0})}function Qt(e){!e||e.classList.contains("character-shy")||(e.classList.add("character-shy"),setTimeout(()=>e.classList.remove("character-shy"),2800))}function Ut(){const e=document.querySelector("#support .section-title");if(!e)return;const t=()=>{e.classList.add("animate-glitch"),setTimeout(()=>e.classList.remove("animate-glitch"),420),setTimeout(t,9e3+Math.random()*9e3)};setTimeout(t,7e3)}function Wt(){Re(),je(),Ye(),Qe(),Ve(),Ze(),rt(),yt(),_t(),Ft();const e=document.getElementById("lang-toggle");e&&e.addEventListener("click",()=>{e.classList.add("flipping");const o=_e()==="en"?"ar":"en";setTimeout(()=>{Ce(o),e.classList.remove("flipping")},200)});const t=document.getElementById("typing-text");if(t){let T=function(){const Z=o(),N=Z[r];t.textContent=m?N.slice(0,--a):N.slice(0,++a);let D=m?40:80;!m&&a===N.length?(D=2e3,m=!0):m&&a===0&&(m=!1,r=(r+1)%Z.length,D=400),A=setTimeout(T,D)};var n=T;const o=()=>[d("hero.phrase1"),d("hero.phrase2"),d("hero.phrase3"),d("hero.phrase4")];let r=0,a=0,m=!1,A=null;A=setTimeout(T,800),document.addEventListener("langchange",()=>{clearTimeout(A),t.textContent="",r=0,a=0,m=!1,A=setTimeout(T,400)})}}document.addEventListener("DOMContentLoaded",Wt);
