require('dotenv').config()
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

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@crud.lo4nw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, {
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
    try {
        const asset = await Assets.create({image, name, description, model, state, healthscore: Number(healthscore), company: token, unity})
        const unityID = await Unities.findOne({ _id: unity})
    
        unityID.data.assetsData.push(asset._id)
        unityID.data.countAssets = unityID.data.countAssets + 1
        unityID.save()

        return res.status(201).json({asset, unityID})

    } catch (error) {
        return res.status(500).json(error)    
    }
})

.post('/unities', async (req, res) => {
    const { name, token } = req.body
    
    try {
        const asset = await Unities.create({ name, company: token})
        asset.save()
        return res.status(201).json({})
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
.put('/update-company', async (req, res) => {
   const { name } = req.body.name
   const _id = req.body._id
   try {
    let company = await companyModel.findByIdAndUpdate(_id, {name});
    return res.status(200).json(company)  
} catch (error) {
    return res.status(500).json(error)      
   }

})

.put('/update-unities', async (req, res) => {
    const { name, _id } = req.body

    try {

     const unity = await Unities.findOneAndUpdate({ _id }, {name});
     
     return res.status(200).json(unity)  
 } catch (error) {
     return res.status(500).json(error)      
    }
 })

 .put('/update-asset', async (req, res) => {
    const { image, name, description, model, state, healthscore, _id, unity } = req.body
    try {
     let asset = await Assets.findByIdAndUpdate({_id}, {image, name, description, model, state, healthscore, unity});
     return res.status(200).json(asset)  
 } catch (error) {
     return res.status(500).json(error)      
    }
 
 })

 .put('/update-responsible', async (req, res) => {
    const {name, responsibleAssets = [], _id} = req.body
    try {
     let responsible = await Responsible.findByIdAndUpdate({_id}, {name, responsibleAssets});
     return res.status(200).json(responsible)  
 } catch (error) {
     return res.status(500).json(error)      
    }
 
 })

//Delete

.delete('/delete-asset/:_id', async (req, res) => {
    const { _id } = req.params

    try{

        const asset = await Assets.findOneAndDelete({ _id })

        if (!asset) return res.status(200).json({})
        const unityID = await Unities.findOne({ _id: asset.unity})
        const countAssets = unityID.data.countAssets
                
        unityID.data.assetsData = unityID.data.assetsData.filter(assetID =>String(assetID) !== _id)
        unityID.data.countAssets = countAssets === 0 ? countAssets : countAssets - 1
        unityID.save()
        
        return res.status(204).json(asset)
    } catch(err) {
        return res.status(400).json({
            error: true,
            message: "Error: Asset não foi apagado com sucesso!"
        })
    }
})

.delete('/delete-company/:_id', async (req, res) => {
    const { _id } = req.params
    
    try {
        const company = await companyModel.findOneAndDelete({_id})
        return res.status(204).json(company)
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error: Empresa não foi apagada com sucesso!"
        })
    }
})

.delete('/delete-unity/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const unity = await Unities.findOneAndDelete({_id})
        return res.status(204).json(unity)
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error: Unidade não foi apagada com sucesso!"
        })
    }
})


.delete('/delete-responsable/:_id', async (req, res) => {  
    const { _id } = req.params
    try {
        const responsible = await Responsible.findOneAndDelete({_id})
        return res.status(204).json(responsible)
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "Error: Responsável não foi apagado com sucesso!"
        })
    }
  })

.get('/', (req, res) => {
    try {
        return res.status(200).json({
            status: 'alive'
        })
    } catch(err) {
        return res.status(102).json({
            message: String(err)
        })
    }
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

      //console.log(unities)
        return res.status(200).json(unities)
    } catch (error) {
        return res.status(500).json(error)         
    }
})

.get('/responsible', async (req, res) => {
    try {
         const responsibles = await Responsible.find()
         return res.send({responsibles})   
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
         return res.json({unities})   
    } catch (error) {
        return res.status(500).json(error)         
    }
})

.get('/companies', async (req, res) => {
    try {
         const companies = await companyModel.find()
         console.log(companies)
         return res.send({companies})   
    } catch (error) {
        return res.status(500).json(error)         
    }
})


app.listen(process.env.PORT || 3001, () => {
    console.log('Server running on ports 3001...')
})