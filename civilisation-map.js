(function(){
  const REGION_INFO={
    grund:{name:'Startlager',icon:'🏕️',terrain:'Grasebene'},
    zelle:{name:'Zell-Labor',icon:'🔬',terrain:'Forschungsbezirk'},
    bewegung:{name:'Knochengebirge',icon:'🦴',terrain:'Gebirge'},
    kreislauf:{name:'Lungenland',icon:'🫁',terrain:'Flussland'},
    nerven:{name:'Nervenstadt',icon:'🧠',terrain:'Hochkultur'},
    immun:{name:'Immunfestung',icon:'🛡️',terrain:'Burgland'},
    oekologie:{name:'Öko-Wald',icon:'🌳',terrain:'Waldreich'}
  };
  const order=['grund','zelle','bewegung','kreislauf','nerven','immun','oekologie'];
  const originalRenderMap=renderMap;
  renderMap=function(){
    const box=document.querySelector('#worldMap');
    if(!box){originalRenderMap();return;}
    box.innerHTML='';
    const route=document.createElement('div');
    route.className='map-route';
    const current=REGION_INFO[state.active]||REGION_INFO.grund;
    route.innerHTML='🧍 Siedler unterwegs: <b>'+current.name+'</b> · '+current.terrain;
    box.appendChild(route);
    order.forEach(id=>{
      const info=REGION_INFO[id];
      const open=state.open.includes(id);
      const tile=document.createElement('button');
      tile.className='map-tile '+(state.active===id?'active ':'')+(open?'':'locked');
      tile.innerHTML='<div class="map-icon">'+info.icon+'</div><div class="map-name">'+info.name+'</div><div class="map-progress">'+(open?foundIn(id)+' / '+totalIn(id):'unerforscht')+'</div>'+(state.active===id?'<div class="settler">🧍</div>':'');
      tile.onclick=()=>{
        if(!open){
          modal('Noch Nebel auf der Karte','☁️','Dieses Gebiet ist noch nicht erforscht. Sammle mehr Wissen, um es freizuschalten.');
          return;
        }
        state.active=id;
        update();
      };
      box.appendChild(tile);
    });
    const legend=document.createElement('div');
    legend.className='map-legend';
    legend.innerHTML='<span>🧍 aktueller Siedler</span><span>☁️ Nebel = gesperrt</span><span>Gold = erforscht</span>';
    box.appendChild(legend);
    const help=document.createElement('div');
    help.className='map-help';
    help.textContent='Neue Entdeckungen öffnen Regionen. Tippe auf eine Region, um dort weiterzuforschen.';
    box.appendChild(help);
  };
})();
