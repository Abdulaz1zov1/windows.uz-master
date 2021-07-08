const Category =  require('../models/Category')


//   POST methods
exports.category_POST = async (req, res) => {
    const category = await new Category({
        name: req.body.name,
        slug: slug(req.body.slug),
        children: req.body.children
    })
    category.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: category
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                error: error
            })
        })
}

//   GET_ALL methods
exports.category_Get_All = async (req, res) => {
    const category = await Category.find()
        .sort({date: -1})

    res.status(200).json({
        success: true,
        data: category
    })
}


//GET_ALL_ID methods
exports.category_Get_By_Id = async (req, res) => {
    const category = await Category.findOne({_id: req.params.id})

    if(!category){
        res.status(404).json({
            success: false,
            date: 'User not found'
        })
    }
    res.status(200).json({
        success: true,
        data: category
    })
}

// //GET_EDIT_BY_ID methods
exports.category_Edit_By_Id = async (req, res) => {
    const category = await Category.findByIdAndUpdate({_id: req.params.id});

    if(!category){
        res.status(404).json({
            success: false,
            date: 'User not found'
        })
    }

    category.name = req.body.name
    category.slug = req.body.slug
    category.children = req.body.children

    category.save()
        .then(() => {
            res.status(200).json({
                success: true,
                date: category
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                error: error
            })
        })
}


exports.category_Delete_By_Id = async (req, res) => {
    await Category.findByIdAndDelete({_id: req.params.id})

    res.status(200).json({
        success: true,
        date: []
    })
}





