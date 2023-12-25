exports.getError = (req,res)=>{
    res.status(404).send('<html><h1>PAGE NOT FOUND</h1></html>');
};