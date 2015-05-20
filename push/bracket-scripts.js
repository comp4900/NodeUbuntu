	function GenerateCss( numRacers, heatSize)
	{		
		// Number of Columns
		var $numCols = 0;
		// Size of margin (in px)
		var $margin = 0;


		var $numHeats = numRacers/(heatSize/2);
		var $borderWidth= 1;
		var $heightOfTableRow = 18;
		// Note that the number of rows may vary but the border is counted once
		var $heightOfFullTable = $heightOfTableRow * heatSize + $borderWidth;
		var $heightOfFirstColumn = ($numHeats/2) * $heightOfFullTable;
		
		// Loop to calculate the total number of columns
		for(var $i = $numHeats; $i>1; $i = $i/2)
		{
			$numCols++;
		}

		/*
		* If there are only 2 columns, the final column will actually be larger due to 
		* the additional Final/Consi table headers.
		*/
		if($numCols == 2){
			console
			$(".col-1 > .top-table").css("margin-top",  $heightOfTableRow);
		} 
		 /*
		 * With 3 columns there isn't enough space to properly align the tables.
		 * The alternative is force a "pyramid" structure.
		 */
		else if($numCols == 3){ 
			$margin = $heightOfFirstColumn/2
			$(".col-2 > table").css("margin-top", $margin/3);
			$(".col-2 > .top-table").css("margin-top", $margin/3);
			$(".col-3 > table").css("margin-top", 0);
			$(".col-3 > .top-table").css("margin-top", ($margin/2) - $heightOfTableRow);
		
		} else { //For all other table sizes
			for(var $x=2; $x < $numCols; $x++){ 
				$margin = (Math.pow(2,$x-1) - 1) * $heightOfFullTable
				$(".col-"+ $x +" > table").css("margin-top", $margin);
				$(".col-"+ $x +" > .top-table").css("margin-top", $margin/2);
			}
			// CSS for the final column, it is always the same based on the height of the first column
			$(".col-"+ $numCols + "> table").css("margin-top", 0);
			// The extra rows in the final column must be accounted for
			$(".col-"+ $numCols +" > .top-table").css("margin-top", ($heightOfFirstColumn/2)-
				($heightOfFullTable)-($heightOfTableRow));
		}
	}

	/*
	* Simple function used to iterate through a JSON array and append text into the specified divs
	*/
	function UpdateBrackets(updateArray){

		var JSONarray = JSON.parse(updateArray);

		jQuery.each(JSONarray, function(id, val) {
			$('#' + id).text(val);
		});
	}