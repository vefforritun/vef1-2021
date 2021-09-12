# Reiknigaman

Útfæra leik sem gengur út á að reikna 10 stærðfræðidæmi eins hratt og mögulegt er og birta niðurstöðu.

Þegar `index.html` er opnað kemur upp gluggi sem lætur notanda vita að þegar ýtt er á `OK` byrji leikur sem snúist út á að svara eins mörgum af 10 dæmum rétt á sem stystum tíma með skilaboðunum `Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.`. Birt eru dæmi og möguleiki til að svara þeim fyrir hvert af þessum tíu dæmum. Eftir leikinn eru birt skilaboð um fjölda réttra dæma, tíma sem það tók að svara í sekúndum og meðalfjölda réttra svara á sekúndu:

```text
Þú svaraðir X af 10 dæmum rétt á Y sekúndum
Meðalrétt svör á sekúndu eru Z
```

Þar sem `Y` og `Z` hafa tvo aukastafi.

Ef notandi ýtir á `Cancel` í miðjum leik eru birt skilaboð `Hætt í leik.` og engar upplýsingar um rétt dæmi eru birt.

Möguleg dæmi eru:

* `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
* `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
* `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
* `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala

Eftir það er notanda boðið að spila annan leik, ef valið er `OK` er annar leikur spilaður, annars er hætt.
