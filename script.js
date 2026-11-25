'use strict';
// ===== عدّلي النصوص هنا =====
const LINES=[
 "أنا مش بحبك عشان إنتي مثالية. بحبك عشان إنتي إنتي، بكل حاجة فيكي.",
 "في أيام بقفل فيها على الدنيا كلها، وإنتي الوحيدة اللي بفتحلها.",
 "صوتك بيهدّيني أكتر من أي حاجة جربتها في حياتي.",
 "معاكي مبحتاجش أمثّل. بقعد على طبيعتي وأنا مطمّن.",
 "ناس كتير بتعدي في حياتنا. إنتي الوحيدة اللي غيّرتيني.",
 "لما الدنيا بتضيق عليا، بفكر فيكي فبتوسع.",
 "بحب إنك حقيقية. بتفرحي بجد، وبتزعلي بجد، وبتحبي بجد.",
 "إداني أمان أنا ماكنتش عارف إني محتاجه أوي.",
 "من يوم ما دخلتي حياتي، ما حسيتش إني لوحدي تاني.",
 "لو رجعت بيا الأيام وأختار من الأول، هختارك بنفس الاختيار.",
 "إنتي أحلى حاجة حصلت لي، وكل يوم بقول الحمد لله عليها.",
 "ووعد مني: هفضل أختارك كل يوم، مش بس يوم ٢٣ فبراير."
];
const LETTER="بيبا،\n\nأنا مش بعرف أقولك الكلام ده وشي في وشك من غير ما أتلخبط، فكتبته.\n\nالسنة دي بتكملي ٢١، وأنا واقف أبص على اللي حصل بينا وأتعجب. إزاي واحدة تدخل حياتي بالهدوء ده وتبقى أهم حاجة فيها من غير ما أحس؟\n\nإنتي مش بس حد بحبه. إنتي المكان اللي برتاح فيه لما أتعب، والصوت اللي بسمعه في دماغي لما أتوه، والسبب إني بحاول كل يوم أبقى أحسن.\n\nمش هوعدك إننا مش هنتخانق، ولا إني مش هغلط. بس بوعدك إني مش هسيبك لوحدك فيها، وإني هفضل أختارك حتى في الأيام اللي مبتبقاش سهلة.\n\nكل سنة وانتي طيبة يا أغلى حاجة عندي. ربنا يحفظك ليا، ويفرّحك زي ما بتفرّحيني.";
const SIGN="ميدو";
// =============================
const $=id=>document.getElementById(id);
const COLORS=['#d9b872','#f2dcaa','#e7a4b6','#ffffff','#b79ad6'];
const __lib=window.confetti;
window.__lib=__lib;
function burst(n=140){
  if(window.__lib){window.__lib({particleCount:n,spread:80,startVelocity:38,origin:{y:.6},colors:COLORS,ticks:220,disableForReducedMotion:true});}
}
function sparks(n=16){const e=['✦','✧','♡','✦'];for(let i=0;i<n;i++){const d=document.createElement('div');d.className='float';d.textContent=e[i%e.length];d.style.left=Math.random()*95+'vw';d.style.animationDuration=(4+Math.random()*4)+'s';d.style.animationDelay=Math.random()*2+'s';document.body.appendChild(d);setTimeout(()=>d.remove(),9000)}}
function show(id){const s=$(id);s.classList.remove('hidden');
  if(window.gsap){gsap.fromTo(s.querySelectorAll('.wrap > *'),{y:28,opacity:0},{y:0,opacity:1,duration:.9,stagger:.12,ease:'power3.out'})}
  setTimeout(()=>s.scrollIntoView({behavior:'smooth'}),50)}
let blown=false;
$('cake').onclick=()=>{if(blown)return;blown=true;$('cake').classList.add('out');$('hint').textContent='يارب تتحقق، وأنا هعمل كل اللي أقدر عليه عشان تتحقق';burst(200);sparks();setTimeout(()=>{show('s2');render(0)},1400)};
const AR=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
let cur=-1,maxSeen=-1,busy=false;
const qt=$('qtext');
function render(i,dir){
  cur=i;maxSeen=Math.max(maxSeen,i);
  $('rnum').textContent=AR(i+1)+' / '+AR(LINES.length);
  qt.innerHTML='';
  LINES[i].split(' ').forEach(w=>{const sp=document.createElement('span');sp.textContent=w;qt.appendChild(sp)});
  const words=qt.querySelectorAll('span');
  if(window.gsap){gsap.fromTo(words,{opacity:0,y:18,filter:'blur(6px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.7,stagger:.09,ease:'power2.out'})}
  $('bar').style.width=(i+1)/LINES.length*100+'%';
  $('rprev').disabled=i===0;
  $('rnext').disabled=i===LINES.length-1;
  $('rhint').style.visibility=i===LINES.length-1?'hidden':'visible';
  if(i===LINES.length-1){burst(120);setTimeout(()=>$('next1').classList.remove('hidden'),900)}
}
function go(d){const n=cur+d;if(n<0||n>=LINES.length)return;
  if(window.gsap&&cur>=0){gsap.to(qt,{opacity:0,duration:.18,onComplete:()=>{gsap.set(qt,{opacity:1});render(n)}})}else render(n)}
$('reader').onclick=()=>go(1);
$('reader').onkeydown=e=>{if(e.key==='Enter'||e.key===' '||e.key==='ArrowLeft'){e.preventDefault();go(1)}else if(e.key==='ArrowRight'){go(-1)}};
$('rnext').onclick=()=>go(1);$('rprev').onclick=()=>go(-1);
let tx=0;$('reader').addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
$('reader').addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50){go(d<0?1:-1);e.preventDefault()}});
$('rnext').addEventListener('click',e=>e.stopPropagation());$('rprev').addEventListener('click',e=>e.stopPropagation());
document.body.classList.add('lock');
$('open').onclick=()=>{
  if(window.gsap){
    gsap.to('.cmid',{opacity:0,duration:.4});
    gsap.to('.cl',{xPercent:-100,duration:1.6,ease:'power3.inOut'});
    gsap.to('.cr',{xPercent:100,duration:1.6,ease:'power3.inOut',onComplete:()=>{$('curtain').remove();document.body.classList.remove('lock')}});
    gsap.from('#s1 .wrap > *',{y:30,opacity:0,duration:1,stagger:.15,delay:.9,ease:'power3.out'});
  }else{$('curtain').remove();document.body.classList.remove('lock')}
};
$('next1').onclick=()=>show('s3');
function openLetter(){
  const env=$('env');if(env.dataset.done)return;env.dataset.done=1;
  const go=()=>{env.remove();$('letter').classList.remove('hidden');
    if(window.gsap)gsap.from('#letter',{y:40,opacity:0,duration:.9,ease:'power2.out'});
    let i=0;const t=setInterval(()=>{$('typed').textContent=LETTER.slice(0,++i);if(i>=LETTER.length){clearInterval(t);$('sign').textContent=SIGN;$('next2').classList.remove('hidden')}},32)};
  if(window.gsap){
    gsap.to('.flap',{rotateX:180,duration:.7,ease:'power2.inOut'});
    gsap.to('.seal,.etxt',{opacity:0,duration:.3});
    gsap.to(env,{y:-30,opacity:0,duration:.6,delay:.8,onComplete:go});
  }else go();
}
$('env').onclick=openLetter;
$('env').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLetter()}};
$('next2').onclick=()=>{show('s4');burst(260);sparks(26)};
$('again').onclick=()=>{burst(260);sparks(26)};

