$(function() {
	var show = localStorage["showURL"];
	var hover = localStorage["hoverURL"];
	var highlightWindow = localStorage["highlightWindow"];

	if (show == "true") {
		$("#showURL").attr("checked", "checked");
	}
	else {
		$("#hoverURL").attr("disabled", "disabled").next().addClass("disabled");
	}
	if (hover == "true") {
		$("#hoverURL").attr("checked", "checked");
	}
	if (highlightWindow == "true") {
		$("#highlightWindow").attr("checked", "checked");
	}
	$("#showURL").change(function() {
		var checked = $(this).is(":checked");
		toggleOption($("#hoverURL"), checked);
		localStorage["showURL"] = checked;
	});

	$("#hoverURL").change(function() {
		localStorage["hoverURL"] = $(this).is(":checked");
	});

	$("#highlightWindow").change(function() {
		localStorage["highlightWindow"] = $(this).is(":checked");
	})

});

function toggleOption(option, enabled) {
	if (enabled) {
		option.removeAttr("disabled").next().removeClass("disabled");
	}
	else {
		option.attr("disabled", "disabled").next().addClass("disabled");
	}
}