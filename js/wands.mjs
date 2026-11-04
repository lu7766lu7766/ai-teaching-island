import * as THREE from 'three';
import {CSS2DObject} from '../vendor/CSS2DRenderer.js';
import {pointAt} from './navigation.mjs';
import {WAND_BRIDGES} from './core.mjs';
// 散落在各島步道外側與兩座橋上的魔法杖；點擊即可撿起，集滿 14 把成為榮譽島民。
const COLORS=['#c86b4a','#6b4d84','#4f7a8c','#a37a52','#8c2f3c','#5a7aa8','#7a8a4c'];
export function createWands(scene,network,nodes,{onWand}={}){
 const mats=new Map();const mat=(c,glow=0)=>{const k=c+glow;if(!mats.has(k))mats.set(k,new THREE.MeshStandardMaterial({color:c,roughness:.6,...(glow?{emissive:c,emissiveIntensity:glow}:{})}));return mats.get(k);};
 const wands=[],labels=[],pickables=[];
 // 朝向預設鏡頭（右前方）的方向，讓魔法杖在全景就看得到；每座島再錯開一點角度。
 const base=Math.atan2(40,66);
 function build(id,name,x,y,z,islands,i){
  const g=new THREE.Group();g.name=id;g.position.set(x,y,z);scene.add(g);
  const inner=new THREE.Group();g.add(inner);inner.rotation.z=Math.PI/2-.35;inner.rotation.y=i*1.3;
  const stick=new THREE.Mesh(new THREE.CylinderGeometry(.045,.06,.95,7),mat(COLORS[i%COLORS.length]));inner.add(stick);
  const grip=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.18,7),mat('#f2c14e'));grip.position.y=-.3;inner.add(grip);
  const star=new THREE.Mesh(new THREE.OctahedronGeometry(.16,0),mat('#ffe08a',.9));star.position.y=.55;inner.add(star);
  const glow=new THREE.Mesh(new THREE.RingGeometry(.35,.5,20),new THREE.MeshBasicMaterial({color:'#ffe08a',transparent:true,opacity:.45,side:THREE.DoubleSide}));glow.rotation.x=-Math.PI/2;glow.position.y=-.12;g.add(glow);
  g.traverse(m=>{if(m.isMesh){m.castShadow=true;m.userData.wand=id;pickables.push(m);}});
  const button=document.createElement('button');button.className='person-label wand-label';button.dataset.wand=id;button.innerHTML='<span>✦ 魔法杖</span>';button.title=`撿起${name}的魔法杖`;button.setAttribute('aria-label',`撿起${name}的魔法杖`);button.addEventListener('click',e=>{e.stopPropagation();onWand?.(id);});
  const object=new CSS2DObject(button);object.position.y=.9;g.add(object);
  const actor={g,inner,star,glow,id,name,islands,collected:false,hover:false,phase:i};labels.push({object,button,actor});wands.push(actor);
 }
 let i=0;
 for(const node of nodes){const offset=((i*37)%11-5)*.16,a=base+offset,r=node.walkRadius+.42;build('wand-'+node.id,node.id==='center'?'中央島':node.id,node.x+Math.sin(a)*r,(node.height??.49)+.12,node.z+Math.cos(a)*r,[node.id],i);i++;}
 for(const [k,[from,to]] of WAND_BRIDGES.entries()){const path=network.paths.find(p=>p.kind==='bridge'&&((network.vertices[p.from].island===from&&network.vertices[p.to].island===to)||(network.vertices[p.from].island===to&&network.vertices[p.to].island===from)));if(!path)continue;const pt=pointAt(path,path.length/2).point;build('wand-bridge-'+(k+1),'橋上',pt.x,pt.y+.2,pt.z,[from,to],i++);}
 let time=0;
 return {labels,pickables,ids:wands.map(w=>w.id),
  setCollected(ids){const set=new Set(ids);for(const w of wands){w.collected=set.has(w.id);w.g.visible=!w.collected;}},
  update(dt){time+=dt;for(const w of wands){if(w.collected)continue;w.inner.position.y=Math.sin(time*2+w.phase)*.06;w.star.rotation.y+=dt*2;w.glow.material.opacity=.3+Math.sin(time*3+w.phase)*.15;}},
  snapshot(){return wands.map(w=>({id:w.id,islands:w.islands,collected:w.collected,position:w.g.position.toArray()}));}};
}
