// ══════════════════════════════════════════
//  MISSION DATA
// ══════════════════════════════════════════
const M = [
  { id:'OX-001', name:'HELIOS PRIME',   type:'Solar Observation',   status:'active',
    dist:'1.2 AU', spd:'32,400 km/h', launch:'2026-01-14', dur:'180 days', orbit:'Heliocentric',
    crew:['AK','JT','MR','SL'], crewNames:['A. Kowalski','J. Torres','M. Remi','S. Lee'],
    crewRoles:['Commander','Pilot','Scientist','Engineer'],
    objs:['Solar wind analysis','CME monitoring','Surface temp mapping','Magnetic field charting'],
    fuel:82, oxy:91, pwr:78, days:89,
    cps:[{n:'L1 RELAY',d:'0.3 AU',done:true,boost:0},{n:'SOLAR GUARD',d:'0.7 AU',done:true,boost:18},
         {n:'CORONA GATE',d:'1.0 AU',done:false,boost:22},{n:'PERIHELION',d:'1.2 AU',done:false,boost:0}]
  },
  { id:'OX-002', name:'TITAN REACH',    type:'Planetary Expedition',status:'warning',
    dist:'8.6 AU', spd:'48,100 km/h', launch:'2025-08-20', dur:'540 days', orbit:'Saturn Transfer',
    crew:['DP','KM','RN'], crewNames:['D. Park','K. Mitchell','R. Nakamura'],
    crewRoles:['Commander','Biologist','Systems Engineer'],
    objs:['Titan atmosphere sampling','Methane lake analysis','Biosignature search','Hydrocarbon mapping'],
    fuel:47, oxy:68, pwr:55, days:235,
    cps:[{n:'JUPITER FLY',d:'5.2 AU',done:true,boost:25},{n:'ASTEROID Z3',d:'6.8 AU',done:true,boost:15},
         {n:'SATURN RING',d:'9.0 AU',done:false,boost:30},{n:'TITAN ORBIT',d:'9.5 AU',done:false,boost:0}]
  },
  { id:'OX-003', name:'AURORA STATION', type:'Space Station Build',  status:'active',
    dist:'400 km LEO', spd:'27,600 km/h', launch:'2026-03-01', dur:'Permanent', orbit:'Low Earth',
    crew:['VH','CH','TK','BM','PL'], crewNames:['V. Hassan','C. Hughes','T. Kim','B. Markov','P. Lindgren'],
    crewRoles:['Commander','Flight Eng','Robotics','Medical','Payload'],
    objs:['Module Alpha assembly','Solar array deploy','Life support cal','Scientific experiments'],
    fuel:95, oxy:88, pwr:92, days:42,
    cps:[{n:'ISS DOCK',d:'380 km',done:true,boost:10},{n:'MOD-ALPHA',d:'390 km',done:true,boost:8},
         {n:'SOLAR WING',d:'395 km',done:false,boost:12},{n:'FULL OPS',d:'400 km',done:false,boost:0}]
  },
  { id:'OX-004', name:'DEEP VOID IV',   type:'Deep Space Probe',    status:'critical',
    dist:'22.4 AU', spd:'52,000 km/h', launch:'2024-06-10', dur:'730 days', orbit:'Interstellar',
    crew:['AL','FW'], crewNames:['A. Lindqvist','F. Wang'],
    crewRoles:['Mission Specialist','Data Analyst'],
    objs:['Kuiper Belt mapping','Interstellar medium sampling','Dark matter detection','Gravity wave obs'],
    fuel:31, oxy:42, pwr:38, days:671,
    cps:[{n:'NEPTUNE PASS',d:'30 AU',done:true,boost:35},{n:'KUIPER EDGE',d:'50 AU',done:false,boost:40},
         {n:'HELIOPAUSE',d:'100 AU',done:false,boost:30},{n:'VOID DEPTH',d:'150 AU',done:false,boost:0}]
  },
  { id:'OX-005', name:'LUNARIS BASE',   type:'Lunar Habitat',       status:'active',
    dist:'384,400 km', spd:'3,683 km/h', launch:'2025-11-15', dur:'Permanent', orbit:'Lunar Surface',
    crew:['NP','OJ','EV'], crewNames:['N. Petrov','O. Jensen','E. Vasquez'],
    crewRoles:['Base Commander','Geologist','Support Engineer'],
    objs:['Regolith mining pilot','Water ice extraction','Habitat expansion','Telescope array'],
    fuel:88, oxy:94, pwr:85, days:149,
    cps:[{n:'TLI BURN',d:'50k km',done:true,boost:20},{n:'LUNAR ORBIT',d:'100k km',done:true,boost:15},
         {n:'DESCENT',d:'300k km',done:true,boost:10},{n:'BASE SITE',d:'384k km',done:false,boost:0}]
  },
  { id:'OX-006', name:'ARES VANGUARD',  type:'Mars Exploration',    status:'standby',
    dist:'Pre-Launch', spd:'0 km/h', launch:'TBD', dur:'900 days', orbit:'Pre-launch',
    crew:[], crewNames:[], crewRoles:[],
    objs:['Mars surface mapping','Soil sample collection','Atmospheric analysis','Water search'],
    fuel:100, oxy:100, pwr:100, days:0,
    cps:[{n:'LAUNCH PAD',d:'0',done:false,boost:0},{n:'TMI BURN',d:'1 AU',done:false,boost:40},
         {n:'MIDPOINT',d:'1.4 AU',done:false,boost:35},{n:'MARS ORBIT',d:'1.8 AU',done:false,boost:0}]
  }
];

// Crew array
const CREW = [];
M.forEach(m=>m.crew.forEach((init,i)=>CREW.push({
  init, name:m.crewNames[i], role:m.crewRoles[i]||'Specialist',
  mid:m.id, mname:m.name, status:m.status,
  health:Math.floor(70+Math.random()*30), stress:Math.floor(20+Math.random()*60),
  heart:Math.floor(60+Math.random()*30)
})));

// Comm log
const COMMS = [
  {t:'09:14:22',src:'OX-001',msg:'Solar flare detected — shielding trajectory adjusted.'},
  {t:'09:20:47',src:'GROUND',msg:'Roger HELIOS. Protocol DELTA-3 initiated.'},
  {t:'09:45:11',src:'OX-003',msg:'Module Alpha 60% complete. EVA team returning.'},
  {t:'10:02:38',src:'OX-004',msg:'CRITICAL: Oxygen below threshold. Resupply required.'},
  {t:'10:15:00',src:'GROUND',msg:'DEEP VOID: Resupply drone OX-R07 launching T-48h.'},
  {t:'10:28:59',src:'OX-002',msg:'Titan approach T-87 days. Entry systems nominal.'},
  {t:'10:55:30',src:'OX-005',msg:'LUNARIS: Water ice test — 4.2L recovered.'},
];

// Terminal live log buffer
const TLOG = [];

// Checkpoint countdown per mission (ticks until next CP hit)
const CP_COUNTDOWN = {};
M.forEach(m=>{
  const idx = m.cps.findIndex(c=>!c.done);
  if(idx>=0) CP_COUNTDOWN[m.id] = 8 + Math.floor(Math.random()*14);
});

// Alerts
let ALERTS = [
  {type:'c',msg:'OX-004 DEEP VOID IV: Oxygen 42% — CRITICAL'},
  {type:'w',msg:'OX-002 TITAN REACH: Fuel 47% — WARNING'},
  {type:'i',msg:'OX-003 AURORA: EVA in T-2:30h'},
];

// ══════════════════════════════════════════
//  STARFIELD
// ══════════════════════════════════════════
const SF=document.getElementById('starfield');
for(let i=0;i<180;i++){
  const s=document.createElement('div');s.className='star';
  const z=Math.random()*2+.4;
  s.style.cssText=`width:${z}px;height:${z}px;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${.2+Math.random()*.8};animation:none`;
  // manual twinkle via inline
  s.style.animation=`twinkle ${2+Math.random()*4}s ${Math.random()*3}s infinite alternate`;
  SF.appendChild(s);
}
// Inject twinkle keyframe
const ks=document.createElement('style');ks.textContent='@keyframes twinkle{0%{opacity:.1}100%{opacity:1}}';document.head.appendChild(ks);

// ══════════════════════════════════════════
//  CLOCK
// ══════════════════════════════════════════
setInterval(()=>{
  const n=new Date();
  document.getElementById('sysclock').textContent=
    [n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds()].map(x=>String(x).padStart(2,'0')).join(':')+' UTC';
},1000);

// ══════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════
function tstamp(){
  const n=new Date();
  return [n.getHours(),n.getMinutes(),n.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':');
}
function gaugeColor(v,crit,warn){
  if(v<=crit) return {a:'#ff2244',b:'#ff0033',p:'#ff2244'};
  if(v<=warn) return {a:'#ff6b00',b:'#ffcc00',p:'#ff8800'};
  return {a:'#00ff88',b:'#00c070',p:'#00ff88'};
}
function FC(v){return gaugeColor(v,35,60);}
function OC(v){return gaugeColor(v,40,65);}
function EC(v){return gaugeColor(v,35,60);}
function badge(s){
  const m={active:'b-active',warning:'b-warning',critical:'b-critical',standby:'b-standby'};
  const ic={active:'●',warning:'◉',critical:'⚠',standby:'○'};
  return `<span class="badge ${m[s]||'b-standby'}">${ic[s]||'○'} ${s.toUpperCase()}</span>`;
}

// ══════════════════════════════════════════
//  GAUGE HTML (bar)
// ══════════════════════════════════════════
function gHtml(mid,res,val,cfn){
  const id=`g-${mid}-${res}`, c=cfn(val);
  return `<div class="gauge-row">
    <span class="g-label">${res}</span>
    <div class="g-track">
      <div class="g-fill" id="${id}-f" style="width:${val}%;background:linear-gradient(90deg,${c.a},${c.b});box-shadow:0 0 7px ${c.a}">
        <div class="g-pulse" id="${id}-p" style="background:${c.p};box-shadow:0 0 8px ${c.p}"></div>
      </div>
    </div>
    <span class="g-val" id="${id}-v" style="color:${c.a}">${val.toFixed(1)}%</span>
  </div>`;
}
function updateG(mid,res,val,cfn){
  const id=`g-${mid}-${res}`, c=cfn(val);
  const f=document.getElementById(`${id}-f`);
  const p=document.getElementById(`${id}-p`);
  const v=document.getElementById(`${id}-v`);
  if(f){f.style.width=val+'%';f.style.background=`linear-gradient(90deg,${c.a},${c.b})`;f.style.boxShadow=`0 0 7px ${c.a}`;}
  if(p){p.style.background=c.p;p.style.boxShadow=`0 0 8px ${c.p}`;}
  if(v){v.textContent=val.toFixed(1)+'%';v.style.color=c.a;}
}

// ══════════════════════════════════════════
//  CHECKPOINT MINI STRIP
// ══════════════════════════════════════════
function cpMini(m){
  const nextI=m.cps.findIndex(c=>!c.done);
  let h='<div class="cp-mini">';
  m.cps.forEach((cp,i)=>{
    const isNext=i===nextI, past=cp.done;
    const dc=past?'var(--green)':isNext?'var(--purple)':'var(--textdim)';
    const lineC=past?'var(--green)':'rgba(0,245,255,0.1)';
    h+=`<div class="cp-node" style="${i<m.cps.length-1?`--lc:${lineC}`:''}">
      ${i<m.cps.length-1?`<div style="position:absolute;left:50%;top:4px;width:100%;height:2px;background:${lineC};z-index:0"></div>`:''}
      <div class="cp-dot ${past?'reached':''} ${isNext?'next-cp':''}" style="color:${dc};border-color:${dc};background:${past?dc+'2a':'transparent'}"></div>
      <div class="cp-name-mini">${cp.n.split(' ')[0]}</div>
    </div>`;
  });
  h+='</div>';
  if(nextI>=0&&m.cps[nextI].boost>0){
    h+=`<div style="font-family:'Share Tech Mono',monospace;font-size:0.5rem;color:var(--purple);margin-top:4px">⛽ Next: ${m.cps[nextI].n} +${m.cps[nextI].boost}% fuel</div>`;
  }
  return h;
}

// ══════════════════════════════════════════
//  MISSION CARD HTML
// ══════════════════════════════════════════
function mCard(m){
  const avs=m.crew.map(c=>`<div class="av">${c}</div>`).join('');
  return `<div class="mc" id="card-${m.id}" onclick="openDetail('${m.id}')">
    <div class="mid">${m.id} · ${m.type.toUpperCase()}</div>
    <div class="mname">${m.name}</div>
    <div class="mtype">${m.dist} · ${m.spd}</div>
    ${badge(m.status)}
    <div class="crew-row">${avs||'<span style="font-size:0.6rem;color:var(--textdim)">NO CREW</span>'}</div>
    <div class="gauges" onclick="event.stopPropagation()">
      ${gHtml(m.id,'FUEL',m.fuel,FC)}
      ${gHtml(m.id,'O₂',m.oxy,OC)}
      ${gHtml(m.id,'PWR',m.pwr,EC)}
    </div>
    ${cpMini(m)}
  </div>`;
}
function renderGrids(){
  const d=document.getElementById('mgrid-dash');
  const f=document.getElementById('mgrid-full');
  if(d) d.innerHTML=M.map(mCard).join('');
  if(f) f.innerHTML=M.map(mCard).join('');
}
renderGrids();

// ══════════════════════════════════════════
//  ALERTS
// ══════════════════════════════════════════
function renderAlerts(){
  const el=document.getElementById('alert-list');if(!el)return;
  const t=tstamp().slice(0,5);
  el.innerHTML=ALERTS.map(a=>`
    <div class="alert-item a-${a.type}">
      <span>${{c:'🔴',w:'🟠',i:'🔵',p:'🟣'}[a.type]||'🔵'}</span>
      <span>${a.msg}</span><span class="atime">${t}</span>
    </div>`).join('')||'<div style="font-size:0.65rem;color:var(--textdim);font-family:\'Share Tech Mono\',monospace;padding:5px">No active alerts</div>';
  document.getElementById('s-crit').textContent=ALERTS.filter(a=>a.type==='c').length;
}
renderAlerts();
function clearAlerts(){ALERTS=[];renderAlerts();}
function pushAlert(type,msg){ALERTS.push({type,msg});renderAlerts();}

// ══════════════════════════════════════════
//  DETAIL PANEL
// ══════════════════════════════════════════
let openMID=null;
function arcSVG(label,val,color){
  const R=50,sweep=Math.PI*1.5,sa=-Math.PI*.75;
  const bg=`M ${80+R*Math.cos(sa)} ${80+R*Math.sin(sa)} A ${R} ${R} 0 1 1 ${80+R*Math.cos(sa+sweep)} ${80+R*Math.sin(sa+sweep)}`;
  const pct=Math.min(1,val/100),ea=sa+sweep*pct,large=sweep*pct>Math.PI?1:0;
  const fg=pct>0?`M ${80+R*Math.cos(sa)} ${80+R*Math.sin(sa)} A ${R} ${R} 0 ${large} 1 ${80+R*Math.cos(ea)} ${80+R*Math.sin(ea)}`:'';
  return `<div class="arc-wrap">
    <svg width="160" height="115" viewBox="0 0 160 115" style="overflow:visible">
      <defs><filter id="af${label}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <path d="${bg}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="8" stroke-linecap="round"/>
      ${fg?`<path d="${fg}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" filter="url(#af${label})" style="transition:all 1.2s ease"/>`:''}
      <text x="80" y="76" text-anchor="middle" fill="${color}" font-family="Orbitron,sans-serif" font-size="17" font-weight="700">${val.toFixed(0)}%</text>
    </svg>
    <div class="arc-label">${label}</div>
  </div>`;
}
function refreshArcs(m){
  const el=document.getElementById('dp-arcs');if(!el)return;
  el.innerHTML=arcSVG('FUEL',m.fuel,'#ffcc00')+arcSVG('OXYGEN',m.oxy,'#00f5ff')+arcSVG('ENERGY',m.pwr,'#00ff88');
}
function openDetail(id){
  const m=M.find(x=>x.id===id);if(!m)return;
  openMID=id;
  document.getElementById('dp-name').textContent=m.name;
  document.getElementById('dp-id').textContent=`${m.id} — ${m.type}`;
  document.getElementById('dp-badge').innerHTML=badge(m.status);
  refreshArcs(m);
  // CP full strip
  const nextI=m.cps.findIndex(c=>!c.done);
  let cpH='<div style="display:flex;align-items:flex-start;gap:0;padding:4px 0">';
  m.cps.forEach((cp,i)=>{
    const isNext=i===nextI,past=cp.done;
    const dc=past?'var(--green)':isNext?'var(--purple)':'var(--textdim)';
    const lc=past?'var(--green)':'rgba(255,255,255,0.08)';
    cpH+=`<div style="flex:1;display:flex;flex-direction:column;align-items:center;position:relative">
      ${i<m.cps.length-1?`<div style="position:absolute;left:50%;top:6px;width:100%;height:2px;background:${lc}"></div>`:''}
      <div style="width:13px;height:13px;border-radius:50%;border:2px solid ${dc};background:${past?dc+'33':'transparent'};z-index:1;${isNext?'box-shadow:0 0 12px '+dc+',0 0 24px '+dc:''}"></div>
      <div style="font-family:'Share Tech Mono',monospace;font-size:0.5rem;color:${isNext?'#c084fc':past?'var(--green)':'var(--textdim)'};text-align:center;margin-top:5px;line-height:1.3">${cp.n}</div>
      <div style="font-size:0.45rem;color:var(--textdim);text-align:center">${cp.d}</div>
      ${cp.boost>0&&!past?`<div style="font-size:0.48rem;color:var(--yellow);margin-top:2px">+${cp.boost}%</div>`:''}
    </div>`;
  });
  cpH+='</div>';
  document.getElementById('dp-cpstrip').innerHTML=cpH;
  document.getElementById('dp-specs').innerHTML=[
    ['Distance',m.dist],['Speed',m.spd],['Launch',m.launch],
    ['Duration',m.dur],['Orbit',m.orbit],['Days Elapsed',m.days],['Crew Size',m.crew.length]
  ].map(([k,v])=>`<div class="srow"><span class="sk">${k}</span><span class="sv">${v}</span></div>`).join('');
  document.getElementById('dp-objs').innerHTML=m.objs.map(o=>`<li>${o}</li>`).join('');
  document.getElementById('dp-crew').innerHTML=m.crewNames.map((n,i)=>
    `<div style="background:var(--bgcard);border:1px solid var(--border);padding:10px 14px;min-width:110px">
      <div style="font-family:'Orbitron',sans-serif;font-size:0.65rem;margin-bottom:3px">${n}</div>
      <div style="font-size:0.58rem;color:var(--textdim);text-transform:uppercase;letter-spacing:1px">${m.crewRoles[i]||''}</div>
    </div>`).join('')||'<span style="color:var(--textdim);font-size:0.7rem">No crew assigned</span>';
  document.getElementById('detail-panel').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeDetail(){document.getElementById('detail-panel').classList.remove('open');document.body.style.overflow='';openMID=null;}

// ══════════════════════════════════════════
//  CREW PAGE
// ══════════════════════════════════════════
(function renderCrew(){
  const sc={active:'var(--green)',warning:'var(--orange)',critical:'var(--red)',standby:'var(--textdim)'};
  document.getElementById('cgrid').innerHTML=CREW.map(c=>`
    <div class="cc">
      <div class="av-lg" style="border-color:${sc[c.status]||'var(--borderhi)'}">${c.init}</div>
      <div class="cname">${c.name}</div>
      <div class="crole">${c.role}</div>
      <div class="cmission" style="color:${sc[c.status]};font-size:0.62rem;margin-bottom:8px">${c.mname}</div>
      <div class="gauges">
        <div class="gauge-row">
          <span class="g-label" style="width:42px">Health</span>
          <div class="g-track"><div class="g-fill" style="width:${c.health}%;background:linear-gradient(90deg,var(--green),#00c070);box-shadow:0 0 6px var(--green)"></div></div>
          <span class="g-val" style="color:var(--green)">${c.health}%</span>
        </div>
        <div class="gauge-row">
          <span class="g-label" style="width:42px">Stress</span>
          <div class="g-track"><div class="g-fill" style="width:${c.stress}%;background:linear-gradient(90deg,${c.stress>60?'var(--red)':'var(--orange)'},${c.stress>60?'#cc0022':'#cc4400'});box-shadow:0 0 6px ${c.stress>60?'var(--red)':'var(--orange)'}"></div></div>
          <span class="g-val" style="color:${c.stress>60?'var(--red)':'var(--orange)'}">${c.stress}%</span>
        </div>
      </div>
      <div style="font-family:'Share Tech Mono',monospace;font-size:0.58rem;color:var(--textdim);margin-top:7px">HR: ${c.heart}bpm</div>
    </div>`).join('');
})();

// ══════════════════════════════════════════
//  COMMS
// ══════════════════════════════════════════
function renderComms(){
  const el=document.getElementById('cmsg-list');if(!el)return;
  el.innerHTML=COMMS.map(c=>`
    <div class="cmsg"><span class="ctime">${c.t}</span><span class="csrc">${c.src}</span><span class="ctxt">${c.msg}</span></div>`).join('');
  el.scrollTop=el.scrollHeight;
}
function initSignals(){
  const sg=document.getElementById('sig-grid');if(!sg||sg.dataset.done)return;sg.dataset.done='1';
  M.filter(m=>m.crew.length>0).forEach(m=>{
    const s=m.status==='critical'?18+Math.floor(Math.random()*28):55+Math.floor(Math.random()*40);
    const c=s<40?'var(--red)':s<65?'var(--orange)':'var(--green)';
    sg.innerHTML+=`<div style="background:var(--bgcard);border:1px solid var(--border);padding:11px">
      <div style="display:flex;justify-content:space-between;margin-bottom:7px">
        <span style="font-family:'Orbitron',sans-serif;font-size:0.58rem;color:var(--text2)">${m.id}</span>
        <span style="font-family:'Share Tech Mono',monospace;font-size:0.62rem;color:${c}">${s}%</span>
      </div>
      <div style="height:5px;background:rgba(255,255,255,.06);border-radius:2px">
        <div style="height:5px;width:${s}%;background:${c};border-radius:2px;box-shadow:0 0 7px ${c}"></div>
      </div></div>`;
  });
}
function sendComm(){
  const inp=document.getElementById('cinput');if(!inp||!inp.value.trim())return;
  COMMS.push({t:tstamp(),src:'GROUND',msg:inp.value});
  if(COMMS.length>60)COMMS.shift();
  renderComms();inp.value='';
}

// ══════════════════════════════════════════
//  TRAJECTORY
// ══════════════════════════════════════════
function drawTraj(){
  const cv=document.getElementById('traj-canvas');if(!cv)return;
  cv.width=cv.offsetWidth||920;const W=cv.width,H=cv.height;
  const ctx=cv.getContext('2d');
  ctx.fillStyle='#020810';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(0,245,255,0.05)';ctx.lineWidth=1;
  for(let x=0;x<W;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  const cx=W/2,cy=H/2;
  const sg=ctx.createRadialGradient(cx,cy,0,cx,cy,55);
  sg.addColorStop(0,'rgba(255,220,40,.9)');sg.addColorStop(.5,'rgba(255,120,0,.4)');sg.addColorStop(1,'transparent');
  ctx.fillStyle=sg;ctx.beginPath();ctx.arc(cx,cy,55,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(0,100,255,.7)';ctx.beginPath();ctx.arc(cx+72,cy,9,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(180,230,255,.7)';ctx.font="9px 'Orbitron',sans-serif";ctx.fillText('EARTH',cx+84,cy+4);
  const ships=[
    {m:M[0],r:95, ang:1.1, col:'#00f5ff'},
    {m:M[2],r:130,ang:2.5, col:'#00ff88'},
    {m:M[4],r:68, ang:0.4, col:'#a855f7'},
    {m:M[1],r:200,ang:3.8, col:'#ffcc00'},
    {m:M[3],r:275,ang:5.1, col:'#ff2244'},
  ];
  ships.forEach(s=>{
    const{m,r,ang,col}=s;
    ctx.strokeStyle=col+'33';ctx.lineWidth=1;ctx.setLineDash([4,8]);
    ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
    // Checkpoints on orbit ring
    if(m.cps){
      m.cps.forEach((cp,i)=>{
        const ca=ang-1.4+(i/(Math.max(1,m.cps.length-1)))*1.4;
        const px=cx+Math.cos(ca)*r,py=cy+Math.sin(ca)*r;
        const cpCol=cp.done?col:'rgba(168,85,247,.75)';
        if(!cp.done&&cp.boost>0){
          ctx.strokeStyle='rgba(168,85,247,.4)';ctx.lineWidth=1;ctx.setLineDash([2,4]);
          ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
        }
        ctx.fillStyle=cpCol;ctx.beginPath();ctx.arc(px,py,cp.done?3.5:5,0,Math.PI*2);ctx.fill();
        if(!cp.done){
          ctx.fillStyle='rgba(200,160,255,.8)';ctx.font="7px 'Share Tech Mono',monospace";
          ctx.fillText(cp.n.split(' ')[0],px+8,py);
          if(cp.boost>0){ctx.fillStyle='rgba(255,200,0,.7)';ctx.fillText('+'+cp.boost+'%',px+8,py+10);}
        }
      });
    }
    // Trail
    ctx.strokeStyle=col+'55';ctx.lineWidth=1.5;ctx.beginPath();
    for(let t=ang-.9;t<ang;t+=0.04){
      const tx=cx+Math.cos(t)*r,ty=cy+Math.sin(t)*r;
      t===ang-.9?ctx.moveTo(tx,ty):ctx.lineTo(tx,ty);
    }ctx.stroke();
    // Ship dot
    const sx=cx+Math.cos(ang)*r,sy=cy+Math.sin(ang)*r;
    const dg=ctx.createRadialGradient(sx,sy,0,sx,sy,12);
    dg.addColorStop(0,col);dg.addColorStop(1,'transparent');
    ctx.fillStyle=dg;ctx.beginPath();ctx.arc(sx,sy,12,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=col;ctx.beginPath();ctx.arc(sx,sy,5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=col;ctx.font="10px 'Orbitron',sans-serif";ctx.fillText(m.name.split(' ')[0],sx+8,sy-8);
  });
  // Legend box
  ctx.fillStyle='rgba(2,8,20,.72)';ctx.fillRect(W-185,H-90,180,84);
  ctx.strokeStyle='rgba(0,245,255,.2)';ctx.lineWidth=1;ctx.strokeRect(W-185,H-90,180,84);
  ctx.fillStyle='rgba(0,245,255,.8)';ctx.font="9px 'Orbitron',sans-serif";ctx.fillText('LEGEND',W-175,H-72);
  ctx.fillStyle='rgba(168,85,247,.75)';ctx.beginPath();ctx.arc(W-172,H-56,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(200,160,255,.8)';ctx.font="8px 'Share Tech Mono',monospace";ctx.fillText('UPCOMING CHECKPOINT',W-163,H-53);
  ctx.fillStyle='rgba(0,255,136,.8)';ctx.beginPath();ctx.arc(W-172,H-38,3.5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(180,220,180,.7)';ctx.fillText('PASSED CHECKPOINT',W-163,H-35);
}

// ══════════════════════════════════════════
//  TERMINAL
// ══════════════════════════════════════════
let termBooted=false;
function initTerm(){
  if(termBooted)return;termBooted=true;
  tprint([
    {col:'#00f5ff',t:'ORBITX MISSION CONTROL TERMINAL v4.3.0'},
    {col:'var(--text2)',t:'Copyright 2026 OrbitX Space Agency — Checkpoint simulation ACTIVE'},
    {col:'',t:''},
    {col:'var(--green)',t:'[OK] Navigation arrays synchronized'},
    {col:'var(--green)',t:'[OK] Life support telemetry active'},
    {col:'var(--green)',t:'[OK] Fuel replenishment system online'},
    {col:'var(--orange)',t:'[WARN] OX-004: Oxygen 42% — critical watch'},
    {col:'var(--orange)',t:'[WARN] OX-002: Fuel 47% — monitoring'},
    {col:'',t:''},
    {col:'var(--purple)',t:'Checkpoint events will appear here in real-time.'},
    {col:'var(--text2)',t:'Type "help" for commands.'},
    {col:'',t:''},
  ]);
  TLOG.forEach(l=>tprint([l]));
}
function tprint(lines){
  const t=document.getElementById('term');if(!t)return;
  const cur=t.querySelector('.tcursor');if(cur)cur.parentElement.remove();
  lines.forEach(l=>{
    const d=document.createElement('div');d.className='tl';
    d.style.color=l.col||'var(--text2)';d.textContent=l.t;
    t.appendChild(d);
  });
  const c=document.createElement('div');c.className='tl';c.innerHTML='<span class="tcursor"></span>';
  t.appendChild(c);t.scrollTop=t.scrollHeight;
}
function tlog(line){
  TLOG.push(line);
  const t=document.getElementById('term');
  if(t&&t.children.length>1)tprint([line]);
}
function tc(cmd){
  const t=document.getElementById('term');if(!t)return;
  const cur=t.querySelector('.tcursor');if(cur)cur.parentElement.remove();
  const p=document.createElement('div');p.className='tl';
  p.innerHTML=`<span style="color:var(--cyan)">ORBITX:~$</span> <span style="color:var(--green)">${cmd}</span>`;
  t.appendChild(p);
  const cmds={
    'status':()=>[
      {col:'#00f5ff',t:`── Status Report ${tstamp()} UTC ──`},
      {col:'var(--green)',t:`  Active Missions : ${M.filter(m=>m.status==='active').length}`},
      {col:M.filter(m=>m.status==='critical').length>0?'var(--red)':'var(--green)',t:`  Critical        : ${M.filter(m=>m.status==='critical').length}`},
      {col:'var(--text2)',t:`  Avg Fuel        : ${(M.reduce((s,m)=>s+m.fuel,0)/M.length).toFixed(1)}%`},
      {col:'var(--text2)',t:`  Avg Oxygen      : ${(M.reduce((s,m)=>s+m.oxy,0)/M.length).toFixed(1)}%`},
      {col:'var(--text2)',t:`  Crew in Space   : ${CREW.length}`},
    ],
    'list missions':()=>M.map(m=>({col:m.status==='critical'?'var(--red)':m.status==='warning'?'var(--orange)':'var(--text2)',
      t:`  ${m.id}  ${m.name.padEnd(16)} [${m.status.toUpperCase().padEnd(8)}]  F:${m.fuel.toFixed(0).padStart(3)}%  O2:${m.oxy.toFixed(0).padStart(3)}%  P:${m.pwr.toFixed(0).padStart(3)}%`})),
    'crew check':()=>CREW.map(c=>({col:'var(--text2)',t:`  ${c.init}  ${c.name.padEnd(18)} ${c.role.padEnd(22)} ${c.mname}`})),
    'alert scan':()=>[
      {col:'#00f5ff',t:'── Alert Scan ──'},
      ...ALERTS.map(a=>({col:{c:'var(--red)',w:'var(--orange)',i:'var(--text2)',p:'var(--purple)'}[a.type]||'var(--text2)',t:`  [${a.type.toUpperCase()}] ${a.msg}`})),
      ...(ALERTS.length===0?[{col:'var(--green)',t:'  All clear — no active alerts'}]:[])
    ],
    'checkpoint status':()=>[
      {col:'#00f5ff',t:'── Checkpoint Status ──'},
      ...M.map(m=>{
        const next=m.cps.find(c=>!c.done);
        return {col:'var(--purple)',t:`  ${m.id} ${m.name.padEnd(14)} → ${next?`${next.n} (+${next.boost}% fuel)`:'ALL COMPLETE'}`};
      })
    ],
    'fuel report':()=>[
      {col:'#00f5ff',t:'── Fuel Report ──'},
      ...M.map(m=>({col:m.fuel<35?'var(--red)':m.fuel<60?'var(--orange)':'var(--green)',
        t:`  ${m.id} ${m.name.padEnd(14)}  FUEL: ${m.fuel.toFixed(1).padStart(5)}%  ${m.fuel<35?'[CRITICAL]':m.fuel<60?'[WARNING]':'[OK]'}`}))
    ],
    'help':()=>[
      {col:'#00f5ff',t:'Available commands:'},
      {col:'var(--text2)',t:'  status             — system overview'},
      {col:'var(--text2)',t:'  list missions       — all mission data'},
      {col:'var(--text2)',t:'  crew check          — crew roster'},
      {col:'var(--text2)',t:'  alert scan          — active alerts'},
      {col:'var(--purple)',t:'  checkpoint status   — route checkpoints & fuel boosts'},
      {col:'var(--text2)',t:'  fuel report         — per-mission fuel levels'},
    ]
  };
  const fn=cmds[cmd.toLowerCase().trim()];
  setTimeout(()=>tprint(fn?fn():[{col:'var(--red)',t:`Unknown command: "${cmd}" — type "help"`}]),80);
}
function tinputRun(){
  const inp=document.getElementById('tinput');if(!inp||!inp.value.trim())return;
  tc(inp.value.toLowerCase().trim());inp.value='';
}
function clearTerm(){const t=document.getElementById('term');if(t)t.innerHTML='<div class="tl"><span class="tcursor"></span></div>';}

// ══════════════════════════════════════════
//  COMPARE
// ══════════════════════════════════════════
function renderCompare(){
  const sc={active:'var(--green)',warning:'var(--orange)',critical:'var(--red)',standby:'var(--textdim)'};
  document.getElementById('cmp-body').innerHTML=M.map(m=>{
    const next=m.cps.find(c=>!c.done);
    return `<tr>
      <td style="font-family:'Orbitron',sans-serif;font-size:0.62rem;color:var(--cyan)">${m.name}<br><span style="color:var(--textdim);font-size:0.55rem">${m.id}</span></td>
      <td>${m.type}</td>
      <td style="color:${sc[m.status]};font-family:'Share Tech Mono',monospace">${m.status.toUpperCase()}</td>
      <td style="text-align:center">${m.crew.length}</td>
      <td><span style="color:${m.fuel<35?'var(--red)':m.fuel<60?'var(--orange)':'var(--green)'}">${m.fuel.toFixed(1)}%</span></td>
      <td><span style="color:${m.oxy<40?'var(--red)':m.oxy<65?'var(--orange)':'var(--cyan)'}">${m.oxy.toFixed(1)}%</span></td>
      <td><span style="color:${m.pwr<35?'var(--red)':m.pwr<60?'var(--orange)':'var(--green)'}">${m.pwr.toFixed(1)}%</span></td>
      <td style="color:var(--purple);font-family:'Share Tech Mono',monospace;font-size:0.6rem">${next?next.n+' (+'+next.boost+'%)':'✓ COMPLETE'}</td>
      <td>${m.days}</td>
    </tr>`;
  }).join('');
}
renderCompare();

// ══════════════════════════════════════════
//  CHECKPOINT NOTIFICATION
// ══════════════════════════════════════════
let cpNotifTimer=null;
function showCPNotif(mname,cpName,boost){
  const el=document.getElementById('cp-notif');
  document.getElementById('cpn-mission').textContent=mname;
  document.getElementById('cpn-msg').textContent=`${cpName} — +${boost}% FUEL REPLENISHED`;
  el.style.display='block';
  el.style.animation='notifIn .4s ease forwards';
  clearTimeout(cpNotifTimer);
  cpNotifTimer=setTimeout(()=>{
    el.style.animation='notifOut .4s ease forwards';
    setTimeout(()=>el.style.display='none',400);
  },5000);
}

// ══════════════════════════════════════════
//  EXPORT
// ══════════════════════════════════════════
function exportSummary(){
  let txt='ORBITX MISSION SUMMARY REPORT\nGenerated: '+new Date().toUTCString()+'\n'+'='.repeat(60)+'\n\n';
  M.forEach(m=>{
    const next=m.cps.find(c=>!c.done);
    txt+=`[${m.id}] ${m.name}\n  Type: ${m.type}\n  Status: ${m.status.toUpperCase()}\n`;
    txt+=`  Crew: ${m.crewNames.join(', ')||'None'}\n`;
    txt+=`  Fuel: ${m.fuel.toFixed(1)}%  O2: ${m.oxy.toFixed(1)}%  Energy: ${m.pwr.toFixed(1)}%\n`;
    txt+=`  Next Checkpoint: ${next?next.n+' (+'+next.boost+'% fuel)':'All complete'}\n`;
    txt+=`  Days Elapsed: ${m.days}\n\n`;
  });
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));
  a.download='orbitx-summary.txt';a.click();
}

// ══════════════════════════════════════════
//  NAV
// ══════════════════════════════════════════
function showPage(p){
  document.querySelectorAll('.page').forEach(e=>e.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  const pages=['dashboard','missions','crew','comms','trajectory','terminal','compare'];
  document.querySelectorAll('.nb').forEach((b,i)=>b.classList.toggle('active',pages[i]===p));
  if(p==='trajectory')setTimeout(drawTraj,50);
  if(p==='terminal')initTerm();
  if(p==='compare')renderCompare();
  if(p==='comms'){renderComms();initSignals();}
}

// ══════════════════════════════════════════
//  SIMULATION ENGINE (main tick)
// ══════════════════════════════════════════
const TICK = 2200; // ms

function simTick(){
  M.forEach(m=>{
    if(m.status==='standby') return;
    const prev={fuel:m.fuel,oxy:m.oxy,pwr:m.pwr,status:m.status};

    // DRAIN
    m.fuel = +(Math.max(4, m.fuel - (0.22 + Math.random()*.18))).toFixed(2);
    m.oxy  = +(Math.max(4, m.oxy  - (0.10 + Math.random()*.08))).toFixed(2);
    m.pwr  = +(Math.max(4, Math.min(100, m.pwr - 0.15 + 0.06 + (Math.random()-.5)*.25))).toFixed(2);

    // ── CHECKPOINT HIT? ──
    if(CP_COUNTDOWN[m.id]!==undefined){
      CP_COUNTDOWN[m.id]--;
      if(CP_COUNTDOWN[m.id]<=0){
        const ni=m.cps.findIndex(c=>!c.done);
        if(ni>=0){
          const cp=m.cps[ni];
          cp.done=true;
          const ts=tstamp();

          if(cp.boost>0){
            const oldF=m.fuel;
            m.fuel=+(Math.min(100,m.fuel+cp.boost)).toFixed(2);
            // Terminal logs (checkpoint event)
            tlog({col:'',t:''});
            tlog({col:'var(--purple)',t:`[${ts}] ╔══ CHECKPOINT REACHED ══╗`});
            tlog({col:'var(--purple)',t:`[${ts}] ║  Mission  : ${m.name} (${m.id})`});
            tlog({col:'var(--purple)',t:`[${ts}] ║  Station  : ${cp.n} @ ${cp.d}`});
            tlog({col:'var(--yellow)',t:`[${ts}] ║  Fuel     : ${oldF.toFixed(1)}% → ${m.fuel.toFixed(1)}%  (+${cp.boost}%)`});
            tlog({col:'var(--green)', t:`[${ts}] ╚══ REFUEL COMPLETE ⛽ ════╝`});
            tlog({col:'',t:''});
            // Notification pop-up
            showCPNotif(m.name,cp.n,cp.boost);
            // Alert
            pushAlert('p',`⛽ ${m.id} ${m.name}: Refuelled at ${cp.n} — fuel now ${m.fuel.toFixed(0)}%`);
            // Visual flash on gauge fill
            const gf=document.getElementById(`g-${m.id}-FUEL-f`);
            if(gf){
              gf.style.transition='none';
              gf.style.boxShadow='0 0 0 6px rgba(168,85,247,.7)';
              setTimeout(()=>{gf.style.transition='';gf.style.boxShadow='';},1600);
            }
          } else {
            tlog({col:'var(--purple)',t:`[${ts}] [CHECKPOINT] ${m.id} ${m.name} → ${cp.n} (no refuel)`});
          }

          // Schedule next CP
          const fi=m.cps.findIndex(c=>!c.done);
          if(fi>=0) CP_COUNTDOWN[m.id]=10+Math.floor(Math.random()*16);
          else {
            delete CP_COUNTDOWN[m.id];
            tlog({col:'var(--green)',t:`[${tstamp()}] [MISSION] ${m.id} ${m.name} — All checkpoints complete!`});
          }
        } else { delete CP_COUNTDOWN[m.id]; }
      }
    }

    // STATUS UPDATE
    if(m.fuel<30||m.oxy<35) m.status='critical';
    else if(m.fuel<55||m.oxy<60) m.status='warning';
    else m.status='active';

    if(m.status!==prev.status){
      const ts=tstamp();
      if(m.status==='critical'){
        pushAlert('c',`${m.id} ${m.name}: CRITICAL — fuel ${m.fuel.toFixed(0)}% oxy ${m.oxy.toFixed(0)}%`);
        tlog({col:'var(--red)',t:`[${ts}] [CRITICAL] ${m.id} ${m.name} — fuel:${m.fuel.toFixed(1)}% oxy:${m.oxy.toFixed(1)}%`});
      } else if(m.status==='warning'){
        pushAlert('w',`${m.id} ${m.name}: WARNING — fuel ${m.fuel.toFixed(0)}%`);
        tlog({col:'var(--orange)',t:`[${ts}] [WARNING] ${m.id} ${m.name} — fuel:${m.fuel.toFixed(1)}%`});
      } else if(prev.status!=='active'){
        tlog({col:'var(--green)',t:`[${ts}] [NOMINAL] ${m.id} ${m.name} — status recovered`});
      }
    }

    // UPDATE GAUGE DOM
    updateG(m.id,'FUEL',m.fuel,FC);
    updateG(m.id,'O₂',m.oxy,OC);
    updateG(m.id,'PWR',m.pwr,EC);

    // Update card badge
    const card=document.getElementById('card-'+m.id);
    if(card){const b=card.querySelector('.badge');if(b)b.outerHTML=badge(m.status);} // outerHTML swap
  });

  // Stats bar
  document.getElementById('s-active').textContent=M.filter(m=>m.status==='active').length;
  document.getElementById('s-fuel').textContent=(M.reduce((s,m)=>s+m.fuel,0)/M.length).toFixed(0)+'%';

  // Refresh open detail arcs
  if(openMID){const m=M.find(x=>x.id===openMID);if(m)refreshArcs(m);}

  // Refresh compare if visible
  if(document.getElementById('page-compare').classList.contains('active'))renderCompare();

  // Update trajectory if visible
  if(document.getElementById('page-trajectory').classList.contains('active'))drawTraj();
}
setInterval(simTick, TICK);

// Auto-comms feed
const autoMsgs=[
  m=>`${m.id}: Telemetry nominal. Fuel ${m.fuel.toFixed(0)}%, O2 ${m.oxy.toFixed(0)}%.`,
  m=>`${m.id}: Course correction applied +0.02°.`,
  m=>`${m.id}: Crew vitals all nominal.`,
  m=>`${m.id}: Solar array output ${m.pwr.toFixed(0)}%.`,
  m=>`${m.id}: Navigation lock confirmed. On-course.`,
];
setInterval(()=>{
  const active=M.filter(m=>m.crew.length>0&&m.status!=='standby');
  if(!active.length)return;
  const m=active[Math.floor(Math.random()*active.length)];
  const fn=autoMsgs[Math.floor(Math.random()*autoMsgs.length)];
  COMMS.push({t:tstamp(),src:m.id,msg:fn(m)});
  if(COMMS.length>60)COMMS.shift();
  if(document.getElementById('page-comms').classList.contains('active'))renderComms();
},7000);