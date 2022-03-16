var http = require('http')

const axios = require('axios')// to fetch html from time.com

http.createServer(function (req, res) {
    var url = req.url;
    if (url === '/getTimeStories') {
        axios
            .get('https://time.com')
            .then(response => {
                res.end(JSON.stringify(findObject(response.data)));
            })
            .catch(error => {
                console.error(error)
            })
    }
    else {
        res.write('visit getTimeStories');
        res.end();
    }
}).listen(8080, () => {
    console.log('Listening on port 8080');
});
function findObject(htmlstring){
    let individualStories=htmlstring.split('<li class="latest-stories__item">');
    for (let i=0;i<individualStories.length;i++){
        individualStories[i]=individualStories[i].substr(0,individualStories[i].indexOf("<time"));
    }
    let storiesObject=[]
    for (i=1;i<6;i++){
        let  story ={"title":"","link":""}
        story.link='https://time.com'.concat(individualStories[i].slice(individualStories[i].indexOf("href=")+6,individualStories[i].indexOf(`/">\n`)))
        const linkclass=`<h3 class="latest-stories__item-headline">`
        story.title=individualStories[i].slice(individualStories[i].indexOf(linkclass)+linkclass.length,individualStories[i].indexOf("</h3>"))
        storiesObject.push(story)
    }
    return storiesObject;
}
