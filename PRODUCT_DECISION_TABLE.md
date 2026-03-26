# Product Decision Table

This file translates the current simulator into a structured decision model.
The goal is to make the flow consistent as a product system, not just a set of screens.

## Current Logic

| Step | Situation | Question | Option | Position Type | What It Means | Leads To Insight |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Users choose an entry scenario | Where are you now in your shared life? | Want to understand how everything works between us | Broad entry / recommended | User wants a general diagnosis, not a narrow topic | Best default path for first-time users |
| 1 | Users choose an entry scenario | Where are you now in your shared life? | We are thinking about moving in together | Early-stage transition | Pair is about to form first rules of co-living | Good for onboarding and first-friction logic |
| 1 | Users choose an entry scenario | Where are you now in your shared life? | We are getting a shared budget | Resource alignment | Pair already faces fairness and contribution questions | Good for money-first path |
| 1 | Users choose an entry scenario | Where are you now in your shared life? | We are thinking about marriage | Formalization | Pair is approaching legal/system shift | Good for law-and-consequences path |
| 1 | Users choose an entry scenario | Where are you now in your shared life? | We are thinking about a child | Future-pressure path | Pair is entering long-term roles and responsibility | Good for high-stakes future path |
| 2 | Couple has started living together | What do you decide first? | Who pays for what | Defined / explicit rule | Pair starts with operational agreements around money | Rules can prevent early hidden resentment |
| 2 | Couple has started living together | What do you decide first? | How each person wants to live and how much personal space is needed | Defined / explicit rule | Pair starts with boundaries and lifestyle expectations | Boundaries matter before conflict appears |
| 2 | Couple has started living together | What do you decide first? | Nothing yet, we will figure it out on the way | Undefined | No early rule-setting, reliance on improvisation | Hidden conflict starts from absent agreements |
| 2 | Couple has started living together | What do you decide first? | It depends on the situation | Conditional | No stable model, rules are reactive | Pair may think it is flexible while actually remaining unclear |
| 3 | One earns much more than the other | How do you decide who pays and how much? | We split 50/50 | Defined / rigid fairness | Equality is measured formally, not contextually | Can feel fair on paper but ignore income asymmetry |
| 3 | One earns much more than the other | How do you decide who pays and how much? | Proportional to income | Defined / contextual fairness | Pair accepts asymmetry and redistributes load | Stronger model for practical fairness |
| 3 | One earns much more than the other | How do you decide who pays and how much? | One pays more, the other covers other tasks | Conditional / tradeoff | Role exchange exists, but may be only partly verbalized | Hidden expectations about value and reciprocity |
| 3 | One earns much more than the other | How do you decide who pays and how much? | We have not discussed it | Undefined | Resource model is absent | Money tension likely becomes repeated conflict |
| 4 | One starts feeling they invest more | What counts as equal contribution for you? | Money is what matters most | Defined / narrow metric | Contribution is reduced to income only | Invisible labor becomes undervalued |
| 4 | One starts feeling they invest more | What counts as equal contribution for you? | Money, home tasks, and emotional load matter equally | Defined / holistic metric | Pair sees contribution broadly | Better chance to recognize hidden labor |
| 4 | One starts feeling they invest more | What counts as equal contribution for you? | Everyone has their own zone, no need to compare | Conditional / separation logic | Comparison is avoided, but imbalance can still be felt | Conflict may stay implicit instead of solved |
| 4 | One starts feeling they invest more | What counts as equal contribution for you? | We never defined it | Undefined | No common metric of fairness | “I carry more” becomes central emotional narrative |
| 5 | Conflict appears and one discusses it with close people | How normal is that for you? | This is normal, outside perspective is useful | Externalized | Third parties are legitimate actors in the pair's system | Boundary erosion and outside influence risk |
| 5 | Conflict appears and one discusses it with close people | How normal is that for you? | Sometimes yes, but there are limits | Conditional | Pair senses boundaries but has not fixed them fully | Trust depends on unspoken context |
| 5 | Conflict appears and one discusses it with close people | How normal is that for you? | This is an internal matter of the couple | Defined / closed boundary | Pair protects internal conflict space | Stronger trust boundary if mutually shared |
| 5 | Conflict appears and one discusses it with close people | How normal is that for you? | It depends on the situation | Conditional | No consistent rule around privacy or outside influence | Boundary conflicts emerge situationally |
| 6 | One makes an important decision without discussion | What is acceptable here, and where is the line? | If it is personal money, one can decide alone | Defined / personal sovereignty | Personal domain overrides shared impact | Shared-life consequences can be ignored under “my money” logic |
| 6 | One makes an important decision without discussion | What is acceptable here, and where is the line? | Big decisions are always discussed | Defined / shared governance | Pair has explicit co-decision rule | Strong protection against trust breakdown |
| 6 | One makes an important decision without discussion | What is acceptable here, and where is the line? | There are personal and shared decisions | Conditional | Mixed model exists, but boundary may be fuzzy | Conflict depends on where each draws the line |
| 6 | One makes an important decision without discussion | What is acceptable here, and where is the line? | We never defined it | Undefined | Governance model is absent | Trust conflict likely emerges under stress |
| 7 | One wants a child, the other is unsure | What matters most here? | The decision must be fully mutual | Defined / shared principle | Future decisions require consent from both | Stronger long-term alignment model |
| 7 | One wants a child, the other is unsure | What matters most here? | First the conditions: money, stability | Conditional / readiness logic | Child decision is tied to external conditions | May be practical, but can delay real value conflict |
| 7 | One wants a child, the other is unsure | What matters most here? | Whoever is more ready has the stronger voice | Externalized / pressure logic | Readiness imbalance becomes a decision rule | Risk of coercion and long-term resentment |
| 7 | One wants a child, the other is unsure | What matters most here? | We have not discussed it | Undefined | No shared future-decision model | Future conflict remains latent until it becomes urgent |

## Current Pattern By Question

| Step | Strongest Insight Option | Why It Is Strong | Current Weakness |
| --- | --- | --- | --- |
| 2 | Nothing yet, we will figure it out on the way | Most common real-life undefined start | Screen is still too calm and does not frame this as a near-future problem strongly enough |
| 3 | We have not discussed it | Honest and high-tension answer | Two “defined” options still look too correct and morally safe |
| 4 | We never defined it | Creates the strongest fairness insight | Screen still feels conceptual rather than painfully recognizable |
| 5 | Sometimes yes, but there are limits | Most realistic and conflict-rich boundary position | Screen needs stronger trust/damage framing |
| 6 | We never defined it | Strongest governance-gap answer | The question still sounds a bit like a moral quiz, not a lived situation |
| 7 | We have not discussed it | Strongest future-conflict trigger | The pressure / coercion logic could be made more explicit |

## System Gaps

1. The simulator already has a strong structure, but answer subtitles are still too generic.
Current labels like `defined`, `conditional`, `undefined` are useful for scoring, but weak for emotional recognition.

2. Most screens are logically right, but not all of them translate the situation into lived consequences.
The strongest screens are the ones where the user can immediately imagine conflict in real life.

3. The product's main audience is not the “ideal answer” user.
The core audience is the person who sees themselves in `we didn't discuss it`, `depends on the situation`, or `we will figure it out later`.

4. The strongest product insight is not “you are incompatible”.
It is: `you already live by different rules, and they will not disappear on their own`.

## What To Improve Next

1. Rewrite each answer subtitle from abstract type-labels into contextual consequences.
Example: not `ще не визначено`, but `вирішується по ходу`.

2. Tighten the first three question screens first.
They define whether users feel “this is a beautiful form” or “this is our actual life”.

3. Align the entire flow around one consistent pattern:
- situation with hidden tension
- question framed as a decision rule
- answer options written as real-life positions
- result framed as consequences of unspoken rules

4. Keep the scoring model internal and the language external.
The engine can think in `defined/conditional/undefined`, but the user should see real-life meaning.
