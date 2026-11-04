import {createAnimeCharacter} from './anime-character.mjs';
import * as THREE from 'three';import {advanceWalker,pointAt} from './navigation.mjs';
import {CSS2DObject} from '../vendor/CSS2DRenderer.js';
import {RESIDENT_LOOKS,HOST_LOOKS,INSTRUCTOR_LOOK,HONORARY_LOOK} from './characters.mjs';
// 島民沿步道散步；每座島有自己的島主（中央島是咒咒）；中央島另有講師，集滿魔法杖後出現學員的榮譽島民分身。
export function createResidents(scene,network,people,{hosts={},onResident,onHost,onInstructor,onHonorary}={}){
 const residents=[],owners=[],labels=[],pickables=[];let instructor=null,honorary=null;
 function labelFor(actor,text,kind,title,click,{island,resident}={}){const button=document.createElement('button');button.className='person-label '+kind;const span=document.createElement('span');span.textContent=text;button.appendChild(span);button.title=title;button.setAttribute('aria-label',title);if(island)button.dataset.hostIsland=island;if(resident)button.dataset.resident=resident;button.addEventListener('click',e=>{e.stopPropagation();click();});for(const ev of ['pointerenter','focus'])button.addEventListener(ev,()=>actor.hover=true);for(const ev of ['pointerleave','blur'])button.addEventListener(ev,()=>actor.hover=false);const object=new CSS2DObject(button);object.position.y=kind.includes('island-host')?2.15*(actor.g.scale.y>1.15?1.08:1):1.85;actor.g.add(object);const entry={object,button,actor};labels.push(entry);return entry;}
 function walkerOn(island,i){const choices=network.paths.map((p,index)=>({p,index})).filter(v=>v.p.kind==='walk'&&v.p.island===island),path=choices[i%choices.length].index,entry=network.paths[path];return {walker:{path,distance:entry.length*(.78+(i%2)*.08),direction:i%2?1:-1},entry};}
 function place(actor){const sample=pointAt(network.paths[actor.walker.path],actor.walker.distance);actor.g.position.set(sample.point.x,sample.point.y,sample.point.z);actor.g.rotation.y=sample.angle+(actor.walker.direction<0?Math.PI:0);}
 for(let i=0;i<people.length;i++){const person=people[i],{g,legs,arms}=createAnimeCharacter(i,false,{id:person.id,...RESIDENT_LOOKS[person.id]});g.name=person.id;scene.add(g);
  const {walker}=walkerOn(person.island,i);const actor={g,legs,arms,walker,person,speed:.72+(i%5)*.065,phase:i,visited:new Set([walker.path]),hover:false};residents.push(actor);place(actor);
  g.traverse(m=>{if(m.isMesh){m.userData.resident=person.id;pickables.push(m);}});labelFor(actor,person.name,'island-resident',`${person.name}：${person.concept}，點擊閱讀關鍵概念`,()=>onResident?.(person.id),{resident:person.id});}
 for(const [i,node]of network.nodes.entries()){const isCenter=node.id==='center',info=isCenter?{name:'咒咒',title:'島主'}:(hosts[node.id]||{name:'島主',title:''});
  const {g,legs,arms}=isCenter?createAnimeCharacter(i,true):createAnimeCharacter(i,true,{id:'host-'+node.id,...HOST_LOOKS[node.id]});g.name='owner-'+node.id;scene.add(g);
  const actor={g,node,legs,arms,angle:i*.8+.4,hover:false,info};g.position.set(node.x+Math.sin(actor.angle)*(node.walkRadius-.1),node.height??.49,node.z+Math.cos(actor.angle)*(node.walkRadius-.1));owners.push(actor);
  g.traverse(m=>{if(m.isMesh){m.userData.host=node.id;pickables.push(m);}});labelFor(actor,info.name,'island-host',`${info.title}${info.name}：點擊詢問課程與網站功能`,()=>onHost?.(node.id),{island:node.id});}
 // 講師站在中央島的塔前，面向鏡頭揮手。
 const center=network.nodes.find(n=>n.id==='center');
 if(center){const {g,legs,arms}=createAnimeCharacter(0,false,INSTRUCTOR_LOOK);g.name='instructor';scene.add(g);const a=Math.atan2(40,66)-.35;g.position.set(center.x+Math.sin(a)*3.4,center.height??.49,center.z+Math.cos(a)*3.4);g.rotation.y=Math.atan2(40,66);instructor={g,legs,arms,hover:false};
  g.traverse(m=>{if(m.isMesh){m.userData.instructor=true;pickables.push(m);}});labelFor(instructor,'講師 王子齊 Jac','island-host instructor','講師王子齊（Jac）：點擊查看講師介紹',()=>onInstructor?.(),{island:'center'});}
 let time=0;
 function animateWalker(r,dt){const sample=advanceWalker(r.walker,network,dt*r.speed);r.visited?.add(r.walker.path);r.g.position.set(sample.point.x,sample.point.y+Math.abs(Math.sin(time*r.speed*7+r.phase))*.025,sample.point.z);r.g.rotation.y=sample.angle+(r.walker.direction<0?Math.PI:0);const swing=Math.sin(time*r.speed*7+r.phase)*.42;r.legs[0].rotation.x=swing;r.legs[1].rotation.x=-swing;r.arms[0].rotation.x=(r.g.userData.restArm||0)-swing*.4;r.arms[1].rotation.x=swing*.75;}
 return {labels,pickables,
  setHonorary(name){if(honorary){scene.remove(honorary.g);const k=labels.indexOf(honorary.label);if(k>=0)labels.splice(k,1);honorary.label.button.remove();honorary.g.traverse(m=>{const j=pickables.indexOf(m);if(j>=0)pickables.splice(j,1);});honorary=null;}
   if(!name||!center)return;const {g,legs,arms}=createAnimeCharacter(3,false,HONORARY_LOOK);g.name='honorary';scene.add(g);const {walker}=walkerOn('center',5);honorary={g,legs,arms,walker,speed:.8,phase:2,hover:false};place(honorary);
   g.traverse(m=>{if(m.isMesh){m.userData.honorary=true;pickables.push(m);}});honorary.label=labelFor(honorary,name,'island-host honorary',`榮譽島民 ${name}（你的分身）`,()=>onHonorary?.(),{island:'center'});},
  update(dt){time+=dt;for(const r of residents)if(!r.hover)animateWalker(r,dt);if(honorary&&!honorary.hover)animateWalker(honorary,dt);
   for(const o of owners){if(o.hover)continue;o.angle+=dt*.19;const radius=o.node.walkRadius-.1;o.g.position.set(o.node.x+Math.sin(o.angle)*radius,o.node.height??.49,o.node.z+Math.cos(o.angle)*radius);o.g.rotation.y=o.angle+Math.PI/2;const swing=Math.sin(time*5)*.4;o.legs[0].rotation.x=swing;o.legs[1].rotation.x=-swing;if(o.g.userData.pet)o.g.userData.pet.rotation.y=Math.sin(time*2)*.4;}
   if(instructor){instructor.arms[1].rotation.z=Math.PI*.75+Math.sin(time*3)*.25;instructor.arms[1].rotation.x=0;}},
  pause(){for(const r of [...residents,...(honorary?[honorary]:[])]){r.legs.forEach(l=>l.rotation.x=0);r.arms.forEach(l=>l.rotation.x=0);r.arms[0].rotation.x=r.g.userData.restArm||0;r.g.position.y=pointAt(network.paths[r.walker.path],r.walker.distance).point.y;}owners.forEach(o=>o.legs.forEach(l=>l.rotation.x=0));if(instructor)instructor.arms[1].rotation.z=Math.PI*.75;},
  snapshot(){return residents.map(r=>({id:r.g.name,name:r.person.name,concept:r.person.concept,style:r.g.userData.characterStyle,look:r.g.userData.look,position:r.g.position.toArray(),path:r.walker.path,kind:network.paths[r.walker.path].kind,visited:r.visited.size}));},
  hostSnapshot(){return owners.map(o=>({island:o.node.id,name:o.info.name,look:o.g.userData.look,position:o.g.position.toArray()}));},
  extraSnapshot(){return {instructor:instructor?{position:instructor.g.position.toArray(),look:instructor.g.userData.look}:null,honorary:honorary?{position:honorary.g.position.toArray(),label:honorary.label.button.textContent}:null};}};
}
