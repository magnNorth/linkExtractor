# LinkExtractor 

- basic link extraction function, designed to be customised
- Hunts for changes to input field, textarea, or Matrix div editor
- de-dupes links so only single versions of a regex match is returned. 
- native JS, no libs required


## use

*HTML*
requires an area that is targeted with an ID attr.
```
<textarea id="fancyIDname"></textarea>
```


*JS*
options, regex, init, return


options: 
target.inputid  (required)
acceptedURL.CANbeANYkey (required)
```
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
```

Regex: 
- 1 capture group please!
- the fuction will dedupe and look for links with the same href attr value
```
'https:\/\/docs\.google\.com\/document\/d\/([\\d\\w\\._-]+)(\/edit#|)',
```


```
//init
var typeAREA =  new LinkExtractor(optionsAREA);
console.log( "AREA" );
console.log( typeAREA.returnExtracted() );
```


```
//get the ids on button click
var abuton = document.getElementById('getids');
abuton.addEventListener('click', function(e){
    e.preventDefault();
    console.log( "INPUT" );
    console.log( typeINPUT.returnExtracted() );
})
```
