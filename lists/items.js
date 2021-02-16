module.exports = [
    {name:'token', type:'coin', description:'Proof that you defeated an enemy', target: [], effects: [], range:{}, stats:{}, value: 1, requirements:[]},
    {name:'sword', type:'right', description:'Common sword', target: ['enemy'], effects: ['damage'], range:{}, stats:{ 'power': 2 }, value: 500, requirements:[{name:'level',value:1}]},
    {name:'longSword', type:'right', description:'Common sword', target: ['enemy'], effects: ['damage'], range:{}, stats:{ 'power': 3 }, value: 750, requirements:[{name:'level',value:1}]},
    {name:'greatSword', type:'2hand', description:'Common two-handed sword', target: ['enemy'], effects: ['damage'], range:{}, stats:{ 'power': 5 }, value: 750, requirements:[{name:'level',value:3}]},
    {name:'shield', type:'left', description:'Common shield', target: [], effects: [], range:{}, stats:{ 'defense': 1 }, value: 250, requirements:[{name:'level',value:1}]},
    {name:'buckler', type:'left', description:'Common buckler', target: [], effects: [], range:{}, stats:{ 'defense': 3 }, value: 450, requirements:[{name:'level',value:1}]},
    {name:'leather', type:'armor', description:'Common leather armor', target: [], effects: [], range:{}, stats:{ 'defense': 2, 'hpMax':5 }, value: 750, requirements:[{name:'level',value:1}]},
    {name:'plate', type:'armor', description:'Common plate armor', target: [], effects: [], range:{}, stats:{ 'defense': 5, 'hpMax':25, 'speed':-5 }, value: 1750, requirements:[{name:'level',value:3}]},
    {name:'plainBand', type:'ring', description:'Common Ring of speed', target: [], effects: [], range:{}, stats:{ 'speed': 5 }, value: 1000, requirements:[{name:'level',value:1}]},
    {name:'healingBand', type:'ring', description:'Uncommon Ring of healing', target: [], effects: [{name:'heal',uses:5,usesMax:5}], range:{min:10,max:20}, stats:{ }, value: 3000, requirements:[{name:'level',value:1}]},
    {name:'healing', type:'scroll', description:`Heals a target player for ${this.min} - ${this.max} hp`, target: ['self','player'], effects: [{name:'heal',uses:1,usesMax:1}], range:{min:10,max:20}, stats:{}, value: 100, requirements:[]},
    {name:'burn', type:'scroll', description:`Deals ${this.min} - ${this.max} damage to an enemy`, target: ['enemy'], effects: [{name:'burn',uses:1,usesMax:1}], range:{min:30,max:50}, stats:{}, value: 300, requirements:[]},
];
