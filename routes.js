const  file = require('fs');


const requestHandler= (req, res)=>{

    const url = req.url;
const method= req.method;
if(url ==='/'){
    res.write('<html>')
    res.write('<head><title>My demo</title></head>')
    res.write('<body><form action="/message" method="POST"> <input type="text" name="message"> <button type="submit">send</button></form></body>')
    res.write('</html>')
  return  res.end();

}



if(url ==='/message' && method === 'POST'){
    const body=[];
    req.on('data',(chunk)=>{
        console.log(chunk)
body.push(chunk);
    });
 return   req.on('end', ()=>{
        const parsedboy= Buffer.concat(body).toString();
        const val= parsedboy.split('=')[1];
        file.writeFileSync('user.txt',val);
        console.log(val);
        res.statusCode =302;
res.setHeader('Location','/');
return  res.end();
    });


}
   // process.exit();
   res.setHeader('Content-Type','text/html')
   res.write('<html>')
   res.write('<h1> How you</h1>')
   res.write('</html>')
   res.end();
};

module.exports = requestHandler;