


function LinkExtractor(options){
    var hunting     =   '',
        keylogInput =   null,
        acceptedURL =   null,
        typedContent=   null,
        extractid   =   {},
        allMatches  =   {};
    
        this.returnExtracted =  function(){
            this.extractMatches();
            return  this.extractid;
        };

        //Handle DOM Updates
        this.refreshInput =  (event) => {
            event.preventDefault();
            //textAREA
            switch(event.target.nodeName){
                case 'TEXTAREA':
                    this.typedContent = event.target.value;
                    break;

                case 'INPUT':
                    this.typedContent = event.target.value;
                    break;

                default : 
                    this.typedContent = event.target.innerHTML;
                    break;
            }
            this.extractMatches();
        };

        this.extractMatches = function(){
            var match = [];
            var preview = {};
            var typedContent = this.typedContent;
            if(typedContent.length <= 0 ){ return typedContent; }   

            var keys = Object.keys(this.acceptedURL);   
            keys.map((d)=>{
                var linksToo = "(<a.*href=\"|)"+ this.acceptedURL[d].linkRegex +"(\".*>.*<\/a>|)"
                var patt =new RegExp( linksToo, 'ig');
                while (result = patt.exec(typedContent)) {        
                    if(typeof result[2] != 'undefined'){ 
                        preview[result[2]] = result;
                        match.push(result);
                    }
                }
            });
            this.extractid = Object.keys(preview);  
            this.allMatches = preview;    
        };

    this.replaceContent = function(replace){
        //replace the input value 
        this.typedContent = this.typedContent.replace(content[0], replace); 
    };

    this.updateInput = function(){
        keylogInput.value = this.typedContent;
    };

    this.keylogInput =  document.getElementById(options.target.inputid);      
    this.keylogInput.addEventListener('keyup', this.refreshInput);
    this.acceptedURL = options.acceptedURL;
    this.typedContent = this.keylogInput.value;
    this.extractMatches();
}


//config object
var optionsINPUT = {
        target:{
            inputid:'keyloginput'           
        },
        acceptedURL:  {
            'gDocs' : {
                previewURL :   '%globals_asset_url:16779%',
                linkRegex  :   'https:\/\/docs\.google\.com\/document\/d\/([\\d\\w\\._-]+)(\/edit#|)',
            }
        }
}
//init
var typeINPUT =  new LinkExtractor(optionsINPUT);
console.log( "INPUT" );
console.log( typeINPUT.returnExtracted()  );


//config object
var optionsAREA = {
    target:{
        inputid:'keylogarea'            
    },
    acceptedURL:  {
        'gDocs' : {
            linkRegex  :   'https:\/\/docs\.google\.com\/document\/d\/([\\d\\w\\._-]+)(\/edit#|)',
        }
    }
}
//init
var typeAREA =  new LinkExtractor(optionsAREA);
console.log( "AREA" );
console.log( typeAREA.returnExtracted() );




//get the ids on click
var abuton = document.getElementById('getids');
abuton.addEventListener('click', function(e){
    e.preventDefault();
    //input
    console.log( "INPUT" );
    console.log( typeINPUT.returnExtracted() );

    console.log( "AREA" );
    console.log( typeAREA.returnExtracted() );
})



 
