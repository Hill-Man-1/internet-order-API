import { getAllTeknisiService, getTeknisiDescService } from "../service/teknisiService.js";


const getAllTeknisi = async (req, res, next) => {
    try {
        const teknisiList = await getAllTeknisiService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: teknisiList
        });
    } catch (err) {
        next(err);
    }
}

const getTeknisiDesc = async (req, res, next) => {
    try {
        const teknisiList = await getTeknisiDescService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: teknisiList
        });
    } catch (err) {
        next(err);
    }
}

export { getAllTeknisi,getTeknisiDesc}