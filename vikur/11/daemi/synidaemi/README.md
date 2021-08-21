# Verkefni 10 í vefforritun 1 2018

Verkefnið var sett upp með öllum tólum með því að keyra:

```bash
> npm install --save-dev rollup @babel/core @babel/cli @babel/preset-env @babel/polyfill rollup-plugin-babel node-sass concurrently stylelint stylelint-config-sass-guidelines stylelint-config-standard eslint browser-sync
 npx eslint --init
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · none
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
# Yes við að installa
```

`.stylelintrc` búið til:

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-sass-guidelines"]
}
```

Scriptur búnar til í `package.json`:

Hópum saman eftir hegðun, `test:*` fyrir það sem lintar, `dev:*` fyrir það sem við notum í þróun og `build:*` sem keyrir build einu sinni. Getum þá notað `concurrently npm:test:*` til að keyra öll `test` tól.

---

## Upprunaleg lýsing

Útfæra skal reiknileik sem byggir á verkefni 7. Notast við öll þau tól sem við höfum séð í vetur. Allt útlit er gefið með sass ásamt viðeigandi HTML. Leyfilegt er að breyta út af því sem gefið er.

## Leikur

Þegar smellt er á `Byrja leik` er settur af stað niðurteljari sem telur niður í 10 sekúndur. Á meðan er notanda birt dæmi fengin úr `lib/question.js`. Fyrir hvert svar er nýtt dæmi birt. Heildarfjöldi dæma ásamt fjölda réttra dæma er talin og þegar tími rennur út eru þær upplýsingar birtar ásamt stigum.

Gefinn er grunnur að leik í `lib/game.js`. Virkni til að útbúa spurningu er gefin í `lib/question.js`. Hjálparföll eru gefin í `lib/helpers.js`.

## Stigatafla

Stigatafla byrjar tóm. Eftir að fyrsta skráning kemur er skilaboðum um að engin stig séu skráð fjarlægð og stigatafla birt. Undir stigatöflu sem ekki er tóm er takki sem leyfir að fjarlægja allar færslur úr stigatöflu. Þegar búið er að spila leik skal reikna út stig (þessi formúla var afskaplega sniðug síðla kvölds í nóvember en hefur vankanta sem komu snemma í ljós, leyfilegt er að bæta, endilega bætið):

```math
correct := fjöldi réttra svara
total := fjöldi spurninga
time := lengd leiks í sekúndum

score := ((correct / total)^2 + correct) * total / time
```

`score` er síðan námundað og margfaldað með `100`.

Allar færslur í stigatöflu skal geyma í `localStorage`.

Gefinn er grunnur að stigatöflu í `lib/highscore.js` ásamt virkni til að vista stig í `lib/storage.js`.

## Tól og grunnkóði

Í verkefninu eru eftirfarandi tól uppsett:

* rollup til að pakka kóða
* babel til að transpilea kóða og gera aðgengilegri fyrir fleiri vafra
* node-sass fyrir Sass
* eslint fyrir lint á JavaScript
* stylelint fyrir lint á Sass
* browser-sync til að keyra verkefni

```bash
> npm install
> npm test -s
# Upp koma villur
> npm run dev
# Vefþjónn keyrir á localhost:3000
```

Allur grunnkóði er undir `src/` en þýddur kóði undir `dist/`. `index.html` vísar rétt í þýddar skrár.

Í gefnum kóða eru föll með athugasemdum. Leyfilegt er að breyta að öllu leiti.

`game.js` byggir á að nota aðeins módúl en `highscore.js` að nota klasa.
