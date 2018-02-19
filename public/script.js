window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');   

    pad.addEventListener('keydown', function(e){
		if(e.keyCode === 9){
			var start = this.selectionStart;
			var end = this.selectionEnd;

			var target = e.target;
			var value = e.value;

			target.value = value.substring(0, start) + "\t" + value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
            e.preventDefault();
		}
    });

	var previousMarkdownValue;

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        previousMarkdownValue = markdownText
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var changeOccur = ()=>{
    	if(previousMarkdownValue != pad.value)return true;
    	return false;
    };

    setInterval(function(){
    	if(changeOccur())
    		convertTextAreaToMarkdown();
    }, 1000);


    pad.addEventListener('input', convertTextAreaToMarkdown);

    

    if(doc.location.pathname.length>1){
    	var documentName = document.location.pathname.substring(1);	
    	sharejs.open('document.location.pathname','text', (err,doc)=>{
	    	doc.attach_textarea(pad);
	    	convertTextAreaToMarkdown();
    	});
    }
    
    convertTextAreaToMarkdown();
    
};