import { Categories } from "../Models/categoriesModel.js";


export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({
            status: "success",
            results: categories.length,
            data: categories,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
};
//Create
export const createCategory = async (req, res) => {
    try {
        const categories = await Categories.create(req.body);

        if (req.file) {
          categories.file = req.file;
        }


        res.status(201).json({
            status: "success",
            results: categories.length,
            data: categories,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
};

//Update


export const updateCategory = async (req, res) => {
    try {
      const categories = await Categories.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });

      if (req.file) {
        categories.file = req.file;
      }

      
      res.status(200).json({
        status: "success",
        data: categories,
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };
  

  //delate
  
  export const deleteCategory = async (req, res) => {
    try {
      const categories = await Categories.findByIdAndDelete(req.params.id);
      if (!categories) {
        res.status(400).json({
          status: "fail",
          message: "Product id topilmadi",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: null,
          message: "Product ochirildi",
        });
      }
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };
  
  
  export const getCategory = async (req, res) => {
    try {
      const categories = await Categories.find({ _id: req.params.id });
      res.status(200).json({
        status: "success",
        data: categories,
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };

