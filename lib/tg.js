var tg = function() {
	return {
		/* Adds class [c] to [node]. Returns [node] for chaining */
		addClass : function(node, c) {
			if (node != null && c != null && c.length > 0) {
				var nodeClass = node.getAttribute("class");
				if (nodeClass == null || nodeClass.length == 0)
					node.setAttribute("class", c);
					else {
						for (var clazz in nodeClass.split(/\s/g)) {
							if (clazz == c) return node;
						}
						node.setAttribute("class", nodeClass + " " + c);
					}
				}
				return node;
		},
		/* Removes class [c] from [node]. Returns [node] for chaining */
		removeClass : function(node, c) {
			if (node != null && c != null && c.length > 0) {
				var nodeClass = node.getAttribute("class");
				if (nodeClass != null && nodeClass.length != 0) {
					var result = "";
					for (var clazz in nodeClass.split(/\s/g)) {
						if (clazz != c)
							result += ((result.length > 0) ? " " : "") + clazz;
						}
						node.setAttribute("class", result);
					}
				}
				return node;
		}
	};
} ();