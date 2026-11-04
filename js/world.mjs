export const ISLAND_LAYOUT=[
 {id:'center',x:1,z:-2,radius:6.8,elevation:3.3},
 {id:'island-01',x:-22.2,z:-10.7,radius:4.3,elevation:1.2},
 {id:'island-02',x:-26.55,z:9.6,radius:4.8,elevation:.25},
 {id:'island-03',x:-13.5,z:28.45,radius:5.4,elevation:2.7},
 {id:'island-04',x:11.15,z:29.9,radius:4.45,elevation:.6},
 {id:'island-05',x:28.55,z:11.05,radius:6.2,elevation:.1},
 {id:'island-06',x:21.3,z:-10.7,radius:4.7,elevation:4.4},
 {id:'island-07',x:-3.35,z:-20.85,radius:5.8,elevation:2.1},
 {id:'island-08',x:-39,z:-1,radius:4.6,elevation:1.6},
 {id:'island-09',x:31,z:32,radius:4.6,elevation:1.4},
 {id:'island-10',x:-16,z:-26,radius:4.4,elevation:1.6},
 {id:'island-11',x:42,z:18,radius:4.5,elevation:.8},
 {id:'island-12',x:-34,z:-17,radius:4.4,elevation:.9},
 {id:'island-13',x:-48,z:-12,radius:4.4,elevation:1.1}
];
export const BRIDGE_STYLES=[
 {id:'rope',name:'繩索吊橋',profile:'sag',arc:-.45,width:1.3,color:'#bfa08a'},
 {id:'stone',name:'月光石拱橋',profile:'arch',arc:.8,width:1.55,color:'#ded7c9'},
 {id:'candy',name:'糖果階梯橋',profile:'stairs',arc:0,width:1.45,color:'#eac5aa'},
 {id:'covered',name:'星燈廊橋',profile:'arch',arc:.12,width:1.45,color:'#cdb4a2'},
 {id:'logs',name:'圓木階梯橋',profile:'stairs',arc:0,width:1.4,color:'#b69a7f'},
 {id:'vine',name:'藤蔓花橋',profile:'arch',arc:.45,width:1.4,color:'#b7c7a3'},
 {id:'glass',name:'月光水晶橋',profile:'arch',arc:.7,width:1.4,color:'#d6c8ee'},
 {id:'grand-stairs',name:'廣場迎賓石階橋',profile:'stairs',arc:0,width:1.7,color:'#f4e3c4'},
 {id:'gear',name:'齒輪拱橋',profile:'arch',arc:.5,width:1.45,color:'#cdb396'},
 {id:'lantern-arc',name:'星環燈籠拱橋',profile:'arch',arc:.65,width:1.55,color:'#e7c8b1'},
 {id:'rune',name:'符文星光橋',profile:'arch',arc:.55,width:1.45,color:'#cbb8e3'},
 {id:'starlink',name:'星門棧橋',profile:'arch',arc:.35,width:1.45,color:'#b8d3e3'},
 {id:'crystal',name:'水晶星塵橋',profile:'arch',arc:.6,width:1.45,color:'#d9d0f0'},
 {id:'alchemy',name:'鍊金銅橋',profile:'arch',arc:.4,width:1.45,color:'#d7b48e'},
 {id:'palette',name:'調色盤彩虹橋',profile:'arch',arc:.5,width:1.45,color:'#f0c9b8'},
 {id:'melody',name:'五線譜音符橋',profile:'stairs',arc:0,width:1.45,color:'#e3d6ee'}
];
export function bridgeRoute(from,to,style){if(!style)return[from,to];const length=Math.hypot(to.x-from.x,to.z-from.z),entry=Math.min(length*.35,style.landingStart??.65),exit=Math.min(length*.35,style.landingEnd??.65),ramp=Math.max(.1,length-entry-exit),count=Math.max(16,Math.ceil(length/.45),Math.ceil(Math.abs(to.y-from.y)/.12*length/ramp)),start=entry/length,end=1-exit/length;const ts=[start,end,1];for(let i=1;i<count;i++)ts.push(i/count);const times=[...new Set(ts.map(t=>Number(t.toFixed(10))))].sort((a,b)=>a-b),points=[{...from}];for(const t of times){const u=Math.max(0,Math.min(1,(t-start)/(end-start))),x=from.x+(to.x-from.x)*t,z=from.z+(to.z-from.z)*t,y=from.y+(to.y-from.y)*u+Math.sin(u*Math.PI)*(style.arc||0);if(style.profile==='stairs'){points.push({x,y:points.at(-1).y,z});if(Math.abs(y-points.at(-1).y)>1e-8)points.push({x,y,z});}else points.push({x,y,z});}points[points.length-1]={...to};return points;}
