import doctorModel from "../models/doctorModel.js"

const changeAvailability = async(req, res) => {
    try {
        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { availabe: !docData.availabe })
        res.json({ success: true, message: "Availability Changed!" })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error);
    }
}

const doctorList = async(req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error);
    }
}
export { changeAvailability, doctorList }