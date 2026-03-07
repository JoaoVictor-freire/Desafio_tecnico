import { Pokemon } from '../../types/pokemon';
import { colors, px, getTypeStyle, FR_SPRITE } from '../../lib/pixelStyle';

/* Simple name → Pokédex number lookup for FR sprites */
const dexMap: Record<string, number> = {
  bulbasaur:1,ivysaur:2,venusaur:3,charmander:4,charmeleon:5,charizard:6,
  squirtle:7,wartortle:8,blastoise:9,caterpie:10,metapod:11,butterfree:12,
  weedle:13,kakuna:14,beedrill:15,pidgey:16,pidgeotto:17,pidgeot:18,
  rattata:19,raticate:20,spearow:21,fearow:22,ekans:23,arbok:24,
  pikachu:25,raichu:26,sandshrew:27,sandslash:28,nidoran:29,nidorina:30,
  nidoqueen:31,nidorino:33,nidoking:34,clefairy:35,clefable:36,
  vulpix:37,ninetales:38,jigglypuff:39,wigglytuff:40,zubat:41,golbat:42,
  oddish:43,gloom:44,vileplume:45,paras:46,parasect:47,venonat:48,venomoth:49,
  diglett:50,dugtrio:51,meowth:52,persian:53,psyduck:54,golduck:55,
  mankey:56,primeape:57,growlithe:58,arcanine:59,poliwag:60,poliwhirl:61,
  poliwrath:62,abra:63,kadabra:64,alakazam:65,machop:66,machoke:67,machamp:68,
  bellsprout:69,weepinbell:70,victreebel:71,tentacool:72,tentacruel:73,
  geodude:74,graveler:75,golem:76,ponyta:77,rapidash:78,slowpoke:79,slowbro:80,
  magnemite:81,magneton:82,farfetchd:83,doduo:84,dodrio:85,seel:86,dewgong:87,
  grimer:88,muk:89,shellder:90,cloyster:91,gastly:92,haunter:93,gengar:94,
  onix:95,drowzee:96,hypno:97,krabby:98,kingler:99,voltorb:100,electrode:101,
  exeggcute:102,exeggutor:103,cubone:104,marowak:105,hitmonlee:106,hitmonchan:107,
  lickitung:108,koffing:109,weezing:110,rhyhorn:111,rhydon:112,chansey:113,
  tangela:114,kangaskhan:115,horsea:116,seadra:117,goldeen:118,seaking:119,
  staryu:120,starmie:121,mrmime:122,scyther:123,jynx:124,electabuzz:125,
  magmar:126,pinsir:127,tauros:128,magikarp:129,gyarados:130,lapras:131,
  ditto:132,eevee:133,vaporeon:134,jolteon:135,flareon:136,porygon:137,
  omanyte:138,omastar:139,kabuto:140,kabutops:141,aerodactyl:142,snorlax:143,
  articuno:144,zapdos:145,moltres:146,dratini:147,dragonair:148,dragonite:149,
  mewtwo:150,mew:151,
};

function getSpriteId(name: string): number {
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  return dexMap[key] || 25; // fallback to Pikachu
}

interface PokemonCardProps {
    pokemon: Pokemon;
    onEdit: (pokemon: Pokemon) => void;
    onDelete: (id: number) => void;
}

export function PokemonCard({ pokemon, onEdit, onDelete }: PokemonCardProps) {
    const ts = getTypeStyle(pokemon.Type);
    const spriteId = getSpriteId(pokemon.Name);

    return (
        <div className="flex flex-col overflow-hidden" style={{ ...px.card, background: ts.bg }}>
            {/* Sprite */}
            <div className="flex items-center justify-center" style={{ padding: '16px', minHeight: '100px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={FR_SPRITE(spriteId)}
                    alt={pokemon.Name}
                    style={{ ...px.sprite, width: '64px', height: '64px', objectFit: 'contain' }}
                />
            </div>

            {/* Info */}
            <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontSize: '10px', color: colors.dark }}>{pokemon.Name.toUpperCase()}</p>

                <span style={{ ...px.badge, color: ts.accent }}>{pokemon.Type.toUpperCase()}</span>

                <div className="flex justify-between" style={{ fontSize: '7px', color: ts.accent }}>
                    <span>LVL {pokemon.Level}</span>
                    <span>HP {pokemon.Health}</span>
                </div>

                {/* HP bar */}
                <div style={{ background: 'rgba(0,0,0,0.15)', height: '6px', border: '1px solid #000' }}>
                    <div style={{ background: colors.green, height: '100%', width: `${Math.min(pokemon.Health, 100)}%` }} />
                </div>

                <div className="flex gap-2" style={{ marginTop: '4px' }}>
                    <button onClick={() => onEdit(pokemon)} style={{ ...px.btn, ...px.btnSecondary, flex: 1, fontSize: '7px', padding: '6px' }}>
                        EDITAR
                    </button>
                    <button onClick={() => onDelete(pokemon.IdPokemon)} style={{ ...px.btn, ...px.btnDanger, flex: 1, fontSize: '7px', padding: '6px' }}>
                        LIBERAR
                    </button>
                </div>
            </div>
        </div>
    );
}
