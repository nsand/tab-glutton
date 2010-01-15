var tg = function() {
	return {
		/* Adds class [c] to [node]. Returns [node] for chaining */
		addClass : function(node, c) {
			if (node != null && c != null && c.length > 0) {
				var nodeClass = node.getAttribute("class");
				if (nodeClass == null || nodeClass.length == 0)
					node.setAttribute("class", c);
					else {
						var classes = nodeClass.split(/\s/g);
						for (var i = 0; i < classes.length; i++) {
							if (classes[i] == c) return node;
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
					var classes = nodeClass.split(/\s/g);
					for (var i = 0; i < classes.length; i++) {
						if (classes[i] != c)
							result += ((result.length > 0) ? " " : "") + classes[i];
					}
					node.setAttribute("class", result);
				}
			}
			return node;
		}
	};
} ();