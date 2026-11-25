'use strict';
// ===== عدّلي النصوص هنا =====
const LINES=[
 "أنا مش بحبك عشان إنتي مثالية. بحبك عشان إنتي إنتي، بكل حاجة فيكي.",
 "في أيام بقفل فيها على الدنيا كلها، وإنتي الوحيدة اللي بفتحلها.",
 "صوتك بيهدّيني أكتر من أي حاجة جربتها في حياتي.",
 "لما بتضحكي من قلبك، بنسى كل اللي كان مضايقني قبلها.",
 "بتخليني عايز أبقى أحسن من نفسي، من غير ما تطلبي مني حاجة.",
 "حتى لما بتزعلي مني، بفتكر قد إيه أنا فارق معاكي.",
 "معاكي مبحتاجش أمثّل. بقعد على طبيعتي وأنا مطمّن.",
 "ناس كتير بتعدي في حياتنا. إنتي الوحيدة اللي غيّرتيني.",
 "أكتر حاجة بخاف عليها في الدنيا دي هي ضحكتك.",
 "بتفهميني من نظرة، وساعات من سكوتي.",
 "لما الدنيا بتضيق عليا، بفكر فيكي فبتوسع.",
 "مبقولهاش كتير، بس وجودك في حياتي نعمة أنا واعي بيها كل يوم.",
 "بحب إنك حقيقية. بتفرحي بجد، وبتزعلي بجد، وبتحبي بجد.",
 "أي خطة بعملها للمستقبل، بلاقيكي فيها من غير ما أقصد.",
 "إداني أمان أنا ماكنتش عارف إني محتاجه أوي.",
 "من يوم ما دخلتي حياتي، ما حسيتش إني لوحدي تاني.",
 "لو رجعت بيا الأيام وأختار من الأول، هختارك بنفس الاختيار.",
 "إنتي أحلى حاجة حصلت لي، وكل يوم بقول الحمد لله عليها.",
 "٢١ سنة من عمرك، وأنا مش مصدق إني لحقت أكون جزء منهم.",
 "كبرتي سنة، وأنا لسه بتعلم منك يعني إيه الواحد يحب بجد.",
 "ووعد مني: هفضل أختارك كل يوم، مش بس يوم ٢٣ فبراير."
];
const LETTER="بيبا،\n\nأنا مش بعرف أقولك الكلام ده وشي في وشك من غير ما أتلخبط، فكتبته.\n\nالسنة دي بتكملي ٢١، وأنا واقف أبص على اللي حصل بينا وأتعجب. إزاي واحدة تدخل حياتي بالهدوء ده وتبقى أهم حاجة فيها من غير ما أحس؟\n\nإنتي مش بس حد بحبه. إنتي المكان اللي برتاح فيه لما أتعب، والصوت اللي بسمعه في دماغي لما أتوه، والسبب إني بحاول كل يوم أبقى أحسن.\n\nمش هوعدك إننا مش هنتخانق، ولا إني مش هغلط. بس بوعدك إني مش هسيبك لوحدك فيها، وإني هفضل أختارك حتى في الأيام اللي مبتبقاش سهلة.\n\nكل سنة وانتي طيبة يا أغلى حاجة عندي. ربنا يحفظك ليا، ويفرّحك زي ما بتفرّحيني.";
const SIGN="ميدو";
// =============================
const $=id=>document.getElementById(id);
const AR=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const COLORS=['#d9b872','#f2dcaa','#e7a4b6','#ffffff','#b79ad6'];
const lib=window.confetti;
const hasGsap=!!window.gsap;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function burst(n=140){if(lib&&!reduce)lib({particleCount:n,spread:80,startVelocity:38,origin:{y:.6},colors:COLORS,ticks:220,zIndex:400})}
function sparks(n=16){if(reduce)return;const e=['✦','✧','♡','✦'];for(let i=0;i<n;i++){const d=document.createElement('div');d.className='float';d.textContent=e[i%e.length];d.style.left=Math.random()*95+'vw';d.style.animationDuration=(4+Math.random()*4)+'s';d.style.animationDelay=Math.random()*2+'s';document.body.appendChild(d);setTimeout(()=>d.remove(),9000)}}

/* ---------- intro: digital rain + 3,2,1 ---------- */
(function intro(){
  const cv=$('rain'),cx=cv.getContext('2d');let W,H,cols,drops;
  const chars='٠١٢٣٤٥٦٧٨٩♥✦';const size=18;
  function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;cols=Math.ceil(W/size);drops=Array.from({length:cols},()=>Math.random()*-40)}
  rs();addEventListener('resize',rs);
  let run=true;
  function draw(){
    if(!run)return;
    cx.fillStyle='rgba(11,8,19,.14)';cx.fillRect(0,0,W,H);
    cx.font=size+"px 'Amiri',serif";
    for(let i=0;i<cols;i++){
      const ch=chars[Math.floor(Math.random()*chars.length)];
      cx.fillStyle=Math.random()>.88?'#f2dcaa':'#e7a4b6';
      cx.fillText(ch,i*size,drops[i]*size);
      if(drops[i]*size>H&&Math.random()>.975)drops[i]=0;
      drops[i]+=.6;
    }
    requestAnimationFrame(draw);
  }
  draw();
  let finished=false;
  function finish(){
    if(finished)return;finished=true;
    const done=()=>{run=false;$('intro').remove();document.body.classList.remove('lock');
      if(hasGsap)gsap.from('.hero .wrap > *',{y:30,opacity:0,duration:1,stagger:.14,ease:'power3.out'})};
    if(hasGsap)gsap.to('#intro',{opacity:0,duration:.8,onComplete:done});else done();
  }
  $('skip').onclick=finish;
  if(reduce||!hasGsap){setTimeout(finish,600);return}
  const seq=['٣','٢','١','٢١'];let i=0;const el=$('count');
  function step(){
    if(finished)return;
    el.textContent=seq[i];
    gsap.fromTo(el,{scale:.4,opacity:0},{scale:1,opacity:1,duration:.55,ease:'back.out(2)'});
    i++;
    if(i<seq.length)setTimeout(()=>{gsap.to(el,{opacity:0,scale:1.4,duration:.3});setTimeout(step,300)},700);
    else setTimeout(finish,1300);
  }
  step();
})();

/* ---------- sheet / gifts ---------- */
const opened=new Set();
function markDone(g){
  opened.add(g);
  const b=document.querySelector('.gift[data-g="'+g+'"]');b.classList.add('done');
  document.querySelector('[data-s="'+g+'"]').textContent='اتفتحت';
  if(opened.size===3&&$('finale').classList.contains('hidden')){
    $('finale').classList.remove('hidden');
    if(hasGsap)gsap.from('#finale .wrap > *',{y:28,opacity:0,duration:.9,stagger:.12});
  }
}
let current=null;
function openGift(g){
  current=g;
  $('sheet').classList.remove('hidden');
  document.body.classList.add('lock');
  ['letter','flowers','cake'].forEach(k=>$('p-'+k).classList.toggle('hidden',k!==g));
  $('sheet').scrollTop=0;
  if(hasGsap)gsap.fromTo('#p-'+g,{y:30,opacity:0},{y:0,opacity:1,duration:.6,ease:'power2.out'});
}
function closeSheet(){
  $('sheet').classList.add('hidden');document.body.classList.remove('lock');
  if(current&&opened.has(current)){
    const f=$('finale');if(!f.classList.contains('hidden'))setTimeout(()=>f.scrollIntoView({behavior:'smooth'}),100);
  }
  current=null;
}
document.querySelectorAll('.gift').forEach(b=>b.onclick=()=>openGift(b.dataset.g));
$('close').onclick=closeSheet;
addEventListener('keydown',e=>{if(e.key==='Escape'&&current)closeSheet()});

/* ---------- letter ---------- */
let typing=false;
function openLetter(){
  const env=$('env');if(typing||env.dataset.done)return;env.dataset.done=1;typing=true;
  const go=()=>{env.classList.add('hidden');$('letter').classList.remove('hidden');
    if(hasGsap)gsap.from('#letter',{y:40,opacity:0,duration:.9,ease:'power2.out'});
    let i=0;const t=setInterval(()=>{$('typed').textContent=LETTER.slice(0,++i);
      if(i>=LETTER.length){clearInterval(t);$('sign').textContent=SIGN;markDone('letter');burst(120)}},30)};
  if(hasGsap){
    gsap.to('.flap',{rotateX:180,duration:.7,ease:'power2.inOut'});
    gsap.to('.seal,.etxt',{opacity:0,duration:.3});
    gsap.to(env,{y:-30,opacity:0,duration:.6,delay:.8,onComplete:go});
  }else go();
}
$('env').onclick=openLetter;
$('env').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLetter()}};

/* ---------- flowers ---------- */
const NS='http://www.w3.org/2000/svg';
const hues=['#e7a4b6','#f3c3cf','#f2dcaa','#d98aa0','#c9a0e0'];
const lit=new Set();
LINES.forEach((t,i)=>{
  const b=document.createElement('button');b.className='fl';b.type='button';b.setAttribute('aria-label','وردة '+AR(i+1));
  const col=hues[i%hues.length];
  let petals='';for(let k=0;k<6;k++)petals+='<ellipse cx="20" cy="9" rx="4.6" ry="8" transform="rotate('+(k*60)+' 20 20)" fill="'+col+'"/>';
  b.innerHTML='<svg viewBox="0 0 40 44"><path d="M20 24v18" stroke="#6fae8a" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="14" cy="34" rx="5" ry="2.4" transform="rotate(-30 14 34)" fill="#6fae8a"/><g class="bud"><ellipse cx="20" cy="18" rx="4.4" ry="6.2" fill="'+col+'"/></g><g class="bloom">'+petals+'<circle cx="20" cy="20" r="4.2" fill="#d9b872"/></g></svg>';
  b.onclick=()=>{
    document.querySelectorAll('.fl.cur').forEach(e=>e.classList.remove('cur'));b.classList.add('cur');
    const first=!lit.has(i);lit.add(i);
    const bloom=b.querySelector('.bloom'),bud=b.querySelector('.bud');
    if(first){
      if(hasGsap){gsap.to(bud,{scale:0,duration:.2});gsap.to(bloom,{scale:1.25,rotate:30,duration:.7,ease:'elastic.out(1,.45)'})}
      else{bloom.style.transform='scale(1.25)';bud.style.display='none'}
    }
    $('fmsg').innerHTML='<div class="n">'+AR(i+1)+'</div><div class="m"></div>';
    const m=$('fmsg').querySelector('.m');m.textContent=t;
    if(hasGsap)gsap.fromTo(m,{y:14,opacity:0},{y:0,opacity:1,duration:.6});
    $('bar').style.width=lit.size/LINES.length*100+'%';$('pnum').textContent=AR(lit.size)+' / '+AR(LINES.length);
    if(first&&lit.size===LINES.length){burst(200);sparks(20);markDone('flowers')}
    else if(first)burst(10);
  };
  $('garden').appendChild(b);
});

/* ---------- cake ---------- */
let blown=false;
$('cake').onclick=()=>{
  if(blown)return;blown=true;$('cake').classList.add('out');
  $('hint').textContent='يارب تتحقق، وأنا هعمل كل اللي أقدر عليه عشان تتحقق';
  burst(200);sparks();markDone('cake');
};
$('again').onclick=()=>{burst(260);sparks(26)};

/* ---------- music: official YouTube embed, starts on tap ---------- */
const SONG_ID='EgmXTmj62ic'; // Amr Diab - Tamally Maak (official, Mazzika)
let playing=false;
function startSong(){
  const f=document.createElement('iframe');
  f.src='https://www.youtube-nocookie.com/embed/'+SONG_ID+'?autoplay=1&playsinline=1&rel=0&modestbranding=1';
  f.allow='autoplay; encrypted-media; picture-in-picture';f.title='عمرو دياب - تملي معاك';f.loading='lazy';
  $('dframe').replaceChildren(f);$('dplayer').classList.remove('hidden');$('dlab').textContent='تملي معاك';playing=true;
}
function stopSong(){$('dframe').replaceChildren();$('dplayer').classList.add('hidden');$('dlab').textContent='شغّلي أغنية';playing=false}
$('dbtn').onclick=()=>{if(!playing)startSong()};
$('dstop').onclick=stopSong;
