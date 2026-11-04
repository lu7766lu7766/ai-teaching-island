import * as THREE from 'three';
// Q 版角色產生器：同一套比例，依 look 組合髮型、帽子、服裝、配件與手持道具，讓每位角色一眼就能分辨。
const cache=new Map();
const material=(c,glow=0)=>{const key=c+'|'+glow;if(!cache.has(key))cache.set(key,new THREE.MeshStandardMaterial({color:c,roughness:.77,...(glow?{emissive:c,emissiveIntensity:glow}:{})}));return cache.get(key);};
const SKINS=['#ffe0c1','#d6a178','#f2c5a3','#b78060'],SHIRTS=['#eaa6b1','#9ac9df','#dbc286','#bea5df','#a5cbb8','#edbedb'],HAIRS=['#4b3c4c','#8b624d','#343e60','#b48b63','#67627e'],IRISES=['#607eaa','#64836b','#8c69a0','#90684d'];
function defaults(index,owner){return {skin:SKINS[index%4],hair:owner?'#dc8740':HAIRS[index%5],iris:IRISES[index%4],outfit:owner?'#8fc5b8':SHIRTS[index%6],pants:'#545978',legs:'#fff4e8',shoes:'#4d4b66',accent:owner?'#efa753':'#a56583',outfitType:owner||index%2===0?'tee':'dress',hairStyle:owner?'flame':index%3===1?'twintail':'short',hat:!owner&&index%3===0?'beret':null,hatColor:SHIRTS[index%6]};}

export function createAnimeCharacter(index=0,owner=false,look=null){
 const L={...defaults(index,owner),...(look?{hat:null,hairStyle:'short',outfitType:'tee'}:{}),...(look||{})};
 const g=new THREE.Group();g.userData.characterStyle='anime-chibi';g.userData.look=look?.id||null;
 const mesh=(p,geo,c,x=0,y=0,z=0,glow=0)=>{const m=new THREE.Mesh(geo,material(c,glow));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m;};
 const ball=(p,r,c,x=0,y=0,z=0,glow=0)=>mesh(p,new THREE.SphereGeometry(r,12,10),c,x,y,z,glow);
 const cyl=(p,r1,r2,h,c,x=0,y=0,z=0,n=10)=>mesh(p,new THREE.CylinderGeometry(r1,r2,h,n),c,x,y,z);
 const box=(p,w,h,d,c,x=0,y=0,z=0)=>mesh(p,new THREE.BoxGeometry(w,h,d),c,x,y,z);
 const cone=(p,r,h,c,x=0,y=0,z=0,n=10)=>mesh(p,new THREE.ConeGeometry(r,h,n),c,x,y,z);
 const torus=(p,r,t,c,x=0,y=0,z=0,arc=Math.PI*2)=>mesh(p,new THREE.TorusGeometry(r,t,6,18,arc),c,x,y,z);
 const legs=[],arms=[];const type=L.outfitType,shirtless=type==='shirtless',longPants=shirtless||type==='overalls'||L.longPants;
 const sleeve=shirtless?L.skin:type==='sailor'?'#fbf6ec':L.outfit;
 for(const side of [-1,1]){const leg=new THREE.Group();leg.position.set(side*.105,.30,0);g.add(leg);cyl(leg,.065,.07,.24,longPants?L.pants:L.legs,0,-.10,0,8);box(leg,.13,.10,.23,L.shoes,0,-.25,.04);legs.push(leg);
  const arm=new THREE.Group();arm.position.set(side*.225,.77,0);g.add(arm);cyl(arm,.075,.065,.26,sleeve,0,-.11,0,8);ball(arm,.077,L.skin,0,-.27,0);arms.push(arm);}
 // 身體與服裝
 if(type==='robe'){cyl(g,.18,.32,.62,L.outfit,0,.5);torus(g,.205,.03,L.accent,0,.55,0).rotation.x=Math.PI/2;box(g,.05,.5,.02,L.accent,0,.5,.255);}
 else if(shirtless){cyl(g,.18,.21,.42,L.skin,0,.62);for(const side of [-1,1])box(g,.1,.012,.01,'#c58d66',side*.07,.72,.2);box(g,.012,.16,.01,'#c58d66',0,.57,.205);box(g,.36,.2,.27,L.pants,0,.37);box(g,.36,.04,.28,'#2a2526',0,.46);}
 else{cyl(g,.18,.22,.42,type==='sailor'?'#fbf6ec':L.outfit,0,.62);
  if(type==='dress')cyl(g,.20,.30,.22,L.outfit,0,.42,0,12);else box(g,.36,.19,.26,L.pants,0,.37);
  if(type==='apron'){box(g,.3,.42,.03,L.accent,0,.5,.21);box(g,.2,.14,.02,'#ffffff',0,.46,.23);}
  if(type==='overalls'){box(g,.3,.3,.03,L.pants,0,.5,.21);for(const side of [-1,1])box(g,.04,.2,.03,L.pants,side*.11,.72,.2);}
  if(type==='sailor'){const collar=box(g,.34,.03,.2,'#34507a',0,.84,.08);collar.rotation.x=.25;box(g,.07,.12,.03,'#d4565a',0,.7,.21);}
  else{box(g,.21,.19,.035,'#fff8ef',0,.76,.17);for(const side of [-1,1]){const collar=box(g,.13,.045,.04,'#535b80',side*.065,.83,.20);collar.rotation.z=side*.38;}box(g,.055,.13,.045,L.accent,0,.70,.20);}}
 if(L.cape){const cape=box(g,.48,.78,.04,L.cape,0,.52,-.2);cape.rotation.x=-.12;}
 if(L.backpack){box(g,.3,.34,.16,L.backpack,0,.62,-.25);box(g,.24,.1,.06,'#f3e3c9',0,.52,-.34);}
 if(L.scarf){torus(g,.17,.05,L.scarf,0,.87,0).rotation.x=Math.PI/2;box(g,.08,.24,.04,L.scarf,.1,.72,.18);}
 if(L.tattoo){const t=mesh(arms[0],new THREE.CylinderGeometry(.055,.055,.014,14),'#c99a3c',-.05,-.07,.05);t.rotation.set(Math.PI/2,0,Math.PI/4);t.rotation.order='YXZ';t.rotation.y=-Math.PI/4;const ring=torus(arms[0],.035,.009,'#8a6526',-.056,-.07,.056);ring.rotation.y=-Math.PI/4;}
 // 頭部與臉
 const head=ball(g,.335,L.skin,0,1.075,0);head.name='anime-face';ball(g,.072,L.skin,-.33,1.06,0);ball(g,.072,L.skin,.33,1.06,0);
 for(const side of [-1,1]){const x=side*.125;const outline=ball(g,.087,'#41354f',x,1.09,.297);outline.scale.set(.80,1.22,.28);const eye=ball(g,.069,L.iris,x,1.085,.316);eye.scale.set(.76,1.18,.28);const pupil=ball(g,.037,'#293247',x,1.085,.333);pupil.scale.set(.70,1.30,.25);ball(g,.024,'#ffffff',x-.018,1.122,.346);ball(g,.011,'#fffdf4',x+.020,1.066,.347);const cheek=ball(g,.049,'#edacb1',side*.235,1.00,.257);cheek.scale.set(1,.45,.20);}
 const smile=torus(g,.055,.009,'#a9696c',0,.97,.317,Math.PI);smile.rotation.z=Math.PI;
 if(L.brows){for(const side of [-1,1]){const b=box(g,.09,.022,.02,L.hair,side*.125,1.205,.31);b.rotation.z=-side*.12;}}
 if(L.glasses){for(const side of [-1,1])torus(g,.085,.012,L.glasses,side*.125,1.09,.335);box(g,.06,.012,.012,L.glasses,0,1.1,.34);}
 if(L.beard){const beard=ball(g,.24,L.beard,0,.9,.14);beard.scale.set(1.05,.9,.7);const m=ball(g,.12,L.beard,0,1.0,.3);m.scale.set(1.3,.35,.4);}
 // 頭髮
 const hairColor=L.hair;
 if(L.hairStyle!=='hood'){const cap=mesh(g,new THREE.SphereGeometry(.35,16,10,0,Math.PI*2,0,Math.PI*.48),hairColor,0,1.095,0);cap.name='anime-hair';}
 const style=L.hairStyle;
 if(style==='flame'){for(const [x,y,r,h]of [[0,1.59,.24,.65],[-.20,1.43,.13,.36],[.19,1.46,.13,.39]]){const flame=cone(g,r,h,'#e59445',x,y,0,8);flame.rotation.z=-x*.8;}cone(g,.12,.35,'#ffe3a1',.015,1.61,.11,8);}
 if(['short','twintail','ponytail','bob','long','bun'].includes(style))for(const side of [-1,1]){const bang=ball(g,.15,hairColor,side*.18,1.28,.20);bang.scale.set(.85,1.15,.45);}
 if(style==='spiky'){for(const [x,z,rz,rx]of [[0,.2,0,.5],[-.17,.14,.45,.35],[.17,.14,-.45,.35],[-.1,-.05,.3,-.3],[.12,-.08,-.3,-.35],[0,.05,0,0]]){const s=cone(g,.12,.3,hairColor,x,1.38,z,6);s.rotation.set(rx,0,rz);}for(const side of [-1,1]){const b=ball(g,.12,hairColor,side*.2,1.27,.2);b.scale.set(.9,1,.45);}}
 if(style==='twintail')for(const side of [-1,1]){const tail=ball(g,.17,hairColor,side*.36,1.08,-.07);tail.scale.set(.8,1.5,.8);}
 if(style==='ponytail'){const tail=ball(g,.17,hairColor,0,1.0,-.34);tail.scale.set(.75,1.6,.75);ball(g,.06,L.accent,0,1.2,-.32);}
 if(style==='bob')for(const side of [-1,1]){const s=ball(g,.2,hairColor,side*.27,.98,-.02);s.scale.set(.6,1.15,1);}
 if(style==='long'){const back=ball(g,.33,hairColor,0,.86,-.17);back.scale.set(1.05,1.6,.6);}
 if(style==='bun'){ball(g,.15,hairColor,0,1.47,-.08);torus(g,.1,.025,L.accent,0,1.42,-.08).rotation.x=Math.PI/2;}
 if(style==='curly'){for(let j=0;j<9;j++){const a=j/9*Math.PI*2;ball(g,.12,hairColor,Math.cos(a)*.3,1.2+Math.sin(a*2)*.05,Math.sin(a)*.27-.02);}ball(g,.14,hairColor,0,1.42,0);}
 // 帽子
 const H=L.hatColor||L.accent,top=1.36;
 if(L.hat==='beret'){cyl(g,.36,.36,.07,H,0,top+.03,0,14);mesh(g,new THREE.SphereGeometry(.28,12,6,0,Math.PI*2,0,Math.PI/2),H,0,top+.04,0);}
 if(L.hat==='witch'||L.hat==='star-hat'||L.hat==='tall-wizard'){const tall=L.hat==='tall-wizard'?1.0:L.hat==='star-hat'?.8:.62;cyl(g,.5,.5,.04,H,0,top,0,18);const c=cone(g,.3,tall,H,0,top+tall/2,0,12);c.rotation.z=.08;cyl(g,.31,.31,.07,L.accent,0,top+.06,0,14);
  if(L.hat==='star-hat'){ball(g,.08,'#ffe08a',.06,top+tall+.02,0,.6);for(const [x,y,z]of [[.18,top+.3,.2],[-.15,top+.45,.18],[.05,top+.55,.17]])ball(g,.035,'#ffe08a',x,y,z,.5);}
  if(L.hat==='tall-wizard')ball(g,.07,'#ffe08a',.08,top+tall,0,.5);}
 if(L.hat==='cap'){mesh(g,new THREE.SphereGeometry(.355,14,8,0,Math.PI*2,0,Math.PI*.42),H,0,1.1,0);box(g,.32,.03,.2,H,0,1.28,.33);}
 if(L.hat==='mortarboard'){cyl(g,.3,.3,.14,H,0,top,0,12);const b=box(g,.66,.04,.66,H,0,top+.09,0);b.rotation.y=Math.PI/4;box(g,.02,.2,.02,'#f2c14e',.24,top,.24);ball(g,.04,'#f2c14e',.24,top-.1,.24);}
 if(L.hat==='captain'){cyl(g,.36,.33,.15,'#fbf6ec',0,top+.02,0,14);cyl(g,.34,.34,.07,H,0,top-.06,0,14);box(g,.32,.03,.18,'#2b2f45',0,top-.08,.3);ball(g,.05,'#f2c14e',0,top+.0,.34);}
 if(L.hat==='tophat'){cyl(g,.42,.42,.04,H,0,top,0,16);cyl(g,.25,.25,.42,H,0,top+.23,0,14);cyl(g,.255,.255,.07,L.accent,0,top+.08,0,14);}
 if(L.hat==='crown'){cyl(g,.27,.27,.12,'#f2c14e',0,top+.02,0,12);for(let j=0;j<5;j++){const a=j/5*Math.PI*2;cone(g,.06,.16,'#f2c14e',Math.sin(a)*.25,top+.15,Math.cos(a)*.25,6);}ball(g,.05,'#d4565a',0,top+.03,.27,.3);}
 if(L.hat==='bow'){for(const side of [-1,1]){const b=ball(g,.1,H,.22+side*.09,1.36,.05);b.scale.set(1,.7,.5);}ball(g,.05,H,.22,1.36,.06);}
 if(L.hat==='headband'){const t=torus(g,.34,.03,H,0,1.24,0);t.rotation.x=Math.PI/2-.25;}
 if(L.hat==='goggles'){const t=torus(g,.34,.03,'#5a4636',0,1.26,0);t.rotation.x=Math.PI/2-.2;for(const side of [-1,1]){const lens=cyl(g,.08,.08,.06,H,side*.12,1.28,.29,12);lens.rotation.x=Math.PI/2-.2;cyl(g,.06,.06,.065,'#cfe8f2',side*.12,1.28,.3,12).rotation.x=Math.PI/2-.2;}}
 if(L.hat==='headphones'){const band=torus(g,.37,.03,H,0,1.12,0);band.scale.set(1,1.08,1);for(const side of [-1,1]){const cup=cyl(g,.11,.11,.08,H,side*.37,1.08,0,12);cup.rotation.z=Math.PI/2;cyl(g,.08,.08,.085,L.accent||'#3b3040',side*.38,1.08,0,12).rotation.z=Math.PI/2;}}
 if(L.hat==='flower'){for(let j=0;j<5;j++){const a=j/5*Math.PI*2;ball(g,.05,H,.25+Math.cos(a)*.06,1.3+Math.sin(a)*.06,.12);}ball(g,.04,'#ffe08a',.25,1.3,.14);}
 if(L.hairStyle==='hood'){const hood=mesh(g,new THREE.SphereGeometry(.4,16,10,Math.PI/2+.85,Math.PI*2-1.7,0,Math.PI*.62),H,0,1.08,-.02);hood.material.side=THREE.DoubleSide;const tip=cone(g,.14,.3,H,0,1.52,-.12,8);tip.rotation.x=-.5;const fringe=ball(g,.2,L.hair||'#3b3040',0,1.3,.17);fringe.scale.set(1.3,.45,.5);}
 // 手持道具（右手）與肩上寵物
 const hand=new THREE.Group();hand.position.set(0,-.3,.06);arms[0].add(hand);arms[0].rotation.x=L.prop&&L.prop!=='pet'?-.5:0;g.userData.restArm=arms[0].rotation.x;
 const P=L.propColor||L.accent;
 switch(L.prop){
  case'wand':{const w=cyl(hand,.018,.024,.48,'#6b4a35',0,.12,.06,6);w.rotation.x=.9;ball(hand,.06,'#ffe08a',0,.32,.24,.8);break;}
  case'staff':{cyl(hand,.025,.03,1.15,'#7a5a3f',0,.25,0,6);ball(hand,.1,P,0,.86,0,.5);torus(hand,.1,.015,'#f2c14e',0,.86,0);break;}
  case'book':{box(hand,.24,.3,.07,P,0,.02,.05);box(hand,.21,.27,.075,'#fffaf0',.012,.02,.05);break;}
  case'scroll':{const s=cyl(hand,.05,.05,.32,'#f3e3c9',0,0,.05,8);s.rotation.z=Math.PI/2;for(const side of [-1,1])ball(hand,.04,P,side*.17,0,.05);break;}
  case'key':{torus(hand,.06,.015,'#f2c14e',0,.1,.05);box(hand,.025,.2,.02,'#f2c14e',0,-.06,.05);box(hand,.06,.025,.02,'#f2c14e',.03,-.13,.05);break;}
  case'flask':{ball(hand,.1,P,0,0,.06,.25);cyl(hand,.035,.035,.12,'#e8f3f6',0,.13,.06,8);ball(hand,.035,'#a37a52',0,.2,.06);break;}
  case'crystal':{cyl(hand,.07,.09,.06,'#7a5a3f',0,-.02,.06,8);ball(hand,.13,'#cfe2f7',0,.13,.06,.35);break;}
  case'lantern':{cyl(hand,.008,.008,.12,'#3b3040',0,.02,.06,4);box(hand,.13,.16,.13,'#3b3040',0,-.1,.06);ball(hand,.055,'#ffd27a',0,-.1,.06,.9);break;}
  case'map':{const m=box(hand,.3,.22,.015,'#f0dfb8',0,0,.08);m.rotation.x=-.3;box(hand,.08,.015,.02,'#d4565a',.04,.02,.09);break;}
  case'quill':{cyl(hand,.008,.008,.25,'#6b4a35',0,.08,.05,4);const f=cone(hand,.05,.22,'#fbf6ec',0,.26,.05,6);f.scale.z=.4;break;}
  case'gear':{torus(hand,.09,.03,P,0,0,.06);for(let j=0;j<6;j++){const a=j/6*Math.PI*2;box(hand,.04,.05,.04,P,Math.cos(a)*.13,Math.sin(a)*.13,.06).rotation.z=a;}break;}
  case'magnifier':{torus(hand,.08,.018,'#c99a3c',0,.14,.06);mesh(hand,new THREE.CircleGeometry(.075,12),'#d8eef6',0,.14,.065);box(hand,.025,.14,.025,'#6b4a35',0,0,.06);break;}
  case'brush':{const h=cyl(hand,.018,.022,.4,'#a37a52',0,.12,.05,6);h.rotation.x=.5;const tip=cone(hand,.035,.1,P,0,.32,.16,6);tip.rotation.x=.5+Math.PI;break;}
  case'palette':{const pl=cyl(hand,.17,.17,.025,'#e9cfa0',0,0,.08,14);pl.rotation.x=Math.PI/2-.3;for(const [x,y,c]of [[-.08,.06,'#d4565a'],[0,.1,'#f2c14e'],[.08,.06,'#5a9bd8'],[.09,-.03,'#7fd1a0'],[-.07,-.04,'#b08ad8']])ball(hand,.03,c,x,y,.1);break;}
  case'mic':{cyl(hand,.025,.02,.26,'#3b3040',0,.04,.06,8);ball(hand,.07,P||'#9aa0a6',0,.21,.06);torus(hand,.072,.012,'#c99a3c',0,.19,.06).rotation.x=Math.PI/2;break;}
  case'clapper':{box(hand,.28,.2,.03,'#2b2626',0,.02,.07);for(let j=0;j<4;j++)box(hand,.04,.03,.032,'#fbf6ec',-.1+j*.07,.08,.071);const top=box(hand,.28,.05,.03,'#2b2626',0,.15,.07);top.rotation.z=.25;break;}
  case'note':{const h=ball(hand,.07,P,0,0,.06);h.scale.set(1.25,.85,.85);box(hand,.02,.28,.02,P,.075,.14,.06);const f=box(hand,.1,.03,.02,P,.12,.26,.06);f.rotation.z=-.5;break;}
  case'ladle':{cyl(hand,.015,.015,.36,'#a37a52',0,.08,.06,6);const b=mesh(hand,new THREE.SphereGeometry(.07,10,6,0,Math.PI*2,Math.PI/2,Math.PI/2),'#a37a52',0,-.12,.06);b.scale.y=.7;break;}
 }
 if(L.prop==='pet'){const pet=new THREE.Group();pet.position.set(-.4,.88,.04);g.add(pet);ball(pet,.11,P,0,0,0);ball(pet,.09,P,0,.12,.04);for(const side of [-1,1]){cone(pet,.035,.08,P,side*.05,.21,.04,4);ball(pet,.018,'#ffe08a',side*.035,.13,.12,.6);}const tail=cyl(pet,.015,.015,.18,P,0,.05,-.12,5);tail.rotation.x=-.8;g.userData.pet=pet;}
 if(L.scale)g.scale.setScalar(L.scale);
 return {g,legs,arms};
}
