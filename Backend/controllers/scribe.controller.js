import { Scribe } from "../models/scribe.model.js";

export const getAllScribes = async (req, res) => {
    try {
        const scribeId = req.scribeId   // loggedin scribe
        const scribes = await Scribe.find({scribeId})
        if(!scribes){
            return res.status(404).json({
                message:"Scribe not found",
                success:false
            })
        }
    } catch (error) {
        console.error(error);
        
    }
}

// get scribe by id
export const getScribeById = async (req, res) => {
    try {
        const scribeId = req.params.scribeId
        const scribe = await Scribe.findById(scribeId)
        if(!scribe){
            return res.status(404).json({
                message:"Scribe not found",
                success:false
            })
        }
        res.status(200).json({scribe, success:true})
    } catch (error) {
        console.error(error);
    }
}

// update scribe details