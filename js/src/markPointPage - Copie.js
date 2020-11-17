/* markPointPage.js /* invasion javascript: global => markPointPage /***/

"use strict"
try{"".a = "";console.log("markPointPage.js","not in strict mode")}catch(e){};

   //CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC\\
  //______:pointMarkup décodeur ____________________________\\
 //__________________________________________________________\\
//:\____ markPointPage __/:\\Version 0.0.9*; from github.com/pointMarkup/, license:. Keep this line 
function markPointPage (mpp, mppAccess, option){ // closure
	//__:typeInst pointMarkup__/...
	const BLKi = 0 /*blockInst*/, NDTi = 1 /*noDataInst*/
		, SGLi = 2 /*singleLineInst*/, MLTi = 3 /*multiLineInst*/
		//__:with commandEnd
		, CLSi = 4 /*closeInst*/, CLSAi = 5 /*closeAlternateInst*/, WCLSi = 6 /*waitCloseInst*///__:non fermé par une SEQi 
		, SEQi = 8 /*sequencedInst*/, SEQENDi = 9 /*endSeqInst*/

	//__:modifDB __/... 
	var motifDb = {} //__:table indexée des instructions par motif__/...
	const miMOTIF = 0, miRECURSIVE = 1, miTYPE = 2 //__:colonne motifDb __/...
		, miCLOSE = 3, miFUNCTION = 4, miPARAM = 5, miOPTION = 6
	var aDataEncode, motifDbInclude =[ embInstMotifDb(), commonMotifDb() ]
	motifDbInclude.forEach(function(Db){ //__:génération motifDb
		Db.forEach( ligneDb =>{
			if ( ligneDb instanceof Array ){
				var tmpMotif = ligneDb[0]
				if (tmpMotif instanceof Array ) ligneDb[0] = tmpMotif = (tmpMotif[0]||"") + (tmpMotif[1]||"") + tmpMotif[0].length
				this[tmpMotif] = ligneDb
				return
				}
			aDataEncode = ligneDb.aDataEncode || aDataEncode
			}, this )
		}, motifDb )

	//__:regExp __//...
	const markerRegExp = /!(?![\())\s\[!,_=\\-])/g 
	//___:decodeRegExp __/...
	const decodeRegExp = new RegExp( "^"
		+'(`?%?[\\."*=#^\\\\\\/\\-~<>|]*(?:_?(?!_))?)' //__:target
		+'(_*[,*\\.]?[&:,\\w\\-]*)' //__:name
		+'((?:[#@\\.=:]\\w+)*(?:_(?!_))?)' //__:cmd
		+'([\\.\?]?["*=#^%\\\\\\/\\-~<>|\\-:|]*(?:_(?!_))?)' //__:property
		+'(;([:#]?))?' //__:,end,endAlt
		+'(?:\\(((?:.?\\n*)+)\\))?' //__:smartArea 
		+'(?:{((?:.?\\n*)+)})?' //__:freeArea
		+'([\\s_]?)' //__:endSpace 
		)
	//__:regExp decode indices __/...
	const diALL = 0, diTARGET = 1, diNAME = 2, diCMD = 3,  diPROPERTY = 4
		, diEND = 5, diEndALT = 6, diSmartAREA = 7, diFreeAREA = 8, diEndSPACE = 9
	
	//__:function markPointPage __/...
	var flgFunctionMpp = false
	window.markPointPage = function markPointPage (mpp, mppAccess, option){
	var mppAccess //= mppAccess || {}
	if (typeof mpp == 'function') {mppAccess = mppAccess || mpp; mpp = mpp.toString(); flgFunctionMpp = true} 
    else mppAccess = mppAccess || {}
	if (option == "hl") {
		mppAccess.highlighting = miniHighlighting ( mpp.split(markerRegExp)) }
	else {
		mppAccess.output = decodeInstructions( mpp.split(markerRegExp)) }
	return mppAccess
	} //__:end public markPointPage __/...

	//*\____ decodeInstructions __/*\\
	function decodeInstructions ( tableMarkerSplit ){ //__:decode instruction core, parser bas->haut \\
		var nData, aData, postData  
		if ( flgFunctionMpp ) tableMarkerSplit.reverse().pop().reverse().pop() // retire (pour mpp function) texte après dernier ! et avant premier !
		var decodeStack = [], topDecodeStack, motifTopEnd = {length:0} // motif de start attendu
		var dataEndStack = []// aData après endStdInst ou une instruction de séquence
		var waitOutStack = [], waitOutData = "" , output = "" // résultat instructions traitées
		while ( nData = tableMarkerSplit.pop() ){ 
			decode()
			}
		return waitOutData + waitOutStack.reduce( (m,c,i,a)=>{return m + aDataEncode(dataEndStack.pop()) + c }, "" )
/*		return waitOutData + (dataEndStack.length //__:TODO: à vérifier et modifier ajouter contenu waitOutStack __/...
			? dataEndStack.join("") + waitOutStack.join("")
			: "" ) 
*/
		//:\____ decode __/:\\
		function decode ( ){ // decode et call selon motif Db embInst.[startDecode|actual|endDecode]
			if ( nData[0] == "`" ) { nData = nData.substring(1); notMatch(); return } //__:escape instruction
			var embInst = {}
			var embInstDecode =  embInst.startDecode = decodeRegExp.exec(nData)
			var indexMotifDb = embInstDecode[diTARGET] + embInstDecode[diPROPERTY] + embInstDecode[diTARGET].length
			var actualEmbInst = embInst.actual = motifDb[indexMotifDb]
			if (embInstDecode[diEND]) {endStdInst(); return} // Fin embInst 
			//__TODO:ajouter ici traitement aData gestion tabulation et trim enter ([\r]\n) __/...  
			aData = nData.substring(embInstDecode[diALL].length)
			if (!actualEmbInst) {notMatch(); return} // fausse embInst
			if ( aData && ( !embInstDecode[diEndSPACE] || embInstDecode[diEndSPACE] == "_" ) ) {immediateDataInst(); return } //__:traitement aData immédiatement après embInst __/...
			switch (actualEmbInst[miTYPE]){
				case NDTi: noDataInst(); break;
				case SGLi: singleLineInst(); break;
				case MLTi: multiLineInst(); break;
				case CLSAi: 
				case CLSi: closeInst(); break;
				case SEQi: sequencedInst(); break;
				case SEQENDi: endSeqInst(); break;
//				default : notMatch() // erreur 
				}
		//______:not match instructions __/...
			//:\____ notMatch __/:\\
			function notMatch (){ // fausse embInst
//				waitOutData = (!tableMarkerSplit.length ? "" : "!") + aDataEncode(nData) + waitOutData //__:TODO: à contrôler aDataEncode géré ailleur //__...
//				waitOutData = (!tableMarkerSplit.length ? "" : "!") + nData + waitOutData
				var nextMarkerSplit
				if (nextMarkerSplit = tableMarkerSplit[tableMarkerSplit.length-1]) tableMarkerSplit[tableMarkerSplit.length-1] += "!" + nData 
				else waitOutData = nData + waitOutData
				}
		//______:standard instructions ________/...
			//:\____ immediateDataInst __/
			function immediateDataInst (){ // aData collés à embInst
				var findData =  /([^\s]*)([\s\S]*)/.exec(aData)
				aData = findData[1].replace(/_+/g," ")
				postData = findData[2] || ""
				waitOutData = actualEmbInst[miFUNCTION]( embInst, aData, postData ) + waitOutData
				}
			//:\____ noDataInst __/:\\
			function noDataInst (){ // sans aData
				waitOutData =  actualEmbInst[miFUNCTION]( embInst, aData) + waitOutData
				}
			//:\____ singleLineInst __/:\\
			function singleLineInst (){ // aData uniquement sur première ligne et sans instructions <commandEnd>
				var findData =  /([^\r\n]+)\r?\n(.*)/.exec(aData,"s") || [,aData,""]
				waitOutData =  actualEmbInst[miFUNCTION]( embInst, findData[1], findData[2] ) + waitOutData
				}
			//:\____ multiLineInst __/:\\
			function multiLineInst (){ // aData jusqu'à double saut de ligne
				var findData =  /(.(?=\r?\n\r?\n)+.)\r?\n\r?\n([\s\S]*)/.exec(aData)
				waitOutData =  actualEmbInst[miFUNCTION]( embInst, findData[1], findData[2] ) + waitOutData
				}
	/*__: gestion stack __/...
	Rappel : le parser s"exécute de bas en haut.
		Une séquence d'instruction inverse ce sens de traitement (deuxième passage).
	Empile instructions de fin ou d'étapes de séquence :
	decodeStack [embInstDecode,...] pour séquence embInstDecode[diTARGET] est un nombre (niveau de profondeur séquence)   
		avance de un push sur dataEndStack et waitOutStack avec decodeStack 
		pour un accès rapide, topDecodeStack et motifTopEnd reflète l'actuel decodeStack
	dataEndStack empile aData à droite de embInstDecode   
	waitOutStack ( waitOutData ): empile data déja traitées apres aData
	waitOutData: data et instruction à droite actuellement traitées par niveaux de profondeur
	__*/			
			//:\____ closeInst __/:\\
			function closeInst (){ //__:avec une instruction de fermeture __/...
				var unStackRep = unstack() 
				embInst.endDecode =  unStackRep[0]
				waitOutData = actualEmbInst[miFUNCTION]( embInst
					, aDataEncode(aData) + waitOutData
					, aDataEncode(unStackRep[1])
					, unstack
					) + unStackRep[2]
				}
			//:\____ endStdInst __/:\\__:end !;[,|:|#|\d|?]*(?:\[\d+\])?							
			function endStdInst (){ // instruction de fin embInst 
//				if ( embInstDecode[diEndALT] ){
					
//					return
//					}
				waitOutStack.push ( waitOutData )
				dataEndStack.push(nData.substring(embInstDecode[diALL].length - (embInstDecode[diEndSPACE]==" ") )) // empile
				decodeStack.push( topDecodeStack )
				motifTopEnd =  ( topDecodeStack = embInstDecode )[diALL] =  (embInstDecode[diTARGET]||"") + (embInstDecode[diPROPERTY]||"")
				waitOutData = ""
				}
			//:\____ sequencedInst __/:\\
			function sequencedInst (){ //__:temporisation et attente identification début de liste pour traitement __/...
				var decoder = actualEmbInst[miFUNCTION]( embInst, aDataEncode(aData) , unstack)
				if (typeof decoder != "number"){ //__:temporisation d'une liste dépilée et traitée dans decoder __/...
					waitOutData = decoder //+ (typeof motifTopEnd != "number" ? unstack()[1] : "") 
					return 
					}
				if (!decoder) return notMatch()
				waitOutStack.push ( waitOutData )
				dataEndStack.push(aData) //__:empile __/...
				decodeStack.push(topDecodeStack)
				//__:decoder = un nombre désignant un élément de liste à empiler (temporisation) __/...
				motifTopEnd = (topDecodeStack = embInstDecode)[diALL] = decoder
				waitOutData = ""
				return
				}
			//:\____ unstack __/:\\
			function unstack( waitFor ){ 
				const genericEnd =  ["","",,,,";"]
				var flgActual 
				if ( motifTopEnd.length //__:not match
					&& ( waitFor && waitFor.substring(0,motifTopEnd.length ) != motifTopEnd 
						|| ( (flgActual = true) && actualEmbInst[miMOTIF].substring(0,motifTopEnd.length ) != motifTopEnd) 
						)
					) {
						console.warn (motifTopEnd,"gen for",actualEmbInst[miMOTIF]);
						return [ genericEnd, "" , "" ]} 
				//__: match consomme une instruction commandEnd (dépile) __/...
				var tmpEndDecode = topDecodeStack
				motifTopEnd = ( topDecodeStack = decodeStack.pop() || genericEnd)[diALL]
				var rep = dataEndStack.length
					? actualEmbInst[miTYPE] == SEQi 
						? [ tmpEndDecode, aDataEncode(dataEndStack.pop())+waitOutStack.pop() ]
						: [ tmpEndDecode, aDataEncode(dataEndStack.pop()), waitOutStack.pop() ] 
					: [ genericEnd, "", ""]
				return rep
				} //__:note: encode sur dépile car l'encodage n'est pas connu avant le début d'une instruction. 

			} //__:end  decode et call selon motif Db __/...

		} //__:end decode instruction core __/...


	    //CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC\\
	   //______:markPointPage interpréteur. Data bases motifs et traitement __\\
	  //_______________________________________________________________________\\
	 //*\____ embInstMotifDb __/*\\
	function embInstMotifDb ( ){ // motif Db et traitement \\
		//__:regExp decode instruction indices __/...
		const diALL = 0, diTARGET = 1, diNAME = 2, diCMD = 3,  diPROPERTY = 4
			, diEND = 5, diEndALT = 6, diSmartAREA = 7, diFreeAREA = 8, diEndSPACE = 9
		//__:motif data base option __/...
		const DFt = 0 /*Default*/, NCt = 1 /*NotClosed*/, ACt = 2 /*AutoClosed*/, OSt = 3 /*OpenSlash*/
			, VALt = 4 /*Value*/, LABt = 8 /*Label*/, MULt = 12 /*multiple*/
			, WRPt = 16 /*Wrap*/
			, JMPt = 32 /*Jump*/, STRt = 64 /*start*/, TRSt = 128 /*transparent*/
			, SPNt = 256 /*span*/, CRSt = 512 /*col/row span*/, SCRt = 768 /*scope cpl/row span*/  
			, VLMt = VALt+LABt, WVLMt = WRPt+VLMt, WSTt = WRPt+STRt 
		//__:typeInst pointMarkup__/...
		const BLKi = 0 /*blockInst*/, NDTi = 1 /*noDataInst*/
			, SGLi = 2 /*singleLineInst*/, MLTi = 3 /*multiLineInst*/
			, CLSi = 4 /*closeInst*/, CLSAi = 5 /*closeAlternateInst*/, WCLSi = 6 /*waitCloseInst*///__:non fermé par une SEQi 
			, SEQi = 8 /*sequencedInst*/, SEQENDi = 9 /*endSeqInst*/
		const CBO = 1 /*closed by other*/, NOAME = 2 /*notAutoMotifEnd*/
		const HTMLTI = 1 /*html Texte formated*/, TTAB = 2 /*trim tabulation*/
		//__:colonne motif Db __/...
		const miMOTIF = 0, miRECURSIVE = 1, miTYPE = 2
			, miCLOSE = 3, miFUNCTION = 4, miPARAM = 5, miOPTION = 6
		// mode
		const EBR = 2 /*enterBR*/, IND = 4 /*indent*/, JUS = 8 /*justify*/, NED = 16 /*notEdit*/, NSL = 32 /*notSelect*/
		//__:tag/function/create __/...
		const OpenTAG = "<", OpenCloseTAG = "</", CloseTAG = " >", AutoClosedTAG = " />"
		//__:init listHtml __/...
		listHtml()
		return [
		//   _______________ _______ _______ _______________ _______________________ ___________ _____________________________________
		//	| data decoder												||	data interpreter function
		//  |_______________ _______ _______ _______________ ___________||__________ ___________ _____________________________________
		//  |motifInst		|closed	|instruc|close option	|interpreter||param		|option		|
		//  |target property|by		|tion	|				|function	||			|			|
		//  |		|		|other	|type	|				|call		||			|			|
			,{ name:"markPointPage", type:"mpp", aDataEncode:toHtmlText, href:"" }
			,{ SplitTxt:"Split text" }
			,[["\""	,"\""	],CBO	,SGLi	,				,hTitle		,"h"		,] // \n title(0) et h(1-6) 
			,[["\""	,"\"="	],CBO	,CLSi	,				,hTitle		,"h"		,EBR] // cover(0) et h(1-6);  mode enterBr
			,[["\"---",		],		,NDTi	,				,hrLine		,"hr"		,] // hr line textLeft
			,[["\"*",		],CBO	,CLSi	,				,paragraphe	,"p"		,] // p paragraphe 
		//	,[["\"**",		],CBO	,CLSi	,				,paragraphe	,"p"		,IND] // p paragraphe first-line indentation
		//	,[["\"**=",		],CBO	,CLSi	,				,paragraphe	,"p"		,IND] // p paragraphe mode enterBR et first-line indentation 
			,[["\"*=",		],CBO	,CLSi	,				,paragraphe	,"p"		,EBR] // p paragraphe mode enterBr 
			,[["\"=",		],		,NDTi	,				,br			,"br"		,] // saut de ligne <br>
			,[["\"==",		],		,NDTi	,				,br			,"br"		,] // double saut de ligne <br>
			,[["\"===",		],		,NDTi	,				,br			,"br"		,] // triple saut de ligne <br>
			,[["\"/",		],		,SGLi	,				,commentHtml,			,] // commentaire html sur une ligne
			,[["\"//",		],		,CLSi	,				,commentHtml,			,] // commentaire html en bloc
			,{ RichTxt:"Rich text" }
			,[[""	,"\""	],		,CLSi	,				,richText	,			,] // rich text (inline)
			,[[""	,"\"\""	],		,CLSi	,				,richText	,			,true] // display block
//			,[["\"#"  ,		],CBO	,CLSi	,				,aHref 		,"a"		,] // a
//			,[["\"\"#",		],CBO	,CLSi	,				,aHref		,"a"		,true] // a block
			,[["\""	,"%"	],		,NDTi	,				,charCode	,			,] // code caractère HTML-mnémonique décimal et hexadécimal
			,[["\"..","%"	],		,NDTi	,				,charCode	,"2026"		,] // code caractère point de suspension
			,[["\"...","%"	],		,NDTi	,				,charCode	,"0085"		,] // code caractère point de suspension ascii
			,[["\"-","%"	],		,NDTi	,				,charCode	,"2013"		,] // code caractère tiret court
			,[["\"--","%"	],		,NDTi	,				,charCode	,"2014"		,] // code caractère tiret long
			,[["\"-","?"	],		,NDTi	,				,charCode	,"00AD"		,] // code caractère tiret conditionnel
			,[["\"_","%"	],		,CLSi	,				,charCode	,"00A0"		,] // code caractère espace insécable
			,[["\"_",		],		,CLSi	,				,unbreakable,			,] // unbreakable white-space:nowrap
			,[["\"_",'"'	],		,CLSi	,				,unbreakable,			,] // unbreakable white-space:nowrap
			,{ FluxTxt:"Flux text" }
			,[["\"-",		],		,CLSi	,				,inlineBlock,"span"		,] // span (inline)
			,[["\"-\"",		],		,CLSi	,				,inlineBlock,"span"		,true] // span inline-block
			,[["\"-.",		],		,CLSi	,				,center		,"span"		,true] // span inline-block text-align center
//			,[["\"-=",		],		,CLSi	,				,block		,"span"		,true] // span block
			,[["\"\"",		],		,CLSi	,				,inlineBlock,"div"		,] // div (block)
			,[["\"\".",		],		,CLSi	,				,center		,"div"		,] // div text-align center
			,[["\"\"-.",	],		,CLSi	,				,center		,"div"		,true] // div text-align center
			,[["\"\"-",		],		,CLSi	,				,inlineBlock,"div"		,true] // div inline-block
			,[["\"=\"",		],CBO	,CLSi	,				,inlineBlock,"pre"		,] // pre (block)
			,[["\"=\"-",	],CBO	,CLSi	,				,inlineBlock,"pre"		,true] // pre inline-block
			,{ List:"List" }
			,[["***",		],		,SEQi	,				,listHtml	,3			,] // 
			,[["**"	,		],		,SEQi	,				,listHtml	,2			,] // 
			,[["*"	,		],		,SEQi	,				,listHtml	,1			,] //
			,[["***","="	],		,SEQi	,				,listHtml	,3			,] // block
			,[["**"	,"="	],		,SEQi	,				,listHtml	,2			,] // block 
			,[["*"	,"="	],		,SEQi	,				,listHtml	,1			,] // block
			,[["**#",		],		,SEQi	,				,listHtml	,2			,] // pour th table
			,[["*#"	,		],		,SEQi	,				,listHtml	,1			,] // pour th table
			,[["*."	,		],		,SEQi	,				,listHtml	,1			,] // 
			,[["**_",		],		,SEQi	,				,endListHtml,-2			,] // 
			,[["*_"	,		],		,SEQi	,				,endListHtml,-1			,] //
			,[["**#_",		],		,SEQi	,				,endListHtml,-2			,] // 
			,[["*#_",		],		,SEQi	,				,endListHtml,-1			,] //
			,{ CustomList:"Custom List" }
		//	,[["\""	,"*"	,CBO	,CLSi	,				,page 		,			,] // page
			,{ Mediate:"Médiat" }
			,{ Mode:"Mode" }
			,[["\"^",		],		,NDTi	,				,block 		,"img"		,] // img (inline) peut contenir map et area
			,[["\"\"^",		],		,NDTi	,				,block 		,"img"		,true] // img block
			,[["\""	,"^"	],CBO	,CLSi	,				,code 		,"code"		,] // code (inline)
			,[["\""	,"\"^"	],CBO	,CLSi	,				,code 		,"code"		,true] // code inline-block
			,[["\""	,"^\""	],CBO	,CLSi	,				,code 		,"code"		,true] // code block
			,[["\"^-",		],CBO	,CLSi	,				,block		,"iframe"	,] // iframe
			,[["\"^=",		],CBO	,CLSi	,				,block		,"iframe"	,true] // iframe block
		//	,[["*"	,"^"	],CBO	,CLSi	,				,mediateElm	,			,] // (inline) [audio|video|picture|canvas|embed|object]
		//	,[["**"	,"^"	],CBO	,SEQi	,				,mediateElm	,			,true] // block [audio|video|picture]
		//	,[["*^"	,		],		,SEQi	,				,mediaListElm,			,] // [source|track|img|param|map]
			//_ form ___________________________________\\
		//	,[["*..",		],		,CLSi	,				,mediateElm	,			,] // form 
			//_ html tag _______________________________\\
			]
		//__:tag creation __/
		//:\____ tagOpen __/:\\
		function tagOpen ( tagName, attribut ){ return OpenTAG + tagName + " " + attribut + CloseTAG }
		//:\____ tagClose __/:\\
		function tagClose ( tagName ){ return OpenCloseTAG + tagName + " " + CloseTAG }
		//:\____ tagAutoClose __/:\\
		function tagAutoClose ( tagName, attribut ){ return OpenTAG + tagName + " " + attribut + AutoClosedTAG }
		//:\____ tagOpenClose __/:\\
		function tagOpenClose ( tagName, attribut, aData ){ return  OpenTAG + tagName + " " + attribut + CloseTAG + aData +  OpenCloseTAG + tagName + CloseTAG}

		//__:encode function call __/
		//:\____ hTitle __/:\\
		function hTitle ( embInst, aData1, aData2 ){
			return tagOpenClose( embInst.actual[miPARAM]+embInst.startDecode[diNAME]
				, encodeAttribut( embInst.startDecode[diPROPERTY]=="\"=" ? {style:{"text-align":"center"}} :"", embInst )
				, modeBR(aData1, embInst.actual) ) 
				+ aData2
			}
		function hrLine ( embInst, aData1 ){
			return tagOpen( embInst.actual[miPARAM]
				, encodeAttribut( {style:{height: ( parseInt(embInst.startDecode[diNAME] || 0) + 2 ) +"px", "background-color":"black", "border": "0px" }}, embInst ) )
				+ aData1
			}
		function paragraphe ( embInst, aData1, aData2 ){
			//__:TODO: accepter \t en premier caractère pour indentation première ligne
			return tagOpenClose( embInst.actual[miPARAM], "", modeBR(aData1, embInst.actual) ) + aData2
			}
		function br ( embInst, aData1 ){
			var rep =  tagOpen( embInst.actual[miPARAM], "")
			if ( embInst.startDecode[diTARGET] == '"==' ) rep += rep
			if ( embInst.startDecode[diTARGET] == '"===' ) rep += rep + rep
			return rep + aData1
			}
		//:\____ commentHtml __/:\\
		function commentHtml ( embInst, aData1, aData2 ){
			return "<!-- " + aData1 + " -->" + aData2
			}
		function inlineBlock ( embInst, aData1, aData2 ){
			return tagOpenClose( embInst.actual[miPARAM]
				, encodeAttribut( embInst.actual[miOPTION]? {style:{display:"inline-block"}} : "", embInst )
				, aData1 )
				+ aData2
			}
		function block ( embInst, aData1, aData2 ){
			return tagOpenClose( embInst.actual[miPARAM], embInst.actual[miOPTION]?" style='display:block'":"" , aData1 ) + aData2
			}
		function center ( embInst, aData1, aData2 ){
			return tagOpenClose( embInst.actual[miPARAM], embInst.actual[miOPTION]?" style='text-align:center;display:inline-block' ":" style='text-align:center' " , aData1 ) + aData2
			}
		function charCode ( embInst, aData1, aData2 ){ // TODO: à simplifier entrer directement en Unicode car aData est Unicode
			aData2 = aData2 || ""
			var code = embInst.startDecode[diNAME]
			if (embInst.actual[miPARAM]) return "&#x" + embInst.actual[miPARAM] + ";" + aData1 + aData2
			if ( /\d+|x[A-Fa-f\d]+/.exec(code) ) code = "#" + code
			return "&" + code + ";" + aData1 + aData2
			}
		function richText ( embInst, aData1, aData2 ){
			var tagName, styleDisplay = embInst.actual[miOPTION]? {style:{display:"block"}} : {style:{}}
			switch (embInst.startDecode[diNAME]){
				case "x": tagName = "span"; break;
//				case "b": tagName = "b"; break;
//				case "u": tagName = "u"; break;
//				case "i": tagName = "i"; break;
				case "s": tagName = "strong"; break;
				case "m": tagName = "mark"; break;
				case "e": tagName = "em"; break;
				case "d": tagName = "dfn"; break;
				case "a": tagName = "abbr"; break;
				case "l": tagName = "a"; break;
				case "v:": styleDisplay.attribut.open = ""
				case "v": tagName = "details"; embInst.actual[miOPTION]? "": styleDisplay.style.display = "inline-block"; break;
				case "c": tagName = "code"; embInst.actual[miOPTION]? (styleDisplay.style.display = "block" ,  styleDisplay.style["white-space"] ="pre"):""; break;
				case "r": tagName = "cite"; break;
				case "q": tagName = embInst.actual[miOPTION]?"blockquote":"q"; break;
				default : tagName = embInst.startDecode[diNAME]; break;
				}
			return tagOpenClose( tagName
				, encodeAttribut( styleDisplay, embInst )
				, aData1 )
				+ aData2
			}
		function unbreakable ( embInst, aData1, aData2 ){
			return tagOpenClose( "span", 'style="overflow: visible; white-space: nowrap;"' , aData1 ) + aData2
			}
		function code ( embInst, aData1, aData2 ){ // code avec coloration syntaxique
			var style = (embInst.actual[miOPTION]?" style='display:block; white-space:pre;'":"")
			if (embInst.startDecode[diPROPERTY][0] == '"') style = " style='display:inline-block; white-space:pre;'"
			return tagOpenClose( embInst.actual[miPARAM], style , aData1 ) + aData2
			}

	//__ liste __/
		//:\____ listHtml __/:\\
		function listHtml ( embInst, aData, coreUnstack ){ //__:traite début et éléments de liste __/...
			const matchListDb = listHtmlDb() //__:table indexée __/...
			const miTYPE = 1,  SEQUENCE = 2, STYLE = 3
			listHtml = function listHtml( embInst, aData, coreUnstack ) {			
				var cptElement = -1, size = "", flgMatch = 0
				var embInstStartName = embInst.startDecode[diNAME]
				var matchList = matchListDb[embInstStartName] || matchListDb[/[^\d:,]*/.exec(embInstStartName)] 
//				var matchList =  matchListDb[embInstStartName.substring(0,2)] || matchListDb[embInstStartName[0]]
				if (!matchList) { flgMatch = 1; matchList = matchListDb[embInst.startDecode[diALL][1]] }	
				if (!matchList) return  embInst.actual[miPARAM]//__:un nombre positif non nul pour motifEnd indique élément de liste autre que fin ou début __/...
//				if (!matchList) return  /\**,?/.exec( embInst.startDecode[diTARGET] + embInstStartName )[0].length || "" //__:un nombre positif non nul pour motifEnd indique élément de liste autre que fin ou début __/...
				//__:début d'une liste, le nombre de * en début de motif indique la méthode d'entrée (embInst.actual[miTARGET]) __/...
				if ( matchList[0] == "&" || matchList[0] == "&&" ) size = flgMatch //__:gestion size ou autoSize
					? embInstStartName
					: embInstStartName.substring(matchList[0].length)
				var tagSequence = typeof(tagSequence = matchList[SEQUENCE])[matchList[SEQUENCE].length-1] == "string"
					? tagSequence : tagSequence[0]
				var sequenceLength = tagSequence.length - 1
				var tagOption = tagSequence[0]
				var startSequence = embInst.actual[miPARAM] //__:initialisation selon méthode d'entrée dans la liste __/... 
//					var startSequence = /\**/.exec(embInst.actual[miTARGET])[0].length //__:initialisation selon méthode d'entrée dans la liste __/... 
				coreUnstack = patchUnstack(startSequence)
				var nextSeqInst
				return listUnstack ( sequenceLength ) 
				
				//:\____ listUnstack __/:\\__:appelé à chaque niveaux de liste __/...
				function listUnstack ( levelSeq ){ //__:itération, dépile decodeStack (deuxième passage, parser haut-bas) et traitement jusqu'a fin de liste __/...
					var repAll = ""
					var actualOptTag = tagOption[levelSeq]
					var arrayTag, actualTag = arrayTag = tagSequence[levelSeq]
					var caseTag
					if (typeof actualTag != "string") {
						caseTag = /\**(#)/.exec(nextSeqInst[0][diTARGET])[1] == "#" ? 1 : 0
						actualTag = arrayTag[caseTag]
						actualOptTag = actualOptTag[caseTag]
						} 
					var firsLevel = (levelSeq == tagSequence.length - 1) 
					stayHere: do  {
						cptElement++
						if ( ! firsLevel ){
						repAll += actualOptTag & WVLMt+TRSt 
							? tagOpen ( actualTag, attribut() ) + 
								( actualOptTag & VLMt+TRSt ? "" : nextSeqInst[1] )
							: tagOpenClose ( actualTag, attribut(), actualOptTag & TRSt?"":nextSeqInst[1] )
							} 
						if ( actualOptTag & TRSt ) {
							nextSeqInst[0][diALL] = levelSeq - 1  
							repAll +=  listUnstack ( levelSeq - 1 )
							break stayHere }
						if ( nextSeqInst[0][diALL] < 0 || !(nextSeqInst = coreUnstack()) ) break stayHere
						do {
							if (caseTag) {
								actualTag = arrayTag[/\**(#?)/.exec(nextSeqInst[0][diTARGET])[1] == "#" ? 1 : 0]
								} 
							var actualSequence = nextSeqInst[0][diALL]
							var actualData = nextSeqInst[1]
							var actualLevel = actualSequence ? Math.abs(actualSequence) : sequenceLength 
							if ( actualSequence == undefined ) { break stayHere }
//							if ( actualSequence == 0 ) { repAll += actualData; nextSeqInst = coreUnstack();	continue }
							if ( actualLevel == levelSeq ) {
								if ( nextSeqInst[0][diNAME] == ',' ) {
									repAll += nextSeqInst[1]
									nextSeqInst = coreUnstack()
									}	 
								else {


								actualOptTag & WVLMt 
								? repAll += tagClose ( actualTag) 
								: "" ;
								}
								continue stayHere }
							if ( actualLevel < levelSeq ){
								repAll +=  listUnstack( actualLevel );
								if ( nextSeqInst[0][diALL] < 0 && -nextSeqInst[0][diALL] < levelSeq ) break stayHere
								if ( nextSeqInst[0][diNAME] == ',' && nextSeqInst[0][diALL] == levelSeq  ) {
									repAll += nextSeqInst[1]
									nextSeqInst = coreUnstack()
									}	 
								}
							else break stayHere
							} while ( nextSeqInst[0][diALL] <= sequenceLength );	
					
						} while ( typeof nextSeqInst[0][diALL] == "number" ) //__:fin stayHere __/...
//						} while ( nextSeqInst ) //__:fin stayHere __/...
					if (firsLevel){
						if ( size ){ //__:gestion size et autoSize
							size = 'size="'+ ( size == ":" ? cptElement : size ) + '"'
							}
							return tagOpenClose ( actualTag, attribut() + size , repAll ) 
							+ (typeof nextSeqInst[0][diALL] != "string" ? "": nextSeqInst[1])
						}	
					return   repAll + ( actualOptTag & WVLMt ? tagClose ( actualTag ) : "" )
					
					function attribut ( ) {
						var aData = actualOptTag & VLMt ? nextSeqInst[1]:""
						var attribut = {}
						attribut.style = {}
						var attrib = [,"value","label", "multiple"][(actualOptTag & VLMt)/4] 
						if (attrib) attribut[attrib] = (actualOptTag & VLMt)/4 == 3 ? "" : aData 
						if ( actualOptTag & SCRt ){//__:colgroup/col, td, th __/...
							var decodeAttr = nextSeqInst[0][diNAME] || nextSeqInst[0][diCMD] 
							if (decodeAttr) {
								var tmpAttr
								decodeAttr = /\w*,?([rc]?g?)(\d*):?(\d*)?/.exec( decodeAttr )
								if ( tmpAttr = {c:"col",cg:"colgroup",r:"row",rg:"rowgroup"}[decodeAttr[1]] ) attribut.scope = tmpAttr
								if ( tmpAttr = decodeAttr[2] ) attribut[actualOptTag & SCRt == SPNt ? "span" : "colspan"] = tmpAttr
								if ( tmpAttr = decodeAttr[3] ) attribut.rowspan = tmpAttr
								}
							}
						var matchStyle =  matchList[STYLE]
						if ( matchStyle ){
							if (typeof matchStyle == "string") { attribut.style["list-style-type"] = matchStyle }
							else { 
								attribut.style["list-style-type"] = matchStyle[0]
								var mStyle
								for ( var style in  mStyle = matchStyle[1] ){
									attribut.style[style] = mStyle[style]
									}
								}
							}
						if ( firsLevel && ( size || embInst.startDecode[diPROPERTY] == "=" ) ){
							attribut.style.overflow = "auto" 
							if ( embInst.startDecode[diPROPERTY] == "=" ) attribut.style.display = "block"
							}
						if ( firsLevel && actualTag == "ol" ) {
							var start = /--?[\d]*/.exec(embInstStartName)+""
							if (start) attribut.start = start.substring(1) 
							}	
						return encodeAttribut( attribut, firsLevel ? embInst : {startDecode:nextSeqInst[0]} ) 
						}
					}
				//:\____ startUnstack __/:\\ 
				function patchUnstack ( startSequence ){ //__:patch coreUnstack pour initialiser listUnstack __/...
					var itarget = embInst.startDecode[diTARGET] 
					var icmd = embInst.startDecode[diCMD]
					var iname = embInst.startDecode[diNAME]
					var tableUnstack = [[ [startSequence,itarget,iname,icmd], aData ]], callUnstack = coreUnstack, rep
					for (var i = startSequence; i++ < sequenceLength ; ) { if ( !(tagOption[i-1] & JMPt) ) tableUnstack.push( [ [i,itarget,iname,icmd] ,""] ) }
					embInst.startDecode[diALL] = startSequence
					;(nextSeqInst = tableUnstack.pop ())[0] = embInst.startDecode 
					return function patchUnstack () {
						if (rep = tableUnstack.pop()) return rep 
						coreUnstack = callUnstack
						return coreUnstack()
						}
					}
				}

			//:\____ listHtmlDb __/:\\
			function listHtmlDb (){
				const UN = 1, UNBIS = 2, DEUX = 3, GPH = 4, MIX = 5 
				const DFt = 0 /*Default*/, NCt = 1 /*NotClosed*/, ACt = 2 /*AutoClosed*/, OSt = 3 /*OpenSlash*/
					, VALt = 4 /*Value*/, LABt = 8 /*Label*/, MULt = 12 /*multiple*/
					, WRPt = 16 /*Wrap*/
					, JMPt = 32 /*Jump*/, STRt = 64 /*start*/, TRSt = 128 /*transparent*/
					, SPNt = 256 /*span*/, CRSt = 512 /*col/row span*/, SCRt = 768 /*scope cpl/row span*/  
					, VLMt = VALt+LABt, WVLMt = WRPt+VLMt, WSTt = WRPt+STRt 
				const UL = [[,WRPt,WSTt],"li","ul"]
					, OL = [[,WRPt,WSTt],"li","ol"]
					, DETAILS = [[[,,"summary"],WRPt,WSTt],"details","div"] //__:attribut open
					, MAP = [,"area","map"]
					, DATALIST = [[,VALt+NCt,WSTt],"option","datalist"]
					, SELECT = [[,WRPt+JMPt,LABt,WSTt],"option","optgroup","select"]
					, MSELECT = [[,WRPt+JMPt,LABt,WSTt+MULt],"option","optgroup","select"]
					, DL = [[,DFt,DFt,WSTt],"dd","dt","dl"]
					, TABLE = [[[,"caption"],[CRSt,SCRt],WRPt+TRSt,WSTt],["td","th"],"tr","table"]
					, TABLE2 = [[[,"caption"],SPNt,WRPt+SPNt,WSTt],"col","colgroup","table"]
				return [
//   _______ _______ _______ _______________________ ___________ ___________ ___________ ________________________________________________
//  |type	|type	|Sequence		|type ou
//  |	 	|list	|				|[type,{style}]	|			|			|			|
//_ 1 niveaux ______________________________\\
	 ["s"	,UN		,UL				,"square"]
	,["c"	,UN		,UL				,"circle"]
	,["d"	,UN		,UL				,"disc"]
	,["t"	,UN		,UL				,"triangle"]
	,[":"	,UN		,UL				,] // défaut ou CSS
	,["n"	,UN		,UL				,["none",{"padding-left":"0px", "padding-right":"0px", "margin-left":"0px", "margin-right":"0px"}]]
	,["h"	,UN		,UL				,["none",{"padding-left":"0.25em", "padding-right":"0.25em", "display": "inline-block", "text-align":"center"}] ] // liste horizontale 
	,["x"	,UN		,OL				,] // défaut ou CSS
	,["g"	,UN		,OL				,"grec"]
	,["1"	,UN		,OL				,"decimal"]
	,["0"	,UN		,OL				,"decimal-leading-zero"]
	,["i"	,UN		,OL				,"lower-roman"]
	,["I"	,UN		,OL				,"upper-roman"]
	,["a"	,UN		,OL				,"lower-alpha"]
	,["A"	,UN		,OL				,"upper-alpha"]
	,["o"	,UN		,DATALIST		,] // datalist option
//	,["l"	,UN		,LINKLIST		,] // link list
	,["v"	,UN		,DETAILS		,] // multi details summary in div
//_ 1-2 niveaux ____________________________\\
	,["&"	,UNBIS	,SELECT			,]
	,["&&"	,UNBIS	,MSELECT		,] // multiple
//_ 2 niveaux ______________________________\\
	,["::"	,DEUX	,DL				,] // liste de définition
//_ multi list ______________________________\\
	,["rowcol",		,TABLE			,] // table simple
	,["table",		,TABLE2			,] // table tbody
//	,["stable",		,TABLE3			,] // spreadsheet table
//	,["ctable",		,CTABLE			,] // calculator table
//	,["vtable",		,VTABLE			,] // table virtuel en code
//_ graphe _________________________________\\
					].reduce( function(m,c,i,a){
						m[c[0]] = c
						return m
						} , {} )
				}
			}
			
		//:\____ endListHtml __/:\\
		function endListHtml ( embInst ){ // élément de fin de liste
			return embInst.actual[miPARAM] //__:un nombre négatif pour motifEnd indique fin de liste
			}

	//______:médiat __/...
		//:\____ mediateDb __/:\\
		function mediateDb (){
			var UN = 1, UNBIS = 2, DEUX = 3, GPH = 4 
			var MAP = ["map","area"]
			return [
//   _______ _______ _______ _______________________ ___________ ___________ ___________ ________________________________________________
//  |type	|type	|Sequence						|
//  |	 	|list	|								|		|type	|			|			|			|
//_ 1 niveaux ______________________________\\
	,["map"	,UN		,MAP							,]  
//_ 1-2 niveaux ____________________________\\
//_ 2 niveaux ______________________________\\
//_ graphe _________________________________\\
	
				] 
			}
	
		function mediateElm ( embInst, aData ){ // élément de médiat

			return {start:"<"+embInst.startDecode[diNAME] + " >", end:"</"+embInst.startDecode[diNAME]+">"}
			}
		function mediaListElm ( embInst, aData ){ // élément de médiat

			return {start:"<"+embInst.startDecode[diNAME] + " >", end:"</"+embInst.startDecode[diNAME]+">"}
			}

	//__:action et areas gestion __/
		//:\____ encodeAttribut __/:\\
		function encodeAttribut ( attributs, embInst ){
			attributs = attributs || {}
			attributs.class = attributs.class || []
			attributs.style = attributs.style || {}
			try { decodeAttribut(embInst.endDecode[diSmartAREA]) } catch (e){}
//			try { decodeAttribut(embInst.endDecode[diFreeAREA]) } catch (e){}
			try { decodeAttribut(embInst.startDecode[diSmartAREA]) } catch (e){}
//			try { decodeAttribut(embInst.startDecode[diFreeAREA]) } catch (e){}
//			try { decodeAction(embInst.startDecode[diCMD]) } catch (e){}
			var tmpStyles = []
			for ( var style in attributs.style) { tmpStyles.push( style + ":" +  attributs.style[ style ] ) } 
			attributs.style = tmpStyles.join( "; " )
			attributs.class = attributs.class.join(' ')
			var tmpAttributs = []
			for ( var attribut in attributs) { tmpAttributs.push ( attribut + '="' +  attributs[ attribut ] + '"' ) } 
			return tmpAttributs.join( ' ' )

			function decodeAction ( data ){
				var decodeCmd, regExpDecode = /([#\.@=]?)([\w\-\d\.]+)/g  
				while( decodeCmd = regExpDecode.exec( data )) {
					if ( decodeCmd[1] ){ //__:enchaînement d'actions troisième groupe __/...
						switch ( decodeCmd[1] ){
							case "#"  : attributs["id"] = decodeCmd[2]; break;
							case "@"  : attributs["name"] = decodeCmd[2]; break;
							case "."  : attributs.class.push(decodeCmd[2]); break; //TODO: gérer template 
							case "="  : (typeof decodeCmd[2] == "number"//TODO: gérer attribut booléens pas de true ni false 
								? attributs["tabindex"] = decodeCmd[2]
								: attributs[decodeCmd[2]] = 'true'); break;  
							case "^"  : attributs[decodeCmd[2]] = 'false'; break;
							}	
						}
					}	
				}
			function decodeAttribut( data ){
				var decodeCmd, regExpDecode = /([\.](?=\w)|[#@=^/"'(]?[/"'^#<>=*]?)*([,%\w\-\d\.]+)([/'"^:=]*)(\s|[,%\w\-\d\.]+)\s*/g  
				while( decodeCmd = regExpDecode.exec( data )) {
					if ( decodeCmd[4].length == 1 ){ //__:une action  
						if ( decodeCmd[2] ){ //__:hors premier groupe
							if ( decodeCmd[1] ){
								switch ( decodeCmd[1] ){
									//__:troisième groupe __/...
									case "#"  : attributs["id"] = decodeCmd[2]; break;
									case "@"  : attributs["name"] = decodeCmd[2]; break;
									case "."  : attributs.class.push(decodeCmd[2]); break; //TODO: gérer template  //TODO: wait next for data 
									case "="  : (typeof decodeCmd[2] == "number" 
										? attributs["tabindex"] = decodeCmd[2]
										: attributs[decodeCmd[2]] = 'true'); break;  
									case "^"  : attributs[decodeCmd[2]] = 'false'; break;
									//__:deuxième groupe style2 __/... 
									case "'"  : attributs.style.height = decodeCmd[2]; break; 
									case "''" : attributs.style.border =  '.5em  solid ' + color(decodeCmd[2]); break; 
									case '""' : attributs.style["font-family"] = decodeCmd[2]; break; //TODO: wait next for data 
									case '"'  : attributs.style["background-color"] = color(decodeCmd[2]); break; 
									case '"^' : attributs.style["background-image"] = decodeCmd[2]; break; //TODO: wait next for data
									//__:hyperlien __/...
									case '^#' : attributs.href = "#" + decodeCmd[2]; break; 
									case '^>' : attributs.download = decodeCmd[2]; link( decodeCmd ); break; 
									case '^=' : attributs.target = '_blank'; link( decodeCmd ); break; 
									case '^<' : attributs.target = '_parent'; link( decodeCmd ); break;
									case '^*' : attributs.target = '_top'; link( decodeCmd ); break;
//									case '^.'  : attributs.target = '_self'; link( decodeCmd ); break;
									//__:source __/...
									case '^"' : attributs.src = decodeCmd[2] ; link( decodeCmd ); break; //TODO: wait next for data
									}
								}
							else { 
								switch ( decodeCmd[3] ){
									//__:deuxième groupe style1 __/... 
									case "'"  : attributs.style.width = decodeCmd[2]; break; 
									case "''" : attributs.style.border = decodeCmd[2] + ' solid'; break; 
									case '""' : attributs.style["font-size"] = decodeCmd[2]; break; 
									case '"' : attributs.style.color = color(decodeCmd[2]); break; 
									case '"^' : attributs.style["border-radius"] = decodeCmd[2]; break;
									}
								}
							}
						else { //__:premier groupe 
							switch ( decodeCmd[3] ){
								case ":" : attributs.style[decodeCmd[2]] = decodeCmd[2]; break; 
								case '=' : attributs[decodeCmd[2]] = decodeCmd[2]; break; 
								}
							}
						}
					else if ( decodeCmd[3] ) { //__:deux action deuxième groupe style1 et style2 et enchaînement d'actions troisième groupe __/...
						switch ( decodeCmd[3] ){
							case "'"  : attributs.style.width = decodeCmd[2]; attributs.style.height = decodeCmd[4]; break; 
							case "''" : attributs.style.border = decodeCmd[2] + ' solid ' + color(decodeCmd[4]); break; 
							case '""' : attributs.style["font-size"] = decodeCmd[2]; attributs.style["font-family"] = decodeCmd[4]; break; //TODO: wait next for data 
							case '"' : attributs.style.color = color(decodeCmd[2]); attributs.style["background-color"] = color(decodeCmd[4]); break; 
							case '"^' : attributs.style["border-radius"] = decodeCmd[2]; attributs.style["background-image"] = decodeCmd[4]; break; //TODO: wait next for data
							}
						}
					}
				function color( color ){//__:transparent et currentColor possible (couleur de color actuelle). Mélange % et nombre impossible sauf pour alpha __/... TODO:opacity
					var colorDecode = color.split(",") 
					if (colorDecode.length == 1){ 
						var tmpColor = /[a-fA-F0-9]*/.exec(colorDecode[0]) 
						tmpColor[0].length == colorDecode[0].length ? color = "#" + color : color = colorDecode[0] 
						}
					else {
						color = (colorDecode.length == 3 ? "rgb(" : "rgba(")  + colorDecode.join(",") + ")"
						}
					return color 
					}
				function fullColor( color ){ //TODO: ajouter linear-gradient(#f69d3c, #3f87a6), conic-gradient(#f69d3c, #3f87a6), radial-gradient(#f69d3c, #3f87a6) et leur repeating- .... 
					//__: -5px pour taille et ; pour séparateur de couleurs
					//_: pour repeating => %, linear => -, radial => , conic => 
					var colorDecode = color.split(",") 
					if (colorDecode.length == 1){ 
						var tmpColor = /[a-fA-F0-9]*/.exec(colorDecode[0]) 
						tmpColor[0].length == colorDecode[0].length ? color = "#" + color : color = colorDecode[0] 
						}
					else {
						color = (colorDecode.length == 3 ? "rgb(" : "rgba(")  + colorDecode.join(",") + ")"
						}
					return color 
					}
				function url( url ){
					return "url('" + url + "')"
					}
				function link(){

					}
				function waitForNext(){

					}
				}
			}

	//__:texte html conversion __/
		//:\____ toHtmlText __/:\\
		function toHtmlText ( data ){
			var rep = data.replace(/[<>&]/g,(find, index, data)=>{
				switch (find){
					case "<": return "&lt;"
					case ">": return "&gt;"
					case "&": return "&amp;"
					}
				} ) 
			return rep
			}
		function modeBR ( data, actualEmbInst ){
			if (actualEmbInst[miOPTION] == EBR) return data.replace(/\r?\n/g,"<br />") // ? mode enterBr
			return data
			}

		} // end embInstMotifDb \\









	   //CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC\\		
	  //______:Commun pointMarkup interpréteur. Data bases motifs et traitement __\\
	 //____________________________________________________________________________\\
	//*\____ commonMotifDb __/*\\
	function commonMotifDb ( allMotif ){ // motif Db commun \\
		//__:typeInst pointMarkup__/...
		const BLKi = 0 /*blockInst*/, NDTi = 1 /*noDataInst*/
			, SGLi = 2 /*singleLineInst*/, MLTi = 3 /*multiLineInst*/
			, CLSi = 4 /*closeInst*/, CLSAi = 5 /*closeAlternateInst*/, WCLSi = 6 /*waitCloseInst*///__:non fermé par une SEQi 
			, SEQi = 8 /*sequencedInst*/, SEQENDi = 9 /*endSeqInst*/
		const CBO = 1 /*closed by other*/, NOAME = 2 /*notAutoMotifEnd*/
		const HTMLTI = 1 /*html Texte formated*/, TTAB = 2 /*trim tabulation*/
		return [
//   _______________ _______ _______ _______________ _______________________ ___________ _____________________________________
//	| data decoder												||	data interpreter function
//  |_______________ _______ _______ _______________ ___________||__________ ___________ _____________________________________
//  |motifInst		|closed	|instruc|close option	|interpreter||param		|option		|
//  |target property|by		|tion	|				|function	||			|			|
//  |		|		|other	|type	|				|call		||			|			|
	,{ name:"pointMarkupCommon", type:"pmc", href:"" }
	,{ Comment:"Comment" }
	,[["/"	,":"	],CBO	,SGLi	,				,comment	,			,] // de mot, de ligne \n  
	,[["//"	,":"	],CBO	,CLSAi	,				,comment	,			,] // de bloc
	,[["/"	,		],CBO	,SGLi	,				,comment	,			,] // de mot, de ligne \n  
	,[["//"	,		],CBO	,CLSAi	,				,comment	,			,] // de bloc


		]

		//__:encode function call __/...
		//:\____ comment __/:\\
		function comment ( embInst, aData, aDataAfterEnd, unstack ){
			//__:TODO: gérer l'espace de nom comment
			if ( embInst.actual[miTYPE] == CLSAi &&  embInst.endDecode[diEndALT] == ":" ) {
				var unStackRep = unstack()
				return aDataAfterEnd + unStackRep[1]
				}
			return aDataAfterEnd
//			return aData + aDataAfterEnd
			}

		} // end commonMotifDb \\


	   //CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC\\	
	  //______:pointMarkup mini highlighting _____________________\\
	 //____________________________________________________________\\
	//*\____ miniHighlighting __/*\\
	function miniHighlighting ( tableMarkerSplit ){ // miniHighlighting
		var nData
//		var firstData = tableMarkerSplit.pop() // retire texte avant premier ! pour rescom
		// Stack aData output
		var decodeStack = [], motifTopEnd,  dataEndStack = [], waitOutData ="", output = [] 
		while ( (nData = tableMarkerSplit.pop()) !== undefined ){
			decode()
			}
		return waitOutData
//		return output[0]
		function decode ( ){		
			if ( nData[0] == "`" ) { nData = nData.substring(1); notMatch(); return } //__:escape instruction
			var embInstDecode =  decodeRegExp.exec(nData)
			var indexMotifDb = embInstDecode[diTARGET] + embInstDecode[diPROPERTY] + embInstDecode[diTARGET].length
			var actualEmbInst = motifDb[indexMotifDb]
			var findData = nData.substring(embInstDecode[diALL].length) //TODO: pb diALL avec séquence
			if (actualEmbInst || embInstDecode[diEND] ) { // match
				if ( embInstDecode[diEND] ) indexMotifDb = ""
				switch (indexMotifDb){
					case "/:1": //__:TODO: pb commentaires avec des instructions
					case "/1"   : { 
						findData =  /([^\r\n]+)\r?\n([\s\S]*)/.exec(nData,"s") || [,nData,""]
						waitOutData =  (findData[0] ? "\n" : "") + findData[2] + waitOutData
						findData = findData[1].substring(embInstDecode[diALL].length)
						}
					case "//:2":
					case "//2"  : waitOutData =
						"<span class='known_MHL'>!" 
						+ embInstDecode[diALL] 
						+ "</span>" 
						+ "<span class='codeCmt_MHL'>" 
						+ findData 
						+ "</span>" 
						+ waitOutData; break 
					default : waitOutData = 
						"<span class='known_MHL'>!" 
						+ embInstDecode[diALL] 
						+ "</span>" 
						+ toHtmlText(nData.substring(embInstDecode[diALL].length)) 
						+ waitOutData
					}
				return
				}
			else notMatch()
			}
		function notMatch (){ // fausse embInst
			var nextMarkerSplit
			if (nextMarkerSplit = tableMarkerSplit[tableMarkerSplit.length-1]) tableMarkerSplit[tableMarkerSplit.length-1] += "!" + nData 
			else waitOutData = nData + waitOutData
			}
							
		//__:texte html conversion __/
			//:\____ toHtmlText __/:\\
			function toHtmlText ( data ){
				var rep = data.replace(/[<>&]/g,(find, index, data)=>{
					switch (find){
						case "<": return "&lt;"
						case ">": return "&gt;"
						case "&": return "&amp;"
						}
					} ) 
				return rep
				}
		} // end miniHighlighting \\

	return markPointPage (mpp, mppAccess, option)

	} // end closure markPointPage \\


