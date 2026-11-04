// 每位角色的造型設定。顏色、髮型、帽子、服裝與手持道具都呼應他負責的課程或概念。
// 島主的名字寫在各島「資料設定」的 host 欄位；這裡只管外觀。
export const RESIDENT_LOOKS={
 'resident-01':{hairStyle:'ponytail',hair:'#5a3d32',outfit:'#f2a983',hat:'beret',hatColor:'#d4565a',prop:'quill'},
 'resident-02':{hairStyle:'short',hair:'#2f3442',outfit:'#9ac9df',glasses:'#3b3040',prop:'magnifier'},
 'resident-03':{hairStyle:'bob',hair:'#7a4b3a',outfitType:'robe',outfit:'#8c6bb1',accent:'#f2c14e',prop:'book',propColor:'#5a3d7a'},
 'resident-04':{hairStyle:'twintail',hair:'#b5523b',outfit:'#e7c26a',hat:'headband',hatColor:'#d4565a',prop:'scroll',propColor:'#d4565a'},
 'resident-05':{hairStyle:'spiky',hair:'#4b3c4c',outfitType:'overalls',outfit:'#e9d8b4',pants:'#4f7a8c',hat:'goggles',hatColor:'#c99a3c',prop:'gear',propColor:'#c99a3c'},
 'resident-06':{hairStyle:'short',hair:'#8b624d',outfit:'#a5cbb8',hat:'cap',hatColor:'#e59445',prop:'map'},
 'resident-07':{hairStyle:'bun',hair:'#343e60',outfitType:'dress',outfit:'#c5addb',accent:'#f2c14e',prop:'book',propColor:'#4f7a8c'},
 'resident-08':{hairStyle:'spiky',hair:'#b48b63',outfit:'#edbedb',hat:'cap',hatColor:'#5a3d7a',scarf:'#e59445',prop:'wand'},
 'resident-09':{hairStyle:'hood',hair:'#3b3040',outfitType:'robe',outfit:'#4a3f63',hatColor:'#4a3f63',accent:'#cdb4e0',prop:'pet',propColor:'#2b2626'},
 'resident-10':{hairStyle:'short',hair:'#67627e',outfit:'#d8b0a0',backpack:'#c86b4a',prop:'key'},
 'resident-11':{hairStyle:'long',hair:'#d9a441',outfitType:'dress',outfit:'#9bbada',hat:'bow',hatColor:'#e98aa0',prop:'lantern'},
 'resident-12':{hairStyle:'curly',hair:'#3a2a24',skin:'#9c6a4c',outfit:'#b2c3a0',hat:'headband',hatColor:'#4f7a8c',prop:'gear',propColor:'#7a8a9c'},
 'resident-13':{hairStyle:'short',hair:'#e6e2d8',outfitType:'robe',outfit:'#34507a',accent:'#f2c14e',hat:'star-hat',hatColor:'#34507a',prop:'staff',propColor:'#9fd2ff'},
 'resident-14':{hairStyle:'long',hair:'#6b8fb8',outfit:'#cfe2f7',cape:'#5a7aa8',prop:'lantern'},
 'resident-15':{hairStyle:'bob',hair:'#2b2626',outfitType:'dress',outfit:'#75608e',hat:'witch',hatColor:'#5a3d7a',accent:'#f2c14e',prop:'wand'},
 'resident-16':{hairStyle:'spiky',hair:'#8b4a3a',outfit:'#e7c8b1',scarf:'#7a8a9c',prop:'scroll',propColor:'#7a8a9c'},
 'resident-17':{hairStyle:'short',hair:'#3b3040',outfitType:'sailor',pants:'#34507a',hat:'captain',hatColor:'#34507a',prop:'map'},
 'resident-18':{hairStyle:'bob',hair:'#c9a46a',outfit:'#b8d3e3',hat:'tophat',hatColor:'#3b3040',accent:'#c99a3c',prop:'key'},
 'resident-19':{hairStyle:'twintail',hair:'#cfd6ee',outfitType:'dress',outfit:'#bcd0f2',hat:'flower',hatColor:'#ffffff',prop:'crystal'},
 'resident-20':{hairStyle:'hood',hair:'#8a8fa8',outfitType:'robe',outfit:'#a9a6c4',hatColor:'#c9c6dc',accent:'#6b6f8c',prop:'magnifier'},
 'resident-21':{hairStyle:'curly',hair:'#e59445',outfit:'#c9f0d6',hat:'goggles',hatColor:'#4f7a8c',prop:'flask',propColor:'#7fd1a0'},
 'resident-22':{hairStyle:'bun',hair:'#5a3d32',outfitType:'apron',outfit:'#e7c26a',accent:'#8c5a3c',prop:'ladle'}
};
export const HOST_LOOKS={
 'island-10':{hairStyle:'long',hair:'#dfe3f0',outfitType:'robe',outfit:'#2f3a66',accent:'#f2c14e',hat:'star-hat',hatColor:'#2f3a66',glasses:'#c99a3c',cape:'#4a5a96',prop:'crystal',scale:1.12},
 'island-01':{hairStyle:'ponytail',hair:'#3b2a24',outfit:'#f2a983',pants:'#5a6b8c',hat:'beret',hatColor:'#e59445',scarf:'#d4565a',prop:'scroll',propColor:'#e59445',scale:1.12},
 'island-08':{hairStyle:'short',hair:'#2b2626',outfitType:'robe',outfit:'#5a3d7a',accent:'#cdb4e0',hat:'mortarboard',hatColor:'#2b2626',glasses:'#3b3040',prop:'book',propColor:'#b8a0d8',scale:1.12},
 'island-02':{hairStyle:'long',hair:'#7a3b5a',outfitType:'dress',outfit:'#e98aa0',accent:'#f2c14e',hat:'witch',hatColor:'#6b4d84',prop:'book',propColor:'#6b4d84',scale:1.12},
 'island-03':{hairStyle:'spiky',hair:'#c9692e',outfitType:'apron',outfit:'#e9d8b4',accent:'#8c5a3c',hat:'goggles',hatColor:'#c99a3c',prop:'wand',scale:1.12},
 'island-04':{hairStyle:'short',hair:'#9aa0a6',outfit:'#3b3040',pants:'#2b2626',accent:'#c99a3c',hat:'tophat',hatColor:'#2b2626',beard:'#d8d4cc',glasses:'#c99a3c',cape:'#8c2f3c',prop:'scroll',propColor:'#c99a3c',scale:1.12},
 'island-09':{hairStyle:'short',hair:'#5a3d32',outfitType:'sailor',pants:'#34507a',hat:'captain',hatColor:'#34507a',prop:'lantern',scale:1.12},
 'island-11':{hairStyle:'curly',hair:'#8c2f3c',outfitType:'apron',outfit:'#c9f0d6',accent:'#5a4636',hat:'goggles',hatColor:'#7fd1a0',prop:'flask',propColor:'#e98aa0',scale:1.12},
 'island-05':{hairStyle:'hood',hair:'#2b2626',outfitType:'robe',outfit:'#2b2440',hatColor:'#3b3058',accent:'#9fd2ff',cape:'#3b3058',prop:'pet',propColor:'#f3e3c9',scale:1.12},
 'island-06':{hairStyle:'bob',hair:'#f2c14e',outfit:'#9ac9df',pants:'#5a3d7a',hat:'crown',backpack:'#a37a52',prop:'key',scale:1.12},
 'island-07':{hairStyle:'long',hair:'#f3f0ea',outfitType:'robe',outfit:'#4a3f63',accent:'#e59445',hat:'tall-wizard',hatColor:'#4a3f63',beard:'#f3f0ea',prop:'staff',propColor:'#e59445',scale:1.15}
};
// 講師：依王子齊（Jac）的照片——黑色短髮、裸上身、深色長褲、右上臂金色圖騰。
export const INSTRUCTOR_LOOK={id:'instructor',hairStyle:'spiky',hair:'#1f1a1a',brows:true,skin:'#e8b48a',iris:'#3b2a20',outfitType:'shirtless',pants:'#3d3a3a',shoes:'#2b2626',tattoo:true,scale:1.22};
// 榮譽島民：集滿 14 把魔法杖的學員分身。
export const HONORARY_LOOK={id:'honorary',hairStyle:'short',hair:'#5a3d32',outfitType:'robe',outfit:'#6b4d84',accent:'#f2c14e',hat:'witch',hatColor:'#6b4d84',cape:'#ed9d50',prop:'wand',scale:1.08};
