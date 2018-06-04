const http = require('http');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
   var html = '<html>'  
        +'<head>'  
        +'<title>nodejs</title>'  
        +'<style type="text/css">'  
        +'body{color:red;}'  
        +'</style>'  
        +'</head>'  
        +'<body>'  
        +   'hello world! 1234'  
        +'</body>'  
        +'</html>';   
  res.statusCode = 200;
  res.writeHead(200,{'Content-Type' : 'text/html'});  
  res.write(html);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



