const fs = require('fs');
const Tour = require('./../models/tourModel');

/*const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
);*/

exports.checkId =(req,res,next,val)=>{
const id = req.params.id *1;
console.log(`the requested id is ${val}`);
if(id>tours.length){
    return res.status(404).json({
        status:'fail',
        message: 'invalid request'
    });
}
next();
};

exports.checkBody = (req,res,next)=>{
if(!req.body.name || !req.body.price){
    return res.status(404).json({
        status:'fail',
        message:'Missing Price or Name'
    })
}
next();
}

exports.getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status :'Success',
        time:req.requestTime, 
      /*  results: tours.length,
        data :{
            tours
        }*/
    });
};

exports.getTour =(req,res)=>{
    console.log(req.params);
    const id = req.params.id *1;
    const tour = tours.find(e1 => e1.id===id)
    res.status(200).json({
        status :'Success',
        results: tours.length,
        data :{
            tour:tour
        }
    });
};


exports.createTour=(req,res)=>{
    //console.log(req.body);
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/../starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),err=>{
        res.status(201).json({
            status: "Success",
            data:{
                tours:newTour
            }
        });
    });

};

exports.updateTour=(req,res)=>{
    res.status(200).json({
        status:"Success",
        data:{
            tour:'<Updated tour .....>'
        }
    });
};

exports.deleteTour=(req,res)=>{
    res.status(204).json({
        status:"Success",
        data:null
    });
};
