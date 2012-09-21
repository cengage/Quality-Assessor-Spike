function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}
var requestedUserId = "null";

$(function() {

	$
			.ajax({
				type : 'GET',
				url : 'domains?key=0',
				success : function(data) {
					data = JSON.parse(data);
					// alert(data.length);
					for (i = 0; i < data.length; i++) {
						var table = "";
						table += "<table style='margin-top:15px;margin-left:20px;width:100%;' class='imagetable' id='tableId"
								+ i + "'>";
						table += "<tr pid='0' id="
								+ data[i].key
								+ "><td class='iconWidth'><img class='expandDomain' src='images/expand.png'/></td>" +
										"<td class='iconWidth'><img class='newDomain' src='images/new.png'/></td>" +
										"<td class='iconWidth'><img class='editDomain' src='images/edit.png'/></td>" +
										"<td class='iconWidth'><img class='deleteDomain' src='images/cross.png'/></td>" +
										"<td class='titleClass' class='addBorder' ><input   readonly='readonly' " +
										"class='addBorder autoCompleteWiki' type='text' value='"+ data[i].title +"'>" +
												"</td><td></td><td></td><td></td></tr>"
						$('#domainDivId').append(table);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
				},
				dataType : 'text'
			});

});

function showCompleteDomainTree(rootKey, table) {
	$
			.ajax({
				type : 'GET',
				url : 'domainHierarchy?key=' + rootKey + '&requestedUserId='
						+ requestedUserId,
				success : function(data) {
					var ul = "";
				
					data = JSON.parse(data);
					
					children = data.children;

					// Second Level
					if (children != null) {

						var arr = children;
						for (i = 0; i < arr.length; i++) {
							obj = arr[i];

							children = obj.children;

							// Third Level
							if (children != null) {

								// alert(ratingStarHtml);
								ul += "<tr pid='"+rootKey+"' id='"+obj.key+"' "
										+ "><td colspan='5' style='border-top:none;border-bottom:none;'></td><td class='iconWidth'><img class='newDomain' src='images/new.png'/></td><td class='iconWidth'><img class='editDomain' src='images/edit.png'/></td><td class='iconWidth'><img class='deleteDomain' src='images/cross.png'/></td><td style='border-bottom:none'><input   readonly='readonly' class='addBorder autoCompleteWiki' type='text' value='"
										+ obj.title
										+ "'></td><td><input readonly='readonly' class='inputWeightage addBorder' type='text' value="
										+ obj.weightage
										+ "></td><td></td><td score="
										+ obj.score + " id=p" + i + ">"
										+ "</td></tr>";
								// ul += "<tr></tr>";
								var arr1 = children;
								for (j = 0; j < arr1.length; j++) {
									obj1 = arr1[j];

									score = obj1.score;
									weightage = obj1.weightage;
									key = obj1.key;

									ul += "<tr pid='"+obj.key+"' id='"+obj1.key+"'><td colspan='11' style='border-top:none;border-bottom:none;'></td><td class='iconWidth'><img class='editDomain' src='images/edit.png'/></td><td class='iconWidth'><img class='deleteDomain' src='images/cross.png'/></td><td  i="
											+ i
											+ " j="
											+ j
											+ "><input  readonly='readonly' class='addBorder autoCompleteWiki' type='text' value='"
											+ obj1.title
											+ "'></td><td><input  readonly='readonly' class='addBorder inputWeightage' type='text' value="
											+ obj1.weightage + "></td></tr>";

								}
								// ul += "<tr></tr>";
							} else {

								ul += "<tr pid='"+rootKey+"' id='"+obj.key+"' childCount=0><td colspan='5' style='border-top:none;border-bottom:none;'></td><td class='iconWidth'><img class='newDomain' src='images/new.png'/></td><td class='iconWidth'><img class='editDomain' src='images/edit.png'/></td><td class='iconWidth'><img class='deleteDomain' src='images/cross.png'/></td><td><input  readonly='readonly' class='addBorder autoCompleteWiki' type='text' value='"
										+ obj.title
										+ "'></td><td><input  readonly='readonly' class='inputWeightage addBorder'  type='text' value="
										+ obj.weightage
										+ "></td><td></td><td assessmentId="
										+ obj.assessmentId
										+ " id="
										+ obj.key
										+ ">" + "</td></tr>";
							}

						}

					}
					// ul += '</table>'
					table.append(ul);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					// showErrorMessage(jqXHR.responseText, "450", "300");
				},
				dataType : 'text'
			});
}



$(function() {
	$('td').live(
			'click',
			function() {
				var colIndex = $(this).parent().children().index($(this));
				var rowIndex = $(this).parent().parent().children().index(
						$(this).parent());
				// alert('Row: ' + rowIndex + ', Column: ' + colIndex);
			});

	$(".editDomain").live('click', function() {
		var row = $(this).closest('tr');
		row.find('input').removeClass("addBorder");
		row.find('input').attr('readonly',false);
//		row.find('.titleClass').attr('contentEditable','true');
//		row.find('.titleClass').css('box-shadow','1px 1px 1px 0 lightgray inset');
//		row.find('.titleClass').css('border','1px solid gray');
		// $(this).closest('td img .deleteDomain').hide();
		$(this).attr("src", "images/save.png");
		$(this).parent().prev().children().hide();
		$(this).removeClass("editDomain");
		$(this).addClass("saveDomain");
//		$(this).parent().next().children().addClass("saveDomain");
//		$(this).parent().next().children().removeClass("deleteDomain");
	});

	$(".saveDomain").live('click', function() {
		
		
		
		var row = $(this).closest('tr');
		row.find('input').attr('readonly',true);
//		row.find('.titleClass').attr('contentEditable','false');
//		row.find('.titleClass').css('box-shadow','');
//		row.find('.titleClass').css('borderow.find('.titleClass').attr('contentEditable','false');
//		row.find('.titleClass').css('box-shadow','');
//		row.find('.titleClass').css('border','');r','');
		var key = row.attr("id");
		var parentKey = row.attr("pid");
		
		
		var table = $(this).closest('table');
//		var rows = table.find("tr[pid='"+parentKey+"']");
//		sum=0;
//		rows.each(function(index) {
//		    alert($(this).find('input::nth-child(2)').val());
//		    alert(sum);
//		});
		
		var titleTd = row.find('input::nth-child(1)');
		var title = titleTd.val();
		var weightageTd = row.find('input::nth-child(2)');
		var weightage = weightageTd.val();
		updateDomain(key,parentKey,title,weightage,row);
		row.find('input').addClass("addBorder");
		row.find('input').attr('readonly', 'readonly');
		$(this).attr("src", "images/edit.png");
		$(this).addClass("editDomain");
		$(this).parent().prev().children().show();
		$(this).removeClass("saveDomain");
	});

	$(".expandDomain").live('click', function() {
		key = $(this).closest('tr').attr("id");
		var table = $(this).closest('table');
		showCompleteDomainTree(key, table);
		$(this).attr("src", "images/collapse.png");
		$(this).removeClass("expandDomain");
		$(this).addClass("collapseDomain");
	});

	$(".collapseDomain").live('click', function() {
		var table = $(this).closest('table');
		table.find("tr:gt(0)").remove();
		$(this).attr("src", "images/expand.png");
		$(this).removeClass("collapseDomain");
		$(this).addClass("expandDomain");

	});

	$(".newDomain").live('click',function() {
			var row = $(this).closest('tr');
			var cell = $(this).closest('td');
			var ppid =row.attr("pid");
			var pid= row.attr("id");
			if(ppid=='0'){
				expandDomain =row.find('.expandDomain');
				if(expandDomain.length>0){
					var table = $(this).closest('table');
					showCompleteDomainTree(pid, table);
					expandDomain.attr("src", "images/collapse.png");
					expandDomain.removeClass("expandDomain");
					expandDomain.addClass("collapseDomain");
				}
			}
			
			var colspan = cell.prev().attr("colspan");
			if (colspan == 5) {
				var tr = "<tr id='0' pid='"+pid+"'><td colspan='11'><td><img class='saveDomain' src='images/save.png'></td><td  class='iconWidth'><img class='deleteDomain' src='images/cross.png'/></td><td><input class='autoCompleteWiki' type='text'></td><td><input class='inputWeightage' type='text'></td></tr>";
				row.after(tr);
				} else {
				var tr = "<tr id='0' pid='"+pid+"'><td colspan='5'><td  class='iconWidth'><img style='display:none'  class='newDomain' src='images/new.png'/></td><td><img class='saveDomain' src='images/save.png'></td><td  class='iconWidth'><img class='deleteDomain' src='images/cross.png'/></td><td><input class='autoCompleteWiki' type='text'></td><td><input class='inputWeightage' type='text'></td></tr>";
				row.after(tr);
				}
			});
	
	$(".deleteDomain").live('click', function() {
		var row = $(this).closest('tr');
		var key = row.attr("id");
		var parentKey = row.attr("pid");
		deleteDomain(key,parentKey);
		//row.remove();
		var table = $(this).closest('table');
		if(parentKey != '0'){
		//var tr = table.find('tr::nth-child(1)');
		//var key = tr.attr('id');
		
		row.remove();
		table.find("tr[pid='"+key+"']").remove();
		//showCompleteDomainTree(key, table);
		$(this).attr("src", "images/collapse.png");
		$(this).removeClass("expandDomain");
		$(this).addClass("collapseDomain");
		}
		else{
		table.remove();	
		}
	});
	
});


function showAddRootDomainView(){
	var table = "";
	table += "<table style='margin-top:15px;margin-left:20px;width:100%;' class='imagetable' id='tableId'>";
	table += "<tr id='0' pid='0'><td class='iconWidth'><img  class='expandDomain' src='images/expand.png'/></td><td class='iconWidth'><img style='display:none' class='newDomain' src='images/new.png'/></td><td class='iconWidth'><img class='saveDomain' src='images/save.png'/></td><td class='iconWidth'><img class='deleteDomain' src='images/cross.png'/></td><td style='border-bottom:none'><input class='autoCompleteWiki' size='30' type='text'></td><td></td><td></td><td></td></tr>"
	$('#domainDivId').prepend(table);
}



function updateDomain(key,parentKey,title,weightage,row) {
	if(weightage==undefined){
		weightage = '100';
	}
	data ='0';
	var data = {
			key : key,
			parentKey : parentKey,
			title : title,
			weightage : weightage
		};
	var url ='updateDomain';
	$.ajax({
		type : 'POST',
		url : url,
		data : data,
		success : function(data) {
			if(key == '0'){
				row.attr("id",data);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			// showErrorMessage(jqXHR.responseText, "450", "300");
		},
		dataType : 'text'
	});
	return data;
}

function deleteDomain(key,parentKey) {
	
	var data = {
			key : key,
			parentKey : parentKey,
		};
	var url ='deleteDomain';
	$.ajax({
		type : 'POST',
		url : url,
		data : data,
		success : function(data) {

		},
		error : function(jqXHR, textStatus, errorThrown) {
			// showErrorMessage(jqXHR.responseText, "450", "300");
		},
		dataType : 'text'
	});
}