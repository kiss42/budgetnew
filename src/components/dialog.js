const getRandomMessage = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };
  
  // Remaining Balance Messages
  export const getRemainingBalanceMessage = (remainingBalance) => {
    const positiveMessages = [
      `Whoa, $${remainingBalance.toFixed(2)} left? Did you rob a bank, or are you just better at life than the rest of us? Either way, don't blow it all on fancy oat milk.`,
      `Congrats, Rockefeller! With $${remainingBalance.toFixed(2)}, you’re officially one bad decision away from being broke again. Use it wisely.`,
      `Well, look at you! $${remainingBalance.toFixed(2)} left? That's practically a miracle. Go buy something impractical before the universe remembers it hates you.`,
      `You’ve got $${remainingBalance.toFixed(2)} left. Might as well put on sunglasses because your future’s so bright... for like five minutes.`,
      `Hot damn! $${remainingBalance.toFixed(2)}? You’re basically a financial wizard—if wizards used coupons and prayed before checking their bank balance.`,
    ];
  
    const zeroMessages = [
      `Ah, $0. The sweet spot between having just enough and wondering how you’re going to afford toothpaste.`,
      `Well, you’ve hit $0. At least you didn’t dip into negative territory... yet. Small wins, right?`,
      `Flatline alert: you’re officially at $0. Guess it’s time to start making questionable life choices.`,
      `$0 left? Hey, at least you don’t have to worry about anyone asking for a loan.`,
      `Zero bucks. Nada. Zilch. But hey, that’s what ramen noodles and “borrowing” from friends are for, right?`,
    ];
  
    const negativeMessages = [
      `Yikes, $${Math.abs(remainingBalance).toFixed(2)} in the red? That’s not a balance—it’s a cry for help. Time to start selling organs on the dark web.`,
      `Negative $${Math.abs(remainingBalance).toFixed(2)}? Looks like your wallet’s joined a death cult.`,
      `Oof. $${Math.abs(remainingBalance).toFixed(2)} down the drain? You’ve got less cash than a lemonade stand on a rainy day.`,
      `Well, shit. You’re $${Math.abs(remainingBalance).toFixed(2)} in the red. Hope you’re good at pretending you don’t need money to survive.`,
      `Negative $${Math.abs(remainingBalance).toFixed(2)}? That’s “text your mom for help” territory. Good luck, champ.`,
    ];
  
    if (remainingBalance > 0) {
      return getRandomMessage(positiveMessages);
    } else if (remainingBalance === 0) {
      return getRandomMessage(zeroMessages);
    } else {
      return getRandomMessage(negativeMessages);
    }
  };
  
  // Net Pay Messages
  export const getNetPayMessage = (netPay) => {
    const highNetPayMessages = [
      `Damn, $${netPay.toFixed(2)}? You’re practically Oprah, except without the giveaways. Don’t let it go to your head.`,
      `Big baller alert! $${netPay.toFixed(2)}? You’re basically one step away from having your own Netflix special.`,
      `$${netPay.toFixed(2)}? That’s some “order avocado toast without guilt” kind of money. Enjoy it while it lasts.`,
      `Holy hell, $${netPay.toFixed(2)}? Somebody call the Forbes list—you’ve arrived.`,
      `You’re sitting on $${netPay.toFixed(2)}? Don’t spend it all on dumb stuff. Or do—what do I care?`,
    ];
  
    const midNetPayMessages = [
      `$${netPay.toFixed(2)}? Not bad, but don’t start popping champagne just yet. Maybe a cheap beer.`,
      `With $${netPay.toFixed(2)}, you’re doing fine—like, “keep the lights on” fine. Nothing too glamorous.`,
      `$${netPay.toFixed(2)}? You’re basically adulting at an intermediate level. Gold star for effort!`,
      `Middle of the road: $${netPay.toFixed(2)}. You’re not broke, but you’re not exactly making it rain either.`,
      `$${netPay.toFixed(2)}? That’s solid, I guess. Just don’t blow it all on claw machines or lottery tickets.`,
    ];
  
    const lowNetPayMessages = [
      `Oof, $${netPay.toFixed(2)}? That’s the kind of paycheck that makes you question your life choices.`,
      `$${netPay.toFixed(2)}? That’s enough for ramen and... nope, just ramen. Maybe the good kind if you're lucky.`,
      `Well, shit. $${netPay.toFixed(2)} is the financial equivalent of a participation trophy.`,
      `$${netPay.toFixed(2)}? That’s what they call “character building” money. Keep hustling.`,
      `Your paycheck is giving “main character in a dystopian novel” vibes. $${netPay.toFixed(2)}? Yikes.`,
    ];
  
    if (netPay > 2000) {
      return getRandomMessage(highNetPayMessages);
    } else if (netPay > 1000) {
      return getRandomMessage(midNetPayMessages);
    } else {
      return getRandomMessage(lowNetPayMessages);
    }
  };
  