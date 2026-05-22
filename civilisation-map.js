(function(){
  const REGION_INFO={
    grund:{name:'Startlager',icon:'🏕️',terrain:'Grasebene'},
    zelle:{name:'Zell-Labor',icon:'🔬',terrain:'Forschungsbezirk'},
    bewegung:{name:'Knochengebirge',icon:'🦴',terrain:'Gebirge'},
    kreislauf:{name:'Lungenland',icon:'🫁',terrain:'Flussland'},
    nerven:{name:'Nervenstadt',icon:'🧠',terrain:'Hochland'},
    immun:{name:'Immunfestung',icon:'🛡️',terrain:'Festung'},
    oekologie:{name:'Öko-Wald',icon:'🌳',terrain:'Waldreich'}
  };
  const TILE_MAP=[
    ['grund','grund','zelle','zelle','oekologie'],
    ['grund','zelle','zelle','oekologie','oekologie'],
    ['bewegung','bewegung','grund','kreislauf','kreislauf'],
    ['bewegung','nerven','nerven','kreislauf','immun'],
    ['oekologie','nerven','immun','immun','immun']
  ];
  const START_POS={x:2,y:2};
  const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  function tileKey(x,y){return x+'-'+y}
  function ensureMapState(){
    if(!state.mapPos)state.mapPos={...START_POS};
    if(!Array.isArray(state.discoveredTiles))state.discoveredTiles=[tileKey(START_POS.x,START_POS.y)];
    revealAround(state.mapPos.x,state.mapPos.y,false);
  }
  function inBounds(x,y){return y>=0&&y<TILE_MAP.length&&x>=0&&x<TILE_MAP[0].length}
  function isOpenTile(x,y){return state.discoveredTiles.includes(tileKey(x,y))}
  function revealTile(x,y,announce){
    if(!inBounds(x,y))return false;
    const k=tileKey(x,y);
    if(state.discoveredTiles.includes(k))return false;
    state.discoveredTiles.push(k);
    const realm=TILE_MAP[y][x];
    if(!state.open.includes(realm)){
      if(typeof openRealm==='function')openRealm(realm);else state.open.push(realm);
    }
    if(announce){
      const info=REGION_INFO[realm];
      modal('Neue Landschaft entdeckt!','🗺️',info.icon+' '+info.name+' liegt nun nicht mehr im Nebel.');
    }
    return true;
  }
  function revealAround(x,y,announce){
    let found=false;
    [[0,0],[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx,dy])=>{if(revealTile(x+dx,y+dy,announce))found=true});
    return found;
  }
  function canMove(dx,dy){
    const nx=state.mapPos.x+dx,ny=state.mapPos.y+dy;
    return inBounds(nx,ny)&&isOpenTile(nx,ny);
  }
  function move(dx,dy){
    ensureMapState();
    const nx=state.mapPos.x+dx,ny=state.mapPos.y+dy;
    if(!inBounds(nx,ny))return;
    if(!isOpenTile(nx,ny)){
      revealTile(nx,ny,true);
    }
    state.mapPos={x:nx,y:ny};
    const realm=TILE_MAP[ny][nx];
    if(state.open.includes(realm))state.active=realm;
    revealAround(nx,ny,false);
    if(typeof save==='function')save();
    update();
  }
  function terrainClass(realm){return 'terrain-'+realm}
  function renderMoveButton(dir,label){
    const d=dirs[dir];
    const nx=state.mapPos.x+d[0],ny=state.mapPos.y+d[1];
    const possible=inBounds(nx,ny);
    const unexplored=possible&&!isOpenTile(nx,ny);
    return '<button class="move-btn '+(!possible?'disabled ':'')+(unexplored?'explore ':'')+'" data-dir="'+dir+'" '+(!possible?'disabled':'')+'>'+label+(unexplored?' ☁️':'')+'</button>';
  }
  renderMap=function(){
    ensureMapState();
    const box=document.querySelector('#worldMap');
    if(!box)return;
    box.innerHTML='';
    const currentRealm=TILE_MAP[state.mapPos.y][state.mapPos.x];
    const current=REGION_INFO[currentRealm]||REGION_INFO.grund;
    const route=document.createElement('div');
    route.className='map-route';
    route.innerHTML='🧍 Siedler steht in <b>'+current.name+'</b> · '+current.terrain;
    box.appendChild(route);
    const board=document.createElement('div');
    board.className='walk-map';
    TILE_MAP.forEach((row,y)=>row.forEach((realm,x)=>{
      const info=REGION_INFO[realm];
      const open=isOpenTile(x,y);
      const here=state.mapPos.x===x&&state.mapPos.y===y;
      const tile=document.createElement('button');
      tile.className='walk-tile '+terrainClass(realm)+' '+(open?'open':'fog')+' '+(here?'here':'');
      tile.innerHTML=open?'<span class="tile-icon">'+info.icon+'</span><span class="tile-name">'+info.name+'</span><span class="tile-score">'+foundIn(realm)+' / '+totalIn(realm)+'</span>'+(here?'<span class="settler">🧍</span>':''):'<span class="foggy">☁️</span>';
      tile.onclick=()=>{
        if(!open){modal('Nebel der Unwissenheit','☁️','Gehe mit dem Siedler auf Nachbarfelder, um die Karte aufzudecken.');return;}
        state.mapPos={x,y};state.active=realm;revealAround(x,y,false);update();
      };
      board.appendChild(tile);
    }));
    box.appendChild(board);
    const controls=document.createElement('div');
    controls.className='map-controls';
    controls.innerHTML='<div></div>'+renderMoveButton('up','↑')+'<div></div>'+renderMoveButton('left','←')+'<button class="camp-btn" type="button">🏕️</button>'+renderMoveButton('right','→')+'<div></div>'+renderMoveButton('down','↓')+'<div></div>';
    box.appendChild(controls);
    controls.querySelectorAll('.move-btn').forEach(btn=>btn.onclick=()=>{const d=dirs[btn.dataset.dir];move(d[0],d[1])});
    const camp=controls.querySelector('.camp-btn');
    if(camp)camp.onclick=()=>{state.mapPos={...START_POS};state.active='grund';update()};
    const help=document.createElement('div');
    help.className='map-help';
    help.textContent='Laufe mit dem Siedler über die Karte. Nebel-Felder werden beim Betreten entdeckt und können neue Bio-Reiche öffnen.';
    box.appendChild(help);
  };
  window.addEventListener('keydown',e=>{
    if(!document.body||document.querySelector('.modal.show'))return;
    const map={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};
    if(!map[e.key])return;
    const d=dirs[map[e.key]];move(d[0],d[1]);e.preventDefault();
  });
  ensureMapState();
  if(typeof update==='function')update();
})();
