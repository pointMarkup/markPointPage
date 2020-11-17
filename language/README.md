<a name="return">[Retour](../)</a>
<br><hr style="height:8px; background-color:gold; border:0px">

# Langage markPointPage `!:_;`.mpp .mpt  

**Langage pour aider à l'écriture d'un document texte en html.**  

***

## _Le nom markPointPage_  

Le nom **markPoint** est une allusion à "**markup**" et "**markdown**" tout en faisant référence à [pointMarkup](https://github.com/pointMarkup/pointMarkup). L'ajout de **Page** précise ses limites.

***

**Version alpha en cours de rédaction, ne pas utiliser en production ni distribuer!**  

La licence actuelle pour la version alpha est sous CC-BY-NC-ND.  

<hr style="height:4px; background-color:gold; border:0px">

## _Avant-propos_  

C'est un langage d'instructions embarquées compatible avec la [base de la syntaxe d'un pointMarkup](https://github.com/pointMarkup/pointMarkup/pointMarkupBase). Il se limite à un balisages linéaires de mises en formes d'un texte avec hyperlien, étiquette, liste, tableau, image et médiat sans aucune validation html ou autres.  
Au final c'est une transcription et simplification du balisage HTML pour être compatible pointMarkup ou tout est organisé pour aller à l'essentiel dans le contexte.  

La pleine compréhension de ce document nécessite la connaissance du langage HTML et de la [syntaxe d'un pointMarkup](https://github.com/pointMarkup/pointMarkup/pointMarkupBase).  
Ne pas oublier qu'une balise HTML s'utilise pour sa fonction et non pour son aspect graphique ou sa mise en page.  

<!-- D'autres présentations de ce document existent ou sont en prévision :  

- [Version technique](technicalReference), qui fait office de référence.  
- Pour les [débutant en HTML]() (en prévision).  
- [Référence synthétique]() (en prévision).  
-->

### **_Choix de \<motif>_**  

Règles utilisées pour un \<motif> :  

- En premier caractère indique le type de traitement :  
  - **`"`** pour le texte, sa mise en forme ou organisation.  
  - **`*`** pour une liste ou une séquence d'instructions.  

- Mnémoniques pour motif commençant par **`"`** et **`*`** :  
  - La séquences **`"-`** indique inline.  
La ligne horizontale est une exception.
  - Un seul **`"`** indique inline (span).  
  - Deux **`"`**, consécutifs ou non, indiquent block.  
  - La séquence **`="`** indique préformaté.  
  - **`=`** peut indiquer un saut de ligne ou mode enterBr.  
  - La séquence **`"*`** indique un paragraphe.  
  - La séquence **`"/`** indique un commentaire.  
  - **`_`**, en fin de motif, peut indiquer insécable.  
  - **`^`** peut indiquer un contenu intégré médiat.  
  - **`~`** indique une option system de markPointPage.  

<!--
***  

### **_Note de rédaction:_**  

Toute ligne ou bloc de lignes commençant par le caractère:  
**?** est à confirmer (suggest).  
**~** est expérimental (beta).  
**&** est une réponse ou discussion.  
et suivi d'un espace ou du nom de l'auteur suivi d'un espace.  
**<(?|~|&)*>[\<authorName>]< >**  
le nombre de répétition (**\***) peut préciser la profondeur de l'imbrication.  
-->
<br><hr id="topRule" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Règles générales

### _markPointPage sans instruction_

Un markPointPage sans instruction valide est traité comme un fichier texte.  

### _\<target>_  _\<property>_

Les espaces de code utilisés pour **target et/ou property commencent par** :  

- **"** pour traitement de le mise en forme du texte de la présentation de la page et de ses éléments intégrés.  
- **\***
pour traitement des listes, groupes et séquences.  
- **^** au début de property pour contenu intégré.  

***

### ? _\<actionOptions>_ utilisateur

Pour les noms que peut créer l'utilisateur final \<actionOptions> :  

- Est sensible à la casse.<!--- Contient au moins deux caractères.  -->
- Commence par un caractère alphabétique, **`:`**, **`.`** ou **`_`**.  
- Et se termine par un caractère alphanumérique.  

***

### _\<options> (\<smartArea>) {\<freeArea>}_  

option, smartArea et  freeArea sont utilisés pour renseigner les attributs et styles.  

Il n'est fait aucune différence entre freeArea et smartArea placées en fin de \<commandStart> ou \<commandsEnd>. Si les deux coexistent, ce qui est placé après \<commandsEnd> n'est pas prioritaire et est ajouté à ce qui est placé après \<commandStart>.  

***

### _\<aData>_

Dans aData, toute écriture de balise HTML n'est pas interprétée.  
Les \<, > et & sont respectivement remplacés par &lt, &gt et &amp

<br><hr id="docIndex" style="height:8px; background-color:gold; border:0px">

## _Index groupe d'instruction et option_

- [Règles générales](#topRule)  
- [Flux texte](#fluxText) ( span, div, pre, flexBox et colonne )  
- [Découpage texte](#splitText) (titres, ligne, paragraphe, saut de ligne et commentaire.  
- [Rich texte](#richText)
- [Liste html code](#listHTMLCode)
  - [Liste html](#listHTML)
  - [Liste html interactive](#listeSelect)
- [Formulaire](#listeForm)
- [Médiate](#mediate)
- [Générique html](#generic)  
- [Attribut style](#attrbStyle)  
- [Style CSS](#styleCSS)
- [Mode](#mode)

<br><hr id="fluxText" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## flux texte  

### <span

**`!"- <aData> !;`** en ligne (inline)  
**`!"-" <aData> !;`** display inline-block  
<!--**`!"=" <aData> !;`** display block-->  

### <div

**`!"" <aData> !;`** multi-lignes (bloc)  
**`!""- <aData> !;`** display inline-block multi-lignes (bloc)  

### <pre

Non réentrant.  
**`!"=" <aData> !;`**  
**`!"="- <aData> !;`**  display inline-block  

### horizontale flexBox

**`!""-- ...!;, ...!:, ...!;, ...!;`** hr(non sémantique) avec contenus. !: indique contenu centré.  
**`!""-.`** idem précédent mais sans ligne entre chaque élément.  

### en colonnes

**`!"||\<number>`** avec number comme nombre de colonnes.  
**`!"=||\<number>`** avec number comme nombre de colonnes.  

<br><hr id="splitText" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Sectioning text  

<!--
### \<Title> \<cover>

0 indique pas compté dans les pages.  
**`!"0" dataTitre <\n>`** Titre du document sur une ligne. Identique à \<title> (!title**) mais sur une ligne.  
**`!""0" ... !;`** Page de couverture du document.  
? **`!""0-4" ... !;`** Quatrième de couverture du document (plat verso).  
Plus rare:  
? **`!""0-2" ... !;`** Rabat couverture du document.  
? **`!""0-3" ... !;`** Rabat quatrième de couverture du document (plat verso).  
En générale hors document (détachable ou non):
? **`!""0-<idNameInfo>" <InfoTitle> <\n> <aData> !;`**  
-->

### Titres \<h(1-6)>

_**Sur une ligne :**_  
**`!"`\<number>`"`dataTitre`<\n>`** _(bloc)_  
**`!"`\<number>`"`dataTitre `<\n>`** _(inline-bloc)_  

_**Sur plusieurs lignes et centré :**_  
Chaque 'enter' de dataTitre est remplacé par un \<br>.  
**`!"`\<number>`"=`dataTitre `!;`** _(bloc)_  
**`!"`\<number>`"=`dataAfterFirst `!;:` dataTitre `!;`** _(pseudo inline-bloc sur première ligne)_  
**`!"`\<number>`"=`dataAfterEnd `!;,` dataTitre `!;`** _(pseudo inline-bloc sur dernière ligne)_  

<!--
Plusieurs titre consécutif sont réunit dans un \<hgroup>
Si le titre est absent (dataTitre) c'est id qui est pris en compte en remplaçant les suite de underscore par un espace.
-->  

***

### Line horizontale (thematic break, horizontal rule)

**`!"---`[\<thickness>]** thickness est une nombre qui représente l'épaisseur de la ligne.  

<!--
\<srcValue> de freeArea est utilisé comme option facultative pour écrire du texte sur la ligne.  
**`!"--[{$[<textLeft>]$[<textCenter>]$[<textRight>])}]\n>`**  
Les $ peuvent tous être remplacés par un autre caractère non utilisé dans \<textLeft>, \<textCenter> ou \<textRight>  
? **`!"[<textLeft>]-[<textCenter>]-[<textRight>]- \n>`**  
? **`!"<textLeft>-<\n>`**  
? **`!"-<textCenter>-<\n>`**  
? **`!"--<textRight><\n>`**  
? **`!"--<\n>`** ou **`!"---<\n>`**  
? **`!l|d:`**  
? **`!"_"<\n>`**  
-->

***

### Tiret

**`!"-%`** tiret court  
**`!"--%`** tiret long  
**`!"-?`** tiret conditionnel  

***

### Paragraphe

Non réentrant.  
_**Normal**_  
**`!"*` ` `\<aData>`!;`**  
_**Avec mode enterBr**_  
**`!"*=` ` `\<aData>`!;`**  
<!-- ~ **`!"** <aData> !;`** paragraphe avec indentation première ligne.-->  

***

### <a name="break">\<br Saut de ligne </a>  

**`!"=` ` `** toujours suivi d'une instruction ou d'un caractère blanc qui fait parti
de l'instruction .  

***

### <!-- Commentaire html

_**sur une ligne**_  
**`!"/`\<commentData>`\n`**  
_**sur plusieurs lignes**_  
**`!"//`\<commentData>`!;`**  

<!--
### ? Gestion des pages

Est une listes organisée et unique par pointMarkup.  
Tout fpg(front) bpg(background) précédant (supérieur) est prioritaire.  
~ [ **`!"pg*`** | **`!"lpg*`** | **`!"rpg*`** ] **` <aData> !;`**  
? **`!*||`** **`!*|^`** **`!*^|`** **`!*=|`** **`!*|=`** ...  
-->

<br><hr id="richText" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## rich text

### signifiant mark révision  
 
_**signifiant**_  
**`!s" <aData> !;`** **\<strong>**  
**`!e" <aData> !;`** **\<em> emphase**  
**`!i" <aData> !;`** **\<i> italique**  
**`!b" <aData> !;`** **\<b> bold**  
**`!m" <aData> !;`** **\<mark>**  
_**revision**_  
**`!u" <aData> !;`** **\<u> underline**  
**`!o" <aData> !;`** **\<s> obsolete**  
**`!del" <aData> !;`** **\<del> supprimée**  
**`!ins" <aData> !;`** **\<ins> ajouté (add)**  
_**code**_  
**`!c" <aData>!;`** **\<code>** le texte d'un code inline  
**`!c"" <aData>!;`** **\<code>** le texte d'un code bloc  
_**citation**_  
**`!q" <aData>!;`** **\<q>** en ligne (inline) citation courte entre-quotes.  
**`!q"" <aData>!;`** **\<blockquote>** (block)citation longue  
**`!r" <aData>!;`** **\<cite>** citer une référence  
_**info text**_  
**`!d" <aData> !;{<definitionOf>}`** **\<dfn> définition de**  
**`!a" <aData> !;{<abbreviationOf>}`** **\<abbr> abréviation de...**  

***

### liens

**Un peu à part les Hyperliens**  
**`!l"` [ `{`|`(` ]\<hyperlien>[ `)`|`}` ]\<aData>`!;`** (inline).  
**`!l""` [ `{`|`(` ]\<hyperlien>[ `)`|`}` ]\<aData>`!;`** (block).  
\<hyperlien> est indiqué dans smartArea ou freeArea (voir [hyperlien](#linkSrc) pour les règles d'écriture).  

***

### insécable

Utilisable aussi pour interdire tous sauts de ligne pendant un certain temps sur des éléments inline.  

- **`!"_`** de séquence de caractères. Exceptionnellement **suivi immédiatement d'un aData premier caractère non blanc ni underscore ( _ )**. Cette instructions ce termine tant qu'il n'y pas de caractère blanc. Tout trait d'union est insécable et tout underscore est un espace insécable.  
- **`!"_`< >aDataUnbreakable`!"_;`** de bloc. Motif de fin non simplifiable.  
Traits d'union et espaces sont insécables dans aDataUnbreakable.  

Voir [suppression de \<commandsEnd>](#supCmdEnd) pour simplifier l'écriture.  

***

### caractère codé

**`!"`\<mnemonic>`%`** code HTML mnémonique  
**`!"`\<decimal>`%`** code décimal  
**`!"x`\<hexadecimal>`%`** code hexadécimal  

**`!"..%`** point de suspension Unicode  
**`!"...%`** point de suspension ascii  
**`!"_%`** espace insécable  

**`!"-?`** tiret conditionnel  
**`!"-%`** tiret court  
**`!"--%`** tiret long  

<br><hr id="listHTMLCode" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Liste générique

L'imbrication des liste HTML est exclusive.  

Les listes sont considérées de façon générales et peuvent s'imbriquer.  
Elles regroupent plusieurs informations ayant un but commun et dont l'organisation est prédéfinie ou libre.  
La syntaxe d'une liste organise et facilite les séquences d'instructions.  

Mnémonique : le nombre d'astérix (**`*`**) est inversement proportionnelle aux nombre de niveaux théoriques ou pratiques plus un (root = 0).  

***

**_Liste à un niveau_** (par défaut)  
Deux méthodes d'entrée dans une liste :  
**`!**`\<type>** si besoin de contenu en root list ou attributs ou style pour premier élément.  
**`!*`\<type>** premier élément de la liste.  
Note : smartArea et freeArea sont affectées au root list.  

**`!*`** pour chaque élément de la liste.  
**`!*_`** avec aData, dernier élément et **sortie d'une liste imbriquée**.  
**`!*,`** retour root liste. <!-- La freeArea et options affectent les éléments précédemment déclarés jusqu'à un précédent **`!;`** ou tous par défaut. -->  

***

**_Liste à deux niveaux_**  
Deux méthodes d'entrée dans une liste:  
**`!***`\<type>** si besoin de contenu en root list ou d'attributs pour premier élément de la liste.  
**`!**`\<type>** premier élément niveau 1.
Note : smartArea et freeArea sont affectées au root list.  

**`!**`** pour chaque élément niveau 1 de la liste.  
**`!*`** pour chaque élément niveau 2 de la liste.  
**`!*_`** avec aData, dernier élément niveau 2 et **sortie d'une liste imbriquée**.  
**`!*,`** fin de liste niveau 2 retour root liste.  

***

**_Liste à deux niveaux avec option de groupe_**  

C'est une liste dont le niveau 2 peut optionnellement être tout ou partiellement regroupé dans un niveau 1. En d'autres termes le niveau 2 peut ce retrouver virtuellement en niveau 1.

Son écriture est pratiquement identique à la liste à deux niveaux :  
Trois méthodes d'entrée dans une liste:  
**`!***`\<type>** si besoin de contenu en root list ou d'attributs pour premier élément de la liste.  
**`!**`\<type>** devient premier élément niveau 1 de la liste.  
**`!*`\<type>** devient premier élément niveau 2 de la liste.  
Note : smartArea et freeArea sont affectées au root list.  

**`!**`** pour chaque élément niveau 1 de la liste.  
**`!*`** pour chaque élément niveau 2 de la liste.  
**`!*_`** avec aData, dernier élément niveau 2 et **sortie d'une liste imbriquée**.  
**`!*,`** fin de liste niveau 2 retour root liste.  

<!-- **_Liste en graphe ou arbre à junctions_**  

C'est une suite à choix multiple de listes précédentes ou d'éléments.  
En exemple \<table> et ses sous-éléments.  
-->
<br><hr id="listHTML" style="height:4px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Liste HTML

### Liste de définition ( dl dt dd )  

**`!**::`** C'est une liste à deux niveaux.  

### Liste à puces ( ul li )

**\<type>** :  
**`!*s`** (square), **`!*c`** (circle), **`!*d`** (disk), **`!*t`** (triangle),  
**`!*n`** (pas de puce), **`!*:`** défaut, **`!*h`** Liste horizontale sans puce.  
<!--
? ou liste horizontale si pas de saut de ligne entre !*
& complique inutilement le parser
-->  

### Liste ordonnée ( ol li )  

**`!*<type>[-<start>]`**  
_**\<type> nombre :**_  
**`!*x`** défaut, **`!*1`** décimal, **`!*0`** décimal avec zero devant,  
**`!*i`** romains en minuscules, **`!*I`** romains en majuscules,  
_**\<type> lettres alpha :**_  
**`!*a`** lettres minuscules, **`!*A`** lettres majuscules,  
**`!*α`** lettres grecques  
_**start exemples :**_  
**`!*1-3...!*A-D...!*I-IV...`**
<!--
### Table de matière

C'est une des listes précédente autre que liste de définition avec un [\<hyperlien>](#hyperlink) dans \<freeArea>.  
Par convention (non obligatoire) on ajoute **`[:]#_`** après type sur l'ouverture d'une liste qui possède que des éléments avec hyperlien interne, **`[:]@_`** pour des liens externe ou **`[:]#_@_`** pour les deux.  

### Menu

C'est un index sur une liste horizontale.  
Chaque sous-menu est vertical.  

### ? treeView  

Cette liste est basé sur les nodes. 
avec \<treeView> égale à **`(`** pour normale et **`[`** pour expandable.  

***

### ? Liste multi-ordonnée

Elle ne peut contenir d'autre liste multi-ordonnée.  
C'est une liste de niveau 1 imbriquée.  
Idem Liste ordonnée mais avec un point en plus:  
ex: **`!*1.`** ou **`!*1-3.4.0.`**  
Chaque sous niveau commence ainsi: **`!*1`** ou **`!*A`**  
et ce termine par **`!*_`** sur le dernier élément ou un retour au niveau supérieur **`!*;`**.  
Chaque sous-niveau peut aussi être indiqué littéralement ex: **`!*1.1.1`** pour troisième niveaux.  
? à développer.

### ? Liste diffuse  

C'est une liste à deux niveaux sans indentation.
Seul le deuxième niveau a un type.  

### ? Liste \<span|div>  

**`!*<type>`**  
**`!*==`** div/div  
**`!*""`** span/span  
**`!*==`** div/div  
**`!*"=`** span/div  
**`!*="`** div/span  
éventuellement remplacer **"** par **-** pour forcer inline-block de span.  
ou **=** par **_**  pour forcer inline-block de div.    

***

### Liste à colonne ou tableau graphique (\<Table>) 

Est considéré comme une liste de data.  
<a id="colgroup">**`!*&`**  colgroup (c'est aussi [optgroup dans select](#optgroup))</a> -->

<br><hr id="listeSelect" style="height:4px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Liste HTML interactive

### <datalist

Liste de données invisible et utilisable par javascript ou d'autres contrôles.  
Doit être placé en prochaine instruction markPointPage d'un input pour génère automatiquement la liaison **list** sur **id** datalist.  
**`!*o`**  
**`!*`**  option

### <select <optgroup

Liste à deux niveau avec option de groupe si \<optgroup> est utilisé.  
<b><code>!*</code>\<type>\<displayOption></b>  
**\<type>**    
**`&`** simple sélection ou **`&&`** multi-sélection  
_**Option d'affichage**_  
**`<number>`** nombre de lignes affichées (size) ou **`:`** mode auto-size  
**`=`** display block  

**Utilisation :**  
_**méthode d'entrée**_  
**`!*&`[`&`][`<number>`|`:`][`=`]** première élément de liste option  
**`!**`[`&`][`<number>`|`:`][`=`]** première élément de liste groupe  
_**éléments de liste**_  
**`!**`** groupe (\<optgroup>)  
**`!*`**  option  
**`!*_`**  dernière option (fin de liste)  

***

Note : **\<type>** ne doit pas être inclus dans le motif de **\<commandsEnd>**.  
Une liste imbriquer n'a pas de **\<commandsEnd>** si son dernier élément de liste ( **`!*_` ou `!**_`** ) est indiqué et que son aData est suivie d'une instruction de liste parent.  

***

<br><hr id="listeForm" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## <form liste interactive

Form est assimilée à une liste interactive non normalisé, polymorphe et multi poste.  
~ **`!*.. <aData>!*;`** multi-lignes (bloc)  
~ **`!*form <aData>!*;`** multi-lignes (bloc)  

ou idem Code mais language= form  
? pas de forme inline **`!"form= <aData>!";`** en ligne (inline)  
? **`!""form= <aData>!";`** multi-lignes (bloc)  
**?** ou **`!"form=\n<aData>!";`** multi-lignes (bloc)  

Elements interactifs target commence par **\***  
Elements informatifs target commence par **"**  

<hr style="height:4px; background-color:gold; border:0px">

### ? <fieldset <legend

~ **`!""& <aDataLegend>!";`** multi-lignes (bloc)  
idem Code mais language= group  et légende (si besoin) sur la première ligne  
? **`!""group= <aDataLegend>!";`** multi-lignes (bloc)  
? **?** ou **`!"group=\n<aData>!";`** multi-lignes (bloc)  

### input checkbox

une ou plusieurs sélectionnés  
**`!*-O-<value>: <label>`** non cochée (maj+o)  
**`!*-X-<value>: <label>`** cochée (maj+x)  

### input radio  

Une seule valeur sélectionnée  
**`!*-o-<labelName>: <label>`** (minus o)  
**`!*-x-<labelName>: <label>`** selected (minus x)  

### input button

**`!*-u-<labelName>: <label>`** down button  
**`!*-n-<labelName>: <label>`** up button  

### input datalist

**`!*o-<labelName>: <label>`** down button  

### Label

**`!"-<labelName>: <label>`**  
Pour inclure un input dans un label doubler l'astérix de l'input.
Exemple: **`!**-v->: <datalabel>`** down button  
  


<br><hr id="mediate" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Contenu intégré Médiat (mediate) !"...^  

### <img

**`!"^[{[<srcValue>)]...}] [<altData>] [<map>] !;`** image en ligne  
**`!""^[{[<srcValue>)]...}] [<altData>] [<map>] !;`** image en bloc  

\<map> **`!*^map@<mapName> aDataArea !;`** si inclus dans aData d'image liaison automatique attribut d'image
**usemap="#\<mapName>"** et placement de \<map> après \<img>.  
Suivi de \<area> **`!* aDataArea`** pour chaque zone  

Note : **map** peut aussi être utilisée pour \<object>  

### <a id='codeHlt'> Code highlighting</a>

Si disponible.  
**`!"<language>^ <aData>!";`** en ligne (inline)  
**`!""<language>^ <aData>!"";`** multi-lignes en bloc  
**\<language>** code pour générique code sinon c'est le type (txt pour texte, con pour console, aux pour divers, js pour javascript ...html,  php, c, cpp, py... )  

### Autres  

**?** \<math>, \<svg>, ...  
? **`!"[math|svg]^- <aData>!;`** en ligne (inline)  
? **`!"[math|svg]^ <aData>!;`** en bloc  (block) 

### <iframe

**`!"iframe^- <aData>!;`** en ligne  
**`!"iframe^ <aData>!;`** en bloc  

### médiat conteneur

**?** \<canvas>, \<embed>, \<object>  
Liste de sources, tracks, images  
**`!*audio|video|picture^- <aData>!;`** en ligne (inline)  
**`!*audio|video|picture^ <aData>!;`** en bloc  
**?** ou **`!"audio|video|picture^\n<aData>!;`** en bloc  
**aData** contient:  
~ \<source> **`!*^source{...}`** pour audio, video et picture (>)  
~ \<track> **`!*^track{...}`** pour audio et video (>)  
~ \<img> **`!*^img{...}`** pour picture (>)  
~ \<param> **`!*^param{...}`** pour object (>)  
~ \<map> **`!*^map{...}`** pour object (idem img)
~ suivi de \<area> **`!*{ aDataArea }`** pour chaque zone (/>)  
  
~ et contenu alternatif possible pour tous les conteneurs.  

<br><hr id="generic" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Écriture générique d'une balise HTML

### \<head \<body

En l'absence de **head** tittle et meta-données sont remontés dans la balise head générée.  
En l'absence de **body** celui-ci est généré automatiquement.  

Utilisé pour des [balises non prisent en charge](#otherTag) ou en complèter une fonctionnalité.  

Toute balise HTML peut-être déclarée ainsi:  
**`!["]<tagName><property><[;|/]>[<freeArea>][...<aData>...][!;]`**  
avec **`<[;|/]>`** pour balises auto-fermente.  

**`<property>`** **_avec_** **`["]`**.  
par similitude avec span et div il est habituel d'utiliser :  
**`-`** pour balise de type inline
**`-"`** balise inline forcée en inline-block  
**`="`** balise inline forcée en block  
**`"`** pour balise de type block  
**`"-`** balise block forcée en inline-block  
et pour du contenu remplacé ([voir code highlighting](#codeHlt)):  
**`^`** pour balise de type inline (defaut pour balises inconnues)  
**`"^`** balise inline forcée en inline-block  
**`^"`** balise inline forcée en block  



avec **`<property>`** **_sans_** **`["]`**.  
**`**[*[*]]`** ou **`==[=[=]]`** peuvent être utilisés.  
voir les [méta-données](#metaData) et les balises de [contenu sectionnant](#contentSectioning)
***

### <a id="metaData"> méta-données</a>  

Liste dans head de méta-données.  
\<property> **`***, ** ou *`** utilisée par convention.  

#### avec \<commandsEnd>

**`!head***{<attributs>} ...`**  
**`!title**{<attributs>} ...`**  
**`!style**{<attributs>} ...`**  
**`!script**{<attributs>} ...`**  

#### sans \<commandsEnd>

**`!meta*;{<attributs>}`**  
**`!link*;{<attributs>}`**  

### <a id="contentSectioning"> Content sectioning </a>

\<property> **`==[=[=]]`** utilisée par convention.  

#### avec \<commandsEnd>


**`!body===={<attributs>} ...`**  un seul  
**`!main==={<attributs>} ...`**  un seul non hidden par html  
**`!dialog=={<attributs>} ...`**  
**`!nav=={<attributs>} ...`**  
**`!aside=={<attributs>} ...`**  
**`!header=={<attributs>} ...`**  
**`!footer=={<attributs>} ...`**  
**`!section==={<attributs>} ...`**  
**`!article=={<attributs>} ...`**

### <a id="otherTag"> Autres balises </a>

exemples:  
**`!html===={<attributs>} ...`**  un seul  
**`!"address-{<attributs>} <aData> !;`**  
**`!"textarea-{<attributs>} <aData> !;`**  

<br><hr id="attrbStyle" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Attribut style

option, smartArea et  freeArea sont utilisés pour renseigner les attributs et styles.  
**`...[<title>]...<attributStyle>...[<hyperlien>|<source>]`**  
Pour rappel freeArea et smartArea peuvent contenir des caractères blancs.  

### _\<z-index> ` ` \<title>_  

z-index est un nombre.  
title est alpha numérique mais ne peut commencer par du numérique ni "-".  
Si ils existent il doivent être en première place dans smartArea ou freeArea
title ne peut contenir des séquences de caractères conflictuelles avec \<attributStyle>, \<hyperlien> ou \<source>.  

<hr style="height:4px; background-color:gold; border:0px">

### _\<attributStyle>_  
  
Pour la déclaration des attributs et styles, il est mis en place des facilités d'écriture.
Celle-ci s'inspire des sélecteur CSS et sont organisées en trois groupes :  

***

**Premier groupe :**  
c'est le groupe générique.  
**\<styleName>`:`** **` `\<styleData>` `** ( style idem style CSS )  
**\<attributName>`=`** **` `\<attributData>` `** ( attribut )  
Note : \<styleData> et \<attributData> peuvent contenir des caractère blanc et sont encadrés par un caractère blanc.  

***

**Deuxième groupe :**  **\<style1>[`"`|`""`]\<style2>` `**  
[\<**width**>] **`"`** [\<**height**>] **` `**  
[\<**color**>] **`"`** [\<**background-color**>] **` `** [\<**background-image**> **` `** ]  
avec [ `%`|`>`|`:`|`<`|`*`|`-` ] ` ` pour gestion background-image (deux premier caractères de background-image).  

_**police de caractère et texte**_  
[\<**font-style**>] **`""`** [\<**font-weight**>] **` `** [\<**font-family**> **` `** ]  
[\<**font-size**>] **`""`** [\<**line-height**>]**` `**  
[\<**text-align**>] **`""`** [\<**font-transform**>]**` `**  
weight = bold, bolder et lighter.  
style = italic, oblique et normal.  
transform = uppercase, lowercase, capitalisation et none.  
align = left, right, center, justify, start, end et match-parent.  
ajouter à align vertical-align = top, middle, bottom, text-top, text-bottom et +/-number (pour élément inline). D'autres valeurs existent pour les cellules d'un tableau.  
line-height (hauteur de ligne).  
TODO: ajouter :  
white-space hauteur retour à la ligne.  
text-indent = +/-number, each-line (première ligne et après un br ou \n pour pre) et hanging inverse l'indentation.  
text-decoration-line = none, underline, line-through et overline.  

_**Border**_  

[\<**border-color**>] **`<code>`** [\<**border-type>**]**` `**  
[\<**border-width**>] **`<code>`** [<**border-radius**>]**` `**  
note : \<border-color> et \<border-type> s'écrivent aussi bien à droite qu'à gauche de \<code> et peuvent ce cumuler avec \<border-width> ou \<border-radius>.  
**Par défaut si \<code> existe :**  
color  : currentcolor  
type   : solid  
width  : 2px  
radius : pas de radius

**\<code>** :  
Option d'écriture, si une seule valeur est indiquée elle s'applique à tous les quadrants ou radius.  
**Quatre quadrants, quatre radius**  
**`<>`** _left-top-right-bottom_  
En option d'écriture supplémentaire. Si deux valeurs sont indiquées :  
Sur quadrant, la première s'applique à left/right et la seconde à top/bottom.  
Et sur les radius left-top/right-top pour la première et left-bottom/bottom-right pour la seconde.  
**Trois quadrants, deux radius**  
**`<]`** _left(top,bottom)_ ou **`[>`** _(top,bottom)right_  
**`<^>`** _(left(top)right_ ou **`<_>`** _left(bottom)right_  
**Deux quadrants, un radius**  
**`<^`** _(left-top)_ ou **`<_`** _(left-bottom)_  
**`^>`** _(top-right)_ ou **`_>`** _(bottom-right)_  
**Deux quadrants opposés, un radius**  
**`^_`** _(left-top)(right-bottom)_  
**`_^`** _(left-bottom)(right-top)_  

_**Padding Margin**_  

[\<**margin**>] **`<code>`** [\<**padding>**]**` `**  

**\<code>** :  
`><` (top,right,bottom,left) ou une valeur pour les quatre,  
`>=<` (top,bottom) ou une valeur pour les deux,  
`<->` (left,right) ou une valeur pour les deux.  

_**Flexbox**_  

`>.<`  

<!--
[[\<**width**>]**`'`**[\<**height**>]**` `**]  
[[\<**border-width**>]**`''`**[\<**border-color**>]**` `**]  
[[\<**border-radius**>]**`"^`**[\<**background-image>**]**` `**] (en dernière position)  
[[\<**textColor**>]**`"`*[\<**background-color**>]**` `**]  
[[\<**font-size**>]**`""`**[\<**font-family**>]**` `**]  
-->

***

**Troisième groupe :**  
C'est le seul groupe utilisable aussi dans \<options> (sans **` `**).  
A l'exception de \<className> chaque élément de ce groupe est utilisable une seule fois par instruction.  
**`#`\<idName>` `** (id).  
**`@`\<nameName>` `** (name).  
**`=`\<number>` `** (tabIndex).  
**`=z`\<number>` `** (z-index).  
**`=`\<binaryAttribut>` `** (attribut).  
**`.`\<className>` `** (class/template).  
Si class est un nombre son nom est TagName suivi de nombre et \<actualShortNameMpp> ( voir règle auto création className ).  

Avec **`=`\<attributName>** (true)  
et l'inverse **`^`\<attributName>** (false) :  
[ **`=`**|**`^`** ]**edit` `** (contenteditable).  
[ **`=`**|**`^`** ]**select` `** (selected).  
**`=`drag` `** (draggable).  
Exemples sans facilité d'écriture:  
**`=`checked` `**  
**`=`required` `**  
**`=`disabled` `**  
Ces écritures généreront un style (à développer):  
**`=`[ justify | center | left | right ]` `** (align)  
**`=`[ top | bottom | middle ]` `** (valign) 
**`=`[ top\<Nbr> | bottom\<Nbr> | left\<Nbr> | right\<Nbr> ]` `** (équivalent à top=\<Nbr>)  
**`=`[ absolute | relative | static | sticky ]` `**  
**`=`[ hidden | relative | static | sticky ]` `**  
**`=`nowrap` `** (white-space)  

<!-- **Quatrième groupe :**  
{ **`:`** pseudoName pseudoData }  Hover ...
-->

<br><hr id="linkSrc" style="height:4px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

### _\<hyperlien> \<source>_  

**A ces groupe est ajouté des références URL-URI :**  

<a id="hyperlink" > _**\<hyperlien>**_ </a>  

**`"`[ `#`|`>`|`_`|`<`|`*`|`=` ]\<hrefValue>`"`\<fileName>` `**  
\<fileName> ne peut être précisé que pour un download.  
L'attribut target est indiqué par le caractère avant \<hrefValue>.  
**`#`** lien sur page actuelle,
**`>`** indique download avec l'indication de \<fileName> possible.  
Sinon la valeur correspondante pour target est :  
**`_`**_blank, **`<`** _parent, **`*`** _top, ou **`*`** _self (le défaut).  

Le fait d'indiquer un hyperlien en dehors d'une instruction d'hyperlien génère une balise html \<a>.  

- Cette balise encadre une instruction sans aData.  
- Pour une instruction avec aData, tout contenu de aData précédant un élément interactif est inclus dans cet hyperlien.  
- Si aData contient que du contenu interactif ou \<hr>, la balise \<a> n'est pas générée.  

_**\<source>**_  

**`^"`\<srcValue>` `**  

<br><hr id="styleCSS" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Style CSS

### class  

**`.<className> <aDataStyle>`** équivaut à class+= \<className>  
S'utilise à la fin de \<actionOptions> ou entre {...}  
className ne doit pas exister dans constantName ou templateName mais doit être référencé dans une feuille de style.  

En prévision style prédéfini : 
**`.<styleNumber><motif>`**   


### css  

**`!..:<styleId> aData...[!<n>.] aData...`**  
Gérer after/before body load ... pour feuille de style externe.  

<br><hr id="mode" style="height:8px; background-color:gold; border:0px">
<span style="float: right;">[index](#docIndex)</span>

## Modes

Active un mode.  
**`!"<mode>~`**  
Désactive le mode.  
**`!"<mode>~;`**  
Reprend l'état précédent du mode.  
**`!"<mode>~.`**
? ou **`!~==`**

**\<mode>**

**Tous les modes ont une fermeture d'instruction non simplifiable**.  

- **`=`** enterBr ( enter => \<br> )  
Tout enter non précédé d'un espace est remplacé par un \<br>  
- **`*`** autoP ( \n\n => \<p>)  
Tout double enter non précédé d'un espace déclenche un paragraphe \<p>.  
  - ? **`**`** première ligne indentée.  
  - ? **`*=`** avec enterBr.
  - ? **`**`** première ligne indentée et enterBr.
- **`-`** indent, indente la première ligne.  
- **`|`** justify, justifié.  
- **`space:?!`** espace insécable avant les caractères :, ?, ! et ).  
Et après le caractère (.
Ajoute un espace insécable ou transforme celui existant en un espace insécable.  
- **`apostrophe`** transforme apostrophe U+0027 (décimale 39) en apostrophe typographique (virgule haute).  
code caractère : &rsquo; U+2019 => 8217 (décimale). 0x92 => 146 (décimale).  
- **`noEdit`** non éditable.  
- **`noSelect`** non sélectionnable.  
- _**CSS modes :**_  
  - **CSS** favorise css interne.  
  - **extCSS** favorise css extern.  
  - **fullCSS** styles en CSS extern.  
- _**Link modes :**_  
  - **noUnderline** favorise css interne.  
  - **noDecoration** favorise css extern.  

Possibilité d'enchaîner les modes. Exemple : enterBR + indent + justify:  
**`!"` `=,-,|` `~`**

<br><hr style="height:8px; background-color:gold; border:0px">
