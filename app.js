const express = require('express');
const path = require('path');
const cors = require('cors');
const { Items } = require('./models/index.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());  
app.use(express.json());

app.get('/shopDashBoard', async (req, res) => {
    try {
        const items = await Items.findAll();
        console.log(items);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

app.post('/shopDashBoard', async (req, res) => {
    try {
        console.log('Received data:', req.body);  // Add this to check what the backend is receiving
        const newItem = await Items.create(req.body);
        res.status(201).json(newItem);
        console.log('New item created:', newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
});

app.put('/shopDashBoard/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const { itemName, Description, price, Quantity } = req.body;
        const item = await Items.findByPk(itemId);  // Use singular 'item'

        if (item) {
            item.itemName = itemName;
            item.Description = Description;
            item.price = price;
            item.Quantity = Quantity;
            await item.save();
            console.log('Updated successfully:', item);
            res.status(202).json(item);
        } else {
            res.status(404).json('Item not found');
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json('Internal server issue');
    }
});
app.delete('/shopDashBoard/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;
        const items=await Items.findByPk(itemId);
        if(!items){
        return  res.status(404).json({error:'Item is not deleted'})
        }
        else{
            await items.destroy();
            res.status(200).json({message:'items deleted successfully'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Samething is wrong'});
    }
})

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});
