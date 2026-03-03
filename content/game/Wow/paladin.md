---
title: 圣骑士
tags: [游戏]
---

# 游戏 - 魔兽世界 - 圣骑士

圣骑士是魔兽世界中的一个职业，也是一个非常重要的职业。
# 天赋：
## 防骑AOE练级天赋
[天赋模拟器地址](https://talents.turtlecraft.gg/paladin?points=AoaAI-AoCFZbAAZ-AoAoQC)

方案描述：

仅适用于防骑aoe练级使用，20-23级西部豺狼人23-26湿地豺狼人27-30暮色僵尸洞31-34暮色南狼人35-44尘泥鱼人45-52加基森海盗53-60西瘟疫冰风岗和大锅；
保持庇护祝福，智慧圣印平砍回蓝(用快速单手武器)，卡cd奉献，30级后卡cd奉献和神圣盾，血线掉到1/5左右丢自己保护或无敌读圣光术。
![天赋截图](paladin-1.png)

## 坦克天赋
[天赋模拟器地址](https://talents.turtlecraft.gg/paladin?points=-AoYFZbCAZoAoB-AoAoAI)
方案描述
防骑天赋
![天赋截图](paladin-2.png)

## 治疗天赋
[天赋模拟器地址](https://talents.turtlecraft.gg/paladin?points=AoaAZQFQpAYoB--FoAAAK)
方案描述
治疗天赋
![天赋截图](paladin-3.png)

# 宏：
```lua
#DPS+
#showtooltip 正义圣印
/startattack
/script for i=1,16 do if(UnitBuff("player",i)) then if(string.find(UnitBuff("player",i),"ThunderBolt")) then CastSpellByName("审判");break;end;else CastSpellByName("正义圣印");break;end;end;
/script for i=1,16 do if(UnitBuff("player",i)) then if(string.find(UnitBuff("player",i),"BlessingOfProtection")) then break;end;else CastSpellByName("神圣之盾");break;end;end;
/script if SpellReady("十字军打击") then local name,count,btl=nil; for i=1,16 do name,count=UnitBuff("player",i); btl=GetPlayerBuffTimeLeft(i-1); if name and strfind(name,"CrusaderStrike") then break; end; end; if name and count == 3 and btl > 8 then CastSpellByName("神圣打击"); else CastSpellByName("十字军打击"); end end

#DH+
#showtooltip 智慧圣印
/startattack
/script for i=1,16 do if(UnitBuff("player",i)) then if(string.find(UnitBuff("player",i),"RighteousnessAura")) then break;end;else CastSpellByName("智慧圣印");break;end;end;
/script for i=1,16 do if(UnitBuff("player",i)) then if(string.find(UnitBuff("player",i),"BlessingOfProtection")) then break;end;else CastSpellByName("神圣之盾");break;end;end;
/script if SpellReady("十字军打击") then local name,count,btl=nil; for i=1,16 do name,count=UnitBuff("player",i); btl=GetPlayerBuffTimeLeft(i-1); if name and strfind(name,"CrusaderStrike") then break; end; end; if name and count == 3 and btl > 8 then CastSpellByName("神圣打击"); else CastSpellByName("十字军打击"); end end

#TANK
#showtooltip 公正圣印
/startattack
/script for i=1,16 do if(UnitBuff("player",i)) then if(string.find(UnitBuff("player",i),"SealOfWrath")) then break;end;else CastSpellByName("公正圣印");break;end;end
/script for i=1,16 do if(UnitBuff("player",i)) then if(string.find(UnitBuff("player",i),"BlessingOfProtection")) then break;end;else CastSpellByName("神圣之盾");break;end;end
/script if SpellReady("十字军打击") then local name,count,btl=nil; for i=1,20 do name,count=UnitBuff("player",i); btl=GetPlayerBuffTimeLeft(i-1); if name and strfind(name,"CrusaderStrike") then break; end; end; if name and count == 3 and btl > 8 then CastSpellByName("神圣打击"); else CastSpellByName("十字军打击"); end end

#惩戒输出
/script c,bf,dbf,s,m,boss=CastSpellByName,UnitBuff,UnitDebuff,string.find,UnitMana("player");if UnitClassification("target")=="worldboss" then boss=1 end;
/script zh,zy,sz,szc,tz,z,y="RighteousnessAura","ThunderBolt","CrusaderStrike";
/script for i=1,32 do if(dbf("target",i)) then if(s(dbf("target",i),zh)) then tz=1 elseif (s(dbf("target",i),sz)) then _,szc=dbf("target",i) end;end;if(bf("player",i)) then if(s(bf("player",i),zh)) then z=1 elseif (s(bf("player",i),zy)) then y=1 end;end;end;
/script if tz~=1 then if z~=1 then c("智慧圣印") else c("审判") end;elseif y~=1 then c("正义圣印")end;
/script if SpellReady("神圣打击") then cast("神圣打击");end
/script if SpellReady("审判") then cast("审判");end
/script if math.floor(UnitMana("player")/UnitManaMax("player")*100)>30 then CastSpellByName("奉献");else CastSpellByName("奉献(等级 1)");end
/script local t=UnitCreatureType("target");if t=="亡灵" or t=="恶魔" then if SpellReady("驱邪术") then c("驱邪术")end;end;
/script if SpellReady("十字军打击") then if szc~=5 and boss then c("十字军打击(等级 5)")else c("十字军打击(等级 1)")end;end;
```
