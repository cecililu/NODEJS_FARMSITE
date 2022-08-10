fs=require('fs')
http=require('http')
const data= fs.readFileSync(`${__dirname}/data.json`,'utf-8')
const dataob=JSON.parse(data)
console.log(dataob)

const overview=fs.readFileSync (`${__dirname}/templates/overview.html`,'utf-8')
const card=fs.readFileSync (`${__dirname}/templates/card.html`,'utf-8')
const detail=fs.readFileSync (`${__dirname}/templates/detail.html`,'utf-8')


const replaceTemplate=(temp,product)=>{
  
  
  
  let output =temp.replace(/{%DESCRIPTION%}/g,product.detail)
 // console.log(output)
  output =output.replace(/{%ID%}/g,product.id)  
  if(!product.isOrganic){
    output=output.replace(/{%CLASS%}/g,'not_organic')
  }
  output =output.replace(/{%TITLE%}/g,product.name)
  output =output.replace(/{%DESCRIPTION%}/g,product.detail)
//   console.log(output)
  return output
}
const server=http.createServer((req,res)=>{
    
    const pathName=req.url;

    const cardHTML=dataob.map((item)=>replaceTemplate(card,item)).join('');
    console.log(cardHTML)
    const addhtml=overview.replace(/{%PRODUCT_CARD%}/g,cardHTML)
    // console.log(addhtml)
    if (pathName=='/'){
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(addhtml)  
      } 
    else if (pathName=='/api')res.writeHead(200,{'Content-type':'application/json'})

    else{
        res.writeHead(404)
    }

})
server.listen(8000,'127.0.0.1',()=>{
    console.log("listening to requesto on port 8000")
})
