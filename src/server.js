const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
const app = express()

const passengers = [
    {
        name: "Ronald",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Vinicius",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "André",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },
];

app.get('/pdf', async(req, res) => {
    //retorna browser como promessa
    const browser = await puppeteer.launch()
    //retorma página como promessa
    const page = await browser.newPage()
    //retorna uma requisição HTTP como promessa
    //considera a navegação para a url concluída quando não houver mais de 0 conexões de rede por pelo menos 500ms(baseado no networkkidle0)
    await page.goto('http://localhost:3000', {
        waitUntil: 'networkidle0'
    })

    //gera a página em pdf com suas configurações
    const pdf = await page.pdf({
        landscape:true,
        margin: {
            top:20,
            left:20,
            right:20,
            bottom:20,
        },
        printBackground: false,
        format: 'A4',
    })

    await browser.close();

    res.contentType("application/pdf");

    return res.send(pdf);

});

app.get('/', (est, res) => {

    const filePath = path.join(__dirname, "print.ejs");
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        if(err) {
            return res.send('Erro na leitura do arquivo')
        }
    
        // enviar para o navegador
        return res.send(html)
    })
   
})

app.listen(3000,()=>{
    console.log("Servidor rodando !");
});
