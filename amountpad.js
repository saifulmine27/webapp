(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const dlg=$('transactionDialog'),input=$('amountInput'),disp=$('amountDisplay'),form=$('transactionForm'),pad=$('keypad');
  if(!dlg||!input||!disp||!form||!pad)return;
  const BN='০১২৩৪৫৬৭৮৯';
  const lang=()=>document.documentElement.lang==='en'?'en':'bn';
  const T={bn:{pad:'সংখ্যা কীপ্যাড',back:'মুছুন',enter:'সেভ',need:'টাকার পরিমাণ দিন'},en:{pad:'Number pad',back:'Delete',enter:'Save',need:'Enter an amount'}};
  const t=k=>T[lang()][k];
  const digit=s=>lang()==='bn'?s.replace(/\d/g,d=>BN[d]):s;
  let fresh=false;

  function format(v){
    if(!v)return digit('0');
    const parts=String(v).split('.');
    const whole=new Intl.NumberFormat(lang()==='bn'?'bn-BD':'en').format(Number(parts[0]||0));
    return parts.length>1?whole+'.'+digit(parts[1]):whole;
  }
  function show(){disp.textContent=format(input.value);disp.classList.toggle('empty',!input.value)}

  function press(k){
    let v=String(input.value||'');
    if(k==='back'){v=v.slice(0,-1);fresh=false}
    else{
      if(fresh){v='';fresh=false}
      if(v==='0')v='';
      if(v===''&&/^0+$/.test(k))return;          // amount cannot start with zero
      const next=v+k;
      if(next.split('.')[0].length>9)return;      // max 9 digits
      v=next;
    }
    input.value=v;show();
  }
  function enter(){
    if(!(Number(input.value)>0)){
      disp.classList.remove('nudge');void disp.offsetWidth;disp.classList.add('nudge');
      const toast=$('toast');
      if(toast){toast.textContent=t('need');toast.classList.add('show');clearTimeout(enter.tm);enter.tm=setTimeout(()=>toast.classList.remove('show'),1800)}
      if(navigator.vibrate)navigator.vibrate(80);
      return;
    }
    form.requestSubmit();
  }

  function build(){
    const svgBack='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 5H9l-6 7 6 7h12z"/><path d="m13 9 4 6M17 9l-4 6"/></svg>';
    const svgEnter='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6v6a3 3 0 0 1-3 3H5"/><path d="m9 11-4 4 4 4"/></svg>';
    const layout=['1','2','3','back','4','5','6','enter','7','8','9','0','00','000'];
    pad.setAttribute('aria-label',t('pad'));
    pad.innerHTML='';
    layout.forEach(k=>{
      const b=document.createElement('button');b.type='button';b.dataset.key=k;
      if(k==='back'){b.className='kp-back';b.innerHTML=svgBack;b.setAttribute('aria-label',t('back'))}
      else if(k==='enter'){b.className='kp-enter';b.innerHTML=svgEnter+'<small>'+t('enter')+'</small>';b.setAttribute('aria-label',t('enter'))}
      else{b.textContent=digit(k)}
      pad.appendChild(b);
    });
  }

  pad.addEventListener('pointerdown',e=>{if(e.target.closest('button'))e.preventDefault()});   // focus stays put, no phone keyboard
  pad.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    const k=b.dataset.key;
    if(k==='enter')enter();else press(k);
  });

  // PC keyboard: digits, Backspace and Enter also work
  dlg.addEventListener('keydown',e=>{
    const tag=(e.target.tagName||'').toLowerCase();
    if(tag==='input'||tag==='textarea'||tag==='select')return;
    if(/^[0-9]$/.test(e.key)){e.preventDefault();press(e.key)}
    else if(e.key==='Backspace'){e.preventDefault();press('back')}
    else if(e.key==='Enter'&&tag!=='button'&&tag!=='a'){e.preventDefault();enter()}
  });

  // the note box shows up only when the "other" category is chosen
  function syncNote(){
    const sel=$('categoryInput');
    const f=$('noteField');
    if(f)f.hidden=!(sel&&sel.value==='other');
  }
  dlg.addEventListener('click',()=>setTimeout(syncNote,0));
  form.addEventListener('reset',()=>setTimeout(syncNote,0));

  function onOpen(){
    fresh=Boolean(input.value);      // editing: the first digit replaces the old amount
    show();syncNote();
    setTimeout(()=>{show();syncNote();try{disp.focus({preventScroll:true})}catch(e){}},80);
  }
  new MutationObserver(()=>{if(dlg.open)onOpen()}).observe(dlg,{attributes:true,attributeFilter:['open']});
  new MutationObserver(()=>{build();show()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  build();show();
})();
