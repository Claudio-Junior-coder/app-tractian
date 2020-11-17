const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const companyModel = require('./models/Company')
const Assets = require('./models/Assets')
const Unities = require('./models/Unities')
const Responsible = require('./models/Responsible')


app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://user:passbase@crud.lo4nw.mongodb.net/company?retryWrites=true&w=majority', {
    useNewUrlParser: true,
     useUnifiedTopology: true 
})

//creates
app
.post('/create', async (req, res) => {
    const { name } = req.body.name
    const company = await companyModel.create({ name })
    return res.status(201).json({company})
})

.post('/assets', async (req, res) => {
    const { image, name, description, model, state, healthscore, token, unity} = req.body
    console.log(req.body)
    try {
        const asset = await Assets.create({image, name, description, model, state, healthscore: Number(healthscore), company: token, unity})
        const unityID = await Unities.findOne({ _id: unity})
    
        unityID.data.assetsData.push(asset._id)
        unityID.save()

        return res.status(201).json({asset, unityID})

    } catch (error) {
        return res.status(500).json(error)    
    }
})

.post('/unities', async (req, res) => {
    const { name, token, data } = req.body
    
    try {
        const asset = await Unities.create({ name, company: token, data: { countAssets: Number(data) }})
        asset.save()
        return res.status(201).json(asset)
        //return console.log('sucesso')
    } catch (error) {
        return console.log(error)    
    }
})

.post('/responsible', async (req, res) => {
    const { name, responsibleAssets = [] } = req.body

    try {
        const responsible = await Responsible.create({ name, responsibleAssets })
    
    for (let assetID of responsibleAssets) {
      const asset = await Assets.findOne({ _id: assetID })

      if (asset) {
        asset.responsibles.push(responsible._id)
        await asset.save()
      }
    }
        return res.status(201).json(responsible)      
    } catch (error) {
        return res.status(500).json(error)        
        
    }

})

//update
.put('/company/:id', async (req, res) => {
   const {name, email} = req.body
   const _id = req.params.id
   try {
    let company = await companyModel.findByIdAndUpdate(_id, {name, email});
    return res.status(200).json(company)  
} catch (error) {
    return res.status(500).json(error)      
   }

})

.put('/unities/:id', async (req, res) => {
    const { name, data } = req.body
    const _id = req.params.id

    try {
      const normalizedData = {
        ...data,
        assetsData: data.assetsData.map(({ _id }) => _id)
      };

     const unity = await Unities.findByIdAndUpdate(_id, { name, data: normalizedData });
     
     return res.status(200).json(unity)  
 } catch (error) {
     return res.status(500).json(error)      
    }
 })

 .put('/assets/:id', async (req, res) => {
    const { image, name, description, model, state, healthscore } = req.body
    const _id = req.params.id
    try {
     let asset = await Assets.findByIdAndUpdate(_id, {image, name, description, model, state, healthscore});
     return res.status(200).json(asset)  
 } catch (error) {
     return res.status(500).json(error)      
    }
 
 })

 .put('/responsible/:id', async (req, res) => {
    const {name, responsibleAssets = []} = req.body
    const _id = req.params.id
    try {
     let responsible = await Responsible.findByIdAndUpdate(_id, {name, responsibleAssets});
     return res.status(200).json(responsible)  
 } catch (error) {
     return res.status(500).json(error)      
    }
 
 })

//Delete

.delete('/assets/:id', (req, res) => {
    const asset = Assets.deleteOne({_id: req.params.id}, (err) => {
        //Retornar erro quando não conseguir apagar no banco de dados
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Asset não foi apagado com sucesso!"
        });

        //Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
        return res.status(204).json({})

    });
})

.delete('/company/:id', (req, res) => {
    const asset = companyModel.deleteOne({_id: req.params.id}, (err) => {
        //Retornar erro quando não conseguir apagar no banco de dados
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Asset não foi apagado com sucesso!"
        });

        //Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
        return res.status(204).json({})

    });
})

.delete('/responsible/:id', async (req, res) => {  
    try {
        await Responsible.deleteOne({_id: req.params.id})          
        return res.json({})   
    } catch (err) {
      return res.status(400).json({})
    }
  })

.delete('/unities/:id', (req, res) => {
    const asset = Unities.deleteOne({_id: req.params.id}, (err) => {
        //Retornar erro quando não conseguir apagar no banco de dados
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Asset não foi apagado com sucesso!"
        });

        //Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
        return res.status(204).json({})

    });
})

//Index / read
.get('/unities-ids/:id', async (req, res) => {
    const { id } = req.params

    try {
    const unities = await Unities.find({ company: id })

    for (unity of unities) {
        await unity
          .populate({
            path: 'data.assetsData',
            populate: {
              path: 'responsibles',
              select: 'name'
            }
          })
          .execPopulate()
    }

      console.log(unities)
        return res.status(200).json(unities)
    } catch (error) {
        return res.status(500).json(error)         
    }
})

.get('/asset', async (req, res) => {
    try {
         const assets = await Assets.find()
         return res.send({assets})   
    } catch (error) {
        return res.status(500).json(error)         
    }
})

.get('/unity', async (req, res) => {
    try {
         const unities = await Unities.find()
         return res.send({unities})   
    } catch (error) {
        return res.status(500).json(error)         
    }
})

.get('/companies', async (req, res) => {
    try {
         const companies = await companyModel.find()
         return res.send({companies})   
    } catch (error) {
        return res.status(500).json(error)         
    }
})


app.listen(3001, () => {
    console.log('Server running on ports 3001...')
})