const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");

exports.create = (req, res) => {
    res.send({message: "create handler" });
};
exports.findAll = (req, res) => {
    res.send({ message: "findAll handler" });
};
exports.findOne = (req, res) => {
    res.send({message: "findOne handler" });
};
exports.update = (req, res) => {
    res.send({message: "update handler" });
};
exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};
exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" });
};
exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" });
};

//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    }catch (error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};


exports.findAll = async (req, res, next) => {
    let documents =[];

    try{
        const ContactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await contactService.findByName(name);
        }else{
            documents = await contactService.find({});
        }
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return res.send(documents);
};

//Cài đặt handler findOne:
exports.findOne = async(req,res, next) => {
    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.findOne(req.params.id)
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, 'Error retrieving contact width id=${req.params.id}' 
            )
        );
    }
};

//Cài đặt handler update:
exports.update = async(req,res, next) => {
    if(Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500, 'Error updating contact width id=${req.params.id}' 
            )
        );
    }
};

//Cài đặt handler delete:
exports.delete = async(req,res, next) => {
    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.delete(req.params.id)
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500, 'Could not delete contact width id=${req.params.id}' 
            )
        );
    }
};

//Cài đặt handler findAllFavorite:
exports.findAllFavorite = async(_req,res, next) => {
    try{
        const contactService = new contactService(MongoDB.client);
        const documents = await contactService.findAllFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500, 'An error occurred while retrieving favorite contacts' 
            )
        );
    }
};

//Cài đặt handler deleteAll:
exports.deleteAll = async(req,res, next) => {
    try{
        const contactService = new contactService(MongoDB.client);
        const document = await contactService.deleteAll();
        return res.send({message: '${deletedCount} contact were deleted successfully'});
    } catch (error) {
        return next(
            new ApiError(
                500, "An error occurred while retrieving favorite contacts" 
            )
        );
    }
};