	function GenerateCss( numRacers, heatSize, numHeats, numCols)
	{
		var $borderWidth= 1;
		var $heightOfTableRow = 18;
		var $heightOfFullTable = $heightOfTableRow * heatSize + $borderWidth;
		var $heightOfFirstColumn = (numHeats/2) * $heightOfFullTable;
		var $margin = 0;
		
		for(var $x=2; $x < numCols; $x++){ 
			$margin = (Math.pow(2,$x-1) - 1) * $heightOfFullTable
			$(".col-"+ $x +" > table").css("margin-top", $margin);
			$(".col-"+ $x +" > .top-table").css("margin-top", $margin/2);
		}

		$(".col-"+ numCols + "> table").css("margin-top", 0);
		$(".col-"+ numCols +" > .top-table").css("margin-top", ($heightOfFirstColumn/2)-($heightOfFullTable/2));	
	}

	function UpdateBrackets(updateArray){

		var JSONarray = JSON.parse(updateArray);

		jQuery.each(JSONarray, function(id, val) {
  			$('#' + id).text(val);
		});
	}