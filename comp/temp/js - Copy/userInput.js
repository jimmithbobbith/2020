(function UserInput ()
	{
		document.onkeydown = function (e)
			{
				e = e || window.event;

				var evt = e.type
				while (evt.length < 10) evt += ' '
				console.log(evt +
					         ' keyCode=' + e.keyCode +
					         ' which=' + e.which +
					         ' charCode=' + e.charCode +
					         ' char=' + String.fromCharCode(e.keyCode || e.charCode) +
					         (e.shiftKey ? ' +shift' : '') +
					         (e.ctrlKey ? ' +ctrl' : '') +
					         (e.altKey ? ' +alt' : '') +
					         (e.metaKey ? ' +meta' : ''), 'key'
				)

				if (e.keyCode < 41 && e.keyCode > 36)
					{
						switch (e.keyCode)
						{

							case 37:

								$( "#arrowLeft" ).click ();
									
								//createUI.turnPageDir ( "leftDiv" );
								break;
							case 38:
								//document.getElementById ( 'upDiv' ).click ();
								//   createUI.turnPageDir ( "upDiv" );
								break;
							case 39:
								$( "#arrowRight" ).click ();



								//createUI.turnPageDir ( "rightDiv" );
								break;
							case 40:
							//	document.getElementById ( 'downDiv' ).click ();
								//////////      createUI.turnPageDir ( "downDiv" );
								break
						}
					}
			};
	})()