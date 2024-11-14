import {ContactModel} from '../models/Contact.js'

const createContact=async(req,res)=>{
    const {name,email,phone,address}=req.body;        // Extract contact details from the request body

    try{
    const newContact=new ContactModel({
        name,
        email,
        phone,
        address,
        postedBy:req.user._id       // Associate the contact with the logged-in user
    });
   
    //save the contact in the database
   const result=await newContact.save()
   return res.status(201).json({success:true,...result._doc})
}catch(err){
    return res.status(500).json(err.message);
}
};

// Controller function to retrieve all contacts for the logged-in user
const getContacts=async(req,res)=>{

    try{
        //find a single contact by id
        const contacts=await ContactModel.find({postedBy:req.user._id})
        return res.status(200).json({success:true,contacts})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

// Controller function to retrieve a specific contact by its ID
const getContact=async(req,res)=>{
     const {id}=req.params;
     if(!id)
     {
        return res.status(401).json({error:"No Id specified"})
     }
    try{
        const contacts=await ContactModel.findOne({_id:id})
        return res.status(200).json({success:true,...contacts._doc})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

// Controller function to update an existing contact by ID
const updateContact=async(req,res)=>{
    const {id}=req.params;
    if(!id)
    {
       return res.status(401).json({error:"No Id specified"})
    }
   try{
       
       const result=await ContactModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})
       return res.status(200).json({success:true,...result._doc})
   }catch(err){
       return res.status(500).json({error:err.message})
   }
}

// Controller function to delete a contact by ID
const deleteContact=async(req,res)=>{
    const {id}=req.params;
    if(!id)
    {
       return res.status(401).json({error:"No Id specified"})
    }
   try{
       const contact=await ContactModel.findOne({_id:id})
       if(!contact){
        return res.status(401).json({error:"No Record Existed"})
       }
       //delete the contact
       const deleteRecord=await ContactModel.findByIdAndDelete({_id:id})
       // Fetch the remaining contacts associated with the user
       const contacts=await ContactModel.find({postedBy:req.user._id})
       return res.status(200).json({success:true,contacts})
   }catch(err){
       return res.status(500).json({error:err.message})
   }
}



export {createContact,getContacts,getContact,updateContact,deleteContact}