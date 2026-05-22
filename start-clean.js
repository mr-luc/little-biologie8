// Sauberer Startmodus: wenige echte Startkarten, keine alten Spielstände
(function(){
  const CLEAN_KEY='little-bio8-progress-v6';
  const OLD_KEYS=['little-bio8-progress-v5','little-bio8-progress-v4','little-bio8-progress-v3','little-bio8-progress-v2','little-bio8-progress'];
  const CLEAN_START=['mikroskop','pflanze','tier','wasser','luft','licht','nahrung','nachweis','knochen','muskel','reiz','krankheitserreger','haut','lebensraum','belastung','messung','impfung','pilz','totesmaterial'];
  const START_SET=new Set(CLEAN_START);

  // alte Spielstände absichtlich ignorieren
  try{OLD_KEYS.forEach(k=>localStorage.removeItem(k));}catch(e){}

  // zusätzliche Brücken, damit aus wenigen Startkarten trotzdem alle großen Themen erreichbar bleiben
  r('wasser','tier','blut','Der Körper enthält viel Wasser; Blut ist eine wichtige Körperflüssigkeit.');
  r('gewebe','blut','blutgefaess','Blut fließt durch Blutgefäße zu den Geweben.');
  r('organ','blut','herz','Das Herz ist ein Organ, das Blut pumpt.');
  r('organ','luft','lunge','Die Lunge ist ein Organ, das mit Luft und Gasaustausch zu tun hat.');
  r('koerper','reiz','sinnesorgan','Der Körper nimmt Reize mit Sinnesorganen auf.');
  r('gewebe','reiz','nervenzelle','Nervenzellen sind spezialisierte Zellen/Gewebe zur Weiterleitung von Reizen.');
  r('nervenzelle','organ','gehirn','Das Gehirn besteht aus Nervengewebe und verarbeitet Informationen.');
  r('nervenzelle','koerper','rueckenmark','Das Rückenmark leitet Signale zwischen Körper und Gehirn.');
  r('koerper','belastung','hormon','Bei Belastung können Hormone Körpervorgänge steuern.');
  r('organ','hormon','hormondruese','Hormondrüsen sind Organe, die Hormone bilden.');
  r('nahrung','blut','blutzucker','Nach der Verdauung gelangt Zucker ins Blut.');
  r('hormondruese','blutzucker','insulin','Insulin wird von einer Hormondrüse gebildet und wirkt auf den Blutzucker.');
  r('infektion','koerper','immunsystem','Bei einer Infektion wird das Immunsystem aktiv.');

  const realTotal=Object.keys(I).length-CLEAN_START.length;

  save=function(){
    const discovered=d.filter(id=>!START_SET.has(id));
    localStorage.setItem(CLEAN_KEY,JSON.stringify(discovered));
  };

  render=(function(oldRender){
    return function(nid){
      oldRender(nid);
      const discovered=d.filter(id=>!START_SET.has(id)).length;
      counter.textContent=discovered+' / '+realTotal;
    };
  })(render);

  reset=function(){
    try{localStorage.removeItem(CLEAN_KEY);OLD_KEYS.forEach(k=>localStorage.removeItem(k));}catch(e){}
    d=[...CLEAN_START];
    sel=null;
    if(search)search.value='';
    resetSlots();
    msg.innerHTML='Neustart: Du beginnst wieder mit wenigen Grundkarten. Probiere <b>Mikroskop + Pflanze</b> oder <b>Knochen + Knochen</b>.';
  };

  const saved=(()=>{try{return JSON.parse(localStorage.getItem(CLEAN_KEY)||'[]').filter(id=>I[id])}catch(e){return []}})();
  d=[...new Set([...CLEAN_START,...saved])];

  const btn=document.getElementById('reset');
  if(btn)btn.onclick=reset;

  resetSlots();
  msg.innerHTML='Sauberer Start: Nur wenige Grundkarten sind offen. Fortschritt zählt jetzt nur neu entdeckte Begriffe. Probiere <b>Mikroskop + Pflanze</b> oder <b>Knochen + Knochen</b>.';
})();
