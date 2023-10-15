const app = require('./app');

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Application run at port ${PORT}`)
})