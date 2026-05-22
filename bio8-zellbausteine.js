// Korrektur: Die Zelle entsteht aus wichtigen Zellbausteinen
Object.assign(I,{
  baustoffe:['Baustoffe','🧱','Stoffe, aus denen Zellbestandteile aufgebaut werden.'],
  zellplasma:['Zellplasma','🫙','Flüssige Grundmasse der Zelle, in der viele Vorgänge ablaufen.'],
  erbinformation:['Erbinformation','📘','Informationen für Bau und Funktion eines Lebewesens.']
});

// Alte, zu einfache Entstehung der Zelle entfernen
delete R[k('leben','wasser')];
delete R[k('leben','nahrung')];

// Nährstoffe und Baustoffe als Weg zur Zelle
addRule('nahrung','wasser','naehrstoff','Aus Nahrung werden verwertbare Nährstoffe gelöst und aufgenommen.');
addRule('nahrung','energie','baustoffe','Nahrung liefert Baustoffe und Energie für den Aufbau von Zellbestandteilen.');
addRule('naehrstoff','energie','baustoffe','Nährstoffe liefern Material und Energie für den Aufbau von Zellbestandteilen.');
addRule('baustoffe','wasser','zellplasma','Zellplasma besteht zu einem großen Teil aus Wasser und gelösten Stoffen.');
addRule('baustoffe','energie','protein','Proteine sind wichtige Baustoffe und Werkzeuge in Zellen.');
addRule('protein','wasser','membran','Die Zellmembran besteht aus besonderen Molekülen und Proteinen und grenzt die Zelle ab.');
addRule('baustoffe','nahrung','erbinformation','Im Spiel stark vereinfacht: Aus Baustoffen entstehen Träger der Erbinformation.');
addRule('erbinformation','baustoffe','dna','Die DNA ist der Träger der Erbinformation.');
addRule('dna','protein','zellkern','Im Zellkern liegt die DNA; Proteine helfen beim Verpacken und Steuern.');
addRule('membran','zellplasma','zelle','Erst Zellmembran und Zellplasma ergeben eine abgegrenzte lebende Einheit: die Zelle.');
addRule('zellkern','zellplasma','zelle','Zellplasma und Zellkern sind wichtige Bestandteile vieler Körperzellen.');
addRule('membran','zellkern','zelle','Zellmembran und Zellkern reichen im Spiel vereinfacht aus, um die Zelle freizuschalten.');

// Verdauung bleibt erreichbar, aber nicht mehr über Nahrung + Wasser
addRule('organ','nahrung','verdauung','Die Verdauungsorgane zerlegen Nahrung in verwertbare Bestandteile.');
addRule('naehrstoff','nahrung','verdauung','Verdauung macht aus Nahrung verwertbare Nährstoffe.');

// Leben entsteht jetzt sinnvoll nach der Zelle
addRule('zelle','energie','leben','Lebensvorgänge laufen in Zellen ab und benötigen Energie.');
addRule('zelle','wasser','leben','Zellen brauchen Wasser; in ihnen laufen Lebensvorgänge ab.');

// Alte Spielstände bereinigen, wenn die Zelle noch ohne Zellbausteine vorhanden ist
if(d.includes('zelle') && (!d.includes('membran') || !d.includes('zellplasma'))){
  d=d.filter(id=>id!=='zelle');
}

save();
last=btxt();
resetSlots();
msg.innerHTML='Die <b>Zelle</b> entsteht jetzt aus Zellbausteinen. Starte z. B. mit <b>Nahrung + Wasser</b> oder <b>Nahrung + Energie</b>.';
