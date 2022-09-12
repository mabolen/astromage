## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# ROADMAP

### What needs to happen: 
- add animations and general gameplay pacing
- build opponent AI, configure oppenent turn visual changes (hide their hand)
- complete card deck
- sound effects
- configurable gameplay settings (win conditions, difficulty?)
- finish and add new features, balance gameplay (status effects that last multiple turns, adjust card rarities, etc)
- add multiplayer??

### Adding cards
A card will consist of : 
```
    name: string
    description: string
    type: string // defense, power, offense
    cost: number // how many resources it costs to play this card
    rarity: number // between 1 and 5 (five being rarest)
    other?: CardOther // special card effects that have not been created
    actions: (p: CardPlayerStats, o: CardPlayerStats) => void // the effect of playing this card
```
Card actions/effects include: 
```
  set(player, target, amount) // player to be affected, target (resource, production, stat), amount (number to set)
  change(player, target, amount) // same as set but adds or subtracts amount from target
  damage(player, amount) // same as change but strictly affects hull then health
```

