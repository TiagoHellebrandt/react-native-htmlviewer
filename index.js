let htmlparser = require('htmlparser2');

const handler = new htmlparser.DomHandler((err, dom) => {
    if (err) {
        return console.log("Deu ruim!");
    }

    console.log(dom);
    dom.map(i => console.log(i.children));
});

const parser = new htmlparser.Parser(handler);
parser.write("<p>Olá, mundo! <span>hehe</span></p>");
parser.done();