import { Comments } from '../Models/Commnetsmodel.js';


export const getAllComments =  async( req, res) =>{
    try {
        const comments = await Comments.find();
        res.status(200).json({
            status: "success",
            results: comments.length,
            data: comments,
        });

        
    } catch (error) {
        return res.status(500).json({
        status: "error",
        message: error.message,
        
        })
    }
}
export const createComment = async( req, res) => {
     try {
         console.log(req.body);
        const newComment = await Comments.create(req.body);
        
        res.status(201).json({
            status: "success",
            results: newComment.length,
            data: newComment,
        });

        
    } catch (error) {
        return res.status(400).json({
        status: "error",
        message: error.message,
        
        })
    }
}
export const updateComment = async( req, res) => {
     try {
        const comment = await Comments.findByIdAndUpdate(req.params.id , req.body,{
            runValidators :true,
            new: true,
        });
        res.status(200).json({
            status: "success",
            results: comment,
            
        });

        
    } catch (error) {
        return res.status(400).json({
        status: "error",
        message: error.message,
        
        })
    }
}
export const deleteComment = async( req, res) => {
     try {
        const comments = await Comments.findByIdAndDelete(req.params.id );
            if(!comments) {
                return res.status(404).json({
                    status: "fail",
                    message: "comment not found",
                });
            }
        
        res.status(200).json({
            status: "success",
            results: comments.length,
            data: comments,
        });

        
    } catch (error) {
        return res.status(500).json({
        status: "error",
        message: error.message,
        
        })
    }
}
export const getComment = async( req, res) => {
     try {
        const comments = await Component.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: comments,
        });

        
    } catch (error) {
        return res.status(404).json({
        status: "error",
        message: error.message,
        
        })
    }
}