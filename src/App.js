const express= require('express')
const app= express()
const PORT= 3000

app.use(express.json())

const books= require('../data/book.json')

//get
app.get('/books', (req, res)=>{
    res.json(books)
})

//create a new book
app.post('/books',(req,res)=>{
    const newBook= req.body
    const newBookId= Date.now().toString()
    newBook.id=newBookId
    books.push(newBook)
    res.json(books)
})
//Retrieve
app.get('/books/:id',(req, res)=>{
    const bookId=req.params.id

    const foundBook= books.find(book=>book.id == bookId)
    if(foundBook){
        res.json(foundBook)
    }else{
        res.status(404).json({error: 'Book not found'})
    }
})
//update
app.put('/books/:id',(req,res)=>{
    const bookId= req.params.id
    const updatedFields=req.body

    const bookIndex=books.findIndex(book => book.id == bookId)
    if(bookIndex !==-1){
        books[bookIndex]={ ...books[bookIndex], ...updatedFields}
        res.json(books[bookIndex])
    }else{
        res.status(404).json({error: 'Book not found'})
    }
})
app.delete('/books/:id',(req,res)=>{
    const bookId=req.params.id
    const remBooks=books.filter(book => book.id != bookId)
    res.json(remBooks)
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})