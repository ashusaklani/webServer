import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/errorResponse.js"
import {startProcess,sendMessageToProcess,stopProcess} from '../python._manager/dimmableLed.js'
import { startRGBProcess,sendRGBData,stopRGBProcess } from "../python._manager/rgbLed.js"
import { json } from "express"
const ledStateControl=asyncHandler((req,res,next)=>{
    // console.log(req.body)
    let {val}=req.body;

    if(val===null){   
        throw new ApiError(400,"didn't recieve the value form client")
    }
    if(val===1){
        startProcess();
    }
    else{
        stopProcess();
    }
    res.status(200).json(new ApiResponse(200,val,"led state fetched"))
})

const ledControlVal=asyncHandler(async(req,res,next)=>{
    const sendData=req.body;
    const response=await sendMessageToProcess(JSON.stringify(sendData))
    res.status(200).json(new ApiResponse(200,req.body,"led Val has been recieved"))
})
const rgbStateControl=asyncHandler(async(req,res,next)=>{
    let {val}=req.body
    if(val===null){
        throw new ApiError(400,"didn't recieve proper value from client (rgb)")

    }
    if(val===1){
        startRGBProcess()
    }
    else{
        stopRGBProcess()
    }
    res.status(200).json(200,req.body,"rgb data fetched")
})
const rgbValControl=asyncHandler((req,res,next)=>{
    let {rVal,bVal,gVal}=req.body;
    // if(rVal || bVal || gVal){
    //     throw new ApiError(400,"didn't recieve the value of rbg")
    // }
    sendRGBData(JSON.stringify(req.body));
    res.status(200).json(200,req.body,"rgb value has been recieved")
})
const ultrasonicControl=asyncHandler(async(req,res,next)=>{
    let {val}=req.body;
    if(val===null){
        throw new ApiError(400,"didn't recieve proper value from client (rgb)")

    }
    if(val===1){
        let data=startUltrasonicProcess()
        if(data){
            res.send(data)
        }
        
    }
    else{
        stopUltrasonicProcess()
    }
})
export {ledStateControl,rgbValControl,ledControlVal,rgbStateControl,ultrasonicControl};
