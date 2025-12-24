const WebSocket = require("ws");
const Msgpack = require("msgpack-lite");
let Server = new WebSocket.Server({ port: 8081 });
let storeSocket = null;

let enemy = [];
let owner = [];

let circleAngle = null;

let names = ["unknown"];
let messages = [];
let skins = [
  "#bf8f54",
  "#cbb091",
  "#896c4b",
  "#fadadc",
  "#ececec",
  "#c37373",
  "#4c4c4c",
  "#ecaff7",
  "#738cc3",
  "#8bc373",
];

let botActions = [];
let mousePos = [];
Server.on("connection", (t) => {
  console.log("omgQ")
  storeSocket = t;

  t.onmessage = (msg) => {
    let parsed = JSON.parse(msg.data);
    owner = parsed.player;
    botActions = parsed.botActions;
    enemy = parsed.nearestEnemy;

    messages = parsed.message;
    names = parsed.names;
    if (parsed.mousePos) {
      mousePos = parsed.mousePos;
    }
    if (parsed.url) {
      new CONNECT(parsed);
    }
  };
});

function botInfo(ID, SID, ACCESSORIES, HATS) {
  this.id = ID;
  this.sid = SID;
  this.tmpScore = 0;
  this.team = null;
  this.skinIndex = 0;
  this.tailIndex = 0;
  this.hitTime = 0;
  this.tails = {};
  for (let w = 0; w < ACCESSORIES.length; ++w) {
    ACCESSORIES[w].price <= 0 && (this.tails[ACCESSORIES[w].id] = 1);
  }
  this.skins = {};
  for (let w = 0; w < HATS.length; ++w) {
    HATS[w].price <= 0 && (this.skins[HATS[w].id] = 1);
  }
  this.points = 0;
  this.dt = 0;
  this.hidden = 0;
  this.itemCounts = {};
  this.isPlayer = 1;
  this.pps = 0;
  this.moveDir = void 0;
  this.skinRot = 0;
  this.lastPing = 0;
  this.iconIndex = 0;
  this.skinColor = 0;
  (this.spawn = function (k) {
    this.active = 1;
    this.alive = 1;
    this.lockMove = 0;
    this.lockDir = 0;
    this.minimapCounter = 0;
    this.chatCountdown = 0;
    this.shameCount = 0;
    this.shameTimer = 0;
    this.sentTo = {};
    this.gathering = 0;
    this.autoGather = 0;
    this.animTime = 0;
    this.animSpeed = 0;
    this.mouseState = 0;
    this.buildIndex = -1;
    this.weaponIndex = 0;
    this.dmgOverTime = {};
    this.noMovTimer = 0;
    this.maxXP = 300;
    this.XP = 0;
    this.age = 1;
    this.kills = 0;
    this.upgrAge = 2;
    this.upgradePoints = 0;
    this.x = 0;
    this.y = 0;
    this.zIndex = 0;
    this.xVel = 0;
    this.yVel = 0;
    this.slowMult = 1;
    this.dir = 0;
    this.dirPlus = 0;
    this.targetDir = 0;
    this.targetAngle = 0;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.resetMoveDir();
    this.resetResources(k);
    this.items = [0, 3, 6, 10];
    this.weapons = [0];
    this.shootCount = 0;
    this.weaponXP = [];
    this.reloads = {};
    this.timeSpentNearVolcano = 0;
    this.turret = 1;
    this.reload = [
      { fill: 1, id: 0, variant: 0 },
      { fill: 1, id: 0, variant: 0 },
      { fill: 1 },
    ];
    this.PRIMARY = { id: 5, variant: 3 };
    this.SECONDARY = { id: 0, variant: 0 };
    this.upgrade = 0;
  }),
    (this.resetMoveDir = function () {
      this.moveDir = void 0;
    }),
    (this.resetResources = function (k) {}),
    (this.setData = function (k) {
      this.id = k[0];
      this.sid = k[1];
      this.name = k[2];
      this.x = k[3];
      this.y = k[4];
      this.dir = k[5];
      this.health = k[6];
      this.maxHealth = k[7];
      this.scale = k[8];
      this.skinColor = k[9];
    });
}

const _c = [
    {
      id: 45,
      name: "Shame!",
      dontSell: !0,
      price: 0,
      scale: 120,
      desc: "hacks are for losers",
    },
    {
      id: 51,
      name: "Moo Cap",
      price: 0,
      scale: 120,
      desc: "coolest mooer around",
    },
    {
      id: 50,
      name: "Apple Cap",
      price: 0,
      scale: 120,
      desc: "apple farms remembers",
    },
    { id: 28, name: "Moo Head", price: 0, scale: 120, desc: "no effect" },
    { id: 29, name: "Pig Head", price: 0, scale: 120, desc: "no effect" },
    { id: 30, name: "Fluff Head", price: 0, scale: 120, desc: "no effect" },
    { id: 36, name: "Pandou Head", price: 0, scale: 120, desc: "no effect" },
    { id: 37, name: "Bear Head", price: 0, scale: 120, desc: "no effect" },
    { id: 38, name: "Monkey Head", price: 0, scale: 120, desc: "no effect" },
    { id: 44, name: "Polar Head", price: 0, scale: 120, desc: "no effect" },
    { id: 35, name: "Fez Hat", price: 0, scale: 120, desc: "no effect" },
    {
      id: 42,
      name: "Enigma Hat",
      price: 0,
      scale: 120,
      desc: "join the enigma army",
    },
    {
      id: 43,
      name: "Blitz Hat",
      price: 0,
      scale: 120,
      desc: "hey everybody i'm blitz",
    },
    {
      id: 49,
      name: "Bob XIII Hat",
      price: 0,
      scale: 120,
      desc: "like and subscribe",
    },
    { id: 57, name: "Pumpkin", price: 50, scale: 120, desc: "Spooooky" },
    { id: 8, name: "Bummle Hat", price: 100, scale: 120, desc: "no effect" },
    { id: 2, name: "Straw Hat", price: 500, scale: 120, desc: "no effect" },
    {
      id: 15,
      name: "Winter Cap",
      price: 600,
      scale: 120,
      desc: "allows you to move at normal speed in snow",
      coldM: 1,
    },
    { id: 5, name: "Cowboy Hat", price: 1e3, scale: 120, desc: "no effect" },
    { id: 4, name: "Ranger Hat", price: 2e3, scale: 120, desc: "no effect" },
    { id: 18, name: "Explorer Hat", price: 2e3, scale: 120, desc: "no effect" },
    {
      id: 31,
      name: "Flipper Hat",
      price: 2500,
      scale: 120,
      desc: "have more control while in water",
      watrImm: !0,
    },
    {
      id: 1,
      name: "Marksman Cap",
      price: 3e3,
      scale: 120,
      desc: "increases arrow speed and range",
      aMlt: 1.3,
    },
    {
      id: 10,
      name: "Bush Gear",
      price: 3e3,
      scale: 160,
      desc: "allows you to disguise yourself as a bush",
    },
    { id: 48, name: "Halo", price: 3e3, scale: 120, desc: "no effect" },
    {
      id: 6,
      name: "Soldier Helmet",
      price: 4e3,
      scale: 120,
      desc: "reduces damage taken but slows botActions",
      spdMult: 0.94,
      dmgMult: 0.75,
    },
    {
      id: 23,
      name: "Anti Venom Gear",
      price: 4e3,
      scale: 120,
      desc: "makes you immune to poison",
      poisonRes: 1,
    },
    {
      id: 13,
      name: "Medic Gear",
      price: 5e3,
      scale: 110,
      desc: "slowly regenerates health over time",
      healthRegen: 3,
    },
    {
      id: 9,
      name: "Miners Helmet",
      price: 5e3,
      scale: 120,
      desc: "earn 1 extra gold per resource",
      extraGold: 1,
    },
    {
      id: 32,
      name: "Musketeer Hat",
      price: 5e3,
      scale: 120,
      desc: "reduces cost of projectiles",
      projCost: 0.5,
    },
    {
      id: 7,
      name: "Bull Helmet",
      price: 6e3,
      scale: 120,
      desc: "increases damage done but drains health",
      healthRegen: -5,
      dmgMultO: 1.5,
      spdMult: 0.96,
    },
    {
      id: 22,
      name: "Emp Helmet",
      price: 6e3,
      scale: 120,
      desc: "turrets won't attack but you move slower",
      antiTurret: 1,
      spdMult: 0.7,
    },
    {
      id: 12,
      name: "Booster Hat",
      price: 6e3,
      scale: 120,
      desc: "increases your botActions speed",
      spdMult: 1.16,
    },
    {
      id: 26,
      name: "Barbarian Armor",
      price: 8e3,
      scale: 120,
      desc: "knocks back enemies that attack you",
      dmgK: 0.6,
    },
    {
      id: 21,
      name: "Plague Mask",
      price: 1e4,
      scale: 120,
      desc: "melee attacks deal poison damage",
      poisonDmg: 5,
      poisonTime: 6,
    },
    {
      id: 46,
      name: "Bull Mask",
      price: 1e4,
      scale: 120,
      desc: "bulls won't target you unless you attack them",
      bullRepel: 1,
    },
    {
      id: 14,
      name: "Windmill Hat",
      topSprite: !0,
      price: 1e4,
      scale: 120,
      desc: "generates points while worn",
      pps: 1.5,
    },
    {
      id: 11,
      name: "Spike Gear",
      topSprite: !0,
      price: 1e4,
      scale: 120,
      desc: "deal damage to players that damage you",
      dmg: 0.45,
    },
    {
      id: 53,
      name: "Turret Gear",
      topSprite: !0,
      price: 1e4,
      scale: 120,
      desc: "you become a walking turret",
      turret: { proj: 1, range: 700, rate: 2500 },
      spdMult: 0.7,
    },
    {
      id: 20,
      name: "Samurai Armor",
      price: 12e3,
      scale: 120,
      desc: "increased attack speed and fire rate",
      atkSpd: 0.78,
    },
    {
      id: 58,
      name: "Dark Knight",
      price: 12e3,
      scale: 120,
      desc: "restores health when you deal damage",
      healD: 0.4,
    },
    {
      id: 27,
      name: "Scavenger Gear",
      price: 15e3,
      scale: 120,
      desc: "earn double points for each kill",
      kScrM: 2,
    },
    {
      id: 40,
      name: "Tank Gear",
      price: 15e3,
      scale: 120,
      desc: "increased damage to buildings but slower botActions",
      spdMult: 0.3,
      bDmg: 3.3,
    },
    {
      id: 52,
      name: "Thief Gear",
      price: 15e3,
      scale: 120,
      desc: "steal half of a players gold when you kill them",
      goldSteal: 0.5,
    },
    {
      id: 55,
      name: "Bloodthirster",
      price: 2e4,
      scale: 120,
      desc: "Restore Health when dealing damage. And increased damage",
      healD: 0.25,
      dmgMultO: 1.2,
    },
    {
      id: 56,
      name: "Assassin Gear",
      price: 2e4,
      scale: 120,
      desc: "Go invisible when not moving. Can't eat. Increased speed",
      noEat: !0,
      spdMult: 1.1,
      invisTimer: 1e3,
    },
  ],
  Bc = [
    {
      id: 12,
      name: "Snowball",
      price: 1e3,
      scale: 105,
      xOff: 18,
      desc: "no effect",
    },
    { id: 9, name: "Tree Cape", price: 1e3, scale: 90, desc: "no effect" },
    { id: 10, name: "Stone Cape", price: 1e3, scale: 90, desc: "no effect" },
    { id: 3, name: "Cookie Cape", price: 1500, scale: 90, desc: "no effect" },
    { id: 8, name: "Cow Cape", price: 2e3, scale: 90, desc: "no effect" },
    {
      id: 11,
      name: "Monkey Tail",
      price: 2e3,
      scale: 97,
      xOff: 25,
      desc: "Super speed but reduced damage",
      spdMult: 1.35,
      dmgMultO: 0.2,
    },
    {
      id: 17,
      name: "Apple Basket",
      price: 3e3,
      scale: 80,
      xOff: 12,
      desc: "slowly regenerates health over time",
      healthRegen: 1,
    },
    { id: 6, name: "Winter Cape", price: 3e3, scale: 90, desc: "no effect" },
    { id: 4, name: "Skull Cape", price: 4e3, scale: 90, desc: "no effect" },
    { id: 5, name: "Dash Cape", price: 5e3, scale: 90, desc: "no effect" },
    { id: 2, name: "Dragon Cape", price: 6e3, scale: 90, desc: "no effect" },
    { id: 1, name: "Super Cape", price: 8e3, scale: 90, desc: "no effect" },
    { id: 7, name: "Troll Cape", price: 8e3, scale: 90, desc: "no effect" },
    {
      id: 14,
      name: "Thorns",
      price: 1e4,
      scale: 115,
      xOff: 20,
      desc: "no effect",
    },
    {
      id: 15,
      name: "Blockades",
      price: 1e4,
      scale: 95,
      xOff: 15,
      desc: "no effect",
    },
    {
      id: 20,
      name: "Devils Tail",
      price: 1e4,
      scale: 95,
      xOff: 20,
      desc: "no effect",
    },
    {
      id: 16,
      name: "Sawblade",
      price: 12e3,
      scale: 90,
      spin: !0,
      xOff: 0,
      desc: "deal damage to players that damage you",
      dmg: 0.15,
    },
    {
      id: 13,
      name: "Angel Wings",
      price: 15e3,
      scale: 138,
      xOff: 22,
      desc: "slowly regenerates health over time",
      healthRegen: 3,
    },
    {
      id: 19,
      name: "Shadow Wings",
      price: 15e3,
      scale: 138,
      xOff: 22,
      desc: "increased botActions speed",
      spdMult: 1.1,
    },
    {
      id: 18,
      name: "Blood Wings",
      price: 2e4,
      scale: 178,
      xOff: 26,
      desc: "restores health when you deal damage",
      healD: 0.2,
    },
    {
      id: 21,
      name: "Corrupt X Wings",
      price: 2e4,
      scale: 178,
      xOff: 26,
      desc: "deal damage to players that damage you",
      dmg: 0.25,
    },
  ],
  Wr = { hats: _c, accessories: Bc };
let Xt = Wr.hats;
let Gt = Wr.accessories;
const j = [
    { id: 0, name: "food", layer: 0 },
    { id: 1, name: "walls", place: !0, limit: 30, layer: 0 },
    { id: 2, name: "spikes", place: !0, limit: 15, layer: 0 },
    { id: 3, name: "mill", place: !0, limit: 7, sandboxLimit: 299, layer: 1 },
    { id: 4, name: "mine", place: !0, limit: 1, layer: 0 },
    { id: 5, name: "trap", place: !0, limit: 6, sandboxLimit: 99, layer: -1 },
    {
      id: 6,
      name: "booster",
      place: !0,
      limit: 12,
      sandboxLimit: 299,
      layer: -1,
    },
    { id: 7, name: "turret", place: !0, limit: 2, layer: 1 },
    { id: 8, name: "watchtower", place: !0, limit: 12, layer: 1 },
    { id: 9, name: "buff", place: !0, limit: 4, layer: -1 },
    { id: 10, name: "spawn", place: !0, limit: 1, layer: -1 },
    { id: 11, name: "sapling", place: !0, limit: 2, layer: 0 },
    { id: 12, name: "blocker", place: !0, limit: 3, layer: -1 },
    {
      id: 13,
      name: "teleporter",
      place: !0,
      limit: 2,
      sandboxLimit: 299,
      layer: -1,
    },
  ],
  wc = [
    {
      indx: 0,
      layer: 0,
      src: "arrow_1",
      dmg: 25,
      speed: 1.6,
      scale: 103,
      range: 1e3,
    },
    { indx: 1, layer: 1, dmg: 25, scale: 20 },
    {
      indx: 0,
      layer: 0,
      src: "arrow_1",
      dmg: 35,
      speed: 2.5,
      scale: 103,
      range: 1200,
    },
    {
      indx: 0,
      layer: 0,
      src: "arrow_1",
      dmg: 30,
      speed: 2,
      scale: 103,
      range: 1200,
    },
    { indx: 1, layer: 1, dmg: 16, scale: 20 },
    {
      indx: 0,
      layer: 0,
      src: "bullet_1",
      dmg: 50,
      speed: 3.6,
      scale: 160,
      range: 1400,
    },
  ],
  kc = [
    {
      id: 0,
      type: 0,
      name: "tool hammer",
      desc: "tool for gathering all resources",
      src: "hammer_1",
      length: 140,
      width: 140,
      xOff: -3,
      yOff: 18,
      dmg: 25,
      range: 65,
      gather: 1,
      speed: 300,
    },
    {
      id: 1,
      type: 0,
      age: 2,
      name: "hand axe",
      desc: "gathers resources at a higher rate",
      src: "axe_1",
      length: 140,
      width: 140,
      xOff: 3,
      yOff: 24,
      dmg: 30,
      spdMult: 1,
      range: 70,
      gather: 2,
      speed: 400,
    },
    {
      id: 2,
      type: 0,
      age: 8,
      pre: 1,
      name: "great axe",
      desc: "deal more damage and gather more resources",
      src: "great_axe_1",
      length: 140,
      width: 140,
      xOff: -8,
      yOff: 25,
      dmg: 35,
      spdMult: 1,
      range: 75,
      gather: 4,
      speed: 400,
    },
    {
      id: 3,
      type: 0,
      age: 2,
      name: "short sword",
      desc: "increased attack power but slower move speed",
      src: "sword_1",
      iPad: 1.3,
      length: 130,
      width: 210,
      xOff: -8,
      yOff: 46,
      dmg: 35,
      spdMult: 0.85,
      range: 110,
      gather: 1,
      speed: 300,
    },
    {
      id: 4,
      type: 0,
      age: 8,
      pre: 3,
      name: "katana",
      desc: "greater range and damage",
      src: "samurai_1",
      iPad: 1.3,
      length: 130,
      width: 210,
      xOff: -8,
      yOff: 59,
      dmg: 40,
      spdMult: 0.8,
      range: 118,
      gather: 1,
      speed: 300,
    },
    {
      id: 5,
      type: 0,
      age: 2,
      name: "polearm",
      desc: "long range melee weapon",
      src: "spear_1",
      iPad: 1.3,
      length: 130,
      width: 210,
      xOff: -8,
      yOff: 53,
      dmg: 45,
      knock: 0.2,
      spdMult: 0.82,
      range: 142,
      gather: 1,
      speed: 700,
    },
    {
      id: 6,
      type: 0,
      age: 2,
      name: "bat",
      desc: "fast long range melee weapon",
      src: "bat_1",
      iPad: 1.3,
      length: 110,
      width: 180,
      xOff: -8,
      yOff: 53,
      dmg: 20,
      knock: 0.7,
      range: 110,
      gather: 1,
      speed: 300,
    },
    {
      id: 7,
      type: 0,
      age: 2,
      name: "daggers",
      desc: "really fast short range weapon",
      src: "dagger_1",
      iPad: 0.8,
      length: 110,
      width: 110,
      xOff: 18,
      yOff: 0,
      dmg: 20,
      knock: 0.1,
      range: 65,
      gather: 1,
      hitSlow: 0.1,
      spdMult: 1.13,
      speed: 100,
    },
    {
      id: 8,
      type: 0,
      age: 2,
      name: "stick",
      desc: "great for gathering but very weak",
      src: "stick_1",
      length: 140,
      width: 140,
      xOff: 3,
      yOff: 24,
      dmg: 1,
      spdMult: 1,
      range: 70,
      gather: 7,
      speed: 400,
    },
    {
      id: 9,
      type: 1,
      age: 6,
      name: "hunting bow",
      desc: "bow used for ranged combat and hunting",
      src: "bow_1",
      req: ["wood", 4],
      length: 120,
      width: 120,
      xOff: -6,
      yOff: 0,
      dmg: 25,
      projectile: 0,
      spdMult: 0.75,
      speed: 600,
    },
    {
      id: 10,
      type: 1,
      age: 6,
      name: "great hammer",
      desc: "hammer used for destroying structures",
      src: "great_hammer_1",
      length: 140,
      width: 140,
      xOff: -9,
      yOff: 25,
      dmg: 10,
      spdMult: 0.88,
      range: 75,
      sDmg: 7.5,
      gather: 1,
      speed: 400,
    },
    {
      id: 11,
      type: 1,
      age: 6,
      name: "wooden shield",
      desc: "blocks projectiles and reduces melee damage",
      src: "shield_1",
      length: 120,
      width: 120,
      shield: 0.2,
      xOff: 6,
      yOff: 0,
      spdMult: 0.7,
    },
    {
      id: 12,
      type: 1,
      age: 8,
      pre: 9,
      name: "crossbow",
      desc: "deals more damage and has greater range",
      src: "crossbow_1",
      req: ["wood", 5],
      aboveHand: !0,
      armS: 0.75,
      length: 120,
      width: 120,
      xOff: -4,
      yOff: 0,
      dmg: 35,
      projectile: 2,
      spdMult: 0.7,
      speed: 700,
    },
    {
      id: 13,
      type: 1,
      age: 9,
      pre: 12,
      name: "repeater crossbow",
      desc: "high firerate crossbow with reduced damage",
      src: "crossbow_2",
      req: ["wood", 10],
      aboveHand: !0,
      armS: 0.75,
      length: 120,
      width: 120,
      xOff: -4,
      yOff: 0,
      dmg: 30,
      projectile: 3,
      spdMult: 0.7,
      speed: 230,
    },
    {
      id: 14,
      type: 1,
      age: 6,
      name: "mc grabby",
      desc: "steals resources from enemies",
      src: "grab_1",
      length: 130,
      width: 210,
      xOff: -8,
      yOff: 53,
      dmg: 0,
      steal: 250,
      knock: 0.2,
      spdMult: 1.05,
      range: 125,
      gather: 0,
      speed: 700,
    },
    {
      id: 15,
      type: 1,
      age: 9,
      pre: 12,
      name: "musket",
      desc: "slow firerate but high damage and range",
      src: "musket_1",
      req: ["stone", 10],
      aboveHand: !0,
      rec: 0.35,
      armS: 0.6,
      hndS: 0.3,
      hndD: 1.6,
      length: 205,
      width: 205,
      xOff: 25,
      yOff: 0,
      dmg: 50,
      projectile: 5,
      hideProjectile: !0,
      spdMult: 0.6,
      speed: 1500,
    },
  ],
  ut = [
    {
      group: j[0],
      name: "apple",
      desc: "restores 20 health when consumed",
      req: ["food", 10],
      consume: function (e) {
        return e.changeHealth(20, e);
      },
      scale: 22,
      holdOffset: 15,
    },
    {
      age: 3,
      group: j[0],
      name: "cookie",
      desc: "restores 40 health when consumed",
      req: ["food", 15],
      consume: function (e) {
        return e.changeHealth(40, e);
      },
      scale: 27,
      holdOffset: 15,
    },
    {
      age: 7,
      group: j[0],
      name: "cheese",
      desc: "restores 30 health and another 50 over 5 seconds",
      req: ["food", 25],
      consume: function (e) {
        return e.changeHealth(30, e) || e.health < 100
          ? ((e.dmgOverTime.dmg = -10),
            (e.dmgOverTime.doer = e),
            (e.dmgOverTime.time = 5),
            !0)
          : !1;
      },
      scale: 27,
      holdOffset: 15,
    },
    {
      group: j[1],
      name: "wood wall",
      desc: "provides protection for your village",
      req: ["wood", 10],
      projDmg: !0,
      health: 380,
      placeLimit: 99,
      scale: 50,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 3,
      group: j[1],
      name: "stone wall",
      desc: "provides improved protection for your village",
      req: ["stone", 25],
      health: 900,
      placeLimit: 99,
      scale: 50,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 7,
      group: j[1],
      name: "castle wall",
      desc: "provides powerful protection for your village",
      req: ["stone", 35],
      health: 1500,
      placeLimit: 99,
      scale: 52,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      group: j[2],
      name: "spikes",
      desc: "damages enemies when they touch them",
      req: ["wood", 20, "stone", 5],
      health: 400,
      dmg: 20,
      placeLimit: 99,
      scale: 49,
      spritePadding: -23,
      holdOffset: 8,
      placeOffset: -5,
    },
    {
      age: 5,
      group: j[2],
      name: "greater spikes",
      desc: "damages enemies when they touch them",
      req: ["wood", 30, "stone", 10],
      health: 500,
      dmg: 35,
      placeLimit: 99,
      scale: 52,
      spritePadding: -23,
      holdOffset: 8,
      placeOffset: -5,
    },
    {
      age: 9,
      group: j[2],
      name: "poison spikes",
      desc: "poisons enemies when they touch them",
      req: ["wood", 35, "stone", 15],
      health: 600,
      dmg: 30,
      pDmg: 5,
      placeLimit: 99,
      scale: 52,
      spritePadding: -23,
      holdOffset: 8,
      placeOffset: -5,
    },
    {
      age: 9,
      group: j[2],
      name: "spinning spikes",
      desc: "damages enemies when they touch them",
      req: ["wood", 30, "stone", 20],
      health: 500,
      dmg: 45,
      turnSpeed: 0.003,
      placeLimit: 99,
      scale: 52,
      spritePadding: -23,
      holdOffset: 8,
      placeOffset: -5,
    },
    {
      group: j[3],
      name: "windmill",
      desc: "generates gold over time",
      req: ["wood", 50, "stone", 10],
      health: 400,
      pps: 1,
      turnSpeed: 0.0016,
      spritePadding: 25,
      iconLineMult: 12,
      placeLimit: 299,
      scale: 45,
      holdOffset: 20,
      placeOffset: 5,
    },
    {
      age: 5,
      group: j[3],
      name: "faster windmill",
      desc: "generates more gold over time",
      req: ["wood", 60, "stone", 20],
      health: 500,
      pps: 1.5,
      turnSpeed: 0.0025,
      spritePadding: 25,
      iconLineMult: 12,
      placeLimit: 299,
      scale: 47,
      holdOffset: 20,
      placeOffset: 5,
    },
    {
      age: 8,
      group: j[3],
      name: "power mill",
      desc: "generates more gold over time",
      req: ["wood", 100, "stone", 50],
      health: 800,
      pps: 2,
      turnSpeed: 0.005,
      spritePadding: 25,
      iconLineMult: 12,
      placeLimit: 299,
      scale: 47,
      holdOffset: 20,
      placeOffset: 5,
    },
    {
      age: 5,
      group: j[4],
      type: 2,
      name: "mine",
      desc: "allows you to mine stone",
      req: ["wood", 20, "stone", 100],
      iconLineMult: 12,
      placeLimit: 99,
      scale: 65,
      holdOffset: 20,
      placeOffset: 0,
    },
    {
      age: 5,
      group: j[11],
      type: 0,
      name: "sapling",
      desc: "allows you to farm wood",
      req: ["wood", 150],
      iconLineMult: 12,
      colDiv: 0.5,
      placeLimit: 99,
      scale: 110,
      holdOffset: 50,
      placeOffset: -15,
    },
    {
      age: 4,
      group: j[5],
      name: "pit trap",
      desc: "pit that traps enemies if they walk over it",
      req: ["wood", 30, "stone", 30],
      trap: !0,
      ignoreCollision: !0,
      hideFromEnemy: !0,
      health: 500,
      colDiv: 0.2,
      scale: 50,
      placeLimit: 99,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 4,
      group: j[6],
      name: "boost pad",
      desc: "provides boost when stepped on",
      req: ["stone", 20, "wood", 5],
      ignoreCollision: !0,
      boostSpeed: 1.5,
      health: 150,
      colDiv: 0.7,
      scale: 45,
      placeLimit: 299,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 7,
      group: j[7],
      doUpdate: !0,
      name: "turret",
      desc: "defensive structure that shoots at enemies",
      req: ["wood", 200, "stone", 150],
      health: 800,
      projectile: 1,
      shootRange: 700,
      shootRate: 2200,
      placeLimit: 99,
      scale: 43,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 7,
      group: j[8],
      name: "platform",
      desc: "platform to shoot over walls and cross over water",
      req: ["wood", 20],
      ignoreCollision: !0,
      zIndex: 1,
      health: 300,
      placeLimit: 99,
      scale: 43,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 7,
      group: j[9],
      name: "healing pad",
      desc: "standing on it will slowly heal you",
      req: ["wood", 30, "food", 10],
      ignoreCollision: !0,
      healCol: 15,
      health: 400,
      colDiv: 0.7,
      placeLimit: 99,
      scale: 45,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 9,
      group: j[10],
      name: "spawn pad",
      desc: "you will spawn here when you die but it will dissapear",
      req: ["wood", 100, "stone", 100],
      health: 400,
      ignoreCollision: !0,
      spawnPoint: !0,
      placeLimit: 99,
      scale: 45,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 7,
      group: j[12],
      name: "blocker",
      desc: "blocks building in radius",
      req: ["wood", 30, "stone", 25],
      ignoreCollision: !0,
      blocker: 300,
      health: 400,
      colDiv: 0.7,
      placeLimit: 99,
      scale: 45,
      holdOffset: 20,
      placeOffset: -5,
    },
    {
      age: 7,
      group: j[13],
      name: "teleporter",
      desc: "teleports you to a random point on the map",
      req: ["wood", 60, "stone", 60],
      ignoreCollision: !0,
      teleport: !0,
      health: 200,
      colDiv: 0.7,
      placeLimit: 299,
      scale: 45,
      holdOffset: 20,
      placeOffset: -5,
    },
  ];
for (let e = 0; e < ut.length; ++e)
  (ut[e].id = e), ut[e].pre && (ut[e].pre = e - ut[e].pre);
const R = { groups: j, projectiles: wc, weapons: kc, list: ut };
class buildData {
  constructor(sid, x, y, dir, scale, type, o, empty, owner) {
    o = o || {};
    this.sid = sid;
    this.sentTo = {};
    this.gridLocations = [];
    this.active = !0;
    this.doUpdate = o.doUpdate;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.xWiggle = 0;
    this.yWiggle = 0;
    this.scale = scale;
    this.type = type;
    this.id = o.id;
    this.owner = owner;
    this.name = o.name;
    this.isItem = this.id != null;
    this.group = o.group;
    this.health = o.health;
    this.layer = 2;
    this.group != null
      ? (this.layer = this.group.layer)
      : this.type == 0
      ? (this.layer = 3)
      : this.type == 2
      ? (this.layer = 0)
      : this.type == 4 && (this.layer = -1);
    this.colDiv = o.colDiv || 1;
    this.blocker = o.blocker;
    this.ignoreCollision = o.ignoreCollision;
    this.dontGather = o.dontGather;
    this.hideFromEnemy = o.hideFromEnemy;
    this.friction = o.friction;
    this.projDmg = o.projDmg;
    this.dmg = o.dmg;
    this.pDmg = o.pDmg;
    this.pps = o.pps;
    this.zIndex = o.zIndex || 0;
    this.turnSpeed = o.turnSpeed;
    this.req = o.req;
    this.trap = o.trap;
    this.healCol = o.healCol;
    this.teleport = o.teleport;
    this.boostSpeed = o.boostSpeed;
    this.projectile = o.projectile;
    this.shootRange = o.shootRange;
    this.shootRate = o.shootRate;
    this.shootCount = this.shootRate;
    this.spawnPoint = o.spawnPoint;
  }
}
class CONNECT {
  constructor(t) {
    this.direct = new WebSocket(t.url, { origin: "https://moomoo.io" });
    this.direct.binaryType = "arraybuffer";
    this.allies = [];
    this.packets = 0;
    this.storedData = { sid: 0, joined: null };
    this.buildArray = [];
    this.ticks = 0;
    this.time = 1000 / 9;
    this.breakbuild = false;
    this.consume = null;
    this.primary = 1;
    this.secondary = 1;
    this.tickQueue = [];
    this.millInfo = { x: null, y: null, z: false, k: null };
    this.trapInfo = { break: true, in: false, dir: null };
    this.newDir = { last: null, dir: null };
    this.advertise = { duration: null };
    this.durations = { place: null, hat: null };
    this.dirs = [-0.77, -2.34, 2.35, 0.77, 1.57, 3.14, -1.57, 0];
    this.emit = function (e) {
      let t = Array.prototype.slice.call(arguments, 1);
      let i = Msgpack.encode([e, t]);
      this.direct.send(i);
      this.packets++;
      setTimeout(() => {
        this.packets--;
      }, 1000);
      if (this.packets >= 75) console.log(this.packets);
    };
    this.addEvent = function (action, delay) {
      if (!this.tickQueue[this.ticks + delay]) {
        this.tickQueue[this.ticks + delay] = [action];
      } else {
        this.tickQueue[this.ticks + delay].push(action);
      }
    };

    this.place = function (e, i = 0) {
      this.emit("z", this.direct.info.items[e]);
      this.emit("F", 1, i);
      this.emit("F", 0, i);
      this.direct.buildindex != -1
        ? this.emit("z", this.direct.weaponIndex, 1)
        : undefined;
    };
    this.checkItemLocation = function (x, y, s, sM, indx, ignoreWater) {
      const O = this.buildArray.find(
        (e) =>
          e.active &&
          objDist({ x: x, y: y }, e) < s + (e.blocker ? 300 : e.scale)
      );
      if (O) {
        return false;
      }
      if (
        !ignoreWater &&
        indx !== 18 &&
        y >= 14400 / 2 - 724 / 2 &&
        y <= 14400 / 2 + 724 / 2
      ) {
        return false;
      }
      return true;
    };
    this.placeCheck = function (item) {
      if (this.direct.info.items[item]) {
        for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
          let it = R.list[this.direct.info.items[item]];
          let tmpS = 35 + it.scale + (it.placeOffset || 0);

          let tmpX = this.direct.x2 + tmpS * Math.cos(i);
          let tmpY = this.direct.y2 + tmpS * Math.sin(i);
          if (this.checkItemLocation(tmpX, tmpY, it.scale, 0.6, it, false)) {
            this.place(item, i);
          }
        }
      }
    };
   this.spawn = function () {
  this.emit("M", {
    name: `${names[Math.floor(Math.random() * names.length)]}`,
    moofoll: 1,
    skin: `${Math.floor(Math.random() * skins.length)}`
  });

  // Trigger the verify button click after the bot spawns
  let whereverifybutton = document.querySelector("#altcha_checkbox");
  
  function clicktheverify() {
    if (whereverifybutton) {
      whereverifybutton.click();
    }
  }

  // Call the function to click the verify button
  clicktheverify();
};
    this.distance = function (a, b) {
      return Math.sqrt(Math.pow(b.y2 - a.y2, 2) + Math.pow(b.x2 - a.x2, 2));
    };
    this.getAim = function (a, b) {
      return Math.atan2(
        (a.y || a.y2) - (b.y || b.y2),
        (a.x || a.x2) - (b.x || b.x2)
      );
    };

    this.automill = function () {
      if (Date.now() - this.newDir.last >= 6000) {
        this.newDir.last = Date.now();
        this.newDir.dir =
          this.dirs[Math.floor(Math.random() * this.dirs.length)];
      }
      if (
        Math.hypot(
          this.millInfo.y - this.direct.y2,
          this.millInfo.x - this.direct.x2
        ) >= 90
      ) {
        let aim = Math.atan2(
          this.millInfo.y - this.direct.y2,
          this.millInfo.x - this.direct.x2
        );
        this.place(3, aim + this.RAD(68 + 314159265359 - 180));
        this.place(3, aim - this.RAD(68 + 314159265359 - 180));
        this.place(3, aim - this.RAD(0 + 314159265359 - 180));
        this.millInfo = {
          x: this.direct.x2,
          y: this.direct.y2,
        };
      }
      this.emit("f", this.newDir.dir);
      this.emit("F", 1, this.newDir.dir);
    };
    function objDist(a, b) {
      return Math.sqrt(
        Math.pow((b.y2 || b.y) - (a.y2 || a.y), 2) +
          Math.pow((b.x2 || b.x) - (a.x2 || a.x), 2)
      );
    }
    this.advertiseChat = function () {
      if (Date.now() - this.advertise.duration >= 2500) {
        this.advertise.duration = Date.now();
        this.emit(
          "6",
          `${messages[Math.floor(Math.random() * messages.length)]}`
        );
      }
    };
    this.isAllies = function (sid) {
      if (sid == this.direct.sid) return true;
      return this.allies.includes(sid);
    };
    this.RAD = function (i) {
      return i * 0.01745329251;
    };
    this.switch = function (e, t) {
      this.emit("z", e, t);
    };
    this.upgrade = function (t) {
      this.emit("H", t);
    };
    this.autobuy = function () {
      let hats = [6, 12, 15, 31, 40, 53, 56];
      let acc = [11];
      hats.forEach((e) => {
        _c.find(
          (h) =>
            !this.direct.info.skins[e] &&
            this.direct.info.points >= h.price &&
            h.id == e &&
            this.emit("c", 1, e, 0)
        );
      });
      acc.forEach((e) => {
        Bc.find(
          (h) =>
            !this.direct.info.tails[e] &&
            this.direct.info.points >= h.price &&
            h.id == e &&
            this.emit("c", 1, e, 1)
        );
      });
    };

    this.equip = function (e, t) {
      if (t == 0) {
        if (this.direct.info.skins[e] && this.direct.info.skinIndex != e) {
          this.emit("c", 0, e, 0);
        }
      } else if (t == 1) {
        if (this.direct.info.tails[e] && this.direct.info.tailIndex != e) {
          this.emit("c", 0, e, 1);
        }
      }
    };
    this.healAmount = function (dmg) {
      this.consume =
        this.direct.info.items[0] == 0
          ? 20
          : this.direct.info.items[0] == 1
          ? 40
          : this.direct.info.items[0] == 2
          ? 35
          : 20;
      for (let i = 0; i < Math.ceil((100 - dmg) / this.consume); i++)
        this.place(0, null);
    };
    this.direct.onmessage = (msg) => {
      let data = new Uint8Array(msg.data);
      let parsed = Msgpack.decode(data);
      let type = parsed[0];
      data = parsed[1];
      if (type == "A" || type == "P") {
        this.spawn();
      }
      if (type == "C") {
        this.direct.sid = data[0];
        this.storedData.sid = this.direct.sid;
        this.storedData.joined = true;
        storeSocket.send(JSON.stringify(this.storedData));
      }

      if (type == "D") {
        if (data[1]) {
          this.direct.info = new botInfo(data[0][0], data[0][1], Gt, Xt);
          this.direct.info.spawn(1);
          this.direct.visible = 0;
          this.direct.x2 = void 0;
          this.direct.y2 = void 0;
          this.direct.info.setData(data[0]);
        }
      }
      switch (type) {
        case "V":
          if (data[0]) {
            if (data[1]) {
              this.direct.info.weapons = data[0];
            } else {
              this.direct.info.items = data[0];
            }
          }
          break;
        case "K":
          if (data[0] == this.direct.sid) {
            if (data[2] < 9) {
              this.direct.info.reload[0].fill = 0;
            } else {
              this.direct.info.reload[1].fill = 0;
            }
          }
          break;
        case "N":
          if (data[0] == "points") {
            this.direct.info.points = data[1];
          }
          break;
        case "4":
          this.allies = data[0];
          break;
        case "S":
          if (this.direct) {
            this.direct.info.itemCounts[data[0]] = data[1];
          }
          break;
        case "Q":
          for (let t = 0; t < this.buildArray.length; t++) {
            if (this.buildArray[t].sid == data[0]) {
              this.buildArray[t].active = 0;
            }
          }
          break;
        case "R":
          for (let t = 0; t < this.buildArray.length; t++) {
            if (
              this.buildArray[t].owner &&
              this.buildArray[t].owner.sid == data[0]
            ) {
              this.buildArray[t].active = 0;
            }
          }
          break;
        case "H":
          /*
              for (let t = 0; t < e.length; )
        new buildData(e[t], 
        e[t + 1], 
        e[t + 2], 
        e[t + 3], 
        e[t + 4], 
        e[t + 5], 
        R.list[e[t + 6]], 
        !0, 
        e[t + 7] >= 0 ? { sid: e[t + 7] }
        }
          */
          for (let t = 0; t < data[0].length; ) {
            this.buildArray.push(
              new buildData(
                data[0][t],
                data[0][t + 1],
                data[0][t + 2],
                data[0][t + 3],
                data[0][t + 4],
                data[0][t + 5],
                R.list[data[0][t + 6]],
                !0,
                data[0][t + 7] >= 0
                  ? {
                      sid: data[0][t + 7],
                    }
                  : null
              )
            ),
              (t += 8);
          }
          break;
        case "5":
          data[2]
            ? data[0]
              ? (this.direct.info.tailIndex = data[1])
              : (this.direct.info.tails[data[1]] = 1)
            : data[0]
            ? (this.direct.info.skinIndex = data[1])
            : (this.direct.info.skins[data[1]] = 1);
          break;
        case "O":
          if (data[0] == this.direct.sid) {
            let dmg = data[1] - this.direct.info.health;
            this.direct.info.health = data[1];
            if (dmg < 0) {
              if (dmg <= -45) {
                this.healAmount(dmg);
              } else {
                setTimeout(() => {
                  this.healAmount(dmg);
                }, 120);
              }
            }
          }
          break;
        case "U":
          if (data[0] > 0) {
            switch (this.direct.info.upgrade) {
              case 0:
                this.upgrade(3);
                break;
              case 1:
                this.upgrade(17);
                break;
              case 2:
                this.upgrade(31);
                break;
              case 3:
                this.upgrade(27);
                break;
              case 4:
                this.upgrade(9);
                break;
              case 5:
                this.upgrade(34);
                break;
              case 6:
                this.upgrade(12);
                break;
              case 7:
                this.upgrade(15);
                break;
            }
            this.direct.info.upgrade++;
          }
          break;
      }
      if (type == "f") {
        if (this.direct.info.health < 100) {
          setTimeout(() => {
            this.place(0, null);
          }, 130);
        }
this.ticks++;
let DATA = data[0];
for (var i = 0; i < DATA.length; ) {
  if (DATA[i] == this.direct.sid) {
    this.direct.x2 = DATA[i + 1];
    this.direct.y2 = DATA[i + 2];
    this.direct.d2 = DATA[i + 3];
    this.direct.buildIndex = DATA[i + 4];
    this.direct.weaponIndex = DATA[i + 5];
    this.direct.weaponVariant = DATA[i + 6];
    this.direct.team = DATA[i + 7];
    this.direct.isLeader = DATA[i + 8];
    this.direct.skinIndex = DATA[i + 9];
    this.direct.tailIndex = DATA[i + 10];
    this.direct.iconIndex = DATA[i + 11];
    this.direct.zIndex = DATA[i + 12];
    this.direct.visible = 1;

    if (this.direct.buildIndex == -1) {
      // First, ensure weapons[1] is filled
      if (this.direct.info.reload[1].fill < 1) {
        if (this.direct.info.reload[1].id == this.direct.weaponIndex) {
          this.switch(this.direct.info.weapons[1], 1);
          this.direct.info.reload[1].fill =
            Math.min(
              1,
              this.direct.info.reload[1].fill +
                this.time / R.weapons[this.direct.weaponIndex].speed
            ) * (this.direct.skinIndex == 20 ? 0.78 : 1);
        } else {
          this.direct.info.reload[1].id = this.direct.weaponIndex;
          this.switch(this.direct.info.weapons[1], 1);
          this.direct.info.reload[0].id = 5; // Ensure weapon 0 is ready
          this.direct.info.reload[0].fill = 1;
        }
      } else {
        // Logic for weapons[0] if weapons[1] is filled
        if (this.direct.weaponIndex < 9 && this.direct.info.reload[1].fill == 1) {
          if (this.direct.info.reload[0].id == this.direct.weaponIndex) {
            this.direct.info.reload[0].fill =
              Math.min(
                1,
                this.direct.info.reload[0].fill +
                  this.time / R.weapons[this.direct.weaponIndex].speed
              ) * (this.direct.skinIndex == 20 ? 0.78 : 1);
          } else {
            this.direct.info.reload[0].id = this.direct.weaponIndex;
            this.direct.info.reload[1].fill = 1; // Ensure weapon 1 is ready
          }
        }
      }
    }
  }
  i += 13;
}
        if (this.tickQueue[this.ticks]) {
          this.tickQueue[this.ticks].forEach((action) => action());
        }
        if (botActions.chat) {
          this.advertiseChat();
        }
        if (botActions.massClan) {
          this.emit("L", String.fromCharCode(0));
          this.addEvent(() => {
            this.emit("N");
          }, 1);
        }
        if (!this.direct.team && this.allies.length > 0) {
          this.allies.length = 0;
        }
        let activeTrap = this.buildArray
          .filter(
            (e) =>
              e.trap &&
              e.active &&
              Math.hypot(this.direct.x2 - e.x, this.direct.y2 - e.y) <=
                e.scale &&
              !this.isAllies(e.owner.sid)
          )
          .sort((a, b) => objDist(a, this.direct) - objDist(b, this.direct))[0];
        if (activeTrap) {
          this.trapInfo.dir = Math.atan2(
            activeTrap.y - this.direct.y2,
            activeTrap.x - this.direct.x2
          );
          this.trapInfo.break = true;
          this.switch(
            this.direct.info.weapons[1] == 10
              ? this.direct.info.weapons[1]
              : this.direct.info.weapons[0],
            1
          );
          this.emit(
            "F",
            1,
            (this.direct.info.weapons[1] == 10
              ? this.direct.info.reload[1].fill
              : this.direct.info.reload[0].fill) == 1
              ? this.trapInfo.dir
              : 0
          );
          if (
            (this.direct.info.weapons[1] == 10
              ? this.direct.info.reload[1].fill
              : this.direct.info.reload[0].fill) == 1
          ) {
            this.equip(40, 0);
          } else {
            this.equip(6, 0);
          }
        } else if (this.trapInfo.break) {
          this.trapInfo.break = false;
          this.trapInfo.dir = null;
          this.equip(6, 0);
          this.emit("F", 0);
        }
        this.autobuy();
        if (!this.trapInfo.break) {
          if (
            this.direct.y2 >= 14400 / 2 - 724 / 2 &&
            this.direct.y2 <= 14400 / 2 + 724 / 2
          ) {
            this.equip(31, 0);
          } else if (botActions.assassin && botActions.idle) {
            if (botActions.setRep) {
              if (Date.now() - this.durations.hat >= 240) {
                this.durations.hat = Date.now();
                this.equip(56, 0);
              } else {
                this.equip(6, 0);
              }
            } else {
              this.equip(56, 0);
            }
          } else if (this.direct.y2 < 2400) {
            this.equip(15, 0);
          } else {
            this.equip(6, 0);
          }
          this.equip(11, 1);
        }
        if (!this.trapInfo.break) {
          if (botActions.automill) {
            this.automill();
          } else if (botActions.projectileSync && enemy) {
            if (
              this.distance(owner, this.direct) < 1000 ||
              !botActions.mouseLock
            ) {
              if (Date.now() - this.durations.place >= 700) {
                this.durations.place = Date.now();
                this.placeCheck(5);
              }
              if (
                this.direct.weaponIndex != this.direct.info.weapons[1] ||
                this.direct.buildIndex > -1
              ) {
                this.switch(this.direct.info.weapons[1], 1);
              }
              this.emit(
                "F",
                1,
                Math.atan2(enemy.y2 - this.direct.y2, enemy.x2 - this.direct.x2)
              );
              this.emit("f", null);
            } else {
              if (
                this.direct.weaponIndex != this.direct.info.weapons[0] ||
                this.direct.buildIndex > -1
              ) {
                if(this.direct.info.reload[1].fill == 1)
                this.switch(this.direct.info.weapons[0], 1);
              }
              this.emit(
                "F",
                1,
                Math.atan2(owner.y2 - this.direct.y2, owner.x2 - this.direct.x2)
              );
              this.emit(
                "f",
                Math.atan2(owner.y2 - this.direct.y2, owner.x2 - this.direct.x2)
              );
            }
          } else if (botActions.breaker) {
            let nearestObj = this.buildArray
              .filter(
                (e) =>
                  !(
                    /mill/.test(e.name) ||
                    ["teleporter", undefined].includes(e.name)
                  ) &&
                  this.isAllies(e.owner.sid) &&
                  e.active &&
                  Math.hypot(this.direct.x2 - e.x, this.direct.y2 - e.y) <= 1250
              )
              .sort(
                (a, b) => objDist(a, this.direct) - objDist(b, this.direct)
              )[0];
            if (nearestObj) {
              this.emit(
                "F",
                1,
                Math.atan2(
                  nearestObj.y - this.direct.y2,
                  nearestObj.x - this.direct.x2
                )
              );
              if (
                Math.hypot(
                  this.direct.x2 - nearestObj.x,
                  this.direct.y2 - nearestObj.y
                ) <=
                R.weapons[this.direct.info.weapons[0]].range + 50
              ) {
                this.emit("f", null);
                if (
                  this.direct.weaponIndex !=
                    (this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0]) ||
                  this.direct.buildIndex > -1
                ) {
                  this.switch(
                    this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0],
                    1
                  );
                }
                if (
                  (this.direct.info.weapons[1] == 10
                    ? this.direct.info.reload[1].fill
                    : this.direct.info.reload[0].fill) == 1
                ) {
                  if(this.direct.info.reload[1].fill == 1)
                  this.breakbuild = true;
                  this.equip(40, 0);
                } else {
                  this.equip(6, 0);
                }
              } else {
                if (
                  this.direct.weaponIndex !=
                    (this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0]) ||
                  this.direct.buildIndex > -1
                ) {
                  this.switch(
                    this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0],
                    1
                  );
                }
                this.emit(
                  "f",
                  Math.atan2(
                    nearestObj.y - this.direct.y2,
                    nearestObj.x - this.direct.x2
                  )
                );
              }
            } else {
              if (
                this.direct.weaponIndex !=
                  (this.direct.info.weapons[1] == 10
                    ? this.direct.info.weapons[1]
                    : this.direct.info.weapons[0]) ||
                this.direct.buildIndex > -1
              ) {
                this.switch(
                  this.direct.info.weapons[1] == 10
                    ? this.direct.info.weapons[1]
                    : this.direct.info.weapons[0],
                  1
                );
              }
              if (this.distance(owner, this.direct) < 300) {
                this.emit("f", null);
              } else {
                this.emit(
                  "f",
                  Math.atan2(
                    owner.y2 - this.direct.y2,
                    owner.x2 - this.direct.x2
                  )
                );
                this.emit(
                  "F",
                  1,
                  Math.atan2(
                    owner.y2 - this.direct.y2,
                    owner.x2 - this.direct.x2
                  )
                );
              }
              if (this.breakbuild && this.direct.info.reload[1].fill == 1) {
                this.breakbuild = false;
                this.emit("F", 0);
                this.equip(6, 0);
              }
            }
            if (!nearestObj && this.breakbuild) {
              this.breakbuild = false;
              this.emit("F", 0);
              this.equip(6, 0);
            }
          } else if (botActions.circle) {
            if (
              this.direct.weaponIndex != this.direct.info.weapons[0] ||
              this.direct.buildIndex > -1
            ) {
              if(this.direct.info.reload[1].fill == 1)
              this.switch(this.direct.info.weapons[0], 1);
            }
            this.emit("f", this.getAim(botActions.circleAngle, this.direct));
            this.emit("D", this.getAim(botActions.circleAngle, this.direct));
          } else if (botActions.idle) {
            this.emit("F", 0);
            this.emit(
              "D",
              Math.atan2(owner.y2 - this.direct.y2, owner.x2 - this.direct.x2)
            );
            this.emit("f", null);
          } else if (botActions.follow) {
            if (
              this.direct.weaponIndex != this.direct.info.weapons[0] ||
              this.direct.buildIndex > -1
            ) {
              if(this.direct.info.reload[1].fill == 1)
              this.switch(this.direct.info.weapons[0], 1);
            }
            let nearestObj = this.buildArray
              .filter(
                (e) =>
                  ![undefined].includes(e.name) &&
                  e.active &&
                  Math.hypot(this.direct.x2 - e.x, this.direct.y2 - e.y) <= 1250
              )
              .sort(
                (a, b) => objDist(a, this.direct) - objDist(b, this.direct)
              )[0];
            if (nearestObj) {
              if (
                Math.hypot(
                  this.direct.x2 - nearestObj.x,
                  this.direct.y2 - nearestObj.y
                ) <=
                R.weapons[this.direct.info.weapons[0]].range + 50
              ) {
                this.emit(
                  "F",
                  1,
                  (this.direct.info.weapons[1] == 10
                    ? this.direct.info.reload[1].fill
                    : this.direct.info.reload[0].fill) == 1
                    ? Math.atan2(
                        nearestObj.y - this.direct.y2,
                        nearestObj.x - this.direct.x2
                      )
                    : Math.atan2(
                        owner.y2 - this.direct.y2,
                        owner.x2 - this.direct.x2
                      )
                );
                if (
                  this.direct.weaponIndex !=
                    (this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0]) ||
                  this.direct.buildIndex > -1
                ) {
                  this.switch(
                    this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0],
                    1
                  );
                }
                if (
                  (this.direct.info.weapons[1] == 10
                    ? this.direct.info.reload[1].fill
                    : this.direct.info.reload[0].fill) == 1
                ) {
                  if(this.direct.info.reload[1].fill == 1)
                  this.breakbuild = true;
                  this.equip(40, 0);
                } else {
                  this.equip(6, 0);
                }
              } else {
                if (
                  this.direct.weaponIndex !=
                    (this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0]) ||
                  this.direct.buildIndex > -1
                ) {
                  this.switch(
                    this.direct.info.weapons[1] == 10
                      ? this.direct.info.weapons[1]
                      : this.direct.info.weapons[0],
                    1
                  );
                }
              }
              if (this.breakbuild) {
                this.breakbuild = false;
                this.emit("F", 0);
                this.equip(6, 0);
              }
            }
            if (!nearestObj && this.breakbuild) {
              this.breakbuild = false;
              this.emit("F", 0);
              this.equip(6, 0);
            }

            if (botActions.mouseLock == false) {
              this.emit(
                "f",
                Math.atan2(
                  mousePos.y - this.direct.y2,
                  mousePos.x - this.direct.x2
                )
              );
            } else if (this.distance(owner, this.direct) < 200) {
              this.emit("f", null);
              this.emit("F", 0);
            } else {
              this.emit(
                "f",
                Math.atan2(owner.y2 - this.direct.y2, owner.x2 - this.direct.x2)
              );
            }
          }
        }
        if (this.direct.team !== owner.team) {
          if (owner.team) {
            this.emit("b", owner.team);
          }
        }
      }
    };
  }
}
