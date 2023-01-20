const express = require("express")
const {characters} = require("./data")



const app = express()



app.get("/", (req, res)=>{
    res.status(200).send('<h1>Hello world </h1><a href="/api/v1"> Click here to see Star Wars characters </a>')

})


app.get("/api/v1/", (req,res)=> {
    res.json(characters)
})


app.get("/api/v1/characters/:characterID", (req, res)=> {
    const {characterID} = req.params;
    const singleCharacter = characters.find(
        (character) => character.id === Number(characterID)
    )
    if(!singleCharacter){
        return res.status(404).send("Character of this ID does not exist")
    }
    return res.json(singleCharacter)
})


app.get("/api/v1/query", (req,res)=>{
    let sortedChars = [...characters]
    const {search, limit} = req.query;
    if(search){
        sortedChars = sortedChars.filter(element=>{
            return element.name.startsWith(search.toUpperCase())
        })

    }
    if(limit){
        sortedChars = sortedChars.slice(0, Number(limit))
    }
    if(sortedChars.length < 1){
        res.status(200).send({success: true, data:[]})
    }
    res.status(200).json(sortedChars)
})





app.listen(5000, ()=>{
    console.log("The server is listening on port 5000...")
})