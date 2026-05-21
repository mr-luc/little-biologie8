// Erweiterung: Körpersysteme für Klasse 8
Object.assign(I,{
 luft:['Luft','🌬️','Gasgemisch, das Sauerstoff enthält.'],
 blutgefaess:['Blutgefäß','🧵','Röhre, in der Blut fließt.'],
 arterie:['Arterie','🔴','Blutgefäß, das Blut vom Herzen wegführt.'],
 vene:['Vene','🔵','Blutgefäß, das Blut zum Herzen zurückführt.'],
 kapillare:['Kapillare','🕸️','Feinstes Blutgefäß für Stoffaustausch.'],
 puls:['Puls','💓','Spürbare Druckwelle des Herzschlags.'],
 blutdruck:['Blutdruck','📈','Druck des Blutes auf die Gefäßwände.'],
 bronchien:['Bronchien','🌿','Verzweigte Luftwege in der Lunge.'],
 lungenblaeschen:['Lungenbläschen','🫧','Ort des Gasaustauschs in der Lunge.'],
 kohlenstoffdioxid:['Kohlenstoffdioxid','CO₂','Abfallgas aus der Zellatmung.'],
 gasaustausch:['Gasaustausch','🔄','Sauerstoff geht ins Blut, Kohlenstoffdioxid hinaus.'],
 zwerchfell:['Zwerchfell','↕️','Wichtiger Atemmuskel unter der Lunge.'],
 knochen:['Knochen','🦴','Stützender Teil des Körpers.'],
 skelett:['Skelett','💀','Alle Knochen des Körpers zusammen.'],
 muskel:['Muskel','💪','Organ, das sich zusammenziehen kann.'],
 muskelfaser:['Muskelfaser','🧶','Lange Muskelzelle, die Kraft erzeugen kann.'],
 sehne:['Sehne','🪢','Verbindet Muskel und Knochen.'],
 kontraktion:['Kontraktion','✊','Zusammenziehen eines Muskels.'],
 bewegung:['Bewegung','🏃','Entsteht durch Zusammenspiel von Muskeln, Knochen und Nerven.'],
 bewegungsapparat:['Bewegungsapparat','🦵','Skelett, Muskeln, Sehnen und Gelenke arbeiten zusammen.'],
 reiz:['Reiz','⚡','Ein Signal aus der Umwelt oder dem Körper.'],
 sinnesorgan:['Sinnesorgan','👁️','Nimmt Reize auf.'],
 auge:['Auge','👀','Sinnesorgan für Lichtreize.'],
 nervenzelle:['Nervenzelle','🧠','Zelle, die Informationen weiterleitet.'],
 nerv:['Nerv','🧵','Bündel vieler Nervenfasern.'],
 synapse:['Synapse','🔗','Kontaktstelle zwischen Nervenzellen.'],
 rueckenmark:['Rückenmark','🧱','Leitet Signale zwischen Gehirn und Körper.'],
 gehirn:['Gehirn','🧠','Verarbeitet Informationen und steuert den Körper.'],
 nervensystem:['Nervensystem','🕸️','Gehirn, Rückenmark und Nerven arbeiten zusammen.'],
 reflex:['Reflex','⚡','Schnelle automatische Reaktion auf einen Reiz.'],
 hormondruese:['Hormondrüse','💧','Organ, das Hormone bildet.'],
 hormon:['Hormon','📨','Botenstoff, der über das Blut wirkt.'],
 hormonsystem:['Hormonsystem','📡','Steuert Körpervorgänge langsam über Hormone.'],
 insulin:['Insulin','🗝️','Hormon, das den Blutzucker senkt.'],
 blutzucker:['Blutzucker','🍬','Zucker im Blut.'],
 adrenalin:['Adrenalin','🚨','Stresshormon für schnelle Reaktionen.'],
 pubertaet:['Pubertät','🌱','Entwicklungsphase, die stark durch Hormone gesteuert wird.'],
 blatt:['Blatt','🍃','Pflanzenorgan für Fotosynthese.'],
 chloroplast:['Chloroplast','🟢','Zellbestandteil, in dem Fotosynthese stattfindet.']
});

function addRule(a,b,c,e){R[k(a,b)]=c;E[c]=e}

// Erreichbarkeit alter Ketten verbessern
addRule('zelle','nahrung','bakterium','Bakterien sind einzellige Lebewesen; viele nutzen Nährstoffe.');
addRule('zelle','bakterium','krankheit','Manche Bakterien können Krankheiten auslösen.');
addRule('zelle','krankheit','virus','Viren nutzen Zellen, um sich zu vermehren.');
addRule('variation','zelle','art','Eine Art besteht aus Lebewesen mit gemeinsamen Merkmalen.');

// Herz-Kreislauf-System
addRule('blut','gewebe','blutgefaess','Blut fließt durch Blutgefäße zu den Geweben.');
addRule('herz','blutgefaess','arterie','Arterien führen Blut vom Herzen weg.');
addRule('blutgefaess','blut','vene','Venen führen Blut zum Herzen zurück.');
addRule('blutgefaess','gewebe','kapillare','Kapillaren sind feine Blutgefäße in den Geweben.');
addRule('herz','energie','puls','Der Puls entsteht durch die Pumpbewegung des Herzens.');
addRule('kreislauf','blutgefaess','blutdruck','Blutdruck entsteht durch Herzarbeit und Gefäßwiderstand.');

// Atmung
addRule('lunge','luft','atmung','Atmung bringt Luft in die Lunge und wieder hinaus.');
addRule('lunge','organ','bronchien','Bronchien sind verzweigte Luftwege in der Lunge.');
addRule('bronchien','lunge','lungenblaeschen','Am Ende der Bronchien liegen viele Lungenbläschen.');
addRule('luft','atmung','sauerstoff','Beim Einatmen gelangt Sauerstoff in die Lunge.');
addRule('lungenblaeschen','blut','gasaustausch','In den Lungenbläschen findet der Gasaustausch mit dem Blut statt.');
addRule('zellatmung','luft','kohlenstoffdioxid','Bei der Zellatmung entsteht Kohlenstoffdioxid als Abfallstoff.');
addRule('atmung','muskel','zwerchfell','Das Zwerchfell ist ein wichtiger Atemmuskel.');

// Muskeln und Bewegung
addRule('organ','energie','muskel','Muskeln benötigen Energie, um Kraft zu erzeugen.');
addRule('zelle','muskel','muskelfaser','Muskelfasern sind spezialisierte Muskelzellen.');
addRule('muskel','energie','kontraktion','Bei einer Kontraktion zieht sich ein Muskel zusammen.');
addRule('gewebe','energie','knochen','Knochengewebe stützt den Körper.');
addRule('knochen','knochen','skelett','Alle Knochen zusammen bilden das Skelett.');
addRule('muskel','gewebe','sehne','Sehnen verbinden Muskeln mit Knochen.');
addRule('muskel','knochen','bewegungsapparat','Muskeln und Knochen bilden zusammen den Bewegungsapparat.');
addRule('muskel','skelett','bewegung','Bewegung entsteht durch Muskeln, die am Skelett ziehen.');

// Nervensystem und Sinne
addRule('licht','energie','reiz','Licht kann als Reiz auf Sinneszellen wirken.');
addRule('reiz','organ','sinnesorgan','Sinnesorgane nehmen Reize auf.');
addRule('sinnesorgan','licht','auge','Das Auge ist ein Sinnesorgan für Licht.');
addRule('zelle','reiz','nervenzelle','Nervenzellen leiten Reize als Signale weiter.');
addRule('nervenzelle','nervenzelle','nerv','Viele Nervenfasern bilden einen Nerv.');
addRule('nervenzelle','reiz','synapse','An Synapsen werden Signale zwischen Nervenzellen übertragen.');
addRule('nerv','organ','rueckenmark','Das Rückenmark leitet Signale zwischen Körper und Gehirn.');
addRule('nervenzelle','organ','gehirn','Das Gehirn besteht aus vielen Nervenzellen und steuert den Körper.');
addRule('gehirn','rueckenmark','nervensystem','Gehirn, Rückenmark und Nerven bilden das Nervensystem.');
addRule('reiz','nervensystem','reflex','Ein Reflex ist eine schnelle automatische Reaktion auf einen Reiz.');
addRule('nervensystem','muskel','bewegung','Das Nervensystem steuert Muskeln und damit Bewegung.');

// Hormonsystem
addRule('organ','blutgefaess','hormondruese','Hormondrüsen geben Botenstoffe in die Blutbahn ab.');
addRule('hormondruese','blut','hormon','Hormone werden über das Blut im Körper verteilt.');
addRule('hormon','organsystem','hormonsystem','Das Hormonsystem steuert viele Körpervorgänge mit Hormonen.');
addRule('hormon','zucker','insulin','Insulin ist ein Hormon, das den Blutzucker reguliert.');
addRule('zucker','blut','blutzucker','Blutzucker ist Zucker, der im Blut gelöst ist.');
addRule('insulin','blutzucker','hormonsystem','Das Hormonsystem hält den Blutzucker im Gleichgewicht.');
addRule('hormon','energie','adrenalin','Adrenalin bereitet den Körper auf schnelle Reaktionen vor.');
addRule('hormonsystem','variation','pubertaet','In der Pubertät verändern Hormone den Körper.');

// Pflanzen/Fotosynthese vollständiger machen
addRule('pflanze','organ','blatt','Das Blatt ist ein Pflanzenorgan.');
addRule('blatt','zelle','chloroplast','Chloroplasten sind Zellbestandteile in Pflanzenzellen.');
addRule('chloroplast','licht','fotosynthese','In Chloroplasten läuft die Fotosynthese mit Lichtenergie ab.');

// Startbegriffe erweitern
if(!d.includes('licht'))d.push('licht');
if(!d.includes('luft'))d.push('luft');

btxt=function(){let n=d.length,t=Object.keys(I).length;return n>=t?'Bio-Meister':n>=58?'System-Profi':n>=48?'Nerven-Checker':n>=38?'Körper-Profi':n>=28?'Ökosystem-Denker':n>=18?'Zell-Forscher':n>=10?'Bio-Starter':'Starter'};
save();
last=btxt();
resetSlots();
msg.innerHTML='Starte mit <b>Zelle</b>, <b>Wasser</b>, <b>Energie</b>, <b>Nahrung</b>, <b>Licht</b> und <b>Luft</b>. Probiere: Zelle + Zelle.';
