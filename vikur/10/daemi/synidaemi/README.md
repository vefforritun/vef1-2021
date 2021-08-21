# Vef1 2018 — Verkefni 9

Verkefni útfært að hluta í fyrirlestri 10. [Full-byggð sýnilausn frá 2018](https://github.com/vefforritun/vef1-2018-v9-synilausn).

Útfæra skal leit og birtingu á lénum gegnum `apis.is`. `http://apis.is/isnic?domain=hi.is` leitar t.d. að upplýsingum um `hi.is` og skilar til baka hlut, t.d.:

```text
{
  "results": [
    {
    "domain": "hi.is",
    "registrantname": "Háskóli Íslands",
    "address": "Sæmundargötu 2",
    "city": "Reykjavík",
    "postalCode": "101",
    "country": "IS",
    "phone": "",
    "email": "hostmaster@hi.is",
    "registered": "11. December 1986",
    "expires": "11. December 2018",
    "lastChange": "29. November 2017"
    }
  ]
}
```

Gefinn er HTML og CSS grunnur með útliti sem ekki ætti að þurfa að breyta.

Leit skal:

* Aðeins leyfa að leita ef gildi í `<input>` er ekki tómistrengur, annars skal birta skilaboðin `Lén verður að vera strengur`
* Birta skilaboðin `Leita að léni...` ásamt mynd `loading.gif` meðan leitað er, sjá `.loading` class

Villumeðhöndlun:

* Ef villa kemur upp hjá `apis.is` eða við tengingu skal birta `Villa við að sækja gögn`
* Ef ekkert lén finnst skal birta `Lén er ekki skráð`

Birta skal fyrir öll lén sem finnast:

* Lén (`domain`)
* Skráð (`registered`)
* Seinast breytt (`lastChange`)
* Rennur út (`expires`)

Ef gögn eru skilgreind skal einnig birta:

* Skráningaraðili (`registrantname`)
* Netfang (`email`)
* Heimilisfang (`address`)
* Land (`country`)

Dagsetningar skal birta sem [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) dagsetningar (`YYYY-MM-DD`).

Útfæra skal JavaScript virkni innan þess módúl sem gefinn er.

`browser-sync` er uppsett í verkefninu:

```bash
npm install
npm run dev
```

Sjá dæmi í `demo.mp4`.

Ef apis.is fer niður er gefið dæmi í `example.json` sem hægt er að sækja í stað gagna með því að vísa beint í það skjal fyrir allar fyrirspurnir.

## eslint

Setja þarf upp `eslint` með airbnb style guide. `eslint` ætti að keyra þegar `npm test` er keyrt og linta allar javascript skrár.

Leyfilegt er að slökkva á villum tengum `for of` ítrunum með `/* eslint-disable-line */`, einnig er í lagi að nota það eða leyfa almennt `console.error`. Ekki ætti að nota það fyrir annað, heldur laga villu sem koma upp.
