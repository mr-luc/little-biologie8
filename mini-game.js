// Mini-Spiel: Bio-Blitz – richtige Antwort bringt Münzen
(function(){
  const QUESTIONS=[
    {q:'Was ist die kleinste lebende Einheit?',a:'Zelle',w:['Organ','Gewebe','Zelle']},
    {q:'Welche Struktur gehört typisch zur Pflanzenzelle?',a:'Zellwand',w:['Zellwand','Lunge','Blutgefäß']},
    {q:'Wo findet Fotosynthese statt?',a:'Chloroplast',w:['Mitochondrium','Chloroplast','Herz']},
    {q:'Was transportiert Sauerstoff im Körper?',a:'Blut',w:['Blut','Nahrung','Licht']},
    {q:'Was pumpt Blut durch den Körper?',a:'Herz',w:['Lunge','Herz','Auge']},
    {q:'Was nimmt Reize auf?',a:'Sinnesorgan',w:['Sinnesorgan','Blutdruck','Knochen']},
    {q:'Was schützt vor Krankheitserregern?',a:'Immunsystem',w:['Immunsystem','Fotosynthese','Skelett']},
    {q:'Was ist ein unbelebter Umweltfaktor?',a:'Licht',w:['Licht','Tier','Pilz']},
    {q:'Wer stellt Biomasse selbst her?',a:'Produzent',w:['Konsument','Produzent','Destruent']},
    {q:'Was bilden viele Knochen zusammen?',a:'Skelett',w:['Skelett','Nerv','Vakuole']}
  ];
  const ROUND_COUNT=3;
  const REWARD_PER_RIGHT=1;
  const PERFECT_BONUS=2;

  let modal,questionBox,answersBox,statusBox,closeButton;
  let round=0;
  let correct=0;
  let activeQuestions=[];

  function shuffle(arr){
    return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  }

  function ensureModal(){
    if(modal)return;
    modal=document.createElement('div');
    modal.className='mini-modal';
    modal.innerHTML='<div class="mini-card"><button class="mini-close" type="button">×</button><h2>🧬 Bio-Blitz</h2><p class="mini-intro">Beantworte 3 kurze Fragen. Jede richtige Antwort bringt Münzen.</p><div class="mini-status"></div><div class="mini-question"></div><div class="mini-answers"></div></div>';
    document.body.appendChild(modal);
    closeButton=modal.querySelector('.mini-close');
    questionBox=modal.querySelector('.mini-question');
    answersBox=modal.querySelector('.mini-answers');
    statusBox=modal.querySelector('.mini-status');
    closeButton.onclick=function(){modal.classList.remove('show');};
    modal.addEventListener('click',function(e){if(e.target===modal)modal.classList.remove('show');});
  }

  function startMiniGame(){
    ensureModal();
    round=0;
    correct=0;
    activeQuestions=shuffle(QUESTIONS).slice(0,ROUND_COUNT);
    modal.classList.add('show');
    showQuestion();
  }

  function showQuestion(){
    const item=activeQuestions[round];
    statusBox.textContent='Frage '+(round+1)+' / '+ROUND_COUNT+' · richtig: '+correct;
    questionBox.textContent=item.q;
    answersBox.innerHTML='';
    shuffle(item.w).forEach(function(answer){
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='mini-answer';
      btn.textContent=answer;
      btn.onclick=function(){checkAnswer(answer,item.a,btn);};
      answersBox.appendChild(btn);
    });
  }

  function checkAnswer(answer,right,button){
    Array.from(answersBox.children).forEach(function(btn){btn.disabled=true;});
    if(answer===right){
      correct++;
      button.classList.add('right');
      statusBox.textContent='✅ Richtig! +'+REWARD_PER_RIGHT+' Münze';
      if(window.BioCoins)window.BioCoins.add(REWARD_PER_RIGHT);
    }else{
      button.classList.add('wrong');
      Array.from(answersBox.children).forEach(function(btn){if(btn.textContent===right)btn.classList.add('right');});
      statusBox.textContent='❌ Nicht ganz. Richtige Antwort: '+right;
    }
    setTimeout(nextQuestion,900);
  }

  function nextQuestion(){
    round++;
    if(round<ROUND_COUNT){
      showQuestion();
      return;
    }
    finishMiniGame();
  }

  function finishMiniGame(){
    questionBox.textContent='Fertig! Du hattest '+correct+' von '+ROUND_COUNT+' richtig.';
    answersBox.innerHTML='';
    if(correct===ROUND_COUNT){
      if(window.BioCoins)window.BioCoins.add(PERFECT_BONUS);
      statusBox.innerHTML='🏆 Perfekt! Bonus: <b>+'+PERFECT_BONUS+' Münzen</b>';
    }else{
      statusBox.textContent='Du kannst gleich nochmal spielen.';
    }
    const again=document.createElement('button');
    again.type='button';
    again.className='mini-again';
    again.textContent='Nochmal spielen';
    again.onclick=startMiniGame;
    answersBox.appendChild(again);
  }

  function addButton(){
    const controls=document.querySelector('.controls');
    if(!controls)return;
    if(document.getElementById('miniGameButton'))return;
    const btn=document.createElement('button');
    btn.id='miniGameButton';
    btn.type='button';
    btn.textContent='🎮 Münzen verdienen';
    btn.onclick=startMiniGame;
    controls.appendChild(btn);
  }

  addButton();
})();
