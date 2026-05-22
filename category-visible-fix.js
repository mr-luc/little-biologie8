// Fix: Wenn ein neuer Begriff zu einer Kategorie gehört, wird die Kategorie sichtbar.
// Zusätzlich erscheint ein Hinweis, wenn dadurch eine neue Kategorie freigeschaltet wird.
(function(){
  const CATEGORY_ORDER=['grundlagen','zellen','bewegung','kreislauf','nerven','immun','oekologie'];
  const CATEGORY_LABEL={
    grundlagen:'🌱 Grundlagen',
    zellen:'🔬 Zellen & Stoffwechsel',
    bewegung:'🦴 Bewegung',
    kreislauf:'🫁 Atmung & Kreislauf',
    nerven:'🧠 Nerven & Hormone',
    immun:'🛡️ Immunbiologie',
    oekologie:'🌳 Ökologie'
  };
  const CATEGORY_MAP={
    mikroskop:'grundlagen',pflanze:'grundlagen',tier:'grundlagen',wasser:'grundlagen',luft:'grundlagen',licht:'grundlagen',nahrung:'grundlagen',nachweis:'grundlagen',knochen:'grundlagen',reiz:'grundlagen',lebensraum:'grundlagen',
    pflanzenzelle:'zellen',tierzelle:'zellen',zelle:'zellen',zellbestandteil:'zellen',zellmembran:'zellen',zellplasma:'zellen',zellkern:'zellen',zellwand:'zellen',vakuole:'zellen',chloroplast:'zellen',mitochondrium:'zellen',gewebe:'zellen',organ:'zellen',organsystem:'zellen',koerper:'zellen',leben:'zellen',naehrstoff:'zellen',verdauungsorgan:'zellen',verdauung:'zellen',naehrstofftransport:'zellen',zellstoffwechsel:'zellen',zellatmung:'zellen',energie:'zellen',
    muskel:'bewegung',skelett:'bewegung',bewegungsapparat:'bewegung',gegenspielerprinzip:'bewegung',bewegung:'bewegung',haltungsschaden:'bewegung',
    blut:'kreislauf',blutgefaess:'kreislauf',lunge:'kreislauf',herz:'kreislauf',nase:'kreislauf',atemweg:'kreislauf',atmungssystem:'kreislauf',lungenblaeschen:'kreislauf',gasaustausch:'kreislauf',sauerstoff:'kreislauf',sauerstofftransport:'kreislauf',kohlenstoffdioxid:'kreislauf',blutkreislauf:'kreislauf',lungenkreislauf:'kreislauf',koerperkreislauf:'kreislauf',herzfrequenz:'kreislauf',atemfrequenz:'kreislauf',blutdruck:'kreislauf',versorgung:'kreislauf',belastung:'kreislauf',messung:'kreislauf',
    sinnesorgan:'nerven',auge:'nerven',sehen:'nerven',wahrnehmung:'nerven',nervenzelle:'nerven',nerv:'nerven',signalweiterleitung:'nerven',gehirn:'nerven',rueckenmark:'nerven',zns:'nerven',nervensystem:'nerven',reaktion:'nerven',reflex:'nerven',hormondruese:'nerven',hormon:'nerven',hormonsystem:'nerven',hormontransport:'nerven',bauchspeicheldruese:'nerven',insulin:'nerven',blutzucker:'nerven',blutzuckerregulation:'nerven',alarmreaktion:'nerven',
    krankheitserreger:'immun',haut:'immun',immunsystem:'immun',impfung:'immun',bakterium:'immun',virus:'immun',infektionsbarriere:'immun',infektion:'immun',immunabwehr:'immun',antikoerper:'immun',gedaechtniszelle:'immun',immunitaet:'immun',
    blatt:'oekologie',fotosynthese:'oekologie',zucker:'oekologie',produzent:'oekologie',lebewesen:'oekologie',oekosystem:'oekologie',abiotischerfaktor:'oekologie',konsument:'oekologie',destruent:'oekologie',nahrungskette:'oekologie',nahrungsnetz:'oekologie',angepasstheit:'oekologie',pilz:'oekologie',totesmaterial:'oekologie'
  };

  const START_SET=new Set(['mikroskop','pflanze','tier','wasser','luft','licht','nahrung','nachweis','knochen','reiz','lebensraum']);
  let seenCategories=null;

  function categoryHeader(cat){
    const div=document.createElement('div');
    div.className='category-head';
    div.textContent=CATEGORY_LABEL[cat];
    return div;
  }

  function visibleCategories(){
    const set=new Set(['grundlagen','zellen']);
    d.forEach(function(id){
      const cat=CATEGORY_MAP[id];
      if(cat)set.add(cat);
    });
    return set;
  }

  function categoryUnlockMessage(newCategories){
    if(!newCategories.length)return '';
    const labels=newCategories.map(function(cat){return CATEGORY_LABEL[cat];}).join(', ');
    return '🔓 Neue Kategorie freigeschaltet: <b>'+labels+'</b><br>Schau unten nach den neuen Karten.';
  }

  render=function(nid){
    grid.innerHTML='';
    const s=(search.value||'').toLowerCase();
    const visible=visibleCategories();
    let newCategories=[];

    if(seenCategories){
      CATEGORY_ORDER.forEach(function(cat){
        if(visible.has(cat)&&!seenCategories.has(cat))newCategories.push(cat);
      });
    }

    CATEGORY_ORDER.forEach(function(cat){
      if(!visible.has(cat))return;
      const ids=d.filter(function(id){return CATEGORY_MAP[id]===cat&&(!s||I[id][0].toLowerCase().includes(s));});
      if(!ids.length)return;
      grid.appendChild(categoryHeader(cat));
      ids.forEach(function(id){
        const el=document.createElement('article');
        el.className='card '+(sel===id?'sel ':'')+(nid===id?'new':'');
        el.innerHTML=card(id);
        el.onclick=function(){choose(id);};
        grid.appendChild(el);
      });
    });

    const discovered=d.filter(function(id){return !START_SET.has(id);}).length;
    counter.textContent=discovered+' / '+(Object.keys(I).length-START_SET.size);
    const bt=btxt();
    badge.textContent=bt;
    last=bt;

    const unlockText=categoryUnlockMessage(newCategories);
    if(unlockText)msg.innerHTML=unlockText;
    seenCategories=new Set(visible);
  };

  resetSlots();
})();
