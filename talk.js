$$("pre input").forEach(function(input) {
    var adjustSize = function() {
        input.style.width = input.value.length + "ch";
    };

    input.addEventListener("input", adjustSize);
    adjustSize();
});

var topics = $("#topics ul");
if (topics) {
    $$("section > header.slide").forEach(function(slide) {
        var li = document.createElement("li");
        li.style.backgroundImage = slide.style.backgroundImage;
        li.textContent = $("h1", slide).textContent;
        topics.appendChild(li);
    });
}


$$(".question").forEach(function(q) {
    q.classList.add("delayed");
});

// Fake multicolor demo

$$(".multicolour-fake > *").forEach(function(p) {
    var div = p.parentNode;

    for (var i = 0; i < 9; i++) {
        div.appendChild(document.createTextNode("\n\t"));
        div.appendChild(p.cloneNode(true));
    }
});


// /**
//  * SLIDESHOW CREATION
//  */
//
//
// function insertText(element, text) {
//     var textEvent = document.createEvent('TextEvent');
//
//     textEvent.initTextEvent('textInput', true, true, null, text);
//
//     element.dispatchEvent(textEvent);
// }
//
// $$('textarea').forEach(function(textarea) {
//     if (textarea.parentNode.id != "conic-test") {
//         textarea.setAttribute('data-raw', '');
//     }
//
//     new Incrementable(textarea);
//     new CSSSnippet(textarea);
//
//     textarea.addEventListener("keyup", function(evt) {
//         if (evt.keyCode == 13) { // Enter
//             // Get indent
//             var before = this.value.slice(0, this.selectionStart - 1);
//             var indents = before.match(/^\s*/mg);
//             var indent = indents && indents[indents.length - 1];
//
//             if (indent) {
//                 insertText(this, indent);
//             }
//         }
//     });
//
//     textarea.addEventListener("keydown", function(evt) {
//         if (evt.keyCode == 9) { // Tab
//             insertText(this, "\t");
//             evt.preventDefault();
//         }
//     })
// });




$$('.show-html').forEach(function(element) {

    element.onmouseenter = function(evt) {
        if (!element.tooltip) {
            element.tooltip = document.createElement('pre');

            var code = document.createElement('code');
            var attrs = {};

            ["class", "data-originalstyle", "data-originalcssText"].forEach(function(attr) {
                attrs[attr] = element.getAttribute(attr);

                if (attr != "class") {
                    element.removeAttribute(attr);
                }
            });

            element.classList.remove('show-html');
            element.classList.remove('subject');

            if (!element.classList.length) {
                element.removeAttribute("class");
            }

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

            Inspire.getSlide(element).appendChild(element.tooltip);

            Prism.highlightElement(code);
        }

        element.tooltip.style.top = evt.clientY - 10 + 'px';

        element.tooltip.classList.add('active');

        element.tooltip.style.left = Math.min(innerWidth - element.tooltip.offsetWidth - 10, evt.clientX) + 'px';
    };

    element.onmouseleave = function() {
        element.tooltip.classList.remove('active');
    }
});

$.bind($("#weight-anim"), "slidechange", evt => {
    var slide = evt.target;

    requestAnimationFrame(function callee() {
        var weight = getComputedStyle($(".variable", slide)).fontWeight;
        weight = Math.round(weight);
        slide.style.setProperty("--font-weight", `"${weight}"`);

        if (location.hash === "#" + slide.id) {
            requestAnimationFrame(callee);
        }
    }, 50);
});

(async function() {
    await Inspire.loadPlugin("live-demo");
    
    Demo.fixers.css.push(css => {
        /** We want to copy out the values of the numeric descriptors from an @font-palette-values
        *   rule and create a set of css variable declarations derived from them. So
        *   @font-palette-values autumnal {
        *     font-family: Painter Kafeel;
        *     base-palette: 2;
    	*     color-0: black;
    	*     color-1: hsl(15, 75%, 34%);
    	*     color-2: hsl(15, 80%, 70%);
        *     }
        *    becomes
        *
        *    --color0: black;
    	*    --color1: hsl(15, 75%, 34%);
    	*    --color2: hsl(15, 80%, 70%);
        */
        css = css.replace("@font-palette-values autumnal", "#demo")
                  .replace(/\scolor-(\d+):/g, "\t--color$1:");

        return css;
    })
})();
