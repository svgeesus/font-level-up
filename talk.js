var slideshow = new SlideShow();

/*StyleFix.register(function(css, raw) {
	if (PrefixFree.Prefix + 'Filter' in document.body.style) {
		css = css.replace(/\bfilter:/ig, PrefixFree.prefix + 'filter:');
	}
	
	return css;
});*/

function insertText(element, text) {
	var textEvent = document.createEvent('TextEvent');

	textEvent.initTextEvent('textInput', true, true, null, text);

	element.dispatchEvent(textEvent);
}

$$(".tasty.slide").forEach(function(slide){
	slide.classList.add("dont-resize");
});

$$(".pie").forEach(function(slide){
	slide.classList.add("show-html");
});

$$('textarea').forEach(function(textarea) {
	if (textarea.parentNode.id != "conic-test") {
		textarea.setAttribute('data-raw', '');
	}

	new Incrementable(textarea);
	new CSSSnippet(textarea);

	textarea.addEventListener("keyup", function(evt){
		if (evt.keyCode == 13) { // Enter
			// Get indent
			var before = this.value.slice(0, this.selectionStart-1);
			var indents = before.match(/^\s*/mg);
			var indent = indents && indents[indents.length - 1];

			if (indent) {
				insertText(this, indent);
			}
		}
	});

	textarea.addEventListener("keydown", function(evt){
		if (evt.keyCode == 9) { // Tab
			insertText(this, "\t");
			evt.preventDefault();
		}
	})
});

$$('.show-html').forEach(function(element) {

	element.onmouseenter = function (evt) {
		if (!element.tooltip) {
			element.tooltip = document.createElement('pre');
			
			var code = document.createElement('code');
			var attrs = {};

			["class", "data-originalstyle", "data-originalcssText"].forEach(function(attr){
				attrs[attr] = element.getAttribute(attr);

				if (attr != "class") {
					element.removeAttribute(attr);
				}
			});

			element.classList.remove('show-html');
			element.classList.remove('subject');

			code.textContent = element.outerHTML || element.innerHTML;
			
			for (var attr in attrs) {
				var value = attrs[attr];

				if (value != null) {
					element.setAttribute(attr, value);
				}
			}
			
			element.tooltip.className = 'tooltip';
			code.className = 'language-markup';
			
			element.tooltip.appendChild(code);
			
			SlideShow.getSlide(element).appendChild(element.tooltip);
			
			Prism.highlightElement(code);
		}
		
		element.tooltip.style.top = evt.clientY - 10 + 'px';
		
		element.tooltip.classList.add('active');
		
		element.tooltip.style.left = Math.min(innerWidth - element.tooltip.offsetWidth - 10, evt.clientX) + 'px';
	};
	
	element.onmouseleave = function () {
		element.tooltip.classList.remove('active');
	}
});